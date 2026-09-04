import schema from "./schema.json";

/**
 * The encyclopaedia's controlled vocabulary — labels, confidence degrees,
 * facets, the movement, the instruments — and the slug rule that puts a facet
 * value in a URL.
 *
 * Split from `entries.ts` because that module eagerly holds the front matter
 * of every entry file. A page that only needs the name of an instrument, or a
 * component that only draws label chips, should read the schema and nothing
 * else; `entries.ts` re-exports all of this, so the pages that do need the
 * index are unaffected.
 */

export type LabelDef = (typeof schema.labels)[number];
export type FacetDef = (typeof schema.facets)[number];

export const LABELS = schema.labels;
export const CONFIDENCE = schema.confidence;
export const FACETS = schema.facets;
export const MOVEMENT = schema.movement;
export const TOOLS = schema.tools;

export const labelDef = (name: string) => LABELS.find((l) => l.name === name) ?? null;

/** The same slug rule as scripts/phos-toc.mjs, for facet values in URLs. */
export const valueSlug = (v: string) =>
  v
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’'"“”]/g, "")
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
