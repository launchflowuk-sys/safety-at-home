/**
 * Working-day arithmetic shared by the Awaab's Law clock (client) and the
 * damp report action (server). Working days are Monday to Friday. Bank
 * holidays are not yet excluded — see HANDOFF.md.
 */

export function isWorkingDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
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
