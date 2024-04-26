import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
      <body
        className={`${inter.className} flex min-h-screen flex-col justify-center`}
        style={{
          background: 'linear-gradient(to bottom, #fdb91a, #e79953)',
        }}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
