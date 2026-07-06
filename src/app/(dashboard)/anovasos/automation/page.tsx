"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Modal, ConfirmDialog } from "@/components/ui/modal";
import { CreateAutomationRuleForm } from "@/components/forms/create-automation-rule-form";
import { EditAutomationForm } from "@/components/forms/edit-automation-form";
import { useStore } from "@/lib/store";
import { AutomationRule } from "@/lib/types";
import { Plus, Zap, Trash2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AutomationRulesPage() {
  const { automationRules, toggleAutomationRule, deleteAutomationRule } = useStore();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editRule, setEditRule] = useState<AutomationRule | null>(null);

  return (
    <div>
      <Header
        title="Automation Rules"
        subtitle="Create simple rules that reduce manual work and keep jobs, crews, and customers moving."
      />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Button variant="primary" onClick={() => setOpen(true)}>
            <Plus size={15} /> New Rule
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {automationRules.map((rule) => (
            <div key={rule.id} className={cn("rounded-xl border bg-white p-5 shadow-sm", rule.isActive ? "border-gray-200" : "border-gray-200 opacity-60")}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap size={15} className="text-orange" />
                  <h3 className="text-sm font-semibold text-charcoal">{rule.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditRule(rule)} className="text-gray-400 hover:text-navy cursor-pointer">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => setDeleteId(rule.id)} className="text-gray-400 hover:text-red-600 cursor-pointer">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-1">
                <span className="font-medium text-gray-600">Trigger:</span> {rule.trigger}
              </p>
              {rule.condition && (
                <p className="text-xs text-gray-500 mb-1">
                  <span className="font-medium text-gray-600">Condition:</span> {rule.condition}
                </p>
              )}
              <p className="text-xs text-gray-500 mb-3">
                <span className="font-medium text-gray-600">Action:</span> {rule.action}
              </p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <span className={cn("text-xs font-medium", rule.isActive ? "text-emerald-600" : "text-gray-400")}>
                  {rule.isActive ? "Active" : "Inactive"}
                </span>
                <button
                  onClick={() => toggleAutomationRule(rule.id)}
                  className={cn(
                    "h-6 w-11 rounded-full transition-colors relative cursor-pointer shrink-0",
                    rule.isActive ? "bg-emerald-500" : "bg-gray-300"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform shadow",
                      rule.isActive ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal open={open} onOpenChange={setOpen} title="New Automation Rule" description="Define a trigger, condition, and action.">
        <CreateAutomationRuleForm onDone={() => setOpen(false)} />
      </Modal>
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Automation Rule"
        description="This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => deleteId && deleteAutomationRule(deleteId)}
      />
      <Modal
        open={!!editRule}
        onOpenChange={(o) => !o && setEditRule(null)}
        title="Edit Automation Rule"
        description="Update the trigger, condition, and action."
      >
        {editRule && <EditAutomationForm rule={editRule} onDone={() => setEditRule(null)} />}
      </Modal>
    </div>
  );
}
