import { type CSSProperties, useState, useEffect } from "react";
import { Rocket, Bell, ExternalLink } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ComingSoonProps {
  /**
   * Product / site name displayed in the heading.
   * @default "Something Awesome"
   */
  siteName?: string;
  /**
   * Short tagline below the heading.
   * @default "We're building something great. Stay tuned."
   */
  tagline?: string;
  /**
   * ISO date string or Date for a launch countdown timer.
   * When provided, a live countdown is rendered.
   */
  launchDate?: string | Date;
  /**
   * Callback when the user submits their email for early access.
   * Receives the submitted email string. If omitted, no notify form is shown.
   */
  onNotify?: (email: string) => void;
  /**
   * Label for the notify/submit button.
   * @default "Notify Me"
   */
  notifyLabel?: string;
  /**
   * Social links or external CTAs rendered as secondary buttons.
   */
  links?: Array<{ label: string; href: string }>;
  /**
   * Custom footer text.
   */
  footerText?: string;
  /**
   * UI theme mode.
   * @default "dark"
   */
  theme?: "light" | "dark";
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

const MONO = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";
const SANS =
  "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

const STYLE_ID = "hotpax-keyframes";
export function injectHotpaxKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
    @keyframes hotpax-slide-up {
      from { opacity: 0; transform: translateY(1.25rem); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes hotpax-pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }
    @keyframes hotpax-spin {
      to { transform: rotate(360deg); }
    }
    @keyframes hotpax-float {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-6px); }
    }
    .hotpax-btn-primary:hover   { opacity: 0.88 !important; }
    .hotpax-btn-secondary:hover { background-color: rgba(24,28,30,0.06) !important; }
    .hotpax-btn-secondary-light:hover { background-color: rgba(99,102,241,0.06) !important; }
    .hotpax-btn-secondary-dark:hover { background-color: rgba(255,255,255,0.08) !important; }
    .hotpax-input:focus { outline: 2px solid #6366f1 !important; outline-offset: 2px; }
  `;
  document.head.appendChild(el);
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const themeStyles = {
  light: {
    bg: "linear-gradient(135deg, #f5f3ff 0%, #fcfbfe 60%, #ffffff 100%)",
    color: "#2e2a47",
    headingColor: "#1e1b4b",
    headingAccentBg: "linear-gradient(90deg, #4f46e5, #7c3aed)",
    gridColor: "rgba(99,102,241,0.03)",
    badgeBorder: "1px solid rgba(99,102,241,0.3)",
    badgeBg: "rgba(99,102,241,0.05)",
    badgeColor: "#4f46e5",
    taglineColor: "#5c5870",
    countUnitBg: "rgba(99,102,241,0.03)",
    countUnitBorder: "1px solid rgba(99,102,241,0.1)",
    countNumColor: "#1e1b4b",
    countLabelColor: "#7c7890",
    inputBg: "#ffffff",
    inputBorder: "1px solid rgba(99,102,241,0.2)",
    inputColor: "#1e1b4b",
    btnPrimaryBg: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    btnPrimaryColor: "#ffffff",
    btnSecondaryBg: "#ffffff",
    btnSecondaryBorder: "1px solid rgba(99,102,241,0.25)",
    btnSecondaryColor: "#4f46e5",
    footerTextColor: "rgba(92,88,112,0.5)",
    pulseDotColor: "#4f46e5",
  },
  dark: {
    bg: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
    color: "#e2e8f0",
    headingColor: "#f1f5f9",
    headingAccentBg: "linear-gradient(90deg, #6366f1, #a78bfa)",
    gridColor: "rgba(99,102,241,0.06)",
    badgeBorder: "1px solid rgba(99,102,241,0.4)",
    badgeBg: "rgba(99,102,241,0.1)",
    badgeColor: "#a5b4fc",
    taglineColor: "#94a3b8",
    countUnitBg: "rgba(255,255,255,0.04)",
    countUnitBorder: "1px solid rgba(255,255,255,0.08)",
    countNumColor: "#f1f5f9",
    countLabelColor: "#64748b",
    inputBg: "rgba(255,255,255,0.06)",
    inputBorder: "1px solid rgba(255,255,255,0.1)",
    inputColor: "#f1f5f9",
    btnPrimaryBg: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    btnPrimaryColor: "#ffffff",
    btnSecondaryBg: "rgba(255,255,255,0.05)",
    btnSecondaryBorder: "1px solid rgba(255,255,255,0.08)",
    btnSecondaryColor: "#94a3b8",
    footerTextColor: "rgba(148,163,184,0.4)",
    pulseDotColor: "#6366f1",
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
    position: "relative",
    overflow: "hidden",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundSize: "40px 40px",
  },
  spacer: { flex: 1 },
  card: {
    width: "100%",
    maxWidth: "32rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "0 1rem",
    animation: "hotpax-slide-up 0.7s ease both",
    position: "relative",
    zIndex: 1,
  },
  iconGlow: {
    position: "relative",
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBg: {
    width: "5rem",
    height: "5rem",
    borderRadius: "1.25rem",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 40px rgba(99,102,241,0.4)",
    animation: "hotpax-float 3s ease-in-out infinite",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.25rem 0.875rem",
    borderRadius: "9999px",
    fontSize: "0.625rem",
    fontFamily: MONO,
    fontWeight: 700,
    letterSpacing: "0.12em",
    marginBottom: "1.5rem",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    margin: "0 0 1rem",
  },
  headingAccent: {
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  tagline: {
    fontSize: "1rem",
    lineHeight: 1.65,
    maxWidth: "24rem",
    margin: "0 0 2rem",
  },
  countdown: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  countUnit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.375rem",
    minWidth: "4rem",
    padding: "0.875rem 1rem",
    borderRadius: "0.75rem",
    backdropFilter: "blur(8px)",
  },
  countNum: {
    fontSize: "1.75rem",
    fontWeight: 800,
    lineHeight: 1,
    fontFamily: MONO,
    letterSpacing: "-0.02em",
  },
  countLabel: {
    fontSize: "0.5rem",
    fontFamily: MONO,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  notifyForm: {
    display: "flex",
    gap: "0.5rem",
    width: "100%",
    maxWidth: "24rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    minWidth: "10rem",
    padding: "0.625rem 1rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    fontFamily: SANS,
    outline: "none",
    transition: "outline 0.15s ease",
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.625rem 1.25rem",
    fontWeight: 600,
    fontSize: "0.75rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontFamily: MONO,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
    transition: "opacity 0.2s ease",
    textDecoration: "none",
    flexShrink: 0,
  },
  btnSecondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontFamily: MONO,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    transition: "background-color 0.2s ease",
    textDecoration: "none",
    borderRadius: "0.5rem",
  },
  links: {
    display: "flex",
    gap: "0.625rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "relative",
    zIndex: 1,
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

// ─── Countdown hook ───────────────────────────────────────────────────────────

function useCountdown(target?: string | Date) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    if (!target) return;
    const end = new Date(target).getTime();
    const tick = () => setDiff(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ComingSoon({
  siteName = "Something Awesome",
  tagline = "We're building something great. Stay tuned.",
  launchDate,
  onNotify,
  notifyLabel = "Notify Me",
  links,
  footerText,
  theme = "dark",
}: ComingSoonProps) {
  injectHotpaxKeyframes();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const countdown = useCountdown(launchDate);
  const currentYear = new Date().getFullYear();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    onNotify?.(email.trim());
    setSubmitted(true);
  }

  const pad = (n: number) => String(n).padStart(2, "0");
  const t = theme === "light" ? themeStyles.light : themeStyles.dark;

  return (
    <div
      style={{
        ...baseStyles.root,
        background: t.bg,
        color: t.color,
      }}
    >
      <div
        style={{
          ...baseStyles.gridOverlay,
          backgroundImage: `linear-gradient(${t.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${t.gridColor} 1px, transparent 1px)`,
        }}
      />
      <div style={baseStyles.spacer} />

      <div style={baseStyles.card}>
        {/* Floating Icon */}
        <div style={baseStyles.iconGlow}>
          <div style={baseStyles.iconBg}>
            <Rocket style={{ width: "2rem", height: "2rem", color: "#ffffff" }} strokeWidth={1.8} />
          </div>
        </div>

        {/* Badge */}
        <div
          style={{
            ...baseStyles.badge,
            border: t.badgeBorder,
            backgroundColor: t.badgeBg,
            color: t.badgeColor,
          }}
        >
          <span
            style={{
              width: "0.375rem",
              height: "0.375rem",
              borderRadius: "9999px",
              backgroundColor: t.pulseDotColor,
              animation: "hotpax-pulse 1.5s ease-in-out infinite",
              display: "inline-block",
            }}
          />
          Coming Soon
        </div>

        {/* Heading */}
        <h1 style={{ ...baseStyles.heading, color: t.headingColor }}>
          <span>
            {siteName}
          </span>
          <br />
          is launching soon
        </h1>

        <p style={{ ...baseStyles.tagline, color: t.taglineColor }}>{tagline}</p>

        {/* Countdown */}
        {launchDate && (
          <div style={baseStyles.countdown}>
            {[
              { label: "Days", val: countdown.days },
              { label: "Hours", val: countdown.hours },
              { label: "Minutes", val: countdown.minutes },
              { label: "Seconds", val: countdown.seconds },
            ].map(({ label, val }) => (
              <div
                key={label}
                style={{
                  ...baseStyles.countUnit,
                  backgroundColor: t.countUnitBg,
                  border: t.countUnitBorder,
                }}
              >
                <span style={{ ...baseStyles.countNum, color: t.countNumColor }}>{pad(val)}</span>
                <span style={{ ...baseStyles.countLabel, color: t.countLabelColor }}>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Notify form */}
        {onNotify && !submitted && (
          <form style={baseStyles.notifyForm} onSubmit={handleSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="hotpax-input"
              style={{
                ...baseStyles.input,
                backgroundColor: t.inputBg,
                border: t.inputBorder,
                color: t.inputColor,
              }}
            />
            <button
              type="submit"
              className="hotpax-btn-primary"
              style={{
                ...baseStyles.btnPrimary,
                background: t.btnPrimaryBg,
                color: t.btnPrimaryColor,
              }}
            >
              <Bell style={{ width: "0.875rem", height: "0.875rem" }} />
              {notifyLabel}
            </button>
          </form>
        )}

        {submitted && (
          <p
            style={{
              color: t.pulseDotColor,
              fontSize: "0.875rem",
              marginBottom: "2rem",
              fontFamily: MONO,
            }}
          >
            ✓ You're on the list — we'll reach out soon!
          </p>
        )}

        {/* External links */}
        {links && links.length > 0 && (
          <div style={baseStyles.links}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  theme === "light"
                    ? "hotpax-btn-secondary-light"
                    : "hotpax-btn-secondary-dark"
                }
                style={{
                  ...baseStyles.btnSecondary,
                  backgroundColor: t.btnSecondaryBg,
                  border: t.btnSecondaryBorder,
                  color: t.btnSecondaryColor,
                }}
              >
                <ExternalLink style={{ width: "0.75rem", height: "0.75rem" }} />
                {link.label}
              </a>
            ))}
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
