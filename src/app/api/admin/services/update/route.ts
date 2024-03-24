import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: Request) {
  const { id, name, hours, price, type } = await req.json();

  try {
    const updatedService = await prismaClient.service.update({
      where: { id },
      data: { name, hours: parseInt(hours), price: parseFloat(price), type },
    });

    return Response.json(
      { message: 'Service updated successfully.' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
