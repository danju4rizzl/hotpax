import * as react from 'react';
import { ReactNode } from 'react';

interface LockGateProps {
    /**
     * When `true`, renders children normally.
     * When `false`, renders the access-blocked screen.
     */
    hasPaid: boolean;
    /** The protected page content. */
    children: ReactNode;
    /**
     * Display name of the site/product shown in the blocked message.
     * @default "this website"
     */
    siteName?: string;
    /**
     * Optional URL or path to the brand logo image.
     * If omitted, the default floating Lock icon is displayed.
     */
    logoSrc?: string;
    /**
     * Support email address. When provided, renders a "Contact Support" button.
     */
    supportEmail?: string;
    /**
     * External URL for a secondary CTA button (e.g., your agency/studio site).
     */
    supportUrl?: string;
    /**
     * Label for the `supportUrl` button.
     * @default "Visit Support"
     */
    supportUrlLabel?: string;
    /**
     * Short error/status code shown in the footer.
     * @default "ACCESS_RESTRICTED"
     */
    errorCode?: string;
    /**
     * Custom footer copyright text. Replaces the default "© YEAR" line.
     */
    footerText?: string;
    /**
     * UI theme mode.
     * @default "light"
     */
    theme?: "light" | "dark";
}
declare function LockGate({ hasPaid, children, siteName, logoSrc, supportEmail, supportUrl, supportUrlLabel, errorCode, footerText, theme, }: LockGateProps): react.JSX.Element;

interface ComingSoonProps {
    /**
     * Product / site name displayed in the heading.
     * @default "Something Awesome"
     */
    siteName?: string;
    /**
     * Short tagline below the heading.
     * @default "We're building something great. Stay tuned."
     */
    tagline?: string;
    /**
     * Optional URL or path to the brand logo image.
     * If omitted, the default floating Rocket icon is displayed.
     */
    logoSrc?: string;
    /**
     * ISO date string or Date for a launch countdown timer.
     * When provided, a live countdown is rendered.
     */
    launchDate?: string | Date;
    /**
     * Callback when the user submits their email for early access.
     * Receives the submitted email string. If omitted, no notify form is shown.
     */
    onNotify?: (email: string) => void;
    /**
     * Label for the notify/submit button.
     * @default "Notify Me"
     */
    notifyLabel?: string;
    /**
     * Social links or external CTAs rendered as secondary buttons.
     */
    links?: Array<{
        label: string;
        href: string;
    }>;
    /**
     * Custom footer text.
     */
    footerText?: string;
    /**
     * UI theme mode.
     * @default "dark"
     */
    theme?: "light" | "dark";
}
declare function ComingSoon({ siteName, tagline, logoSrc, launchDate, onNotify, notifyLabel, links, footerText, theme, }: ComingSoonProps): react.JSX.Element;

interface MaintenanceScreenProps {
    /**
     * Site/product name shown in the message.
     * @default "our service"
     */
    siteName?: string;
    /**
     * Optional URL or path to the brand logo image.
     * If omitted, the default spinning Wrench icon is displayed.
     */
    logoSrc?: string;
    /**
     * Short message shown below the heading.
     * @default "We're performing scheduled maintenance. We'll be back shortly."
     */
    message?: string;
    /**
     * Estimated time back — displayed in a highlight chip.
     * e.g. "2:00 PM UTC" or "in ~30 minutes"
     */
    eta?: string;
    /**
     * Status items to display (e.g. system component statuses).
     */
    statusItems?: Array<{
        label: string;
        status: "operational" | "degraded" | "down";
    }>;
    /**
     * Support email — renders a "Contact Support" button when provided.
     */
    supportEmail?: string;
    /**
     * External status page URL.
     */
    statusPageUrl?: string;
    /**
     * Custom footer text.
     */
    footerText?: string;
    /**
     * UI theme mode.
     * @default "light"
     */
    theme?: "light" | "dark";
}
declare function MaintenanceScreen({ siteName, logoSrc, message, eta, statusItems, supportEmail, statusPageUrl, footerText, theme, }: MaintenanceScreenProps): react.JSX.Element;

/** A single feature row in the plan comparison list. */
interface PaywallFeature {
    label: string;
    included: boolean;
}
/** A single pricing tier shown in the paywall. */
interface PaywallTier {
    name: string;
    price: string;
    /** e.g. "per month", "one-time", "per year" */
    period?: string;
    features: PaywallFeature[];
    /** Marks this tier visually as recommended. */
    highlighted?: boolean;
    ctaLabel?: string;
    ctaHref?: string;
    onSelect?: () => void;
}
interface PaywallBannerProps {
    /**
     * When `true`, renders children normally (user has access).
     * When `false`, renders the paywall.
     */
    hasAccess: boolean;
    /** The protected content. */
    children: ReactNode;
    /**
     * Headline shown at the top of the paywall.
     * @default "Upgrade to unlock"
     */
    headline?: string;
    /**
     * Short subheadline / value proposition.
     * @default "Get full access to all features."
     */
    subheadline?: string;
    /**
     * The pricing tiers to display. Maximum 3 is recommended for layout.
     */
    tiers?: PaywallTier[];
    /**
     * Support email for a help link in the footer.
     */
    supportEmail?: string;
    /**
     * Custom footer text.
     */
    footerText?: string;
    /**
     * UI theme mode.
     * @default "light"
     */
    theme?: "light" | "dark";
}
declare function PaywallBanner({ hasAccess, children, headline, subheadline, tiers, supportEmail, footerText, theme, }: PaywallBannerProps): react.JSX.Element;

export { ComingSoon, type ComingSoonProps, LockGate, type LockGateProps, MaintenanceScreen, type MaintenanceScreenProps, PaywallBanner, type PaywallBannerProps, type PaywallFeature, type PaywallTier };
