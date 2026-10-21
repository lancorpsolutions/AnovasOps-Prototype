import { NextRequest, NextResponse } from "next/server";
import { clientIp, processLead } from "@/lib/leads/process";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }
  const result = await processLead(body, clientIp(request.headers));
  return NextResponse.json(result.body, { status: result.status });
}
