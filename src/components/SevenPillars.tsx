/**
 * "Wisdom has built her house, she has hewn her seven pillars" — Proverbs 9:1.
 *
 * A colonnade of seven, drawn as line work: seven shafts on a stylobate under
 * one architrave, the middle one taller because the sentence is about a house
 * that is finished rather than a row that is even. Nothing here reproduces an
 * order of architecture; it is the figure of the verse, not a temple.
 */
export function SevenPillars({ className = "", height = 132 }: { className?: string; height?: number }) {
  const N = 7;
  const W = 700, H = 200;
  const gap = W / (N + 1);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      style={{ height }}
      role="img"
      aria-label="Seven pillars under one architrave, after Proverbs 9:1 — Wisdom has built her house and hewn her seven pillars."
      fill="none"
      stroke="var(--gold)"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* the architrave, and the shadow line under it */}
      <path d={`M14 40h${W - 28}`} strokeWidth="2.2" strokeOpacity="0.7" />
      <path d={`M26 48h${W - 52}`} strokeWidth="1" strokeOpacity="0.35" />
      {Array.from({ length: N }, (_, i) => {
        const x = gap * (i + 1);
        const mid = i === (N - 1) / 2;
        const top = mid ? 54 : 62;
        return (
          <g key={i} strokeOpacity={mid ? 0.9 : 0.6}>
            {/* capital */}
            <path d={`M${x - 20} ${top}h40`} strokeWidth="1.8" />
            <path d={`M${x - 15} ${top + 8}h30`} strokeWidth="1" strokeOpacity="0.5" />
            {/* shaft, fluted with two inner lines */}
            <path d={`M${x - 13} ${top + 8}V166M${x + 13} ${top + 8}V166`} strokeWidth="1.6" />
            <path d={`M${x - 5} ${top + 16}V158M${x + 5} ${top + 16}V158`} strokeWidth="0.7" strokeOpacity="0.4" />
            {/* base */}
            <path d={`M${x - 17} 166h34M${x - 21} 174h42`} strokeWidth="1.6" />
          </g>
        );
      })}
      {/* the stylobate the house stands on */}
      <path d={`M14 178h${W - 28}`} strokeWidth="2" strokeOpacity="0.6" />
      <path d={`M4 186h${W - 8}`} strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  );
}
