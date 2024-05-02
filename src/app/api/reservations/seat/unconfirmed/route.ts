import { prismaClient } from '@/lib/prismaClient';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

  try {
    const seats = await prismaClient.seatReservation.findMany({
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
      orderBy: { startDateTime: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const formattedSeats = seats.map((seat) => ({
      ...seat,
      id: seat.id.toString().padStart(6, '0'),
    }));

    return new Response(JSON.stringify({ seats: formattedSeats }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: JSON.stringify(error) }, { status: 500 });
  }
}
