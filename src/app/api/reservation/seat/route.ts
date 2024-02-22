import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { reserveSeat } from '@/lib/utils/reservation';
import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: NextRequest) {
  let customerToken;

  // get customer identity by jwt token
  try {
    let token = req.cookies.get('token')!.value;
    customerToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    ) as jwt.JwtPayload;
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: 'Invalid auth token. Login again.' },
      { status: 401 },
    );
  }

  try {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: customerToken.id,
      },
    });

    if (!customer) {
      return Response.json(
        { success: false, message: 'Customer data not found. Login again.' },
        { status: 401 },
      );
    }

    const { date, time, service } = await req.json();

    // retrieve service data
    const serviceData = await prismaClient.service.findUniqueOrThrow({
      where: {
        id: service,
      },
    });

    // prepare time format for database insertion
    let dateTime = new Date(date);

    // Split the time string into hours and minutes
    const [hours, minutes] = time.split(':');

    // Convert hours and minutes to numbers
    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);

    dateTime.setHours(parsedHours, parsedMinutes, 0, 0);

    const computedEndTime = new Date(dateTime.toISOString());
    computedEndTime.setHours(computedEndTime.getHours() + serviceData.hours);

    // reserve the seat
    const seatReservation = await reserveSeat(
      customer.id,
      service,
      dateTime,
      dateTime,
      computedEndTime,
    );

    if (!seatReservation) {
      return Response.json({ success: false });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: error }, { status: 500 });
  }
}
