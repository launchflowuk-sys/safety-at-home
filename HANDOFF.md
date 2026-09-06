# Handoff — Safety at Home

_Last updated: 2026-09-06 (end of Phase 6 session). Next up: Phase 7._

## Start here (new session checklist)

1. Read `CLAUDE.md` in full — it is the contract (stack, hard rules, content
   model, sitemap, phases). Then read this file.
2. Repo: `C:\Users\Chaudhry Naeem\safety-at-home`, branch `main`, clean tree.
   Remote: https://github.com/launchflowuk-sys/safety-at-home. `main` is
   **6 commits ahead of `origin/main`** — nothing since P1 has been pushed.
   Push when ready.
3. Git identity is set repo-locally (Shoji <shujaat@nexusedu.co.uk>).
4. `npm install` is done. Node 24 locally; Docker image pins node:22-alpine.
5. Start the local database (Docker Desktop must be running):

   ```bash
   docker start safety-at-home-pg || docker run -d --name safety-at-home-pg \
     -e POSTGRES_PASSWORD=devpass -e POSTGRES_USER=safety -e POSTGRES_DB=safety \
     -p 5434:5432 postgres:16-alpine
   ```

   The container from this session still exists with the migration applied
   and the fake seed loaded. If you recreate it: `npm run db:migrate` then
   `npm run db:seed`.
6. Run the site with the database:

   ```bash
   DATABASE_URL=postgresql://safety:devpass@localhost:5434/safety npm run dev
   ```

   Or without it (`npm run dev`) to exercise the no-database fallbacks.
   The dev server from this session is NOT running any more — background
   processes die with the session.
7. Gates before every commit: `npx tsc --noEmit` and `npm run build` (stop
   the dev server first — build and dev share `.next`). There is no ESLint
   config and no test runner yet.
8. Test data: postcode `ZZ1 1ZZ` → "Example House", 4 flats. Flat 2 has an
   asbestos record. A report and a feedback row from this session are in the
   local DB.

## Commit history

| Commit | What |
| --- | --- |
| `16b1f4f` | P1 scaffold: tokens, config, chrome, hub, triage tool |
| `b49090f` | P2 template, registry, catch-all route, 5 fire pages |
| `9f0a4ea` | P3 damp cluster, Awaab's Law clock, report form, site rename, nav tabs |
| `787a38d` | P4 gas, annual gas service, electrical, CO, water, asbestos |
| `27830a5` | Illustrations, key facts, "Find out more" links (client request) |
| `371facc` | P5 balconies, e-bikes, communal, security, extra support, safety checks |
| `c90b8a1` | P6 Prisma + Postgres, stored feedback/reports, address lookup, ARC sync |

## Facts to confirm with Thurrock (all live in `src/config/thurrock.ts`)

Change the config value and every page updates.

- `awaabsLaw.writtenReport` — corrected to "3 working days after the
  investigation ends" (was "after works finish").
- `gasSafety.recordCopy` "within 28 days of the check";
  `gasSafety.reminderBefore` "about 8 weeks before it is due".
- `electricalSafety.inspectionInterval` "every 5 years".
- `carbonMonoxide.alarmLifespan` "7 to 10 years";
  `fireSafety.alarmLifespan` "10 years"; `fireSafety.fireDoorRating`
  "30 minutes"; `fireSafety.fireRiskAssessment` "at least every 12 months in
  blocks of flats".
- `communalAreas.removalNotice` "7 days" — and whether Thurrock runs zero
  tolerance or managed use in shared areas.
- `housingPolicy.phone` is used as the contact on `extra-support` — confirm
  it is the right tenant-facing number.
- `police` (Essex Police, 101) and `nhs` (NHS 111) were added.
- ARC asbestos feed URL, auth and JSON shape (see `scripts/sync-arc.ts`).
- Whether the address lookup may show full dates (currently month/year only,
  because there is no login).

## Where we are

**Phases 1–6 are complete and committed on `main`.** All 24 sitemap routes
resolve. The site runs with or without a database. The project type-checks
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

### Delivered in P6

- **Prisma 6 + Postgres.** `prisma/schema.prisma` models `PageFeedback`,
  `DampReport`, `Building`, `Address`, `SafetyCheck`, `AsbestosRecord`.
  Initial migration in `prisma/migrations/20260906000000_init`. Binary
  targets include `linux-musl-openssl-3.0.x` for the alpine image.
  `npm run build` runs `prisma generate` first.
