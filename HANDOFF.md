# Handoff — Safety at Home

_Last updated: 2026-09-05 (end of Phase 2 session)._

## Where we are

**Phases 1 and 2 are complete.** P1 is committed on `main`; P2 is in the
working tree of this session (see "Uncommitted" below). The project type-checks
(`npx tsc --noEmit`) and builds with `output: 'standalone'`.

### Delivered in P1

- `CLAUDE.md` — full project contract: stack, hard rules, content model,
  page template contract, sitemap, phases. **Read it first.**
- `src/config/thurrock.ts` — single source of truth for every phone number,
  email and timescale (`THURROCK as const` + `telHref()` helper).
- `src/types/safety-page.ts` — `SafetyPage` content model (data, not markup).
- `src/app/globals.css` — Tailwind v4 `@theme` OKLCH design tokens, all
  colour pairs WCAG 2.2 AA. Global `:focus-visible` yellow ring + dark halo.
  `prefers-reduced-motion` respected.
- Global chrome: sticky collapsible `EmergencyBar` (sessionStorage),
  `SiteHeader`, `SiteFooter`, skip link, `not-found.tsx`.
- Hub page `/safety-at-home` — 14-tile topic grid from `src/config/topics.ts`.
- Triage tool `/safety-at-home/emergency` — client component, decision tree
  in `src/components/triage/triage-data.ts`.
- Footer stub pages, `Dockerfile`, `.dockerignore`, `.env.example`.

### Delivered in P2

- `src/components/SafetyPageTemplate.tsx` — renders every topic page from
  its `SafetyPage` data in the 11-section order from CLAUDE.md. Optional
  sections (emergency, warning signs, timescales, downloads) are skipped when
  absent. Server component.
- `src/components/Accordion.tsx` — client disclosure widget (button with
  `aria-expanded` + `aria-controls`, heading kept as a real `<h2>`).
  `defaultOpen="desktop"` follows a live `(min-width: 768px)` media query via
  `useSyncExternalStore` until the user toggles it. Server HTML renders it
  open so content is present for no-JS users. "What we do" uses it; "What you
  must do" starts closed.
- `src/components/WarningIcon.tsx` — decorative line icons keyed by
  `warningSigns[].icon` (door, alarm, socket, blocked, light, smoke, flame,
  person, seal, crack, hinge, battery, clock, warning). Unknown keys fall
  back to the warning triangle.
- `src/components/FeedbackWidget.tsx` — client, **no-op** (shows a thank-you,
  logs and posts nothing). Wire to the DB in P6.
- `src/content/registry.ts` — `SAFETY_PAGES` list plus `getSafetyPage`,
  `resolveRelated` (drops slugs not yet built, so no link ever 404s) and
  `getBreadcrumbs` (parent segments resolve to a built page, else the topic
  title from `topics.ts`).
- `src/app/safety-at-home/[...slug]/page.tsx` — catch-all route,
  `generateStaticParams` from the registry, `dynamicParams = false`.
  Verified it does **not** shadow `/safety-at-home/emergency`.
- Five fire pages in `src/content/pages/`: `fire-safety.ts`,
  `stay-put-or-evacuate.ts`, `fire-doors.ts`, `smoke-and-heat-alarms.ts`,
  `help-to-evacuate.ts`. Every number and timescale imports from `THURROCK`.
- `THURROCK.fireSafety` added to config: `alarmTest`,
  `communalFireDoorCheck`, `flatFireDoorCheck`, `tallBuilding`,
  `alarmLifespan`.

### Uncommitted

P2 was built in a session without commit permission. Everything above is in
the working tree. Suggested commit: `feat(p2): SafetyPageTemplate, registry,
catch-all route and 5 fire pages`.

## Known state / caveats

- The 9 remaining hub tiles (gas, electrical, CO, damp, water, asbestos,
  building, balconies, e-bikes, communal, security, extra support, safety
  checks) still 404 until P3–P5. `not-found.tsx` gives the repairs number.
- No `downloads` exist yet on any page — there are no PDFs in the repo. The
  template renders the section as soon as a page provides them.
- `howToReport.phone` on every fire page is the repairs line. The template
  shows `THURROCK.repairs.hours` under the number only when it is that line.
- `motion` (Motion.dev) is installed but still unused. Never add framer-motion.
- No ESLint config is present, so `npm run lint` is not a useful gate yet.
  Use `npx tsc --noEmit` and `npm run build`.
- `.claude/launch.json` (dev server config for the desktop app preview) is
  committed. It is identical to what the app generates.

## Next session: Phase 3

Damp and mould cluster, Awaab's Law countdown, and the report form
(client-only, no network in P3):

1. `damp-and-mould` (parent) as a `SafetyPage` data file — timescales come
   from `THURROCK.awaabsLaw`.
2. `damp-and-mould/prevent-condensation` as a `SafetyPage`.
3. `damp-and-mould/awaabs-law` — probably a `SafetyPage` plus a small client
   "countdown" component showing the statutory clock (investigate in
   `awaabsLaw.investigate`, repairs start in `awaabsLaw.repairStart`,
   emergency hazard in `awaabsLaw.emergencyHazard`, written report in
   `awaabsLaw.writtenReport`). Consider extending `SafetyPage` with an
   optional `extras` slot, or add a bespoke static route — but keep the
   sitemap slugs exact.
4. `damp-and-mould/report-damp-or-mould` — client-only form. No POST, no
   storage. Validate on the client, show a summary and the repairs number on
   "submit". P6 wires it to Postgres.
5. Add each new page to `SAFETY_PAGES` in `src/content/registry.ts`. Related
   links from the fire pages (`communal-areas`, `e-bikes-and-e-scooters`,
   `building-safety`, `extra-support`, `carbon-monoxide`,
   `electrical-safety`, `your-safety-checks`) will start resolving
   automatically as those pages land in P4–P5.

Notes for P3:

- Static routes win over `[...slug]`. If the report form or Awaab's Law page
  needs bespoke markup, add it as a static route at the exact sitemap path
  and leave it out of the registry, or give the registry a way to mark a slug
  as "bespoke" so breadcrumbs still resolve.
- Keep accordions as the shared `Accordion` component. Keep every timescale
  in `THURROCK`.

## Phase checklist

See CLAUDE.md "Build phases" — P1 and P2 are ticked, P3 is next.
