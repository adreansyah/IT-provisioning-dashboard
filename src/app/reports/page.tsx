'use client';

import Breadcrumbs from "@/components/BreadCrumbs";
import Panel from "@/components/provisioning/Panel";
import SectionIntro from "@/components/provisioning/SectionIntro";
import { reportCards, reportQueue } from "@/lib/provisioning-data";
import { FileText, RefreshCw } from "lucide-react";

export default function ReportsPage() {
  const items = [{ label: "Reporting Module", href: "/reports", current: true }];

  return (
    <div className="space-y-6 pb-10">
      <Breadcrumbs items={items as any} />

      <SectionIntro
        eyebrow="Reporting Module"
        title="Daily, weekly, monthly, SLA, dan team performance reporting"
        description="Modul reporting ini dirancang untuk mengurangi manual reporting, memberi stakeholder akses cepat ke laporan operasional, dan menjaga keputusan berbasis data tetap konsisten."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {reportCards.map((report) => (
          <Panel key={report.title} title={report.title} className="h-full">
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-950 p-3 text-white">
                <FileText className="h-5 w-5" />
              </div>
              <p className="text-sm leading-6 text-slate-600">{report.description}</p>
              <div className="grid gap-2 text-sm text-slate-600">
                <div className="flex justify-between gap-3">
                  <span>Owner</span>
                  <span className="font-semibold text-slate-900">{report.owner}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Cadence</span>
                  <span className="font-semibold text-slate-900">{report.cadence}</span>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel
        title="Report Generation Queue"
        description="Status hasil generate report yang siap dibagikan ke stakeholder."
      >
        <div className="grid gap-3">
          {reportQueue.map((report) => (
            <div key={report.title} className="rounded-3xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{report.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{report.generatedAt}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
            <RefreshCw className="h-4 w-4" />
            Generate Monthly Report
          </button>
          <button className="inline-flex min-h-11 items-center rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
            Export SLA Summary
          </button>
        </div>
      </Panel>
    </div>
  );
}
