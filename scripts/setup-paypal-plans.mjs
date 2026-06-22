// One-time setup: creates the PayPal Product + Billing Plans for AnovasOS's
// subscription tiers, then prints the env vars to add to .env.local / Vercel.
// Run with: node scripts/setup-paypal-plans.mjs
import { readFileSync } from "node:fs";
import path from "node:path";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  let contents;
  try {
    contents = readFileSync(envPath, "utf8");
  } catch {
    return;
  }
  for (const line of contents.split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !(match[1] in process.env)) {
      process.env[match[1]] = match[2];
    }
  }
}

loadEnvLocal();

const API_BASE = process.env.PAYPAL_API_BASE ?? "https://api-m.sandbox.paypal.com";
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET (in .env.local or the environment) before running this script.");
  process.exit(1);
}

const TIERS = [
  { name: "Startup", price: "1000.00" },
  { name: "Small Business", price: "2500.00" },
  { name: "Enterprise", price: "5000.00" },
];

async function getAccessToken() {
  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`OAuth token request failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function findExistingProduct(token) {
  const res = await fetch(`${API_BASE}/v1/catalogs/products?page_size=20`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Listing products failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return (data.products ?? []).find((p) => p.name === "AnovasOS");
}

async function createProduct(token) {
  const res = await fetch(`${API_BASE}/v1/catalogs/products`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "AnovasOS",
      description: "AnovasOS business growth platform subscription",
      type: "SERVICE",
      category: "SOFTWARE",
    }),
  });
  if (!res.ok) throw new Error(`Creating product failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function findExistingPlan(token, productId, tierName) {
  const res = await fetch(`${API_BASE}/v1/billing/plans?product_id=${productId}&page_size=20`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Listing plans failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return (data.plans ?? []).find((p) => p.name === `AnovasOS — ${tierName}`);
}

async function createPlan(token, productId, tier) {
  const res = await fetch(`${API_BASE}/v1/billing/plans`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      product_id: productId,
      name: `AnovasOS — ${tier.name}`,
      billing_cycles: [
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: { fixed_price: { value: tier.price, currency_code: "USD" } },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        payment_failure_threshold: 2,
      },
    }),
  });
  if (!res.ok) throw new Error(`Creating plan for ${tier.name} failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const ENV_VAR_BY_TIER = {
  Startup: "NEXT_PUBLIC_PAYPAL_PLAN_STARTUP_ID",
  "Small Business": "NEXT_PUBLIC_PAYPAL_PLAN_SMALL_BUSINESS_ID",
  Enterprise: "NEXT_PUBLIC_PAYPAL_PLAN_ENTERPRISE_ID",
};

const token = await getAccessToken();

let product = await findExistingProduct(token);
if (product) {
  console.log(`Reusing existing PayPal product "AnovasOS" (${product.id})`);
} else {
  product = await createProduct(token);
  console.log(`Created PayPal product "AnovasOS" (${product.id})`);
}

const results = [];
for (const tier of TIERS) {
  let plan = await findExistingPlan(token, product.id, tier.name);
  if (plan) {
    console.log(`Reusing existing plan for ${tier.name} (${plan.id})`);
  } else {
    plan = await createPlan(token, product.id, tier);
    console.log(`Created plan for ${tier.name} at $${tier.price}/month (${plan.id})`);
  }
  results.push({ tier: tier.name, planId: plan.id });
}

console.log("\nAdd these to .env.local (and your Vercel project's environment variables):\n");
for (const r of results) {
  console.log(`${ENV_VAR_BY_TIER[r.tier]}=${r.planId}`);
}
