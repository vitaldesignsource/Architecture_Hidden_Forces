import { useState } from "react";

/**
 * ThreeTreasures — Jing, Qi and Shen as a circuit rather than a ladder.
 *
 * § XXII names four relations and no others: Jing supports Qi, Qi nourishes
 * Shen, Shen directs Qi, Qi protects Jing. Which means Jing and Shen never
 * touch — everything between them passes through circulation. That is visible
 * in a triangle and nearly invisible in prose, so the figure draws the missing
 * edge as absent rather than leaving the reader to notice.
 *
 * Withholding a node states the section's own failure modes instead of
 * asserting that the three are interdependent.
 */
export function ThreeTreasures() {
  const [out, setOut] = useState<string | null>(null);
  const [dir, setDir] = useState<"ascending" | "descending">("ascending");

  const P = {
    Shen: [180, 62],
    Jing: [64, 232],
    Qi: [296, 232],
  } as const;

  const NODES = [
    { k: "Jing", glyph: "精", en: "Stored", d: "Foundational vitality, inheritance, generative capacity — activity not presently circulating, preserved in a condition from which future activity can arise." },
    { k: "Qi", glyph: "氣", en: "Circulating", d: "Stored potential becoming distributed, exchanged, expressed. Not another name for ether: ether is the medium, Qi the movement." },
    { k: "Shen", glyph: "神", en: "Luminous", d: "Not the quantity of energy held but the clarity with which the system perceives, orients, and participates. Qi moves; Shen knows and directs the movement." },
  ];

  // the four relations the section names, and no others
  const EDGES = [
    { from: "Jing", to: "Qi", verb: "supports", note: "without a reservoir there is nothing to draw on", up: true },
    { from: "Qi", to: "Shen", verb: "nourishes", note: "without circulation, awareness has no supply", up: true },
    { from: "Shen", to: "Qi", verb: "directs", note: "without orientation, circulation has no purpose", up: false },
    { from: "Qi", to: "Jing", verb: "protects", note: "and redistributes what the reservoir holds", up: false },
  ];

  const FAIL: Record<string, string[]> = {
    Jing: ["Qi draws on a reservoir that is not there.", "Shen may be brilliant, and ungrounded."],
    Qi: ["Jing is stored but inert.", "Shen cannot reach the organism it means to direct."],
    Shen: ["Qi circulates without orientation."],
  };

  const live = (k: string) => out !== k;
  const edgeLive = (e: (typeof EDGES)[number]) => live(e.from) && live(e.to);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-tt-e { stroke-dasharray: 4 10; animation: aoh-tt-flow 3s linear infinite; }
          .aoh-tt-down .aoh-tt-e { animation-direction: reverse; }
          @keyframes aoh-tt-flow { to { stroke-dashoffset: -28 } }
          .aoh-tt-n { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-tt-e { animation: none } }
        `}</style>
        <svg viewBox="0 0 360 320" className={`h-auto w-full ${dir === "descending" ? "aoh-tt-down" : ""}`}
             role="img" aria-labelledby="aoh-tt-t">
          <title id="aoh-tt-t">
            Jing, Qi and Shen at the corners of a triangle. Four arrows join Jing to Qi and Qi to
            Shen in both directions; the edge between Jing and Shen is drawn absent.
          </title>

          {/* the relation the section does NOT name */}
          <line x1={P.Jing[0] + 22} y1={P.Jing[1] - 16} x2={P.Shen[0] - 26} y2={P.Shen[1] + 24}
                stroke="var(--bone)" strokeOpacity="0.18" strokeDasharray="2 8" strokeWidth="1" />
          <text x="104" y="146" className="font-label" fontSize="6.4" letterSpacing="0.8"
                fill="var(--muted-foreground)" opacity="0.65"
                transform="rotate(-56 104 146)">NO DIRECT PATH</text>

          {EDGES.map((e, i) => {
            const [x1, y1] = P[e.from as keyof typeof P];
            const [x2, y2] = P[e.to as keyof typeof P];
            const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
            const ux = dx / len, uy = dy / len;
            // offset the pair so the two directions do not overlap
            const s = e.up ? 7 : -7;
            const px = -uy * s, py = ux * s;
            const on = edgeLive(e);
            return (
              <line key={i} className="aoh-tt-e"
                    x1={x1 + ux * 30 + px} y1={y1 + uy * 30 + py}
                    x2={x2 - ux * 30 + px} y2={y2 - uy * 30 + py}
                    stroke={e.up ? "var(--gold)" : "var(--bone)"}
                    strokeOpacity={on ? (e.up ? 0.85 : 0.5) : 0.08}
                    strokeWidth={on ? 1.4 : 0.8} />
            );
          })}

          {NODES.map((n) => {
            const [x, y] = P[n.k as keyof typeof P];
            const withheld = out === n.k;
            return (
              <g key={n.k} className="aoh-tt-n" onClick={() => setOut(withheld ? null : n.k)}
                 role="button" tabIndex={0} aria-pressed={withheld} aria-label={n.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOut(withheld ? null : n.k); } }}>
                <circle cx={x} cy={y} r="29" fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={withheld ? 0.18 : 0.85}
                        strokeDasharray={withheld ? "3 5" : "none"} strokeWidth="1.3" />
                <text x={x} y={y + 7} textAnchor="middle" className="font-serif" fontSize="21"
                      fill="var(--gold)" fillOpacity={withheld ? 0.2 : 1}>{n.glyph}</text>
                <text x={x} y={y + 45} textAnchor="middle" className="font-label" fontSize="7.5"
                      letterSpacing="1.4" fill={withheld ? "var(--bone)" : "var(--muted-foreground)"}
                      opacity={withheld ? 0.45 : 1}>{n.k.toUpperCase()}</text>
              </g>
            );
          })}

          <text x="180" y="308" textAnchor="middle" className="font-label" fontSize="6.6"
                letterSpacing="1.2" fill="var(--muted-foreground)" opacity="0.8">
            {out ? `WITHHOLDING ${out.toUpperCase()}` : "FOUR RELATIONS — AND ONE THAT DOES NOT EXIST"}
          </text>
        </svg>

        <div className="mt-3 flex justify-center gap-2">
          {(["ascending", "descending"] as const).map((d) => (
            <button key={d} onClick={() => setDir(d)} aria-pressed={dir === d}
              className={`border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.12em] transition-colors ${
                dir === d ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/60"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[15rem]">
        {out ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-bone/70">
              Withholding {out}
            </p>
            <div className="mt-4 space-y-3">
              {FAIL[out].map((f) => (
                <p key={f} className="font-serif text-xl leading-relaxed text-bone/85">{f}</p>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Which is what makes these three interdependent conditions rather than a ladder. Nothing
              here is discarded on the way up — remove any one and the other two lose a function they
              were relying on.
            </p>
          </>
        ) : (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {dir === "ascending"
                ? "Ascending · stored capacity becomes activity, activity becomes awareness"
                : "Descending · vision directs circulation, circulation reorganises essence"}
            </p>
            <div className="mt-4 space-y-px">
              {EDGES.filter((e) => (dir === "ascending" ? e.up : !e.up)).map((e) => (
                <div key={e.verb} className="grid grid-cols-[8.5rem_1fr] items-baseline gap-4 border-b border-border py-3">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">
                    {e.from} {e.verb} {e.to}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{e.note}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Four relations, and no fifth. <span className="text-bone/90">Jing and Shen never touch
              directly</span> — everything between the reservoir and the light passes through
              circulation, which is why Shen without Qi cannot reach the organism it means to direct.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              Withhold any of the three to see what the other two lose.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
