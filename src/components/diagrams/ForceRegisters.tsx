import { useState } from "react";

/**
 * ForceRegisters — the six categories drawn as three different KINDS of thing,
 * because they are not six equivalent substances. Transcendent, formative and
 * material are ontological registers (stacked bands); psychic and collective are
 * scales of organisation (bars cutting across every band); intermediary is a
 * function performed between registers (the serpentine thread crossing them).
 * Six equal boxes would state the opposite of the doctrine.
 */
export function ForceRegisters() {
  const [sel, setSel] = useState<string | null>(null);
  const BANDS = [
    { k: "Transcendent", y: 16, mode: "Attraction, participation, finality",
      q: "Toward what does formation tend?",
      kind: "ontological register",
      d: "Strictly it should not be called a force at all — force implies operation inside a field of relations, and the Absolute cannot be placed in that field as its most powerful object. These orient without pushing. The Good does not shove a being toward goodness; it draws by becoming an object of participation." },
    { k: "Formative", y: 100, mode: "Patterning, proportion, constraint",
      q: "According to what organisation does it form?",
      kind: "ontological register",
      d: "Not the energy that moves a system but the pattern, boundary, proportion, gradient and attractor according to which movement takes form. A riverbed does not create the water. A scale does not create the sound." },
    { k: "Material", y: 184, mode: "Physical interaction, resistance, embodiment",
      q: "Through what concrete conditions does it occur?",
      kind: "ontological register",
      d: "Resistance, limitation, weight, delay, cost, irreversibility — not failures of spirit but the conditions through which formation acquires consequence. And matter answers back: exhaustion changes emotion, architecture changes movement, nutrition changes attention." },
  ];
  const BARS = [
    { k: "Psychic", x: 322, mode: "Attention, affect, intention, imagination",
      q: "How does it move within a conscious vessel?",
      kind: "scale of organisation",
      d: "Real, because it alters perception, physiology, choice, behaviour, relationship and environment — but never a disembodied substance inside the skull. Psychic force is embodied, relational, and field-dependent, which is why it cuts across every register rather than sitting in one." },
    { k: "Collective", x: 372, mode: "Emergence, coordination, social reinforcement",
      q: "How does it organise among many vessels?",
      kind: "scale of organisation",
      d: "Distributed causation. Language is produced by people, yet no single speaker controls it; money depends on recognition, yet determines what is possible for those born into it. More than any one participant's intention, without necessarily being an independently conscious being." },
  ];
  const THREAD = { k: "Intermediary", mode: "Translation and transduction",
    q: "How does it cross from one domain into another?",
    kind: "function between registers",
    d: "Not a sixth substance inserted between spirit and matter — the Mercurial category, naming any process that receives a pattern in one form, alters it by its own constitution, and delivers it in another. Which is why it is drawn crossing the registers rather than occupying one." };
  const ALL = [...BANDS, ...BARS, THREAD];
  const cur = ALL.find((x) => x.k === sel) || null;
  const on = (k: string) => sel === k;
  const dim = (k: string) => (sel && sel !== k ? 0.25 : 1);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[420px]">
        <style>{`
          .aoh-fr-t { stroke-dasharray: 5 7; animation: aoh-fr-flow 3.4s linear infinite; }
          @keyframes aoh-fr-flow { to { stroke-dashoffset: -24 } }
          .aoh-fr-h { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-fr-t { animation: none } }
        `}</style>
        <svg viewBox="0 0 420 292" className="h-auto w-full" role="img" aria-labelledby="aoh-fr-t2">
          <title id="aoh-fr-t2">
            Three stacked bands are ontological registers; two vertical bars cutting across all of
            them are scales of organisation; a serpentine thread crossing the bands is the
            intermediary function.
          </title>

          {BANDS.map((b) => (
            <g key={b.k} className="aoh-fr-h" opacity={dim(b.k)} onClick={() => setSel(on(b.k) ? null : b.k)}
               role="button" tabIndex={0} aria-pressed={on(b.k)} aria-label={b.k}
               onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on(b.k) ? null : b.k); } }}>
              <rect x="16" y={b.y} width="280" height="58" fill="var(--void)"
                    stroke="var(--gold)" strokeOpacity={on(b.k) ? 1 : 0.45} strokeWidth={on(b.k) ? 1.5 : 0.9} />
              <text x="76" y={b.y + 27} className="font-serif" fontSize="15"
                    fill={on(b.k) ? "var(--gold)" : "var(--bone)"} fillOpacity={on(b.k) ? 1 : 0.8}>{b.k}</text>
              <text x="76" y={b.y + 44} className="font-label" fontSize="7" letterSpacing="1.1"
                    fill="var(--muted-foreground)">ONTOLOGICAL REGISTER</text>
            </g>
          ))}

          {BARS.map((b) => (
            <g key={b.k} className="aoh-fr-h" opacity={dim(b.k)} onClick={() => setSel(on(b.k) ? null : b.k)}
               role="button" tabIndex={0} aria-pressed={on(b.k)} aria-label={b.k}
               onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on(b.k) ? null : b.k); } }}>
              <rect x={b.x - 13} y="16" width="26" height="226" fill="var(--void)"
                    stroke="var(--gold)" strokeOpacity={on(b.k) ? 1 : 0.4} strokeWidth={on(b.k) ? 1.5 : 0.9} />
              {[45, 129, 213].map((cy) => (
                <line key={cy} x1={b.x - 13} y1={cy} x2={b.x + 13} y2={cy}
                      stroke="var(--gold)" strokeOpacity={on(b.k) ? 0.55 : 0.2} strokeWidth="0.6" />
              ))}
              <text x={b.x} y="129" textAnchor="middle" transform={`rotate(-90 ${b.x} 129)`}
                    className="font-label" fontSize="9.5" letterSpacing="2"
                    fill={on(b.k) ? "var(--gold)" : "var(--bone)"} fillOpacity={on(b.k) ? 1 : 0.75}>
                {b.k.toUpperCase()}
              </text>
            </g>
          ))}

          <g className="aoh-fr-h" opacity={dim(THREAD.k)} onClick={() => setSel(on(THREAD.k) ? null : THREAD.k)}
             role="button" tabIndex={0} aria-pressed={on(THREAD.k)} aria-label={THREAD.k}
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on(THREAD.k) ? null : THREAD.k); } }}>
            <path className={on(THREAD.k) ? "aoh-fr-t" : "aoh-fr-t"}
                  d="M46,8 C70,44 22,64 46,87 C70,110 22,148 46,171 C70,196 22,222 46,250"
                  fill="none" stroke="var(--gold)" strokeOpacity={on(THREAD.k) ? 1 : 0.5}
                  strokeWidth={on(THREAD.k) ? 1.8 : 1.1} />
            {[87, 171].map((cy) => (
              <circle key={cy} cx="46" cy={cy} r={on(THREAD.k) ? 4 : 3} fill="var(--void)"
                      stroke="var(--gold)" strokeOpacity={on(THREAD.k) ? 1 : 0.55} strokeWidth="1" />
            ))}
            <text x="46" y="268" textAnchor="middle" className="font-label" fontSize="7.5" letterSpacing="1.2"
                  fill={on(THREAD.k) ? "var(--gold)" : "var(--muted-foreground)"}>INTERMEDIARY</text>
          </g>

          <text x="176" y="284" textAnchor="middle" className="font-label" fontSize="7" letterSpacing="1.2"
                fill="var(--muted-foreground)" opacity="0.75">
            REGISTERS STACK · SCALES CUT ACROSS · THE FUNCTION CROSSES BETWEEN
          </text>
        </svg>
      </div>

      <div className="min-h-[16rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.k} — {cur.kind}
            </p>
            <div className="mt-4 space-y-px">
              <div className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-border py-3">
                <span className="font-label text-[10px] uppercase tracking-[0.15em] text-gold-dim">Causal mode</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{cur.mode}</span>
              </div>
              <div className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-border py-3">
                <span className="font-label text-[10px] uppercase tracking-[0.15em] text-gold-dim">It asks</span>
                <span className="font-serif text-base italic leading-relaxed text-gold">{cur.q}</span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              A force here is any organised capacity to produce, direct, inhibit, or transform a
              state — not necessarily a measurable physical energy. But the six categories are not
              six equivalent substances, and drawing them as six equal boxes would say the opposite
              of what they are.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Transcendent, formative and material name{" "}
              <span className="text-bone/90">ontological registers</span>. Psychic and collective
              name <span className="text-bone/90">scales of organisation</span>, which is why they
              cut across every register instead of occupying one. Intermediary names a{" "}
              <span className="text-bone/90">function performed between registers</span>, so it is
              drawn crossing them.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Holding that apart is what keeps the system from turning every influence into another
              invisible fluid.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * VerticalChain — the chain drawn radially, because the doctrine states its own
 * geometry: the Name is the governing centre, the Archangel the circumference of
 * an ordered field, Angels the differentiated rays between them, Spirits those
 * rays in local operation. "Vertical" never meant floors stacked in space, so a
 * ladder would import the wrong picture. Descent runs outward, return inward.
 */
