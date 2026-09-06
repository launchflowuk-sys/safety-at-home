# Safety at Home — Thurrock Council tenant safety platform

A LaunchFlow project. Tenant-facing safety information and reporting for Thurrock
Council housing. Content style follows GOV.UK conventions: plain, calm, task-first.

## Stack (non-negotiable)

- Next.js 15, App Router, TypeScript, React Server Components by default
- Tailwind CSS v4 with OKLCH design tokens (LaunchFlow house system) — tokens live
  in `src/app/globals.css` under `@theme`
- `next.config.ts`: `output: 'standalone'` (required for Coolify Docker deploy)
- Postgres + Prisma 6 (`prisma/schema.prisma`) for tenant data only: page
  feedback, damp reports, addresses, buildings, safety checks and the ARC
  asbestos register. **Editorial content stays in TypeScript** (`src/content`).
  The site must run with no `DATABASE_URL`: every DB path checks
  `hasDatabase()` in `src/lib/db.ts` and falls back (feedback no-op, damp form
  offers a pre-filled email, address lookup says it is unavailable).
- Server actions live in `src/app/actions/*.ts` and re-validate everything
  the client sends. Shared validation is in `src/lib/damp-report.ts`.
- The per-address safety profile is shown without auth, so it must never
  include personal data and every date is coarsened to month and year.
- Motion.dev (`motion` package) for any animation. **No framer-motion.**
- No auth in Phase 1.
- Node 22 alpine base image (see `Dockerfile`).

## Hard rules

1. **Single source of truth**: the landlord name, every phone number, email
   and timescale MUST be imported from `src/config/organisation.ts` (`ORG`).
   The landlord name and its own contacts are **placeholders** while this is a
   demonstration: "Housing Organisation", Ofcom drama numbers and example.org
   addresses. Numbers marked "real" in that file are genuine national services
   and must not be changed. Never hardcode a number in a page or
   component. This includes triage results, emergency bars, footers and content
   files.
2. **WCAG 2.2 AA is a hard requirement, not a polish step.** Every commit must
   keep colour contrast >= 4.5:1, focus rings visible, and all interactive
   elements keyboard reachable. Emergency/red surfaces included.
3. **Plain English, reading age 9.** Short sentences. No jargon without an inline
   explanation. Write like GOV.UK, not like a brochure.
4. **Never commit secrets.** All env vars are set in Coolify. `.env.example`
   documents names only, no values.

## Content config contract

`src/config/organisation.ts` exports a single `ORG as const` object holding all
contact details and timescales:

- `repairs` — phone, email, hours (24/7 free line)
- `housingPolicy` — phone
- `gasLeak` — provider (Cadent), phone
- `blockedSewer` — provider (Anglian Water), phone
- `electricity` — provider (UK Power Networks), phone
- `emergency` — phone (999)
- `contractor` — repairs contractor name (Mears)
- `timescales` — emergency / urgent / routine / batch repair targets
- `awaabsLaw` — investigate, repairStart, emergencyHazard, writtenReport targets
- `rightToRepair` — initial, perDay, cap compensation amounts

If a new number or timescale is needed, add it to `THURROCK` first, then import.

## Content model contract

Every topic page is **data, not bespoke markup**. The shape is `SafetyPage` in
`src/types/safety-page.ts`:

```ts
type SafetyPage = {
  slug: string;
  title: string;
  summary: string;
  keyFacts?: { value: string; label: string }[]; // up to 3 stat tiles; values from THURROCK
  emergency?: { label: string; phone: string; instructions: string[] };
  diagram?: { id: DiagramId; caption: string }; // explanatory drawing
  ourResponsibilities: string[];
  yourResponsibilities: string[];
  warningSigns?: { icon: string; text: string }[];
  howToReport: {
    online?: { label: string; href: string };
    phone?: string;
    email?: string;
  };
  explainers?: { heading; intro?; items? }[]; // extra accordions
  escalation?: { heading; intro?; steps: { title; detail }[] }; // numbered ladder
  timescales?: { label: string; target: string }[];
  posters?: readonly Poster[]; // from POSTERS in src/config/posters.ts
  downloads?: { label: string; href: string; size: string }[];
  furtherReading?: { label: string; href: string; source: string }[]; // official external sources only
  related: string[]; // slugs of related SafetyPages, auto-resolved
};
```

Content lives in `src/content/pages/*.ts` — one file per topic. A single
component renders all of them.

## High-rise block list

The blocks Thurrock registers with the Building Safety Regulator live in
`src/config/buildings.ts` (`HIGH_RISE_BLOCKS`), published by
`HighRiseBlockList` on the building safety page. Never hardcode a block name
in a page: the count, the key fact and the published list are all derived
from that array. `reference` is the council's asset reference, not a dwelling
UPRN, and is deliberately not rendered.

## Diagram contract

Explanatory drawings live in `src/components/Diagrams.tsx` and are attached
through `diagram`. They differ from `TopicArt`, which is decorative:

- A diagram must show a mechanism the reader would otherwise have to imagine.
- The drawing is `role="presentation"`; the **visible caption carries the
  meaning**, so write the caption so the page still works without the picture.
  That is how these meet WCAG 2.2 AA 1.1.1.
- Colour comes from the design tokens, and never carries meaning alone —
  pair red and green with a cross and a tick.
