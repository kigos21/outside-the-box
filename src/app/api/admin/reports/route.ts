//src app/api/admin/reports/route.ts
import { prismaClient } from '@/lib/prismaClient';

export async function GET() {
  try {
    const today = new Date().toISOString().slice(0, 10); //get Date Today in ISO Format

    const logs = await prismaClient.log.findMany({
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        service: {
          select: {
            name: true,
            price: true,
          },
        },
      },
      orderBy: { timeIn: 'desc' },
    });

    console.log('Report Logs:', logs);
    return Response.json(
      {
        logs,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
