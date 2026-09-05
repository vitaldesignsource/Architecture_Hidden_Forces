import { useState } from "react";

/**
 * Hypostases — the three Plotinian levels with the Proclan rhythm around them.
 * The core never changes size or brightness while the pulses leave it, because
 * that is the whole counter-intuitive claim of procession: the higher principle
 * causes through intelligible abundance, not material subtraction. Selecting a
 * hypostasis also names what it must NOT be identified with, which is the part
 * of the mapping most easily lost.
 */
export function Hypostases() {
  const [sel, setSel] = useState<number | null>(null);
  const [mv, setMv] = useState<number>(1);
  const C = 170;
  const H = [
    { k: "The One", r: 34,
      is: "Beyond being, form, number, and even ordinary thought — not one object among others, but the inexhaustible source from which determinate reality becomes possible.",
      not: "Root Ether",
      why: "The One is beyond every ether, force, field, substance, symbol, and distinction. Root Ether belongs to manifestation: it is the primordial condition through which forces, patterns, and qualities become transmissible." },
    { k: "Nous", r: 76,
      is: "Intellect. The realm of intelligible Being — the living unity of Forms, archetypes, and perfect relations.",
      not: "Light Ether",
      why: "Nous resembles the intelligible dimension of pattern and is not the same thing as it. The Greek hierarchy supplies an ontological architecture; the ethers describe formative operations occurring within manifested existence." },
    { k: "Soul", r: 118,
      is: "Psychē. The mediator through which intelligible order becomes movement, life, temporality, and the visible cosmos.",
      not: "Morphaithēr, or Life Ether",
      why: "Soul resembles the living mediator through which intelligible principles become cosmic and embodied activity — and it is more comprehensive than either of them." },
  ];
  const M = [
    { k: "Monē", g: "Remaining in the source",
      d: "A principle retains its identity. The One loses nothing by producing Nous, and Nous is not divided into fragments when Soul proceeds from it. Higher principles remain undiminished because they cause through intelligible abundance rather than material subtraction — a candle lighting another candle, imperfectly but usefully: the first flame does not become smaller." },
    { k: "Proodos", g: "Proceeding into expression",
      d: "Not a temporal event in which the One existed alone and later created the universe, and not a physical substance leaking downward. It is an eternal relation of dependence: every lesser unity exists because it participates in a more encompassing unity." },
    { k: "Epistrophē", g: "Returning toward the source",
      d: "Not necessarily spatial ascent, and not a rejection of matter. It is the recovery of unity, intelligibility, and orientation within multiplicity — a being returns by realising the principle it derives from and organising its life accordingly." },
  ];
  const cur = sel === null ? null : H[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[360px]">
        <style>{`
          .aoh-hy-p { transform-origin: 170px 170px; animation: aoh-hy-out 5s ease-out infinite; }
          .aoh-hy-p2 { animation-delay: 1.66s } .aoh-hy-p3 { animation-delay: 3.33s }
          @keyframes aoh-hy-out { from { transform: scale(.2); opacity:.75 } to { transform: scale(1); opacity:0 } }
          .aoh-hy-r { transform-origin: 170px 170px; animation: aoh-hy-in 5s ease-in infinite; }
          .aoh-hy-r2 { animation-delay: 2.5s }
          @keyframes aoh-hy-in { from { transform: scale(1); opacity:0 } 25%,60% { opacity:.7 } to { transform: scale(.22); opacity:0 } }
          .aoh-hy-core { animation: aoh-hy-steady 5s ease-in-out infinite; transform-origin: 170px 170px; }
          @keyframes aoh-hy-steady { 0%,100% { opacity:.92 } 50% { opacity:1 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-hy-p,.aoh-hy-r,.aoh-hy-core { animation: none } .aoh-hy-p,.aoh-hy-r { opacity:.3 }
          }
        `}</style>
        <svg viewBox="0 0 340 352" className="h-auto w-full" role="img" aria-labelledby="aoh-hy-t">
          <title id="aoh-hy-t">
            Three nested levels — the One at the centre, Nous, and Soul — with pulses proceeding
            outward and arcs returning inward while the core stays constant.
          </title>

          <circle cx={C} cy={C} r="150" fill="none" stroke="var(--gold)" strokeDasharray="1 7"
                  strokeOpacity="0.22" strokeWidth="0.8" />

          {mv !== 2 && [1, 2, 3].map((i) => (
            <circle key={i} className={`aoh-hy-p ${i === 2 ? "aoh-hy-p2" : i === 3 ? "aoh-hy-p3" : ""}`}
                    cx={C} cy={C} r="150" fill="none" stroke="var(--gold)"
                    strokeWidth={mv === 1 ? 1.4 : 0.8} strokeOpacity={mv === 1 ? 1 : 0.4} />
          ))}
          {mv !== 1 && [1, 2].map((i) => (
            <circle key={i} className={`aoh-hy-r ${i === 2 ? "aoh-hy-r2" : ""}`}
                    cx={C} cy={C} r="150" fill="none" stroke="var(--bone)"
                    strokeDasharray="3 9" strokeWidth={mv === 2 ? 1.4 : 0.8}
                    strokeOpacity={mv === 2 ? 0.9 : 0.35} />
          ))}

          {H.slice().reverse().map((h) => {
            const i = H.indexOf(h);
            const on = sel === i;
            return (
              <g key={h.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={h.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={C} cy={C} r={h.r} fill="var(--void)" fillOpacity={i === 0 ? 1 : 0.55}
                        stroke="var(--gold)" strokeOpacity={on ? 1 : sel === null ? 0.6 : 0.25}
                        strokeWidth={on ? 2 : 1.1} />
                <text x={C} y={C - h.r + 15} textAnchor="middle" className="font-label"
                      fontSize="8" letterSpacing="1.5"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel === null || on ? 1 : 0.35}>
                  {h.k.toUpperCase()}
                </text>
              </g>
            );
          })}
          <circle className="aoh-hy-core" cx={C} cy={C} r="13" fill="var(--gold)" />

          <text x={C} y="342" textAnchor="middle" className="font-label" fontSize="7.5" letterSpacing="1.5"
                fill="var(--muted-foreground)">
            THE CORE NEVER DIMINISHES
          </text>
        </svg>

        <div className="mt-3 flex justify-center gap-2">
          {M.map((m, i) => (
            <button key={m.k} onClick={() => setMv(i)} aria-pressed={mv === i}
              className={`border px-2.5 py-1.5 font-label text-[10px] uppercase tracking-[0.1em] transition-colors ${
                mv === i ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/60"}`}>
              {m.k}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-bone/55">
          {M[mv].g}
        </p>
      </div>

      <div className="min-h-[17rem]">
        <div className="flex flex-wrap gap-2">
          {H.map((h, i) => (
            <button key={h.k} onClick={() => setSel(sel === i ? null : i)} aria-pressed={sel === i}
              className={`border px-3 py-1.5 text-xs transition-colors ${
                sel === i ? "border-gold text-gold"
                          : "border-border text-muted-foreground hover:border-gold/60 hover:text-bone/80"}`}>
              {h.k}
            </button>
          ))}
        </div>
        {cur ? (
          <>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{cur.is}</p>
            <div className="mt-6 border-l-2 border-bone/40 pl-5">
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-bone/70">
                Not to be identified with — {cur.not}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cur.why}</p>
            </div>
          </>
        ) : (
          <>
            <p className="mt-6 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {M[mv].k} — {M[mv].g}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{M[mv].d}</p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Procession without return produces dispersion. Return without procession becomes
              sterile transcendence. The complete rhythm is source, expression, integration.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * DaimonicChain — the descent from divine virtue to embodied consequence, with
 * the feedback the document insists on: consequence returns to CHARACTER, not to
 * the source. So the loop closes partway up the chain rather than reversing the
 * whole of it, which is what separates a governing attractor from a puppet master.
 */
