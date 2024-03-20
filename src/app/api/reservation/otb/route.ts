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
    // TODO: send email containing the email, attendees, purpose, additionalInfo
    // Import the Nodemailer module
    const nodemailer = require('nodemailer');

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: 'coursescape.do.not.reply@gmail.com',
        pass: process.env.TRANSPORTER_PASS!,
      },
    });

    // Define email content
    let mailOptions = {
      from: 'coursescape.do.not.reply@gmail.com',
      to: email,
      subject: 'Facility Reservation Request',
      html: `<p>Attendees: ${attendees}</p><p>Purpose: ${purpose}</p><p>Additional Information: ${additionalInfo}</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error('Error sending email: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: JSON.stringify(error) },
      { status: 500 },
    );
  }
}
