import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "./tracked-link";
import { Container } from "./section";
import { ROUTES } from "@/lib/site/config";

/** Closing conversion section: the diagnostic first, a consultation second. */
export function CtaBand({
  location,
  title = "Find out which system to fix first.",
  lead = "The Business Systems Diagnostic takes about three minutes. You'll see your score across Acquisition, Revenue, Operations, and Systems before you ever talk to us.",
}: {
  location: string;
  title?: string;
  lead?: string;
}) {
  return (
    <section className="surface-ink relative overflow-hidden text-white">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <Container className="relative py-16 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">{title}</h2>
          <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">{lead}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="primary" size="lg">
              <TrackedLink href={ROUTES.diagnostic} location={location} ctaId="diagnostic">
                Get Your Business Systems Diagnostic <ArrowRight size={16} aria-hidden="true" />
              </TrackedLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/25 bg-white/5 text-white hover:bg-white/10">
              <TrackedLink href={ROUTES.book} location={location} ctaId="book">
                Book a consultation
              </TrackedLink>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
