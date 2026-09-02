import { useState } from "react";

/**
 * TheRecursion — the loop § XVII states in one line at its close and never draws.
 *
 * Field → Form → Modified Field → New Form. The essential thing is that it does
 * not close: the field a form returns to is not the field it came from, so the
 * curve is drawn as an open spiral whose end sits above and beside its start,
 * with the continuation running off the frame. A circle would assert the opposite
 * of the section's argument.
 *
 * The descending arc carries what passage costs; the ascending arc carries what a
 * form gives back. Both sets are the section's own principles, placed on the arc
 * they belong to rather than listed apart from it.
 */
export function TheRecursion() {
  const [sel, setSel] = useState<string | null>(null);

  const DOWN = [
    { k: "Manifestation as filtering", xy: [74.4, 135.6],
      d: "Not every possibility can embody through every vessel. An ear receives only certain frequencies; a personality notices what its concerns can admit.",
      q: "Manifestation is not force descending into matter. It is possibility surviving a succession of filters." },
    { k: "Formative impedance", xy: [85.2, 200],
      d: "A vessel may resist an influence without blocking it, and the resistance changes how it appears. An institution meeting pressure for change converts it into procedure.",
      q: "Too little leaves the vessel defenceless; too much prevents necessary change." },
    { k: "Transductive loss", xy: [127.4, 249.6],
      d: "A principle rendered as image loses abstraction; image rendered as language loses immediacy; the act fixed in matter acquires limits the conception never had.",
      q: "Not a failure of embodiment. Every translation sacrifices possibilities in order to make others actual." },
    { k: "The law of remainder", xy: [187.3, 262.8],
      d: "Every formation leaves something over — possibilities excluded, force that did not enter the structure, residue the operation itself produced.",
      q: "No form says everything its originating force could have said." },
  ];

  const UP = [
    { k: "Actualisation opens possibility", xy: [251.2, 207.4],
      d: "Formation does not merely select from a fixed stock. Before language there could be no written law; before the instrument, not that music.",
      q: "Every successful formation alters what can arise after it." },
    { k: "Generative surplus", xy: [264.2, 147.3],
      d: "A form returns more than it consumed — new relations, new constraints, new occasions that did not exist before it did.",
      q: "The ground is not merely depleted by what it produces." },
    { k: "Every operation changes the operator", xy: [248, 88.1],
      d: "The one who works the passage is altered by having worked it. Nothing formative leaves its maker as it found them.",
      q: "Which is why the returning field includes whoever acted on it." },
  ];

  // an open spiral: the end sits above and beside the start
  const dPath = "M96 74 C60 128 66 208 128 250 C158 271 196 268 222 246";
  const uPath = "M222 246 C266 208 276 140 250 92 C240 72 228 60 216 52";

  const all = [...DOWN, ...UP];
  const cur = all.find((x) => x.k === sel);
  const onDown = DOWN.some((x) => x.k === sel);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,336px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[336px]">
        <style>{`
          .aoh-rec-a { stroke-dasharray: 5 9; animation: aoh-rec-run 4s linear infinite; }
          @keyframes aoh-rec-run { to { stroke-dashoffset: -28 } }
          @media (prefers-reduced-motion: reduce) { .aoh-rec-a { animation: none } }
        `}</style>
        <svg viewBox="0 0 336 320" className="h-auto w-full" role="img" aria-labelledby="aoh-rec-t">
          <title id="aoh-rec-t">
            An open spiral running from field down to form and back up to a modified field that sits
            above and beside where it began, with the continuation leaving the frame.
          </title>

          <path className="aoh-rec-a" d={dPath} fill="none" stroke="var(--gold)"
                strokeOpacity={sel && !onDown ? 0.2 : 0.7} strokeWidth="1.4" strokeLinecap="round" />
          <path className="aoh-rec-a" d={uPath} fill="none" stroke="var(--bone)"
                strokeOpacity={sel && onDown ? 0.15 : 0.55} strokeWidth="1.4" strokeLinecap="round" />
          {/* it does not close — and the gap is the argument */}
          <path d="M216 52 C210 40 206 32 204 24" fill="none" stroke="var(--bone)"
                strokeOpacity="0.3" strokeDasharray="2 5" strokeWidth="1.1" />

          {[["FIELD", 96, 74, -1], ["FORM", 222, 246, 1], ["MODIFIED FIELD", 216, 52, 1]].map(
            ([label, x, y]) => (
              <g key={String(label)}>
                <circle cx={x as number} cy={y as number} r="7" fill="var(--void)"
                        stroke="var(--gold)" strokeOpacity="0.9" strokeWidth="1.3" />
                <text x={(x as number) + (label === "FIELD" ? -12 : 13)} y={(y as number) + 3}
                      textAnchor={label === "FIELD" ? "end" : "start"} className="font-mono"
                      fontSize="7" letterSpacing="1" fill="var(--gold)" opacity="0.95">
                  {label}
                </text>
              </g>
            )
          )}

          {[...DOWN.map((x) => ({ ...x, down: true })),
            ...UP.map((x) => ({ ...x, down: false }))].map((n, i) => {
            const [x, y] = n.xy;
            const on = sel === n.k;
            return (
              <g key={n.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : n.k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={n.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : n.k); } }}>
                <circle cx={x} cy={y} r={on ? 13 : 10} fill="var(--void)"
                        stroke={n.down ? "var(--gold)" : "var(--bone)"}
                        strokeOpacity={on ? 1 : sel ? 0.22 : 0.7} strokeWidth={on ? 1.7 : 1.1} />
                <text x={x} y={y + 3} textAnchor="middle" className="font-mono" fontSize="7.4"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel && !on ? 0.35 : 1}>
                  {n.down ? i + 1 : i - DOWN.length + 1}
                </text>
              </g>
            );
          })}

          <text x="86" y="176" textAnchor="middle" className="font-mono" fontSize="6"
                letterSpacing="0.9" fill="var(--gold)" opacity={sel && !onDown ? 0.2 : 0.65}
                transform="rotate(-84 86 176)">WHAT PASSAGE COSTS</text>
          <text x="284" y="164" textAnchor="middle" className="font-mono" fontSize="6"
                letterSpacing="0.9" fill="var(--bone)" opacity={sel && onDown ? 0.15 : 0.6}
                transform="rotate(84 284 164)">WHAT FORM GIVES BACK</text>

          <text x="168" y="308" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            IT DOES NOT RETURN TO THE SAME FIELD
          </text>
        </svg>
      </div>

      <div className="min-h-[14rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {onDown ? "Descending · what passage costs" : "Ascending · what a form gives back"}
            </p>
            <p className="mt-3 font-serif text-xl text-gold">{cur.k}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-5 border-l-2 border-gold/40 pl-5 text-sm leading-relaxed text-bone/80">
              {cur.q}
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The field is not a passive background and form is not a finished object. They
              continually create, limit, interpret and transform one another — and what a form gives
              back changes what the next form can be.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              The world does not move from field to form once. It returns its achievements,
              failures, residues and novelties to the ground from which the next world must arise.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Which is why this is drawn as a spiral that fails to close. A circle would say the
              ground is unchanged by what grew out of it.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Four stations on the way down, three on the way back.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
