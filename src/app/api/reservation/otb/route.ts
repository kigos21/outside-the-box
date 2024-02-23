import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prismaClient } from '@/lib/prismaClient';
import { InquiryFormBody } from '@/types';

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
    console.error(error);
    return Response.json(
      { success: false, message: 'Invalid auth token. Login again.' },
      { status: 401 },
    );
  }

  let customer;
  try {
    customer = await prismaClient.customer.findUnique({
      where: {
        id: customerToken.id,
      },
    });
  } catch (error) {
    console.error(error);
  }

  if (!customer) {
    return Response.json(
      {
        success: false,
        message: 'Customer data not found. Login again.',
      },
      { status: 401 },
    );
  }

  const { email, attendees, purpose, additionalInfo }: InquiryFormBody =
    await req.json();

  try {
    const facilityReservation = await prismaClient.facilityReservation.create({
      data: {
        customerId: customer.id,
        // TODO: di malaman kung kelan kasi wala naman sa form
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        price: 0,
        // END TODO

        email,
        attendees,
        purpose,
        additionalInfo,
      },
    });

    console.log(`\n\n\n FACILITY RESERVATION CREATED: `);
    console.log(facilityReservation);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: JSON.stringify(error) },
      { status: 500 },
    );
  }
}
