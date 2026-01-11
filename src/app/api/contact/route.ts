import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/ses';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, plan, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const planNames: Record<string, string> = {
      basico: 'Básico - €499',
      pro: 'Pro - €999',
      enterprise: 'Enterprise - €2499',
      otro: 'Otro / No estoy seguro',
    };

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nuevo mensaje de contacto</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(to right, #2563eb, #1e40af); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Nuevo mensaje de contacto</h1>
          </div>
          <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Nombre:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Empresa:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${company}</td>
              </tr>
              ` : ''}
              ${plan ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Plan:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${planNames[plan] || plan}</td>
              </tr>
              ` : ''}
            </table>
            <div style="margin-top: 20px;">
              <strong>Mensaje:</strong>
              <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 10px; border: 1px solid #e5e7eb;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
            Este mensaje fue enviado desde el formulario de contacto de IA Services
          </p>
        </body>
      </html>
    `;

    await sendEmail({
      to: process.env.SES_FROM_EMAIL || 'alvarojauna100@gmail.com',
      subject: `Nuevo contacto: ${name} - ${plan ? planNames[plan] : 'Sin plan especificado'}`,
      html,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
