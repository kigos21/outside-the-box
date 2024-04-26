import jwt from 'jsonwebtoken';

import { LoginFormBody } from '@/types';
import { prismaClient } from '@/lib/prismaClient';
import { comparePasswords } from '@/lib/utils/auth';

export async function POST(req: Request) {
  const { username, password }: LoginFormBody = await req.json();
  const isAdmin = username === 'admin' || username === 'employee';

  try {
    let entity;

    if (isAdmin) {
      entity = await prismaClient.admin.findUnique({
        where: { username },
      });
    } else {
      entity = await prismaClient.customer.findUnique({
        where: { username },
      });
    }

    if (!entity) {
      return Response.json(
        {
          success: false,
          message: 'Username not found. Register your account.',
        },
        { status: 401 },
      );
    }

    const match = await comparePasswords(password, entity.password);

    if (!match) {
      return Response.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: entity.id, username: entity.username },
      process.env.JWT_SECRET_KEY!,
    );

    const headerString = `${isAdmin ? 'adminToken' : 'token'}=${token}; path=/; Secure; SameSite=Strict;`;

    return Response.json(
      { success: true, isAdmin },
      {
        status: 200,
        headers: {
          'Set-Cookie': headerString,
        },
      },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: JSON.stringify(error) },
      { status: 500 },
    );
  }
}
