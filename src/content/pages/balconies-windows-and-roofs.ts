import { THURROCK } from "@/config/thurrock";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const balconiesWindowsAndRoofs: SafetyPage = {
  slug: "balconies-windows-and-roofs",
  title: "Balconies, windows and roofs",
  summary:
    "How to use your balcony safely, why window restrictors matter, and why roofs are strictly off limits.",
  keyFacts: [
    { value: "No barbecues", label: "on balconies, ever. They start fires and spread to flats above" },
    { value: "Restrictors on", label: "windows above the ground floor stop children falling" },
    { value: "Roofs closed", label: "only our contractors may go onto a roof" },
  ],
  emergency: {
    label: "If there is a fire on a balcony",
    phone: THURROCK.emergency.phone,
    instructions: [
      "Get everyone inside, close the balcony door and leave your home.",
      "Close doors behind you and use the stairs.",
      `Call ${THURROCK.emergency.phone} from outside. Fire spreads quickly from balcony to balcony.`,
    ],
  },
  ourResponsibilities: [
    "We inspect balconies, railings, drainage and the outside of the building as part of our building checks.",
    "We repair balcony railings, floors and doors that we own.",
    "We fit window restrictors to windows above the ground floor where they are needed, and repair them when they break.",
    "We repair windows, frames, locks and glazing that we own.",
    "We inspect and repair roofs, gutters and downpipes. Only our trained contractors go onto roofs.",
    "We tell you about the rules for balconies in your block, and why they exist.",
  ],
  yourResponsibilities: [
    "Never use a barbecue, fire pit, chiminea or patio heater on a balcony. Do not store gas bottles there.",
    "Do not smoke on your balcony if there is any risk a cigarette could fall onto the balcony below.",
    "Do not store things on your balcony that can burn, such as furniture cushions, boxes, or e-bike batteries.",
    "Do not overload your balcony. Do not hang things over the railing, and never let children climb on it.",
    "Keep balcony drains clear of leaves and rubbish so water does not build up.",
    "Do not remove or disconnect window restrictors. Tell us if one is broken.",
    "Never go onto a roof, even a flat one, and do not let anyone else do so.",
    "Do not fit a satellite dish, awning, screen or anything else to the outside of the building without asking us first.",
  ],
  warningSigns: [
    {
      icon: "crack",
      text: "Cracks, rust or movement in a balcony railing or floor.",
    },
    {
      icon: "drop",
      text: "Water pooling on a balcony, or dripping from the balcony above.",
    },
    {
      icon: "window",
      text: "A window that will not close or lock, or a restrictor that has snapped or come loose.",
    },
    {
      icon: "warning",
      text: "Loose tiles, slates or panels on a roof, or bits falling to the ground.",
    },
    {
      icon: "blocked",
      text: "Gutters overflowing when it rains, or plants growing out of them.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "Unsafe balcony railing, window that will not lock, or roof damage letting water in",
      target: THURROCK.timescales.emergency,
    },
    {
      label: "Broken window restrictor",
      target: THURROCK.timescales.urgent,
    },
    {
      label: "Gutters, downpipes and other outside repairs",
      target: THURROCK.timescales.routine,
    },
  ],
  furtherReading: [SOURCES.ecfrsHomeSafety, SOURCES.ecfrsHighRise],
  related: [
    "fire-safety",
    "building-safety",
    "e-bikes-and-e-scooters",
    "communal-areas",
  ],
};
