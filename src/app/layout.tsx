import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME } from "@/config/navigation";
import { EmergencyBar } from "@/components/EmergencyBar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Thurrock Council`,
    template: `%s — ${SITE_NAME} — Thurrock Council`,
  },
  description:
    "Safety information for Thurrock Council tenants. Fire, gas, electrical, damp and mould, and how to report a problem in your home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <EmergencyBar />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
