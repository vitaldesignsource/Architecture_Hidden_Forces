import { fs } from "./fig";

/**
 * FormToTendency — what the black water keeps.
 *
 * Three frames, left to right. A vessel with a current held in it. The same
 * vessel with its outline in pieces, sinking — a morphorelic. Then no
 * outline at all: dark water, and a current that still bends to the shape
 * the vessel gave it. The Aquifer does not remember the picture. It
 * remembers how the force moved, and the third frame holds the most of the
 * three.
 */
export function FormToTendency() {
  const G = "var(--gold, #c9a227)";
  const vessel = "M 44 30 L 48 100 Q 70 112 92 100 L 96 30";
  const frames = [
    { label: "a form", sub: "the current, held", title: "A vessel holding a current." },
    { label: "a morphorelic", sub: "the outline, in pieces", title: "The same vessel with its outline broken into pieces and sinking." },
    { label: "a tendency", sub: "the movement, kept", title: "No outline: dark water, and a current still bent to the shape the vessel gave it." },
  ];
  return (
    <div className="aoh-fig mx-auto w-full max-w-[600px]">
      <style>{`
        .aoh-ft-run { stroke-dasharray: 4 6; animation: aoh-ft-go 3.2s linear infinite; }
        @keyframes aoh-ft-go { to { stroke-dashoffset: -20 } }
        @media (prefers-reduced-motion: reduce) { .aoh-ft-run { animation: none } }
      `}</style>
      <div className="grid grid-cols-3 gap-x-3">
        {frames.map((f, i) => (
          <svg key={f.label} viewBox="0 0 140 170" className="h-auto w-full" role="img" aria-labelledby={`aoh-ft-t${i}`}>
            <title id={`aoh-ft-t${i}`}>{f.title}</title>
            {i === 2 && <rect x={0} y={54} width={140} height={78} fill="currentColor" fillOpacity={0.06} />}
            {i === 2 && <line x1={0} y1={54} x2={140} y2={54} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.6} strokeDasharray="2 4" />}
            {i === 0 && <path d={vessel} fill="none" stroke="currentColor" strokeOpacity={0.85} strokeWidth={1.1} />}
            {i === 1 && (
              <g transform="translate(0 12)">
                <path d={vessel} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1} strokeDasharray="12 9" />
                <path d="M 40 118 L 46 124 M 100 116 L 94 123" stroke="currentColor" strokeOpacity={0.3} strokeWidth={0.7} />
              </g>
            )}
            {i === 0 && <path d="M 70 10 L 70 124" fill="none" stroke={G} strokeWidth={1.4} strokeOpacity={0.9} className="aoh-ft-run" />}
            {i === 1 && <path d="M 70 10 L 70 60 C 70 96, 62 110, 58 132" fill="none" stroke={G} strokeWidth={1.2} strokeOpacity={0.75} className="aoh-ft-run" />}
            {i === 2 && <path d="M 48 40 L 48 100 Q 70 112 92 100 L 92 40" fill="none" stroke={G} strokeWidth={1.3} strokeOpacity={0.8} className="aoh-ft-run" />}
            <text x={70} y={150} textAnchor="middle" className="font-serif" style={fs(9.5)} fill="currentColor" fillOpacity={0.85}>{f.label}</text>
            <text x={70} y={162} textAnchor="middle" className="font-label uppercase" style={{ ...fs(5.8), letterSpacing: "0.14em" }} fill="currentColor" fillOpacity={0.45}>{f.sub}</text>
          </svg>
        ))}
      </div>
    </div>
  );
}
