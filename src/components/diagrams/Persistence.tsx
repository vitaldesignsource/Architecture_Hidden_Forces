import { useState } from "react";

/**
 * Persistence — what remains after a death, and where the evidence stops.
 *
 * The section's most careful move is a distinction most systems blur: four kinds
 * of persistence follow from embodiment and are defensible on their own terms;
 * the fifth is a stronger claim, and the first four do not establish it. So the
 * figure draws the break rather than the ladder — four joined bands, then a gap
 * that is not crossed by an arrow.
 *
 * Drawn plainly. This is not a subject for cleverness.
 */
export function Persistence() {
  const [sel, setSel] = useState<number | null>(null);

  const KINDS = [
    { k: "Material", d: "The components of the body return to wider biological and elemental cycles. Heat disperses, chemical relations change, tissue enters other systems.", firm: true },
    { k: "Causal", d: "The person's actions go on producing consequences after the person is gone — in outcomes they set in motion and never saw.", firm: true },
    { k: "Formative", d: "Habits transmitted to others, changes made to places, emotional imprints, institutions, works, children, relationships, collective structures.", firm: true },
    { k: "Symbolic and traditional", d: "Names, images, teachings, stories, rites, remembrance — the person carried in what a community continues to recognise.", firm: true },
    { k: "Personal or spiritual", d: "That some centre of awareness or identity continues beyond bodily death. The architecture may leave room for this. It should not pretend the four kinds above prove it.", firm: false },
  ];

  const W = 300, X0 = 26, H = 34, GAP = 12, BREAK = 30;
  const y = (i: number) => 30 + i * (H + GAP) + (i === 4 ? BREAK : 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,350px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[350px]">
        <svg viewBox="0 0 350 290" className="h-auto w-full" role="img" aria-labelledby="aoh-ps-t">
          <title id="aoh-ps-t">
            Five kinds of persistence after death. The first four are drawn joined; the fifth sits
            below a break that no connector crosses.
          </title>

          {/* the four that follow from embodiment are linked */}
          {[0, 1, 2].map((i) => (
            <line key={i} x1={X0 + 16} y1={y(i) + H} x2={X0 + 16} y2={y(i + 1)}
                  stroke="var(--gold)" strokeOpacity="0.5" strokeWidth="1.1" />
          ))}

          {/* and the fifth does not follow — the gap is the argument */}
          <line x1={X0} y1={y(3) + H + 20} x2={X0 + W} y2={y(3) + H + 20}
                stroke="var(--bone)" strokeOpacity="0.3" strokeDasharray="3 6" strokeWidth="1" />
          <text x={X0 + W} y={y(3) + H + 14} textAnchor="end" className="font-label" fontSize="6.4"
                letterSpacing="0.9" fill="var(--muted-foreground)">
            THE FOUR ABOVE DO NOT ESTABLISH THE ONE BELOW
          </text>

          {KINDS.map((n, i) => {
            const on = sel === i;
            return (
              <g key={n.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={n.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <rect x={X0} y={y(i)} width={W} height={H} fill="var(--void)"
                      stroke={n.firm ? "var(--gold)" : "var(--bone)"}
                      strokeOpacity={on ? 1 : n.firm ? 0.55 : 0.35}
                      strokeDasharray={n.firm ? "none" : "5 4"}
                      strokeWidth={on ? 1.7 : 1} />
                <text x={X0 + 14} y={y(i) + 21} className="font-label" fontSize="8.5"
                      letterSpacing="1.1"
                      fill={on ? "var(--gold)" : n.firm ? "var(--bone)" : "var(--muted-foreground)"}
                      fillOpacity={on ? 1 : 0.85}>
                  {n.k.toUpperCase()}
                </text>
              </g>
            );
          })}

          <text x={X0} y="284" className="font-label" fontSize="6.6" letterSpacing="1"
                fill="var(--muted-foreground)" opacity="0.8">
            THE WORLD RETAINS CONSEQUENCES EVEN WHERE IT DOES NOT RETAIN FORMS
          </text>
        </svg>
      </div>

      <div className="min-h-[14rem]">
        {sel !== null ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {KINDS[sel].firm ? "Follows from embodiment" : "A stronger claim"}
            </p>
            <p className="mt-3 font-serif text-2xl text-gold">{KINDS[sel].k}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{KINDS[sel].d}</p>
            {!KINDS[sel].firm && (
              <p className="mt-5 border-l-2 border-bone/40 pl-5 text-sm leading-relaxed text-bone/70">
                The redistribution of a person&rsquo;s effects is not identical to the continuation
                of the person as a conscious subject. Whether the dead also remain as conscious
                beings is a further question, requiring its own evidence and its own discernment.
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Death does not make the matter disappear. What dies is the body&rsquo;s capacity to go
              on gathering those materials as <span className="italic">this</span> living unity —
              which is why several kinds of persistence have to be told apart rather than collected
              under one vague idea of survival.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Four of them follow from embodiment and stand on their own. The fifth is a stronger
              claim, and the architecture leaves room for it{" "}
              <span className="text-bone/90">without pretending the first four prove it</span>.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Which is also what the Crypt of § XI can honestly claim: not a warehouse holding
              perfect copies of the dead, but that no completed life leaves the formative field
              exactly as it found it.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
