import { verifyOTP } from '@/lib/twilioClient';
import { register } from '@/lib/utils/customer';
import { Customer } from '@/types';
import * as bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const {
    otp,
    customer,
  }: {
    otp: string;
    customer: Customer;
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

  try {
    // hash password before registering
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(customer.password, saltRounds);

    const newCustomer = await register({
      ...customer,
      password: hashedPassword,
    });
    return Response.json(
      {
        message: 'Registered successfully!',
        customer: newCustomer,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
    return Response.json(
      {
        message: `There was an error registering your account. Error code: ${error.code}`,
        errorCode: error.code,
      },
      {
        status: 500,
      },
    );
  }
}
