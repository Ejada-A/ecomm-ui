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
      res = await fetch(`${authServiceUrl}/auth/user/login`, {
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

    // Set HTTP-only cookie using cookies() API
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'user_token',
      value: data.token || 'user_logged_in',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    if (data.user) {
      cookieStore.set({
        name: 'user_data',
        value: JSON.stringify(data.user),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {
    console.error('Login Route Error:', error);
    return NextResponse.json({ success: false, error: error.name === 'AbortError' ? 'Auth service timeout' : error.message }, { status: 500 });
  }
}
