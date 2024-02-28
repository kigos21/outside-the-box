import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prismaClient } from '@/lib/prismaClient';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
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

  if (path === '/admin') {
    if (req.cookies.has('adminToken')) {
      return NextResponse.redirect(new URL('/admin/main', req.url));
    }
  }

  if (path.startsWith('/admin')) {
    if (!req.cookies.has('adminToken')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    let adminPayload; // { id, username }

    // check if token is tampered
    try {
      const token = req.cookies.get('adminToken')!.value;
      adminPayload = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY!,
      ) as jwt.JwtPayload;
    } catch (error) {
      console.error(error);
      return Response.json(
        { success: false, message: 'Invalid auth token. Login again.' },
        { status: 401 },
      );
    }

    // check if token is from ADMIN
    let admin;

    try {
      admin = await prismaClient.admin.findUniqueOrThrow({
        where: {
          id: adminPayload.id,
        },
      });
    } catch (error) {
      console.error(error);
    }

    if (!admin) {
      return Response.json(
        {
          success: false,
          message: 'You are not an admin!',
        },
        { status: 401 },
      );
    }

    // Account is authorized at this point.
  }

  return NextResponse.next();
}

// ADD HERE PROTECTED PATHS
// matcher can accept regexp of pathname
export const config = {
  matcher: [
    '/login',
    '/register',
    '/logout',
    '/reservation/:path*',
    '/admin',
    '/admin/:path*',
  ],
  // matcher: ['/about/:path*', '/dashboard/:path*'],
};
