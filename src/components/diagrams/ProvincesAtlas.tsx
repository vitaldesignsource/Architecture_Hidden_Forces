import { fs } from "./fig";

/**
 * ProvincesAtlas — the circulation, and the regions around it.
 *
 * The six stations as a ring at the centre. Around it, where each lies in
 * relation to the circulation and not in space: the Sea Between Causes as
 * the water everything sits in; the Nursery above and before, inside a
 * dashed reach of Morphaithēr, where forms are still seeds; the Aquifer
 * beneath, a dark lens; the Catacombs below and to the side, a row of empty
 * arches; the Garden at the surface, where residue blooms; and a hungry
 * form at the waterline, open on one side, with its groove beneath it.
 *
 * Each region carries a line beneath its name. On a phone the drawing is a
 * third of its size and those lines could not be read at any size that fit,
 * so below sm they are not drawn; the names and the shapes carry the atlas.
 * The sea's name sits on the sea's dashed edge and knocks it out behind the
 * letters rather than being moved off the water it names.
 */
export function ProvincesAtlas() {
  const G = "var(--gold, #c9a227)";
  const cx = 250, cy = 150, R = 58;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 6) * 2 * Math.PI;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  const lbl = (n: number) => ({ ...fs(n), letterSpacing: "0.16em" });
  return (
    <div className="aoh-fig aoh-fig-wide mx-auto w-full max-w-[720px]">
      <style>{`
        .aoh-pa-flow { stroke-dasharray: 4 7; animation: aoh-pa-run 5s linear infinite; }
        @keyframes aoh-pa-run { to { stroke-dashoffset: -22 } }
        @media (prefers-reduced-motion: reduce) { .aoh-pa-flow { animation: none } }
      `}</style>
      <svg viewBox="0 0 520 330" className="h-auto w-full" role="img" aria-labelledby="aoh-pa-t">
        <title id="aoh-pa-t">
          The six stations of the circulation as a ring, surrounded by the Sea Between Causes; above them
          the Nursery of Unborn Forms inside a reach of Morphaithēr; beneath them the Black Aquifer; below
          and beside them the Catacombs of Forgotten Gods; at the surface the Garden of Counterfeit Flowers;
          and at the waterline a hungry form with its groove.
        </title>
        {/* the sea: everything sits in it */}
        <ellipse cx={260} cy={168} rx={244} ry={150} fill="currentColor" fillOpacity={0.035} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.7} strokeDasharray="3 5" />
        <text x={492} y={40} textAnchor="end" className="font-label uppercase" style={lbl(7.5)} fill="currentColor" fillOpacity={0.55} stroke="var(--void, #000)" strokeWidth={3} strokeLinejoin="round" paintOrder="stroke">the Sea Between Causes</text>
        <text x={492} y={50} textAnchor="end" className="font-label uppercase hidden sm:block" style={lbl(7)} fill="currentColor" fillOpacity={0.55} stroke="var(--void, #000)" strokeWidth={3} strokeLinejoin="round" paintOrder="stroke">between every cause and its effect</text>
        {/* the waterline */}
        <line x1={40} y1={214} x2={480} y2={214} stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.7} strokeDasharray="2 4" />
        {/* morphaithēr's reach, and the nursery in it */}
        <path d="M 126 60 C 160 34, 240 30, 290 52" fill="none" stroke={G} strokeOpacity={0.3} strokeWidth={0.7} strokeDasharray="2 4" />
        <g opacity={0.85}>
          {[[150, 72], [172, 60], [196, 70], [218, 58], [240, 68]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={3.2} fill="none" stroke={G} strokeOpacity={0.7} strokeWidth={0.8} />
              <circle cx={x} cy={y} r={1} fill={G} fillOpacity={0.8} />
            </g>
          ))}
        </g>
        <text x={195} y={30} textAnchor="middle" className="font-label uppercase" style={lbl(7.5)} fill={G} fillOpacity={0.85}>the Nursery</text>
        <text x={195} y={84} textAnchor="middle" className="font-label uppercase hidden sm:block" style={lbl(7)} fill="currentColor" fillOpacity={0.55}>before form · within Morphaithēr</text>
        {/* the ring of stations */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={G} strokeOpacity={0.5} strokeWidth={1} className="aoh-pa-flow" />
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill={G} fillOpacity={0.9} />)}
        <text x={cx} y={cy - 4} textAnchor="middle" className="font-label uppercase" style={lbl(7)} fill={G} fillOpacity={0.8}>the six stations</text>
        <text x={cx} y={cy + 8} textAnchor="middle" className="font-label uppercase hidden sm:block" style={lbl(6.4)} fill={G} fillOpacity={0.65}>one circulation</text>
        {/* the aquifer beneath */}
        <ellipse cx={250} cy={262} rx={78} ry={17} fill="var(--void, #000)" fillOpacity={0.85} stroke={G} strokeOpacity={0.45} strokeWidth={0.8} />
        <path d="M 250 210 L 250 244" stroke={G} strokeOpacity={0.45} strokeWidth={0.8} strokeDasharray="2 3" />
        <text x={250} y={266} textAnchor="middle" className="font-label uppercase" style={lbl(7.5)} fill={G} fillOpacity={0.85}>the Black Aquifer</text>
        <text x={250} y={294} textAnchor="middle" className="font-label uppercase hidden sm:block" style={lbl(7)} fill="currentColor" fillOpacity={0.55}>beneath · where the remainder sinks</text>
        {/* the catacombs, below and to the side */}
        <g fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.8}>
          {[380, 404, 428].map((x) => (
            <path key={x} d={`M ${x} 300 L ${x} 250 A 10 10 0 0 1 ${x + 20} 250 L ${x + 20} 300`} />
          ))}
          <path d="M 372 300 L 456 300" strokeOpacity={0.3} />
        </g>
        <text x={414} y={318} textAnchor="middle" className="font-label uppercase" style={lbl(7.5)} fill={G} fillOpacity={0.85}>the Catacombs</text>
        <text x={414} y={238} textAnchor="middle" className="font-label uppercase hidden sm:block" style={lbl(7)} fill="currentColor" fillOpacity={0.55}>after the cult</text>
        {/* the garden, at the surface */}
        <g fill="none" stroke={G} strokeOpacity={0.7} strokeWidth={0.8}>
          {[[392, 196], [412, 190], [432, 198]].map(([x, y], i) => (
            <g key={i}>
              <line x1={x} y1={214} x2={x} y2={y + 6} />
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx={x} cy={y - 2} rx={2} ry={4.5} transform={`rotate(${a} ${x} ${y})`} />
              ))}
            </g>
          ))}
        </g>
        <text x={412} y={170} textAnchor="middle" className="font-label uppercase" style={lbl(7.5)} fill={G} fillOpacity={0.85}>the Garden</text>
        <text x={412} y={180} textAnchor="middle" className="font-label uppercase hidden sm:block" style={lbl(7)} fill="currentColor" fillOpacity={0.55}>where residue acquires allure</text>
        {/* the hungry form at the waterline, left */}
        <path d="M 96 176 L 99 212 Q 112 220 125 212" fill="none" stroke="currentColor" strokeOpacity={0.8} strokeWidth={0.9} />
        <path d="M 102 218 C 90 240, 96 262, 112 268 C 128 262, 134 240, 122 218" fill="none" stroke={G} strokeOpacity={0.6} strokeWidth={0.8} className="aoh-pa-flow" />
        <text x={112} y={166} textAnchor="middle" className="font-label uppercase" style={lbl(7.5)} fill={G} fillOpacity={0.85}>a hungry form</text>
        <text x={112} y={286} textAnchor="middle" className="font-label uppercase hidden sm:block" style={lbl(7)} fill="currentColor" fillOpacity={0.55}>when circulation fails</text>
      </svg>
    </div>
  );
}
