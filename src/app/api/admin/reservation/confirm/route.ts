import { prismaClient } from '@/lib/prismaClient';
import { sendReservationConfirmation } from '@/lib/semaphoreClient';
import { DateTime } from 'luxon'; // Import DateTime

export async function POST(req: Request) {
  const { id } = await req.json();

  const intId = parseInt(id, 10);

  try {
    const confirmedReservation = await prismaClient.confirmedReservation.create(
      {
        data: { seatReservationId: String(intId) },
      },
    );

    const customer = await prismaClient.confirmedReservation.findFirst({
      where: {
        seatReservationId: String(intId),
      },
      select: {
        seatReservationId: true,
        seatReservation: {
          select: {
            customer: {
              select: { mobileNumber: true },
            },
            startDateTime: true,
            seats: true,
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

      const reservedSeats = customer.seatReservation.seats.toString();
      const seatNumbers = reservedSeats.split(','); // Split string into array
      const resId = id.toString().padStart(6, '0');

      console.log(timeIn);

      // Customize the format as needed
      if (timeIn) {
        // Add this check if timeIn can be null
        const dateTime = DateTime.fromJSDate(timeIn); // Convert Date to Luxon DateTime
        const dt = dateTime.toLocaleString(DateTime.DATETIME_MED);

        let formattedSeatNumbers;
        if (seatNumbers.length === 1) {
          formattedSeatNumbers = `seat number ${seatNumbers[0]}`;
        } else {
          // Customize this if needed for multiple seats (e.g., "seats 1, 5, and 7")
          formattedSeatNumbers = `seat numbers ${seatNumbers.join(', ')}`;
        }

        const message = `Your seat reservation for ${formattedSeatNumbers} on ${dt} is now confirmed and your reservation number is: ${resId}. We hope to see you soon!`;

        const verification = await sendReservationConfirmation(
          mobileNumber,
          message,
        );
      }
    }

    return Response.json({ confirmedReservation }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: JSON.stringify(error) }, { status: 500 });
  }
}
