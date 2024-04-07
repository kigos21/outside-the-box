import styles from '@/styles/services.module.css';
import { RegularRateList } from '@/types';

export default function InclusionsAddOns({
  regularRateLists,
}: {
  regularRateLists: RegularRateList[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 uppercase">
      {regularRateLists.map((list) => (
        <div
          key={list.title}
          className={`relative flex flex-col items-center justify-center gap-4 rounded-3xl bg-cs-green p-8 text-white `}
          style={{ minHeight: '600px' }}
        >
          <div className="title-wrapper absolute top-11 w-full text-center">
            <span className="block text-xl font-bold uppercase">
              {list.title}
            </span>
          </div>
          <ul className="flex flex-col items-center text-sm">
            {list.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {list.price && (
              <li className="text-sm font-semibold">{list.price}</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
