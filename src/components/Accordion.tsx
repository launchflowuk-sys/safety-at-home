"use client";

import { useId, useState, useSyncExternalStore } from "react";

type DefaultOpen = "always" | "desktop" | "never";

type Props = {
  title: string;
  /**
   * "desktop" follows a live media query: open on wide screens, closed on
   * narrow ones, until the user toggles it themselves. Server HTML renders
   * it open so the content is always present for no-JS users and crawlers.
   */
  defaultOpen?: DefaultOpen;
  children: React.ReactNode;
};

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getIsDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerIsDesktop() {
  return true;
}

/**
 * A real disclosure widget: a button carrying aria-expanded controls a
 * region. Fully keyboard reachable; the heading stays a heading so screen
 * reader users can navigate by headings.
 */
export function Accordion({ title, defaultOpen = "never", children }: Props) {
  // null = no user choice yet, follow the default.
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const isDesktop = useSyncExternalStore(
    subscribe,
    getIsDesktop,
    getServerIsDesktop,
  );
  const buttonId = useId();
  const panelId = useId();

  const defaultState =
    defaultOpen === "always" || (defaultOpen === "desktop" && isDesktop);
  const open = userChoice ?? defaultState;

  return (
    <section className="border-t border-line">
      <h2 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setUserChoice(!open)}
          className="flex w-full items-center justify-between gap-4 py-4 text-left text-2xl font-bold hover:text-link"
        >
          <span>{title}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`h-6 w-6 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-6"
      >
        {children}
      </div>
    </section>
  );
}
