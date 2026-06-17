"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { Priority } from "@/lib/types";

const priorities: Priority[] = ["Low", "Medium", "High", "Critical"];

export function CreateTaskForm({ jobId, customerId, onDone }: { jobId: string; customerId: string; onDone: () => void }) {
  const { users, createTask } = useStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignedToId, setAssignedToId] = useState(users[0]?.id ?? "");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createTask({
      jobId,
      customerId,
      assignedToId,
      name,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
      priority,
      status: "Not Started",
    });
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Task Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Assigned To</Label>
          <Select value={assignedToId} onChange={(e) => setAssignedToId(e.target.value)}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </Select>
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
      <div>
        <Label>Due Date</Label>
        <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add Task
        </Button>
      </div>
    </form>
  );
}
