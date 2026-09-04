import atlas from "@/lib/phos/atlas.json";
import { entryById, type PhosEntry } from "@/lib/phos/entries";

/**
 * Where and when: the Atlas's data, read from atlas.json.
 *
 * A span is one entry's place in time — a life, a text's composition, a
 * tradition's active centuries, or a founding discovery — and the places it
 * belongs to, in the order it moved through them. Years run negative before
 * the common era. `approx` marks the dates ordinary scholarship gives only
 * roughly; `setting` marks a place that is a narrative's scene rather than
 * where its words were composed. The geography itself (coastlines, rivers,
 * the projected position of every place) is drawn at build time by
 * scripts/atlas.mjs into atlas-geo.json and fetched only by the pages that
 * draw a map.
 */
export type Place = { name: string; lat: number; lon: number };
export type SpanKind = "life" | "text" | "tradition" | "event";
export type Span = {
  id: string;
  label: string;
  kind: SpanKind;
  from: number;
  to: number;
  places: string[];
  lane: string;
  approx?: boolean;
  setting?: boolean;
  note?: string;
};
export type Geo = {
  hash: string; w: number; h: number; projection: string;
  land: string; lakes: string; rivers: string; graticule: string;
  points: Record<string, [number, number]>;
  labels: { t: string; k: "region" | "sea"; x: number; y: number }[];
};

export const LANES: string[] = atlas.lanes;
export const PLACES: Record<string, Place> = atlas.places;
export const SPANS: Span[] = (atlas.spans as Span[]).slice().sort((a, b) => a.from - b.from || a.to - b.to);

const BY_ID = new Map(SPANS.map((s) => [s.id, s]));
export const spanOf = (id: string): Span | null => BY_ID.get(id) ?? null;
export const entryOfSpan = (s: Span): PhosEntry | null => entryById(s.id);

export const YEAR_MIN = Math.min(...SPANS.map((s) => s.from));
export const YEAR_MAX = Math.max(...SPANS.map((s) => s.to));

/** Spans that were alive, being written, or active in a given year. */
export const alive = (year: number) => SPANS.filter((s) => s.from <= year && year <= s.to);
/** Spans that pass through a place. */
export const atPlace = (place: string) => SPANS.filter((s) => s.places.includes(place));
/** Spans that overlap another in time, the "contemporaries". */
export const contemporaries = (s: Span) => SPANS.filter((x) => x.id !== s.id && x.from <= s.to && s.from <= x.to);

/** "412", "c. 300 BCE", "1186". */
export function year(y: number, approx = false): string {
  const abs = Math.abs(y);
  return `${approx ? "c. " : ""}${abs}${y < 0 ? " BCE" : y < 1000 ? " CE" : ""}`;
}
/** "412–485", "c. 1200–1000 BCE", "c. 100 BCE–300 CE", "1186". */
export function when(s: Span): string {
  const c = s.approx ? "c. " : "";
  if (s.from === s.to) return year(s.from, s.approx);
  const era = (y: number) => (y < 0 ? " BCE" : y < 1000 ? " CE" : "");
  if (Math.sign(s.from) === Math.sign(s.to) || s.to === 0) return `${c}${Math.abs(s.from)}–${Math.abs(s.to)}${era(s.to)}`;
  return `${c}${Math.abs(s.from)} BCE–${s.to}${era(s.to)}`;
}
/** What a span's dates are dates of. */
export function verb(s: Span): string {
  return { life: "lived", text: "composed", tradition: "active", event: "found" }[s.kind];
}
export const placeName = (id: string) => PLACES[id]?.name ?? id;

/** The traditions an entry is filed under, read off its facets. */
export function traditionsOf(s: Span): string[] {
  return entryOfSpan(s)?.meta?.facets.tradition ?? [];
}
/** Spans whose entries are filed under a tradition. */
export const spansOfTradition = (name: string) => SPANS.filter((s) => traditionsOf(s).includes(name));
/** Spans of one division. */
export const spansOfDivision = (division: string) => SPANS.filter((s) => s.id.split("-")[0] === division);

let geo: Promise<Geo> | null = null;
/** The drawn geography, fetched once, only by a page that draws a map. */
export function loadGeo(): Promise<Geo> {
  if (!geo) geo = import("@/lib/phos/atlas-geo.json").then((m) => m.default as unknown as Geo);
  return geo;
}
