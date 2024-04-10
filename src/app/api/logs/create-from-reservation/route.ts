import { prismaClient } from '@/lib/prismaClient';
import { sendSMSNotification } from '@/lib/semaphoreClient';

export async function POST(req: Request) {
  const { customerId, serviceId, timeIn, timeOut, confirmedReservationId } =
    await req.json();

  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      return Response.json({ message: 'Customer not found.' }, { status: 404 });
    }

    const log = await prismaClient.log.create({
      data: {
        customerId,
        serviceId,
        timeIn,
        timeOut,
        confirmedReservationId,
      },
    });

    if (log) {
      setTimeout(
        () => sendSMSNotification(customer.mobileNumber),
        log.timeOut.getTime() - log.timeIn.getTime() - 600000, // 10 minutes before log timeout (in milliseconds)
      );
    }

    return Response.json(
      { message: 'Log successfully created from reservation data.' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
