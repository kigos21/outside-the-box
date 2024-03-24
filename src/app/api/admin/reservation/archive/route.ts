import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const archivedReservation = await prismaClient.archivedReservation.create({
      data: { seatReservationId: id },
    });

    return Response.json({ archivedReservation }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: JSON.stringify(error) }, { status: 500 });
  }
}
