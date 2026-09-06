import Link from "next/link";
import { SITE_NAME } from "@/config/navigation";
import { ORG } from "@/config/organisation";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <header className="bg-brand-deep text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-4 sm:px-6">
        <p className="text-sm font-bold tracking-wide uppercase">
          {ORG.name}
        </p>
        <Link
          href="/safety-at-home"
          className="text-xl font-bold hover:underline"
        >
          {SITE_NAME}
        </Link>
      </div>
      <SiteNav />
    </header>
  );
}
