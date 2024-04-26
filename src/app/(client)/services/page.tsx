'use client';
import OfferedServices from '@/components/services/OfferedServices';
import Reservation from '@/components/services/Reservation';
import ScrollToTop from 'react-scroll-to-top';

export default function Page() {
  return (
    <div className="max-w-7x2 bg-cs-cream mx-auto flex flex-col gap-8 px-[7%] py-16 pt-32">
      <ScrollToTop smooth color="#0d49a6" width="40" />
      <OfferedServices />
      <Reservation />
    </div>
  );
}
