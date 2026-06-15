import { type CSSProperties, type ReactNode } from "react";
import { Crown, Check, Star } from "lucide-react";
import { injectHotpaxKeyframes } from "./ComingSoon";

// ─── Types ────────────────────────────────────────────────────────────────────

/** A single feature row in the plan comparison list. */
export interface PaywallFeature {
  label: string;
  included: boolean;
}

/** A single pricing tier shown in the paywall. */
export interface PaywallTier {
  name: string;
  price: string;
  /** e.g. "per month", "one-time", "per year" */
  period?: string;
  features: PaywallFeature[];
  /** Marks this tier visually as recommended. */
  highlighted?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  onSelect?: () => void;
}

export interface PaywallBannerProps {
  /**
   * When `true`, renders children normally (user has access).
   * When `false`, renders the paywall.
   */
  hasAccess: boolean;
  /** The protected content. */
  children: ReactNode;
  /**
   * Headline shown at the top of the paywall.
   * @default "Upgrade to unlock"
   */
  headline?: string;
  /**
   * Short subheadline / value proposition.
   * @default "Get full access to all features."
   */
  subheadline?: string;
  /**
   * The pricing tiers to display. Maximum 3 is recommended for layout.
   */
  tiers?: PaywallTier[];
  /**
   * Support email for a help link in the footer.
   */
  supportEmail?: string;
  /**
   * Custom footer text.
   */
  footerText?: string;
  /**
   * UI theme mode.
   * @default "light"
   */
  theme?: "light" | "dark";
}
// ─── Styles ───────────────────────────────────────────────────────────────────

const MONO = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";
const SANS =
  "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

const themeStyles = {
  light: {
    bg: "#ffffff",
    color: "#09090b",
    headingColor: "#09090b",
    subheadingColor: "#71717a",
    tierCardBg: "#fafafa",
    tierCardBorder: "1px solid rgba(9,9,11,0.1)",
    tierCardHighlightedBg: "linear-gradient(160deg, #fafaff 0%, #f0f0ff 100%)",
    tierCardHighlightedBorder: "2px solid #6366f1",
    tierNameColor: "#71717a",
    tierPriceColor: "#09090b",
    tierPeriodColor: "#a1a1aa",
    featureItemColor: "#3f3f46",
    featureItemDisabledColor: "#d4d4d8",
    btnTierDefaultBg: "#09090b",
    btnTierDefaultColor: "#ffffff",
    helpRowColor: "#71717a",
    helpLinkColor: "#6366f1",
    footerTextColor: "rgba(113,113,122,0.4)",
  },
  dark: {
    bg: "#09090b",
    color: "#f4f4f5",
    headingColor: "#fafafa",
    subheadingColor: "#a1a1aa",
    tierCardBg: "#18181b",
    tierCardBorder: "1px solid rgba(255,255,255,0.08)",
    tierCardHighlightedBg: "linear-gradient(160deg, #181827 0%, #1e1e38 100%)",
    tierCardHighlightedBorder: "2px solid #6366f1",
    tierNameColor: "#a1a1aa",
    tierPriceColor: "#fafafa",
    tierPeriodColor: "#71717a",
    featureItemColor: "#e4e4e7",
    featureItemDisabledColor: "#52525b",
    btnTierDefaultBg: "#ffffff",
    btnTierDefaultColor: "#09090b",
    helpRowColor: "#a1a1aa",
    helpLinkColor: "#a5b4fc",
    footerTextColor: "rgba(161,161,170,0.4)",
  },
};

