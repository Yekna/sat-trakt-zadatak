import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Cards from "@/components/cards";
import type { Job } from "@/lib/types";

function makeJob(id: number): Job {
  return {
    url: `https://example.com/job/${id}`,
    companyLogo: "https://example.com/logo.png",
    jobIndustry: ["Programming"],
    jobTitle: `Job Title ${id}`,
    companyName: `Company ${id}`,
    jobExcerpt: `Excerpt for job ${id}`,
    jobType: ["Full-Time"],
    jobGeo: "USA",
    jobLevel: "Senior",
  };
}

beforeEach(() => {
  let callCount = 0;
  vi.spyOn(Math, "random").mockImplementation(() => {
    // First call → 0 (trending at index 0), second call → 0 (bumped to index 1 for recommended)
    return callCount++ === 0 ? 0 : 0;
  });
});

describe("Cards", () => {
  it("renders correct number of cards", () => {
    const jobs = [makeJob(1), makeJob(2), makeJob(3)];
    render(<Cards jobs={jobs} />);
    expect(screen.getAllByText("View Job")).toHaveLength(3);
  });

  it("assigns trending and recommended badges to different cards", () => {
    const jobs = [makeJob(1), makeJob(2), makeJob(3)];
    render(<Cards jobs={jobs} />);
    expect(screen.getByText("trending")).toBeInTheDocument();
    expect(screen.getByText("recommended")).toBeInTheDocument();
  });

  it("handles single job without crashing", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const jobs = [makeJob(1)];
    render(<Cards jobs={jobs} />);
    expect(screen.getByText("Job Title 1")).toBeInTheDocument();
  });
});
