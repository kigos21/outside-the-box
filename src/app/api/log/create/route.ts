type CreateLogRequestBody = {
  firstName: string;
  lastName: string;
  serviceId: string;
};

export async function POST(req: Request) {
  const body: CreateLogRequestBody = await req.json();
  console.log(body);

  return Response.json({ body }, { status: 200 });
}
