import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === '/login' || path === '/register') {
    if (req.cookies.has('token')) {
      return NextResponse.redirect(new URL('/', req.url));
    } else if (req.cookies.has('adminToken')) {
      return NextResponse.redirect(new URL('/admin/main', req.url));
    }
  } else if (path.startsWith('/reservation')) {
    // check if token is present in cookies
    if (!req.cookies.has('token')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // admin-side middleware logic
  else if (path === '/admin') {
    if (req.cookies.has('adminToken')) {
      return NextResponse.redirect(new URL('/admin/main', req.url));
    } else if (req.cookies.has('token')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else if (path.startsWith('/admin/main')) {
    if (!req.cookies.has('adminToken')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// ADD HERE PROTECTED PATHS
// matcher can accept regexp of pathname
export const config = {
  matcher: [
    // client-side
    '/login',
    '/register',
    '/logout',
    '/reservation/:path*',

    // admin-side
    '/admin',
    '/admin/main/:path*',
  ],
};
