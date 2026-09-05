import { useState } from "react";

/**
 * TheTriad — Sulfur above, Salt below, Mercury circulating between them.
 * Deliberately not an equilateral triangle: the doctrine holds that the third is
 * not another object placed beside the first two but the living relation through
 * which they become capable of producing something beyond themselves. So Mercury
 * is drawn as the current between the poles, and solve/coagula reverses it.
 */
export function TheTriad() {
  const [dir, setDir] = useState<"coagula" | "solve">("coagula");
  const [sel, setSel] = useState<number | null>(null);
  const P = [
    { k: "Sulfur", z: "Θεῖον", y: 62, role: "Impulse",
      d: "The driving difference — desire, heat, pressure, appetite, intention, catalytic intensity. It initiates and intensifies.",
      w: "Without Sulfur, nothing is initiated." },
    { k: "Mercury", z: "Ὑδράργυρος", y: 168, role: "Mediation",
      d: "Mobility and exchange — circulation, translation, adaptation, communication. It joins what was separate and carries between the poles.",
      w: "Without Mercury, the fire cannot circulate." },
    { k: "Salt", z: "Ἅλς", y: 274, role: "Fixation",
      d: "Stabilization — boundary, embodiment, memory, habit, structure, preservation. It limits and endures.",
      w: "Without Salt, the force disperses without lasting." },
  ];
  const MID = 150;
  const cur = sel === null ? null : P[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[300px]">
        <style>{`
          .aoh-tr-run { stroke-dasharray: 20 980; animation: aoh-tr-move 9s linear infinite; }
          .aoh-tr-run.up { animation-direction: reverse; }
          @keyframes aoh-tr-move { to { stroke-dashoffset: -1000 } }
          .aoh-tr-node { cursor: pointer; }
          .aoh-tr-merc { animation: aoh-tr-breathe 8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          @keyframes aoh-tr-breathe { 0%,100% { opacity:.3 } 50% { opacity:.75 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-tr-run { animation:none; opacity:0 } .aoh-tr-merc { animation:none; opacity:.5 }
          }
        `}</style>
        <svg viewBox="0 0 300 340" className="h-auto w-full" role="img" aria-labelledby="aoh-tr-t">
          <title id="aoh-tr-t">
            Sulfur above and Salt below, with Mercury circulating between them. Coagula runs
            downward toward fixation; solve runs upward, loosening what was fixed.
          </title>
          {/* the axis Mercury travels */}
          <line x1={MID} y1={92} x2={MID} y2={244} stroke="var(--gold)" strokeOpacity="0.28" strokeWidth="1.2" />
          <line className={`aoh-tr-run${dir === "solve" ? " up" : ""}`}
                x1={MID} y1={92} x2={MID} y2={244} pathLength={1000}
                stroke="var(--bone)" strokeOpacity="0.9" strokeWidth="2.6" strokeLinecap="round" />
          {/* Mercury's circulation, drawn as two returning arcs */}
          <path d={`M ${MID} 100 C ${MID - 62} 130, ${MID - 62} 206, ${MID} 236`} fill="none"
                stroke="var(--gold)" strokeOpacity="0.34" strokeWidth="1" strokeDasharray="3 5" />
          <path d={`M ${MID} 100 C ${MID + 62} 130, ${MID + 62} 206, ${MID} 236`} fill="none"
                stroke="var(--gold)" strokeOpacity="0.34" strokeWidth="1" strokeDasharray="3 5" />

          {P.map((n, i) => {
            const on = sel === i;
            const merc = i === 1;
            return (
              <g key={n.k} className="aoh-tr-node"
                 onClick={() => setSel(on ? null : i)} role="button" tabIndex={0}
                 aria-pressed={on} aria-label={n.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                {merc ? (
                  <circle className="aoh-tr-merc" cx={MID} cy={n.y} r="40" fill="none"
                          stroke="var(--gold)" strokeWidth="0.8" />
                ) : null}
                <circle cx={MID} cy={n.y} r="30" fill="var(--void)" />
                <circle cx={MID} cy={n.y} r="30" fill="none" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : 0.55} strokeWidth={on ? 1.8 : 1.1}
                        strokeDasharray={merc ? "5 4" : undefined} />
                <text x={MID} y={n.y + 5} textAnchor="middle" className="font-serif" fontSize="15"
                      fill="var(--gold)" fillOpacity={on ? 1 : 0.8}>{n.z}</text>
                <text x={MID + 44} y={n.y + 2} className="font-label" fontSize="7.5" letterSpacing="1.5"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}>{n.k.toUpperCase()}</text>
                <text x={MID + 44} y={n.y + 13} className="font-label" fontSize="6.5" letterSpacing="1.1"
                      fill="var(--muted-foreground)">{n.role.toUpperCase()}</text>
              </g>
            );
          })}
          <text x={MID} y={322} textAnchor="middle" className="font-label" fontSize="7"
                letterSpacing="2" fill="var(--muted-foreground)">
            {dir === "coagula" ? "COAGULA · TOWARD FIXATION" : "SOLVE · TOWARD LOOSENING"}
          </text>
        </svg>
        <div className="mt-3 flex justify-center gap-5 font-label text-[9px] uppercase tracking-[0.18em]">
          {(["coagula", "solve"] as const).map((d) => (
            <button key={d} type="button" onClick={() => setDir(d)} aria-pressed={dir === d}
              className={`px-2 py-2 transition-colors ${dir === d ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[12rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.z} · {cur.k} — {cur.role}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-4 border-t border-border pt-4 font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              {cur.w}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Mercury is not a third thing standing beside the other two. It is{" "}
              <span className="text-gold-dim">the living relation between them</span> — which is
              why it is drawn as the current running the axis rather than as a third corner.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {dir === "coagula"
                ? "Coagula runs downward: the loosened contents are gathered and fixed into a form able to express a wider range than the one before it."
                : "Solve runs upward: an established configuration is loosened so that what it excluded can be reconsidered."}
            </p>
            <p className="mt-4 font-serif text-lg italic leading-relaxed text-bone/80">
              Solve without coagula disperses. Coagula without solve imprisons.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * PhaseOrgans — the Five Phases carrying their organ networks, virtues, emotions
 * and spirits. Distinct from WuxingCycles in § XV, which draws the generating and
 * regulating cycles; this one is the interior ecology, phase by phase.
 * Fire sits at the top, matching the orientation used there.
 */
