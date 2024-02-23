import { prismaClient } from '@/lib/prismaClient';

export const checkAvailability = async (
  date: string,
  time: string,
): Promise<boolean> => {
  const isoTime = new Date(date);
  isoTime.setHours(
    parseInt(time.split(':')[0]),
    parseInt(time.split(':')[1]),
    0,
    0,
  );

  const reservation = await prismaClient.confirmedReservation.findFirst({
    where: {
      seatReservation: {
        // date: new Date(date),
        startTime: isoTime,
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
  date: Date,
  startTime: Date,
  endTime: Date,
) => {
  const seatReservation = await prismaClient.seatReservation.create({
    data: {
      customerId,
      serviceId,
      date,
      startTime,
      endTime,
    },
  });

  return seatReservation;
};
