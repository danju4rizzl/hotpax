import { Lock, Clock, Mail, ExternalLink, Rocket, Bell, Wrench, AlertTriangle, RefreshCw, Crown, Star, Check } from 'lucide-react';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

// src/components/LockGate.tsx
var themeStyles = {
  light: {
    rootBg: "#f7fafc",
    rootColor: "#181c1e",
    iconBoxBg: "#ffffff",
    iconBoxBorder: "1px solid rgba(196,198,208,0.4)",
    iconColor: "#181c1e",
    clockBadgeBg: "#ffffff",
    clockBadgeBorder: "1px solid rgba(196,198,208,0.4)",
    clockBadgeColor: "#181c1e",
    badgeBg: "#ffffff",
    badgeBorder: "1px solid rgba(196,198,208,0.4)",
    badgeColor: "#44474f",
    headingColor: "#181c1e",
    dividerBg: "rgba(196,198,208,0.5)",
    descriptionColor: "#44474f",
    siteNameColor: "#181c1e",
    btnPrimaryBg: "#181c1e",
    btnPrimaryColor: "#ffffff",
    btnSecondaryBg: "#ffffff",
    btnSecondaryColor: "#181c1e",
    btnSecondaryBorder: "1px solid rgba(196,198,208,0.6)",
    footerTextColor: "rgba(68,71,79,0.5)"
  },
  dark: {
    rootBg: "#0d0f11",
    rootColor: "#e2e8f0",
    iconBoxBg: "#1a1f24",
    iconBoxBorder: "1px solid rgba(255,255,255,0.1)",
    iconColor: "#f8fafc",
    clockBadgeBg: "#1a1f24",
    clockBadgeBorder: "1px solid rgba(255,255,255,0.1)",
    clockBadgeColor: "#f8fafc",
    badgeBg: "#1a1f24",
    badgeBorder: "1px solid rgba(255,255,255,0.1)",
    badgeColor: "#94a3b8",
    headingColor: "#f8fafc",
    dividerBg: "rgba(255,255,255,0.1)",
    descriptionColor: "#94a3b8",
    siteNameColor: "#f8fafc",
    btnPrimaryBg: "#ffffff",
    btnPrimaryColor: "#0d0f11",
    btnSecondaryBg: "#1a1f24",
    btnSecondaryColor: "#e2e8f0",
    btnSecondaryBorder: "1px solid rgba(255,255,255,0.15)",
    footerTextColor: "rgba(148,163,184,0.4)"
  }
};
var baseStyles = {
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
    userSelect: "none",
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    boxSizing: "border-box"
  },
  spacer: {
    flex: 1
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
    animation: "hotpax-slide-up 0.6s ease both"
  },
  iconWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2rem"
  },
  iconBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "5rem",
    height: "5rem",
    borderRadius: "1rem",
    boxShadow: "0 8px 30px rgba(0,0,0,0.03)"
  },
  clockBadge: {
    position: "absolute",
    bottom: "-4px",
    right: "-4px",
    borderRadius: "9999px",
    padding: "4px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  badge: {
    marginTop: "1.25rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.625rem",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    fontWeight: 700,
    letterSpacing: "0.1em",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
  },
  pulseDot: {
    width: "0.375rem",
    height: "0.375rem",
    borderRadius: "9999px",
    backgroundColor: "#ea580c",
    animation: "hotpax-pulse 1.5s ease-in-out infinite",
    flexShrink: 0
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    margin: 0
  },
  divider: {
    width: "3rem",
    height: "1px",
    margin: "1.5rem auto"
  },
  description: {
    fontSize: "0.9375rem",
    fontWeight: 400,
    maxWidth: "22rem",
    lineHeight: 1.65,
    marginBottom: "2rem",
    marginTop: 0
  },
  siteName: {
    fontWeight: 700
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    gap: "0.75rem",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
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
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    transition: "opacity 0.2s ease",
    cursor: "pointer",
    border: "none"
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
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    transition: "background-color 0.2s ease",
    cursor: "pointer"
  },
  footer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
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
    textTransform: "uppercase",
    marginTop: "3rem"
  }
};
var STYLE_ID = "hotpax-keyframes";
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
    .hotpax-btn-secondary-dark:hover { background-color: rgba(255,255,255,0.08) !important; }
  `;
  document.head.appendChild(el);
}
function LockGate({
  hasPaid,
  children,
  siteName = "this website",
  logoSrc,
  supportEmail,
  supportUrl,
  supportUrlLabel = "Visit Support",
  errorCode = "ACCESS_RESTRICTED",
  footerText,
  theme = "light"
}) {
  if (hasPaid) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  injectKeyframes();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const defaultFooter = `\xA9 ${currentYear} ${siteName} \u2022 All rights reserved`;
  const t = theme === "dark" ? themeStyles.dark : themeStyles.light;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        ...baseStyles.root,
        backgroundColor: t.rootBg,
        color: t.rootColor
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: baseStyles.spacer }),
        /* @__PURE__ */ jsxs("div", { style: baseStyles.card, children: [
          /* @__PURE__ */ jsxs("div", { style: baseStyles.iconWrap, children: [
            logoSrc ? /* @__PURE__ */ jsx(
              "img",
              {
                src: logoSrc,
                alt: `${siteName} Logo`,
                style: {
                  height: "5rem",
                  width: "auto",
                  objectFit: "contain"
                }
              }
            ) : /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  ...baseStyles.iconBox,
                  backgroundColor: t.iconBoxBg,
                  border: t.iconBoxBorder
                },
                children: [
                  /* @__PURE__ */ jsx(
                    Lock,
                    {
                      style: { width: "2rem", height: "2rem", color: t.iconColor },
                      strokeWidth: 1.8
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        ...baseStyles.clockBadge,
                        backgroundColor: t.clockBadgeBg,
                        border: t.clockBadgeBorder
                      },
                      children: /* @__PURE__ */ jsx(
                        Clock,
                        {
                          style: { width: "0.875rem", height: "0.875rem", color: t.clockBadgeColor },
                          strokeWidth: 2
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  ...baseStyles.badge,
                  backgroundColor: t.badgeBg,
                  border: t.badgeBorder,
                  color: t.badgeColor
                },
                children: [
                  /* @__PURE__ */ jsx("span", { style: baseStyles.pulseDot }),
                  "Access Blocked"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("h1", { style: { ...baseStyles.heading, color: t.headingColor }, children: [
            "This website is",
            /* @__PURE__ */ jsx("br", {}),
            "Temporarily Offline"
          ] }),
          /* @__PURE__ */ jsx("div", { style: { ...baseStyles.divider, backgroundColor: t.dividerBg } }),
          /* @__PURE__ */ jsxs("p", { style: { ...baseStyles.description, color: t.descriptionColor }, children: [
            "Access to the",
            " ",
            /* @__PURE__ */ jsxs("span", { style: { ...baseStyles.siteName, color: t.siteNameColor }, children: [
              siteName,
              " "
            ] }),
            "is currently restricted. Please contact your administrator or developer for more information."
          ] }),
          (supportEmail || supportUrl) && /* @__PURE__ */ jsxs("div", { style: baseStyles.buttons, children: [
            supportEmail && /* @__PURE__ */ jsxs(
              "a",
              {
                href: `mailto:${supportEmail}`,
                className: "hotpax-btn-primary",
                style: {
                  ...baseStyles.btnPrimary,
                  backgroundColor: t.btnPrimaryBg,
                  color: t.btnPrimaryColor
                },
                children: [
                  /* @__PURE__ */ jsx(Mail, { style: { width: "1rem", height: "1rem" } }),
                  "Contact Support"
                ]
              }
            ),
            supportUrl && /* @__PURE__ */ jsxs(
              "a",
              {
                href: supportUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: theme === "dark" ? "hotpax-btn-secondary-dark" : "hotpax-btn-secondary",
                style: {
                  ...baseStyles.btnSecondary,
                  backgroundColor: t.btnSecondaryBg,
                  color: t.btnSecondaryColor,
                  border: t.btnSecondaryBorder
                },
                children: [
                  /* @__PURE__ */ jsx(ExternalLink, { style: { width: "0.875rem", height: "0.875rem" } }),
                  supportUrlLabel
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: baseStyles.footer, children: /* @__PURE__ */ jsxs("div", { style: { ...baseStyles.footerText, color: t.footerTextColor }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            "ERROR_CODE: ",
            errorCode
          ] }),
          /* @__PURE__ */ jsx("div", { children: footerText ?? defaultFooter })
        ] }) })
      ]
    }
  );
}
var MONO = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";
var SANS = "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
var STYLE_ID2 = "hotpax-keyframes";
function injectHotpaxKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID2)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID2;
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
var themeStyles2 = {
  light: {
    bg: "linear-gradient(135deg, #f5f3ff 0%, #fcfbfe 60%, #ffffff 100%)",
    color: "#2e2a47",
    headingColor: "#1e1b4b",
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
    pulseDotColor: "#4f46e5"
  },
  dark: {
    bg: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
    color: "#e2e8f0",
    headingColor: "#f1f5f9",
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
    pulseDotColor: "#6366f1"
  }
};
var baseStyles2 = {
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
    overflow: "hidden"
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundSize: "40px 40px"
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
    zIndex: 1
  },
  iconGlow: {
    position: "relative",
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
    animation: "hotpax-float 3s ease-in-out infinite"
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
    marginBottom: "1.5rem"
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    margin: "0 0 1rem"
  },
  tagline: {
    fontSize: "1rem",
    lineHeight: 1.65,
    maxWidth: "24rem",
    margin: "0 0 2rem"
  },
  countdown: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2.5rem",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  countUnit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.375rem",
    minWidth: "4rem",
    padding: "0.875rem 1rem",
    borderRadius: "0.75rem",
    backdropFilter: "blur(8px)"
  },
  countNum: {
    fontSize: "1.75rem",
    fontWeight: 800,
    lineHeight: 1,
    fontFamily: MONO,
    letterSpacing: "-0.02em"
  },
  countLabel: {
    fontSize: "0.5rem",
    fontFamily: MONO,
    letterSpacing: "0.12em",
    textTransform: "uppercase"
  },
  notifyForm: {
    display: "flex",
    gap: "0.5rem",
    width: "100%",
    maxWidth: "24rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  input: {
    flex: 1,
    minWidth: "10rem",
    padding: "0.625rem 1rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    fontFamily: SANS,
    outline: "none",
    transition: "outline 0.15s ease"
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
    flexShrink: 0
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
    borderRadius: "0.5rem"
  },
  links: {
    display: "flex",
    gap: "0.625rem",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  footer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "relative",
    zIndex: 1
  },
  footerText: {
    textAlign: "center",
    fontSize: "0.5625rem",
    fontFamily: MONO,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginTop: "3rem"
  }
};
function useCountdown(target) {
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    if (!target) return;
    const end = new Date(target).getTime();
    const tick = () => setDiff(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1e3);
    return () => clearInterval(id);
  }, [target]);
  const s = Math.floor(diff / 1e3);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor(s % 86400 / 3600),
    minutes: Math.floor(s % 3600 / 60),
    seconds: s % 60
  };
}
function ComingSoon({
  siteName = "Something Awesome",
  tagline = "We're building something great. Stay tuned.",
  logoSrc,
  launchDate,
  onNotify,
  notifyLabel = "Notify Me",
  links,
  footerText,
  theme = "dark"
}) {
  injectHotpaxKeyframes();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const countdown = useCountdown(launchDate);
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    onNotify?.(email.trim());
    setSubmitted(true);
  }
  const pad = (n) => String(n).padStart(2, "0");
  const t = theme === "light" ? themeStyles2.light : themeStyles2.dark;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        ...baseStyles2.root,
        background: t.bg,
        color: t.color
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              ...baseStyles2.gridOverlay,
              backgroundImage: `linear-gradient(${t.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${t.gridColor} 1px, transparent 1px)`
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { style: baseStyles2.spacer }),
        /* @__PURE__ */ jsxs("div", { style: baseStyles2.card, children: [
          /* @__PURE__ */ jsx("div", { style: baseStyles2.iconGlow, children: logoSrc ? /* @__PURE__ */ jsx(
            "img",
            {
              src: logoSrc,
              alt: `${siteName} Logo`,
              style: {
                height: "5rem",
                width: "auto",
                objectFit: "contain",
                animation: "hotpax-float 3s ease-in-out infinite"
              }
            }
          ) : /* @__PURE__ */ jsx("div", { style: baseStyles2.iconBg, children: /* @__PURE__ */ jsx(Rocket, { style: { width: "2rem", height: "2rem", color: "#ffffff" }, strokeWidth: 1.8 }) }) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                ...baseStyles2.badge,
                border: t.badgeBorder,
                backgroundColor: t.badgeBg,
                color: t.badgeColor
              },
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    style: {
                      width: "0.375rem",
                      height: "0.375rem",
                      borderRadius: "9999px",
                      backgroundColor: t.pulseDotColor,
                      animation: "hotpax-pulse 1.5s ease-in-out infinite",
                      display: "inline-block"
                    }
                  }
                ),
                "Coming Soon"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("h1", { style: { ...baseStyles2.heading, color: t.headingColor }, children: [
            /* @__PURE__ */ jsx("span", { children: siteName }),
            /* @__PURE__ */ jsx("br", {}),
            "is launching soon"
          ] }),
          /* @__PURE__ */ jsx("p", { style: { ...baseStyles2.tagline, color: t.taglineColor }, children: tagline }),
          launchDate && /* @__PURE__ */ jsx("div", { style: baseStyles2.countdown, children: [
            { label: "Days", val: countdown.days },
            { label: "Hours", val: countdown.hours },
            { label: "Minutes", val: countdown.minutes },
            { label: "Seconds", val: countdown.seconds }
          ].map(({ label, val }) => /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                ...baseStyles2.countUnit,
                backgroundColor: t.countUnitBg,
                border: t.countUnitBorder
              },
              children: [
                /* @__PURE__ */ jsx("span", { style: { ...baseStyles2.countNum, color: t.countNumColor }, children: pad(val) }),
                /* @__PURE__ */ jsx("span", { style: { ...baseStyles2.countLabel, color: t.countLabelColor }, children: label })
              ]
            },
            label
          )) }),
          onNotify && !submitted && /* @__PURE__ */ jsxs("form", { style: baseStyles2.notifyForm, onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                required: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "your@email.com",
                className: "hotpax-input",
                style: {
                  ...baseStyles2.input,
                  backgroundColor: t.inputBg,
                  border: t.inputBorder,
                  color: t.inputColor
                }
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                className: "hotpax-btn-primary",
                style: {
                  ...baseStyles2.btnPrimary,
                  background: t.btnPrimaryBg,
                  color: t.btnPrimaryColor
                },
                children: [
                  /* @__PURE__ */ jsx(Bell, { style: { width: "0.875rem", height: "0.875rem" } }),
                  notifyLabel
                ]
              }
            )
          ] }),
          submitted && /* @__PURE__ */ jsx(
            "p",
            {
              style: {
                color: t.pulseDotColor,
                fontSize: "0.875rem",
                marginBottom: "2rem",
                fontFamily: MONO
              },
              children: "\u2713 You're on the list \u2014 we'll reach out soon!"
            }
          ),
          links && links.length > 0 && /* @__PURE__ */ jsx("div", { style: baseStyles2.links, children: links.map((link) => /* @__PURE__ */ jsxs(
            "a",
            {
              href: link.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: theme === "light" ? "hotpax-btn-secondary-light" : "hotpax-btn-secondary-dark",
              style: {
                ...baseStyles2.btnSecondary,
                backgroundColor: t.btnSecondaryBg,
                border: t.btnSecondaryBorder,
                color: t.btnSecondaryColor
              },
              children: [
                /* @__PURE__ */ jsx(ExternalLink, { style: { width: "0.75rem", height: "0.75rem" } }),
                link.label
              ]
            },
            link.href
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { style: baseStyles2.footer, children: /* @__PURE__ */ jsx("div", { style: { ...baseStyles2.footerText, color: t.footerTextColor }, children: footerText ?? `\xA9 ${currentYear} ${siteName} \u2022 All rights reserved` }) })
      ]
    }
  );
}
var MONO2 = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";
var SANS2 = "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
var STATUS_COLORS = {
  operational: "#22c55e",
  degraded: "#f59e0b",
  down: "#ef4444"
};
var themeStyles3 = {
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
    footerTextColor: "rgba(120,113,108,0.5)"
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
    footerTextColor: "rgba(168,162,158,0.4)"
  }
};
var baseStyles3 = {
  root: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4rem 1.5rem",
    userSelect: "none",
    fontFamily: SANS2,
    boxSizing: "border-box"
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
    animation: "hotpax-slide-up 0.6s ease both"
  },
  iconWrap: {
    position: "relative",
    marginBottom: "2rem",
    width: "5rem",
    height: "5rem",
    borderRadius: "1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.3rem 0.875rem",
    borderRadius: "9999px",
    fontSize: "0.625rem",
    fontFamily: MONO2,
    fontWeight: 700,
    letterSpacing: "0.12em",
    marginBottom: "1.5rem"
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-0.025em",
    margin: "0 0 1rem"
  },
  message: {
    fontSize: "0.9375rem",
    lineHeight: 1.65,
    maxWidth: "22rem",
    margin: "0 0 1.75rem"
  },
  etaChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.625rem",
    fontSize: "0.75rem",
    fontFamily: MONO2,
    fontWeight: 600,
    letterSpacing: "0.04em",
    marginBottom: "2rem"
  },
  statusList: {
    width: "100%",
    maxWidth: "22rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "2rem",
    textAlign: "left"
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.625rem 0.875rem",
    borderRadius: "0.5rem"
  },
  statusLabel: {
    fontSize: "0.8125rem",
    fontWeight: 500,
    fontFamily: SANS2
  },
  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: "0.5625rem",
    fontFamily: MONO2,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase"
  },
  divider: {
    width: "3rem",
    height: "1px",
    margin: "0.5rem auto 1.75rem"
  },
  buttons: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
    justifyContent: "center"
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
    fontFamily: MONO2,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transition: "opacity 0.2s ease",
    border: "none",
    cursor: "pointer"
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
    fontFamily: MONO2,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background-color 0.2s ease",
    cursor: "pointer"
  },
  footer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  footerText: {
    textAlign: "center",
    fontSize: "0.5625rem",
    fontFamily: MONO2,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginTop: "3rem"
  }
};
function MaintenanceScreen({
  siteName = "our service",
  logoSrc,
  message = "We're performing scheduled maintenance. We'll be back shortly.",
  eta,
  statusItems,
  supportEmail,
  statusPageUrl,
  footerText,
  theme = "light"
}) {
  injectHotpaxKeyframes();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const t = theme === "dark" ? themeStyles3.dark : themeStyles3.light;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        ...baseStyles3.root,
        backgroundColor: t.bg,
        color: t.color
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: baseStyles3.spacer }),
        /* @__PURE__ */ jsxs("div", { style: baseStyles3.card, children: [
          logoSrc ? /* @__PURE__ */ jsx(
            "img",
            {
              src: logoSrc,
              alt: `${siteName} Logo`,
              style: {
                height: "5rem",
                width: "auto",
                objectFit: "contain",
                marginBottom: "2rem"
              }
            }
          ) : /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                ...baseStyles3.iconWrap,
                backgroundColor: t.iconWrapBg,
                border: t.iconWrapBorder,
                boxShadow: t.iconWrapShadow
              },
              children: /* @__PURE__ */ jsx(
                Wrench,
                {
                  style: {
                    width: "2rem",
                    height: "2rem",
                    color: t.iconColor,
                    animation: "hotpax-spin 4s linear infinite"
                  },
                  strokeWidth: 1.8
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                ...baseStyles3.badge,
                backgroundColor: t.badgeBg,
                border: t.badgeBorder,
                color: t.badgeColor
              },
              children: [
                /* @__PURE__ */ jsx(AlertTriangle, { style: { width: "0.625rem", height: "0.625rem" } }),
                "Maintenance Mode"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("h1", { style: { ...baseStyles3.heading, color: t.headingColor }, children: [
            "Down for",
            /* @__PURE__ */ jsx("br", {}),
            "Maintenance"
          ] }),
          /* @__PURE__ */ jsx("div", { style: { ...baseStyles3.divider, backgroundColor: t.dividerBg } }),
          /* @__PURE__ */ jsxs("p", { style: { ...baseStyles3.message, color: t.messageColor }, children: [
            /* @__PURE__ */ jsx("strong", { style: { color: t.messageStrongColor }, children: siteName }),
            " is currently undergoing maintenance. ",
            message
          ] }),
          eta && /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                ...baseStyles3.etaChip,
                backgroundColor: t.etaChipBg,
                border: t.etaChipBorder,
                color: t.etaChipColor
              },
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { style: { width: "0.75rem", height: "0.75rem" } }),
                "Expected back: ",
                eta
              ]
            }
          ),
          statusItems && statusItems.length > 0 && /* @__PURE__ */ jsx("div", { style: baseStyles3.statusList, children: statusItems.map((item) => /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                ...baseStyles3.statusRow,
                backgroundColor: t.statusRowBg,
                border: t.statusRowBorder,
                boxShadow: t.statusRowShadow
              },
              children: [
                /* @__PURE__ */ jsx("span", { style: { ...baseStyles3.statusLabel, color: t.statusLabelColor }, children: item.label }),
                /* @__PURE__ */ jsxs(
                  "span",
                  {
                    style: {
                      ...baseStyles3.statusPill,
                      color: STATUS_COLORS[item.status] ?? "#78716c"
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          style: {
                            width: "0.375rem",
                            height: "0.375rem",
                            borderRadius: "9999px",
                            backgroundColor: STATUS_COLORS[item.status] ?? "#78716c",
                            display: "inline-block",
                            animation: item.status !== "operational" ? "hotpax-pulse 1.5s ease-in-out infinite" : void 0
                          }
                        }
                      ),
                      item.status
                    ]
                  }
                )
              ]
            },
            item.label
          )) }),
          (supportEmail || statusPageUrl) && /* @__PURE__ */ jsxs("div", { style: baseStyles3.buttons, children: [
            supportEmail && /* @__PURE__ */ jsxs(
              "a",
              {
                href: `mailto:${supportEmail}`,
                className: "hotpax-btn-primary",
                style: {
                  ...baseStyles3.btnPrimary,
                  backgroundColor: t.btnPrimaryBg,
                  color: t.btnPrimaryColor
                },
                children: [
                  /* @__PURE__ */ jsx(Mail, { style: { width: "0.875rem", height: "0.875rem" } }),
                  "Contact Support"
                ]
              }
            ),
            statusPageUrl && /* @__PURE__ */ jsxs(
              "a",
              {
                href: statusPageUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: theme === "dark" ? "hotpax-btn-secondary-dark" : "hotpax-btn-secondary",
                style: {
                  ...baseStyles3.btnSecondary,
                  backgroundColor: t.btnSecondaryBg,
                  color: t.btnSecondaryColor,
                  border: t.btnSecondaryBorder
                },
                children: [
                  /* @__PURE__ */ jsx(ExternalLink, { style: { width: "0.875rem", height: "0.875rem" } }),
                  "Status Page"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: baseStyles3.footer, children: /* @__PURE__ */ jsx("div", { style: { ...baseStyles3.footerText, color: t.footerTextColor }, children: footerText ?? `\xA9 ${currentYear} ${siteName} \u2022 All rights reserved` }) })
      ]
    }
  );
}
var MONO3 = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";
var SANS3 = "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
var themeStyles4 = {
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
    footerTextColor: "rgba(113,113,122,0.4)"
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
    footerTextColor: "rgba(161,161,170,0.4)"
  }
};
var baseStyles4 = {
  root: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4rem 1.5rem",
    fontFamily: SANS3,
    boxSizing: "border-box"
  },
  spacer: { flex: 1 },
  inner: {
    width: "100%",
    maxWidth: "56rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "hotpax-slide-up 0.6s ease both"
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.3rem 0.875rem",
    borderRadius: "9999px",
    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    fontSize: "0.625rem",
    fontFamily: MONO3,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#78350f",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 8px rgba(251,191,36,0.3)"
  },
  heading: {
    fontSize: "2.25rem",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    margin: "0 0 0.75rem",
    textAlign: "center"
  },
  subheading: {
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: "0 0 3rem",
    maxWidth: "26rem",
    textAlign: "center"
  },
  tiersGrid: {
    display: "flex",
    gap: "1rem",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "2.5rem"
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
    fontFamily: MONO3,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  },
  tierName: {
    fontSize: "0.75rem",
    fontFamily: MONO3,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "0.75rem"
  },
  tierPrice: {
    fontSize: "2.5rem",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    marginBottom: "0.25rem"
  },
  tierPeriod: {
    fontSize: "0.75rem",
    fontFamily: MONO3,
    marginBottom: "1.5rem"
  },
  featureList: {
    listStyle: "none",
    margin: "0 0 1.75rem",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
    flex: 1
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.8125rem",
    lineHeight: 1.4
  },
  featureItemDisabled: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.8125rem",
    lineHeight: 1.4
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
    fontFamily: SANS3,
    textAlign: "center",
    textDecoration: "none",
    transition: "opacity 0.2s ease, background 0.2s ease",
    boxSizing: "border-box"
  },
  btnTierHighlighted: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#ffffff",
    boxShadow: "0 4px 15px rgba(99,102,241,0.3)"
  },
  helpRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    fontSize: "0.8125rem"
  },
  helpLink: {
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "0.8125rem",
    fontFamily: SANS3
  },
  footer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  footerText: {
    textAlign: "center",
    fontSize: "0.5625rem",
    fontFamily: MONO3,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginTop: "3rem"
  }
};
var DEFAULT_TIERS = [
  {
    name: "Starter",
    price: "$9",
    period: "per month",
    features: [
      { label: "5 projects", included: true },
      { label: "Basic analytics", included: true },
      { label: "Email support", included: true },
      { label: "Custom domain", included: false },
      { label: "Priority support", included: false }
    ],
    ctaLabel: "Get Started"
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
      { label: "Priority support", included: false }
    ],
    ctaLabel: "Upgrade to Pro"
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
      { label: "Priority support", included: true }
    ],
    ctaLabel: "Contact Sales"
  }
];
function PaywallBanner({
  hasAccess,
  children,
  headline = "Upgrade to unlock",
  subheadline = "Get full access to all features and supercharge your workflow.",
  tiers = DEFAULT_TIERS,
  supportEmail,
  footerText,
  theme = "light"
}) {
  if (hasAccess) return /* @__PURE__ */ jsx(Fragment, { children });
  injectHotpaxKeyframes();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const t = theme === "dark" ? themeStyles4.dark : themeStyles4.light;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        ...baseStyles4.root,
        background: t.bg,
        color: t.color
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: baseStyles4.spacer }),
        /* @__PURE__ */ jsxs("div", { style: baseStyles4.inner, children: [
          /* @__PURE__ */ jsxs("div", { style: baseStyles4.badge, children: [
            /* @__PURE__ */ jsx(Crown, { style: { width: "0.625rem", height: "0.625rem" } }),
            "Premium Access Required"
          ] }),
          /* @__PURE__ */ jsx("h1", { style: { ...baseStyles4.heading, color: t.headingColor }, children: headline }),
          /* @__PURE__ */ jsx("p", { style: { ...baseStyles4.subheading, color: t.subheadingColor }, children: subheadline }),
          /* @__PURE__ */ jsx("div", { style: baseStyles4.tiersGrid, children: tiers.map((tier) => {
            const isHighlighted = tier.highlighted;
            const cardStyle = {
              ...isHighlighted ? {
                flex: "1 1 14rem",
                maxWidth: "18rem",
                display: "flex",
                flexDirection: "column",
                padding: "1.75rem",
                borderRadius: "1rem",
                border: t.tierCardHighlightedBorder,
                background: t.tierCardHighlightedBg,
                boxSizing: "border-box",
                textAlign: "left",
                position: "relative",
                boxShadow: "0 8px 30px rgba(99,102,241,0.15)"
              } : {
                flex: "1 1 14rem",
                maxWidth: "18rem",
                display: "flex",
                flexDirection: "column",
                padding: "1.75rem",
                borderRadius: "1rem",
                border: t.tierCardBorder,
                backgroundColor: t.tierCardBg,
                boxSizing: "border-box",
                textAlign: "left",
                position: "relative",
                transition: "box-shadow 0.2s ease"
              }
            };
            const btnStyle = {
              ...baseStyles4.btnTier,
              ...isHighlighted ? baseStyles4.btnTierHighlighted : {
                backgroundColor: t.btnTierDefaultBg,
                color: t.btnTierDefaultColor
              }
            };
            const ctaEl = tier.ctaHref ? /* @__PURE__ */ jsx(
              "a",
              {
                href: tier.ctaHref,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "hotpax-btn-primary",
                style: btnStyle,
                children: tier.ctaLabel ?? "Get Started"
              }
            ) : /* @__PURE__ */ jsx(
              "button",
              {
                onClick: tier.onSelect,
                className: "hotpax-btn-primary",
                style: btnStyle,
                children: tier.ctaLabel ?? "Get Started"
              }
            );
            return /* @__PURE__ */ jsxs("div", { style: cardStyle, children: [
              isHighlighted && /* @__PURE__ */ jsxs("div", { style: baseStyles4.recommendedChip, children: [
                /* @__PURE__ */ jsx(Star, { style: { width: "0.5rem", height: "0.5rem" } }),
                "Most Popular"
              ] }),
              /* @__PURE__ */ jsx("div", { style: { ...baseStyles4.tierName, color: t.tierNameColor }, children: tier.name }),
              /* @__PURE__ */ jsx("div", { style: { ...baseStyles4.tierPrice, color: t.tierPriceColor }, children: tier.price }),
              tier.period && /* @__PURE__ */ jsx("div", { style: { ...baseStyles4.tierPeriod, color: t.tierPeriodColor }, children: tier.period }),
              /* @__PURE__ */ jsx("ul", { style: baseStyles4.featureList, children: tier.features.map((f) => /* @__PURE__ */ jsxs(
                "li",
                {
                  style: f.included ? { ...baseStyles4.featureItem, color: t.featureItemColor } : { ...baseStyles4.featureItemDisabled, color: t.featureItemDisabledColor },
                  children: [
                    f.included ? /* @__PURE__ */ jsx(Check, { style: { width: "0.875rem", height: "0.875rem", color: "#22c55e", flexShrink: 0 } }) : /* @__PURE__ */ jsx(
                      "span",
                      {
                        style: {
                          width: "0.875rem",
                          height: "0.875rem",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        },
                        children: "\u2014"
                      }
                    ),
                    f.label
                  ]
                },
                f.label
              )) }),
              ctaEl
            ] }, tier.name);
          }) }),
          supportEmail && /* @__PURE__ */ jsxs("div", { style: { ...baseStyles4.helpRow, color: t.helpRowColor }, children: [
            "Have questions?",
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `mailto:${supportEmail}`,
                style: { ...baseStyles4.helpLink, color: t.helpLinkColor },
                children: "Contact our team"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: baseStyles4.footer, children: /* @__PURE__ */ jsx("div", { style: { ...baseStyles4.footerText, color: t.footerTextColor }, children: footerText ?? `\xA9 ${currentYear} \u2022 All rights reserved` }) })
      ]
    }
  );
}

export { ComingSoon, LockGate, MaintenanceScreen, PaywallBanner };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map