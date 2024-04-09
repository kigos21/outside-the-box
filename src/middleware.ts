import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // client-side middleware logic
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

  // admin-side middleware logic
  else if (path === '/admin/main/logout') {
    // There would be no token if admin is not logged in.
    // Therefore, redirect them to login page.
    if (!req.cookies.has('adminToken')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    // Expire the token.
    // Respond with an empty cookie with the same name and maxAge set to 0.
    const response = NextResponse.next();
    response.cookies.set('adminToken', '', { maxAge: 0 });

    // Set a header to instruct the browser to remove the cookie
    response.headers.set(
      'Set-Cookie',
      'adminToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;',
    );

    // Force page reload after logout
    response.headers.set('Refresh', '0;url=/admin'); // Redirect to homepage
    return response;
  } else if (path === '/admin') {
    if (req.cookies.has('adminToken')) {
      // let adminToken;

      // try {
      //   const token = req.cookies.get('adminToken')!.value;
      //   const secretKey = process.env.JWT_SECRET_KEY! as unknown as
      //     | Uint8Array
      //     | KeyLike;
      //   adminToken = jose.jwtVerify(token, secretKey) as jwt.JwtPayload;
      // } catch (error) {
      //   console.error(error);
      //   return Response.json(
      //     { success: false, message: 'Invalid auth token. Login again.' },
      //     { status: 401 },
      //   );
      // }

      // let admin;
      // try {
      //   admin = await prismaClient.admin.findUniqueOrThrow({
      //     where: {
      //       id: adminToken.id,
      //     },
      //   });
      // } catch (error) {
      //   console.error(error);
      //   return Response.json(
      //     { success: false, message: 'Invalid auth token. Login again.' },
      //     {
      //       status: 401,
      //       headers: {
      //         'Set-Cookie':
      //           'adminToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;',
      //         // prettier-ignore
      //         'Location': '/admin',
      //         // prettier-ignore
      //         'Refresh': '0;url=/admin',
      //       },
      //     },
      //   );
      // }

      return NextResponse.redirect(new URL('/admin/main', req.url));
    }
  } else if (path.startsWith('/admin/main')) {
    if (!req.cookies.has('adminToken')) {
      // let adminToken;

      // try {
      //   const token = req.cookies.get('adminToken')!.value;
      //   const secretKey = process.env.JWT_SECRET_KEY! as unknown as
      //     | Uint8Array
      //     | KeyLike;
      //   adminToken = jose.jwtVerify(token, secretKey) as jwt.JwtPayload;
      // } catch (error) {
      //   console.error(error);
      //   return Response.json(
      //     { success: false, message: 'Invalid auth token. Login again.' },
      //     { status: 401 },
      //   );
      // }

      // let admin;
      // try {
      //   admin = await prismaClient.admin.findUniqueOrThrow({
      //     where: {
      //       id: adminToken.id,
      //     },
      //   });
      // } catch (error) {
      //   console.error(error);
      //   return Response.json(
      //     { success: false, message: 'Invalid auth token. Login again.' },
      //     {
      //       status: 401,
      //       headers: {
      //         'Set-Cookie':
      //           'adminToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;',
      //         // prettier-ignore
      //         'Location': '/admin',
      //         // prettier-ignore
      //         'Refresh': '0;url=/admin',
      //       },
      //     },
      //   );
      // }

      return NextResponse.redirect(new URL('/admin', req.url));
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
