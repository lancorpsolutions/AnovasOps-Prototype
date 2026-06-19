import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { proxyToMarketingSite } from "@/lib/marketing-site/proxy";

const APP_ROUTES = ["/api", "/terms", "/privacy", "/cookies", "/revenue-leaks-guide", "/favicon.ico"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/anovasos")) {
    return updateSession(request);
  }

  if (APP_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }

  return proxyToMarketingSite(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
