import { sendOTP } from '@/lib/semaphoreClient';
import { prismaClient } from '@/lib/prismaClient';
import { useRouter } from 'next/router';

export async function POST(req: Request) {
  try {
    const admin = await prismaClient.admin.findFirst();

    if (!admin) {
      return Response.json(
        { message: 'There is no admin account' },
        { status: 404 },
      ); //this should NOT happen haha
    }

    // const message = 'Your OTP to reset your password is: {otp}';

    // const verification = await sendOTP(admin.contactNumber, message);

    // const otp = await prismaClient.oTP.create({
    //   data: {
    //     adminId: admin.id,
    //     otp: verification,
    //   },
    // });


    return Response.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
