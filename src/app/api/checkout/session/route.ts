import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'session_id is required' },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      success: true,
      session: {
        customerEmail: session.customer_email,
        planName: session.metadata?.planName || 'Plan',
        amount: parseInt(session.metadata?.amount || '0'),
        status: session.payment_status,
      },
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
