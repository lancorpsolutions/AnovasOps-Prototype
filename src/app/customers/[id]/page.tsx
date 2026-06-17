"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { StatusBadge, RiskStatusBadge } from "@/components/shared/badges";
import { useStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomerDetailPage() {
  const params = useParams<{ id: string }>();
  const { customers, jobs, invoices, risks, activity } = useStore();
  const customer = customers.find((c) => c.id === params.id);

  if (!customer) return notFound();

  const customerJobs = jobs.filter((j) => j.customerId === customer.id);
  const customerInvoices = invoices.filter((i) => i.customerId === customer.id);
  const customerRisks = risks.filter((r) => r.customerId === customer.id);
  const customerActivity = activity.filter((a) => a.message.toLowerCase().includes(customer.customerName.toLowerCase()));

  return (
    <div>
      <Header title={customer.customerName} subtitle={customer.address} />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-2">
          <h3 className="text-sm font-semibold text-charcoal mb-2">Contact Info</h3>
          <p className="text-sm text-gray-600">{customer.primaryContact}</p>
          <p className="text-sm text-gray-600">{customer.email}</p>
          <p className="text-sm text-gray-600">{customer.phone}</p>
          <div className="flex items-center gap-2 pt-2">
            <StatusBadge status={customer.status} />
            <RiskStatusBadge status={customer.riskStatus} />
          </div>
          <p className="text-sm font-medium text-charcoal pt-2">Total Revenue: {formatCurrency(customer.totalRevenue)}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h3 className="text-sm font-semibold text-charcoal mb-3">Active Jobs</h3>
          <div className="space-y-2">
            {customerJobs.length === 0 && <p className="text-xs text-gray-400">No jobs for this customer.</p>}
            {customerJobs.map((j) => (
              <Link key={j.id} href={`/jobs/${j.id}`} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 hover:bg-gray-50 -mx-1 px-1 rounded">
                <span className="text-sm text-navy font-medium">{j.jobName}</span>
                <StatusBadge status={j.status} />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-charcoal mb-3">Invoices</h3>
          <div className="space-y-2">
            {customerInvoices.length === 0 && <p className="text-xs text-gray-400">No invoices.</p>}
            {customerInvoices.map((i) => (
              <div key={i.id} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                <span className="text-sm text-gray-700">{i.invoiceNumber}</span>
                <span className="text-sm font-medium">{formatCurrency(i.amount)}</span>
                <StatusBadge status={i.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-charcoal mb-3">Operational Risks</h3>
          <div className="space-y-2">
            {customerRisks.length === 0 && <p className="text-xs text-gray-400">No risks for this customer.</p>}
            {customerRisks.map((r) => (
              <div key={r.id} className="text-xs border-l-2 border-red-400 pl-2">
                <p className="font-medium text-charcoal">{r.type}</p>
                <p className="text-gray-500">{r.recommendedAction}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-charcoal mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {customerActivity.length === 0 && <p className="text-xs text-gray-400">No recent activity.</p>}
            {customerActivity.map((a) => (
              <div key={a.id} className="text-xs text-gray-600 border-b border-gray-100 pb-2 last:border-0">
                {a.message} <span className="text-gray-400">· {formatDate(a.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
