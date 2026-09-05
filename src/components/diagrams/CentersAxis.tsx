import { useState } from "react";

/**
 * CentersAxis — six centres on the axis and the crown above them, which is the
 * traditional arrangement rather than seven identical wheels in a series. The
 * ascent/descent toggle is not decoration: the doctrine holds that a complete
 * theurgy requires both directions, so the figure has to be readable both ways.
 */
export function CentersAxis() {
  const [sel, setSel] = useState<number | null>(null);
  const [dir, setDir] = useState<"up" | "down">("up");
  const MID = 150;
  const C = [
    { k: "Crown", s: "सहस्रार", tr: "Sahasrāra", y: 62, crown: true,
      q: "Can the individual participate in an order greater than itself without losing the capacity for embodiment?",
      op: "Spiritual participation", tat: "Akasha", eth: "Root Ether resonance", al: "Opening beyond fixation",
      n: "A gate of participation, not a tank of infinite energy. It has an affinity with Root Ether — both concern an openness prior to particular form — but they are not identical: Root Ether is the primordial medium, the crown is this vessel's opening toward it." },
    { k: "Brow", s: "आज्ञा", tr: "Ājñā", y: 152,
      q: "Can the form perceive its situation and orient itself toward an intelligible pattern?",
      op: "Vision and direction", tat: "Akasha–Tejas", eth: "Light Ether", al: "Clarified Mercury",
      n: "It does not merely see hidden things; it organizes what is seen into meaning. And an image can be distorted or false, so vision requires error correction — tested against relationship, consequence, and the governing centre." },
    { k: "Throat", s: "विशुद्ध", tr: "Viśuddha", y: 242,
      q: "Can the inner pattern be translated into a communicable form?",
      op: "Purification and expression", tat: "Akasha–Vayu", eth: "Tone Ether", al: "Mercury",
      n: "A centre of symbolic causation: speech promises, commands, names, blesses, consecrates. But expression is not automatically truthful — confused emotion becomes accusation, inflated vision becomes proclamation. Not the ability to speak, but to give an inner reality an appropriate outer form." },
    { k: "Heart", s: "अनाहत", tr: "Anāhata", y: 332,
      q: "Can this form participate in another without either consuming it or disappearing into it?",
      op: "Relation and circulation", tat: "Vayu–Apas", eth: "Tone and Life", al: "Mercury balancing Sulfur",
      n: "Not only pleasant feeling — it must also process loss, obligation, and vulnerability. Power entering the heart becomes accountable to relationship; vision becomes compassion rather than abstraction. The heart is where force learns reciprocity." },
    { k: "Solar plexus", s: "मणिपूर", tr: "Maṇipūra", y: 422,
      q: "Can this form transform what it receives into its own activity?",
      op: "Assimilation and power", tat: "Tejas", eth: "Warmth Ether", al: "Sulfur",
      n: "Digestion is the clearest image: receive the foreign, break it apart, separate usable from unusable, convert it to one's own substance. It supplies much of Ignisophia's heat but is not the Inner Sun — the furnace generates heat, the Sun governs its use." },
    { k: "Sacral", s: "स्वाधिष्ठान", tr: "Svādhiṣṭhāna", y: 512,
      q: "Can this form produce, combine, and become more than it presently is?",
      op: "Generation and cohesion", tat: "Apas", eth: "Life and Tone", al: "Mercury within Salt",
      n: "Not reducible to sexuality — that is one expression of a wider generative power that also produces art, attachment, fantasy, and new relationship. This is the centre of generative surplus: two people produce a relationship with a Morphaithēr of its own." },
    { k: "Root", s: "मूलाधार", tr: "Mūlādhāra", y: 602,
      q: "Can this form remain present?",
      op: "Embodiment and boundary", tat: "Prithivi", eth: "Life Ether", al: "Salt",
      n: "The personal entrance into the Crypt: ancestry, family pattern, bodily memory, survival response and deep habit all enter through root organization. The past is not merely recalled but embodied as posture, expectation, rhythm, and instinct." },
  ];
  const cur = sel === null ? null : C[sel];
  const order = dir === "up" ? [...C].reverse() : C;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[320px]">
        <style>{`
          .aoh-cx-run { stroke-dasharray: 26 974; animation: aoh-cx-move 11s linear infinite; }
          .aoh-cx-run.down { animation-direction: reverse; }
          @keyframes aoh-cx-move { to { stroke-dashoffset: -1000; } }
          .aoh-cx-pulse { animation: aoh-cx-breathe 7s ease-in-out infinite; transform-origin: center; }
          @keyframes aoh-cx-breathe { 0%,100% { opacity: .25 } 50% { opacity: .7 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-cx-run { animation: none; opacity: 0 }
            .aoh-cx-pulse { animation: none; opacity: .45 }
          }
        `}</style>
        <svg viewBox="0 0 300 660" className="h-auto w-full" role="img" aria-labelledby="aoh-cx-t">
          <title id="aoh-cx-t">
            Six centres along the central channel with the crown above them, and the two
            directions of the circuit: ascent as refinement, descent as embodiment.
          </title>
          <defs>
            <marker id="aoh-cx-a" markerWidth="7" markerHeight="7" refX="4.6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--gold)" fillOpacity="0.8" />
            </marker>
          </defs>
          {/* the axis proper joins the six; the crown sits above it */}
          <line x1={MID} y1={152} x2={MID} y2={602} stroke="var(--gold)" strokeOpacity="0.4" strokeWidth="1.2" />
          <line
            className={`aoh-cx-run${dir === "down" ? " down" : ""}`}
            x1={MID} y1={602} x2={MID} y2={152} pathLength={1000}
            stroke="var(--bone)" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round"
          />
          <line x1={MID} y1={92} x2={MID} y2={142} stroke="var(--gold)" strokeOpacity="0.3"
                strokeWidth="1" strokeDasharray="3 5" />
          {/* direction of the circuit */}
          <line
            x1={MID - 44} y1={dir === "up" ? 580 : 180} x2={MID - 44} y2={dir === "up" ? 180 : 580}
            stroke="var(--gold)" strokeOpacity="0.5" strokeWidth="1" markerEnd="url(#aoh-cx-a)"
          />
          <text x={MID - 50} y={dir === "up" ? 372 : 372} textAnchor="end" className="font-label"
                fontSize="7" letterSpacing="1.4" fill="var(--muted-foreground)">
            {dir === "up" ? "REFINE" : "EMBODY"}
          </text>

          {C.map((c, i) => {
            const on = sel === i;
            return (
              <g key={c.k} style={{ cursor: "pointer" }}
                 onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={c.k}
                 onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={MID} cy={c.y} r={c.crown ? 22 : 19} fill="var(--void)" />
                <circle cx={MID} cy={c.y} r={c.crown ? 22 : 19} fill="none" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : c.crown ? 0.5 : 0.6} strokeWidth={on ? 1.8 : 1}
                        strokeDasharray={c.crown ? "4 4" : undefined} />
                {on ? <circle cx={MID} cy={c.y} r={c.crown ? 30 : 27} fill="none" stroke="var(--gold)" strokeOpacity="0.4" strokeWidth="0.8" /> : null}
                <circle
                  className="aoh-cx-pulse"
                  cx={MID} cy={c.y} r={c.crown ? 30 : 27} fill="none"
                  stroke="var(--gold)" strokeWidth="0.7"
                  style={{ animationDelay: `-${(i * 1.1).toFixed(1)}s` }}
                />
                <circle cx={MID} cy={c.y} r="3.4" fill="var(--gold)" fillOpacity={on ? 1 : 0.5} />
                <text x={MID + 34} y={c.y - 2} className="font-serif" fontSize="12"
                      fill={on ? "var(--gold)" : "var(--bone)"} fillOpacity={on ? 1 : 0.75}>{c.s}</text>
                <text x={MID + 34} y={c.y + 11} className="font-label" fontSize="6.8" letterSpacing="1.2"
                      fill="var(--muted-foreground)">{c.k.toUpperCase()}</text>
              </g>
            );
          })}
          <text x={MID} y={636} textAnchor="middle" className="font-label" fontSize="7"
                letterSpacing="1.8" fill="var(--muted-foreground)">SIX ON THE AXIS · CROWN ABOVE</text>
        </svg>
        <div className="mt-3 flex justify-center gap-5 font-label text-[9px] uppercase tracking-[0.18em]">
          {(["up", "down"] as const).map((d) => (
            <button key={d} type="button" onClick={() => setDir(d)} aria-pressed={dir === d}
              className={`px-2 py-2 transition-colors ${dir === d ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
              {d === "up" ? "Ascent · refinement" : "Descent · embodiment"}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[16rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.s} · {cur.tr} — {cur.op}
            </p>
            <p className="mt-4 font-serif text-xl italic leading-relaxed text-bone">{cur.q}</p>
            <div className="mt-5 grid grid-cols-3 gap-3 border-y border-border py-4 text-[11px] leading-snug">
              <div><div className="font-label uppercase tracking-[0.15em] text-muted-foreground">Tattva</div><div className="mt-1 text-bone/85">{cur.tat}</div></div>
              <div><div className="font-label uppercase tracking-[0.15em] text-muted-foreground">Ether</div><div className="mt-1 text-bone/85">{cur.eth}</div></div>
              <div><div className="font-label uppercase tracking-[0.15em] text-muted-foreground">Alchemy</div><div className="mt-1 text-bone/85">{cur.al}</div></div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cur.n}</p>
          </>
        ) : (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {dir === "up" ? "Ascent · refinement" : "Descent · embodiment"}
            </p>
            <div className="mt-4 space-y-px">
              {order.map((c) => (
                <div key={c.k} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-border py-2.5">
                  <span className="font-label text-[10px] uppercase tracking-[0.18em] text-gold-dim">{c.k}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{c.op}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-bone/80">
              Ascent without descent gives revelation without embodiment; descent without ascent
              gives activity without orientation.{" "}
              <span className="text-gold-dim">A complete theurgy requires both.</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * TheChariot — Hod and Netzach as the two wheels, the Inner Sun as the centre.
 * The divided/gathered toggle is the doctrine, not decoration: divided, the
 * wheels counter-rotate and the Sun goes dim, which is the section's own image
 * of several animals pulling a chariot in opposing directions. Gathered, they
 * turn together and the centre lights.
 */
