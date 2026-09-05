import { useState } from "react";

/**
 * RightRelation — the movement from potency to fruit, drawn as a cycle with
 * exits.
 *
 * The section is explicit that these are not four automatic steps: participation
 * does not inevitably produce metamorphosis, and metamorphosis does not
 * guarantee fulfilment. So the figure gives every transition its named ways of
 * failing, branching outward from the arc where they occur. Discernment is the
 * hinge at each gate, which is why it sits at the centre rather than in the
 * sequence.
 */
export function RightRelation() {
  const [sel, setSel] = useState<string | null>(null);
  const C = 170, R = 104;

  const STAGES = [
    { k: "Potency", a: -90,
      d: "Structured possibility, before the relation is entered. Every actualised form becomes the vessel of new potency, which is why this is a ring and not a line." },
    { k: "Participation", a: 0,
      d: "Methexis — partaking. The participant receives something of a reality without becoming identical to it or exhausting it. Without openness there is no participation; without distinction there is no relation." },
    { k: "Metamorphosis", a: 90,
      d: "Participation stabilised into a new form. Not intensity: the vessel may be excited, fascinated, or temporarily expanded without acquiring any new capacity at all." },
    { k: "Fulfilled actualisation", a: 180,
      d: "Potency brought into its correct form rather than its maximum — the relation producing the capacity for which it was entered, without destroying the vessel or falsifying its object." },
  ];

  // each gate is a transition, and each transition has its own ways of failing
  const GATES = [
    { k: "Entering", at: -45, fails: [
      { n: "False correspondence", d: "Analogy mistaken for genuine kinship. A false address recruits the wrong force into a vessel prepared for something else." },
      { n: "Disproportion", d: "Force exceeding or failing to meet the vessel's capacity. What should have illuminated produces inflation." },
      { n: "Failed mediation", d: "The symbol, rite, or intermediary mistranslates what it carries." },
      { n: "Temporal error", d: "A correct operation attempted in the wrong phase or the wrong sequence." },
      { n: "Boundary collapse", d: "Participation confused with identity, fusion, or possession." },
    ]},
    { k: "Metabolising", at: 45, fails: [
      { n: "Mimicry", d: "The external appearance of a form copied without its capacity." },
      { n: "Inflation", d: "The personal vessel identified with a force greater than itself." },
      { n: "Possession", d: "An entering pattern displacing the existing centre rather than transforming it." },
    ]},
    { k: "Completing", at: 135, fails: [
      { n: "Teleological displacement", d: "The declared purpose quietly replaced by an unacknowledged operative one." },
      { n: "Formative inertia", d: "A form continuing after the force or value that justified it has gone." },
      { n: "Parasitism", d: "The relation preserving itself by depleting its participants." },
    ]},
  ];

  const pt = (a: number, r: number) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)];
  const stage = STAGES.find((s) => s.k === sel);
  const gate = GATES.find((g) => g.k === sel);
  const fail = GATES.flatMap((g) => g.fails).find((f) => f.n === sel);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[360px]">
        <style>{`
          .aoh-rr-arc { stroke-dasharray: 4 9; animation: aoh-rr-turn 4.2s linear infinite; }
          @keyframes aoh-rr-turn { to { stroke-dashoffset: -26 } }
          .aoh-rr-h { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-rr-arc { animation: none } }
        `}</style>
        <svg viewBox="0 0 340 340" className="h-auto w-full" role="img" aria-labelledby="aoh-rr-t">
          <title id="aoh-rr-t">
            Four stages around a ring — potency, participation, metamorphosis, fulfilment — with
            three gates between them, each branching outward to the ways that transition can fail.
          </title>

          <circle className="aoh-rr-arc" cx={C} cy={C} r={R} fill="none" stroke="var(--gold)"
                  strokeOpacity={sel ? 0.25 : 0.55} strokeWidth="1.2" />

          {/* the exits: each gate leans outward toward what it can fall into */}
          {GATES.map((g) => {
            const [x1, y1] = pt(g.at, R);
            const [x2, y2] = pt(g.at, R + 46);
            const on = sel === g.k || g.fails.some((f) => f.n === sel);
            return (
              <g key={g.k}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--bone)"
                      strokeOpacity={on ? 0.7 : 0.22} strokeDasharray="2 4" strokeWidth="1" />
                <g className="aoh-rr-h" onClick={() => setSel(sel === g.k ? null : g.k)}
                   role="button" tabIndex={0} aria-pressed={sel === g.k} aria-label={`${g.k} gate`}
                   onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(sel === g.k ? null : g.k); } }}>
                  <circle cx={x2} cy={y2} r="14" fill="transparent" />
                  <circle cx={x2} cy={y2} r={on ? 13 : 11} fill="var(--void)" stroke="var(--bone)"
                          strokeOpacity={on ? 0.9 : 0.4} strokeWidth="1" />
                  <text x={x2} y={y2 + 3.5} textAnchor="middle" className="font-label" fontSize="8.5"
                        fill={on ? "var(--bone)" : "var(--muted-foreground)"}>{g.fails.length}</text>
                </g>
              </g>
            );
          })}

          {STAGES.map((s) => {
            const [x, y] = pt(s.a, R);
            const on = sel === s.k;
            const label = s.k === "Fulfilled actualisation" ? "FULFILMENT" : s.k.toUpperCase();
            const below = s.a === 90;
            return (
              <g key={s.k} className="aoh-rr-h" onClick={() => setSel(on ? null : s.k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={s.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : s.k); } }}>
                <circle cx={x} cy={y} r={on ? 22 : 18} fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : 0.65} strokeWidth={on ? 1.8 : 1.2} />
                <text x={x} y={y + 3.5} textAnchor="middle" className="font-label" fontSize="9"
                      fill="var(--gold)" fillOpacity={on ? 1 : 0.8}>{STAGES.indexOf(s) + 1}</text>
                <text x={x} y={below ? y + 36 : y - 28} textAnchor="middle" className="font-label"
                      fontSize="7" letterSpacing="1.2"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}>{label}</text>
              </g>
            );
          })}

          {/* the hinge */}
          <circle cx={C} cy={C} r="34" fill="var(--void)" stroke="var(--gold)"
                  strokeOpacity="0.3" strokeDasharray="3 5" strokeWidth="0.9" />
          <text x={C} y={C - 2} textAnchor="middle" className="font-label" fontSize="7.5"
                letterSpacing="1.3" fill="var(--gold)" fillOpacity="0.85">DISCERNMENT</text>
          <text x={C} y={C + 11} textAnchor="middle" className="font-label" fontSize="6.2"
                letterSpacing="0.9" fill="var(--muted-foreground)">AT EVERY GATE</text>

          <text x={C} y="332" textAnchor="middle" className="font-label" fontSize="6.6"
                letterSpacing="1.1" fill="var(--muted-foreground)" opacity="0.8">
            NOT FOUR AUTOMATIC STEPS — ELEVEN WAYS OUT
          </text>
        </svg>
      </div>

      <div className="min-h-[16rem]">
        {stage ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {STAGES.indexOf(stage) + 1} · {stage.k}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{stage.d}</p>
          </>
        ) : gate ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-bone/70">
              {gate.k} — {gate.fails.length} ways this transition fails
            </p>
            <div className="mt-4 space-y-px">
              {gate.fails.map((f) => (
                <button key={f.n} onClick={() => setSel(f.n)}
                  className="grid w-full grid-cols-[1fr] gap-1 border-b border-border py-3 text-left transition-colors hover:border-gold/40">
                  <span className="font-label text-[10px] uppercase tracking-[0.15em] text-gold">{f.n}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{f.d}</span>
                </button>
              ))}
            </div>
          </>
        ) : fail ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-bone/70">
              Distortion · {fail.n}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/85">{fail.d}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Not necessarily total failure. A distortion may be a partially successful transmission
              whose proportions have shifted, correctable by purification, reinterpretation, restored
              boundary, or reordered sequence. At other times the only right relation is termination.
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Participation does not inevitably produce metamorphosis, and metamorphosis does not
              guarantee fulfilment. Distortion can arise at every stage, which is why this is a ring
              with exits rather than a ladder — and why{" "}
              <span className="text-bone/90">discernment sits at the centre</span> rather than
              somewhere in the sequence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Select a stage for what it is, or a gate for the named ways that transition fails.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Five ways of entering wrongly, three of metabolising wrongly, three of completing
              wrongly.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
