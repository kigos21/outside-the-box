import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-otb-yellow flex justify-between px-12 py-6">
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
          <li>
            <Link
              href={'/'}
              className="group relative text-stone-600 hover:text-stone-950"
            >
              Home
              <div className="bg-otb-blue absolute left-1/2 h-[3px] w-0 transition-all group-hover:left-0 group-hover:w-full"></div>
            </Link>
          </li>
          <li>
            <Link
              href={'/about'}
              className="group relative text-stone-600 hover:text-stone-950"
            >
              About
              <div className="bg-otb-blue absolute left-1/2 h-[3px] w-0 transition-all group-hover:left-0 group-hover:w-full"></div>
            </Link>
          </li>
          <li>
            <Link
              href={'/services'}
              className="group relative text-stone-600 hover:text-stone-950"
            >
              Services
              <div className="bg-otb-blue absolute left-1/2 h-[3px] w-0 transition-all group-hover:left-0 group-hover:w-full"></div>
            </Link>
          </li>
          <li>
            <Link
              href={'/login'}
              className="group relative text-stone-600 hover:text-stone-950"
            >
              Login
              <div className="bg-otb-blue absolute left-1/2 h-[3px] w-0 transition-all group-hover:left-0 group-hover:w-full"></div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
