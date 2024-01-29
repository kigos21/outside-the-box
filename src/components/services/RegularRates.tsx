import { ServicePill } from '@/types';
import ServicePillItem from './ServicePillItem';

export default function RegularRates({
  regularRates,
}: {
  regularRates: ServicePill[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-4 text-lg">
      {regularRates.map((item) => (
        <ServicePillItem
          key={item.title}
          title={item.title}
          price={item.price}
        />
      ))}
    </ul>
  );
}
