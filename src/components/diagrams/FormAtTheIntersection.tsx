import { fs } from "./fig";

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
    { k: "within Morphaithēr", from: [cx, 24], sub: "condition" },
    { k: "fed by the Sap", from: [56, 62], sub: "nourishment" },
    { k: "through a Hydrology", from: [344, 62], sub: "circulation" },
    { k: "using the Ossuary's|architectures", from: [56, 266], sub: "inheritance" },
    { k: "in a world|the Crypt conditioned", from: [344, 266], sub: "memory" },
  ];
  const OUT = ["receives", "contains", "differentiates", "transmits", "transforms", "releases"];
  return (
    <div className="aoh-fig mx-auto w-full max-w-[440px]">
      <svg viewBox="0 0 400 320" className="h-auto w-full" role="img" aria-labelledby="aoh-fi-t">
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
              {l.k.split("|").map((line, j, all) => (
                <text key={line} x={x} y={y - 8 - (all.length - 1 - j) * 11} textAnchor={anchor} className="font-serif" style={fs(9.5)} fill="currentColor" fillOpacity={0.85}>{line}</text>
              ))}
              <text x={x} y={y + 14} textAnchor={anchor} className="font-label uppercase" style={{ ...fs(6.4), letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.45}>{l.sub}</text>
            </g>
          );
        })}
        {/* the vessel: open above and below */}
        <path d={`M ${cx - 30} ${cy - 34} L ${cx - 26} ${cy + 26} Q ${cx} ${cy + 40} ${cx + 26} ${cy + 26} L ${cx + 30} ${cy - 34}`} fill="none" stroke="currentColor" strokeOpacity={0.9} strokeWidth={1.2} />
        <text x={cx} y={cy + 4} textAnchor="middle" className="font-serif italic" style={fs(13)} fill="var(--gold, #c9a227)">Form</text>
        {/* what it does */}
        {OUT.map((o, i) => {
          // six marks fan out beneath the open bottom; the verbs are set in two lines below them,
          // where they can be read at any width
          const x1 = cx + (i - 2.5) * 10;
          const y1 = cy + 44;
          const y2 = cy + 56 + Math.abs(i - 2.5) * 3;
          return <line key={o} x1={x1} y1={y1} x2={x1 + (i - 2.5) * 5} y2={y2} stroke="var(--gold, #c9a227)" strokeOpacity={0.6} strokeWidth={0.8} />;
        })}
        {[OUT.slice(0, 3), OUT.slice(3)].map((row, r) => (
          <text key={r} x={cx} y={cy + 68 + r * 11} textAnchor="middle" className="font-label uppercase" style={{ ...fs(6.2), letterSpacing: "0.14em" }} fill="currentColor" fillOpacity={0.6}>
            {row.join(" · ")}
          </text>
        ))}
        <text x={cx} y={312} textAnchor="middle" className="font-label uppercase" style={{ ...fs(7), letterSpacing: "0.2em" }} fill="var(--gold, #c9a227)" fillOpacity={0.7}>
          a temporary architecture of participation
        </text>
      </svg>
    </div>
  );
}
