import { JOBICY_BASE_URL } from "@/lib/constants";
import { jobFiltersSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const raw = Object.fromEntries(request.nextUrl.searchParams);
  const result = jobFiltersSchema.safeParse(raw);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({ count: "16" });
  if (result.data.industry) params.set("industry", result.data.industry);
  if (result.data.jobGeo) params.set("geo", result.data.jobGeo);

  const data = await fetch(`${JOBICY_BASE_URL}?${params}`).then((res) =>
    res.json(),
  );

  return NextResponse.json(data);
}
