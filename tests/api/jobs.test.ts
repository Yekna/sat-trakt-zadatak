import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/jobs/route";
import { NextRequest } from "next/server";
import { JOBICY_BASE_URL } from "@/lib/constants";

function makeRequest(params: Record<string, string> = {}) {
  const url = new URL("http://localhost:3000/api/jobs");
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  return new NextRequest(url);
}

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockResolvedValue({
    json: () => Promise.resolve({ jobs: [] }),
  });
});

describe("GET /api/jobs", () => {
  it("returns 400 for invalid industry value", async () => {
    const res = await GET(makeRequest({ industry: "fake-industry" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Invalid industry value");
  });

  it("returns 400 for invalid jobGeo value", async () => {
    const res = await GET(makeRequest({ jobGeo: "atlantis" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Invalid company location value");
  });

  it("passes valid params through to Jobicy", async () => {
    await GET(makeRequest({ industry: "dev" }));
    expect(mockFetch).toHaveBeenCalledOnce();
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain(`${JOBICY_BASE_URL}`);
    expect(calledUrl).toContain("industry=dev");
  });

  it("renames jobGeo to geo in upstream request", async () => {
    await GET(makeRequest({ jobGeo: "usa" }));
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("geo=usa");
    expect(calledUrl).not.toContain("jobGeo=");
  });

  it("sets count=16 on all requests", async () => {
    await GET(makeRequest());
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("count=16");
  });
});
