"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

const businessTypes = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Pest Control",
  "Auto Repair",
  "General Contractor",
  "Other",
];

export function AutopilotInquiryForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState(businessTypes[0]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [challenge, setChallenge] = useState("");
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
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          company: businessName,
          phone,
          industry: businessType,
          biggestPain: challenge,
        }),
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
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange/10 mx-auto mb-4">
          <CheckCircle className="text-orange" size={28} />
        </div>
        <p className="text-base font-bold text-charcoal mb-2">
          You&apos;re on our radar, {firstName || "there"}.
        </p>
        <p className="text-sm text-gray-500 max-w-xs mx-auto">
          We&apos;ll be in touch within 24 hours to schedule your free Admin Audit.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 md:p-8 space-y-4"
    >
      <div className="flex items-center gap-2.5 mb-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange to-orange-light text-white shadow-sm">
          <svg width="14" height="17" viewBox="0 0 14 17" fill="none" aria-hidden="true">
            <path
              d="M7 0C7 0 11.5 4.5 11.5 8.5C11.5 11.2 9.5 13.5 7 13.5C4.5 13.5 2.5 11.2 2.5 8.5C2.5 6.5 3.5 5 4.5 4C4.5 6 6 7 6 7C6 5 7 3 7 0Z"
              fill="white"
            />
            <path
              d="M7 11C5.9 11 5 11.9 5 13C5 14.1 5.9 15 7 15C8.1 15 9 14.1 9 13C9 11.9 8.1 11 7 11Z"
              fill="white"
              fillOpacity="0.7"
            />
          </svg>
        </span>
        <p className="text-sm font-bold text-charcoal">Book your free Admin Audit</p>
      </div>
      <p className="text-xs text-gray-500 -mt-2">
        We&apos;ll map out exactly what&apos;s costing your business — and show you what Autopilot fixes.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="ap-first-name">First Name</Label>
          <Input
            id="ap-first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Jane"
            required
          />
        </div>
        <div>
          <Label htmlFor="ap-last-name">Last Name</Label>
          <Input
            id="ap-last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Smith"
            required
          />
        </div>
        <div>
          <Label htmlFor="ap-business-name">Business Name</Label>
          <Input
            id="ap-business-name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Titan HVAC"
            required
          />
        </div>
        <div>
          <Label htmlFor="ap-business-type">Business Type</Label>
          <Select
            id="ap-business-type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          >
            {businessTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="ap-phone">Phone Number</Label>
          <Input
            id="ap-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(501) 555-0100"
            required
          />
        </div>
        <div>
          <Label htmlFor="ap-email">Email</Label>
          <Input
            id="ap-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@titanhvac.com"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="ap-challenge">
          What&apos;s your biggest operational challenge right now?
        </Label>
        <Textarea
          id="ap-challenge"
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          placeholder="e.g. We miss too many calls after hours and leads go cold before we can follow up..."
          rows={3}
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Sending...
          </>
        ) : (
          "Book My Free Admin Audit"
        )}
      </Button>

      <p className="text-[11px] text-gray-400 text-center">
        No pitch, no pressure. We&apos;ll show you the numbers before you commit to anything.
      </p>
    </form>
  );
}
