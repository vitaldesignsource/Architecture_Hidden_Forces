import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * The entries the Ecology points into. Every "In the Portal" pointer names
 * an entry by id in a string literal; this resolves the ids the Ecology's
 * sources actually use to the fields a pointer renders, so the volume does
 * not ship the whole outline for thirty-nine titles. The audit regenerates
 * it and fails when the file on disk differs.
 */
export function collectIds(root, toc) {
  const prefixes = toc.divisions.map((d) => d.id).join("|");
  const re = new RegExp(`"((?:${prefixes})-\\d+)"`, "g");
  const files = [
    ...readdirSync(join(root, "src/routes")).filter((f) => /^ecology.*\.tsx$/.test(f)).map((f) => join(root, "src/routes", f)),
    ...readdirSync(join(root, "src/components/ecology")).filter((f) => f.endsWith(".tsx")).map((f) => join(root, "src/components/ecology", f)),
    join(root, "src/lib/ecology.ts"),
    join(root, "src/lib/lexicon.ts"),
  ];
  const ids = new Set();
  for (const f of files) for (const m of readFileSync(f, "utf8").matchAll(re)) ids.add(m[1]);
  return ids;
}

export function buildRefs(root, toc) {
  const ids = collectIds(root, toc);
  const out = {};
  for (const d of toc.divisions)
    for (const e of d.entries)
      if (ids.has(e.id)) out[e.id] = { n: e.n, slug: e.slug, title: e.title, division: d.id, numeral: d.numeral || "Portal" };
  return Object.fromEntries(Object.keys(out).sort().map((k) => [k, out[k]]));
}

export const render = (refs) => JSON.stringify(refs, null, 2) + "\n";
