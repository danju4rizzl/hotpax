/**
 * LockGate.test.tsx
 *
 * Unit + behaviour tests for the LockGate component.
 *
 * Test categories:
 *   1. Pass-through behaviour (hasPaid=true)
 *   2. Blocked UI rendering (hasPaid=false)
 *   3. Prop customisation (siteName, supportEmail, supportUrl, errorCode, footerText)
 *   4. Default values
 *   5. Conditional button rendering
 */
import { describe, test, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import { LockGate } from "../src/components/LockGate";

// ─── 1. Pass-through ──────────────────────────────────────────────────────────

describe("LockGate — pass-through (hasPaid=true)", () => {
  test("renders children when hasPaid is true", () => {
    render(
      <LockGate hasPaid={true}>
        <p>Protected content</p>
      </LockGate>
    );
    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });

  test("does NOT render the blocked UI when hasPaid is true", () => {
    render(
      <LockGate hasPaid={true}>
        <p>Protected</p>
      </LockGate>
    );
    expect(screen.queryByText("Access Blocked")).not.toBeInTheDocument();
    expect(screen.queryByText(/Temporarily Offline/i)).not.toBeInTheDocument();
  });

  test("renders multiple children transparently", () => {
    render(
      <LockGate hasPaid={true}>
        <h1>Title</h1>
        <p>Paragraph</p>
        <button>Click</button>
      </LockGate>
    );
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });
});

// ─── 2. Blocked UI ───────────────────────────────────────────────────────────

describe("LockGate — blocked UI (hasPaid=false)", () => {
  test("renders the blocked heading when hasPaid is false", () => {
    render(
      <LockGate hasPaid={false}>
        <p>Hidden</p>
      </LockGate>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Temporarily Offline/i)).toBeInTheDocument();
  });

  test("does NOT render children when hasPaid is false", () => {
    render(
      <LockGate hasPaid={false}>
        <p>Should be hidden</p>
      </LockGate>
    );
    expect(screen.queryByText("Should be hidden")).not.toBeInTheDocument();
  });

  test("renders the Access Blocked badge", () => {
    render(<LockGate hasPaid={false}><span /></LockGate>);
    expect(screen.getByText("Access Blocked")).toBeInTheDocument();
  });
});

// ─── 3. Prop customisation ───────────────────────────────────────────────────

describe("LockGate — prop customisation", () => {
  test("displays custom siteName in the description", () => {
    const { container } = render(
      <LockGate hasPaid={false} siteName="Acme Corp">
        <span />
      </LockGate>
    );
    // siteName lives inside a <span> nested in a <p>; check container text content
    expect(container.textContent).toContain("Acme Corp");
  });

  test("renders Contact Support link when supportEmail is provided", () => {
    render(
      <LockGate hasPaid={false} supportEmail="help@acme.com">
        <span />
      </LockGate>
    );
    const link = screen.getByRole("link", { name: /Contact Support/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "mailto:help@acme.com");
  });

  test("does NOT render Contact Support link when supportEmail is omitted", () => {
    render(<LockGate hasPaid={false}><span /></LockGate>);
    expect(screen.queryByRole("link", { name: /Contact Support/i })).not.toBeInTheDocument();
  });

  test("renders custom support URL button with correct href", () => {
    render(
      <LockGate hasPaid={false} supportUrl="https://example.com" supportUrlLabel="Visit Us">
        <span />
      </LockGate>
    );
    const link = screen.getByRole("link", { name: /Visit Us/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("renders custom errorCode in the footer", () => {
    render(
      <LockGate hasPaid={false} errorCode="CUSTOM_CODE">
        <span />
      </LockGate>
    );
    expect(screen.getByText(/CUSTOM_CODE/)).toBeInTheDocument();
  });

  test("renders custom footerText when provided", () => {
    render(
      <LockGate hasPaid={false} footerText="My Custom Footer">
        <span />
      </LockGate>
    );
    expect(screen.getByText("My Custom Footer")).toBeInTheDocument();
  });
});

// ─── 4. Default values ───────────────────────────────────────────────────────

describe("LockGate — default values", () => {
  test("uses default errorCode ACCESS_RESTRICTED when not specified", () => {
    render(<LockGate hasPaid={false}><span /></LockGate>);
    expect(screen.getByText(/ACCESS_RESTRICTED/)).toBeInTheDocument();
  });

  test("uses default supportUrlLabel 'Visit Support' when not specified", () => {
    render(
      <LockGate hasPaid={false} supportUrl="https://example.com">
        <span />
      </LockGate>
    );
    expect(screen.getByRole("link", { name: /Visit Support/i })).toBeInTheDocument();
  });

  test("renders a default footer copyright line", () => {
    const year = new Date().getFullYear();
    render(<LockGate hasPaid={false}><span /></LockGate>);
    // Default footer references the year
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });
});

// ─── 5. Conditional button rendering ─────────────────────────────────────────

describe("LockGate — conditional buttons", () => {
  test("renders both buttons when both supportEmail and supportUrl are provided", () => {
    render(
      <LockGate hasPaid={false} supportEmail="a@b.com" supportUrl="https://x.com">
        <span />
      </LockGate>
    );
    expect(screen.getByRole("link", { name: /Contact Support/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Visit Support/i })).toBeInTheDocument();
  });

  test("renders neither button when neither supportEmail nor supportUrl are provided", () => {
    render(<LockGate hasPaid={false}><span /></LockGate>);
    expect(screen.queryByRole("link", { name: /Contact Support/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Visit Support/i })).not.toBeInTheDocument();
  });
});

// ─── 6. Theme Mode ───────────────────────────────────────────────────────────

describe("LockGate — theme mode", () => {
  test("uses light theme by default", () => {
    const { container } = render(<LockGate hasPaid={false}><span /></LockGate>);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.backgroundColor).toBe("#f7fafc");
  });

  test("applies light theme styles explicitly", () => {
    const { container } = render(<LockGate hasPaid={false} theme="light"><span /></LockGate>);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.backgroundColor).toBe("#f7fafc");
  });

  test("applies dark theme styles explicitly", () => {
    const { container } = render(<LockGate hasPaid={false} theme="dark"><span /></LockGate>);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.backgroundColor).toBe("#0d0f11");
  });
});

