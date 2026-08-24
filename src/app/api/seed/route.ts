import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
    const res = await fetch(`${productServiceUrl}/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return NextResponse.json({ success: false, error: data.error || 'Database seeding failed' }, { status: res.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
