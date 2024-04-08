import { prismaClient } from '@/lib/prismaClient';
import * as bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { username, newPassword } = await req.json();
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const newpass = await prismaClient.customer.update({
      where: {
        username: username,
      },
      data: { password: hashedPassword },
    });

    return Response.json(
      { message: 'Password reset success' },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
