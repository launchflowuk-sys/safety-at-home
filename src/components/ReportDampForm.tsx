"use client";

import { useEffect, useId, useRef, useState } from "react";
import { submitDampReport } from "@/app/actions/damp-report";
import { SITE_NAME } from "@/config/navigation";
import { ORG, telHref } from "@/config/organisation";
import {
  DURATION,
  EMPTY_DAMP_REPORT,
  FIELD_ORDER,
  HOUSEHOLD,
  ROOMS,
  SEVERITY,
  formatPostcode,
  validateDampReport,
  type DampReportErrors,
  type DampReportValues,
} from "@/lib/damp-report";

/**
 * Damp and mould report form (Phase 6).
 *
 * Validates on the client for instant feedback, then submits through a server
 * action which re-validates and stores the report when a database is
 * configured. If there is no database (or storing fails) the tenant sees
 * their answers, is told clearly that we have NOT received them, and gets a
 * pre-filled email plus the repairs number — never a dead end.
 *
 * Follows the GOV.UK form pattern: error summary at the top that receives
 * focus, inline errors linked with aria-describedby, one question per group.
 */

type Outcome =
  | { kind: "stored"; reference: string; investigateBy: Date }
  | { kind: "fallback" };

export function ReportDampForm() {
  const [values, setValues] = useState<DampReportValues>(EMPTY_DAMP_REPORT);
  const [errors, setErrors] = useState<DampReportErrors>({});
  const [pending, setPending] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const prefix = useId();
  const id = (field: string) => `${prefix}-${field}`;

  const errorKeys = FIELD_ORDER.filter((key) => errors[key]);

  useEffect(() => {
    if (errorKeys.length > 0) errorSummaryRef.current?.focus();
  }, [errorKeys.length]);

  useEffect(() => {
    if (outcome) confirmationRef.current?.focus();
  }, [outcome]);

  function set<K extends keyof DampReportValues>(key: K, value: DampReportValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function toggle(key: "rooms" | "household", option: string) {
    setValues((current) => {
      let list = current[key];
      if (key === "household" && option === "None of these") {
        list = list.includes(option) ? [] : [option];
      } else {
        list = list.includes(option)
          ? list.filter((item) => item !== option)
          : [...list.filter((item) => item !== "None of these"), option];
      }
      return { ...current, [key]: list };
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clientErrors = validateDampReport(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setPending(true);
    try {
      const result = await submitDampReport(values);
      if (!result.ok) {
        setErrors(result.errors);
      } else if (result.stored) {
        setOutcome({
          kind: "stored",
          reference: result.reference,
          investigateBy: new Date(result.investigateBy),
        });
      } else {
        setOutcome({ kind: "fallback" });
      }
    } catch {
      setOutcome({ kind: "fallback" });
    } finally {
      setPending(false);
    }
  }

  if (outcome) {
    return (
      <Confirmation
        values={values}
        outcome={outcome}
        headingRef={confirmationRef}
        onChange={() => setOutcome(null)}
      />
    );
  }

  const inputClass = (key: keyof DampReportValues) =>
    `mt-1 w-full max-w-md rounded-card border-2 bg-surface px-3 py-2 text-lg ${
      errors[key] ? "border-alert" : "border-ink-soft"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 space-y-10">
      {errorKeys.length > 0 && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-card border-4 border-alert bg-surface p-5"
        >
          <h2 className="text-xl font-bold">There is a problem</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {errorKeys.map((key) => (
              <li key={key}>
                <a
                  href={`#${id(key)}`}
                  className="font-semibold text-alert-deep underline underline-offset-2"
                >
                  {errors[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="space-y-6">
        <legend className="text-2xl font-bold">About you</legend>

        <TextField
          id={id("name")}
          label="Your full name"
          value={values.name}
          error={errors.name}
          onChange={(v) => set("name", v)}
          className={inputClass("name")}
          autoComplete="name"
        />
        <TextField
          id={id("phone")}
          label="Phone number"
          hint="We will call you to arrange a visit."
          value={values.phone}
          error={errors.phone}
          onChange={(v) => set("phone", v)}
          className={inputClass("phone")}
          type="tel"
          autoComplete="tel"
        />
        <TextField
          id={id("email")}
          label="Email address (optional)"
          value={values.email}
          error={errors.email}
          onChange={(v) => set("email", v)}
          className={inputClass("email")}
          type="email"
          autoComplete="email"
        />
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="text-2xl font-bold">Your address</legend>
        <TextField
          id={id("address")}
          label="Flat or house number and street"
          value={values.address}
          error={errors.address}
          onChange={(v) => set("address", v)}
          className={inputClass("address")}
          autoComplete="street-address"
        />
        <TextField
          id={id("postcode")}
          label="Postcode"
          value={values.postcode}
          error={errors.postcode}
          onChange={(v) => set("postcode", v)}
          className={`${inputClass("postcode")} max-w-xs uppercase`}
          autoComplete="postal-code"
        />
      </fieldset>

      <CheckboxGroup
        id={id("rooms")}
        legend="Which rooms have damp or mould?"
        hint="Select all that apply."
        options={ROOMS}
        selected={values.rooms}
        error={errors.rooms}
        onToggle={(option) => toggle("rooms", option)}
      />

      <RadioGroup
        id={id("severity")}
        legend="How bad is it?"
        options={SEVERITY}
        selected={values.severity}
        error={errors.severity}
        onChange={(v) => set("severity", v)}
      />

      <RadioGroup
        id={id("duration")}
        legend="How long has it been there?"
        options={DURATION}
        selected={values.duration}
        error={errors.duration}
        onChange={(v) => set("duration", v)}
      />

      <CheckboxGroup
        id={id("household")}
        legend="Does anyone in your home fit any of these?"
        hint="This helps us decide how quickly to visit. Select all that apply."
        options={HOUSEHOLD}
        selected={values.household}
        error={errors.household}
        onToggle={(option) => toggle("household", option)}
      />

      <div>
        <label htmlFor={id("details")} className="block text-xl font-bold">
          Anything else we should know? (optional)
        </label>
        <p className="mt-1 text-sm text-ink-soft">
          For example, when it is worst, or if you have already reported it.
        </p>
        {errors.details && (
          <p className="mt-1 font-semibold text-alert-deep">
            <span className="sr-only">Error: </span>
            {errors.details}
          </p>
        )}
        <textarea
          id={id("details")}
          value={values.details}
          onChange={(event) => set("details", event.target.value)}
          rows={5}
          maxLength={2000}
          className="mt-2 w-full max-w-xl rounded-card border-2 border-ink-soft bg-surface px-3 py-2 text-lg"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-card bg-positive px-6 py-3 text-lg font-bold text-white hover:brightness-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send your report"}
        </button>
        <p className="text-sm text-ink-soft">
          We will show you a reference number once we have it.
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------------ */

function TextField(props: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  className: string;
  type?: string;
  autoComplete?: string;
}) {
  const hintId = `${props.id}-hint`;
  const errorId = `${props.id}-error`;
  const describedBy =
    [props.hint ? hintId : null, props.error ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <div>
      <label htmlFor={props.id} className="block text-lg font-bold">
        {props.label}
      </label>
      {props.hint && (
        <p id={hintId} className="mt-1 text-sm text-ink-soft">
          {props.hint}
        </p>
      )}
      {props.error && (
        <p id={errorId} className="mt-1 font-semibold text-alert-deep">
          <span className="sr-only">Error: </span>
          {props.error}
        </p>
      )}
      <input
        id={props.id}
        type={props.type ?? "text"}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        aria-describedby={describedBy}
        aria-invalid={props.error ? true : undefined}
        autoComplete={props.autoComplete}
        className={props.className}
      />
    </div>
  );
}

function CheckboxGroup(props: {
  id: string;
  legend: string;
  hint?: string;
  options: readonly string[];
  selected: string[];
  error?: string;
  onToggle: (option: string) => void;
}) {
  const hintId = `${props.id}-hint`;
  const errorId = `${props.id}-error`;
  const describedBy =
    [props.hint ? hintId : null, props.error ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <fieldset
      id={props.id}
      aria-describedby={describedBy}
      className={`space-y-3 ${props.error ? "border-l-8 border-alert pl-4" : ""}`}
    >
      <legend className="text-xl font-bold">{props.legend}</legend>
      {props.hint && (
        <p id={hintId} className="text-sm text-ink-soft">
          {props.hint}
        </p>
      )}
      {props.error && (
        <p id={errorId} className="font-semibold text-alert-deep">
          <span className="sr-only">Error: </span>
          {props.error}
        </p>
      )}
      {props.options.map((option, index) => {
        const optionId = `${props.id}-${index}`;
        return (
          <div key={option} className="flex items-start gap-3">
            <input
              id={optionId}
              type="checkbox"
              checked={props.selected.includes(option)}
              onChange={() => props.onToggle(option)}
              className="mt-1 h-6 w-6 shrink-0 accent-brand"
            />
            <label htmlFor={optionId} className="text-lg">
              {option}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

function RadioGroup(props: {
  id: string;
  legend: string;
  options: readonly string[];
  selected: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const errorId = `${props.id}-error`;
  return (
    <fieldset
      id={props.id}
      aria-describedby={props.error ? errorId : undefined}
      className={`space-y-3 ${props.error ? "border-l-8 border-alert pl-4" : ""}`}
    >
      <legend className="text-xl font-bold">{props.legend}</legend>
      {props.error && (
        <p id={errorId} className="font-semibold text-alert-deep">
          <span className="sr-only">Error: </span>
          {props.error}
        </p>
      )}
      {props.options.map((option, index) => {
        const optionId = `${props.id}-${index}`;
        return (
          <div key={option} className="flex items-start gap-3">
            <input
              id={optionId}
              type="radio"
              name={props.id}
              checked={props.selected === option}
              onChange={() => props.onChange(option)}
              className="mt-1 h-6 w-6 shrink-0 accent-brand"
            />
            <label htmlFor={optionId} className="text-lg">
              {option}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

/* ------------------------------------------------------------------------ */

function Confirmation(props: {
  values: DampReportValues;
  outcome: Outcome;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onChange: () => void;
}) {
  const { values, outcome } = props;
  const postcode = formatPostcode(values.postcode);
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Phone", values.phone],
    ["Email", values.email || "Not given"],
    ["Address", `${values.address}, ${postcode}`],
    ["Rooms affected", values.rooms.join(", ")],
    ["How bad", values.severity],
    ["How long", values.duration],
    ["In your home", values.household.join(", ")],
    ["Anything else", values.details || "Nothing added"],
  ];

  const urgent = values.severity === SEVERITY[3];

  const body = [
    "Damp and mould report",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Sent from the ${SITE_NAME} website. Under Awaab's Law you must inspect within ${ORG.awaabsLaw.investigate}.`,
  ].join("\n");
  const mailto = `mailto:${ORG.repairs.email}?subject=${encodeURIComponent(
    `Damp and mould report – ${postcode}`,
  )}&body=${encodeURIComponent(body)}`;

  const stored = outcome.kind === "stored";

  return (
    <div className="mt-8">
      <h2 ref={props.headingRef} tabIndex={-1} className="text-2xl font-bold">
        {stored ? "We have received your report" : "Check your answers, then send them to us"}
      </h2>

      {stored ? (
        <div
          role="status"
          className="mt-4 rounded-card border-l-8 border-positive bg-surface p-5 shadow-card"
        >
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            Your reference
          </p>
          <p className="mt-1 text-3xl font-bold tracking-wide">{outcome.reference}</p>
          <p className="mt-3 max-w-prose">
            Write this down or take a screenshot. Under Awaab&apos;s Law we
            must inspect your home by{" "}
            <strong>
              {outcome.investigateBy.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </strong>
            . We will call you on {values.phone} to arrange it.
          </p>
        </div>
      ) : (
        <div
          role="status"
          className="mt-4 rounded-card border-l-8 border-alert bg-alert-wash p-5"
        >
          <p className="font-bold">We have not received your report yet.</p>
          <p className="mt-1">
            Our online reporting is not available right now. Send your answers
            by email below, or call us. Either way, the Awaab&apos;s Law clock
            starts as soon as we get them.
          </p>
        </div>
      )}

      {urgent && (
        <p className="mt-4 max-w-prose font-semibold">
          You said water is coming in. Please call us now on{" "}
          <a
            href={telHref(ORG.repairs.phone)}
            className="text-link underline underline-offset-2"
          >
            {ORG.repairs.phone}
          </a>
          . We treat leaks as an emergency.
        </p>
      )}

      <dl className="mt-6 divide-y divide-line rounded-card border border-line bg-surface">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 p-4 sm:grid-cols-3">
            <dt className="font-bold">{label}</dt>
            <dd className="sm:col-span-2">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {!stored && (
          <a
            href={mailto}
            className="rounded-card bg-positive px-6 py-3 text-lg font-bold text-white hover:brightness-90"
          >
            Email this report to us
          </a>
        )}
        <a
          href={telHref(ORG.repairs.phone)}
          className="rounded-card border-2 border-brand px-6 py-3 text-lg font-bold text-brand hover:bg-brand-wash"
        >
          Call {ORG.repairs.phone}
        </a>
        {!stored && (
          <button
            type="button"
            onClick={props.onChange}
            className="font-semibold text-link underline underline-offset-2"
          >
            Change my answers
          </button>
        )}
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        {stored
          ? `If anything changes, call us and quote your reference. ${ORG.repairs.hours}.`
          : `The email button opens your own email app with your answers filled in. ${ORG.repairs.hours}.`}
      </p>
    </div>
  );
}
