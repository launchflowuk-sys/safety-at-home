import { THURROCK } from "@/config/thurrock";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const waterSafety: SafetyPage = {
  slug: "water-safety",
  title: "Water safety",
  summary:
    "Keeping your hot and cold water clean and safe, including how to lower the small risk of Legionella bacteria, and what to do about leaks and blocked drains.",
  emergency: {
    label: "If water is pouring in and you cannot stop it",
    phone: THURROCK.repairs.phone,
    instructions: [
      "Turn off the water at the stopcock. It is usually under the kitchen sink or by the front door.",
      "If water is near sockets, lights or the fuse box, switch off the electricity at the fuse box if you can do it safely.",
      "Move people and belongings away from the water.",
      `Call us on ${THURROCK.repairs.phone}. ${THURROCK.repairs.hours}.`,
      `If sewage is flooding outside or in the street, call ${THURROCK.blockedSewer.provider} on ${THURROCK.blockedSewer.phone}.`,
    ],
  },
  keyFacts: [
    { value: THURROCK.waterSafety.flushUnusedOutlets, label: "run any tap or shower you have not used" },
    { value: THURROCK.waterSafety.cleanShowerHead, label: "clean and descale your shower head" },
    { value: THURROCK.blockedSewer.phone, label: "for sewer flooding, call Anglian Water" },
  ],
  ourResponsibilities: [
    "We assess the risk of Legionella in the shared water systems and tanks we own, and act on what we find.",
    "We keep shared hot water systems hot enough to kill bacteria, and cold water cold enough.",
    "We clean, flush and check shared water tanks and outlets.",
    "We repair leaks, burst pipes and faulty taps, showers and toilets that we own.",
    "We clear blocked drains and pipes that belong to the building.",
    `${THURROCK.blockedSewer.provider} looks after the public sewers and water mains, not us.`,
  ],
  yourResponsibilities: [
    `Run every tap and shower that has not been used for a week for a couple of minutes, hot and cold, ${THURROCK.waterSafety.flushUnusedOutlets}. Do this when you get back from a holiday too.`,
    `Clean and descale your shower head ${THURROCK.waterSafety.cleanShowerHead}. Soak it in a descaler or white vinegar.`,
    "Keep your hot water at the setting we advise. Do not turn it right down to save money without talking to us. Hot water that is too cool lets bacteria grow.",
    "Do not pour fat, oil or food down the sink, and do not flush wipes or nappies.",
    "Know where your stopcock is and check it turns.",
    "Report leaks, drips and slow drains as soon as you notice them.",
    "Let us in when we need to check tanks, pipes or your water heater.",
  ],
  warningSigns: [
    {
      icon: "drop",
      text: "A wet patch, bulge or drip on a ceiling or wall.",
    },
    {
      icon: "tap",
      text: "Taps that splutter, run slowly or have very low pressure.",
    },
    {
      icon: "blocked",
      text: "Sinks, baths or toilets that drain slowly, gurgle or smell.",
    },
    {
      icon: "warning",
      text: "Water that is brown, cloudy or smells bad.",
    },
    {
      icon: "thermometer",
      text: "Hot water that never gets properly hot, or cold water that comes out warm.",
    },
    {
      icon: "mould",
      text: "Slime or scale building up around taps and shower heads.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "Burst pipe, or a leak you cannot stop",
      target: THURROCK.timescales.emergency,
    },
    {
      label: "Blocked toilet if it is your only one, or a leak you can contain",
      target: THURROCK.timescales.urgent,
    },
    {
      label: "Dripping tap or slow drain",
      target: THURROCK.timescales.routine,
    },
    {
      label: "Run taps and showers you have not used",
      target: THURROCK.waterSafety.flushUnusedOutlets,
    },
    {
      label: "Clean and descale your shower head",
      target: THURROCK.waterSafety.cleanShowerHead,
    },
  ],
  furtherReading: [SOURCES.hseLegionella, SOURCES.anglianReport],
  related: [
    "damp-and-mould",
    "electrical-safety",
    "communal-areas",
    "your-safety-checks",
  ],
};
