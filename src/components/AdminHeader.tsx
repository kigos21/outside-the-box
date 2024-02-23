'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import AdminNavLink from './AdminNavLink';

export default function AdminHeader() {
  const pathname = usePathname();
  const navLinks = [
    { name: 'HOMEPAGE', path: '/admin/main' },
    { name: 'BOOK RESERVATIONS', path: '/admin/main/reservation' },
    { name: 'MANAGE LOG RECORDS', path: '/admin/main/logs' },
    { name: 'MANAGE SERVICES AND PROMOS', path: '/admin/main/services' },
    { name: 'GENERATE REPORTS', path: '/admin/main/reports' },
    { name: 'LOGIN/LOGOUT', path: '/admin/main/reports' },
  ];

  return (
    <div className="basis-1/5 rounded-lg bg-white px-7 py-16 shadow-lg shadow-black/25">
      <Link href={'/admin/main'} className="absolute top-4">
        <Image
          src="/otb-logo-cropped.jpg"
          width={160}
          height={57}
          alt="Outside the Box Logo"
        />
      </Link>
      <ul className="space-y-16 text-xl font-medium">
        {navLinks.map((link) => (
          <AdminNavLink
            key={link.name}
            name={link.name}
            href={link.path}
            pathName={pathname}
          />
        ))}
      </ul>
    </div>
  );
}
