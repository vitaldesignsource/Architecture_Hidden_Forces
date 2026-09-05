import { fs } from "./fig";

/**
 * ScarAndReturn — a hungry form at the waterline, and the groove beneath it.
 *
 * The form is drawn open on one side: an appetite that has lost its rightful
 * source. Beneath it a single loop — down from the form, through a small
 * reservoir, and back up into the form — with a mark travelling it. The loop
 * is drawn three times, each wider and fainter than the last, because that
 * is what the doctrine says about repetition: each pass deepens the channel.
 * What looks like a curse is sometimes this shape.
 */
export function ScarAndReturn() {
  const G = "var(--gold, #c9a227)";
  const loop = "M 132 74 C 108 110, 116 158, 150 170 C 184 158, 192 110, 168 74";
  return (
    <div className="aoh-fig mx-auto w-full max-w-[460px]">
      <style>{`
        .aoh-sr-mark { offset-rotate: 0deg; }
        @media (prefers-reduced-motion: reduce) { .aoh-sr-mark { display: none } }
      `}</style>
      <svg viewBox="0 0 300 220" className="h-auto w-full" role="img" aria-labelledby="aoh-sr-t">
        <title id="aoh-sr-t">
          A vessel open on one side standing at a waterline, and beneath it a loop of descent and return
          through a small reservoir, drawn three times wider and fainter, with a mark travelling it.
        </title>
        <defs><path id="aoh-sr-path" d={loop} /></defs>
        {/* the waterline */}
        <line x1={12} y1={50} x2={288} y2={50} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.8} strokeDasharray="3 4" />
        <rect x={12} y={50} width={276} height={150} fill="currentColor" fillOpacity={0.04} />
        {/* the hungry form: open on the right */}
        <path d="M 124 18 L 128 70 Q 150 80 172 70" fill="none" stroke="currentColor" strokeOpacity={0.85} strokeWidth={1.1} />
        <path d="M 176 18 L 176 44" fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth={0.8} strokeDasharray="2 3" />
        {/* the groove, deepened by repetition */}
        <path d={loop} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={9} strokeLinecap="round" />
        <path d={loop} fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={5} strokeLinecap="round" />
        <path d={loop} fill="none" stroke={G} strokeOpacity={0.7} strokeWidth={1} />
        {/* the reservoir it gathers in */}
        <ellipse cx={150} cy={172} rx={24} ry={7} fill={G} fillOpacity={0.12} stroke={G} strokeOpacity={0.4} strokeWidth={0.6} />
        {/* the travelling mark */}
        <circle r={2.6} fill="var(--bone, #f0ead8)" className="aoh-sr-mark">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="0">
            <mpath href="#aoh-sr-path" />
          </animateMotion>
        </circle>
        {/* labels */}
        <text x={150} y={12} textAnchor="middle" className="font-label uppercase" style={{ ...fs(6.6), letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.6}>a hungry form</text>
        <text x={16} y={46} className="font-label uppercase" style={{ ...fs(6.2), letterSpacing: "0.14em" }} fill="currentColor" fillOpacity={0.45}>the waterline</text>
        <text x={200} y={132} className="font-label uppercase" style={{ ...fs(6.6), letterSpacing: "0.16em" }} fill={G} fillOpacity={0.8}>the scar</text>
        <text x={150} y={196} textAnchor="middle" className="font-serif italic" style={fs(9)} fill="currentColor" fillOpacity={0.6}>each pass deepens the channel</text>
        <text x={150} y={212} textAnchor="middle" className="font-label uppercase" style={{ ...fs(6), letterSpacing: "0.16em" }} fill="currentColor" fillOpacity={0.4}>descend · gather · rise · repeat</text>
      </svg>
    </div>
  );
}
