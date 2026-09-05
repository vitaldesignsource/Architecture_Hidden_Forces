import { useMemo, useState } from "react";
import { BEINGS, PLANES, type Being, type Plane } from "@/lib/phos/beings";

/**
 * One tradition's own internal graph: who stands to whom inside it.
 *
 * The register's rule holds here as everywhere — a relation only ever runs
 * between two beings of the same tradition, so this diagram can never say that
 * a seraph and a yazata are one thing. What it does say is structural: which
 * beings a tradition hangs everything else from, which sit at the edge with one
 * tie, and how the ties cross the volume's planes.
 *
 * Laid out by plane down the page, so the graph is read against the same
 * vertical as the field above it. Within a plane the order is decided by two
 * barycentre sweeps — each node drifts toward the average position of what it
 * is tied to — which is enough to untangle graphs of this size without a
 * simulation, and is deterministic, so the same tradition always draws the same.
 */

const W = 760;
const ROW = 96;
const PAD_X = 78;
const HEAD = 76;

type Node = { b: Being; x: number; y: number; ties: number; stagger: boolean };
type Edge = { from: Node; to: Node; as: string };

function layout(tradition: string): { nodes: Node[]; edges: Edge[]; height: number } {
  const all = BEINGS.filter((b) => b.tradition === tradition);
  const raw: { from: string; to: string; as: string }[] = [];
  for (const b of all) for (const k of b.kin ?? []) if (all.some((x) => x.id === k.to)) raw.push({ from: b.id, to: k.to, as: k.as });
  const inGraph = new Set(raw.flatMap((r) => [r.from, r.to]));
  const beings = all.filter((b) => inGraph.has(b.id));
  if (!beings.length) return { nodes: [], edges: [], height: 0 };

  // Rows: one per plane the tradition actually occupies, in the volume's order.
  // A tradition that sits wholly on one plane gets its row broken into several,
  // since a single line of a dozen nodes is not a graph anyone can read.
  const planes = PLANES.filter((p) => beings.some((b) => b.plane === p)) as Plane[];
  let rows: Being[][] =
    planes.length > 1
      ? planes.map((p) => beings.filter((b) => b.plane === p))
      : Array.from({ length: Math.ceil(beings.length / 4) }, (_, i) => beings.slice(i * 4, i * 4 + 4));
  rows = rows.filter((r) => r.length);

  const rowOf = new Map<string, number>();
  rows.forEach((r, i) => r.forEach((b) => rowOf.set(b.id, i)));
  const neighbours = new Map<string, string[]>();
  for (const r of raw) {
    (neighbours.get(r.from) ?? neighbours.set(r.from, []).get(r.from)!).push(r.to);
    (neighbours.get(r.to) ?? neighbours.set(r.to, []).get(r.to)!).push(r.from);
  }

  // Two sweeps of barycentre ordering: each node moves toward the mean index of
  // its neighbours in the rows above and below, then the row is re-sorted.
  const indexOf = new Map<string, number>();
  rows.forEach((r) => r.forEach((b, i) => indexOf.set(b.id, i)));
  for (let pass = 0; pass < 2; pass++) {
    for (const r of rows) {
      const score = new Map<string, number>();
      for (const b of r) {
        const ns = (neighbours.get(b.id) ?? []).filter((n) => rowOf.get(n) !== rowOf.get(b.id));
        const xs = ns.map((n) => (indexOf.get(n) ?? 0) / Math.max(1, (rows[rowOf.get(n)!]?.length ?? 1) - 1));
        score.set(b.id, xs.length ? xs.reduce((a, x) => a + x, 0) / xs.length : (indexOf.get(b.id) ?? 0) / Math.max(1, r.length - 1));
      }
      r.sort((a, b) => (score.get(a.id) ?? 0) - (score.get(b.id) ?? 0));
      r.forEach((b, i) => indexOf.set(b.id, i));
    }
  }

  const nodes: Node[] = [];
  rows.forEach((r, ri) =>
    r.forEach((b, i) => {
      const span = W - PAD_X * 2;
      const x = r.length === 1 ? W / 2 : PAD_X + (span * i) / (r.length - 1);
      // Long names in a crowded row would run into each other; every other
      // label drops to a second line of its own.
      nodes.push({ b, x, y: HEAD + ri * ROW + ROW / 2, ties: (neighbours.get(b.id) ?? []).length, stagger: r.length > 5 && i % 2 === 1 });
    }),
  );
  const at = new Map(nodes.map((n) => [n.b.id, n]));
  const edges: Edge[] = raw
    .map((r) => ({ from: at.get(r.from)!, to: at.get(r.to)!, as: r.as }))
    .filter((e) => e.from && e.to);
  return { nodes, edges, height: HEAD + rows.length * ROW + 24 };
}

