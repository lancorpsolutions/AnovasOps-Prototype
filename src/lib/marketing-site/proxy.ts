import { NextResponse, type NextRequest } from "next/server";

const MARKETING_SITE_ORIGIN = "http://site.anovasintegratedsystems.com";
const PUBLIC_HOSTS = ["anovasintegratedsystems.com", "www.anovasintegratedsystems.com"];
const MAX_REDIRECT_HOPS = 5;

// Headers that must not be copied straight through from the upstream
// response: they describe the transport of *that* hop (compression,
// chunking, length) and are invalid/misleading once fetch() has already
// decoded the body for us.
const HOP_BY_HOP_RESPONSE_HEADERS = [
  "content-encoding",
  "content-length",
  "transfer-encoding",
  "connection",
  "keep-alive",
];

export async function proxyToMarketingSite(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  let upstreamUrl = `${MARKETING_SITE_ORIGIN}${pathname}${search}`;
  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  for (let hop = 0; hop < MAX_REDIRECT_HOPS; hop++) {
    const upstreamRes = await fetch(upstreamUrl, {
      method: request.method,
      headers: {
        accept: request.headers.get("accept") ?? "*/*",
        "accept-language": request.headers.get("accept-language") ?? "",
        "user-agent": request.headers.get("user-agent") ?? "",
      },
      body: hasBody ? request.body : undefined,
      duplex: hasBody ? "half" : undefined,
      redirect: "manual",
    } as RequestInit);

    if (upstreamRes.status >= 300 && upstreamRes.status < 400) {
      const location = upstreamRes.headers.get("location");
      if (!location) break;

      const locationUrl = new URL(location, upstreamUrl);
      if (PUBLIC_HOSTS.includes(locationUrl.hostname)) {
        // The marketing site is just redirecting to what it thinks is its
        // own canonical public domain. Chase that redirect against our
        // internal origin instead of relaying it to the browser, otherwise
        // it bounces back through Vercel's domain redirect and loops forever.
        upstreamUrl = `${MARKETING_SITE_ORIGIN}${locationUrl.pathname}${locationUrl.search}`;
        continue;
      }

      return NextResponse.redirect(locationUrl);
    }

    const headers = new Headers(upstreamRes.headers);
    HOP_BY_HOP_RESPONSE_HEADERS.forEach((header) => headers.delete(header));

    return new NextResponse(upstreamRes.body, {
      status: upstreamRes.status,
      headers,
    });
  }

  return new NextResponse("The marketing site is temporarily unavailable.", { status: 502 });
}
