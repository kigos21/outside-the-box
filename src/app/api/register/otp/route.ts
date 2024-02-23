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

  // Send OTP through Twilio, and do verification checks. Check the functions within
  // @/lib/twilioClient
  //   -> [Error code] S201: TODO describe error here

  /* *********************************************************************************************

  TO BE MODIFIED DUE TO TWILIO PROBLEMS

  try {
    const verification = await verifyOTP(
      '+63' + customer.mobileNumber.slice(1),
      otp,
      );

    if (verification.status === 'pending') {
      return Response.json(
        { status: verification.status, message: 'Incorrect OTP, try again.' },
        { status: 200 },
        );
    }
    
    if (verification.status === 'approved') {
      try {
        const newCustomer = await register(customer);
        return Response.json(
          {
            status: verification.status,
            message: 'Registered successfully!',
            customer: newCustomer,
          },
          { status: 200 },
        );
      } catch (error) {
        console.error(error);
        return Response.json(
          {
            status: verification.status,
            message:
              'An error occured while creating a customer in the database. ERROR: ' +
              error,
            
          },
          { status: 500 },
        );
      }
    }
  } catch (error: any) {
    console.error(
      `Logging from try/catch block @ register/otp/route.ts. ERROR: ${error.name}` +
        error,
    );

    return Response.json({ error, errorCode: 'S201' }, { status: 500 });
  } 
  
  ********************************************************************************************** */
}
