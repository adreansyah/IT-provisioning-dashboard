'use client';

import { useEffect } from 'react';
import useAuth from '@/hooks/useAuthorized';
import { useRouter } from 'next/navigation';

export default function RedirectTo() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    useEffect(() => {
        if (isLoggedIn === "logout") {
            router.push('/login');
        }
        if (isLoggedIn === "login") {
            router.push('/dashboard');
        }
    }, [isLoggedIn, router]);
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-cyan-500 animate-spin" />
        </div>
    )

}
