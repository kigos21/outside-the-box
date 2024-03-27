import React from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CreateReservations = () => {
  const getRecords = async () => {
    try {
      const records = await prisma.seatReservation.findMany();
      return records;
    } catch (error) {
      console.error('Error fetching records', error);
      return [];
    }
  };
  //   return <CreateReservations newreserve={newreserve} />;
};

export default CreateReservations;
