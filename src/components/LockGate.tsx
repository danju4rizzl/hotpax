import { type CSSProperties, type ReactNode } from "react";
import { Lock, Clock, Mail, ExternalLink } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LockGateProps {
  /**
   * When `true`, renders children normally.
   * When `false`, renders the access-blocked screen.
   */
  hasPaid: boolean;
  /** The protected page content. */
  children: ReactNode;
  /**
   * Display name of the site/product shown in the blocked message.
   * @default "this website"
   */
  siteName?: string;
  /**
   * Support email address. When provided, renders a "Contact Support" button.
   */
  supportEmail?: string;
  /**
   * External URL for a secondary CTA button (e.g., your agency/studio site).
   */
  supportUrl?: string;
  /**
   * Label for the `supportUrl` button.
   * @default "Visit Support"
   */
  supportUrlLabel?: string;
  /**
   * Short error/status code shown in the footer.
   * @default "ACCESS_RESTRICTED"
   */
  errorCode?: string;
  /**
   * Custom footer copyright text. Replaces the default "© YEAR" line.
   */
  footerText?: string;
}

// ─── Inline Styles ───────────────────────────────────────────────────────────
// Using plain style objects so this component works in any project,
// regardless of whether Tailwind CSS is installed.

const styles: Record<string, CSSProperties> = {
  root: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "4rem",
    paddingBottom: "4rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    backgroundColor: "#f7fafc",
    color: "#181c1e",
    userSelect: "none",
    fontFamily:
      "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    boxSizing: "border-box",
  },
  spacer: {
    flex: 1,
  },
  card: {
    width: "100%",
    maxWidth: "28rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    animation: "hotpax-slide-up 0.6s ease both",
  },
  iconWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2rem",
  },
  iconBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "5rem",
    height: "5rem",
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    border: "1px solid rgba(196,198,208,0.4)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
  },
  clockBadge: {
    position: "absolute",
    bottom: "-4px",
    right: "-4px",
    backgroundColor: "#ffffff",
    borderRadius: "9999px",
    padding: "4px",
    border: "1px solid rgba(196,198,208,0.4)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    marginTop: "1.25rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    border: "1px solid rgba(196,198,208,0.4)",
    backgroundColor: "#ffffff",
    fontSize: "0.625rem",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#44474f",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  pulseDot: {
    width: "0.375rem",
    height: "0.375rem",
    borderRadius: "9999px",
    backgroundColor: "#ea580c",
    animation: "hotpax-pulse 1.5s ease-in-out infinite",
    flexShrink: 0,
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#181c1e",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    margin: 0,
  },
  divider: {
    width: "3rem",
    height: "1px",
    backgroundColor: "rgba(196,198,208,0.5)",
    margin: "1.5rem auto",
  },
  description: {
    color: "#44474f",
    fontSize: "0.9375rem",
    fontWeight: 400,
    maxWidth: "22rem",
    lineHeight: 1.65,
    marginBottom: "2rem",
    marginTop: 0,
  },
  siteName: {
    color: "#181c1e",
    fontWeight: 700,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    gap: "0.75rem",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.625rem 1.25rem",
    backgroundColor: "#181c1e",
    color: "#ffffff",
    fontWeight: 500,
    fontSize: "0.6875rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    transition: "opacity 0.2s ease",
    cursor: "pointer",
    border: "none",
  },
  btnSecondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.625rem 1.25rem",
    backgroundColor: "#ffffff",
    color: "#181c1e",
    fontWeight: 500,
    fontSize: "0.6875rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    border: "1px solid rgba(196,198,208,0.6)",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
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
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    fontSize: "0.5625rem",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    letterSpacing: "0.1em",
    color: "rgba(68,71,79,0.5)",
    textTransform: "uppercase",
    marginTop: "3rem",
  },
};

// Keyframe injection — runs once, idempotent
const STYLE_ID = "hotpax-keyframes";
function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
    @keyframes hotpax-slide-up {
      from { opacity: 0; transform: translateY(1rem); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes hotpax-pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }
    .hotpax-btn-primary:hover  { opacity: 0.88 !important; }
    .hotpax-btn-secondary:hover { background-color: rgba(24,28,30,0.05) !important; }
  `;
  document.head.appendChild(el);
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LockGate({
  hasPaid,
  children,
  siteName = "this website",
  supportEmail,
  supportUrl,
  supportUrlLabel = "Visit Support",
  errorCode = "ACCESS_RESTRICTED",
  footerText,
}: LockGateProps) {
  // Pass-through: render children when access is granted
  if (hasPaid) {
    return <>{children}</>;
  }

  // Inject keyframes on first render
  injectKeyframes();

  const currentYear = new Date().getFullYear();
  const defaultFooter = `© ${currentYear} ${siteName} • All rights reserved`;

  return (
    <div style={styles.root}>
      {/* Top spacer */}
      <div style={styles.spacer} />

      {/* Center Card */}
      <div style={styles.card}>
        {/* Lock Icon + Badge */}
        <div style={styles.iconWrap}>
          <div style={styles.iconBox}>
            <Lock style={{ width: "2rem", height: "2rem", color: "#181c1e" }} strokeWidth={1.8} />
            <div style={styles.clockBadge}>
              <Clock style={{ width: "0.875rem", height: "0.875rem", color: "#181c1e" }} strokeWidth={2} />
            </div>
          </div>

          <div style={styles.badge}>
            <span style={styles.pulseDot} />
            Access Blocked
          </div>
        </div>

        {/* Heading */}
        <h1 style={styles.heading}>
          This website is
          <br />
          Temporarily Offline
        </h1>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Description */}
        <p style={styles.description}>
          Access to the{" "}
          <span style={styles.siteName}>{siteName} </span>
          is currently restricted. Please contact your administrator or developer
          for more information.
        </p>

        {/* CTA Buttons */}
        {(supportEmail || supportUrl) && (
          <div style={styles.buttons}>
            {supportEmail && (
              <a
                href={`mailto:${supportEmail}`}
                className="hotpax-btn-primary"
                style={styles.btnPrimary}
              >
                <Mail style={{ width: "1rem", height: "1rem" }} />
                Contact Support
              </a>
            )}
            {supportUrl && (
              <a
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hotpax-btn-secondary"
                style={styles.btnSecondary}
              >
                <ExternalLink style={{ width: "0.875rem", height: "0.875rem" }} />
                {supportUrlLabel}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Bottom footer */}
      <div style={styles.footer}>
        <div style={styles.footerText}>
          <div>ERROR_CODE: {errorCode}</div>
          <div>{footerText ?? defaultFooter}</div>
        </div>
      </div>
    </div>
  );
}
