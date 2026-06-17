"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { useStore } from "@/lib/store";

export function CreateAutomationRuleForm({ onDone }: { onDone: () => void }) {
  const { createAutomationRule } = useStore();
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState("");
  const [condition, setCondition] = useState("");
  const [action, setAction] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createAutomationRule({ name, trigger, condition, action, isActive: true });
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Rule Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label>Trigger</Label>
        <Input value={trigger} onChange={(e) => setTrigger(e.target.value)} placeholder="e.g. Invoice overdue by 7 days" required />
      </div>
      <div>
        <Label>Condition</Label>
        <Textarea value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="e.g. Invoice status is not Paid" />
      </div>
      <div>
        <Label>Action</Label>
        <Input value={action} onChange={(e) => setAction(e.target.value)} placeholder="e.g. Escalate to office admin" required />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Create Rule
        </Button>
      </div>
    </form>
  );
}
