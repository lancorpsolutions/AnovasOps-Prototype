"use client";

import { Header } from "@/components/layout/header";
import { MetricCard } from "@/components/shared/metric-card";
import { RiskCard } from "@/components/shared/risk-card";
import { CapacityBadge } from "@/components/shared/badges";
import { useStore } from "@/lib/store";
import {
  calcRevenueAtRisk,
  isCompletedNotBilled,
  isEstimateOverdue,
  isJobBehindSchedule,
  openRisks,
  topRisks,
} from "@/lib/selectors";
import { generateDailyBriefing } from "@/lib/aria";
import { OnboardingChecklist } from "@/components/shared/onboarding-checklist";
import { formatCurrency, timeAgo } from "@/lib/utils";
import {
  Briefcase,
  Clock,
  AlertOctagon,
  ShieldAlert,
  Receipt,
  DollarSign,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { jobs, opportunities, invoices, risks, crews, users, activity } = useStore();
  const briefing = generateDailyBriefing(risks, jobs, invoices, opportunities, crews);

  const activeJobs = jobs.filter((j) => !["Completed", "Invoiced", "Paid"].includes(j.status));
  const behindSchedule = jobs.filter(isJobBehindSchedule);
  const estimatesNeedingFollowUp = opportunities.filter(isEstimateOverdue);
  const openOpsRisks = openRisks(risks);
  const overdueInvoices = invoices.filter((i) => i.status === "Overdue" || i.status === "Escalated");
  const revenueAtRisk = calcRevenueAtRisk(jobs, invoices, opportunities);

  const newLeads = opportunities.filter((o) => o.stage === "Lead Received").length;
  const estimatesScheduled = opportunities.filter((o) => o.stage === "Estimate Scheduled").length;
  const estimatesOutstanding = opportunities.filter((o) => !["Won", "Lost"].includes(o.stage)).length;
  const proposalsSent = opportunities.filter((o) => o.stage === "Proposal Sent").length;
  const wonThisMonth = opportunities.filter((o) => o.stage === "Won").length;

  const scheduledThisWeek = jobs.filter((j) => j.status === "Scheduled").length;
  const waitingOnCustomer = jobs.filter((j) => j.status === "Waiting on Customer").length;
  const waitingOnMaterials = jobs.filter((j) => j.status === "Waiting on Materials").length;
  const completedNotBilled = jobs.filter((j) => isCompletedNotBilled(j, invoices)).length;

  const priorityIssues = topRisks(risks, 5);

  return (
    <div>
      <Header
        title="AnovasOS Command Center"
        subtitle="See what is happening, fix what is stuck, and protect revenue before small issues become bigger problems."
      />
      <div className="p-6 space-y-6">
        <OnboardingChecklist />
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 border-t-2 border-t-orange">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange to-navy flex items-center justify-center">
              <Sparkles size={15} className="text-white" />
            </span>
            <h3 className="text-sm font-semibold text-charcoal">A.R.I.A. — Daily Operations Briefing</h3>
          </div>
          <p className="text-sm text-gray-700 mb-4">{briefing.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Top Risks</p>
              {briefing.topRisks.length === 0 ? (
                <p className="text-xs text-gray-400">No open risks right now.</p>
              ) : (
                <ul className="space-y-2">
                  {briefing.topRisks.map((r, idx) => (
                    <li key={idx} className="flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`shrink-0 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          r.severity === "Critical" ? "bg-red-100 text-red-700" :
                          r.severity === "High" ? "bg-orange/10 text-orange" :
                          "bg-gray-200 text-gray-600"
                        }`}>{r.severity}</span>
                        <span className="text-sm text-gray-700 truncate">{r.text}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-medium text-red-600">{r.impact}</span>
                        <Link href={r.href} className="flex items-center gap-1 text-xs font-semibold text-orange hover:text-orange/80 transition-colors whitespace-nowrap">
                          Act <ArrowRight size={11} />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Recommended Actions</p>
              {briefing.recommendedActions.length === 0 ? (
                <p className="text-xs text-gray-400">No actions needed today.</p>
              ) : (
                <ul className="space-y-2">
                  {briefing.recommendedActions.map((a, idx) => (
                    <li key={idx} className="flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                      <div className="flex items-start gap-1.5 min-w-0">
                        <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-700">{a.text}</span>
                      </div>
                      <Link href={a.href} className="flex items-center gap-1 text-xs font-semibold text-orange hover:text-orange/80 transition-colors whitespace-nowrap shrink-0">
                        Go <ArrowRight size={11} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Link href="/anovasos/jobs" className="block rounded-xl hover:shadow-md hover:border-navy/30 transition">
            <MetricCard label="Active Jobs" value={activeJobs.length} icon={Briefcase} />
          </Link>
          <Link href="/anovasos/jobs" className="block rounded-xl hover:shadow-md hover:border-navy/30 transition">
            <MetricCard label="Jobs Behind Schedule" value={behindSchedule.length} icon={Clock} tone="warning" />
          </Link>
          <Link href="/anovasos/sales" className="block rounded-xl hover:shadow-md hover:border-navy/30 transition">
            <MetricCard label="Estimates Needing Follow-Up" value={estimatesNeedingFollowUp.length} icon={AlertOctagon} tone="warning" />
          </Link>
          <Link href="/anovasos/risks" className="block rounded-xl hover:shadow-md hover:border-navy/30 transition">
            <MetricCard label="Open Operational Risks" value={openOpsRisks.length} icon={ShieldAlert} tone="danger" />
          </Link>
          <Link href="/anovasos/invoices" className="block rounded-xl hover:shadow-md hover:border-navy/30 transition">
            <MetricCard label="Overdue Invoices" value={overdueInvoices.length} icon={Receipt} tone="danger" />
          </Link>
          <Link href="/anovasos/sales" className="block rounded-xl hover:shadow-md hover:border-navy/30 transition">
            <MetricCard label="Revenue At Risk" value={formatCurrency(revenueAtRisk)} icon={DollarSign} tone="danger" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-charcoal mb-4">Sales Snapshot</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <Stat label="New Leads" value={newLeads} />
              <Stat label="Estimates Scheduled" value={estimatesScheduled} />
              <Stat label="Estimates Outstanding" value={estimatesOutstanding} />
              <Stat label="Proposals Sent" value={proposalsSent} />
              <Stat label="Won This Month" value={wonThisMonth} />
            </div>
            <Link href="/anovasos/sales" className="text-xs text-orange font-medium mt-4 inline-block hover:underline">
              View Sales Pipeline →
            </Link>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-charcoal mb-4">Job Delivery Snapshot</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <Stat label="Active Jobs" value={activeJobs.length} />
              <Stat label="Scheduled This Week" value={scheduledThisWeek} />
              <Stat label="Jobs Behind Schedule" value={behindSchedule.length} warn />
              <Stat label="Waiting on Customer" value={waitingOnCustomer} />
              <Stat label="Waiting on Materials" value={waitingOnMaterials} />
              <Stat label="Completed Not Billed" value={completedNotBilled} warn />
            </div>
            <Link href="/anovasos/jobs" className="text-xs text-orange font-medium mt-4 inline-block hover:underline">
              View Jobs →
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-charcoal mb-4">Crew Capacity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {crews.map((crew) => {
              const lead = users.find((u) => u.id === crew.crewLeadId);
              return (
                <div key={crew.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-charcoal">{crew.crewName}</p>
                    <CapacityBadge status={crew.capacityStatus} />
                  </div>
                  <p className="text-xs text-gray-500">Lead: {lead?.name ?? "Open Lead"}</p>
                  <p className="text-xs text-gray-500">Active jobs: {crew.activeJobs}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-charcoal">Priority Issues</h3>
              <Link href="/anovasos/risks" className="text-xs text-orange font-medium hover:underline">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {priorityIssues.map((risk) => (
                <RiskCard key={risk.id} risk={risk} />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-charcoal mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activity.slice(0, 8).map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-3 text-sm border-b border-gray-100 pb-2 last:border-0">
                  <span className="text-gray-700">{a.message}</span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{timeAgo(a.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: number; warn?: boolean }) {
  return (
    <div>
      <p className={`text-xl font-bold ${warn && value > 0 ? "text-red-600" : "text-charcoal"}`}>{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
