"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { LEAD_MAGNETS, LeadMagnetSlug } from "@/lib/lead-magnets";

export function LeadCaptureForm({ leadMagnet }: { leadMagnet: LeadMagnetSlug }) {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pdfPath, setPdfPath] = useState(LEAD_MAGNETS[leadMagnet].pdfPath);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, leadMagnet }),
      });
      const data = await res.json();
      setPdfPath(data.pdfPath || LEAD_MAGNETS[leadMagnet].pdfPath);
      setUnlocked(true);
      showToast(
        data.crmSynced
          ? `You're in! Your guide is ready below.`
          : `Your guide is ready below. (CRM sync skipped — no HubSpot connection configured.)`
      );
    } catch {
      showToast("Something went wrong sending your guide. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (unlocked) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 text-center">
        <p className="text-sm font-semibold text-charcoal mb-1">You&apos;re in, {name.split(" ")[0] || "there"}.</p>
        <p className="text-xs text-gray-500 mb-4">Your guide is ready to download below.</p>
        <Button asChild variant="primary" size="lg" className="w-full">
          <a href={pdfPath} download>
            <Download size={16} />
            Download the Guide (PDF)
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-3">
      <div>
        <p className="text-sm font-semibold text-charcoal">Get the free guide</p>
        <p className="text-xs text-gray-500">{LEAD_MAGNETS[leadMagnet].title} — instant download.</p>
      </div>
      <div>
        <Label htmlFor="lead-name">Full Name</Label>
        <Input id="lead-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" required />
      </div>
      <div>
        <Label htmlFor="lead-email">Work Email</Label>
        <Input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@yourcompany.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="lead-company">Company Name</Label>
        <Input id="lead-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Titan HVAC & Plumbing" />
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
        {submitting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        {submitting ? "Sending..." : "Send Me the Guide"}
      </Button>
      <p className="text-[11px] text-gray-400 text-center">
        No spam. Unsubscribe anytime. See our{" "}
        <a href="/privacy" className="underline hover:text-gray-600">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
