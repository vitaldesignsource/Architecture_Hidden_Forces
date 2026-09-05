import { fs } from "./fig";

/**
 * ErosionSeries — the same flow, four times, and what the ground becomes.
 *
 * Four cross-sections, read left to right: the current is drawn the same
 * width in each, and the ground beneath it deepens from a wet trace to a
 * canyon. The water in the last frame is no different from the water in the
 * first. The landscape is — and it now decides where the next water goes. A
 * canyon is the memory of water written into stone; the figure is that
 * sentence. Each frame is its own drawing so that on a narrow screen the
 * four fall into two rows instead of shrinking past reading.
 */
const FRAMES = [
  { d: "M 0 60 L 100 60", label: "first passage", water: 58, title: "First passage: a wet trace on level ground." },
  { d: "M 0 60 L 38 60 Q 50 70 62 60 L 100 60", label: "a channel", water: 63, title: "A channel: the ground begins to give beneath the current." },
  { d: "M 0 60 L 34 60 Q 42 86 50 86 Q 58 86 66 60 L 100 60", label: "a valley", water: 82, title: "A valley: the same current, a deepened ground." },
  { d: "M 0 60 L 36 60 L 40 108 Q 50 112 60 108 L 64 60 L 100 60", label: "a canyon", water: 105, title: "A canyon: the ground records every passage; the water is unchanged." },
];

export function ErosionSeries() {
  return (
    <div className="mx-auto w-full max-w-[600px]">
      <style>{`
        .aoh-er-w { stroke-dasharray: 3 5; animation: aoh-er-run 2.8s linear infinite; }
        @keyframes aoh-er-run { to { stroke-dashoffset: -16 } }
        @media (prefers-reduced-motion: reduce) { .aoh-er-w { animation: none } }
      `}</style>
      <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 sm:gap-x-3">
        {FRAMES.map((f, i) => (
          <svg key={f.label} viewBox="0 45 100 105" className="h-auto w-full" role="img" aria-labelledby={`aoh-er-t${i}`}>
            <title id={`aoh-er-t${i}`}>{f.title}</title>
            {/* the ground */}
            <path d={`${f.d} L 100 130 L 0 130 Z`} fill="currentColor" fillOpacity={0.08} />
            <path d={f.d} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1} />
            {/* the strata, following the profile faintly */}
            {[80, 96, 112].map((y) => (
              <line key={y} x1={0} y1={y} x2={100} y2={y} stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} />
            ))}
            {/* the water, the same each time */}
            <line x1={41} y1={f.water} x2={59} y2={f.water} stroke="var(--gold, #c9a227)" strokeWidth={2.2} strokeOpacity={0.9} strokeLinecap="round" className="aoh-er-w" />
            <text x={50} y={144} textAnchor="middle" className="font-mono uppercase" style={{ ...fs(6.8), letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.55}>
              {f.label}
            </text>
          </svg>
        ))}
      </div>
    </div>
  );
}
