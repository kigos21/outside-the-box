import { prismaClient } from '@/lib/prismaClient';

export async function GET() {
  try {
    const logs = await prismaClient.customer.findMany();
    return Response.json({ success: true, logs: logs }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
