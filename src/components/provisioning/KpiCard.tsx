import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { KpiMetric } from "@/lib/provisioning-data";

const toneStyles: Record<KpiMetric["tone"], string> = {
  blue: "from-sky-500/18 to-cyan-500/8 text-sky-700 ring-sky-200",
  teal: "from-teal-500/18 to-emerald-500/8 text-teal-700 ring-teal-200",
  amber: "from-amber-500/18 to-orange-500/8 text-amber-700 ring-amber-200",
  red: "from-rose-500/18 to-red-500/8 text-rose-700 ring-rose-200",
};

export default function KpiCard({ metric }: { metric: KpiMetric }) {
  const isPositive = metric.direction === "up";

  return (
    <article
      className={`min-h-[118px] rounded-3xl border border-white/60 bg-gradient-to-br ${toneStyles[metric.tone]} p-4 ring-1`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {metric.title}
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{metric.value}</p>
        </div>
        <span
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl ${
            isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
          }`}
        >
          {isPositive ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
          }`}
        >
          {metric.trend}
        </span>
        <span className="text-right text-xs text-slate-500">{metric.helper}</span>
      </div>
    </article>
  );
}
