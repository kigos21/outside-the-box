import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: Request) {
  const { username, otp } = await req.json();

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  try {
    const otpLog = await prismaClient.oTP.findFirst({
      where: {
        // createdAt: {
        //   gt: tenMinutesAgo,
        // },
        customer: {
          username: username,
        },
      },
    });

    if (otp !== otpLog?.otp) {
      return Response.json({ message: 'Wrong OTP entered' }, { status: 400 });
    }

    return Response.json(
      { message: 'OTP Verification Success' },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
