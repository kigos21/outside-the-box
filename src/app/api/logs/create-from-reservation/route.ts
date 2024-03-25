import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: Request) {
  const { customerId, serviceId, timeIn, timeOut, confirmedReservationId } =
    await req.json();

  try {
    const log = await prismaClient.log.create({
      data: {
        customerId,
        serviceId,
        timeIn,
        timeOut,
        confirmedReservationId,
      },
    });

    return Response.json(
      { message: 'Log successfully created from reservation data.' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
