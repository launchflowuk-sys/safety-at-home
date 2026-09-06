import { getDiagram, type DiagramId } from "./Diagrams";

/**
 * Frame for an explanatory diagram.
 *
 * The drawing itself is marked `role="presentation"` and the meaning is
 * carried by the visible caption underneath. That satisfies WCAG 2.2 AA
 * 1.1.1 without a hidden-only alternative, and it means everyone gets the
 * explanation rather than only screen reader users. Write the caption so the
 * diagram could be removed and the page would still make sense.
 */
export function Diagram({
  id,
  caption,
}: {
  id: DiagramId;
  caption: string;
}) {
  const Drawing = getDiagram(id);

  return (
    <figure className="mt-8 rounded-card border border-line bg-surface p-4 shadow-card sm:p-6">
      <div className="overflow-x-auto">
        <div className="mx-auto min-w-[320px] max-w-2xl">
          <Drawing />
        </div>
      </div>
      <figcaption className="mt-4 max-w-prose text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
