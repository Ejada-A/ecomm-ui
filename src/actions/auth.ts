'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('user_token');
  cookieStore.delete('user_data');
  redirect('/');
}

export async function getUserData() {
  const cookieStore = await cookies();
  const userDataStr = cookieStore.get('user_data')?.value;
  if (userDataStr) {
    try {
      return JSON.parse(userDataStr);
    } catch (e) {
      return null;
    }
  }
  return null;
}

export async function adminLoginAction(email: string, password: string) {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';

  try {
    const res = await fetch(`${authServiceUrl}/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return { success: false, error: data.error || 'Invalid credentials' };
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'admin_token',
      value: data.token || 'admin_token_active',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  } catch (error: any) {
    return { success: false, error: error.message || 'Server connection error' };
  }

  redirect('/admin/products');
}
