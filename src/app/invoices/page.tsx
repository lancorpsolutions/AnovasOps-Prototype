"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { SearchInput, FilterDropdown, EmptyState } from "@/components/shared/misc";
import { StatusBadge } from "@/components/shared/badges";
import { useCustomerName, useJobName, useStore } from "@/lib/store";
import { isInvoiceOverdue } from "@/lib/selectors";
import { formatCurrency, formatDate, daysBetween, isPast } from "@/lib/utils";
import { InvoiceStatus } from "@/lib/types";
import { useToast } from "@/components/ui/toast";
import { CreditCard, Link2, Receipt } from "lucide-react";

const connectedAccounts = [
  { name: "PayPal", icon: CreditCard },
  { name: "Stripe", icon: Link2 },
  { name: "QuickBooks", icon: Receipt },
];

function ConnectedAccountsCard() {
  const { showToast } = useToast();
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-charcoal mb-3">Connected Accounts</h3>
      <div className="space-y-2">
        {connectedAccounts.map(({ name, icon: Icon }) => (
          <div key={name} className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Icon size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-charcoal">{name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">Coming soon</span>
            </div>
            <Button size="sm" variant="outline" onClick={() => showToast("Coming soon")}>
              Connect
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

const statuses: InvoiceStatus[] = ["Draft", "Sent", "Due Soon", "Overdue", "Paid", "Escalated"];

function InvoiceRow({ invoiceId }: { invoiceId: string }) {
  const { invoices, markInvoiceSent, markInvoicePaid, escalateInvoice, createRisk } = useStore();
  const { showToast } = useToast();
  const router = useRouter();
  const invoice = invoices.find((i) => i.id === invoiceId)!;
  const customer = useCustomerName(invoice.customerId);
  const job = useJobName(invoice.jobId);
  const overdue = isInvoiceOverdue(invoice);
  const daysOverdue = overdue ? daysBetween(invoice.dueDate) : 0;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-3 text-sm font-medium text-charcoal">{invoice.invoiceNumber}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{customer}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{job}</td>
      <td className="px-4 py-3 text-sm font-medium text-charcoal">{formatCurrency(invoice.amount)}</td>
      <td className="px-4 py-3"><StatusBadge status={invoice.status} /></td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(invoice.dueDate)}</td>
      <td className="px-4 py-3 text-sm text-red-600">{overdue ? `${daysOverdue}d` : "—"}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {invoice.status === "Draft" && (
            <Button size="sm" variant="outline" onClick={() => { markInvoiceSent(invoice.id); showToast("Invoice marked sent"); }}>
              Mark Sent
            </Button>
          )}
          {invoice.status !== "Paid" && (
            <Button size="sm" variant="primary" onClick={() => { markInvoicePaid(invoice.id); showToast("Invoice marked paid"); }}>
              Mark Paid
            </Button>
          )}
          {overdue && invoice.status !== "Escalated" && (
            <Button size="sm" variant="destructive" onClick={() => { escalateInvoice(invoice.id); showToast("Invoice escalated"); }}>
              Escalate
            </Button>
          )}
          {overdue && (
            <Button
              size="sm"
              variant="subtle"
              onClick={() => {
                createRisk({
                  customerId: invoice.customerId,
                  jobId: invoice.jobId,
                  taskId: null,
                  type: "Overdue Invoice",
                  severity: daysOverdue > 14 ? "Critical" : "High",
                  ownerId: null,
                  revenueAtRisk: invoice.amount,
                  delayLength: `${daysOverdue} days`,
                  notes: `Invoice ${invoice.invoiceNumber} overdue by ${daysOverdue} days.`,
                  recommendedAction: "Send payment reminder and consider escalation.",
                  status: "Open",
                });
                showToast("Risk created — view it on the Risks page");
                router.push("/risks");
              }}
            >
              Create Risk
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function InvoicesPage() {
  const { invoices, customers } = useStore();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [customerId, setCustomerId] = useState("");

  const filtered = useMemo(() => {
    return invoices.filter((i) => {
      if (search && !i.invoiceNumber.toLowerCase().includes(search.toLowerCase())) return false;
      if (status && i.status !== status) return false;
      if (customerId && i.customerId !== customerId) return false;
      if (overdueOnly && !isInvoiceOverdue(i)) return false;
      return true;
    });
  }, [invoices, search, status, customerId, overdueOnly]);

  return (
    <div>
      <Header title="Invoices" subtitle="Track outstanding invoices and take action before they become risks." />
      <div className="p-6 space-y-5">
        <ConnectedAccountsCard />
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search invoice #..." className="w-56" />
          <FilterDropdown value={status} onChange={setStatus} options={statuses} label="Statuses" />
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="h-9 rounded-md border border-gray-300 px-3 text-sm"
          >
            <option value="">All Customers</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.customerName}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={overdueOnly} onChange={(e) => setOverdueOnly(e.target.checked)} />
            Overdue only
          </label>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
          {filtered.length === 0 ? (
            <EmptyState title="No invoices match your filters" />
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
                  <th className="px-4 py-3">Invoice #</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Job</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Days Overdue</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((i) => (
                  <InvoiceRow key={i.id} invoiceId={i.id} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
