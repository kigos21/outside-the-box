import { prismaClient } from '@/lib/prismaClient';

export const checkAvailability = async (
  date: string,
  time: string,
): Promise<boolean> => {
  const startDateTime = new Date(date);
  startDateTime.setHours(
    parseInt(time.split(':')[0]),
    parseInt(time.split(':')[1]),
    0,
    0,
  );

  // TODO: Check if there are a lot of reservations at that time.
  // For now, check if there is a single reservation at the given time.
  const reservation = await prismaClient.confirmedReservation.findFirst({
    where: {
      seatReservation: {
        startDateTime,
      },
    },
  });

  // TODO: check if reservations are over seat capacity, return false if so
  if (reservation) {
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
