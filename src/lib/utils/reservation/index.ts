import { prismaClient } from '@/lib/prismaClient';

export const checkAvailability = async (
  date: string,
  time: string,
): Promise<boolean> => {
  const givenDateTime = new Date(date);
  givenDateTime.setHours(
    parseInt(time.split(':')[0]),
    parseInt(time.split(':')[1]),
    0,
    0,
  );

  const reservationCount = await prismaClient.confirmedReservation.count({
    where: {
      seatReservation: {
        AND: [
          { startDateTime: { lt: givenDateTime } },
          { endDateTime: { gt: givenDateTime } },
        ],
      },
    },
  });

  // Limit reservations to 20, if there are 20 seats reserved, make the schedule not available
  if (reservationCount >= 20) {
    return false;
  }

  return true;
};

export const reserveSeat = async (
  customerId: string,
  serviceId: string,
  startDateTime: Date,
  endDateTime: Date,
) => {
  const seatReservation = await prismaClient.seatReservation.create({
    data: {
      customerId,
      serviceId,
      startDateTime,
      endDateTime,
    },
  });

  return seatReservation;
};