- Keep labels inside the drawing short; explanation goes in the caption.
- After adding one, check nothing spills outside the `viewBox`.

## Poster contract

Printed posters live in `src/config/posters.ts` (`POSTERS`) and are attached
to a page through `posters`. A poster is an image of text, which alone fails
WCAG 2.2 AA (1.4.5), so **every poster must carry a full `transcript`** that
the page renders as real text. Keep transcripts faithful to the printed
sheet — do not tidy the wording, and do not reconcile two posters that
disagree; raise the conflict with Thurrock instead. Phone numbers and emails
inside a transcript still come from `THURROCK`.

Images go in `public/posters/` as `<slug>.webp` (shown) plus `<slug>.jpg`
(fallback and "open full size"), both 1055px wide, with `fileSize` updated.
Never add a poster image with bare markup.

## Page template contract

`src/components/SafetyPageTemplate.tsx` renders every topic page, in this order:

1. Breadcrumb
2. H1 + summary, with the topic illustration (`TopicArt`, keyed by slug)
2b. Key facts — up to 3 stat tiles (if present)
3. Emergency callout (if present) — red, high contrast, phone as `tel:` link
3c. Explanatory diagram — `Diagram` (if present)
4. "What we do" — accordion, open by default on desktop
5. "What you must do" — accordion
5b. Explainers — further accordions (if present)
6. Warning signs — icon grid
6b. Safety posters — `PosterGallery` (if present)
6c. Escalation ladder — numbered steps (if present)
7. "How to report it" — 3 CTA cards (online / phone / email)
8. Timescales table
9. Downloads
9b. "Find out more" — external links to official bodies only (fire service,
    NHS, HSE, GOV.UK, utilities). Verify every URL loads before adding it.
10. Related pages (auto-resolved from slugs)
11. "Was this page helpful?" feedback widget (client component, no-op in P1)

## Global chrome

- Sticky emergency bar at top of every page: "In an emergency call 999. Housing
  repairs 0800 074 0169 (24/7)" — numbers imported from config. Collapsible,
  remembers state in **sessionStorage** (NOT localStorage).
- Site name is `SITE_NAME` in `src/config/navigation.ts` ("Safety in and around
  your home"). Primary nav tabs come from `NAV_TABS` there: the hub and
  "Building safety information". A topic with its own tab is left out of the
  hub grid automatically. URLs never change — only display names.
- Skip to content link.
- Footer with accessibility statement, privacy, contact links.

## Build phases

- [x] **P1** Scaffold, tokens, config, emergency bar, hub page, triage tool
- [x] **P2** SafetyPageTemplate + 5 fire pages
- [x] **P3** Damp/mould cluster + Awaab's Law countdown + report form (client-only)
- [x] **P4** Gas, electrical, CO, water, asbestos
- [x] **P5** Building safety, balconies, e-bikes, communal, security, extra support
- [x] **P6** Postgres + Prisma, address lookup, safety profile, ARC asbestos feed
- [ ] **P7** Self-check PDF generator, PEEP referral, full a11y + Lighthouse pass

## Sitemap (24 routes)

```
/safety-at-home
/safety-at-home/emergency                          (triage tool — client)
/safety-at-home/fire-safety
/safety-at-home/fire-safety/stay-put-or-evacuate
/safety-at-home/fire-safety/fire-doors
/safety-at-home/fire-safety/smoke-and-heat-alarms
/safety-at-home/fire-safety/help-to-evacuate
/safety-at-home/building-safety
/safety-at-home/gas-safety
/safety-at-home/gas-safety/annual-gas-service
/safety-at-home/electrical-safety
/safety-at-home/carbon-monoxide
/safety-at-home/damp-and-mould
/safety-at-home/damp-and-mould/report-damp-or-mould
/safety-at-home/damp-and-mould/awaabs-law
/safety-at-home/damp-and-mould/prevent-condensation
/safety-at-home/asbestos
/safety-at-home/water-safety
/safety-at-home/balconies-windows-and-roofs
/safety-at-home/e-bikes-and-e-scooters
/safety-at-home/communal-areas
/safety-at-home/security-at-home
/safety-at-home/extra-support
/safety-at-home/your-safety-checks
```

Use these exact slugs everywhere. Never invent a new href — the sitemap is the
single source of truth for internal links.

All routes under `/safety-at-home` except `/emergency` are served by the
catch-all `src/app/safety-at-home/[...slug]/page.tsx`. Data pages come from
`src/content/registry.ts`; bespoke pages (the damp report form) are registered
in `BESPOKE_ROUTES` inside that file. **Do not add static folders under
`src/app/safety-at-home/`** for nested paths — a folder with no `page.tsx`
shadows its parent slug and 404s it.

## Deploy

Coolify on Hetzner, Docker build from the repo `Dockerfile` (multi-stage,
`node:22-alpine`, standalone output, non-root user, port 3000). `.dockerignore`
keeps the context small. Env vars are configured in Coolify only.

`npm run build` runs `prisma generate` first. Apply migrations as a Coolify
pre-deploy command: `npx prisma migrate deploy`. Run `npm run arc:sync` on a
schedule to refresh the asbestos register. `npm run db:seed` loads FAKE dev
data at postcode ZZ1 1ZZ — never run it against production.
