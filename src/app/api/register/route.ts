import { register } from '@/lib/utils/customer';
import { Customer } from '@/types';
import * as bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const customer: Customer = await req.json();

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
        success: true,
        message: 'Account registered successfully!',
        customer: newCustomer,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
    return Response.json(
      {
        message: `There was an error registering your account. ${JSON.stringify(error)}`,
      },
      {
        status: 500,
      },
    );
  }
}
