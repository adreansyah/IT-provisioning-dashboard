'use client';

import { getCookie } from "@/lib";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const getAuthStatus = () => {
    const token = getCookie('session_token');
    return token ? 'login' : 'logout';
};

export default function useAuth() {
    const pathname = usePathname();
    const [isLoggedIn, setLoggedIn] = useState('waiting');

    useEffect(() => {
        const syncAuthState = () => {
            setLoggedIn(getAuthStatus());
        };

        syncAuthState();
        window.addEventListener('auth-change', syncAuthState);
        window.addEventListener('focus', syncAuthState);

        return () => {
            window.removeEventListener('auth-change', syncAuthState);
            window.removeEventListener('focus', syncAuthState);
        };
    }, [pathname]);

    return {
        isLoggedIn
    }
}
