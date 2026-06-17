"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CreateJobForm } from "@/components/forms/create-job-form";
import { SearchInput, FilterDropdown, EmptyState, InfoTooltip } from "@/components/shared/misc";
import { StatusBadge, PriorityBadge } from "@/components/shared/badges";
import { useCrewName, useCustomerName, useStore } from "@/lib/store";
import { isJobBehindSchedule } from "@/lib/selectors";
import { formatCurrency, formatDate } from "@/lib/utils";
import { JobStatus, Priority, ServiceType } from "@/lib/types";
import { Plus, AlertTriangle } from "lucide-react";

const statuses: JobStatus[] = [
  "Not Scheduled",
  "Scheduled",
  "In Progress",
  "Waiting on Customer",
  "Waiting on Materials",
  "Blocked",
  "Completed",
  "Invoiced",
  "Paid",
];
const priorities: Priority[] = ["Low", "Medium", "High", "Critical"];
const serviceTypes: ServiceType[] = ["HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping", "Pest Control", "General Contracting"];

function JobRow({ jobId }: { jobId: string }) {
  const { jobs } = useStore();
  const job = jobs.find((j) => j.id === jobId)!;
  const customer = useCustomerName(job.customerId);
  const crew = useCrewName(job.assignedCrewId);
  const behind = isJobBehindSchedule(job);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-3">
        <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-navy hover:underline flex items-center gap-1.5">
          {behind && <AlertTriangle size={13} className="text-red-500" />}
          {job.jobName}
        </Link>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{customer}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{job.serviceType}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{crew}</td>
      <td className="px-4 py-3"><StatusBadge status={job.status} /></td>
      <td className="px-4 py-3"><PriorityBadge priority={job.priority} /></td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(job.scheduledStartDate)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(job.scheduledEndDate)}</td>
      <td className="px-4 py-3 text-sm font-medium text-charcoal">{formatCurrency(job.jobValue)}</td>
    </tr>
  );
}

export default function JobsPage() {
  const { jobs } = useStore();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [behindOnly, setBehindOnly] = useState(false);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (search && !j.jobName.toLowerCase().includes(search.toLowerCase())) return false;
      if (status && j.status !== status) return false;
      if (priority && j.priority !== priority) return false;
      if (serviceType && j.serviceType !== serviceType) return false;
      if (behindOnly && !isJobBehindSchedule(j)) return false;
      return true;
    });
  }, [jobs, search, status, priority, serviceType, behindOnly]);

  return (
    <div>
      <Header title="Jobs" subtitle="Track every active job, its crew, schedule, and risk status." />
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search jobs..." className="w-64" />
          <FilterDropdown value={status} onChange={setStatus} options={statuses} label="Statuses" />
          <FilterDropdown value={priority} onChange={setPriority} options={priorities} label="Priorities" />
          <FilterDropdown value={serviceType} onChange={setServiceType} options={serviceTypes} label="Service Types" />
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={behindOnly} onChange={(e) => setBehindOnly(e.target.checked)} />
            Behind schedule only
          </label>
          <div className="ml-auto">
            <Button variant="primary" onClick={() => setOpen(true)}>
              <Plus size={15} /> New Job
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
          {filtered.length === 0 ? (
            <EmptyState title="No jobs match your filters" description="Try adjusting your search or filters." />
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
                  <th className="px-4 py-3">Job Name</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Crew</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Start</th>
                  <th className="px-4 py-3">End</th>
                  <th className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      Value <InfoTooltip text="Total contracted value of the job." />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((j) => (
                  <JobRow key={j.id} jobId={j.id} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Modal open={open} onOpenChange={setOpen} title="New Job" description="Create a new service job.">
        <CreateJobForm onDone={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
