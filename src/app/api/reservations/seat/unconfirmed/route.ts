import { prismaClient } from '@/lib/prismaClient';

export async function GET() {
  try {
    const unconfirmedReservations = await prismaClient.seatReservation.findMany(
      {
        where: {
          NOT: {
            OR: [
              { ConfirmedReservation: { some: {} } },
              { ArchivedReservation: { some: {} } },
            ],
          },
        },
        include: {
          customer: { select: { firstName: true, lastName: true } },
          service: { select: { name: true, price: true } },
        },
      },
    );

    return Response.json({ unconfirmedReservations }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: JSON.stringify(error) }, { status: 500 });
  }
}
