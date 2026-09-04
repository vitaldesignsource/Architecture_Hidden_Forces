/**
 * The divisions the Atlas places in time and on the map. Their entries carry
 * a "Where and when" panel and their division pages open with the sheet and
 * the timeline; every other page never fetches the Atlas at all. The audit
 * checks that every span in atlas.json belongs to one of these.
 */
export const ATLAS_DIVISIONS = new Set(["xv", "xvi"]);
