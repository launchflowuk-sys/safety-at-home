import type { DiagramId } from "@/components/Diagrams";
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
   * Values that are numbers or timescales must come from ORG.
   */
  keyFacts?: { value: string; label: string }[];
  emergency?: {
    label: string;
    phone: string;
    instructions: string[];
  };
  /**
   * An explanatory drawing shown before "What we do". The caption must carry
   * the meaning on its own — the drawing is presentational.
   */
  diagram?: { id: DiagramId; caption: string };
  ourResponsibilities: string[];
  yourResponsibilities: string[];
  warningSigns?: { icon: string; text: string }[];
  howToReport: {
    online?: { label: string; href: string };
    phone?: string;
    email?: string;
  };
  /**
   * Extra topic sections rendered as accordions after "What you must do".
   * Use for background a resident may want but does not need up front, such
   * as what a law means for them.
   */
  explainers?: { heading: string; intro?: string; items?: string[] }[];
  /**
   * A numbered "what to do if you are not satisfied" ladder, shown after the
   * posters. Each step names who to go to and what they will do.
   */
  escalation?: {
    heading: string;
    intro?: string;
    steps: { title: string; detail: string }[];
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
