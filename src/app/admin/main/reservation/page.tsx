import { prismaClient } from '@/lib/prismaClient';
import BookReservations from './BookReservations';

interface SeatReserves {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  service: {
    name: string;
    hours: number;
  };
  date: Date;
  startTime: Date;
  endTime: Date;
}

export default async function BookReservesPage() {
  try {
    const reserves: SeatReserves[] =
      await prismaClient.seatReservation.findMany({
        include: {
          customer: true,
          service: true,
        },
      });

    return <BookReservations reserves={reserves} />;
  } catch (error) {
    console.error('Error fetching confirmed reservations:', error);
    return null;
  }
}
