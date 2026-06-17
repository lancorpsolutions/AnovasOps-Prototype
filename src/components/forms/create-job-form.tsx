"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { Priority, ServiceType } from "@/lib/types";

const serviceTypes: ServiceType[] = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Pest Control",
  "General Contracting",
];
const priorities: Priority[] = ["Low", "Medium", "High", "Critical"];

export function CreateJobForm({ onDone }: { onDone: () => void }) {
  const { customers, users, crews, createJob } = useStore();
  const [customerId, setCustomerId] = useState(customers[0]?.id ?? "");
  const [jobName, setJobName] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("HVAC");
  const [jobValue, setJobValue] = useState("");
  const [jobManagerId, setJobManagerId] = useState(users[0]?.id ?? "");
  const [assignedCrewId, setAssignedCrewId] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [scheduledStartDate, setScheduledStartDate] = useState("");
  const [scheduledEndDate, setScheduledEndDate] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createJob({
      customerId,
      jobName,
      serviceType,
      jobValue: Number(jobValue) || 0,
      jobManagerId,
      assignedCrewId: assignedCrewId || null,
      status: "Not Scheduled",
      priority,
      scheduledStartDate: scheduledStartDate ? new Date(scheduledStartDate).toISOString() : new Date().toISOString(),
      scheduledEndDate: scheduledEndDate ? new Date(scheduledEndDate).toISOString() : new Date().toISOString(),
      actualStartDate: null,
      actualEndDate: null,
      address,
      notes: "",
    });
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Job Name</Label>
        <Input value={jobName} onChange={(e) => setJobName(e.target.value)} required placeholder="e.g. Rooftop HVAC Replacement" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Customer</Label>
          <Select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.customerName}
              </option>
            ))}
          </Select>
        </div>
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
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Job Value</Label>
          <Input type="number" value={jobValue} onChange={(e) => setJobValue(e.target.value)} required placeholder="0" />
        </div>
        <div>
          <Label>Priority</Label>
          <Select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Job Manager</Label>
          <Select value={jobManagerId} onChange={(e) => setJobManagerId(e.target.value)}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Assigned Crew</Label>
          <Select value={assignedCrewId} onChange={(e) => setAssignedCrewId(e.target.value)}>
            <option value="">Unassigned</option>
            {crews.map((c) => (
              <option key={c.id} value={c.id}>
                {c.crewName}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Scheduled Start</Label>
          <Input type="date" value={scheduledStartDate} onChange={(e) => setScheduledStartDate(e.target.value)} required />
        </div>
        <div>
          <Label>Scheduled End</Label>
          <Input type="date" value={scheduledEndDate} onChange={(e) => setScheduledEndDate(e.target.value)} required />
        </div>
      </div>
      <div>
        <Label>Address</Label>
        <Textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Job site address" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Create Job
        </Button>
      </div>
    </form>
  );
}
