import { prismaClient } from '@/lib/prismaClient';
import * as bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { username, newPassword, confirmPassword } = await req.json();
  try {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const strongPassword = (value: string) => {
      return regex.test(value);
    };
    if (!strongPassword(newPassword)) {
      return Response.json(
        { message: 'Password is not strong' },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return Response.json(
        { message: "Passwords don't match" },
        { status: 404 },
      );
    }

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
