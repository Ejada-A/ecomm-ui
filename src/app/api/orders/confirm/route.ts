import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const { orderId, sessionId } = await request.json();

    if (!orderId || !sessionId) {
      return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json({ success: false, error: 'Payment provider not configured' }, { status: 500 });
    }
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-01-27.acacia' as any,
    });

    // Verify the checkout session with Stripe before trusting the redirect.
    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (err: any) {
      return NextResponse.json({ success: false, error: 'Invalid payment session' }, { status: 400 });
    }

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ success: false, error: 'Payment not confirmed' }, { status: 402 });
    }

    if (session.client_reference_id && session.client_reference_id !== orderId) {
      return NextResponse.json({ success: false, error: 'Order mismatch' }, { status: 400 });
    }

    const orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://localhost:5003';
    const res = await fetch(`${orderServiceUrl}/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'paid' }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return NextResponse.json({ success: false, error: data.error || 'Failed to update order status' }, { status: res.status });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
