import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateTwilioSignature, twiml, escapeXml } from "@/lib/twilio";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const params = Object.fromEntries(new URLSearchParams(rawBody));
  const signature = request.headers.get("X-Twilio-Signature");
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/twilio/voice`;

  if (!validateTwilioSignature(url, params, signature)) {
    return new Response("Invalid signature", { status: 403 });
  }

  const toNumber = params.To;
  const admin = createAdminClient();

  const { data: settings } = await admin
    .from("autopilot_settings")
    .select("*")
    .eq("twilio_phone_number", toNumber)
    .eq("missed_call_text_back_enabled", true)
    .maybeSingle();

  if (!settings || !settings.forward_to_phone) {
    return twiml(`<Say>Thanks for calling. We are unable to take your call right now.</Say>`);
  }

  return twiml(
    `<Dial timeout="20" action="/api/twilio/dial-status"><Number>${escapeXml(settings.forward_to_phone)}</Number></Dial>`
  );
}
