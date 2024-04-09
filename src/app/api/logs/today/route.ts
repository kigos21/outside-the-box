import { prismaClient } from '@/lib/prismaClient';

export async function GET() {
  try {
    const today = new Date().toISOString().slice(0, 10); //get Date Today in ISO Format

    const logs = await prismaClient.log.findMany({
      where: {
        timeIn: {
          gte: `${today}T00:00:00.000Z`, // Convert today to ISO-8601 with TZ
          lt: `${today}T23:59:59.999Z`, // Include milliseconds
        },
      },
      include: {
        customer: {
          select: { firstName: true, lastName: true },
        },
        service: {
          select: { name: true, price: true },
        },
      },
    });

    return Response.json(
      {
        success: true,
        logs: logs.map((log) => ({
          id: log.id,
          timeIn: log.timeIn.toLocaleTimeString(),
          timeOut: log.timeOut.toLocaleTimeString(),
          customer: {
            firstName: log.customer.firstName,
            lastName: log.customer.lastName,
          },
          service: {
            serviceName: log.service.name,
            servicePrice: log.service.price,
          },
        })),
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
