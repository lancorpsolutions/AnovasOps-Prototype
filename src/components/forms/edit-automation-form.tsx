"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { AutomationRule } from "@/lib/types";

export function EditAutomationForm({ rule, onDone }: { rule: AutomationRule; onDone: () => void }) {
  const { updateAutomationRule } = useStore();
  const [name, setName] = useState(rule.name);
  const [trigger, setTrigger] = useState(rule.trigger);
  const [condition, setCondition] = useState(rule.condition);
  const [action, setAction] = useState(rule.action);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateAutomationRule(rule.id, { name, trigger, condition, action, isActive: rule.isActive });
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
        <Input value={trigger} onChange={(e) => setTrigger(e.target.value)} required />
      </div>
      <div>
        <Label>Condition</Label>
        <Textarea value={condition} onChange={(e) => setCondition(e.target.value)} />
      </div>
      <div>
        <Label>Action</Label>
        <Input value={action} onChange={(e) => setAction(e.target.value)} required />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
