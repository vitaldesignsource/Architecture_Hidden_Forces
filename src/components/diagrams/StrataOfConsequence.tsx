import { fs } from "./fig";

/**
 * StrataOfConsequence — traces beneath traces.
 *
 * Six layers of ground, and each layer's upper surface follows the shape of
 * the one beneath it: a fault in the lowest bed bends every bed above; a
 * buried channel becomes a sag the later strata inherit. Nothing in the top
 * layer is a copy of the bottom one, and nothing in it is free of the bottom
 * one. That is the Crypt: not a record of what happened, but the shape of the
 * present bent by it. The animated line is the present surface being laid
 * down — on a ground the past already shaped.
 */
export function StrataOfConsequence() {
  // a base profile with a fault and a buried channel; each layer inherits it, softened
  const base = (x: number) => {
    const fault = x > 190 ? 14 : 0;
    const channel = Math.exp(-((x - 110) ** 2) / 900) * 22;
    return fault - channel;
  };
  const N = 6;
  const layer = (i: number) => {
    const soften = 1 - i * 0.13;
    const pts: string[] = [];
    for (let x = 0; x <= 440; x += 8) {
      const y = 210 - i * 28 + base(x) * soften;
      pts.push(`${x} ${y.toFixed(1)}`);
    }
    return pts;
  };
  const tops = Array.from({ length: N }, (_, i) => layer(i));
  return (
    <div className="aoh-fig mx-auto w-full max-w-[520px]">
      <style>{`
        .aoh-st-now { stroke-dasharray: 500; stroke-dashoffset: 500; animation: aoh-st-lay 6s ease-out infinite; }
        @keyframes aoh-st-lay { 0% { stroke-dashoffset: 500 } 70% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: 0 } }
        @media (prefers-reduced-motion: reduce) { .aoh-st-now { animation: none; stroke-dashoffset: 0 } }
      `}</style>
      <svg viewBox="0 0 440 240" className="h-auto w-full" role="img" aria-labelledby="aoh-st-t">
        <title id="aoh-st-t">
          Six strata in section; a fault and a buried channel in the lowest bend every layer above them,
          more faintly with each, and the present surface being laid on the shape they left.
        </title>
        {tops.map((pts, i) => (
          <path key={i} d={`M ${pts.join(" L ")}`} fill="none" stroke="currentColor"
                strokeOpacity={i === N - 1 ? 0 : 0.28 + i * 0.06} strokeWidth={0.8} />
        ))}
        {/* the fault, and the channel, marked in the lowest bed */}
        <line x1={190} y1={224} x2={190} y2={186} stroke="var(--gold, #c9a227)" strokeOpacity={0.6} strokeWidth={0.8} strokeDasharray="2 3" />
        <text x={196} y={228} className="font-label uppercase" style={{ ...fs(6.4), letterSpacing: "0.14em" }} fill="var(--gold, #c9a227)" fillOpacity={0.7}>what occurred</text>
        <ellipse cx={110} cy={196} rx={18} ry={5} fill="var(--gold, #c9a227)" fillOpacity={0.14} stroke="var(--gold, #c9a227)" strokeOpacity={0.5} strokeWidth={0.6} />
        <text x={110} y={230} textAnchor="middle" className="font-label uppercase" style={{ ...fs(6.4), letterSpacing: "0.14em" }} fill="var(--gold, #c9a227)" fillOpacity={0.7}>what was there</text>
        {/* the present surface, laid on the inherited shape */}
        <path d={`M ${tops[N - 1].join(" L ")}`} fill="none" stroke="var(--gold, #c9a227)" strokeOpacity={0.95} strokeWidth={1.4} className="aoh-st-now" />
        <text x={432} y={52} textAnchor="end" className="font-label uppercase" style={{ ...fs(6.8), letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.55}>the present</text>
        <text x={432} y={214} textAnchor="end" className="font-label uppercase" style={{ ...fs(6.8), letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.35}>the past</text>
      </svg>
    </div>
  );
}
