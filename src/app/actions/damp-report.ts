"use server";

import { randomBytes } from "node:crypto";
import { ORG } from "@/config/organisation";
import { getDb } from "@/lib/db";
import {
  formatPostcode,
  postcodeKey,
  validateDampReport,
  type DampReportErrors,
  type DampReportValues,
} from "@/lib/damp-report";
import { addWorkingDays, leadingNumber } from "@/lib/working-days";

export type DampReportResult =
  | { ok: true; stored: true; reference: string; investigateBy: string }
  | { ok: true; stored: false }
  | { ok: false; errors: DampReportErrors };

const INVESTIGATE_DAYS = leadingNumber(ORG.awaabsLaw.investigate);

/** Human-friendly reference like DM-7K3F9Q (no ambiguous 0/O, 1/I). */
function makeReference(): string {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = randomBytes(6);
  let out = "";
  for (const byte of bytes) out += alphabet[byte % alphabet.length];
  return `DM-${out}`;
}

/**
 * Store a damp and mould report. Re-validates on the server. When no database
 * is configured, returns { stored: false } so the client falls back to the
 * pre-filled email and the phone number — the tenant is never left with
 * nothing.
 */
export async function submitDampReport(
  values: DampReportValues,
): Promise<DampReportResult> {
  const errors = validateDampReport(values);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const db = getDb();
  if (!db) return { ok: true, stored: false };

  const postcode = formatPostcode(values.postcode);
  // End of the working day on the deadline date, so the calendar day is the
  // same whichever time zone reads it back.
  const investigateBy = addWorkingDays(new Date(), INVESTIGATE_DAYS);
  investigateBy.setHours(17, 0, 0, 0);

  // Link to a known council address when the postcode matches exactly one
  // home with the same first line; otherwise leave unlinked for triage.
  const candidates = await db.address.findMany({
    where: { postcodeKey: postcodeKey(values.postcode) },
    select: { id: true, line1: true },
  });
  const wanted = values.address.trim().toLowerCase();
  const matched = candidates.filter((c) => c.line1.toLowerCase() === wanted);
  const addressId = matched.length === 1 ? matched[0].id : undefined;

  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      const reference = makeReference();
      try {
        await db.dampReport.create({
          data: {
            reference,
            name: values.name.trim(),
            phone: values.phone.trim(),
            email: values.email.trim() || null,
            addressLine: values.address.trim(),
            postcode,
            rooms: values.rooms,
            severity: values.severity,
            duration: values.duration,
            household: values.household,
            details: values.details.trim() || null,
            investigateBy,
            addressId,
          },
        });
        return {
          ok: true,
          stored: true,
          reference,
          investigateBy: investigateBy.toISOString(),
        };
      } catch (error) {
        // Unique clash on the reference is astronomically rare; retry once
        // or twice, then fall through to the generic failure below.
        const code = (error as { code?: string }).code;
        if (code !== "P2002") throw error;
      }
    }
    return { ok: true, stored: false };
  } catch (error) {
    console.error("damp-report: failed to store", error);
    return { ok: true, stored: false };
  }
}
