import { ServicePill } from '@/types';
import ServicePillItem from './ServicePillItem';

export default function SpecialPromos({
  specialPromos,
}: {
  specialPromos: ServicePill[];
}) {
  return (
    <ul className="flex flex-col gap-4">
      {specialPromos.map((promo) => (
        <ServicePillItem key={promo.title} {...promo} />
      ))}
    </ul>
  );
}
