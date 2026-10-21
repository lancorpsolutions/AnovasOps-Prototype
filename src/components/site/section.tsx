import { cn } from "@/lib/utils";

type Tone = "light" | "muted" | "ink";

const toneClasses: Record<Tone, string> = {
  light: "bg-white text-charcoal",
  muted: "bg-background text-charcoal",
  ink: "surface-ink text-white",
};

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6", className)}>{children}</div>;
}

export function Section({
  id,
  tone = "light",
  className,
  containerClassName,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative scroll-mt-20 py-16 md:py-24", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, tone = "light", className }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return (
    <p
      className={cn(
        "mb-3 text-xs font-semibold uppercase tracking-[0.16em]",
        tone === "ink" ? "text-orange-light" : "text-orange",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("mb-10 md:mb-14 max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]",
          tone === "ink" ? "text-white" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-4 text-base md:text-lg leading-relaxed", tone === "ink" ? "text-white/70" : "text-muted-ink")}>
          {lead}
        </p>
      )}
    </div>
  );
}

/** Label for any simulated interface or sample data, so nothing reads as a live product claim. */
export function IllustrativeBadge({ children = "Illustrative · sample data", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-signal",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
      {children}
    </span>
  );
}

export function TypeBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-navy/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy",
        className
      )}
    >
      {children}
    </span>
  );
}
