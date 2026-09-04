/**
 * A seal, in the shape a Chinese seal takes: a square with a heavy border, the
 * characters inside it filling their own squares, read top to bottom and right
 * to left. Drawn in the house gold rather than in cinnabar, and captioned where
 * it is used as the borrowed convention it is.
 */
export function SealBlock({
  chars,
  size = 96,
  className = "",
  label,
}: {
  /** one to four characters; more than four will crowd */
  chars: string;
  size?: number;
  className?: string;
  label?: string;
}) {
  const list = [...chars];
  const n = list.length;
  const cols = n <= 2 ? 1 : 2;
  const rows = Math.ceil(n / cols);
  const cell = 100 / Math.max(cols, rows);
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={label ?? chars}
      lang="zh-Hant"
    >
      <rect x="4" y="4" width="112" height="112" fill="none" stroke="currentColor" strokeWidth="4.5" strokeOpacity="0.85" />
      <rect x="12" y="12" width="96" height="96" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
      {list.map((ch, i) => {
        // A seal reads down the right-hand column first.
        const col = cols === 1 ? 0 : 1 - Math.floor(i / rows);
        const row = i % rows;
        const x = 60 + (cols === 1 ? 0 : (col - 0.5) * cell);
        const y = 60 + (row - (rows - 1) / 2) * cell;
        return (
          <text
            key={i}
            x={x}
            y={y + cell * 0.34}
            textAnchor="middle"
            fontSize={cell * 0.92}
            className="scr scr-hanzi"
            fill="currentColor"
          >
            {ch}
          </text>
        );
      })}
    </svg>
  );
}
