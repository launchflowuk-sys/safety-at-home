/**
 * The 14 safety topics shown on the hub page grid. Slugs are the sitemap's
 * single source of truth — never invent a different href for these topics.
 */
export type SafetyTopic = {
  slug: string;
  title: string;
  description: string;
};

export const SAFETY_TOPICS: SafetyTopic[] = [
  {
    slug: "fire-safety",
    title: "Fire safety",
    description:
      "Smoke alarms, fire doors, and what to do if there is a fire in your building.",
  },
  {
    slug: "gas-safety",
    title: "Gas safety",
    description:
      "Your free annual gas service, and what to do if you smell gas.",
  },
  {
    slug: "electrical-safety",
    title: "Electrical safety",
    description:
      "Electrical checks, safe use of sockets, and reporting electrical faults.",
  },
  {
    slug: "carbon-monoxide",
    title: "Carbon monoxide",
    description:
      "The signs of carbon monoxide, your alarm, and what to do if it sounds.",
  },
  {
    slug: "damp-and-mould",
    title: "Damp and mould",
    description:
      "How to report damp and mould, and how quickly we must act under Awaab's Law.",
  },
  {
    slug: "water-safety",
    title: "Water safety",
    description:
      "Legionella, water hygiene, and keeping your hot and cold water safe.",
  },
  {
    slug: "asbestos",
    title: "Asbestos",
    description:
      "Where asbestos may be in older homes, and why you must not disturb it.",
  },
  {
    slug: "building-safety",
    title: "Building safety",
    description:
      "How we keep tall buildings safe, and how residents can raise concerns.",
  },
  {
    slug: "balconies-windows-and-roofs",
    title: "Balconies, windows and roofs",
    description:
      "Using balconies safely, window restrictors, and roof access rules.",
  },
  {
    slug: "e-bikes-and-e-scooters",
    title: "E-bikes and e-scooters",
    description:
      "Charging batteries safely and the rules for storing them in your home.",
  },
  {
    slug: "communal-areas",
    title: "Communal areas",
    description:
      "Keeping shared hallways, stairs and bin rooms clear and safe for everyone.",
  },
  {
    slug: "security-at-home",
    title: "Security at home",
    description:
      "Door entry systems, locks, and keeping your home and block secure.",
  },
  {
    slug: "extra-support",
    title: "Extra support",
    description:
      "Help if you need extra support to stay safe, including help to evacuate.",
  },
  {
    slug: "your-safety-checks",
    title: "Your safety checks",
    description:
      "The checks we carry out in your home, and why you must give us access.",
  },
];
