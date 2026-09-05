import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ReportDampForm } from "@/components/ReportDampForm";
import { THURROCK, telHref } from "@/config/thurrock";
import { getBreadcrumbsForSlug } from "@/content/registry";

export const REPORT_DAMP_SLUG = "damp-and-mould/report-damp-or-mould";
const TITLE = "Report damp or mould";

/**
 * Bespoke page body for the damp and mould report form. Rendered by the
 * catch-all route for its sitemap slug, so it never shadows the parent
 * /safety-at-home/damp-and-mould page.
 */
export function ReportDampOrMouldPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb crumbs={getBreadcrumbsForSlug(REPORT_DAMP_SLUG, TITLE)} />

      <h1 className="mt-4 text-4xl font-bold tracking-tight">{TITLE}</h1>
      <p className="mt-3 max-w-prose text-lg text-ink-soft">
        Use this form to tell us about damp or mould in your home. Under
        Awaab&apos;s Law we must inspect within{" "}
        {THURROCK.awaabsLaw.investigate} of hearing from you.
      </p>

      <div
        role="note"
        className="mt-6 rounded-card border-l-8 border-brand bg-brand-wash p-5"
      >
        <p className="font-bold">This online form is new and being tested.</p>
        <p className="mt-1 max-w-prose">
          It does not send your report to us on its own yet. When you finish,
          we show you your answers and help you email them to us. Or you can
          call{" "}
          <a
            href={telHref(THURROCK.repairs.phone)}
            className="font-bold text-link underline underline-offset-2"
          >
            {THURROCK.repairs.phone}
          </a>{" "}
          at any time. {THURROCK.repairs.hours}.
        </p>
      </div>

      <p className="mt-6 max-w-prose">
        If water is pouring in, or someone is struggling to breathe, do not use
        this form.{" "}
        <Link
          href="/safety-at-home/emergency"
          className="font-semibold text-link underline underline-offset-2"
        >
          Get help now
        </Link>
        .
      </p>

      <ReportDampForm />
    </div>
  );
}
