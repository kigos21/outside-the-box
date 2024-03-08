import { prismaClient } from '@/lib/prismaClient';
import { TodayInstance } from 'twilio/lib/rest/api/v2010/account/usage/record/today';

export async function GET() {
  try {
    const today = new Date().toISOString().slice(0, 10); //get Date Today in ISO Format

    const logs = await prismaClient.log.findMany({
      where: {
        timeIn: {
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
