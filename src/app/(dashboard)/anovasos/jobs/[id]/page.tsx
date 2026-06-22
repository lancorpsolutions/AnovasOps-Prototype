"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Select, Textarea } from "@/components/ui/input";
import { CreateTaskForm } from "@/components/forms/create-task-form";
import { StatusBadge, PriorityBadge } from "@/components/shared/badges";
import { EmptyState, InfoTooltip } from "@/components/shared/misc";
import { useCrewName, useCustomerName, useStore, useUserName } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { JobStatus, TaskStatus } from "@/lib/types";
import { Plus, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/toast";

const jobStatuses: JobStatus[] = [
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
const taskStatuses: TaskStatus[] = ["Not Started", "In Progress", "Waiting", "Blocked", "Completed", "Overdue"];

function TaskRow({ taskId }: { taskId: string }) {
  const { tasks, updateTaskStatus } = useStore();
  const task = tasks.find((t) => t.id === taskId)!;
  const assignee = useUserName(task.assignedToId);
  const [blockerOpen, setBlockerOpen] = useState(false);
  const [blockerNotes, setBlockerNotes] = useState(task.blockerNotes ?? "");

  function handleStatusChange(value: TaskStatus) {
    if (value === "Blocked") {
      setBlockerOpen(true);
    } else {
      updateTaskStatus(task.id, value);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 py-3">
        <div>
          <p className="text-sm font-medium text-charcoal">{task.name}</p>
          <p className="text-xs text-gray-500">{assignee} · Due {formatDate(task.dueDate)}</p>
          {task.blockerNotes && <p className="text-xs text-red-600 mt-0.5">Blocker: {task.blockerNotes}</p>}
        </div>
        <div className="flex items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <Select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            className="w-auto text-xs h-8"
          >
            {taskStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <Modal open={blockerOpen} onOpenChange={setBlockerOpen} title="Mark Task Blocked" description="Add a note describing the blocker. This creates an operational risk.">
        <div className="space-y-3">
          <Textarea value={blockerNotes} onChange={(e) => setBlockerNotes(e.target.value)} placeholder="Describe the blocker..." />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setBlockerOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                updateTaskStatus(task.id, "Blocked", blockerNotes);
                setBlockerOpen(false);
              }}
            >
              Mark Blocked
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const { jobs, jobStages, tasks, risks, invoices, crews, updateJobStatus, assignCrewToJob, createInvoice } = useStore();
  const { showToast } = useToast();
  const job = jobs.find((j) => j.id === params.id);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const customer = useCustomerName(job?.customerId ?? null);
  const manager = useUserName(job?.jobManagerId ?? null);
  const crewName = useCrewName(job?.assignedCrewId ?? null);

  if (!job) return notFound();

  const stages = jobStages.filter((s) => s.jobId === job.id);
  const jobTasks = tasks.filter((t) => t.jobId === job.id);
  const jobRisks = risks.filter((r) => r.jobId === job.id);
  const invoice = invoices.find((i) => i.jobId === job.id);

  function handleCreateInvoice() {
    if (!job) return;
    createInvoice({
      customerId: job.customerId,
      jobId: job.id,
      invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: job.jobValue,
      status: "Draft",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      sentDate: null,
      paidDate: null,
    });
    showToast("Invoice record created");
  }

  return (
    <div>
      <Header title={job.jobName} subtitle={`${customer} · ${job.address}`} />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-charcoal">Job Overview</h3>
              <div className="flex items-center gap-2">
                <PriorityBadge priority={job.priority} />
                <Select
                  value={job.status}
                  onChange={(e) => updateJobStatus(job.id, e.target.value as JobStatus)}
                  className="w-auto text-xs h-8"
                >
                  {jobStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Info label="Customer" value={customer} />
              <Info label="Service Type" value={job.serviceType} />
              <Info label="Job Manager" value={manager} />
              <Info
                label={
                  <span className="inline-flex items-center gap-1">
                    Job Value <InfoTooltip text="Total contracted value of the job." />
                  </span>
                }
                value={formatCurrency(job.jobValue)}
              />
              <Info label="Scheduled Start" value={formatDate(job.scheduledStartDate)} />
              <Info label="Scheduled End" value={formatDate(job.scheduledEndDate)} />
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin size={13} /> {job.address}
            </div>
            {job.notes && <p className="mt-3 text-xs text-gray-500 italic">{job.notes}</p>}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-charcoal mb-4">Job Stages</h3>
            <div className="flex flex-wrap gap-2">
              {stages.map((s) => (
                <span
                  key={s.id}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                    s.status === "Complete"
                      ? "bg-emerald-50 text-emerald-700"
                      : s.status === "In Progress"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {s.order}. {s.name}
                </span>
              ))}
              {stages.length === 0 && <p className="text-xs text-gray-400">No stages defined for this job.</p>}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-charcoal">Tasks</h3>
              <Button size="sm" variant="outline" onClick={() => setTaskModalOpen(true)}>
                <Plus size={13} /> Add Task
              </Button>
            </div>
            {jobTasks.length === 0 ? (
              <EmptyState title="No tasks yet" description="Add a task to track work needed for this job." />
            ) : (
              jobTasks.map((t) => <TaskRow key={t.id} taskId={t.id} />)
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-charcoal mb-3">Crew Assignment</h3>
            <Select value={job.assignedCrewId ?? ""} onChange={(e) => assignCrewToJob(job.id, e.target.value || null)}>
              <option value="">Unassigned</option>
              {crews.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.crewName}
                </option>
              ))}
            </Select>
            <p className="text-xs text-gray-400 mt-2">Currently: {crewName}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-charcoal mb-3">Invoice</h3>
            {invoice ? (
              <div className="text-sm">
                <p className="font-medium text-charcoal">{invoice.invoiceNumber}</p>
                <p className="text-xs text-gray-500">{formatCurrency(invoice.amount)}</p>
                <StatusBadge status={invoice.status} />
              </div>
            ) : (
              <Button size="sm" variant="primary" onClick={handleCreateInvoice}>
                Create Invoice
              </Button>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-charcoal mb-3">Operational Risks</h3>
            {jobRisks.length === 0 ? (
              <p className="text-xs text-gray-400">No risks linked to this job.</p>
            ) : (
              <div className="space-y-2">
                {jobRisks.map((r) => (
                  <div key={r.id} className="text-xs border-l-2 border-red-400 pl-2">
                    <p className="font-medium text-charcoal">{r.type}</p>
                    <p className="text-gray-500">{r.recommendedAction}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal open={taskModalOpen} onOpenChange={setTaskModalOpen} title="Add Task" description="Create a task for this job.">
        <CreateTaskForm jobId={job.id} customerId={job.customerId} onDone={() => setTaskModalOpen(false)} />
      </Modal>
    </div>
  );
}

function Info({ label, value }: { label: React.ReactNode; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-charcoal">{value}</p>
    </div>
  );
}
