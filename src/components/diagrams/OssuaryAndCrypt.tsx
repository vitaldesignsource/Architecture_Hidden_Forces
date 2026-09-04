/**
 * OssuaryAndCrypt — the two retentions, told apart in two marks.
 *
 * Left: an arch with one stone lifted out of it, drawn as a thing that can
 * be taken — architecture retained, available. Right: the same arch's
 * footprint pressed into the ground, and the strata bent around it —
 * consequence retained, not available for anything, simply the case. The
 * Ossuary remembers a shape. The Crypt remembers that a shape stood here.
 */
export function OssuaryAndCrypt() {
  const G = "var(--gold, #c9a227)";
  return (
    <div className="mx-auto grid w-full max-w-[560px] gap-6 sm:grid-cols-2">
      <div>
        <svg viewBox="0 0 220 150" className="h-auto w-full" role="img" aria-labelledby="aoh-oc1">
          <title id="aoh-oc1">An arch with one voussoir lifted free of it: a pattern that can be taken and reused.</title>
          <path d="M 40 130 L 40 80 A 70 70 0 0 1 180 80 L 180 130" fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.1} />
          <path d="M 60 130 L 60 82 A 50 50 0 0 1 160 82 L 160 130" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.8} />
          {[-40, -25, -10, 5, 20, 35].map((a) => {
            const r1 = 50, r2 = 70, cx = 110, cy = 82;
            const t = ((a - 90) * Math.PI) / 180;
            return <line key={a} x1={cx + r1 * Math.cos(t)} y1={cy + r1 * Math.sin(t)} x2={cx + r2 * Math.cos(t)} y2={cy + r2 * Math.sin(t)} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.6} />;
          })}
          {/* the lifted keystone */}
          <path d="M 100 12 L 120 12 L 116 30 L 104 30 Z" fill="none" stroke={G} strokeWidth={1} />
          <path d="M 104 32 L 116 32" stroke={G} strokeOpacity={0.4} strokeWidth={0.6} strokeDasharray="2 2" />
          <text x={110} y={146} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7, letterSpacing: "0.18em" }} fill={G} fillOpacity={0.85}>architecture retained</text>
        </svg>
      </div>
      <div>
        <svg viewBox="0 0 220 150" className="h-auto w-full" role="img" aria-labelledby="aoh-oc2">
          <title id="aoh-oc2">The footprint of the same arch pressed into layered ground, the strata bent around where it stood.</title>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M 10 ${60 + i * 20} C 60 ${60 + i * 20}, 70 ${76 + i * 18}, 110 ${76 + i * 18} C 150 ${76 + i * 18}, 160 ${60 + i * 20}, 210 ${60 + i * 20}`} fill="none" stroke="currentColor" strokeOpacity={0.25 + i * 0.12} strokeWidth={0.8} />
          ))}
          {/* the footprint */}
          <path d="M 70 130 L 70 118 M 150 130 L 150 118" stroke={G} strokeOpacity={0.7} strokeWidth={1} />
          <path d="M 70 118 L 150 118" stroke={G} strokeOpacity={0.35} strokeWidth={0.6} strokeDasharray="2 3" />
          <text x={110} y={146} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7, letterSpacing: "0.18em" }} fill={G} fillOpacity={0.85}>consequence retained</text>
        </svg>
      </div>
    </div>
  );
}
