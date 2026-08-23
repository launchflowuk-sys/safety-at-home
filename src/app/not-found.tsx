import Link from "next/link";
import { THURROCK, telHref } from "@/config/thurrock";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-4 max-w-prose">
        This page does not exist yet, or the address is wrong. We are adding new
        safety pages in stages.
      </p>
      <p className="mt-4 max-w-prose">
        If you need to report a problem now, call{" "}
        <a
          href={telHref(THURROCK.repairs.phone)}
          className="font-semibold text-link underline underline-offset-2"
        >
          {THURROCK.repairs.phone}
        </a>
        . {THURROCK.repairs.hours}.
      </p>
      <p className="mt-6">
        <Link
          href="/safety-at-home"
          className="font-semibold text-link underline underline-offset-2"
        >
          Go to the Safety at home hub
        </Link>
      </p>
    </div>
  );
}
