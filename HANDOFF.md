# Handoff — Safety at Home

_Last updated: 2026-09-05 (end of Phase 3 session)._

## Where we are

**Phases 1, 2 and 3 are complete and committed on `main`.** The project
type-checks (`npx tsc --noEmit`) and builds with `output: 'standalone'`.

The site is now called **"Safety in and around your home"** (display name
only — URLs are unchanged). The header has two primary tabs: the hub, and
**Building safety information**, which was pulled forward from P5 so the tab
has a real page.

### Delivered in P1

- `CLAUDE.md` — full project contract. **Read it first.**
- `src/config/thurrock.ts` — single source of truth for every phone number,
  email and timescale.
- `src/types/safety-page.ts` — `SafetyPage` content model.
- `src/app/globals.css` — Tailwind v4 OKLCH tokens, WCAG 2.2 AA pairs, focus
  ring, reduced motion.
- Global chrome (`EmergencyBar`, `SiteHeader`, `SiteFooter`, skip link,
  `not-found.tsx`), hub page, triage tool at `/safety-at-home/emergency`,
  footer stub pages, `Dockerfile`, `.dockerignore`, `.env.example`.

### Delivered in P2

- `SafetyPageTemplate.tsx` — renders every topic page in the 11-section
  order. Optional sections skipped when absent.
- `Accordion.tsx` — disclosure widget; "What we do" follows a live
  `(min-width: 768px)` media query until the user toggles it.
- `WarningIcon.tsx`, `FeedbackWidget.tsx` (no-op until P6).
- `src/content/registry.ts` + catch-all `[...slug]/page.tsx`.
- Five fire pages. `THURROCK.fireSafety` timescales.

### Delivered in P3

- **Damp and mould cluster** as `SafetyPage` data: `damp-and-mould.ts`,
  `prevent-condensation.ts`, `awaabs-law.ts`. Every timescale imports from
  `THURROCK.awaabsLaw`.
- **Awaab's Law clock** — `src/components/AwaabsLawClock.tsx` (client).
  Tenant enters the date they reported and, optionally, the inspection date;
  it shows the statutory deadlines and working days left / overdue. Working
  days are Mon–Fri only; the UI says bank holidays are not yet excluded.
  Numbers are parsed from the leading integer of the `THURROCK.awaabsLaw`
  strings, so the config stays the single source of truth. Attached to the
  page via the `TOOLS` map in `[...slug]/page.tsx` and the template's new
  optional `tool` prop.
- **Report damp or mould form** — `src/components/ReportDampForm.tsx`
  (client) wrapped by `src/components/pages/ReportDampOrMouldPage.tsx`.
  GOV.UK error pattern: error summary receives focus, inline errors linked
  by `aria-describedby`, `aria-invalid`. **Nothing is posted or stored.** On
  success it shows the answers, states clearly that we have NOT received
  them, and offers a pre-filled `mailto:` to `THURROCK.repairs.email` plus
  the repairs number. A "water is coming in" answer adds a call-us-now line.
- **Bespoke routes live inside the catch-all** (`BESPOKE_ROUTES` in
  `[...slug]/page.tsx`). A static folder at
  `app/safety-at-home/damp-and-mould/report-damp-or-mould/` was tried first
  and made `/safety-at-home/damp-and-mould` 404 (folder with no `page.tsx`
  shadows its parent). Do not reintroduce static nested folders.
- `Breadcrumb.tsx` extracted; `getBreadcrumbsForSlug(slug, title)` added for
  non-data pages. `BESPOKE_PAGES` in the registry lets `related` links
  resolve to the triage tool and the report form.
- **Site rename + nav tabs**: `src/config/navigation.ts` exports `SITE_NAME`,
  `NAV_TABS`, `activeTab()`. `SiteNav.tsx` (client, `usePathname`) renders
  the tabs with `aria-current="page"`. The hub grid hides any topic that has
  its own tab. `topics.ts` title for `building-safety` is now "Building
  safety information".
- **Building safety information** page (`building-safety.ts`) — Building
  Safety Act duties, resident engagement, warning signs. New config:
  `THURROCK.buildingSafety.higherRiskBuilding`, `THURROCK.nhs`.
- **Config correction**: `awaabsLaw.writtenReport` was "3 working days after
  works finish"; the law is 3 working days after the investigation ends.
  Changed to match. Confirm with Thurrock.
- **P1 fix**: `triage-data.ts` had "999" hardcoded in prose strings. Now
  uses `THURROCK.emergency.phone` (node ids like `fire-999` are unchanged).

## Known state / caveats

- Hub tiles still 404 for: gas, electrical, CO, water, asbestos, balconies,
  e-bikes, communal, security, extra support, safety checks (P4–P5).
- No `downloads` on any page yet — no PDFs exist in the repo.
- No ESLint config; use `npx tsc --noEmit` and `npm run build`.
- The Awaab's Law clock has no bank-holiday calendar. P6/P7 could add one
  (gov.uk publishes a JSON feed) and drop the caveat sentence.
- `motion` remains unused. Never add framer-motion.
- Git identity is set repo-locally to the P1 author (Shoji).

## Next session: Phase 4

Gas, electrical, CO, water, asbestos — all as `SafetyPage` data files:

1. `gas-safety`, `gas-safety/annual-gas-service` (uses `THURROCK.gasLeak`)
2. `electrical-safety` (`THURROCK.electricity`)
3. `carbon-monoxide` (`THURROCK.gasLeak`, `THURROCK.nhs`, `emergency`)
4. `water-safety` (legionella; `THURROCK.blockedSewer` for drains)
5. `asbestos`

Notes for P4:

- Add each page to `SAFETY_PAGES` in `src/content/registry.ts` only. No new
  routes needed. Related links from fire/damp pages (`carbon-monoxide`,
  `electrical-safety`, `your-safety-checks`, …) start resolving automatically.
- New icons go in `WarningIcon.tsx` (`PATHS`); unknown keys fall back safely.
- If a page needs an interactive tool, add it to `TOOLS` in
  `[...slug]/page.tsx`. If it needs bespoke markup, add it to
  `BESPOKE_ROUTES` and `BESPOKE_PAGES`.
- Any new number or timescale goes in `THURROCK` first.

## Phase checklist

See CLAUDE.md "Build phases" — P1–P3 are ticked, P4 is next.
