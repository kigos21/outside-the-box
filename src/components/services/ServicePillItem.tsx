import { ServicePill } from '@/types';

export default function ServicePillItem({
  title,
  price,
  index,
}: ServicePill & { index?: number }) {
  // Determine background color and font color based on index
  const backgroundColor =
    index && index % 2 === 0 ? 'bg-cs-green' : 'bg-cs-orange';
  const fontColor = 'text-white';

  return (
    <div className="grid list-none grid-cols-2 gap-4">
      <li
        className={`rounded-xl ${backgroundColor} py-7 text-center text-lg font-semibold uppercase ${fontColor}`}
      >
        {title}
      </li>
      <li
        className={`rounded-xl ${backgroundColor} py-7 text-center text-lg font-semibold uppercase ${fontColor}`}
      >
        ₱ {price}
      </li>
    </div>
  );
}