const baseStyles: Record<string, CSSProperties> = {
  root: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4rem 1.5rem",
    fontFamily: SANS,
    boxSizing: "border-box",
  },
  spacer: { flex: 1 },
  inner: {
    width: "100%",
    maxWidth: "56rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "hotpax-slide-up 0.6s ease both",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.3rem 0.875rem",
    borderRadius: "9999px",
    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    fontSize: "0.625rem",
    fontFamily: MONO,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#78350f",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 8px rgba(251,191,36,0.3)",
  },
  heading: {
    fontSize: "2.25rem",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    margin: "0 0 0.75rem",
    textAlign: "center",
  },
  subheading: {
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: "0 0 3rem",
    maxWidth: "26rem",
    textAlign: "center",
  },
  tiersGrid: {
    display: "flex",
    gap: "1rem",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "2.5rem",
  },
  recommendedChip: {
    position: "absolute",
    top: "-0.75rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.2rem 0.75rem",
    borderRadius: "9999px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#ffffff",
    fontSize: "0.5625rem",
    fontFamily: MONO,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  tierName: {
    fontSize: "0.75rem",
    fontFamily: MONO,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "0.75rem",
  },
  tierPrice: {
    fontSize: "2.5rem",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    marginBottom: "0.25rem",
  },
  tierPeriod: {
    fontSize: "0.75rem",
    fontFamily: MONO,
    marginBottom: "1.5rem",
  },
  featureList: {
    listStyle: "none",
    margin: "0 0 1.75rem",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
    flex: 1,
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.8125rem",
    lineHeight: 1.4,
  },
  featureItemDisabled: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.8125rem",
    lineHeight: 1.4,
  },
  btnTier: {
    display: "block",
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "0.8125rem",
    fontWeight: 600,
    fontFamily: SANS,
    textAlign: "center",
    textDecoration: "none",
    transition: "opacity 0.2s ease, background 0.2s ease",
    boxSizing: "border-box",
  },
  btnTierHighlighted: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#ffffff",
    boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
  },
  helpRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    fontSize: "0.8125rem",
  },
  helpLink: {
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "0.8125rem",
    fontFamily: SANS,
  },
  footer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  footerText: {
    textAlign: "center",
    fontSize: "0.5625rem",
    fontFamily: MONO,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginTop: "3rem",
  },
};

// ─── Default tiers ────────────────────────────────────────────────────────────

