import { cookies } from 'next/headers';
import { jwtVerify, type JWTPayload } from 'jose';
import { NextResponse } from 'next/server';

export type AdminAuthResult =
  | { ok: true; payload: JWTPayload }
  | { ok: false; response: NextResponse };

/**
 * Verify the caller is an authenticated admin by validating the `admin_token`
 * cookie the same way `middleware.ts` does for /admin pages.
 * Use in admin-only API (BFF) route handlers:
 *
 *   const auth = await verifyAdmin();
 *   if (!auth.ok) return auth.response;
 */
export async function verifyAdmin(): Promise<AdminAuthResult> {
  const token = (await cookies()).get('admin_token')?.value;

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      ),
    };
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);
    return { ok: true, payload };
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: 'Invalid or expired session' },
        { status: 401 }
      ),
    };
  }
}
