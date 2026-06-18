"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

const PDF_PATH = "/lead-magnets/anovas-revenue-leaks-guide.pdf";

export function LeadCaptureForm() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setUnlocked(true);
      showToast(`Sent! Check ${email} for your copy of the guide.`);
    }, 600);
  }

  if (unlocked) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 text-center">
        <p className="text-sm font-semibold text-charcoal mb-1">You&apos;re in, {name.split(" ")[0] || "there"}.</p>
        <p className="text-xs text-gray-500 mb-4">
          Your guide is ready below. We also sent a copy to {email}.
        </p>
        <Button asChild variant="primary" size="lg" className="w-full">
          <a href={PDF_PATH} download>
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
        <p className="text-xs text-gray-500">5 Hidden Revenue Leaks in Home Service Businesses — instant download.</p>
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
      <p className="text-[11px] text-gray-400 text-center">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
