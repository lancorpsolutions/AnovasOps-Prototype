import { NextRequest, NextResponse } from "next/server";

interface PlacesApiResult {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
}

export interface LeadResult {
  placeId: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number | null;
  reviewCount: number | null;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "GOOGLE_PLACES_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { query, location } = body as { query?: string; location?: string };

  if (!query || !query.trim()) {
    return NextResponse.json({ ok: false, error: "Missing search query" }, { status: 400 });
  }

  const textQuery = location ? `${query} in ${location}` : query;

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount",
    },
    body: JSON.stringify({ textQuery, maxResultCount: 20 }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return NextResponse.json(
      { ok: false, error: `Google Places request failed: ${res.status} ${errText}` },
      { status: 502 }
    );
  }

  const data = (await res.json()) as { places?: PlacesApiResult[] };

  const leads: LeadResult[] = (data.places ?? []).map((place) => ({
    placeId: place.id,
    name: place.displayName?.text ?? "Unknown Business",
    address: place.formattedAddress ?? "",
    phone: place.nationalPhoneNumber ?? "",
    website: place.websiteUri ?? "",
    rating: place.rating ?? null,
    reviewCount: place.userRatingCount ?? null,
  }));

  return NextResponse.json({ ok: true, leads });
}
