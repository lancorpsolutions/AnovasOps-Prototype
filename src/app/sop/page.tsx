"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CreateSOPForm } from "@/components/forms/create-sop-form";
import { StatusBadge } from "@/components/shared/badges";
import { FilterDropdown } from "@/components/shared/misc";
import { useStore, useUserName } from "@/lib/store";
import { RelatedArea, SOPStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Plus, BookOpen } from "lucide-react";

const areas: RelatedArea[] = ["Sales", "Estimates", "Scheduling", "Job Delivery", "Invoicing", "Customer Escalation", "Reviews"];
const sopStatuses: SOPStatus[] = ["Draft", "Active", "Needs Review", "Archived"];

export default function SOPPage() {
  const { sops, updateSOPStatus } = useStore();
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState("");
  const [status, setStatus] = useState("");

  const filtered = sops.filter((s) => (!area || s.relatedArea === area) && (!status || s.status === status));

  return (
    <div>
      <Header
        title="SOP Library"
        subtitle="Keep your sales, scheduling, job delivery, invoicing, and customer escalation processes connected to how work actually gets done."
      />
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <FilterDropdown value={area} onChange={setArea} options={areas} label="Areas" />
          <FilterDropdown value={status} onChange={setStatus} options={sopStatuses} label="Statuses" />
          <div className="ml-auto">
            <Button variant="primary" onClick={() => setOpen(true)}>
              <Plus size={15} /> New SOP
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((sop) => (
            <SOPCard key={sop.id} sopId={sop.id} onStatusChange={(s) => updateSOPStatus(sop.id, s)} />
          ))}
        </div>
      </div>
      <Modal open={open} onOpenChange={setOpen} title="New SOP" description="Document a standard operating procedure.">
        <CreateSOPForm onDone={() => setOpen(false)} />
      </Modal>
    </div>
  );
}

function SOPCard({ sopId, onStatusChange }: { sopId: string; onStatusChange: (s: SOPStatus) => void }) {
  const { sops } = useStore();
  const sop = sops.find((s) => s.id === sopId)!;
  const owner = useUserName(sop.ownerId);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BookOpen size={15} className="text-navy" />
          <h3 className="text-sm font-semibold text-charcoal">{sop.title}</h3>
        </div>
        <StatusBadge status={sop.status} />
      </div>
      <p className="text-xs text-gray-500 mb-2">{sop.relatedArea} · Owner: {owner}</p>
      <p className="text-xs text-gray-600 mb-3">{sop.processDescription}</p>
      <ol className="text-xs text-gray-500 list-decimal list-inside space-y-0.5 mb-3">
        {sop.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
      <div className="flex items-center justify-between border-t border-gray-100 pt-2">
        <span className="text-[11px] text-gray-400">Updated {formatDate(sop.lastUpdated)}</span>
        <select
          value={sop.status}
          onChange={(e) => onStatusChange(e.target.value as SOPStatus)}
          className="text-xs h-7 border border-gray-200 rounded-md px-1.5"
        >
          {["Draft", "Active", "Needs Review", "Archived"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
