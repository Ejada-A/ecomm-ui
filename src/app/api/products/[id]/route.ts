import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await verifyAdmin();
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const body = await request.json();
    const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
    const res = await fetch(`${productServiceUrl}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return NextResponse.json({ success: false, error: data.error || 'Failed to update product' }, { status: res.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await verifyAdmin();
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
    const res = await fetch(`${productServiceUrl}/products/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return NextResponse.json({ success: false, error: data.error || 'Failed to delete product' }, { status: res.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
