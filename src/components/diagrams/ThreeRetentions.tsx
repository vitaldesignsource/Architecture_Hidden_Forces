import { fs } from "./fig";

/**
 * ThreeRetentions — the Ossuary, the Crypt and the Aquifer, kept three.
 *
 * Left: an arch with one stone lifted out of it — architecture retained,
 * available. Middle: the same arch's footprint pressed into layered ground,
 * the strata bent around it — consequence retained, not available for
 * anything. Right: beneath a waterline, the arch's stones softened and
 * carried in a dark current — impulse retained, still moving. The Crypt
 * contains; the Ossuary preserves; the Aquifer carries.
 */
export function ThreeRetentions() {
  const G = "var(--gold, #c9a227)";
  const cap = { ...fs(7), letterSpacing: "0.18em" };
  return (
    <div className="aoh-fig mx-auto grid w-full max-w-[720px] gap-6 sm:grid-cols-3 sm:gap-4">
      <style>{`
        .aoh-tr-flow { stroke-dasharray: 4 7; animation: aoh-tr-run 4.5s linear infinite; }
        @keyframes aoh-tr-run { to { stroke-dashoffset: -22 } }
        @media (prefers-reduced-motion: reduce) { .aoh-tr-flow { animation: none } }
      `}</style>
      <svg viewBox="0 0 220 150" className="h-auto w-full" role="img" aria-labelledby="aoh-tr1">
        <title id="aoh-tr1">An arch with one voussoir lifted free of it: a pattern that can be taken and reused.</title>
        <path d="M 40 130 L 40 80 A 70 70 0 0 1 180 80 L 180 130" fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.1} />
        <path d="M 60 130 L 60 82 A 50 50 0 0 1 160 82 L 160 130" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.8} />
        {[-40, -25, -10, 5, 20, 35].map((a) => {
          const r1 = 50, r2 = 70, cx = 110, cy = 82;
          const t = ((a - 90) * Math.PI) / 180;
          return <line key={a} x1={cx + r1 * Math.cos(t)} y1={cy + r1 * Math.sin(t)} x2={cx + r2 * Math.cos(t)} y2={cy + r2 * Math.sin(t)} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.6} />;
        })}
        <path d="M 100 12 L 120 12 L 116 30 L 104 30 Z" fill="none" stroke={G} strokeWidth={1} />
        <path d="M 104 32 L 116 32" stroke={G} strokeOpacity={0.4} strokeWidth={0.6} strokeDasharray="2 2" />
        <text x={110} y={146} textAnchor="middle" className="font-label uppercase" style={cap} fill={G} fillOpacity={0.85}>architecture retained</text>
      </svg>
      <svg viewBox="0 0 220 150" className="h-auto w-full" role="img" aria-labelledby="aoh-tr2">
        <title id="aoh-tr2">The footprint of the same arch pressed into layered ground, the strata bent around where it stood.</title>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M 10 ${60 + i * 20} C 60 ${60 + i * 20}, 70 ${76 + i * 18}, 110 ${76 + i * 18} C 150 ${76 + i * 18}, 160 ${60 + i * 20}, 210 ${60 + i * 20}`} fill="none" stroke="currentColor" strokeOpacity={0.25 + i * 0.12} strokeWidth={0.8} />
        ))}
        <path d="M 70 130 L 70 118 M 150 130 L 150 118" stroke={G} strokeOpacity={0.7} strokeWidth={1} />
        <path d="M 70 118 L 150 118" stroke={G} strokeOpacity={0.35} strokeWidth={0.6} strokeDasharray="2 3" />
        <text x={110} y={146} textAnchor="middle" className="font-label uppercase" style={cap} fill={G} fillOpacity={0.85}>consequence retained</text>
      </svg>
      <svg viewBox="0 0 220 150" className="h-auto w-full" role="img" aria-labelledby="aoh-tr3">
        <title id="aoh-tr3">Beneath a waterline, the arch's stones softened and carried along in a dark current.</title>
        <line x1={10} y1={44} x2={210} y2={44} stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.7} strokeDasharray="3 4" />
        <rect x={10} y={44} width={200} height={86} fill="currentColor" fillOpacity={0.06} />
        <path d="M 10 96 C 50 80, 80 116, 120 98 S 190 84, 210 96" fill="none" stroke={G} strokeOpacity={0.7} strokeWidth={1.1} className="aoh-tr-flow" />
        <path d="M 10 110 C 60 100, 90 122, 140 108 S 190 100, 210 110" fill="none" stroke={G} strokeOpacity={0.3} strokeWidth={0.8} className="aoh-tr-flow" />
        <g fill="none" stroke="currentColor" strokeOpacity={0.55} strokeWidth={0.7} strokeLinejoin="round">
          <path d="M 48 84 l 12 -3 l 3 11 l -12 4 z" transform="rotate(-14 54 90)" />
          <path d="M 104 104 l 11 -2 l 2 10 l -10 3 z" transform="rotate(22 110 109)" />
          <path d="M 160 88 l 10 -3 l 3 9 l -10 4 z" transform="rotate(-30 166 93)" />
        </g>
        <text x={110} y={146} textAnchor="middle" className="font-label uppercase" style={cap} fill={G} fillOpacity={0.85}>impulse retained</text>
      </svg>
    </div>
  );
}
