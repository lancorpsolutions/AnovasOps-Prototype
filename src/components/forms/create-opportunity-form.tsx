"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { SalesOpportunity, ServiceType } from "@/lib/types";
import { useToast } from "@/components/ui/toast";

const serviceTypes: ServiceType[] = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Pest Control",
  "General Contracting",
];

export function CreateOpportunityForm({
  onDone,
  opportunity,
}: {
  onDone: () => void;
  opportunity?: SalesOpportunity;
}) {
  const { customers, users, createOpportunity, updateOpportunity } = useStore();
  const { showToast } = useToast();
  const [customerId, setCustomerId] = useState(opportunity?.customerId ?? customers[0]?.id ?? "");
  const [serviceType, setServiceType] = useState<ServiceType>(opportunity?.serviceType ?? "HVAC");
  const [estimatedValue, setEstimatedValue] = useState(opportunity ? String(opportunity.estimatedValue) : "");
  const [ownerId, setOwnerId] = useState(opportunity?.ownerId ?? users[0]?.id ?? "");
  const [followUpDate, setFollowUpDate] = useState(
    opportunity ? opportunity.followUpDate.slice(0, 10) : ""
  );
  const [notes, setNotes] = useState(opportunity?.notes ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      customerId,
      serviceType,
      estimatedValue: Number(estimatedValue) || 0,
      stage: opportunity?.stage ?? ("Lead Received" as const),
      ownerId,
      followUpDate: followUpDate ? new Date(followUpDate).toISOString() : new Date().toISOString(),
      notes,
    };
    if (opportunity) {
      updateOpportunity(opportunity.id, data);
      showToast("Sales opportunity updated");
    } else {
      createOpportunity(data);
      showToast("Sales opportunity created");
    }
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Customer</Label>
        <Select value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.customerName}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Service Type</Label>
          <Select value={serviceType} onChange={(e) => setServiceType(e.target.value as ServiceType)}>
            {serviceTypes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Estimated Value</Label>
          <Input type="number" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} placeholder="0" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Owner</Label>
          <Select value={ownerId} onChange={(e) => setOwnerId(e.target.value)}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Follow-Up Date</Label>
          <Input type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} required />
        </div>
      </div>
      <div>
        <Label>Notes</Label>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {opportunity ? "Save Changes" : "Create Opportunity"}
        </Button>
      </div>
    </form>
  );
}
