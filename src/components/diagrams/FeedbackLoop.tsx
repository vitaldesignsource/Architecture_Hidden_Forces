import { fs } from "./fig";

/**
 * FeedbackLoop — how an expression becomes an environment.
 *
 * Six nodes on a ring, each the cause of the next: people form an
 * atmosphere; the atmosphere selects and intensifies feelings; feelings
 * guide action; action alters the social and material habitat; the altered
 * habitat recruits people more susceptible to the same pattern; and those
 * people form the atmosphere. Fortune's feedback drawn as the ecology it
 * becomes — the ring closes without anyone deciding to close it.
 */
const NODES = ["people", "atmosphere", "feelings", "action", "habitat", "recruits"];

export function FeedbackLoop() {
  const G = "var(--gold, #c9a227)";
  const cx = 200, cy = 118, R = 78;
  const pts = NODES.map((_, i) => {
    const a = -Math.PI / 2 + (i / NODES.length) * 2 * Math.PI;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), a };
  });
  return (
    <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[520px]">
      <style>{`
        .aoh-fl-run { stroke-dasharray: 4 7; animation: aoh-fl-go 5s linear infinite; }
        @keyframes aoh-fl-go { to { stroke-dashoffset: -22 } }
        @media (prefers-reduced-motion: reduce) { .aoh-fl-run { animation: none } }
      `}</style>
      <svg viewBox="0 0 400 240" className="h-auto w-full" role="img" aria-labelledby="aoh-fl-t">
        <title id="aoh-fl-t">
          Six words on a ring with the current running round it: people, atmosphere, feelings, action,
          habitat, recruits, and back to people.
        </title>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={G} strokeOpacity={0.6} strokeWidth={1} className="aoh-fl-run" />
        {pts.map((p, i) => {
          const out = 16;
          const lx = cx + (R + out) * Math.cos(p.a), ly = cy + (R + out) * Math.sin(p.a);
          const anchor = Math.cos(p.a) > 0.3 ? "start" : Math.cos(p.a) < -0.3 ? "end" : "middle";
          return (
            <g key={NODES[i]}>
              <circle cx={p.x} cy={p.y} r={3.2} fill={G} />
              <text x={lx} y={ly + 3} textAnchor={anchor} className="font-serif" style={fs(10)} fill="currentColor" fillOpacity={0.9}>{NODES[i]}</text>
            </g>
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" className="font-label uppercase" style={{ ...fs(6.2), letterSpacing: "0.2em" }} fill={G} fillOpacity={0.8}>what began as expression</text>
        <text x={cx} y={cy + 8} textAnchor="middle" className="font-label uppercase" style={{ ...fs(6.2), letterSpacing: "0.2em" }} fill={G} fillOpacity={0.8}>becomes environment</text>
        <text x={cx} y={232} textAnchor="middle" className="font-serif italic" style={fs(9)} fill="currentColor" fillOpacity={0.6}>the ring closes without anyone deciding to close it</text>
      </svg>
    </div>
  );
}
