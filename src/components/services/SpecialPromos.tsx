import { ServicePill } from '@/types';
import ServicePillItem from './ServicePillItem';

export default function SpecialPromos({
  specialPromos,
}: {
  specialPromos: ServicePill[];
}) {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold text-cs-orange lg:px-40 lg:text-4xl xl:text-5xl">
        SPECIAL PROMOS
      </h2>
      <ul className="flex flex-col gap-4 md:gap-6 lg:gap-8 lg:px-64">
        {specialPromos.map((promo) => (
          <ServicePillItem key={promo.title} {...promo} />
        ))}
      </ul>
    </div>
  );
}
