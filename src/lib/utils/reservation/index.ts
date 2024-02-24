import { prismaClient } from '@/lib/prismaClient';

export const checkAvailability = async (
  date: string,
  time: string,
): Promise<Boolean> => {
  // check if the date is available
  // TODO: implement this

  return true;
};

export const reserveSeat = async (
  date: string,
  time: string,
  service: string,
): Promise<void> => {
  // TODO: reserve the seat
};
