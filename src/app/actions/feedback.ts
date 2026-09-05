"use server";

import { getDb } from "@/lib/db";
import { SAFETY_PAGES } from "@/content/registry";

/**
 * Record a "Was this page helpful?" answer. Stores nothing personal. When no
 * database is configured it succeeds silently so the widget still thanks the
 * tenant (the Phase 1–5 behaviour).
 */
export async function submitFeedback(
  slug: string,
  helpful: boolean,
): Promise<{ stored: boolean }> {
  const known = SAFETY_PAGES.some((page) => page.slug === slug);
  if (!known || typeof helpful !== "boolean") return { stored: false };

  const db = getDb();
  if (!db) return { stored: false };

  try {
    await db.pageFeedback.create({ data: { slug, helpful } });
    return { stored: true };
  } catch (error) {
    console.error("feedback: failed to store", error);
    return { stored: false };
  }
}
