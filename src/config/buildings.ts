/**
 * The high-rise blocks Thurrock Council manages and registers with the
 * Building Safety Regulator. Supplied by the council on 2026-09-06.
 *
 * `reference` is the council's own asset reference for the block (for
 * example `0038CF01`). It is not a dwelling UPRN, so it is not shown to
 * residents — it is kept here so the list can be matched against council
 * systems and the ARC asbestos feed later.
 *
 * `flatsFrom`/`flatsTo` come from the "Block 1-58 Consec" wording on the
 * council's list, meaning the flats are numbered consecutively in that range.
 *
 * Add or remove a block here and the count, the key fact and the published
 * list all follow. Never hardcode a block name in a page.
 */
export type HighRiseBlock = {
  name: string;
  street: string;
  /** Town or neighbourhood, used to group the published list. */
  area: string;
  postcode: string;
  flatsFrom: number;
  flatsTo: number;
  reference: string;
};

export const HIGH_RISE_BLOCKS: readonly HighRiseBlock[] = [
  // Grays — New Road
  { name: "Arthur Toft House", street: "New Road", area: "Grays", postcode: "RM17 6PR", flatsFrom: 1, flatsTo: 58, reference: "0038CF01" },
  { name: "George Crooks House", street: "New Road", area: "Grays", postcode: "RM17 6PS", flatsFrom: 1, flatsTo: 58, reference: "0039CF01" },
  { name: "Lionel Oxley House", street: "New Road", area: "Grays", postcode: "RM17 6PP", flatsFrom: 1, flatsTo: 58, reference: "0040CF01" },
  // Grays — Argent Street
  { name: "Davall House", street: "Argent Street", area: "Grays", postcode: "RM17 6LP", flatsFrom: 1, flatsTo: 58, reference: "0041CF01" },
  { name: "Butler House", street: "Argent Street", area: "Grays", postcode: "RM17 6LS", flatsFrom: 1, flatsTo: 58, reference: "0042CF01" },
  { name: "Greenwood House", street: "Argent Street", area: "Grays", postcode: "RM17 6LR", flatsFrom: 1, flatsTo: 58, reference: "0043CF01" },
  // Little Thurrock
  { name: "Bevan House", street: "Laird Avenue", area: "Little Thurrock", postcode: "RM16 2NS", flatsFrom: 1, flatsTo: 56, reference: "0146CF01" },
  { name: "Morrison House", street: "Jesmond Road", area: "Little Thurrock", postcode: "RM16 2NR", flatsFrom: 1, flatsTo: 56, reference: "0147CF01" },
  { name: "Keir Hardie House", street: "Milford Road", area: "Little Thurrock", postcode: "RM16 2QP", flatsFrom: 1, flatsTo: 56, reference: "0149CF01" },
  // Tilbury
  { name: "Tasmania House", street: "Hobart Road", area: "Tilbury", postcode: "RM18 7SP", flatsFrom: 1, flatsTo: 64, reference: "0469CF01" },
  { name: "Brisbane House", street: "Leicester Road", area: "Tilbury", postcode: "RM18 7SR", flatsFrom: 1, flatsTo: 64, reference: "0470CF01" },
  { name: "Fremantle House", street: "Leicester Road", area: "Tilbury", postcode: "RM18 7SS", flatsFrom: 1, flatsTo: 64, reference: "0471CF01" },
  // Chadwell St Mary
  { name: "Gooderham House", street: "Godman Road", area: "Chadwell St Mary", postcode: "RM16 4TN", flatsFrom: 1, flatsTo: 91, reference: "0757CF01" },
  { name: "Poole House", street: "Godman Road", area: "Chadwell St Mary", postcode: "RM16 4TG", flatsFrom: 1, flatsTo: 91, reference: "0758CF01" },
  { name: "George Tilbury House", street: "Godman Road", area: "Chadwell St Mary", postcode: "RM16 4TE", flatsFrom: 1, flatsTo: 91, reference: "0759CF01" },
];

/** Areas in the order they should be published, each with its blocks. */
export function blocksByArea(): { area: string; blocks: HighRiseBlock[] }[] {
  const areas: { area: string; blocks: HighRiseBlock[] }[] = [];
  for (const block of HIGH_RISE_BLOCKS) {
    const existing = areas.find((entry) => entry.area === block.area);
    if (existing) existing.blocks.push(block);
    else areas.push({ area: block.area, blocks: [block] });
  }
  return areas;
}

/** Postcodes of every high-rise block, upper-case with spaces removed. */
export const HIGH_RISE_POSTCODE_KEYS: readonly string[] = HIGH_RISE_BLOCKS.map(
  (block) => block.postcode.replace(/\s+/g, "").toUpperCase(),
);
