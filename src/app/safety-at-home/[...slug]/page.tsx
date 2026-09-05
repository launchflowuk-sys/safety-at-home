import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SafetyPageTemplate } from "@/components/SafetyPageTemplate";
import { SAFETY_PAGES, getSafetyPage } from "@/content/registry";

/**
 * One route renders every SafetyPage. Static routes such as
 * /safety-at-home/emergency take precedence over this catch-all, so bespoke
 * pages are never shadowed. Unknown slugs 404 at build time.
 */
export const dynamicParams = false;

type Params = { slug: string[] };

export function generateStaticParams(): Params[] {
  return SAFETY_PAGES.map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSafetyPage(slug.join("/"));
  if (!page) return {};
  return { title: page.title, description: page.summary };
}

export default async function SafetyTopicPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getSafetyPage(slug.join("/"));
  if (!page) notFound();
  return <SafetyPageTemplate page={page} />;
}
