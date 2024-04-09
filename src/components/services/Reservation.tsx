import Link from 'next/link';

export default function Reservation() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 font-sans lg:flex-row">
      <div className="flex flex-col justify-center lg:basis-2/3">
        <h1 className="mb-4 text-center text-5xl font-bold text-cs-orange  lg:text-left">
          RESERVE NOW
        </h1>

        <p className="text-center lg:text-left">
          Want to guarantee a seat when you get here? Reserve now and we&apos;ll
          make sure that you get right to work as soon as you arrive!
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl bg-cs-green p-6 text-center text-lg shadow-lg lg:p-12">
        <div className="text-white">
          <p>as of 2:00PM 12/25/2023</p>
          <p>
            Seating Capacity is <span className="font-bold">20/30</span>
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 lg:flex-row">
          <Link href={'/reservation/seat'}>
            <button className="w-full rounded-3xl border border-transparent bg-gradient-to-br from-cs-yellow to-cs-orange px-8 py-6 font-bold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-lg lg:w-auto">
              Reserve a Seat
            </button>
          </Link>

          <Link href="/reservation/otb">
            <button className="mt-4 w-full rounded-3xl border border-transparent bg-gradient-to-br from-cs-yellow to-cs-orange px-8 py-6 font-bold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-lg lg:mt-0 lg:w-auto">
              Reserve Place
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
