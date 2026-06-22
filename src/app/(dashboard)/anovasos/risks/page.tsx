"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { FilterDropdown, EmptyState } from "@/components/shared/misc";
import { SeverityBadge, StatusBadge } from "@/components/shared/badges";
import { useCustomerName, useJobName, useStore, useUserName } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { RiskType, RiskStatus, Severity } from "@/lib/types";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const riskTypes: RiskType[] = [
  "Overdue Estimate Follow-Up",
  "Job Behind Schedule",
  "Missing Crew Assignment",
  "Waiting on Customer",
  "Waiting on Materials",
  "Blocked Job",
  "Overdue Invoice",
  "Escalated Customer Issue",
  "Overloaded Crew",
  "Completed Not Billed",
];
const severities: Severity[] = ["Low", "Medium", "High", "Critical"];
const statuses: RiskStatus[] = ["Open", "Monitoring", "Resolved"];

function RiskRow({ riskId }: { riskId: string }) {
  const { risks, users, resolveRisk, escalateRisk, reassignRiskOwner } = useStore();
  const { showToast } = useToast();
  const risk = risks.find((r) => r.id === riskId)!;
  const customer = useCustomerName(risk.customerId);
  const job = useJobName(risk.jobId);
  const owner = useUserName(risk.ownerId);
  const critical = risk.severity === "Critical" || risk.severity === "High";

  return (
    <tr className={cn("border-b border-gray-100", critical && "bg-red-50/40")}>
      <td className="px-4 py-3 text-sm font-medium text-charcoal">{risk.type}</td>
      <td className="px-4 py-3"><SeverityBadge severity={risk.severity} /></td>
      <td className="px-4 py-3 text-sm text-gray-600">{customer}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{job}</td>
      <td className="px-4 py-3">
        <select
          value={risk.ownerId ?? ""}
          onChange={(e) => reassignRiskOwner(risk.id, e.target.value)}
          className="text-xs h-7 border border-gray-200 rounded-md px-1.5"
        >
          <option value="">Unassigned</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3 text-sm font-medium text-charcoal">{formatCurrency(risk.revenueAtRisk)}</td>
      <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px]">{risk.recommendedAction}</td>
      <td className="px-4 py-3"><StatusBadge status={risk.status} /></td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {risk.status !== "Resolved" && (
            <Button size="sm" variant="primary" onClick={() => { resolveRisk(risk.id); showToast("Risk marked resolved"); }}>
              Resolve
            </Button>
          )}
          {risk.severity !== "Critical" && risk.status !== "Resolved" && (
            <Button size="sm" variant="destructive" onClick={() => { escalateRisk(risk.id); showToast("Risk escalated to Critical"); }}>
              Escalate
            </Button>
          )}
          {risk.jobId && (
            <Link href={`/anovasos/jobs/${risk.jobId}`} className="text-xs text-navy hover:underline px-1">
              View Job
            </Link>
          )}
          {risk.customerId && (
            <Link href={`/anovasos/customers/${risk.customerId}`} className="text-xs text-navy hover:underline px-1">
              View Customer
            </Link>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function RisksPage() {
  const { risks } = useStore();
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    return risks.filter((r) => {
      if (type && r.type !== type) return false;
      if (severity && r.severity !== severity) return false;
      if (status && r.status !== status) return false;
      return true;
    });
  }, [risks, type, severity, status]);

  return (
    <div>
      <Header
        title="Operational Risks"
        subtitle="Identify delayed jobs, missing ownership, overdue invoices, customer escalations, and crew capacity issues before they hurt revenue."
      />
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <FilterDropdown value={type} onChange={setType} options={riskTypes} label="Risk Types" />
          <FilterDropdown value={severity} onChange={setSeverity} options={severities} label="Severities" />
          <FilterDropdown value={status} onChange={setStatus} options={statuses} label="Statuses" />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
          {filtered.length === 0 ? (
            <EmptyState title="No risks match your filters" />
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
                  <th className="px-4 py-3">Risk Type</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Job</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Revenue at Risk</th>
                  <th className="px-4 py-3">Recommended Action</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <RiskRow key={r.id} riskId={r.id} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
