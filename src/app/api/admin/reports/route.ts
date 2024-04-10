//src app/api/admin/reports/route.ts
import { prismaClient } from '@/lib/prismaClient';
import { Log } from '@prisma/client';

export async function GET(req: Request) {
  try {
    const logTime = '2024-04-10T12:01:00'; // Assuming logs have date information
    const formattedTime = logTime.slice(11); // Extract only "12:01:00"

    const today = new Date().toISOString().slice(0, 10); // Get today's date
    const logs = await prismaClient.log.findMany({
      where: {
        // ... rest of your where clause (modify based on your needs)
        timeIn: {
          gte: new Date(`${today}T${formattedTime}`).toISOString(), // Include milliseconds
          lt: new Date(`${today}T23:59:59`).toISOString(), // Include milliseconds
        },
        timeOut: {
          gte: new Date(`${today}T${formattedTime}`).toISOString(), // Include milliseconds
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
      const dateTimeIn = new Date(log.timeIn).toISOString().slice(0, 10);
      const newDate = dateTimeIn.split('-').reverse().join('/');
      const timeIn = new Date(log.timeIn).toISOString();
      const timeOut = new Date(log.timeOut).toISOString();
      const localTimeIn = new Date(timeIn).toLocaleString('en-US', {
        timeZone: 'Asia/Singapore',
        hour12: false,
      });
      const localTimeOut = new Date(timeOut).toLocaleString('en-US', {
        timeZone: 'Asia/Singapore',
        hour12: false,
      });
      return { ...log, newDate, localTimeIn, localTimeOut };
    });

    console.log(formattedLogs);

    return Response.json(
      {
        success: true,
        logs: formattedLogs.map((log) => ({
          id: log.id,
          date: log.newDate,
          timeIn: log.localTimeIn,
          timeOut: log.localTimeOut,
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
