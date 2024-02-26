import { sendOTP } from '@/lib/twilioClient';
import { RegisterFormBody } from '@/types';

export async function POST(req: Request) {
  const body: RegisterFormBody = await req.json();

  // Check for missing fields
  const requiredFields = [
    'username',
    'firstName',
    'lastName',
    'occupation',
    'affiliation',
    'mobileNumber',
    'password',
    'confirmPassword',
  ];
  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    return Response.json(
      {
        error: `Missing fields: ${missingFields.join(', ')}`,
        missing: [...missingFields],
      },
      {
        status: 400,
      },
    );
  }

  const { mobileNumber, password, confirmPassword } = body;

  // Check if passwords match
  //   -> [Error code] I101: Passwords do not match
  if (password !== confirmPassword) {
    return Response.json(
      { error: 'Passwords do not match', errorCode: 'I101' },
      { status: 400 },
    );
  }

  // Check if password is complex (at least 8 characters long, at least 1 lowercase letter,
  // 1 uppercase letter, 1 digit, and 1 special character)
  //   -> [Error code] I102: Low password strength
  const complexPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!complexPasswordRegex.test(password)) {
    return Response.json(
      {
        error:
          'Password must be at least 8 characters long and include at least one lowercase ' +
          'letter, one uppercase letter, one digit, and one special character',
        errorCode: 'I102',
      },
      { status: 400 },
    );
  }

  return Response.json({ message: 'Enter your OTP' }, { status: 200 });

  // Send OTP through Twilio, and do verification checks. Check the functions within
  // @/lib/twilioClient
  //   -> [Error code] S201: TODO describe error here

  /* *********************************************************************************************

  try {
    const verification = await sendOTP('+63' + mobileNumber.slice(1));
    return Response.json(verification, { status: 200 });
  } catch (error: any) {
    console.error(
      `Logging from try/catch block at line 66 @ register/route.ts. ERROR: ${error.name}` +
        error,
    );

    return Response.json({ error, errorCode: 'S201' }, { status: 500 });
  }

  ********************************************************************************************* */
}
