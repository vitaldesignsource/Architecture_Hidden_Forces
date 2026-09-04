import toc from "./toc.json";
import { FACETS, valueSlug } from "./vocab";

/**
 * The encyclopaedia's index: the table of contents joined to whatever content
 * exists for it.
 *
 * toc.json registers every entry the outline names — 653 of them across the
 * Portal Entrance and twenty-one divisions — whether or not it has been written.
 * The content directory holds the ones that have, one markdown file each. This
 * module joins the two, so a page can list a whole division with the written
 * entries live and the rest marked forthcoming, and can open any written entry
 * without knowing how it is stored.
 *
 * Front matter for every file is imported eagerly (it is small, and lists and
 * facet pages need all of it at once); bodies are imported on demand, one at a
 * time, when an entry is opened. Both come pre-parsed from the Vite plugin in
 * vite.config.ts, with the same parser the audit runs.
 */

export type Division = (typeof toc.divisions)[number];
export type TocEntry = Division["entries"][number];

export type EntryMeta = {
  title: string;
  summary: string;
  epigraph: string;
  attribution: string;
  backdrop: string;
  position: string;
  labels: string[];
  confidence: string[];
  related: string[];
  facets: Record<string, string[]>;
  hasFrontMatter: boolean;
};

export type PhosEntry = TocEntry & {
  division: Division;
  meta: EntryMeta | null;
  path: string | null;
  written: boolean;
};

const META = import.meta.glob<EntryMeta>(
  ["/src/content/phos/**/*.md", "!**/README.md", "!**/_*.md"],
  { query: "?frontmatter", import: "default", eager: true },
);
const LINKS = import.meta.glob<string[]>(
  ["/src/content/phos/**/*.md", "!**/README.md", "!**/_*.md"],
  { query: "?links", import: "default", eager: true },
);
const BODY = import.meta.glob<string>(
  ["/src/content/phos/**/*.md", "!**/README.md", "!**/_*.md"],
  { query: "?body", import: "default" },
);
const INTRO_META = import.meta.glob<EntryMeta>("/src/content/phos/*/_intro.md", {
  query: "?frontmatter",
  import: "default",
  eager: true,
});
const INTRO_BODY = import.meta.glob<string>("/src/content/phos/*/_intro.md", {
  query: "?body",
  import: "default",
});

const CODA_BODY = import.meta.glob<string>("/src/content/phos/*/_coda.md", {
  query: "?body",
  import: "default",
});
/** A group within a division may open with `_group-<slug>.md` — a preface set
 *  under the group's heading on the division page, before its entries. The
 *  slug is the group's name under the same rule as facet values. */
const GROUP_BODY = import.meta.glob<string>("/src/content/phos/*/_group-*.md", {
  query: "?body",
  import: "default",
});
/** …and may close with `_coda-<slug>.md`, set after the group's last entry. */
const GROUP_CODA_BODY = import.meta.glob<string>("/src/content/phos/*/_coda-*.md", {
  query: "?body",
  import: "default",
});

/** "/src/content/phos/xv/83-robert-grossetestes-on-light.md" → { division, slug } */
function locate(path: string) {
  const m = path.match(/\/src\/content\/phos\/([a-z]+)\/(?:\d+-)?([a-z0-9-]+)\.md$/);
  return m ? { division: m[1], slug: m[2] } : null;
}

const found = new Map<string, { meta: EntryMeta; path: string }>();
for (const [path, meta] of Object.entries(META)) {
  const at = locate(path);
  if (at) found.set(`${at.division}/${at.slug}`, { meta, path });
}

export const DIVISIONS: Division[] = toc.divisions;
export const TOTAL = toc.total;

export const ENTRIES: PhosEntry[] = DIVISIONS.flatMap((division) =>
  division.entries.map((e) => {
    const hit = found.get(`${division.id}/${e.slug}`);
    return { ...e, division, meta: hit?.meta ?? null, path: hit?.path ?? null, written: !!hit };
  }),
);
const byId = new Map(ENTRIES.map((e) => [e.id, e]));

/**
 * Who cites whom. An entry points outward through its `related` list and
 * through the [[id]] cross-references in its body; the inbound side is the
 * same graph read backwards, so a reader arriving at an entry can also see
 * every entry that leads to it. Built once from the eager metadata.
 */
const OUTBOUND = new Map<string, Set<string>>();
for (const e of ENTRIES) {
  if (!e.meta || !e.path) continue;
  OUTBOUND.set(e.id, new Set([...e.meta.related, ...(LINKS[e.path] ?? [])].filter((id) => id !== e.id)));
}
const INBOUND = new Map<string, PhosEntry[]>();
for (const [from, targets] of OUTBOUND)
  for (const to of targets) {
    const src = byId.get(from);
    if (src) (INBOUND.get(to) ?? INBOUND.set(to, []).get(to)!).push(src);
  }
