"use client";

import { Header } from "@/components/layout/header";
import { ChartCard } from "@/components/shared/misc";
import { useStore } from "@/lib/store";
import { calcRevenueAtRisk, isCompletedNotBilled, isEstimateOverdue, isJobBehindSchedule, isInvoiceOverdue } from "@/lib/selectors";
import { formatCurrency } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0f1b2d", "#c9622d", "#e07b3f", "#94a3b8", "#dc2626"];

export default function ReportsPage() {
  const { jobs, opportunities, invoices, risks, crews } = useStore();

  const revenueAtRisk = calcRevenueAtRisk(jobs, invoices, opportunities);
  const estimatesOutstanding = opportunities.filter((o) => !["Won", "Lost"].includes(o.stage)).length;
  const won = opportunities.filter((o) => o.stage === "Won").length;
  const lost = opportunities.filter((o) => o.stage === "Lost").length;
  const winRate = won + lost === 0 ? 0 : Math.round((won / (won + lost)) * 100);
  const completedThisMonth = jobs.filter((j) => ["Completed", "Invoiced", "Paid"].includes(j.status)).length;
  const behindSchedule = jobs.filter(isJobBehindSchedule).length;
  const overdueInvoices = invoices.filter(isInvoiceOverdue).length;
  const completedNotBilled = jobs.filter((j) => isCompletedNotBilled(j, invoices)).length;

  const crewCapacityData = crews.map((c) => ({ name: c.crewName, activeJobs: c.activeJobs }));
  const riskBySeverity = ["Low", "Medium", "High", "Critical"].map((s) => ({
    name: s,
    value: risks.filter((r) => r.severity === s).length,
  }));
  const riskByType = Array.from(new Set(risks.map((r) => r.type))).map((type) => ({
    name: type,
    value: risks.filter((r) => r.type === type).length,
  }));

  return (
    <div>
      <Header title="Operational Reports" subtitle="Track jobs, estimates, crew capacity, overdue invoices, and revenue at risk." />
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryStat label="Revenue at Risk" value={formatCurrency(revenueAtRisk)} />
          <SummaryStat label="Estimates Outstanding" value={estimatesOutstanding} />
          <SummaryStat label="Estimate Win Rate" value={`${winRate}%`} />
          <SummaryStat label="Jobs Completed" value={completedThisMonth} />
          <SummaryStat label="Jobs Behind Schedule" value={behindSchedule} />
          <SummaryStat label="Overdue Invoices" value={overdueInvoices} />
          <SummaryStat label="Completed Not Billed" value={completedNotBilled} />
          <SummaryStat label="Open Risks" value={risks.filter((r) => r.status !== "Resolved").length} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ChartCard title="Crew Capacity" description="Active jobs per crew">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={crewCapacityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="activeJobs" fill="#0f1b2d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Operational Risks by Severity">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={riskBySeverity} dataKey="value" nameKey="name" outerRadius={90} label>
                  {riskBySeverity.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Risks by Type" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskByType} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={180} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#c9622d" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-xl font-bold text-charcoal mt-1">{value}</p>
    </div>
  );
}
