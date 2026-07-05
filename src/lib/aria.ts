import { Crew, Invoice, Job, OperationalRisk, SalesOpportunity } from "./types";
import {
  calcRevenueAtRisk,
  isCompletedNotBilled,
  isCrewOverloadedLive,
  isEstimateOverdue,
  isInvoiceOverdue,
  isJobBehindSchedule,
  openRisks,
} from "./selectors";
import { formatCurrency } from "./utils";

export interface DailyBriefing {
  summary: string;
  topRisks: { text: string; impact: string; href: string; severity: string }[];
  recommendedActions: { text: string; href: string }[];
}

const severityOrder: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };

export function generateDailyBriefing(
  risks: OperationalRisk[],
  jobs: Job[],
  invoices: Invoice[],
  opportunities: SalesOpportunity[],
  crews: Crew[]
): DailyBriefing {
  const open = openRisks(risks);
  const revenueAtRisk = calcRevenueAtRisk(jobs, invoices, opportunities);
  const behindSchedule = jobs.filter(isJobBehindSchedule);
  const overdueInvoices = invoices.filter(isInvoiceOverdue);
  const overdueEstimates = opportunities.filter(isEstimateOverdue);
  const completedNotBilled = jobs.filter((j) => isCompletedNotBilled(j, invoices));
  const overloadedCrews = crews.filter((c) => isCrewOverloadedLive(c, jobs));

  const summary = `You have ${open.length} open risk${open.length === 1 ? "" : "s"} totaling ${formatCurrency(
    revenueAtRisk
  )} in revenue at risk, with ${behindSchedule.length} job${behindSchedule.length === 1 ? "" : "s"} behind schedule and ${overdueInvoices.length} overdue invoice${overdueInvoices.length === 1 ? "" : "s"}.`;

  const sortedRisks = open
    .slice()
    .sort((a, b) => {
      const sevDiff = severityOrder[a.severity] - severityOrder[b.severity];
      if (sevDiff !== 0) return sevDiff;
      return b.revenueAtRisk - a.revenueAtRisk;
    })
    .slice(0, 3);

  const topRisks = sortedRisks.map((r) => {
    const job = jobs.find((j) => j.id === r.jobId);
    const context = job ? job.jobName : r.customerId ?? "Unassigned";
    return {
      text: `${r.type} — ${context}`,
      impact: formatCurrency(r.revenueAtRisk),
      severity: r.severity,
      href: "/anovasos/risks",
    };
  });

  const recommendedActions: { text: string; href: string }[] = [];
  if (overloadedCrews.length > 0) {
    recommendedActions.push({
      text: `Reassign jobs from ${overloadedCrews.map((c) => c.crewName).join(", ")} to balance crew workload.`,
      href: "/anovasos/crews",
    });
  }
  if (completedNotBilled.length > 0) {
    recommendedActions.push({
      text: `Create invoices for ${completedNotBilled.length} completed job${completedNotBilled.length === 1 ? "" : "s"} that haven't been billed.`,
      href: "/anovasos/invoices",
    });
  }
  if (overdueEstimates.length > 0) {
    recommendedActions.push({
      text: `Follow up on ${overdueEstimates.length} overdue estimate${overdueEstimates.length === 1 ? "" : "s"} stuck in the pipeline.`,
      href: "/anovasos/sales",
    });
  }
  if (overdueInvoices.length > 0) {
    recommendedActions.push({
      text: `Send payment reminders for ${overdueInvoices.length} overdue invoice${overdueInvoices.length === 1 ? "" : "s"}.`,
      href: "/anovasos/invoices",
    });
  }

  return { summary, topRisks, recommendedActions: recommendedActions.slice(0, 4) };
}
