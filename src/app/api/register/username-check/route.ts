import { prismaClient } from '@/lib/prismaClient';
import { sendOTP } from '@/lib/semaphoreClient';

export async function POST(req: Request) {
  try {
    const { username, mobileNumber } = await req.json();

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

    try {
      const message = 'Your OTP to confirm your registration is: {otp}';

      const verification = await sendOTP(mobileNumber, message);

      console.log('sendOTP called');

      const otp = await prismaClient.oTP.create({
        data: {
          otp: verification,
        },
      });
    } catch (error) {
      console.error('Error sending OTP: ', error);
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}
