'use client';

import { notificationAlerts } from "@/lib/provisioning-data";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Bell, ChevronDown, LogOut, Moon, Settings, ShieldCheck, SunMedium, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const router = useRouter();
  const { theme, mounted, toggleTheme } = useTheme();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    document.cookie = "session_token=; Max-Age=0; path=/";
    window.dispatchEvent(new Event("auth-change"));
    router.replace("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (notificationRef.current && !notificationRef.current.contains(target)) {
        setNotificationOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="theme-header sticky top-0 z-40 border-b border-white/10 text-white shadow-xl">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/images/telkomsel-logo.png"
            alt="Telkomsel"
            width={60}
            height={60}
            className="h-[50px] w-[50px] object-contain sm:h-[60px] sm:w-[60px]"
            priority
          />
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Enterprise Ops</p>
            <p className="text-sm text-white/80">
              Centralized monitoring for provisioning, SLA, and workload control
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
            aria-label="Toggle theme"
          >
            {!mounted || theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <SunMedium className="h-5 w-5" />
            )}
          </button>

          <div className="hidden items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-sm text-white/90 md:flex">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Platform health 99.9%
          </div>

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                setNotificationOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-400" />
            </button>

            {notificationOpen ? (
              <div className="absolute right-0 mt-3 w-[22rem] overflow-hidden rounded-[28px] border border-white/12 bg-slate-950/96 shadow-2xl backdrop-blur">
                <div className="border-b border-white/8 px-5 py-4">
                  <p className="text-sm font-semibold text-white">Notifications</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {notificationAlerts.length} active operational alerts
                  </p>
                </div>
                <div className="max-h-96 overflow-y-auto p-3">
                  {notificationAlerts.map((alert) => (
                    <div
                      key={alert.title}
                      className="mb-2 rounded-2xl bg-white/5 p-4 last:mb-0"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">{alert.title}</p>
                          <p className="mt-1 text-xs leading-5 text-slate-300">{alert.detail}</p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                            alert.severity === "critical"
                              ? "bg-rose-500/20 text-rose-200"
                              : alert.severity === "warning"
                                ? "bg-amber-500/20 text-amber-200"
                                : "bg-sky-500/20 text-sky-200"
                          }`}
                        >
                          {alert.channel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setNotificationOpen(false);
              }}
              className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-2 transition hover:bg-white/15"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold">Provisioning Lead</p>
                <p className="text-xs text-white/70">Operations Team</p>
              </div>
              <ChevronDown className={`h-4 w-4 text-white/80 transition ${profileOpen ? "rotate-180" : ""}`} />
            </button>

            {profileOpen ? (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-[28px] border border-white/12 bg-slate-950/96 shadow-2xl backdrop-blur">
                <div className="border-b border-white/8 px-5 py-4">
                  <p className="text-sm font-semibold text-white">Provisioning Lead</p>
                  <p className="mt-1 text-xs text-slate-400">operations.team@company.local</p>
                </div>
                <div className="p-3">
                  <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/8">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/8">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-rose-200 transition hover:bg-rose-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
