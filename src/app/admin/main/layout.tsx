export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AdminHeader from '@/components/AdminHeader';

import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Coursescape Administrator',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-cs-yellow p-8`}>
        <Link href={'/admin/main'} className="block w-fit">
          <Image
            src="/coursescape-logo-cropped-removebg.png"
            width={200}
            height={57}
            alt="Outside the Box Logo"
            className="mb-1 ml-8"
          />
        </Link>
        <div className="flex gap-5">
          <AdminHeader />
          <main className="basis-4/5">{children}</main>
        </div>
      </body>
    </html>
  );
}
