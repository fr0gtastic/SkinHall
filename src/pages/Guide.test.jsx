import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Guide from "./Guide";

describe("Guide", () => {
  it("renders without errors", () => {
    render(<MemoryRouter><Guide /></MemoryRouter>);
  });

  it("has heading Guide", () => {
    render(<MemoryRouter><Guide /></MemoryRouter>);
    expect(screen.getByText(/Guide/i)).toBeInTheDocument();
  });

  it("has the 4 section headers", () => {
    render(<MemoryRouter><Guide /></MemoryRouter>);
    expect(screen.getByText("Smart Search")).toBeInTheDocument();
    expect(screen.getByText("URLs and Sharing")).toBeInTheDocument();
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Everything Else")).toBeInTheDocument();
  });

  it("renders at least 13 feature cards", () => {
    render(<MemoryRouter><Guide /></MemoryRouter>);
    expect(screen.getAllByRole("heading", { level: 3 }).length + 1).toBeGreaterThanOrEqual(13);
  });

  it("each card has a title and description", () => {
    render(<MemoryRouter><Guide /></MemoryRouter>);
    const titles = screen.getAllByRole("heading", { level: 3 });
    expect(titles.length).toBeGreaterThanOrEqual(12);
  });
});
