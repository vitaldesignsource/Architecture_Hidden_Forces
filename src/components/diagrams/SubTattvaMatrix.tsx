import { useState } from "react";
import { TATTVAS, TATTVA_LEGEND, TATTVA_ORDER, TattvaGlyph, tattvaLabel } from "./TattvaGlyph";

/**
 * SubTattvaMatrix — the twenty-five as something you operate rather than read.
 * Selecting a cell names the compound; Swap jumps to its transpose, which is the
 * fastest way to feel that Apas-Tejas and Tejas-Apas are not the same thing.
 * Each cell now carries the compound's glyph — the small form of the modifier
 * inside the large form of the dominant, in their own colours, as the Golden
 * Dawn's cards drew them — so the transpose is visible before it is read. The
 * diagonal shows the plain form: the element in itself, as the cards' plain
 * card did.
 */
export function SubTattvaMatrix() {
  const K = TATTVA_ORDER;
  const T = K.map((k) => TATTVAS[k].name);
  const ABBR = ["Ak", "Va", "Te", "Ap", "Pr"];
  const M = [
    ["Pure openness and resonance", "Communicating or vibrating space", "Luminous, activated possibility", "Receptive or gestational space", "Bounded or structured space"],
    ["Diffusion through an open field", "Pure movement and variability", "Accelerated, sharp, heated motion", "Circulation, currents, flowing exchange", "Controlled, patterned, mechanical movement"],
    ["Radiant potential and revelation", "Spreading heat and rapid excitation", "Concentrated ignition and transformation", "Incubatory, digestive, cohesive warmth", "Fixed heat — forging, tempering, crystallization"],
    ["Open receptivity and subtle continuity", "Oscillation, waves, mobile currents", "Fermentation, passion, heated cohesion", "Deep blending, gestation, union", "Condensation, coagulation, organic density"],
    ["Porous, resonant, meaning-bearing form", "Flexible structure, embodied movement", "Activated matter, pressure, tempered form", "Nourishing, plastic, organic embodiment", "Maximum fixation, density, boundary, endurance"],
  ];
  const [sel, setSel] = useState<[number, number] | null>(null);
  const [hov, setHov] = useState<[number, number] | null>(null);
  const cur = sel ?? hov;

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
        The twenty-five · large form down, small form across
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <div>
          <div className="grid grid-cols-[2.6rem_repeat(5,minmax(0,1fr))] gap-px">
            <div />
            {T.map((t, j) => (
              <div
                key={t}
                className={`flex flex-col items-center gap-1 pb-2 text-center font-mono text-[9px] uppercase tracking-[0.12em] transition-colors sm:text-[10px] ${
                  cur && cur[1] === j ? "text-gold" : "text-gold-dim"
                }`}
              >
                <TattvaGlyph dominant={K[j]} size={22} decorative />
                <span>{t}</span>
              </div>
            ))}
            {T.map((dom, i) => (
              <div key={dom} className="contents">
                <div
                  className={`flex flex-col items-center justify-center gap-1 pr-1 text-center font-mono text-[8px] uppercase tracking-[0.1em] transition-colors sm:text-[9px] ${
                    cur && cur[0] === i ? "text-gold" : "text-gold-dim"
                  }`}
                >
                  <TattvaGlyph dominant={K[i]} size={22} decorative />
                  <span>{dom}</span>
                </div>
                {T.map((mod, j) => {
                  const on = sel && sel[0] === i && sel[1] === j;
                  const inLine = cur && (cur[0] === i || cur[1] === j);
                  const diag = i === j;
                  return (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setSel(on ? null : [i, j])}
                      onMouseEnter={() => setHov([i, j])}
                      onMouseLeave={() => setHov(null)}
                      aria-pressed={!!on}
                      aria-label={`${dom} dominant, ${mod} modifier — ${tattvaLabel(K[i], diag ? null : K[j])}`}
                      className={`relative flex aspect-square items-center justify-center border p-[10%] transition-all duration-200 ${
                        on
                          ? "border-gold bg-gold/10"
                          : inLine
                            ? "border-gold/40"
                            : diag
                              ? "border-gold-dim/40 bg-clay/30"
                              : "border-border hover:border-gold/40"
                      }`}
                    >
                      <TattvaGlyph dominant={K[i]} modifier={diag ? null : K[j]} size="100%" decorative />
                      <span className={`absolute bottom-0.5 right-1 font-mono text-[8px] uppercase tracking-[0.06em] ${on ? "text-gold" : "text-muted-foreground/70"}`}>
                        {ABBR[i]}·{ABBR[j]}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            the diagonal is each tendency in its most direct form
          </p>
          <p className="mt-4 max-w-2xl text-[11px] leading-relaxed text-muted-foreground">{TATTVA_LEGEND}</p>
        </div>

        <div className="min-h-[13rem] border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {cur ? (
            <>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                {cur[0] === cur[1] ? "Undiluted" : "Dominant · Modifier"}
              </p>
              <div className="mt-3 flex items-center gap-4">
                <TattvaGlyph dominant={K[cur[0]]} modifier={cur[0] === cur[1] ? null : K[cur[1]]} size={56} />
                <div>
                  <p className="font-serif text-2xl italic leading-tight text-gold">
                    {T[cur[0]]}–{T[cur[1]]}
                  </p>
                  {cur[0] !== cur[1] && (
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-gold-dim">
                      Golden Dawn: {T[cur[1]]} of {T[cur[0]]}
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{M[cur[0]][cur[1]]}</p>
              {cur[0] !== cur[1] ? (
                <div className="mt-6 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={() => setSel([cur[1], cur[0]])}
                    className="-mx-1 px-1 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim transition-colors hover:text-gold"
                  >
                    ⇄ &nbsp;Swap to {T[cur[1]]}–{T[cur[0]]}
                  </button>
                  <p className="mt-3 text-sm italic leading-relaxed text-bone/70">
                    {M[cur[1]][cur[0]]}
                  </p>
                  <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                    The same two tendencies, reversed — and a different thing entirely.
                  </p>
                </div>
              ) : (
                <p className="mt-6 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
                  On the diagonal a tendency modifies only itself. There is nothing to swap.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Each primary tattva contains all five within itself. Choose a cell — dominant from the
              left, modifier from the top — then swap it, and the asymmetry becomes obvious.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
