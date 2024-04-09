import { ServicePill } from '@/types';

export default function ServicePillItem({
  title,
  price,
  index,
}: ServicePill & { index: number }) {
  // Determine background color and font color based on index
  const backgroundColor = index % 2 === 0 ? 'bg-cs-green' : 'bg-cs-black';
  const fontColor = index % 2 === 0 ? 'text-[#333333]' : 'text-white';

  return (
    <div className="grid grid-cols-2 gap-4">
      <li
        className={`rounded-full ${backgroundColor} py-7 text-center text-lg font-semibold uppercase ${fontColor}`}
      >
        {title}
      </li>
      <li
        className={`rounded-full ${backgroundColor} py-7 text-center text-lg font-semibold uppercase ${fontColor}`}
      >
        {price}
      </li>
    </div>
  );
}
