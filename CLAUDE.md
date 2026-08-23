# Safety at Home — Thurrock Council tenant safety platform

A LaunchFlow project. Tenant-facing safety information and reporting for Thurrock
Council housing. Content style follows GOV.UK conventions: plain, calm, task-first.

## Stack (non-negotiable)

- Next.js 15, App Router, TypeScript, React Server Components by default
- Tailwind CSS v4 with OKLCH design tokens (LaunchFlow house system) — tokens live
  in `src/app/globals.css` under `@theme`
- `next.config.ts`: `output: 'standalone'` (required for Coolify Docker deploy)
- No database in Phase 1. Postgres + Prisma added in Phase 6 — data shapes are
  designed now (`src/types/safety-page.ts`) so it retrofits cleanly.
- Motion.dev (`motion` package) for any animation. **No framer-motion.**
- No auth in Phase 1.
- Node 22 alpine base image (see `Dockerfile`).

## Hard rules

1. **Single source of truth**: every phone number, email and timescale MUST be
   imported from `src/config/thurrock.ts`. Never hardcode a number in a page or
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

`src/config/thurrock.ts` exports a single `THURROCK as const` object holding all
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
  emergency?: { label: string; phone: string; instructions: string[] };
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
  related: string[]; // slugs of related SafetyPages, auto-resolved
};
```

Content lives in `src/content/pages/*.ts` — one file per topic. A single
component renders all of them.

## Page template contract

`src/components/SafetyPageTemplate.tsx` renders every topic page, in this order:

1. Breadcrumb
2. H1 + summary
3. Emergency callout (if present) — red, high contrast, phone as `tel:` link
4. "What we do" — accordion, open by default on desktop
5. "What you must do" — accordion
6. Warning signs — icon grid
7. "How to report it" — 3 CTA cards (online / phone / email)
8. Timescales table
9. Downloads
10. Related pages (auto-resolved from slugs)
11. "Was this page helpful?" feedback widget (client component, no-op in P1)

## Global chrome

- Sticky emergency bar at top of every page: "In an emergency call 999. Housing
  repairs 0800 074 0169 (24/7)" — numbers imported from config. Collapsible,
  remembers state in **sessionStorage** (NOT localStorage).
- Skip to content link.
- Footer with accessibility statement, privacy, contact links.

## Build phases

- [x] **P1** Scaffold, tokens, config, emergency bar, hub page, triage tool
- [ ] **P2** SafetyPageTemplate + 5 fire pages
- [ ] **P3** Damp/mould cluster + Awaab's Law countdown + report form (client-only)
- [ ] **P4** Gas, electrical, CO, water, asbestos
- [ ] **P5** Building safety, balconies, e-bikes, communal, security, extra support
- [ ] **P6** Postgres + Prisma, address lookup, safety profile, ARC asbestos feed
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

## Deploy

Coolify on Hetzner, Docker build from the repo `Dockerfile` (multi-stage,
`node:22-alpine`, standalone output, non-root user, port 3000). `.dockerignore`
keeps the context small. Env vars are configured in Coolify only.
