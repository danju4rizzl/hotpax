import { type CSSProperties } from "react";
import { Wrench, AlertTriangle, Mail, ExternalLink, RefreshCw } from "lucide-react";
import { injectHotpaxKeyframes } from "./ComingSoon";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MaintenanceScreenProps {
  /**
   * Site/product name shown in the message.
   * @default "our service"
   */
  siteName?: string;
  /**
   * Short message shown below the heading.
   * @default "We're performing scheduled maintenance. We'll be back shortly."
   */
  message?: string;
  /**
   * Estimated time back — displayed in a highlight chip.
   * e.g. "2:00 PM UTC" or "in ~30 minutes"
   */
  eta?: string;
  /**
   * Status items to display (e.g. system component statuses).
   */
  statusItems?: Array<{ label: string; status: "operational" | "degraded" | "down" }>;
  /**
   * Support email — renders a "Contact Support" button when provided.
   */
  supportEmail?: string;
  /**
   * External status page URL.
   */
  statusPageUrl?: string;
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

const STATUS_COLORS: Record<string, string> = {
  operational: "#22c55e",
  degraded:    "#f59e0b",
  down:        "#ef4444",
};

const themeStyles = {
  light: {
    bg: "#fafaf9",
    color: "#1c1917",
    iconWrapBg: "#fff7ed",
    iconWrapBorder: "1px solid rgba(251,146,60,0.3)",
    iconWrapShadow: "0 4px 20px rgba(251,146,60,0.15)",
    iconColor: "#ea580c",
    badgeBg: "#fff7ed",
    badgeBorder: "1px solid rgba(251,146,60,0.3)",
    badgeColor: "#c2410c",
    headingColor: "#1c1917",
    messageColor: "#78716c",
    messageStrongColor: "#1c1917",
    etaChipBg: "#f0fdf4",
    etaChipBorder: "1px solid rgba(34,197,94,0.3)",
    etaChipColor: "#166534",
    statusRowBg: "#ffffff",
    statusRowBorder: "1px solid rgba(28,25,23,0.07)",
    statusRowShadow: "0 1px 3px rgba(0,0,0,0.04)",
    statusLabelColor: "#1c1917",
    dividerBg: "rgba(28,25,23,0.1)",
    btnPrimaryBg: "#1c1917",
    btnPrimaryColor: "#ffffff",
    btnSecondaryBg: "#ffffff",
    btnSecondaryBorder: "1px solid rgba(28,25,23,0.15)",
    btnSecondaryColor: "#1c1917",
    footerTextColor: "rgba(120,113,108,0.5)",
  },
  dark: {
    bg: "#0c0a09",
    color: "#e7e5e4",
    iconWrapBg: "#1c100b",
    iconWrapBorder: "1px solid rgba(251,146,60,0.2)",
    iconWrapShadow: "0 4px 25px rgba(251,146,60,0.08)",
    iconColor: "#fdba74",
    badgeBg: "#1c100b",
    badgeBorder: "1px solid rgba(251,146,60,0.2)",
    badgeColor: "#fdba74",
    headingColor: "#f5f5f4",
    messageColor: "#a8a29e",
    messageStrongColor: "#f5f5f4",
    etaChipBg: "#052e16",
    etaChipBorder: "1px solid rgba(34,197,94,0.2)",
    etaChipColor: "#4ade80",
    statusRowBg: "#1c1917",
    statusRowBorder: "1px solid rgba(231,229,228,0.08)",
    statusRowShadow: "0 1px 3px rgba(0,0,0,0.2)",
    statusLabelColor: "#e7e5e4",
    dividerBg: "rgba(231,229,228,0.1)",
    btnPrimaryBg: "#ffffff",
    btnPrimaryColor: "#0c0a09",
    btnSecondaryBg: "#1c1917",
    btnSecondaryBorder: "1px solid rgba(231,229,228,0.15)",
    btnSecondaryColor: "#e7e5e4",
    footerTextColor: "rgba(168,162,158,0.4)",
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
    userSelect: "none",
    fontFamily: SANS,
    boxSizing: "border-box",
  },
  spacer: { flex: 1 },
  card: {
    width: "100%",
    maxWidth: "30rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "0 1rem",
    animation: "hotpax-slide-up 0.6s ease both",
  },
  iconWrap: {
    position: "relative",
    marginBottom: "2rem",
    width: "5rem",
    height: "5rem",
    borderRadius: "1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.3rem 0.875rem",
    borderRadius: "9999px",
    fontSize: "0.625rem",
    fontFamily: MONO,
    fontWeight: 700,
    letterSpacing: "0.12em",
    marginBottom: "1.5rem",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-0.025em",
    margin: "0 0 1rem",
  },
  message: {
    fontSize: "0.9375rem",
    lineHeight: 1.65,
    maxWidth: "22rem",
    margin: "0 0 1.75rem",
  },
  etaChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.625rem",
    fontSize: "0.75rem",
    fontFamily: MONO,
    fontWeight: 600,
    letterSpacing: "0.04em",
    marginBottom: "2rem",
  },
  statusList: {
    width: "100%",
    maxWidth: "22rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "2rem",
    textAlign: "left",
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.625rem 0.875rem",
    borderRadius: "0.5rem",
  },
  statusLabel: {
    fontSize: "0.8125rem",
    fontWeight: 500,
    fontFamily: SANS,
  },
  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: "0.5625rem",
    fontFamily: MONO,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  divider: {
    width: "3rem",
    height: "1px",
    margin: "0.5rem auto 1.75rem",
  },
  buttons: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.625rem 1.25rem",
    fontWeight: 500,
    fontSize: "0.6875rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    fontFamily: MONO,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transition: "opacity 0.2s ease",
    border: "none",
    cursor: "pointer",
  },
  btnSecondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.625rem 1.25rem",
    fontWeight: 500,
    fontSize: "0.6875rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    fontFamily: MONO,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background-color 0.2s ease",
    cursor: "pointer",
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

