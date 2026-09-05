import { useState } from "react";

/**
 * HekaAndMaat — efficacy and rightness as two axes, not one.
 *
 * The section's decisive move is separating them: heka is the power to make a
 * pattern operative, ma'at the measure of whether that pattern belongs in the
 * order of the whole. A single scale would let one substitute for the other,
 * which is exactly the error the section exists to refuse — so the figure gives
 * them perpendicular axes and lets the cases fall where they fall.
 *
 * The lower-right quadrant is the one that matters. Everything there works.
 */
export function HekaAndMaat() {
  const [sel, setSel] = useState<number | null>(null);
  const X0 = 62, X1 = 302, Y0 = 286, Y1 = 42;
  const px = (e: number) => X0 + e * (X1 - X0);
  const py = (m: number) => Y0 + m * (Y1 - Y0);

  // e = how operative it is; m = how far it holds right relation
  const CASES = [
    { k: "Fulfilled operation", e: 0.84, m: 0.86,
      d: "The source is properly identified, the intention proportionate, the intermediaries faithful, the vessel able to receive, and the consequence serves the surrounding field rather than consuming it.",
      q: "Both axes at once — which is the only place the architecture calls the work complete." },
    { k: "A symbol that intensifies hatred", e: 0.82, m: 0.14,
      d: "Names, images, repetition and collective attention gathered into powerful formative inertia, aimed at a distorted purpose.",
      q: "Operative force is genuinely present. That is precisely why it is dangerous." },
    { k: "A rite preserving an institution that has lost its virtue", e: 0.7, m: 0.2,
      d: "The sequence still works. It still produces cohesion, authority and continuity. What it no longer carries is the virtue that justified it.",
      q: "Succeeding at the wrong level is still succeeding — which is what makes it hard to see." },
    { k: "Intensity without transformation", e: 0.46, m: 0.5,
      d: "The rite produces feeling, conviction, sometimes conviction of having changed. Behaviour, relationship and material life are untouched.",
      q: "An effect was produced. It did not reach the level intended." },
    { k: "An amulet that only produces confidence", e: 0.34, m: 0.44,
      d: "The wearer is steadied while the danger it was made against remains exactly as it was.",
      q: "A real effect on the vessel, and none on the condition." },
    { k: "A correct formula, emptily spoken", e: 0.14, m: 0.6,
      d: "The pronunciation is right and the name is right. Knowledge, preparation and relation are absent, so the name is an acoustic shell.",
      q: "The name does not work as a password works. It establishes a relationship, or nothing." },
    { k: "Ma'at without heka", e: 0.12, m: 0.88,
      d: "Truth, balance and proportion held as an ideal, with no means to defend, restore or embody itself.",
      q: "Right without power is not innocent. It is simply unable to act." },
  ];

  const cur = sel === null ? null : CASES[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,344px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[344px]">
        <svg viewBox="0 0 344 340" className="h-auto w-full" role="img" aria-labelledby="aoh-hm-t">
          <title id="aoh-hm-t">
            Cases plotted against two axes — how operative an act is, and how far it holds right
            relation. The two are independent.
          </title>

          {/* quadrants */}
          <line x1={px(0.5)} y1={Y1} x2={px(0.5)} y2={Y0} stroke="var(--gold)"
                strokeOpacity="0.14" strokeDasharray="3 6" strokeWidth="0.8" />
          <line x1={X0} y1={py(0.5)} x2={X1} y2={py(0.5)} stroke="var(--gold)"
                strokeOpacity="0.14" strokeDasharray="3 6" strokeWidth="0.8" />
          <rect x={px(0.5)} y={Y1} width={X1 - px(0.5)} height={py(0.5) - Y1}
                fill="var(--gold)" fillOpacity="0.035" />

          {/* axes */}
          <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="var(--gold)" strokeOpacity="0.45" strokeWidth="1" />
          <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke="var(--gold)" strokeOpacity="0.45" strokeWidth="1" />
          {/* the axes carry their own arrowheads; the label face has no arrow glyph */}
          <path d={`M${X1 - 5} ${Y0 - 3} L${X1} ${Y0} L${X1 - 5} ${Y0 + 3}`} fill="none" stroke="var(--gold)" strokeOpacity="0.45" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M${X0 - 3} ${Y1 + 5} L${X0} ${Y1} L${X0 + 3} ${Y1 + 5}`} fill="none" stroke="var(--gold)" strokeOpacity="0.45" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <text x={X1} y={Y0 + 16} textAnchor="end" className="font-label" fontSize="6.6"
                letterSpacing="1" fill="var(--gold)" opacity="0.85">HEKA — OPERATIVE</text>
          <text x={X0 - 6} y={Y1 - 8} textAnchor="start" className="font-label" fontSize="6.6"
                letterSpacing="1" fill="var(--gold)" opacity="0.85">MA&rsquo;AT — IN RIGHT ORDER</text>

          {[
            { x: 0.75, y: 0.93, t: "FULFILLED" },
            { x: 0.75, y: 0.07, t: "POWER WITHOUT MEASURE" },
            { x: 0.25, y: 0.93, t: "MEASURE WITHOUT MEANS" },
            { x: 0.25, y: 0.07, t: "INERT" },
          ].map((q) => (
            <text key={q.t} x={px(q.x)} y={py(q.y)} textAnchor="middle" className="font-label"
                  fontSize="5.9" letterSpacing="0.9" fill="var(--muted-foreground)" opacity="0.6">
              {q.t}
            </text>
          ))}

          {CASES.map((c, i) => {
            const on = sel === i;
            const good = c.m >= 0.5;
            return (
              <g key={c.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={c.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={px(c.e)} cy={py(c.m)} r={on ? 12 : 9} fill="var(--void)"
                        stroke={good ? "var(--gold)" : "var(--bone)"}
                        strokeOpacity={on ? 1 : sel !== null ? 0.22 : 0.7}
                        strokeDasharray={good ? "none" : "4 3"}
                        strokeWidth={on ? 1.8 : 1.1} />
                <text x={px(c.e)} y={py(c.m) + 3} textAnchor="middle" className="font-label"
                      fontSize="7.4" fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel !== null && !on ? 0.3 : 1}>{i + 1}</text>
              </g>
            );
          })}

          <text x="172" y="332" textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            EFFECTIVE AND RIGHTFUL ARE NOT THE SAME AXIS
          </text>
        </svg>
      </div>

      <div className="min-h-[15rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {sel! + 1} · {cur.k}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-6 border-l-2 border-gold/40 pl-5 font-serif text-lg leading-relaxed text-bone/85">
              {cur.q}
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Heka is the power to make a pattern operative. Ma&rsquo;at is the measure of whether
              that pattern belongs in the order of the whole. Collapsing them into one scale is what
              lets efficacy pass itself off as warrant — so they are drawn perpendicular, and the
              cases fall where they fall.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              The lower right is the quadrant that matters. Everything there works.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Heka without Ma&rsquo;at becomes manipulation, coercion, or power detached from
              responsibility. Ma&rsquo;at without heka remains an ideal with no means to defend,
              restore or embody itself. Right operation needs both axes.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select a case. Solid rings hold right relation; dashed ones do not.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
