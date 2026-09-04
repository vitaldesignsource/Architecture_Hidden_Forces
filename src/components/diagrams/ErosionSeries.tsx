/**
 * ErosionSeries — the same flow, four times, and what the ground becomes.
 *
 * Four cross-sections, left to right: the current is drawn the same width in
 * each, and the ground beneath it deepens from a wet trace to a canyon. The
 * water in the last frame is no different from the water in the first. The
 * landscape is — and it now decides where the next water goes. A canyon is
 * the memory of water written into stone; the figure is that sentence.
 */
export function ErosionSeries() {
  const frames = [
    { d: "M 0 60 L 100 60", label: "first passage" },
    { d: "M 0 60 L 38 60 Q 50 70 62 60 L 100 60", label: "a channel" },
    { d: "M 0 60 L 34 60 Q 42 86 50 86 Q 58 86 66 60 L 100 60", label: "a valley" },
    { d: "M 0 60 L 36 60 L 40 108 Q 50 112 60 108 L 64 60 L 100 60", label: "a canyon" },
  ];
  const water = [
    { x: 50, y: 58 }, { x: 50, y: 63 }, { x: 50, y: 82 }, { x: 50, y: 105 },
  ];
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <style>{`
        .aoh-er-w { stroke-dasharray: 3 5; animation: aoh-er-run 2.8s linear infinite; }
        @keyframes aoh-er-run { to { stroke-dashoffset: -16 } }
        @media (prefers-reduced-motion: reduce) { .aoh-er-w { animation: none } }
      `}</style>
      <svg viewBox="0 0 460 150" className="h-auto w-full" role="img" aria-labelledby="aoh-er-t">
        <title id="aoh-er-t">
          Four cross-sections of ground under the same current, left to right: a wet trace, a channel, a
          valley, a canyon. The water is identical; the ground records it.
        </title>
        {frames.map((f, i) => {
          const ox = 8 + i * 114;
          return (
            <g key={i} transform={`translate(${ox} 0)`}>
              {/* the ground */}
              <path d={`${f.d} L 100 130 L 0 130 Z`} fill="currentColor" fillOpacity={0.08} />
              <path d={f.d} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1} />
              {/* the strata, following the profile faintly */}
              {[80, 96, 112].map((y) => (
                <line key={y} x1={0} y1={y} x2={100} y2={y} stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} />
              ))}
              {/* the water, the same each time */}
              <line x1={water[i].x - 9} y1={water[i].y} x2={water[i].x + 9} y2={water[i].y} stroke="var(--gold, #c9a227)" strokeWidth={2.2} strokeOpacity={0.9} strokeLinecap="round" className="aoh-er-w" />
              <text x={50} y={144} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 6.8, letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.55}>
                {f.label}
              </text>
              {i < 3 && <text x={108} y={64} className="font-mono" style={{ fontSize: 9 }} fill="var(--gold, #c9a227)" fillOpacity={0.5}>→</text>}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
