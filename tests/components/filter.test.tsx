import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Filter } from "@/components/filter";

const items = new Map([
  ["dev", "Programming"],
  ["design-multimedia", "Creative & Design"],
]);

const defaultProps = {
  items,
  value: null,
  onValueChange: vi.fn(),
  emptyPlaceholder: "No results",
  placeholder: "Select industry...",
  label: "Industry",
  id: "industry-filter",
};

describe("Filter", () => {
  it("renders label and placeholder", () => {
    render(<Filter {...defaultProps} />);
    expect(screen.getByLabelText("Industry")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Select industry..."),
    ).toBeInTheDocument();
  });

  it("transforms Map values correctly (slug-to-name → name-to-slug)", () => {
    // When value is a slug, the component displays the corresponding name
    render(<Filter {...defaultProps} value="dev" />);
    // The input should show "Programming" (the display name for slug "dev")
    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("Programming");
  });
});
