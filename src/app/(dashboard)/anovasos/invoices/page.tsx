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
import { InvoiceStatus, Invoice } from "@/lib/types";
import { useToast } from "@/components/ui/toast";
import { CreditCard, Link2, Receipt, Sparkles, Send, ChevronDown, ChevronUp, X, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

// ── Collections Assistant ─────────────────────────────────────────────────────

function draftMessage(
  contactName: string,
  customerName: string,
  jobName: string,
  invoiceNumber: string,
  amount: number,
  daysOverdue: number,
): string {
  const fmt = formatCurrency(amount);
  if (daysOverdue <= 7) {
    return `Hi ${contactName},\n\nJust a quick follow-up on ${invoiceNumber} for the ${jobName} — ${fmt} was due ${daysOverdue} day${daysOverdue !== 1 ? "s" : ""} ago. If you've already sent payment, please disregard this message.\n\nIf you have any questions about the invoice or need to discuss payment options, don't hesitate to reach out. We're happy to help.\n\nThank you,\n[Your Name]`;
  }
  if (daysOverdue <= 21) {
    return `Hi ${contactName},\n\nI wanted to follow up again on ${invoiceNumber} for the ${jobName} at ${customerName}. The balance of ${fmt} is now ${daysOverdue} days past due.\n\nWe value our relationship with ${customerName} and want to make sure this gets resolved quickly. Please let us know if there's anything on your end holding this up — we're open to discussing a payment arrangement if needed.\n\nPlease reply to this message or give us a call at your earliest convenience.\n\nThank you,\n[Your Name]`;
  }
  return `Hi ${contactName},\n\nThis is our third notice regarding ${invoiceNumber} for the ${jobName} — ${fmt} is now ${daysOverdue} days overdue. This account has been flagged for escalation.\n\nTo avoid further action, please remit payment or contact us immediately to arrange a resolution. We'd prefer to resolve this directly rather than involve a collections process.\n\nWe need to hear from you by end of week.\n\n[Your Name]`;
}

function severityLabel(days: number): { label: string; color: string; icon: React.ElementType } {
  if (days <= 7) return { label: "1st Notice", color: "text-yellow-600 bg-yellow-50 border-yellow-200", icon: Clock };
  if (days <= 21) return { label: "2nd Notice", color: "text-orange bg-orange/5 border-orange/20", icon: AlertTriangle };
  return { label: "Escalate", color: "text-red-600 bg-red-50 border-red-200", icon: AlertTriangle };
}

function ReviewModal({
  invoice,
  onClose,
  onSend,
}: {
  invoice: Invoice;
  onClose: () => void;
  onSend: (msg: string) => void;
}) {
  const { customers, jobs } = useStore();
  const customer = customers.find((c) => c.id === invoice.customerId);
  const job = jobs.find((j) => j.id === invoice.jobId);
  const daysOverdue = daysBetween(invoice.dueDate);
  const [msg, setMsg] = useState(
    draftMessage(
      customer?.primaryContact ?? "there",
      customer?.customerName ?? "",
      job?.jobName ?? "your recent job",
      invoice.invoiceNumber,
      invoice.amount,
      daysOverdue,
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-orange" />
            <p className="text-sm font-semibold text-charcoal">Review AI Draft — {invoice.invoiceNumber}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
        </div>
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">To: {customer?.primaryContact} · {customer?.email}</p>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={11}
            className="w-full rounded-lg border border-gray-200 p-3 text-sm text-charcoal leading-relaxed resize-none focus:outline-none focus:border-orange"
          />
          <p className="text-[11px] text-gray-400 mt-1.5">You can edit this message before sending.</p>
        </div>
        <div className="flex items-center justify-end gap-2 px-5 pb-4">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={() => onSend(msg)}>
            <Send size={13} /> Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}

function CollectionsAssistant() {
  const { invoices, customers, jobs, markInvoicePaid, escalateInvoice } = useStore();
  const { showToast } = useToast();
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [sent, setSent] = useState<string[]>([]);
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const overdue = useMemo(
    () =>
      invoices
        .filter((i) => isInvoiceOverdue(i) && i.status !== "Paid" && !dismissed.includes(i.id))
        .sort((a, b) => daysBetween(a.dueDate) - daysBetween(b.dueDate))
        .reverse(),
    [invoices, dismissed]
  );

  const totalAtRisk = overdue.reduce((s, i) => s + i.amount, 0);
  const reviewingInvoice = reviewing ? invoices.find((i) => i.id === reviewing) ?? null : null;

  function handleSend(invoiceId: string, msg: string) {
    setSent((p) => [...p, invoiceId]);
    setReviewing(null);
    showToast("Message sent to customer");
  }

  function handleSendAll() {
    const lowRisk = overdue.filter((i) => daysBetween(i.dueDate) <= 7 && !sent.includes(i.id));
    setSent((p) => [...p, ...lowRisk.map((i) => i.id)]);
    showToast(`${lowRisk.length} follow-up message${lowRisk.length !== 1 ? "s" : ""} sent`);
  }

  if (overdue.length === 0) return null;

  return (
    <>
      {reviewingInvoice && (
        <ReviewModal
          invoice={reviewingInvoice}
          onClose={() => setReviewing(null)}
          onSend={(msg) => handleSend(reviewingInvoice.id, msg)}
        />
      )}

      <div className="rounded-xl border border-orange/30 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-navy to-navy-light">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange/20">
              <Sparkles size={15} className="text-orange-light" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">A.R.I.A. Collections Assistant</p>
              <p className="text-[11px] text-white/50">
                {overdue.length} overdue invoice{overdue.length !== 1 ? "s" : ""} · {formatCurrency(totalAtRisk)} at risk
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={handleSendAll}
              className="text-xs"
            >
              <Send size={12} /> Send All 1st Notices
            </Button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white/50 hover:text-white transition-colors"
            >
              {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>
        </div>

        {/* Queue */}
        {!collapsed && (
          <div className="divide-y divide-gray-100">
            {overdue.map((inv) => {
              const customer = customers.find((c) => c.id === inv.customerId);
              const job = jobs.find((j) => j.id === inv.jobId);
              const daysOver = daysBetween(inv.dueDate);
              const { label, color, icon: SevIcon } = severityLabel(daysOver);
              const isSent = sent.includes(inv.id);

              return (
                <div key={inv.id} className="flex items-start gap-4 px-5 py-4">
                  {/* Severity */}
                  <span className={`mt-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide border rounded-full px-2 py-0.5 whitespace-nowrap ${color}`}>
                    <SevIcon size={10} />
                    {label}
                  </span>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-charcoal">
                      {customer?.customerName ?? "Unknown"} · {inv.invoiceNumber}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{job?.jobName} · {daysOver}d overdue · {formatCurrency(inv.amount)}</p>
                    {isSent && (
                      <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                        <CheckCircle2 size={11} /> Message sent
                      </p>
                    )}
                    {!isSent && (
                      <p className="text-xs text-gray-400 mt-1 italic line-clamp-1">
                        {draftMessage(
                          customer?.primaryContact ?? "there",
                          customer?.customerName ?? "",
                          job?.jobName ?? "your recent job",
                          inv.invoiceNumber,
                          inv.amount,
                          daysOver,
                        ).split("\n")[0]}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {!isSent ? (
                      <Button size="sm" variant="outline" onClick={() => setReviewing(inv.id)}>
                        Review & Send
                      </Button>
                    ) : (
                      <Button size="sm" variant="primary" onClick={() => { markInvoicePaid(inv.id); showToast("Invoice marked paid"); }}>
                        Mark Paid
                      </Button>
                    )}
                    <button
                      onClick={() => setDismissed((p) => [...p, inv.id])}
                      className="text-gray-300 hover:text-gray-500 transition-colors"
                      title="Dismiss"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

// ── Connected Accounts ────────────────────────────────────────────────────────

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
                router.push("/anovasos/risks");
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
        <CollectionsAssistant />
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
