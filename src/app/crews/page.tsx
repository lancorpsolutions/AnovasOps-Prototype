"use client";

import { Header } from "@/components/layout/header";
import { CapacityBadge } from "@/components/shared/badges";
import { useStore } from "@/lib/store";

export default function CrewsPage() {
  const { crews, users, jobs, risks } = useStore();

  return (
    <div>
      <Header title="Crews" subtitle="Monitor crew capacity, specialty, and accountability across active jobs." />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {crews.map((crew) => {
          const lead = users.find((u) => u.id === crew.crewLeadId);
          const crewJobs = jobs.filter((j) => j.assignedCrewId === crew.id);
          const completed = crewJobs.filter((j) => ["Completed", "Invoiced", "Paid"].includes(j.status)).length;
          const overdue = crewJobs.filter((j) => j.status === "Blocked" || j.status === "Waiting on Materials").length;
          const crewRisks = risks.filter((r) => r.ownerId === crew.crewLeadId && r.status !== "Resolved");

          return (
            <div key={crew.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-charcoal">{crew.crewName}</h3>
                <CapacityBadge status={crew.capacityStatus} />
              </div>
              <p className="text-xs text-gray-500 mb-1">Lead: {lead?.name ?? "Open Lead"}</p>
              <p className="text-xs text-gray-500 mb-1">Specialty: {crew.serviceSpecialty}</p>
              <p className="text-xs text-gray-500 mb-3">Members: {crew.crewMembers.join(", ")}</p>
              <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-3">
                <div>
                  <p className="text-lg font-bold text-charcoal">{crew.activeJobs}</p>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
