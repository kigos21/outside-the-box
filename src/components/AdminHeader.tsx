'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import AdminNavLink from './AdminNavLink';

export default function AdminHeader() {
  const pathname = usePathname();
  const navLinks = [
    { name: 'Homepage', path: '/admin/main' },
    { name: 'Book Reservations', path: '/admin/main/reservation' },
    { name: 'Manage Log Records', path: '/admin/main/logs' },
    { name: 'Manage Services and Promos', path: '/admin/main/services' },
    { name: 'Generate Reports', path: '/admin/main/reports' },
    { name: 'Logout', path: '/admin/main/logout' },
  ];

  return (
    <div className="h-[86vh] basis-1/5 rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
      <ul className="text-md flex flex-col gap-4 font-bold">
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
