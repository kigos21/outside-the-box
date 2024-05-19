import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token');
  const adminToken = request.cookies.get('adminToken');

  // Handle /login and /register redirections
  if (
    (pathname === '/login' || pathname === '/register') &&
    (token || adminToken)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Handle /reservation/* redirections
  if (pathname.startsWith('/reservation') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Handle /admin/* redirections
  if (pathname.startsWith('/admin') && !adminToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/reservation/:path*',
    '/admin',
    '/admin/main/:path*',
  ],
};

// import { NextRequest, NextResponse } from 'next/server';

// // This function can be marked `async` if using `await` inside
// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;

//   console.log(JSON.stringify({ reqUrl: req.url }));

//   if (path === '/login' || path === '/register') {
//     if (req.cookies.has('token')) {
//       return NextResponse.redirect(new URL('/services', req.url));
//     } else if (req.cookies.has('adminToken')) {
//       return NextResponse.redirect(new URL('/admin/main', req.url));
//     }
//   } else if (path.startsWith('/reservation')) {
//     // check if token is present in cookies
//     if (!req.cookies.has('token')) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   // admin-side middleware logic
//   else if (path === '/admin') {
//     return NextResponse.redirect(new URL('/login', req.url));
//   } else if (path.startsWith('/admin/main')) {
//     if (!req.cookies.has('adminToken')) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   return NextResponse.next();
// }

// // ADD HERE PROTECTED PATHS
// // matcher can accept regexp of pathname
// export const config = {
//   matcher: [
//     // client-side
//     '/login',
//     '/register',
//     '/reservation/:path*',

//     // admin-side
//     '/admin',
//     '/admin/main/:path*',
//   ],
// };
