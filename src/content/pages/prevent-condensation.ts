import { ORG } from "@/config/organisation";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const preventCondensation: SafetyPage = {
  slug: "damp-and-mould/prevent-condensation",
  title: "Prevent condensation",
  summary:
    "Condensation is water from the air settling on cold surfaces. It is the most common cause of mould. Small changes at home can reduce it, and we will fix anything in the building that makes it worse.",
  keyFacts: [
    { value: "Lids on", label: "pans when you cook. It cuts the steam" },
    { value: "Wipe", label: "windows and sills every morning" },
    { value: "Fan on", label: "while you cook or shower, with the door closed" },
  ],
  diagram: {
    id: "condensation",
    caption:
      "Cooking and washing put warm, damp air into your home. That air travels until it meets a cold surface such as an outside wall or window, where it turns back into water, and mould grows on the wet surface. Letting the damp air straight out, through an open window or the extractor fan, stops it reaching the cold wall.",
  },
  ourResponsibilities: [
    "We repair or replace extractor fans in kitchens and bathrooms that do not work.",
    "We fix heating that does not work properly, so you can keep your home warm.",
    "We fix leaks, blocked gutters and broken seals that let water in.",
    "We add or improve insulation and ventilation where the building needs it.",
    "We treat mould caused by condensation and find out why it keeps coming back.",
    "We give you advice and support, including help if you struggle to pay for heating.",
  ],
  yourResponsibilities: [
    "Open a window or use the extractor fan when you cook, shower or bathe. Keep the door closed so the steam does not spread.",
    "Put lids on pans when you cook.",
    "Dry washing outside if you can. If you dry it indoors, use one room with the window open and the door closed.",
    "Do not dry clothes on radiators or in front of a heater.",
    "Wipe water off windows and sills each morning.",
    "Leave a small gap between furniture and outside walls so air can move.",
    "Try to keep your home at a steady, low heat rather than heating it in short bursts.",
    "Do not use bottled gas or paraffin heaters. They make a lot of moisture and are a fire risk.",
    "Do not block air bricks, trickle vents or extractor fans.",
  ],
  warningSigns: [
    {
      icon: "window",
      text: "Water on the inside of your windows most mornings.",
    },
    {
      icon: "mould",
      text: "Mould in the corners of rooms, around windows or behind furniture and wardrobes.",
    },
    {
      icon: "smoke",
      text: "Clothes or bedding that smell musty in cupboards.",
    },
    {
      icon: "wind",
      text: "An extractor fan that makes no noise, or does not hold a sheet of paper against it when it is on.",
    },
    {
      icon: "drop",
      text: "Wet patches that appear after cold nights and dry out in the day.",
    },
  ],
  howToReport: {
    online: {
      label: "Report damp or mould online",
      href: "/safety-at-home/damp-and-mould/report-damp-or-mould",
    },
    phone: ORG.repairs.phone,
    email: ORG.repairs.email,
  },
  timescales: [
    {
      label: "Extractor fan or heating that does not work",
      target: ORG.timescales.urgent,
    },
    {
      label: "Mould caused by condensation, if it is a risk to your health",
      target: `Inspected within ${ORG.awaabsLaw.investigate}`,
    },
    {
      label: "Other ventilation or insulation work",
      target: ORG.timescales.routine,
    },
  ],
  furtherReading: [SOURCES.govDampHealth],
  related: [
    "damp-and-mould",
    "damp-and-mould/report-damp-or-mould",
    "damp-and-mould/awaabs-law",
    "extra-support",
  ],
};
