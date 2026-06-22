const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE ?? "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET are not configured");
  }

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(`PayPal OAuth token request failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export interface PaypalSubscription {
  id: string;
  status: string;
  plan_id: string;
}

export async function getSubscription(subscriptionId: string): Promise<PaypalSubscription> {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_API_BASE}/v1/billing/subscriptions/${subscriptionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error(`PayPal subscription lookup failed: ${res.status} ${await res.text()}`);
  }

  return res.json();
}
