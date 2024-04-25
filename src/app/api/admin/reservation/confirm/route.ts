import { prismaClient } from '@/lib/prismaClient';
import { sendReservationConfirmation } from '@/lib/semaphoreClient';
import { format } from 'date-fns';

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const confirmedReservation = await prismaClient.confirmedReservation.create(
      {
        data: { seatReservationId: id },
      },
    );

    const customer = await prismaClient.confirmedReservation.findFirst({
      where: {
        seatReservationId: id,
      },
      select: {
        seatReservationId: true,
        seatReservation: {
          select: {
            customer: {
              select: { mobileNumber: true },
            },
            startDateTime: true,
          },
        },
      },
    });

    if (
      customer &&
      customer.seatReservation &&
      customer.seatReservation.customer
    ) {
      const mobileNumber = customer.seatReservation.customer.mobileNumber;
      const timeIn = customer.seatReservation.startDateTime; // Assuming Log has timeIn

      console.log(timeIn);

      // Customize the format as needed
      const formattedTimeIn = format(timeIn, 'MMMM do, yyyy [at] h:mm a'); // Example: March 24th, 2023 at 10:30 AM

      const message = `Your seat reservation for ${formattedTimeIn} is now confirmed. We hope to see you soon!`;

      const verification = await sendReservationConfirmation(
        mobileNumber,
        message,
      );
    }

    return Response.json({ confirmedReservation }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: JSON.stringify(error) }, { status: 500 });
  }
}
