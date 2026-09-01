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
note("index", `${entries.length} entries, all resolving`);

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
