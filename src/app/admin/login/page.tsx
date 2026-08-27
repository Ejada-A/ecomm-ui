import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminLoginForm from './AdminLoginForm';

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  if (cookieStore.has('admin_token')) {
    redirect('/admin/products');
  }

  return <AdminLoginForm />;
}
