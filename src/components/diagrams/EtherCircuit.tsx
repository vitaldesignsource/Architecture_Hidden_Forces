import { useState } from "react";

/**
 * EtherCircuit — the Fourfold Field as what the doctrine says it is: a circuit.
 * The section states "this is a circuit, not a ladder", then rendered a ladder.
 * Four vessels on a ring, the return arc from Life back to Warmth drawn heavier
 * than the rest, because that arc is the whole claim.
 */
export function EtherCircuit() {
  const [active, setActive] = useState<number | null>(null);
  const R = 132;
  const C = 210;
  const ethers = [
    { k: "Warmth", greek: "Θερμότης", verb: "quickens", ang: -90, virtue: "measured warmth", low: "Dormancy", high: "Fever", fn: "Possibility ceases to be merely possible. The first asymmetry — a gradient across which movement becomes possible." },
    { k: "Light", greek: "Φῶς", verb: "articulates", ang: 0, virtue: "right articulation", low: "Force without orientation", high: "Fragmented field", fn: "Difference becomes perceptible enough to enter relation. Orientation, contrast, boundary, intelligible space." },
    { k: "Tone", greek: "Τόνος", verb: "coordinates", ang: 90, virtue: "living proportion", low: "Incoherence, mistiming", high: "Rigidity, mechanical repeat", fn: "Differentiated powers enter measured relation — affinity, interval, proportion, rhythm. It joins and it divides." },
    { k: "Life", greek: "Ζωή", verb: "regenerates", ang: 180, virtue: "regenerative wholeness", low: "Fragmentation, exhaustion", high: "Enclosure, a preserved distortion", fn: "Relations become a self-renewing whole — and the whole becomes the vessel of new potential, returning the cycle to Warmth." },
  ];
  const pt = (a: number, r = R) => [
    C + r * Math.cos((a * Math.PI) / 180),
    C + r * Math.sin((a * Math.PI) / 180),
  ];
  // arc from ether i to the next, inset so it stops short of each vessel
  const arc = (i: number) => {
    const a0 = ethers[i].ang + 17;
    const a1 = ethers[(i + 1) % 4].ang - 17;
    const [x0, y0] = pt(a0);
    const [x1, y1] = pt(a1 < a0 ? a1 + 360 : a1);
    return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  const sel = active === null ? null : ethers[active];

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <style>{`
        .aoh-ec-arc { stroke: var(--gold); stroke-opacity: 0.28; fill: none; }
        .aoh-ec-arc.aoh-ec-return { stroke-opacity: 0.62; }
        .aoh-ec-node { cursor: pointer; }
        .aoh-ec-node circle.aoh-ec-rim { transition: stroke-opacity 400ms ease, r 400ms ease; }
        .aoh-ec-node:hover circle.aoh-ec-rim, .aoh-ec-node.is-on circle.aoh-ec-rim { stroke-opacity: 1; }
        .aoh-ec-halo { transition: opacity 500ms ease; }
        .aoh-ec-node:hover .aoh-ec-halo, .aoh-ec-node.is-on .aoh-ec-halo { opacity: 1; }
        .aoh-ec-spark { animation: aoh-ec-travel 22s linear infinite; }
        @keyframes aoh-ec-travel { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .aoh-ec-spark { animation: none; } }
      `}</style>
      <svg viewBox="0 0 420 420" className="h-auto w-full" role="img" aria-labelledby="aoh-ec-t">
        <title id="aoh-ec-t">
          The four ethers as a closed circuit: Warmth quickens, Light articulates, Tone
          coordinates, Life regenerates — and Life returns the cycle to Warmth.
        </title>
        <defs>
          <radialGradient id="aoh-ec-halo">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.34" />
            <stop offset="70%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.05" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <marker id="aoh-ec-tip" markerWidth="7" markerHeight="7" refX="4.6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill="var(--gold)" fillOpacity="0.75" />
          </marker>
        </defs>

        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--gold)" strokeOpacity="0.08" strokeWidth="0.8" />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={arc(i)}
            className={`aoh-ec-arc${i === 3 ? " aoh-ec-return" : ""}`}
            strokeWidth={i === 3 ? 1.5 : 1}
            markerEnd="url(#aoh-ec-tip)"
          />
        ))}
        <g className="aoh-ec-spark" style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C + R} cy={C} r="2.6" fill="var(--bone)" opacity="0.5" />
        </g>

        {ethers.map((e, i) => {
          const [x, y] = pt(e.ang);
          const on = active === i;
          return (
            <g
              key={e.k}
              className={`aoh-ec-node${on ? " is-on" : ""}`}
              onClick={() => setActive(on ? null : i)}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  setActive(on ? null : i);
                }
              }}
            >
              <circle className="aoh-ec-halo" cx={x} cy={y} r="46" fill="url(#aoh-ec-halo)" opacity={on ? 1 : 0.35} />
              <circle cx={x} cy={y} r="30" fill="var(--void)" />
              <circle
                className="aoh-ec-rim"
                cx={x}
                cy={y}
                r="30"
                fill="none"
                stroke="var(--gold)"
                strokeOpacity={on ? 1 : 0.5}
                strokeWidth="1"
              />
              <text x={x} y={y - 2} textAnchor="middle" className="font-serif" fontSize="15" fill="var(--gold)">
                {e.greek}
              </text>
              <text x={x} y={y + 13} textAnchor="middle" className="font-mono" fontSize="7" letterSpacing="1.4" fill="var(--muted-foreground)">
                {e.k.toUpperCase()}
              </text>
              <text x={x} y={y + 48} textAnchor="middle" className="font-serif" fontSize="10" fontStyle="italic" fill="var(--bone)" opacity="0.6">
                {e.verb}
              </text>
            </g>
          );
        })}

        <text x={C} y={C - 8} textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="2.4" fill="var(--gold-dim)">
          ΚΥΚΛΟΣ
        </text>
        <text x={C} y={C + 8} textAnchor="middle" className="font-serif" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
          the circuit
        </text>
      </svg>

      <div className="mt-4 min-h-[8.5rem] border-t border-border pt-5">
        {sel ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
              {sel.greek} · {sel.k} {sel.verb}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sel.fn}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] leading-snug">
              <div>
                <div className="font-mono uppercase tracking-[0.15em] text-muted-foreground">Deficiency</div>
                <div className="mt-1 text-muted-foreground">{sel.low}</div>
              </div>
              <div>
                <div className="font-mono uppercase tracking-[0.15em] text-gold">Virtue</div>
                <div className="mt-1 font-serif italic text-bone/90">“{sel.virtue}”</div>
              </div>
              <div>
                <div className="font-mono uppercase tracking-[0.15em] text-muted-foreground">Excess</div>
                <div className="mt-1 text-muted-foreground">{sel.high}</div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            Warmth quickens. Light articulates. Tone coordinates. Life regenerates — and the living
            whole becomes the vessel of new potential, which is the heavier arc returning to Warmth.{" "}
            <span className="text-gold-dim">Choose a vessel.</span>
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * SubTattvaMatrix — the twenty-five as something you operate rather than read.
 * Selecting a cell names the compound; Swap jumps to its transpose, which is the
 * fastest way to feel that Apas-Tejas and Tejas-Apas are not the same thing.
 */
