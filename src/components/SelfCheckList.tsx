"use client";

import { ORG } from "@/config/organisation";

/**
 * A printable list of the checks a resident does themselves, grouped by how
 * often. Every interval comes from `ORG`, so it can never drift from the rest
 * of the site.
 *
 * Printing is handled by a print stylesheet in globals.css rather than a PDF
 * library: it keeps the client bundle small, respects the reader's own paper
 * size and font settings, and works offline. The tick boxes and date lines
 * are real boxes so the sheet is usable on a fridge door.
 */

type Item = { text: string; why: string };
type Group = { when: string; items: Item[] };

function groups(): Group[] {
  return [
    {
      when: ORG.fireSafety.alarmTest.replace(/^once a /, "Every ") + " — alarms",
      items: [
        {
          text: "Press and hold the test button on every smoke alarm until it sounds",
          why: "A silent alarm is an emergency repair. Tell us the same day.",
        },
        {
          text: "Test the carbon monoxide alarm the same way",
          why: "Carbon monoxide has no smell, so the alarm is your only warning.",
        },
        {
          text: "Check no alarm is covered, painted or hanging loose",
          why: "Never take one down, even if cooking sets it off.",
        },
      ],
    },
    {
      when: "Every month — your way out",
      items: [
        {
          text: "Open your flat door, let go, and check it shuts fully on its own",
          why: "A fire door only works closed. If it sticks or stops short, tell us.",
        },
        {
          text: "Check the hallway and stairs outside your door are clear",
          why: "Anything stored there blocks the way out for the whole block.",
        },
        {
          text: "Check window restrictors still hold the window",
          why: "They stop a child falling. Report a broken one straight away.",
        },
      ],
    },
    {
      when: `Every week — water you do not use`,
      items: [
        {
          text: `Run any tap or shower you have not used, ${ORG.waterSafety.flushUnusedOutlets}`,
          why: "Still water lets bacteria grow. Run it hot and cold for two minutes.",
        },
      ],
    },
    {
      when: `Every 3 months — shower head`,
      items: [
        {
          text: `Take the shower head off and descale it, ${ORG.waterSafety.cleanShowerHead}`,
          why: "Soak it in descaler or white vinegar, then rinse it through.",
        },
      ],
    },
    {
      when: "Every winter — damp and mould",
      items: [
        {
          text: "Look behind furniture and wardrobes on outside walls",
          why: "Mould starts where air cannot move. Tell us as soon as you see it.",
        },
        {
          text: "Check the extractor fan pulls a sheet of paper against it",
          why: "If it does not hold the paper, the fan is not working. Report it.",
        },
      ],
    },
    {
      when: "Let us in when we ask",
      items: [
        {
          text: `Gas safety check, ${ORG.gasSafety.serviceInterval}`,
          why: "Free, and required by law. We write to you first.",
        },
        {
          text: `Electrical inspection, ${ORG.electricalSafety.inspectionInterval}`,
          why: "We test the wiring we own and fix anything unsafe.",
        },
      ],
    },
  ];
}

function TickBox() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-sm border-2 border-ink-soft bg-surface print:border-black"
    />
  );
}

export function SelfCheckList() {
  return (
    <section
      aria-labelledby="self-check-heading"
      className="print-sheet rounded-card border-l-8 border-positive bg-surface p-6 shadow-card"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="self-check-heading" className="text-2xl font-bold">
            Your own safety checks
          </h2>
          <p className="mt-2 max-w-prose text-ink-soft">
            The checks only you can do, and how often. Print this and keep it
            somewhere you will see it.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="no-print shrink-0 rounded-card bg-brand px-5 py-3 font-bold text-white hover:bg-brand-deep"
        >
          Print this checklist
        </button>
      </div>

      <ul className="mt-6 space-y-6">
        {groups().map((group) => (
          <li key={group.when}>
            <h3 className="border-b-2 border-ink pb-1 text-lg font-bold">
              {group.when}
            </h3>
            <ul className="mt-3 space-y-3">
              {group.items.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <TickBox />
                  <div>
                    <p className="font-semibold">{item.text}</p>
                    <p className="text-sm text-ink-soft">{item.why}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-card border border-line p-4">
        <p className="font-bold">Something wrong? Tell us.</p>
        <p className="mt-1">
          Repairs {ORG.repairs.phone}. {ORG.repairs.hours}. A smoke alarm or a
          fire door that does not work is an emergency repair, done within{" "}
          {ORG.timescales.emergency}.
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          Date printed:{" "}
          <span className="inline-block w-40 border-b border-ink-soft" />
        </p>
      </div>
    </section>
  );
}
