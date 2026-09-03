#!/usr/bin/env node
/**
 * Structural audit of the architecture.
 *
 * Every check here exists because the thing it checks for actually broke at
 * least once. They are cheap, they are static (no browser needed), and they run
 * in about a second — so there is no reason not to run them before a commit.
 *
 *   npm run audit
 *
 * Contrast is deliberately NOT checked here: it needs real layout and canvas
 * sampling, so it lives in the browser pass. What this catches is the class of
 * error that survives a typecheck and a build and still ships broken.
 *
 * Since Phōs the site has two volumes, each a route under src/routes with its
 * own numbering. Everything that is a property of one page — its section ids,
 * its numbering, its header waypoints, its in-page anchors, the "§ N" references
 * in its prose — is checked per route. Everything shared — index entries,
 * lexicon pointers, backdrops — is checked against the union, and section ids
 * are required to be unique across the whole site, so a hash can only ever mean
 * one place.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { buildToc, render, OUTLINE, TOC } from "./phos-toc.mjs";
import { parseEntry, validateMeta } from "./lib/frontmatter.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Read ALL source, not one file. The first version of this script read only
 * src/routes/index.tsx, and when the components were split out it went on
 * reporting "clean" while one check silently inspected nothing — the index
 * count fell from 44 entries to 0 and the run still passed. A check that can
 * quietly stop checking is worse than no check.
 */
function collect(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) collect(full, acc);
    else if (/\.(tsx?|jsx?)$/.test(e)) acc.push(full);
  }
  return acc;
}
const files = collect(join(root, "src"));
const sources = files.map((f) => ({ file: relative(root, f), text: readFileSync(f, "utf8") }));
const src = sources.map((s) => s.text).join("\n");
const css = readFileSync(join(root, "src/styles.css"), "utf8");

const problems = [];
const notes = [];
const fail = (check, msg) => problems.push(`${check}: ${msg}`);
const note = (check, msg) => notes.push(`${check}: ${msg}`);

// ----------------------------------------------------------------- volumes
// A route is a page is a volume. Anything under src/routes that registers a
// path is one; the generated tree and the root layout are not.
const ROMAN = { I: 1, V: 5, X: 10, L: 50, C: 100 };
const toArabic = (r) =>
  [...r].reduce((t, c, i) => t + (ROMAN[c] < (ROMAN[r[i + 1]] ?? 0) ? -ROMAN[c] : ROMAN[c]), 0);

// A route id keeps the "_" that un-nests a file from its parent (phos_.portal
// is /phos/portal, not a child of /phos); the path a Link uses does not.
const routes = sources
  .filter((s) => s.file.startsWith(join("src", "routes") + sep))
  .map((s) => ({
    ...s,
    path: s.text.match(/createFileRoute\("([^"]+)"\)/)?.[1]?.replace(/_(?=\/|$)/g, "") ?? null,
  }))
  .filter((r) => r.path);
const shared = sources.filter((s) => !routes.some((r) => r.file === s.file));
if (!routes.length) fail("volumes", "no createFileRoute() found under src/routes — nothing was audited");

// ---------------------------------------------------------------- numbering
for (const r of routes) {
  r.sections = [...r.text.matchAll(/<section id="([a-z-]+)"/g)].map((m) => ({
    id: m[1],
    at: m.index,
    route: r.path,
  }));
  r.sections.forEach((s, i) => {
    s.end = r.sections[i + 1]?.at ?? r.text.length;
    s.numeral = r.text.slice(s.at, s.end).match(/§ ([IVXLC]+) · /)?.[1] ?? null;
  });
  r.numbered = r.sections.filter((s) => s.numeral);

  const dupes = r.sections.map((s) => s.id).filter((id, i, a) => a.indexOf(id) !== i);
  if (dupes.length) fail("section ids", `${r.path}: duplicated: ${[...new Set(dupes)].join(", ")}`);

  const seq = r.numbered.map((s) => toArabic(s.numeral));
  const firstBad = seq.findIndex((v, i) => v !== i + 1);
  if (firstBad !== -1) {
    fail(
      "numbering",
      `${r.path}: not strictly ascending from I — first break at ${r.numbered[firstBad].id} ` +
        `(§ ${r.numbered[firstBad].numeral}, expected ${firstBad + 1})`,
    );
  } else if (r.numbered.length) {
    note("numbering", `${r.path}: I–${r.numbered.at(-1).numeral}, ${r.numbered.length} sections, strictly ascending`);
  }
}

