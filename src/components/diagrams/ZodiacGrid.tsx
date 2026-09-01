import { ZodiacGlyph } from "@/components/ZodiacGlyph";
import { useState } from "react";

/**
 * ZodiacGrid — the twelve as a complete four-by-three, not a list of twelve
 * things. Elements are the medium formation occurs through; modalities are the
 * phase of activity. Every cell is one element in one phase, which is why there
 * are exactly twelve and not some other number.
 */
export function ZodiacGrid() {
  const [sel, setSel] = useState<string | null>(null);
  const MOD = [
    { k: "Cardinal", d: "Initiates, selects a direction, crosses a threshold. Force entering a new vector." },
    { k: "Fixed", d: "Concentrates, sustains, accumulates, preserves. Force becoming stable form." },
    { k: "Mutable", d: "Adapts, translates, redistributes, releases. Form loosening into renewed potency." },
  ];
  const EL = [
    { k: "Fire", d: "Excitation, radiation, appetite, intention, the generation of direction. Force becoming vector." },
    { k: "Earth", d: "Resistance, density, incorporation, measurement, fixation. What lets force acquire boundary, duration, and visible structure." },
    { k: "Air", d: "Differentiation, relation, exchange, proportion, communication. What lets forces be compared, connected, and organised into networks." },
    { k: "Water", d: "Cohesion, receptivity, memory, gestation, internal transformation. What lets impressions be received, retained, and carried beneath visible boundaries." },
  ];
  const SIGNS: Record<string, { n: string; m: string }> = {
    "Fire|Cardinal": { n: "Aries", m: "Ignition, emergence, direct projection" },
    "Fire|Fixed": { n: "Leo", m: "Centralisation, radiance, creative declaration" },
    "Fire|Mutable": { n: "Sagittarius", m: "Propagation, orientation, synthesis, the projection of meaning" },
    "Earth|Cardinal": { n: "Capricorn", m: "Structuration, limitation, hierarchy, durable achievement" },
    "Earth|Fixed": { n: "Taurus", m: "Consolidation, incorporation, material retention" },
    "Earth|Mutable": { n: "Virgo", m: "Discrimination, refinement, adjustment" },
    "Air|Cardinal": { n: "Libra", m: "Equilibration, reciprocity, relational measurement" },
    "Air|Fixed": { n: "Aquarius", m: "Systemisation, distribution, networked reconfiguration" },
    "Air|Mutable": { n: "Gemini", m: "Differentiation, duplication, exchange" },
    "Water|Cardinal": { n: "Cancer", m: "Enclosure, nourishment, memory, protection" },
    "Water|Fixed": { n: "Scorpio", m: "Concentration, binding, penetration, metamorphosis" },
    "Water|Mutable": { n: "Pisces", m: "Permeation, dissolution, recombination, return" },
  };
  const cell = sel && sel.includes("|") ? SIGNS[sel] : null;
  const el = sel && !sel.includes("|") ? EL.find((e) => e.k === sel) : null;
  const mo = sel && !sel.includes("|") ? MOD.find((m) => m.k === sel) : null;
  const lit = (k: string) => !sel || sel === k || (sel.includes("|") && sel.split("|").includes(k)) ||
    (!sel.includes("|") && k.includes("|") && k.split("|").includes(sel));

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start">
      <div>
        <div className="grid grid-cols-[4.5rem_repeat(3,1fr)] gap-px sm:grid-cols-[6rem_repeat(3,1fr)]">
          <div />
          {MOD.map((m) => (
            <button key={m.k} onClick={() => setSel(sel === m.k ? null : m.k)} aria-pressed={sel === m.k}
              className={`border-b py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                sel === m.k ? "border-gold text-gold" : "border-border text-gold-dim hover:text-gold"}`}>
              {m.k}
            </button>
          ))}
          {EL.map((e) => (
            <div key={e.k} className="contents">
              <button onClick={() => setSel(sel === e.k ? null : e.k)} aria-pressed={sel === e.k}
                className={`border-r py-4 pr-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                  sel === e.k ? "border-gold text-gold" : "border-border text-gold-dim hover:text-gold"}`}>
                {e.k}
              </button>
              {MOD.map((m) => {
                const key = `${e.k}|${m.k}`;
                const sg = SIGNS[key];
                const on = sel === key;
                return (
                  <button key={key} onClick={() => setSel(on ? null : key)} aria-pressed={on}
                    aria-label={`${sg.n}, ${e.k} ${m.k}`}
                    className={`border-b border-border px-2 py-4 text-left transition-all ${
                      on ? "border-gold" : "hover:border-gold/40"} ${lit(key) ? "opacity-100" : "opacity-25"}`}>
                    <ZodiacGlyph
                      sign={sg.n}
                      className={`h-7 w-7 transition-colors ${on ? "text-gold" : "text-bone/70"}`}
                    />
                    <span className={`mt-1.5 block font-serif text-sm ${on ? "text-gold" : "text-bone/70"}`}>
                      {sg.n}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
          Four media × three phases · exactly twelve, and no remainder
        </p>
      </div>

      <div className="min-h-[13rem] lg:border-l lg:border-border lg:pl-8">
        {cell ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {sel?.split("|")[0]} × {sel?.split("|")[1]}
            </p>
            <p className="mt-3 flex items-center gap-3 font-serif text-3xl text-gold">
              <ZodiacGlyph sign={cell.n} className="h-9 w-9 shrink-0" />
              {cell.n}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cell.m}</p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              A sign is not itself a force. It is an operator applied to force — the manner in which
              force accepts form.
            </p>
          </>
        ) : el || mo ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {el ? "Element · the medium" : "Modality · the phase"}
            </p>
            <p className="mt-3 font-serif text-2xl text-gold">{(el || mo)!.k}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{(el || mo)!.d}</p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Zodiac does not supply twelve separate forces. It supplies twelve ways force can be
              directed, stabilised, related, transformed, and released — and they are not an
              arbitrary list. Four media, three phases, and the grid closes.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              Every element can begin, endure, and change. Every modality can work through radiation,
              embodiment, relation, or cohesion. Select a cell, or a heading.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
