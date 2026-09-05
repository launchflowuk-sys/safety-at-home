import { THURROCK } from "@/config/thurrock";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const securityAtHome: SafetyPage = {
  slug: "security-at-home",
  title: "Security at home",
  summary:
    "Door entry systems, locks and keys, and simple habits that keep your home and your block secure.",
  keyFacts: [
    { value: THURROCK.emergency.phone, label: "if a crime is happening now or someone is in danger" },
    { value: THURROCK.police.nonEmergency, label: `to report a crime that has already happened to ${THURROCK.police.provider}` },
    { value: "Never", label: "let someone into the block you do not know, even if they ask nicely" },
  ],
  emergency: {
    label: "If someone is breaking in, or you are in danger",
    phone: THURROCK.emergency.phone,
    instructions: [
      `Call ${THURROCK.emergency.phone}. Get to a safe place, or a room with a door you can lock, if you can.`,
      "Do not confront anyone. Your safety matters more than your belongings.",
      `If the crime has already happened and no one is in danger, call ${THURROCK.police.provider} on ${THURROCK.police.nonEmergency}, then tell us about any damage.`,
    ],
  },
  ourResponsibilities: [
    "We repair the door entry system, main entrance door and any shared gates for your block.",
    "We repair the locks, doors and windows that we own. If you are locked out because a lock we own has failed, we treat it as an emergency.",
    "We fit and maintain lighting in shared areas and outside the building.",
    "We change the lock if your keys are stolen with something that shows your address. Tell us straight away.",
    "We work with the police and our community safety team on anti-social behaviour and crime in and around our homes.",
    "We fit security measures such as door chains, spy holes or extra locks where a resident needs them.",
  ],
  yourResponsibilities: [
    "Lock your front door and close your windows when you go out and at night, even if you are only going out for a minute.",
    "Do not let anyone you do not know into the block. Do not hold the door for people or let them follow you in.",
    "Do not answer the door entry buzzer for other flats. If someone says they are visiting a neighbour, let the neighbour let them in.",
    "Always ask callers for ID. Our staff and contractors carry it and will not mind waiting while you check. If in doubt, keep them out and call us.",
    "Do not give keys or fobs to people you do not trust, and tell us if a key or fob is lost or stolen.",
    "Do not fit extra locks, bolts or a new door without asking us first. Some can stop you getting out in a fire.",
    "Report broken locks, doors, windows, entry systems and lights straight away.",
    "Look out for neighbours, especially older or vulnerable ones. Tell us if you are worried about someone.",
  ],
  warningSigns: [
    {
      icon: "door",
      text: "The main entrance door does not close or lock behind you, or is wedged open.",
    },
    {
      icon: "warning",
      text: "Door entry buzzer or intercom not working, so people cannot check who is calling.",
    },
    {
      icon: "light",
      text: "Outside or stairwell lights that are broken, leaving dark spots.",
    },
    {
      icon: "crack",
      text: "Damage to a door, frame or lock that could mean someone has tried to force it.",
    },
    {
      icon: "person",
      text: "People hanging around the block who do not live there, or trying doors.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "Your home cannot be secured, or the main entrance door will not lock",
      target: THURROCK.timescales.emergency,
    },
    {
      label: "Door entry system or intercom not working",
      target: THURROCK.timescales.urgent,
    },
    {
      label: "Outside lighting and other security repairs",
      target: THURROCK.timescales.routine,
    },
  ],
  furtherReading: [SOURCES.thurrockHousing, SOURCES.ecfrsHomeSafety],
  related: [
    "communal-areas",
    "fire-safety/fire-doors",
    "extra-support",
    "building-safety",
  ],
};
