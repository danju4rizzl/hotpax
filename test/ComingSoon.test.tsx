/**
 * ComingSoon.test.tsx
 *
 * Unit + behaviour tests for the ComingSoon component.
 *
 * Test categories:
 *   1. Default rendering
 *   2. Prop customisation (siteName, tagline, footerText)
 *   3. Countdown timer (launchDate)
 *   4. Notify form interaction
 *   5. External links rendering
 */
import { describe, test, expect, mock } from "bun:test";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ComingSoon } from "../src/components/ComingSoon";

// ─── 1. Default rendering ─────────────────────────────────────────────────────

describe("ComingSoon — default rendering", () => {
  test("renders the heading with default siteName", () => {
    render(<ComingSoon />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    // siteName is in a <span> inside h1; assert via textContent
    expect(heading).toHaveTextContent(/Something Awesome/i);
    expect(heading).toHaveTextContent(/is launching soon/i);
  });

  test("renders the Coming Soon badge", () => {
    render(<ComingSoon />);
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });

  test("renders the default tagline", () => {
    render(<ComingSoon />);
    expect(
      screen.getByText(/We're building something great/i)
    ).toBeInTheDocument();
  });

  test("renders default footer copyright with current year", () => {
    render(<ComingSoon />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });
});

// ─── 2. Prop customisation ───────────────────────────────────────────────────

describe("ComingSoon — prop customisation", () => {
  test("renders custom siteName in the heading", () => {
    render(<ComingSoon siteName="Project Nova" />);
    // siteName is in a <span> inside h1; use toHaveTextContent on the heading
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Project Nova/i);
  });

  test("renders custom tagline", () => {
    render(<ComingSoon tagline="Something totally unique" />);
    expect(screen.getByText("Something totally unique")).toBeInTheDocument();
  });

  test("renders custom footerText", () => {
    render(<ComingSoon footerText="My Footer 2026" />);
    expect(screen.getByText("My Footer 2026")).toBeInTheDocument();
  });

  test("renders custom notifyLabel on the submit button", () => {
    render(<ComingSoon onNotify={() => {}} notifyLabel="Join Waitlist" />);
    expect(screen.getByRole("button", { name: /Join Waitlist/i })).toBeInTheDocument();
  });
});

// ─── 3. Countdown timer ───────────────────────────────────────────────────────

describe("ComingSoon — countdown timer", () => {
  test("does NOT render countdown units when launchDate is omitted", () => {
    render(<ComingSoon />);
    expect(screen.queryByText("Days")).not.toBeInTheDocument();
    expect(screen.queryByText("Hours")).not.toBeInTheDocument();
  });

  test("renders 4 countdown units (Days, Hours, Minutes, Seconds) when launchDate is set", () => {
    const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    render(<ComingSoon launchDate={future} />);
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("Minutes")).toBeInTheDocument();
    expect(screen.getByText("Seconds")).toBeInTheDocument();
  });

  test("shows 00 for all units when launchDate is in the past", () => {
    const past = new Date(Date.now() - 1000).toISOString();
    render(<ComingSoon launchDate={past} />);
    const zeros = screen.getAllByText("00");
    // All 4 units should show "00"
    expect(zeros.length).toBeGreaterThanOrEqual(4);
  });
});

// ─── 4. Notify form ───────────────────────────────────────────────────────────

describe("ComingSoon — notify form", () => {
  test("does NOT render the notify form when onNotify is omitted", () => {
    render(<ComingSoon />);
    expect(screen.queryByPlaceholderText("your@email.com")).not.toBeInTheDocument();
  });

  test("renders the notify form when onNotify is provided", () => {
    render(<ComingSoon onNotify={() => {}} />);
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
  });

  test("calls onNotify with the trimmed email when form is submitted", async () => {
    const handleNotify = mock(() => {});
    render(<ComingSoon onNotify={handleNotify} />);

    const input = screen.getByPlaceholderText("your@email.com");
    fireEvent.change(input, { target: { value: "  test@example.com  " } });
    fireEvent.submit(input.closest("form")!);

    await waitFor(() => {
      expect(handleNotify).toHaveBeenCalledTimes(1);
      expect(handleNotify).toHaveBeenCalledWith("test@example.com");
    });
  });

  test("hides the form and shows success message after submission", async () => {
    render(<ComingSoon onNotify={() => {}} />);

    const input = screen.getByPlaceholderText("your@email.com");
    fireEvent.change(input, { target: { value: "user@example.com" } });
    fireEvent.submit(input.closest("form")!);

    await waitFor(() => {
      expect(screen.queryByPlaceholderText("your@email.com")).not.toBeInTheDocument();
      expect(screen.getByText(/You're on the list/i)).toBeInTheDocument();
    });
  });

  test("does NOT call onNotify when email input is empty", async () => {
    const handleNotify = mock(() => {});
    render(<ComingSoon onNotify={handleNotify} />);

    const form = screen.getByPlaceholderText("your@email.com").closest("form")!;
    // Submit without filling in the email
    fireEvent.submit(form);

    // onNotify should NOT be called with empty input
    expect(handleNotify).not.toHaveBeenCalled();
  });
});

// ─── 5. External links ────────────────────────────────────────────────────────

describe("ComingSoon — external links", () => {
  test("does NOT render any external link buttons when links prop is omitted", () => {
    render(<ComingSoon />);
    // There should be no anchor tags pointing outward
    const anchors = document.querySelectorAll('a[target="_blank"]');
    expect(anchors.length).toBe(0);
  });

  test("renders correct number of link buttons", () => {
    render(
      <ComingSoon
        links={[
          { label: "Twitter", href: "https://x.com" },
          { label: "GitHub",  href: "https://github.com" },
        ]}
      />
    );
    expect(screen.getByRole("link", { name: /Twitter/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub/i })).toBeInTheDocument();
  });

  test("link buttons have correct href and open in a new tab", () => {
    render(
      <ComingSoon links={[{ label: "Docs", href: "https://docs.example.com" }]} />
    );
    const link = screen.getByRole("link", { name: /Docs/i });
    expect(link).toHaveAttribute("href", "https://docs.example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

// ─── 6. Theme Mode ───────────────────────────────────────────────────────────

describe("ComingSoon — theme mode", () => {
  test("uses dark theme by default", () => {
    const { container } = render(<ComingSoon />);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.color).toBe("#e2e8f0");
  });

  test("applies light theme styles explicitly", () => {
    const { container } = render(<ComingSoon theme="light" />);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.color).toBe("#2e2a47");
  });

  test("applies dark theme styles explicitly", () => {
    const { container } = render(<ComingSoon theme="dark" />);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.color).toBe("#e2e8f0");
  });
});

