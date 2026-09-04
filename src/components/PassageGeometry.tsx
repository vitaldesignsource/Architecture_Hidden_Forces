/**
 * PassageGeometry — the ground behind the geometry of passage.
 *
 * Nine thresholds, one for each stage of the rite, as faint concentric rings;
 * a single point of light travelling a slow spiral inward through them and
 * out again, which is the passage itself; and the whole drifting a little.
 * Decorative only: it sits behind the text, takes no pointer, pauses when the
 * section is off screen, and holds still for readers who prefer it.
 */
export function PassageGeometry({ className = "" }: { className?: string }) {
  const C = 400, R0 = 40, STEP = 38, N = 9;
  // an Archimedean spiral crossing each of the nine rings, drawn as a polyline
  const pts: string[] = [];
  const turns = 4.5, samples = 360;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const a = t * turns * Math.PI * 2;
    const r = R0 - 10 + t * (STEP * (N - 1) + 22);
    pts.push(`${(C + r * Math.cos(a)).toFixed(1)} ${(C + r * Math.sin(a)).toFixed(1)}`);
  }
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      <svg viewBox="0 0 800 800" className="aoh-passage absolute right-[-18%] top-1/2 h-[150%] w-auto -translate-y-1/2 animate-drift lg:right-[-2%]" style={{ opacity: 0.7 }}>
        <g className="animate-slow-spin-reverse" style={{ transformOrigin: "400px 400px" }}>
          {Array.from({ length: N }, (_, i) => (
            <circle key={i} cx={C} cy={C} r={R0 + i * STEP} fill="none" stroke="var(--gold)" strokeOpacity={0.1 + (i % 3 === 0 ? 0.08 : 0)} strokeWidth={i % 3 === 0 ? 0.8 : 0.5} strokeDasharray={i % 2 ? "2 6" : undefined} />
          ))}
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            const r1 = R0, r2 = R0 + STEP * (N - 1);
            return <line key={i} x1={C + r1 * Math.cos(a)} y1={C + r1 * Math.sin(a)} x2={C + r2 * Math.cos(a)} y2={C + r2 * Math.sin(a)} stroke="var(--gold)" strokeOpacity={0.07} strokeWidth={0.5} />;
          })}
        </g>
        <path className="aoh-passage-path" d={`M${pts.join(" L")}`} fill="none" stroke="var(--gold)" strokeOpacity={0.18} strokeWidth={0.7} />
        <path className="aoh-passage-run" d={`M${pts.join(" L")}`} fill="none" stroke="var(--gold)" strokeOpacity={0.85} strokeWidth={2} strokeLinecap="round" pathLength={1000} />
      </svg>
    </div>
  );
}
