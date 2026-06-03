import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/settings',
    '/forms',
    '/analytics',
    '/table',
    '/workflow',
    '/reports',
    '/notifications'
];
const publicRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAuthenticated = !!request.cookies.get('session_token');

    if (!isAuthenticated && protectedRoutes.includes(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (isAuthenticated && publicRoutes.includes(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register',
        '/forgot-password',
        '/forms/:path*',
        '/analytics/:path*',
        '/table/:path*',
        '/workflow/:path*',
        '/reports/:path*',
        '/notifications/:path*'
    ],
};
