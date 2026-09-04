/**
 * Spolia — the Ossuary drawn as what builders have always done.
 *
 * On the left, a colonnade with its blocks gone: the form has failed. On the
 * right, a newer wall in which those same blocks are set — the drums of the
 * columns turned on their sides, the lintel as a threshold, a capital as a
 * corner. The blocks are drawn in gold in both places so the eye can follow
 * one from where it stood to where it stands. This is how a language keeps a
 * dead tongue's grammar and how a rite keeps an older rite's gesture: the
 * architecture outlives the life that made it, and is quarried.
 */
export function Spolia() {
  const G = "var(--gold, #c9a227)";
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 520 240" className="h-auto w-full" role="img" aria-labelledby="aoh-spo-t">
        <title id="aoh-spo-t">
          A ruined colonnade on the left with blocks missing; on the right a later wall built with those
          blocks, drums turned on their sides and a lintel set as a threshold.
        </title>
        {/* ground */}
        <line x1={10} y1={200} x2={510} y2={200} stroke="currentColor" strokeOpacity={0.3} strokeWidth={0.8} />
        {/* the ruin */}
        <g>
          <text x={120} y={26} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7.5, letterSpacing: "0.2em" }} fill="currentColor" fillOpacity={0.5}>the form that failed</text>
          {[50, 110, 170].map((x, i) => (
            <g key={x}>
              {/* drums, some present, some gone */}
              {[0, 1, 2, 3, 4].map((d) => {
                const gone = (i === 0 && d >= 3) || (i === 1 && d >= 1) || (i === 2 && d === 4);
                return gone ? (
                  <rect key={d} x={x - 12} y={200 - (d + 1) * 26} width={24} height={24} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.6} strokeDasharray="2 3" />
                ) : (
                  <rect key={d} x={x - 12} y={200 - (d + 1) * 26} width={24} height={24} fill="none" stroke={i === 2 && d === 3 ? G : "currentColor"} strokeOpacity={i === 2 && d === 3 ? 0.9 : 0.55} strokeWidth={0.9} />
                );
              })}
            </g>
          ))}
          {/* the lintel, partly fallen */}
          <rect x={38} y={56} width={74} height={12} fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={0.9} />
          <rect x={112} y={56} width={70} height={12} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.6} strokeDasharray="2 3" />
          {/* fallen drums on the ground, gold */}
          <ellipse cx={218} cy={192} rx={12} ry={7} fill="none" stroke={G} strokeOpacity={0.8} strokeWidth={0.9} />
          <ellipse cx={240} cy={194} rx={12} ry={7} fill="none" stroke={G} strokeOpacity={0.6} strokeWidth={0.9} />
        </g>
        {/* the arrow of reuse */}
        <path d="M 250 120 C 280 96, 300 96, 330 120" fill="none" stroke={G} strokeOpacity={0.5} strokeWidth={0.8} strokeDasharray="3 4" />
        <polygon points="326,114 334,121 325,124" fill={G} fillOpacity={0.6} />
        <text x={290} y={92} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 6.5, letterSpacing: "0.16em" }} fill={G} fillOpacity={0.7}>quarried</text>
        {/* the newer wall */}
        <g>
          <text x={415} y={26} textAnchor="middle" className="font-mono uppercase" style={{ fontSize: 7.5, letterSpacing: "0.2em" }} fill="currentColor" fillOpacity={0.5}>the form that inherits</text>
          {/* courses of a wall */}
          {[0, 1, 2, 3, 4].map((r) =>
            [0, 1, 2, 3].map((c) => {
              const x = 336 + c * 40 + (r % 2 ? 20 : 0);
              const y = 200 - (r + 1) * 26;
              if (x + 38 > 500) return null;
              // the reused pieces, in gold
              const reused = (r === 1 && c === 1) || (r === 3 && c === 2) || (r === 0 && c === 3);
              return <rect key={`${r}-${c}`} x={x} y={y} width={38} height={24} fill="none" stroke={reused ? G : "currentColor"} strokeOpacity={reused ? 0.9 : 0.4} strokeWidth={reused ? 1 : 0.8} />;
            }),
          )}
          {/* a drum on its side as a threshold, gold */}
          <ellipse cx={402} cy={198} rx={22} ry={6} fill="none" stroke={G} strokeOpacity={0.9} strokeWidth={0.9} />
          <text x={415} y={224} textAnchor="middle" className="font-serif italic" style={{ fontSize: 9.5 }} fill="currentColor" fillOpacity={0.6}>the same stones, another architecture</text>
        </g>
      </svg>
    </div>
  );
}