- **No-database fallback everywhere.** `src/lib/db.ts` exposes
  `hasDatabase()` / `getDb()`. Without `DATABASE_URL`: feedback is a no-op,
  the damp form shows the P3 "we have not received this" screen with the
  pre-filled `mailto:`, and the address lookup says it is unavailable and
  gives the phone number.
- **Server actions** in `src/app/actions/`: `feedback.ts`, `damp-report.ts`
  (re-validates with the shared `src/lib/damp-report.ts`, links the report to
  a known `Address` when postcode + first line match exactly one home,
  generates a `DM-XXXXXX` reference, stores the Awaab's Law `investigateBy`
  date), `safety-profile.ts` (`findAddresses`, `getSafetyProfile`).
- **FeedbackWidget** now stores `{ slug, helpful }`. **ReportDampForm** shows
  the reference and inspect-by date when stored.
- **SafetyProfileLookup** (client) on `/safety-at-home/your-safety-checks`
  via `TOOLS`. Postcode → address → profile: block plan (stay put /
  evacuate), higher-risk flag, last FRA and communal fire door check, per-home
  check dates, asbestos items with a "do not disturb" line.
  **Access decision:** no auth, so no personal data and all dates are
  month/year only. Revisit if Thurrock wants full dates or repair history.
- **Working-day maths** moved to `src/lib/working-days.ts`, shared by the
  clock and the report action.
- **ARC feed**: `scripts/sync-arc.ts` (`npm run arc:sync`) pulls JSON from
  `ARC_FEED_URL` (optional `ARC_FEED_TOKEN`) and upserts `AsbestosRecord` by
  `externalId`, linking by UPRN. **The feed shape is an assumption** — see the
  header comment and adjust `parseRecord` once the vendor format is known.
- **Seed**: `npm run db:seed` creates FAKE "Example House" at postcode
  ZZ1 1ZZ (4 flats, checks, 2 asbestos records). Dev only.
- `public/.gitkeep` added — the Dockerfile copies `public/` and the folder
  did not exist, which would have failed the Docker build.
- Verified end to end against a local Postgres (Docker, `postgres:16-alpine`
  on port 5434): migration, seed, lookup, profile, report (reference issued,
  row linked to the seeded address), feedback row stored.

### Local database for development

```bash
docker run -d --name safety-at-home-pg -e POSTGRES_PASSWORD=devpass   -e POSTGRES_USER=safety -e POSTGRES_DB=safety -p 5434:5432 postgres:16-alpine
export DATABASE_URL=postgresql://safety:devpass@localhost:5434/safety
npm run db:migrate && npm run db:seed && npm run dev
```

Port 5433 on the dev machine is already taken by another Postgres.

## Known state / caveats

- No `downloads` on any page yet — no PDFs exist in the repo.
- No ESLint config; use `npx tsc --noEmit` and `npm run build`.
- Awaab's Law clock and the report `investigateBy` date have no bank-holiday
  calendar (gov.uk JSON feed is an option for P7).
- `motion` remains unused. Never add framer-motion.
- Git identity is set repo-locally to the P1 author (Shoji).
- Content facts to confirm with Thurrock: gas safety record copy "within 28
  days", electrical inspection "every 5 years", CO alarm lifespan "7 to 10
  years", reminder letter "about 8 weeks before". All live in `THURROCK`.

## Next session: Phase 7

Self-check PDF generator, PEEP referral, full accessibility + Lighthouse pass.

1. **Self-check PDF**: a printable checklist of the tenant's own checks
   (alarm test, fire door, restrictors, unused taps) — consider a print
   stylesheet + `window.print()` before adding a PDF library; if a real PDF
   is needed, generate server-side and stream it, do not bundle a PDF lib
   into the client.
2. **PEEP referral**: form modelled on `ReportDampForm` + a `PeepReferral`
   table and server action. This IS personal and health data — needs a
   privacy notice, retention period and a decision on how referrals reach the
   housing team (email notification vs dashboard). Link from
   `fire-safety/help-to-evacuate` and `extra-support`.
3. **Bank holidays** for working-day maths (`src/lib/working-days.ts`).
4. **Accessibility pass**: axe on every route, keyboard-only run of the
   triage tool, both forms and the lookup, screen reader check of the
   accordions and error summaries, contrast re-check of `TopicArt` fills
   (decorative, but keep them off-text). Lighthouse ≥ 95 on a11y and best
   practices.
5. **Ops**: Coolify pre-deploy `npx prisma migrate deploy`; scheduled
   `npm run arc:sync`; back up Postgres; replace `.env.example` placeholders
   in Coolify.

## Phase checklist

See CLAUDE.md "Build phases" — P1–P6 are ticked, P7 is next.
