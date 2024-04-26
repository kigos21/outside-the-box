'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NavLink from './NavLink';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Header() {
  const [cookies, setCookie] = useCookies(['token']);
  const [isAuthed, setIsAuthed] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setIsAuthed(!!cookies['token']);
  }, [cookies]);

  const handleLogout = () => {
    setCookie('token', '', { path: '/' });
  };

  const handleNavClick = () => {
    setShowNav((state) => !state);
  };

  const pathname = usePathname();
  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
  ];

  return (
    <header className="from-cs-yellow to-cs-orange relative sticky top-0 z-50 flex items-center justify-between bg-gradient-to-b px-[7%] py-2">
      <Link href={'/'}>
        <Image
          src="/coursescape-logo-cropped-removebg.png"
          width={240}
          height={105}
          alt="Coursescape Logo"
        />
      </Link>

      <button
        className="rounded-md p-2 shadow-md md:hidden"
        onClick={handleNavClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {showNav && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/80"
          onClick={() => setShowNav(false)}
        >
          <div className="bg-cs-cream z-50 flex w-full max-w-xs flex-col justify-center p-8 font-sans">
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  name={link.name}
                  href={link.path}
                  pathName={pathname}
                  className="text-xl"
                  onClick={() => setShowNav(false)}
                />
              ))}
              {isAuthed ? (
                <span onClick={handleLogout}>
                  <NavLink
                    name={'LOGOUT'}
                    href={'/logout'}
                    pathName={pathname}
                    className="text-xl"
                    onClick={() => setShowNav(false)}
                  />
                </span>
              ) : (
                <NavLink
                  name={'LOGIN'}
                  href={'/login'}
                  pathName={pathname}
                  className="text-xl"
                  onClick={() => setShowNav(false)}
                />
              )}
            </nav>
          </div>
        </div>
      )}

      <nav className="hidden items-center justify-center md:flex">
        <ul className="flex items-center gap-12 font-sans font-bold">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              name={link.name}
              href={link.path}
              pathName={pathname}
            />
          ))}
          {isAuthed ? (
            <span onClick={handleLogout}>
              <NavLink name={'LOGOUT'} href={'/logout'} pathName={pathname} />
            </span>
          ) : (
            <NavLink name={'LOGIN'} href={'/login'} pathName={pathname} />
          )}
        </ul>
      </nav>
    </header>
  );
}
