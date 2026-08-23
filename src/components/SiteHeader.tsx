import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b-4 border-brand bg-brand-deep text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-4 sm:px-6">
        <p className="text-sm font-bold tracking-wide uppercase">
          Thurrock Council
        </p>
        <Link
          href="/safety-at-home"
          className="text-xl font-bold hover:underline"
        >
          Safety at home
        </Link>
      </div>
    </header>
  );
}
