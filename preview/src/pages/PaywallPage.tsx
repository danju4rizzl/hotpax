import { PaywallBanner } from "hotpax";
import { PreviewShell, usePreviewTheme } from "../components/PreviewShell";

export function PaywallPage() {
  const { theme } = usePreviewTheme();

  return (
    <PreviewShell componentName="PaywallBanner">
      <PaywallBanner
        hasAccess={false}
        headline="Unlock the full experience"
        subheadline="Choose a plan that fits your workflow. Upgrade, downgrade, or cancel anytime."
        tiers={[
          {
            name: "Starter",
            price: "$9",
            period: "per month",
            features: [
              { label: "Up to 5 projects",    included: true  },
              { label: "Basic analytics",      included: true  },
              { label: "Email support",        included: true  },
              { label: "Custom domain",        included: false },
              { label: "API access",           included: false },
              { label: "Priority support",     included: false },
            ],
            ctaLabel: "Start Free Trial",
            onSelect: () => alert("Starter selected"),
          },
          {
            name: "Pro",
            price: "$29",
            period: "per month",
            highlighted: true,
            features: [
              { label: "Unlimited projects",   included: true  },
              { label: "Advanced analytics",   included: true  },
              { label: "Chat + email support", included: true  },
              { label: "Custom domain",        included: true  },
              { label: "API access",           included: true  },
              { label: "Priority support",     included: false },
            ],
            ctaLabel: "Upgrade to Pro",
            onSelect: () => alert("Pro selected"),
          },
          {
            name: "Enterprise",
            price: "$99",
            period: "per month",
            features: [
              { label: "Unlimited projects",   included: true  },
              { label: "Advanced analytics",   included: true  },
              { label: "Dedicated SLA",        included: true  },
              { label: "Custom domain",        included: true  },
              { label: "API access",           included: true  },
              { label: "Priority support",     included: true  },
            ],
            ctaLabel: "Contact Sales",
            ctaHref: "mailto:sales@acme.com",
          },
        ]}
        supportEmail="billing@acme.com"
        footerText="© 2026 Kavara Digital Global LTD · hotpax preview"
        theme={theme}
      >
        <p>Protected content — only visible when hasAccess is true.</p>
      </PaywallBanner>
    </PreviewShell>
  );
}
