"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Modal, ConfirmDialog } from "@/components/ui/modal";
import { Input, Select } from "@/components/ui/input";
import { CreateCrewForm } from "@/components/forms/create-crew-form";
import { CapacityBadge } from "@/components/shared/badges";
import { useStore } from "@/lib/store";
import { isCrewOverloadedLive, getCrewActiveJobCount } from "@/lib/selectors";
import { Crew } from "@/lib/types";
import { Plus, Trash2, X, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/toast";

function AddMemberForm({ crewId, onDone }: { crewId: string; onDone: () => void }) {
  const { addCrewMember } = useStore();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Technician");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    addCrewMember(crewId, { name, role });
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Member name" className="h-8 text-xs" />
      <Select value={role} onChange={(e) => setRole(e.target.value)} className="h-8 text-xs w-32">
        <option>Crew Lead</option>
        <option>Technician</option>
        <option>Apprentice</option>
      </Select>
      <Button type="submit" size="sm" variant="primary">
        Add
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={onDone}>
        Cancel
      </Button>
    </form>
  );
}

function CrewCard({ crew }: { crew: Crew }) {
  const { users, jobs, risks, removeCrewMember, deleteCrew } = useStore();
  const { showToast } = useToast();
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const lead = users.find((u) => u.id === crew.crewLeadId);
  const crewJobs = jobs.filter((j) => j.assignedCrewId === crew.id);
  const completed = crewJobs.filter((j) => ["Completed", "Invoiced", "Paid"].includes(j.status)).length;
  const overdue = crewJobs.filter((j) => j.status === "Blocked" || j.status === "Waiting on Materials").length;
  const crewRisks = risks.filter((r) => r.ownerId === crew.crewLeadId && r.status !== "Resolved");
  const activeCount = getCrewActiveJobCount(crew, jobs);
  const overloaded = isCrewOverloadedLive(crew, jobs);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-charcoal">{crew.crewName}</h3>
        <div className="flex items-center gap-2">
          {overloaded ? <CapacityBadge status="Overloaded" /> : <CapacityBadge status={crew.capacityStatus} />}
          <button onClick={() => setDeleteOpen(true)} className="text-gray-400 hover:text-red-600 cursor-pointer">
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-1">Lead: {lead?.name ?? "Open Lead"}</p>
      <p className="text-xs text-gray-500 mb-3">Specialty: {crew.serviceSpecialty}</p>

      <div className="space-y-1.5 mb-3">
        {crew.members.map((m) => (
          <div key={m.id} className="flex items-center justify-between text-xs border border-gray-100 rounded-md px-2 py-1.5">
            <span className="text-charcoal font-medium">{m.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">{m.role}</span>
              <button onClick={() => removeCrewMember(crew.id, m.id)} className="text-gray-400 hover:text-red-600 cursor-pointer">
                <X size={12} />
              </button>
            </div>
          </div>
        ))}
        {crew.members.length === 0 && <p className="text-xs text-gray-400">No members added.</p>}
      </div>

      {addMemberOpen ? (
        <AddMemberForm crewId={crew.id} onDone={() => setAddMemberOpen(false)} />
      ) : (
        <button
          onClick={() => setAddMemberOpen(true)}
          className="flex items-center gap-1 text-xs text-orange font-medium hover:underline cursor-pointer mb-3"
        >
          <UserPlus size={12} /> Add Member
        </button>
      )}

      <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-3">
        <div>
          <p className="text-lg font-bold text-charcoal">{activeCount}</p>
          <p className="text-[11px] text-gray-400">Active</p>
        </div>
        <div>
          <p className="text-lg font-bold text-charcoal">{completed}</p>
          <p className="text-[11px] text-gray-400">Completed</p>
        </div>
        <div>
          <p className="text-lg font-bold text-red-600">{overdue}</p>
          <p className="text-[11px] text-gray-400">Overdue/Blocked</p>
        </div>
      </div>
      {crewRisks.length > 0 && (
        <p className="text-xs text-red-600 mt-3">{crewRisks.length} risk(s) owned by this crew lead</p>
      )}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Crew"
        description="This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          deleteCrew(crew.id);
          showToast("Crew deleted");
        }}
      />
    </div>
  );
}

export default function CrewsPage() {
  const { crews } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header title="Crews" subtitle="Monitor crew capacity, specialty, and accountability across active jobs." />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Button variant="primary" onClick={() => setOpen(true)}>
            <Plus size={15} /> New Crew
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {crews.map((crew) => (
            <CrewCard key={crew.id} crew={crew} />
          ))}
        </div>
      </div>
      <Modal open={open} onOpenChange={setOpen} title="New Crew" description="Create a new crew.">
        <CreateCrewForm onDone={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
