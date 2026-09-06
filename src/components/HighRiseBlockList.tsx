import { HIGH_RISE_BLOCKS, blocksByArea } from "@/config/buildings";
import { THURROCK } from "@/config/thurrock";
import { Accordion } from "./Accordion";

/**
 * The published list of high-rise blocks the council registers with the
 * Building Safety Regulator, grouped by area. Collapsed by default: most
 * residents want the address lookup above it, not the whole list.
 */
export function HighRiseBlockList() {
  const areas = blocksByArea();

  return (
    <div className="rounded-card border border-line bg-surface px-6">
      <Accordion title={`See all ${HIGH_RISE_BLOCKS.length} high-rise blocks we manage`}>
        <p className="max-w-prose">
          These are the blocks we have registered with the Building Safety
          Regulator because they are {THURROCK.buildingSafety.higherRiskBuilding}.
          If your block is on this list, the extra duties in the Building Safety
          Act apply to it.
        </p>

        {areas.map((group) => (
          <section key={group.area} className="mt-6">
            <h3 className="text-lg font-bold">{group.area}</h3>
            <ul className="mt-2 divide-y divide-line border-t border-line">
              {group.blocks.map((block) => (
                <li key={`${block.name}-${block.postcode}`} className="py-3">
                  <p className="font-semibold">{block.name}</p>
                  <p className="text-sm text-ink-soft">
                    {block.street}, {block.area}, {block.postcode}. Flats{" "}
                    {block.flatsFrom} to {block.flatsTo}.
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-6 max-w-prose text-sm text-ink-soft">
          Every other block we own is still covered by a fire risk assessment
          and the safety checks on this page. The extra rules for higher-risk
          buildings simply do not apply to it.
        </p>
      </Accordion>
    </div>
  );
}
