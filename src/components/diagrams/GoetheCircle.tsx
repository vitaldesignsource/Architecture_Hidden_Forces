import { useState } from "react";

/**
 * Goethe's Farbenkreis — six colours, three diameters.
 *
 * The one thing a drawing of this circle must get right is the apex. Goethe's
 * Purpur is not fire-red: fire-red is his Gelbrot, one step round. The apex is
 * the magenta the two intensifications both culminate in, and drawing it
 * scarlet collapses the structure — and, incidentally, is what makes the circle
 * disagree with modern colorimetry, which it otherwise agrees with rather well.
 *
 * The pairs across the diameters are not mixtures. They come from Part I: the
 * eye, shown one colour, produces the other of itself. Yellow demands violet,
 * blue demands orange, purple demands green — which is why this circle is a
 * physiological claim before it is an aesthetic one.
 */

const WEDGES = [
  { de: "Gelb", en: "yellow", hex: "#e9c93c", note: "The first colour on the plus side: light seen through the least turbidity." },
  { de: "Gelbrot", en: "yellow-red · orange", hex: "#e07b26", note: "Yellow intensified — Steigerung — as the medium thickens." },
  { de: "Purpur", en: "purple · peach-blossom · magenta", hex: "#c02a72", note: "The apex, where both intensifications arrive. Not fire-red: fire-red is Gelbrot." },
  { de: "Blaurot", en: "blue-red · violet", hex: "#7d3f9e", note: "Blue intensified, climbing toward the same apex from the minus side." },
  { de: "Blau", en: "blue", hex: "#2f5fbf", note: "The first colour on the minus side: darkness seen through a lit turbidity." },
  { de: "Grün", en: "green", hex: "#2f9e63", note: "Where yellow and blue meet at the base — and what the eye demands when shown the apex." },
];

export function GoetheCircle() {
  const [sel, setSel] = useState<number | null>(null);
  const C = 170, R_OUT = 150, R_IN = 82;
  // Yellow at the top, running the way the plate runs: the plus side down the
  // right, the minus side down the left, meeting in green at the foot.
  const angleOf = (i: number) => -90 + i * 60;
  const pt = (a: number, r: number): [number, number] => [
    C + r * Math.cos((a * Math.PI) / 180),
    C + r * Math.sin((a * Math.PI) / 180),
  ];
  const wedge = (i: number) => {
    const a0 = angleOf(i) - 30, a1 = angleOf(i) + 30;
    const [x0, y0] = pt(a0, R_OUT), [x1, y1] = pt(a1, R_OUT);
    const [x2, y2] = pt(a1, R_IN), [x3, y3] = pt(a0, R_IN);
    return `M${x0} ${y0} A${R_OUT} ${R_OUT} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${R_IN} ${R_IN} 0 0 0 ${x3} ${y3} Z`;
  };
  const opp = (i: number) => (i + 3) % 6;
  const cur = sel === null ? null : WEDGES[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <svg viewBox="0 0 340 340" className="h-auto w-full" role="img" aria-labelledby="aoh-gc-t">
          <title id="aoh-gc-t">
            Goethe&rsquo;s six-part colour circle: yellow, yellow-red, purple, blue-red, blue and
            green, with the three diameters joining each colour to the one the eye demands when
            shown it.
          </title>
          {WEDGES.map((w, i) => {
            const on = sel === i, isOpp = sel !== null && opp(sel) === i;
            const [lx, ly] = pt(angleOf(i), (R_OUT + R_IN) / 2);
            return (
              <g key={w.de} role="button" tabIndex={0} aria-label={`${w.de}, ${w.en}`}
                 className="cursor-pointer" onClick={() => setSel(on ? null : i)}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <path d={wedge(i)} fill={w.hex} fillOpacity={sel === null || on || isOpp ? 0.92 : 0.35}
                      stroke={on || isOpp ? "var(--bone)" : "var(--background)"} strokeWidth={on ? 2.4 : 1.2} />
                <text x={lx} y={ly + 3} textAnchor="middle" className="pointer-events-none font-mono"
                      fontSize="8.5" letterSpacing="0.9"
                      fill={["Gelb", "Gelbrot", "Grün"].includes(w.de) ? "#17130a" : "#f5f2ea"}>
                  {w.de.toUpperCase()}
                </text>
              </g>
            );
          })}
          {/* the three diameters: what the eye demands */}
          <g>
            {[0, 1, 2].map((i) => {
              const [x0, y0] = pt(angleOf(i), R_IN - 3);
              const [x1, y1] = pt(angleOf(i + 3), R_IN - 3);
              const lit = sel !== null && (sel % 3) === i;
              return (
                <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--bone)"
                      strokeOpacity={lit ? 0.7 : 0.22} strokeWidth={lit ? 1.4 : 0.8} strokeDasharray="3 6" />
              );
            })}
          </g>
          <circle cx={C} cy={C} r={R_IN - 8} fill="var(--background)" fillOpacity="0.9" />
          {cur ? (
            <>
              <text x={C} y={C - 8} textAnchor="middle" className="font-serif" fontSize="20" fill={cur.hex}>{cur.de}</text>
              <text x={C} y={C + 14} textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="1.2" fill="var(--muted-foreground)">
                DEMANDS
              </text>
              <text x={C} y={C + 34} textAnchor="middle" className="font-serif" fontSize="17" fill={WEDGES[opp(sel!)].hex}>
                {WEDGES[opp(sel!)].de}
              </text>
            </>
          ) : (
            <>
              <text x={C} y={C - 6} textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="2" fill="var(--gold-dim)">
                FARBENKREIS
              </text>
              <text x={C} y={C + 18} textAnchor="middle" className="font-serif" fontSize="19" fill="var(--gold)">Totalität</text>
            </>
          )}
        </svg>
      </div>

      <div>
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.en}
            </p>
            <p className="mt-3 font-serif text-3xl" style={{ color: cur.hex }}>{cur.de}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.note}</p>
            <p className="mt-5 text-sm leading-relaxed text-bone/70">
              Across the circle stands{" "}
              <span className="font-serif text-base" style={{ color: WEDGES[opp(sel!)].hex }}>
                {WEDGES[opp(sel!)].de}
              </span>
              . The pair is not a mixture: it is what the eye produces of itself when it has been
              shown one of them and the colour is taken away. Goethe puts the demand before the
              circle, and derives the circle from it.
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Six colours, and three diameters. The plus side runs yellow, yellow-red; the minus
              side blue, blue-red; and both climb to the same apex, Purpur — which is magenta and
              not fire-red, the single detail most often got wrong when this circle is redrawn.
              Green closes the ring at the foot.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/70">
              Select a colour to see what the eye demands of it.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
