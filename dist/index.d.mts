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
}
declare function LockGate({ hasPaid, children, siteName, supportEmail, supportUrl, supportUrlLabel, errorCode, footerText, }: LockGateProps): react.JSX.Element;

export { LockGate, type LockGateProps };