for (const list of INBOUND.values()) list.sort((a, b) => a.division.order - b.division.order || a.n - b.n);
/** Entries whose `related` list or body cites `id`. */
export const citedBy = (id: string): PhosEntry[] => INBOUND.get(id) ?? [];
/** Ids an entry reaches, from its `related` list and its body together. */
export const citesFrom = (id: string): Set<string> => OUTBOUND.get(id) ?? new Set();

export const division = (id: string) => DIVISIONS.find((d) => d.id === id) ?? null;
export const entriesOf = (divisionId: string) => ENTRIES.filter((e) => e.division.id === divisionId);
export const entry = (divisionId: string, slug: string) =>
  ENTRIES.find((e) => e.division.id === divisionId && e.slug === slug) ?? null;
export const entryById = (id: string) => byId.get(id) ?? null;

export async function loadBody(e: PhosEntry): Promise<string> {
  const load = e.path ? BODY[e.path] : null;
  return load ? await load() : "";
}

/** A division may open with `_intro.md`; it carries a backdrop and a body. */
export async function loadIntro(divisionId: string): Promise<{ meta: EntryMeta; body: string } | null> {
  const key = `/src/content/phos/${divisionId}/_intro.md`;
  const meta = INTRO_META[key];
  const load = INTRO_BODY[key];
  if (!meta || !load) return null;
  return { meta, body: await load() };
}
/** A division may close with `_coda.md` — a summary, axioms, what it established. */
export async function loadCoda(divisionId: string): Promise<string | null> {
  const load = CODA_BODY[`/src/content/phos/${divisionId}/_coda.md`];
  return load ? await load() : null;
}
async function loadGroupFiles(files: Record<string, () => Promise<string>>, prefix: string) {
  const out: Record<string, string> = {};
  await Promise.all(
    Object.entries(files)
      .filter(([k]) => k.startsWith(prefix))
      .map(async ([k, load]) => {
        out[k.slice(prefix.length, -".md".length)] = await load();
      }),
  );
  return out;
}
/** Group prefaces and codas for a division, keyed by group slug. */
export const loadGroupIntros = (divisionId: string) =>
  loadGroupFiles(GROUP_BODY, `/src/content/phos/${divisionId}/_group-`);
export const loadGroupCodas = (divisionId: string) =>
  loadGroupFiles(GROUP_CODA_BODY, `/src/content/phos/${divisionId}/_coda-`);
export const introMeta = (divisionId: string): EntryMeta | null =>
  INTRO_META[`/src/content/phos/${divisionId}/_intro.md`] ?? null;

export function progress(divisionId?: string) {
  const list = divisionId ? entriesOf(divisionId) : ENTRIES;
  return { written: list.filter((e) => e.written).length, total: list.length };
}

export function neighbours(e: PhosEntry) {
  const list = entriesOf(e.division.id);
  const i = list.findIndex((x) => x.id === e.id);
  return { prev: list[i - 1] ?? null, next: list[i + 1] ?? null };
}

export function neighbourDivisions(d: Division) {
  const i = DIVISIONS.findIndex((x) => x.id === d.id);
  return { prev: DIVISIONS[i - 1] ?? null, next: DIVISIONS[i + 1] ?? null };
}

// The controlled vocabulary lives in vocab.ts, which holds no entry data;
// re-exported here so the modules that need both keep one import.
export { LABELS, CONFIDENCE, FACETS, MOVEMENT, TOOLS, labelDef, valueSlug } from "./vocab";
export type { LabelDef, FacetDef } from "./vocab";

/** Every value a facet can take, with how many written entries carry it.
 *  A controlled facet lists its whole vocabulary; a free one, what is in use. */
export function facetValues(key: string) {
  const def = FACETS.find((f) => f.key === key);
  if (!def) return [];
  const counts = new Map<string, number>();
  for (const e of ENTRIES) for (const v of e.meta?.facets[key] ?? []) counts.set(v, (counts.get(v) ?? 0) + 1);
  const values = def.controlled ? def.values : [...counts.keys()].sort((a, b) => a.localeCompare(b));
  return values.map((value) => ({ value, slug: valueSlug(value), count: counts.get(value) ?? 0 }));
}

export function entriesWith(key: string, slug: string) {
  const hit = facetValues(key).find((v) => v.slug === slug);
  if (!hit) return { value: null as string | null, entries: [] as PhosEntry[] };
  return { value: hit.value as string | null, entries: ENTRIES.filter((e) => e.meta?.facets[key]?.includes(hit.value)) };
}

/** "Division IV" for a numbered division, "Portal Entrance" for the first. */
export const divisionLabel = (d: Division) => (d.numeral ? `Division ${d.numeral}` : d.title);
