# Handoff — Safety at Home

_Last updated: 2026-08-24 (end of Phase 1 session)._

## Where we are

**Phase 1 is complete and committed on `main`.** The project builds cleanly
(`npm run build`) with `output: 'standalone'` for the Coolify Docker deploy.

Delivered in P1:

- `CLAUDE.md` — full project contract: stack, hard rules, content model,
  page template contract, sitemap, phases. **Read it first.**
- `src/config/thurrock.ts` — single source of truth for every phone number,
  email and timescale (`THURROCK as const` + `telHref()` helper).
- `src/types/safety-page.ts` — `SafetyPage` content model (data, not markup).
- `src/app/globals.css` — Tailwind v4 `@theme` OKLCH design tokens. All colour
  pairs chosen for WCAG 2.2 AA (white on brand/alert >= 4.5:1). Global
  `:focus-visible` yellow ring + dark halo works on light, dark and red
  surfaces. `prefers-reduced-motion` respected.
- Global chrome: sticky collapsible `EmergencyBar` (sessionStorage, NOT
  localStorage), `SiteHeader`, `SiteFooter`, skip link, `not-found.tsx`.
- Hub page `/safety-at-home` — emergency callout + 14-tile topic grid
  (tiles come from `src/config/topics.ts`) + repairs strip.
- Triage tool `/safety-at-home/emergency` — client component, decision tree
  in `src/components/triage/triage-data.ts` (6 paths, 2–3 questions each,
  result cards with tel: link, "Do this now" / "Do not" lists). All React
  state, no storage, no network. Back button on every step; focus moves to
  the step heading on every transition.
- Footer stub pages: `/accessibility-statement`, `/privacy`, `/contact`.
- `Dockerfile` (multi-stage node:22-alpine, non-root, EXPOSE 3000),
  `.dockerignore`, `.env.example` (documented, no values).

## Known state / caveats

- The 14 topic tiles link to their final sitemap slugs, which **404 until
  P2–P5 build those pages**. This is intentional — slugs are locked, and
  `not-found.tsx` gives the repairs number as a fallback.
- `motion` (Motion.dev) is installed but unused so far — P1 needed no
  animation. Never add framer-motion.
- No env vars are needed yet; `.env.example` documents what P6 will need.
- Local dev machine runs Node 24; Docker pins node:22-alpine. Both fine.

## Next session: Phase 2

Build `src/components/SafetyPageTemplate.tsx` rendering the 11 sections in
the order specified in CLAUDE.md, plus the 5 fire pages as `SafetyPage` data
files in `src/content/pages/`:

1. `fire-safety` (parent)
2. `fire-safety/stay-put-or-evacuate`
3. `fire-safety/fire-doors`
4. `fire-safety/smoke-and-heat-alarms`
5. `fire-safety/help-to-evacuate`

Notes for P2:

- One dynamic route (e.g. `src/app/safety-at-home/[...slug]/page.tsx`) with
  `generateStaticParams` from a content registry is the cleanest way to render
  all `SafetyPage` files with one template — but check it doesn't shadow the
  existing static routes (`/safety-at-home/emergency` stays a bespoke page).
- `related: string[]` resolves slugs against the content registry; render
  title + summary of each related page.
- The feedback widget is a client component and a **no-op in P1–P5** (logs
  nothing, posts nothing) — it gets wired to the DB in P6.
- Accordions must be real disclosure widgets (button + aria-expanded), open
  by default on desktop ("What we do" section), keyboard reachable.
- Every number/timescale in fire content imports from `THURROCK`.

## Phase checklist

See CLAUDE.md "Build phases" — P1 is ticked, P2 is next.
