import { prismaClient } from '@/lib/prismaClient';

export async function GET(req: Request) {
  try {
    const services = await prismaClient.service.findMany({
      where: { archived: false },
      orderBy: { hours: 'asc' },
    });
    return Response.json(
      { success: true, services: services },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: 'Error fetching services' },
      { status: 500 },
    );
  }
}
