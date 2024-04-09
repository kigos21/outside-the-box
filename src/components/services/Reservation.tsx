import Link from 'next/link';

export default function Reservation() {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-8 font-sans">
      <div className="flex basis-2/3 flex-col justify-center">
        <h1 className="mb-4 bg-gradient-to-r from-cs-yellow to-cs-orange bg-clip-text text-5xl font-bold text-transparent">
          Reserve Now
        </h1>

        <p>
          Want to guarantee a seat when you get here? Reserve now and we&apos;ll
          make sure that you get right to work as soon as you arrive!
        </p>
      </div>

      <div className="flex min-h-[300px] min-w-[600px] flex-col gap-4 rounded-3xl bg-cs-green p-12 text-center text-lg shadow-lg">
        <div className="text-white">
          <p>as of 2:00PM 12/25/2023</p>
          <p>
            Seating Capacity is <span className="font-bold">20/30</span>
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href={'/reservation/seat'}>
            <button className="min-w-[200px] rounded-3xl border border-transparent bg-gradient-to-br from-cs-yellow to-cs-orange px-8 py-6 font-bold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-lg">
              Reserve a Seat
            </button>
          </Link>

          <Link href="/reservation/otb">
            <button className="min-w-[200px] rounded-3xl border border-transparent bg-gradient-to-br from-cs-yellow to-cs-orange px-8 py-6 font-bold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-lg">
              Reserve Place
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
