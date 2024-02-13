import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === '/logout') {
    // Respond with an empty cookie with the same name and maxAge set to 0
    const response = NextResponse.next();
    response.cookies.set('token', '', { maxAge: 0 });
    return response;
  }

  return NextResponse.next();
}

// ADD HERE PROTECTED PATHS
// matcher can accept regexp of pathname
export const config = {
  matcher: ['/:path*'],
  // matcher: ['/about/:path*', '/dashboard/:path*'],
};