const sections = routes.flatMap((r) => r.sections);
const numbered = sections.filter((s) => s.numeral);
const byId = {};
for (const s of sections) {
  if (byId[s.id] && byId[s.id].route !== s.route)
    fail("section ids", `"${s.id}" is a section of both ${byId[s.id].route} and ${s.route} — a hash must mean one place`);
  byId[s.id] ??= s;
}
const byPath = Object.fromEntries(routes.map((r) => [r.path, r]));
note("volumes", routes.map((r) => `${r.path} (${r.numbered.length} numbered, ${r.sections.length} sections)`).join(" · "));

// ------------------------------------------------------------------- index
// Entries are wherever a page keeps them — the Architecture's in lib/contents,
// Phōs's in its own route — and each resolves against the union, since ids are
// unique across the site.
const entries = [...src.matchAll(/\{ n: "([IVXLC]*|—|00)", id: "([a-z-]+)"/g)].map((m) => ({
  numeral: m[1],
  id: m[2],
}));

for (const e of entries) {
  if (e.id !== "top" && !byId[e.id]) fail("index", `entry "${e.id}" has no matching section`);
  else if (byId[e.id]?.numeral && /^[IVXLC]+$/.test(e.numeral) && byId[e.id].numeral !== e.numeral)
    fail("index", `"${e.id}" listed as § ${e.numeral} but its heading reads § ${byId[e.id].numeral}`);
}
// The reverse direction matters just as much: a section absent from the index is
// invisible to every reader who navigates rather than scrolls. This check was
// added after § XLI and § XLII mounted cleanly and the index never learned them.
const listed = new Set(entries.map((e) => e.id));
const unlisted = numbered.filter((s) => !listed.has(s.id));
if (unlisted.length)
  fail("index", `sections missing from an index: ${unlisted.map((s) => `${s.route} § ${s.numeral} (${s.id})`).join(", ")}`);
else note("index", `${entries.length} entries, all resolving; all ${numbered.length} numbered sections listed`);

// -------------------------------------------------- prose cross-references
// A "§ N" is a promise that section N exists on the page it is written on. In a
// route that is strict: N must be one of that route's numerals. A reference to
// the OTHER volume has to be a <Link to="/…" hash="…"> so a reader can follow it,
// and those link bodies are blanked before scanning, so a "§ IV" pointing across
// is never mistaken for a local one — it is checked by its hash below instead.
// Shared components serve either page, so a "§ N" there resolves against the
// union. That is weaker, and the note says so.
const stripCrossLinks = (r) =>
  r.text.replace(/<Link\b([^>]*)>([\s\S]*?)<\/Link>/g, (all, attrs, body) => {
    const to = attrs.match(/\bto="([^"]+)"/)?.[1];
    return to && to !== r.path ? `<Link${attrs}>${" ".repeat(body.length)}</Link>` : all;
  });
const scanRefs = (text) => {
  const refs = new Set();
  // A no-break space is the normal separator in prose here — "§ XI" must not
  // wrap across a line — so it counts exactly as a plain one.
  for (const m of text.matchAll(/§(?:&nbsp;|[ \u00A0])([IVXLC]+)\b/g)) {
    const before = text.slice(Math.max(0, m.index - 90), m.index);
    if (before.includes("tracking-[0.3em] text-gold")) continue; // the heading eyebrow itself
    refs.add(m[1]);
  }
  return refs;
};
let refTargets = 0;
for (const r of routes) {
  const have = new Set(r.numbered.map((s) => s.numeral));
  const refs = scanRefs(stripCrossLinks(r));
  const dangling = [...refs].filter((n) => !have.has(n));
  if (dangling.length)
    fail(
      "cross-references",
      `${r.path}: point at sections it does not have: ${dangling.join(", ")} — ` +
        `a reference to the other volume must be a <Link to hash>`,
    );
  refTargets += refs.size;
}
{
  const have = new Set(numbered.map((s) => s.numeral));
  const refs = scanRefs(shared.map((s) => s.text).join("\n"));
  const dangling = [...refs].filter((n) => !have.has(n));
  if (dangling.length) fail("cross-references", `shared components point at non-existent sections: ${dangling.join(", ")}`);
  refTargets += refs.size;
}
note("cross-references", `${refTargets} targets, strict per route, union for shared components — all exist`);

