import Link from "next/link";
import type { Crumb } from "@/content/registry";

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
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
  );
}
