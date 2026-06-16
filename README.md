# hotpax 🔒

> A growing collection of reusable React UI components for access control, gating, and product UI.
> By **Kavara Digital Global LTD** — [@deejaydev](https://github.com/danju4rizzl)

---

## Components

| Component            | Theme           | Description                                                                       |
| -------------------- | --------------- | --------------------------------------------------------------------------------- |
| `LockGate`           | Light / minimal | Full-screen access blocker — shows content when paid, blocks with a branded screen when not. |
| `ComingSoon`         | Dark / indigo   | Pre-launch page with a live countdown timer and email notify/waitlist form.       |
| `MaintenanceScreen`  | Warm / amber    | Scheduled downtime screen with spinning wrench, ETA chip, and per-service status rows. |
| `PaywallBanner`      | Clean white     | Full-page paywall with pricing tier cards and a feature checklist per plan.       |

---

## Installation

### From GitHub (no npm required)

```bash
# bun
bun add https://github.com/danju4rizzl/hotpax

# npm
npm install https://github.com/danju4rizzl/hotpax

# yarn
yarn add https://github.com/danju4rizzl/hotpax
```

> **Important:** `lucide-react` and `react` are peer dependencies — your project must already have them installed.

```bash
bun add lucide-react react react-dom
```

---

## Usage

### `LockGate`

Gates your entire app behind a payment / access check. When `hasPaid` is `false`, the app is replaced with a branded "Access Blocked" screen. When `true`, children render normally.

```tsx
import { LockGate } from "hotpax";

// Zero-config
<LockGate hasPaid={false}>
  <App />
</LockGate>

// Fully configured
<LockGate
  hasPaid={false}
  siteName="Acme SaaS Platform"
  supportEmail="hello@acme.com"
  supportUrl="https://acme.com"
  supportUrlLabel="Visit Acme"
  errorCode="SUBSCRIPTION_EXPIRED"
  footerText="© 2026 Acme Corp • All rights reserved"
>
  <Dashboard />
</LockGate>
```

#### Props

| Prop              | Type        | Default                 | Description                                              |
| ----------------- | ----------- | ----------------------- | -------------------------------------------------------- |
| `hasPaid`         | `boolean`   | **required**            | `true` = render children. `false` = show blocked screen. |
| `children`        | `ReactNode` | **required**            | The protected content.                                   |
| `siteName`        | `string`    | `"this website"`        | Product/site name shown in the blocked message.          |
| `supportEmail`    | `string`    | `undefined`             | Renders a "Contact Support" button when provided.        |
| `supportUrl`      | `string`    | `undefined`             | Renders a secondary CTA button when provided.            |
| `supportUrlLabel` | `string`    | `"Visit Support"`       | Label for the `supportUrl` button.                       |
| `errorCode`       | `string`    | `"ACCESS_RESTRICTED"`   | Short code shown in the footer (e.g. `"PAY_PEND"`).     |
| `footerText`      | `string`    | `"© YEAR siteName …"`   | Custom footer copyright text.                            |
| `theme`           | `string`    | `"light"`               | UI theme mode (`"light"` or `"dark"`).                   |

---

### `ComingSoon`

A polished pre-launch page. Supports a live countdown timer, an email capture/notify form, and external social/link buttons.

```tsx
import { ComingSoon } from "hotpax";

// Zero-config
<ComingSoon />

// Fully configured
<ComingSoon
  siteName="Project Nova"
  tagline="The next generation of creative tooling. Sign up to get early access."
  launchDate="2026-12-01T00:00:00Z"
  onNotify={(email) => console.log("Subscribed:", email)}
  notifyLabel="Get Early Access"
  links={[
    { label: "Twitter / X", href: "https://x.com/yourhandle" },
    { label: "GitHub",      href: "https://github.com/danju4rizzl/hotpax" },
  ]}
  footerText="© 2026 Kavara Digital Global LTD"
/>
```

#### Props

| Prop           | Type                                   | Default                                   | Description                                                    |
| -------------- | -------------------------------------- | ----------------------------------------- | -------------------------------------------------------------- |
| `siteName`     | `string`                               | `"Something Awesome"`                     | Product/site name in the heading.                              |
| `tagline`      | `string`                               | `"We're building something great…"`       | Short sub-heading below the site name.                         |
| `launchDate`   | `string \| Date`                       | `undefined`                               | ISO date string or `Date` — renders a live countdown when set. |
| `onNotify`     | `(email: string) => void`              | `undefined`                               | Called with the trimmed email on form submit. Shows the form when provided. |
| `notifyLabel`  | `string`                               | `"Notify Me"`                             | Label for the notify/submit button.                            |
| `links`        | `Array<{ label: string; href: string }>` | `undefined`                             | Rendered as secondary CTA buttons below the form.              |
| `footerText`   | `string`                               | `"© YEAR siteName • All rights reserved"` | Custom footer text.                                            |
| `theme`        | `string`                               | `"dark"`                                  | UI theme mode (`"light"` or `"dark"`).                         |

---

### `MaintenanceScreen`

A scheduled-downtime page with a spinning wrench animation, optional ETA chip, and a per-service status list.

```tsx
import { MaintenanceScreen } from "hotpax";

// Zero-config
<MaintenanceScreen />

// Fully configured
<MaintenanceScreen
  siteName="Acme Platform"
  message="Our team is deploying a major update to improve performance and reliability."
  eta="in ~45 minutes"
  statusItems={[
    { label: "API Gateway",   status: "operational" },
    { label: "Database",      status: "degraded"    },
    { label: "Auth Service",  status: "down"        },
    { label: "CDN / Assets",  status: "operational" },
  ]}
  supportEmail="ops@acme.com"
  statusPageUrl="https://status.acme.com"
  footerText="© 2026 Acme Corp • All rights reserved"
/>
```

#### Props

| Prop            | Type                                                           | Default                                               | Description                                                  |
| --------------- | -------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `siteName`      | `string`                                                       | `"our service"`                                       | Site/product name shown in the description.                  |
| `message`       | `string`                                                       | `"We're performing scheduled maintenance…"`           | Body text below the heading.                                 |
| `eta`           | `string`                                                       | `undefined`                                           | Estimated back time — shown in a green chip when provided.   |
| `statusItems`   | `Array<{ label: string; status: "operational" \| "degraded" \| "down" }>` | `undefined`              | Per-service status rows rendered below the message.          |
| `supportEmail`  | `string`                                                       | `undefined`                                           | Renders a "Contact Support" button when provided.            |
| `statusPageUrl` | `string`                                                       | `undefined`                                           | Renders a "Status Page" link button when provided.           |
| `footerText`    | `string`                                                       | `"© YEAR siteName • All rights reserved"`             | Custom footer text.                                          |
| `theme`         | `string`                                                       | `"light"`                                             | UI theme mode (`"light"` or `"dark"`).                       |

#### Status colours

| Value         | Colour |
| ------------- | ------ |
| `operational` | 🟢 Green  |
| `degraded`    | 🟡 Amber  |
| `down`        | 🔴 Red    |

---

### `PaywallBanner`

A full-page paywall that passes through children when `hasAccess` is `true`, or renders clean pricing tier cards when `false`.

```tsx
import { PaywallBanner } from "hotpax";
import type { PaywallTier } from "hotpax";

const tiers: PaywallTier[] = [
  {
    name: "Starter",
    price: "$9",
    period: "per month",
    features: [
      { label: "5 projects",    included: true  },
      { label: "Custom domain", included: false },
    ],
    ctaLabel: "Get Started",
    onSelect: () => console.log("Starter selected"),
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    highlighted: true,              // marks as "Most Popular"
    features: [
      { label: "Unlimited projects", included: true },
      { label: "Custom domain",      included: true },
    ],
    ctaLabel: "Upgrade to Pro",
    onSelect: () => console.log("Pro selected"),
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    features: [
      { label: "Unlimited projects", included: true },
      { label: "Priority support",   included: true },
    ],
    ctaLabel: "Contact Sales",
    ctaHref: "mailto:sales@acme.com",   // use ctaHref for link-based CTAs
  },
];

// Zero-config (uses built-in default 3 tiers)
<PaywallBanner hasAccess={false}>
  <Dashboard />
</PaywallBanner>

// Fully configured
<PaywallBanner
  hasAccess={false}
  headline="Unlock the full experience"
  subheadline="Choose the plan that fits your workflow."
  tiers={tiers}
  supportEmail="billing@acme.com"
  footerText="© 2026 Acme Corp • All rights reserved"
>
  <Dashboard />
</PaywallBanner>
```

#### Props

| Prop           | Type            | Default                                        | Description                                                      |
| -------------- | --------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| `hasAccess`    | `boolean`       | **required**                                   | `true` = render children. `false` = show the paywall.           |
| `children`     | `ReactNode`     | **required**                                   | The protected content.                                           |
| `headline`     | `string`        | `"Upgrade to unlock"`                          | Large heading at the top of the paywall.                         |
| `subheadline`  | `string`        | `"Get full access to all features…"`           | Short value proposition below the heading.                       |
| `tiers`        | `PaywallTier[]` | 3 built-in tiers (Starter / Pro / Enterprise)  | Array of pricing tier objects (max 3 recommended for layout).    |
| `supportEmail` | `string`        | `undefined`                                    | Renders a "Contact our team" help link when provided.            |
| `footerText`   | `string`        | `"© YEAR • All rights reserved"`               | Custom footer text.                                              |
| `theme`        | `string`        | `"light"`                                      | UI theme mode (`"light"` or `"dark"`).                           |

#### `PaywallTier` shape

| Field         | Type                             | Required | Description                                             |
| ------------- | -------------------------------- | -------- | ------------------------------------------------------- |
| `name`        | `string`                         | ✅        | Tier display name (e.g. `"Pro"`).                       |
| `price`       | `string`                         | ✅        | Price string (e.g. `"$29"`).                            |
| `period`      | `string`                         | ❌        | Billing period (e.g. `"per month"`).                    |
| `features`    | `PaywallFeature[]`               | ✅        | Array of `{ label: string; included: boolean }`.        |
| `highlighted` | `boolean`                        | ❌        | When `true`, renders the "Most Popular" chip.           |
| `ctaLabel`    | `string`                         | ❌        | Button / link label. Defaults to `"Get Started"`.       |
| `ctaHref`     | `string`                         | ❌        | When provided, renders an `<a>` tag instead of a button. |
| `onSelect`    | `() => void`                     | ❌        | Click handler for button-based CTAs.                    |

---

## Design principles

- ✅ **Zero CSS dependencies** — all styles are inline `CSSProperties`, no Tailwind required
- ✅ **Fully typed** — ships with `.d.ts` declarations for every component and type
- ✅ **Tree-shakeable** — ESM + CJS dual output via tsup; import only what you use
- ✅ **Peer dep safe** — React and lucide-react come from your project, never bundled twice
- ✅ **SSR compatible** — keyframe injection is guarded by `typeof document !== "undefined"`
- ✅ **No required config** — every prop has a sensible default; `<LockGate hasPaid={false}>` works out of the box

---

## Testing

The package ships with 74 unit tests across all 4 components using Bun's native test runner and `@testing-library/react`.

```bash
bun run test
```

```
74 pass · 0 fail
Ran 74 tests across 4 files
```


### Updating the Package

When you add new components or change existing ones:

```bash
# 1. Make your changes in src/
# 2. Add / update tests in test/
# 3. Rebuild and verify tests pass
bun run build
bun run test

# 4. Commit with updated dist/
git add .
git commit -m "feat: add NewComponent"
git push

# 5. In consuming projects, update to latest
bun update hotpax
# or pin to a specific commit/tag:
# bun add https://github.com/danju4rizzl/hotpax#v0.3.0
```

### Using Git Tags for Versioned Releases

```bash
# Tag a release
git tag v0.2.0
git push origin v0.2.0

# Install a specific version in another project
bun add https://github.com/danju4rizzl/hotpax#v0.2.0
```

---

## Preview App

A standalone Vite dev app lets you browse all components live in the browser.

```bash
cd preview
bun install
bun run dev
# → http://localhost:4000
```

The preview links hotpax locally via Vite alias — always reflects your latest `bun run build`.

---

## Local Development

```bash
bun install
bun run dev        # watch mode — rebuilds on every file change
bun run build      # production build → dist/
bun run test       # run full test suite (74 tests)
bun run type-check # TypeScript type checking without emitting
```

---

## License

MIT © Kavara Digital Global LTD
