# Handoff — Safety at Home

_Last updated: 2026-09-06 (Phase 6 complete, plus posters, the building safety rebuild and the real block list). Next up: Phase 7._

## Start here (new session checklist)

1. Read `CLAUDE.md` in full — it is the contract (stack, hard rules, content
   model, sitemap, phases). Then read this file.
2. Repo: `C:\Users\Chaudhry Naeem\safety-at-home`, branch `main`, clean tree.
   Remote: https://github.com/launchflowuk-sys/safety-at-home. **Everything is
   pushed** — `main` and `origin/main` match at `4156d25`.
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
| `058301c` | HANDOFF refresh |
| `0e3d671` | Thurrock + ECFRS safety posters, with text transcripts |
| `fe021b0` | Building safety page rebuilt: explainers, escalation ladder |
| `4156d25` | The 15 registered high-rise blocks published |

## Deploy status

- **Pushed to GitHub `main`** on 2026-09-06. If Coolify's webhook is
  connected it will have built from `4156d25`.
- **Coolify itself was never reachable from the dev machine** — no CLI, no API
  token, no Coolify config in the repo. Nobody has confirmed the deployed site
  is live. Check the Coolify dashboard, or get the deploy hook URL.
- **The production Docker image was built and run locally and it works**:
  347MB, runs as the non-root `nextjs` user, ready in 184ms, serves every
  route and `/posters/*`, and reached Postgres over `host.docker.internal`.
  `prisma generate` succeeds on alpine with the `linux-musl-openssl-3.0.x`
  binary target, which was the main deploy risk. Rebuild with
  `docker build -t safety-at-home:check .`.
