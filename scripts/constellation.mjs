/**
 * The constellation — the encyclopaedia's citation graph laid out once, as a
 * star chart, and shipped as data. Laid out here rather than in the browser so
 * that the map is the same on every visit: a chart, not a simulation.
 *
 * Fruchterman–Reingold with a seeded generator, plus a gentle pull of each
 * entry toward its division's centre so the divisions read as constellations
 * within the field rather than as a single undifferentiated cloud.
 *
 *   npm run constellation
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readGraph, graphHash } from "./lib/graph.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schema = JSON.parse(readFileSync(join(root, "src/lib/phos/schema.json"), "utf8"));
const toc = JSON.parse(readFileSync(join(root, "src/lib/phos/toc.json"), "utf8"));

const { edges: directed } = readGraph(root, schema);
const registered = new Set(toc.divisions.flatMap((d) => d.entries.map((e) => e.id)));
const nodes = toc.divisions.flatMap((d) => d.entries.map((e) => ({ id: e.id, div: d.id })));
const idx = new Map(nodes.map((n, i) => [n.id, i]));

// undirected, deduplicated; inbound degree kept for brightness
const seen = new Set(); const edges = []; const inbound = new Map();
for (const [a, b] of directed) {
  if (!registered.has(a) || !registered.has(b)) continue;
  inbound.set(b, (inbound.get(b) ?? 0) + 1);
  const k = a < b ? `${a}|${b}` : `${b}|${a}`;
  if (!seen.has(k)) { seen.add(k); edges.push([idx.get(a), idx.get(b)]); }
}

// mulberry32 — a tiny seeded generator, so the chart is reproducible
let s = 0x9e3779b9;
const rand = () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

const N = nodes.length, W = 1000;
const x = new Float64Array(N), y = new Float64Array(N), dx = new Float64Array(N), dy = new Float64Array(N);
// start each division on its own patch of a ring, so the pull has somewhere to pull toward
const divs = [...new Set(nodes.map((n) => n.div))];
const seed = new Map(divs.map((d, i) => [d, [W / 2 + Math.cos((i / divs.length) * Math.PI * 2) * W * 0.32, W / 2 + Math.sin((i / divs.length) * Math.PI * 2) * W * 0.32]]));
nodes.forEach((n, i) => { const [cx, cy] = seed.get(n.div); x[i] = cx + (rand() - 0.5) * 120; y[i] = cy + (rand() - 0.5) * 120; });

const k = Math.sqrt((W * W) / N) * 0.62;
const ITER = 420;
for (let it = 0; it < ITER; it++) {
  const temp = W * 0.08 * (1 - it / ITER) + 0.4;
  dx.fill(0); dy.fill(0);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    let ddx = x[i] - x[j], ddy = y[i] - y[j]; let d2 = ddx * ddx + ddy * ddy; if (d2 < 0.01) { ddx = rand() - 0.5; ddy = rand() - 0.5; d2 = 0.5; }
    const f = (k * k) / d2; dx[i] += ddx * f; dy[i] += ddy * f; dx[j] -= ddx * f; dy[j] -= ddy * f;
  }
  for (const [a, b] of edges) {
    const ddx = x[a] - x[b], ddy = y[a] - y[b]; const d = Math.sqrt(ddx * ddx + ddy * ddy) || 0.01;
    const f = (d * d) / k / d; dx[a] -= ddx * f; dy[a] -= ddy * f; dx[b] += ddx * f; dy[b] += ddy * f;
  }
  // the division pull: each entry drifts a little toward its division's current centre
  const cx = new Map(), cy = new Map(), cn = new Map();
  nodes.forEach((n, i) => { cx.set(n.div, (cx.get(n.div) ?? 0) + x[i]); cy.set(n.div, (cy.get(n.div) ?? 0) + y[i]); cn.set(n.div, (cn.get(n.div) ?? 0) + 1); });
  nodes.forEach((n, i) => { const mx = cx.get(n.div) / cn.get(n.div), my = cy.get(n.div) / cn.get(n.div); dx[i] += (mx - x[i]) * 0.055; dy[i] += (my - y[i]) * 0.055; });
  // and everything, faintly, toward the centre of the chart
  for (let i = 0; i < N; i++) { dx[i] += (W / 2 - x[i]) * 0.004; dy[i] += (W / 2 - y[i]) * 0.004; }
  for (let i = 0; i < N; i++) { const d = Math.sqrt(dx[i] * dx[i] + dy[i] * dy[i]) || 1; const m = Math.min(d, temp); x[i] += (dx[i] / d) * m; y[i] += (dy[i] / d) * m; }
}
// normalise into the chart with a margin
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
for (let i = 0; i < N; i++) { minX = Math.min(minX, x[i]); maxX = Math.max(maxX, x[i]); minY = Math.min(minY, y[i]); maxY = Math.max(maxY, y[i]); }
const M = 60, sc = (W - 2 * M) / Math.max(maxX - minX, maxY - minY);
const out = {
  hash: graphHash(directed.filter(([a, b]) => registered.has(a) && registered.has(b))),
  nodes: nodes.map((n, i) => ({ id: n.id, x: +(M + (x[i] - minX) * sc).toFixed(1), y: +(M + (y[i] - minY) * sc).toFixed(1), in: inbound.get(n.id) ?? 0 })),
  edges,
};
writeFileSync(join(root, "src/lib/phos/constellation.json"), JSON.stringify(out));
console.log(`constellation: ${N} stars, ${edges.length} lines, hash ${out.hash}`);
