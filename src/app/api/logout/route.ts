export const dynamic = 'force-dynamic';

export async function GET() {
  // Expire the token.
  // Respond with an empty cookie with the same name and maxAge set to 0.
  return Response.json(
    {},
    {
      status: 200,
      headers: {
        'Set-Cookie': 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;',
      },
    },
  );
}
