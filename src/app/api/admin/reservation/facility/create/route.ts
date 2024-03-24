import { prismaClient } from '@/lib/prismaClient';
import { FacilityReservation } from '@/types';

export async function POST(req: Request) {
  const {
    firstName,
    lastName,
    startTime,
    endTime,
    price,
  }: FacilityReservation = await req.json();

  let customer;
  try {
    customer = await prismaClient.customer.findFirstOrThrow({
      where: {
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: 'Customer record not found. ' + error },
      { status: 404 },
    );
  }

  try {
    const facilityReservation = await prismaClient.facilityReservation.create({
      data: {
        customerId: customer.id,
        startDateTime: startTime,
        endDateTime: endTime,
        price: parseFloat(price),
      },
    });

    return Response.json(
      {
        message: 'Reservation for facility successfully created.',
        facilityReservation,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
