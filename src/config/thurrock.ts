/**
 * Single source of truth for every phone number, email and timescale on the
 * site. Never hardcode any of these in a page or component — import from here.
 */
export const THURROCK = {
  repairs: {
    phone: "0800 074 0169",
    email: "repairs@thurrock.gov.uk",
    hours: "Free to call, 24 hours a day, 7 days a week",
  },
  housingPolicy: { phone: "01375 366 145" },
  gasLeak: { provider: "Cadent", phone: "0800 111 999" },
  blockedSewer: { provider: "Anglian Water", phone: "08457 145 145" },
  electricity: { provider: "UK Power Networks", phone: "105" },
  emergency: { phone: "999" },
  nhs: { provider: "NHS 111", phone: "111" },
  contractor: "Mears",
  timescales: {
    emergency: "24 hours",
    urgent: "5 working days",
    routine: "20 working days",
    batch: "Part of a planned programme",
  },
  awaabsLaw: {
    investigate: "10 working days",
    repairStart: "5 working days from inspection",
    emergencyHazard: "24 hours",
    writtenReport: "3 working days after the investigation ends",
  },
  fireSafety: {
    alarmTest: "once a month",
    communalFireDoorCheck: "every 3 months",
    flatFireDoorCheck: "every 12 months",
    tallBuilding: "over 11 metres tall (about 4 floors or more)",
    alarmLifespan: "10 years",
  },
  buildingSafety: {
    higherRiskBuilding: "at least 18 metres or 7 floors tall",
  },
  rightToRepair: { initial: "£10", perDay: "£2", cap: "£50" },
} as const;

/** Strip spaces so a display number can be used in a tel: href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
