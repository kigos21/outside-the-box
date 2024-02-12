import { prismaClient } from '@/lib/prismaClient';

type CreateLogRequestBody = {
  firstName: string;
  lastName: string;
  serviceId: string;
};

export async function POST(req: Request) {
  try {
    const body: CreateLogRequestBody = await req.json();
    console.log(body);

    if (!body.firstName || !body.lastName || !body.serviceId) {
      return Response.json(
        { message: 'Incomplete data, try again.' },
        { status: 400 },
      );
    }

    try {
      const customer = await prismaClient.customer.find({
        where: {
          firstName: body.firstName,
          lastName: body.lastName,
        },
      });

      const service = await prismaClient.service.findUnique({
        where: {
          id: body.serviceId,
        },
      });

      console.log(`Customer: ${JSON.stringify(customer)}`);
      console.log(`Service: ${JSON.stringify(service)}`);

      return Response.json({ customer, service }, { status: 200 });

      // const dateTimeNow = new Date();

      // const log = await prismaClient.log.create({
      //   data: {
      //     customerId: customer.id,
      //     serviceId: body.serviceId,
      //     date: dateTimeNow.toLocaleString(),
      //     timeIn: dateTimeNow.toLocaleString(),
      //     timeOut: dateTimeNow.setHours(dateTimeNow.getHours() + service.hours),
      //   },
      // });
    } catch (error) {
      console.log(error);
      return Response.json({ message: error }, { status: 500 });
    }

    // truthy, falsey values
    // "" => false // null, undefined, ""
    // "a" => true

    // 0 => false
    // any other values => true

    return Response.json({ body }, { status: 200 });
  } catch (error: any) {
    console.error(error);
  }
}
