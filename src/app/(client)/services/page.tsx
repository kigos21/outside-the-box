import OfferedServices from '@/components/services/OfferedServices';
import Reservation from '@/components/services/Reservation';

export default function Page() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-36 px-[7%] py-16">
      <OfferedServices />
      <Reservation />
    </div>
  );
}
