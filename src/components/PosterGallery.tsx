import type { Poster } from "@/config/posters";
import { Accordion } from "./Accordion";

/**
 * Safety posters, as displayed in blocks and communal areas.
 *
 * A poster is an image of text, so on its own it fails WCAG 2.2 AA (1.4.5).
 * Every poster is therefore paired with its full text in a disclosure, and
 * with a link to the full-size image for anyone who wants to read or print
 * it. Images are pre-optimised WebP with a JPEG fallback, lazily loaded, and
 * carry width and height so the page does not shift as they arrive.
 */
export function PosterGallery({ posters }: { posters: readonly Poster[] }) {
  if (posters.length === 0) return null;

  return (
    <section aria-labelledby="posters-heading" className="mt-10">
      <h2 id="posters-heading" className="text-2xl font-bold">
        Safety posters
      </h2>
      <p className="mt-2 max-w-prose text-ink-soft">
        These are the posters displayed in our blocks. You can open each one
        full size to read or print it, or read the same information as text.
      </p>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {posters.map((poster) => (
          <li
            key={poster.slug}
            className="flex flex-col rounded-card border border-line bg-surface p-4 shadow-card"
          >
            <picture>
              <source srcSet={`/posters/${poster.slug}.webp`} type="image/webp" />
              <img
                src={`/posters/${poster.slug}.jpg`}
                alt={poster.alt}
                width={poster.width}
                height={poster.height}
                loading="lazy"
                decoding="async"
                className="w-full rounded border border-line bg-white"
              />
            </picture>

            <h3 className="mt-4 text-lg font-bold">{poster.title}</h3>
            <p className="mt-1 text-sm text-ink-soft">{poster.summary}</p>
            <p className="mt-1 text-sm text-ink-soft">From {poster.source}.</p>

            <p className="mt-3">
              <a
                href={`/posters/${poster.slug}.jpg`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-link underline underline-offset-2"
              >
                Open the full-size poster
                <span className="font-normal text-ink-soft">
                  {" "}
                  (JPEG, {poster.fileSize}, opens in a new tab)
                </span>
              </a>
            </p>

            <div className="mt-auto pt-3">
              <Accordion
                title="Read this poster as text"
                headingLevel={4}
              >
                <div className="space-y-4">
                  {poster.transcript.map((section) => (
                    <div key={section.heading}>
                      <p className="font-bold">{section.heading}</p>
                      {section.intro && <p className="mt-1">{section.intro}</p>}
                      {section.items && (
                        <ul className="mt-1 list-disc space-y-1 pl-6">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </Accordion>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
