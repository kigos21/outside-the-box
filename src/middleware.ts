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

  if (path.startsWith('/reservation')) {
    // check if token is present in cookies
    if (!req.cookies.has('token')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// ADD HERE PROTECTED PATHS
// matcher can accept regexp of pathname
export const config = {
  matcher: ['/logout', '/reservation/:path*'],
  // matcher: ['/about/:path*', '/dashboard/:path*'],
};