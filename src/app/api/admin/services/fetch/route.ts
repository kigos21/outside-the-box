import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: Request) {
  const { id }: { id: string } = await req.json();

  try {
    const service = await prismaClient.service.findUnique({ where: { id } });

    return Response.json({ service }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: `There was a problem in fetching the data of service ${id.substring(0, 8)}. Error: ${error}`,
      },
      {
        status: 500,
      },
    );
  }
}
