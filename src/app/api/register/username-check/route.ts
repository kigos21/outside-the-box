import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    const customer = await prismaClient.customer.findUnique({
      where: {
        username: username,
      },
    });

    if (customer) {
      return Response.json(
        { error: 'Username already taken. Try another.', success: false },
        {
          status: 409,
        },
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}
