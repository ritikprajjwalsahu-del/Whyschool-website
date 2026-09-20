import { NextResponse } from 'next/server';
import { getAdminFromCookies } from '@/lib/auth';

export async function GET() {
  const admin = getAdminFromCookies();
  if (!admin) {
    return NextResponse.json(
      { error: 'Unauthorized access. No valid session found.' },
      { status: 401 }
    );
  }
  return NextResponse.json({ success: true, user: admin });
}
