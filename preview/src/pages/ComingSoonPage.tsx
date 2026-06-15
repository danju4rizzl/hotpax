import { ComingSoon } from "hotpax";
import { PreviewShell, usePreviewTheme } from "../components/PreviewShell";

// Launch date: 30 days from now, for a live countdown demo
const launchDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

export function ComingSoonPage() {
  const { theme } = usePreviewTheme();

  return (
    <PreviewShell componentName="ComingSoon">
      <ComingSoon
        siteName="Project Nova"
        tagline="The next generation of creative tooling. Sign up to get early access and exclusive launch perks."
        launchDate={launchDate}
        onNotify={(email) => alert(`✓ Subscribed: ${email}`)}
        notifyLabel="Get Early Access"
        links={[
          { label: "Twitter / X", href: "https://x.com" },
          { label: "GitHub",     href: "https://github.com/danju4rizzl/hotpax" },
        ]}
        footerText="© 2026 Kavara Digital Global LTD · hotpax preview"
        theme={theme}
      />
    </PreviewShell>
  );
}
