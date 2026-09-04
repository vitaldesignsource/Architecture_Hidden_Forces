/**
 * The Portal entries that beings in the Register are filed against. An entry
 * in this set carries a "Named in the Register" panel and pulls the register
 * data in a chunk of its own; every other entry never fetches it at all — the
 * register is a quarter of a megabyte of source and does not belong in the
 * chunk that renders an entry. The audit keeps this set and the `entries`
 * arrays in beings.ts in step in both directions.
 */
export const REGISTERED_ENTRIES = new Set([
  "ii-29", "v-9", "x-4", "x-5", "xii-3", "xii-4",
  "xii-5", "xii-6", "xii-7", "xii-8", "xii-9", "xii-10",
  "xii-11", "xii-13", "xii-14", "xii-18", "xii-19", "xiv-20",
  "xv-2", "xv-5", "xv-6", "xv-8", "xv-9", "xv-10",
  "xv-11", "xv-13", "xv-14", "xv-15", "xv-26", "xv-27",
  "xv-35", "xv-36", "xv-38", "xv-44", "xv-47", "xv-52",
  "xv-57", "xv-67", "xv-68",
]);
