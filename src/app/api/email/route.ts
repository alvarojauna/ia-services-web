import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/ses';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { template, to, data } = body;

    if (!template || !to) {
      return NextResponse.json(
        { success: false, error: 'template and to are required' },
        { status: 400 }
      );
    }

    let emailContent: { subject: string; html: string };

    switch (template) {
      case 'welcome':
        emailContent = emailTemplates.welcome(data.name);
        break;
      case 'purchaseConfirmation':
        emailContent = emailTemplates.purchaseConfirmation(data.name, data.plan, data.amount);
        break;
      case 'projectUpdate':
        emailContent = emailTemplates.projectUpdate(data.name, data.projectName, data.status);
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid template' },
          { status: 400 }
        );
    }

    await sendEmail({
      to,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    return NextResponse.json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
