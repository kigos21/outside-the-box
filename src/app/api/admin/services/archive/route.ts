import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const archivedService = await prismaClient.service.update({
      data: { archived: true },
      where: { id },
    });

    return Response.json(
      { message: 'Service deleted successfully.', archivedService },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
