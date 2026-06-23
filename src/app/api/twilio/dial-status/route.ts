import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateTwilioSignature, sendSms, twiml } from "@/lib/twilio";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const params = Object.fromEntries(new URLSearchParams(rawBody));
  const signature = request.headers.get("X-Twilio-Signature");
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/twilio/dial-status`;

  if (!validateTwilioSignature(url, params, signature)) {
    return new Response("Invalid signature", { status: 403 });
  }

  const fromNumber = params.From;
  const toNumber = params.To;
  const callSid = params.CallSid;
  const dialCallStatus = params.DialCallStatus;
  const wasMissed = dialCallStatus !== "completed";

  const admin = createAdminClient();

  const { data: settings } = await admin
    .from("autopilot_settings")
    .select("*")
    .eq("twilio_phone_number", toNumber)
    .maybeSingle();

  if (!settings) {
    return twiml("");
  }

  let customerId: string | null = null;
  let smsSent = false;

  if (wasMissed) {
    const { data: existingCustomer } = await admin
      .from("customers")
      .select("id")
      .eq("company_id", settings.company_id)
      .eq("phone", fromNumber)
      .maybeSingle();

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const { data: newCustomer } = await admin
        .from("customers")
        .insert({
          company_id: settings.company_id,
          customer_name: `Missed Call - ${fromNumber}`,
          primary_contact: fromNumber,
          email: "",
          phone: fromNumber,
          address: "",
          status: "Prospect",
          open_jobs: 0,
          total_revenue: 0,
          risk_status: "Healthy",
          last_activity: new Date().toISOString(),
        })
        .select("id")
        .single();
      customerId = newCustomer?.id ?? null;
    }

    await admin.from("activity_events").insert({
      company_id: settings.company_id,
      message: `Missed call from ${fromNumber} — auto text-back sent`,
      category: "automation",
    });

    try {
      await sendSms(fromNumber, toNumber, settings.missed_call_sms_template);
      smsSent = true;
    } catch (error) {
      console.error("Failed to send missed-call SMS:", error);
    }
  }

  await admin.from("call_events").insert({
    company_id: settings.company_id,
    call_sid: callSid,
    from_number: fromNumber,
    to_number: toNumber,
    dial_call_status: dialCallStatus,
    sms_sent: smsSent,
    customer_id: customerId,
  });

  return twiml("");
}
