"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export function ContactForm() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });
      setSent(true);
      showToast("Thanks — we'll be in touch soon.");
    } catch {
      showToast("Something went wrong sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 text-center">
        <p className="text-sm font-semibold text-charcoal mb-1">Thanks, {name.split(" ")[0] || "there"}.</p>
        <p className="text-xs text-gray-500">We&apos;ve got your message and will follow up shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-3">
      <div>
        <Label htmlFor="contact-name">Full Name</Label>
        <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" required />
      </div>
      <div>
        <Label htmlFor="contact-email">Work Email</Label>
        <Input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@yourcompany.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="contact-company">Company Name</Label>
        <Input id="contact-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Titan HVAC & Plumbing" />
      </div>
      <div>
        <Label htmlFor="contact-message">How can we help?</Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a bit about your business and what you're looking for."
          required
        />
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
        {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
