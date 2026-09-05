import { THURROCK } from "@/config/thurrock";
import type { SafetyPage } from "@/types/safety-page";

export const dampAndMould: SafetyPage = {
  slug: "damp-and-mould",
  title: "Damp and mould",
  summary:
    "Damp and mould can harm your health. Tell us as soon as you see it. Under Awaab's Law we must inspect and fix it within set time limits.",
  emergency: {
    label: "If someone in your home is struggling to breathe",
    phone: THURROCK.emergency.phone,
    instructions: [
      `If someone cannot breathe properly, is turning blue or is not responding, call ${THURROCK.emergency.phone}.`,
      `For urgent medical advice that is not life threatening, call ${THURROCK.nhs.provider} on ${THURROCK.nhs.phone} or contact your GP.`,
      "Tell us about the damp or mould as soon as everyone is safe. Mention any health problems so we can visit sooner.",
    ],
  },
  ourResponsibilities: [
    `We inspect your home within ${THURROCK.awaabsLaw.investigate} of you telling us about damp or mould.`,
    `We give you a written summary of what we found within ${THURROCK.awaabsLaw.writtenReport}.`,
    `If the damp or mould is a risk to your health, we start repairs within ${THURROCK.awaabsLaw.repairStart}.`,
    `If it is an emergency, such as a serious leak or heavy mould where someone is unwell, we act within ${THURROCK.awaabsLaw.emergencyHazard}.`,
    "We find and fix the cause, such as a leak, a broken extractor fan, missing insulation or a heating fault. We do not just clean the mould off.",
    "If we cannot make your home safe quickly, we offer you somewhere else to stay until it is.",
    "We never blame you for damp and mould. We look at the building first.",
    "We keep you informed at every step and tell you who to contact.",
  ],
  yourResponsibilities: [
    "Tell us as soon as you see damp, mould or a leak. Small patches are easier to fix.",
    "Let us in to inspect and carry out repairs. Tell us if the time we offer does not work for you.",
    "Tell us if anyone in your home has asthma, a lung condition, a weak immune system, is pregnant, very young or very old.",
    "Open windows or use the extractor fan when you cook, shower or dry clothes, if you can.",
    "Wipe water off windows and sills in the morning.",
    "Try to keep your home warm and steady. Tell us if you cannot afford to heat it. We can help.",
    "Do not block air vents or switch off extractor fans.",
    "Do not paint over mould. It will come back.",
  ],
  warningSigns: [
    {
      icon: "mould",
      text: "Black, green or white spots on walls, ceilings, window frames or around the bath.",
    },
    {
      icon: "smoke",
      text: "A musty, earthy smell, especially in cupboards, wardrobes or behind furniture.",
    },
    {
      icon: "drop",
      text: "Water running down windows or walls every morning, or a wet patch that does not dry out.",
    },
    {
      icon: "crack",
      text: "Peeling wallpaper, bubbling paint, or tide marks on the wall.",
    },
    {
      icon: "thermometer",
      text: "Walls that feel cold and damp to touch, even when the heating is on.",
    },
    {
      icon: "person",
      text: "Coughing, wheezing or sneezing that gets worse at home, especially at night.",
    },
  ],
  howToReport: {
    online: {
      label: "Report damp or mould online",
      href: "/safety-at-home/damp-and-mould/report-damp-or-mould",
    },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "We inspect your home after you tell us",
      target: `within ${THURROCK.awaabsLaw.investigate}`,
    },
    {
      label: "We give you a written summary of what we found",
      target: `within ${THURROCK.awaabsLaw.writtenReport}`,
    },
    {
      label: "We start repairs if the hazard is a risk to your health",
      target: `within ${THURROCK.awaabsLaw.repairStart}`,
    },
    {
      label: "We act on an emergency hazard",
      target: `within ${THURROCK.awaabsLaw.emergencyHazard}`,
    },
  ],
  related: [
    "damp-and-mould/report-damp-or-mould",
    "damp-and-mould/awaabs-law",
    "damp-and-mould/prevent-condensation",
    "your-safety-checks",
    "extra-support",
  ],
};
