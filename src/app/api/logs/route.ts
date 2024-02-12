import { prismaClient } from '@/lib/prismaClient';

export async function GET(req: Request) {
  try {
    const logs = await prismaClient.customer.findMany();
    throw Error();
    return Response.json({ success: true, logs: logs }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }

  // Response.json(data (object), headers (object))
}
