import { fs } from "./fig";

/**
 * BrokenCircuit — exchange, and hunger.
 *
 * Left, the lawful exchange: a ring of four — receives, transforms, gives,
 * returns — with the current running round it and out again, because what
 * a healthy form takes in it gives back changed. Right, the hungry form: an
 * intake that spirals inward and never comes out. Proodos without
 * epistrophē; a broken circuit wearing identity as a body. Two panels, so
 * that on a phone they stand one above the other at a size that can be read.
 */
export function BrokenCircuit() {
  const G = "var(--gold, #c9a227)";
  const cap = { ...fs(6.6), letterSpacing: "0.16em" };
  const sub = { ...fs(6.2), letterSpacing: "0.14em" };
  const steps = ["receives", "transforms", "gives", "returns"];
  const cx = 115, cy = 100, R = 46;
  const spiral = (() => {
    const pts: string[] = [];
    for (let i = 0; i <= 140; i++) {
      const t = (i / 140) * Math.PI * 5;
      const r = 50 - (i / 140) * 46;
      pts.push(`${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`);
    }
    return "M " + pts.join(" L ");
  })();
  return (
    <div className="aoh-fig mx-auto grid w-full max-w-[640px] grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-6">
      <style>{`
        .aoh-bc-run { stroke-dasharray: 4 6; animation: aoh-bc-go 4s linear infinite; }
        .aoh-bc-in { stroke-dasharray: 4 6; animation: aoh-bc-go 6s linear infinite; }
        @keyframes aoh-bc-go { to { stroke-dashoffset: -20 } }
        @media (prefers-reduced-motion: reduce) { .aoh-bc-run, .aoh-bc-in { animation: none } }
      `}</style>
      {/* the lawful exchange */}
      <svg viewBox="0 0 230 212" className="h-auto w-full" role="img" aria-labelledby="aoh-bk-t">
        <title id="aoh-bk-t">
          A ring of four stations — receives, transforms, gives, returns — with the current running round
          it and out again.
        </title>
        <path d={`M 20 ${cy} L ${cx - R - 4} ${cy}`} fill="none" stroke={G} strokeOpacity={0.7} strokeWidth={1.1} className="aoh-bc-run" />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={G} strokeOpacity={0.7} strokeWidth={1.1} className="aoh-bc-run" />
        <path d={`M ${cx + R + 4} ${cy} L 204 ${cy}`} fill="none" stroke={G} strokeOpacity={0.7} strokeWidth={1.1} className="aoh-bc-run" />
        <polygon points={`202,${cy - 4} 210,${cy} 202,${cy + 4}`} fill={G} fillOpacity={0.8} />
        {steps.map((s, i) => {
          // the four stations sit on the diagonals, so the current can enter and leave on the level
          const a = -Math.PI / 4 + (i / 4) * 2 * Math.PI;
          const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
          const lx = cx + (R + 10) * Math.cos(a), ly = cy + (R + 10) * Math.sin(a);
          return (
            <g key={s}>
              <circle cx={x} cy={y} r={3} fill={G} />
              <text x={lx} y={ly + (i < 2 ? 0 : 6)} textAnchor={i === 0 || i === 1 ? "start" : "end"} className="font-serif" style={fs(9)} fill="currentColor" fillOpacity={0.85}>{s}</text>
            </g>
          );
        })}
        <text x={cx} y={186} textAnchor="middle" className="font-label uppercase" style={cap} fill={G} fillOpacity={0.85}>the lawful exchange</text>
        <text x={cx} y={196} textAnchor="middle" className="font-label uppercase" style={sub} fill="currentColor" fillOpacity={0.45}>
          <tspan x={cx}>what it takes in,</tspan>
          <tspan x={cx} dy={8}>it gives back changed</tspan>
        </text>
      </svg>
      {/* the hungry form */}
      <svg viewBox="0 0 230 212" className="h-auto w-full" role="img" aria-labelledby="aoh-bk-t2">
        <title id="aoh-bk-t2">An intake spiralling inward to a centre and never coming out.</title>
        <path d={`M 20 ${cy} L ${cx - 52} ${cy}`} fill="none" stroke={G} strokeOpacity={0.7} strokeWidth={1.1} className="aoh-bc-in" />
        <path d={spiral} fill="none" stroke={G} strokeOpacity={0.75} strokeWidth={1} className="aoh-bc-in" />
        <circle cx={cx} cy={cy} r={5} fill="currentColor" fillOpacity={0.9} />
        <path d={`M ${cx + 56} ${cy} L 210 ${cy}`} fill="none" stroke="currentColor" strokeOpacity={0.15} strokeWidth={0.8} strokeDasharray="2 4" />
        <text x={cx} y={186} textAnchor="middle" className="font-label uppercase" style={cap} fill="currentColor" fillOpacity={0.8}>the hungry form</text>
        <text x={cx} y={196} textAnchor="middle" className="font-label uppercase" style={sub} fill="currentColor" fillOpacity={0.45}>
          <tspan x={cx}>proodos without epistrophē</tspan>
          <tspan x={cx} dy={8}>nothing returns</tspan>
        </text>
      </svg>
    </div>
  );
}
