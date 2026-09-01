import { useState } from "react";

/**
 * EthericTides — three nested cycles at different periods, read at one instant.
 * The point is superposition: no single cycle gives the condition of a moment,
 * and the composite is what the field actually offers. Move the reading line to
 * see the same three rhythms reinforce, oppose, or complicate one another.
 */
export function EthericTides() {
  const [t, setT] = useState(0.18);
  const X0 = 34, X1 = 372, W = X1 - X0;
  const ROWS = [
    { k: "Daily", p: 5.5, y: 62, note: "light and dark, waking and withdrawal",
      names: ["Dawn — emergence and orientation", "Noon — definition and outward expression",
              "Dusk — transition and release", "Night — withdrawal, recombination, gestation"] },
    { k: "Lunar", p: 2, y: 132, note: "concealment, accumulation, visibility, recession",
      names: ["Waxing — gathering", "Full — manifestation and exposure",
              "Waning — separation and return", "Dark — latency and reconfiguration"] },
    { k: "Seasonal", p: 0.75, y: 202, note: "the solar cycle embodied by an ecosystem",
      names: ["Emergence — germination", "Fruition — expansion and yield",
              "Decline — separation and storing", "Dormancy — latency"] },
  ];
  const AMP = 26;
  const phaseAt = (p: number, u: number) => (u * p) % 1;
  const yAt = (r: { p: number; y: number }, u: number) =>
    r.y - AMP * Math.sin(2 * Math.PI * phaseAt(r.p, u));
  const quarter = (f: number) => Math.min(3, Math.floor(f * 4));
  // rising on the first half of the swing, receding on the second
  const dir = (f: number) => (f < 0.25 ? "rising" : f < 0.5 ? "cresting" : f < 0.75 ? "receding" : "trough");

  const path = (r: { p: number; y: number }) => {
    let d = "";
    for (let i = 0; i <= 220; i++) {
      const u = i / 220;
      d += `${i === 0 ? "M" : "L"}${(X0 + u * W).toFixed(1)},${yAt(r, u).toFixed(1)}`;
    }
    return d;
  };
  const states = ROWS.map((r) => dir(phaseAt(r.p, t)));
  const rising = states.filter((x) => x === "rising" || x === "cresting").length;
  const composite =
    rising === 3 ? "All three gathering. The field offers least resistance to accumulation and impression."
    : rising === 0 ? "All three receding or latent. Favourable to release, rest, concealment, and reconfiguration."
    : rising === 2 ? "Two gathering against one receding. A workable but partial sympathy."
    : "One gathering against two receding. Effort here runs against the larger movement.";

  const move = (clientX: number, el: SVGSVGElement) => {
    const b = el.getBoundingClientRect();
    const u = ((clientX - b.left) / b.width) * (400 / 400);
    setT(Math.max(0, Math.min(1, (u * 400 - X0) / W)));
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[420px]">
        <svg viewBox="0 0 400 250" className="h-auto w-full" style={{ cursor: "ew-resize" }}
             role="img" aria-labelledby="aoh-et-t"
             onClick={(e) => move(e.clientX, e.currentTarget)}
             onMouseMove={(e) => { if (e.buttons === 1) move(e.clientX, e.currentTarget); }}>
          <title id="aoh-et-t">
            Three cycles of different period — daily, lunar, seasonal — drawn together, with a
            movable line reading all three at one instant.
          </title>
          {ROWS.map((r) => (
            <g key={r.k}>
              <line x1={X0} y1={r.y} x2={X1} y2={r.y} stroke="var(--gold)" strokeOpacity="0.14" strokeWidth="0.7" />
              <path d={path(r)} fill="none" stroke="var(--gold)" strokeOpacity="0.6" strokeWidth="1.1" />
              <text x={X0} y={r.y - AMP - 9} className="font-mono" fontSize="7" letterSpacing="1.3"
                    fill="var(--muted-foreground)">{r.k.toUpperCase()}</text>
            </g>
          ))}
          <line x1={X0 + t * W} y1="24" x2={X0 + t * W} y2="236" stroke="var(--gold)"
                strokeOpacity="0.9" strokeWidth="1.2" />
          {ROWS.map((r) => (
            <circle key={r.k} cx={X0 + t * W} cy={yAt(r, t)} r="4.5" fill="var(--gold)" />
          ))}
          <text x="200" y="245" textAnchor="middle" className="font-mono" fontSize="6.6"
                letterSpacing="1.1" fill="var(--muted-foreground)" opacity="0.85">
            DRAG OR CLICK TO READ ANOTHER MOMENT
          </text>
        </svg>
        <input
          type="range" min={0} max={1} step={0.002} value={t} aria-label="Position in time"
          onChange={(e) => setT(parseFloat(e.target.value))}
          className="mt-3 w-full accent-[var(--gold)]"
        />
      </div>

      <div className="min-h-[15rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          The composite at this instant
        </p>
        <div className="mt-4 space-y-px">
          {ROWS.map((r, i) => (
            <div key={r.k} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-border py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                {r.k}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {r.names[quarter(phaseAt(r.p, t))]}
                <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.12em] text-bone/45">
                  {states[i]}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 font-serif text-lg leading-relaxed text-bone/85">{composite}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          No single cycle gives the condition of a moment. Each instant holds a composite — a
          temporary tattvic chord sounded by several simultaneous rhythms — and none of it guarantees
          an outcome. A tide alters what is easier or harder to begin, sustain, and stabilise. It is
          closer to a change in atmospheric pressure than to a command.
        </p>
      </div>
    </div>
  );
}

/**
 * LunarClocks — the two cycles the section opens on, run against each other.
 * Sidereal return is 27.3 days, synodic 29.5, so the Moon comes back to the same
 * star before it comes back to the same phase. They drift, which is exactly why
 * any phase can occupy any mansion. The drift is computed, not asserted.
 */
