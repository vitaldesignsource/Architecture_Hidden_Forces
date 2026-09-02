import { useState } from "react";

/**
 * SophianicFaces — five faces over a shared depth.
 *
 * The section is careful that none of the five is the complete feminine and that
 * the Dark Feminine is not a sixth face beside them but the gestational,
 * dissolving, nocturnal depth underneath all of them. So the ring holds the five
 * and the centre holds the dark — and the dark carries its own distortions,
 * because the section says it stays Sophianic only while darkness serves
 * transformation rather than permanent captivity.
 *
 * Deliberately not mapped to biological sex: these are modes the principle
 * operates through in anyone.
 */
export function SophianicFaces() {
  const [sel, setSel] = useState<string | null>(null);
  const C = 168, R = 104;

  const FACES = [
    { k: "Mother", a: -90,
      d: "Gestation, nourishment, protection, continuity — and the power to release what has been formed. The last of these is the one most often forgotten." },
    { k: "Virgin", a: -18,
      d: "Sovereignty and interior wholeness. Not a sexual status but a centre that is not possessed by another." },
    { k: "Lover", a: 54,
      d: "Eros, attraction, union, beauty, pleasure — the power through which separate beings seek participation without dissolving into one another." },
    { k: "Queen", a: 126,
      d: "Order, boundary, authority, stewardship, and the governance of relationships within a larger field." },
    { k: "Crone", a: 198,
      d: "Memory, mortality, discernment, endings — and wisdom liberated from the demand to remain pleasing or fertile." },
  ];

  const DARK = [
    ["Gestation", "indefinite concealment"],
    ["Protection", "possession"],
    ["Mystery", "manipulation"],
    ["Dissolution", "despair"],
  ];

  const pt = (a: number, r: number) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)];
  const face = FACES.find((f) => f.k === sel);
  const dark = sel === "dark";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <svg viewBox="0 0 336 340" className="h-auto w-full" role="img" aria-labelledby="aoh-sf-t">
          <title id="aoh-sf-t">
            Five faces on a ring — Mother, Virgin, Lover, Queen, Crone — around a dark centre that
            is not a sixth face but the depth beneath all of them.
          </title>

          <defs>
            <radialGradient id="aoh-sf-dark">
              <stop offset="0%" stopColor="var(--void)" />
              <stop offset="70%" stopColor="var(--void)" />
              <stop offset="100%" stopColor="var(--bone)" stopOpacity="0.12" />
            </radialGradient>
          </defs>

          <circle cx={C} cy={C} r={R} fill="none" stroke="var(--gold)"
                  strokeOpacity={dark ? 0.15 : 0.3} strokeWidth="1" />

          {/* the depth beneath, not a sixth face beside */}
          <g style={{ cursor: "pointer" }} onClick={() => setSel(dark ? null : "dark")}
             role="button" tabIndex={0} aria-pressed={dark} aria-label="The Dark Feminine"
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(dark ? null : "dark"); } }}>
            <circle cx={C} cy={C} r={dark ? 52 : 46} fill="url(#aoh-sf-dark)" stroke="var(--bone)"
                    strokeOpacity={dark ? 0.6 : 0.25} strokeDasharray="3 6" strokeWidth="1" />
            <text x={C} y={C - 3} textAnchor="middle" className="font-mono" fontSize="6.6"
                  letterSpacing="1" fill={dark ? "var(--gold)" : "var(--muted-foreground)"}>THE DARK</text>
            <text x={C} y={C + 8} textAnchor="middle" className="font-mono" fontSize="6.6"
                  letterSpacing="1" fill={dark ? "var(--gold)" : "var(--muted-foreground)"}>FEMININE</text>
          </g>

          {FACES.map((f) => {
            const [x, y] = pt(f.a, R);
            const on = sel === f.k;
            return (
              <g key={f.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : f.k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={f.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : f.k); } }}>
                <circle cx={x} cy={y} r={on ? 25 : 21} fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : sel ? 0.28 : 0.65} strokeWidth={on ? 1.7 : 1.1} />
                <text x={x} y={y + 3} textAnchor="middle" className="font-mono" fontSize="6.6"
                      letterSpacing="0.8" fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel && !on ? 0.4 : 1}>
                  {f.k.toUpperCase()}
                </text>
              </g>
            );
          })}

          <text x={C} y="330" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            NONE OF THEM IS THE COMPLETE FEMININE
          </text>
        </svg>
      </div>

      <div className="min-h-[16rem]">
        {face ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              The {face.k}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{face.d}</p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              A symbolic mode the principle operates through — in individuals, cultures, rites, and
              stages of transformation. Not a role any woman is required to enact.
            </p>
          </>
        ) : dark ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/70">
              The Dark Feminine
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Not evil — the hidden, gestational, dissolving, nocturnal aspect of formation. The dark
              womb conceals what is not ready to emerge; the tomb receives what can no longer remain
              embodied; night withdraws visible distinctions; grief dissolves attachment to what has
              passed; silence breaks the compulsion to fill every space with speech.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              She strips away false illumination — the demand that everything be immediately
              understandable, productive, positive, or revealed.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60">
              And her distortions
            </p>
            <div className="mt-3 space-y-px">
              {DARK.map(([a, b]) => (
                <div key={a} className="grid grid-cols-[9rem_1fr] items-baseline gap-3 border-b border-border py-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">becomes {b}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              She remains Sophianic only while darkness serves transformation rather than permanent
              captivity.
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Five faces, and a depth beneath them. The dark is drawn at the centre rather than as a
              sixth point on the ring because it is not another face — it is the gestational and
              dissolving ground the others stand on.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Which is also why receptivity here is never passivity.{" "}
              <span className="text-bone/90">
                The womb is receptive, and its receptivity is intensely active
              </span>{" "}
              — it selects, nourishes, differentiates, protects, transforms, and finally releases.
              What receives determines what the received force can become.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select a face, or the depth they share.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
