/**
 * PaywallBanner.test.tsx
 *
 * Unit + behaviour tests for the PaywallBanner component.
 *
 * Test categories:
 *   1. Pass-through behaviour (hasAccess=true)
 *   2. Paywall UI rendering (hasAccess=false)
 *   3. Prop customisation (headline, subheadline, footerText, supportEmail)
 *   4. Tier cards rendering
 *   5. Highlighted / "Most Popular" tier
 *   6. CTA interactions (onSelect callback, ctaHref link)
 *   7. Feature checklist rendering
 */
import { describe, test, expect, mock } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { PaywallBanner, type PaywallTier } from "../src/components/PaywallBanner";

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const BASIC_TIER: PaywallTier = {
  name: "Starter",
  price: "$9",
  period: "per month",
  features: [
    { label: "5 projects",    included: true  },
    { label: "Custom domain", included: false },
  ],
  ctaLabel: "Get Started",
};

const HIGHLIGHTED_TIER: PaywallTier = {
  name: "Pro",
  price: "$29",
  highlighted: true,
  features: [
    { label: "Unlimited projects", included: true },
    { label: "Priority support",   included: true },
  ],
  ctaLabel: "Upgrade to Pro",
};

// ─── 1. Pass-through ──────────────────────────────────────────────────────────

describe("PaywallBanner — pass-through (hasAccess=true)", () => {
  test("renders children when hasAccess is true", () => {
    render(
      <PaywallBanner hasAccess={true}>
        <p>Premium content</p>
      </PaywallBanner>
    );
    expect(screen.getByText("Premium content")).toBeInTheDocument();
  });

  test("does NOT render paywall UI when hasAccess is true", () => {
    render(
      <PaywallBanner hasAccess={true}>
        <p>Content</p>
      </PaywallBanner>
    );
    expect(screen.queryByText(/Premium Access Required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Upgrade to unlock/i)).not.toBeInTheDocument();
  });

  test("renders multiple children transparently", () => {
    render(
      <PaywallBanner hasAccess={true}>
        <h1>Title</h1>
        <button>Act</button>
      </PaywallBanner>
    );
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Act" })).toBeInTheDocument();
  });
});

// ─── 2. Paywall UI ───────────────────────────────────────────────────────────

describe("PaywallBanner — paywall UI (hasAccess=false)", () => {
  test("renders the 'Premium Access Required' badge", () => {
    render(<PaywallBanner hasAccess={false}><span /></PaywallBanner>);
    expect(screen.getByText(/Premium Access Required/i)).toBeInTheDocument();
  });

  test("renders the default headline", () => {
    render(<PaywallBanner hasAccess={false}><span /></PaywallBanner>);
    expect(screen.getByRole("heading", { name: /Upgrade to unlock/i })).toBeInTheDocument();
  });

  test("does NOT render children when hasAccess is false", () => {
    render(
      <PaywallBanner hasAccess={false}>
        <p>Hidden content</p>
      </PaywallBanner>
    );
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
  });
});

// ─── 3. Prop customisation ───────────────────────────────────────────────────

