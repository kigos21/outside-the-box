import { prismaClient } from '@/lib/prismaClient';
import { comparePasswords } from '@/lib/utils/auth';
import { LoginFormBody } from '@/types';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const { username, password }: LoginFormBody = await req.json();

  try {
    const admin = await prismaClient.admin.findUnique({
      where: { username: username },
    });

    if (!admin) {
      return Response.json(
        {
          success: false,
          message: 'Admin account not found.',
        },
        { status: 401 },
      );
    }

    const match = await comparePasswords(password, admin.password);

    if (!match) {
      return Response.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // Generate JWT token
    const adminToken = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET_KEY!,
    );

    return Response.json(
      { success: true, adminToken },
      {
        status: 200,
        headers: {
          'Set-Cookie': `adminToken=${adminToken}; Path=/; Secure; SameSite=Strict;`,
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
