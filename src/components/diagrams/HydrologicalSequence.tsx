import { fs } from "./fig";

/**
 * HydrologicalSequence — the healthy circulation as a ring, and the ways it
 * fails as dead ends leaving it.
 *
 * Nine stations from descent to return, drawn as a cycle because that is what
 * a working hydrology is: what returns is received again. The five
 * pathologies are not stations. They are exits — obstruction leaving
 * channelling, and the chain it starts: stagnation, then leakage, then
 * flooding when the blocked current finds the wrong way out, then depletion
 * downstream of it all. A dead end is drawn as one: the chain drops away
 * beneath the ring and stops at a bar — which is a waterline. What leaves
 * the circulation by these exits does not vanish; it settles beneath the
 * threshold, into the Black Aquifer, and the drawing says so under the bar.
 */
const RING = ["Descent", "Reception", "Channelling", "Accumulation", "Saturation", "Overflow", "Transformation", "Release", "Return"];
const EXITS = ["Obstruction", "Stagnation", "Leakage", "Flooding", "Depletion"];

export function HydrologicalSequence() {
  const W = 600, H = 400, cx = 230, cy = 200, R = 132;
  const pos = (i: number) => {
    const a = -Math.PI / 2 + (i / RING.length) * 2 * Math.PI;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), a };
  };
  const pts = RING.map((_, i) => pos(i));
  // the exit chain leaves at Channelling, ducks beneath its label, and walks away down and to the right
  const from = pts[2];
  const chain = EXITS.map((_, i) => ({ x: from.x + 50 + i * 24, y: from.y + 34 + i * 30 }));
  const last = chain[chain.length - 1];
  return (
    <div className="aoh-fig mx-auto w-full max-w-[560px]">
      <style>{`
        .aoh-hs-flow { stroke-dasharray: 4 7; animation: aoh-hs-run 4s linear infinite; }
        @keyframes aoh-hs-run { to { stroke-dashoffset: -22 } }
        @media (prefers-reduced-motion: reduce) { .aoh-hs-flow { animation: none } }
      `}</style>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="aoh-hs-t">
        <title id="aoh-hs-t">
          Nine stations of healthy circulation on a ring — descent, reception, channelling, accumulation,
          saturation, overflow, transformation, release, return — with a chain of five failures leaving it:
          obstruction, stagnation, leakage, flooding, depletion — and beneath the last, the waterline of
          the Black Aquifer.
        </title>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--gold, #c9a227)" strokeOpacity={0.18} strokeWidth={1} />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--gold, #c9a227)" strokeOpacity={0.55} strokeWidth={1} className="aoh-hs-flow" />
        {pts.map((p, i) => {
          const out = 16;
          const lx = cx + (R + out) * Math.cos(p.a), ly = cy + (R + out) * Math.sin(p.a);
          const anchor = Math.cos(p.a) > 0.3 ? "start" : Math.cos(p.a) < -0.3 ? "end" : "middle";
          return (
            <g key={RING[i]}>
              <circle cx={p.x} cy={p.y} r={3.2} fill="var(--gold, #c9a227)" />
              <text x={lx} y={ly + 3} textAnchor={anchor} className="font-serif" style={fs(10.5)} fill="currentColor" fillOpacity={0.9}>
                {RING[i]}
              </text>
            </g>
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" className="font-mono uppercase" style={{ ...fs(7.5), letterSpacing: "0.22em" }} fill="var(--gold, #c9a227)" fillOpacity={0.8}>
          what returns
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" className="font-mono uppercase" style={{ ...fs(7.5), letterSpacing: "0.22em" }} fill="var(--gold, #c9a227)" fillOpacity={0.8}>
          is received again
        </text>
        {/* the exit */}
        <path d={`M ${from.x} ${from.y} C ${from.x + 30} ${from.y + 4}, ${chain[0].x - 24} ${chain[0].y - 8}, ${chain[0].x} ${chain[0].y}`} fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.9} strokeDasharray="2 3" />
        {chain.map((c, i) => (
          <g key={EXITS[i]}>
            {i > 0 && (
              <line x1={chain[i - 1].x} y1={chain[i - 1].y} x2={c.x} y2={c.y} stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.9} strokeDasharray="2 3" />
            )}
            <circle cx={c.x} cy={c.y} r={2.4} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.9} />
            <text x={c.x + 7} y={c.y + 3} className="font-serif italic" style={fs(9.5)} fill="currentColor" fillOpacity={0.6}>
              {EXITS[i]}
            </text>
          </g>
        ))}
        {/* the dead end is a waterline, and there is a depth beneath it */}
        <line x1={last.x - 16} y1={last.y + 14} x2={last.x + 16} y2={last.y + 14} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} />
        <rect x={last.x - 40} y={last.y + 16} width={80} height={26} fill="currentColor" fillOpacity={0.06} />
        <text x={last.x} y={last.y + 26} textAnchor="middle" className="font-mono uppercase" style={{ ...fs(6.5), letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.4}>
          no return
        </text>
        <text x={last.x} y={last.y + 37} textAnchor="middle" className="font-mono uppercase" style={{ ...fs(6), letterSpacing: "0.16em" }} fill="var(--gold, #c9a227)" fillOpacity={0.6}>
          beneath: the Black Aquifer
        </text>
      </svg>
    </div>
  );
}
