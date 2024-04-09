import { regularRates, regularRateLists, specialPromos } from '@/data';

import RegularRates from './RegularRates';
import InclusionsAddOns from './InclusionsAddOns';
import SpecialPromos from './SpecialPromos';

export default function OfferedServices() {
  return (
    <div className="font-sans font-bold">
      <h1 className="mb-10 text-start text-4xl font-bold text-cs-orange lg:text-5xl xl:text-6xl">
        REGULAR RATES
      </h1>
      <div className=" flex flex-col gap-12 px-80 md:flex-row md:gap-16 lg:gap-12">
        {/* Regular Rates */}
        <div className="flex flex-1 flex-col gap-4">
          <RegularRates regularRates={regularRates} />
        </div>

        {/* Inclusions & Add-Ons */}
        <div className="flex flex-1 flex-col gap-4">
          <InclusionsAddOns regularRateLists={regularRateLists} />
        </div>
      </div>
      {/* Border lines */}
      <div className="my-8 border-t-2 border-[#a6a6a6]"></div>{' '}
      {/* Top border line */}
      {/* Special Promos */}
      <div className="mt-8">
        <SpecialPromos specialPromos={specialPromos} />
      </div>
      <div className="my-8 border-t-2 border-[#a6a6a6]"></div>{' '}
      {/* Bottom border line */}
    </div>
  );
}
