export async function POST(req: Request) {
  try {
    const { date, time, service } = await req.json();
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
