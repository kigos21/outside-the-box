import { prismaClient } from '@/lib/prismaClient';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  try {
    const archivedReservation = await prismaClient.archivedReservation.create({
      data: {
        seatReservationId: id,
      },
    });

    if (!archivedReservation) {
      return Response.json({ success: false }, { status: 404 });
    }

    return Response.json(
      { success: true, archivedReservation },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
