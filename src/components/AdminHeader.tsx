'use client';
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AdminNavLink from './AdminNavLink';
import { PowerIcon } from '@heroicons/react/16/solid';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function AdminHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies(['adminToken']);

  useEffect(() => {
    checkIfAdmin(cookies.adminToken);
  }, []);

  const checkIfAdmin = async (token: string) => {
    const res = await fetch('/api/admin/check-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    });

    if (res.ok) {
      const { isAdmin } = await res.json();
      setIsAdmin(isAdmin);
    } else {
      const message = await res.text();
      alert(message);
    }
  };

  const navLinks = isAdmin
    ? [
        { name: 'Homepage', path: '/admin/main' },
        { name: 'Seat Reservations', path: '/admin/main/reservation' },
        { name: 'Manage Log Records', path: '/admin/main/logs' },
        { name: 'Manage Services and Promos', path: '/admin/main/services' },
        { name: 'Generate Reports', path: '/admin/main/reports' },
      ]
    : [
        { name: 'Homepage', path: '/admin/main' },
        { name: 'Seat Reservations', path: '/admin/main/reservation' },
        { name: 'Manage Log Records', path: '/admin/main/logs' },
        { name: 'Manage Services and Promos', path: '/admin/main/services' },
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
