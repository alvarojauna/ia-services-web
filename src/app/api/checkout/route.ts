import { NextRequest, NextResponse } from 'next/server';
import { stripe, plans, PlanKey } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Payment system not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { plan, userId, userEmail } = body;

    if (!plan || !userId || !userEmail) {
      return NextResponse.json(
        { success: false, error: 'plan, userId, and userEmail are required' },
        { status: 400 }
      );
    }

    const selectedPlan = plans[plan as PlanKey];
    if (!selectedPlan) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan' },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Plan ${selectedPlan.name}`,
              description: `Servicio de IA - Plan ${selectedPlan.name}`,
            },
            unit_amount: selectedPlan.price * 100, // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        plan,
        planName: selectedPlan.name,
        amount: selectedPlan.price.toString(),
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 }
    );
  }
}
