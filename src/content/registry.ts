import { SAFETY_TOPICS } from "@/config/topics";
import type { SafetyPage } from "@/types/safety-page";
import { fireSafety } from "./pages/fire-safety";
import { stayPutOrEvacuate } from "./pages/stay-put-or-evacuate";
import { fireDoors } from "./pages/fire-doors";
import { smokeAndHeatAlarms } from "./pages/smoke-and-heat-alarms";
import { helpToEvacuate } from "./pages/help-to-evacuate";

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
];

const BY_SLUG = new Map(SAFETY_PAGES.map((page) => [page.slug, page]));

export function getSafetyPage(slug: string): SafetyPage | undefined {
  return BY_SLUG.get(slug);
}

/**
 * Resolve `related` slugs to pages. Slugs that are in the sitemap but not yet
 * built (later phases) are skipped, so a page never links to a 404.
 */
export function resolveRelated(page: SafetyPage): SafetyPage[] {
  return page.related
    .map((slug) => BY_SLUG.get(slug))
    .filter((related): related is SafetyPage => related !== undefined);
}

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb trail for a page. Parent segments resolve to a built page first,
 * then fall back to the topic title from the hub grid.
 */
export function getBreadcrumbs(page: SafetyPage): Crumb[] {
  const crumbs: Crumb[] = [
    { label: "Safety at home", href: "/safety-at-home" },
  ];
  const segments = page.slug.split("/");

  for (let i = 0; i < segments.length - 1; i++) {
    const parentSlug = segments.slice(0, i + 1).join("/");
    const parent = BY_SLUG.get(parentSlug);
    const topic = SAFETY_TOPICS.find((t) => t.slug === parentSlug);
    const label = parent?.title ?? topic?.title;
    if (label) {
      crumbs.push({ label, href: `/safety-at-home/${parentSlug}` });
    }
  }

  crumbs.push({ label: page.title });
  return crumbs;
}
