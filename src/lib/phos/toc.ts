import toc from "./toc.json";

/**
 * The outline alone: the divisions, their entries as registered, and the
 * total. entries.ts joins this to the written content and carries the whole
 * front-matter index with it; a page that needs only the outline — the
 * Portal, which counts and names divisions — imports this and stays light.
 */
export type Division = (typeof toc.divisions)[number];
export type TocEntry = Division["entries"][number];

export const DIVISIONS: Division[] = toc.divisions;
export const TOTAL = toc.total;
export const divisionLabel = (d: Division) => (d.numeral ? `Division ${d.numeral}` : d.title);
