import Link from 'next/link';

export default function Reservation() {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-8">
      <div className="basis-2/3">
        <h1 className="mb-4 text-7xl">Reserve Now</h1>

        <p className="text-lg">
          Want to guarantee a seat when you get here? Reserve now and we&apos;ll
          make sure that you get right to work as soon as you arrive!
        </p>
      </div>

      <div className="flex min-w-[298px] basis-1/3 flex-col gap-4 rounded-3xl bg-otb-yellow p-12 text-center text-lg shadow-2xl">
        <div>
          <p>as of 2:00PM 12/25/2023</p>
          <p>
            Seating Capacity is <span className="font-bold">20/30</span>
          </p>
        </div>

        <Link href={'/reservation/seat'}>
          <button className="rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
            Reserve a Seat
          </button>
        </Link>

        <p>or</p>

        <Link
          href="/reservation/otb"
          className="text-sm font-bold uppercase text-otb-blue underline"
        >
          <span className="shadow-sm">Reserve OTB</span>
        </Link>
      </div>
    </div>
  );
}
