import { prismaClient } from '@/lib/prismaClient';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { token } = await req.json();

  const adminToken = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY!,
  ) as jwt.JwtPayload;

  try {
    const admin = await prismaClient.admin.findUnique({
      where: {
        username: adminToken.username,
      },
    });

    if (!admin) {
      return Response.json({ message: 'Username not found.' }, { status: 200 });
    }

    const isAdmin = admin.username === 'admin';
    return Response.json({ isAdmin }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: error }, { status: 500 });
  }
}
