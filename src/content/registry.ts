import { SAFETY_TOPICS } from "@/config/topics";
import { SITE_NAME } from "@/config/navigation";
import type { SafetyPage } from "@/types/safety-page";
import { fireSafety } from "./pages/fire-safety";
import { stayPutOrEvacuate } from "./pages/stay-put-or-evacuate";
import { fireDoors } from "./pages/fire-doors";
import { smokeAndHeatAlarms } from "./pages/smoke-and-heat-alarms";
import { helpToEvacuate } from "./pages/help-to-evacuate";
import { dampAndMould } from "./pages/damp-and-mould";
import { preventCondensation } from "./pages/prevent-condensation";
import { awaabsLaw } from "./pages/awaabs-law";
import { buildingSafety } from "./pages/building-safety";
import { gasSafety } from "./pages/gas-safety";
import { annualGasService } from "./pages/annual-gas-service";
import { electricalSafety } from "./pages/electrical-safety";
import { carbonMonoxide } from "./pages/carbon-monoxide";
import { waterSafety } from "./pages/water-safety";
import { asbestos } from "./pages/asbestos";

/**
 * Registry of every SafetyPage. The dynamic route builds one static page per
 * entry, and `related` slugs are resolved against this list. Add a new page
 * here after creating its data file in ./pages.
 */
export const SAFETY_PAGES: readonly SafetyPage[] = [
  fireSafety,
  stayPutOrEvacuate,
  fireDoors,
  smokeAndHeatAlarms,
  helpToEvacuate,
  dampAndMould,
  preventCondensation,
  awaabsLaw,
  buildingSafety,
  gasSafety,
  annualGasService,
  electricalSafety,
  carbonMonoxide,
  waterSafety,
  asbestos,
];

/** The subset of a page that related cards and breadcrumbs need. */
export type PageSummary = Pick<SafetyPage, "slug" | "title" | "summary">;

/**
 * Bespoke pages that have their own static route rather than SafetyPage
 * data. Listed here so `related` links and breadcrumbs can resolve to them.
 */
export const BESPOKE_PAGES: readonly PageSummary[] = [
  {
    slug: "emergency",
    title: "Get help now",
    summary:
      "Answer a few quick questions and we will tell you exactly who to call.",
  },
  {
    slug: "damp-and-mould/report-damp-or-mould",
    title: "Report damp or mould",
    summary:
      "Tell us about damp or mould in your home so we can inspect it and start repairs.",
  },
];

const BY_SLUG = new Map(SAFETY_PAGES.map((page) => [page.slug, page]));

const SUMMARY_BY_SLUG = new Map<string, PageSummary>(
  [...SAFETY_PAGES, ...BESPOKE_PAGES].map((page) => [page.slug, page]),
);

export function getSafetyPage(slug: string): SafetyPage | undefined {
  return BY_SLUG.get(slug);
}

/**
 * Resolve `related` slugs to page summaries. Slugs that are in the sitemap
 * but not yet built (later phases) are skipped, so a page never links to a
 * 404.
 */
export function resolveRelated(page: SafetyPage): PageSummary[] {
  return page.related
    .map((slug) => SUMMARY_BY_SLUG.get(slug))
    .filter((related): related is PageSummary => related !== undefined);
}

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb trail for any slug under /safety-at-home. Parent segments
 * resolve to a built page first, then fall back to the topic title from the
 * hub grid.
 */
export function getBreadcrumbsForSlug(slug: string, title: string): Crumb[] {
  const crumbs: Crumb[] = [
    { label: SITE_NAME, href: "/safety-at-home" },
  ];
  const segments = slug.split("/");

  for (let i = 0; i < segments.length - 1; i++) {
    const parentSlug = segments.slice(0, i + 1).join("/");
    const parent = SUMMARY_BY_SLUG.get(parentSlug);
    const topic = SAFETY_TOPICS.find((t) => t.slug === parentSlug);
    const label = parent?.title ?? topic?.title;
    if (label) {
      crumbs.push({ label, href: `/safety-at-home/${parentSlug}` });
    }
  }

  crumbs.push({ label: title });
  return crumbs;
}

export function getBreadcrumbs(page: SafetyPage): Crumb[] {
  return getBreadcrumbsForSlug(page.slug, page.title);
}
