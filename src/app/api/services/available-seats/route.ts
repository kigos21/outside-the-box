import { prismaClient } from '@/lib/prismaClient';

export async function GET(req: Request) {
  const now = new Date();

  try {
    const logCount = await prismaClient.log.count({
      where: {
        AND: [
          { timeIn: { lt: now } }, // timeIn before current datetime
          { timeOut: { gt: now } }, // timeOut after current datetime
        ],
      },
    });

    return Response.json({ seatCount: logCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
