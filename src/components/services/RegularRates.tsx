import { ServicePill } from '@/types';
import ServicePillItem from './ServicePillItem';

export default function RegularRates({
  regularRates,
}: {
  regularRates: ServicePill[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {regularRates.map((item, index) => (
        <ServicePillItem
          key={item.title}
          title={item.title}
          price={item.price}
          index={index}
        />
      ))}
    </div>
  );
}
