import Link from 'next/link';
type NavLinkProps = {
  name: string;
  href: string;
  pathName: string;
};

export default function AdminNavLink({ name, href, pathName }: NavLinkProps) {
  let linkClass =
    pathName === href
      ? 'group relative font-bold text-black'
      : 'group relative text-stone-600 hover:text-black';
  let underlineClass =
    pathName === href
      ? 'absolute left-0 h-[2px] w-full bg-otb-blue'
      : 'absolute left-1/2 h-[2px] w-0 bg-otb-blue transition-all group-hover:left-0 group-hover:w-full';

  return (
    <li>
      <Link href={href} className={linkClass}>
        {name}
        <div className={underlineClass}></div>
      </Link>
    </li>
  );
}
