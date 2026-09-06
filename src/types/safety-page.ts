import type { Poster } from "@/config/posters";

/**
 * Content model for every topic page. Pages are data, not bespoke markup —
 * one file per topic in src/content/pages/*.ts, all rendered by
 * SafetyPageTemplate. Designed to map cleanly onto Prisma models in Phase 6.
 */
export type SafetyPage = {
  slug: string;
  title: string;
  summary: string;
  /**
   * Up to three headline facts shown as stat tiles under the summary, for
   * example { value: "Once a month", label: "test your smoke alarm" }.
   * Values that are numbers or timescales must come from THURROCK.
   */
  keyFacts?: { value: string; label: string }[];
  emergency?: {
    label: string;
    phone: string;
    instructions: string[];
  };
  ourResponsibilities: string[];
  yourResponsibilities: string[];
  warningSigns?: { icon: string; text: string }[];
  howToReport: {
    online?: { label: string; href: string };
    phone?: string;
    email?: string;
  };
  timescales?: { label: string; target: string }[];
  /**
   * Printed safety posters shown as a gallery, from `POSTERS` in
   * src/config/posters.ts. Each carries a text transcript, so never add a
   * poster image by hand.
   */
  posters?: readonly Poster[];
  downloads?: { label: string; href: string; size: string }[];
  /**
   * Trusted external sources for residents who want more, shown as
   * "Find out more". `source` is the organisation name. Only link to
   * official bodies (fire service, NHS, HSE, GOV.UK, utilities).
   */
  furtherReading?: { label: string; href: string; source: string }[];
  related: string[];
};
