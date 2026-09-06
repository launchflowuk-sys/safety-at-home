import {
  BANK_HOLIDAYS_COVER_UNTIL,
  isBankHoliday,
} from "@/config/bank-holidays";

/**
 * Working-day arithmetic shared by the Awaab's Law clock (client) and the
 * damp report action (server).
 *
 * A working day is Monday to Friday, excluding England and Wales bank
 * holidays. The holiday list is generated from GOV.UK by
 * `npm run holidays:sync` and runs out eventually, so `holidaysCover()` tells
 * callers when a date is past the end of the list and the answer is therefore
 * only weekend-accurate.
 */

export function isWorkingDay(date: Date): boolean {
  const day = date.getDay();
  if (day === 0 || day === 6) return false;
  return !isBankHoliday(date);
}

/** False once a date runs past the end of the generated holiday list. */
export function holidaysCover(date: Date): boolean {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}` <= BANK_HOLIDAYS_COVER_UNTIL;
}

export function addWorkingDays(start: Date, days: number): Date {
  const result = new Date(start);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    if (isWorkingDay(result)) added++;
  }
  return result;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Signed count of working days from `from` to `to` (0 if the same day). */
export function workingDaysBetween(from: Date, to: Date): number {
  const a = startOfDay(from);
  const b = startOfDay(to);
  const sign = b >= a ? 1 : -1;
  const [start, end] = sign === 1 ? [a, b] : [b, a];
  let count = 0;
  const cursor = new Date(start);
  while (cursor < end) {
    cursor.setDate(cursor.getDate() + 1);
    if (isWorkingDay(cursor)) count++;
  }
  return count * sign;
}

/** Read the leading number out of a config string like "10 working days". */
export function leadingNumber(text: string): number {
  const match = /^\d+/.exec(text);
  if (!match) {
    throw new Error(`Config value has no leading number: "${text}"`);
  }
  return Number(match[0]);
}
