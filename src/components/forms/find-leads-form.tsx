"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { ServiceType } from "@/lib/types";
import { LeadResult } from "@/app/api/leads/search/route";
import { Loader2, Search } from "lucide-react";

const serviceTypes: ServiceType[] = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Pest Control",
  "General Contracting",
];

export function FindLeadsForm({ onDone }: { onDone: () => void }) {
  const { createCustomer } = useStore();
  const { showToast } = useToast();
  const [serviceType, setServiceType] = useState<ServiceType>("HVAC");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<LeadResult[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    setSelected(new Set());
    try {
      const res = await fetch("/api/leads/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: `${serviceType} contractors`, location }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Search failed");
      setResults(data.leads);
      if (data.leads.length === 0) setError("No businesses found for that search.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }

  function toggle(placeId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(placeId)) next.delete(placeId);
      else next.add(placeId);
      return next;
    });
  }

  function handleImport() {
    const chosen = results.filter((r) => selected.has(r.placeId));
    if (chosen.length === 0) return;
    setImporting(true);
    for (const lead of chosen) {
      createCustomer({
        customerName: lead.name,
        primaryContact: "",
        email: "",
        phone: lead.phone,
        address: lead.address,
        status: "Prospect",
        openJobs: 0,
        totalRevenue: 0,
        riskStatus: "Healthy",
        lastActivity: new Date().toISOString(),
      });
    }
    showToast(`Imported ${chosen.length} lead${chosen.length === 1 ? "" : "s"}`);
    setImporting(false);
    onDone();
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-3">
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
            <Label>Location</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              required
            />
          </div>
        </div>
        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
          {loading ? "Searching..." : "Search Businesses"}
        </Button>
      </form>

      {error && <p className="text-xs text-red-600">{error}</p>}

      {results.length > 0 && (
        <div className="space-y-2">
          <div className="max-h-64 overflow-y-auto space-y-1.5 border border-gray-200 rounded-md p-2">
            {results.map((lead) => (
              <label
                key={lead.placeId}
                className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={selected.has(lead.placeId)}
                  onChange={() => toggle(lead.placeId)}
                />
                <div>
                  <p className="font-medium text-charcoal">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.address}</p>
                  <p className="text-xs text-gray-400">
                    {lead.phone || "No phone listed"}
                    {lead.rating ? ` · ${lead.rating}★ (${lead.reviewCount})` : ""}
                  </p>
                </div>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onDone}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              disabled={selected.size === 0 || importing}
              onClick={handleImport}
            >
              {importing ? "Importing..." : `Import ${selected.size || ""} Lead${selected.size === 1 ? "" : "s"}`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