- Coolify still needs `DATABASE_URL` set and `npx prisma migrate deploy` as a
  pre-deploy command. Without them the site loads but stores nothing.

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
- All 15 pages that existed at that point carry `keyFacts` and
  `furtherReading`. The six P5 pages were written with them too, so all 21
  pages have them.
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
- **SafetyProfileLookup** (client) via `TOOLS`, now on both
  `/safety-at-home/your-safety-checks` and `/safety-at-home/building-safety`. Postcode → address → profile: block plan (stay put /
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

### Delivered after P6: resident safety posters

The client supplied four printed posters (OneDrive zip) to display in the
building safety area.

- Source images optimised into `public/posters/` as WebP (shown, ~200KB) and
  JPEG (fallback + "open full size", ~330KB). Originals were 1.7MB PNGs;
  total dropped from 6.5MB to 2.2MB. Re-export both formats if a poster is
  replaced and update `fileSize` in the config.
- `src/config/posters.ts` (`POSTERS`) holds each poster's title, summary,
  alt text, source, dimensions and a **full text transcript**. The transcript
  exists because an image of text fails WCAG 2.2 AA (1.4.5); the page renders
  it as real text in a disclosure. `999` and the team email inside transcripts
  come from `THURROCK`.
- `src/components/PosterGallery.tsx` renders the gallery: `<picture>` with
  WebP + JPEG, lazy loading, explicit width/height (no layout shift), an
  "open full size (opens in a new tab)" link, and the transcript disclosure.
- `SafetyPage.posters` added; rendered as section **6b**, after Warning signs.
- `Accordion` gained `headingLevel` (2/3/4) so transcripts nest as h4 under
  the h3 poster title without breaking heading order.
- Placement: all four on `building-safety`; the fire doors poster also on
  `fire-safety/fire-doors`; the ECFRS poster also on
  `fire-safety/stay-put-or-evacuate`.
- `THURROCK.buildingSafety.email` added
  (`buildingsafetyteam@thurrock.gov.uk`, taken from the posters). The
  `building-safety` page's contact email now points there instead of repairs.

**Conflict to resolve with Thurrock (do not guess):**

- The two Building Safety Team posters disagree on **AOV checks**: the "What
  it does" poster says *monthly*, the "Building safety checks" poster says
  *weekly*. Both transcripts are faithful to their own poster, so the site
  currently shows both. Ask which is correct, then align the posters.
- The "Building safety checks" poster says flat entrance door (FED) checks are
  **quarterly on a best endeavours basis**. Our config
  (`fireSafety.flatFireDoorCheck`) says *every 12 months*, the statutory
  minimum. Confirm which Thurrock actually operates.
- Poster check frequencies (weekly fire alarm, monthly lift and dry riser,
  quarterly building safety audits) are **not** in `THURROCK` yet and are not
  in any timescales table, because of the AOV conflict above. Add them to
  config once settled.

### Delivered after P6: building safety page rebuilt

The client was unhappy with the building safety page and pointed at Enfield
(`enfield.gov.uk/.../safety-at-home#building-safety`) and Westminster
(`westminster.gov.uk/housing/building-safety`). Enfield leads on legal
detail and lists its registered blocks; Westminster leads on resident
engagement. Both were read in full — Enfield only loads in the browser pane,
it returns 403 to WebFetch.

Two new optional `SafetyPage` fields, both data-driven so any page can use
them:

- `explainers` — extra accordions rendered as section **5b**, after "What you
  must do".
- `escalation` — a numbered "if we do not put it right" ladder rendered as
  section **6c**, after the posters.

The building safety page now has:

- The **address lookup** (`SafetyProfileLookup`, built in P6) added to the
  `TOOLS` map, so it answers "is my block higher-risk?" per address. This is
  Enfield's list-of-registered-blocks idea, personalised. **Needs the real
  Thurrock address and building data loading before it is useful in
  production** — it only has seeded fake data at ZZ1 1ZZ today.
- Six explainers: is my block higher-risk, your rights under the Act, your
  legal duties as a resident, when we need to come into your home (written
  request, reason, 48 hours notice, court order route), leaseholders, how we
  involve residents.
- A five-step escalation ladder: tell us → our building safety complaints
  process → challenge our final response → Building Safety Regulator →
  Housing Ombudsman.
- Four new verified GOV.UK / BSR sources in `SOURCES`.

New config: `buildingSafety.accessNotice` ("48 hours") and
`buildingSafetyRegulator` (0300 790 6787 and its opening hours, both read
from the live GOV.UK page rather than a summary).

**The real block list is now published.** Thurrock supplied its registered
high-rise blocks on 2026-09-06, then confirmed Perth House (Canberra Square,
Tilbury) is not one of them, leaving 15. They live in
`src/config/buildings.ts` and are rendered by `HighRiseBlockList`, collapsed
under the address lookup and grouped by area (Grays 6, Little Thurrock 3,
Tilbury 3, Chadwell St Mary 3).
The key fact tile and the "is my block higher-risk?" explainer both derive
their count from that array, so adding or removing a block updates the page.

- `flatsFrom`/`flatsTo` are read from the council's "Block 1-58 Consec"
  wording. The page says "Flats 1 to 58" rather than claiming a home count.
- `reference` (for example `0038CF01`) is the council's asset reference, not
  a dwelling UPRN. It is kept for matching against council systems and the
  ARC feed, and is deliberately never rendered.
- The address lookup still has no real data, so a resident entering
  RM17 6PR gets "We do not have safety records online for that postcode yet"
  (wording softened so it no longer contradicts the published list).
  **Loading real dwelling UPRNs, evacuation plans and check dates is the
  outstanding job** — until then the lookup is a demo.

**Content to confirm with Thurrock before go-live:**

- We state we run a building safety complaints system and have a resident
  engagement strategy, and invite residents to ask the team for a copy. Both
  come from Thurrock's own poster, but confirm the strategy is publishable
  and add it to `downloads` when it is.
- Confirm the 15-block list is complete and current, and that publishing the
  flat number ranges is acceptable.
- **Leaseholder cost protections were deliberately removed** at the client's
  request on 2026-09-06, because they are legal claims about money that the
  council should not make on a web page. The explainer now signposts the
  GOV.UK leaseholder guidance (`SOURCES.govLeaseholderProtections`), offers a
  conversation with the Building Safety Team, and advises independent legal
  advice. The "compensation window extended from 6 to 15 years" line was
  dropped from the rights explainer for the same reason. Do not reinstate
  either without legal sign-off.

## Known state / caveats

- No `downloads` on any page yet — no PDFs exist in the repo. Posters are
  separate (see the poster section above) and live in `public/posters/`.
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
   (decorative, but keep them off-text). Check every poster transcript reads
   correctly and matches its image. Lighthouse ≥ 95 on a11y and best
   practices; posters are the main weight on the building safety page, so
   confirm lazy loading is doing its job.
5. **Ops**: Coolify pre-deploy `npx prisma migrate deploy`; scheduled
   `npm run arc:sync`; back up Postgres; replace `.env.example` placeholders
   in Coolify.

## Phase checklist

See CLAUDE.md "Build phases" — P1–P6 are ticked, P7 is next.
