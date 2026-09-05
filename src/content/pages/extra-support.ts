import { THURROCK } from "@/config/thurrock";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const extraSupport: SafetyPage = {
  slug: "extra-support",
  title: "Extra support",
  summary:
    "If you, or someone you live with, would find it harder to stay safe at home, tell us. We can adapt how we work with you, and put a plan in place for an emergency.",
  keyFacts: [
    { value: "Tell us", label: "about any health condition, disability or need. We keep it private" },
    { value: "Free", label: "home safety visit from the fire service, arranged with you" },
    { value: "Your plan", label: "a written evacuation plan if you would need help to leave" },
  ],
  ourResponsibilities: [
    "We ask every tenant if they need extra support, and we record what you tell us so you do not have to repeat it.",
    "We offer a personal emergency evacuation plan if you would find it hard to leave in a fire.",
    "We can arrange a free home safety visit from the fire service, who can fit alarms you can see or feel, not just hear.",
    "We can give you letters and safety information in large print, easy read, another language or by phone.",
    "We can book longer appointments, send the same engineer where possible, or arrange for someone to be with you during visits.",
    "We can refer you for aids and adaptations, such as grab rails, level-access showers or door entry changes.",
    "We can help you get support with heating costs, so you are not choosing between warmth and damp.",
  ],
  yourResponsibilities: [
    "Tell us if you or anyone in your home has a disability, health condition, or is very young or older, and what would help.",
    "Tell us if things change, for example a new diagnosis, a carer moving in, or if you no longer need support.",
    "Let us know the best way to contact you, and if you need someone else to speak for you.",
    "Keep our number and the emergency numbers somewhere you can reach them.",
    "Let us in for safety checks. Tell us if you need a longer appointment or a specific time.",
  ],
  howToReport: {
    phone: THURROCK.housingPolicy.phone,
    email: THURROCK.repairs.email,
  },
  furtherReading: [SOURCES.ecfrsHomeVisit, SOURCES.thurrockHousing],
  related: [
    "fire-safety/help-to-evacuate",
    "damp-and-mould",
    "your-safety-checks",
    "security-at-home",
  ],
};
