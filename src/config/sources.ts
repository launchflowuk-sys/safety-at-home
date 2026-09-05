/**
 * Trusted external sources used in "Find out more" sections. Official bodies
 * only. Every URL here was checked to load on 2026-09-05 — re-check before
 * adding or changing one, and never link to a page you have not opened.
 */
export type Source = { label: string; href: string; source: string };

const ECFRS = "Essex County Fire and Rescue Service";

export const SOURCES = {
  ecfrsHomeSafety: {
    label: "Home fire safety advice",
    href: "https://www.essex-fire.gov.uk/home-safety-advice",
    source: ECFRS,
  },
  ecfrsHomeVisit: {
    label: "Book a free home safety visit",
    href: "https://www.essex-fire.gov.uk/book-home-safety-visit",
    source: ECFRS,
  },
  ecfrsSmokeAlarms: {
    label: "Smoke alarms: where to fit them and how to test them",
    href: "https://www.essex-fire.gov.uk/smoke-alarms",
    source: ECFRS,
  },
  ecfrsCooking: {
    label: "Cooking safely",
    href: "https://www.essex-fire.gov.uk/safety-advice/home-fire-safety/cooking-safety",
    source: ECFRS,
  },
  ecfrsHighRise: {
    label: "Fire safety in high-rise buildings",
    href: "https://www.essex-fire.gov.uk/high-rise-accomodation",
    source: ECFRS,
  },
  cadentEmergencies: {
    label: "What to do if you smell gas",
    href: "https://cadentgas.com/emergencies",
    source: "Cadent (National Gas Emergency Service)",
  },
  gasSafeRegister: {
    label: "Check an engineer is Gas Safe registered",
    href: "https://www.gassaferegister.co.uk/",
    source: "Gas Safe Register",
  },
  nhsCarbonMonoxide: {
    label: "Carbon monoxide poisoning: symptoms and what to do",
    href: "https://www.nhs.uk/conditions/carbon-monoxide-poisoning/",
    source: "NHS",
  },
  esfHome: {
    label: "Electrical safety advice for your home",
    href: "https://www.electricalsafetyfirst.org.uk/safety-advice/home-and-people/",
    source: "Electrical Safety First",
  },
  ukpnPowerCut: {
    label: "Report or check a power cut",
    href: "https://www.ukpowernetworks.co.uk/power-cut",
    source: "UK Power Networks",
  },
  govDampHealth: {
    label: "Damp and mould: the health risks and what landlords must do",
    href: "https://www.gov.uk/government/publications/damp-and-mould-understanding-and-addressing-the-health-risks-for-rented-housing-providers/understanding-and-addressing-the-health-risks-of-damp-and-mould-in-the-home--2",
    source: "GOV.UK",
  },
  govAwaabsLaw: {
    label: "Awaab's Law: guidance for social landlords",
    href: "https://www.gov.uk/government/publications/awaabs-law-guidance-for-social-landlords",
    source: "GOV.UK",
  },
  housingOmbudsman: {
    label: "Make a complaint if we do not put things right",
    href: "https://www.housing-ombudsman.org.uk/",
    source: "Housing Ombudsman Service",
  },
  govBsr: {
    label: "The Building Safety Regulator",
    href: "https://www.gov.uk/government/organisations/building-safety-regulator",
    source: "GOV.UK",
  },
  hseBuildingSafety: {
    label: "Building safety: how the law protects residents",
    href: "https://www.hse.gov.uk/building-safety/",
    source: "Health and Safety Executive",
  },
  hseLegionella: {
    label: "Legionella and Legionnaires' disease",
    href: "https://www.hse.gov.uk/legionnaires/",
    source: "Health and Safety Executive",
  },
  anglianReport: {
    label: "Report a blocked sewer or flooding",
    href: "https://www.anglianwater.co.uk/your-local-area/report-an-issue/",
    source: "Anglian Water",
  },
  hseAsbestos: {
    label: "Asbestos: where it is found and how to stay safe",
    href: "https://www.hse.gov.uk/asbestos/",
    source: "Health and Safety Executive",
  },
  lfbChargeSafe: {
    label: "Charging e-bikes and e-scooters safely (ChargeSafe)",
    href: "https://www.london-fire.gov.uk/chargesafe/",
    source: "London Fire Brigade",
  },
  thurrockHousing: {
    label: "Council housing on the Thurrock Council website",
    href: "https://www.thurrock.gov.uk/housing",
    source: "Thurrock Council",
  },
} as const satisfies Record<string, Source>;
