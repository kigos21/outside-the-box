import { checkAvailability, reserveSeat } from '@/lib/utils/reservation';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  // get customer identity by jwt token
  try {
    let token = req.cookies.get('token')!.value;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    console.log('Decoded token: ');
    console.log(decodedToken);
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: 'Invalid auth token. Login again.' },
      { status: 401 },
    );
  }

  try {
    const { date, time, service } = await req.json();

    // check of it can be reserved
    const isAvailable = await checkAvailability(date, time);

    if (!isAvailable) {
      return Response.json({ success: false }, { status: 400 });
    }

    // reserve the seat
    await reserveSeat(date, time, service);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
