/**
 * The Greek key, or meander — the band that runs along a temple frieze, a
 * vase's shoulder, a mosaic border. One line that turns at right angles and
 * never crosses itself, which is why it was read as a river and as continuity.
 * Drawn here as line work in the house gold and tiled across any width.
 */
export function MeanderBand({ className = "", height = 26, opacity = 0.5 }: { className?: string; height?: number; opacity?: number }) {
  // One unit of a classical key: in and around, then out to meet the next.
  const unit = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60">
    <g fill="none" stroke="%23e8aa4e" stroke-width="5" stroke-linecap="square" stroke-linejoin="miter">
      <path d="M0 55 H45 V15 H15 V40 H32"/>
    </g>
  </svg>`.replace(/\s+/g, " ");
  return (
    <div
      className={`w-full border-y border-gold/25 ${className}`}
      style={{
        height,
        opacity,
        backgroundImage: `url("data:image/svg+xml,${unit.replace(/"/g, "'").replace(/</g, "%3C").replace(/>/g, "%3E")}")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundPosition: "left center",
      }}
      aria-hidden
    />
  );
}
