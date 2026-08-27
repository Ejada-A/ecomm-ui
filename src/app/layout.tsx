import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from './providers';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'EjadaStore',
  description: 'The best e-commerce store',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('user_token');
  const isAdmin = cookieStore.has('admin_token');

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-bg-subtle`}>
        <Providers>
          <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
