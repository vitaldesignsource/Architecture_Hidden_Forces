import toc from "./toc.json";

/**
 * Enough of an entry to name it and link to it, and nothing else.
 *
 * `entries.ts` is the real index and eagerly holds the front matter of all
 * seven hundred entry files — a hundred and fifty kilobytes over the wire —
 * because the Portal's own pages need labels, facets, summaries and the
 * citation graph. A page that only wants to write an entry's title on a link
 * should not pay for that; the table of contents alone carries the title, the
 * slug and the division, which is all a link needs.
 */
export type EntryRef = { id: string; n: number; title: string; slug: string; division: string; numeral: string };

const REFS = new Map<string, EntryRef>(
  toc.divisions.flatMap((d) =>
    d.entries.map((e) => [
      e.id,
      { id: e.id, n: e.n, title: e.title, slug: e.slug, division: d.id, numeral: d.numeral },
    ] as const),
  ),
);

export const entryRef = (id: string): EntryRef | null => REFS.get(id) ?? null;
