/**
 * MaintenanceScreen.test.tsx
 *
 * Unit + behaviour tests for the MaintenanceScreen component.
 *
 * Test categories:
 *   1. Default rendering
 *   2. Prop customisation (siteName, message, eta, footerText)
 *   3. Status items rendering
 *   4. Action buttons (supportEmail, statusPageUrl)
 */
import { describe, test, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import { MaintenanceScreen } from "../src/components/MaintenanceScreen";

// ─── 1. Default rendering ─────────────────────────────────────────────────────

describe("MaintenanceScreen — default rendering", () => {
  test("renders the main heading", () => {
    render(<MaintenanceScreen />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    // The h1 contains "Down for\nMaintenance" split across text nodes
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Down for/i);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Maintenance/i);
  });

  test("renders the Maintenance Mode badge", () => {
    render(<MaintenanceScreen />);
    expect(screen.getByText("Maintenance Mode")).toBeInTheDocument();
  });

  test("renders the default message", () => {
    render(<MaintenanceScreen />);
    expect(
      screen.getByText(/We're performing scheduled maintenance/i)
    ).toBeInTheDocument();
  });

  test("renders the default footer with current year", () => {
    render(<MaintenanceScreen />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });

  test("does NOT render ETA chip when eta prop is omitted", () => {
    render(<MaintenanceScreen />);
    expect(screen.queryByText(/Expected back/i)).not.toBeInTheDocument();
  });
});

// ─── 2. Prop customisation ───────────────────────────────────────────────────

describe("MaintenanceScreen — prop customisation", () => {
  test("renders custom siteName in the description", () => {
    const { container } = render(<MaintenanceScreen siteName="Acme Platform" />);
    // siteName is inside a <strong> tag; check full page text content
    expect(container.textContent).toContain("Acme Platform");
  });

  test("renders custom message text", () => {
    render(<MaintenanceScreen message="Custom maintenance reason." />);
    expect(screen.getByText(/Custom maintenance reason/)).toBeInTheDocument();
  });

  test("renders ETA chip when eta prop is provided", () => {
    render(<MaintenanceScreen eta="in ~30 minutes" />);
    expect(screen.getByText(/Expected back/i)).toBeInTheDocument();
    expect(screen.getByText(/in ~30 minutes/)).toBeInTheDocument();
  });

  test("renders custom footerText", () => {
    render(<MaintenanceScreen footerText="Custom Footer Line" />);
    expect(screen.getByText("Custom Footer Line")).toBeInTheDocument();
  });
});

// ─── 3. Status items ─────────────────────────────────────────────────────────

describe("MaintenanceScreen — status items", () => {
  const items = [
    { label: "API Gateway",  status: "operational" as const },
    { label: "Database",     status: "degraded"    as const },
    { label: "Auth Service", status: "down"        as const },
  ];

  test("renders all status item labels", () => {
    render(<MaintenanceScreen statusItems={items} />);
    expect(screen.getByText("API Gateway")).toBeInTheDocument();
    expect(screen.getByText("Database")).toBeInTheDocument();
    expect(screen.getByText("Auth Service")).toBeInTheDocument();
  });

  test("renders the status text for each item", () => {
    render(<MaintenanceScreen statusItems={items} />);
    expect(screen.getByText("operational")).toBeInTheDocument();
    expect(screen.getByText("degraded")).toBeInTheDocument();
    expect(screen.getByText("down")).toBeInTheDocument();
  });

  test("does NOT render status list when statusItems is omitted", () => {
    render(<MaintenanceScreen />);
    expect(screen.queryByText("operational")).not.toBeInTheDocument();
    expect(screen.queryByText("degraded")).not.toBeInTheDocument();
  });

  test("renders correct count of status rows", () => {
    render(<MaintenanceScreen statusItems={items} />);
    // Each row has a label + status text; we can count by specific text
    const labels = items.map((i) => screen.getByText(i.label));
    expect(labels).toHaveLength(3);
  });
});

// ─── 4. Action buttons ───────────────────────────────────────────────────────

describe("MaintenanceScreen — action buttons", () => {
  test("renders Contact Support button with correct mailto href", () => {
    render(<MaintenanceScreen supportEmail="ops@acme.com" />);
    const link = screen.getByRole("link", { name: /Contact Support/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "mailto:ops@acme.com");
  });

  test("renders Status Page button with correct href and target", () => {
    render(<MaintenanceScreen statusPageUrl="https://status.acme.com" />);
    const link = screen.getByRole("link", { name: /Status Page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://status.acme.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("does NOT render any buttons when neither supportEmail nor statusPageUrl are provided", () => {
    render(<MaintenanceScreen />);
    expect(screen.queryByRole("link", { name: /Contact Support/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Status Page/i })).not.toBeInTheDocument();
  });

  test("renders both buttons when both props are provided", () => {
    render(
      <MaintenanceScreen
        supportEmail="ops@acme.com"
        statusPageUrl="https://status.acme.com"
      />
    );
    expect(screen.getByRole("link", { name: /Contact Support/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Status Page/i })).toBeInTheDocument();
  });
});

// ─── 5. Theme Mode ───────────────────────────────────────────────────────────

describe("MaintenanceScreen — theme mode", () => {
  test("uses light theme by default", () => {
    const { container } = render(<MaintenanceScreen />);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.backgroundColor).toBe("#fafaf9");
  });

  test("applies light theme styles explicitly", () => {
    const { container } = render(<MaintenanceScreen theme="light" />);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.backgroundColor).toBe("#fafaf9");
  });

  test("applies dark theme styles explicitly", () => {
    const { container } = render(<MaintenanceScreen theme="dark" />);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.backgroundColor).toBe("#0c0a09");
  });
});

