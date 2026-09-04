/**
 * CaptiveLightProgression — the architecture serves the current; then the
 * current serves the architecture.
 *
 * Two frames. In the first the current runs through an open structure and
 * out the far side: the structure exists for the passage. In the second the
 * same structure has closed, and the current circles inside it, feeding the
 * walls. Nothing has been added to the drawing between the frames except a
 * line — which is the point. Captivity is one closure away from service.
 */
export function CaptiveLightProgression() {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <style>{`
        .aoh-cl-run { stroke-dasharray: 4 6; animation: aoh-cl-go 3s linear infinite; }
        .aoh-cl-loop { stroke-dasharray: 4 6; animation: aoh-cl-go 6s linear infinite; }
        @keyframes aoh-cl-go { to { stroke-dashoffset: -20 } }
        @media (prefers-reduced-motion: reduce) { .aoh-cl-run, .aoh-cl-loop { animation: none } }
      `}</style>
      <svg viewBox="0 0 520 200" className="h-auto w-full" role="img" aria-labelledby="aoh-cl-t">
        <title id="aoh-cl-t">
          Two frames: a current passing through an open architecture and on; the same architecture closed,
          with the current circling inside it.
        </title>
        {/* frame one: service */}
        <g transform="translate(20 0)">
          <text x={110} y={22} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7.5, letterSpacing: "0.2em" }} fill="var(--gold, #c9a227)" fillOpacity={0.8}>the architecture serves the current</text>
          <path d="M 60 50 L 60 150 M 160 50 L 160 150" fill="none" stroke="currentColor" strokeOpacity={0.8} strokeWidth={1.2} />
          <path d="M 60 50 L 160 50" fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.8} strokeDasharray="2 4" />
          <path d="M 0 100 L 60 100 L 160 100 L 220 100" fill="none" stroke="var(--gold, #c9a227)" strokeWidth={1.6} strokeOpacity={0.9} className="aoh-cl-run" />
          <polygon points="220,95 230,100 220,105" fill="var(--gold, #c9a227)" />
          <text x={110} y={176} textAnchor="middle" className="font-serif italic" style={{ fontSize: 9.5 }} fill="currentColor" fillOpacity={0.6}>what enters, leaves — changed, and onward</text>
        </g>
        {/* the step between */}
        <text x={260} y={104} textAnchor="middle" className="font-serif" style={{ fontSize: 16 }} fill="var(--gold, #c9a227)" fillOpacity={0.6}>→</text>
        {/* frame two: captivity */}
        <g transform="translate(290 0)">
          <text x={110} y={22} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7.5, letterSpacing: "0.2em" }} fill="var(--gold, #c9a227)" fillOpacity={0.8}>the current serves the architecture</text>
          <rect x={60} y={50} width={100} height={100} fill="none" stroke="currentColor" strokeOpacity={0.9} strokeWidth={1.4} />
          <path d="M 0 100 L 58 100" fill="none" stroke="var(--gold, #c9a227)" strokeWidth={1.6} strokeOpacity={0.5} className="aoh-cl-run" />
          <path d="M 110 72 a 28 28 0 1 1 -0.1 0" fill="none" stroke="var(--gold, #c9a227)" strokeWidth={1.4} strokeOpacity={0.85} className="aoh-cl-loop" />
          <line x1={160} y1={100} x2={175} y2={100} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.8} strokeDasharray="1.5 3" />
          <text x={110} y={176} textAnchor="middle" className="font-serif italic" style={{ fontSize: 9.5 }} fill="currentColor" fillOpacity={0.6}>what enters, stays — and feeds the walls</text>
        </g>
      </svg>
    </div>
  );
}
