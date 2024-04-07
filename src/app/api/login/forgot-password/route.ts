import { prismaClient } from '@/lib/prismaClient';
import { sendOTP } from '@/lib/semaphoreClient';

export async function POST(req: Request) {
  try {
    if (req.method !== 'POST') {
      return Response.json({ message: 'Method Not Allowed', status: 405 });
    }

    const { username } = await req.json();

    const customer = await prismaClient.customer.findUnique({
      where: { username: username },
    });

    if (!customer) {
      return Response.json(
        { message: 'User does not exist.' },
        { status: 404 },
      );
    }

    try {
      const message = 'Your OTP to reset your password is: {otp}';

      const verification = await sendOTP(customer.mobileNumber, message);

      console.log('sendOTP called');

      const otp = await prismaClient.oTP.create({
        data: {
          customerId: customer.id,
          otp: verification,
        },
      });

      console.log(verification.otp);
      return Response.json({ verification }, { status: 200 });
    } catch (error) {
      console.error('Error sending OTP: ', error);
    }

    return Response.json({ message: 'call success'}, {status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
