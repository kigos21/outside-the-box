import { checkAvailability, reserveSeat } from '@/lib/utils/reservation';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { date, time } = await req.json();

    // check of it can be reserved
    const isAvailable = await checkAvailability(date, time);

    if (!isAvailable) {
      return Response.json({ success: false }, { status: 400 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: error }, { status: 500 });
  }
}
