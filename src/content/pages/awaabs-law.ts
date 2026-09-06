import { ORG } from "@/config/organisation";
import { SOURCES } from "@/config/sources";
import type { SafetyPage } from "@/types/safety-page";

export const awaabsLaw: SafetyPage = {
  slug: "damp-and-mould/awaabs-law",
  title: "Awaab's Law",
  summary:
    "Awaab's Law sets strict time limits for social landlords like us to deal with damp, mould and other dangerous hazards. This page explains what we must do and by when, and helps you work out your own dates.",
  keyFacts: [
    { value: ORG.awaabsLaw.investigate, label: "to investigate a possible hazard" },
    { value: ORG.awaabsLaw.writtenReport, label: "to give you a written summary" },
    { value: ORG.awaabsLaw.repairStart, label: "to start repairs on a significant hazard" },
  ],
  ourResponsibilities: [
    `We investigate within ${ORG.awaabsLaw.investigate} of finding out about a possible hazard. This usually means visiting your home.`,
    `We give you a written summary of what we found within ${ORG.awaabsLaw.writtenReport}. It says if there is a hazard, how serious it is, and what we will do.`,
    `If there is a significant hazard, we make your home safe or start repairs within ${ORG.awaabsLaw.repairStart}.`,
    "We finish the repairs within a reasonable time, and tell you how long we expect them to take.",
    `If a hazard is an emergency, we investigate and take action within ${ORG.awaabsLaw.emergencyHazard}.`,
    "If we cannot make your home safe in these time limits, we offer you somewhere suitable to stay, at no cost to you, until it is safe.",
    "We keep a record of every report, visit and repair, and we tell you who is dealing with your case.",
  ],
  yourResponsibilities: [
    "Tell us about the problem as soon as you can. The clock starts when we know about it.",
    "Write down the date you told us, and how. Keep any emails or letters.",
    "Let us in to investigate and do the repairs. If we cannot get in, the time limits pause until we can.",
    "Tell us about anyone in your home with a health condition, and about children, older people or anyone who is pregnant.",
    "If we miss a time limit, tell us straight away and make a complaint. You can also contact the Housing Ombudsman, which is free.",
  ],
  howToReport: {
    online: {
      label: "Report damp or mould online",
      href: "/safety-at-home/damp-and-mould/report-damp-or-mould",
    },
    phone: ORG.repairs.phone,
    email: ORG.repairs.email,
  },
  timescales: [
    {
      label: "Investigate a possible hazard",
      target: `within ${ORG.awaabsLaw.investigate}`,
    },
    {
      label: "Written summary of what we found",
      target: `within ${ORG.awaabsLaw.writtenReport}`,
    },
    {
      label: "Make safe or start repairs for a significant hazard",
      target: `within ${ORG.awaabsLaw.repairStart}`,
    },
    {
      label: "Investigate and act on an emergency hazard",
      target: `within ${ORG.awaabsLaw.emergencyHazard}`,
    },
  ],
  furtherReading: [SOURCES.govAwaabsLaw, SOURCES.housingOmbudsman, SOURCES.govDampHealth],
  related: [
    "damp-and-mould",
    "damp-and-mould/report-damp-or-mould",
    "damp-and-mould/prevent-condensation",
  ],
};
