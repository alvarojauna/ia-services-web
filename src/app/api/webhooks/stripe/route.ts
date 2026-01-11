import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createProject } from '@/lib/services/projects';
import { sendEmail } from '@/lib/ses';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // In development without webhook secret, parse the event directly
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log('Payment successful:', session.id);

      // Extract metadata
      const { userId, plan, planName, amount } = session.metadata || {};
      const customerEmail = session.customer_email;

      if (userId && plan) {
        try {
          // Create project in DynamoDB
          const project = await createProject({
            clientId: userId,
            name: `Proyecto ${planName || plan}`,
            description: `Proyecto contratado via Stripe - Plan ${planName || plan}`,
            plan: plan as 'basic' | 'pro' | 'enterprise',
            status: 'pending',
            progress: 0,
            amount: parseInt(amount || '0'),
            stripePaymentId: session.payment_intent as string,
          });

          console.log('Project created:', project.projectId);

          // Send confirmation email
          if (customerEmail) {
            const emailHtml = `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>Confirmación de compra</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(to right, #2563eb, #1e40af); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">¡Gracias por tu compra!</h1>
                  </div>
                  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">
                      Hemos recibido tu pago correctamente. Aquí tienes los detalles de tu pedido:
                    </p>

                    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Plan:</strong></td>
                          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${planName || plan}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Importe:</strong></td>
                          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">€${amount}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;"><strong>ID Proyecto:</strong></td>
                          <td style="padding: 10px 0; text-align: right; font-family: monospace;">${project.projectId.slice(0, 8)}...</td>
                        </tr>
                      </table>
                    </div>

                    <p style="font-size: 14px; color: #666;">
                      Puedes seguir el progreso de tu proyecto en tu dashboard. Nos pondremos en contacto contigo pronto para comenzar.
                    </p>

                    <div style="text-align: center; margin-top: 30px;">
                      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
                         style="background: #2563eb; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                        Ver mi dashboard
                      </a>
                    </div>
                  </div>
                  <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
                    © ${new Date().getFullYear()} IA Services. Todos los derechos reservados.
                  </p>
                </body>
              </html>
            `;

            await sendEmail({
              to: customerEmail,
              subject: `Confirmación de compra - Plan ${planName || plan}`,
              html: emailHtml,
            });

            console.log('Confirmation email sent to:', customerEmail);
          }
        } catch (error) {
          console.error('Error creating project or sending email:', error);
        }
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
