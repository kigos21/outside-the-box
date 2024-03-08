import React, { useState } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handleConfirmReservations = async (reservationId: string) => {
  try {
    const conRes = await prisma.confirmedReservation.create({
      data: {
        seatReservation: {
          connect: {
            id: reservationId,
          },
        },
        date: new Date(),
      },
    });
  } catch (error) {
    console.error('Error confirming reservation:', error);
    // Handle error
  }
};
