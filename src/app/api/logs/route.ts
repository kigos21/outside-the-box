// route.ts
import { prismaClient } from '@/lib/prismaClient';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

  try {
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
            hours: true,
            price: true,
          },
        },
      },
      orderBy: { timeIn: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new Response(JSON.stringify({ logs }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({}), { status: 500 });
  }
}