// ─── Component ───────────────────────────────────────────────────────────────

export function MaintenanceScreen({
  siteName = "our service",
  message = "We're performing scheduled maintenance. We'll be back shortly.",
  eta,
  statusItems,
  supportEmail,
  statusPageUrl,
  footerText,
  theme = "light",
}: MaintenanceScreenProps) {
  injectHotpaxKeyframes();
  const currentYear = new Date().getFullYear();
  const t = theme === "dark" ? themeStyles.dark : themeStyles.light;

  return (
    <div
      style={{
        ...baseStyles.root,
        backgroundColor: t.bg,
        color: t.color,
      }}
    >
      <div style={baseStyles.spacer} />

      <div style={baseStyles.card}>
        {/* Icon */}
        <div
          style={{
            ...baseStyles.iconWrap,
            backgroundColor: t.iconWrapBg,
            border: t.iconWrapBorder,
            boxShadow: t.iconWrapShadow,
          }}
        >
          <Wrench
            style={{
              width: "2rem",
              height: "2rem",
              color: t.iconColor,
              animation: "hotpax-spin 4s linear infinite",
            }}
            strokeWidth={1.8}
          />
        </div>

        {/* Badge */}
        <div
          style={{
            ...baseStyles.badge,
            backgroundColor: t.badgeBg,
            border: t.badgeBorder,
            color: t.badgeColor,
          }}
        >
          <AlertTriangle style={{ width: "0.625rem", height: "0.625rem" }} />
          Maintenance Mode
        </div>

        {/* Heading */}
        <h1 style={{ ...baseStyles.heading, color: t.headingColor }}>
          Down for
          <br />
          Maintenance
        </h1>

        <div style={{ ...baseStyles.divider, backgroundColor: t.dividerBg }} />

        {/* Message */}
        <p style={{ ...baseStyles.message, color: t.messageColor }}>
          <strong style={{ color: t.messageStrongColor }}>{siteName}</strong> is currently
          undergoing maintenance. {message}
        </p>

        {/* ETA */}
        {eta && (
          <div
            style={{
              ...baseStyles.etaChip,
              backgroundColor: t.etaChipBg,
              border: t.etaChipBorder,
              color: t.etaChipColor,
            }}
          >
            <RefreshCw style={{ width: "0.75rem", height: "0.75rem" }} />
            Expected back: {eta}
          </div>
        )}

        {/* Status items */}
        {statusItems && statusItems.length > 0 && (
          <div style={baseStyles.statusList}>
            {statusItems.map((item) => (
              <div
                key={item.label}
                style={{
                  ...baseStyles.statusRow,
                  backgroundColor: t.statusRowBg,
                  border: t.statusRowBorder,
                  boxShadow: t.statusRowShadow,
                }}
              >
                <span style={{ ...baseStyles.statusLabel, color: t.statusLabelColor }}>
                  {item.label}
                </span>
                <span
                  style={{
                    ...baseStyles.statusPill,
                    color: STATUS_COLORS[item.status] ?? "#78716c",
                  }}
                >
                  <span
                    style={{
                      width: "0.375rem",
                      height: "0.375rem",
                      borderRadius: "9999px",
                      backgroundColor: STATUS_COLORS[item.status] ?? "#78716c",
                      display: "inline-block",
                      animation:
                        item.status !== "operational"
                          ? "hotpax-pulse 1.5s ease-in-out infinite"
                          : undefined,
                    }}
                  />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        {(supportEmail || statusPageUrl) && (
          <div style={baseStyles.buttons}>
            {supportEmail && (
              <a
                href={`mailto:${supportEmail}`}
                className="hotpax-btn-primary"
                style={{
                  ...baseStyles.btnPrimary,
                  backgroundColor: t.btnPrimaryBg,
                  color: t.btnPrimaryColor,
                }}
              >
                <Mail style={{ width: "0.875rem", height: "0.875rem" }} />
                Contact Support
              </a>
            )}
            {statusPageUrl && (
              <a
                href={statusPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  theme === "dark"
                    ? "hotpax-btn-secondary-dark"
                    : "hotpax-btn-secondary"
                }
                style={{
                  ...baseStyles.btnSecondary,
                  backgroundColor: t.btnSecondaryBg,
                  color: t.btnSecondaryColor,
                  border: t.btnSecondaryBorder,
                }}
              >
                <ExternalLink style={{ width: "0.875rem", height: "0.875rem" }} />
                Status Page
              </a>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={baseStyles.footer}>
        <div style={{ ...baseStyles.footerText, color: t.footerTextColor }}>
          {footerText ?? `© ${currentYear} ${siteName} • All rights reserved`}
        </div>
      </div>
    </div>
  );
}
