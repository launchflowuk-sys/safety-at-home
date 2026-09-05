/**
 * Development seed — FAKE data only. Uses the impossible postcode ZZ1 1ZZ so
 * it can never be mistaken for a real Thurrock home. Run with:
 *
 *   DATABASE_URL=... npm run db:seed
 *
 * Never run against production. Real data arrives through council imports
 * (addresses, checks) and `npm run arc:sync` (asbestos).
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function monthsAgo(months: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d;
}
function monthsAhead(months: number): Date {
  return monthsAgo(-months);
}

async function main() {
  const building = await db.building.upsert({
    where: { id: "seed-example-house" },
    update: {},
    create: {
      id: "seed-example-house",
      name: "Example House",
      storeys: 8,
      heightMetres: 24,
      higherRisk: true,
      evacuationPlan: "STAY_PUT",
      lastFireRiskAssessment: monthsAgo(4),
      lastCommunalFireDoorCheck: monthsAgo(1),
    },
  });

  const flats = [1, 2, 3, 4];
  for (const n of flats) {
    const address = await db.address.upsert({
      where: { uprn: `9900000000${n}` },
      update: {},
      create: {
        uprn: `9900000000${n}`,
        line1: `Flat ${n}, Example House, Example Road`,
        postcode: "ZZ1 1ZZ",
        postcodeKey: "ZZ11ZZ",
        buildingId: building.id,
      },
    });

    const checks = [
      { type: "GAS_SERVICE", last: 5, next: 7 },
      { type: "ELECTRICAL_INSPECTION", last: 30, next: 30 },
      { type: "FLAT_FIRE_DOOR", last: 6, next: 6 },
      { type: "SMOKE_ALARM", last: 5, next: 7 },
      { type: "CO_ALARM", last: 5, next: 7 },
    ] as const;
    for (const check of checks) {
      await db.safetyCheck.upsert({
        where: { addressId_type: { addressId: address.id, type: check.type } },
        update: {},
        create: {
          addressId: address.id,
          type: check.type,
          lastDone: monthsAgo(check.last),
          nextDue: monthsAhead(check.next),
        },
      });
    }

    if (n === 2) {
      await db.asbestosRecord.upsert({
        where: { externalId: "SEED-ARC-0001" },
        update: {},
        create: {
          externalId: "SEED-ARC-0001",
          addressId: address.id,
          location: "Kitchen ceiling",
          material: "Textured coating",
          condition: "Good",
          lastInspected: monthsAgo(9),
        },
      });
    }
  }

  await db.asbestosRecord.upsert({
    where: { externalId: "SEED-ARC-0002" },
    update: {},
    create: {
      externalId: "SEED-ARC-0002",
      buildingId: building.id,
      location: "Riser cupboards on each landing",
      material: "Insulating board",
      condition: "Good, sealed",
      lastInspected: monthsAgo(2),
    },
  });

  console.log("Seeded Example House with", flats.length, "flats at ZZ1 1ZZ");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
