import Link from 'next/link';

export default function Footer() {
  return (
    <div>
      <div className="h-0.5 w-full bg-[#a6a6a6]" />
      <div className="mt-auto flex flex-col items-start justify-between gap-2 bg-cs-cream px-4 py-6 md:flex-row md:px-[7%] md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mb-0 flex w-full flex-col items-start md:mb-0 ">
            <Link href="terms">
              <span className="text-sm font-bold">Terms and Conditions</span>
            </Link>
            <Link href="privacy">
              <span className="text-sm font-bold">Privacy policy</span>
            </Link>
          </div>
          <div className="mb-4 ml-0 flex w-full flex-col items-start md:mb-0 md:ml-10 ">
            <Link href="about#rule">
              <span className="text-sm font-bold">FAQs</span>
            </Link>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 items-start gap-6 md:gap-8">
          <img className="h-full w-8" src="/facebook_logo.png" />
          <img className="h-full w-8" src="/instagram_logo.png" />
          <img className="h-full w-8" src="/x_logo.png" />
        </div>
        <h1 className="text-sm opacity-75 md:text-right">
          © Coursescape. ALL RIGHTS RESERVED{' '}
        </h1>
      </div>
    </div>
  );
}
