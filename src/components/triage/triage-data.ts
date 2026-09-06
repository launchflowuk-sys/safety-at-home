import { ORG } from "@/config/organisation";

/**
 * The triage decision tree. Pure data — the TriageTool component walks it.
 * Every phone number comes from ORG. Never write a number here directly.
 */

export type TriagePhone = {
  label: string;
  number: string;
  note?: string;
};

export type TriageQuestion = {
  kind: "question";
  question: string;
  help?: string;
  yes: string; // id of the next node
  no: string; // id of the next node
};

export type TriageResult = {
  kind: "result";
  heading: string;
  phone: TriagePhone;
  alsoCall?: TriagePhone[];
  doNow: string[];
  doNot: string[];
};

export type TriageNode = TriageQuestion | TriageResult;

export type TriageCategory = {
  id: string;
  label: string;
  start: string; // id of the first question node
};

export const TRIAGE_CATEGORIES: TriageCategory[] = [
  { id: "fire", label: "Fire or smoke", start: "fire-q1" },
  { id: "gas", label: "Smell of gas", start: "gas-q1" },
  { id: "water", label: "Water leak or flood", start: "water-q1" },
  { id: "electrical", label: "Electrical problem", start: "elec-q1" },
  { id: "co", label: "Feeling unwell / carbon monoxide", start: "co-q1" },
  { id: "damp", label: "Damp or mould", start: "damp-q1" },
];

