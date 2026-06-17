"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { ServiceType } from "@/lib/types";

const serviceTypes: ServiceType[] = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Pest Control",
  "General Contracting",
];

export function CreateCrewForm({ onDone }: { onDone: () => void }) {
  const { users, createCrew } = useStore();
  const [crewName, setCrewName] = useState("");
  const [crewLeadId, setCrewLeadId] = useState("");
  const [serviceSpecialty, setServiceSpecialty] = useState<ServiceType>("HVAC");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createCrew({
      crewName,
      crewLeadId: crewLeadId || null,
      crewMembers: [],
      members: [],
      serviceSpecialty,
      activeJobs: 0,
      capacityStatus: "Available",
    });
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Crew Name</Label>
        <Input value={crewName} onChange={(e) => setCrewName(e.target.value)} required placeholder="e.g. HVAC Crew D" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Crew Lead</Label>
          <Select value={crewLeadId} onChange={(e) => setCrewLeadId(e.target.value)}>
            <option value="">Open Lead</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Service Specialty</Label>
          <Select value={serviceSpecialty} onChange={(e) => setServiceSpecialty(e.target.value as ServiceType)}>
            {serviceTypes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Create Crew
        </Button>
      </div>
    </form>
  );
}
