import Link from "next/link";
import { THURROCK, telHref } from "@/config/thurrock";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-4 border-brand bg-brand-deep text-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div>
          <h2 className="text-lg font-bold">Report a repair</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Call{" "}
            <a
              href={telHref(THURROCK.repairs.phone)}
              className="font-semibold underline underline-offset-2"
            >
              {THURROCK.repairs.phone}
            </a>
            . {THURROCK.repairs.hours}.
          </p>
          <p className="mt-2 text-sm">
            Email{" "}
            <a
              href={`mailto:${THURROCK.repairs.email}`}
              className="font-semibold underline underline-offset-2"
            >
              {THURROCK.repairs.email}
            </a>
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-lg font-bold">About this site</h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link
                href="/accessibility-statement"
                className="underline underline-offset-2"
              >
                Accessibility statement
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="underline underline-offset-2">
                Contact us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/20">
        <p className="mx-auto max-w-5xl px-4 py-4 text-sm text-white/90 sm:px-6">
          © Thurrock Council
        </p>
      </div>
    </footer>
  );
}
