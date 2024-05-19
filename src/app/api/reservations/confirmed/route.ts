export const dynamic = 'force-dynamic';

import { prismaClient } from '@/lib/prismaClient';

export async function GET() {
  try {
    const confirmedReservations =
      await prismaClient.confirmedReservation.findMany({
        where: {
          NOT: {
            Log: { some: {} },
          },
        },
        include: {
          seatReservation: {
            include: {
              customer: { select: { firstName: true, lastName: true } },
              service: { select: { name: true, hours: true } },
            },
          },
        },
        orderBy: { seatReservation: { startDateTime: 'asc' } },
      });

    return Response.json({ confirmedReservations }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
