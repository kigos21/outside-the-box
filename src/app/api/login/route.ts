import jwt from 'jsonwebtoken';

import { LoginFormBody } from '@/types';
import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: Request) {
  const { username, password }: LoginFormBody = await req.json();

  try {
    const customer = await prismaClient.customer.findUnique({
      where: { username: username },
    });

    if (!customer) {
      return Response.json(
        {
          success: false,
          message: 'Username not found. Register your account.',
        },
        { status: 401 },
      );
    }

    if (customer.password !== password) {
      return Response.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: customer.id, username: customer.username },
      process.env.JWT_SECRET_KEY!,
    );

    return Response.json({ success: true, token, customer }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
