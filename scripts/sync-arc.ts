/**
 * Sync the ARC asbestos register into the AsbestosRecord table.
 *
 * Run on a schedule (Coolify cron or similar), never at web request time:
 *
 *   DATABASE_URL=... ARC_FEED_URL=... [ARC_FEED_TOKEN=...] npm run arc:sync
 *
 * ASSUMED FEED SHAPE (confirm with the ARC vendor and adjust `parseRecord`):
 *   [
 *     { "id": "ARC-123", "uprn": "100091234567", "location": "Kitchen ceiling",
 *       "material": "Textured coating", "condition": "Good",
 *       "lastInspected": "2026-03-14" },
 *     ...
 *   ]
 * Records whose UPRN is not a known Address are stored unlinked so they are
 * not lost; link them when the address import catches up.
 */
import { PrismaClient } from "@prisma/client";

type ArcRecord = {
  id: string;
  uprn: string;
  location: string;
  material: string;
  condition: string;
  lastInspected: string | null;
};

const db = new PrismaClient();

function parseRecord(raw: unknown): ArcRecord | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const id = str(r.id);
  const uprn = str(r.uprn);
  const location = str(r.location);
  const material = str(r.material);
  if (!id || !uprn || !location || !material) return null;
  const lastInspected = str(r.lastInspected);
  return {
    id,
    uprn,
    location,
    material,
    condition: str(r.condition) || "Unknown",
    lastInspected: lastInspected && !Number.isNaN(Date.parse(lastInspected)) ? lastInspected : null,
  };
}

async function main() {
  const url = process.env.ARC_FEED_URL;
  if (!url) throw new Error("ARC_FEED_URL is not set");

  const headers: Record<string, string> = { Accept: "application/json" };
  if (process.env.ARC_FEED_TOKEN) {
    headers.Authorization = `Bearer ${process.env.ARC_FEED_TOKEN}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`ARC feed returned HTTP ${response.status}`);
  const payload = (await response.json()) as unknown;
  if (!Array.isArray(payload)) throw new Error("ARC feed is not a JSON array");

  let upserted = 0;
  let skipped = 0;
  let unlinked = 0;

  for (const raw of payload) {
    const record = parseRecord(raw);
    if (!record) {
      skipped++;
      continue;
    }
    const address = await db.address.findUnique({
      where: { uprn: record.uprn },
      select: { id: true },
    });
    if (!address) unlinked++;

    const data = {
      addressId: address?.id ?? null,
      location: record.location,
      material: record.material,
      condition: record.condition,
      lastInspected: record.lastInspected ? new Date(record.lastInspected) : null,
      syncedAt: new Date(),
    };
    await db.asbestosRecord.upsert({
      where: { externalId: record.id },
      update: data,
      create: { externalId: record.id, ...data },
    });
    upserted++;
  }

  console.log(
    `ARC sync: ${upserted} records upserted, ${unlinked} without a matching address, ${skipped} skipped as malformed`,
  );
}

main()
  .catch((error) => {
    console.error("ARC sync failed:", error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
