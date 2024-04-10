import OfferedServices from '@/components/services/OfferedServices';
import Reservation from '@/components/services/Reservation';

export default function Page() {
  return (
    <div className="max-w-7x2 mx-auto flex flex-col gap-8 bg-cs-cream px-[7%] py-16 pt-32">
      <OfferedServices />
      <Reservation />
    </div>
  );
}
