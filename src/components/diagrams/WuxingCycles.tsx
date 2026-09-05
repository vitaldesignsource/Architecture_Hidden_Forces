import { useState } from "react";

/**
 * WuxingCycles — the Five Phases as the two diagrams they actually are.
 * Generating runs clockwise round the rim; regulating cuts across as a pentagram,
 * each phase checking the one two steps on. Fire sits at the top, as in the
 * traditional arrangement where south is up.
 */
export function WuxingCycles() {
  const [sel, setSel] = useState<number | null>(null);
  const C = 190,
    R = 122;
  // clockwise from the top: generating order is the rim itself
  const ph = [
    { z: "火", n: "Fire", ang: -90, d: "Expands and reaches expression.", gen: "yields ash, and ash becomes earth", reg: "melts metal" },
    { z: "土", n: "Earth", ang: -18, d: "Centers, receives, assimilates.", gen: "bears metal in its veins", reg: "dams water" },
    { z: "金", n: "Metal", ang: 54, d: "Contracts, differentiates, defines.", gen: "carries water, condensing it", reg: "cuts wood" },
    { z: "水", n: "Water", ang: 126, d: "Descends, stores, dissolves, prepares renewal.", gen: "nourishes wood", reg: "quenches fire" },
    { z: "木", n: "Wood", ang: 198, d: "Initiates growth and outward emergence.", gen: "feeds fire", reg: "depletes earth, its roots breaking soil" },
  ];
  const pt = (a: number, r = R) => [
    C + r * Math.cos((a * Math.PI) / 180),
    C + r * Math.sin((a * Math.PI) / 180),
  ];
  const short = (i: number, j: number, inset = 30) => {
    const [x0, y0] = pt(ph[i].ang);
    const [x1, y1] = pt(ph[j].ang);
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    return [x0 + ux * inset, y0 + uy * inset, x1 - ux * inset, y1 - uy * inset];
  };
  const cur = sel === null ? null : ph[sel];
  const genOf = (i: number) => (i + 1) % 5;
  const regOf = (i: number) => (i + 2) % 5;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[400px]">
        <style>{`
          .aoh-wx g.node { cursor: pointer; }
          .aoh-wx .rim, .aoh-wx .chord { transition: stroke-opacity 350ms ease; }
          .aoh-wx circle.disc { transition: stroke-opacity 350ms ease, fill-opacity 350ms ease; }
        `}</style>
        <svg viewBox="0 0 380 380" className="aoh-wx h-auto w-full" role="img" aria-labelledby="aoh-wx-t">
          <title id="aoh-wx-t">
            The Five Phases. Generating runs clockwise around the rim — wood feeds fire, fire
            yields earth, earth bears metal, metal carries water, water nourishes wood. Regulating
            crosses the interior as a pentagram, each phase checking the one two steps ahead.
          </title>
          <defs>
            <marker id="aoh-wx-g" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--gold)" fillOpacity="0.8" />
            </marker>
            <marker id="aoh-wx-r" markerWidth="6" markerHeight="6" refX="4.4" refY="2.6" orient="auto">
              <path d="M0,0 L5.2,2.6 L0,5.2 z" fill="var(--muted-foreground)" fillOpacity="0.85" />
            </marker>
          </defs>

          {/* regulating — the pentagram across the interior */}
          {ph.map((_, i) => {
            const j = regOf(i);
            const [x0, y0, x1, y1] = short(i, j, 32);
            const lit = sel === i;
            return (
              <line
                key={`r${i}`}
                className="chord"
                x1={x0} y1={y0} x2={x1} y2={y1}
                stroke="var(--muted-foreground)"
                strokeOpacity={sel === null ? 0.3 : lit ? 0.95 : 0.08}
                strokeWidth={lit ? 1.4 : 0.8}
                strokeDasharray="3 4"
                markerEnd="url(#aoh-wx-r)"
              />
            );
          })}

          {/* generating — the rim */}
          {ph.map((_, i) => {
            const j = genOf(i);
            const [x0, y0, x1, y1] = short(i, j, 31);
            const lit = sel === i;
            return (
              <line
                key={`g${i}`}
                className="rim"
                x1={x0} y1={y0} x2={x1} y2={y1}
                stroke="var(--gold)"
                strokeOpacity={sel === null ? 0.5 : lit ? 1 : 0.14}
                strokeWidth={lit ? 1.8 : 1.1}
                markerEnd="url(#aoh-wx-g)"
              />
            );
          })}

          {ph.map((e, i) => {
            const [x, y] = pt(e.ang);
            const on = sel === i;
            const isGen = sel !== null && genOf(sel) === i;
            const isReg = sel !== null && regOf(sel) === i;
            return (
              <g
                key={e.n}
                className="node"
                onClick={() => setSel(on ? null : i)}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`${e.n} phase`}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : i); }
                }}
              >
                <circle
                  className="disc"
                  cx={x} cy={y} r="29"
                  fill="var(--void)"
                  fillOpacity={on ? 1 : 0.92}
                  stroke={on || isGen ? "var(--gold)" : "var(--muted-foreground)"}
                  strokeOpacity={on ? 1 : isGen ? 0.8 : isReg ? 0.55 : 0.4}
                  strokeWidth={on ? 1.5 : 1}
                  strokeDasharray={isReg ? "3 3" : undefined}
                />
                <text x={x} y={y + 3} textAnchor="middle" className="font-serif" fontSize="19"
                      fill={on || isGen ? "var(--gold)" : "var(--bone)"} fillOpacity={on ? 1 : 0.78}>
                  {e.z}
                </text>
                <text x={x} y={y + 45} textAnchor="middle" className="font-label" fontSize="8"
                      letterSpacing="1.6" fill="var(--muted-foreground)">
                  {e.n.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-3 flex items-center justify-center gap-6 font-label text-[9px] uppercase tracking-[0.18em]">
          <span className="flex items-center gap-2 text-gold-dim">
            <span className="inline-block h-px w-6 bg-gold/70" /> generating
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="inline-block h-px w-6 border-t border-dashed border-muted-foreground" /> regulating
          </span>
        </div>
      </div>

      <div className="min-h-[13rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.z} · {cur.n}
            </p>
            <p className="mt-3 font-serif text-2xl italic leading-tight text-bone">{cur.d}</p>
            <div className="mt-6 space-y-4">
              <div className="border-l border-gold/50 pl-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                  Generates {ph[genOf(sel!)].n}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {cur.n} {cur.gen}.
                </p>
              </div>
              <div className="border-l border-dashed border-muted-foreground/60 pl-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Regulates {ph[regOf(sel!)].n}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {cur.n} {cur.reg}.
                </p>
              </div>
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-bone/60">
              Regulation is not hostility. It is how no phase becomes absolute.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Two cycles, one figure. Around the rim each phase{" "}
              <span className="text-gold-dim">prepares</span> the next: growth fuels expression,
              expression yields what can be assimilated, assimilation yields defined structure,
              contraction returns substance to storage, storage nourishes new growth.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Across the interior each phase <span className="text-bone/80">checks</span> the one
              two steps ahead — the pentagram that keeps any single movement from running away
              with the whole. Choose a phase to see both of its offices.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * KabbalahFigure — the Tree and the ten cards, sharing one selection.
 * Selecting a vessel on the Tree rings it and lights its card; selecting a card
 * does the same in reverse. The Tree still works with no props, so it degrades
 * to the static figure if ever rendered alone.
 */
