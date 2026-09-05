/**
 * Shared shape and validation for the damp and mould report. Used by the
 * client form (instant feedback) and re-run by the server action (never
 * trust the client).
 */

export const ROOMS = [
  "Bedroom",
  "Living room",
  "Kitchen",
  "Bathroom",
  "Hallway or stairs",
  "Somewhere else",
] as const;

export const SEVERITY = [
  "A few small spots",
  "Patches on one wall or ceiling",
  "Large areas, or in more than one room",
  "Water is coming in or dripping",
] as const;

export const DURATION = [
  "Less than a week",
  "A few weeks",
  "A few months",
  "More than a year",
] as const;

export const HOUSEHOLD = [
  "Someone with asthma or another breathing or lung condition",
  "A child under 5",
  "Someone aged 65 or over",
  "Someone who is pregnant",
  "Someone with a disability or long-term illness",
  "None of these",
] as const;

export type DampReportValues = {
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

export type DampReportErrors = Partial<Record<keyof DampReportValues, string>>;

export const EMPTY_DAMP_REPORT: DampReportValues = {
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

export const FIELD_ORDER: (keyof DampReportValues)[] = [
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

const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, phone: 30, email: 254, address: 200, postcode: 10, details: 2000 };

function oneOf(list: readonly string[], value: string) {
  return (list as readonly string[]).includes(value);
}

export function validateDampReport(values: DampReportValues): DampReportErrors {
  const errors: DampReportErrors = {};
  if (!values.name.trim()) errors.name = "Enter your name";
  else if (values.name.length > MAX.name) errors.name = "Your name must be 120 characters or fewer";

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Enter a phone number we can call you on";
  } else if (digits.length < 10 || digits.length > 13 || values.phone.length > MAX.phone) {
    errors.phone = "Enter a phone number using only numbers and spaces";
  }

  if (values.email.trim() && (!EMAIL.test(values.email.trim()) || values.email.length > MAX.email)) {
    errors.email = "Enter an email address in the correct format, like name@example.com";
  }

  if (!values.address.trim()) errors.address = "Enter your flat or house number and street";
  else if (values.address.length > MAX.address) errors.address = "Your address must be 200 characters or fewer";

  if (!values.postcode.trim()) errors.postcode = "Enter your postcode";
  else if (!POSTCODE.test(values.postcode.trim())) errors.postcode = "Enter a real postcode";

  if (values.rooms.length === 0 || !values.rooms.every((r) => oneOf(ROOMS, r))) {
    errors.rooms = "Select at least one room";
  }
  if (!oneOf(SEVERITY, values.severity)) errors.severity = "Select how bad the damp or mould is";
  if (!oneOf(DURATION, values.duration)) errors.duration = "Select how long it has been there";
  if (values.household.length === 0 || !values.household.every((h) => oneOf(HOUSEHOLD, h))) {
    errors.household = "Select who lives in your home, or 'None of these'";
  }
  if (values.details.length > MAX.details) errors.details = "Keep this to 2,000 characters or fewer";
  return errors;
}

/** "rm17 6sl" -> "RM17 6SL" */
export function formatPostcode(raw: string): string {
  const key = raw.replace(/\s+/g, "").toUpperCase();
  return key.length > 3 ? `${key.slice(0, -3)} ${key.slice(-3)}` : key;
}

/** "rm17 6sl" -> "RM176SL" */
export function postcodeKey(raw: string): string {
  return raw.replace(/\s+/g, "").toUpperCase();
}
