import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Users, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('admin_token');

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-bg-subtle font-sans flex flex-col">
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg-subtle font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border/50 flex flex-col shadow-sm hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-border/50">
          <Link href="/admin" className="text-2xl font-black text-primary tracking-tighter flex items-center gap-2">
            <span className="bg-primary text-surface px-2 py-1 rounded-lg">A</span>Admin
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-text-main font-semibold hover:bg-badge-blue hover:text-primary rounded-xl transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-text-main font-semibold hover:bg-badge-blue hover:text-primary rounded-xl transition-colors">
            <ShoppingBag className="w-5 h-5" />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-text-main font-semibold hover:bg-badge-blue hover:text-primary rounded-xl transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
            Orders
          </Link>
        </nav>

        <div className="p-4 border-t border-border/50">
          {/*
            ===========================================================================
            CHALLENGE: IMPLEMENT SIGN OUT FUNCTIONALITY
            ===========================================================================
            Hey there! Your task is to make this sign-out button work.
            
            1. You'll need to figure out how to handle the sign out logic (e.g. Server Action or API route).
            2. When the button is clicked, it should trigger the sign out process and clear the session.
            3. After successful sign out, redirect the user to the login page ('/admin/login').
            
            You can wrap the button in a form and use an inline Server Action like this:
            
            import { redirect } from 'next/navigation';
            import { cookies } from 'next/headers';
            
            // ... inside the layout component:
            <form action={async () => {
              'use server';
              // If you're using cookies for auth, clear them here:
              // const cookieStore = await cookies();
              // cookieStore.delete('session'); 
              redirect('/admin/login');
            }}>
              <button 
                type="submit"
                className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </form>
          */}
          <form action={async () => {
            'use server';
            const { cookies } = await import('next/headers');
            const { redirect } = await import('next/navigation');
            const cookieStore = await cookies();
            cookieStore.delete('admin_token');
            redirect('/admin/login');
          }}>
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-surface border-b border-border/50 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-xl font-black text-text-main">Management Portal</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary text-surface rounded-full flex items-center justify-center font-bold">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border/50 flex justify-around p-3 pb-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link href="/admin" className="text-text-muted hover:text-primary flex flex-col items-center">
          <LayoutDashboard className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/admin/products" className="text-text-muted hover:text-primary flex flex-col items-center">
          <ShoppingBag className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Products</span>
        </Link>
        <Link href="/admin/orders" className="text-text-muted hover:text-primary flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck mb-1"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
          <span className="text-[10px] font-bold">Orders</span>
        </Link>
        <form action={async () => {
          'use server';
          const { cookies } = await import('next/headers');
          const { redirect } = await import('next/navigation');
          const cookieStore = await cookies();
          cookieStore.delete('admin_token');
          redirect('/admin/login');
        }}>
          <button type="submit" className="text-red-500 hover:text-red-700 flex flex-col items-center">
            <LogOut className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">Sign Out</span>
          </button>
        </form>
      </div>

    </div>
  );
}
