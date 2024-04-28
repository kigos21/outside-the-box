import { prismaClient } from '@/lib/prismaClient';

export const checkAvailability = async (
  date: string,
  time: string,
  seats: number[],
): Promise<any> => {
  const givenDateTime = new Date(date);
  givenDateTime.setHours(
    parseInt(time.split(':')[0]),
    parseInt(time.split(':')[1]),
    0,
    0,
  );

  const reservationsFound = await prismaClient.seatReservation.findMany({
    where: {
      AND: [
        { startDateTime: { lte: givenDateTime } },
        { endDateTime: { gte: givenDateTime } },
      ],
    },
  });

  // Limit reservations to 10, leave 2 for walk-in customers.
  if (reservationsFound.length >= 10) {
    return { isAvailable: false, message: 'Out of slots in that time range.' };
  }

  // Accumulate the seats taken from reservationsFound[] and compare to seats[]
  const seatsTaken: number[] = [];

  reservationsFound.forEach((reservation) => {
    reservation.seats.forEach((seat) => {
      seatsTaken.push(seat);
    });
  });

  // Determine the free seats
  const freeSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(
    (seat) => !seatsTaken.includes(seat),
  );

  for (let seat of seats) {
    if (!freeSeats.includes(seat)) {
      return {
        isAvailable: false,
        message: `Seat unavailable. These are the only free seats in that time slot: ${freeSeats.toString()}`,
      };
    }
  }

  return { isAvailable: true };
};

export const reserveSeat = async (
  customerId: string,
  serviceId: string,
  startDateTime: Date,
  endDateTime: Date,
  seats: number[],
  proofUrl: string,
) => {
  const seatReservation = await prismaClient.seatReservation.create({
    data: {
      customerId,
      serviceId,
      startDateTime,
      endDateTime,
      seats,
      proofUrl,
    },
  });

  return seatReservation;
};
