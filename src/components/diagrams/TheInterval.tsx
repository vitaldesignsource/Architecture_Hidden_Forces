import { useState } from "react";

/**
 * TheInterval — five things usually collapsed into one, and the four gaps between.
 *
 * The section's method is not a claim about what subtle experience is. It is a
 * discipline of not answering that question too early: sensation is not image,
 * image is not interpretation, interpretation is not belief, and belief is not a
 * factual claim. Each step is a further commitment, and the gaps are where
 * discernment can still act.
 *
 * So the risers are drawn as the subject, not the treads. Collapsing a gap is
 * how a real experience becomes an unexamined conclusion — which is why the
 * figure names what each one costs.
 */
export function TheInterval() {
  const [sel, setSel] = useState<number | null>(null);

  const STEPS = [
    { k: "Sensation", d: "What was actually given. A constriction in the chest — before it has been called anything at all." },
    { k: "Image", d: "The form it takes inwardly. A weight, a band, a closing door. Already a psychic formation, not the sensation itself." },
    { k: "Interpretation", d: "What it is taken to mean. Grief, anxiety, physical strain, remembered fear — any of which could accompany the same constriction." },
    { k: "Belief", d: "The interpretation held as settled, and no longer under review." },
    { k: "Factual claim", d: "An assertion about the world beyond the experience — one that could, in principle, be checked." },
  ];

  const GAPS = [
    { k: "Sensation → Image", cost: "Take the image for the sensation and you have already chosen a shape for something that had none yet." },
    { k: "Image → Interpretation", cost: "Take the interpretation for the image and the other possible readings stop being visible." },
    { k: "Interpretation → Belief", cost: "Take belief for interpretation and inquiry closes. The reading becomes the thing." },
    { k: "Belief → Claim", cost: "Take the claim for the belief and a private certainty starts making public assertions it has not earned." },
  ];

  const X0 = 44, W = 250, H = 40, GAP = 16;
  const yOf = (i: number) => 40 + (4 - i) * (H + GAP);

  const step = sel !== null && sel % 2 === 0 ? STEPS[sel / 2] : null;
  const gap = sel !== null && sel % 2 === 1 ? GAPS[(sel - 1) / 2] : null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <svg viewBox="0 0 340 336" className="h-auto w-full" role="img" aria-labelledby="aoh-int-t">
          <title id="aoh-int-t">
            Five stages rising from sensation to factual claim, with the four intervals between them
            marked as the places discernment can still act.
          </title>

          {STEPS.map((s, i) => {
            const on = sel === i * 2;
            const y = yOf(i);
            return (
              <g key={s.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : i * 2)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={s.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i * 2); } }}>
                <rect x={X0 + i * 8} y={y} width={W - i * 8} height={H} fill="var(--gold)"
                      fillOpacity={on ? 0.09 : 0.022} stroke="var(--gold)"
                      strokeOpacity={on ? 1 : sel !== null ? 0.18 : 0.5}
                      strokeWidth={on ? 1.7 : 1} />
                <text x={X0 + i * 8 + 14} y={y + 24} className="font-mono" fontSize="8.4"
                      letterSpacing="1.1" fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel !== null && !on ? 0.3 : 1}>{s.k.toUpperCase()}</text>
              </g>
            );
          })}

          {/* the risers — what the figure is actually about */}
          {GAPS.map((g, i) => {
            const on = sel === i * 2 + 1;
            const y = yOf(i) - GAP;
            return (
              <g key={g.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : i * 2 + 1)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={g.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i * 2 + 1); } }}>
                <rect x={X0} y={y} width={W} height={GAP} fill="transparent" />
                <line x1={X0 + 6} y1={y + GAP / 2} x2={X0 + W - 6} y2={y + GAP / 2}
                      stroke="var(--bone)" strokeOpacity={on ? 0.85 : sel !== null ? 0.12 : 0.3}
                      strokeDasharray="2 5" strokeWidth={on ? 1.5 : 1} />
                <circle cx={X0 + W + 14} cy={y + GAP / 2} r={on ? 5 : 3}
                        fill="var(--bone)" fillOpacity={on ? 0.9 : sel !== null ? 0.15 : 0.4} />
              </g>
            );
          })}

          <text x="170" y="328" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            THE GAPS ARE THE SUBJECT — NOT THE STEPS
          </text>
        </svg>
      </div>

      <div className="min-h-[13rem]">
        {step ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">{step.k}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{step.d}</p>
          </>
        ) : gap ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/70">
              The interval · {gap.k}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/85">{gap.cost}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Nothing here says the experience was not real. It says the experience being real
              settles nothing about what it means.
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              A constriction in the chest may accompany anxiety, grief, physical strain, or
              remembered fear. Calling it a blockage, an attack, or a presence closes the inquiry
              before the architecture has been looked at.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              Reality of experience does not establish correctness of interpretation.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              A dream figure can be psychologically real and transformative without being an external
              being. A sensed presence can matter without its status being knowable yet. An inner
              voice can carry wisdom without earning unquestioned authority.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select a stage, or one of the four intervals between them.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
