import { ORG } from "@/config/organisation";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const asbestos: SafetyPage = {
  slug: "asbestos",
  title: "Asbestos",
  summary:
    "Many homes built before 2000 contain some asbestos. It is safe if it is in good condition and left alone. It is only a risk if it is damaged or disturbed, so never drill, sand or scrape without asking us first.",
  keyFacts: [
    { value: "Before 2000", label: "homes built before this may contain asbestos" },
    { value: "Ask first", label: "before you drill, sand or scrape anything" },
    { value: ORG.timescales.emergency, label: "to make damaged asbestos safe" },
  ],
  ourResponsibilities: [
    "We keep a record of where asbestos is, or may be, in our homes and buildings. You can ask us what we know about your home.",
    "We inspect asbestos we know about and keep it in good condition, seal it, or remove it.",
    "Only trained and licensed contractors remove or work on asbestos for us.",
    "We check our records before we or our contractors carry out repairs in your home.",
    "If asbestos is damaged, we treat it as an emergency and make it safe.",
    "We tell you before any asbestos work in your home, and explain what will happen.",
  ],
  yourResponsibilities: [
    "Ask us before you drill, sand, scrape or remove anything in your home, especially textured ceilings, floor tiles, panels behind boilers or around pipes, and soffits outside.",
    "Do not try to remove or repair anything you think may contain asbestos.",
    "If you damage something and think it may be asbestos: stop, leave the room, close the door and call us. Do not sweep or vacuum the dust.",
    "Do not let friends or tradespeople carry out work without checking with us first.",
    "Report damage such as cracks, holes or crumbling to walls, ceilings, panels or pipe covers.",
    "Let us in to inspect or carry out asbestos work when we ask.",
  ],
  warningSigns: [
    {
      icon: "crack",
      text: "Cracked, flaking or crumbling textured ceiling or wall coatings.",
    },
    {
      icon: "warning",
      text: "Broken or lifting old floor tiles, or damaged panels behind a boiler or bath.",
    },
    {
      icon: "blocked",
      text: "Torn or damaged white or grey covering on old pipes or in a boiler cupboard.",
    },
    {
      icon: "drop",
      text: "Ceiling boards that have been damaged by a leak and are sagging or breaking up.",
    },
    {
      icon: "smoke",
      text: "Dust left behind after drilling or work on an old ceiling, wall or floor.",
    },
  ],
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: ORG.repairs.phone,
    email: ORG.repairs.email,
  },
  timescales: [
    {
      label: "Damaged material that may contain asbestos",
      target: ORG.timescales.emergency,
    },
    {
      label: "Inspection of material in good condition that you are worried about",
      target: ORG.timescales.routine,
    },
    {
      label: "Planned removal or sealing work",
      target: ORG.timescales.batch,
    },
  ],
  furtherReading: [SOURCES.hseAsbestos],
  related: ["your-safety-checks", "damp-and-mould", "building-safety"],
};
