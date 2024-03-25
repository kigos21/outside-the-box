import { prismaClient } from '@/lib/prismaClient';

import { CreateLogRequestBody } from '@/types';

export async function POST(req: Request) {
  const { firstName, lastName, serviceId }: CreateLogRequestBody =
    await req.json();
  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        firstName,
        lastName,
      },
    });

    if (!customer) {
      return Response.json({ message: 'Customer not found.' }, { status: 404 });
    }

    const service = await prismaClient.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      return Response.json(
        {
          message:
            'Service not found, ID must have been modified. Try reloading the page.',
        },
        { status: 404 },
      );
    }

    const dateTimeNow = new Date();
    const computedTimeOut = new Date();
    computedTimeOut.setHours(computedTimeOut.getHours() + service.hours);

    const log = await prismaClient.log.create({
      data: {
        customerId: customer.id,
        serviceId: serviceId,
        timeIn: dateTimeNow,
        timeOut: computedTimeOut,
      },
    });

    return Response.json(
      { message: 'Log successfully created.' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
