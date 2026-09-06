import { ORG } from "@/config/organisation";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const carbonMonoxide: SafetyPage = {
  slug: "carbon-monoxide",
  title: "Carbon monoxide",
  summary:
    "Carbon monoxide is a gas you cannot see, smell or taste. It comes from appliances that burn fuel and are faulty or badly ventilated. Your alarm is there to warn you.",
  emergency: {
    label: "If your carbon monoxide alarm sounds, or you feel unwell",
    phone: ORG.gasLeak.phone,
    instructions: [
      "Open doors and windows, turn off gas appliances, and get everyone outside into fresh air.",
      `Call the National Gas Emergency Service (${ORG.gasLeak.provider}) on ${ORG.gasLeak.phone} from outside. It is free and open 24 hours.`,
      `If anyone feels dizzy, sick, confused or collapses, call ${ORG.emergency.phone}. For advice, call ${ORG.nhs.provider} on ${ORG.nhs.phone}.`,
      "Do not go back inside until you are told it is safe.",
    ],
  },
  keyFacts: [
    { value: ORG.fireSafety.alarmTest, label: "test your carbon monoxide alarm" },
    { value: ORG.gasLeak.phone, label: "if your alarm sounds. Free, 24 hours" },
    { value: ORG.carbonMonoxide.alarmLifespan, label: "most alarms need replacing after this long" },
  ],
  diagram: {
    id: "co-alarm-placement",
    caption:
      "A carbon monoxide alarm belongs one to three metres away from the boiler or fire, at about head height. Do not put it directly above the appliance, and never shut it inside a cupboard, because it cannot sense the air in the room from there.",
  },
  ourResponsibilities: [
    "We fit a carbon monoxide alarm in every room with a fixed gas or solid fuel appliance, such as a boiler or fire.",
    "We replace an alarm that does not work as an emergency repair.",
    `We service the gas appliances we own ${ORG.gasSafety.serviceInterval}, which is the best way to stop carbon monoxide.`,
    "We check flues and vents so fumes can escape safely.",
  ],
  yourResponsibilities: [
    `Test your alarm ${ORG.fireSafety.alarmTest} by pressing the test button.`,
    "Never cover, move or take the battery out of your alarm.",
    `Tell us if your alarm beeps on its own, shows a fault light, or is more than ${ORG.carbonMonoxide.alarmLifespan} old. The date is on the alarm.`,
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
    phone: ORG.repairs.phone,
    email: ORG.repairs.email,
  },
  timescales: [
    {
      label: "Carbon monoxide alarm missing or not working",
      target: ORG.timescales.emergency,
    },
    {
      label: "Alarm past its end date",
      target: ORG.timescales.urgent,
    },
    {
      label: "Gas service, which includes a carbon monoxide check",
      target: ORG.gasSafety.serviceInterval,
    },
  ],
  furtherReading: [SOURCES.nhsCarbonMonoxide, SOURCES.cadentEmergencies],
  related: [
    "gas-safety",
    "gas-safety/annual-gas-service",
    "fire-safety/smoke-and-heat-alarms",
    "fire-safety",
  ],
};
