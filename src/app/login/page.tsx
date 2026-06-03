'use client';

import { useTheme } from "@/components/theme/ThemeProvider";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Moon, SunMedium } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { theme, mounted, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 900));
    document.cookie = `session_token=${encodeURIComponent("demo-session")}; path=/; max-age=${60 * 60 * 8}`;
    window.dispatchEvent(new Event("auth-change"));
    setIsLoading(false);
    router.replace("/dashboard");
  };

  return (
    <div className="theme-header relative min-h-screen overflow-hidden px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
      <button
        onClick={toggleTheme}
        className="absolute right-4 top-4 z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur transition hover:bg-white/15"
        aria-label="Toggle theme"
      >
        {!mounted || theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <SunMedium className="h-5 w-5" />
        )}
      </button>
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="rounded-[28px] bg-white/92 px-5 py-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] backdrop-blur">
              <Image
                src="/assets/images/telkomsel-logo.png"
                alt="Telkomsel"
                width={220}
                height={88}
                className="h-auto w-[170px] sm:w-[220px]"
                priority
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            Internal platform for operations, provisioning, and SLA visibility
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
              Enterprise Operations Dashboard
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Satu pusat kendali untuk memonitor seluruh siklus IT provisioning.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200">
              Kelola request submission, approval workflow, resource allocation, throughput, SLA, dan escalation dalam satu dashboard modern yang tetap responsif di mobile.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["99.9%", "Platform uptime target"],
              ["< 3s", "Dashboard initial load"],
              ["30%", "Target SLA compliance lift"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                <p className="text-2xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-[0_30px_100px_-50px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-8">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Secure Sign In</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Access provisioning workspace</h2>
            <p className="mt-2 text-sm text-slate-300">
              Demo login ini akan membuat session lokal agar aplikasi bisa langsung direview.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-100">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                  placeholder="ops@company.com"
                  className="min-h-12 w-full rounded-2xl border border-white/15 bg-slate-950/25 pl-12 pr-4 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-100">Password</label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, password: event.target.value }))
                  }
                  required
                  placeholder="Enter your password"
                  className="min-h-12 w-full rounded-2xl border border-white/15 bg-slate-950/25 pl-12 pr-12 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950" />
              ) : (
                <>
                  Continue to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
