"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { LeadSubmitError, newSubmissionId, submitLead } from "@/lib/leads/client";
import { ROUTES } from "@/lib/site/config";
import { FieldError, Honeypot } from "./honeypot";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const submissionId = useRef(newSubmissionId());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});
    try {
      await submitLead("contact", { name, email, company, phone: phone || undefined, message, website }, submissionId.current);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      if (err instanceof LeadSubmitError) setFieldErrors(err.fieldErrors);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 text-center">
        <p className="text-base font-semibold text-charcoal mb-1">Thanks, {name.split(" ")[0] || "there"}.</p>
        <p className="text-sm text-muted-ink">We&apos;ve got your message and will reply, typically within one business day.</p>
        <p className="mt-4 text-sm text-muted-ink">
          Want to skip the back-and-forth?{" "}
          <Link href={`${ROUTES.book}?from=contact`} className="font-medium text-navy underline">Book a time now</Link>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="relative rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-3">
      <div>
        <Label htmlFor="contact-name">Full name</Label>
        <Input id="contact-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required aria-invalid={!!fieldErrors.name} aria-describedby="contact-name-err" />
        <FieldError id="contact-name-err" message={fieldErrors.name} />
      </div>
      <div>
        <Label htmlFor="contact-email">Work email</Label>
        <Input id="contact-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-invalid={!!fieldErrors.email} aria-describedby="contact-email-err" />
        <FieldError id="contact-email-err" message={fieldErrors.email} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-company">Company</Label>
          <Input id="contact-company" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="contact-phone">Phone <span className="text-gray-400">(optional)</span></Label>
          <Input id="contact-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!fieldErrors.phone} aria-describedby="contact-phone-err" />
          <FieldError id="contact-phone-err" message={fieldErrors.phone} />
        </div>
      </div>
      <div>
        <Label htmlFor="contact-message">How can we help?</Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a bit about your business and what you're looking for."
          required
          aria-invalid={!!fieldErrors.message}
          aria-describedby="contact-message-err"
        />
        <FieldError id="contact-message-err" message={fieldErrors.message} />
      </div>
      <Honeypot id="contact-website" value={website} onChange={setWebsite} />
      {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
        {submitting ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
        {submitting ? "Sending..." : "Send message"}
      </Button>
      <p className="text-xs text-muted-ink text-center">
        We&apos;ll only use your details to reply. See our <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </form>
  );
}
