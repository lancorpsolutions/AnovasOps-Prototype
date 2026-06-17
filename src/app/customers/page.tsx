"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { SearchInput } from "@/components/shared/misc";
import { StatusBadge, RiskStatusBadge } from "@/components/shared/badges";
import { useStore } from "@/lib/store";
import { formatCurrency, timeAgo } from "@/lib/utils";

export default function CustomersPage() {
  const { customers, invoices, risks } = useStore();
  const [search, setSearch] = useState("");

  const filtered = customers.filter((c) => c.customerName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Header title="Customers" subtitle="Operational visibility into customer health, open jobs, and risk status." />
      <div className="p-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Search customers..." className="w-64 mb-4" />
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Open Jobs</th>
                <th className="px-4 py-3">Unpaid Invoices</th>
                <th className="px-4 py-3">Open Risks</th>
                <th className="px-4 py-3">Risk Status</th>
                <th className="px-4 py-3">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const unpaid = invoices.filter((i) => i.customerId === c.id && i.status !== "Paid").length;
                const openRiskCount = risks.filter((r) => r.customerId === c.id && r.status !== "Resolved").length;
                return (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link href={`/customers/${c.id}`} className="text-sm font-medium text-navy hover:underline">
                        {c.customerName}
                      </Link>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3 text-sm text-gray-600">{c.openJobs}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{unpaid}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{openRiskCount}</td>
                    <td className="px-4 py-3"><RiskStatusBadge status={c.riskStatus} /></td>
                    <td className="px-4 py-3 text-sm text-gray-500">{timeAgo(c.lastActivity)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
