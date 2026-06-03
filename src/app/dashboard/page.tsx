'use client';

import Breadcrumbs from "@/components/BreadCrumbs";
import KpiCard from "@/components/provisioning/KpiCard";
import Panel from "@/components/provisioning/Panel";
import RequestTable from "@/components/provisioning/RequestTable";
import SectionIntro from "@/components/provisioning/SectionIntro";
import {
  alertSummary,
  dashboardHighlights,
  dashboardKpis,
  notificationAlerts,
  monthlyTrend,
  provisioningRequests,
  quickActions,
  reportQueue,
  requestStatusSummary,
  teamPerformance,
  throughputSeries,
  workloadDistribution,
  workflowStages,
} from "@/lib/provisioning-data";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const statusColors = ["#0f766e", "#0891b2", "#1d4ed8", "#7c3aed", "#0f766e"];

export default function DashboardPage() {
  const items = [{ label: "Executive Dashboard", href: "/dashboard", current: true }];

  return (
    <div className="space-y-6 pb-10">
      <Breadcrumbs items={items as any} />

      <SectionIntro
        eyebrow="Enterprise Operations Dashboard"
        title="Operational control center for end-to-end IT provisioning"
        description="Pantau total request, SLA, workload tim, bottleneck approval, dan throughput harian dari satu command center yang padat informasi dan tetap nyaman di mobile."
        actions={
          <>
            <button className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800">
              Create Request
            </button>
            <button className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700">
              Generate SLA Report
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardKpis.map((metric) => (
          <KpiCard key={metric.title} metric={metric} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <Panel
          title="Daily Throughput & Completion Trend"
          description="Membandingkan volume request masuk dengan penyelesaian per hari."
        >
          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={throughputSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Bar dataKey="requests" fill="#0f766e" radius={[8, 8, 0, 0]} name="Incoming" />
                <Bar dataKey="completed" fill="#1d4ed8" radius={[8, 8, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Request Mix"
          description="Distribusi status request aktif untuk identifikasi bottleneck."
        >
          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={requestStatusSummary}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={4}
                >
                  {requestStatusSummary.map((entry, index) => (
                    <Cell key={entry.name} fill={statusColors[index % statusColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-2">
            {requestStatusSummary.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: statusColors[index % statusColors.length] }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <Panel
          title="Provisioning Request Management"
          description="Prioritas utama untuk monitoring request, assignee, workflow stage, dan SLA health."
          action={
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
              <Activity className="h-4 w-4" />
              Real-time sync enabled
            </span>
          }
        >
          <RequestTable requests={provisioningRequests} />
        </Panel>

        <Panel
          title="Critical Alert Center"
          description="Alert penting yang membutuhkan tindakan segera."
        >
          <div className="space-y-3">
            {notificationAlerts.map((alert) => (
              <div
                key={alert.title}
                className={`rounded-2xl border p-4 ${
                  alert.severity === "critical"
                    ? "border-rose-200 bg-rose-50"
                    : alert.severity === "warning"
                      ? "border-amber-200 bg-amber-50"
                      : "border-sky-200 bg-sky-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{alert.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{alert.detail}</p>
                  </div>
                  <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {alert.channel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {dashboardHighlights.map((item) => (
          <Panel key={item.title} title={item.title} className="h-full">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-slate-950 p-3 text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-950">{item.value}</p>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr_1fr]">
        <Panel
          title="Workflow Monitoring"
          description="Memantau stage aktif, current owner, dan waiting duration."
        >
          <div className="space-y-3">
            {workflowStages.map((stage) => (
              <div key={stage.stage} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{stage.stage}</p>
                    <p className="mt-1 text-sm text-slate-500">{stage.owner}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900">
                    {stage.count}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-400">
                  <span>Avg wait</span>
                  <span>{stage.averageWait}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Team Workload Distribution"
          description="Ringkasan beban kerja antar tim provisioning."
        >
          <div className="space-y-4">
            {workloadDistribution.map((team) => (
              <div key={team.team}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-800">{team.team}</span>
                  <span className="text-slate-500">
                    {team.open + team.inProgress} active · {team.completed} completed
                  </span>
                </div>
                <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="bg-slate-950" style={{ width: `${team.open}%` }} />
                  <div className="bg-cyan-600" style={{ width: `${team.inProgress}%` }} />
                  <div className="bg-emerald-500" style={{ width: `${team.completed / 2}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Alert Summary"
          description="Konsolidasi notifikasi untuk tim operasional."
        >
          <div className="grid gap-3">
            {alertSummary.map((alert) => (
              <div key={alert.label} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <div className="rounded-2xl bg-white p-3 text-slate-900 shadow-sm">
                  <alert.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{alert.label}</p>
                  <p className="text-xl font-semibold text-slate-950">{alert.count}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <Panel
          title="Team Performance Dashboard"
          description="Requests handled, average resolution time, productivity score, dan utilisasi."
        >
          <div className="space-y-4">
            {teamPerformance.map((team) => (
              <div key={team.team} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{team.team}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {team.requestsHandled} requests handled · Avg resolution {team.avgResolution}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Productivity {team.productivity}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-400">
                    <span>Utilization</span>
                    <span>{team.utilization}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-cyan-600 to-sky-500"
                      style={{ width: `${team.utilization}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Reporting Module"
          description="Status report operasional yang tersedia untuk stakeholder."
        >
          <div className="space-y-3">
            {reportQueue.map((report) => (
              <div key={report.title} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
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
            <div className="rounded-2xl bg-slate-950 p-4 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    Quick Actions
                  </p>
                  <div className="mt-3 grid gap-2">
                    {quickActions.map((action) => (
                      <div key={action} className="flex items-center gap-2 text-sm text-slate-200">
                        <Sparkles className="h-4 w-4 text-cyan-300" />
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-cyan-300" />
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <Panel
        title="Provisioning Trend Snapshot"
        description="Menggabungkan growth request dan stabilitas SLA dalam 6 bulan terakhir."
      >
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={throughputSeries.map((item, index) => ({
              label: monthlyTrend[index]?.label ?? item.label,
              requests: monthlyTrend[index]?.requests ?? item.requests,
              approvals: monthlyTrend[index]?.approvals ?? item.completed,
              sla: monthlyTrend[index]?.sla ?? 94,
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" domain={[85, 100]} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="requests"
                stroke="#0f766e"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="approvals"
                stroke="#1d4ed8"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="sla"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
}
