import { useState } from "react";

/**
 * WheelOfTranselementation — the elements reorder; the centre does not move.
 *
 * A static classification would be the wrong figure here, so the ring turns. Each
 * turn puts a different element in the governing position, which is what
 * metastoicheiōsis actually changes: proportion, hierarchy and function, not the
 * roster of elements. Nothing is ever removed from the wheel.
 *
 * Four of the five form a closed chain of exchange — air moves water, water
 * tempers fire, fire refines earth, earth contains air — so they sit as
 * neighbours and the arcs between them are the exchanges themselves. Ether is
 * drawn differently because its work is different: it does not trade with a
 * neighbour, it opens the whole arrangement to being rearranged at all.
 *
 * The centre holds the seedform. Its stillness through every turn is the
 * section's claim about the formative thread, made operable rather than stated.
 */
/**
 * The elemental glyphs, drawn rather than set from a font. Outward of each
 * name, the tattva form the Sanskrit name belongs to: the egg of Ākāśa, the
 * circle of Vāyu, the triangle of Tejas, the crescent of Apas, the square of
 * Pṛthivī. Inward, the classical alchemical mark of the four elements that
 * have one: fire and water as the two triangles, air and earth as the same
 * triangles barred. Ether has no alchemical mark and keeps only its form.
 */
function TattvaForm({ k, x, y, s, fill, op }: { k: string; x: number; y: number; s: number; fill: string; op: number }) {
  const common = { fill: "none", stroke: fill, strokeOpacity: op, strokeWidth: 1.1, strokeLinejoin: "round" as const };
  switch (k) {
    case "Ether": return <path d={`M${x} ${y - s * 0.62} C${x + s * 0.5} ${y - s * 0.62} ${x + s * 0.52} ${y + s * 0.6} ${x} ${y + s * 0.6} C${x - s * 0.52} ${y + s * 0.6} ${x - s * 0.5} ${y - s * 0.62} ${x} ${y - s * 0.62} Z`} {...common} />;
    case "Air": return <circle cx={x} cy={y} r={s * 0.5} {...common} />;
    case "Fire": return <path d={`M${x} ${y - s * 0.56} L${x + s * 0.56} ${y + s * 0.42} L${x - s * 0.56} ${y + s * 0.42} Z`} {...common} />;
    case "Water": return <path d={`M${x - s * 0.55} ${y - s * 0.2} A${s * 0.58} ${s * 0.58} 0 1 0 ${x + s * 0.55} ${y - s * 0.2} A${s * 0.44} ${s * 0.44} 0 1 1 ${x - s * 0.55} ${y - s * 0.2} Z`} {...common} />;
    case "Earth": return <rect x={x - s * 0.48} y={y - s * 0.48} width={s * 0.96} height={s * 0.96} {...common} />;
    default: return null;
  }
}
function AlchemicalMark({ k, x, y, s, fill, op }: { k: string; x: number; y: number; s: number; fill: string; op: number }) {
  const common = { fill: "none", stroke: fill, strokeOpacity: op, strokeWidth: 0.9, strokeLinejoin: "round" as const };
  const up = `M${x} ${y - s * 0.5} L${x + s * 0.5} ${y + s * 0.4} L${x - s * 0.5} ${y + s * 0.4} Z`;
  const down = `M${x} ${y + s * 0.5} L${x + s * 0.5} ${y - s * 0.4} L${x - s * 0.5} ${y - s * 0.4} Z`;
  switch (k) {
    case "Fire": return <path d={up} {...common} />;
    case "Air": return <g><path d={up} {...common} /><line x1={x - s * 0.62} x2={x + s * 0.62} y1={y + s * 0.08} y2={y + s * 0.08} {...common} /></g>;
    case "Water": return <path d={down} {...common} />;
    case "Earth": return <g><path d={down} {...common} /><line x1={x - s * 0.62} x2={x + s * 0.62} y1={y - s * 0.08} y2={y - s * 0.08} {...common} /></g>;
    default: return null;
  }
}

