import type { Metadata } from "next";
import Link from "next/link";
import { SAFETY_TOPICS } from "@/config/topics";
import { NAV_TABS, SITE_NAME } from "@/config/navigation";
import { THURROCK, telHref } from "@/config/thurrock";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — Thurrock Council` },
  description:
    "Keeping your council home safe. Find safety advice by topic, or use our tool to work out who to call about a problem right now.",
};

export default function SafetyAtHomeHub() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight">
        {SITE_NAME}
      </h1>
      <p className="mt-4 max-w-prose text-lg text-ink-soft">
        We look after the safety of your home and building. This site explains
        what we do, what you must do, and how to report a problem.
      </p>

      {/* Emergency callout */}
      <section
        aria-labelledby="emergency-heading"
        className="mt-8 rounded-card border-l-8 border-alert bg-alert-wash p-6 shadow-card"
      >
        <h2 id="emergency-heading" className="text-2xl font-bold">
          Is something wrong right now?
        </h2>
        <p className="mt-2 max-w-prose">
          Fire, a smell of gas, a leak, or feeling unwell at home? Answer a few
          quick questions and we will tell you exactly who to call.
        </p>
        <p className="mt-4">
          <Link
            href="/safety-at-home/emergency"
            className="inline-block rounded-card bg-alert px-6 py-3 text-lg font-bold text-white hover:bg-alert-deep"
          >
            Get help now
          </Link>
        </p>
        <p className="mt-4 text-sm text-ink-soft">
          If life is in danger, call{" "}
          <a
            href={telHref(THURROCK.emergency.phone)}
            className="font-bold text-ink underline underline-offset-2"
          >
            {THURROCK.emergency.phone}
          </a>{" "}
          straight away.
        </p>
      </section>

      {/* Topic grid */}
      <section aria-labelledby="topics-heading" className="mt-12">
        <h2 id="topics-heading" className="text-2xl font-bold">
          Safety topics
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_TOPICS.filter(
            (topic) =>
              !NAV_TABS.some(
                (tab) => tab.href === `/safety-at-home/${topic.slug}`,
              ),
          ).map((topic) => (
            <li key={topic.slug}>
              <Link
                href={`/safety-at-home/${topic.slug}`}
                className="group block h-full rounded-card border border-line bg-surface p-5 shadow-card hover:border-brand"
              >
                <h3 className="text-lg font-bold text-link underline-offset-2 group-hover:underline">
                  {topic.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  {topic.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Repairs strip */}
      <section
        aria-labelledby="repairs-heading"
        className="mt-12 rounded-card bg-brand-wash p-6"
      >
        <h2 id="repairs-heading" className="text-2xl font-bold">
          Report a repair
        </h2>
        <p className="mt-2 max-w-prose">
          Call{" "}
          <a
            href={telHref(THURROCK.repairs.phone)}
            className="font-bold text-link underline underline-offset-2"
          >
            {THURROCK.repairs.phone}
          </a>
          . {THURROCK.repairs.hours}. You can also email{" "}
          <a
            href={`mailto:${THURROCK.repairs.email}`}
            className="font-semibold text-link underline underline-offset-2"
          >
            {THURROCK.repairs.email}
          </a>
          .
        </p>
        <p className="mt-2 max-w-prose text-sm text-ink-soft">
          Emergency repairs are done within {THURROCK.timescales.emergency}.
          Urgent repairs within {THURROCK.timescales.urgent}. Routine repairs
          within {THURROCK.timescales.routine}.
        </p>
      </section>
    </div>
  );
}
