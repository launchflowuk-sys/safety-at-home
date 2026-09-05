import { THURROCK } from "@/config/thurrock";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const buildingSafety: SafetyPage = {
  slug: "building-safety",
  title: "Building safety information",
  summary:
    "How we keep our blocks of flats safe, especially taller buildings covered by the Building Safety Act. What we check, what you can do, and how to raise a concern or have your say.",
  emergency: {
    label: "If there is a fire in your building",
    phone: THURROCK.emergency.phone,
    instructions: [
      "Follow the fire action notice in your block. It tells you whether to stay put or leave.",
      "If the fire is in your own home, always leave. Close doors behind you.",
      "Do not use the lift.",
      `Call ${THURROCK.emergency.phone} once you are safe.`,
    ],
  },
  keyFacts: [
    { value: THURROCK.buildingSafety.higherRiskBuilding, label: "counts as a higher-risk building under the law" },
    { value: THURROCK.fireSafety.communalFireDoorCheck, label: "we check shared-area fire doors in taller buildings" },
    { value: "Your say", label: "we ask residents before big safety decisions" },
  ],
  ourResponsibilities: [
    `We are the 'accountable person' for our higher-risk buildings. These are buildings ${THURROCK.buildingSafety.higherRiskBuilding}. We register each one with the Building Safety Regulator.`,
    "We assess the risks of fire spreading and of the structure failing in each higher-risk building, and we keep a safety case report that shows how we manage those risks.",
    "We keep up-to-date information about each building: plans, materials, fire safety systems and past works.",
    "We check outside walls and cladding, and fix or remove materials that are not safe.",
    `We carry out a fire risk assessment for every block, and check fire doors in shared areas ${THURROCK.fireSafety.communalFireDoorCheck} in buildings ${THURROCK.fireSafety.tallBuilding}.`,
    "We ask residents for their views on building safety decisions, and we tell you how we used them. This is our resident engagement strategy.",
    "We give you clear safety information for your building, in a format you can use.",
    "We report serious safety incidents to the Building Safety Regulator, and tell you what we are doing about them.",
  ],
  yourResponsibilities: [
    "Keep fire doors shut, and never remove or disconnect a self-closer.",
    "Do not store anything in hallways, stairwells or bin rooms. These are your way out.",
    "Do not change walls, doors, windows, sprinklers or fire alarms in your home without asking us first.",
    "Do not tamper with fire safety equipment in shared areas.",
    "Let us in when we need to inspect your home or carry out safety work.",
    "Tell us straight away about damage to the building, or anything you think is unsafe.",
    "Tell us if someone in your home would need help to leave in a fire.",
    "Take part when we ask for your views. Your feedback shapes how we keep the building safe.",
  ],
  warningSigns: [
    {
      icon: "crack",
      text: "New or growing cracks in outside walls, ceilings or around windows.",
    },
    {
      icon: "warning",
      text: "Cladding or panels on the outside of the building that are loose, damaged or missing.",
    },
    {
      icon: "door",
      text: "Fire doors in shared areas that are propped open or do not close.",
    },
    {
      icon: "alarm",
      text: "Fire alarms, extinguishers or emergency lights that are damaged, missing or covered.",
    },
    {
      icon: "drop",
      text: "Water coming through a ceiling or wall from the flat above or from the roof.",
    },
    {
      icon: "blocked",
      text: "Rubbish, bikes, prams or furniture left in hallways or stairwells.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "Emergency, such as a fire door that will not close or a serious structural fault",
      target: THURROCK.timescales.emergency,
    },
    { label: "Urgent building repair", target: THURROCK.timescales.urgent },
    { label: "Routine building repair", target: THURROCK.timescales.routine },
    {
      label: `Fire door checks in shared areas, in buildings ${THURROCK.fireSafety.tallBuilding}`,
      target: THURROCK.fireSafety.communalFireDoorCheck,
    },
  ],
  furtherReading: [SOURCES.govBsr, SOURCES.hseBuildingSafety, SOURCES.ecfrsHighRise],
  related: [
    "fire-safety",
    "fire-safety/stay-put-or-evacuate",
    "fire-safety/fire-doors",
    "fire-safety/help-to-evacuate",
    "communal-areas",
    "balconies-windows-and-roofs",
  ],
};