export function WheelOfTranselementation() {
  const [turn, setTurn] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const C = 172, CY = 172, R_OUT = 132, R_IN = 66;

  // ordered so the exchange chain runs between neighbours
  const EL = [
    { k: "Air", gk: "Vāyu", does: "Moves and differentiates. It loosens what has become rigid and carries influence from one region to another.",
      ex: "Air moves Water", exNote: "Circulation prevents what joins from becoming stagnant." },
    { k: "Water", gk: "Apas", does: "Joins, dissolves, adapts, carries. It lets separate substances and experiences enter new relations and be assimilated.",
      ex: "Water tempers Fire", exNote: "Without it, transformation clarifies without anything being taken in." },
    { k: "Fire", gk: "Tejas", does: "Intensifies and transforms. It burns through obsolete arrangements, clarifies distinctions, and releases force frozen inside established form.",
      ex: "Fire refines Earth", exNote: "Without it, stability has nothing to answer to and hardens." },
    { k: "Earth", gk: "Pṛthivī", does: "Consolidates and embodies. It gives the process weight, persistence, and practical reality.",
      ex: "Earth contains Air", exNote: "Without it, movement disperses instead of arriving anywhere." },
    { k: "Ether", gk: "Ākāśa", does: "Opens space within a fixed identity, letting a form become receptive to a possibility beyond its present arrangement.",
      ex: "Ether opens the whole system", exNote: "It does not trade with a neighbour. It is what allows the arrangement to be rearranged at all." },
  ];

  const N = EL.length, STEP = 360 / N;
  const angOf = (i: number) => -90 + (i + turn) * STEP;
  const pt = (a: number, r: number) => [C + r * Math.cos((a * Math.PI) / 180), CY + r * Math.sin((a * Math.PI) / 180)];

  const sector = (a: number) => {
    const a0 = a - STEP / 2, a1 = a + STEP / 2;
    const [x0, y0] = pt(a0, R_OUT), [x1, y1] = pt(a1, R_OUT);
    const [x2, y2] = pt(a1, R_IN), [x3, y3] = pt(a0, R_IN);
    return `M${x0} ${y0} A${R_OUT} ${R_OUT} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${R_IN} ${R_IN} 0 0 0 ${x3} ${y3} Z`;
  };

  // whichever element currently sits at the top mark is the governing one
  const governingIdx = ((-turn % N) + N) % N;
  const cur = EL.find((e) => e.k === sel);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,344px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[344px]">
        <svg viewBox="0 0 344 384" className="h-auto w-full" role="img" aria-labelledby="aoh-wt-t">
          <title id="aoh-wt-t">
            A five-sector wheel of Air, Water, Fire, Earth and Ether turning around a fixed centre
            that holds the seedform. Each sector carries its tattva form (circle, crescent, triangle,
            square, egg) and, for the four classical elements, its alchemical triangle. Turning it
            changes which element governs; the centre never moves.
          </title>

          {/* the governing mark — fixed, the wheel moves beneath it */}
          <path d={`M${C} ${CY - R_OUT - 6} l-6 -11 h12 Z`} fill="var(--gold)" fillOpacity="0.9" />
          <text x={C} y={CY - R_OUT - 22} textAnchor="middle" className="font-mono" fontSize="6.2"
                letterSpacing="1" fill="var(--muted-foreground)">GOVERNS</text>

          {EL.map((e, i) => {
            const a = angOf(i);
            const on = sel === e.k;
            const gov = i === governingIdx;
            const [lx, ly] = pt(a, (R_OUT + R_IN) / 2);
            // stacked in screen space above and below the names, which stays clear of
            // the text in every sector, where a radial offset runs through it on the sides
            const [fx, fy] = [lx, ly - 18];
            const [mx, my] = [lx, ly + 22];
            const ink = on || gov ? "var(--gold)" : "var(--muted-foreground)";
            const inkOp = sel && !on ? 0.3 : on || gov ? 0.95 : 0.7;
            return (
              <g key={e.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : e.k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={e.k}
                 onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : e.k); } }}>
                <path d={sector(a)} fill="var(--gold)"
                      fillOpacity={on ? 0.1 : gov ? 0.055 : 0.015}
                      stroke={e.k === "Ether" ? "var(--bone)" : "var(--gold)"}
                      strokeOpacity={on ? 1 : sel ? 0.2 : gov ? 0.8 : 0.4}
                      strokeDasharray={e.k === "Ether" ? "5 4" : "none"}
                      strokeWidth={on ? 1.7 : gov ? 1.3 : 0.9} />
                <text x={lx} y={ly - 1} textAnchor="middle" className="font-mono" fontSize="8.4"
                      letterSpacing="1.1"
                      fill={on || gov ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel && !on ? 0.35 : 1}>
                  {e.k.toUpperCase()}
                </text>
                <text x={lx} y={ly + 10} textAnchor="middle" className="font-serif" fontSize="7.6"
                      fill={on || gov ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel && !on ? 0.3 : 0.75}>
                  {e.gk}
                </text>
                <TattvaForm k={e.k} x={fx} y={fy} s={11} fill={ink} op={inkOp} />
                <AlchemicalMark k={e.k} x={mx} y={my} s={7.5} fill={ink} op={inkOp * 0.85} />
              </g>
            );
          })}

          {/* the centre does not turn */}
          <circle cx={C} cy={CY} r={R_IN - 6} fill="var(--void)" stroke="var(--gold)"
                  strokeOpacity="0.8" strokeWidth="1.3" />
          <text x={C} y={CY - 6} textAnchor="middle" className="font-mono" fontSize="7"
                letterSpacing="1.2" fill="var(--gold)" opacity="0.95">SEEDFORM</text>
          <text x={C} y={CY + 7} textAnchor="middle" className="font-mono" fontSize="5.9"
                letterSpacing="0.7" fill="var(--muted-foreground)">THE GOVERNING</text>
          <text x={C} y={CY + 17} textAnchor="middle" className="font-mono" fontSize="5.9"
                letterSpacing="0.7" fill="var(--muted-foreground)">VIRTUE</text>

          <text x={C} y="374" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            NOTHING LEAVES THE WHEEL — ONLY ITS ORDER CHANGES
          </text>
        </svg>

        <div className="mt-3 flex items-center justify-center gap-3">
          <button onClick={() => setTurn((t) => t + 1)}
            className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold">
            Turn ↻
          </button>
          {turn > 0 && (
            <button onClick={() => { setTurn(0); setSel(null); }}
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground underline-offset-4 transition-colors hover:text-gold">
              reset
            </button>
          )}
        </div>
      </div>

      <div className="min-h-[15rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.k} · {cur.gk}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.does}</p>
            <p className="mt-6 border-l-2 border-gold/40 pl-5 font-serif text-lg leading-relaxed text-bone/85">
              {cur.ex}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cur.exNote}</p>
          </>
        ) : (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {EL[governingIdx].k} governs
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Turn the wheel and a different element takes the governing position. Nothing is added
              and nothing is removed —{" "}
              <span className="text-bone/90">
                only the proportion, hierarchy and function change
              </span>
              , which is what trans-elementation actually alters.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              A person governed by excessive Tejas expresses intensity as anger or restless ambition.
              The work does not extinguish the fire. It changes fire&rsquo;s relation to the rest, so
              that it becomes illumination rather than combustion.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              And the centre never moves. That stillness through every reordering is the formative
              thread — what makes the change belong to one being rather than being a replacement.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
