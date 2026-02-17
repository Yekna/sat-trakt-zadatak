import { INDUSTRIES, JOBICY_BASE_URL, LOCATIONS } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = new URLSearchParams(request.nextUrl.searchParams);
  params.set("count", "16");

  const industry = params.get("industry");
  if (industry && !INDUSTRIES.get(industry)) {
    return NextResponse.json(
      {
        error: `Invalid industry value: "${industry}". Please select a valid industry from the dropdown`,
      },
      { status: 400 },
    );
  }

  const jobGeo = params.get("jobGeo");
  if (jobGeo && !LOCATIONS.get(jobGeo)) {
    return NextResponse.json(
      {
        error: `Invalid company location value: "${jobGeo}". Please select a valid location from the dropdown`,
      },
      { status: 400 },
    );
  }

  if (jobGeo) {
    params.set("geo", jobGeo);
    params.delete("jobGeo");
  }

  const data = await fetch(`${JOBICY_BASE_URL}?${params}`).then((res) =>
    res.json(),
  );

  return NextResponse.json(data);
}
