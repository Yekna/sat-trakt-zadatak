import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "@/components/card";
import type { Job } from "@/lib/types";

const mockJob: Job = {
  url: "https://example.com/job/1",
  companyLogo: "https://example.com/logo.png",
  jobIndustry: ["Programming"],
  jobTitle: "Senior React Developer",
  companyName: "Acme Corp",
  jobExcerpt: "We are looking for a senior React developer.",
  jobType: ["Full-Time"],
  jobGeo: "USA",
  jobLevel: "Senior",
};

describe("Card", () => {
  it("renders job title, company name, and excerpt", () => {
    render(<Card job={mockJob} />);
    expect(screen.getByText("Senior React Developer")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(
      screen.getByText("We are looking for a senior React developer."),
    ).toBeInTheDocument();
  });

  it("renders with default variant when no badge", () => {
    const { container } = render(<Card job={mockJob} />);
    const card = container.firstElementChild!;
    expect(card.className).toContain("bg-neutral-50");
  });

  it("renders with highlighted variant when badge is provided", () => {
    const { container } = render(<Card job={mockJob} badge="trending" />);
    const card = container.firstElementChild!;
    expect(card.className).toContain("from-[#008CFF]");
  });

  it("displays correct badge text for trending", () => {
    render(<Card job={mockJob} badge="trending" />);
    const badge = screen.getByText("trending");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("highlighted-badge");
  });

  it("displays correct badge text for recommended", () => {
    render(<Card job={mockJob} badge="recommended" />);
    const badge = screen.getByText("recommended");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("highlighted-badge");
  });

  it("link points to job URL", () => {
    render(<Card job={mockJob} />);
    const link = screen.getByText("View Job").closest("a");
    expect(link).toHaveAttribute("href", "https://example.com/job/1");
  });
});
