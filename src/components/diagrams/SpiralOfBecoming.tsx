/**
 * SpiralOfBecoming — the circulation drawn as what it is: a helix, not a ring.
 *
 * Twelve stations are set along two full turns of a rising spiral, so that
 * the twelfth, "New formation", stands directly above the first,
 * "Morphaithēr" — same phase, one level on. The vertical tick between them is
 * the whole doctrine of the layer: the circulation returns to the station it
 * began at, and not to the place. Every cycle modifies the conditions of the
 * next. A ring would say the opposite, which is why this is not one.
 *
 * The back half of each turn is drawn fainter, so the helix reads in depth;
 * a single mark travels the path, slowly, and stops for anyone who has asked
 * motion to stop.
 */
const STATIONS = [
  ["Morphaithēr", "condition"],
  ["The Sap of Heaven", "nourishment"],
  ["Etheric Hydrology", "circulation"],
  ["Form", "embodiment"],
  ["Life", "participation"],
  ["Dissolution", "the vessel ends"],
  ["The Ossuary", "architecture retained"],
  ["The Crypt", "consequence retained"],
  ["The inherited world", ""],
  ["Altered Morphaithēr", "the same station, changed"],
  ["New reception", ""],
  ["New formation", "one level on"],
] as const;

const W = 420;
const H = 560;
const CX = 210;
const R = 118;
const TOP = 70;
const BOTTOM = 500;
const TURNS = 2;
const STEP = (TURNS * 2 * Math.PI) / (STATIONS.length - 1);

function at(theta: number) {
  const t = theta / (TURNS * 2 * Math.PI);
  return { x: CX + R * Math.sin(theta), y: BOTTOM - (BOTTOM - TOP) * t, depth: Math.cos(theta) };
}

export function SpiralOfBecoming() {
  // the path in small segments, so each can carry its own depth
  const segs: { d: string; front: boolean }[] = [];
  const N = 180;
  for (let i = 0; i < N; i++) {
    const a = at(((i) / N) * TURNS * 2 * Math.PI);
    const b = at(((i + 1) / N) * TURNS * 2 * Math.PI);
    segs.push({ d: `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`, front: (a.depth + b.depth) / 2 > 0 });
  }
  const full = Array.from({ length: N + 1 }, (_, i) => at((i / N) * TURNS * 2 * Math.PI))
    .map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const pts = STATIONS.map((s, i) => ({ s, ...at(i * STEP) }));
  const first = pts[0];
  const last = pts[pts.length - 1];

  return (
    <div className="mx-auto w-full max-w-[460px]">
      <style>{`
        .aoh-sp-mark { offset-rotate: 0deg; }
        @media (prefers-reduced-motion: reduce) { .aoh-sp-mark { display: none } }
      `}</style>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="aoh-sp-t">
        <title id="aoh-sp-t">
          The circulation of formation drawn as a rising spiral of two turns, with twelve stations along
          it from Morphaithēr to New formation, which stands directly above Morphaithēr one level up.
        </title>
        <defs>
          <path id="aoh-sp-path" d={full} />
        </defs>
        {/* the axis the spiral rises around, faint */}
        <line x1={CX} y1={TOP - 30} x2={CX} y2={BOTTOM + 30} stroke="currentColor" strokeOpacity={0.08} strokeWidth={0.6} strokeDasharray="2 6" />
        {/* the back half first, then the front over it */}
        {segs.filter((s) => !s.front).map((s, i) => (
          <path key={"b" + i} d={s.d} stroke="var(--gold, #c9a227)" strokeOpacity={0.22} strokeWidth={0.9} fill="none" strokeLinecap="round" />
        ))}
        {segs.filter((s) => s.front).map((s, i) => (
          <path key={"f" + i} d={s.d} stroke="var(--gold, #c9a227)" strokeOpacity={0.75} strokeWidth={1.2} fill="none" strokeLinecap="round" />
        ))}
        {/* the return that is not a return: first and last share a phase */}
        <line x1={first.x} y1={first.y - 8} x2={last.x} y2={last.y + 8} stroke="var(--gold, #c9a227)" strokeOpacity={0.5} strokeWidth={0.7} strokeDasharray="3 4" />
        <text x={first.x + 10} y={(first.y + last.y) / 2 + 3} className="font-mono uppercase" style={{ fontSize: 7.5, letterSpacing: "0.16em" }} fill="var(--gold, #c9a227)" fillOpacity={0.7}>
          not where it began
        </text>
        {/* stations */}
        {pts.map(({ s, x, y, depth }, i) => {
          const right = x >= CX;
          const lx = right ? x + 12 : x - 12;
          const front = depth >= 0;
          return (
            <g key={s[0]} opacity={front ? 1 : 0.55}>
              <circle cx={x} cy={y} r={i === 0 || i === pts.length - 1 ? 4.2 : 3} fill="var(--gold, #c9a227)" fillOpacity={front ? 0.95 : 0.6} />
              <text x={lx} y={y + 3} textAnchor={right ? "start" : "end"} className="font-serif" style={{ fontSize: 11.5 }} fill="currentColor" fillOpacity={front ? 0.92 : 0.6}>
                {s[0]}
              </text>
              {s[1] && (
                <text x={lx} y={y + 14} textAnchor={right ? "start" : "end"} className="font-mono uppercase" style={{ fontSize: 6.8, letterSpacing: "0.14em" }} fill="currentColor" fillOpacity={0.45}>
                  {s[1]}
                </text>
              )}
            </g>
          );
        })}
        {/* the travelling mark */}
        <circle r={2.6} fill="var(--bone, #f0ead8)" className="aoh-sp-mark">
          <animateMotion dur="36s" repeatCount="indefinite" rotate="0">
            <mpath href="#aoh-sp-path" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  );
}
