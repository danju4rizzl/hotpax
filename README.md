# hotpax 🔒

> A growing collection of reusable React UI components for access control, gating, and product UI.
> By **Kavara Digital Global LTD** — [@deejaydev](https://github.com/danju4rizzl)

---

## Components

| Component   | Description                                             |
| ----------- | ------------------------------------------------------- |
| `LockGate`  | Full-screen access blocker. Shows content when paid, blocks with a branded screen when not. |

---

## Installation

### From GitHub (no npm required)

```bash
# bun
bun add github:danju4rizzl/hotpax

# npm
npm install github:danju4rizzl/hotpax

# yarn
yarn add github:danju4rizzl/hotpax
```

> **Important:** `lucide-react` and `react` are peer dependencies — your project must already have them installed.

```bash
bun add lucide-react react react-dom
```

---

## Usage

### Basic — zero config

```tsx
import { LockGate } from "hotpax";

export default function App() {
  const hasPaid = false; // or read from your auth/payment state

  return (
    <LockGate hasPaid={hasPaid}>
      <p>Your protected app content goes here.</p>
    </LockGate>
  );
}
```

### Fully configured

```tsx
import { LockGate } from "hotpax";

export default function App() {
  return (
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
  );
}
```

---

## Props — `LockGate`

| Prop              | Type        | Default                  | Description                                              |
| ----------------- | ----------- | ------------------------ | -------------------------------------------------------- |
| `hasPaid`         | `boolean`   | **required**             | `true` = show children. `false` = show the blocker UI.  |
| `children`        | `ReactNode` | **required**             | The protected content to render when access is granted.  |
| `siteName`        | `string`    | `"this website"`         | Product/site name shown in the blocked message.          |
| `supportEmail`    | `string`    | `undefined`              | Renders a "Contact Support" button when provided.        |
| `supportUrl`      | `string`    | `undefined`              | Renders a secondary CTA button when provided.            |
| `supportUrlLabel` | `string`    | `"Visit Support"`        | Label for the `supportUrl` button.                       |
| `errorCode`       | `string`    | `"ACCESS_RESTRICTED"`    | Short code shown in the footer (e.g. `"PAY_PEND"`).     |
| `footerText`      | `string`    | `"© YEAR siteName ..."`  | Custom footer copyright text.                            |

---

## Design

- ✅ **Zero CSS dependencies** — all styles are inlined, no Tailwind required
- ✅ **Fully typed** — ships with `.d.ts` declarations
- ✅ **Tree-shakeable** — ESM + CJS dual output via tsup
- ✅ **Peer dep safe** — React and lucide-react come from your project, never bundled twice
- ✅ **SSR compatible** — keyframe injection is guarded by `typeof document !== "undefined"`

---

## 🚀 Hosting on GitHub (Step-by-Step Guide)

This package is designed to be installed directly from GitHub — **no npm account required**.

### Step 1 — Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: **`hotpax`**
3. Set visibility to **Public** (required for `bun add github:...` to work without auth tokens)
4. Do **not** initialize with a README (we already have one)
5. Click **Create repository**

### Step 2 — Build the Package Locally

In your terminal, navigate to this directory and run:

```bash
cd path/to/web-dev/hotpax
bun install      # install tsup + types
bun run build    # compiles → dist/index.js, dist/index.cjs, dist/index.d.ts
```

Verify that the `dist/` folder was created and contains:
- `dist/index.js`
- `dist/index.cjs`
- `dist/index.d.ts`

### Step 3 — Commit dist/ and Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial hotpax package with LockGate component"
git branch -M main
git remote add origin https://github.com/danju4rizzl/hotpax.git
git push -u origin main
```

> 💡 The `.gitignore` in this repo intentionally **does NOT ignore `dist/`**.
> This is required so GitHub installs work — `bun add github:...` does not run
> build scripts on install.

### Step 4 — Install in Another Project

```bash
# Navigate to your other React project
cd path/to/other-project

# Install hotpax directly from GitHub
bun add github:danju4rizzl/hotpax
```

This adds to your `package.json`:
```json
{
  "dependencies": {
    "hotpax": "github:danju4rizzl/hotpax"
  }
}
```

### Step 5 — Use It

```tsx
import { LockGate } from "hotpax";
```

Done! 🎉

---

### Updating the Package

When you add new components or change existing ones:

```bash
# 1. Make your changes in src/
# 2. Rebuild
bun run build

# 3. Commit with updated dist/
git add .
git commit -m "feat: add NewComponent"
git push

# 4. In consuming projects, update to latest
bun update hotpax
# or pin to a specific commit/tag:
# bun add github:danju4rizzl/hotpax#v0.2.0
```

### Using Git Tags for Versioned Releases

```bash
# Tag a release
git tag v0.1.0
git push origin v0.1.0

# Install a specific version in another project
bun add github:danju4rizzl/hotpax#v0.1.0
```

---

## Local Development

```bash
bun install
bun run dev      # watch mode — rebuilds on file changes
bun run build    # production build
```

---

## License

MIT © Kavara Digital Global LTD
