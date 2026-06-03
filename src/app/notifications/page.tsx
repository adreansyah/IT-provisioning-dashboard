'use client';

import Breadcrumbs from "@/components/BreadCrumbs";
import Panel from "@/components/provisioning/Panel";
import SectionIntro from "@/components/provisioning/SectionIntro";
import { alertSummary, notificationAlerts } from "@/lib/provisioning-data";

export default function NotificationsPage() {
  const items = [{ label: "Notification Center", href: "/notifications", current: true }];

  return (
    <div className="space-y-6 pb-10">
      <Breadcrumbs items={items as any} />

      <SectionIntro
        eyebrow="Notification Center"
        title="Critical alerts untuk SLA breach, stuck workflow, pending load, dan escalations"
        description="Pusat notifikasi ini merangkum alert lintas channel seperti Email, Microsoft Teams, Slack, dan Telegram agar tim operasional bisa merespons lebih cepat."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {alertSummary.map((alert) => (
          <Panel key={alert.label} title={alert.label}>
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-slate-950 p-3 text-white">
                <alert.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-slate-950">{alert.count}</p>
                <p className="mt-1 text-sm text-slate-500">Current active alerts</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel
        title="Alert Feed"
        description="Daftar notifikasi yang perlu diprioritaskan oleh provisioning team dan operations team."
      >
        <div className="space-y-3">
          {notificationAlerts.map((alert) => (
            <div
              key={alert.title}
              className={`rounded-3xl border p-4 ${
                alert.severity === "critical"
                  ? "border-rose-200 bg-rose-50"
                  : alert.severity === "warning"
                    ? "border-amber-200 bg-amber-50"
                    : "border-sky-200 bg-sky-50"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{alert.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{alert.detail}</p>
                </div>
                <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                  {alert.channel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
