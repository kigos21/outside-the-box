import OfferedServices from '@/components/services/OfferedServices';
import Reservation from '@/components/services/Reservation';

export default function Page() {
  return (
    <div className="max-w-7x2 mx-auto mt-24 flex flex-col gap-36 bg-cs-cream px-[7%] py-16">
      <OfferedServices />
      <Reservation />
    </div>
  );
}
