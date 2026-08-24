import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, shippingAddress, items } = body;

    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL || 'http://localhost:5004';

    const res = await fetch(`${paymentServiceUrl}/payments/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName, customerEmail, shippingAddress, items, origin }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return NextResponse.json({ success: false, error: data.error || 'Checkout failed' }, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('BFF Checkout error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
