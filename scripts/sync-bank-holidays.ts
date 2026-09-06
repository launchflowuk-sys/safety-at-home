/**
 * Regenerate `src/config/bank-holidays.ts` from the official GOV.UK feed.
 *
 *   npm run holidays:sync
 *
 * The dates are baked into the bundle rather than fetched at runtime, so the
 * Awaab's Law clock keeps working with no network and no latency. GOV.UK
 * publishes roughly three years ahead, so re-run this once a year. The
 * generated file records how far ahead it is good for, and the clock warns
 * residents when a date falls past the end of the list.
 */
const FEED = "https://www.gov.uk/bank-holidays.json";
const OUT = "src/config/bank-holidays.ts";

type BankHolidayEvent = { date: string; title: string };

async function main() {
  const response = await fetch(FEED, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`GOV.UK feed returned HTTP ${response.status}`);

  const payload = (await response.json()) as Record<
    string,
    { division: string; events: BankHolidayEvent[] }
  >;
  const division = payload["england-and-wales"];
  if (!division?.events?.length) {
    throw new Error("Feed had no england-and-wales events");
  }

  const dates = division.events
    .map((event) => event.date)
    .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))
    .sort();
  const unique = [...new Set(dates)];
  const lastDate = unique[unique.length - 1];

  const lines = [
    "/**",
    " * England and Wales bank holidays, generated from the official GOV.UK",
    " * feed. DO NOT EDIT BY HAND — run `npm run holidays:sync` instead.",
    " *",
    ` * Source:   ${FEED}`,
    ` * Division: ${division.division}`,
    ` * Generated: ${new Date().toISOString().slice(0, 10)}`,
    ` * Covers up to: ${lastDate}`,
    " *",
    " * Working-day maths treats these as non-working days. Past this date the",
    " * calculation falls back to Monday–Friday only, and the clock says so.",
    " */",
    "export const BANK_HOLIDAYS: readonly string[] = [",
    ...unique.map((date) => `  "${date}",`),
    "];",
    "",
    "/** Last date the list covers. Beyond this, only weekends are excluded. */",
    `export const BANK_HOLIDAYS_COVER_UNTIL = "${lastDate}";`,
    "",
    "const LOOKUP = new Set(BANK_HOLIDAYS);",
    "",
    "/** True if the date is an England and Wales bank holiday. */",
    "export function isBankHoliday(date: Date): boolean {",
    "  const y = date.getFullYear();",
    '  const m = String(date.getMonth() + 1).padStart(2, "0");',
    '  const d = String(date.getDate()).padStart(2, "0");',
    "  return LOOKUP.has(`${y}-${m}-${d}`);",
    "}",
    "",
  ];

  const { writeFile } = await import("node:fs/promises");
  await writeFile(OUT, lines.join("\n"), "utf8");
  console.log(
    `Wrote ${unique.length} bank holidays to ${OUT}, covering up to ${lastDate}`,
  );
}

main().catch((error) => {
  console.error("Bank holiday sync failed:", error);
  process.exitCode = 1;
});