const DEFAULT_TIERS: PaywallTier[] = [
  {
    name: "Starter",
    price: "$9",
    period: "per month",
    features: [
      { label: "5 projects", included: true },
      { label: "Basic analytics", included: true },
      { label: "Email support", included: true },
      { label: "Custom domain", included: false },
      { label: "Priority support", included: false },
    ],
    ctaLabel: "Get Started",
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    highlighted: true,
    features: [
      { label: "Unlimited projects", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Email + chat support", included: true },
      { label: "Custom domain", included: true },
      { label: "Priority support", included: false },
    ],
    ctaLabel: "Upgrade to Pro",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    features: [
      { label: "Unlimited projects", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Dedicated support", included: true },
      { label: "Custom domain", included: true },
      { label: "Priority support", included: true },
    ],
    ctaLabel: "Contact Sales",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function PaywallBanner({
  hasAccess,
  children,
  headline = "Upgrade to unlock",
  subheadline = "Get full access to all features and supercharge your workflow.",
  tiers = DEFAULT_TIERS,
  supportEmail,
  footerText,
  theme = "light",
}: PaywallBannerProps) {
  // Pass-through when user has access
  if (hasAccess) return <>{children}</>;

  injectHotpaxKeyframes();
  const currentYear = new Date().getFullYear();
  const t = theme === "dark" ? themeStyles.dark : themeStyles.light;

  return (
    <div
      style={{
        ...baseStyles.root,
        background: t.bg,
        color: t.color,
      }}
    >
      <div style={baseStyles.spacer} />

      <div style={baseStyles.inner}>
        {/* Badge */}
        <div style={baseStyles.badge}>
          <Crown style={{ width: "0.625rem", height: "0.625rem" }} />
          Premium Access Required
        </div>

        {/* Heading */}
        <h1 style={{ ...baseStyles.heading, color: t.headingColor }}>{headline}</h1>
        <p style={{ ...baseStyles.subheading, color: t.subheadingColor }}>{subheadline}</p>

        {/* Tier cards */}
        <div style={baseStyles.tiersGrid}>
          {tiers.map((tier) => {
            const isHighlighted = tier.highlighted;
            const cardStyle: CSSProperties = {
              ...(isHighlighted
                ? {
                    flex: "1 1 14rem",
                    maxWidth: "18rem",
                    display: "flex",
                    flexDirection: "column" as const,
                    padding: "1.75rem",
                    borderRadius: "1rem",
                    border: t.tierCardHighlightedBorder,
                    background: t.tierCardHighlightedBg,
                    boxSizing: "border-box" as const,
                    textAlign: "left" as const,
                    position: "relative" as const,
                    boxShadow: "0 8px 30px rgba(99,102,241,0.15)",
                  }
                : {
                    flex: "1 1 14rem",
                    maxWidth: "18rem",
                    display: "flex",
                    flexDirection: "column" as const,
                    padding: "1.75rem",
                    borderRadius: "1rem",
                    border: t.tierCardBorder,
                    backgroundColor: t.tierCardBg,
                    boxSizing: "border-box" as const,
                    textAlign: "left" as const,
                    position: "relative" as const,
                    transition: "box-shadow 0.2s ease",
                  }),
            };

            const btnStyle = {
              ...baseStyles.btnTier,
              ...(isHighlighted
                ? baseStyles.btnTierHighlighted
                : {
                    backgroundColor: t.btnTierDefaultBg,
                    color: t.btnTierDefaultColor,
                  }),
            };

            const ctaEl =
              tier.ctaHref ? (
                <a
                  href={tier.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hotpax-btn-primary"
                  style={btnStyle}
                >
                  {tier.ctaLabel ?? "Get Started"}
                </a>
              ) : (
                <button
                  onClick={tier.onSelect}
                  className="hotpax-btn-primary"
                  style={btnStyle}
                >
                  {tier.ctaLabel ?? "Get Started"}
                </button>
              );

            return (
              <div key={tier.name} style={cardStyle}>
                {isHighlighted && (
                  <div style={baseStyles.recommendedChip}>
                    <Star style={{ width: "0.5rem", height: "0.5rem" }} />
                    Most Popular
                  </div>
                )}

                <div style={{ ...baseStyles.tierName, color: t.tierNameColor }}>{tier.name}</div>
                <div style={{ ...baseStyles.tierPrice, color: t.tierPriceColor }}>{tier.price}</div>
                {tier.period && (
                  <div style={{ ...baseStyles.tierPeriod, color: t.tierPeriodColor }}>
                    {tier.period}
                  </div>
                )}

                <ul style={baseStyles.featureList}>
                  {tier.features.map((f) => (
                    <li
                      key={f.label}
                      style={
                        f.included
                          ? { ...baseStyles.featureItem, color: t.featureItemColor }
                          : { ...baseStyles.featureItemDisabled, color: t.featureItemDisabledColor }
                      }
                    >
                      {f.included ? (
                        <Check style={{ width: "0.875rem", height: "0.875rem", color: "#22c55e", flexShrink: 0 }} />
                      ) : (
                        <span
                          style={{
                            width: "0.875rem",
                            height: "0.875rem",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          —
                        </span>
                      )}
                      {f.label}
                    </li>
                  ))}
                </ul>

                {ctaEl}
              </div>
            );
          })}
        </div>

        {/* Help row */}
        {supportEmail && (
          <div style={{ ...baseStyles.helpRow, color: t.helpRowColor }}>
            Have questions?{" "}
            <a
              href={`mailto:${supportEmail}`}
              style={{ ...baseStyles.helpLink, color: t.helpLinkColor }}
            >
              Contact our team
            </a>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={baseStyles.footer}>
        <div style={{ ...baseStyles.footerText, color: t.footerTextColor }}>
          {footerText ?? `© ${currentYear} • All rights reserved`}
        </div>
      </div>
    </div>
  );
}
