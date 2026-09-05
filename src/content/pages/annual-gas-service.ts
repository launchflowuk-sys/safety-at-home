import { THURROCK } from "@/config/thurrock";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const annualGasService: SafetyPage = {
  slug: "gas-safety/annual-gas-service",
  title: "Your annual gas service",
  summary:
    "Every home with gas gets a free safety check once a year. Find out what happens, how to get ready, and why you must let us in.",
  emergency: {
    label: "If you smell gas",
    phone: THURROCK.gasLeak.phone,
    instructions: [
      "Open doors and windows. Do not use switches, flames or your phone indoors.",
      `Go outside and call ${THURROCK.gasLeak.provider} on ${THURROCK.gasLeak.phone}. It is free and open 24 hours.`,
    ],
  },
  keyFacts: [
    { value: THURROCK.gasSafety.serviceInterval, label: "we check your gas appliances" },
    { value: THURROCK.gasSafety.reminderBefore, label: "we write to you with an appointment" },
    { value: THURROCK.gasSafety.recordCopy, label: "you get a copy of your gas safety record" },
  ],
  ourResponsibilities: [
    `We write to you ${THURROCK.gasSafety.reminderBefore} with an appointment. If the time does not suit you, you can change it.`,
    "Our engineer checks the boiler, gas fire and pipework we own, plus the flue and air vents. If we own your cooker, we check that too.",
    "We test your carbon monoxide alarm and your smoke alarms while we are there.",
    "We fix small faults on the day where we can, and book a follow-up for anything bigger.",
    `We give you a copy of the gas safety record ${THURROCK.gasSafety.recordCopy}. Keep it safe.`,
    "If we cannot get in, we try again and write to you. We must complete the check by law, so we may take legal action to gain access as a last resort.",
  ],
  yourResponsibilities: [
    "Keep the appointment, or call us to rebook as soon as you know you cannot make it.",
    "Let us in. Letting us do the check is part of your tenancy agreement.",
    "Clear the space in front of the boiler, gas fire and meter so the engineer can reach them.",
    "Make sure the gas and electricity are on. If you have a prepayment meter, top it up first.",
    "Ask to see the engineer's Gas Safe ID card before you let them in.",
    "Be there, or make sure an adult you trust is there, for the whole visit.",
    "Tell the engineer about anything you have noticed, such as a smell, noise or a pilot light going out.",
  ],
  howToReport: {
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "How often we check",
      target: THURROCK.gasSafety.serviceInterval,
    },
    {
      label: "When we write to you about your appointment",
      target: THURROCK.gasSafety.reminderBefore,
    },
    {
      label: "Copy of your gas safety record",
      target: THURROCK.gasSafety.recordCopy,
    },
    {
      label: "Fault found that makes an appliance unsafe",
      target: THURROCK.timescales.emergency,
    },
  ],
  furtherReading: [SOURCES.gasSafeRegister, SOURCES.cadentEmergencies],
  related: ["gas-safety", "carbon-monoxide", "your-safety-checks"],
};
