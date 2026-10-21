"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { LEAD_MAGNETS, LeadMagnetSlug } from "@/lib/lead-magnets";
import { track } from "@/lib/analytics/client";
import { LeadSubmitError, newSubmissionId, submitLead } from "@/lib/leads/client";
import { ROUTES } from "@/lib/site/config";
import { FieldError, Honeypot } from "./honeypot";

export function LeadCaptureForm({ leadMagnet }: { leadMagnet: LeadMagnetSlug }) {
  const magnet = LEAD_MAGNETS[leadMagnet];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const submissionId = useRef(newSubmissionId());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});
    try {
      await submitLead(leadMagnet, { name, email, company, website }, submissionId.current);
      setUnlocked(true);
    } catch (err) {
      if (err instanceof LeadSubmitError && Object.keys(err.fieldErrors).length && !err.fieldErrors.form) {
        setFieldErrors(err.fieldErrors);
        setError(err.message);
      } else {
        // The guide is a static file; don't hold it hostage to a server or CRM problem.
        setUnlocked(true);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (unlocked) {
    return (
      <div role="status" className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 text-center">
        <p className="text-base font-semibold text-charcoal mb-1">You&apos;re in, {name.split(" ")[0] || "there"}.</p>
        <p className="text-sm text-muted-ink mb-4">Your guide is ready to download.</p>
        <Button asChild variant="primary" size="lg" className="w-full">
          <a href={magnet.pdfPath} download onClick={() => track("guide_download", { file_name: leadMagnet }, leadMagnet)}>
            <Download size={16} aria-hidden="true" />
            Download the guide (PDF)
          </a>
        </Button>
        <p className="mt-4 text-sm text-muted-ink">
          Next: find out which of these leaks is costing you most with the{" "}
          <Link href={ROUTES.diagnostic} className="font-medium text-navy underline">free 3-minute diagnostic</Link>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="relative rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-3">
      <div>
        <p className="text-base font-semibold text-charcoal">Get the free guide</p>
        <p className="text-sm text-muted-ink">{magnet.title}. Instant download.</p>
      </div>
      <div>
        <Label htmlFor="lead-name">Full name</Label>
        <Input id="lead-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required aria-invalid={!!fieldErrors.name} aria-describedby="lead-name-err" />
        <FieldError id="lead-name-err" message={fieldErrors.name} />
      </div>
      <div>
        <Label htmlFor="lead-email">Work email</Label>
        <Input id="lead-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-invalid={!!fieldErrors.email} aria-describedby="lead-email-err" />
        <FieldError id="lead-email-err" message={fieldErrors.email} />
      </div>
      <div>
        <Label htmlFor="lead-company">Company name</Label>
        <Input id="lead-company" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <Honeypot id="lead-website" value={website} onChange={setWebsite} />
      {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
        {submitting ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Download size={16} aria-hidden="true" />}
        {submitting ? "Sending..." : "Send me the guide"}
      </Button>
      <p className="text-xs text-muted-ink text-center">
        No spam. Unsubscribe anytime. See our{" "}
        <Link href="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link>.
      </p>
    </form>
  );
}
