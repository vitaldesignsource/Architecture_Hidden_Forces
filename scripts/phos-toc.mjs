#!/usr/bin/env node
/**
 * The encyclopaedia's table of contents, from the outline.
 *
 * src/lib/phos/outline.txt is the source a person edits: one line per entry,
 * numbered within its division, with "#" division headers and "##" groups.
 * This turns it into src/lib/phos/toc.json, which the routes import and the
 * audit checks every content file against. `npm run toc` regenerates the JSON;
 * the audit fails if the JSON and the outline disagree, so neither can drift.
 *
 * Ids are stable: "<division>-<n>", so "xv-83" is Grosseteste's On Light for
 * as long as it keeps that number. Slugs are derived from titles and become
 * the URL and the file name — accents stripped, so Ākāśa files as "akasa".
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const OUTLINE = join(here, "../src/lib/phos/outline.txt");
export const TOC = join(here, "../src/lib/phos/toc.json");

const ROMAN = { I: 1, V: 5, X: 10, L: 50, C: 100 };
const toArabic = (r) =>
  [...r].reduce((t, c, i) => t + (ROMAN[c] < (ROMAN[r[i + 1]] ?? 0) ? -ROMAN[c] : ROMAN[c]), 0);

export const slugify = (t) =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’'"“”]/g, "")
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function buildToc(text) {
  const divisions = [];
  let div = null;
  let group = null;
  const problems = [];

  for (const [i, raw] of text.split("\n").entries()) {
    const line = raw.trim();
    if (!line) continue;
    const at = `outline.txt:${i + 1}`;

    let m;
    if ((m = line.match(/^# Division ([IVXLC]+) — (.+)$/))) {
      div = { id: m[1].toLowerCase(), numeral: m[1], order: toArabic(m[1]), title: m[2].trim(), note: null, entries: [] };
      divisions.push(div);
      group = null;
    } else if ((m = line.match(/^# Portal Entrance$/))) {
      div = { id: "portal", numeral: "", order: 0, title: "Portal Entrance", note: null, entries: [] };
      divisions.push(div);
      group = null;
    } else if (line.startsWith("## ")) {
      if (!div) problems.push(`${at}: a group before any division`);
      group = line.slice(3).trim();
    } else if (line.startsWith("> ")) {
      if (!div) problems.push(`${at}: a note before any division`);
      else div.note = line.slice(2).trim();
    } else if (line.startsWith("#")) {
      continue; // a comment line
    } else if ((m = line.match(/^(\d+)\.\s+(.+)$/))) {
      if (!div) { problems.push(`${at}: an entry before any division`); continue; }
      const n = Number(m[1]);
      const title = m[2].trim();
      const expected = div.entries.length + 1;
      if (n !== expected) problems.push(`${at}: Division ${div.numeral || "Portal"} entry numbered ${n}, expected ${expected}`);
      const slug = slugify(title);
      if (!slug) problems.push(`${at}: "${title}" yields an empty slug`);
      if (div.entries.some((e) => e.slug === slug))
        problems.push(`${at}: slug "${slug}" is already used in Division ${div.numeral || "Portal"}`);
      div.entries.push({ n, id: `${div.id}-${n}`, slug, title, group });
    } else {
      problems.push(`${at}: unrecognised line: ${line.slice(0, 60)}`);
    }
  }

  const ids = divisions.map((d) => d.id);
  for (const id of ids) if (ids.indexOf(id) !== ids.lastIndexOf(id)) problems.push(`division "${id}" appears twice`);
  const numerals = divisions.filter((d) => d.order > 0).map((d) => d.order);
  numerals.forEach((n, i) => { if (n !== i + 1) problems.push(`divisions are not I, II, III… in order (found ${n} at position ${i + 1})`); });

  const total = divisions.reduce((t, d) => t + d.entries.length, 0);
  return { toc: { divisions, total }, problems };
}

export function render(toc) {
  return JSON.stringify(toc, null, 2) + "\n";
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { toc, problems } = buildToc(readFileSync(OUTLINE, "utf8"));
  if (problems.length) {
    for (const p of problems) console.error(`  FAIL  ${p}`);
    process.exit(1);
  }
  writeFileSync(TOC, render(toc));
  console.log(`  wrote ${TOC}: ${toc.divisions.length} divisions, ${toc.total} entries`);
  for (const d of toc.divisions) console.log(`        ${(d.numeral || "—").padEnd(5)} ${String(d.entries.length).padStart(3)}  ${d.title}`);
}
