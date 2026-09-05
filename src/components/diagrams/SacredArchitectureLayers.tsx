import { fs } from "./fig";

/**
 * SacredArchitectureLayers — a god is an architecture before it is a name.
 *
 * Left, inhabited: a source above, a mediating current descending from it,
 * a morphal body the current takes, the astral clothing around the body,
 * and the house — rite, temple, statue, offering, attention — that gives the
 * whole a place to stand. Right, withdrawn: the same house, the source
 * faint and the current gone up, the clothing and the body still there.
 * The god may have departed; the house remembers how it was inhabited.
 */
export function SacredArchitectureLayers() {
  const G = "var(--gold, #c9a227)";
  const lbl = { ...fs(6.4), letterSpacing: "0.16em" };
  const House = ({ x, gone }: { x: number; gone: boolean }) => (
    <g transform={`translate(${x} 0)`}>
      {/* source */}
      <circle cx={100} cy={22} r={gone ? 2 : 3.5} fill={G} fillOpacity={gone ? 0.25 : 0.95} />
      {[0, 60, 120].map((a) => (
        <line key={a} x1={100} y1={22} x2={100 + 7 * Math.cos((a * Math.PI) / 180)} y2={22 + 7 * Math.sin((a * Math.PI) / 180)} stroke={G} strokeOpacity={gone ? 0.15 : 0.6} strokeWidth={0.6} transform={`rotate(${a} 100 22)`} />
      ))}
      {/* the current */}
      {gone ? (
        <path d="M 100 52 L 100 34" fill="none" stroke={G} strokeOpacity={0.35} strokeWidth={0.9} strokeDasharray="2 3" />
      ) : (
        <path d="M 100 30 L 100 90" fill="none" stroke={G} strokeOpacity={0.85} strokeWidth={1.2} className="aoh-sa-run" />
      )}
      {gone && <polygon points="97,38 100,32 103,38" fill={G} fillOpacity={0.4} />}
      {/* the morphal body */}
      <circle cx={100} cy={104} r={12} fill="none" stroke="currentColor" strokeOpacity={gone ? 0.5 : 0.85} strokeWidth={1} />
      <path d="M 100 116 L 100 140 M 88 128 L 112 128" fill="none" stroke="currentColor" strokeOpacity={gone ? 0.45 : 0.8} strokeWidth={0.9} />
      {/* the astral clothing */}
      <ellipse cx={100} cy={118} rx={26} ry={36} fill="none" stroke={G} strokeOpacity={gone ? 0.35 : 0.5} strokeWidth={0.7} strokeDasharray="3 3" />
      {/* the house */}
      <path d="M 52 176 L 52 96 A 48 48 0 0 1 148 96 L 148 176" fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.1} />
      <path d="M 44 176 L 156 176" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.8} />
      {/* offerings and attention */}
      {[70, 84, 116, 130].map((ox) => (
        <circle key={ox} cx={ox} cy={168} r={1.6} fill={G} fillOpacity={gone ? 0.35 : 0.7} />
      ))}
      <text x={100} y={192} textAnchor="middle" className="font-label uppercase" style={lbl} fill={gone ? "currentColor" : G} fillOpacity={0.8}>
        {gone ? "the inhabitant withdrawn" : "inhabited · hierostasis"}
      </text>
    </g>
  );
  return (
    <div className="aoh-fig mx-auto w-full max-w-[640px]">
      <style>{`
        .aoh-sa-run { stroke-dasharray: 3 5; animation: aoh-sa-go 3s linear infinite; }
        @keyframes aoh-sa-go { to { stroke-dashoffset: -16 } }
        @media (prefers-reduced-motion: reduce) { .aoh-sa-run { animation: none } }
      `}</style>
      <svg viewBox="0 0 440 200" className="h-auto w-full" role="img" aria-labelledby="aoh-sa-t">
        <title id="aoh-sa-t">
          Two houses. Left, inhabited: a source above, a current descending into a body, astral clothing around
          it, and the arch of a temple with offerings at its base. Right, the same house with the source faint,
          the current withdrawn upward, and the body and clothing remaining.
        </title>
        <House x={10} gone={false} />
        <House x={230} gone={true} />
        {/* the layers, named once between the two */}
        {[["source", 22], ["current", 60], ["morphal body", 104], ["astral clothing", 130], ["the house", 158]].map(([k, y]) => (
          <text key={k as string} x={220} y={(y as number) + 3} textAnchor="middle" className="font-label uppercase" style={{ ...fs(5.6), letterSpacing: "0.14em" }} fill="currentColor" fillOpacity={0.4}>{k}</text>
        ))}
      </svg>
    </div>
  );
}
