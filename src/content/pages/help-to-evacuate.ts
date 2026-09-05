import { THURROCK } from "@/config/thurrock";
import type { SafetyPage } from "@/types/safety-page";

export const helpToEvacuate: SafetyPage = {
  slug: "fire-safety/help-to-evacuate",
  title: "Help to evacuate",
  summary:
    "If you would find it hard to leave your home in a fire, tell us. We will work with you on a plan so that you can get out, or get help.",
  emergency: {
    label: "If there is a fire and you cannot leave",
    phone: THURROCK.emergency.phone,
    instructions: [
      `Call ${THURROCK.emergency.phone}. Tell them your address, your floor, your flat number, and that you cannot get out.`,
      "Close the door of the room you are in. Block any gaps with towels or bedding.",
      "Stay near a window if it is safe to do so, so firefighters can see you.",
      "Stay on the phone. The operator will tell you what to do next.",
    ],
  },
  ourResponsibilities: [
    "We ask every tenant if they would need help to leave in a fire.",
    "If you tell us you need help, we will visit you to talk about a personal emergency evacuation plan. This is often called a PEEP. It is a written plan of how you will get out, or get help.",
    "With your agreement, we share your plan with Essex County Fire and Rescue Service. This means they know where people who need help live.",
    "We keep this information private and only use it for your safety.",
    "We review your plan if your needs change, or if your home changes.",
  ],
  yourResponsibilities: [
    "Tell us if you, or anyone in your home, would need help to leave in a fire. This might be because of mobility, sight, hearing, health or age.",
    "Tell us if things change. For example, a new health condition, a new person living with you, or if you no longer need help.",
    "Keep your way out clear, and keep any mobility aids where you can reach them.",
    `Keep a phone by your bed so you can call ${THURROCK.emergency.phone} if you cannot leave.`,
    "Know which plan your block has: 'stay put' or 'evacuate'. It is on the fire action notice.",
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  related: [
    "fire-safety",
    "fire-safety/stay-put-or-evacuate",
    "extra-support",
  ],
};
