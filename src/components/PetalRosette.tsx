/**
 * A lotus of n petals, as the chakra texts describe the centres.
 *
 * The counts are not decoration: the Ṣaṭ-Cakra-Nirūpaṇa gives each centre a
 * fixed number of petals, each petal carrying a letter of the Sanskrit
 * alphabet, and the counts of the six lower centres add up to fifty — the
 * alphabet exactly once. The crown is called thousand-petalled, which no
 * drawing can honour literally, so it is drawn as a dense fringe and said to be
 * a fringe.
 */
export function PetalRosette({
  n,
  size = 92,
  bija,
  className = "",
  label,
}: {
  n: number;
  size?: number;
  /** the seed syllable set in the calyx, in Devanagari */
  bija?: string;
  className?: string;
  label?: string;
}) {
  const drawn = Math.min(n, 48);
  const R = 46, rIn = 15, rOut = 42, w = (Math.PI * 2 * ((rIn + rOut) / 2)) / drawn / 2.6;
  const petal = `M0 ${-rIn} C ${w} ${-rIn - 6}, ${w * 0.8} ${-rOut + 6}, 0 ${-rOut} C ${-w * 0.8} ${-rOut + 6}, ${-w} ${-rIn - 6}, 0 ${-rIn} Z`;
  return (
    <svg
      viewBox="0 0 92 92"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={label ?? `A lotus of ${n} petals`}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
    >
      <g transform={`translate(${R} ${R})`}>
        {Array.from({ length: drawn }, (_, i) => (
          <path
            key={i}
            d={petal}
            transform={`rotate(${(i * 360) / drawn})`}
            strokeWidth={drawn > 24 ? 0.7 : 1.1}
            strokeOpacity={drawn > 24 ? 0.5 : 0.8}
          />
        ))}
        <circle r={rIn} strokeWidth="1.1" strokeOpacity="0.7" />
        {bija && (
          <text
            y={5.5}
            textAnchor="middle"
            fontSize="13"
            className="scr scr-devanagari"
            fill="currentColor"
            stroke="none"
            lang="sa"
          >
            {bija}
          </text>
        )}
      </g>
    </svg>
  );
}
