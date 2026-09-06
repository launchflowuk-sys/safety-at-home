import { ORG } from "@/config/organisation";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const communalAreas: SafetyPage = {
  slug: "communal-areas",
  title: "Communal areas",
  summary:
    "Hallways, stairs, landings and bin rooms are everyone's way out in a fire. Keeping them clear and safe is a shared job.",
  keyFacts: [
    { value: "Keep clear", label: "nothing stored in hallways, stairs or landings, however small" },
    { value: ORG.communalAreas.removalNotice, label: "notice before we remove items. Sooner if they block a way out" },
    { value: ORG.fireSafety.communalFireDoorCheck, label: "we check shared-area fire doors in taller buildings" },
  ],
  emergency: {
    label: "If there is a fire in a shared area",
    phone: ORG.emergency.phone,
    instructions: [
      "Follow the fire action notice for your block. If it says stay put and the fire is not in your home, stay inside with doors closed.",
      "If you are in the shared area, leave by the nearest safe stairs. Do not use the lift.",
      `Call ${ORG.emergency.phone} once you are safe.`,
    ],
  },
  ourResponsibilities: [
    "We inspect shared areas regularly for anything that could block your way out or catch fire.",
    "We keep shared fire doors, emergency lighting, signs and any fire alarms working.",
    `We check shared-area fire doors ${ORG.fireSafety.communalFireDoorCheck} in buildings ${ORG.fireSafety.tallBuilding}.`,
    `We remove items left in shared areas after giving ${ORG.communalAreas.removalNotice} notice. We remove anything that blocks a way out straight away.`,
    "We clean shared areas and empty bin rooms, and deal with fly-tipping.",
    "We repair lighting, flooring, handrails and door entry systems in shared areas.",
  ],
  yourResponsibilities: [
    "Do not leave anything in hallways, stairwells or landings. This includes prams, bikes, scooters, shoes, doormats, plants and furniture.",
    "Never store or charge e-bikes or e-scooters in shared areas.",
    "Do not wedge open fire doors or the main entrance door.",
    "Put rubbish in the bins, not next to them. Take large items to the tip or book a collection.",
    "Do not smoke in shared areas.",
    "Do not let people you do not know into the building.",
    "Tell us about broken lights, doors or anything left in a shared area.",
  ],
  warningSigns: [
    {
      icon: "blocked",
      text: "Items left in a hallway or stairwell, even if you can get past them.",
    },
    {
      icon: "light",
      text: "Emergency lights or stairwell lights that are off or flickering.",
    },
    {
      icon: "door",
      text: "A fire door or entrance door wedged open, or not closing on its own.",
    },
    {
      icon: "warning",
      text: "Rubbish piling up in or around bin rooms.",
    },
    {
      icon: "crack",
      text: "Loose handrails, broken steps or damaged flooring.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: ORG.repairs.phone,
    email: ORG.repairs.email,
  },
  timescales: [
    {
      label: "Way out blocked, fire door broken or emergency lighting off",
      target: ORG.timescales.emergency,
    },
    {
      label: "Items left in a shared area",
      target: `Removed after ${ORG.communalAreas.removalNotice} notice`,
    },
    {
      label: "Other shared-area repairs",
      target: ORG.timescales.routine,
    },
  ],
  furtherReading: [SOURCES.ecfrsHighRise, SOURCES.ecfrsHomeSafety],
  related: [
    "fire-safety",
    "fire-safety/fire-doors",
    "e-bikes-and-e-scooters",
    "security-at-home",
    "building-safety",
  ],
};
