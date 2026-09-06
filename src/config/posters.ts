import { THURROCK } from "@/config/thurrock";

/**
 * Printed safety posters, shown on topic pages by `PosterGallery`.
 *
 * A poster is an image of text, which on its own fails WCAG 2.2 AA (1.4.5).
 * Every poster therefore carries a full `transcript` that the page renders as
 * real HTML text in a disclosure. Keep the transcript faithful to the printed
 * poster — it is a record of what residents see on the wall of their block,
 * so do not tidy the wording or merge two posters that disagree.
 *
 * Phone numbers and email addresses inside a transcript still come from
 * `THURROCK`, so a change of number can never leave stale text behind.
 *
 * Images live in `public/posters/` as a WebP (shown) and a JPEG (fallback and
 * "open full size"). Re-export both if a poster is replaced, and update
 * `fileSize`.
 */

export type PosterTranscriptSection = {
  heading: string;
  intro?: string;
  items?: string[];
};

export type Poster = {
  slug: string;
  title: string;
  /** One line on what the poster covers, shown under the title. */
  summary: string;
  /** Short description for anyone who cannot see the image. */
  alt: string;
  /** Who produced it. Shown so residents know the advice is official. */
  source: string;
  width: number;
  height: number;
  /** Size of the full-size JPEG, shown on the "open full size" link. */
  fileSize: string;
  transcript: PosterTranscriptSection[];
};

const THURROCK_BST = "Thurrock Council Building Safety Team";
const ECFRS = "Essex County Fire & Rescue Service";

