"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { RelatedArea } from "@/lib/types";

const areas: RelatedArea[] = [
  "Sales",
  "Estimates",
  "Scheduling",
  "Job Delivery",
  "Invoicing",
  "Customer Escalation",
  "Reviews",
];

export function CreateSOPForm({ onDone }: { onDone: () => void }) {
  const { users, createSOP } = useStore();
  const [title, setTitle] = useState("");
  const [relatedArea, setRelatedArea] = useState<RelatedArea>("Sales");
  const [processDescription, setProcessDescription] = useState("");
  const [stepsText, setStepsText] = useState("");
  const [ownerId, setOwnerId] = useState(users[0]?.id ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createSOP({
      title,
      relatedArea,
      processDescription,
      steps: stepsText.split("\n").map((s) => s.trim()).filter(Boolean),
      ownerId,
      status: "Draft",
    });
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Related Area</Label>
          <Select value={relatedArea} onChange={(e) => setRelatedArea(e.target.value as RelatedArea)}>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>
        </div>
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
      </div>
      <div>
        <Label>Process Description</Label>
        <Textarea value={processDescription} onChange={(e) => setProcessDescription(e.target.value)} required />
      </div>
      <div>
        <Label>Steps (one per line)</Label>
        <Textarea value={stepsText} onChange={(e) => setStepsText(e.target.value)} placeholder={"Step 1\nStep 2\nStep 3"} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Create SOP
        </Button>
      </div>
    </form>
  );
}
