import { THURROCK } from "@/config/thurrock";
import type { SafetyPage } from "@/types/safety-page";

export const carbonMonoxide: SafetyPage = {
  slug: "carbon-monoxide",
  title: "Carbon monoxide",
  summary:
    "Carbon monoxide is a gas you cannot see, smell or taste. It comes from appliances that burn fuel and are faulty or badly ventilated. Your alarm is there to warn you.",
  emergency: {
    label: "If your carbon monoxide alarm sounds, or you feel unwell",
    phone: THURROCK.gasLeak.phone,
    instructions: [
      "Open doors and windows, turn off gas appliances, and get everyone outside into fresh air.",
      `Call the National Gas Emergency Service (${THURROCK.gasLeak.provider}) on ${THURROCK.gasLeak.phone} from outside. It is free and open 24 hours.`,
      `If anyone feels dizzy, sick, confused or collapses, call ${THURROCK.emergency.phone}. For advice, call ${THURROCK.nhs.provider} on ${THURROCK.nhs.phone}.`,
      "Do not go back inside until you are told it is safe.",
    ],
  },
  ourResponsibilities: [
    "We fit a carbon monoxide alarm in every room with a fixed gas or solid fuel appliance, such as a boiler or fire.",
    "We replace an alarm that does not work as an emergency repair.",
    `We service the gas appliances we own ${THURROCK.gasSafety.serviceInterval}, which is the best way to stop carbon monoxide.`,
    "We check flues and vents so fumes can escape safely.",
  ],
  yourResponsibilities: [
    `Test your alarm ${THURROCK.fireSafety.alarmTest} by pressing the test button.`,
    "Never cover, move or take the battery out of your alarm.",
    `Tell us if your alarm beeps on its own, shows a fault light, or is more than ${THURROCK.carbonMonoxide.alarmLifespan} old. The date is on the alarm.`,
    "Never block air vents, or the flue where fumes leave your home.",
    "Never use a barbecue, camping stove or bottled gas heater indoors, in a tent or on a balcony next to an open door.",
    "Never run a car, generator or petrol tool in a garage or shed attached to your home.",
    "Learn the symptoms. They are easy to mistake for flu or food poisoning.",
  ],
  warningSigns: [
    {
      icon: "person",
      text: "Headaches, dizziness, feeling sick, being short of breath or feeling very tired.",
    },
    {
      icon: "wind",
      text: "Symptoms that get better when you go out, and come back when you come home. Other people and pets are unwell too.",
    },
    {
      icon: "flame",
      text: "A lazy yellow or orange flame on a gas appliance instead of a blue one.",
    },
    {
      icon: "warning",
      text: "Soot or yellow-brown staining around an appliance.",
    },
    {
      icon: "light",
      text: "A pilot light that keeps going out.",
    },
    {
      icon: "window",
      text: "More condensation than usual in the room with the appliance.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "Carbon monoxide alarm missing or not working",
      target: THURROCK.timescales.emergency,
    },
    {
      label: "Alarm past its end date",
      target: THURROCK.timescales.urgent,
    },
    {
      label: "Gas service, which includes a carbon monoxide check",
      target: THURROCK.gasSafety.serviceInterval,
    },
  ],
  related: [
    "gas-safety",
    "gas-safety/annual-gas-service",
    "fire-safety/smoke-and-heat-alarms",
    "fire-safety",
  ],
};
