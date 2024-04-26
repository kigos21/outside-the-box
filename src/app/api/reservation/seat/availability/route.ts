import { checkAvailability } from '@/lib/utils/reservation';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { date, time, selectedSeats: requestedSeats } = await req.json();

    // check of it can be reserved
    const { isAvailable, message } = await checkAvailability(
      date,
      time,
      requestedSeats,
    );

    if (!isAvailable) {
      return Response.json(
        { success: false, message: message },
        { status: 400 },
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: error }, { status: 500 });
  }
}
