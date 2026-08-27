import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, address } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, error: 'Email, password, and name are required' }, { status: 400 });
    }

    const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';
    
    // Add timeout to prevent hanging connections (e.g. in prod)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    let res;
    try {
      res = await fetch(`${authServiceUrl}/auth/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, address }),
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
      return NextResponse.json({ success: false, error: data.error || 'Registration failed' }, { status: res.status });
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error: any) {
    console.error('Registration Route Error:', error);
    return NextResponse.json({ success: false, error: error.name === 'AbortError' ? 'Auth service timeout' : error.message }, { status: 500 });
  }
}
