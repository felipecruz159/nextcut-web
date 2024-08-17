import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
   const cookieHeader = request.headers.get('cookie');
   const cookies = parseCookies(cookieHeader);
   const token = cookies['next-auth.session-token'];
   console.log('Token:', token);

   const protectedRoutes = ['/login', '/register'];
   const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

   if (token && isProtectedRoute) {
      console.log('Usuário autenticado tentando acessar rota protegida. Redirecionando para /');
      return NextResponse.redirect(new URL('/', request.url));
   }

   return NextResponse.next();
}

function parseCookies(cookieHeader: string | null) {
   const cookies: Record<string, string> = {};
   if (cookieHeader) {
      cookieHeader.split(';').forEach(cookie => {
         const [name, ...rest] = cookie.split('=');
         cookies[name.trim()] = rest.join('=').trim();
      });
   }
   return cookies;
}

export const config = {
   matcher: ['/login/:path*', '/register/:path*'],
};
