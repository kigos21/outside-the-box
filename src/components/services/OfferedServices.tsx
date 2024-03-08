import { regularRates, regularRateLists, specialPromos } from '@/data';

import RegularRates from './RegularRates';
import InclusionsAddOns from './InclusionsAddOns';
import SpecialPromos from './SpecialPromos';

export default function OfferedServices() {
  return (
    <div>
      <h1 className="mb-10 text-center">Our Services</h1>
      {/* <div className="grid grid-cols-2 gap-8"> */}
      <div className="flex flex-wrap gap-8">
        <div className="flex shrink-0 grow flex-col gap-4 rounded-3xl bg-otb-yellow p-8 shadow-2xl">
          {/* REGULAR RATES */}
          <h2 className="text-center">Regular Rates</h2>
          <RegularRates regularRates={regularRates} />
          <InclusionsAddOns regularRateLists={regularRateLists} />
          {/* END OF REGULAR RATES */}
        </div>

        <div className="flex grow basis-[410px] flex-col gap-4 rounded-3xl bg-otb-yellow p-8 shadow-2xl">
          {/* SPECIAL PROMOS */}
          <h2 className="text-center">Special Promos</h2>
          <SpecialPromos specialPromos={specialPromos} />
          {/* END OF SPECIAL PROMOS */}
        </div>
      </div>
    </div>
  );
}
