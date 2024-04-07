import { regularRates, regularRateLists, specialPromos } from '@/data';

import RegularRates from './RegularRates';
import InclusionsAddOns from './InclusionsAddOns';
import SpecialPromos from './SpecialPromos';

export default function OfferedServices() {
  return (
    <div className="font-sans font-bold">
      <h1 className="mb-10 text-center text-4xl text-cs-orange md:text-5xl lg:text-6xl xl:text-7xl">
        Regular Rates
      </h1>
      <div className="flex flex-wrap gap-8">
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
      <div className="my-8 border-t-2 border-black"></div>{' '}
      {/* Top border line */}
      {/* Special Promos */}
      <div className="mt-8">
        <SpecialPromos specialPromos={specialPromos} />
      </div>
      <div className="my-8 border-t-2 border-black"></div>{' '}
      {/* Bottom border line */}
    </div>
  );
}
