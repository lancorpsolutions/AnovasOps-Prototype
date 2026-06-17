"use client";

import { Header } from "@/components/layout/header";
import { StatusBadge } from "@/components/shared/badges";
import { Select } from "@/components/ui/input";
import { useCrewName, useCustomerName, useStore } from "@/lib/store";
import { isJobBehindSchedule } from "@/lib/selectors";
import { formatDate } from "@/lib/utils";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

function ScheduleRow({ jobId }: { jobId: string }) {
  const { jobs, crews, assignCrewToJob } = useStore();
  const job = jobs.find((j) => j.id === jobId)!;
  const customer = useCustomerName(job.customerId);
  const crewName = useCrewName(job.assignedCrewId);
  const behind = isJobBehindSchedule(job);
  const unassigned = !job.assignedCrewId;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-3 text-sm font-medium text-charcoal">{job.jobName}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{customer}</td>
      <td className="px-4 py-3">
        <Select
          value={job.assignedCrewId ?? ""}
          onChange={(e) => assignCrewToJob(job.id, e.target.value || null)}
          className="w-auto text-xs h-8"
        >
          <option value="">Unassigned</option>
          {crews.map((c) => (
            <option key={c.id} value={c.id}>
              {c.crewName}
            </option>
          ))}
        </Select>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(job.scheduledStartDate)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(job.scheduledEndDate)}</td>
      <td className="px-4 py-3"><StatusBadge status={job.status} /></td>
      <td className="px-4 py-3">
        {behind ? (
          <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
            <AlertTriangle size={13} /> Behind Schedule
          </span>
        ) : unassigned ? (
          <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
            <AlertTriangle size={13} /> Unassigned
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <CheckCircle2 size={13} /> On Track
          </span>
        )}
      </td>
    </tr>
  );
}

export default function SchedulingPage() {
  const { jobs, crews } = useStore();
  const activeJobs = jobs.filter((j) => !["Completed", "Invoiced", "Paid"].includes(j.status));
  const overloadedCrews = crews.filter((c) => c.capacityStatus === "Overloaded");

  return (
    <div>
      <Header title="Scheduling" subtitle="See which jobs need a crew, which are behind, and which crews are overloaded." />
      <div className="p-6 space-y-4">
        {overloadedCrews.length > 0 && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
            <AlertTriangle size={15} />
            {overloadedCrews.map((c) => c.crewName).join(", ")} {overloadedCrews.length > 1 ? "are" : "is"} overloaded. Consider reassigning jobs.
          </div>
        )}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Crew</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Scheduling Risk</th>
              </tr>
            </thead>
            <tbody>
              {activeJobs.map((j) => (
                <ScheduleRow key={j.id} jobId={j.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
