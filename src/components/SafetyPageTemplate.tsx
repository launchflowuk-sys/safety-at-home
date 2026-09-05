import Link from "next/link";
import { THURROCK, telHref } from "@/config/thurrock";
import { getBreadcrumbs, resolveRelated } from "@/content/registry";
import type { SafetyPage } from "@/types/safety-page";
import { Accordion } from "./Accordion";
import { FeedbackWidget } from "./FeedbackWidget";
import { WarningIcon } from "./WarningIcon";

/**
 * Renders every topic page from its SafetyPage data, in the fixed order set
 * out in CLAUDE.md. Optional sections are skipped when the data is absent.
 */
type Props = {
  page: SafetyPage;
  /** Optional interactive tool, rendered after the emergency callout. */
  tool?: React.ReactNode;
};

export function SafetyPageTemplate({ page, tool }: Props) {
  const crumbs = getBreadcrumbs(page);
  const related = resolveRelated(page);
  const { online, phone, email } = page.howToReport;
  const reportCount = [online, phone, email].filter(Boolean).length;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* 1. Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap gap-2">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.label} aria-current={isLast ? "page" : undefined}>
                {crumb.href && !isLast ? (
                  <>
                    <Link
                      href={crumb.href}
                      className="text-link underline underline-offset-2"
                    >
                      {crumb.label}
                    </Link>
                    <span aria-hidden="true" className="ml-2 text-ink-soft">
                      /
                    </span>
                  </>
                ) : (
                  <span className="text-ink-soft">{crumb.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* 2. H1 + summary */}
      <h1 className="mt-4 text-4xl font-bold tracking-tight">{page.title}</h1>
      <p className="mt-3 max-w-prose text-lg text-ink-soft">{page.summary}</p>

      {/* 3. Emergency callout */}
      {page.emergency && (
        <section
          aria-labelledby="emergency-heading"
          className="mt-8 rounded-card bg-alert p-6 text-white shadow-card"
        >
          <h2 id="emergency-heading" className="text-2xl font-bold">
            {page.emergency.label}
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            {page.emergency.instructions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-5">
            <a
              href={telHref(page.emergency.phone)}
              className="inline-block rounded-card bg-white px-6 py-3 text-lg font-bold text-alert-deep hover:bg-alert-wash"
            >
              Call {page.emergency.phone}
            </a>
          </p>
        </section>
      )}

      {/* 3b. Page-specific tool (for example the Awaab's Law clock) */}
      {tool && <div className="mt-8">{tool}</div>}

      {/* 4 + 5. Responsibilities */}
      <div className="mt-10 border-b border-line">
        <Accordion title="What we do" defaultOpen="desktop">
          <ul className="list-disc space-y-2 pl-6">
            {page.ourResponsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Accordion>
        <Accordion title="What you must do">
          <ul className="list-disc space-y-2 pl-6">
            {page.yourResponsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Accordion>
      </div>

      {/* 6. Warning signs */}
      {page.warningSigns && page.warningSigns.length > 0 && (
        <section aria-labelledby="signs-heading" className="mt-10">
          <h2 id="signs-heading" className="text-2xl font-bold">
            Warning signs
          </h2>
          <p className="mt-2 max-w-prose text-ink-soft">
            Tell us if you notice any of these.
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {page.warningSigns.map((sign) => (
              <li
                key={sign.text}
                className="flex gap-4 rounded-card border border-line bg-surface p-4"
              >
                <WarningIcon name={sign.icon} />
                <p>{sign.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 7. How to report it */}
      {reportCount > 0 && (
        <section aria-labelledby="report-heading" className="mt-10">
          <h2 id="report-heading" className="text-2xl font-bold">
            How to report it
          </h2>
          <ul
            className={`mt-4 grid gap-4 ${reportCount > 1 ? "sm:grid-cols-2" : ""} ${reportCount > 2 ? "lg:grid-cols-3" : ""}`}
          >
            {online && (
              <li className="flex flex-col rounded-card border border-line bg-surface p-5 shadow-card">
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
                  Online
                </h3>
                <p className="mt-auto pt-3">
                  <Link
                    href={online.href}
                    className="inline-block rounded-card bg-brand px-5 py-3 font-bold text-white hover:bg-brand-deep"
                  >
                    {online.label}
                  </Link>
                </p>
              </li>
            )}
            {phone && (
              <li className="flex flex-col rounded-card border border-line bg-surface p-5 shadow-card">
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
                  Phone
                </h3>
                {phone === THURROCK.repairs.phone && (
                  <p className="mt-2 text-sm text-ink-soft">
                    {THURROCK.repairs.hours}.
                  </p>
                )}
                <p className="mt-auto pt-3">
                  <a
                    href={telHref(phone)}
                    className="text-xl font-bold text-link underline underline-offset-2"
                  >
                    {phone}
                  </a>
                </p>
              </li>
            )}
            {email && (
              <li className="flex flex-col rounded-card border border-line bg-surface p-5 shadow-card">
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
                  Email
                </h3>
                <p className="mt-auto pt-3 break-words">
                  <a
                    href={`mailto:${email}`}
                    className="font-bold text-link underline underline-offset-2"
                  >
                    {email}
                  </a>
                </p>
              </li>
            )}
          </ul>
        </section>
      )}

      {/* 8. Timescales */}
      {page.timescales && page.timescales.length > 0 && (
        <section aria-labelledby="timescales-heading" className="mt-10">
          <h2 id="timescales-heading" className="text-2xl font-bold">
            How quickly we act
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th scope="col" className="py-2 pr-4 font-bold">
                    What
                  </th>
                  <th scope="col" className="py-2 font-bold">
                    Target
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.timescales.map((row) => (
                  <tr key={row.label} className="border-b border-line">
                    <td className="py-3 pr-4 align-top">{row.label}</td>
                    <td className="py-3 align-top font-semibold whitespace-nowrap">
                      {row.target}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 9. Downloads */}
      {page.downloads && page.downloads.length > 0 && (
        <section aria-labelledby="downloads-heading" className="mt-10">
          <h2 id="downloads-heading" className="text-2xl font-bold">
            Downloads
          </h2>
          <ul className="mt-4 space-y-3">
            {page.downloads.map((file) => (
              <li key={file.href}>
                <a
                  href={file.href}
                  className="font-semibold text-link underline underline-offset-2"
                >
                  {file.label}
                </a>{" "}
                <span className="text-sm text-ink-soft">({file.size})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 10. Related pages */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-10">
          <h2 id="related-heading" className="text-2xl font-bold">
            Related pages
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/safety-at-home/${item.slug}`}
                  className="group block h-full rounded-card border border-line bg-surface p-5 shadow-card hover:border-brand"
                >
                  <h3 className="text-lg font-bold text-link underline-offset-2 group-hover:underline">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 11. Feedback */}
      <FeedbackWidget slug={page.slug} />
    </article>
  );
}
