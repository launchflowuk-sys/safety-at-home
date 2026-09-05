import { THURROCK } from "@/config/thurrock";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const gasSafety: SafetyPage = {
  slug: "gas-safety",
  title: "Gas safety",
  summary:
    "Your free annual gas service, how to spot a faulty appliance, and exactly what to do if you smell gas.",
  emergency: {
    label: "If you smell gas",
    phone: THURROCK.gasLeak.phone,
    instructions: [
      "Open doors and windows to let air in.",
      "Turn off the gas at the meter if you know how and can reach it safely.",
      "Do not switch lights or anything electrical on or off. Do not smoke or light a flame.",
      `Go outside, then call the National Gas Emergency Service (${THURROCK.gasLeak.provider}) on ${THURROCK.gasLeak.phone}. It is free and open 24 hours.`,
      `If anyone feels unwell, call ${THURROCK.emergency.phone} as well.`,
    ],
  },
  keyFacts: [
    { value: THURROCK.gasSafety.serviceInterval, label: "free gas safety check of your home" },
    { value: THURROCK.gasLeak.phone, label: "if you smell gas. Free, 24 hours" },
    { value: "Gas Safe", label: "all our engineers are registered. Ask for their ID card" },
  ],
  ourResponsibilities: [
    `We service and safety check the gas boiler, fire and pipework we own in your home ${THURROCK.gasSafety.serviceInterval}. This is free.`,
    "All our gas engineers are on the Gas Safe Register. They carry an ID card. Ask to see it.",
    `We give you a copy of your gas safety record ${THURROCK.gasSafety.recordCopy}.`,
    "We repair or replace gas appliances and pipework that we own.",
    "If an appliance is unsafe, we disconnect it straight away and tell you why.",
    "We fit a carbon monoxide alarm in every room with a fixed gas appliance.",
  ],
  yourResponsibilities: [
    "Let us in for your annual gas service. It is a legal requirement and a condition of your tenancy.",
    "Never fit, move or repair a gas appliance yourself. Only a Gas Safe registered engineer can do this, and you must tell us first.",
    "Do not block air vents, or the flue where the boiler fumes go out.",
    "Do not use your cooker or oven to heat a room.",
    "If you own your cooker or fire, have it serviced by a Gas Safe registered engineer.",
    "Tell us straight away about a lazy yellow flame, soot, a pilot light that keeps going out, or a smell of gas.",
    "Keep credit on your gas meter if you have a prepayment meter, so the engineer can test your appliances.",
  ],
  warningSigns: [
    {
      icon: "flame",
      text: "A lazy yellow or orange flame instead of a crisp blue one.",
    },
    {
      icon: "warning",
      text: "Black soot, or scorch marks or staining on or around an appliance.",
    },
    {
      icon: "light",
      text: "A pilot light that keeps going out.",
    },
    {
      icon: "window",
      text: "More condensation than usual on windows in the room with the appliance.",
    },
    {
      icon: "smoke",
      text: "A smell like rotten eggs. That is the smell added to gas so you notice a leak.",
    },
    {
      icon: "person",
      text: "Headaches, dizziness or feeling sick when an appliance is on. Get fresh air and get help.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "Gas leak, or an appliance we have made safe and need to fix",
      target: THURROCK.timescales.emergency,
    },
    {
      label: "No heating or hot water",
      target: THURROCK.timescales.urgent,
    },
    {
      label: "Annual gas service",
      target: THURROCK.gasSafety.serviceInterval,
    },
    {
      label: "Copy of your gas safety record",
      target: THURROCK.gasSafety.recordCopy,
    },
  ],
  furtherReading: [SOURCES.cadentEmergencies, SOURCES.gasSafeRegister],
  related: [
    "gas-safety/annual-gas-service",
    "carbon-monoxide",
    "your-safety-checks",
    "fire-safety",
  ],
};
