import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: Request) {
  const { name, hours, price, type } = await req.json();
  console.log({ name, hours, price, type });

  try {
    const service = await prismaClient.service.create({
      data: {
        name,
        hours: parseInt(hours),
        price: parseFloat(price),
        type,
        archived: false,
      },
    });

    return Response.json(
      { message: 'Service created successfully.' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: `There was a problem creating the service. Error: ${error}`,
      },
      {
        status: 500,
      },
    );
  }
}
