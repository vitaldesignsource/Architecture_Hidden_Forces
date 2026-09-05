export function TreeOfLife({
  active = null,
  onSelect,
}: {
  active?: string | null;
  onSelect?: (tr: string) => void;
} = {}) {
  // Portrait canvas, 300 × 660. Pillar of Mercy on the right AS DEPICTED.
  const MID = 150;
  const RIGHT = 248; // Pillar of Mercy    — Chochmah · Chesed · Netzach
  const LEFT = 52; //  Pillar of Severity  — Binah · Gevurah · Hod
  const R_NODE = 20;
  const R_HALO = 34;

  // Flash-arrival time per sefirah, in seconds. Derived from cumulative arc length
  // along the flash polyline (total 1401.36u) inverted through the animation's own
  // cubic-bezier(0.65,0,0.35,1), scaled to the 8.8s draw (the 55% keyframe).
  // Previously these were index-linear (0.5 + i*0.85), which made six of ten vessels
  // ignite BEFORE the light reached them — up to 1.21s early at Binah.
  const IGNITE_AT = [0.0, 2.42, 3.41, 4.06, 4.5, 4.78, 5.11, 5.86, 6.71, 8.8];

  // The same stacks the site sets its serif and its labels in, as the real
  // custom properties styles.css declares on :root — so the tree's Hebrew
  // resolves to the same face as the byte-identical Hebrew in the cards beside it.
  const SERIF = "var(--serif-face)";
  const MONO = "var(--label-face)";

  type Sefirah = {
    id: string;
    rn: string;
    he: string;
    tr: string;
    en: string;
    x: number;
    y: number;
  };

  const nodes: Sefirah[] = [
    { id: "1", rn: "I", he: "כֶּתֶר", tr: "KETER", en: "Crown", x: MID, y: 68 },
    { id: "2", rn: "II", he: "חָכְמָה", tr: "CHOCHMAH", en: "Wisdom", x: RIGHT, y: 148 },
    { id: "3", rn: "III", he: "בִּינָה", tr: "BINAH", en: "Understanding", x: LEFT, y: 148 },
    { id: "4", rn: "IV", he: "חֶסֶד", tr: "CHESED", en: "Mercy", x: RIGHT, y: 262 },
    { id: "5", rn: "V", he: "גְּבוּרָה", tr: "GEVURAH", en: "Severity", x: LEFT, y: 262 },
    { id: "6", rn: "VI", he: "תִּפְאֶרֶת", tr: "TIFERET", en: "Beauty", x: MID, y: 336 },
    { id: "7", rn: "VII", he: "נֶצַח", tr: "NETZACH", en: "Victory", x: RIGHT, y: 416 },
    { id: "8", rn: "VIII", he: "הוֹד", tr: "HOD", en: "Glory", x: LEFT, y: 416 },
    { id: "9", rn: "IX", he: "יְסוֹד", tr: "YESOD", en: "Foundation", x: MID, y: 490 },
    { id: "10", rn: "X", he: "מַלְכוּת", tr: "MALCHUT", en: "Kingdom", x: MID, y: 578 },
  ];

  // The 22 paths of the traditional (Kircher) Tree — Aleph through Tav.
  const paths: [string, string][] = [
    ["1", "2"], ["1", "3"], ["1", "6"], ["2", "3"], ["2", "4"], ["2", "6"],
    ["3", "5"], ["3", "6"], ["4", "5"], ["4", "6"], ["4", "7"], ["5", "6"],
    ["5", "8"], ["6", "7"], ["6", "8"], ["6", "9"], ["7", "8"], ["7", "9"],
    ["7", "10"], ["8", "9"], ["8", "10"], ["9", "10"],
  ];

  const find = (id: string) => nodes.find((n) => n.id === id)!;
  // Da'at sits in the Abyss on the middle pillar. y=182, not the geometric
  // midpoint 205: the flash's Binah->Chesed segment crosses x=150 at y=205, so
  // at 205 a 5px animated glow bisected the ring (clearance 0.86u). Perpendicular
  // clearance needs > 18.5u (r16 + half the 5px glow); y=182 gives 19.88u.
  const daat = { x: MID, y: 182 };

  // The lightning flash — the order of emanation, Keter down to Malchut.
  const flash = nodes.map((n) => `${n.x},${n.y}`).join(" ");

  // Three veils of negative existence, arcing above the Crown.
  const veil = (r: number) => {
    const k = find("1");
    const dx = r * Math.cos(Math.PI / 12);
    const dy = r * Math.sin(Math.PI / 12);
    return `M ${(k.x - dx).toFixed(2)} ${(k.y - dy).toFixed(2)} A ${r} ${r} 0 0 1 ${(k.x + dx).toFixed(2)} ${(k.y - dy).toFixed(2)}`;
  };

  const css = `
.aolt-svg text { paint-order: stroke; stroke-linejoin: round; }
@keyframes aolt-descend {
  0%   { stroke-dashoffset: 1000; opacity: 0; }
  5%   { opacity: 1; }
  55%  { stroke-dashoffset: 0; opacity: 1; }
  82%  { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
@keyframes aolt-ignite {
  0%   { opacity: 0; }
  4%   { opacity: 1; }
  22%  { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes aolt-pulse {
  0%, 100% { stroke-opacity: 0.20; }
  50%      { stroke-opacity: 0.52; }
}
.aolt-descent { animation: aolt-descend 16s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
.aolt-path    { animation: aolt-pulse 16s ease-in-out infinite; }
.aolt-ignite  { animation: aolt-ignite 16s ease-in-out infinite; }
.aolt-node    { transition: opacity 700ms ease; }
.aolt-sel     { transition: stroke-opacity 350ms ease; }
.aolt-node.is-sel .aolt-sel { stroke-opacity: 0.9; }
.aolt-svg:hover .aolt-node.is-sel { opacity: 1; }
@media (hover: hover) and (pointer: fine) {
  .aolt-svg:hover .aolt-node { opacity: 0.45; }
  .aolt-svg .aolt-node:hover { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .aolt-svg .aolt-descent { animation: none; stroke-dashoffset: 0; opacity: 0.55; }
  .aolt-svg .aolt-path { animation: none; stroke-opacity: 0.32; }
  .aolt-svg .aolt-ignite { animation: none; opacity: 0; }
  .aolt-svg .animate-breathe { animation: none; opacity: 0.5; }
  .aolt-svg .aolt-node { transition: none; }
}
`;

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <style>{css}</style>
      <svg
        viewBox="0 0 300 660"
        className="aolt-svg h-auto w-full"
        role="img"
        aria-labelledby="aolt-title aolt-desc"
      >
        <title id="aolt-title">עֵץ הַחַיִּים — the Kabbalistic Tree of Life</title>
        <desc id="aolt-desc">
          The Kabbalistic Tree of Life. Ten sefirot on three pillars, joined by the
          twenty-two paths. The Pillar of Severity on the left carries Binah
          (Understanding), Gevurah (Severity) and Hod (Glory). The Pillar of Mercy on the
          right carries Chochmah (Wisdom), Chesed (Mercy) and Netzach (Victory). The middle
          Pillar of Equilibrium carries Keter (Crown), Tiferet (Beauty), Yesod (Foundation)
          and Malchut (Kingdom). Above the Crown, three arcs figure the veils of negative
          existence — Ain, Ain Soph, Ain Soph Aur. A dashed horizontal marks the Abyss,
          which separates the supernal triad from the seven below it. On the middle pillar
          within the Abyss, Da&apos;at (Knowledge) is drawn hollow and unconnected by any
          path, because it is not a sefirah. The lightning flash traces the order of
          emanation from Keter down to Malchut, and each vessel kindles as the light
          reaches it.
        </desc>

        <defs>
          <radialGradient id="aolt-halo">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.30" />
            <stop offset="45%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.10" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aolt-core" cx="50%" cy="36%" r="72%">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.14" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aolt-crown">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.16" />
            <stop offset="60%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.04" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="aolt-flash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--bone)" }} />
            <stop offset="30%" style={{ stopColor: "var(--gold)" }} />
            <stop offset="100%" style={{ stopColor: "var(--gold-dim)" }} />
          </linearGradient>
        </defs>

        {/* The light beyond the veils. cy must be >= ry or the falloff is cut by the
            top of the viewBox, leaving a hard horizontal edge on flat black.
            (Ein Sof itself is named among the three veils below, not here.) */}
        <ellipse cx={MID} cy="54" rx="96" ry="54" fill="url(#aolt-crown)" />

        {/* Three veils of negative existence */}
        {/* Ain, Ain Soph, Ain Soph Aur — graded outward, the outer more hidden.
            0.9 not 0.5: at 340px, 0.5u = 0.57 CSS px and antialiasing halves it. */}
        <g fill="none" stroke="var(--gold)" strokeWidth="0.9" strokeLinecap="round">
          {[42, 52, 62].map((r, i) => (
            <path
              key={r}
              d={veil(r)}
              strokeOpacity={[0.62, 0.44, 0.28][i]}
              strokeDasharray={i === 0 ? undefined : "3 5"}
              className="animate-breathe"
              style={{ animationDelay: `-${i * 2.6}s` }}
            />
          ))}
        </g>

        {/* The Abyss */}
        <line
          x1="18"
          y1={daat.y}
          x2="282"
          y2={daat.y}
          stroke="var(--gold-dim)"
          strokeOpacity="0.45"
          strokeWidth="0.9"
          strokeDasharray="2 5"
        />

        {/* The twenty-two paths */}
        <g>
          {paths.map(([a, b], i) => {
            const A = find(a);
            const B = find(b);
            return (
              <g key={`aolt-p-${i}`}>
                <line
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="var(--gold)"
                  strokeOpacity="0.05"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <line
                  className="aolt-path"
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="var(--gold-dim)"
                  strokeWidth="0.7"
                  strokeOpacity="0.26"
                  style={{ animationDelay: `${(i * 0.6 - 12.6).toFixed(2)}s` }}
                />
              </g>
            );
          })}
        </g>

        {/* Lightning flash of descent */}
        <g fill="none" strokeLinejoin="round" strokeLinecap="round">
          <polyline points={flash} stroke="var(--gold-dim)" strokeOpacity="0.2" strokeWidth="0.8" />
          <polyline
            className="aolt-descent"
            points={flash}
            pathLength={1000}
            strokeDasharray="1000"
            stroke="var(--gold)"
            strokeOpacity="0.16"
            strokeWidth="5"
            opacity="0"
          />
          <polyline
            className="aolt-descent"
            points={flash}
            pathLength={1000}
            strokeDasharray="1000"
            stroke="url(#aolt-flash)"
            strokeOpacity="0.85"
            strokeWidth="1.4"
            opacity="0"
          />
        </g>

        {/* Da'at — knowledge; shown hollow, not a sefirah */}
        <g>
          <title>Da&apos;at · Knowledge — not a sefirah</title>
          <circle
            cx={daat.x}
            cy={daat.y}
            r="16"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeOpacity="0.5"
            strokeWidth="0.6"
            strokeDasharray="2 4"
          />
          <text
            x={daat.x}
            y={daat.y + 31}
            textAnchor="middle"
            fontFamily={SERIF}
            fontSize="10.5"
            fill="var(--muted-foreground)"
            stroke="var(--void)"
            strokeWidth="2"
          >
            דַּעַת
          </text>
          <text
            x={daat.x}
            y={daat.y + 45}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="8"
            letterSpacing="1.3"
            fill="var(--muted-foreground)"
            fillOpacity="0.75"
            stroke="var(--void)"
            strokeWidth="1.8"
          >
            DA&apos;AT
          </text>
        </g>

        {/* The ten sefirot */}
        {nodes.map((n, i) => {
          const ignite = `${IGNITE_AT[i]}s`;
          return (
            <g
              className={`aolt-node${active === n.tr ? " is-sel" : ""}`}
              key={n.id}
              onClick={onSelect ? () => onSelect(n.tr) : undefined}
              role={onSelect ? "button" : undefined}
              tabIndex={onSelect ? 0 : undefined}
              aria-pressed={onSelect ? active === n.tr : undefined}
              onKeyDown={
                onSelect
                  ? (ev) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        onSelect(n.tr);
                      }
                    }
                  : undefined
              }
              style={onSelect ? { cursor: "pointer" } : undefined}
            >
              <title>{`${n.rn} · ${n.tr} · ${n.en}`}</title>
              <circle
                className="aolt-sel"
                cx={n.x}
                cy={n.y}
                r={R_NODE + 9}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1"
                strokeOpacity="0"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_HALO}
                fill="url(#aolt-halo)"
                className="animate-breathe"
                style={{ animationDelay: `-${(i * 0.9).toFixed(2)}s` }}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_HALO}
                fill="url(#aolt-halo)"
                className="aolt-ignite"
                opacity="0"
                style={{ animationDelay: ignite }}
              />
              <circle cx={n.x} cy={n.y} r={R_NODE} fill="var(--void)" />
              <circle cx={n.x} cy={n.y} r={R_NODE} fill="url(#aolt-core)" />
              {n.id === "10" && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={R_NODE + 5.5}
                  fill="none"
                  stroke="var(--gold)"
                  strokeOpacity="0.22"
                  strokeWidth="0.5"
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={R_NODE}
                fill="none"
                stroke="var(--gold)"
                strokeOpacity="0.62"
                strokeWidth="0.9"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_NODE - 5.5}
                fill="none"
                stroke="var(--gold-dim)"
                strokeOpacity="0.3"
                strokeWidth="0.5"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_NODE}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1.4"
                className="aolt-ignite"
                opacity="0"
                style={{ animationDelay: ignite }}
              />
              <text
                x={n.x}
                y={n.y + 3}
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="9.5"
                letterSpacing="0.6"
                fill="var(--gold-dim)"
              >
                {n.rn}
              </text>
              <text
                x={n.x}
                y={n.y + 32}
                textAnchor="middle"
                fontFamily={SERIF}
                fontSize="12"
                fill="var(--gold)"
                fillOpacity="0.95"
                stroke="var(--void)"
                strokeWidth="2.2"
              >
                {n.he}
              </text>
              <text
                x={n.x}
                y={n.y + 47}
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="9"
                letterSpacing="1.3"
                fill="var(--muted-foreground)"
                stroke="var(--void)"
                strokeWidth="2"
              >
                {n.tr}
              </text>
            </g>
          );
        })}

        {/* The three pillars */}
        <g
          fontFamily={MONO}
          fontSize="9"
          letterSpacing="1.4"
          textAnchor="middle"
          fill="var(--gold-dim)"
          fillOpacity="0.75"
        >
          <text x={LEFT} y="644">SEVERITY</text>
          <text x={MID} y="644">EQUILIBRIUM</text>
          <text x={RIGHT} y="644">MERCY</text>
        </g>
      </svg>
    </div>
  );
}

/**
 * useActiveSection — which section the reader is actually in.
 * A thin detector band near the top of the viewport; whichever observed section
 * occupies it wins, resolved in document order so overlaps are deterministic.
 */
