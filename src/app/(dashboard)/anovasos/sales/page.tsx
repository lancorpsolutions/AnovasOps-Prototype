"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CreateOpportunityForm } from "@/components/forms/create-opportunity-form";
import { FindLeadsForm } from "@/components/forms/find-leads-form";
import { useStore, useCustomerName, useUserName } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { PipelineStage, SalesOpportunity } from "@/lib/types";
import { formatCurrency, formatDate, daysBetween, isPast } from "@/lib/utils";
import { Plus, Calendar, Pencil, Trash2, Search } from "lucide-react";

const stages: PipelineStage[] = [
  "Lead Received",
  "Contacted",
  "Estimate Scheduled",
  "Estimate Completed",
  "Proposal Sent",
  "Won",
  "Lost",
];

function OpportunityCard({ opp }: { opp: SalesOpportunity }) {
  const customer = useCustomerName(opp.customerId);
  const owner = useUserName(opp.ownerId);
  const overdue = isPast(opp.followUpDate) && !["Won", "Lost"].includes(opp.stage);
  const { moveOpportunityStage, deleteOpportunity } = useStore();
  const { showToast } = useToast();
  const [editOpen, setEditOpen] = useState(false);

  function handleDelete() {
    if (confirm("Delete this opportunity?")) {
      deleteOpportunity(opp.id);
      showToast("Opportunity deleted");
    }
  }

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-charcoal">{customer}</p>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setEditOpen(true)} className="text-gray-400 hover:text-navy cursor-pointer">
              <Pencil size={13} />
            </button>
            <button onClick={handleDelete} className="text-gray-400 hover:text-red-600 cursor-pointer">
              <Trash2 size={13} />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500">{opp.serviceType}</p>
        <p className="text-sm font-medium text-orange">{formatCurrency(opp.estimatedValue)}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{owner}</span>
          <span className={overdue ? "text-red-600 font-medium flex items-center gap-1" : "flex items-center gap-1"}>
            <Calendar size={11} /> {formatDate(opp.followUpDate)}
          </span>
        </div>
        <p className="text-[11px] text-gray-400">{daysBetween(opp.stageEnteredAt)} days in stage</p>
        <select
          value={opp.stage}
          onChange={(e) => moveOpportunityStage(opp.id, e.target.value as PipelineStage)}
          className="w-full text-xs border border-gray-200 rounded-md h-7 px-1.5"
        >
          {stages.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <Modal open={editOpen} onOpenChange={setEditOpen} title="Edit Opportunity" description="Update this sales opportunity.">
        <CreateOpportunityForm opportunity={opp} onDone={() => setEditOpen(false)} />
      </Modal>
    </>
  );
}

export default function SalesPipelinePage() {
  const { opportunities } = useStore();
  const [open, setOpen] = useState(false);
  const [findOpen, setFindOpen] = useState(false);

  return (
    <div>
      <Header title="Sales Pipeline" subtitle="Track leads and estimates from first contact through won or lost." />
      <div className="p-6">
        <div className="flex justify-end gap-2 mb-4">
          <Button variant="outline" onClick={() => setFindOpen(true)}>
            <Search size={15} /> Find Leads
          </Button>
          <Button variant="primary" onClick={() => setOpen(true)}>
            <Plus size={15} /> New Opportunity
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 overflow-x-auto">
          {stages.map((stage) => {
            const items = opportunities.filter((o) => o.stage === stage);
            return (
              <div key={stage} className="bg-gray-50 rounded-xl p-2.5 min-w-[220px]">
                <div className="flex items-center justify-between mb-2 px-1">
                  <p className="text-xs font-semibold text-charcoal uppercase tracking-wide">{stage}</p>
                  <span className="text-xs text-gray-400">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((opp) => (
                    <OpportunityCard key={opp.id} opp={opp} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal open={open} onOpenChange={setOpen} title="New Sales Opportunity" description="Create a new lead or estimate opportunity.">
        <CreateOpportunityForm onDone={() => setOpen(false)} />
      </Modal>
      <Modal
        open={findOpen}
        onOpenChange={setFindOpen}
        title="Find Leads"
        description="Search public business listings and import matches as prospects."
      >
        <FindLeadsForm onDone={() => setFindOpen(false)} />
      </Modal>
    </div>
  );
}
