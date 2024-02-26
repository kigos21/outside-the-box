import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === '/logout') {
    if (!req.cookies.has('token')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Respond with an empty cookie with the same name and maxAge set to 0
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
  }

  if (path === '/login' || path === '/register') {
    console.log('test');
    console.log(req.cookies.get('token'));
    if (req.cookies.has('token')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
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
  matcher: ['/login', '/register', '/logout', '/reservation/:path*'],
  // matcher: ['/about/:path*', '/dashboard/:path*'],
};
