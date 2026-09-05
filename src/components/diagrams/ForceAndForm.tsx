import { useState } from "react";
import { fs } from "./fig";

/**
 * ForceAndForm — the descent into determination, drawn as a fan that closes.
 *
 * Potency is structured possibility, not an unlimited cloud: so it opens as a
 * bounded wedge with its two edges drawn, and six branches leave inside it.
 * Each step up the diagonal — Bias, Vector, Activity, Recurrence,
 * Stabilisation — closes alternatives: the branches not selected end there as
 * short dashed stubs, the surrendered possibilities, while one path continues
 * in gold. By Stabilisation one path remains, and it alone crosses the
 * threshold of visibility. Everything beneath the line has already happened.
 *
 * Actuality does not exhaust potency, so from the visible form a new fan
 * re-opens — narrower than the first, and one of its branches keeps the old
 * channel's direction for a moment before turning: released force carries
 * inherited bias. The stepping control replays the closing one step at a
 * time; selecting a step brightens the stubs that end there, which is what
 * that step cost.
 */

const X = (i: number) => 56 + i * 38;
const Y = (i: number) => 268 - i * 33;
const STEP = Math.hypot(38, 33);
const U: [number, number] = [38 / STEP, -33 / STEP]; // along the ascent
const N: [number, number] = [U[1], -U[0]]; // perpendicular, to the upper left
const at = (s: number, p: number): [number, number] => [X(0) + s * U[0] + p * N[0], Y(0) + s * U[1] + p * N[1]];
const f = (v: number) => v.toFixed(1);
const pt = (p: [number, number]) => `${f(p[0])} ${f(p[1])}`;

/** How far off the gold path each branch runs, by rank from the centre. */
const OFF = [6.5, 10.5, 14.5];
/** The fan's wedge at Potency: half-angle and drawn length. */
const WEDGE = 28, WEDGE_R = 44;
/** The narrower range the visible form re-opens: its half-angle about −122°. */
const RE_WEDGE = 20;
/** The branch settles parallel to the path this far along it. */
const SETTLE = 42;

type Strand = { m: number; e: number; p: number; d: string; tail: string; q: number; total: number };

/**
 * Six branches: rank ±3 end at Bias, +2 at Vector, −2 at Activity, +1 at
 * Recurrence, −1 at Stabilisation. Each leaves Potency at its own angle,
 * settles parallel to the path, and runs to the step that ends it.
 */
const STRANDS: Strand[] = [
  { m: 3, e: 1 }, { m: -3, e: 1 }, { m: 2, e: 2 }, { m: -2, e: 3 }, { m: 1, e: 4 }, { m: -1, e: 5 },
].map(({ m, e }) => {
  const p = Math.sign(m) * OFF[Math.abs(m) - 1];
  const P0 = at(0, 0), C = at(SETTLE - 4, p), J = at(SETTLE, p), E = at(e * STEP, p);
  let q = 0, px = P0[0], py = P0[1];
  for (let k = 1; k <= 12; k++) {
    const t = k / 12, a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
    const x = a * P0[0] + b * C[0] + c * J[0], y = a * P0[1] + b * C[1] + c * J[1];
    q += Math.hypot(x - px, y - py); px = x; py = y;
  }
  // the stub: the surrendered alternative runs on a little past the step, drifting away from the path
  const out = Math.sign(p);
  const T1: [number, number] = [E[0] + 9 * U[0] + out * N[0], E[1] + 9 * U[1] + out * N[1]];
  const T2: [number, number] = [E[0] + 17 * U[0] + 5 * out * N[0], E[1] + 17 * U[1] + 5 * out * N[1]];
  return {
    m, e, p, q, total: q + e * STEP - SETTLE,
    d: `M${pt(P0)} Q${pt(C)} ${pt(J)} L${pt(E)}`,
    tail: `M${pt(E)} Q${pt(T1)} ${pt(T2)}`,
  };
});

/** How much of a branch has been drawn when the force has reached step `reach`. */
const liveFrac = (st: Strand, reach: number | null) => {
  if (reach === null || reach >= st.e) return 1;
  const s = (reach + 0.42) * STEP;
  const len = s <= SETTLE ? st.q * (s / SETTLE) : st.q + (s - SETTLE);
  return Math.min(1, len / st.total);
};

