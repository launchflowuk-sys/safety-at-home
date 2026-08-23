import type { Metadata } from "next";
import Link from "next/link";
import { TriageTool } from "@/components/triage/TriageTool";
import { THURROCK, telHref } from "@/config/thurrock";

export const metadata: Metadata = {
  title: "Get help now",
  description:
    "Answer a few quick questions and we will tell you exactly who to call about fire, gas, leaks, electrical problems, carbon monoxide, or damp and mould.",
};

export default function EmergencyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link
              href="/safety-at-home"
              className="text-link underline underline-offset-2"
            >
              Safety at home
            </Link>
            <span aria-hidden="true" className="ml-2 text-ink-soft">
              /
            </span>
          </li>
          <li aria-current="page" className="text-ink-soft">
            Get help now
          </li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-bold tracking-tight">Get help now</h1>
      <p className="mt-3 max-w-prose text-lg text-ink-soft">
        If life is in danger, call{" "}
        <a
          href={telHref(THURROCK.emergency.phone)}
          className="font-bold text-ink underline underline-offset-2"
        >
          {THURROCK.emergency.phone}
        </a>{" "}
        now. Otherwise, answer the questions below.
      </p>

      <div className="mt-8">
        <TriageTool />
      </div>
    </div>
  );
}
