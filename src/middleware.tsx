// src/middleware.js (untuk Next.js 12.2+ dan App/Pages Router)
import { NextResponse } from 'next/server';

const protectedRoutes = [
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/settings',
    '/forms',
    '/analytics',
    '/table'
];
const publicRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request: { nextUrl: { clone?: any; pathname?: any; }; cookies: { get: (arg0: string) => any; }; }) {
    const { pathname } = request.nextUrl;
    const isAuthenticated = request.cookies.get('session_token') ? true : false; // Ganti dengan logika cek token sesi Anda

    // Jika pengguna tidak terautentikasi dan mencoba mengakses rute terlindungi
    if (!isAuthenticated && protectedRoutes.includes(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = '/login'; // Arahkan ke halaman login
        return NextResponse.redirect(url);
    }

    // Jika pengguna sudah terautentikasi dan mencoba mengakses rute otorisasi (login/register)
    if (isAuthenticated && publicRoutes.includes(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = '/'; // Arahkan ke dashboard
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Konfigurasi matcher untuk middleware
export const config = () => ({
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register',
        '/forgot-password',
        '/forms/:path*',
        '/analytics/:path*',
        '/table/:path*'
    ], // Terapkan middleware pada rute ini
});