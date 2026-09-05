# Handoff — Safety at Home

_Last updated: 2026-09-06 (end of Phase 5 session)._

## Where we are

**Phases 1–5 are complete and committed on `main`. All 24 sitemap routes
resolve, every hub tile and every `related` slug resolves.** The project type-checks
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

### Delivered after P4: graphics, key facts and "Find out more"

Requested by the client mid-session, modelled on Hyde Housing and
Westminster's resident safety pages (illustrated topic cards, stat callouts,
links to the local fire service and HSE).

- `src/components/TopicArt.tsx` — flat inline-SVG illustration per topic,
  keyed by the first slug segment, drawn with the design tokens (`fill-brand`
  etc.). Shown on every hub tile and beside each page H1. Decorative
  (`aria-hidden`). Unknown slugs get a shield.
- `SafetyPage.keyFacts?` — up to three stat tiles under the summary (section
  2b). Values that are numbers or timescales come from `THURROCK`.
- `SafetyPage.furtherReading?` — "Find out more" section (9b) before Related
  pages. Entries come from `src/config/sources.ts` (`SOURCES`), official
  bodies only. **Every URL there was fetched and confirmed to load on
  2026-09-05.** Dead guesses were rejected (gov.uk/guidance/awaabs-law,
  LFB e-scooters page, ECFRS e-bike page). Gas Safe Register root blocks
  bots but is the correct public URL.
- All 15 existing pages carry `keyFacts` and `furtherReading`.
- `THURROCK.fireSafety.fireDoorRating` added ("30 minutes").
- Enfield's safety-at-home page (also shared by the client) returns 403 to
  automated fetches and was not used.

### Delivered in P5

Six data pages, registered in `registry.ts`, each with key facts, further
reading and a `TopicArt` illustration:

- `balconies-windows-and-roofs.ts` — balcony fire rules, window restrictors,
  roofs off limits.
- `e-bikes-and-e-scooters.ts` — lithium battery charging and storage; ban on
  shared-area charging. Links LFB ChargeSafe.
- `communal-areas.ts` — keep-clear policy; items removed after
  `THURROCK.communalAreas.removalNotice` ("7 days" — **confirm Thurrock's
  actual policy: zero tolerance vs managed use, and the notice period**).
- `security-at-home.ts` — door entry, locks, ID checks. Uses
  `THURROCK.police` (Essex Police, 101). Essex Police web pages return 403 to
  automated fetches, so no police link was added.
- `extra-support.ts` — needs, PEEP, fire service visit, accessible formats.
  `howToReport.phone` uses `THURROCK.housingPolicy.phone` (**confirm this is
  the right tenant-facing housing number**); the template shows opening
  hours only for the repairs line, so none are shown here.
- `your-safety-checks.ts` — a single table of every check and interval,
  all from `THURROCK`. Uses new `fireSafety.fireRiskAssessment` ("at least
  every 12 months in blocks of flats" — **confirm**).

## Known state / caveats

- No `downloads` on any page yet — no PDFs exist in the repo.
- No ESLint config; use `npx tsc --noEmit` and `npm run build`.
- Awaab's Law clock has no bank-holiday calendar (gov.uk JSON feed is an
  option for P6/P7).
- `motion` remains unused. Never add framer-motion.
- Git identity is set repo-locally to the P1 author (Shoji).
- Content facts to confirm with Thurrock: gas safety record copy "within 28
  days", electrical inspection "every 5 years", CO alarm lifespan "7 to 10
  years", reminder letter "about 8 weeks before". All live in `THURROCK`.

## Next session: Phase 6

Postgres + Prisma, address lookup, safety profile, ARC asbestos feed.

1. Add Prisma with a Postgres datasource. Env var names are documented in
   `.env.example`; values are set in Coolify only. Never commit a `.env`.
2. Model `SafetyPage` as designed in `src/types/safety-page.ts` (plus
   `keyFacts` and `furtherReading`, which were added after the type was first
   written). Consider keeping content in TypeScript for now and using the DB
   for tenant data only — the content files are the editorial source of truth
   and are reviewed in git.
3. Wire `FeedbackWidget` to a `PageFeedback` table (slug, helpful, timestamp).
4. Wire `ReportDampForm` to a `DampReport` table and replace the `mailto:`
   fallback with a real submission plus confirmation reference. Keep the
   phone number on the confirmation screen.
5. Address lookup (postcode → UPRN) and a per-address "safety profile":
   building height band, stay put / evacuate plan, last gas check, last
   electrical check, asbestos register summary (ARC feed).
6. Optional: bank-holiday calendar for `AwaabsLawClock` (gov.uk JSON feed),
   then drop the caveat sentence in the component.

Notes for P6:

- No auth existed before P6. Anything showing per-address data needs a
  decision on how a tenant proves who they are.
- `output: 'standalone'` must keep working in Docker; Prisma needs the
  engine binaries copied into the standalone image.

## Phase checklist

See CLAUDE.md "Build phases" — P1–P5 are ticked, P6 is next.
