import { ServicePill } from '@/types';

export default function ServicePillItem({ title, price }: ServicePill) {
  return (
    <li className="rounded-full bg-otb-blue px-4 py-2 text-center font-semibold uppercase">
      {`${title} - ${price}`}
    </li>
  );
}
