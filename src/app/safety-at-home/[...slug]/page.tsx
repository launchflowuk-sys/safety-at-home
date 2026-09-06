import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AwaabsLawClock } from "@/components/AwaabsLawClock";
import { HighRiseBlockList } from "@/components/HighRiseBlockList";
import { SafetyProfileLookup } from "@/components/SafetyProfileLookup";
import { SafetyPageTemplate } from "@/components/SafetyPageTemplate";
import {
  REPORT_DAMP_SLUG,
  ReportDampOrMouldPage,
} from "@/components/pages/ReportDampOrMouldPage";
import { BESPOKE_PAGES, SAFETY_PAGES, getSafetyPage } from "@/content/registry";

/**
 * One route renders every SafetyPage, plus the bespoke pages listed in
 * BESPOKE_ROUTES. Keeping bespoke pages here (rather than as static folders)
 * avoids a folder at /damp-and-mould with no page.tsx shadowing the parent
 * data page. /safety-at-home/emergency keeps its own static route, which
 * takes precedence. Unknown slugs 404 at build time.
 */
export const dynamicParams = false;

type Params = { slug: string[] };

/** Bespoke pages with their own markup, keyed by sitemap slug. */
const BESPOKE_ROUTES: Record<string, () => React.ReactNode> = {
  [REPORT_DAMP_SLUG]: () => <ReportDampOrMouldPage />,
};

/**
 * Interactive tools that a data page can carry, keyed by slug. Rendered by
 * the template after the emergency callout.
 */
const TOOLS: Record<string, React.ReactNode> = {
  "damp-and-mould/awaabs-law": <AwaabsLawClock />,
  "building-safety": (
    <div className="space-y-6">
      <SafetyProfileLookup />
      <HighRiseBlockList />
    </div>
  ),
  "your-safety-checks": <SafetyProfileLookup />,
};

export function generateStaticParams(): Params[] {
  const slugs = [
    ...SAFETY_PAGES.map((page) => page.slug),
    ...Object.keys(BESPOKE_ROUTES),
  ];
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/");
  const page =
    getSafetyPage(key) ?? BESPOKE_PAGES.find((entry) => entry.slug === key);
  if (!page) return {};
  return { title: page.title, description: page.summary };
}

export default async function SafetyTopicPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const key = slug.join("/");

  const bespoke = BESPOKE_ROUTES[key];
  if (bespoke) return <>{bespoke()}</>;

  const page = getSafetyPage(key);
  if (!page) notFound();
  return <SafetyPageTemplate page={page} tool={TOOLS[key]} />;
}
