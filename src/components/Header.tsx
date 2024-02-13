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
        <ul className="flex gap-12 font-bold">
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
    </header>
  );
}
