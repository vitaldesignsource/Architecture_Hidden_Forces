import { useState } from "react";

/**
 * ThreeNadis — Ida and Pingala crossing a central Sushumna.
 * The curves are generated so their zero-crossings land exactly on the nodes,
 * which is the whole point of the figure: the nodes are where the two polar
 * currents meet the axis, not decoration placed along it.
 */
export function ThreeNadis() {
  const [sel, setSel] = useState<number | null>(null);
  const MID = 150, TOP = 78, BOT = 542, AMP = 54, HALF = 80;
  const nodes = [102, 182, 262, 342, 422, 502];
  const pts = (sign: number) => {
    const out: string[] = [];
    for (let y = TOP; y <= BOT; y += 3) {
      const x = MID + sign * AMP * Math.sin(((y - nodes[0]) * Math.PI) / HALF);
      out.push(`${x.toFixed(1)},${y}`);
    }
    return out.join(" ");
  };
  const ch = [
    { k: "Ida", z: "इडा", t: "The lunar current", d: "Cools, receives, stores, reflects, nourishes, remembers — it returns activity toward interiority. Affinities with Apas, the Moon, yin, gestation, imagination, memory.", n: "Not merely watery or passive. It can carry every tattva; its tendency is to internalize whatever it carries. Tejas through Ida becomes inward digestion, contemplative illumination, banked warmth.", l: "the path of interiorization" },
    { k: "Pingala", z: "पिङ्गला", t: "The solar current", d: "Warms, activates, differentiates, expresses, mobilizes — it carries force toward action. Affinities with Tejas, the Sun, yang, will, metabolism, alertness.", n: "Not simply good energy. Unregulated solar activity becomes agitation, overexertion, inflammation, continual externalization. Apas through Pingala becomes outward nurture; Prithivi becomes labour and defence.", l: "the path of exteriorization" },
    { k: "Sushumna", z: "सुषुम्ना", t: "The central axis", d: "Not a third current placed between two others but a different condition of organization. Ida and Pingala ordinarily alternate and regulate one another; Sushumna becomes operative when their opposition is balanced enough for activity to reorganize around an axis.", n: "An emergent centrality. It does not destroy the lunar and solar currents — it gathers their complementary powers into a higher order. Ida receives, Pingala expresses, Sushumna integrates.", l: "the capacity to hold polarity without fragmentation" },
  ];
  const cur = sel === null ? null : ch[sel];
  const dim = (i: number) => (sel === null ? 1 : sel === i ? 1 : 0.16);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[300px]">
        <style>{`
          .aoh-nd-flow { stroke-dasharray: 22 978; animation: aoh-nd-run 13s linear infinite; }
          .aoh-nd-flow.rev { animation-direction: reverse; }
          .aoh-nd-flow.mid { animation-duration: 17s; }
          @keyframes aoh-nd-run { to { stroke-dashoffset: -1000; } }
          @media (prefers-reduced-motion: reduce) { .aoh-nd-flow { animation: none; opacity: 0; } }
        `}</style>
        <svg viewBox="0 0 300 620" className="h-auto w-full" role="img" aria-labelledby="aoh-nd-t">
          <title id="aoh-nd-t">
            Ida and Pingala winding about a central Sushumna, meeting the axis at six nodes.
          </title>
          {/* Sushumna */}
          <g style={{ opacity: dim(2) }}>
            <line x1={MID} y1={TOP} x2={MID} y2={BOT} stroke="var(--gold)"
                  strokeOpacity={sel === 2 ? 1 : 0.55} strokeWidth={sel === 2 ? 2.2 : 1.4} />
            <line className="aoh-nd-flow mid" x1={MID} y1={BOT} x2={MID} y2={TOP} pathLength={1000}
                  stroke="var(--bone)" strokeOpacity="0.85" strokeWidth="2.6" strokeLinecap="round" />
          </g>
          {/* Ida */}
          <polyline points={pts(-1)} fill="none" stroke="var(--bone)"
                    strokeOpacity={sel === 0 ? 0.95 : 0.42} strokeWidth={sel === 0 ? 2 : 1.2}
                    style={{ opacity: dim(0) }} />
          <polyline className="aoh-nd-flow" points={pts(-1)} pathLength={1000} fill="none"
                    stroke="var(--bone)" strokeOpacity="0.9" strokeWidth="2.4"
                    strokeLinecap="round" style={{ opacity: dim(0) }} />
          {/* Pingala */}
          <polyline points={pts(1)} fill="none" stroke="var(--gold)"
                    strokeOpacity={sel === 1 ? 1 : 0.5} strokeWidth={sel === 1 ? 2 : 1.2}
                    style={{ opacity: dim(1) }} />
          <polyline className="aoh-nd-flow rev" points={pts(1)} pathLength={1000} fill="none"
                    stroke="var(--gold)" strokeOpacity="1" strokeWidth="2.4"
                    strokeLinecap="round" style={{ opacity: dim(1) }} />
          {/* nodes: where both currents meet the axis */}
          {nodes.map((y, i) => (
            <g key={y}>
              <circle cx={MID} cy={y} r="13" fill="var(--void)" stroke="var(--gold)"
                      strokeOpacity="0.5" strokeWidth="0.9" />
              <circle cx={MID} cy={y} r="3" fill="var(--gold)" fillOpacity="0.55" />
              <text x={MID + 26} y={y + 3} className="font-mono" fontSize="7"
                    letterSpacing="1.2" fill="var(--muted-foreground)">
                {["I", "II", "III", "IV", "V", "VI"][i]}
              </text>
            </g>
          ))}
          {/* hit areas */}
          {[0, 1, 2].map((i) => (
            <polyline
              key={i}
              points={i === 2 ? `${MID},${TOP} ${MID},${BOT}` : pts(i === 0 ? -1 : 1)}
              fill="none"
              stroke="transparent"
              strokeWidth="26"
              style={{ cursor: "pointer" }}
              onClick={() => setSel(sel === i ? null : i)}
              role="button"
              tabIndex={0}
              aria-label={ch[i].k}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(sel === i ? null : i); }
              }}
            />
          ))}
          <text x={MID} y={568} textAnchor="middle" className="font-mono" fontSize="7.5"
                letterSpacing="2" fill="var(--muted-foreground)">SIX NODES</text>
        </svg>
        <div className="mt-3 flex flex-wrap justify-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em]">
          {ch.map((c, i) => (
            <button key={c.k} type="button" onClick={() => setSel(sel === i ? null : i)}
              aria-pressed={sel === i}
              className={`px-2 py-2 transition-colors ${sel === i ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
              {c.k}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[14rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.z} · {cur.k} — {cur.t}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-4 text-sm leading-relaxed text-bone/80">{cur.n}</p>
            <p className="mt-5 border-t border-border pt-4 font-serif text-lg italic text-gold/90">
              {cur.l}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A nadi is not the current. It is{" "}
              <span className="text-gold-dim">the path that conditions the current</span> — a
              relatively stable pathway of low formative resistance through which pranic activity
              repeatedly circulates.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              More riverbed than water. The channel stays relatively stable while its contents
              change: the same pathway may carry a Vayu current on one day and a Tejas current on
              another.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/80">
              The Solar Flywheel supplies momentum, Sushumna supplies axial direction, and the
              Inner Sun supplies governing purpose. Choose a channel.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * CentersAxis — six centres on the axis and the crown above them, which is the
 * traditional arrangement rather than seven identical wheels in a series. The
 * ascent/descent toggle is not decoration: the doctrine holds that a complete
 * theurgy requires both directions, so the figure has to be readable both ways.
 */
