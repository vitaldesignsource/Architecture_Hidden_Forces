import { fs } from "./fig";

/**
 * SeaBetweenCauses — what lies between a cause and its effect.
 *
 * Currents enter from the left — intention, memory, vitality, image,
 * inheritance, choice — and cross three media drawn as bands, astral,
 * etheric and material, each of which bends what passes through it. Two
 * meet at a confluence; one is caught in an eddy and turns; sediment lies
 * along the floor; and at the right they arrive together at one shore,
 * which is the effect. The nearest cause to an outcome is only the gate
 * through which the older ones emerged.
 */
const CURRENTS = ["intention", "memory", "vitality", "image", "inheritance", "choice"];

export function SeaBetweenCauses() {
  const G = "var(--gold, #c9a227)";
  const lbl = { ...fs(6), letterSpacing: "0.14em" };
  const paths = [
    "M 74 40 C 160 50, 220 70, 300 96 C 360 116, 420 128, 470 140",
    "M 74 70 C 150 80, 230 90, 300 96 C 360 100, 420 122, 470 140",
    "M 74 100 C 140 100, 210 118, 260 124 C 300 128, 380 136, 470 140",
    "M 74 130 C 140 132, 200 150, 240 160 C 280 170, 400 150, 470 140",
    "M 74 160 C 130 168, 190 200, 240 212 C 300 226, 400 170, 470 140",
    "M 74 190 C 130 194, 180 232, 230 240 C 290 250, 410 176, 470 140",
  ];
  return (
    <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[760px]">
      <style>{`
        .aoh-sb-run { stroke-dasharray: 4 7; animation: aoh-sb-go 6s linear infinite; }
        .aoh-sb-eddy { stroke-dasharray: 3 5; animation: aoh-sb-go 4s linear infinite; }
        @keyframes aoh-sb-go { to { stroke-dashoffset: -22 } }
        @media (prefers-reduced-motion: reduce) { .aoh-sb-run, .aoh-sb-eddy { animation: none } }
      `}</style>
      <svg viewBox="0 0 560 280" className="h-auto w-full" role="img" aria-labelledby="aoh-sb-t">
        <title id="aoh-sb-t">
          Six currents entering from the left, labelled intention, memory, vitality, image, inheritance and
          choice, crossing three bands labelled astral, etheric and material, meeting at a confluence, one
          turning in an eddy, sediment along the floor, and all arriving at one shore on the right labelled
          the effect.
        </title>
        {/* the media */}
        {[["astral", 26, 70], ["etheric", 96, 70], ["material", 166, 92]].map(([k, y, h], i) => (
          <g key={k as string}>
            <rect x={100} y={y as number} width={380} height={h as number} fill="currentColor" fillOpacity={0.03 + i * 0.02} />
            <line x1={100} y1={y as number} x2={480} y2={y as number} stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.6} strokeDasharray="2 4" />
            <text x={484} y={(y as number) + 10} className="font-mono uppercase" style={lbl} fill="currentColor" fillOpacity={0.45}>{k as string}</text>
          </g>
        ))}
        <text x={484} y={268} className="font-mono uppercase" style={lbl} fill="currentColor" fillOpacity={0.35}>sediment</text>
        {/* the sediment */}
        {[254, 260, 266].map((y, i) => (
          <path key={y} d={`M 100 ${y} C 180 ${y - 3}, 260 ${y + 3}, 340 ${y} S 460 ${y - 2}, 480 ${y}`} fill="none" stroke="currentColor" strokeOpacity={0.14 + i * 0.05} strokeWidth={0.6} />
        ))}
        {/* the currents */}
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={G} strokeOpacity={0.55 + (i % 2) * 0.15} strokeWidth={0.9} className="aoh-sb-run" />
        ))}
        {CURRENTS.map((c, i) => (
          <text key={c} x={68} y={44 + i * 30} textAnchor="end" className="font-serif" style={fs(9)} fill="currentColor" fillOpacity={0.85}>{c}</text>
        ))}
        {/* the confluence */}
        <circle cx={300} cy={96} r={3.2} fill={G} />
        <text x={300} y={86} textAnchor="middle" className="font-mono uppercase" style={lbl} fill={G} fillOpacity={0.8}>confluence</text>
        {/* the eddy */}
        <path d="M 236 204 a 14 14 0 1 1 0.1 0" fill="none" stroke={G} strokeOpacity={0.6} strokeWidth={0.8} className="aoh-sb-eddy" />
        <text x={236} y={236} textAnchor="middle" className="font-mono uppercase" style={lbl} fill={G} fillOpacity={0.7}>eddy</text>
        {/* the vestigium left along the floor */}
        <path d="M 300 96 C 300 150, 330 220, 360 252" fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.6} strokeDasharray="1.5 3" />
        {/* the shore */}
        <path d="M 472 20 C 486 100, 486 180, 472 262" fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.1} />
        <circle cx={470} cy={140} r={4} fill="var(--bone, #f0ead8)" />
        <text x={500} y={143} className="font-serif" style={fs(10.5)} fill="currentColor" fillOpacity={0.9}>the effect</text>
        <text x={500} y={155} className="font-mono uppercase" style={{ ...fs(5.4), letterSpacing: "0.12em" }} fill="currentColor" fillOpacity={0.45}>an estuary</text>
      </svg>
    </div>
  );
}
