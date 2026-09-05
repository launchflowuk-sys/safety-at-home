import { THURROCK } from "@/config/thurrock";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const eBikesAndEScooters: SafetyPage = {
  slug: "e-bikes-and-e-scooters",
  title: "E-bikes and e-scooters",
  summary:
    "Lithium batteries can catch fire without warning, and the fire is fast and very hard to put out. Here is how to charge and store them safely, and the rules for your home and block.",
  keyFacts: [
    { value: "Never", label: "charge in a hallway, stairwell or on your escape route" },
    { value: "Unplug", label: "when fully charged. Do not charge overnight or while you are out" },
    { value: THURROCK.emergency.phone, label: "if a battery smokes, hisses or swells. Get out first" },
  ],
  emergency: {
    label: "If a battery starts to smoke, hiss, swell or catch fire",
    phone: THURROCK.emergency.phone,
    instructions: [
      "Do not try to put it out or move it. Battery fires give off toxic gas and can explode.",
      "Get everyone out and close the door behind you.",
      `Call ${THURROCK.emergency.phone} from outside and tell them it is a lithium battery fire.`,
    ],
  },
  ourResponsibilities: [
    "We ban charging and storing e-bikes and e-scooters in shared areas, because a fire there would block everyone's way out.",
    "We remove anything left in shared areas, including e-bikes and e-scooters, after giving notice.",
    "We check that fire doors and smoke alarms are working, so that a fire in one flat does not spread.",
    "We look at safe storage options, such as secure cycle stores, where a block needs them.",
    "We give you clear advice on safe charging, based on fire service guidance.",
  ],
  yourResponsibilities: [
    "Charge batteries in a room with a smoke alarm, away from your way out. Never in a hallway or by your front door.",
    "Only use the charger that came with the bike or scooter, or one the maker approves.",
    "Never charge overnight, while you are asleep, or when you are out. Unplug as soon as it is charged.",
    "Never charge or store a battery in a shared hallway, stairwell, bin room or cycle store that is not designed for it.",
    "Do not buy cheap batteries or chargers online, or ones you cannot trace to a maker. Do not convert a normal bike yourself.",
    "Let batteries cool before charging. Do not charge one that has been dropped, dented or got wet.",
    "Store batteries and bikes away from heat, sunlight and anything that burns.",
    "Take old batteries to a recycling centre. Never put them in the household bin.",
  ],
  warningSigns: [
    {
      icon: "battery",
      text: "A battery that is swollen, dented, leaking or very hot to touch.",
    },
    {
      icon: "smoke",
      text: "A hissing or popping sound, a strange smell, or smoke from a battery or charger.",
    },
    {
      icon: "spark",
      text: "A charger that gets very hot, sparks or has a damaged lead.",
    },
    {
      icon: "blocked",
      text: "Bikes or scooters left in a hallway, stairwell or by a fire door.",
    },
    {
      icon: "clock",
      text: "A battery that takes much longer to charge, or does not hold charge like it used to.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "Items blocking a shared hallway or stairwell",
      target: `Removed after ${THURROCK.communalAreas.removalNotice} notice. Straight away if they block a way out`,
    },
    {
      label: "Faulty smoke alarm or fire door reported to us",
      target: THURROCK.timescales.emergency,
    },
  ],
  furtherReading: [SOURCES.lfbChargeSafe, SOURCES.ecfrsHomeSafety, SOURCES.esfHome],
  related: [
    "fire-safety",
    "communal-areas",
    "electrical-safety",
    "fire-safety/smoke-and-heat-alarms",
  ],
};
