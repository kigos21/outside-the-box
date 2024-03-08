import { prismaClient } from '@/lib/prismaClient';

export async function GET(req: Request) {
  // TODO: Token handling in the middleware

  try {
    const services = await prismaClient.service.findMany();
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
