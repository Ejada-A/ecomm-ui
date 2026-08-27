import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    let res;
    try {
      res = await fetch(`${authServiceUrl}/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeoutId);
    }

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Auth service returned non-JSON:', text.substring(0, 200));
      return NextResponse.json({ success: false, error: 'Invalid response from Auth Service' }, { status: 502 });
    }

    if (!res.ok || !data.success) {
      return NextResponse.json({ success: false, error: data.error || 'Invalid credentials' }, { status: res.status });
    }

    const response = NextResponse.json({
      success: true,
      message: data.message,
      admin: data.admin
    }, { status: 200 });

    response.cookies.set('admin_token', data.token || 'fallback_admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error: any) {
    console.error('Admin Login Route Error:', error);
    return NextResponse.json({ success: false, error: error.name === 'AbortError' ? 'Auth service timeout' : error.message }, { status: 500 });
  }
}
