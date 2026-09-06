import { ORG } from "@/config/organisation";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const fireSafety: SafetyPage = {
  slug: "fire-safety",
  title: "Fire safety",
  summary:
    "How we keep your home and building safe from fire, what you can do to help, and what to do if there is a fire.",
  emergency: {
    label: "If there is a fire",
    phone: ORG.emergency.phone,
    instructions: [
      "Get everyone out of the room and close the door behind you.",
      "Leave your home if it is safe to do so. Do not stop to collect things.",
      "Do not use the lift.",
      `Call ${ORG.emergency.phone} once you are outside and safe.`,
      "Do not go back inside for any reason.",
    ],
  },
  keyFacts: [
    { value: ORG.fireSafety.alarmTest, label: "test your smoke alarm" },
    { value: ORG.timescales.emergency, label: "to fix a broken fire door or alarm" },
    { value: ORG.emergency.phone, label: "if you see fire or smoke" },
  ],
  ourResponsibilities: [
    "We carry out a fire risk assessment of every block of flats we own, and act on what it finds.",
    "We fit and look after smoke alarms in your home.",
    "We check and repair fire doors in shared areas and flat entrance doors.",
    "We keep fire safety equipment in shared areas working. This includes emergency lighting and fire alarms where they are fitted.",
    "We put a fire action notice in every block. It tells you what to do if there is a fire.",
    "We check the gas and electrical systems we own, to lower the risk of fire.",
  ],
  yourResponsibilities: [
    `Test your smoke alarm ${ORG.fireSafety.alarmTest}. Press the test button until it sounds.`,
    "Never take down or cover a smoke alarm, even if it goes off when you cook.",
    "Keep your flat entrance door closed. Never wedge a fire door open.",
    "Keep hallways, stairs and landings clear. Do not leave prams, bikes or furniture in shared areas.",
    "Do not charge e-bikes or e-scooters in hallways or on your way out.",
    "Do not use barbecues or store gas bottles on a balcony.",
    "Tell us straight away if a fire door, alarm or emergency light is broken.",
    "Let us in when we need to check safety equipment in your home.",
  ],
  warningSigns: [
    {
      icon: "door",
      text: "A fire door that does not close by itself, or has a gap, damage or a missing seal.",
    },
    {
      icon: "alarm",
      text: "A smoke alarm that does not sound when you press the test button, or one that beeps every minute.",
    },
    {
      icon: "socket",
      text: "Scorch marks, a burning smell or a buzzing sound from a socket, switch or plug.",
    },
    {
      icon: "blocked",
      text: "Things stored in hallways or stairwells that could block your way out.",
    },
    {
      icon: "light",
      text: "Emergency lights in shared areas that are off or flickering.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: ORG.repairs.phone,
    email: ORG.repairs.email,
  },
  timescales: [
    {
      label:
        "Emergency repair, such as a fire door that will not close or a smoke alarm that does not work",
      target: ORG.timescales.emergency,
    },
    { label: "Urgent repair", target: ORG.timescales.urgent },
    { label: "Routine repair", target: ORG.timescales.routine },
    {
      label: `Fire door checks in shared areas, in buildings ${ORG.fireSafety.tallBuilding}`,
      target: ORG.fireSafety.communalFireDoorCheck,
    },
    {
      label: `Flat entrance fire door checks, in buildings ${ORG.fireSafety.tallBuilding}`,
      target: ORG.fireSafety.flatFireDoorCheck,
    },
  ],
  furtherReading: [SOURCES.ecfrsHomeSafety, SOURCES.ecfrsHomeVisit, SOURCES.ecfrsCooking, SOURCES.lfbChargeSafe],
  related: [
    "fire-safety/stay-put-or-evacuate",
    "fire-safety/fire-doors",
    "fire-safety/smoke-and-heat-alarms",
    "fire-safety/help-to-evacuate",
    "e-bikes-and-e-scooters",
    "communal-areas",
  ],
};
