export function GeometryField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-[0.18]"
        width="1400"
        height="1400"
        viewBox="-700 -700 1400 1400"
        aria-hidden
      >
        <defs>
          <radialGradient id="goldFade" cx="0" cy="0" r="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="680" fill="none" stroke="url(#goldFade)" strokeWidth="0.5" />
        <circle r="520" fill="none" stroke="oklch(0.78 0.13 75 / 0.3)" strokeWidth="0.5" />
        <circle r="360" fill="none" stroke="oklch(0.78 0.13 75 / 0.35)" strokeWidth="0.5" />
        <circle r="200" fill="none" stroke="oklch(0.78 0.13 75 / 0.4)" strokeWidth="0.5" />
        {Array.from({ length: 18 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 18;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 200}
              y1={Math.sin(a) * 200}
              x2={Math.cos(a) * 680}
              y2={Math.sin(a) * 680}
              stroke="oklch(0.78 0.13 75 / 0.25)"
              strokeWidth="0.4"
            />
          );
        })}
      </svg>

      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin-reverse opacity-[0.22]"
        width="900"
        height="900"
        viewBox="-450 -450 900 900"
        aria-hidden
      >
        <polygon points="0,-260 225,130 -225,130" fill="none" stroke="oklch(0.78 0.13 75 / 0.45)" strokeWidth="0.6" />
        <polygon points="0,260 -225,-130 225,-130" fill="none" stroke="oklch(0.78 0.13 75 / 0.45)" strokeWidth="0.6" />
        <circle r="260" fill="none" stroke="oklch(0.78 0.13 75 / 0.3)" strokeWidth="0.4" />
        <circle r="130" fill="none" stroke="oklch(0.78 0.13 75 / 0.35)" strokeWidth="0.4" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a1 = (i * Math.PI * 2) / 12;
          const a2 = ((i + 1) * Math.PI * 2) / 12;
          return (
            <line
              key={i}
              x1={Math.cos(a1) * 380}
              y1={Math.sin(a1) * 380}
              x2={Math.cos(a2) * 380}
              y2={Math.sin(a2) * 380}
              stroke="oklch(0.78 0.13 75 / 0.4)"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      <svg
        className="absolute -right-32 -top-32 animate-drift opacity-[0.12] sm:opacity-[0.18]"
        width="500"
        height="500"
        viewBox="-250 -250 500 500"
        aria-hidden
      >
        <circle r="240" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
        <circle r="180" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
        <polygon points="0,-200 190,62 117,162 -117,162 -190,62" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      </svg>

      <svg
        className="absolute -bottom-40 -left-40 animate-drift opacity-[0.1] sm:opacity-[0.16]"
        width="600"
        height="600"
        viewBox="-300 -300 600 600"
        style={{ animationDelay: "-9s" }}
        aria-hidden
      >
        <circle r="280" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 7 - Math.PI / 2;
          return (
            <circle
              key={i}
              cx={Math.cos(a) * 140}
              cy={Math.sin(a) * 140}
              r="140"
              fill="none"
              stroke="oklch(0.78 0.13 75 / 0.5)"
              strokeWidth="0.4"
            />
          );
        })}
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}

/**
 * Backdrop — a photographic ground behind a section.
 * The palette is near-black (--void is oklch 0.06), so the image carries as
 * atmosphere rather than picture: dimmed, scrimmed, and faded at top and bottom
 * so the section borders still read as rules rather than as photo edges.
 * Self-contained (-z-10 + its own overflow clip), so no section class changes.
 */
