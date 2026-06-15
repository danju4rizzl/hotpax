'use strict';

var lucideReact = require('lucide-react');
var jsxRuntime = require('react/jsx-runtime');

// src/components/LockGate.tsx
var styles = {
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
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    border: "1px solid rgba(196,198,208,0.4)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.03)"
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
    justifyContent: "center"
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
    color: "#181c1e",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    margin: 0
  },
  divider: {
    width: "3rem",
    height: "1px",
    backgroundColor: "rgba(196,198,208,0.5)",
    margin: "1.5rem auto"
  },
  description: {
    color: "#44474f",
    fontSize: "0.9375rem",
    fontWeight: 400,
    maxWidth: "22rem",
    lineHeight: 1.65,
    marginBottom: "2rem",
    marginTop: 0
  },
  siteName: {
    color: "#181c1e",
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
    border: "none"
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
    color: "rgba(68,71,79,0.5)",
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
  `;
  document.head.appendChild(el);
}
function LockGate({
  hasPaid,
  children,
  siteName = "this website",
  supportEmail,
  supportUrl,
  supportUrlLabel = "Visit Support",
  errorCode = "ACCESS_RESTRICTED",
  footerText
}) {
  if (hasPaid) {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
  }
  injectKeyframes();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const defaultFooter = `\xA9 ${currentYear} ${siteName} \u2022 All rights reserved`;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: styles.root, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: styles.spacer }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { style: styles.card, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: styles.iconWrap, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: styles.iconBox, children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Lock, { style: { width: "2rem", height: "2rem", color: "#181c1e" }, strokeWidth: 1.8 }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: styles.clockBadge, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Clock, { style: { width: "0.875rem", height: "0.875rem", color: "#181c1e" }, strokeWidth: 2 }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: styles.badge, children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { style: styles.pulseDot }),
          "Access Blocked"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("h1", { style: styles.heading, children: [
        "This website is",
        /* @__PURE__ */ jsxRuntime.jsx("br", {}),
        "Temporarily Offline"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: styles.divider }),
      /* @__PURE__ */ jsxRuntime.jsxs("p", { style: styles.description, children: [
        "Access to the",
        " ",
        /* @__PURE__ */ jsxRuntime.jsxs("span", { style: styles.siteName, children: [
          siteName,
          " "
        ] }),
        "is currently restricted. Please contact your administrator or developer for more information."
      ] }),
      (supportEmail || supportUrl) && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: styles.buttons, children: [
        supportEmail && /* @__PURE__ */ jsxRuntime.jsxs(
          "a",
          {
            href: `mailto:${supportEmail}`,
            className: "hotpax-btn-primary",
            style: styles.btnPrimary,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Mail, { style: { width: "1rem", height: "1rem" } }),
              "Contact Support"
            ]
          }
        ),
        supportUrl && /* @__PURE__ */ jsxRuntime.jsxs(
          "a",
          {
            href: supportUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hotpax-btn-secondary",
            style: styles.btnSecondary,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ExternalLink, { style: { width: "0.875rem", height: "0.875rem" } }),
              supportUrlLabel
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: styles.footer, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { style: styles.footerText, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        "ERROR_CODE: ",
        errorCode
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { children: footerText ?? defaultFooter })
    ] }) })
  ] });
}

exports.LockGate = LockGate;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map