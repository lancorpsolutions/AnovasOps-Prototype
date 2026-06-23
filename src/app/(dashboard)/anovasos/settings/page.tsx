"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Modal, ConfirmDialog } from "@/components/ui/modal";
import { Input, Label, Select } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { Role, User, Company } from "@/lib/types";
import { Check, Pencil, Plus, Trash2, X, PhoneMissed } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS as plans } from "@/lib/plans";

const tierOrder: Company["subscriptionTier"][] = ["Startup", "Small Business", "Enterprise"];

const roles: Role[] = ["Owner", "Operations Manager", "Dispatcher", "Crew Lead", "Office Admin"];

function CompanyInfoCard() {
  const { company, updateCompany } = useStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(company.name);
  const [industry, setIndustry] = useState(company.industry);
  const [size, setSize] = useState(String(company.size));
  const [toolsUsed, setToolsUsed] = useState(company.toolsUsed.join(", "));

  function handleSave() {
    updateCompany({
      name,
      industry,
      size: Number(size) || company.size,
      toolsUsed: toolsUsed.split(",").map((t) => t.trim()).filter(Boolean),
    });
    setEditing(false);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-charcoal">Company Info</h3>
        {!editing && (
          <button onClick={() => setEditing(true)} className="text-gray-400 hover:text-navy cursor-pointer">
            <Pencil size={15} />
          </button>
        )}
      </div>
      {editing ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Company Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>Industry</Label>
              <Input value={industry} onChange={(e) => setIndustry(e.target.value)} />
            </div>
            <div>
              <Label>Team Size</Label>
              <Input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
            </div>
            <div>
              <Label>Tools Used (comma separated)</Label>
              <Input value={toolsUsed} onChange={(e) => setToolsUsed(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Company Name" value={company.name} />
          <Field label="Industry" value={company.industry} />
          <Field label="Team Size" value={String(company.size)} />
          <Field label="Subscription Tier" value={company.subscriptionTier} />
          <Field label="Tools Used" value={company.toolsUsed.join(", ")} />
        </div>
      )}
    </div>
  );
}

function ServiceTypesCard() {
  const { serviceTypes, addServiceType, removeServiceType } = useStore();
  const [newType, setNewType] = useState("");

  function handleAdd() {
    if (newType.trim()) {
      addServiceType(newType.trim());
      setNewType("");
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-charcoal mb-3">Service Types</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {serviceTypes.map((s) => (
          <span key={s} className="text-xs pl-3 pr-2 py-1.5 rounded-full bg-gray-100 text-gray-700 flex items-center gap-1.5">
            {s}
            <button onClick={() => removeServiceType(s)} className="text-gray-400 hover:text-red-600 cursor-pointer">
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="New service type"
          className="h-8 text-xs w-48"
        />
        <Button size="sm" variant="outline" onClick={handleAdd}>
          <Plus size={13} /> Add
        </Button>
      </div>
    </div>
  );
}

function UserForm({ user, onDone }: { user?: User; onDone: () => void }) {
  const { createUser, updateUser } = useStore();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<Role>(user?.role ?? "Office Admin");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (user) {
      updateUser(user.id, { name, email, role });
    } else {
      createUser({ name, email, role });
    }
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label>Role</Label>
        <Select value={role} onChange={(e) => setRole(e.target.value as Role)}>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {user ? "Save Changes" : "Add User"}
        </Button>
      </div>
    </form>
  );
}

function UsersCard() {
  const { users, deleteUser } = useStore();
  const { showToast } = useToast();
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  function handleDelete(id: string) {
    if (confirm("Delete this user?")) {
      deleteUser(id);
      showToast("User deleted");
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-charcoal">Users</h3>
        <Button size="sm" variant="primary" onClick={() => setAddOpen(true)}>
          <Plus size={13} /> Add User
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
            <div>
              <p className="text-sm font-medium text-charcoal">{u.name}</p>
              <p className="text-xs text-gray-400">{u.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-navy/5 text-navy font-medium">{u.role}</span>
              <button onClick={() => setEditUser(u)} className="text-gray-400 hover:text-navy cursor-pointer">
                <Pencil size={13} />
              </button>
              <button onClick={() => handleDelete(u.id)} className="text-gray-400 hover:text-red-600 cursor-pointer">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={addOpen} onOpenChange={setAddOpen} title="Add User" description="Create a new team member.">
        <UserForm onDone={() => setAddOpen(false)} />
      </Modal>
      <Modal open={!!editUser} onOpenChange={(o) => !o && setEditUser(null)} title="Edit User" description="Update user details.">
        {editUser && <UserForm user={editUser} onDone={() => setEditUser(null)} />}
      </Modal>
    </div>
  );
}

function SubscriptionPlansCard() {
  const { company, changeSubscriptionTier } = useStore();
  const { showToast } = useToast();
  const [pendingTier, setPendingTier] = useState<Company["subscriptionTier"] | null>(null);
  const currentIndex = tierOrder.indexOf(company.subscriptionTier);

  return (
    <div>
      <h3 className="text-sm font-semibold text-charcoal mb-3">Subscription Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const active = plan.name === company.subscriptionTier;
          const planIndex = tierOrder.indexOf(plan.name as Company["subscriptionTier"]);
          const isUpgrade = planIndex > currentIndex;
          return (
            <div
              key={plan.name}
              className={cn(
                "rounded-xl border bg-white p-5 shadow-sm flex flex-col",
                active ? "border-orange ring-2 ring-orange/20" : "border-gray-200"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-base font-bold text-charcoal">{plan.name}</h4>
                {active && <span className="text-xs bg-orange text-white px-2 py-0.5 rounded-full">Current</span>}
              </div>
              <p className="text-sm font-medium text-orange mb-3">{plan.price}</p>
              <ul className="space-y-1.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-gray-600 flex items-start gap-1.5">
                    <Check size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {!active && (
                <Button
                  size="sm"
                  variant={isUpgrade ? "primary" : "outline"}
                  className="mt-4 w-full"
                  onClick={() => setPendingTier(plan.name as Company["subscriptionTier"])}
                >
                  {isUpgrade ? "Upgrade" : "Downgrade"} to {plan.name}
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <ConfirmDialog
        open={!!pendingTier}
        onOpenChange={(o) => !o && setPendingTier(null)}
        title={pendingTier ? `Switch to ${pendingTier}` : ""}
        description="Your plan will change immediately. You can switch again at any time."
        confirmLabel="Confirm Switch"
        onConfirm={() => {
          if (pendingTier) {
            changeSubscriptionTier(pendingTier);
            showToast(`Subscription switched to ${pendingTier}`);
          }
        }}
      />
    </div>
  );
}

function AutopilotMissedCallCard() {
  const { autopilotSettings, saveAutopilotSettings } = useStore();
  const { showToast } = useToast();
  const [twilioPhoneNumber, setTwilioPhoneNumber] = useState(autopilotSettings.twilioPhoneNumber ?? "");
  const [forwardToPhone, setForwardToPhone] = useState(autopilotSettings.forwardToPhone ?? "");
  const [smsTemplate, setSmsTemplate] = useState(autopilotSettings.missedCallSmsTemplate);

  function handleSave() {
    saveAutopilotSettings({
      twilioPhoneNumber: twilioPhoneNumber.trim() || null,
      forwardToPhone: forwardToPhone.trim() || null,
      missedCallSmsTemplate: smsTemplate,
    });
    showToast("Autopilot settings saved");
  }

  function handleToggle() {
    saveAutopilotSettings({ missedCallTextBackEnabled: !autopilotSettings.missedCallTextBackEnabled });
    showToast(autopilotSettings.missedCallTextBackEnabled ? "Missed-call text-back disabled" : "Missed-call text-back enabled");
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PhoneMissed size={15} className="text-orange" />
          <h3 className="text-sm font-semibold text-charcoal">Anovas Autopilot — Missed-Call Text-Back</h3>
        </div>
        <button
          onClick={handleToggle}
          className={cn(
            "h-5 w-9 rounded-full transition-colors relative cursor-pointer",
            autopilotSettings.missedCallTextBackEnabled ? "bg-emerald-500" : "bg-gray-300"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform shadow",
              autopilotSettings.missedCallTextBackEnabled ? "translate-x-4" : "translate-x-0.5"
            )}
          />
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        When a call to your Twilio number goes unanswered, the caller automatically gets a text-back so the lead
        doesn&apos;t go cold.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <Label>Twilio Phone Number</Label>
          <Input value={twilioPhoneNumber} onChange={(e) => setTwilioPhoneNumber(e.target.value)} placeholder="+15551234567" />
        </div>
        <div>
          <Label>Forward Calls To</Label>
          <Input value={forwardToPhone} onChange={(e) => setForwardToPhone(e.target.value)} placeholder="+15557654321" />
        </div>
      </div>
      <div className="mb-4">
        <Label>Auto-Reply Text Message</Label>
        <Input value={smsTemplate} onChange={(e) => setSmsTemplate(e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button variant="primary" size="sm" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div>
      <Header title="Settings" subtitle="Manage company details, team, service types, and subscription plan." />
      <div className="p-6 space-y-6">
        <CompanyInfoCard />
        <AutopilotMissedCallCard />
        <ServiceTypesCard />
        <UsersCard />
        <SubscriptionPlansCard />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-charcoal">{value}</p>
    </div>
  );
}
