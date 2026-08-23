import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility statement",
};

export default function AccessibilityStatement() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Accessibility statement</h1>
      <p className="mt-4 max-w-prose">
        We want everyone to be able to use this site. We are building it to meet
        WCAG 2.2 level AA. That means clear colours, visible focus, and full
        keyboard support.
      </p>
      <p className="mt-4 max-w-prose">
        A full accessibility statement will be published here before this site
        goes live.
      </p>
    </div>
  );
}
