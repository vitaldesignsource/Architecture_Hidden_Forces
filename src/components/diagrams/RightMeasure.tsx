import { useState } from "react";

/**
 * RightMeasure — the eight principles drawn as beams rather than a list.
 *
 * § XXXIX already gives right relation as a ring with exits. This is the other
 * half of the law: not the stages of a relation but the proportions that hold it
 * true, and proportion is what a beam draws. Each principle carries a virtue at
 * its centre and fails toward one or both ends.
 *
 * The document supplies two poles for some principles and one for others, so the
 * figure marks only the ends it can actually name. A beam with a single tick is
 * making a smaller claim than one with two, and should look like it.
 */
export function RightMeasure() {
  const [sel, setSel] = useState<number | null>(null);

  const P = [
    { k: "Source", asks: "What actually authorises this?",
      v: "The relation oriented toward its genuine source rather than an intermediary standing in for it.",
      lo: null,
      hi: "Idolatry, in the broadest sense — the channel claiming the authority of what passes through it. A teacher mediates a tradition without being its truth; a symbol reveals a divine quality without being the whole of the divine; an institution preserves a rule without owning the virtue that rule serves." },
    { k: "Measure", asks: "How much can this vessel take?",
      v: "The amount that strengthens the vessel's capacity for further right relation. Not mediocrity — the proportion that lets force deepen participation instead of ending it.",
      lo: "Stagnation. Too little force, and nothing moves.",
      hi: "Rupture. More than the vessel can hold, and the structure that should have contained it breaks." },
    { k: "Timing", asks: "Is this the moment?",
      v: "Receptivity varies through time — bodily rhythms, lunar cycles, developmental stages, ritual hours, the tides of § XXXVI. Right timing guarantees nothing; it establishes a more favourable relation between force and field.",
      lo: "The season missed, or rest continued until it becomes perpetual withdrawal.",
      hi: "Forcing before ripeness — a truth delivered before it can be received is not yet a truth for this hearer." },
    { k: "Place", asks: "Where can this operate coherently?",
      v: "Intimacy needs protected space; grief needs room to dissolve; concentration needs competing stimuli restricted; ritual needs a field distinguished from ordinary activity. Consecration makes right place by setting a vessel apart for a definite relation.",
      lo: "No distinguished field — the operation indistinguishable from ordinary circulation, and so carried by nothing.",
      hi: "A place set apart and never returned. Deconsecration is what ends the special relation; without it the setting-apart outlives its reason." },
    { k: "Boundary", asks: "What may enter, and how transformed?",
      v: "Selective permeability. A membrane does not prevent exchange — it regulates exchange, and the same holds for psychological, ritual, institutional and spiritual boundaries.",
      lo: "Isolation. A boundary admitting nothing.",
      hi: "Dissolution. A boundary admitting everything." },
    { k: "Reciprocity", asks: "Does anything circulate back?",
      v: "Receiving must eventually become assimilation, expression, contribution, or return. Not equal exchange at every moment — children, the sick and initiates may receive far more than they can yet give back. The requirement is that the relation stay oriented toward life rather than permanent depletion.",
      lo: "Congestion. A vessel that only accumulates.",
      hi: "Parasitism. A force that only takes — and the teacher who prevents students from maturing, preserving dependence in place of transmission." },
    { k: "Purpose", asks: "What is it actually producing?",
      v: "A relation is judged by what it produces, not only by what it claims to serve. The fruit discloses the force actually governing it.",
      lo: null,
      hi: "The declared purpose contradicted by the outcome — a rite said to liberate that produces chronic dependency, a tradition claiming to preserve wisdom while punishing inquiry, and so preserving authority instead." },
    { k: "Closure", asks: "Should this still be open?",
      v: "Experiences digested, rites closed, grief transformed, vows completed or consciously released, obsolete identities relinquished. Deconsecration, farewell, burial, forgiveness and completion are technologies of closure.",
      lo: "Nothing ever ended — formative residue still demanding energy long after its purpose has gone.",
      hi: "Closed too early, before the thing had been assimilated at all." },
  ];

  const X0 = 108, X1 = 306, MID = (X0 + X1) / 2;
  const y = (i: number) => 30 + i * 34;
  const cur = sel === null ? null : P[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <svg viewBox="0 0 320 306" className="h-auto w-full" role="img" aria-labelledby="aoh-rm-t">
          <title id="aoh-rm-t">
            Eight principles drawn as beams. Each carries a virtue at its centre and fails toward
            one or both ends; beams with a single tick name only one way of failing.
          </title>

          {P.map((p, i) => {
            const on = sel === i;
            const Y = y(i);
            return (
              <g key={p.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={`Right ${p.k}`}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <rect x="0" y={Y - 13} width="320" height="26" fill="transparent" />
                <text x={X0 - 12} y={Y + 3} textAnchor="end" className="font-mono" fontSize="7.4"
                      letterSpacing="0.9"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel !== null && !on ? 0.35 : 1}>
                  {p.k.toUpperCase()}
                </text>

                <line x1={X0} y1={Y} x2={X1} y2={Y} stroke="var(--gold)"
                      strokeOpacity={on ? 0.75 : sel !== null ? 0.12 : 0.3} strokeWidth="1" />

                {/* only the ends the law actually names */}
                {p.lo && (
                  <line x1={X0} y1={Y - 5} x2={X0} y2={Y + 5} stroke="var(--bone)"
                        strokeOpacity={on ? 0.85 : sel !== null ? 0.12 : 0.4} strokeWidth="1.2" />
                )}
                {p.hi && (
                  <line x1={X1} y1={Y - 5} x2={X1} y2={Y + 5} stroke="var(--bone)"
                        strokeOpacity={on ? 0.85 : sel !== null ? 0.12 : 0.4} strokeWidth="1.2" />
                )}

                <circle cx={MID} cy={Y} r={on ? 5 : 3.4} fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : sel !== null ? 0.25 : 0.8} strokeWidth="1.3" />
              </g>
            );
          })}

          <text x={MID} y="298" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.8">
            THE VIRTUE IS THE CENTRE, NOT THE ABSENCE OF EITHER END
          </text>
        </svg>
      </div>

      <div className="min-h-[17rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Right {cur.k}
            </p>
            <p className="mt-3 font-serif text-2xl leading-relaxed text-gold">{cur.asks}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.v}</p>
            <div className="mt-6 space-y-3">
              {cur.lo && (
                <p className="border-l-2 border-bone/30 pl-5 text-sm leading-relaxed text-bone/70">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone/60">Too little · </span>
                  {cur.lo}
                </p>
              )}
              {cur.hi && (
                <p className="border-l-2 border-bone/30 pl-5 text-sm leading-relaxed text-bone/70">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone/60">
                    {cur.lo ? "Too much · " : "How it fails · "}
                  </span>
                  {cur.hi}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Eight proportions, not eight prohibitions. Each names a way a relation stays true and
              the ends it falls toward when it does not — and the virtue is never the mere absence of
              both extremes but a live centre that has to be found again as conditions change.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Right measure is the clearest case.{" "}
              <span className="text-bone/90">
                It is not mediocrity — it is the amount that strengthens the vessel&rsquo;s capacity
                for further right relation
              </span>
              , which means the correct measure changes as the vessel changes.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select a beam. Two ticks mean the law names both ways of failing; one tick means it
              names a single one, and the figure does not invent the other.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
