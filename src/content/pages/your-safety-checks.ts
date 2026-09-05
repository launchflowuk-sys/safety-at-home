import { THURROCK } from "@/config/thurrock";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const yourSafetyChecks: SafetyPage = {
  slug: "your-safety-checks",
  title: "Your safety checks",
  summary:
    "The checks we carry out in your home and building, how often, and why you must let us in. Plus the simple checks you can do yourself.",
  keyFacts: [
    { value: THURROCK.gasSafety.serviceInterval, label: "gas safety check, free" },
    { value: THURROCK.electricalSafety.inspectionInterval, label: "electrical wiring inspection" },
    { value: THURROCK.fireSafety.alarmTest, label: "you test your smoke and carbon monoxide alarms" },
  ],
  ourResponsibilities: [
    "We write to you before every check with a date and time, and we rebook if it does not suit you.",
    "Our engineers and contractors carry ID. Ask to see it before you let anyone in.",
    "We carry out the checks in the table below, and fix any faults we find.",
    "We give you a copy of any safety certificate or report for your home.",
    "If we cannot get in after several tries, we write to you. Some checks are required by law, so as a last resort we can apply to court for access and charge the cost.",
  ],
  yourResponsibilities: [
    "Let us in for every safety check. It is a condition of your tenancy, and it protects you and your neighbours.",
    "Keep the appointment, or call us as soon as you know you cannot make it.",
    "Make sure an adult is at home for the whole visit.",
    "Clear space around the boiler, meters, fuse box and alarms so we can reach them.",
    `Test your smoke and carbon monoxide alarms ${THURROCK.fireSafety.alarmTest}.`,
    "Check your fire door closes on its own, and your window restrictors work.",
    `Run any tap or shower you have not used for a week, ${THURROCK.waterSafety.flushUnusedOutlets}.`,
  ],
  howToReport: {
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "Gas safety check of the appliances we own",
      target: THURROCK.gasSafety.serviceInterval,
    },
    {
      label: "Electrical wiring inspection",
      target: THURROCK.electricalSafety.inspectionInterval,
    },
    {
      label: "Fire risk assessment of your block",
      target: THURROCK.fireSafety.fireRiskAssessment,
    },
    {
      label: `Shared-area fire door checks, in buildings ${THURROCK.fireSafety.tallBuilding}`,
      target: THURROCK.fireSafety.communalFireDoorCheck,
    },
    {
      label: `Flat entrance fire door checks, in buildings ${THURROCK.fireSafety.tallBuilding}`,
      target: THURROCK.fireSafety.flatFireDoorCheck,
    },
    {
      label: "Smoke and carbon monoxide alarm test, by you",
      target: THURROCK.fireSafety.alarmTest,
    },
    {
      label: "Smoke alarms replaced",
      target: `About every ${THURROCK.fireSafety.alarmLifespan}`,
    },
    {
      label: "Carbon monoxide alarms replaced",
      target: `About every ${THURROCK.carbonMonoxide.alarmLifespan}`,
    },
    {
      label: "Damp or mould inspection after you report it",
      target: `Within ${THURROCK.awaabsLaw.investigate}`,
    },
  ],
  furtherReading: [SOURCES.gasSafeRegister, SOURCES.esfHome, SOURCES.ecfrsSmokeAlarms],
  related: [
    "gas-safety/annual-gas-service",
    "electrical-safety",
    "fire-safety/smoke-and-heat-alarms",
    "fire-safety/fire-doors",
    "asbestos",
  ],
};
