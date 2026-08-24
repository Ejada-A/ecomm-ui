import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
    const res = await fetch(`${productServiceUrl}/products/${resolvedParams.id}`, { cache: 'no-store' });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return NextResponse.json({ success: false, error: data.error || 'Product not found' }, { status: res.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
