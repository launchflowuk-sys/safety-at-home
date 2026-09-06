"use client";

import { useEffect, useState } from "react";
import { ORG, telHref } from "@/config/organisation";

const STORAGE_KEY = "safety-emergency-bar-collapsed";

/**
 * Sticky emergency bar shown at the top of every page. Collapsible, and the
 * collapsed state is remembered for the visit only (sessionStorage, never
 * localStorage) so it reappears on a fresh visit.
 */
export function EmergencyBar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setCollapsed(true);
    }
  }, []);

  function toggle() {
    setCollapsed((current) => {
      const next = !current;
      sessionStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <div className="sticky top-0 z-50 bg-alert text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        {collapsed ? (
          <p className="text-sm font-semibold">Emergency numbers hidden</p>
        ) : (
          <p className="text-sm font-semibold sm:text-base">
            In an emergency call{" "}
            <a
              href={telHref(ORG.emergency.phone)}
              className="underline underline-offset-2 hover:decoration-2"
            >
              {ORG.emergency.phone}
            </a>
            . Housing repairs{" "}
            <a
              href={telHref(ORG.repairs.phone)}
              className="whitespace-nowrap underline underline-offset-2 hover:decoration-2"
            >
              {ORG.repairs.phone}
            </a>{" "}
            <span className="whitespace-nowrap">(24/7)</span>.
          </p>
        )}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={!collapsed}
          className="shrink-0 rounded border border-white/60 px-3 py-1 text-sm font-semibold hover:bg-alert-deep"
        >
          {collapsed ? "Show" : "Hide"}
        </button>
      </div>
    </div>
  );
}
