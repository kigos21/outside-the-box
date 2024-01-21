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
            <Link href={'/'} className="text-stone-600 hover:text-stone-950">
              Home
            </Link>
          </li>
          <li>
            <Link
              href={'/about'}
              className="text-stone-600 hover:text-stone-950"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href={'/services'}
              className="text-stone-600 hover:text-stone-950"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href={'/login'}
              className="text-stone-600 hover:text-stone-950"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
