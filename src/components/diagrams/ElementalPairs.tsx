import { useState } from "react";

/**
 * ElementalPairs — the six minglings as the six edges of a complete graph on four
 * elements. The two diagonals cross at Akasha, which is doctrinally exact: it is
 * the interval in which the others meet, not a fifth thing mixing with them.
 */
export function ElementalPairs() {
  const [sel, setSel] = useState<number | null>(null);
  const [akasha, setAkasha] = useState(false);
  const N = [
    { k: "Fire", z: "Πῦρ", x: 92, y: 92, verb: "heats, separates, transforms" },
    { k: "Air", z: "Ἀήρ", x: 268, y: 92, verb: "moves, exchanges, communicates" },
    { k: "Water", z: "Ὕδωρ", x: 92, y: 268, verb: "joins, dissolves, receives" },
    { k: "Earth", z: "Γῆ", x: 268, y: 268, verb: "contains, fixes, embodies" },
  ];
  const E = [
    { a: 0, b: 1, t: "Fire · Air", third: "rising current", d: "Naturally amplifying. Air gives Fire movement, oxygen, and reach; Fire warms Air and lifts it. Together: rapid transformation, communication, contagion.", bal: "Inspired intelligence, articulate courage, rapid learning, creative momentum.", exc: "Agitation, argument, racing thought, inflammatory speech, uncontrolled escalation.", note: "Air feeds a fire — but strong or cold movement scatters a weak flame. The relation depends on rhythm." },
    { a: 0, b: 2, t: "Fire · Water", third: "steam", d: "The central polarity. Fire separates, rises, intensifies, reveals distinction; Water joins, descends, moderates, restores continuity.", bal: "Cooking, incubation, digestion, fermentation, tempering, circulation.", exc: "Either quenched inert, or the vessel boiled dry.", note: "Fire must not simply defeat Water. Fire warms Water so it circulates; Water contains Fire so it does not consume the vessel." },
    { a: 0, b: 3, t: "Fire · Earth", third: "ceramic, metal, ash, glass", d: "Fire activates what Earth has fixed — hardening clay, forging metal, releasing what was stored, parting pure material from residue.", bal: "Discipline, craftsmanship, endurance, will made durable — Tejas–Prithivi, the fire of the forge.", exc: "Brittleness, harshness, domination, exhaustion; structures built by relentless pressure.", note: "Earth gives Fire fuel, resistance, and something to act upon. Fire gives Earth transformation." },
    { a: 1, b: 2, t: "Air · Water", third: "mist, foam, wave", d: "Thought and feeling. Air differentiates and names; Water joins and undergoes. Air lets emotion be spoken; Water gives thought depth, attachment, and memory.", bal: "Emotional intelligence, imagination, poetry, empathy, meaningful speech.", exc: "Mood-driven thought, rumination, volatility, ideas that never take stable form.", note: "Air moves across and through Water — waves, currents, evaporation, exchange between surface and atmosphere." },
    { a: 1, b: 3, t: "Air · Earth", third: "instrument, channel, script", d: "Air loosens, aerates, erodes, transports, penetrates; Earth gives Air channels, boundaries, and instruments through which movement becomes useful.", bal: "Practical intelligence — movement governed by structure. Writing, machinery, architecture, nervous systems, lungs, roads.", exc: "Earth traps Air into stagnation, or Air scatters Earth to dust: rigid thinking on one side, ungrounded abstraction on the other.", note: "The pairing that produces every tool and every notation." },
    { a: 2, b: 3, t: "Water · Earth", third: "clay, soil", d: "Water softens Earth into something fertile and mouldable; Earth gives Water a basin, shoreline, or body in which to be retained.", bal: "Dependable care, emotional endurance, organic development, stable relationship.", exc: "Heaviness, stagnation, enmeshment; forms that preserve a past which has stopped nourishing.", note: "Together: soil, nourishment, embodiment, memory, biological continuity." },
  ];
  const P = (i: number) => [N[i].x, N[i].y];
  const cur = sel === null ? null : E[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-el .edge-hit { stroke: transparent; stroke-width: 20; cursor: pointer; fill: none; }
          .aoh-el .edge-run { stroke-dasharray: 18 982; animation: aoh-el-move 6s linear infinite; }
          @keyframes aoh-el-move { to { stroke-dashoffset: -1000; } }
          .aoh-el .idle { animation: aoh-el-idle 9s ease-in-out infinite; }
          @keyframes aoh-el-idle { 0%,100% { stroke-opacity: .22 } 50% { stroke-opacity: .44 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-el .edge-run { animation: none; opacity: 0 }
            .aoh-el .idle { animation: none }
          }
          .aoh-el .edge { transition: stroke-opacity 300ms ease, stroke-width 300ms ease; }
          .aoh-el g.el { cursor: pointer; }
        `}</style>
        <svg viewBox="0 0 360 360" className="aoh-el h-auto w-full" role="img" aria-labelledby="aoh-el-t">
          <title id="aoh-el-t">
            Four elements at the corners and the six minglings between them. The two diagonals
            cross at Akasha, the interval in which the others meet.
          </title>
          {E.map((e, i) => {
            const [x0, y0] = P(e.a);
            const [x1, y1] = P(e.b);
            const on = sel === i;
            return (
              <g key={i}>
                <line
                  className={`edge${sel === null ? " idle" : ""}`}
                  x1={x0} y1={y0} x2={x1} y2={y1}
                  stroke="var(--gold)"
                  strokeOpacity={sel === null ? 0.34 : on ? 1 : 0.09}
                  strokeWidth={on ? 2 : 1}
                />
                {on ? (
                  <line
                    className="edge-run"
                    x1={x0} y1={y0} x2={x1} y2={y1} pathLength={1000}
                    stroke="var(--bone)" strokeOpacity="0.95" strokeWidth="2.6" strokeLinecap="round"
                  />
                ) : null}
                <line
                  className="edge-hit"
                  x1={x0} y1={y0} x2={x1} y2={y1}
                  onClick={() => { setSel(on ? null : i); setAkasha(false); }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${N[e.a].k} with ${N[e.b].k}`}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : i); setAkasha(false); }
                  }}
                />
              </g>
            );
          })}

          {/* Akasha — the crossing, not a fifth mixer */}
          <g className="el" onClick={() => { setAkasha((v) => !v); setSel(null); }} role="button" tabIndex={0}
             aria-label="Akasha, the interval"
             onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setAkasha((v) => !v); setSel(null); } }}>
            <circle cx="180" cy="180" r="26" fill="var(--void)" stroke="var(--gold)"
                    strokeOpacity={akasha ? 0.95 : 0.35} strokeDasharray="3 4" strokeWidth={akasha ? 1.4 : 1} />
            <text x="180" y="185" textAnchor="middle" className="font-serif" fontSize="15"
                  fill="var(--gold)" fillOpacity={akasha ? 1 : 0.6}>Ἀ</text>
          </g>

          {N.map((n, i) => {
            const lit = cur ? cur.a === i || cur.b === i : false;
            return (
              <g key={n.k}>
                <circle cx={n.x} cy={n.y} r="34" fill="var(--void)" />
                <circle cx={n.x} cy={n.y} r="34" fill="none" stroke="var(--gold)"
                        strokeOpacity={lit ? 1 : sel === null ? 0.55 : 0.2} strokeWidth={lit ? 1.5 : 1} />
                <text x={n.x} y={n.y - 2} textAnchor="middle" className="font-serif" fontSize="16"
                      fill="var(--gold)" fillOpacity={lit || sel === null ? 1 : 0.35}>{n.z}</text>
                <text x={n.x} y={n.y + 13} textAnchor="middle" className="font-label" fontSize="7"
                      letterSpacing="1.4" fill="var(--muted-foreground)">{n.k.toUpperCase()}</text>
              </g>
            );
          })}
        </svg>
        <p className="mt-3 text-center font-label text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          choose an edge · six minglings
        </p>
      </div>

      <div className="min-h-[15rem]">
        {akasha ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">Ἀκάσα · the interval</p>
            <p className="mt-3 font-serif text-2xl italic leading-tight text-bone">
              Akasha does not mix. It is the space of the operation.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              It supplies the openness and capacity in which mixing can occur at all — which is why
              the diagonals cross here. Within Fire it gives revelation; within Air, diffusion
              across distance; within Water, deep receptivity; within Earth, porosity and the empty
              room inside a structure.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/80">
              Without it, forms would have no interior capacity and no relational distance —
              everything compacted, with nowhere for circulation or transformation to happen.
            </p>
          </>
        ) : cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.t} &nbsp;·&nbsp; emergent third: <span className="text-gold">{cur.third}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="border-t border-gold/50 pt-4">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">In proportion</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cur.bal}</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Out of it</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cur.exc}</p>
              </div>
            </div>
            <p className="mt-5 font-serif italic leading-relaxed text-bone/75">{cur.note}</p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Four elements, and the six ways any two of them can meet. Each mingling produces a{" "}
              <span className="text-gold-dim">third condition</span> reducible to neither
              participant — steam, clay, glass, mist. Relation is capable of producing realities
              contained in neither of its terms.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Choose an edge. Or the ring at the centre, where the diagonals cross.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * PlanetaryFamily — one virtue recurring through unlike vessels.
 * Only the three planets this doctrine develops in full are given chains. The
 * other four carry their § XIII function and are marked as awaiting their
 * correspondences rather than being supplied with invented ones.
 */
