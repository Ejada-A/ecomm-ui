import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
    const res = await fetch(`${productServiceUrl}/products`, { cache: 'no-store' });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return NextResponse.json({ success: false, error: data.error || 'Failed to fetch products' }, { status: res.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await verifyAdmin();
    if (!auth.ok) return auth.response;

    const body = await request.json();
    const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
    const res = await fetch(`${productServiceUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return NextResponse.json({ success: false, error: data.error || 'Failed to create product' }, { status: res.status });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
