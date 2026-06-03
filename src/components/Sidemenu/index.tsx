'use client';

import { useEffect, useState } from "react";
import {
  BarChart3,
  BellRing,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  ChevronsLeftRightEllipsis,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Route,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarComponentProps {
  setbgCollapse?: (value: boolean) => void;
  bgCollapse: boolean;
}

const navigationItems = [
  { key: "/dashboard", label: "Executive Dashboard", icon: LayoutDashboard },
  { key: "/forms", label: "Request Management", icon: ClipboardList },
  { key: "/workflow", label: "Workflow Monitoring", icon: Route },
  { key: "/analytics", label: "Operational Analytics", icon: BarChart3 },
  { key: "/table", label: "Provisioning Queue", icon: FolderKanban },
  { key: "/reports", label: "Reporting Module", icon: FolderKanban },
  { key: "/notifications", label: "Notification Center", icon: BellRing },
];

export default function SidebarComponent({
  setbgCollapse,
  bgCollapse,
}: SidebarComponentProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
        setbgCollapse?.(false);
      } else {
        setCollapsed(false);
        setbgCollapse?.(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    setbgCollapse?.(!next);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="fixed bottom-5 left-4 z-50 inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_18px_40px_-18px_rgba(15,23,42,0.9)] ring-1 ring-white/10 transition hover:bg-slate-900 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      ) : null}

      {isMobile && mobileMenuOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      ) : null}

      <aside
        className={`overflow-hidden rounded-[30px] border border-slate-800/70 bg-[linear-gradient(180deg,#020617_0%,#020817_100%)] text-white shadow-[0_30px_70px_-45px_rgba(15,23,42,0.95)] transition-all duration-300 ${
          isMobile
            ? `fixed left-4 top-20 z-50 w-[18rem] ${mobileMenuOpen ? "translate-x-0" : "-translate-x-[120%]"}`
            : collapsed
              ? "z-30 w-[5rem]"
              : "z-30 w-[15.75rem]"
        }`}
      >
        <div className={`flex items-center border-b border-white/8 ${collapsed && !isMobile ? "justify-center px-3 py-5" : "justify-between p-4"}`}>
          {(!collapsed || isMobile) ? (
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Provisioning</p>
              <h2 className="mt-1 text-lg font-semibold text-white">Operations Hub</h2>
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/6">
              <ChevronsLeftRightEllipsis className="h-5 w-5 text-cyan-300" />
            </div>
          )}

          {isMobile ? (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl text-slate-300"
            >
              <X className="h-5 w-5" />
            </button>
          ) : !collapsed ? (
            <button
              onClick={toggleCollapse}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl bg-white/8 text-slate-100 ring-1 ring-white/8 transition hover:bg-white/12"
            >
              <PanelLeftClose className="h-5 w-5" />
            </button>
          ) : null}
        </div>

        <div className="p-3">
          <div className={`mb-4 rounded-[28px] bg-white/5 ring-1 ring-white/6 ${collapsed && !isMobile ? "px-2 py-5 text-center" : "p-4"}`}>
            {(!collapsed || isMobile) ? (
              <>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Today</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-300">93.8%</p>
                <p className="mt-1 text-sm text-slate-300">SLA achievement across active provisioning requests.</p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">SLA</span>
                <p className="text-2xl font-semibold text-cyan-300">93%</p>
              </div>
            )}
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const active = pathname === item.key;
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
                  onClick={() => handleNavigation(item.key)}
                  title={collapsed && !isMobile ? item.label : undefined}
                  className={`flex w-full items-center gap-3 rounded-[24px] px-3 py-3 text-left text-sm transition ${
                    active
                      ? "bg-cyan-400 text-slate-950 shadow-[0_12px_30px_-16px_rgba(34,211,238,0.9)]"
                      : "text-slate-300 hover:bg-white/8 hover:text-white"
                  } ${collapsed && !isMobile ? "justify-center px-2.5 py-3.5" : ""}`}
                >
                  <Icon className={`h-5 w-5 shrink-0 ${active ? "text-slate-950" : "text-slate-300"}`} />
                  {(!collapsed || isMobile) ? <span className="font-medium">{item.label}</span> : null}
                </button>
              );
            })}
          </nav>

          {!isMobile ? (
            <div className={`pt-4 ${collapsed ? "flex justify-center" : ""}`}>
              <button
                onClick={toggleCollapse}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[24px] border border-white/8 bg-white/6 text-slate-200 transition hover:bg-white/10 ${
                  collapsed ? "min-w-11 px-0" : "w-full px-4 py-3"
                }`}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
                {!collapsed ? <span className="text-sm font-medium">Collapse menu</span> : null}
              </button>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
}
