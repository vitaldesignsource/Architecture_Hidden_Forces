import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { parseEntry } from "./frontmatter.mjs";

/** Every entry file under the content root, in a stable order. */
export function entryFiles(dir, acc = []) {
  for (const e of readdirSync(dir).sort()) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) entryFiles(full, acc);
    else if (/^\d+-.*\.md$/.test(e)) acc.push(full);
  }
  return acc;
}

/**
 * The citation graph as the audit already understands it: an entry cites
 * another through its `related` list or a [[ref]] in its body. Directed.
 */
export function readGraph(root, schema) {
  const edges = [];
  const ids = [];
  for (const f of entryFiles(join(root, "src/content/phos"))) {
    const at = f.match(/\/([a-z]+)\/(\d+)-[^/]+\.md$/);
    if (!at) continue;
    const id = `${at[1]}-${Number(at[2])}`;
    ids.push(id);
    const { meta, body } = parseEntry(readFileSync(f, "utf8"), schema);
    const links = [...body.matchAll(/\[\[([a-z]+-\d+)/g)].map((m) => m[1]);
    for (const to of new Set([...meta.related, ...links])) if (to !== id) edges.push([id, to]);
  }
  return { ids, edges };
}

/** A fingerprint of the graph, so a shipped layout can be checked for staleness. */
export const graphHash = (edges) =>
  createHash("sha1").update(edges.map((e) => e.join(">")).sort().join("\n")).digest("hex").slice(0, 12);
