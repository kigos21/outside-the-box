import { verifyOTP } from '@/lib/twilioClient';

export async function POST(req: Request) {
  const {
    otp,
    mobileNumber,
  }: {
    otp: string;
    mobileNumber: string;
  } = await req.json();

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

  // Send OTP through Twilio, and do verification checks. Check the functions within
  // @/lib/twilioClient
  //   -> [Error code] S201: TODO describe error here
  try {
    const verification = await verifyOTP('+63' + mobileNumber.slice(1), otp);

    if (verification.status === 'pending') {
      return Response.json(
        { status: verification.status, message: 'Incorrect OTP, try again.' },
        { status: 200 },
      );
    }

    if (verification.status === 'approved') {
      return Response.json(
        { status: verification.status, message: 'Registered successfully!' },
        { status: 200 },
      );
    }
  } catch (error: any) {
    console.log(
      `Logging from try/catch block at line 36 @ register/otp/route.ts. ERROR: ${error.name}` +
        error,
    );

    return Response.json({ error, errorCode: 'S201' }, { status: 500 });
  }
}