const rad = (deg: number) => (deg * Math.PI) / 180;
const ray = (cx: number, cy: number, deg: number, r: number): [number, number] => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))];
/** The two drawn edges of a bounded range, from just outside a node to radius r. */
const wedge = (cx: number, cy: number, a0: number, a1: number, r: number, r0 = 7) =>
  `M${pt(ray(cx, cy, a0, r0))} L${pt(ray(cx, cy, a0, r))} M${pt(ray(cx, cy, a1, r0))} L${pt(ray(cx, cy, a1, r))}`;
const DIAG = (Math.atan2(-33, 38) * 180) / Math.PI; // −41°, the ascent's direction

/**
 * The return: three branches from the rim of the visible form over the top and
 * down the left into Potency. The third keeps the diagonal's direction for a
 * moment before it turns — released force carries inherited bias.
 */
const RETURN = (() => {
  const cx = X(6), cy = Y(6);
  const a = ray(cx, cy, -133, 7), b = ray(cx, cy, -111, 7);
  const k0 = ray(cx, cy, DIAG, 7), k1 = ray(cx, cy, DIAG, 17);
  return [
    { d: `M${pt(a)} C252 28, 22 12, 18 112 C14 190, 30 250, 51 264.5`, kink: false },
    { d: `M${pt(b)} C262 22, 32 8, 26 112 C21 190, 36 249, 52 264`, kink: false },
    { d: `M${pt(k0)} L${pt(k1)} C276 24, 44 10, 34 114 C28 192, 42 248, 53 263.5`, kink: true },
  ];
})();

