'use client';

import Breadcrumbs from "@/components/BreadCrumbs";
import Panel from "@/components/provisioning/Panel";
import SectionIntro from "@/components/provisioning/SectionIntro";
import {
  departmentTrend,
  monthlyTrend,
  teamPerformance,
  workloadDistribution,
} from "@/lib/provisioning-data";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const colors = ["#0f766e", "#1d4ed8", "#f59e0b", "#7c3aed", "#ef4444"];

export default function AnalyticsPage() {
  const items = [{ label: "Operational Analytics", href: "/analytics", current: true }];

  return (
    <div className="space-y-6 pb-10">
      <Breadcrumbs items={items as any} />

      <SectionIntro
        eyebrow="Analytics & SLA"
        title="Operational analytics untuk throughput, department trend, dan performa tim"
        description="Halaman ini fokus pada insight yang dibutuhkan management dan operations team: trend request harian-bulanan, SLA achievement, category movement, serta kapasitas tim provisioning."
      />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Monthly Provisioning Trend"
          description="Requests per month, approvals completed, dan SLA achievement."
        >
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" stroke="#64748b" />
                <YAxis yAxisId="left" stroke="#64748b" />
                <YAxis yAxisId="right" orientation="right" domain={[85, 100]} stroke="#64748b" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#0f766e" strokeWidth={3} />
                <Line yAxisId="left" type="monotone" dataKey="approvals" stroke="#1d4ed8" strokeWidth={3} />
                <Line yAxisId="right" type="monotone" dataKey="sla" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Department Trend"
          description="Departemen dengan volume provisioning tertinggi."
        >
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentTrend}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {departmentTrend.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-2">
            {departmentTrend.map((department, index) => (
              <div key={department.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  {department.name}
                </div>
                <span className="font-semibold text-slate-900">{department.value}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <Panel
          title="SLA Stability Window"
          description="Menjaga pencapaian SLA tetap di atas target 90%."
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="slaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f766e" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0f766e" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" stroke="#64748b" />
                <YAxis domain={[85, 100]} stroke="#64748b" />
                <Tooltip />
                <Area type="monotone" dataKey="sla" stroke="#0f766e" fill="url(#slaGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
            SLA achievement stabil pada rentang 91%-95% dan menunjukkan improvement konsisten sejak Januari.
          </div>
        </Panel>

        <Panel
          title="Team Capacity & Throughput"
          description="Memetakan keseimbangan open workload, in-progress, dan closed volume."
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="team" stroke="#64748b" hide />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="open" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="inProgress" fill="#0f766e" radius={[6, 6, 0, 0]} />
                <Bar dataKey="completed" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {teamPerformance.map((team) => (
              <div key={team.team} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{team.team}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {team.requestsHandled} handled · {team.avgResolution} avg
                    </p>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900">
                    {team.productivity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel
        title="Executive Notes"
        description="Ringkasan insight untuk management review."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <p className="font-semibold text-slate-900">Positive trend</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Volume request bertumbuh, tetapi completion rate juga ikut naik sehingga backlog tetap terkendali.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-semibold text-slate-900">Attention area</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Security Review memiliki resolution time paling tinggi dan layak jadi fokus otomasi approval berikutnya.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-semibold text-slate-900">Operational impact</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Dengan SLA stabil di atas 90%, dashboard ini sudah mendukung objective pengurangan reporting manual dan percepatan decision making.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
