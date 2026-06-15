import { MaintenanceScreen } from "hotpax";
import { PreviewShell, usePreviewTheme } from "../components/PreviewShell";

export function MaintenancePage() {
  const { theme } = usePreviewTheme();

  return (
    <PreviewShell componentName="MaintenanceScreen">
      <MaintenanceScreen
        siteName="Acme Platform"
        message="Our team is deploying a major update to improve performance and reliability."
        eta="in ~45 minutes"
        statusItems={[
          { label: "API Gateway",     status: "operational" },
          { label: "Database",        status: "degraded"    },
          { label: "Auth Service",    status: "down"        },
          { label: "CDN / Assets",    status: "operational" },
          { label: "Email Service",   status: "operational" },
        ]}
        supportEmail="ops@acme.com"
        statusPageUrl="https://status.acme.com"
        footerText="© 2026 Kavara Digital Global LTD · hotpax preview"
        theme={theme}
      />
    </PreviewShell>
  );
}
