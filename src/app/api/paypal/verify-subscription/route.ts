import { NextRequest, NextResponse } from "next/server";
import { getSubscription } from "@/lib/paypal";

const PLAN_ID_BY_TIER: Record<string, string | undefined> = {
  Startup: process.env.NEXT_PUBLIC_PAYPAL_PLAN_STARTUP_ID,
  "Small Business": process.env.NEXT_PUBLIC_PAYPAL_PLAN_SMALL_BUSINESS_ID,
  Enterprise: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ENTERPRISE_ID,
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { subscriptionId, tier } = body as { subscriptionId?: string; tier?: string };

  if (!subscriptionId || !tier) {
    return NextResponse.json({ error: "subscriptionId and tier are required" }, { status: 400 });
  }

  const expectedPlanId = PLAN_ID_BY_TIER[tier];
  if (!expectedPlanId) {
    return NextResponse.json({ error: `No PayPal plan configured for tier "${tier}"` }, { status: 400 });
  }

  try {
    const subscription = await getSubscription(subscriptionId);

    if (subscription.plan_id !== expectedPlanId) {
      return NextResponse.json({ error: "Subscription plan does not match selected tier" }, { status: 400 });
    }

    if (subscription.status !== "ACTIVE") {
      return NextResponse.json({ error: `Subscription is not active (status: ${subscription.status})` }, { status: 400 });
    }

    return NextResponse.json({ ok: true, subscriptionId: subscription.id });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Verification failed" }, { status: 502 });
  }
}
