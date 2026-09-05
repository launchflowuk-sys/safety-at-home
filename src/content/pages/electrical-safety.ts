import { THURROCK } from "@/config/thurrock";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const electricalSafety: SafetyPage = {
  slug: "electrical-safety",
  title: "Electrical safety",
  summary:
    "How we check the wiring in your home, how to use sockets and appliances safely, and what to do about a fault or a power cut.",
  emergency: {
    label: "If there is an electrical fire or someone gets a shock",
    phone: THURROCK.emergency.phone,
    instructions: [
      "Do not touch someone who is still in contact with electricity. Switch off the power at the fuse box first, if you can do it safely.",
      "Never put water on an electrical fire.",
      `If there is a fire, get everyone out, close the door and call ${THURROCK.emergency.phone} from outside.`,
      `If someone has had a shock, call ${THURROCK.emergency.phone} even if they seem fine.`,
    ],
  },
  keyFacts: [
    { value: THURROCK.electricalSafety.inspectionInterval, label: "we test the wiring in your home" },
    { value: THURROCK.electricity.phone, label: "free number to call in a power cut" },
    { value: "1 plug", label: "per socket is the safest way" },
  ],
  ourResponsibilities: [
    `We inspect and test the fixed wiring in your home ${THURROCK.electricalSafety.inspectionInterval}. This is called an electrical installation condition report.`,
    "We repair the wiring, sockets, light fittings, switches and fuse box that we own.",
    "We fit and look after smoke alarms, and the lighting and emergency lighting in shared areas.",
    "We fix any dangerous fault we find during a check straight away.",
    `Power cuts are dealt with by ${THURROCK.electricity.provider}, not us. Call them on ${THURROCK.electricity.phone}. It is free.`,
  ],
  yourResponsibilities: [
    `Let us in for your electrical check ${THURROCK.electricalSafety.inspectionInterval}.`,
    "Do not overload sockets. One plug per socket is safest. Never plug one extension lead into another.",
    "Do not run cables under carpets or rugs, or through doorways where they get squashed.",
    "Never do your own wiring or fit new sockets or lights. Ask us first, and only use a registered electrician.",
    "Look after your own appliances. Check leads and plugs for damage, and stop using anything that is damaged.",
    "Unplug chargers when they are not in use, and do not charge things on beds or sofas.",
    "Do not use electrical appliances in the bathroom unless they are made for it.",
    "Tell us straight away about warm sockets, buzzing, flickering or a burning smell.",
  ],
  warningSigns: [
    {
      icon: "socket",
      text: "Sockets or switches that feel warm, or have scorch marks around them.",
    },
    {
      icon: "spark",
      text: "Fuses that trip or blow often, or sparks when you plug something in.",
    },
    {
      icon: "light",
      text: "Lights that flicker or dim when you turn on another appliance.",
    },
    {
      icon: "warning",
      text: "Buzzing or crackling from a socket, switch or the fuse box.",
    },
    {
      icon: "smoke",
      text: "A burning or fishy smell that you cannot explain.",
    },
    {
      icon: "crack",
      text: "Frayed, cracked or taped-up cables and plugs.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    email: THURROCK.repairs.email,
  },
  timescales: [
    {
      label: "Dangerous fault, or no power in your home when your neighbours have power",
      target: THURROCK.timescales.emergency,
    },
    {
      label: "Faulty socket, switch or light fitting",
      target: THURROCK.timescales.urgent,
    },
    {
      label: "Other electrical repairs",
      target: THURROCK.timescales.routine,
    },
    {
      label: "Electrical inspection of your home",
      target: THURROCK.electricalSafety.inspectionInterval,
    },
  ],
  furtherReading: [SOURCES.esfHome, SOURCES.ukpnPowerCut],
  related: [
    "fire-safety",
    "fire-safety/smoke-and-heat-alarms",
    "e-bikes-and-e-scooters",
    "your-safety-checks",
  ],
};
