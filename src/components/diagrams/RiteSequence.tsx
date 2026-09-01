import { useState } from "react";

/**
 * RiteSequence — the bounded enactment. Five stages inside a threshold, each
 * feeding the object at the centre. Switching to displaced object changes NOTHING
 * about the sequence, which is the whole claim: the form survives because
 * something is still being fed by it, even when that something is no longer what
 * the participants name.
 */
export function RiteSequence() {
  const [displaced, setDisplaced] = useState(false);
  const [sel, setSel] = useState<number | null>(null);
  const ST = [
    { k: "Purification", d: "prepares what invocation addresses" },
    { k: "Invocation", d: "establishes what offering joins" },
    { k: "Offering", d: "joins what participation receives" },
    { k: "Participation", d: "receives what sealing preserves" },
    { k: "Sealing", d: "preserves what the passage produced" },
  ];
  const SUB = ["institutional continuity", "collective identity", "authority",
               "anxiety management", "the preservation of an egregore"];
  const X = (i: number) => 42 + i * 74;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[400px]">
        <style>{`
          .aoh-rt-f { stroke-dasharray: 3 7; animation: aoh-rt-feed 2.9s linear infinite; }
          @keyframes aoh-rt-feed { to { stroke-dashoffset: -20 } }
          .aoh-rt-n { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-rt-f { animation: none } }
        `}</style>
        <svg viewBox="0 0 400 270" className="h-auto w-full" role="img" aria-labelledby="aoh-rt-t">
          <title id="aoh-rt-t">
            Five ordered stages inside a threshold, each feeding a single object at the centre. The
            sequence is unchanged when the object is displaced.
          </title>

          {/* the threshold — a bounded world, with a gate on the left where it is crossed */}
          <path d="M28,26 L28,14 M28,42 L28,150 L372,150 L372,14 L28,14"
                fill="none" stroke="var(--gold)" strokeOpacity="0.4" strokeWidth="1" />
          <text x="24" y="37" textAnchor="end" className="font-mono" fontSize="6.5"
                letterSpacing="0.8" fill="var(--muted-foreground)"
                transform="rotate(-90 24 37)">THRESHOLD</text>

          {ST.map((st, i) => {
            const on = sel === i;
            return (
              <g key={st.k} className="aoh-rt-n" onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={st.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={X(i)} cy="58" r={on ? 15 : 12} fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : 0.6} strokeWidth={on ? 1.8 : 1} />
                <text x={X(i)} y="62" textAnchor="middle" className="font-mono" fontSize="9"
                      fill="var(--gold)" fillOpacity={on ? 1 : 0.75}>{i + 1}</text>
                <text x={X(i)} y="92" textAnchor="middle" className="font-mono" fontSize="6.4"
                      letterSpacing="0.7" fill={on ? "var(--gold)" : "var(--muted-foreground)"}>
                  {st.k.toUpperCase()}
                </text>
                {i < 4 && (
                  <line x1={X(i) + 14} y1="58" x2={X(i + 1) - 14} y2="58" stroke="var(--gold)"
                        strokeOpacity="0.45" strokeWidth="1" />
                )}
                {/* every stage feeds the object */}
                <line className="aoh-rt-f" x1={X(i)} y1="104" x2="200" y2="196"
                      stroke={displaced ? "var(--bone)" : "var(--gold)"}
                      strokeOpacity={displaced ? 0.5 : 0.45} strokeWidth="0.9" />
              </g>
            );
          })}

          <ellipse cx="200" cy="212" rx="96" ry="26" fill="var(--void)"
                   stroke={displaced ? "var(--bone)" : "var(--gold)"}
                   strokeOpacity={displaced ? 0.75 : 0.9}
                   strokeDasharray={displaced ? "5 4" : "none"} strokeWidth="1.4" />
          <text x="200" y="209" textAnchor="middle" className="font-mono" fontSize="7"
                letterSpacing="1.3" fill={displaced ? "var(--bone)" : "var(--gold)"}>
            {displaced ? "OPERATIVE OBJECT" : "DECLARED OBJECT"}
          </text>
          <text x="200" y="223" textAnchor="middle" className="font-mono" fontSize="6.2"
                letterSpacing="0.9" fill="var(--muted-foreground)">
            {displaced ? "NO LONGER WHAT IS NAMED" : "WHAT THE PARTICIPANTS NAME"}
          </text>
          <text x="200" y="258" textAnchor="middle" className="font-mono" fontSize="6.6"
                letterSpacing="1.1" fill="var(--muted-foreground)" opacity="0.8">
            THE SEQUENCE IS IDENTICAL IN BOTH STATES
          </text>
        </svg>

        <div className="mt-3 flex justify-center">
          <button onClick={() => setDisplaced((v) => !v)}
            className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-gold hover:text-gold">
            {displaced ? "restore the declared object" : "displace the object"}
          </button>
        </div>
      </div>

      <div className="min-h-[15rem]">
        {sel !== null ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {String(sel + 1).padStart(2, "0")} · {ST[sel].k}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/85">
              {ST[sel].k} {ST[sel].d}.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Sequence creates dependency — which is why order here is neither decorative nor
              universally fixed. It expresses the causal grammar of this particular operation, and
              altering it may weaken the rite, reverse its movement, or produce a different operation
              altogether.
            </p>
          </>
        ) : displaced ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/70">
              Telestic inertia
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A rite that loses its declared object does not thereby become objectless. Its operative
              object may simply change, silently, while every gesture stays in place. What it comes
              to serve instead:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SUB.map((x) => (
                <span key={x} className="border border-border px-2.5 py-1 text-xs text-bone/70">{x}</span>
              ))}
            </div>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              The form survives because something is still being fed by it — even though that
              something is no longer what the participants name.
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The threshold establishes a temporary world of operation. Crossing it changes what
              gestures, words, materials, and persons are permitted to mean and to do — and inside
              that boundary the five stages are not a list but a dependency: each prepares the
              conditions the next requires.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              Select a stage for its dependency. Or displace the object, and watch the sequence
              refuse to change.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Carriers — tradition as a redundant constellation. Every carrier can be lost,
 * and the pattern stays triangulable well past the loss of any single one, which
 * is the claim: no carrier contains the whole, and convergence is what survives
 * Transductive Loss. Strike enough of them out and recognition degrades by
 * degrees rather than switching off.
 */
