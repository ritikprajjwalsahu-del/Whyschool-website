import { redirect } from 'next/navigation';
import { getAdminFromCookies } from '@/lib/auth';

export default function AdminPage() {
  const admin = getAdminFromCookies();
  if (admin) {
    redirect('/admin/dashboard');
  } else {
    redirect('/admin/login');
  }
}
