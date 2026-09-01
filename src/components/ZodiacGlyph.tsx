/**
 * ZodiacGlyph — the twelve signs drawn as stroke paths.
 *
 * The Unicode characters U+2648–U+2653 carry emoji presentation by default, and
 * EB Garamond has no glyphs for them, so the browser fell through to the system
 * colour-emoji font and rendered each sign as a purple rounded square. Drawn
 * paths take the current colour, scale cleanly, and match the line-art the rest
 * of the figures are built from.
 *
 * All twelve share a 24×24 box, a round cap and join, and no fill, so they sit
 * on one optical weight beside each other in a grid.
 */

const PATHS: Record<string, string> = {
  // stem, and two horns curling outward
  Aries:
    "M12 20.5V11 M12 11c0-4.5-2-6.5-4-5.5S5 9.5 6.5 11.5 M12 11c0-4.5 2-6.5 4-5.5s3 4 1.5 6",
  // the bull: circle beneath a crescent
  Taurus:
    "M6 4.5c0 4.5 2.5 7 6 7s6-2.5 6-7 M12 21.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10z",
  // twin uprights, bound top and bottom
  Gemini:
    "M8.5 5.5v13 M15.5 5.5v13 M5.5 4.8c3.5-1.6 9.5-1.6 13 0 M5.5 19.2c3.5 1.6 9.5 1.6 13 0",
  // two claws, each a curve closing on a small circle
  Cancer:
    "M20 8.5c0-2.6-6-4-11.5-1.6 M5.5 8.5a2.6 2.6 0 1 1 5.2 0 2.6 2.6 0 0 1-5.2 0z" +
    " M4 15.5c0 2.6 6 4 11.5 1.6 M18.5 15.5a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 0 1 5.2 0z",
  // the lion: a small body and a long curling tail
  Leo:
    "M7.5 19a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8z" +
    " M10.6 13.6C12 9 13 6.2 15.5 6.7s3 4 1 6.5-2.4 4.4-1 6.3",
  // three strokes, the last closing into a crossed loop
  Virgo:
    "M4.5 7v10 M4.5 8.4c0-2 2.4-2 2.4 0v8.6 M6.9 8.4c0-2 2.4-2 2.4 0v6.4" +
    " c0 2.6 1.8 3.8 3.6 2.6 M12.9 17.4c2.6-1.6 3.2-5 1.4-6.4-1.4-1.1-2.6.5-1.2 2" +
    " 1.9 2 4 3.8 6.2 5.4",
  // the balance: a beam, and a dome resting on it
  Libra:
    "M4 18.5h16 M4 13.5h4 M8 13.5c0-3.6 1.8-5.4 4-5.4s4 1.8 4 5.4 M16 13.5h4",
  // three strokes, the last carrying a barb
  Scorpio:
    "M4 7.5v9.5 M4 8.9c0-2 2.4-2 2.4 0v8.1 M6.4 8.9c0-2 2.4-2 2.4 0v8.1" +
    " M8.8 8.9c0-2 2.4-2 2.4 0v8.6c0 1.6 1.2 2.3 2.4 2.3h3.6" +
    " M14.2 16.4l3.4 3-3.4 3",
  // the arrow, crossed near its middle
  Sagittarius: "M5 19.2 18.6 5.6 M12.6 5.6h6v6 M7.6 11.6 12.4 16.4",
  // the sea-goat: a rise, a fall, and a closing loop
  Capricorn:
    "M4 8.2 7.4 16 M7.4 16c1.6 0 2.2-3 1.6-6 M9 10c1.4 3.6 3 6 5 6" +
    " M14 16c2.6 0 3.8-2.6 2.3-4.2-1.4-1.4-3.4 0-2.4 2 1 2 2.6 4.4.6 5.8",
  // two waves, one beneath the other
  Aquarius:
    "M4.5 10.6 8 7.6l3.5 3 3.5-3 3.5 3 M4.5 16.6 8 13.6l3.5 3 3.5-3 3.5 3",
  // two fish turned away, bound at the centre
  Pisces: "M7 4c-3 4-3 12 0 16 M17 4c3 4 3 12 0 16 M4 12h16",
};

export function ZodiacGlyph({ sign, className = "" }: { sign: string; className?: string }) {
  const d = PATHS[sign];
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
      role="img"
      aria-label={sign}
    >
      <path d={d} />
    </svg>
  );
}
