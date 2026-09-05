"use server";

import { getDb } from "@/lib/db";
import { postcodeKey } from "@/lib/damp-report";

/**
 * Address lookup and the per-address safety profile.
 *
 * Access decision (Phase 6, no auth): the profile is shown to anyone who can
 * name a council address, so it contains no personal data and every date is
 * coarsened to month and year. It tells a tenant what plan their block uses,
 * whether it is a higher-risk building, roughly when the last checks were
 * done, and where asbestos is recorded so they do not disturb it. Nothing
 * here would help someone target a specific person.
 */

export type AddressOption = { id: string; line1: string };

export type SafetyProfile = {
  address: { line1: string; postcode: string };
  building: {
    name: string;
    higherRisk: boolean;
    evacuationPlan: "STAY_PUT" | "SIMULTANEOUS_EVACUATION";
    lastFireRiskAssessment: string | null;
    lastCommunalFireDoorCheck: string | null;
  } | null;
  checks: { type: string; lastDone: string | null; nextDue: string | null }[];
  asbestos: {
    location: string;
    material: string;
    condition: string;
    lastInspected: string | null;
  }[];
};

export type LookupResult =
  | { available: false }
  | { available: true; addresses: AddressOption[] };

const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;

/** "September 2026" — never a full date, see access note above. */
function monthYear(date: Date | null): string | null {
  if (!date) return null;
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export async function findAddresses(postcode: string): Promise<LookupResult> {
  const db = getDb();
  if (!db) return { available: false };
  if (!POSTCODE.test(postcode.trim())) return { available: true, addresses: [] };

  const rows = await db.address.findMany({
    where: { postcodeKey: postcodeKey(postcode) },
    select: { id: true, line1: true },
    orderBy: { line1: "asc" },
    take: 200,
  });
  return { available: true, addresses: rows };
}

export async function getSafetyProfile(
  addressId: string,
): Promise<SafetyProfile | null> {
  const db = getDb();
  if (!db || typeof addressId !== "string" || addressId.length > 64) return null;

  const address = await db.address.findUnique({
    where: { id: addressId },
    include: {
      building: { include: { asbestosRecords: true } },
      checks: true,
      asbestosRecords: true,
    },
  });
  if (!address) return null;

  const asbestos = [
    ...address.asbestosRecords,
    ...(address.building?.asbestosRecords ?? []),
  ];

  return {
    address: { line1: address.line1, postcode: address.postcode },
    building: address.building
      ? {
          name: address.building.name,
          higherRisk: address.building.higherRisk,
          evacuationPlan: address.building.evacuationPlan,
          lastFireRiskAssessment: monthYear(address.building.lastFireRiskAssessment),
          lastCommunalFireDoorCheck: monthYear(address.building.lastCommunalFireDoorCheck),
        }
      : null,
    checks: address.checks.map((check) => ({
      type: check.type,
      lastDone: monthYear(check.lastDone),
      nextDue: monthYear(check.nextDue),
    })),
    asbestos: asbestos.map((record) => ({
      location: record.location,
      material: record.material,
      condition: record.condition,
      lastInspected: monthYear(record.lastInspected),
    })),
  };
}
