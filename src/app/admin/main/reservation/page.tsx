'use client';

import { PrismaClient } from '@prisma/client';
import BookReservations from './BookReservations';
import fs from 'fs';
import React from 'react';

const prisma = new PrismaClient();

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
  // const [reserves, setReserves] = React.useState<SeatReserves[]>([]);

  // React.useEffect(() => {
  //   async function fetchData() {
  try {
    const reserves: SeatReserves[] = await prisma.seatReservation.findMany({
      include: {
        customer: true,
        service: true,
      },
    });
    return <BookReservations reserves={reserves} />;
    // setReserves(reservesData);
  } catch (error) {
    console.error('Error fetching confirmed reservations:', error);
    return null;
  }
}

//   fetchData();
// }, []);

// async function handleExports(reserves: SeatReserves[]) {
//   await exportToCSV(reserves);
// }

// async function exportToCSV(reserves: SeatReserves[]) {
//   try {
//     let csvContent =
//       'ID,First Name,Last Name,Service Name,Service Hours,Date,Start Time,End Time\n';
//     reserves.forEach((reserve) => {
//       csvContent += `${reserve.id},${reserve.customer.firstName},${reserve.customer.lastName},${reserve.service.name},${reserve.service.hours},${reserve.date},${reserve.startTime},${reserve.endTime}\n`;
//     });

//     fs.writeFileSync('reserves.csv', csvContent);

//     console.log('Data exported to CSV successfully.');
//   } catch (error) {
//     console.error('Error exporting data to CSV:', error);
//   }
// }
