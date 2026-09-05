"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_TABS, activeTab } from "@/config/navigation";

/** Primary tabs under the header. The current tab carries aria-current. */
export function SiteNav() {
  const pathname = usePathname();
  const active = activeTab(pathname);

  return (
    <nav aria-label="Main" className="bg-brand">
      <ul className="mx-auto flex max-w-5xl flex-wrap px-2 sm:px-4">
        {NAV_TABS.map((tab) => {
          const isActive = active?.href === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`block border-b-4 px-3 py-3 font-semibold text-white hover:bg-brand-deep ${
                  isActive ? "border-white" : "border-transparent"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
