import { useState } from "react";

/**
 * MorphaithericField — the eight behaviours of the field, drawn in one terrain.
 *
 * The section's governing correction is that Morphaithēr is closer to an
 * ecosystem than to a fluid: not one more substance beside the others but the
 * pattern of their relations. So this is a landscape with features rather than a
 * diagram of a thing — a current running through it, a tide at its edge, a
 * gradient across it, a reservoir held in it, a vortex recruiting from it, a
 * standing pattern letting it pass, a scar it did not lose, and a threshold
 * where its accumulation turns into something else.
 */
export function MorphaithericField() {
  const [sel, setSel] = useState<string | null>(null);

  const F = [
    { k: "Current", at: [96, 78],
      d: "Sustained directional movement. Desire, collective attention, inherited practice, or environmental pressure can each raise one." },
    { k: "Tide", at: [40, 148],
      d: "A recurrent alteration in receptivity, intensity, or tattvic composition — daily, lunar, seasonal, bodily, ritual." },
    { k: "Gradient", at: [176, 60],
      d: "A difference between regions. Force moves or forms differently because one area is more receptive, saturated, coherent, or resistant than its neighbour." },
    { k: "Reservoir", at: [268, 96],
      d: "Accumulated formative capacity held in a body, place, symbol, institution, or repeated practice. Not stored energy — retained readiness for a pattern to reappear." },
    { k: "Vortex", at: [214, 168],
      d: "A self-reinforcing pattern drawing new force into its own circulation. Psychic complexes, egregores, and collective identities behave this way." },
    { k: "Standing pattern", at: [124, 196],
      d: "A recurrence stable enough to keep its organisation while currents pass through it. Living bodies, habits, institutions, consecrated places." },
    { k: "Scar", at: [60, 226],
      d: "A persistent alteration left after the event has ended. The field holds no replica of what happened — it holds changed tendencies." },
    { k: "Threshold", at: [282, 214],
      d: "Where accumulated conditions turn qualitative. Possibility becomes activity, activity becomes recurrence, recurrence becomes stable form." },
  ];

  const on = (k: string) => sel === k;
  const dim = (k: string) => (sel && sel !== k ? 0.16 : 1);
  const cur = F.find((f) => f.k === sel);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-mf-flow { stroke-dasharray: 5 8; animation: aoh-mf-run 3.4s linear infinite; }
          .aoh-mf-tide { animation: aoh-mf-swell 5s ease-in-out infinite; transform-origin: 54px 166px; }
          .aoh-mf-spin { animation: aoh-mf-turn 9s linear infinite; transform-origin: 238px 168px; }
          @keyframes aoh-mf-run { to { stroke-dashoffset: -26 } }
          @keyframes aoh-mf-swell { 0%,100% { opacity:.45 } 50% { opacity:1 } }
          @keyframes aoh-mf-turn { to { transform: rotate(360deg) } }
          .aoh-mf-h { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) {
            .aoh-mf-flow,.aoh-mf-tide,.aoh-mf-spin { animation: none }
          }
        `}</style>
        <svg viewBox="0 0 320 300" className="h-auto w-full" role="img" aria-labelledby="aoh-mf-t">
          <title id="aoh-mf-t">
            One field carrying eight behaviours at once — a current, a tide, a gradient, a reservoir,
            a vortex, a standing pattern, a scar, and a threshold.
          </title>

          <defs>
            <linearGradient id="aoh-mf-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.015" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.13" />
            </linearGradient>
          </defs>

          <rect x="14" y="14" width="292" height="258" fill="none" stroke="var(--gold)"
                strokeOpacity="0.14" strokeWidth="0.8" />

          {/* current — sustained direction across the field */}
          <g opacity={dim("Current")} className="aoh-mf-h" onClick={() => setSel(on("Current") ? null : "Current")}
             role="button" tabIndex={0} aria-pressed={on("Current")} aria-label="Current"
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on("Current") ? null : "Current"); } }}>
            <path className="aoh-mf-flow" d="M26 64 C78 46 148 78 208 60 C248 48 274 60 294 56"
                  fill="none" stroke="var(--gold)" strokeOpacity={on("Current") ? 1 : 0.6}
                  strokeWidth={on("Current") ? 1.8 : 1.2} />
            <text x="30" y="44" className="font-mono" fontSize="6.6" letterSpacing="1"
                  fill={on("Current") ? "var(--gold)" : "var(--muted-foreground)"}>CURRENT</text>
          </g>

          {/* gradient — one region differing from its neighbour */}
          <g opacity={dim("Gradient")} className="aoh-mf-h" onClick={() => setSel(on("Gradient") ? null : "Gradient")}
             role="button" tabIndex={0} aria-pressed={on("Gradient")} aria-label="Gradient"
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on("Gradient") ? null : "Gradient"); } }}>
            <rect x="26" y="90" width="116" height="34" fill="url(#aoh-mf-grad)"
                  stroke="var(--gold)" strokeOpacity={on("Gradient") ? 0.55 : 0.16} strokeWidth="0.7" />
            <text x="30" y="84" className="font-mono" fontSize="6.6" letterSpacing="1"
                  fill={on("Gradient") ? "var(--gold)" : "var(--muted-foreground)"}>GRADIENT</text>
          </g>

          {/* reservoir — retained readiness */}
          <g opacity={dim("Reservoir")} className="aoh-mf-h" onClick={() => setSel(on("Reservoir") ? null : "Reservoir")}
             role="button" tabIndex={0} aria-pressed={on("Reservoir")} aria-label="Reservoir"
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on("Reservoir") ? null : "Reservoir"); } }}>
            <path d="M210 94 a26 17 0 0 0 52 0" fill="var(--gold)"
                  fillOpacity={on("Reservoir") ? 0.3 : 0.12} stroke="var(--gold)"
                  strokeOpacity={on("Reservoir") ? 1 : 0.5} strokeWidth="1.1" />
            <text x="236" y="86" textAnchor="middle" className="font-mono" fontSize="6.6" letterSpacing="1"
                  fill={on("Reservoir") ? "var(--gold)" : "var(--muted-foreground)"}>RESERVOIR</text>
          </g>

          {/* tide — recurrent swell at the edge */}
          <g opacity={dim("Tide")} className="aoh-mf-h" onClick={() => setSel(on("Tide") ? null : "Tide")}
             role="button" tabIndex={0} aria-pressed={on("Tide")} aria-label="Tide"
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on("Tide") ? null : "Tide"); } }}>
            <path className="aoh-mf-tide" d="M26 152 q14 -10 28 0 t28 0 M26 166 q14 -10 28 0 t28 0 M26 180 q14 -10 28 0 t28 0"
                  fill="none" stroke="var(--gold)" strokeOpacity={on("Tide") ? 1 : 0.55} strokeWidth="1.1" />
            <text x="26" y="142" className="font-mono" fontSize="6.6" letterSpacing="1"
                  fill={on("Tide") ? "var(--gold)" : "var(--muted-foreground)"}>TIDE</text>
          </g>

          {/* vortex — recruits what passes */}
          <g opacity={dim("Vortex")} className="aoh-mf-h" onClick={() => setSel(on("Vortex") ? null : "Vortex")}
             role="button" tabIndex={0} aria-pressed={on("Vortex")} aria-label="Vortex"
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on("Vortex") ? null : "Vortex"); } }}>
            <path className="aoh-mf-spin"
                  d="M238 146 a22 22 0 1 1 -16 37 a15 15 0 1 0 11 -26 a8.5 8.5 0 1 1 -6 15"
                  fill="none" stroke="var(--gold)" strokeOpacity={on("Vortex") ? 1 : 0.6}
                  strokeWidth={on("Vortex") ? 1.6 : 1.1} />
            <text x="238" y="200" textAnchor="middle" className="font-mono" fontSize="6.6" letterSpacing="1"
                  fill={on("Vortex") ? "var(--gold)" : "var(--muted-foreground)"}>VORTEX</text>
          </g>

          {/* standing pattern — holds while the field passes through */}
          <g opacity={dim("Standing pattern")} className="aoh-mf-h" onClick={() => setSel(on("Standing pattern") ? null : "Standing pattern")}
             role="button" tabIndex={0} aria-pressed={on("Standing pattern")} aria-label="Standing pattern"
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on("Standing pattern") ? null : "Standing pattern"); } }}>
            <path className="aoh-mf-flow" d="M78 212 h72" stroke="var(--gold)"
                  strokeOpacity={on("Standing pattern") ? 0.9 : 0.4} strokeWidth="1" fill="none" />
            <circle cx="114" cy="212" r="18" fill="var(--void)" stroke="var(--gold)"
                    strokeOpacity={on("Standing pattern") ? 1 : 0.65}
                    strokeWidth={on("Standing pattern") ? 1.7 : 1.2} />
            <text x="114" y="242" textAnchor="middle" className="font-mono" fontSize="6.4" letterSpacing="1"
                  fill={on("Standing pattern") ? "var(--gold)" : "var(--muted-foreground)"}>STANDING</text>
          </g>

          {/* threshold — where accumulation turns */}
          <g opacity={dim("Threshold")} className="aoh-mf-h" onClick={() => setSel(on("Threshold") ? null : "Threshold")}
             role="button" tabIndex={0} aria-pressed={on("Threshold")} aria-label="Threshold"
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on("Threshold") ? null : "Threshold"); } }}>
            <line x1="246" y1="222" x2="246" y2="262" stroke="var(--gold)"
                  strokeOpacity={on("Threshold") ? 1 : 0.5} strokeDasharray="4 4" strokeWidth="1.2" />
            <circle cx="246" cy="242" r={on("Threshold") ? 5 : 3.5} fill="var(--gold)"
                    fillOpacity={on("Threshold") ? 1 : 0.6} />
            <text x="246" y="216" textAnchor="middle" className="font-mono" fontSize="6.4" letterSpacing="1"
                  fill={on("Threshold") ? "var(--gold)" : "var(--muted-foreground)"}>THRESHOLD</text>
          </g>

          {/* scar — what the field kept */}
          <g opacity={dim("Scar")} className="aoh-mf-h" onClick={() => setSel(on("Scar") ? null : "Scar")}
             role="button" tabIndex={0} aria-pressed={on("Scar")} aria-label="Scar"
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on("Scar") ? null : "Scar"); } }}>
            <path d="M28 260 q20 -13 38 -3 t34 -5" fill="none" stroke="var(--bone)"
                  strokeOpacity={on("Scar") ? 0.9 : 0.4} strokeDasharray="1 5" strokeWidth="1.5" />
            <text x="28" y="250" className="font-mono" fontSize="6.6" letterSpacing="1"
                  fill={on("Scar") ? "var(--gold)" : "var(--muted-foreground)"}>SCAR</text>
          </g>
        </svg>
      </div>

      <div className="min-h-[14rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">{cur.k}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              A metaphysical model, not fluid mechanics. Whether the word is meant literally or
              analogically has to be stated each time it is used.
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Eight behaviours in one field, because Morphaithēr is closer to an ecosystem than to a
              fluid. An ecosystem is not one further organism standing beside its plants and animals
              — it is the living pattern of their relations, circulations, constraints, and
              dependencies.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Which is why this is not a sixth ether added above the Root Ether and the Fourfold
              Veil. <span className="text-bone/90">It is the changing atmosphere carried through
              them.</span>
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select any feature for what it names.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
