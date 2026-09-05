"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SITE_NAME } from "@/config/navigation";
import { THURROCK, telHref } from "@/config/thurrock";

/**
 * Client-only damp and mould report form (Phase 3).
 *
 * Nothing is posted or stored. On a valid submit we show the answers back,
 * make clear we have NOT received them, and offer a pre-filled email plus the
 * repairs number so the tenant can still report today. Phase 6 replaces the
 * mailto with a real submission.
 *
 * Follows the GOV.UK form pattern: error summary at the top that receives
 * focus, inline errors linked with aria-describedby, one question per group.
 */

const ROOMS = [
  "Bedroom",
  "Living room",
  "Kitchen",
  "Bathroom",
  "Hallway or stairs",
  "Somewhere else",
] as const;

const SEVERITY = [
  "A few small spots",
  "Patches on one wall or ceiling",
  "Large areas, or in more than one room",
  "Water is coming in or dripping",
] as const;

const DURATION = [
  "Less than a week",
  "A few weeks",
  "A few months",
  "More than a year",
] as const;

const HOUSEHOLD = [
  "Someone with asthma or another breathing or lung condition",
  "A child under 5",
  "Someone aged 65 or over",
  "Someone who is pregnant",
  "Someone with a disability or long-term illness",
  "None of these",
] as const;

type FormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  rooms: string[];
  severity: string;
  duration: string;
  household: string[];
  details: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  postcode: "",
  rooms: [],
  severity: "",
  duration: "",
  household: [],
  details: "",
};

const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name";
  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Enter a phone number we can call you on";
  } else if (digits.length < 10 || digits.length > 13) {
    errors.phone = "Enter a phone number using only numbers and spaces";
  }
  if (values.email.trim() && !EMAIL.test(values.email.trim())) {
    errors.email =
      "Enter an email address in the correct format, like name@example.com";
  }
  if (!values.address.trim()) {
    errors.address = "Enter your flat or house number and street";
  }
  if (!values.postcode.trim()) {
    errors.postcode = "Enter your postcode";
  } else if (!POSTCODE.test(values.postcode.trim())) {
    errors.postcode = "Enter a real postcode";
  }
  if (values.rooms.length === 0) errors.rooms = "Select at least one room";
  if (!values.severity) {
    errors.severity = "Select how bad the damp or mould is";
  }
  if (!values.duration) errors.duration = "Select how long it has been there";
  if (values.household.length === 0) {
    errors.household = "Select who lives in your home, or 'None of these'";
  }
  return errors;
}

const FIELD_ORDER: (keyof FormValues)[] = [
  "name",
  "phone",
  "email",
  "address",
  "postcode",
  "rooms",
  "severity",
  "duration",
  "household",
];

export function ReportDampForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const prefix = useId();
  const id = (field: string) => `${prefix}-${field}`;

  const errorKeys = FIELD_ORDER.filter((key) => errors[key]);

  useEffect(() => {
    if (errorKeys.length > 0) errorSummaryRef.current?.focus();
  }, [errorKeys.length]);

  useEffect(() => {
    if (submitted) confirmationRef.current?.focus();
  }, [submitted]);

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
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

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <Confirmation
        values={values}
        headingRef={confirmationRef}
        onChange={() => setSubmitted(false)}
      />
    );
  }

  const inputClass = (key: keyof FormValues) =>
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
        <textarea
          id={id("details")}
          value={values.details}
          onChange={(event) => set("details", event.target.value)}
          rows={5}
          className="mt-2 w-full max-w-xl rounded-card border-2 border-ink-soft bg-surface px-3 py-2 text-lg"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-card bg-positive px-6 py-3 text-lg font-bold text-white hover:brightness-90"
        >
          Check your answers
        </button>
        <p className="text-sm text-ink-soft">
          Nothing is sent until you choose how to send it on the next screen.
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
  values: FormValues;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onChange: () => void;
}) {
  const { values } = props;
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Phone", values.phone],
    ["Email", values.email || "Not given"],
    ["Address", `${values.address}, ${values.postcode.toUpperCase()}`],
    ["Rooms affected", values.rooms.join(", ")],
    ["How bad", values.severity],
    ["How long", values.duration],
    ["In your home", values.household.join(", ")],
    ["Anything else", values.details || "Nothing added"],
  ];

  const body = [
    "Damp and mould report",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Sent from the ${SITE_NAME} website. Under Awaab's Law you must inspect within ${THURROCK.awaabsLaw.investigate}.`,
  ].join("\n");

  const mailto = `mailto:${THURROCK.repairs.email}?subject=${encodeURIComponent(
    `Damp and mould report – ${values.postcode.toUpperCase()}`,
  )}&body=${encodeURIComponent(body)}`;

  const urgent = values.severity === SEVERITY[3];

  return (
    <div className="mt-8">
      <h2
        ref={props.headingRef}
        tabIndex={-1}
        className="text-2xl font-bold"
      >
        Check your answers, then send them to us
      </h2>

      <div
        role="status"
        className="mt-4 rounded-card border-l-8 border-alert bg-alert-wash p-5"
      >
        <p className="font-bold">We have not received your report yet.</p>
        <p className="mt-1">
          This online form is still being tested. Send your answers by email
          below, or call us. Either way, the Awaab&apos;s Law clock starts as
          soon as we get them.
        </p>
      </div>

      {urgent && (
        <p className="mt-4 max-w-prose font-semibold">
          You said water is coming in. Please call us now on{" "}
          <a
            href={telHref(THURROCK.repairs.phone)}
            className="text-link underline underline-offset-2"
          >
            {THURROCK.repairs.phone}
          </a>{" "}
          rather than emailing. We treat leaks as an emergency.
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
        <a
          href={mailto}
          className="rounded-card bg-positive px-6 py-3 text-lg font-bold text-white hover:brightness-90"
        >
          Email this report to us
        </a>
        <a
          href={telHref(THURROCK.repairs.phone)}
          className="rounded-card border-2 border-brand px-6 py-3 text-lg font-bold text-brand hover:bg-brand-wash"
        >
          Call {THURROCK.repairs.phone}
        </a>
        <button
          type="button"
          onClick={props.onChange}
          className="font-semibold text-link underline underline-offset-2"
        >
          Change my answers
        </button>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        The email button opens your own email app with your answers filled
        in. {THURROCK.repairs.hours}.
      </p>
    </div>
  );
}
