import { fs } from "./fig";

/**
 * CaptiveLightProgression — the architecture serves the current; then the
 * current serves the architecture.
 *
 * Two frames. In the first the current runs through an open structure and
 * out the far side: the structure exists for the passage. In the second the
 * same structure has closed, and the current circles inside it, feeding the
 * walls. Nothing has been added to the drawing between the frames except a
 * line — which is the point. Captivity is one closure away from service.
 * The frames sit side by side where there is room and one above the other
 * where there is not, the arrow between them turning with the stack.
 */
export function CaptiveLightProgression() {
  const G = "var(--gold, #c9a227)";
  const cap = { ...fs(7.5), letterSpacing: "0.2em" };
  return (
    <div className="mx-auto w-full max-w-[600px]">
      <style>{`
        .aoh-cl-run { stroke-dasharray: 4 6; animation: aoh-cl-go 3s linear infinite; }
        .aoh-cl-loop { stroke-dasharray: 4 6; animation: aoh-cl-go 6s linear infinite; }
        @keyframes aoh-cl-go { to { stroke-dashoffset: -20 } }
        @media (prefers-reduced-motion: reduce) { .aoh-cl-run, .aoh-cl-loop { animation: none } }
      `}</style>
      <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        {/* frame one: service */}
        <svg viewBox="0 0 236 200" className="h-auto w-full" role="img" aria-labelledby="aoh-cl-t1">
          <title id="aoh-cl-t1">A current passing through an open architecture and on beyond it.</title>
          <g transform="translate(6 0)">
            <text x={110} y={22} textAnchor="middle" className="font-label uppercase" style={cap} fill={G} fillOpacity={0.8}>the architecture serves the current</text>
            <path d="M 60 50 L 60 150 M 160 50 L 160 150" fill="none" stroke="currentColor" strokeOpacity={0.8} strokeWidth={1.2} />
            <path d="M 60 50 L 160 50" fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.8} strokeDasharray="2 4" />
            <path d="M 0 100 L 60 100 L 160 100 L 218 100" fill="none" stroke={G} strokeWidth={1.6} strokeOpacity={0.9} className="aoh-cl-run" />
            <polygon points="216,95 226,100 216,105" fill={G} />
            <text x={110} y={176} textAnchor="middle" className="font-serif italic" style={fs(9.5)} fill="currentColor" fillOpacity={0.6}>what enters, leaves — changed, and onward</text>
          </g>
        </svg>
        {/* the step between */}
        <span aria-hidden="true" className="justify-self-center font-serif text-2xl leading-none text-gold/60 rotate-90 sm:rotate-0">→</span>
        {/* frame two: captivity */}
        <svg viewBox="0 0 236 200" className="h-auto w-full" role="img" aria-labelledby="aoh-cl-t2">
          <title id="aoh-cl-t2">The same architecture closed, with the current circling inside it and feeding the walls.</title>
          <g transform="translate(6 0)">
            <text x={110} y={22} textAnchor="middle" className="font-label uppercase" style={cap} fill={G} fillOpacity={0.8}>the current serves the architecture</text>
            <rect x={60} y={50} width={100} height={100} fill="none" stroke="currentColor" strokeOpacity={0.9} strokeWidth={1.4} />
            <path d="M 0 100 L 58 100" fill="none" stroke={G} strokeWidth={1.6} strokeOpacity={0.5} className="aoh-cl-run" />
            <path d="M 110 72 a 28 28 0 1 1 -0.1 0" fill="none" stroke={G} strokeWidth={1.4} strokeOpacity={0.85} className="aoh-cl-loop" />
            <line x1={160} y1={100} x2={175} y2={100} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.8} strokeDasharray="1.5 3" />
            <text x={110} y={176} textAnchor="middle" className="font-serif italic" style={fs(9.5)} fill="currentColor" fillOpacity={0.6}>what enters, stays — and feeds the walls</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
