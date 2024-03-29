export default function Footer() {
  return (
    <div className="mt-auto flex flex-col items-start justify-between gap-2 bg-otb-yellow px-4 py-6 md:flex-row md:px-[7%] md:py-10">
      <div className=" grid grid-cols-1 md:grid-cols-2">
        <div className="mb-0 flex w-full flex-col items-start md:mb-0 ">
          <p className=" text-sm font-bold">Terms and Conditions</p>
          <p className="text-sm font-bold">Privacy policy</p>
        </div>
        <div className="mb-4 ml-0 flex w-full flex-col items-start md:mb-0 md:ml-10 ">
          <p className="text-sm font-bold">FAQs</p>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-3 items-start gap-6 md:gap-8">
        <img className="h-full w-8" src="/facebook_logo.png" />
        <img className="h-full w-8" src="/instagram_logo.png" />
        <img className="h-full w-8" src="/x_logo.png" />
      </div>
      <h1 className="text-sm opacity-75 md:text-right">
        © OutsideTheBox. ALL RIGHTS RESERVED{' '}
      </h1>
    </div>
  );
}
