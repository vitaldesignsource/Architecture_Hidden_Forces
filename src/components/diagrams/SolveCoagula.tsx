import { useState } from "react";

/**
 * SolveCoagula — one cycle, two movements, three principles that swap roles.
 *
 * The section's real content is not that dissolution precedes reformation —
 * it is that Salt, Sulfur and Mercury do different work in each phase. So the
 * figure keeps the same three nodes in place and changes what they are doing,
 * rather than drawing two separate diagrams. Toggling is the argument.
 *
 * Each phase also carries the way it fails when performed without the other,
 * because the section is emphatic that neither operation is sufficient alone
 * and that premature coagulation is the more dangerous of the two.
 */
export function SolveCoagula() {
  const [phase, setPhase] = useState<"solve" | "coagula">("solve");
  const [sel, setSel] = useState<string | null>(null);
  const C = 168, R = 92;

  const P = {
    Salt: { a: 90, gl: "🜔" },
    Sulfur: { a: -30, gl: "🜍" },
    Mercury: { a: 210, gl: "☿" },
  } as const;

  const ROLE = {
    solve: {
      Salt: "is opened. The boundary that held the pattern together is loosened enough for what it contained to move.",
      Sulfur: "is released from its imprisoning configuration — desire and identity freed from the shape that had been holding them.",
      Mercury: "separates and circulates what had been fixed, carrying components apart so they can be seen singly.",
    },
    coagula: {
      Salt: "establishes the transformed pattern as durable embodiment — the new arrangement acquires boundary, memory, and persistence.",
      Sulfur: "supplies the new centre of orientation. The released fire is given something to be about.",
      Mercury: "reconnects the separated components, translating between what was dissolved and what is now forming.",
    },
  };

  const FAIL = {
    solve: {
      k: "Solve without coagula",
      d: "Fragmentation, instability, permanent liminality. The old form is gone and nothing has been built to receive what it held.",
      note: "Force released from form is volatile. It may return to the old pattern, attach to a new distortion, or disperse achieving nothing.",
    },
    coagula: {
      k: "Coagula without solve",
      d: "Unresolved material preserved inside a newly decorated structure. The form changed because the underlying force found a new costume.",
      note: "Premature coagulation is the more dangerous of the two, because it gives an incomplete transformation the appearance of completion.",
    },
  };

  const pt = (a: number, r: number) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)];
  const dissolving = phase === "solve";
  const cur = sel && sel in ROLE[phase] ? sel : null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <style>{`
          .aoh-sc-arc { stroke-dasharray: 4 8; animation: aoh-sc-turn 4.5s linear infinite; }
          .aoh-sc-in .aoh-sc-arc { animation-direction: reverse; }
          @keyframes aoh-sc-turn { to { stroke-dashoffset: -24 } }
          @media (prefers-reduced-motion: reduce) { .aoh-sc-arc { animation: none } }
        `}</style>
        <svg viewBox="0 0 336 330" className={`h-auto w-full ${dissolving ? "" : "aoh-sc-in"}`}
             role="img" aria-labelledby="aoh-sc-t">
          <title id="aoh-sc-t">
            Salt, Sulfur and Mercury at the corners of one cycle, each performing different work
            depending on whether the movement is dissolution or reformation.
          </title>

          <circle className="aoh-sc-arc" cx={C} cy={C} r={R + 34} fill="none" stroke="var(--gold)"
                  strokeOpacity="0.4" strokeWidth="1.1" />

          {/* the three hold position; only their work changes */}
          {(Object.keys(P) as (keyof typeof P)[]).map((k) => {
            const [x, y] = pt(P[k].a, R);
            const on = sel === k;
            return (
              <g key={k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : k); } }}>
                <circle cx={x} cy={y} r={on ? 30 : 26} fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : sel ? 0.3 : 0.7}
                        strokeDasharray={dissolving ? "5 4" : "none"}
                        strokeWidth={on ? 1.8 : 1.2} />
                <text x={x} y={y + 6} textAnchor="middle" className="font-serif" fontSize="17"
                      fill="var(--gold)" fillOpacity={on ? 1 : sel ? 0.35 : 0.9}>{P[k].gl}</text>
                <text x={x} y={y + 44} textAnchor="middle" className="font-label" fontSize="7"
                      letterSpacing="1.2" fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel && !on ? 0.4 : 1}>{k.toUpperCase()}</text>
              </g>
            );
          })}

          <text x={C} y={C - 4} textAnchor="middle" className="font-serif" fontSize="15"
                fill="var(--gold)" fillOpacity="0.9">
            {dissolving ? "solve" : "coagula"}
          </text>
          <text x={C} y={C + 12} textAnchor="middle" className="font-label" fontSize="6.2"
                letterSpacing="0.9" fill="var(--muted-foreground)">
            {dissolving ? "DISSOLVE" : "GATHER"}
          </text>

          <text x={C} y="322" textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            THE SAME THREE — DIFFERENT WORK
          </text>
        </svg>

        <div className="mt-3 flex justify-center gap-2">
          {(["solve", "coagula"] as const).map((p) => (
            <button key={p} onClick={() => setPhase(p)} aria-pressed={phase === p}
              className={`border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.12em] transition-colors ${
                phase === p ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/60"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[16rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur} · in {phase}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/85">
              {cur} {ROLE[phase][cur as keyof typeof ROLE["solve"]]}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Excessive Salt refuses dissolution. Excessive Sulfur consumes the vessel. Excessive
              Mercury disperses the operation before a new form can stabilise. The work succeeds only
              where the three enter right relation.
            </p>
          </>
        ) : (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {phase === "solve" ? "Dissolve" : "Gather"}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {phase === "solve"
                ? "Loosens the bonds through which force has become fixed — separating what was falsely joined, exposing hidden components, returning rigid structure to renewed possibility. It appears as questioning, grief, disillusionment, the breakdown of a self-concept; as purification, unbinding, symbolic death."
                : "Gathers what has been released and gives it a new centre, pattern, boundary and body. It appears as commitment after questioning, reconstruction after dissolution, embodiment after insight, renewed identity after initiation."}
            </p>
            <p className="mt-6 font-label text-[10px] uppercase tracking-[0.2em] text-bone/60">
              {FAIL[phase].k}
            </p>
            <p className="mt-3 border-l-2 border-bone/30 pl-5 text-sm leading-relaxed text-bone/75">
              {FAIL[phase].d}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{FAIL[phase].note}</p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select a principle to see what it does in this phase — the three hold their positions
              and change their work.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
