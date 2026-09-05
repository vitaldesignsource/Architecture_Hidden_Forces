/**
 * PlanetGlyph — the seven classical planets drawn as stroke paths.
 *
 * The same reason as ZodiacGlyph: the Unicode characters are at the mercy of
 * whatever face a device has, EB Garamond carries few of them, and on Apple
 * platforms ♀ and ♂ arrive as colour emoji. Drawn, they take the current ink,
 * scale cleanly, and stand at one optical weight beside the signs — which
 * matters wherever a planet and a sign are set together.
 *
 * All seven share the signs' 24×24 box, round cap and join, and the same
 * stroke width, so a planet and a sign side by side look like one alphabet.
 */
export const PLANET_PATHS: Record<string, string> = {
  // the disc, with its centre
  Sun: "M12 5.4a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2z",
  // the crescent, turned as it is drawn in the tables
  Moon: "M15.6 4.3a8.5 8.5 0 1 0 0 15.4 9.7 9.7 0 0 1 0-15.4z",
  // horns above the disc, cross beneath
  Mercury:
    "M8.3 4.4a3.7 3.7 0 0 0 7.4 0 M12 7.9a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6z" +
    " M12 16.5v3.9 M9.4 18.4h5.2",
  // the disc above a cross
  Venus: "M12 3.8a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2z M12 13v7.4 M9 17.1h6",
  // the disc, and the spear leaving it
  Mars:
    "M9.8 10.8a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6z M13.5 11.1 19.8 4.8" +
    " M14.9 4.8h4.9v4.9",
  // the hook of the fourth, crossed at the foot
  Jupiter: "M7 8.7c0-3.3 4.4-4.2 5.6-1.5.9 2 .4 4.1-.7 6.3-1 2-1.9 3.6-1.9 5.1 M6.2 19.6h10.4",
  // the cross of the seventh, falling into its scythe
  Saturn:
    "M8.5 4.6v7.4 M5.9 7.3h5.2" +
    " M8.5 12c2-2.4 6.1-1.3 6.1 2.1 0 2.6-2 4.5-2.6 6.2-.3.9.4 1.6 1.5 1.3",
  // the outer three, in the astrological forms: two arms about a crossed stem
  Uranus:
    "M6.8 4.4v7 M17.2 4.4v7 M6.8 7.8h10.4 M12 7.8v8.4" +
    " M12 16.2a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4z",
  // the trident, crossed at its shaft
  Neptune:
    "M12 5.2v15.2 M8.9 17.5h6.2" +
    " M6.4 6.4v3.4c0 3.1 2.5 5.6 5.6 5.6s5.6-2.5 5.6-5.6V6.4",
  // a disc within the crescent, over a cross
  Pluto:
    "M6.6 8.9a5.4 5.4 0 0 0 10.8 0 M12 5.1a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z" +
    " M12 14.3v6.2 M9.2 17.6h5.6",
};

export function PlanetGlyph({
  planet,
  className = "",
  decorative = false,
}: {
  planet: string;
  className?: string;
  decorative?: boolean;
}) {
  const d = PLANET_PATHS[planet];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : planet}
      aria-hidden={decorative || undefined}
    >
      <path d={d} />
      {planet === "Sun" && <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" />}
    </svg>
  );
}
