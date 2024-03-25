import { prismaClient } from '@/lib/prismaClient';

export async function GET() {
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
    });

    return Response.json({ logs }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
