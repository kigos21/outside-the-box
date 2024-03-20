import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === '/logout') {
    // There would be no token if client is not logged in.
    // Therefore, redirect them to login page.
    if (!req.cookies.has('token')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Expire the token.
    // Respond with an empty cookie with the same name and maxAge set to 0.
    const response = NextResponse.next();
    response.cookies.set('token', '', { maxAge: 0 });

    // Set a header to instruct the browser to remove the cookie
    response.headers.set(
      'Set-Cookie',
      'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;',
    );

    // Force page reload after logout
    response.headers.set('Refresh', '0;url=/'); // Redirect to homepage
    return response;
  } else if (path === '/login' || path === '/register') {
    if (req.cookies.has('token')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else if (path.startsWith('/reservation')) {
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
  matcher: ['/login', '/register', '/logout', '/reservation/:path*'],
};
