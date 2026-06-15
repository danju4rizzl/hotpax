import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Rocket,
  Wrench,
  Crown,
  ArrowRight,
  Package,
  ExternalLink,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMPONENTS = [
  {
    to: "/lock-gate",
    icon: Lock,
    name: "LockGate",
    tagline: "Blocks site access when payment is pending",
    description:
      "A full-screen gate that renders children normally when hasPaid is true, or shows a branded access-blocked screen when false.",
    color: "#181c1e",
    accentColor: "rgba(24,28,30,0.08)",
    dotColor: "#ea580c",
    badge: "ACCESS_RESTRICTED",
  },
  {
    to: "/coming-soon",
    icon: Rocket,
    name: "ComingSoon",
    tagline: "Dark launch screen with countdown & notify form",
    description:
      "A polished pre-launch page with a live countdown timer, email capture form, and animated floating icon.",
    color: "#6366f1",
    accentColor: "rgba(99,102,241,0.08)",
    dotColor: "#6366f1",
    badge: "LAUNCHING_SOON",
  },
  {
    to: "/maintenance",
    icon: Wrench,
    name: "MaintenanceScreen",
    tagline: "Scheduled downtime with system status rows",
    description:
      "An amber-toned maintenance page with a spinning wrench, ETA chip, and per-service status indicators.",
    color: "#ea580c",
    accentColor: "rgba(234,88,12,0.08)",
    dotColor: "#ea580c",
    badge: "MAINTENANCE_MODE",
  },
  {
    to: "/paywall",
    icon: Crown,
    name: "PaywallBanner",
    tagline: "Pricing tiers with feature checklists",
    description:
      "A full-page paywall that passes through children when hasAccess is true, or shows clean pricing cards when false.",
    color: "#f59e0b",
    accentColor: "rgba(245,158,11,0.08)",
    dotColor: "#f59e0b",
    badge: "PREMIUM_ACCESS",
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const SANS = "'Inter', system-ui, sans-serif";

const s: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#09090b",
    color: "#f4f4f5",
    fontFamily: SANS,
    overflowX: "hidden",
  },
  // ── Hero ──
  hero: {
    maxWidth: "64rem",
    margin: "0 auto",
    padding: "6rem 2rem 3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1.5rem",
  },
  heroTopRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  logoBox: {
    width: "3rem",
    height: "3rem",
    borderRadius: "0.75rem",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 24px rgba(99,102,241,0.4)",
    flexShrink: 0,
  },
  logoText: {
    fontSize: "1.25rem",
    fontWeight: 800,
    color: "#f4f4f5",
    letterSpacing: "-0.03em",
    fontFamily: MONO,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    border: "1px solid rgba(99,102,241,0.4)",
    backgroundColor: "rgba(99,102,241,0.1)",
    fontSize: "0.625rem",
    fontFamily: MONO,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#a5b4fc",
  },
  heroHeading: {
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    fontWeight: 800,
    color: "#f4f4f5",
    lineHeight: 1.08,
    letterSpacing: "-0.04em",
    maxWidth: "28rem",
    margin: 0,
  },
  heroHeadingAccent: {
    background: "linear-gradient(90deg, #6366f1, #a78bfa, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    color: "#a1a1aa",
    fontSize: "1.0625rem",
    lineHeight: 1.7,
    maxWidth: "28rem",
    margin: 0,
  },
  heroActions: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "0.875rem",
    borderRadius: "0.625rem",
    textDecoration: "none",
    fontFamily: SANS,
    boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
    transition: "opacity 0.2s ease",
    border: "none",
    cursor: "pointer",
  },
  btnOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "transparent",
    color: "#a1a1aa",
    fontWeight: 500,
    fontSize: "0.875rem",
    borderRadius: "0.625rem",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.1)",
    fontFamily: SANS,
    transition: "border-color 0.2s ease, color 0.2s ease",
    cursor: "pointer",
  },
  // Stats bar
  statsBar: {
    borderTop: "1px solid rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    padding: "1.25rem 2rem",
    display: "flex",
    gap: "3rem",
    maxWidth: "64rem",
    margin: "0 auto",
    overflowX: "auto",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
    flexShrink: 0,
  },
  statNum: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#f4f4f5",
    fontFamily: MONO,
    letterSpacing: "-0.03em",
  },
  statLabel: {
    fontSize: "0.6875rem",
    color: "#71717a",
    fontFamily: MONO,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  // Cards grid
  section: {
    maxWidth: "64rem",
    margin: "0 auto",
    padding: "3.5rem 2rem 6rem",
  },
  sectionLabel: {
    fontSize: "0.625rem",
    fontFamily: MONO,
    fontWeight: 700,
    letterSpacing: "0.15em",
    color: "#52525b",
    textTransform: "uppercase",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(17rem, 1fr))",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#111113",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "1rem",
    padding: "1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    textDecoration: "none",
    color: "#f4f4f5",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  cardTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardIconBox: {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "0.625rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBadge: {
    fontSize: "0.5rem",
    fontFamily: MONO,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "0.2rem 0.5rem",
    borderRadius: "0.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    flexShrink: 0,
  },
  cardName: {
    fontSize: "1.0625rem",
    fontWeight: 700,
    color: "#f4f4f5",
    fontFamily: MONO,
    margin: "0 0 0.25rem",
  },
  cardTagline: {
    fontSize: "0.75rem",
    color: "#71717a",
    fontWeight: 500,
    margin: 0,
  },
  cardDesc: {
    fontSize: "0.8125rem",
    color: "#52525b",
    lineHeight: 1.6,
    margin: 0,
    flex: 1,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "0.875rem",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  cardCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#a1a1aa",
    fontFamily: MONO,
    letterSpacing: "0.04em",
  },
  // Footer
  footer: {
    borderTop: "1px solid rgba(255,255,255,0.05)",
    padding: "2rem",
    textAlign: "center",
  },
  footerText: {
    fontSize: "0.6875rem",
    fontFamily: MONO,
    color: "#3f3f46",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function HomePage() {
  const year = new Date().getFullYear();

  return (
    <div style={s.page}>
      {/* ── Hero ── */}
      <header style={s.hero}>
        <div style={s.heroTopRow}>
          <div style={s.logoBox}>
            <Package style={{ width: "1.25rem", height: "1.25rem", color: "#fff" }} />
          </div>
          <span style={s.logoText}>hotpax</span>
        </div>

        <div style={s.heroBadge}>
          <span style={{ width: "0.375rem", height: "0.375rem", borderRadius: "9999px", backgroundColor: "#22c55e", display: "inline-block" }} />
          v0.2.0 · Component Preview
        </div>

        <h1 style={s.heroHeading}>
          React UI
          <br />
          <span style={s.heroHeadingAccent}>access gates</span>
          <br />
          that just work.
        </h1>

        <p style={s.heroSub}>
          A growing collection of plug-and-play React components for access control,
          paywalls, maintenance, and launch screens. Zero Tailwind. Fully typed.
        </p>

        <div style={s.heroActions}>
          <a
            href="https://github.com/danju4rizzl/hotpax"
            target="_blank"
            rel="noopener noreferrer"
            style={s.btnPrimary}
          >
            <ExternalLink style={{ width: "0.875rem", height: "0.875rem" }} />
            View on GitHub
          </a>
          <a
            href="https://github.com/danju4rizzl/hotpax#installation"
            target="_blank"
            rel="noopener noreferrer"
            style={s.btnOutline}
          >
            Docs
          </a>
        </div>
      </header>

      {/* ── Stats ── */}
      <div style={s.statsBar}>
        {[
          { num: "4",     label: "Components"    },
          { num: "0",     label: "CSS deps"       },
          { num: "ESM",   label: "+ CJS Output"   },
          { num: "100%",  label: "Typed"          },
          { num: "React", label: "≥ 18 Required"  },
        ].map(({ num, label }) => (
          <div key={label} style={s.stat}>
            <span style={s.statNum}>{num}</span>
            <span style={s.statLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Component Cards ── */}
      <main style={s.section}>
        <div style={s.sectionLabel}>// Components — click to preview</div>
        <div style={s.grid}>
          {COMPONENTS.map((comp) => {
            const Icon = comp.icon;
            return (
              <Link
                key={comp.to}
                to={comp.to}
                style={s.card}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = comp.color;
                  el.style.boxShadow = `0 0 0 1px ${comp.color}20, 0 8px 30px rgba(0,0,0,0.3)`;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div style={s.cardTopRow}>
                  <div
                    style={{
                      ...s.cardIconBox,
                      backgroundColor: comp.accentColor,
                    }}
                  >
                    <Icon style={{ width: "1.125rem", height: "1.125rem", color: comp.color }} strokeWidth={2} />
                  </div>
                  <div
                    style={{
                      ...s.cardBadge,
                      color: comp.color,
                      backgroundColor: comp.accentColor,
                    }}
                  >
                    <span
                      style={{
                        width: "0.3rem",
                        height: "0.3rem",
                        borderRadius: "9999px",
                        backgroundColor: comp.dotColor,
                        display: "inline-block",
                      }}
                    />
                    {comp.badge}
                  </div>
                </div>

                <div>
                  <p style={s.cardName}>{comp.name}</p>
                  <p style={s.cardTagline}>{comp.tagline}</p>
                </div>

                <p style={s.cardDesc}>{comp.description}</p>

                <div style={s.cardFooter}>
                  <span style={{ ...s.cardCta, color: comp.color }}>
                    Preview component
                    <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={s.footer}>
        <p style={s.footerText}>
          © {year} Kavara Digital Global LTD · hotpax · MIT License
        </p>
      </footer>
    </div>
  );
}
