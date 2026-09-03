/**
 * LumenField — the hero ground for Phōs.
 *
 * GeometryField is the Architecture’s emblem: circles, triangles, a twelvefold
 * ring. This volume’s emblem is a source and what leaves it — rays thinning as
 * they go, rings spaced wider as they go out, which is the rarefaction § III
 * makes an argument of. Decorative only, so every motion here uses classes on
 * the aoh-still pause list, and the centre breathes rather than spins: a source
 * does not turn, it gives.
 */
export function LumenField() {
  const RAYS = 36;
  const RINGS = [40, 90, 160, 250, 360, 490, 640];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-[0.2]"
        width="1400"
        height="1400"
        viewBox="-700 -700 1400 1400"
        aria-hidden
      >
        <defs>
          <radialGradient id="lumenFade" cx="0" cy="0" r="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0.55" />
            <stop offset="45%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: RAYS }).map((_, i) => {
          const a = (i * Math.PI * 2) / RAYS;
          const long = i % 3 === 0;
          const r = long ? 680 : 430;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 40}
              y1={Math.sin(a) * 40}
              x2={Math.cos(a) * r}
              y2={Math.sin(a) * r}
              stroke="url(#lumenFade)"
              strokeWidth={long ? 0.6 : 0.4}
            />
          );
        })}
        {RINGS.map((r, i) => (
          <circle
            key={r}
            r={r}
            fill="none"
            stroke="oklch(0.78 0.13 75)"
            strokeOpacity={0.45 - i * 0.055}
            strokeWidth="0.5"
          />
        ))}
      </svg>

      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-breathe"
        width="480"
        height="480"
        viewBox="-240 -240 480 480"
        aria-hidden
      >
        <defs>
          <radialGradient id="lumenCore" cx="0" cy="0" r="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.95 0.012 80)" stopOpacity="0.18" />
            <stop offset="30%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="240" fill="url(#lumenCore)" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}
