import { LockGate } from "hotpax";
import { PreviewShell, usePreviewTheme } from "../components/PreviewShell";

export function LockGatePage() {
  const { theme } = usePreviewTheme();

  return (
    <PreviewShell componentName="LockGate">
      <LockGate
        hasPaid={false}
        siteName="Acme SaaS Platform"
        supportEmail="hello@acme.com"
        supportUrl="https://example.com"
        supportUrlLabel="Visit Acme"
        errorCode="PAY_PEND"
        footerText="© 2026 Kavara Digital Global LTD · hotpax preview"
        theme={theme}
      >
        <p>This content is hidden when hasPaid is false.</p>
      </LockGate>
    </PreviewShell>
  );
}