describe("PaywallBanner — prop customisation", () => {
  test("renders custom headline", () => {
    render(
      <PaywallBanner hasAccess={false} headline="Go Pro Today">
        <span />
      </PaywallBanner>
    );
    expect(screen.getByRole("heading", { name: /Go Pro Today/i })).toBeInTheDocument();
  });

  test("renders custom subheadline", () => {
    render(
      <PaywallBanner hasAccess={false} subheadline="Supercharge your workflow.">
        <span />
      </PaywallBanner>
    );
    expect(screen.getByText("Supercharge your workflow.")).toBeInTheDocument();
  });

  test("renders custom footerText", () => {
    render(
      <PaywallBanner hasAccess={false} footerText="© 2026 Acme">
        <span />
      </PaywallBanner>
    );
    expect(screen.getByText("© 2026 Acme")).toBeInTheDocument();
  });

  test("renders 'Contact our team' help link when supportEmail is provided", () => {
    render(
      <PaywallBanner hasAccess={false} supportEmail="billing@acme.com">
        <span />
      </PaywallBanner>
    );
    const link = screen.getByRole("link", { name: /Contact our team/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "mailto:billing@acme.com");
  });

  test("does NOT render help link when supportEmail is omitted", () => {
    render(<PaywallBanner hasAccess={false}><span /></PaywallBanner>);
    expect(screen.queryByRole("link", { name: /Contact our team/i })).not.toBeInTheDocument();
  });
});

// ─── 4. Tier cards ───────────────────────────────────────────────────────────

describe("PaywallBanner — tier cards", () => {
  test("renders tier names", () => {
    render(
      <PaywallBanner hasAccess={false} tiers={[BASIC_TIER, HIGHLIGHTED_TIER]}>
        <span />
      </PaywallBanner>
    );
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  test("renders tier prices", () => {
    render(
      <PaywallBanner hasAccess={false} tiers={[BASIC_TIER]}>
        <span />
      </PaywallBanner>
    );
    expect(screen.getByText("$9")).toBeInTheDocument();
  });

  test("renders tier period", () => {
    render(
      <PaywallBanner hasAccess={false} tiers={[BASIC_TIER]}>
        <span />
      </PaywallBanner>
    );
    expect(screen.getByText("per month")).toBeInTheDocument();
  });

  test("renders default 3 tiers when tiers prop is omitted", () => {
    render(<PaywallBanner hasAccess={false}><span /></PaywallBanner>);
    // Default tiers: Starter, Pro, Enterprise
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });
});

// ─── 5. Highlighted tier ─────────────────────────────────────────────────────

describe("PaywallBanner — highlighted tier", () => {
  test("renders 'Most Popular' chip on the highlighted tier", () => {
    render(
      <PaywallBanner hasAccess={false} tiers={[BASIC_TIER, HIGHLIGHTED_TIER]}>
        <span />
      </PaywallBanner>
    );
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  test("does NOT render 'Most Popular' chip on non-highlighted tiers", () => {
    render(
      <PaywallBanner hasAccess={false} tiers={[BASIC_TIER]}>
        <span />
      </PaywallBanner>
    );
    expect(screen.queryByText("Most Popular")).not.toBeInTheDocument();
  });
});

// ─── 6. CTA interactions ─────────────────────────────────────────────────────

describe("PaywallBanner — CTA interactions", () => {
  test("calls onSelect when a button-based tier CTA is clicked", () => {
    const handleSelect = mock(() => {});
    const tier: PaywallTier = {
      ...BASIC_TIER,
      ctaLabel: "Choose Starter",
      onSelect: handleSelect,
    };

    render(
      <PaywallBanner hasAccess={false} tiers={[tier]}>
        <span />
      </PaywallBanner>
    );

    fireEvent.click(screen.getByRole("button", { name: /Choose Starter/i }));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  test("renders an anchor tag (not button) when ctaHref is provided", () => {
    const tier: PaywallTier = {
      ...BASIC_TIER,
      ctaLabel: "Contact Sales",
      ctaHref: "mailto:sales@acme.com",
    };

    render(
      <PaywallBanner hasAccess={false} tiers={[tier]}>
        <span />
      </PaywallBanner>
    );

    const link = screen.getByRole("link", { name: /Contact Sales/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "mailto:sales@acme.com");
  });
});

// ─── 7. Feature checklist ─────────────────────────────────────────────────────

describe("PaywallBanner — feature checklist", () => {
  test("renders all feature labels for a tier", () => {
    render(
      <PaywallBanner hasAccess={false} tiers={[BASIC_TIER]}>
        <span />
      </PaywallBanner>
    );
    expect(screen.getByText("5 projects")).toBeInTheDocument();
    expect(screen.getByText("Custom domain")).toBeInTheDocument();
  });

  test("renders included and excluded features in the same list", () => {
    render(
      <PaywallBanner hasAccess={false} tiers={[BASIC_TIER]}>
        <span />
      </PaywallBanner>
    );
    // Both features (included=true and included=false) should be visible
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThanOrEqual(2);
  });
});

// ─── 8. Theme Mode ───────────────────────────────────────────────────────────

describe("PaywallBanner — theme mode", () => {
  test("uses light theme by default", () => {
    const { container } = render(<PaywallBanner hasAccess={false}><span /></PaywallBanner>);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.backgroundColor).toBe("#ffffff");
  });

  test("applies light theme styles explicitly", () => {
    const { container } = render(<PaywallBanner hasAccess={false} theme="light"><span /></PaywallBanner>);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.backgroundColor).toBe("#ffffff");
  });

  test("applies dark theme styles explicitly", () => {
    const { container } = render(<PaywallBanner hasAccess={false} theme="dark"><span /></PaywallBanner>);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.style.backgroundColor).toBe("#09090b");
  });
});

