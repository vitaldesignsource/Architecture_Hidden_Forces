import { useState } from "react";

/**
 * ForceAndForm — the descent from potency into visible structure, with the
 * threshold of visibility crossed only at the final step. Everything before it
 * has already happened invisibly, which is the claim: the visible body is the
 * last witness of a process long underway, not its beginning. The return arc
 * closes potency -> form -> new potency, since actuality does not exhaust potency.
 */
export function ForceAndForm() {
  const [sel, setSel] = useState<number | null>(null);
  const S = [
    { k: "Potency", d: "Structured possibility — not an unlimited cloud of everything imaginable. A seed holds the potency of a particular plant; an instrument, a range set by its material and construction." },
    { k: "Bias", d: "An asymmetry appears: an attraction, a tension, a need, an intention, an environmental pressure, a morphogenic lean. The tattvas belong here — they do not manufacture the form, they predispose force toward a mode of expression." },
    { k: "Vector", d: "The asymmetry gives the potency a direction. What could have gone many ways now leans one way." },
    { k: "Activity", d: "The vector meets a medium, and the medium answers with both resistance and affordance. Neither alone would produce anything." },
    { k: "Recurrence", d: "Repetition deepens the pathway. Feedback reinforces some movements and suppresses others, and the difference between them begins to matter." },
    { k: "Stabilisation", d: "Activity becomes steady enough to hold a recognisable relation. This is where Salt does its work — fixing what has been achieved into something durable." },
    { k: "Visible form", d: "The late result of an invisible history. By the time a form can be seen, touched, named, or measured, every selection above it has already been made." },
  ];
  const Y = (i: number) => 244 - i * 33;
  const X = (i: number) => 52 + i * 40;
  const cur = sel === null ? null : S[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-ff-r { stroke-dasharray: 4 8; animation: aoh-ff-turn 4s linear infinite; }
          @keyframes aoh-ff-turn { to { stroke-dashoffset: -24 } }
          .aoh-ff-n { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-ff-r { animation: none } }
        `}</style>
        <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-labelledby="aoh-ff-t">
          <title id="aoh-ff-t">
            Seven ascending steps from potency to visible form, with a threshold of visibility
            crossed only at the last, and a return arc carrying structure back into new potency.
          </title>

          {/* threshold of visibility — only the final step rises above it */}
          <line x1="14" y1={Y(6) + 17} x2="366" y2={Y(6) + 17} stroke="var(--gold)"
                strokeOpacity="0.45" strokeDasharray="6 5" strokeWidth="1" />
          <text x="14" y={Y(6) + 11} className="font-label" fontSize="6.6" letterSpacing="1.1"
                fill="var(--gold)" fillOpacity="0.8">THRESHOLD OF VISIBILITY</text>
          <text x="366" y={Y(6) + 29} textAnchor="end" className="font-label" fontSize="6.2"
                letterSpacing="0.9" fill="var(--muted-foreground)">EVERYTHING BELOW HAS ALREADY HAPPENED</text>

          {S.map((_, i) => i < 6 && (
            <line key={i} x1={X(i)} y1={Y(i)} x2={X(i + 1)} y2={Y(i + 1)}
                  stroke="var(--gold)" strokeOpacity={sel === null ? 0.45 : 0.18} strokeWidth="1" />
          ))}

          {/* actuality does not exhaust potency: structure becomes the vessel of new potency */}
          <path className="aoh-ff-r" d={`M${X(6)},${Y(6) - 16} C${X(6) + 20},${Y(6) - 60} 40,${Y(0) - 90} ${X(0)},${Y(0) - 16}`}
                fill="none" stroke="var(--bone)" strokeOpacity="0.45" strokeWidth="1" />
          <text x="196" y="26" textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)">STRUCTURE BECOMES THE VESSEL OF NEW POTENCY</text>

          {S.map((st, i) => {
            const on = sel === i;
            const vis = i === 6;
            return (
              <g key={st.k} className="aoh-ff-n" onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={st.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={X(i)} cy={Y(i)} r={on ? 9 : 6} fill={vis ? "var(--gold)" : "var(--void)"}
                        fillOpacity={vis ? (on ? 1 : 0.85) : 1}
                        stroke="var(--gold)" strokeOpacity={on ? 1 : sel === null ? 0.7 : 0.3}
                        strokeWidth={on ? 2 : 1.1} />
                <text x={X(i)} y={Y(i) - 15} textAnchor="middle" className="font-label" fontSize="6.6"
                      letterSpacing="0.7"
                      fill={on ? "var(--gold)" : vis ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel === null || on || vis ? 1 : 0.35}>
                  {st.k.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="min-h-[15rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {String((sel as number) + 1).padStart(2, "0")} · {cur.k}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            {sel === 6 && (
              <p className="mt-4 border-l-2 border-gold/50 pl-5 text-sm leading-relaxed text-bone/75">
                Which is why visibility should never be confused with beginning. What appears
                suddenly at the visible level may have been assembling gradually in subtler
                conditions for a very long time.
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The descent from potency into activity is not a fall into inferiority. It is a descent
              into <span className="text-bone/90">determination</span> — and to become actual is to
              surrender alternative possibilities in exchange for concrete existence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Six of these seven steps happen below the threshold. Only the last can be seen, touched,
              named, or measured, which makes visible structure the final witness of a formative
              process rather than its origin.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              And the arc returning overhead is the part easiest to miss: actuality does not exhaust
              potency. A realised form generates new capacities, and becomes the ground of further
              possibility.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * EthericTides — three nested cycles at different periods, read at one instant.
 * The point is superposition: no single cycle gives the condition of a moment,
 * and the composite is what the field actually offers. Move the reading line to
 * see the same three rhythms reinforce, oppose, or complicate one another.
 */
