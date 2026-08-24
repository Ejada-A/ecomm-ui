import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { orderId, sessionId } = await request.json();

    if (!orderId || !sessionId) {
      return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
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
