'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { hasCookie } from 'cookies-next';
import NavLink from './NavLink';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>();

  useEffect(() => {
    setIsAuthorized(hasCookie('token'));
  }, []);

  const pathname = usePathname();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <header className="flex justify-between bg-otb-yellow px-[7%] py-6">
      <Link href={'/'}>
        <Image
          src="/otb-logo-cropped.jpg"
          width={160}
          height={57}
          alt="Outside the Box Logo"
        />
      </Link>
      <nav className="flex items-center justify-center">
        <ul className="flex items-center gap-12 font-bold">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              name={link.name}
              href={link.path}
              pathName={pathname}
            />
          ))}
          {/* remove login Link whenever token is present in cookies */}
          {isAuthorized != undefined && !isAuthorized ? (
            <NavLink name={'Login'} href={'/login'} pathName={pathname} />
          ) : (
            <NavLink name={'Logout'} href={'/logout'} pathName={pathname} />
          )}
        </ul>
      </nav>
      {/* <Modal className={'font-normal'}>
        <div>
          <h2 className="mb-2">Logout</h2>
          <p className="mb-4">You will be logged out of the site.</p>
          <div className="flex justify-end gap-4">
            <button className="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 hover:bg-slate-100">
              Cancel
            </button>
            <button className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
              Confirm
            </button>
          </div>
        </div>
      </Modal> */}
    </header>
  );
}
