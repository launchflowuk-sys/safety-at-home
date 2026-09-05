"use client";

import { useState } from "react";

/**
 * "Was this page helpful?" — a no-op until Phase 6. It logs nothing and posts
 * nothing; it only shows a thank-you message so the interaction feels complete.
 */
export function FeedbackWidget({ slug }: { slug: string }) {
  const [answered, setAnswered] = useState(false);

  function answer() {
    // P6: send { slug, helpful } to the database. Deliberately a no-op now.
    void slug;
    setAnswered(true);
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
              onClick={answer}
              className="rounded-card border-2 border-brand px-5 py-2 font-semibold text-brand hover:bg-brand-wash"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={answer}
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
