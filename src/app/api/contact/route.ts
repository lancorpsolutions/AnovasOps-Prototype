import { NextRequest, NextResponse } from "next/server";
import { clientIp, processLead } from "@/lib/leads/process";

// Legacy endpoint kept for backward compatibility. Site forms now post to
// /api/leads; this maps the old payload shape onto the shared pipeline.
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const isDiagnostic = body.arosScore !== undefined;
  const isAutopilot = !isDiagnostic && !!(body.industry || body.teamSize || body.tier);
  const extra = [
    body.teamSize && `Team size: ${body.teamSize}`,
    body.tier && `Interested tier: ${body.tier}`,
  ].filter(Boolean);

  const result = await processLead(
    {
      offer: isDiagnostic ? "diagnostic" : isAutopilot ? "autopilot-inquiry" : "contact",
      submissionId: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      company: body.company,
      phone: body.phone,
      industry: body.industry,
      message: [body.message ?? body.biggestPain, ...extra].filter(Boolean).join("\n") || undefined,
      diagnostic: isDiagnostic
        ? {
            score: body.arosScore,
            band: body.scoreBand,
            pillars: { A: body.pillarA, R: body.pillarR, O: body.pillarO, S: body.pillarS },
            recommendation: body.recommendation,
          }
        : undefined,
    },
    clientIp(request.headers)
  );

  return NextResponse.json(
    { ok: result.body.ok, crmSynced: result.body.crm === "synced", errors: result.body.errors },
    { status: result.status }
  );
}
