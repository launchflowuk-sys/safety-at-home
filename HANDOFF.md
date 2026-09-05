# Handoff — Safety at Home

_Last updated: 2026-09-05 (end of Phase 4 session)._

## Where we are

**Phases 1–4 are complete and committed on `main`.** The project type-checks
(`npx tsc --noEmit`) and builds with `output: 'standalone'`.

The site is called **"Safety in and around your home"** (display name only —
URLs are unchanged). The header has two primary tabs: the hub, and
**Building safety information**.

### Delivered in P1

- `CLAUDE.md` — full project contract. **Read it first.**
- `src/config/thurrock.ts` — single source of truth for every phone number,
  email and timescale.
- `src/types/safety-page.ts` — `SafetyPage` content model.
- `src/app/globals.css` — Tailwind v4 OKLCH tokens, WCAG 2.2 AA pairs, focus
  ring, reduced motion.
- Global chrome, hub page, triage tool at `/safety-at-home/emergency`, footer
  stub pages, `Dockerfile`, `.dockerignore`, `.env.example`.

### Delivered in P2

- `SafetyPageTemplate.tsx` (11 sections, optional ones skipped),
  `Accordion.tsx`, `WarningIcon.tsx`, `FeedbackWidget.tsx` (no-op until P6).
- `src/content/registry.ts` + catch-all `[...slug]/page.tsx`.
- Five fire pages. `THURROCK.fireSafety`.

### Delivered in P3

- Damp and mould, prevent condensation, Awaab's Law pages.
- `AwaabsLawClock.tsx` (client) attached via `TOOLS` in `[...slug]/page.tsx`
  and the template's `tool` prop. Mon–Fri working days only; UI says bank
  holidays are not yet excluded.
- `ReportDampForm.tsx` (client) in `pages/ReportDampOrMouldPage.tsx`, served
  from `BESPOKE_ROUTES` in the catch-all. Nothing posted or stored; shows the
  answers, says clearly we have not received them, offers a pre-filled
  `mailto:` and the repairs number.
- Site rename + nav tabs (`src/config/navigation.ts`, `SiteNav.tsx`).
- Building safety information page (pulled forward from P5).
- `THURROCK.nhs`, `THURROCK.buildingSafety`; `awaabsLaw.writtenReport`
  wording corrected to "after the investigation ends" — **confirm with
  Thurrock**.
- `triage-data.ts` prose now imports `THURROCK.emergency.phone`.

### Delivered in P4

Six data pages in `src/content/pages/`, registered in `registry.ts`:

- `gas-safety.ts` — emergency block uses `THURROCK.gasLeak` (Cadent).
- `annual-gas-service.ts` — slug `gas-safety/annual-gas-service`. Has no
  `online` CTA, which exercises the two-card "How to report it" layout.
- `electrical-safety.ts` — power cuts point to `THURROCK.electricity` (UKPN).
- `carbon-monoxide.ts` — emergency block uses Cadent, with 999 and NHS 111
  from config in the steps.
- `water-safety.ts` — emergency block uses the repairs line (leaks) and
  `THURROCK.blockedSewer` (Anglian Water) for sewer flooding. Legionella
  advice for tenants.
- `asbestos.ts` — no emergency block. Planned works use `timescales.batch`.

New config blocks: `gasSafety` (service interval, record copy, reminder),
`electricalSafety.inspectionInterval`, `carbonMonoxide.alarmLifespan`,
`waterSafety` (flush unused outlets, clean shower head). New icons: `tap`,
`spark`.

Related links from fire, damp and building pages to `carbon-monoxide`,
`electrical-safety` etc. now resolve. Links to `your-safety-checks`,
`communal-areas`, `e-bikes-and-e-scooters`, `extra-support`,
`balconies-windows-and-roofs` still drop silently until P5.

## Known state / caveats

- Hub tiles still 404 for: balconies, e-bikes, communal, security, extra
  support, your safety checks (P5).
- No `downloads` on any page yet — no PDFs exist in the repo.
- No ESLint config; use `npx tsc --noEmit` and `npm run build`.
- Awaab's Law clock has no bank-holiday calendar (gov.uk JSON feed is an
  option for P6/P7).
- `motion` remains unused. Never add framer-motion.
- Git identity is set repo-locally to the P1 author (Shoji).
- Content facts to confirm with Thurrock: gas safety record copy "within 28
  days", electrical inspection "every 5 years", CO alarm lifespan "7 to 10
  years", reminder letter "about 8 weeks before". All live in `THURROCK`.

## Next session: Phase 5

Remaining data pages, all via `registry.ts` only:

1. `balconies-windows-and-roofs`
2. `e-bikes-and-e-scooters` (fire risk of charging; storage rules)
3. `communal-areas` (zero-tolerance / managed-use policy for shared areas —
   check which Thurrock uses)
4. `security-at-home` (door entry, locks; consider `THURROCK.housingPolicy`)
5. `extra-support` (PEEP referral is P7; link to `fire-safety/help-to-evacuate`)
6. `your-safety-checks` (a table of every check and interval — all intervals
   already exist in `THURROCK`: gas, electrical, fire doors, alarms, water)

Notes for P5:

- No new routes. Add each page to `SAFETY_PAGES`. If any page needs a tool or
  bespoke markup, use `TOOLS` / `BESPOKE_ROUTES` in `[...slug]/page.tsx`.
- `building-safety` is already built (P3) — skip it.
- New numbers or timescales go in `THURROCK` first.
- After P5, every hub tile resolves and every `related` slug resolves.

## Phase checklist

See CLAUDE.md "Build phases" — P1–P4 are ticked, P5 is next.
