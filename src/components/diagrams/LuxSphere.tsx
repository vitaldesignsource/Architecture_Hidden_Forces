/**
 * LuxSphere — Grosseteste’s De Luce drawn as the one operation it describes.
 *
 * A point of lux multiplies itself instantly in every direction, and the sphere
 * it generates is the first body: extension is what light does. Rarefied as it
 * travels, densest where it began — so the rings are spaced wider as they leave
 * the centre and drawn fainter, and the four inner rings are set heavier than
 * the nine outer, since the treatise finds the elements where the self-diffusion
 * has nearly spent itself and the heavens where it is still most itself.
 *
 * The pulse is decorative: one ring leaving the point and thinning to nothing on
 * a slow cycle. It is on the aoh-still pause list and off under reduced motion.
 */
export function LuxSphere() {
  // The rings are spaced by a power law rather than evenly, so the widening is
  // the eye’s first impression. Scaled to leave the rim well clear of the
  // caption: an outer ring crossing the label read as a strikethrough.
  const C = 172;
  const RAW = Array.from({ length: 13 }, (_, i) => Math.pow(i + 1, 1.28));
  const RIM = 138;
  const RINGS = RAW.map((r) => (r / RAW[RAW.length - 1]) * RIM);
  const RAYS = 24;

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <style>{`
        .aoh-lux-pulse { animation: aoh-lux-out 9s cubic-bezier(0.2, 0.7, 0.4, 1) infinite; }
        @keyframes aoh-lux-out { 0% { transform: scale(0.04); opacity: 0.75 } 100% { transform: scale(1); opacity: 0 } }
        @media (prefers-reduced-motion: reduce) { .aoh-lux-pulse { animation: none; opacity: 0 } }
      `}</style>
      <svg viewBox="0 0 420 350" className="h-auto w-full" role="img" aria-labelledby="aoh-lux-t">
        <title id="aoh-lux-t">
          A point at the centre, with thirteen concentric rings spaced wider and drawn fainter as
          they move outward, and rays thinning from the point to the rim.
        </title>
        <defs>
          <radialGradient id="aoh-lux-ray" cx={C} cy={C} r={RIM} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.04" />
          </radialGradient>
        </defs>

        {Array.from({ length: RAYS }).map((_, i) => {
          const a = (i * Math.PI * 2) / RAYS - Math.PI / 2;
          return (
            <line key={i} x1={C + Math.cos(a) * 6} y1={C + Math.sin(a) * 6}
                  x2={C + Math.cos(a) * RIM} y2={C + Math.sin(a) * RIM}
                  stroke="url(#aoh-lux-ray)" strokeWidth={i % 2 ? 0.4 : 0.7} />
          );
        })}

        {RINGS.map((r, i) => (
          <circle key={i} cx={C} cy={C} r={r} fill="none" stroke="var(--gold)"
                  strokeOpacity={0.85 - i * 0.052} strokeWidth={i < 4 ? 1.1 : 0.6} />
        ))}

        <g className="aoh-lux-pulse" style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C} cy={C} r={RIM} fill="none" stroke="var(--bone)" strokeWidth="1.2" />
        </g>

        <circle cx={C} cy={C} r="3.4" fill="var(--bone)" />

        {/* Both labels are led out past the rim. Inside it every position sits on
            a ray or a ring, and the type was unreadable against them. */}
        <g stroke="var(--bone)" strokeOpacity="0.45" strokeWidth="0.6">
          <line x1={C + RINGS[3] * 0.72} y1={C + RINGS[3] * 0.72} x2={C + RIM + 22} y2={C + 74} />
          <line x1={C + RIM + 22} y1={C + 74} x2={C + RIM + 34} y2={C + 74} />
        </g>
        <text x={C + RIM + 38} y={C + 76} className="font-mono" fontSize="6.4" letterSpacing="1"
              fill="var(--bone)" opacity="0.75">THE FOUR</text>

        <g stroke="var(--muted-foreground)" strokeOpacity="0.45" strokeWidth="0.6">
          <line x1={C + RINGS[10] * 0.72} y1={C - RINGS[10] * 0.72} x2={C + RIM + 22} y2={C - 96} />
          <line x1={C + RIM + 22} y1={C - 96} x2={C + RIM + 34} y2={C - 96} />
        </g>
        <text x={C + RIM + 38} y={C - 94} className="font-mono" fontSize="6.4" letterSpacing="1"
              fill="var(--muted-foreground)" opacity="0.95">THE NINE</text>

        <text x="196" y="340" textAnchor="middle" className="font-mono" fontSize="6.4"
              letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
          DENSER AT THE POINT · RARER AT THE RIM — THE SPHERE IS WHAT THE POINT DOES
        </text>
      </svg>
    </div>
  );
}
