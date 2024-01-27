'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import NavLink from './NavLink';

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Login', path: '/login' },
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
        </ul>
      </nav>
    </header>
  );
}
