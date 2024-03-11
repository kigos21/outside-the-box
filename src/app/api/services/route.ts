//app/api/services/route.ts
import { prismaClient } from '@/lib/prismaClient';

export async function GET(req: Request) {
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

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { name, hours, price, type } = await req.json();
    const serviceId = context.params.id;

    const updatedService = await prismaClient.service.update({
      where: {
        id: serviceId,
      },
      data: {
        name,
        hours,
        price,
        type,
      },
    });

    return Response.json(updatedService, { status: 200 });
  } catch (error) {
    console.error('Error updating service:', error);
    return Response.json(
      { message: 'Error updating service' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, hours, price, type } = await req.json();

    const newService = await prismaClient.service.create({
      data: {
        name,
        hours: parseInt(hours, 10),
        price: parseFloat(price),
        type,
      },
    });

    return Response.json(newService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return Response.json(
      { message: 'Error creating service' },
      { status: 500 },
    );
  }
}
