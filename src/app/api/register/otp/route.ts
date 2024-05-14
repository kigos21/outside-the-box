import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: Request) {
  const {
    otp,
  }: {
    otp: string;
  } = await req.json();

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  const otpLog = await prismaClient.oTP.findMany({
    where: {
      customerId: null,
      adminId: null,
      AND: {
        createdAt: {
          gt: tenMinutesAgo,
        },
      },
    },
  });

  // check if otp exists in the request
  if (!otp) {
    return Response.json({ message: 'Please provide OTP.' }, { status: 400 });
  }

  // check if otp is only numeric characters
  if (isNaN(+otp)) {
    return Response.json(
      { message: 'Please enter numeric characters.' },
      { status: 400 },
    );
  }

  // check if otp is of valid length which is 6
  if (otp.length !== 6) {
    return Response.json(
      { message: 'Please enter your 6-digit OTP.' },
      { status: 400 },
    );
  }

  const matchingOtpEntries = otpLog.filter((entry) => entry.otp === otp);

  if (matchingOtpEntries.length === 1) {
    // Correct OTP found (you might want to call 'verifyOTP' here too)
    console.log('OTP Match');

    return Response.json({ message: 'OTP verified' }, { status: 200 });
  } else {
    // Incorrect or multiple matches
    return Response.json({ message: 'Invalid OTP' }, { status: 400 });
  }
}
