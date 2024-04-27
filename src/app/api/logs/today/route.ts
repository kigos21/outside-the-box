import { prismaClient } from '@/lib/prismaClient';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

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
      orderBy: { timeIn: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new Response(JSON.stringify({ logs }), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
