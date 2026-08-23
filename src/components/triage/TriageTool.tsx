"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { telHref } from "@/config/thurrock";
import {
  TRIAGE_CATEGORIES,
  TRIAGE_NODES,
  type TriagePhone,
  type TriageResult,
} from "./triage-data";

/**
 * Emergency triage tool. Walks the decision tree in triage-data.ts.
 * All state lives in React — no storage, no network calls.
 */
export function TriageTool() {
  // History of visited node ids. Empty = the "What's happening?" start screen.
  const [history, setHistory] = useState<string[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const currentId = history[history.length - 1];
  const node = currentId ? TRIAGE_NODES[currentId] : undefined;

  // Move focus to the step heading whenever the step changes, so screen
  // reader and keyboard users always land on the new content.
  useEffect(() => {
    headingRef.current?.focus();
  }, [currentId]);

  function goTo(id: string) {
    setHistory((h) => [...h, id]);
  }

  function goBack() {
    setHistory((h) => h.slice(0, -1));
  }

  function restart() {
    setHistory([]);
  }

  /* ---------------------------------------------------------------
     Start screen — "What's happening?"
  --------------------------------------------------------------- */
  if (!node) {
    return (
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-bold outline-none"
        >
          What&apos;s happening?
        </h2>
        <p className="mt-2 text-ink-soft">
          Choose the closest match. We will ask a couple of quick questions,
          then tell you who to call.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {TRIAGE_CATEGORIES.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => goTo(category.start)}
                className="w-full rounded-card border-2 border-brand bg-surface px-5 py-5 text-left text-lg font-bold text-brand-deep shadow-card hover:bg-brand hover:text-white"
              >
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* ---------------------------------------------------------------
     Question step
  --------------------------------------------------------------- */
  if (node.kind === "question") {
    return (
      <div>
        <BackButton onClick={goBack} />
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 text-2xl font-bold outline-none"
        >
          {node.question}
        </h2>
        {node.help && <p className="mt-2 text-ink-soft">{node.help}</p>}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => goTo(node.yes)}
            className="rounded-card bg-brand px-10 py-4 text-lg font-bold text-white hover:bg-brand-deep sm:min-w-40"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => goTo(node.no)}
            className="rounded-card border-2 border-brand bg-surface px-10 py-4 text-lg font-bold text-brand-deep hover:bg-brand-wash sm:min-w-40"
          >
            No
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------
     Result card
  --------------------------------------------------------------- */
  return (
    <div>
      <BackButton onClick={goBack} />
      <ResultCard node={node} headingRef={headingRef} />
      <p className="mt-6">
        <button
          type="button"
          onClick={restart}
          className="font-semibold text-link underline underline-offset-2"
        >
          Start again
        </button>
      </p>
      <p className="mt-2">
        <Link
          href="/safety-at-home"
          className="font-semibold text-link underline underline-offset-2"
        >
          Back to the Safety at home hub
        </Link>
      </p>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-semibold text-link underline underline-offset-2"
    >
      &larr; Back
    </button>
  );
}

function PhoneAction({ phone, primary }: { phone: TriagePhone; primary?: boolean }) {
  return (
    <div>
      <p className={primary ? "font-bold" : "text-sm font-semibold"}>
        {phone.label}
      </p>
      <a
        href={telHref(phone.number)}
        className={
        primary
          ? "mt-1 inline-block rounded-card bg-alert px-6 py-3 text-2xl font-bold text-white hover:bg-alert-deep"
          : "mt-1 inline-block text-lg font-bold text-link underline underline-offset-2"
        }
      >
        Call {phone.number}
      </a>
      {phone.note && <p className="mt-1 text-sm text-ink-soft">{phone.note}</p>}
    </div>
  );
}

function ResultCard({
  node,
  headingRef,
}: {
  node: TriageResult;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <section
      aria-labelledby="triage-result-heading"
      className="mt-4 rounded-card border-l-8 border-alert bg-surface p-6 shadow-card"
    >
      <h2
        id="triage-result-heading"
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-bold outline-none"
      >
        {node.heading}
      </h2>

      <div className="mt-4 space-y-4">
        <PhoneAction phone={node.phone} primary />
        {node.alsoCall?.map((phone) => (
          <PhoneAction key={phone.number + phone.label} phone={phone} />
        ))}
      </div>

      <h3 className="mt-6 text-lg font-bold">Do this now</h3>
      <ol className="mt-2 list-decimal space-y-2 pl-6">
        {node.doNow.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h3 className="mt-6 text-lg font-bold">Do not</h3>
      <ul className="mt-2 list-disc space-y-2 pl-6">
        {node.doNot.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </section>
  );
}
