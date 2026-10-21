import { NextRequest, NextResponse } from "next/server";
import { LEAD_MAGNETS } from "@/lib/lead-magnets";
import { clientIp, processLead } from "@/lib/leads/process";

// Legacy endpoint kept for backward compatibility. The site's guide form now
// posts to /api/leads with offer "revenue-leaks-guide".
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const slug = body.leadMagnet;
  if (typeof slug !== "string" || !Object.hasOwn(LEAD_MAGNETS, slug)) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 400 });
  }
  const magnet = LEAD_MAGNETS[slug as keyof typeof LEAD_MAGNETS];

  const result = await processLead(
    {
      offer: "revenue-leaks-guide",
      submissionId: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      company: body.company,
    },
    clientIp(request.headers)
  );

  if (!result.body.ok) {
    return NextResponse.json({ ok: false, errors: result.body.errors }, { status: result.status });
  }
  return NextResponse.json({ ok: true, crmSynced: result.body.crm === "synced", pdfPath: magnet.pdfPath });
}
