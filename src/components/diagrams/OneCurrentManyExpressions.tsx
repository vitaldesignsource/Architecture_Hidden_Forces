/**
 * OneCurrentManyExpressions — the Sap as a delta.
 *
 * One line descends and divides, and divides again, until it reaches ten
 * named expressions: what a single higher influence becomes in ten kinds of
 * receiver. The branching is drawn from the receiving side up — each fork is
 * a difference in vessel, not a decision in the source — which is why the
 * trunk is one and undivided for as long as it can be.
 */
const LEAVES = [
  "etheric vitality", "organic growth", "psychic image", "intellectual insight", "artistic inspiration",
  "social coherence", "ritual presence", "symbolic vitality", "consciousness", "meaning",
];

export function OneCurrentManyExpressions() {
  const W = 480, H = 300;
  const cx = W / 2;
  const xs = LEAVES.map((_, i) => 24 + (i * (W - 48)) / (LEAVES.length - 1));
  // three tiers of forking: 1 → 2 → 5 → 10
  const tier2 = [cx - 110, cx + 110];
  const tier3 = [xs[0] + (xs[1] - xs[0]) / 2, xs[2] + (xs[3] - xs[2]) / 2, xs[4] + (xs[5] - xs[4]) / 2, xs[6] + (xs[7] - xs[6]) / 2, xs[8] + (xs[9] - xs[8]) / 2];
  const Y0 = 22, Y1 = 96, Y2 = 160, Y3 = 224, Y4 = 262;
  const curve = (x1: number, y1: number, x2: number, y2: number) =>
    `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
  return (
    <div className="mx-auto w-full max-w-[520px]">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="aoh-oc-t">
        <title id="aoh-oc-t">
          One descending current dividing by reception into ten expressions, from etheric vitality to meaning.
        </title>
        <text x={cx} y={12} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7.5, letterSpacing: "0.2em" }} fill="var(--gold, #c9a227)" fillOpacity={0.8}>
          one according to procession
        </text>
        <line x1={cx} y1={Y0} x2={cx} y2={Y1} stroke="var(--gold, #c9a227)" strokeWidth={2} strokeOpacity={0.9} strokeLinecap="round" />
        {tier2.map((x, i) => (
          <path key={"a" + i} d={curve(cx, Y1, x, Y2)} fill="none" stroke="var(--gold, #c9a227)" strokeWidth={1.4} strokeOpacity={0.75} />
        ))}
        {tier3.map((x, i) => (
          <path key={"b" + i} d={curve(tier2[i < 3 ? 0 : 1], Y2, x, Y3)} fill="none" stroke="var(--gold, #c9a227)" strokeWidth={1} strokeOpacity={0.6} />
        ))}
        {xs.map((x, i) => (
          <path key={"c" + i} d={curve(tier3[Math.floor(i / 2)], Y3, x, Y4)} fill="none" stroke="var(--gold, #c9a227)" strokeWidth={0.8} strokeOpacity={0.5} />
        ))}
        {[Y1, Y2, Y3].map((y, i) => (
          <text key={y} x={W - 6} y={y + 3} textAnchor="end" className="font-mono uppercase" style={{ fontSize: 6.5, letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.35}>
            {["the medium", "the condition", "the vessel"][i]}
          </text>
        ))}
        {xs.map((x, i) => (
          <g key={LEAVES[i]}>
            <circle cx={x} cy={Y4} r={2.2} fill="var(--gold, #c9a227)" fillOpacity={0.9} />
            <text x={x} y={Y4 + 16} textAnchor="middle" className="font-serif" style={{ fontSize: 8.5 }} fill="currentColor" fillOpacity={0.8}
                  transform={`rotate(${i % 2 ? 0 : 0} ${x} ${Y4 + 16})`}>
              {LEAVES[i].split(" ")[0]}
            </text>
            <text x={x} y={Y4 + 27} textAnchor="middle" className="font-serif" style={{ fontSize: 8.5 }} fill="currentColor" fillOpacity={0.8}>
              {LEAVES[i].split(" ").slice(1).join(" ")}
            </text>
          </g>
        ))}
        <text x={cx} y={H - 2} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7.5, letterSpacing: "0.2em" }} fill="var(--gold, #c9a227)" fillOpacity={0.8}>
          many according to reception
        </text>
      </svg>
    </div>
  );
}
