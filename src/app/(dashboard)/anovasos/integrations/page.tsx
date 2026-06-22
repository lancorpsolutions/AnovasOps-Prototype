"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { CheckCircle2, ClipboardList, CreditCard, Megaphone, Plug } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegrationDef {
  name: string;
  description: string;
}

const categories: { label: string; icon: typeof Plug; tools: IntegrationDef[] }[] = [
  {
    label: "Project Management",
    icon: ClipboardList,
    tools: [
      { name: "ServiceTitan", description: "Sync jobs, scheduling, and dispatch data." },
      { name: "Asana", description: "Push tasks created in AnovasOS to your boards." },
      { name: "Monday.com", description: "Mirror job stages and crew assignments." },
    ],
  },
  {
    label: "Invoicing & Accounting",
    icon: CreditCard,
    tools: [
      { name: "QuickBooks", description: "Sync invoices, payments, and customer balances." },
      { name: "Stripe", description: "Accept card payments directly on invoices." },
      { name: "PayPal", description: "Offer PayPal as a payment option for customers." },
    ],
  },
  {
    label: "CRM",
    icon: Megaphone,
    tools: [
      { name: "HubSpot", description: "Sync leads and opportunities with your CRM." },
      { name: "Salesforce", description: "Keep customer and pipeline data in sync." },
    ],
  },
];

function IntegrationCard({ tool }: { tool: IntegrationDef }) {
  const { connectedIntegrations, connectIntegration, disconnectIntegration } = useStore();
  const { showToast } = useToast();
  const connected = connectedIntegrations.includes(tool.name);

  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 flex items-center justify-between gap-3",
        connected ? "border-emerald-200 bg-emerald-50/40" : "border-gray-200 bg-white"
      )}
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-charcoal">{tool.name}</span>
          {connected && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
              <CheckCircle2 size={12} /> Connected
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{tool.description}</p>
      </div>
      {connected ? (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            disconnectIntegration(tool.name);
            showToast(`${tool.name} disconnected`);
          }}
        >
          Disconnect
        </Button>
      ) : (
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            connectIntegration(tool.name);
            showToast(`${tool.name} connected`);
          }}
        >
          Connect
        </Button>
      )}
    </div>
  );
}

export default function IntegrationsPage() {
  return (
    <div>
      <Header
        title="Integrations"
        subtitle="Connect the project management, invoicing, and CRM tools your team already uses."
      />
      <div className="p-6 space-y-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Icon size={16} className="text-orange" />
                <h3 className="text-sm font-semibold text-charcoal">{cat.label}</h3>
              </div>
              <div className="space-y-2">
                {cat.tools.map((tool) => (
                  <IntegrationCard key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
