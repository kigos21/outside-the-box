import Link from 'next/link';

import { regularRates, regularRateLists, specialPromos } from '../data';
import ServicePillItem from '@/components/services/ServicePillItem';

export default function Page() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-36 px-[7%] py-28">
      <div>
        <h1 className="mb-12 text-center">Our Services</h1>
        {/* <div className="grid grid-cols-2 gap-8"> */}
        <div className="flex gap-8">
          <div className="flex shrink-0 grow-0 flex-col gap-4 rounded-3xl bg-otb-yellow p-8 shadow-2xl">
            {/* REGULAR RATES */}
            <h2 className="text-center">Regular Rates</h2>
            <ul className="grid grid-cols-2 gap-4">
              {regularRates.map((item) => (
                <ServicePillItem
                  key={item.title}
                  title={item.title}
                  price={item.price}
                />
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-4 uppercase">
              {regularRateLists.map((list) => (
                <div
                  key={list.title}
                  className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-white p-8"
                >
                  <span className="block text-xl font-bold uppercase">
                    {list.title}
                  </span>
                  <ul className="flex flex-col items-center text-sm">
                    {list.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                    {list.price && (
                      <li className="text-sm font-semibold italic">
                        {list.price}
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
            {/* END OF REGULAR RATES */}
          </div>

          <div className="flex grow flex-col gap-4 rounded-3xl bg-otb-yellow p-8 shadow-2xl">
            {/* SPECIAL PROMOS */}
            <h2 className="text-center">Special Promos</h2>
            <ul className="flex flex-col gap-4">
              {specialPromos.map((promo) => (
                <ServicePillItem key={promo.title} {...promo} />
              ))}
            </ul>
            {/* END OF SPECIAL PROMOS */}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-8">
        <div className="basis-2/3">
          <h1>Reserve Now</h1>

          <p>
            Want to guarantee a seat when you get here? Reserve now and
            we&apos;ll make sure that you get right to work as soon as you
            arrive!
          </p>
        </div>

        <div className="flex min-w-[298px] basis-1/3 flex-col gap-4 rounded-3xl bg-otb-yellow p-12 text-center shadow-2xl">
          <div>
            <p>as of 2:00PM 12/25/2023</p>
            <p>
              Seating Capacity is <span className="font-bold">20/30</span>
            </p>
          </div>

          <button className="rounded-2xl bg-otb-blue px-8 py-4 font-semibold uppercase">
            Reserve a Seat
          </button>

          <p>or</p>

          <Link href="#" className="text-sm uppercase italic underline">
            Reserve OTB
          </Link>
        </div>
      </div>
    </div>
  );
}
