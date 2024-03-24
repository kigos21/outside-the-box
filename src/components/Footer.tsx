export default function Footer() {
  return (
    <div className="bg-cs-white mt-auto flex items-center justify-between px-[7%] py-10">
      <h1 className="text-sm opacity-75">
        © coursescape. ALL RIGHTS RESERVED{' '}
      </h1>
      <div className="flex items-center">
        <div className="w-50 mr-8 flex flex-col items-end">
          <p className="text-sm font-bold">Facebook</p>
          <p className="text-sm font-bold">Instagram</p>
        </div>
        <div className="w-30 ml-40 mr-3 flex flex-col items-end">
          <p className="text-sm font-bold">Terms and Conditions</p>
          <p className="text-sm font-bold">Privacy policy</p>
        </div>
        <div className="ml-10 flex w-40 flex-col items-end">
          <p className="text-sm font-bold">FAQs</p>
        </div>
      </div>
    </div>
  );
}