export const TRIAGE_NODES: Record<string, TriageNode> = {
  /* ------------------------------------------------------------------
     Fire or smoke
  ------------------------------------------------------------------ */
  "fire-q1": {
    kind: "question",
    question: "Can you see fire or smoke right now?",
    yes: "fire-999",
    no: "fire-q2",
  },
  "fire-q2": {
    kind: "question",
    question: "Is a smoke alarm or heat alarm sounding?",
    yes: "fire-q3",
    no: "fire-concern",
  },
  "fire-q3": {
    kind: "question",
    question: "Have you checked every room and found no sign of fire?",
    help: "For example, the alarm went off because of cooking or steam.",
    yes: "fire-alarm-fault",
    no: "fire-999",
  },
  "fire-999": {
    kind: "result",
    heading: `Get out, stay out, and call ${ORG.emergency.phone}`,
    phone: {
      label: "Fire and rescue",
      number: ORG.emergency.phone,
      note: "Free from any phone",
    },
    doNow: [
      "Get everyone out of the home now.",
      "Close doors behind you as you leave.",
      "Use the stairs. Never use the lift.",
      `Call ${ORG.emergency.phone} once you are outside.`,
    ],
    doNot: [
      "Do not stop to collect belongings.",
      "Do not go back inside for any reason.",
      "Do not try to put out a large fire yourself.",
    ],
  },
  "fire-alarm-fault": {
    kind: "result",
    heading: "Your alarm may be faulty — report it today",
    phone: {
      label: "Housing repairs",
      number: ORG.repairs.phone,
      note: ORG.repairs.hours,
    },
    doNow: [
      "Open windows to clear any cooking smoke or steam.",
      "Press the hush or test button on the alarm.",
      "If it keeps sounding for no reason, call our repairs line.",
    ],
    doNot: [
      "Do not take the battery out of the alarm.",
      "Do not disconnect or cover the alarm.",
    ],
  },
  "fire-concern": {
    kind: "result",
    heading: "Report your fire safety concern to us",
    phone: {
      label: "Housing repairs",
      number: ORG.repairs.phone,
      note: ORG.repairs.hours,
    },
    doNow: [
      "Call our repairs line and describe the problem.",
      "Tell us if it is about a fire door, an alarm, or an escape route.",
      `If things get worse, call ${ORG.emergency.phone}.`,
    ],
    doNot: [
      "Do not prop open fire doors.",
      "Do not block hallways, stairs or escape routes.",
    ],
  },

  /* ------------------------------------------------------------------
     Smell of gas
  ------------------------------------------------------------------ */
  "gas-q1": {
    kind: "question",
    question: "Is anyone feeling faint, sick, or struggling to breathe?",
    yes: "gas-999",
    no: "gas-q2",
  },
  "gas-q2": {
    kind: "question",
    question: "Can you smell gas right now?",
    yes: "gas-leak",
    no: "gas-worried",
  },
  "gas-999": {
    kind: "result",
    heading: `Get into fresh air and call ${ORG.emergency.phone}`,
    phone: {
      label: "Ambulance",
      number: ORG.emergency.phone,
      note: "Free from any phone",
    },
    alsoCall: [
      {
        label: `${ORG.gasLeak.provider} gas emergency line`,
        number: ORG.gasLeak.phone,
        note: `Call after ${ORG.emergency.phone}, from outside`,
      },
    ],
    doNow: [
      "Get everyone outside into fresh air.",
      `Call ${ORG.emergency.phone} and ask for an ambulance.`,
      `Then call ${ORG.gasLeak.provider} to report the gas leak.`,
    ],
    doNot: [
      "Do not go back inside.",
      "Do not turn any switches on or off on your way out.",
    ],
  },
  "gas-leak": {
    kind: "result",
    heading: `Call the ${ORG.gasLeak.provider} gas emergency line now`,
    phone: {
      label: `${ORG.gasLeak.provider} gas emergency line`,
      number: ORG.gasLeak.phone,
      note: "Free, 24 hours a day",
    },
    doNow: [
      "Open windows and doors to let air in.",
      "Turn off the gas at the meter, if you can do it safely.",
      "Go outside, then make the call from there.",
    ],
    doNot: [
      "Do not turn lights or any switches on or off.",
      "Do not smoke, or use matches or lighters.",
      "Do not use anything electrical near the smell.",
    ],
  },
  "gas-worried": {
    kind: "result",
    heading: "Worried about a gas appliance? Tell us",
    phone: {
      label: "Housing repairs",
      number: ORG.repairs.phone,
      note: ORG.repairs.hours,
    },
    doNow: [
      "Stop using the appliance you are worried about.",
      "Call our repairs line to book a gas engineer.",
      `If you smell gas later, call ${ORG.gasLeak.provider} on ${ORG.gasLeak.phone}.`,
    ],
    doNot: [
      "Do not try to fix a gas appliance yourself.",
      "Do not block air vents in rooms with gas appliances.",
    ],
  },

  /* ------------------------------------------------------------------
     Water leak or flood
  ------------------------------------------------------------------ */
  "water-q1": {
    kind: "question",
    question:
      "Is water coming through a light fitting, or near sockets or electrics?",
    yes: "water-electric",
    no: "water-q2",
  },
  "water-q2": {
    kind: "question",
    question: "Is it sewage, or a blocked drain outside your home?",
    yes: "water-sewer",
    no: "water-repairs",
  },
  "water-electric": {
    kind: "result",
    heading: "Turn off the power and call us now",
    phone: {
      label: "Housing repairs (emergency)",
      number: ORG.repairs.phone,
      note: ORG.repairs.hours,
    },
    doNow: [
      "Turn off the electricity at the fuse box, if it is safe to reach.",
      "Turn off the water at the stop tap if you can find it.",
      "Keep everyone away from the wet area.",
      "Call our repairs line. Water near electrics is an emergency.",
    ],
    doNot: [
      "Do not touch light switches or sockets that are wet.",
      "Do not use electrical items in the wet area.",
    ],
  },
  "water-sewer": {
    kind: "result",
    heading: `Call ${ORG.blockedSewer.provider} about the blocked sewer`,
    phone: {
      label: ORG.blockedSewer.provider,
      number: ORG.blockedSewer.phone,
    },
    alsoCall: [
      {
        label: "Housing repairs — if sewage is inside your home",
        number: ORG.repairs.phone,
        note: ORG.repairs.hours,
      },
    ],
    doNow: [
      `Call ${ORG.blockedSewer.provider} about blocked drains and sewers outside.`,
      "If sewage is coming up inside your home, call our repairs line too.",
      "Keep children and pets away from the area.",
    ],
    doNot: [
      "Do not try to clear a sewer yourself.",
      "Do not touch sewage without gloves. Wash your hands well.",
    ],
  },
  "water-repairs": {
    kind: "result",
    heading: "Stop the water if you can, then call us",
    phone: {
      label: "Housing repairs",
      number: ORG.repairs.phone,
      note: ORG.repairs.hours,
    },
    doNow: [
      "Turn off the water at the stop tap. It is usually under the kitchen sink.",
      "Put a bowl or bucket under the leak.",
      "Move your belongings out of the way.",
      "Call our repairs line.",
    ],
    doNot: [
      "Do not ignore a slow leak. It can damage your home and your neighbour's.",
      "Do not touch electrics near the water.",
    ],
  },

  /* ------------------------------------------------------------------
     Electrical problem
  ------------------------------------------------------------------ */
  "elec-q1": {
    kind: "question",
    question: "Can you see sparks or smoke, or smell burning?",
    yes: "elec-danger",
    no: "elec-q2",
  },
  "elec-q2": {
    kind: "question",
    question: "Has your whole street or block lost power?",
    help: "Look outside. Are your neighbours' lights off too?",
    yes: "elec-powercut",
    no: "elec-repairs",
  },
  "elec-danger": {
    kind: "result",
    heading: "Turn off the power and call us now",
    phone: {
      label: "Housing repairs (emergency)",
      number: ORG.repairs.phone,
      note: ORG.repairs.hours,
    },
    alsoCall: [
      {
        label: `If you see flames, call ${ORG.emergency.phone} first`,
        number: ORG.emergency.phone,
      },
    ],
    doNow: [
      "Turn the electricity off at the fuse box, if it is safe to reach.",
      `If you see flames, get everyone out and call ${ORG.emergency.phone}.`,
      "Call our repairs line. Sparks and burning smells are an emergency.",
    ],
    doNot: [
      "Do not touch anything that is sparking, hot or burning.",
      "Do not throw water on anything electrical.",
    ],
  },
  "elec-powercut": {
    kind: "result",
    heading: `It is a power cut — call ${ORG.electricity.provider}`,
    phone: {
      label: ORG.electricity.provider,
      number: ORG.electricity.phone,
      note: "Free to call. Reports power cuts in your area",
    },
    doNow: [
      `Call ${ORG.electricity.phone} to report the power cut and get updates.`,
      "Turn off ovens, hobs and heaters so they do not come back on unattended.",
      "Keep the fridge and freezer doors closed.",
    ],
    doNot: [
      "Do not use candles if you can avoid them. Use a torch or your phone light.",
      "Do not touch the fuse box if there is any sign of damage.",
    ],
  },
  "elec-repairs": {
    kind: "result",
    heading: "Report the electrical fault to us",
    phone: {
      label: "Housing repairs",
      number: ORG.repairs.phone,
      note: ORG.repairs.hours,
    },
    doNow: [
      "Stop using the socket, switch or appliance with the fault.",
      "Turn off that circuit at the fuse box if you know which one it is.",
      "Call our repairs line.",
    ],
    doNot: [
      "Do not try to repair wiring, sockets or switches yourself.",
      "Do not keep using a socket or plug that is cracked, loose or warm.",
    ],
  },

  /* ------------------------------------------------------------------
     Feeling unwell / carbon monoxide
  ------------------------------------------------------------------ */
  "co-q1": {
    kind: "question",
    question: "Is anyone collapsed, very drowsy, or struggling to breathe?",
    yes: "co-999",
    no: "co-q2",
  },
  "co-q2": {
    kind: "question",
    question: "Is your carbon monoxide alarm sounding?",
    yes: "co-alarm",
    no: "co-q3",
  },
  "co-q3": {
    kind: "question",
    question:
      "Do you feel ill at home but better when you go out? For example, headaches, feeling dizzy or sick.",
    help: "These can be signs of carbon monoxide. It is a gas you cannot see or smell.",
    yes: "co-suspect",
    no: "co-check",
  },
  "co-999": {
    kind: "result",
    heading: `Get into fresh air and call ${ORG.emergency.phone}`,
    phone: {
      label: "Ambulance",
      number: ORG.emergency.phone,
      note: "Free from any phone",
    },
    alsoCall: [
      {
        label: `${ORG.gasLeak.provider} gas emergency line`,
        number: ORG.gasLeak.phone,
        note: `Call after ${ORG.emergency.phone}, from outside`,
      },
    ],
    doNow: [
      "Get everyone outside into fresh air now.",
      `Call ${ORG.emergency.phone} and ask for an ambulance.`,
      `Then call ${ORG.gasLeak.provider} on ${ORG.gasLeak.phone}.`,
    ],
    doNot: [
      "Do not go back inside.",
      "Do not turn gas appliances back on.",
    ],
  },
  "co-alarm": {
    kind: "result",
    heading: `Get out and call the ${ORG.gasLeak.provider} gas emergency line`,
    phone: {
      label: `${ORG.gasLeak.provider} gas emergency line`,
      number: ORG.gasLeak.phone,
      note: "Free, 24 hours a day",
    },
    alsoCall: [
      {
        label: "Housing repairs — to arrange a safety check",
        number: ORG.repairs.phone,
        note: ORG.repairs.hours,
      },
    ],
    doNow: [
      "Stop using your cooker, boiler and any gas fire.",
      "Open windows and doors.",
      "Go outside, then call the gas emergency line.",
      `If anyone feels unwell, call ${ORG.emergency.phone} too.`,
    ],
    doNot: [
      "Do not ignore the alarm, even if you feel fine.",
      "Do not sleep in the home until it has been checked.",
    ],
  },
  "co-suspect": {
    kind: "result",
    heading: "This could be carbon monoxide — get it checked now",
    phone: {
      label: `${ORG.gasLeak.provider} gas emergency line`,
      number: ORG.gasLeak.phone,
      note: "Free, 24 hours a day",
    },
    alsoCall: [
      {
        label: "Housing repairs — to book a gas safety check",
        number: ORG.repairs.phone,
        note: ORG.repairs.hours,
      },
    ],
    doNow: [
      "Stop using your gas appliances.",
      "Open windows and get some fresh air.",
      "Call the gas emergency line to get your home checked.",
      "Tell a doctor about your symptoms.",
    ],
    doNot: [
      "Do not keep using an appliance you think is making you ill.",
      "Do not ignore symptoms that keep coming back at home.",
    ],
  },
  "co-check": {
    kind: "result",
    heading: "Book a safety check to put your mind at rest",
    phone: {
      label: "Housing repairs",
      number: ORG.repairs.phone,
      note: ORG.repairs.hours,
    },
    doNow: [
      "Call our repairs line and ask about your gas safety check.",
      "Test your carbon monoxide alarm by pressing the test button.",
      `If you feel very unwell at any point, call ${ORG.emergency.phone}.`,
    ],
    doNot: [
      "Do not block air vents in rooms with gas appliances.",
      "Do not miss your free annual gas service.",
    ],
  },

  /* ------------------------------------------------------------------
     Damp or mould
  ------------------------------------------------------------------ */
  "damp-q1": {
    kind: "question",
    question: "Is water leaking into your home right now?",
    yes: "water-q1",
    no: "damp-q2",
  },
  "damp-q2": {
    kind: "question",
    question:
      "Is the damp or mould affecting anyone's health, or is there a baby, child or older person in the home?",
    yes: "damp-health",
    no: "damp-report",
  },
  "damp-health": {
    kind: "result",
    heading: "Report it today — we must investigate quickly",
    phone: {
      label: "Housing repairs",
      number: ORG.repairs.phone,
      note: ORG.repairs.hours,
    },
    doNow: [
      "Call our repairs line today and tell us about the health concerns.",
      "Take photos of the damp or mould.",
      `By law, we must investigate within ${ORG.awaabsLaw.investigate}.`,
      `Emergency hazards must be made safe within ${ORG.awaabsLaw.emergencyHazard}.`,
    ],
    doNot: [
      "Do not scrub large areas of mould. It can spread spores into the air.",
      "Do not wait to see if it gets better on its own.",
    ],
  },
  "damp-report": {
    kind: "result",
    heading: "Report the damp or mould to us",
    phone: {
      label: "Housing repairs",
      number: ORG.repairs.phone,
      note: ORG.repairs.hours,
    },
    doNow: [
      "Call our repairs line, or email us with photos.",
      "Wipe small patches of mould with a mould spray or soapy water.",
      "Open windows when you cook, wash or dry clothes indoors.",
    ],
    doNot: [
      "Do not paint or wallpaper over mould.",
      "Do not block air vents or turn off extractor fans.",
    ],
  },
};
