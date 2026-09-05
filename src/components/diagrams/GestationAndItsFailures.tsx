import { fs } from "./fig";

/**
 * GestationAndItsFailures — the way from confluence to birth, and the exits.
 *
 * A single line runs left to right: two currents meet (confluence), a knot
 * forms (aitherogenesis), the knot holds (aitherostasis), the held pattern
 * is set in an enclosure (hierostasis), it passes the four thresholds of
 * the ethers — ignites, is distinguished, relates, integrates — and is
 * born as a vessel. Beneath the line, at each stage, the way a gestation
 * can end instead: resorbed into Morphaithēr, returned to the Aquifer, a
 * bone to the Ossuary, a consequence to the Crypt, or a scar. Not every
 * failure is a tragedy. The last one is. The exits fall to alternating
 * depths so that their captions, which grow on a phone, keep clear of each
 * other.
 */
const STAGES: [string, string][] = [
  ["confluence", "currents meet"],
  ["aitherogenesis", "a current forms"],
  ["aitherostasis", "it holds"],
  ["hierostasis", "it is placed"],
  ["the four thresholds", "warmth · light · tone · life"],
  ["birth", "a vessel"],
];
const EXITS: [string, string][] = [
  ["disperses", "resorbed into Morphaithēr"],
  ["does not hold", "returned to the Aquifer"],
  ["parts incompatible", "a bone to the Ossuary"],
  ["no integration", "a consequence to the Crypt"],
  ["refuses dissolution", "a scar · a hungry fragment"],
];

export function GestationAndItsFailures() {
  const G = "var(--gold, #c9a227)";
  const X0 = 40, X1 = 560, Y = 70;
  const xs = STAGES.map((_, i) => X0 + (i * (X1 - X0)) / (STAGES.length - 1));
  return (
    <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[760px]">
      <style>{`
        .aoh-gf-run { stroke-dasharray: 4 7; animation: aoh-gf-go 5s linear infinite; }
        @keyframes aoh-gf-go { to { stroke-dashoffset: -22 } }
        @media (prefers-reduced-motion: reduce) { .aoh-gf-run { animation: none } }
      `}</style>
      <svg viewBox="0 0 600 212" className="h-auto w-full" role="img" aria-labelledby="aoh-gf-t">
        <title id="aoh-gf-t">
          A line from confluence through aitherogenesis, aitherostasis, hierostasis and the four thresholds to
          birth, with a descending exit at each stage: dispersal, failure to hold, incompatible parts, no
          integration, and a refusal to dissolve.
        </title>
        {/* two currents meeting */}
        <path d={`M 4 ${Y - 9} C 20 ${Y - 9}, 28 ${Y}, ${X0} ${Y}`} fill="none" stroke={G} strokeOpacity={0.6} strokeWidth={0.9} className="aoh-gf-run" />
        <path d={`M 4 ${Y + 9} C 20 ${Y + 9}, 28 ${Y}, ${X0} ${Y}`} fill="none" stroke={G} strokeOpacity={0.6} strokeWidth={0.9} className="aoh-gf-run" />
        {/* the main line */}
        <path d={`M ${X0} ${Y} L ${X1} ${Y}`} fill="none" stroke={G} strokeOpacity={0.75} strokeWidth={1.1} className="aoh-gf-run" />
        {STAGES.map(([k, sub], i) => {
          const x = xs[i];
          return (
            <g key={k}>
              {i === 1 && <circle cx={x} cy={Y} r={4} fill="none" stroke={G} strokeWidth={0.9} />}
              {i === 2 && <circle cx={x} cy={Y} r={6} fill="none" stroke={G} strokeWidth={1} />}
              {i === 3 && <rect x={x - 9} y={Y - 9} width={18} height={18} fill="none" stroke={G} strokeOpacity={0.6} strokeWidth={0.7} strokeDasharray="2 2" />}
              {i === 3 && <circle cx={x} cy={Y} r={5} fill="none" stroke={G} strokeWidth={1} />}
              {i === 4 && [-9, -3, 3, 9].map((d) => <line key={d} x1={x + d} y1={Y - 8} x2={x + d} y2={Y + 8} stroke={G} strokeOpacity={0.8} strokeWidth={0.8} />)}
              {i === 5 && <path d={`M ${x - 12} ${Y - 6} L ${x - 10} ${Y + 16} Q ${x} ${Y + 22} ${x + 10} ${Y + 16} L ${x + 12} ${Y - 6}`} fill="none" stroke="currentColor" strokeOpacity={0.9} strokeWidth={1.1} />}
              {i === 0 && <circle cx={x} cy={Y} r={3} fill={G} />}
              <text x={x} y={Y - 22} textAnchor="middle" className="font-serif" style={fs(9)} fill="currentColor" fillOpacity={0.9}>{k}</text>
              <text x={x} y={Y - 12} textAnchor="middle" className="font-mono uppercase" style={{ ...fs(5), letterSpacing: "0.12em" }} fill="currentColor" fillOpacity={0.45}>{sub}</text>
            </g>
          );
        })}
        {/* the exits */}
        {EXITS.map(([k, to], i) => {
          const x = xs[i] + (xs[i + 1] - xs[i]) / 2;
          // alternating depths: on a phone the captions grow, and neighbours
          // on one row would run into each other
          const yEnd = i % 2 ? 176 : 138;
          return (
            <g key={k}>
              <path d={`M ${x} ${Y} C ${x} ${Y + 30}, ${x + 6} ${yEnd - 24}, ${x + 6} ${yEnd}`} fill="none" stroke="currentColor" strokeOpacity={i === 4 ? 0.7 : 0.35} strokeWidth={0.8} strokeDasharray="2 3" />
              {i === 4 ? (
                <line x1={x - 2} y1={yEnd + 4} x2={x + 14} y2={yEnd + 4} stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.2} />
              ) : (
                <circle cx={x + 6} cy={yEnd} r={2} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.7} />
              )}
              <text x={x + 6} y={yEnd + 16} textAnchor="middle" className="font-serif italic" style={fs(8)} fill="currentColor" fillOpacity={0.65}>{k}</text>
              <text x={x + 6} y={yEnd + 26} textAnchor="middle" className="font-mono uppercase" style={{ ...fs(5), letterSpacing: "0.12em" }} fill={i === 4 ? G : "currentColor"} fillOpacity={i === 4 ? 0.8 : 0.45}>{to}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
