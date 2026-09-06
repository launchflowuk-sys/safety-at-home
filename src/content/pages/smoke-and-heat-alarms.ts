import { ORG } from "@/config/organisation";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const smokeAndHeatAlarms: SafetyPage = {
  slug: "fire-safety/smoke-and-heat-alarms",
  title: "Smoke and heat alarms",
  summary:
    "Every home we own should have working alarms. Learn how to test them, what the beeps mean, and how to report a fault.",
  emergency: {
    label: "If your alarm sounds",
    phone: ORG.emergency.phone,
    instructions: [
      "If you can see or smell smoke or fire, get everyone out and close the doors behind you.",
      `Call ${ORG.emergency.phone} from outside.`,
      "If you cannot see or smell anything, check for cooking smoke or steam. If you are not sure, treat it as real and get out.",
      "Never take the alarm down to stop the noise.",
    ],
  },
  keyFacts: [
    { value: ORG.fireSafety.alarmTest, label: "test every alarm in your home" },
    { value: ORG.fireSafety.alarmLifespan, label: "most alarms need replacing after this long" },
    { value: ORG.timescales.emergency, label: "to replace an alarm that does not work" },
  ],
  diagram: {
    id: "alarm-placement",
    caption:
      "A flat with a smoke alarm in the hallway and the living room, and a heat alarm in the kitchen. A heat alarm goes in the kitchen because cooking fumes would set a smoke alarm off. Alarms on the hallway route matter most, because that is the way out.",
  },
  ourResponsibilities: [
    "We fit at least one smoke alarm on every floor of your home, and a heat alarm in the kitchen where one is needed.",
    "We check your alarms during your safety checks, such as your annual gas service and electrical checks.",
    `We replace alarms that are faulty or past their end date. Most alarms last ${ORG.fireSafety.alarmLifespan}.`,
    "We treat an alarm that does not work as an emergency repair.",
  ],
  yourResponsibilities: [
    `Test each alarm ${ORG.fireSafety.alarmTest}. Press and hold the test button. It should sound loudly.`,
    "Never take an alarm down, cover it or take out its battery.",
    "Keep alarms free of dust. Gently vacuum around them a few times a year.",
    "If your alarm beeps once every minute or so, the battery is low. Tell us.",
    `Tell us if an alarm is missing, damaged or more than ${ORG.fireSafety.alarmLifespan} old. The date is printed on the back or side.`,
    "If you cannot reach your alarm to test it, ask us for help.",
  ],
  warningSigns: [
    {
      icon: "alarm",
      text: "The alarm makes no sound when you press the test button.",
    },
    {
      icon: "battery",
      text: "The alarm gives a single short beep every minute or so. This means the battery is low.",
    },
    {
      icon: "clock",
      text: `The date on the alarm shows it is more than ${ORG.fireSafety.alarmLifespan} old.`,
    },
    {
      icon: "warning",
      text: "The alarm is yellowed, cracked, painted over or hanging loose from the ceiling.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: ORG.repairs.phone,
    email: ORG.repairs.email,
  },
  timescales: [
    {
      label: "Alarm that does not work, or is missing",
      target: ORG.timescales.emergency,
    },
    {
      label: "Low battery warning, or an alarm past its end date",
      target: ORG.timescales.urgent,
    },
  ],
  furtherReading: [SOURCES.ecfrsSmokeAlarms, SOURCES.ecfrsHomeVisit],
  related: [
    "fire-safety",
    "carbon-monoxide",
    "electrical-safety",
    "your-safety-checks",
  ],
};
