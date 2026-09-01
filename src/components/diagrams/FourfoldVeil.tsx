import { useState } from "react";

/**
 * FourfoldVeil — the four ethers drawn as nested membranes rather than floors.
 *
 * The section's explicit correction is against the stacked image: Reflecting
 * contains Light, Light contains Life, Life contains Chemical, Chemical meets
 * dense form. Concentric rings state that containment in a way a ladder cannot,
 * and the radial channel carries the two movements — descending toward matter,
 * ascending toward memory — through all four at once.
 *
 * Every embodied act involves all four simultaneously, so nothing here is ever
 * drawn switched off; selecting a ring only brings its own functions forward.
 */
export function FourfoldVeil() {
  const [sel, setSel] = useState<string | null>(null);
  const [dir, setDir] = useState<"descending" | "ascending">("descending");

  const C = 170;

  const ETHERS = [
    {
      k: "Reflecting", r: 148, q: "What pattern is to be expressed?", verb: "Reflect",
      sub: "The veil of pattern, image, and memory",
      d: "The interface between thought-pattern and etheric activity — receiving formative patterns, preserving impressions, supplying the templates lower strata attempt to express, returning experience as memory.",
      pol: ["Impression — receiving and retaining a pattern", "Projection — returning it into thought, perception, or action"],
      fails: ["Projection mistaken for revelation", "Inherited images mistaken for universal truths", "False memory", "Symbolic inflation", "A representation preserved after its object has gone"],
      note: "A reflection preserves a relation while changing its mode. A face in water is recognisable and may still be reversed, blurred, or broken by movement — which is why this is a field of representations, not an infallible cosmic record.",
    },
    {
      k: "Light", r: 116, q: "How is the pattern activated and made perceptible?", verb: "Illuminate",
      sub: "The veil of activation, circulation, and perception",
      d: "Excitation, visibility, circulation, sensory presence. Reflecting gives the pattern an image; Light gives the image intensity and movement. Not electromagnetic radiation — the wider principle by which something becomes active and capable of holding attention.",
      pol: ["Radiation — expression, excitation, outward activation", "Reception — sensation, perception, inward registration"],
      fails: ["Overstimulation", "Numbness", "Uncontrolled emotional contagion", "Perception dissociated from embodiment", "Amplification beyond what the vessel can contain"],
      note: "An idea can sit in the Reflecting Ether as a possibility and become compelling only once attention, feeling, or desire illuminates it. Which is why ritual light, colour, sound, rhythm, and breath are not decoration. They regulate activation.",
    },
    {
      k: "Life", r: 84, q: "How does the activity become self-renewing organisation?", verb: "Vitalise",
      sub: "The veil of growth, repair, and continuity",
      d: "The principle by which activity becomes recursive — nourishing, repairing, reproducing, continuing itself. Not energy. A flame is active without being alive; an organism uses its activity to preserve the conditions of its own continuation.",
      pol: ["Generation — producing, gestating, repairing, organising", "Transmission — carrying continuity outward through reproduction, teaching, inheritance"],
      fails: ["Uncontrolled growth", "Depletion", "Failure of repair", "Developmental arrest", "Parasitic reproduction", "Life-process preserved without telos"],
      note: "It holds memory as developmental tendency rather than image. A seed contains no miniature tree — it contains an organised capacity to generate one. Which is why traditions and institutions can exhibit a life-etheric function: recruiting, reproducing, repairing, generating successors.",
    },
    {
      k: "Chemical", r: 52, q: "What material is incorporated, fixed, exchanged, or released?", verb: "Incorporate",
      sub: "The veil of selection, incorporation, and release",
      d: "The threshold where living organisation selects, binds, exchanges, and releases physical material. Life supplies the organising demand; Chemical selects the matter through which that demand can be embodied.",
      pol: ["Incorporation — attraction, assimilation, binding, fixation", "Release — separation, elimination, return to circulation"],
      fails: ["Accumulation", "Indiscriminate assimilation", "Inability to release", "Rigid fixation", "Rejection of necessary material", "Material support continued for a form whose purpose has ended"],
      note: "Assimilation and excretion are equally necessary. A form that cannot assimilate cannot build itself; a form that cannot release becomes saturated with its own residue. This holds symbolically too — the mind, the tradition, the rite that must finally be dismantled.",
    },
  ];

  const cur = ETHERS.find((e) => e.k === sel);
  const descending = dir === "descending";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[360px]">
        <style>{`
          .aoh-fv-ch { stroke-dasharray: 5 9; animation: aoh-fv-run 3.6s linear infinite; }
          .aoh-fv-up .aoh-fv-ch { animation-direction: reverse; }
          @keyframes aoh-fv-run { to { stroke-dashoffset: -28 } }
          .aoh-fv-r { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-fv-ch { animation: none } }
        `}</style>
        <svg viewBox="0 0 340 356" className={`h-auto w-full ${descending ? "" : "aoh-fv-up"}`}
             role="img" aria-labelledby="aoh-fv-t">
          <title id="aoh-fv-t">
            Four nested rings — Reflecting enclosing Light, enclosing Life, enclosing Chemical,
            enclosing dense form at the centre — with a channel carrying movement through all four.
          </title>

          {ETHERS.map((e) => {
            const on = sel === e.k;
            return (
              <g key={e.k} className="aoh-fv-r" onClick={() => setSel(on ? null : e.k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={e.k}
                 onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : e.k); } }}>
                <circle cx={C} cy={C} r={e.r} fill="var(--gold)"
                        fillOpacity={on ? 0.05 : 0.018} stroke="var(--gold)"
                        strokeOpacity={on ? 1 : sel ? 0.22 : 0.45}
                        strokeWidth={on ? 1.8 : 1} />
                <text x={C} y={C - e.r + 15} textAnchor="middle" className="font-mono"
                      fontSize="7.4" letterSpacing="1.3"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={on ? 1 : sel ? 0.4 : 0.9}>
                  {e.k.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* dense form: what the innermost membrane meets */}
          <circle cx={C} cy={C} r="22" fill="var(--void)" stroke="var(--bone)"
                  strokeOpacity="0.5" strokeWidth="1.1" />
          <text x={C} y={C - 1} textAnchor="middle" className="font-mono" fontSize="6.2"
                letterSpacing="0.8" fill="var(--bone)" opacity="0.8">DENSE</text>
          <text x={C} y={C + 8} textAnchor="middle" className="font-mono" fontSize="6.2"
                letterSpacing="0.8" fill="var(--bone)" opacity="0.8">FORM</text>

          {/* the channel — one passage crossing every membrane, both ways */}
          <line className="aoh-fv-ch" x1={C} y1={C - 146} x2={C} y2={C - 24}
                stroke="var(--gold)" strokeOpacity="0.9" strokeWidth="1.5" />
          <line className="aoh-fv-ch" x1={C} y1={C + 146} x2={C} y2={C + 24}
                stroke="var(--bone)" strokeOpacity="0.45" strokeWidth="1.2" />

          <text x={C} y="338" textAnchor="middle" className="font-mono" fontSize="6.6"
                letterSpacing="1.1" fill="var(--muted-foreground)" opacity="0.85">
            NESTED, NOT STACKED — NOT A LADDER BUT A RESPIRATION
          </text>
        </svg>

        <div className="mt-3 flex justify-center gap-2">
          {(["descending", "ascending"] as const).map((d) => (
            <button key={d} onClick={() => setDir(d)} aria-pressed={dir === d}
              className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                dir === d ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/60"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[19rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.verb} · {cur.sub}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/85">{cur.q}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {cur.pol.map((p) => (
                <p key={p} className="border-l border-gold/40 pl-4 text-sm leading-relaxed text-bone/70">{p}</p>
              ))}
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60">
              How it fails
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {cur.fails.join(" · ")}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-bone/60">{cur.note}</p>
          </>
        ) : (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {descending ? "Descending — manifestation" : "Ascending — experience"}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/85">
              {descending
                ? "Pattern → activation → living organisation → material embodiment"
                : "Material event → living response → perception → memory"}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {descending
                ? "A pattern is retained, then activated and made dynamic, then becomes a self-organising process, which finally selects and incorporates matter into an actual vessel."
                : "A material event alters the body. The organism responds. Sensation communicates the change. The event becomes image and memory — and that memory modifies the pattern through which the next event will be received."}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Which is why this is not a one-way ladder but{" "}
              <span className="text-bone/90">a respiratory system of manifestation</span> — and why
              they are drawn enclosing one another rather than stacked. Every embodied act involves
              all four at once. Eating is material incorporation, biological organisation, sensory
              perception, memory, expectation, and meaning, indivisibly.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select a membrane for its governing question, its polarity, and the ways it fails.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
