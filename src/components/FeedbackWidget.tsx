"use client";

import { useState } from "react";
import { submitFeedback } from "@/app/actions/feedback";

/**
 * "Was this page helpful?" — stores { slug, helpful } through a server action
 * when a database is configured. Nothing personal is sent. Without a database
 * the action is a silent no-op and the tenant still sees the thank-you.
 */
export function FeedbackWidget({ slug }: { slug: string }) {
  const [answered, setAnswered] = useState(false);

  function answer(helpful: boolean) {
    setAnswered(true);
    void submitFeedback(slug, helpful).catch(() => {
      // Thank the tenant regardless; feedback is best-effort.
    });
  }

  return (
    <section
      aria-labelledby="feedback-heading"
      className="mt-12 rounded-card border border-line bg-surface p-6"
    >
      {answered ? (
        <p role="status" className="font-semibold">
          Thank you for your feedback.
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <h2 id="feedback-heading" className="text-lg font-bold">
            Was this page helpful?
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => answer(true)}
              className="rounded-card border-2 border-brand px-5 py-2 font-semibold text-brand hover:bg-brand-wash"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => answer(false)}
              className="rounded-card border-2 border-brand px-5 py-2 font-semibold text-brand hover:bg-brand-wash"
            >
              No
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
