/**
 * Single source of truth for the landlord's identity, every phone number,
 * email and timescale on the site. Never hardcode any of these in a page or
 * component — import from here.
 *
 * ⚠️ PLACEHOLDER CONTACT DETAILS ⚠️
 * The landlord's own name, phone numbers and email addresses below are
 * deliberately fictional while the site is a demonstration. They use ranges
 * reserved for examples so they can never reach a real person or inbox:
 *   - 0808 157 0xxx and 01632 960xxx are Ofcom's reserved drama numbers
 *   - example.org is reserved by RFC 2606
 * Swap them for the real ones in this file before the site goes live, and
 * nothing else needs to change.
 *
 * Numbers marked "real" below are genuine national services and must stay as
 * they are — replacing them would make the safety advice wrong.
 */
export const ORG = {
  /** The landlord. Shown in the header, footer and page titles. */
  name: "Housing Organisation",
  repairs: {
    phone: "0808 157 0100", // placeholder
    email: "repairs@example.org", // placeholder
    hours: "Free to call, 24 hours a day, 7 days a week",
  },
  housingPolicy: { phone: "01632 960 100" }, // placeholder
  /** real — National Gas Emergency Service, free, 24 hours, all of GB. */
  gasLeak: { provider: "National Gas Emergency Service", phone: "0800 111 999" },
  blockedSewer: { provider: "your water company", phone: "01632 960 200" }, // placeholder
  /** real — 105 reaches every electricity network operator in England. */
  electricity: { provider: "your electricity network operator", phone: "105" },
  emergency: { phone: "999" }, // real
  nhs: { provider: "NHS 111", phone: "111" }, // real
  police: { provider: "the police", nonEmergency: "101" }, // real
  contractor: "our repairs contractor",
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
    fireDoorRating: "30 minutes",
    fireRiskAssessment: "at least every 12 months in blocks of flats",
  },
  buildingSafety: {
    higherRiskBuilding: "at least 18 metres or 7 floors tall",
    email: "buildingsafety@example.org", // placeholder
    /** Written notice we must give before asking to enter a home. */
    accessNotice: "48 hours",
  },
  /** real — the national regulator, read from GOV.UK. */
  buildingSafetyRegulator: {
    provider: "Building Safety Regulator",
    phone: "0300 790 6787",
    hours:
      "Monday, Tuesday, Thursday and Friday 8:30am to 5pm. Wednesday 10am to 5pm. Closed weekends and bank holidays",
  },
  gasSafety: {
    serviceInterval: "every 12 months",
    recordCopy: "within 28 days of the check",
    reminderBefore: "about 8 weeks before it is due",
  },
  electricalSafety: { inspectionInterval: "every 5 years" },
  carbonMonoxide: { alarmLifespan: "7 to 10 years" },
  waterSafety: {
    flushUnusedOutlets: "at least once a week",
    cleanShowerHead: "every 3 months",
  },
  communalAreas: {
    removalNotice: "7 days",
  },
  rightToRepair: { initial: "£10", perDay: "£2", cap: "£50" },
} as const;

/** Strip spaces so a display number can be used in a tel: href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
