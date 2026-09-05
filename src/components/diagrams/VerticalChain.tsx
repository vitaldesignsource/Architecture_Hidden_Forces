import { useState } from "react";

/**
 * VerticalChain — the chain drawn radially, because the doctrine states its own
 * geometry: the Name is the governing centre, the Archangel the circumference of
 * an ordered field, Angels the differentiated rays between them, Spirits those
 * rays in local operation. "Vertical" never meant floors stacked in space, so a
 * ladder would import the wrong picture. Descent runs outward, return inward.
 */
export function VerticalChain() {
  const [sel, setSel] = useState<string | null>(null);
  const [up, setUp] = useState(false);
  const C = 170;
  const RAYS = [-90, -30, 30, 90, 150, 210];
  const L = [
    { k: "Divine Name", kind: "participable virtue",
      q: "A verbal-symbolic vessel through which a divine relationship becomes intelligible and participable — not an exhaustive label attached to God.",
      d: "It stands at the boundary between apophatic transcendence and articulated Logos, which makes it a symbolon: it joins the unnameable to a form that can be spoken, remembered, contemplated, enacted. A sacred name is a gate, not the whole country beyond it." },
    { k: "Archangel", kind: "office of mediation",
      q: "The coordinating centre of an entire chain — archē means beginning, rule, governing principle, chief office.",
      d: "Not simply a more powerful Angel. Where the Name establishes the central virtue, the Archangel establishes its field-wide administration, holding many subordinate expressions inside one intelligible purpose. Its proper function is integration." },
    { k: "Intelligence", kind: "mode of operation",
      q: "The pattern-holding pole: ratio, direction, law, geometry, intelligible purpose.",
      d: "It asks what the intelligible organisation of a sphere is, where Spirit asks how that organisation becomes dynamically active here. Number and geometry suit it as symbols precisely because they preserve relationships without depending on any particular material embodiment." },
    { k: "Angel", kind: "office of mediation",
      q: "A differentiated ray of a more encompassing virtue. Angelos means messenger — an office, not a species.",
      d: "The Archangel is architectonic; the Angel is ministerial. And no Angel merely transports an unchanged packet: mediation is always translation, adapted to the capacity, language, symbols, and circumstances of whoever receives it. Wings say mobility between levels, not anatomy." },
    { k: "Spirit", kind: "mode of operation",
      q: "The dynamic, locally operative expression of a more intelligible pattern.",
      d: "The Intelligence holds the grammar; the Spirit performs an utterance. Strongly Mercurial — it circulates, animates, crosses boundaries, takes imaginal form. Its nearness to embodiment makes it responsive to local conditions and, by the same token, susceptible to turbulence, fixation, and admixture." },
    { k: "The vessel", kind: "embodiment",
      q: "Image, symbol, ritual, psyche, and material vessel — where the chain becomes actual.",
      d: "Every manifestation is also a transduction. Even were a spirit ontologically independent, its appearance is still shaped by the operator's condition, the symbolic vocabulary available, the surrounding Morphaithēr, collective expectation, bodily state, and the material environment." },
  ];
  const cur = L.find((x) => x.k === sel) || null;
  const on = (k: string) => sel === k;
  const dim = (k: string) => (sel && sel !== k ? 0.22 : 1);
  const pt = (a: number, r: number) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-vc-ray { stroke-dasharray: 4 11; animation: aoh-vc-out 3.2s linear infinite; }
          .aoh-vc-up .aoh-vc-ray { animation-direction: reverse; }
          @keyframes aoh-vc-out { to { stroke-dashoffset: -30 } }
          .aoh-vc-h { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-vc-ray { animation: none } }
        `}</style>
        <svg viewBox="0 0 340 340" className={`h-auto w-full ${up ? "aoh-vc-up" : ""}`}
             role="img" aria-labelledby="aoh-vc-t">
          <title id="aoh-vc-t">
            A radial chain: the Divine Name at the centre, the archangelic field as a
            circumference, the Intelligence as a ring of proportion, angelic rays crossing outward
            to spirits in local operation, and an outer boundary of vessels.
          </title>

          <g className="aoh-vc-h" opacity={dim("The vessel")} onClick={() => setSel(on("The vessel") ? null : "The vessel")}
             role="button" tabIndex={0} aria-pressed={on("The vessel")} aria-label="The vessel">
            <circle cx={C} cy={C} r="152" fill="none" stroke="var(--gold)" strokeDasharray="1 6"
                    strokeOpacity={on("The vessel") ? 0.9 : 0.28} strokeWidth={on("The vessel") ? 1.4 : 0.9} />
          </g>

          <g className="aoh-vc-h" opacity={dim("Angel")} onClick={() => setSel(on("Angel") ? null : "Angel")}
             role="button" tabIndex={0} aria-pressed={on("Angel")} aria-label="Angel">
            {RAYS.map((a) => {
              const [x1, y1] = pt(a, 54), [x2, y2] = pt(a, 126);
              return <line key={a} className="aoh-vc-ray" x1={x1} y1={y1} x2={x2} y2={y2}
                           stroke="var(--gold)" strokeOpacity={on("Angel") ? 1 : 0.55}
                           strokeWidth={on("Angel") ? 2 : 1.2} />;
            })}
          </g>

          <g className="aoh-vc-h" opacity={dim("Intelligence")} onClick={() => setSel(on("Intelligence") ? null : "Intelligence")}
             role="button" tabIndex={0} aria-pressed={on("Intelligence")} aria-label="Intelligence">
            <circle cx={C} cy={C} r="90" fill="none" stroke="var(--gold)" strokeDasharray="7 5"
                    strokeOpacity={on("Intelligence") ? 1 : 0.4} strokeWidth={on("Intelligence") ? 1.6 : 0.9} />
          </g>

          <g className="aoh-vc-h" opacity={dim("Archangel")} onClick={() => setSel(on("Archangel") ? null : "Archangel")}
             role="button" tabIndex={0} aria-pressed={on("Archangel")} aria-label="Archangel">
            <circle cx={C} cy={C} r="54" fill="none" stroke="var(--gold)"
                    strokeOpacity={on("Archangel") ? 1 : 0.6} strokeWidth={on("Archangel") ? 2 : 1.2} />
          </g>

          <g className="aoh-vc-h" opacity={dim("Spirit")} onClick={() => setSel(on("Spirit") ? null : "Spirit")}
             role="button" tabIndex={0} aria-pressed={on("Spirit")} aria-label="Spirit">
            {RAYS.map((a) => {
              const [x, y] = pt(a, 126);
              return <circle key={a} cx={x} cy={y} r={on("Spirit") ? 7 : 5} fill="var(--void)"
                             stroke="var(--gold)" strokeOpacity={on("Spirit") ? 1 : 0.6} strokeWidth="1.2" />;
            })}
          </g>

          <g className="aoh-vc-h" opacity={dim("Divine Name")} onClick={() => setSel(on("Divine Name") ? null : "Divine Name")}
             role="button" tabIndex={0} aria-pressed={on("Divine Name")} aria-label="Divine Name">
            <circle cx={C} cy={C} r="26" fill="var(--void)" stroke="var(--gold)"
                    strokeOpacity={on("Divine Name") ? 1 : 0.5} strokeWidth="1" />
            <circle cx={C} cy={C} r={on("Divine Name") ? 12 : 9} fill="var(--gold)"
                    fillOpacity={on("Divine Name") ? 1 : 0.7} />
          </g>

          <text x={C} y="330" textAnchor="middle" className="font-label" fontSize="7.5" letterSpacing="1.6"
                fill="var(--muted-foreground)">
            {up ? "RETURN · INWARD, TOWARD SILENCE" : "DESCENT · OUTWARD, TOWARD EMBODIMENT"}
          </text>
        </svg>

        <div className="mt-3 flex justify-center">
          <button onClick={() => setUp((v) => !v)}
            className="border border-border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-gold hover:text-gold">
            reverse the chain ⇄
          </button>
        </div>
      </div>

      <div className="min-h-[16rem]">
        <div className="flex flex-wrap gap-2">
          {L.map((x) => (
            <button key={x.k} onClick={() => setSel(on(x.k) ? null : x.k)} aria-pressed={on(x.k)}
              className={`border px-3 py-1.5 text-xs transition-colors ${
                on(x.k) ? "border-gold text-gold"
                        : "border-border text-muted-foreground hover:border-gold/60 hover:text-bone/80"}`}>
              {x.k}
            </button>
          ))}
        </div>
        {cur ? (
          <>
            <p className="mt-6 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.k} — {cur.kind}
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-bone/85">{cur.q}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
          </>
        ) : (
          <>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Vertical does not mean these occupy physical floors above the earth. It marks degrees
              of universality and participation — unitive, intelligible, differentiated, operative,
              embodied. The higher member holds a virtue more universally; the lower translates it
              into a more specialised function, adding definition while introducing limitation,
              interpretation, and the possibility of distortion.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Which is why it is drawn as a centre and its circumference rather than a stair. And it
              runs both ways: descent is how virtue becomes actual, return is how embodied experience
              is consciously reintegrated with its source.{" "}
              <span className="text-bone/90">Descent is not degradation.</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Hypostases — the three Plotinian levels with the Proclan rhythm around them.
 * The core never changes size or brightness while the pulses leave it, because
 * that is the whole counter-intuitive claim of procession: the higher principle
 * causes through intelligible abundance, not material subtraction. Selecting a
 * hypostasis also names what it must NOT be identified with, which is the part
 * of the mapping most easily lost.
 */
