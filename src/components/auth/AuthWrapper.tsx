'use client';
import useAuth from "@/hooks/useAuthorized";
import Header from "../Header/Header";
import SidebarComponent from "../Sidemenu";
import { useState } from "react";

export default function AuthWrapper({ children }: {
    children: any
}) {
    const [bgCollapse, setbgCollapse] = useState<boolean>(true);
    const { isLoggedIn } = useAuth();

    if (isLoggedIn === 'logout')
        return (
            <main className="w-full flex-1">
                {children}
            </main>)

    if (isLoggedIn === 'login')
        return (
            <div className="theme-page min-h-screen">
                <Header />
                <div className="flex w-full gap-4 px-4 py-4 sm:px-5 lg:gap-5 lg:px-6">
                    <div className={`relative hidden transition-all duration-300 lg:block ${bgCollapse ? 'w-[15.75rem]' : 'w-[5rem]'} pb-6`}>
                        <div className="fixed left-3 top-[5.25rem] z-30 xl:left-4">
                            <SidebarComponent setbgCollapse={setbgCollapse} bgCollapse={bgCollapse} />
                        </div>
                    </div>
                    <main className="relative z-10 w-full flex-1">
                        <div className="theme-main-surface flex min-h-[calc(100vh-6rem)] flex-col gap-4 rounded-[32px] border p-4 backdrop-blur-xl sm:p-6 lg:p-7">
                            <div className="lg:hidden">
                                <SidebarComponent setbgCollapse={setbgCollapse} bgCollapse={bgCollapse} />
                            </div>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        )

    return (
        <main className="theme-page flex min-h-screen items-center justify-center">
            Loading session...
        </main>
    );
}
