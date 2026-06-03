'use client';

import type { ProvisioningRequest } from "@/lib/provisioning-data";
import { SlaBadge, StatusBadge } from "./StatusBadge";

export default function RequestTable({
  requests,
}: {
  requests: ProvisioningRequest[];
}) {
  return (
    <div className="space-y-4">
      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-xs uppercase tracking-[0.16em] text-slate-500">
              <th className="px-4 py-2">Request</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Assignee</th>
              <th className="px-4 py-2">Workflow</th>
              <th className="px-4 py-2">SLA</th>
              <th className="px-4 py-2">Updated</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="rounded-2xl bg-slate-50 text-sm text-slate-700">
                <td className="rounded-l-2xl px-4 py-4 align-top">
                  <div className="font-semibold text-slate-900">{request.id}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {request.requester} · {request.category}
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <div>{request.department}</div>
                  <div className="mt-1 text-xs text-slate-500">{request.priority} priority</div>
                </td>
                <td className="px-4 py-4 align-top">
                  <StatusBadge status={request.status} />
                </td>
                <td className="px-4 py-4 align-top">
                  <div>{request.assignee}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {request.processingHours}h processing
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <div>{request.workflowStage}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {request.waitingHours}h waiting
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <SlaBadge health={request.slaHealth} />
                </td>
                <td className="rounded-r-2xl px-4 py-4 align-top">
                  <div>{request.lastUpdated}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Target {request.targetCompletion}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 lg:hidden">
        {requests.map((request) => (
          <article
            key={request.id}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{request.id}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {request.requester} · {request.department}
                </p>
              </div>
              <StatusBadge status={request.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Assignee</p>
                <p className="mt-1">{request.assignee}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">SLA</p>
                <div className="mt-1">
                  <SlaBadge health={request.slaHealth} />
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Workflow</p>
                <p className="mt-1">{request.workflowStage}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Updated</p>
                <p className="mt-1">{request.lastUpdated}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
