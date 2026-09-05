import { useState } from "react";

/**
 * SophianicChalice — the section's emblem, drawn rather than borrowed.
 *
 * Five parts making one argument. A star descends; its light turns fluid as it
 * enters; the cup receives it; roots carry it down into matter; something flowers
 * from the rim. The whole point is the middle term — the chalice is not passive
 * matter waiting to be filled. Its shape gathers, concentrates and directs what
 * descends, which is the section's claim about receptivity stated in one figure.
 *
 * Deliberately not a Grail. It touches the Grail, the vessel, consecration and
 * gestation without belonging to any single tradition's version of them.
 */
export function SophianicChalice() {
  const [sel, setSel] = useState<string | null>(null);

  const PARTS = [
    { k: "The star", d: "Intelligible wisdom, celestial virtue — the pattern before it has accepted any particular form. It is drawn above the cup because it does not begin as anything a vessel could hold." },
    { k: "The descent", d: "Its light becomes fluid as it falls. Abstract wisdom cannot enter a vessel as abstraction; it must become relational, nourishing, pourable. This is the moment truth changes mode without changing essence." },
    { k: "The chalice", d: "Not passive matter awaiting content. Its shape receives, gathers, concentrates and directs what descends into it — and so determines what the descending wisdom can become here, in this vessel, rather than in general." },
    { k: "The roots", d: "Downward into the material world. Sophia does not hold wisdom above matter; she carries it into soil, body, labour, consequence — the descent that § XLV says makes spirit accountable." },
    { k: "The flowering", d: "Rising from the rim. What was received and rooted returns as something the vessel could not have produced alone. Not the star again — its virtue, embodied and consequential." },
  ];

  const on = (k: string) => sel === k;
  const dim = (k: string) => (sel && sel !== k ? 0.18 : 1);
  const w = (k: string) => (on(k) ? 1.9 : 1.25);
  const o = (k: string) => (on(k) ? 1 : 0.75);
  const hit = (k: string) => ({
    style: { cursor: "pointer" },
    onClick: () => setSel(on(k) ? null : k),
    role: "button" as const,
    tabIndex: 0,
    "aria-pressed": on(k),
    "aria-label": k,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on(k) ? null : k); }
    },
  });

  const cur = PARTS.find((p) => p.k === sel);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,270px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[270px]">
        <style>{`
          .aoh-ch-fall { stroke-dasharray: 3 7; animation: aoh-ch-drop 4s linear infinite; }
          @keyframes aoh-ch-drop { to { stroke-dashoffset: -20 } }
          .aoh-ch-star { transform-origin: 120px 44px; animation: aoh-ch-breathe 6s ease-in-out infinite; }
          @keyframes aoh-ch-breathe { 0%,100% { opacity:.75 } 50% { opacity:1 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-ch-fall, .aoh-ch-star { animation: none }
          }
        `}</style>
        <svg viewBox="54 18 132 302" className="h-auto w-full" role="img" aria-labelledby="aoh-ch-t"
             fill="none" stroke="var(--gold)" strokeLinecap="round" strokeLinejoin="round">
          <title id="aoh-ch-t">
            A star descending into a chalice, its light turning fluid as it enters; roots reaching
            down from the foot into matter, and a flowering rising from the rim.
          </title>

          {/* the star — eight rays and a centre */}
          <g {...hit("The star")} opacity={dim("The star")}>
            <g className="aoh-ch-star">
            <circle cx="120" cy="44" r="3.4" fill="var(--gold)" stroke="none"
                    fillOpacity={o("The star")} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
              const r1 = 7, r2 = a % 90 === 0 ? 17 : 12;
              const rad = (a * Math.PI) / 180;
              return (
                <line key={a}
                      x1={120 + r1 * Math.cos(rad)} y1={44 + r1 * Math.sin(rad)}
                      x2={120 + r2 * Math.cos(rad)} y2={44 + r2 * Math.sin(rad)}
                      strokeWidth={w("The star")} strokeOpacity={o("The star")} />
              );
            })}
            </g>
          </g>

          {/* the descent — straight near the source, fluid as it nears the cup */}
          <g {...hit("The descent")} opacity={dim("The descent")}>
            <path className="aoh-ch-fall" d="M120 68 V96 C120 112 113 118 114 130 C115 140 118 142 120 148"
                  strokeWidth={w("The descent")} strokeOpacity={o("The descent")} />
            <path className="aoh-ch-fall" d="M108 74 C104 96 100 108 104 124 C107 136 108 142 110 148"
                  strokeWidth={on("The descent") ? 1.3 : 1} strokeOpacity={on("The descent") ? 0.8 : 0.45} />
            <path className="aoh-ch-fall" d="M132 74 C136 96 140 108 136 124 C133 136 132 142 130 148"
                  strokeWidth={on("The descent") ? 1.3 : 1} strokeOpacity={on("The descent") ? 0.8 : 0.45} />
          </g>

          {/* the flowering — rising from the rim, both sides */}
          <g {...hit("The flowering")} opacity={dim("The flowering")}>
            {[
              { s: "M82 150 C70 139 63 127 67 113", bx: 67, by: 113, dir: -1 },
              { s: "M158 150 C170 139 177 127 173 113", bx: 173, by: 113, dir: 1 },
            ].map((f) => (
              <g key={f.bx}>
                <path d={f.s} strokeWidth={w("The flowering")} strokeOpacity={o("The flowering")} />
                <circle cx={f.bx} cy={f.by} r="2.6" fill="var(--gold)" stroke="none"
                        fillOpacity={on("The flowering") ? 1 : 0.7} />
                {[-58, -18, 22].map((a) => {
                  const rad = ((a + (f.dir > 0 ? 160 : 20)) * Math.PI) / 180;
                  return (
                    <line key={a} x1={f.bx + 4 * Math.cos(rad)} y1={f.by + 4 * Math.sin(rad)}
                          x2={f.bx + 11 * Math.cos(rad)} y2={f.by + 11 * Math.sin(rad)}
                          strokeWidth={on("The flowering") ? 1.4 : 1.1}
                          strokeOpacity={on("The flowering") ? 0.95 : 0.6} />
                  );
                })}
              </g>
            ))}
          </g>

          {/* the chalice — rim, bowl, knop, stem, foot */}
          <g {...hit("The chalice")} opacity={dim("The chalice")}>
            <line x1="74" y1="150" x2="166" y2="150"
                  strokeWidth={w("The chalice")} strokeOpacity={o("The chalice")} />
            <path d="M74 150 C74 194 95 213 120 213 C145 213 166 194 166 150"
                  strokeWidth={w("The chalice")} strokeOpacity={o("The chalice")} />
            <line x1="120" y1="213" x2="120" y2="240"
                  strokeWidth={w("The chalice")} strokeOpacity={o("The chalice")} />
            <circle cx="120" cy="226" r="4.6"
                    strokeWidth={on("The chalice") ? 1.5 : 1.1} strokeOpacity={o("The chalice")} />
            <path d="M97 252 C97 243 143 243 143 252"
                  strokeWidth={w("The chalice")} strokeOpacity={o("The chalice")} />
            <line x1="93" y1="252" x2="147" y2="252"
                  strokeWidth={w("The chalice")} strokeOpacity={o("The chalice")} />
          </g>

          {/* the roots — down from the foot into matter */}
          <g {...hit("The roots")} opacity={dim("The roots")}>
            <path d="M120 252 V288" strokeWidth={w("The roots")} strokeOpacity={o("The roots")} />
            <path d="M120 264 C109 273 95 278 84 296"
                  strokeWidth={on("The roots") ? 1.5 : 1.1} strokeOpacity={on("The roots") ? 0.9 : 0.55} />
            <path d="M120 269 C132 278 146 283 157 299"
                  strokeWidth={on("The roots") ? 1.5 : 1.1} strokeOpacity={on("The roots") ? 0.9 : 0.55} />
            <path d="M120 288 C116 296 112 300 107 310"
                  strokeWidth={on("The roots") ? 1.3 : 1} strokeOpacity={on("The roots") ? 0.85 : 0.45} />
            <path d="M120 288 C125 296 129 301 134 311"
                  strokeWidth={on("The roots") ? 1.3 : 1} strokeOpacity={on("The roots") ? 0.85 : 0.45} />
            <path d="M99 283 C94 289 91 293 88 301"
                  strokeWidth={on("The roots") ? 1.1 : 0.9} strokeOpacity={on("The roots") ? 0.7 : 0.35} />
            <path d="M141 285 C146 291 149 295 152 303"
                  strokeWidth={on("The roots") ? 1.1 : 0.9} strokeOpacity={on("The roots") ? 0.7 : 0.35} />
          </g>
        </svg>
      </div>

      <div className="min-h-[13rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">{cur.k}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              A star descends, and its light becomes fluid as it enters — because abstract wisdom
              cannot be received as abstraction. Roots carry what was received down into matter; a
              flowering rises from the rim.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              And the cup is the argument. It is not passive matter awaiting content — its shape
              gathers, concentrates and directs what descends, and so decides what that wisdom can
              become here.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              It touches the Grail, the vessel, consecration and gestation without belonging to any
              one tradition&rsquo;s version of them. Select a part.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
