import { prismaClient } from '@/lib/prismaClient';

export async function GET(req: Request) {
  // TODO: Token handling in the middleware

  try {
    const services = await prismaClient.service.findMany();
    return Response.json({ services }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: 'Error fetching services' },
      { status: 500 },
    );
  }
}
