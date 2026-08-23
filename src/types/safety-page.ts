/**
 * Content model for every topic page. Pages are data, not bespoke markup —
 * one file per topic in src/content/pages/*.ts, all rendered by
 * SafetyPageTemplate. Designed to map cleanly onto Prisma models in Phase 6.
 */
export type SafetyPage = {
  slug: string;
  title: string;
  summary: string;
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
  downloads?: { label: string; href: string; size: string }[];
  related: string[];
};
