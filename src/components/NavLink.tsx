import Link from 'next/link';

type NavLinkProps = {
  name: string;
  href: string;
  pathName: string;
  className?: string;
  onClick?: () => void;
};

export default function NavLink({
  name,
  href,
  pathName,
  className,
  onClick,
}: NavLinkProps) {
  let linkClass =
    pathName === href
      ? 'group relative text-stone-600 text-stone-950'
      : 'group relative text-stone-600 hover:text-stone-950';
  let underlineClass =
    pathName === href
      ? 'absolute left-0 h-[3px] w-full bg-otb-blue'
      : 'absolute left-1/2 h-[3px] w-0 bg-otb-blue transition-all group-hover:left-0 group-hover:w-full';

  return (
    <li onClick={onClick}>
      <Link href={href} className={`${linkClass} text-base ${className}`}>
        {name}
        <div className={underlineClass}></div>
      </Link>
    </li>
  );
}
