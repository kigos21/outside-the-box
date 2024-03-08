'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import AdminNavLink from './AdminNavLink';
import { PowerIcon } from '@heroicons/react/16/solid';

export default function AdminHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navLinks = [
    { name: 'Homepage', path: '/admin/main' },
    { name: 'Book Reservations', path: '/admin/main/reservation' },
    { name: 'Manage Log Records', path: '/admin/main/logs' },
    { name: 'Manage Services and Promos', path: '/admin/main/services' },
    { name: 'Generate Reports', path: '/admin/main/reports' },
    // { name: 'Logout', path: '/admin/main/logout' },
  ];

  return (
    <div className="h-[86vh] basis-1/5 rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
      <ul className="text-md flex h-full flex-col justify-between font-bold">
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <AdminNavLink
              key={link.name}
              name={link.name}
              href={link.path}
              pathName={pathname}
            />
          ))}
        </div>

        <div className="text-red-600 hover:text-red-800">
          <li className="flex items-center gap-2">
            <PowerIcon className="h-5 w-5" />
            <Link href={'/admin/main/logout'}>Log off</Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
