'use client';

import type { RequestStatus, SlaHealth } from "@/lib/provisioning-data";

const statusStyles: Record<RequestStatus, string> = {
  New: "bg-slate-100 text-slate-700 border-slate-200",
  Submitted: "bg-blue-100 text-blue-700 border-blue-200",
  "Waiting Approval": "bg-amber-100 text-amber-800 border-amber-200",
  Approved: "bg-cyan-100 text-cyan-800 border-cyan-200",
  "In Progress": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Provisioned: "bg-violet-100 text-violet-800 border-violet-200",
  Completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Rejected: "bg-rose-100 text-rose-800 border-rose-200",
  Cancelled: "bg-zinc-100 text-zinc-700 border-zinc-200",
};

const slaStyles: Record<SlaHealth, string> = {
  "On Track": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "At Risk": "bg-amber-100 text-amber-800 border-amber-200",
  Breached: "bg-rose-100 text-rose-800 border-rose-200",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export function SlaBadge({ health }: { health: SlaHealth }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${slaStyles[health]}`}
    >
      {health}
    </span>
  );
}
