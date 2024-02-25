import { prismaClient } from '@/lib/prismaClient';

import { CreateLogRequestBody } from '@/types';

export async function POST(req: Request) {
  try {
    const body: CreateLogRequestBody = await req.json();

    if (!body.firstName || !body.lastName || !body.serviceId) {
      return Response.json(
        { message: 'Incomplete data, try again.' },
        { status: 400 },
      );
    }

    const customer = await prismaClient.customer.findFirstOrThrow({
      where: {
        firstName: body.firstName,
        lastName: body.lastName,
      },
    });

    const service = await prismaClient.service.findUniqueOrThrow({
      where: {
        id: body.serviceId,
      },
    });

    const dateTimeNow = new Date();
    const computedTimeOut = new Date();
    computedTimeOut.setHours(computedTimeOut.getHours() + service.hours);

    const log = await prismaClient.log.create({
      data: {
        customerId: customer.id,
        serviceId: body.serviceId,
        date: dateTimeNow,
        timeIn: dateTimeNow,
        timeOut: computedTimeOut,
      },
    });

    return Response.json({ log }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error }, { status: 404 });
  }
}
