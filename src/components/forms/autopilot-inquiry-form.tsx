"use client";

import { useState } from "react";
import { Zap, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

const industries = [
  "HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping",
  "House Cleaning", "Painting", "Hair Salon / Beauty", "Nail Salon", "General Contracting", "Other",
];

const teamSizes = [
  "Just me (solo operator)",
  "2–5 people",
  "6–15 people",
  "16–50 people",
  "50+ people / multi-location",
];

const tiers = ["Not sure — help me pick", "Basic", "Pro", "Elite", "Enterprise"];

export function AutopilotInquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState(industries[0]);
  const [teamSize, setTeamSize] = useState(teamSizes[0]);
  const [tier, setTier] = useState(tiers[0]);
  const [biggestPain, setBiggestPain] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, phone, industry, teamSize, tier, biggestPain }),
      });
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 mx-auto mb-4">
          <CheckCircle className="text-orange" size={24} />
        </div>
        <p className="text-base font-bold text-charcoal mb-1">You're on our radar, {name.split(" ")[0] || "there"}.</p>
        <p className="text-sm text-gray-500">
          We'll reach out within one business day to walk you through what Autopilot would look like for your operation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 md:p-8 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange to-orange-light text-white shadow-sm">
          <Zap size={15} />
        </span>
        <p className="text-sm font-bold text-charcoal">Get your Autopilot setup</p>
      </div>
      <p className="text-xs text-gray-500 -mt-2">
        Tell us about your business. We'll size the right tier and walk you through exactly what gets automated.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="ap-name">Full Name</Label>
          <Input id="ap-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" required />
        </div>
        <div>
          <Label htmlFor="ap-company">Business Name</Label>
          <Input id="ap-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Titan HVAC" required />
        </div>
        <div>
          <Label htmlFor="ap-email">Email</Label>
          <Input id="ap-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" required />
        </div>
        <div>
          <Label htmlFor="ap-phone">Phone (optional)</Label>
          <Input id="ap-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(501) 555-0100" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="ap-industry">Industry</Label>
          <Select id="ap-industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </Select>
        </div>
        <div>
          <Label htmlFor="ap-size">Team Size</Label>
          <Select id="ap-size" value={teamSize} onChange={(e) => setTeamSize(e.target.value)}>
            {teamSizes.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="ap-tier">Which tier interests you?</Label>
        <Select id="ap-tier" value={tier} onChange={(e) => setTier(e.target.value)}>
          {tiers.map((t) => <option key={t} value={t}>{t}</option>)}
        </Select>
      </div>

      <div>
        <Label htmlFor="ap-pain">What's costing you the most time or money right now? (optional)</Label>
        <Textarea
          id="ap-pain"
          value={biggestPain}
          onChange={(e) => setBiggestPain(e.target.value)}
          placeholder="e.g. Missed calls after hours, chasing unpaid invoices, no-shows..."
          rows={3}
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
        {submitting ? <Loader2 size={15} className="animate-spin" /> : <Zap size={15} />}
        {submitting ? "Sending..." : "Get My Custom Autopilot Walkthrough"}
      </Button>

      <p className="text-[11px] text-gray-400 text-center">
        No pressure. We'll show you exactly what gets automated before you commit to anything.
      </p>
    </form>
  );
}
