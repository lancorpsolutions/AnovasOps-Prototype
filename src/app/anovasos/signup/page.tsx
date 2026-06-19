"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/client";
import { Company } from "@/lib/types";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const plans: { name: Company["subscriptionTier"]; price: string; blurb: string }[] = [
  { name: "Startup", price: "$1,000/mo", blurb: "Up to 3 workflows, basic command center." },
  { name: "Small Business", price: "$2,500/mo", blurb: "Advanced dashboard, automations, crew tracking." },
  { name: "Enterprise", price: "$5,000/mo", blurb: "Unlimited workflows, full reporting, priority support." },
];

const industries = ["HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping", "Pest Control", "General Contracting"];

export default function SignupPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState(industries[0]);
  const [plan, setPlan] = useState<Company["subscriptionTier"]>("Small Business");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFinish() {
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          company_name: companyName || "My Company",
          industry,
          subscription_tier: plan,
        },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    showToast("Account created — welcome to AnovasOS");
    router.push("/anovasos");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="h-9 w-9 rounded-lg bg-orange flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <p className="text-xl font-bold text-charcoal">
            Anovas<span className="text-orange">OS</span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 w-12 rounded-full",
                s <= step ? "bg-orange" : "bg-gray-200"
              )}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-charcoal mb-1">Create your account</h2>
            <div>
              <Label>Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" />
            </div>
            <div>
              <Label>Work Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button variant="primary" className="w-full mt-2" onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-charcoal mb-1">Tell us about your business</h2>
            <div>
              <Label>Company Name</Label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Titan HVAC & Plumbing" />
            </div>
            <div>
              <Label>Primary Industry</Label>
              <Select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="primary" className="w-full" onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-charcoal mb-1">Choose your plan</h2>
            <div className="space-y-2">
              {plans.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setPlan(p.name)}
                  className={cn(
                    "w-full text-left border rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer",
                    plan === p.name ? "border-orange ring-2 ring-orange/20" : "border-gray-200"
                  )}
                >
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.blurb}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-orange">{p.price}</span>
                    {plan === p.name && <Check size={16} className="text-orange" />}
                  </div>
                </button>
              ))}
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <div className="flex gap-2 mt-2">
              <Button variant="outline" className="w-full" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button variant="primary" className="w-full" onClick={handleFinish} disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-5">
          Already have an account?{" "}
          <Link href="/anovasos/login" className="text-orange font-medium">
            Log in
          </Link>
        </p>
        <p className="text-[11px] text-gray-400 text-center mt-3">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="text-orange font-medium">
            Terms
          </Link>
          ,{" "}
          <Link href="/privacy" className="text-orange font-medium">
            Privacy Policy
          </Link>
          , and{" "}
          <Link href="/cookies" className="text-orange font-medium">
            Cookie Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