export function ForceAndForm() {
  const [sel, setSel] = useState<number | null>(null);
  const S = [
    { k: "Potency", d: "Structured possibility — not an unlimited cloud of everything imaginable. A seed holds the potency of a particular plant; an instrument, a range set by its material and construction.", cost: "Six branches open inside the wedge — a range, not a cloud." },
    { k: "Bias", d: "An asymmetry appears: an attraction, a tension, a need, an intention, an environmental pressure, a morphogenic lean. The tattvas belong here — they do not manufacture the form, they predispose force toward a mode of expression.", cost: "Two of the six branches end here. Four remain, and the fan is narrower." },
    { k: "Vector", d: "The asymmetry gives the potency a direction. What could have gone many ways now leans one way.", cost: "One more branch ends here. Three remain." },
    { k: "Activity", d: "The vector meets a medium, and the medium answers with both resistance and affordance. Neither alone would produce anything.", cost: "One more branch ends here. Two remain." },
    { k: "Recurrence", d: "Repetition deepens the pathway. Feedback reinforces some movements and suppresses others, and the difference between them begins to matter.", cost: "One more branch ends here. One alternative still runs beside the path." },
    { k: "Stabilisation", d: "Activity becomes steady enough to hold a recognisable relation. This is where Salt does its work — fixing what has been achieved into something durable.", cost: "The last alternative ends here. One path remains, and it alone can cross the line." },
    { k: "Visible form", d: "The late result of an invisible history. By the time a form can be seen, touched, named, or measured, every selection above it has already been made.", cost: "The one path crosses. From the form a narrower fan re-opens — three branches, one of them still bent by the channel it left." },
  ];
  const cur = sel === null ? null : S[sel];
  const reach = sel;
  const cycle = sel === null || sel === 6; // the return fan is drawn when the form exists
  const next = () => setSel((v) => (v === null || v === 6 ? 0 : v + 1));
  const choose = (i: number) => setSel((v) => (v === i ? null : i));

  // the gold path, one hundred units of pathLength per step
  const goldD = S.map((_, i) => `${i ? "L" : "M"}${X(i)} ${Y(i)}`).join(" ");
  const goldReveal = reach === null || reach === 6 ? 600 : (reach + 0.42) * 100;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-ff-run { stroke-dasharray: 4 8; animation: aoh-ff-turn 4s linear infinite; }
          @keyframes aoh-ff-turn { to { stroke-dashoffset: -24 } }
          .aoh-ff-grow { transition: stroke-dasharray 720ms cubic-bezier(0.2, 0.7, 0.3, 1), stroke-opacity 360ms ease; }
          .aoh-ff-fade { transition: opacity 420ms ease, stroke-opacity 360ms ease, stroke-width 360ms ease; }
          .aoh-ff-n { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) {
            .aoh-ff-run { animation: none }
            .aoh-ff-grow, .aoh-ff-fade { transition: none }
          }
        `}</style>
        <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-labelledby="aoh-ff-t">
          <title id="aoh-ff-t">
            Potency opens a bounded fan of six branches. Climbing the diagonal, each of five steps —
            Bias, Vector, Activity, Recurrence, Stabilisation — ends the branches not selected as short
            stubs, until one gold path alone crosses the threshold of visibility to visible form; from
            the form a narrower fan of three branches returns to potency, one of them bent by the
            channel it left.
          </title>
          <defs>
            <filter id="aoh-ff-soft" x="-8%" y="-8%" width="116%" height="116%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* the drawing's own ground: the block sits on a photograph */}
          <rect x="6" y="4" width="368" height="292" fill="var(--void)" fillOpacity="0.8" filter="url(#aoh-ff-soft)" aria-hidden="true" />

          {/* threshold of visibility — only the final step rises above it */}
          <line x1="14" y1={Y(6) + 17} x2="370" y2={Y(6) + 17} stroke="var(--gold)"
                strokeOpacity="0.6" strokeDasharray="6 5" strokeWidth="1" />
          <text x="60" y={Y(6) + 12} className="font-label" style={fs(8)} letterSpacing="1"
                fill="var(--gold)" fillOpacity="0.85">THRESHOLD OF VISIBILITY</text>
          <text x="370" y={Y(6) + 34} textAnchor="end" className="font-label hidden sm:block" style={fs(8)}
                letterSpacing="0.9" fill="var(--muted-foreground)">
            <tspan x="370">EVERYTHING BELOW</tspan>
            <tspan x="370" dy="11">HAS ALREADY</tspan>
            <tspan x="370" dy="11">HAPPENED</tspan>
          </text>
          <text x="370" y={Y(6) + 34} textAnchor="end" className="font-label sm:hidden" style={fs(8)}
                letterSpacing="0.9" fill="var(--muted-foreground)">
            <tspan x="370">EVERYTHING</tspan>
            <tspan x="370" dy="11">BELOW HAS</tspan>
            <tspan x="370" dy="11">ALREADY</tspan>
            <tspan x="370" dy="11">HAPPENED</tspan>
          </text>

          {/* the wedge at Potency: a bounded range, with both edges drawn */}
          <path d={wedge(X(0), Y(0), DIAG - WEDGE, DIAG + WEDGE, WEDGE_R)} fill="none" stroke="var(--bone)"
                strokeOpacity={reach === 0 ? 0.9 : 0.62} strokeWidth="0.8" className="aoh-ff-fade" />

          {/* the six branches, and the stub where each one ends */}
          {STRANDS.map((st) => {
            const ended = reach === null || reach >= st.e;
            const hot = reach === st.e;
            const frac = liveFrac(st, reach);
            return (
              <g key={st.m}>
                <path d={st.d} fill="none" stroke="var(--bone)" pathLength={100} className="aoh-ff-grow"
                      strokeDasharray={`${f(frac * 100)} 100`}
                      strokeOpacity={hot ? 0.8 : ended ? (reach === null ? 0.6 : 0.42) : 0.66}
                      strokeWidth={hot ? 0.9 : 0.75} strokeLinecap="round" />
                <path d={st.tail} fill="none" stroke="var(--bone)" className="aoh-ff-fade"
                      strokeDasharray="3 2.6" strokeLinecap="round"
                      opacity={ended ? 1 : 0}
                      strokeOpacity={hot ? 1 : 0.6} strokeWidth={hot ? 1.3 : 0.85} />
              </g>
            );
          })}

          {/* the gold path: the channel latent in the range, then the force travelling it */}
          <path d={goldD} fill="none" stroke="var(--gold)" strokeOpacity="0.38" strokeWidth="1" />
          <path d={goldD} fill="none" stroke="var(--gold)" strokeOpacity="0.85" strokeWidth="1.4"
                pathLength={600} strokeDasharray={`${f(goldReveal)} 600`} strokeLinecap="round" className="aoh-ff-grow" />
          {S.map((_, i) => i < 6 && (
            <line key={i} x1={X(i)} y1={Y(i)} x2={X(i + 1)} y2={Y(i + 1)} className="aoh-ff-run aoh-ff-fade"
                  stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round"
                  opacity={reach === null || i < reach ? 1 : 0} />
          ))}

          {/* actuality does not exhaust potency: a narrower fan returns from the form */}
          <g className="aoh-ff-fade" opacity={cycle ? 1 : 0} style={{ pointerEvents: "none" }}>
            <path d={wedge(X(6), Y(6), -122 + RE_WEDGE, -122 - RE_WEDGE, 30)} fill="none" stroke="var(--bone)" strokeOpacity="0.62" strokeWidth="0.8" />
            {RETURN.map((r) => (
              <path key={r.d} d={r.d} fill="none" stroke="var(--bone)" strokeOpacity={r.kink ? 0.8 : 0.62}
                    strokeWidth={r.kink ? 1 : 0.85} strokeLinejoin="round" className="aoh-ff-run" />
            ))}
            {/* the landing, drawn */}
            <path d="M-4.5 -3 L0 0 L-4.5 3" transform="translate(46 261) rotate(34)" fill="none" stroke="var(--bone)"
                  strokeOpacity="0.85" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <text x="172" y="13" textAnchor="middle" className="font-label" style={fs(8)}
                  letterSpacing="1" fill="var(--muted-foreground)">
              <tspan x="172">STRUCTURE BECOMES</tspan>
              <tspan x="172" dy="11">THE VESSEL OF NEW POTENCY</tspan>
            </text>
          </g>

          {S.map((st, i) => {
            const on = sel === i;
            const vis = i === 6;
            const passed = reach !== null && i < reach;
            const ahead = reach !== null && i > reach;
            const ring = on ? 1 : passed ? 0.8 : ahead ? 0.32 : 0.7;
            const ink = on ? "var(--gold)" : vis ? "var(--gold)" : "var(--muted-foreground)";
            return (
              <g key={st.k} className="aoh-ff-n" onClick={() => choose(i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={`${st.k}, step ${i + 1} of 7`}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(i); } }}>
                <circle cx={X(i)} cy={Y(i)} r="13" fill="transparent" />
                <circle cx={X(i)} cy={Y(i)} r={on ? 9 : 6} className="aoh-ff-fade"
                        fill={vis ? "var(--gold)" : "var(--void)"}
                        fillOpacity={vis ? (on || cycle ? 1 : 0.5) : 1}
                        stroke="var(--gold)" strokeOpacity={ring} strokeWidth={on ? 2 : 1.1} />
                {i === 6 ? (
                  <text x={X(i) + 16} y={Y(i) - 1} className="font-label" style={fs(8)} letterSpacing="0.8"
                        fill={ink} opacity={ahead ? 0.45 : 1}>
                    <tspan x={X(i) + 16}>VISIBLE</tspan>
                    <tspan x={X(i) + 16} dy="11">FORM</tspan>
                  </text>
                ) : i === 5 ? (
                  <text x={X(i) - 13} y={Y(i) + 3} textAnchor="end" className="font-label" style={fs(8)}
                        letterSpacing="0.8" fill={ink} opacity={ahead ? 0.45 : 1}>
                    STABILISATION
                  </text>
                ) : (
                  <text x={X(i) + 12} y={Y(i) + 22} className="font-label" style={fs(8)} letterSpacing="0.8"
                        fill={ink} opacity={ahead ? 0.45 : 1}>
                    {st.k.toUpperCase()}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button type="button" onClick={next}
                  className="border border-border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-gold hover:text-gold">
            Next step
          </button>
          <button type="button" onClick={() => setSel(null)} disabled={sel === null}
                  className="border border-border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors enabled:hover:border-gold enabled:hover:text-gold disabled:opacity-40">
            Reset
          </button>
          <p aria-live="polite" className="ml-1 font-label text-[9px] uppercase tracking-[0.15em] text-gold-dim">
            {sel === null ? "The whole cycle" : `Step ${sel + 1} of 7 · ${S[sel].k}`}
          </p>
        </div>
      </div>

      <div className="min-h-[15rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {String((sel as number) + 1).padStart(2, "0")} · {cur.k}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">{cur.cost}</p>
            {sel === 6 && (
              <p className="mt-4 border-l-2 border-gold/50 pl-5 text-sm leading-relaxed text-bone/75">
                Which is why visibility should never be confused with beginning. What appears
                suddenly at the visible level may have been assembling gradually in subtler
                conditions for a very long time.
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The descent from potency into activity is not a fall into inferiority. It is a descent
              into <span className="text-bone/90">determination</span> — and to become actual is to
              surrender alternative possibilities in exchange for concrete existence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Six of these seven steps happen below the threshold. Only the last can be seen, touched,
              named, or measured, which makes visible structure the final witness of a formative
              process rather than its origin.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              And the arc returning overhead is the part easiest to miss: actuality does not exhaust
              potency. A realised form generates new capacities, and becomes the ground of further
              possibility — a narrower range than the first, and already leaning the way it came.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * EthericTides — three nested cycles at different periods, read at one instant.
 * The point is superposition: no single cycle gives the condition of a moment,
 * and the composite is what the field actually offers. Move the reading line to
 * see the same three rhythms reinforce, oppose, or complicate one another.
 */
