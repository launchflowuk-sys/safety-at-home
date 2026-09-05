/**
 * Site name and primary navigation tabs. URLs are the locked sitemap slugs;
 * only the display names live here. A topic that has its own tab is left out
 * of the hub grid automatically.
 */
export const SITE_NAME = "Safety in and around your home";

export type NavTab = { label: string; href: string };

export const NAV_TABS: readonly NavTab[] = [
  { label: SITE_NAME, href: "/safety-at-home" },
  { label: "Building safety information", href: "/safety-at-home/building-safety" },
];

/** The tab whose href is the longest prefix of the current path, if any. */
export function activeTab(pathname: string): NavTab | undefined {
  return NAV_TABS.filter(
    (tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`),
  ).sort((a, b) => b.href.length - a.href.length)[0];
}