export const POSTERS = {
  buildingSafetyTeam: {
    slug: "building-safety-team",
    title: "Building Safety Team: working together for safer homes",
    summary:
      "Who the Building Safety Team are, what they do for higher-risk buildings, and how to contact your Building Safety Manager.",
    alt: "Poster titled Building Safety Team, working together for safer homes. It lists what the team does, the safety checks they carry out, how they work with residents, and the team's email address.",
    source: THURROCK_BST,
    width: 1024,
    height: 1536,
    fileSize: "328KB",
    transcript: [
      {
        heading: "Working together for safer homes",
        intro:
          "The Building Safety Team focuses mainly on our higher-risk residential buildings (HRBs) to ensure they are maintained and comply with all requirements of the Building Safety Act. Building Safety Managers produce Building Safety Cases for these buildings and act as the key point of contact for the regulator, fire and rescue services, and residents.",
      },
      {
        heading: "What the team does",
        items: [
          "Registering and deregistering, and managing the council's high-rise residential buildings",
          "Preparing and implementing a resident engagement strategy",
          "Keeping information about higher-risk buildings, the 'golden thread' of information",
          "Holding “Meet your Building Safety Manager” sessions at your door when carrying out flat entrance door inspections",
          "Operating a complaints system for building safety in high-rise buildings",
          "Preparing safety case reports",
          "Creating and implementing a Mandatory Occurrence Reporting system",
        ],
      },
      {
        heading: "Safety checks we carry out",
        items: [
          "Weekly: fire alarm checks",
          "Monthly: automatic opening vent (AOV) checks",
          "Monthly: emergency lighting (EL) checks",
          "Quarterly: fire door checks",
        ],
      },
      {
        heading: "Working with residents",
        items: [
          "Supporting residents with building safety information",
          "Listening to concerns and helping resolve safety issues",
          "Working with fire and rescue services, the regulator and council teams",
        ],
      },
      {
        heading: "Contact your Building Safety Team",
        intro: `Email ${THURROCK.buildingSafety.email}. If you have any concerns about your building or would like to speak to your Building Safety Manager, please get in touch.`,
      },
    ],
  },

  buildingSafetyChecks: {
    slug: "building-safety-checks",
    title: "Building safety checks",
    summary:
      "Examples of the routine checks the Building Safety Team carries out in high-rise blocks, and how often.",
    alt: "Poster titled Building Safety Checks. It groups routine checks into weekly, monthly and quarterly, with photographs of a fire alarm panel, a call point, an automatic opening vent, a lift, a dry riser, emergency lighting, a fire door, a flat entrance door and a safety audit.",
    source: THURROCK_BST,
    width: 1055,
    height: 1491,
    fileSize: "344KB",
    transcript: [
      {
        heading: "Examples of routine checks carried out by the Building Safety Team",
        intro:
          "Regular safety checks help ensure high-rise residential buildings remain safe, compliant and well maintained for residents.",
      },
      {
        heading: "Weekly",
        items: [
          "Fire alarm tests, on the fire alarm panel, alarm sounder and call points",
          "Automatic opening vent (AOV) checks",
          "Escape routes kept clear",
        ],
      },
      {
        heading: "Monthly",
        items: ["Lift checks", "Dry riser checks", "Emergency lighting (EL) checks"],
      },
      {
        heading: "Quarterly",
        items: [
          "Fire door checks",
          "Flat entrance door (FED) checks on a best endeavours basis",
          "Building safety audits",
        ],
      },
      {
        heading: "For more information",
        intro: `Contact the Building Safety Team at ${THURROCK.buildingSafety.email}.`,
      },
    ],
  },

  importanceOfFireDoors: {
    slug: "importance-of-fire-doors",
    title: "The importance of fire doors",
    summary:
      "Why fire doors matter, what you must never change or damage, and how to tell whether your flat has one.",
    alt: "Poster titled The Importance of Fire Doors: use them, keep them shut, keep everyone safe. It shows photographs of a communal fire door and a flat entrance fire door, lists what residents must not do to a fire door, and explains when a flat is unlikely to have one.",
    source: THURROCK_BST,
    width: 1055,
    height: 1491,
    fileSize: "316KB",
    transcript: [
      {
        heading: "Use them. Keep them shut. Keep everyone safe.",
        intro:
          "Most flats are fitted with fire doors or fire door sets. Fire doors are a critical safety feature, as they prevent a fire spreading throughout a building. If a flat door fails to work correctly, it will let smoke and flames move around the building and could prevent residents from escaping.",
      },
      {
        heading: "It is therefore important residents do not",
        items: [
          "Remove or tamper with the closing device",
          "Change their flat door without our consent",
          "Damage their flat door, which includes damaging the frame by forcing it open",
          "Change the lock, letterbox or hinges",
          "Install additional items on the door, such as extra locks, a viewer or a door chain",
          "Install an external security gate",
        ],
      },
      {
        heading: "It is unlikely your flat has a fire door if",
        items: [
          "You access your flat directly from the street",
          "It is on the ground floor and you do not walk through an enclosed building entrance area",
          "You live in a purpose-built block of flats and access your home from an open balcony walkway, and on leaving your home you could turn left or right to reach a staircase or exit door",
        ],
      },
      {
        heading: "Fire doors only work when kept closed",
        intro: `Thank you for helping to keep our building safe. If you have any concerns about your fire door, please contact the Thurrock Council Building Safety Team at ${THURROCK.buildingSafety.email}.`,
      },
    ],
  },

  highRiseFireSafety: {
    slug: "high-rise-fire-safety",
    title: "High-rise fire safety: what to do if there is a fire",
    summary:
      "Essex County Fire & Rescue Service advice for high-rise blocks, covering a fire in your flat, a fire elsewhere, and being trapped.",
    alt: "Poster from Essex County Fire & Rescue Service titled High-Rise Fire Safety: what to do in the event of a fire in your building. It gives five numbered sections covering a fire in your flat, a fire in another flat, being trapped, protecting your home and being prepared.",
    source: ECFRS,
    width: 1055,
    height: 1491,
    fileSize: "388KB",
    transcript: [
      {
        heading: "Guidance from Essex County Fire & Rescue Service",
        intro:
          "Most high-rise blocks have a 'stay put' policy. Check your building's fire procedure with your landlord, managing agent or council.",
      },
      {
        heading: "1. If there is a fire in your flat",
        items: [
          `Follow your escape plan: get everyone out, stay out, call ${THURROCK.emergency.phone}`,
          "Close all doors behind you as you leave",
          "Use the stairs or nearest fire exit",
          "Do not use the lift",
        ],
      },
      {
        heading: "2. If there is a fire in another flat",
        items: [
          "If your flat is unaffected by heat or smoke, stay put",
          "Close your doors and windows",
          `Call ${THURROCK.emergency.phone}. Never assume someone else has already called`,
          "Leave only if the fire service tells you to",
        ],
      },
      {
        heading: "3. If you are trapped in your flat",
        items: [
          "Get everyone into the safest room, away from smoke and heat",
          `Call ${THURROCK.emergency.phone} immediately`,
          "Tell the fire service your flat number and floor number",
          "If a full evacuation is needed, firefighters will go door to door",
        ],
      },
      {
        heading: "4. Protect your home",
        items: [
          "Fit at least one smoke alarm in your flat",
          "Test your smoke detector regularly and if it is not working report it to Repairs",
          "Never remove the batteries",
          "Always follow the manufacturer's advice",
        ],
      },
      {
        heading: "5. Be prepared",
        items: [
          "Keep exits clear at all times",
          "Keep door and window keys near the exit",
          "Prepare a grab bag with essentials such as medicines, important documents, spare keys, a phone charger and a torch",
          "Get to know your neighbours, as some may need help in an emergency",
        ],
      },
      {
        heading: `In an emergency call ${THURROCK.emergency.phone}`,
        intro: `For building specific fire safety information please contact the Thurrock Council Building Safety Team at ${THURROCK.buildingSafety.email}.`,
      },
    ],
  },
} as const satisfies Record<string, Poster>;
