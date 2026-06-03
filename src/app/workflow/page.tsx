'use client';

import Breadcrumbs from "@/components/BreadCrumbs";
import Panel from "@/components/provisioning/Panel";
import SectionIntro from "@/components/provisioning/SectionIntro";
import { provisioningRequests, workflowStages } from "@/lib/provisioning-data";
import { Clock3, TimerReset, UserRound } from "lucide-react";

export default function WorkflowPage() {
  const items = [{ label: "Workflow Monitoring", href: "/workflow", current: true }];

  return (
    <div className="space-y-6 pb-10">
      <Breadcrumbs items={items as any} />

      <SectionIntro
        eyebrow="Workflow Monitoring"
        title="Pantau stage, assignee, approval status, dan durasi tunggu"
        description="Halaman ini menyorot lifecycle provisioning secara end-to-end untuk membantu operations team mengidentifikasi workflow yang stuck, approval yang melambat, dan beban antar stage."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
        <Panel
          title="Current Workflow Stages"
          description="Queue aktif per stage untuk memetakan beban operasional."
        >
          <div className="space-y-3">
            {workflowStages.map((stage) => (
              <div key={stage.stage} className="rounded-3xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{stage.stage}</p>
                    <p className="mt-1 text-sm text-slate-500">{stage.owner}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900">
                    {stage.count} requests
                  </span>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock3 className="h-4 w-4" />
                      Average wait
                    </div>
                    <p className="mt-2 font-semibold text-slate-900">{stage.averageWait}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <UserRound className="h-4 w-4" />
                      Current owner
                    </div>
                    <p className="mt-2 font-semibold text-slate-900">{stage.owner}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <TimerReset className="h-4 w-4" />
                      Stage load
                    </div>
                    <p className="mt-2 font-semibold text-slate-900">{stage.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Stuck & Escalation Candidates"
          description="Request yang menunggu terlalu lama dan berpotensi melanggar SLA."
        >
          <div className="space-y-3">
            {provisioningRequests
              .filter((request) => request.waitingHours >= 5 || request.slaHealth !== "On Track")
              .map((request) => (
                <div key={request.id} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{request.id}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {request.department} · {request.category}
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                      {request.waitingHours}h waiting
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Current stage</p>
                      <p className="mt-1 font-medium text-slate-900">{request.workflowStage}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Assignee</p>
                      <p className="mt-1 font-medium text-slate-900">{request.assignee}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
