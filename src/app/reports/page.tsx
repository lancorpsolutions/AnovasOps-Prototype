"use client";

import { useRef } from "react";
import { Header } from "@/components/layout/header";
import { ChartCard } from "@/components/shared/misc";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { calcRevenueAtRisk, isCompletedNotBilled, isEstimateOverdue, isJobBehindSchedule, isInvoiceOverdue } from "@/lib/selectors";
import { exportToCsv, formatCurrency, parseCsv } from "@/lib/utils";
import { Customer, Invoice, Job } from "@/lib/types";
import { Download, Upload } from "lucide-react";
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

function ImportExportRow({
  label,
  onExport,
  onImport,
}: {
  label: string;
  onExport: () => void;
  onImport: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2.5">
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={onExport}>
          <Download size={13} /> Export CSV
        </Button>
        <Button size="sm" variant="outline" onClick={() => inputRef.current?.click()}>
          <Upload size={13} /> Import CSV
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImport(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const { jobs, opportunities, invoices, customers, crews, risks, createJob, createCustomer, createInvoice } = useStore();
  const { showToast } = useToast();

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

  function handleImportFile(file: File, kind: "jobs" | "customers" | "invoices") {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const rows = parseCsv(text);
      let count = 0;
      rows.forEach((row) => {
        if (kind === "jobs") {
          createJob({
            customerId: row.customerId || customers[0]?.id || "",
            jobName: row.jobName || "Imported Job",
            serviceType: (row.serviceType as Job["serviceType"]) || "HVAC",
            jobValue: Number(row.jobValue) || 0,
            jobManagerId: row.jobManagerId || "",
            assignedCrewId: row.assignedCrewId || null,
            status: (row.status as Job["status"]) || "Not Scheduled",
            priority: (row.priority as Job["priority"]) || "Medium",
            scheduledStartDate: row.scheduledStartDate || new Date().toISOString(),
            scheduledEndDate: row.scheduledEndDate || new Date().toISOString(),
            actualStartDate: null,
            actualEndDate: null,
            address: row.address || "",
            notes: row.notes || "",
          });
        } else if (kind === "customers") {
          createCustomer({
            customerName: row.customerName || "Imported Customer",
            primaryContact: row.primaryContact || "",
            email: row.email || "",
            phone: row.phone || "",
            address: row.address || "",
            status: (row.status as Customer["status"]) || "Prospect",
            openJobs: Number(row.openJobs) || 0,
            totalRevenue: Number(row.totalRevenue) || 0,
            riskStatus: (row.riskStatus as Customer["riskStatus"]) || "Healthy",
            lastActivity: row.lastActivity || new Date().toISOString(),
          });
        } else {
          createInvoice({
            customerId: row.customerId || customers[0]?.id || "",
            jobId: row.jobId || "",
            invoiceNumber: row.invoiceNumber || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
            amount: Number(row.amount) || 0,
            status: (row.status as Invoice["status"]) || "Draft",
            dueDate: row.dueDate || new Date().toISOString(),
            sentDate: row.sentDate || null,
            paidDate: row.paidDate || null,
          });
        }
        count += 1;
      });
      showToast(`Imported ${count} ${kind}`);
    };
    reader.readAsText(file);
  }

  return (
    <div>
      <Header title="Operational Reports" subtitle="Track jobs, estimates, crew capacity, overdue invoices, and revenue at risk." />
      <div className="p-6 space-y-5">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-charcoal mb-3">Import / Export</h3>
          <div className="space-y-2">
            <ImportExportRow
              label="Jobs"
              onExport={() => exportToCsv("jobs.csv", jobs)}
              onImport={(file) => handleImportFile(file, "jobs")}
            />
            <ImportExportRow
              label="Customers"
              onExport={() => exportToCsv("customers.csv", customers)}
              onImport={(file) => handleImportFile(file, "customers")}
            />
            <ImportExportRow
              label="Invoices"
              onExport={() => exportToCsv("invoices.csv", invoices)}
              onImport={(file) => handleImportFile(file, "invoices")}
            />
          </div>
        </div>

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
