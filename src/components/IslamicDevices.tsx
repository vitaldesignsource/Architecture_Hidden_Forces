/**
 * Two devices for the Ishrāqī section, drawn as line work in the house gold.
 *
 * The band is girih strapwork: the eight-point star made by two squares set
 * across one another, the figure that runs along a frieze or a spandrel from
 * Iran to Andalusia. The niche is the miṣbāḥ in its mishkāt — the lamp in the
 * niche of the Light Verse — drawn as an arch with a lamp hung in it, which is
 * what the verse describes and what the mihrab of a mosque takes its form from.
 *
 * Both are borrowed conventions, captioned as such where they are used. Neither
 * reproduces any particular monument.
 */

/** Eight-point stars in a strap band, repeating across any width. */
export function GirihBand({ className = "", height = 30, opacity = 0.5 }: { className?: string; height?: number; opacity?: number }) {
  // One cell: a star of two crossed squares, with straps running out to meet
  // the next cell, so the band reads as one continuous interlace.
  const unit = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <g fill="none" stroke="%23e8aa4e" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
      <rect x="21" y="21" width="58" height="58"/>
      <rect x="21" y="21" width="58" height="58" transform="rotate(45 50 50)"/>
      <path d="M0 50h21M79 50h21M50 0v21M50 79v21"/>
      <path d="M9 9 21 21M91 9 79 21M9 91 21 79M91 91 79 79" stroke-opacity="0.6"/>
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
        backgroundPosition: "center",
      }}
      aria-hidden
    />
  );
}

/** The niche, the glass, the lamp: the figures of Q 24:35, drawn. */
export function NicheLamp({ className = "", width = 190 }: { className?: string; width?: number }) {
  return (
    <svg
      viewBox="0 0 200 300"
      width={width}
      className={className}
      role="img"
      aria-label="A niche with a lamp hung in it, drawn after the figures of the Light Verse: the niche, the glass, and the flame within."
      fill="none"
      stroke="var(--gold)"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* the niche: a pointed arch on two jambs, the mishkāt */}
      <path
        d="M28 292V116C28 74 58 40 100 40s72 34 72 76v176"
        strokeWidth="1.6"
        strokeOpacity="0.75"
      />
      <path
        d="M42 292V120C42 84 66 54 100 54s58 30 58 66v172"
        strokeWidth="0.9"
        strokeOpacity="0.4"
      />
      {/* the chain */}
      <path d="M100 54v34" strokeWidth="1" strokeOpacity="0.5" />
      {/* the glass: a lamp of blown glass, wide-bellied and drawn in */}
      <path
        d="M78 96h44l-6 22c14 10 22 26 22 43 0 24-17 43-38 43s-38-19-38-43c0-17 8-33 22-43z"
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      {/* the flame, the one part of the figure that is not glass */}
      <path
        d="M100 137c8 8 12 15 12 22a12 12 0 0 1-24 0c0-7 4-14 12-22z"
        strokeWidth="1.4"
        stroke="var(--gold)"
        strokeOpacity="0.95"
        fill="var(--gold)"
        fillOpacity="0.16"
      />
      {/* the light it throws, as a pool widening on the floor of the niche */}
      <path d="M64 292h72" strokeWidth="3" strokeOpacity="0.22" />
      <path d="M28 292h144" strokeWidth="1.2" strokeOpacity="0.5" />
    </svg>
  );
}
