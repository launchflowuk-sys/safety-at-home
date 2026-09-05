import { THURROCK } from "@/config/thurrock";
import type { SafetyPage } from "@/types/safety-page";

export const fireDoors: SafetyPage = {
  slug: "fire-safety/fire-doors",
  title: "Fire doors",
  summary:
    "Fire doors hold back fire and smoke so you have time to get out. Find out how to check yours, what you must not change, and how we look after them.",
  ourResponsibilities: [
    "We fit fire doors at flat entrances and in the shared areas of our blocks.",
    `In buildings ${THURROCK.fireSafety.tallBuilding}, we check shared-area fire doors ${THURROCK.fireSafety.communalFireDoorCheck} and flat entrance doors ${THURROCK.fireSafety.flatFireDoorCheck}.`,
    "At each check we look at the self-closer, the seals, the glass, the hinges and the frame.",
    "We repair or replace damaged fire doors. A fire door that will not close is an emergency repair.",
  ],
  yourResponsibilities: [
    "Keep your flat entrance door shut when you are not using it. Never wedge or tie it open.",
    "Do not remove or disconnect the self-closer on your door. It is there to shut the door if you cannot.",
    "Do not change your door, fit a cat flap, change the letterbox or replace the door yourself. Ask us first.",
    "Do not paint over the rubber or foam strips around the edge of the door. They swell in heat to seal out smoke.",
    "Let us in to check your door when we ask.",
    "Tell us straight away if your door is damaged or does not close properly.",
  ],
  warningSigns: [
    {
      icon: "door",
      text: "The door does not shut by itself when you let go of it.",
    },
    {
      icon: "warning",
      text: "There is a gap around the edge of the door that you could fit a pound coin in.",
    },
    {
      icon: "seal",
      text: "The rubber or foam strips around the edge are damaged, painted over or missing.",
    },
    {
      icon: "crack",
      text: "There are cracks, holes or dents in the door, or the glass is broken.",
    },
    {
      icon: "hinge",
      text: "The hinges are loose, or the door catches on the frame or floor.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "Fire door that will not close, or has a hole in it",
      target: THURROCK.timescales.emergency,
    },
    {
      label: "Damaged seals, loose hinges or a faulty self-closer",
      target: THURROCK.timescales.urgent,
    },
    {
      label:
        "Scratches, marks or other damage that does not affect how the door works",
      target: THURROCK.timescales.routine,
    },
    {
      label: `Shared-area fire door checks, in buildings ${THURROCK.fireSafety.tallBuilding}`,
      target: THURROCK.fireSafety.communalFireDoorCheck,
    },
    {
      label: `Flat entrance fire door checks, in buildings ${THURROCK.fireSafety.tallBuilding}`,
      target: THURROCK.fireSafety.flatFireDoorCheck,
    },
  ],
  related: [
    "fire-safety",
    "fire-safety/stay-put-or-evacuate",
    "communal-areas",
    "building-safety",
  ],
};
