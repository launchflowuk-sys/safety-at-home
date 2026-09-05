import { THURROCK } from "@/config/thurrock";
import type { SafetyPage } from "@/types/safety-page";

export const stayPutOrEvacuate: SafetyPage = {
  slug: "fire-safety/stay-put-or-evacuate",
  title: "Stay put or evacuate?",
  summary:
    "What to do if there is a fire somewhere in your building. Every block has either a 'stay put' plan or an 'evacuate' plan. The fire action notice in your block tells you which one.",
  emergency: {
    label: "If the fire is in your own home",
    phone: THURROCK.emergency.phone,
    instructions: [
      "Always leave, whatever plan your block has.",
      "Close the doors behind you as you go. This slows the fire down.",
      "Do not use the lift. Use the stairs.",
      `Call ${THURROCK.emergency.phone} once you are safe outside. Tell them your address and which floor the fire is on.`,
    ],
  },
  ourResponsibilities: [
    "We decide the safest plan for each block, based on how it was built and its fire risk assessment.",
    "We put a fire action notice in every block. It tells you if your block is 'stay put' or 'evacuate', and where to meet outside.",
    "We tell you in writing if the plan for your block changes.",
    "We keep the fire doors, walls and floors that a 'stay put' plan relies on in good repair.",
    "We work with Essex County Fire and Rescue Service on the plans for our taller buildings.",
  ],
  yourResponsibilities: [
    "Read the fire action notice in your block, so you know which plan it uses before anything happens.",
    `If your block is 'stay put' and the fire is not in your home: stay in your flat, keep doors and windows shut, and call ${THURROCK.emergency.phone} to tell them where you are.`,
    "Leave a 'stay put' block if smoke or heat gets into your flat, or if the fire service tells you to.",
    "If your block is 'evacuate': leave by the nearest safe stairs as soon as you hear the alarm. Go to the meeting point on the notice.",
    "Never go back inside until the fire service says it is safe.",
    "Plan your way out now, and make sure everyone in your home knows it.",
  ],
  warningSigns: [
    {
      icon: "smoke",
      text: "Smoke is coming into your flat, even a little. Leave if it is safe to do so.",
    },
    {
      icon: "flame",
      text: `Your front door feels hot, or you can see flames outside. Stay inside, block gaps with wet towels and call ${THURROCK.emergency.phone}.`,
    },
    {
      icon: "person",
      text: "A firefighter or an announcement tells you to leave. Do what they say straight away.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  related: [
    "fire-safety",
    "fire-safety/fire-doors",
    "fire-safety/help-to-evacuate",
    "building-safety",
  ],
};
