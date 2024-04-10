import { ServicePill } from '@/types';
import ServicePillItem from './ServicePillItem';

export default function SpecialPromos({
  specialPromos,
}: {
  specialPromos: ServicePill[];
}) {
  return (
    <div>
      <h2 className="mb-8 text-center text-4xl font-bold text-cs-orange lg:text-5xl xl:text-6xl">
        SPECIAL PROMOS
      </h2>
      <ul className="flex flex-col gap-4 text-lg">
        {specialPromos.map((promo) => (
          <ServicePillItem key={promo.title} {...promo} />
        ))}
      </ul>
    </div>
  );
}
