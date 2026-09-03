/**
 * Front matter for the encyclopaedia's entries — one parser, used in three
 * places: the Vite plugin that serves an entry's metadata and body to the
 * page, the audit that checks every file, and any script that needs to read
 * the content directory. Plain JavaScript so Node can run it without a build.
 *
 * The format is a YAML subset, on purpose. An entry file looks like:
 *
 *   ---
 *   title: Light Before the Luminaries
 *   labels: [Historical Doctrine, Comparative Interpretation]
 *   tradition: [Israelite, Neoplatonic]
 *   plane: [Divine]
 *   related:
 *     - i-2
 *     - xv-42
 *   summary: One line, shown in lists.
 *   epigraph: "A line set above the body."
 *   backdrop: crystal
 *   ---
 *   The body, in the markdown subset described in src/content/phos/README.md.
 *
 * Scalars are strings. Lists are either inline [a, b] or indented "- " lines.
 * Quotes around a value are stripped. Nothing else — no nesting, no anchors.
 */

const LIST_KEYS = new Set([
  "labels", "confidence", "tradition", "quality", "plane", "operation", "symbol", "text", "period", "related",
]);

const unquote = (s) => {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return t.slice(1, -1);
  return t;
};

const splitList = (s) =>
  s.trim().replace(/^\[|\]$/g, "").split(",").map(unquote).filter(Boolean);

/** Split a raw file into its front-matter block and its body. */
export function splitFrontMatter(raw) {
  const text = raw.replace(/\r\n/g, "\n");
  if (!text.startsWith("---\n")) return { head: null, body: text };
  const end = text.indexOf("\n---", 4);
  if (end === -1) return { head: null, body: text };
  return { head: text.slice(4, end), body: text.slice(end + 4).replace(/^\n+/, "") };
}

/** Parse a front-matter block into { key: string | string[] }. */
export function parseHead(head) {
  const meta = {};
  let listKey = null;
  for (const raw of head.split("\n")) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const item = raw.match(/^\s+-\s+(.+)$/);
    if (item && listKey) { meta[listKey].push(unquote(item[1])); continue; }
    const kv = raw.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    if (LIST_KEYS.has(key)) {
      meta[key] = value.trim() ? splitList(value) : [];
      listKey = key;
    } else {
      meta[key] = unquote(value);
      listKey = null;
    }
  }
  return meta;
}

/**
 * Normalise a parsed head against the schema: labels may be written as their
 * full name or their key and come back as names; every facet is an array.
 */
export function normalizeMeta(meta, schema) {
  // A label may be written as its key, its name, or one of the names the
  // outline first used for it; all come back as the canonical name.
  const lookup = new Map();
  for (const l of schema.labels) {
    lookup.set(l.key, l.name);
    lookup.set(l.name.toLowerCase(), l.name);
    for (const a of l.aliases ?? []) lookup.set(String(a).toLowerCase(), l.name);
  }
  const labels = (meta.labels ?? []).map((l) => lookup.get(String(l).toLowerCase()) ?? l);
  const conf = new Map((schema.confidence ?? []).flatMap((c) => [[c.key, c.name], [c.name.toLowerCase(), c.name]]));
  const confidence = (meta.confidence ?? []).map((c) => conf.get(String(c).toLowerCase()) ?? c);
  const out = {
    title: meta.title ?? "",
    summary: meta.summary ?? "",
    epigraph: meta.epigraph ?? "",
    attribution: meta.attribution ?? "",
    backdrop: meta.backdrop ?? "",
    position: meta.position ?? "center 50%",
    labels,
    confidence,
    related: meta.related ?? [],
    facets: {},
  };
  for (const f of schema.facets) out.facets[f.key] = meta[f.key] ?? [];
  return out;
}

/** The whole thing: raw file text in, { meta, body } out. */
export function parseEntry(raw, schema) {
  const { head, body } = splitFrontMatter(raw);
  const meta = normalizeMeta(head ? parseHead(head) : {}, schema);
  meta.hasFrontMatter = head !== null;
  return { meta, body };
}

/**
 * What is wrong with an entry's metadata, as a list of sentences. Empty means
 * clean. `toc` is the parsed toc.json; `at` is a file label for the messages.
 */
export function validateMeta(meta, { schema, toc, at, division, slug }) {
  const problems = [];
  const div = toc.divisions.find((d) => d.id === division);
  const entry = div?.entries.find((e) => e.slug === slug);
  if (!div) problems.push(`${at}: "${division}" is not a division`);
  else if (!entry) problems.push(`${at}: no entry with slug "${slug}" in Division ${div.numeral || "Portal"}`);

  if (!meta.hasFrontMatter) problems.push(`${at}: no front matter`);
  if (!meta.title) problems.push(`${at}: no title`);
  else if (entry && meta.title !== entry.title)
    problems.push(`${at}: title "${meta.title}" differs from the outline's "${entry.title}"`);

  const names = new Set(schema.labels.map((l) => l.name));
  if (!meta.labels.length) problems.push(`${at}: no evidence label — every entry carries at least one`);
  for (const l of meta.labels) if (!names.has(l)) problems.push(`${at}: "${l}" is not one of the seven evidence labels`);
  const degrees = new Set((schema.confidence ?? []).map((c) => c.name));
  for (const c of meta.confidence ?? []) if (!degrees.has(c)) problems.push(`${at}: "${c}" is not a degree of confidence`);

  for (const f of schema.facets) {
    if (!f.controlled) continue;
    const allowed = new Set(f.values);
    for (const v of meta.facets[f.key] ?? [])
      if (!allowed.has(v)) problems.push(`${at}: ${f.key} "${v}" is not in the vocabulary — add it to schema.json if it is meant`);
  }

  const ids = new Set(toc.divisions.flatMap((d) => d.entries.map((e) => e.id)));
  for (const r of meta.related) if (!ids.has(r)) problems.push(`${at}: related "${r}" is not an entry id`);
  if (meta.backdrop && !/^[a-z0-9-]+$/.test(meta.backdrop)) problems.push(`${at}: backdrop "${meta.backdrop}" should be a bare name from public/bg`);
  return problems;
}
