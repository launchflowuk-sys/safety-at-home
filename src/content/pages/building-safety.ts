import { THURROCK } from "@/config/thurrock";
import { POSTERS } from "@/config/posters";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const buildingSafety: SafetyPage = {
  slug: "building-safety",
  title: "Building safety information",
  summary:
    "How we keep our blocks of flats safe, what the Building Safety Act means for you, and how to raise a concern about your building and take it further if we do not put it right.",
  keyFacts: [
    {
      value: THURROCK.buildingSafety.higherRiskBuilding,
      label: "makes a block a higher-risk building under the law",
    },
    {
      value: THURROCK.buildingSafety.accessNotice,
      label: "written notice before we ask to come into your home",
    },
    {
      value: "Your say",
      label: "we must ask residents before big building safety decisions",
    },
  ],
  emergency: {
    label: "If there is a fire in your building",
    phone: THURROCK.emergency.phone,
    instructions: [
      "Follow the fire action notice in your block. It tells you whether to stay put or leave.",
      "If the fire is in your own home, always leave. Close doors behind you.",
      "Do not use the lift.",
      `Call ${THURROCK.emergency.phone} once you are safe.`,
    ],
  },
  ourResponsibilities: [
    `We are the 'accountable person' for our higher-risk buildings. These are blocks ${THURROCK.buildingSafety.higherRiskBuilding}. We register each one with the Building Safety Regulator.`,
    "We assess the risks of fire spreading and of the structure failing in each higher-risk building, and we keep a safety case report that shows how we manage those risks.",
    "We keep up-to-date information about each building: plans, materials, fire safety systems and past works. This is called the 'golden thread'.",
    "We check outside walls and cladding, and fix or remove materials that are not safe.",
    `We carry out a fire risk assessment for every block, and check fire doors in shared areas ${THURROCK.fireSafety.communalFireDoorCheck} in buildings ${THURROCK.fireSafety.tallBuilding}.`,
    "We run a complaints system just for building safety, so a safety concern is never treated as an ordinary repair.",
    "We report serious safety incidents to the Building Safety Regulator through Mandatory Occurrence Reporting, and tell you what we are doing about them.",
    "We ask residents for their views on building safety decisions, and we tell you how we used them.",
    "We give you clear safety information for your building, in a format you can use.",
  ],
  yourResponsibilities: [
    "Keep fire doors shut, and never remove or disconnect a self-closer.",
    "Do not store anything in hallways, stairwells or bin rooms. These are your way out.",
    "Do not change walls, doors, windows, sprinklers or fire alarms in your home without asking us first.",
    "Do not tamper with fire safety equipment in shared areas.",
    "Let us in when we need to inspect your home or carry out safety work.",
    "Tell us straight away about damage to the building, or anything you think is unsafe.",
    "Tell us if someone in your home would need help to leave in a fire.",
    "Take part when we ask for your views. Your feedback shapes how we keep the building safe.",
  ],
  explainers: [
    {
      heading: "Is my block a higher-risk building?",
      intro: `A block is a 'higher-risk building' if it is ${THURROCK.buildingSafety.higherRiskBuilding} and has at least two homes in it. These blocks must be registered with the Building Safety Regulator, and we must keep a safety case report for each one.`,
      items: [
        "Use the address lookup near the top of this page. It tells you whether your block is higher-risk, and whether it uses a stay put or evacuate plan.",
        "You can also search the national register by postcode on GOV.UK.",
        "If your block is not higher-risk, it is still covered by a fire risk assessment, fire door checks and everything else on this page. The extra rules simply do not apply to it.",
      ],
    },
    {
      heading: "Your rights under the Building Safety Act",
      intro:
        "The Act was passed after the Grenfell Tower fire. It gives residents of higher-risk buildings a much stronger position.",
      items: [
        "You have more say in how your building is kept safe, and we must ask your views before big safety decisions.",
        "You can ask us for safety information about your building, and we must give it to you in a form you can use.",
        "You can raise a building safety concern directly with us, and we must have a proper process for handling it.",
        "If you feel your concern is being ignored, you can take it to the Building Safety Regulator.",
        "Homeowners have longer to claim compensation for poor building work. The window was extended from 6 years to 15 years.",
      ],
    },
    {
      heading: "Your legal duties as a resident",
      intro:
        "Under the Act, a resident is anyone aged 16 or over who lives in or owns a home in the building. That includes tenants, leaseholders and private renters. What you do can affect everyone else in the block, and you may be breaking the law if you do not act responsibly.",
      items: [
        "You must not damage, remove or interfere with safety items. That includes fire doors, signs, sprinklers, smoke alarms and fire extinguishers.",
        "You must not do anything that creates or increases the risk of fire spreading or the building failing. That includes building work or alterations in your home.",
        "You must give us any information we reasonably ask for so we can carry out our safety duties.",
        "You must keep your own home safe.",
      ],
    },
    {
      heading: "When we need to come into your home",
      intro:
        "We sometimes need access to assess or manage a building safety risk, or because we think something in a home is putting the building at risk. The law sets out how we must ask.",
      items: [
        "Our request must be in writing.",
        "It must explain why we need to come in.",
        `It must be made at least ${THURROCK.buildingSafety.accessNotice} before the time we want to visit.`,
        "If the time does not suit you, tell us and we will arrange another.",
        "If access is refused, we can apply to a court for an order. The court must agree that access is necessary and that we asked correctly.",
        "If a court makes an order, it can allow us to enter at a set time and to take measurements, photographs, recordings or samples.",
      ],
    },
    {
      heading: "If you are a leaseholder",
      intro:
        "The Act protects qualifying leaseholders from paying for safety problems they did not cause. A qualifying leaseholder generally means someone living in their own home, who owns no more than three homes in the UK in total.",
      items: [
        "You cannot be charged for removing or fixing unsafe cladding.",
        "You have strong protection from the costs of other historical safety defects, including interim measures such as a waking watch.",
        "Building owners can no longer treat leaseholders as the first place to go for the cost of historical safety defects.",
        "If you are unsure whether you qualify, contact the Building Safety Team and we will explain how it applies to your lease.",
      ],
    },
    {
      heading: "How we involve residents",
      intro:
        "We have a resident engagement strategy. It sets out how we tell you about building safety decisions and how you can influence them. Ask the Building Safety Team for a copy.",
      items: [
        "We ask for your views before decisions that affect the safety of your block, and we tell you how we used them.",
        "We hold 'Meet your Building Safety Manager' sessions at your door when we carry out flat entrance door inspections.",
        "Your Building Safety Manager is the named point of contact for your block, and works with the regulator and the fire service.",
        "We publish safety information for your building and keep it up to date.",
      ],
    },
  ],
  warningSigns: [
    {
      icon: "crack",
      text: "New or growing cracks in outside walls, ceilings or around windows.",
    },
    {
      icon: "warning",
      text: "Cladding or panels on the outside of the building that are loose, damaged or missing.",
    },
    {
      icon: "door",
      text: "Fire doors in shared areas that are propped open or do not close.",
    },
    {
      icon: "alarm",
      text: "Fire alarms, extinguishers or emergency lights that are damaged, missing or covered.",
    },
    {
      icon: "drop",
      text: "Water coming through a ceiling or wall from the flat above or from the roof.",
    },
    {
      icon: "blocked",
      text: "Rubbish, bikes, prams or furniture left in hallways or stairwells.",
    },
  ],
  posters: [
    POSTERS.buildingSafetyTeam,
    POSTERS.buildingSafetyChecks,
    POSTERS.importanceOfFireDoors,
    POSTERS.highRiseFireSafety,
  ],
  escalation: {
    heading: "Raise a building safety concern",
    intro:
      "A building safety concern is anything that could let fire spread, or could affect how the building stands up. Start with us. If we do not put it right, you can take it further, and it is free to do so.",
    steps: [
      {
        title: "Tell us",
        detail: `Email the Building Safety Team at ${THURROCK.buildingSafety.email}, or call ${THURROCK.repairs.phone} if it needs attention now. Tell us your block, your flat number and what you have seen. Photographs help.`,
      },
      {
        title: "Ask for our building safety complaints process",
        detail:
          "We must tell you what counts as a building safety complaint and how long we will take. We will confirm we have got yours, decide whether it is a building safety complaint, investigate it, and send you a final response saying what we will do and when.",
      },
      {
        title: "Come back to us if you are not satisfied",
        detail:
          "Our final response explains how to challenge it. Use that first, so we have a chance to put things right.",
      },
      {
        title: `Contact the ${THURROCK.buildingSafetyRegulator.provider}`,
        detail: `If we have not dealt with your concern, or you are still not satisfied, take it to the regulator. Call ${THURROCK.buildingSafetyRegulator.phone} or complain on GOV.UK, and send them our final response. They deal with fire spread and structural risks in high-rise buildings. ${THURROCK.buildingSafetyRegulator.hours}.`,
      },
      {
        title: "Contact the Housing Ombudsman",
        detail:
          "If your complaint is about how we treated you as a landlord, rather than a building safety risk, the Housing Ombudsman can look at it. This is free.",
      },
    ],
  },
  howToReport: {
    online: { label: "Use our get help tool", href: "/safety-at-home/emergency" },
    phone: THURROCK.repairs.phone,
    // Building concerns go to the Building Safety Team, as the posters say.
    email: THURROCK.buildingSafety.email,
  },
  timescales: [
    {
      label:
        "Emergency, such as a fire door that will not close or a serious structural fault",
      target: THURROCK.timescales.emergency,
    },
    { label: "Urgent building repair", target: THURROCK.timescales.urgent },
    { label: "Routine building repair", target: THURROCK.timescales.routine },
    {
      label: `Fire door checks in shared areas, in buildings ${THURROCK.fireSafety.tallBuilding}`,
      target: THURROCK.fireSafety.communalFireDoorCheck,
    },
    {
      label: "Written notice before we ask to come into your home",
      target: THURROCK.buildingSafety.accessNotice,
    },
  ],
  furtherReading: [
    SOURCES.govYourHomeYourSafety,
    SOURCES.govFindHighRise,
    SOURCES.govComplainBuildingSafety,
    SOURCES.govContactBsr,
    SOURCES.govBsr,
    SOURCES.hseBuildingSafety,
    SOURCES.ecfrsHighRise,
    SOURCES.housingOmbudsman,
  ],
  related: [
    "fire-safety",
    "fire-safety/stay-put-or-evacuate",
    "fire-safety/fire-doors",
    "fire-safety/help-to-evacuate",
    "communal-areas",
    "balconies-windows-and-roofs",
  ],
};
