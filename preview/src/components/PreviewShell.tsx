import { type CSSProperties, type ReactNode, createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Sun, Moon } from "lucide-react";

// ─── Theme Context ───────────────────────────────────────────────────────────

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function PreviewThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hotpax-preview-theme");
      return (saved as Theme) || "light";
    }
    return "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("hotpax-preview-theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function usePreviewTheme() {
  return useContext(ThemeContext);
}

// ─── Styles & Component ───────────────────────────────────────────────────────

const MONO = "'JetBrains Mono', 'Fira Code', monospace";

const nav: Record<string, CSSProperties> = {
  bar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "3rem",
    backgroundColor: "rgba(9,9,11,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1.25rem",
    zIndex: 9999,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    color: "#71717a",
    textDecoration: "none",
    fontSize: "0.75rem",
    fontFamily: MONO,
    fontWeight: 600,
    letterSpacing: "0.06em",
    transition: "color 0.15s ease",
  },
  sep: {
    color: "#27272a",
    fontSize: "0.875rem",
    userSelect: "none",
  },
  compName: {
    fontSize: "0.75rem",
    fontFamily: MONO,
    fontWeight: 700,
    color: "#a1a1aa",
    letterSpacing: "0.06em",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#52525b",
    fontSize: "0.6875rem",
    fontFamily: MONO,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textDecoration: "none",
  },
  themeBtn: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "0.375rem",
    padding: "0.375rem",
    color: "#71717a",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s ease",
  },
};

interface PreviewShellProps {
  componentName: string;
  children: ReactNode;
}

export function PreviewShell({ componentName, children }: PreviewShellProps) {
  const { theme, toggleTheme } = usePreviewTheme();

  return (
    <>
      {/* Floating nav bar */}
      <nav style={nav.bar}>
        <div style={nav.left}>
          <Link
            to="/"
            style={nav.backLink}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a1a1aa")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#71717a")}
          >
            <ArrowLeft style={{ width: "0.875rem", height: "0.875rem" }} />
            Back
          </Link>
          <span style={nav.sep}>/</span>
          <span style={nav.compName}>{componentName}</span>
        </div>

        <div style={nav.right}>
          <button
            onClick={toggleTheme}
            style={nav.themeBtn}
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "#a1a1aa";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#71717a";
            }}
          >
            {theme === "light" ? (
              <Moon style={{ width: "0.875rem", height: "0.875rem" }} />
            ) : (
              <Sun style={{ width: "0.875rem", height: "0.875rem" }} />
            )}
          </button>
          <Link to="/" style={nav.logoBox}>
            <Package style={{ width: "0.875rem", height: "0.875rem" }} />
            hotpax
          </Link>
        </div>
      </nav>

      {/* Offset for the fixed bar */}
      <div style={{ paddingTop: "3rem" }}>{children}</div>
    </>
  );
}
