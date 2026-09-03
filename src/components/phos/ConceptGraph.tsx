import type { Graph, GraphNode } from "@/lib/phos/tools";

/**
 * ConceptGraph — an entry and what it is related to, drawn as two rings.
 *
 * The centre is where the reader stands. The first ring is every entry the
 * centre names in its `related` list; the second is what those name in turn,
 * each kept in the sector of the entry it came through, so a path outward
 * reads as a path rather than a scatter. Unwritten entries are drawn hollow:
 * the outline knows them, the map does not yet, and a trace should show where
 * it runs off the written ground rather than pretend the ground continues.
 */
export function ConceptGraph({ graph, onCentre }: { graph: Graph; onCentre: (id: string) => void }) {
  const R = [0, 128, 236];
  const pos = (n: GraphNode) => ({ x: Math.cos(n.angle) * R[n.ring], y: Math.sin(n.angle) * R[n.ring] });
  const at = new Map(graph.nodes.map((n) => [n.e.id, pos(n)]));
  const ring2 = graph.nodes.filter((n) => n.ring === 2);
  const labelRing2 = ring2.length <= 18;
  const cut = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

  return (
    <svg viewBox="-300 -300 600 600" className="h-auto w-full max-w-[640px]" role="img" aria-labelledby="aoh-cg-t">
      <title id="aoh-cg-t">
        {graph.centre.title} at the centre, with its related entries around it and theirs beyond them.
      </title>
      <g style={{ pointerEvents: "none" }}>
        <circle r={R[1]} fill="none" stroke="var(--gold)" strokeOpacity="0.12" strokeDasharray="2 5" />
        <circle r={R[2]} fill="none" stroke="var(--gold)" strokeOpacity="0.07" strokeDasharray="2 5" />
      </g>
      {graph.edges.map(([a, b]) => {
        const p = at.get(a), q = at.get(b);
        if (!p || !q) return null;
        const outer = graph.nodes.find((n) => n.e.id === b)?.ring === 2;
        return (
          <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="var(--gold)" strokeOpacity={outer ? 0.16 : 0.42} strokeWidth={outer ? 0.7 : 1} style={{ pointerEvents: "none" }} />
        );
      })}
      {graph.nodes.map((n) => {
        const { x, y } = pos(n);
        const written = n.e.written;
        const clickable = written && n.ring !== 0;
        const anchor = n.ring === 0 ? "middle" : Math.cos(n.angle) > 0.15 ? "start" : Math.cos(n.angle) < -0.15 ? "end" : "middle";
        const dx = n.ring === 0 ? 0 : anchor === "start" ? 10 : anchor === "end" ? -10 : 0;
        const dy = n.ring === 0 ? 24 : anchor === "middle" ? (Math.sin(n.angle) > 0 ? 16 : -10) : 3.5;
        const r = n.ring === 0 ? 9 : n.ring === 1 ? 5.5 : 3.5;
        const fill = n.ring === 0 ? "var(--gold)" : written ? (n.ring === 1 ? "var(--bone)" : "var(--muted-foreground)") : "var(--void)";
        const size = n.ring === 0 ? 13 : n.ring === 1 ? 10.5 : 8.5;
        const colour = n.ring === 0 ? "var(--gold)" : n.ring === 1 ? "var(--bone)" : "var(--muted-foreground)";
        const label = n.ring === 2 && !labelRing2 ? null : cut(n.e.title, n.ring === 0 ? 40 : n.ring === 1 ? 30 : 24);
        return (
          <g
            key={n.e.id}
            transform={`translate(${x} ${y})`}
            onClick={clickable ? () => onCentre(n.e.id) : undefined}
            style={{ cursor: clickable ? "pointer" : "default" }}
            opacity={written ? 1 : 0.5}
          >
            <title>{`${n.e.division.numeral ? `${n.e.division.numeral}.` : ""}${n.e.n} · ${n.e.title}${written ? "" : " (forthcoming)"}`}</title>
            {/* A generous invisible target: a 3.5-unit dot is not a thing to have to hit. */}
            {clickable && <circle r={16} fill="transparent" />}
            {n.ring === 0 && <circle r={r + 9} fill="var(--gold)" fillOpacity="0.16" />}
            <circle r={r} fill={fill} stroke="var(--gold)" strokeWidth={written ? 0.8 : 1} strokeOpacity={written ? 0.6 : 0.8} />
            {label && (
              <text
                x={dx}
                y={dy}
                textAnchor={anchor}
                fontSize={size}
                fill={colour}
                fontFamily={n.ring === 0 ? "var(--font-serif)" : "var(--font-sans)"}
                fontStyle={n.ring === 0 ? "italic" : "normal"}
                style={{ pointerEvents: "none" }}
              >
                {label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
