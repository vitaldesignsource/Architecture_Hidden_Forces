/**
 * A lotus of n petals, as the chakra texts describe the centres.
 *
 * The counts are not decoration: the Ṣaṭ-Cakra-Nirūpaṇa gives each centre a
 * fixed number of petals, each petal carrying a letter of the Sanskrit
 * alphabet, and the counts of the six lower centres add up to fifty — the
 * alphabet exactly once. The crown is called thousand-petalled, which no
 * drawing can honour literally, so it is drawn as a dense fringe and said to be
 * a fringe.
 *
 * The text also gives each lotus a colour and sets a figure in its pericarp —
 * earth's square, water's crescent, fire's triangle, air's hexagram, ether's
 * circle. Both are drawn here when they are asked for, since they are the
 * text's own and not the later spectrum.
 */
export type Pericarp = "square" | "crescent" | "triangle" | "hexagram" | "circle" | "none";

export function PetalRosette({
  n,
  size = 92,
  bija,
  className = "",
  label,
  ink,
  pericarp = "none",
  pericarpInk,
  letters,
  decorative = false,
}: {
  n: number;
  size?: number | string;
  /** the seed syllable set in the calyx, in Devanagari */
  bija?: string;
  className?: string;
  label?: string;
  /** the lotus's own colour; without it the rosette takes the ink around it */
  ink?: string;
  /** the figure the text sets in the pericarp */
  pericarp?: Pericarp;
  pericarpInk?: string;
  /** the letters the petals carry, one per petal, drawn when there is room */
  letters?: string[];
  decorative?: boolean;
}) {
  const drawn = Math.min(n, 48);
  const R = 46, rIn = 15, rOut = 42, w = (Math.PI * 2 * ((rIn + rOut) / 2)) / drawn / 2.6;
  const petal = `M0 ${-rIn} C ${w} ${-rIn - 6}, ${w * 0.8} ${-rOut + 6}, 0 ${-rOut} C ${-w * 0.8} ${-rOut + 6}, ${-w} ${-rIn - 6}, 0 ${-rIn} Z`;
  const stroke = ink ?? "currentColor";
  const seat = pericarpInk ?? stroke;
  const showLetters = Boolean(letters && letters.length === drawn && drawn <= 16);

  return (
    <svg
      viewBox="0 0 92 92"
      width={size}
      height={size}
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label ?? `A lotus of ${n} petals`}
      aria-hidden={decorative || undefined}
      fill="none"
      stroke={stroke}
      strokeLinejoin="round"
    >
      <g transform={`translate(${R} ${R})`}>
        {Array.from({ length: drawn }, (_, i) => (
          <path
            key={i}
            d={petal}
            transform={`rotate(${(i * 360) / drawn})`}
            fill={ink ?? "none"}
            fillOpacity={ink ? 0.14 : 0}
            strokeWidth={drawn > 24 ? 0.7 : 1.1}
            strokeOpacity={drawn > 24 ? 0.5 : 0.85}
          />
        ))}
        {showLetters &&
          letters!.map((l, i) => (
            <text
              key={l + i}
              transform={`rotate(${(i * 360) / drawn}) translate(0 ${-(rIn + rOut) / 2}) rotate(${-(i * 360) / drawn})`}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="7.5"
              className="scr scr-devanagari"
              fill={stroke}
              fillOpacity={0.8}
              stroke="none"
              lang="sa"
            >
              {l}
            </text>
          ))}
        <circle r={rIn} strokeWidth="1.1" strokeOpacity="0.7" />
        {pericarp === "square" && <rect x={-9} y={-9} width={18} height={18} stroke={seat} strokeWidth="1" strokeOpacity="0.85" fill={seat} fillOpacity="0.12" />}
        {pericarp === "crescent" && (
          <path d="M-9.4 -1.6 A9.6 9.6 0 1 0 9.4 -1.6 A7.2 7.2 0 1 1 -9.4 -1.6 Z"
                stroke={seat} strokeWidth="1" strokeOpacity="0.85" fill={seat} fillOpacity="0.12" />
        )}
        {pericarp === "triangle" && <path d="M0 9.6 L9.4 -6.4 L-9.4 -6.4 Z" stroke={seat} strokeWidth="1" strokeOpacity="0.85" fill={seat} fillOpacity="0.12" />}
        {pericarp === "hexagram" && (
          <g stroke={seat} strokeWidth="0.9" strokeOpacity="0.8" fill="none">
            <path d="M0 -10 L8.7 5 L-8.7 5 Z" />
            <path d="M0 10 L8.7 -5 L-8.7 -5 Z" />
          </g>
        )}
        {pericarp === "circle" && <circle r={9.4} stroke={seat} strokeWidth="1" strokeOpacity="0.85" fill={seat} fillOpacity="0.1" />}
        {bija && (
          <text
            y={5.5}
            textAnchor="middle"
            fontSize="13"
            className="scr scr-devanagari"
            fill={stroke}
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
