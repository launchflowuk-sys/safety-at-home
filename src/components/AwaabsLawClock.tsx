"use client";

import { useId, useState } from "react";
import { THURROCK } from "@/config/thurrock";
import {
  addWorkingDays,
  leadingNumber,
  startOfDay,
  workingDaysBetween,
} from "@/lib/working-days";

/**
 * Awaab's Law clock. The tenant enters the date they told us, and optionally
 * the date we inspected, and we show the statutory deadlines and how many
 * working days are left. All maths is on the client; nothing is stored.
 */

const INVESTIGATE_DAYS = leadingNumber(THURROCK.awaabsLaw.investigate);
const REPAIR_START_DAYS = leadingNumber(THURROCK.awaabsLaw.repairStart);
const WRITTEN_REPORT_DAYS = leadingNumber(THURROCK.awaabsLaw.writtenReport);

function parseDateInput(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function describeRemaining(deadline: Date, today: Date): string {
  const remaining = workingDaysBetween(today, deadline);
  const isPast = startOfDay(deadline) < startOfDay(today);
  if (isPast) {
    // A deadline that passed over a weekend has 0 working days elapsed but
    // is still overdue, so never call it "due today".
    if (remaining === 0) return "Overdue";
    if (remaining === -1) return "Overdue by 1 working day";
    return `Overdue by ${Math.abs(remaining)} working days`;
  }
  if (remaining > 1) return `${remaining} working days left`;
  if (remaining === 1) return "1 working day left";
  return "Due today";
}

type Deadline = {
  label: string;
  detail: string;
  date: Date;
};

export function AwaabsLawClock() {
  const [reported, setReported] = useState("");
  const [inspected, setInspected] = useState("");
  const headingId = useId();
  const reportedId = useId();
  const inspectedId = useId();
  const hintId = useId();

  const reportedDate = parseDateInput(reported);
  const inspectedDate = parseDateInput(inspected);
  const today = new Date();

  const deadlines: Deadline[] = [];
  if (reportedDate) {
    deadlines.push({
      label: "We must investigate by",
      detail: `${THURROCK.awaabsLaw.investigate} after you told us.`,
      date: addWorkingDays(reportedDate, INVESTIGATE_DAYS),
    });
  }
  if (inspectedDate) {
    deadlines.push({
      label: "You should have our written summary by",
      detail: `${THURROCK.awaabsLaw.writtenReport}.`,
      date: addWorkingDays(inspectedDate, WRITTEN_REPORT_DAYS),
    });
    deadlines.push({
      label: "If there is a significant hazard, repairs must start by",
      detail: `${THURROCK.awaabsLaw.repairStart}.`,
      date: addWorkingDays(inspectedDate, REPAIR_START_DAYS),
    });
  }

  const inspectedBeforeReported =
    reportedDate && inspectedDate && inspectedDate < reportedDate;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-card border-l-8 border-brand bg-brand-wash p-6"
    >
      <h2 id={headingId} className="text-2xl font-bold">
        Work out your dates
      </h2>
      <p className="mt-2 max-w-prose">
        Enter the date you told us about the problem. We will show you the
        dates we must meet under Awaab&apos;s Law. Nothing you enter is saved
        or sent to us.
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={reportedId} className="block font-bold">
            The date you told us
          </label>
          <input
            id={reportedId}
            type="date"
            value={reported}
            onChange={(event) => setReported(event.target.value)}
            aria-describedby={hintId}
            className="mt-1 w-full rounded-card border-2 border-ink-soft bg-surface px-3 py-2 text-lg"
          />
        </div>
        <div>
          <label htmlFor={inspectedId} className="block font-bold">
            The date we inspected your home
            <span className="block text-sm font-normal text-ink-soft">
              Optional. Leave blank if we have not visited yet.
            </span>
          </label>
          <input
            id={inspectedId}
            type="date"
            value={inspected}
            onChange={(event) => setInspected(event.target.value)}
            aria-describedby={hintId}
            className="mt-1 w-full rounded-card border-2 border-ink-soft bg-surface px-3 py-2 text-lg"
          />
        </div>
      </div>
      <p id={hintId} className="mt-3 text-sm text-ink-soft">
        Working days are Monday to Friday. Bank holidays do not count either,
        so a date may be a day or two later than shown.
      </p>

      {inspectedBeforeReported && (
        <p role="alert" className="mt-4 font-semibold text-alert-deep">
          The inspection date is before the date you told us. Please check
          both dates.
        </p>
      )}

      {deadlines.length > 0 && !inspectedBeforeReported && (
        <ol
          aria-live="polite"
          className="mt-6 divide-y divide-line rounded-card border border-line bg-surface"
        >
          {deadlines.map((deadline) => (
            <li key={deadline.label} className="p-4">
              <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
                {deadline.label}
              </p>
              <p className="mt-1 text-xl font-bold">{formatDate(deadline.date)}</p>
              <p className="mt-1 text-sm text-ink-soft">{deadline.detail}</p>
              <p className="mt-1 font-semibold">
                {describeRemaining(deadline.date, today)}
              </p>
            </li>
          ))}
        </ol>
      )}

      <p className="mt-5 max-w-prose text-sm">
        <strong>Emergency hazards</strong> are different. We must investigate
        and act within {THURROCK.awaabsLaw.emergencyHazard}, whatever day it
        is.
      </p>
    </section>
  );
}
