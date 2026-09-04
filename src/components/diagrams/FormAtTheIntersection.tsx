/**
 * FormAtTheIntersection — the vessel where the whole ecology meets.
 *
 * Five lines arrive at one outline from five directions — the atmosphere it
 * emerges in, the nourishment that feeds it, the circulation that carries
 * the nourishment, the architecture it inherits, the conditions the past
 * has already altered — and six short marks leave it, for what a healthy
 * form does with all that: receives, contains, differentiates, transmits,
 * transforms, releases. The outline is open at the top and the bottom. A
 * closed one would be a tomb.
 */
export function FormAtTheIntersection() {
  const cx = 200, cy = 150;
  const IN = [
    { k: "within Morphaithēr", from: [cx, 18], sub: "condition" },
    { k: "fed by the Sap", from: [56, 62], sub: "nourishment" },
    { k: "through a Hydrology", from: [344, 62], sub: "circulation" },
    { k: "using the Ossuary's architectures", from: [56, 250], sub: "inheritance" },
    { k: "in a world the Crypt conditioned", from: [344, 250], sub: "memory" },
  ];
  const OUT = ["receives", "contains", "differentiates", "transmits", "transforms", "releases"];
  return (
    <div className="mx-auto w-full max-w-[440px]">
      <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-labelledby="aoh-fi-t">
        <title id="aoh-fi-t">
          Five lines converge on the outline of a vessel — condition, nourishment, circulation, inheritance,
          memory — and six marks leave it: receives, contains, differentiates, transmits, transforms, releases.
        </title>
        {IN.map((l) => {
          const [x, y] = l.from;
          const dx = cx - x, dy = cy - y, len = Math.hypot(dx, dy);
          const ex = cx - (dx / len) * 40, ey = cy - (dy / len) * 40;
          const anchor = x < cx - 20 ? "start" : x > cx + 20 ? "end" : "middle";
          return (
            <g key={l.k}>
              <line x1={x} y1={y} x2={ex} y2={ey} stroke="var(--gold, #c9a227)" strokeOpacity={0.55} strokeWidth={0.9} />
              <circle cx={x} cy={y} r={2.2} fill="var(--gold, #c9a227)" />
              <text x={x} y={y - 8} textAnchor={anchor} className="font-serif" style={{ fontSize: 9.5 }} fill="currentColor" fillOpacity={0.85}>{l.k}</text>
              <text x={x} y={y + 14} textAnchor={anchor} className="font-mono uppercase" style={{ fontSize: 6.4, letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.45}>{l.sub}</text>
            </g>
          );
        })}
        {/* the vessel: open above and below */}
        <path d={`M ${cx - 30} ${cy - 34} L ${cx - 26} ${cy + 26} Q ${cx} ${cy + 40} ${cx + 26} ${cy + 26} L ${cx + 30} ${cy - 34}`} fill="none" stroke="currentColor" strokeOpacity={0.9} strokeWidth={1.2} />
        <text x={cx} y={cy + 4} textAnchor="middle" className="font-serif italic" style={{ fontSize: 13 }} fill="var(--gold, #c9a227)">Form</text>
        {/* what it does */}
        {OUT.map((o, i) => {
          const a = Math.PI / 2 + ((i - 2.5) / 5) * 0.9;
          const x1 = cx + 34 * Math.cos(a) * (i < 3 ? -1 : 1) * 0 + (i - 2.5) * 12;
          const y1 = cy + 44;
          const y2 = cy + 62 + Math.abs(i - 2.5) * 3;
          return (
            <g key={o}>
              <line x1={x1} y1={y1} x2={x1} y2={y2} stroke="var(--gold, #c9a227)" strokeOpacity={0.6} strokeWidth={0.8} />
              <text x={x1} y={y2 + 12} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 5.8, letterSpacing: "0.12em" }} fill="currentColor" fillOpacity={0.6}
                    transform={`rotate(${(i - 2.5) * 9} ${x1} ${y2 + 12})`}>
                {o}
              </text>
            </g>
          );
        })}
        <text x={cx} y={292} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7, letterSpacing: "0.2em" }} fill="var(--gold, #c9a227)" fillOpacity={0.7}>
          a temporary architecture of participation
        </text>
      </svg>
    </div>
  );
}
