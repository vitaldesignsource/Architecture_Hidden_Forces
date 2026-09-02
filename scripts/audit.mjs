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
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

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
const src = files.map((f) => readFileSync(f, "utf8")).join("\n");
const css = readFileSync(join(root, "src/styles.css"), "utf8");

const problems = [];
const notes = [];
const fail = (check, msg) => problems.push(`${check}: ${msg}`);
const note = (check, msg) => notes.push(`${check}: ${msg}`);

// ---------------------------------------------------------------- numbering
const ROMAN = { I: 1, V: 5, X: 10, L: 50, C: 100 };
const toArabic = (r) =>
  [...r].reduce((t, c, i) => t + (ROMAN[c] < (ROMAN[r[i + 1]] ?? 0) ? -ROMAN[c] : ROMAN[c]), 0);

const sections = [...src.matchAll(/<section id="([a-z-]+)"/g)].map((m) => ({
  id: m[1],
  at: m.index,
}));
sections.forEach((s, i) => {
  s.end = sections[i + 1]?.at ?? src.length;
  const h = src.slice(s.at, s.end).match(/§ ([IVXLC]+) · /);
  s.numeral = h?.[1] ?? null;
});

const dupes = sections.map((s) => s.id).filter((id, i, a) => a.indexOf(id) !== i);
if (dupes.length) fail("section ids", `duplicated: ${[...new Set(dupes)].join(", ")}`);

const numbered = sections.filter((s) => s.numeral);
const seq = numbered.map((s) => toArabic(s.numeral));
const expected = seq.map((_, i) => i + 1);
if (JSON.stringify(seq) !== JSON.stringify(expected)) {
  const firstBad = seq.findIndex((v, i) => v !== i + 1);
  fail(
    "numbering",
    `not strictly ascending from I — first break at ${numbered[firstBad]?.id} ` +
      `(§ ${numbered[firstBad]?.numeral}, expected ${expected[firstBad]})`,
  );
} else {
  note("numbering", `I–${numbered.at(-1).numeral}, ${numbered.length} sections, strictly ascending`);
}

// ------------------------------------------------------------------- index
const entries = [...src.matchAll(/\{ n: "([IVXLC]*|—|00)", id: "([a-z-]+)"/g)].map((m) => ({
  numeral: m[1],
  id: m[2],
}));
const byId = Object.fromEntries(sections.map((s) => [s.id, s]));

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
  fail("index", `sections missing from the index: ${unlisted.map((s) => `§ ${s.numeral} (${s.id})`).join(", ")}`);
else note("index", `${entries.length} entries, all resolving; all ${numbered.length} sections listed`);

// -------------------------------------------------- prose cross-references
const haveNumerals = new Set(numbered.map((s) => s.numeral));
const refs = new Set();
for (const m of src.matchAll(/§(?:&nbsp;| )([IVXLC]+)\b/g)) {
  const before = src.slice(Math.max(0, m.index - 90), m.index);
  if (before.includes("tracking-[0.3em] text-gold")) continue; // the heading eyebrow itself
  refs.add(m[1]);
}
const dangling = [...refs].filter((r) => !haveNumerals.has(r));
if (dangling.length) fail("cross-references", `point at non-existent sections: ${dangling.join(", ")}`);
else note("cross-references", `${refs.size} distinct targets, all exist`);

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
for (const m of src.matchAll(
  /\b(three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\s+(commitments|principles|rungs|movements|rules|stations|carriers|attentions|questions)\b/gi,
)) {
  const host = sections.find((s) => m.index >= s.at && m.index < s.end);
  claims.push({ n: WORDS[m[1].toLowerCase()], noun: m[2], section: host?.id ?? "—" });
}
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