// -------------------------------------------------------------- hash links
// Every literal hash — <Link to="/x" hash="y">, or href="#y" — is a promise
// that #y exists on the page it lands on. A Link with `to` lands on that route;
// anything else lands on the page it is written in, or, in a shared component,
// on whichever page renders it.
let hashes = 0;
const checkAnchors = (text, homePath, where) => {
  for (const m of text.matchAll(/<(?:Link|a)\b([^>]*)>/g)) {
    const attrs = m[1];
    const hash = attrs.match(/\bhash="([a-z-]+)"/)?.[1] ?? attrs.match(/\bhref="#([a-z-]+)"/)?.[1];
    if (!hash) continue;
    hashes++;
    if (hash === "top") continue;
    const to = attrs.match(/\bto="([^"]+)"/)?.[1] ?? homePath;
    if (to && !byPath[to]) { fail("hash links", `${where}: to="${to}" is not a route`); continue; }
    const ok = to ? byPath[to].sections.some((s) => s.id === hash) : !!byId[hash];
    if (!ok) fail("hash links", `${where}: #${hash} is not a section${to ? ` of ${to}` : " anywhere"}`);
  }
};
for (const r of routes) checkAnchors(r.text, r.path, r.path);
for (const s of shared) checkAnchors(s.text, null, s.file);
note("hash links", `${hashes} literal anchors, all landing on a section`);

// ------------------------------------------------- full-bleed containing block
// A band is full-bleed via `left:50%; width:100vw; margin-left:-50vw`, which
// centres it on its POSITIONED ANCESTOR. Put one inside a `max-w-*` wrapper and
// it centres on that box instead of the viewport: eight bands shipped 175px off,
// with bare void down one edge. Portrait panels and `fill` backdrops opt out of
// the trick, so only plain bands are constrained.
const offCentre = [];
let bandsChecked = 0;
for (const m of src.matchAll(/<div className="([^"]*\bisolate\b[^"]*)">\s*\n\s*<Backdrop\b([\s\S]*?)\/>/g)) {
  const [, wrapper, props] = m;
  if (/\bportrait\b|\bfill\b/.test(props)) continue;
  bandsChecked++;
  const cap = wrapper.match(/\bmax-w-[\w[\].]+/);
  if (cap) {
    const who = props.match(/src="\/bg\/([a-z0-9]+)\.webp"/);
    offCentre.push(`${who ? who[1] : "a band"} in ${cap[0]}`);
  }
}
if (offCentre.length)
  fail("full-bleed", `centres on its wrapper, not the viewport: ${offCentre.join(", ")}`);
else note("full-bleed", `${bandsChecked} wrapped bands, all with a full-width containing block`);

// ---------------------------------------------------------------------- nav
// The menu is a fossil unless something watches it. Its two lists drifted until
// twelve sections had no entry and every section from § XLI on was unreachable
// from it. Requiring an entry per section is wrong — the menu is waypoints, not a
// contents page — so instead: every target must exist on its own page, and the
// menu must still reach the end of the work. Completeness is the Contents
// panel's job, and the index check above already guarantees every section
// appears in the shared entries it renders.
for (const r of routes) {
  const navIds = [...r.text.matchAll(/\{ id: "([a-z-]+)", label: "[^"]*" \}/g)].map((m) => m[1]);
  if (!navIds.length) {
    if (r.numbered.length) fail("nav", `${r.path}: a numbered volume with no header waypoints`);
    continue;
  }
  const local = new Set(r.sections.map((s) => s.id));
  const dead = navIds.filter((id) => !local.has(id));
  if (dead.length) { fail("nav", `${r.path}: points at sections it does not have: ${dead.join(", ")}`); continue; }
  const deepest = Math.max(...r.numbered.map((s) => toArabic(s.numeral)));
  const reach = Math.max(
    ...navIds.map((id) => {
      const s = r.sections.find((x) => x.id === id);
      return s?.numeral ? toArabic(s.numeral) : 0;
    }),
  );
  if (reach < deepest * 0.6)
    fail("nav", `${r.path}: last waypoint is § ${reach} of ${deepest} — the header has stopped tracking the work`);
  else note("nav", `${r.path}: ${navIds.length} waypoints, all resolving, reaching § ${reach} of ${deepest}`);
}

// --------------------------------------------------------------- backdrops
// A Backdrop uses -z-10, which escapes to the root stacking context unless its
// container isolates. This failed four separate times and hid a backdrop each
// time; the component now self-guarantees at runtime, but the class should be
// present too so there is no first-paint flash.
for (const m of src.matchAll(/className="([^"]*)">\s*\n\s*<Backdrop/g)) {
  if (!m[1].includes("isolate"))
    fail("backdrops", `container without isolate: className="${m[1].slice(0, 56)}…"`);
}

const referenced = new Set([...src.matchAll(/\/bg\/([a-z0-9-]+)\.webp/g)].map((m) => m[1]));
// Encyclopaedia front matter mounts backdrops too (`backdrop: name` in an entry,
// intro, or coda), so those count as referenced — otherwise every image used
// only by the Portal is reported here as unmounted.
{
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith(".md") ? [join(dir, e.name)] : [],
    );
  const contentDir = join(root, "src/content/phos");
  if (existsSync(contentDir))
    for (const f of walk(contentDir)) {
      if (/(?:^|\/)(?:README|_template)\.md$/.test(f)) continue;
      for (const m of readFileSync(f, "utf8").matchAll(/^backdrop:\s*([a-z][a-z0-9-]*)\s*$/gm)) referenced.add(m[1]);
    }
}
const bgDir = join(root, "public/bg");
const onDisk = existsSync(bgDir)
  ? new Set(readdirSync(bgDir).filter((f) => f.endsWith(".webp")).map((f) => f.slice(0, -5)))
  : new Set();
