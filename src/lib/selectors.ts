import { Crew, Invoice, Job, OperationalRisk, SalesOpportunity } from "./types";
import { isPast } from "./utils";

export function isJobBehindSchedule(job: Job): boolean {
  return isPast(job.scheduledEndDate) && !["Completed", "Invoiced", "Paid"].includes(job.status);
}

export function isEstimateOverdue(opp: SalesOpportunity): boolean {
  return isPast(opp.followUpDate) && !["Won", "Lost"].includes(opp.stage);
}

export function isInvoiceOverdue(invoice: Invoice): boolean {
  return isPast(invoice.dueDate) && invoice.status !== "Paid";
}

export function isCompletedNotBilled(job: Job, invoices: Invoice[]): boolean {
  if (job.status !== "Completed") return false;
  const invoice = invoices.find((i) => i.jobId === job.id);
  return !invoice || invoice.status === "Draft";
}

export function isCrewOverloaded(crew: Crew): boolean {
  return crew.capacityStatus === "Overloaded" || crew.activeJobs > 5;
}

export function calcRevenueAtRisk(jobs: Job[], invoices: Invoice[], opportunities: SalesOpportunity[]): number {
  const delayedJobValue = jobs.filter(isJobBehindSchedule).reduce((sum, j) => sum + j.jobValue, 0);
  const overdueInvoiceValue = invoices.filter(isInvoiceOverdue).reduce((sum, i) => sum + i.amount, 0);
  const outstandingEstimateValue = opportunities.filter(isEstimateOverdue).reduce((sum, o) => sum + o.estimatedValue, 0);
  return delayedJobValue + overdueInvoiceValue + outstandingEstimateValue;
}

export function openRisks(risks: OperationalRisk[]): OperationalRisk[] {
  return risks.filter((r) => r.status !== "Resolved");
}

export function topRisks(risks: OperationalRisk[], n = 5): OperationalRisk[] {
  const severityOrder: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  return openRisks(risks)
    .slice()
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
    .slice(0, n);
}
