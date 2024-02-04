import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AdminHeader from '@/components/AdminHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Outside the Box Administrator',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-row bg-otb-yellow px-10 py-20 space-x-5` }
      >
        <AdminHeader />
        <main className='basis-4/5'>{children}</main>
      </body>
    </html>
  );
}
