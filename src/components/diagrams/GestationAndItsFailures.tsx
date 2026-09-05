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
 * depths so that their captions keep clear of each other.
 *
 * On a phone the same line is drawn a second way, top to bottom, because
 * six labelled stages cannot stand in a row across a phone at any size
 * that can be read. The tall drawing letters itself in plain units and
 * shows only below the sm breakpoint; the wide one only above it.
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
      <svg viewBox="0 0 600 212" className="hidden h-auto w-full sm:block" role="img" aria-labelledby="aoh-gf-t">
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
              <text x={x} y={Y - 12} textAnchor="middle" className="font-label uppercase" style={{ ...fs(5), letterSpacing: "0.12em" }} fill="currentColor" fillOpacity={0.45}>{sub}</text>
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
              <text x={x + 6} y={yEnd + 26} textAnchor="middle" className="font-label uppercase" style={{ ...fs(5), letterSpacing: "0.12em" }} fill={i === 4 ? G : "currentColor"} fillOpacity={i === 4 ? 0.8 : 0.45}>{to}</text>
            </g>
          );
        })}
      </svg>
      <TallGestation G={G} />
    </div>
  );
}

/** The phone drawing: the same line, top to bottom, the exits stepping out to the right. */
function TallGestation({ G }: { G: string }) {
  const X = 120, Y0 = 44, STEP = 112;
  const ys = STAGES.map((_, i) => Y0 + i * STEP);
  const title = { fontSize: 12 };
  const cap = { fontSize: 7, letterSpacing: "0.12em" };
  const exit = { fontSize: 9 };
  return (
    <svg viewBox="0 0 360 640" className="h-auto w-full sm:hidden" role="img" aria-labelledby="aoh-gf-tv">
      <title id="aoh-gf-tv">
        The same line drawn top to bottom: confluence, aitherogenesis, aitherostasis, hierostasis, the four
        thresholds and birth, with an exit stepping out to the right between each pair of stages.
      </title>
      {/* two currents meeting from above */}
      <path d={`M 96 8 C 100 30, 112 40, ${X} ${Y0}`} fill="none" stroke={G} strokeOpacity={0.6} strokeWidth={0.9} className="aoh-gf-run" />
      <path d={`M 144 8 C 140 30, 128 40, ${X} ${Y0}`} fill="none" stroke={G} strokeOpacity={0.6} strokeWidth={0.9} className="aoh-gf-run" />
      {/* the main line */}
      <path d={`M ${X} ${Y0} L ${X} ${ys[5]}`} fill="none" stroke={G} strokeOpacity={0.75} strokeWidth={1.1} className="aoh-gf-run" />
      {STAGES.map(([k, sub], i) => {
        const y = ys[i];
        return (
          <g key={k}>
            {i === 0 && <circle cx={X} cy={y} r={3} fill={G} />}
            {i === 1 && <circle cx={X} cy={y} r={4} fill="none" stroke={G} strokeWidth={0.9} />}
            {i === 2 && <circle cx={X} cy={y} r={6} fill="none" stroke={G} strokeWidth={1} />}
            {i === 3 && <rect x={X - 9} y={y - 9} width={18} height={18} fill="none" stroke={G} strokeOpacity={0.6} strokeWidth={0.7} strokeDasharray="2 2" />}
            {i === 3 && <circle cx={X} cy={y} r={5} fill="none" stroke={G} strokeWidth={1} />}
            {i === 4 && [-9, -3, 3, 9].map((d) => <line key={d} x1={X - 9} y1={y + d} x2={X + 9} y2={y + d} stroke={G} strokeOpacity={0.8} strokeWidth={0.8} />)}
            {i === 5 && <path d={`M ${X - 12} ${y - 14} L ${X - 10} ${y + 12} Q ${X} ${y + 18} ${X + 10} ${y + 12} L ${X + 12} ${y - 14}`} fill="none" stroke="currentColor" strokeOpacity={0.9} strokeWidth={1.1} />}
            <text x={X + 22} y={y + 4} className="font-serif" style={title} fill="currentColor" fillOpacity={0.9}>{k}</text>
            <text x={X + 22} y={y + 17} className="font-label uppercase" style={cap} fill="currentColor" fillOpacity={0.45}>{sub}</text>
          </g>
        );
      })}
      {/* the exits, each stepping out between its stage and the next */}
      {EXITS.map(([k, to], i) => {
        const y = ys[i];
        const ex = X + 40, ey = y + 74;
        return (
          <g key={k}>
            <path d={`M ${X} ${y + 40} C ${X} ${y + 62}, ${ex - 4} ${y + 56}, ${ex} ${ey}`} fill="none" stroke="currentColor" strokeOpacity={i === 4 ? 0.7 : 0.35} strokeWidth={0.8} strokeDasharray="2 3" />
            {i === 4 ? (
              <line x1={ex - 8} y1={ey + 4} x2={ex + 8} y2={ey + 4} stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.2} />
            ) : (
              <circle cx={ex} cy={ey} r={2} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.7} />
            )}
            <text x={ex + 14} y={ey - 1} className="font-serif italic" style={exit} fill="currentColor" fillOpacity={0.65}>{k}</text>
            <text x={ex + 14} y={ey + 12} className="font-label uppercase" style={cap} fill={i === 4 ? G : "currentColor"} fillOpacity={i === 4 ? 0.8 : 0.45}>{to}</text>
          </g>
        );
      })}
    </svg>
  );
}
