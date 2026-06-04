import { NextRequest, NextResponse } from "next/server";
import { queryRecyclingPoints } from "@/lib/csdi/client";
import { CSDI_DATA_ATTRIBUTION, CSDI_MAX_PAGE_SIZE } from "@/lib/csdi/constants";

export const dynamic = "force-dynamic";

function parseOptionalFloat(value: string | null): number | undefined {
  if (value == null || value === "") return undefined;
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : undefined;
}

function parseOptionalInt(value: string | null): number | undefined {
  if (value == null || value === "") return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  try {
    const result = await queryRecyclingPoints({
      district: searchParams.get("district") ?? undefined,
      wasteType: searchParams.get("wasteType") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      lat: parseOptionalFloat(searchParams.get("lat")),
      lng: parseOptionalFloat(searchParams.get("lng")),
      radiusMeters: parseOptionalInt(searchParams.get("radiusMeters")),
      offset: parseOptionalInt(searchParams.get("offset")) ?? 0,
      limit: Math.min(
        parseOptionalInt(searchParams.get("limit")) ?? 50,
        CSDI_MAX_PAGE_SIZE,
      ),
    });

    return NextResponse.json({
      ...result,
      attribution: CSDI_DATA_ATTRIBUTION,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch recycling points";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
