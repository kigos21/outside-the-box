import { prismaClient } from '@/lib/prismaClient';
import { Log } from '@prisma/client';

export async function GET(req: Request) {
  try {
    const today = new Date().toISOString().slice(0, 10); //get Date Today in ISO Format

    const logs = await prismaClient.log.findMany({
      where: {
        timeIn: {
          gte: new Date(today).toISOString(), // Convert today to ISO-8601 with TZ
          lt: new Date(`${today}T23:59:59`).toISOString(), // Include milliseconds
        },
        timeOut: {
          gte: new Date(today).toISOString(), // Convert today to ISO-8601 with TZ
          lt: new Date(`${today}T23:59:59`).toISOString(), // Include milliseconds
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
    const formattedLogs = logs.map((log) => {
      const dateTimeIn = new Date(log.timeIn).toISOString();
      const timeIn = new Date(log.timeIn).toISOString();
      const timeOut = new Date(log.timeOut).toISOString();
      return { ...log, dateTimeIn, timeIn, timeOut };
    });

    console.log(formattedLogs);

    return Response.json(
      {
        success: true,
        logs: formattedLogs.map((log) => ({
          id: log.id,
          date: log.dateTimeIn,
          timeIn: log.timeIn,
          timeOut: log.timeOut,
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