export function KinGraph({ tradition, onPick }: { tradition: string; onPick: (id: string) => void }) {
  const { nodes, edges, height } = useMemo(() => layout(tradition), [tradition]);
  const [hover, setHover] = useState<string | null>(null);
  if (!nodes.length) return null;

  const lit = edges.filter((e) => hover && (e.from.b.id === hover || e.to.b.id === hover));
  const widest = Math.max(1, ...edges.filter((e) => e.from.y === e.to.y).map((e) => Math.abs(e.from.x - e.to.x)));
  const held = nodes.find((n) => n.b.id === hover);

  return (
    <div className="mt-8">
      <div className="flex min-h-[3rem] flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-3">
        {held ? (
          <>
            <p className="font-serif text-lg text-gold">
              {held.b.name}
              <span className="ml-3 font-label text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                {held.ties === 1 ? "one tie" : `${held.ties} ties`} · {held.b.plane}
              </span>
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-bone/70">
              {lit.slice(0, 2).map((e, i) => (
                <span key={i}>
                  {i > 0 && <span className="mx-2 text-bone/30">·</span>}
                  {e.from.b.id === hover ? `${e.to.b.name} — ${e.as}` : `${e.from.b.name} — ${e.as}`}
                </span>
              ))}
            </p>
          </>
        ) : (
          <p className="font-label text-[9px] uppercase tracking-[0.16em] text-bone/35">
            {nodes.length} beings · {edges.length} relations · laid out on the volume&rsquo;s planes
          </p>
        )}
      </div>
      <div className="aoh-scroll-x overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${height}`} style={{ minWidth: `${W / 20}rem` }} className="w-full" role="img"
             aria-label={`${nodes.length} beings of the ${tradition} tradition and the ${edges.length} relations between them; the same relations are listed under each being's row below.`}
             onMouseLeave={() => setHover(null)}>
          {edges.map((e, i) => {
            const on = hover && (e.from.b.id === hover || e.to.b.id === hover);
            const mx = (e.from.x + e.to.x) / 2;
            // Two beings on the same plane are joined by an arc, not a chord
            // through the row: its height rises with the span and alternates
            // above and below, so a crowded plane fans out instead of matting.
            const span = Math.abs(e.from.x - e.to.x);
            const flat = e.from.y === e.to.y;
            // All same-plane ties arc the same way and nest by span — the widest
            // outermost — so a crowded plane reads as an arc diagram rather than
            // a mat of chords. They rise into the gap above the row, which is
            // clear: the labels of the row above sit well short of it.
            const lift = flat ? -(14 + 42 * (span / Math.max(1, widest))) : 0;
            const my = (e.from.y + e.to.y) / 2 + lift;
            return (
              <path
                key={i}
                d={`M ${e.from.x} ${e.from.y} Q ${mx} ${my} ${e.to.x} ${e.to.y}`}
                fill="none"
                stroke="var(--gold, #c9a227)"
                strokeWidth={on ? 1.1 : 0.6}
                opacity={hover ? (on ? 0.85 : 0.08) : 0.28}
                className="transition-opacity duration-150"
              />
            );
          })}
          {nodes.map((n) => {
            const on = !hover || n.b.id === hover || lit.some((e) => e.from.b.id === n.b.id || e.to.b.id === n.b.id);
            return (
              <g key={n.b.id} opacity={on ? 1 : 0.22} className="cursor-pointer transition-opacity duration-150"
                 onMouseEnter={() => setHover(n.b.id)} onClick={() => onPick(n.b.id)}>
                <circle cx={n.x} cy={n.y} r={hover === n.b.id ? 6 : 3.4 + Math.min(n.ties, 5) * 0.5}
                        fill="var(--gold, #c9a227)" opacity={0.9} className="transition-all duration-150" />
                <text x={n.x} y={n.y + (n.stagger ? 30 : 17)} textAnchor="middle" className="font-serif" style={{ fontSize: 10.5 }}
                      fill="currentColor" fillOpacity={hover === n.b.id ? 1 : 0.72}>
                  {n.b.name.length > 22 ? `${n.b.name.slice(0, 20)}…` : n.b.name}
                </text>
                <title>{`${n.b.name} — ${n.b.plane}`}</title>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
