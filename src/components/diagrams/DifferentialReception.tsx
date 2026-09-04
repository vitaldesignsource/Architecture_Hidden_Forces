/**
 * DifferentialReception — one force, three vessels, three manifestations.
 *
 * The station's essential principle drawn as plainly as it can be: the same
 * descending line enters three receivers that differ in their condition — one
 * open and coherent, one saturated, one resistant — and what emerges beneath
 * each is not the same. The force is drawn identical on purpose. Everything
 * that differs is on the receiving side, which is the claim.
 */
export function DifferentialReception() {
  const V = [
    { x: 70, k: "open", note: "a clear, coherent form", out: [[-10, 20], [0, 26], [10, 20]] },
    { x: 200, k: "saturated", note: "overflow, and little taken up", out: [[-24, 8], [-14, 16], [14, 16], [24, 8]] },
    { x: 330, k: "resistant", note: "a faint, deflected trace", out: [[6, 10]] },
  ];
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <svg viewBox="0 0 400 250" className="h-auto w-full" role="img" aria-labelledby="aoh-dr-t">
        <title id="aoh-dr-t">
          One identical force descends into three vessels — open, saturated, resistant — and three
          different manifestations emerge beneath them.
        </title>
        <text x={200} y={22} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7.5, letterSpacing: "0.2em" }} fill="var(--gold, #c9a227)" fillOpacity={0.8}>
          one force
        </text>
        <line x1={40} y1={34} x2={360} y2={34} stroke="var(--gold, #c9a227)" strokeOpacity={0.5} strokeWidth={0.8} />
        {V.map((v) => (
          <g key={v.k}>
            {/* the descent, identical each time */}
            <line x1={v.x} y1={34} x2={v.x} y2={96} stroke="var(--gold, #c9a227)" strokeWidth={1.1} strokeOpacity={0.85} />
            <polygon points={`${v.x - 3},92 ${v.x + 3},92 ${v.x},99`} fill="var(--gold, #c9a227)" fillOpacity={0.85} />
            {/* the vessel, differing */}
            {v.k === "open" && (
              <path d={`M ${v.x - 28} 104 L ${v.x - 24} 150 Q ${v.x} 160 ${v.x + 24} 150 L ${v.x + 28} 104`} fill="none" stroke="currentColor" strokeOpacity={0.8} strokeWidth={1} />
            )}
            {v.k === "saturated" && (
              <>
                <path d={`M ${v.x - 28} 104 L ${v.x - 24} 150 Q ${v.x} 160 ${v.x + 24} 150 L ${v.x + 28} 104`} fill="var(--gold, #c9a227)" fillOpacity={0.18} stroke="currentColor" strokeOpacity={0.8} strokeWidth={1} />
                <path d={`M ${v.x - 30} 104 Q ${v.x - 40} 100 ${v.x - 44} 110`} fill="none" stroke="var(--gold, #c9a227)" strokeOpacity={0.6} strokeWidth={0.8} />
                <path d={`M ${v.x + 30} 104 Q ${v.x + 40} 100 ${v.x + 44} 110`} fill="none" stroke="var(--gold, #c9a227)" strokeOpacity={0.6} strokeWidth={0.8} />
              </>
            )}
            {v.k === "resistant" && (
              <>
                <path d={`M ${v.x - 28} 104 L ${v.x - 24} 150 Q ${v.x} 160 ${v.x + 24} 150 L ${v.x + 28} 104`} fill="none" stroke="currentColor" strokeOpacity={0.8} strokeWidth={1} />
                <line x1={v.x - 22} y1={108} x2={v.x + 22} y2={108} stroke="currentColor" strokeOpacity={0.9} strokeWidth={1.6} />
                <line x1={v.x - 22} y1={113} x2={v.x + 22} y2={113} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
              </>
            )}
            <text x={v.x} y={178} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7.5, letterSpacing: "0.18em" }} fill="currentColor" fillOpacity={0.6}>
              {v.k}
            </text>
            {/* what emerges */}
            {v.out.map(([dx, len], i) => (
              <line key={i} x1={v.x + dx} y1={188} x2={v.x + dx * 1.4} y2={188 + len} stroke="var(--gold, #c9a227)" strokeOpacity={v.k === "resistant" ? 0.35 : 0.8} strokeWidth={v.k === "resistant" ? 0.7 : 1} strokeLinecap="round" />
            ))}
            <text x={v.x} y={238} textAnchor="middle" className="font-serif" style={{ fontSize: 9.5 }} fill="currentColor" fillOpacity={0.75}>
              {v.note}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