const missing = [...referenced].filter((n) => !onDisk.has(n));
const unused = [...onDisk].filter((n) => !referenced.has(n));
if (missing.length) fail("backdrops", `referenced but not on disk: ${missing.join(", ")}`);
if (unused.length) note("backdrops", `on disk but unmounted: ${unused.join(", ")}`);
note("backdrops", `${referenced.size} mounted, all present`);

// ------------------------------------------------------------ reveal class
// styles.css reserves .aoh-reveal for script application because it starts at
// opacity 0. Put it in markup and the node never becomes visible, because the
// IntersectionObserver only ever sees elements present at mount.
const markupReveal = [...src.matchAll(/className="[^"]*\baoh-reveal\b/g)];
if (markupReveal.length)
  fail(
    "aoh-reveal",
    `${markupReveal.length} use(s) in markup — it is script-applied only, and starts at opacity 0`,
  );

// ------------------------------------------------------------ counted claims
// "Seven ways circulation fails" once sat above eight cards, and the index
// claimed twenty sections long after there were thirty-four.
const WORDS = {
  three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20,
};
const claims = [];
const CLAIM =
  /\b(three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\s+(commitments|principles|rungs|movements|rules|stations|carriers|attentions|questions|counterfeits|consents|propositions)\b/gi;
for (const r of routes) {
  for (const m of r.text.matchAll(CLAIM)) {
    const host = r.sections.find((s) => m.index >= s.at && m.index < s.end);
    claims.push({ n: WORDS[m[1].toLowerCase()], noun: m[2], section: host?.id ?? "—" });
  }
}
for (const s of shared) for (const m of s.text.matchAll(CLAIM)) claims.push({ n: WORDS[m[1].toLowerCase()], noun: m[2], section: s.file });
note("counted claims", `${claims.length} found — verify against rendered items in the browser pass`);

// ----------------------------------------------------------------- lexicon
// Every lexicon entry points at a section and claims its numeral. A glossary
// with a dead pointer is worse than no glossary, and the pointers were written
// by hand from memory.
const lex = [...src.matchAll(/\{ term: "([^"]+)"[^}]*?at: "([a-z-]+)", n: "([IVXLC—]+)"/g)];
if (lex.length) {
  for (const [, term, at, n] of lex) {
    const target = byId[at];
    if (!target) fail("lexicon", `"${term}" points at #${at}, which is not a section`);
    else if (target.numeral && target.numeral !== n)
      fail("lexicon", `"${term}" claims § ${n} but #${at} is § ${target.numeral}`);
  }
  // A term defined twice sends readers to two different sections for the same
  // word, and the pointer check passes both because each resolves on its own.
  // "Solve et coagula" shipped twice before this existed.
  const termNames = lex.map((m) => m[1]);
  const dupTerms = termNames.filter((t, i) => termNames.indexOf(t) !== i);
  if (dupTerms.length)
    fail("lexicon", `defined more than once: ${[...new Set(dupTerms)].join(", ")}`);

  note("lexicon", `${lex.length} entries, every pointer and numeral correct`);
}

// ----------------------------------------------------------- encyclopaedia
// The Portal registers 653 entries in toc.json before any is written, and each
// written one is a markdown file that must land on exactly one of them. Every
// way that can go wrong is cheap to check and expensive to discover in the
// browser: a file in the wrong division, a slug that matches nothing, a title
// retyped differently from the outline, an entry with no evidence label, a
// facet value outside the vocabulary, a related id or [[ref]] that resolves to
// nothing, a backdrop that is not on disk. The outline is the source of truth;
// toc.json must be exactly what `npm run toc` would write from it.
{
  const schema = JSON.parse(readFileSync(join(root, "src/lib/phos/schema.json"), "utf8"));
  const { toc, problems: outline } = buildToc(readFileSync(OUTLINE, "utf8"));
  for (const p of outline) fail("outline", p);
  if (render(toc) !== readFileSync(TOC, "utf8"))
    fail("toc", "src/lib/phos/toc.json is not what outline.txt generates — run `npm run toc`");

  const ids = new Set(toc.divisions.flatMap((d) => d.entries.map((e) => e.id)));
  const contentDir = join(root, "src/content/phos");
  const md = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir)) {
      const full = join(dir, e);
      if (statSync(full).isDirectory()) walk(full);
      else if (e.endsWith(".md")) md.push(full);
    }
  };
  if (existsSync(contentDir)) walk(contentDir);

  const seen = new Map();
  let written = 0;
  const perDivision = {};
  for (const f of md) {
    const rel = relative(contentDir, f).split(sep).join("/");
    const base = rel.split("/").pop();
    const raw = readFileSync(f, "utf8");
    const { meta, body } = parseEntry(raw, schema);

    for (const m of body.matchAll(/\[\[([a-z]+-\d+)(?:\|[^\]]*)?\]\]/g))
      if (!ids.has(m[1])) fail("encyclopaedia", `${rel}: [[${m[1]}]] is not a registered entry`);
    if (meta.backdrop && !onDisk.has(meta.backdrop))
      fail("encyclopaedia", `${rel}: backdrop "${meta.backdrop}" is not in public/bg`);

    if (base === "README.md" || base === "_template.md") continue;
    if (base === "_intro.md" || base === "_coda.md") {
      if (!toc.divisions.some((d) => d.id === rel.split("/")[0]))
        fail("encyclopaedia", `${rel}: a division file for a division that does not exist`);
      continue;
    }
    const at = rel.match(/^([a-z]+)\/(?:\d+-)?([a-z0-9-]+)\.md$/);
    if (!at) { fail("encyclopaedia", `${rel}: not at <division>/<NN->slug.md`); continue; }
    const [, division, slug] = at;
    const key = `${division}/${slug}`;
    if (seen.has(key)) fail("encyclopaedia", `${rel} and ${seen.get(key)} are both ${key}`);
    seen.set(key, rel);
    for (const p of validateMeta(meta, { schema, toc, at: rel, division, slug })) fail("encyclopaedia", p);
    const n = rel.match(/\/(\d+)-/)?.[1];
    const reg = toc.divisions.find((d) => d.id === division)?.entries.find((e) => e.slug === slug);
    if (n && reg && Number(n) !== reg.n) fail("encyclopaedia", `${rel}: numbered ${Number(n)} but the outline has it as ${reg.n}`);
    written++;
    perDivision[division] = (perDivision[division] ?? 0) + 1;
  }
  const begun = toc.divisions.filter((d) => perDivision[d.id]);
  note(
    "encyclopaedia",
    `${toc.divisions.length} divisions, ${toc.total} entries registered; ${written} written` +
      (begun.length ? ` — ${begun.map((d) => `${d.numeral || "Portal"} ${perDivision[d.id]}/${d.entries.length}`).join(", ")}` : ""),
  );
}

// ---------------------------------------------------------------- measure
if (!css.includes("74ch")) fail("measure", "the line-length cap is missing from styles.css");

// ----------------------------------------------------------------- report
const w = (s) => process.stdout.write(s + "\n");
w("");
w(`  scanned ${files.length} source files\n`);
for (const n of notes) w(`  ok    ${n}`);
if (problems.length) {
  w("");
  for (const p of problems) w(`  FAIL  ${p}`);
  w(`\n  ${problems.length} problem${problems.length === 1 ? "" : "s"}\n`);
  process.exit(1);
}
w(`\n  clean — ${notes.length} checks passed\n`);
