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
    <header className="from-cs-yellow to-cs-orange flex items-center justify-between bg-gradient-to-b px-[7%] py-6">
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
        <>
          <div
            className="absolute bottom-0 left-0 right-0 top-0 z-30 bg-black/80"
            onClick={() => setShowNav(false)}
          />
          <div className="absolute bottom-0 right-0 top-0 z-40 flex w-72 flex-col justify-center bg-white px-8">
            <nav className="flex flex-col justify-center">
              <ul className="flex flex-col gap-6 font-bold">
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
                {/* remove login Link whenever token is present in cookies */}
                {isAuthed ? (
                  <span onClick={handleLogout}>
                    <NavLink
                      name={'Logout'}
                      href={'/logout'}
                      pathName={pathname}
                      className="text-xl"
                      onClick={() => setShowNav(false)}
                    />
                  </span>
                ) : (
                  <NavLink
                    name={'Login'}
                    href={'/login'}
                    pathName={pathname}
                    className="text-xl"
                    onClick={() => setShowNav(false)}
                  />
                )}
              </ul>
            </nav>
          </div>
        </>
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
          {/* remove login Link whenever token is present in cookies */}
          {isAuthed ? (
            <span onClick={handleLogout}>
              <NavLink name={'LOGOUT'} href={'/logout'} pathName={pathname} />
            </span>
          ) : (
            <NavLink name={'LOGIN'} href={'/login'} pathName={pathname} />
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
