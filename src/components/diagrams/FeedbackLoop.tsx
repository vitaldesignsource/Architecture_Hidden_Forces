import { useState, type CSSProperties } from "react";
import { fs } from "./fig";

/**
 * FeedbackLoop — how an expression becomes an environment.
 *
 * Six nodes on a ring, each the cause of the next, and the cause lettered on
 * the arc that carries it: people direct attention and emotion and an
 * atmosphere forms; the atmosphere intensifies the feelings that produced it;
 * the feelings give action its charge; action has consequence, and the
 * consequence is a habitat; the habitat attracts compatible temperaments;
 * the recruits inherit postures and are the people who begin the ring again.
 * Fortune's feedback, drawn as the ecology it becomes.
 *
 * The wheel accumulates. Each season of participation lays another faint ring
 * outside the loop, thickens the nodes, and moves a mark along the gauge
 * beneath from deliberate participation toward inherited participation. Past
 * the tick at morphal saturation the founders' dots at the people node fade
 * while new dots gather at recruits — and removing the founders, which before
 * the tick stops the current, after it changes nothing: the form has
 * survived its founders.
 */
const NODES = ["people", "atmosphere", "feelings", "action", "habitat", "recruits"];

/** seasons the wheel takes before it can be begun again */
const MAX = 6;
/** the lap at which the field reaches morphal saturation; the tick sits just before it */
const SAT = 4;

const cx = 180, cy = 148, R = 88;
const rad = (d: number) => (d * Math.PI) / 180;
const P = (deg: number, r: number) => ({ x: cx + r * Math.cos(rad(deg)), y: cy + r * Math.sin(rad(deg)) });
const f = (n: number) => n.toFixed(2);
/** an arc from a0 to a1 in degrees, clockwise on screen; drawn the other way round when cw is
 *  false, so that text laid on it in the lower half of the wheel stays the right way up */
const arc = (a0: number, a1: number, r: number, cw = true) => {
  const s = P(cw ? a0 : a1, r), e = P(cw ? a1 : a0, r);
  return `M${f(s.x)} ${f(s.y)} A${r} ${r} 0 0 ${cw ? 1 : 0} ${f(e.x)} ${f(e.y)}`;
};
const angle = (i: number) => -90 + 60 * i;

/** what each arc does to the node it reaches, in the band's own words; the lines after the first
 *  sit inside the loop and are for wide screens, where a phone shows the first line alone */
const ARCS: { cw: boolean; lines: string[]; phone?: string }[] = [
  { cw: true, lines: ["ATTENTION", "AND EMOTION"] },
  { cw: true, lines: ["INTENSIFIES"] },
  { cw: false, lines: ["CHARGE"] },
  { cw: false, lines: ["CONSEQUENCE"] },
  { cw: false, lines: ["ATTRACTS COMPATIBLE", "TEMPERAMENTS"], phone: "ATTRACTS" },
  { cw: true, lines: ["INHERIT POSTURES"], phone: "INHERIT" },
];
/** baseline radius of the j-th line of a phrase: the first outside the ring, the rest inside */
const lineR = (cw: boolean, j: number) => (j === 0 ? (cw ? R + 4 : R + 11) : cw ? R - 2 - 9 * j : R + 5 - 9 * j);

/** the founders, clustered inside the ring at the people node — angle and radius */
const FOUNDERS: [number, number][] = [[-106, 62], [-99, 69], [-92, 63], [-85, 70], [-97, 57]];
/** where the new participants gather, inside the ring at recruits, in the order they arrive */
const RECRUITS: [number, number][] = [
  [213, 67], [221, 62], [208, 60], [227, 70], [216, 75], [232, 64], [210, 77], [224, 57], [230, 74], [205, 66], [219, 69],
];
const RECRUITS_BY_LAP = [0, 0, 1, 2, 5, 8, 11];
const FOUNDERS_BY_LAP = [0.9, 0.9, 0.9, 0.9, 0.5, 0.28, 0.12];

/** the gauge beneath the wheel */
const GX0 = 64, GX1 = 296, GY = 302;
const GW = GX1 - GX0;
const TICK = GX0 + (GW * (SAT - 0.5)) / MAX;

export function FeedbackLoop() {
  const [lap, setLap] = useState(0);
  const [gone, setGone] = useState(false);
  const G = "var(--gold, #c9a227)";
  const saturated = lap >= SAT;
  /** before saturation the formation depends on deliberate participation: no founders, no current */
  const halted = gone && !saturated;
  const nodeR = 3.2 + 0.4 * lap;
  const gap = (Math.asin((nodeR + 2.2) / R) * 180) / Math.PI;
  const arcOp = halted ? 0.22 : 0.55 + 0.05 * lap;

  const state = halted ? "THE CURRENT STOPS" : gone ? "SURVIVES ITS FOUNDERS" : saturated ? "MORPHAL SATURATION" : "DELIBERATE PARTICIPATION";
  const consequence = halted
    ? "Without its founders the current stops. At first the formation depends on deliberate participation, and nothing accumulates until they return."
    : gone
      ? "The founders are gone and the wheel keeps turning: the form has survived its founders, and the feedback renews it. New participants feel an atmosphere they did not create."
      : saturated
        ? "Morphal saturation. The form is easier to evoke than to forget; new participants feel an atmosphere they did not create, and inherit emotional postures before they understand the events that produced them."
        : "At first the formation depends on deliberate participation. Each season lays down another ring, and the dispersed current tends further toward a recognisable, repeatable body.";

  const label = { ...fs(7), letterSpacing: "0.08em" };
  const small = { ...fs(7), letterSpacing: "0.14em" };
  const btn = (on: boolean, off = false) =>
    `border px-3 py-1.5 font-label text-[9px] uppercase tracking-[0.18em] transition-colors ${
      on ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40 hover:text-gold-dim"
    } ${off ? "cursor-not-allowed opacity-40" : ""}`;

  return (
    <div className="aoh-fig mx-auto w-full max-w-[520px]">
      <style>{`
        .aoh-fl-run { stroke-dasharray: 4 7; animation: aoh-fl-go var(--aoh-fl-dur, 5s) linear infinite; }
        @keyframes aoh-fl-go { to { stroke-dashoffset: -22 } }
        .aoh-fl-halt .aoh-fl-run { animation-play-state: paused; }
        .aoh-fl-ring, .aoh-fl-dot { transition: opacity 600ms ease; }
        .aoh-fl-mark, .aoh-fl-fill { transition: transform 600ms ease; }
        @media (prefers-reduced-motion: reduce) {
          .aoh-fl-run { animation: none }
          .aoh-fl-ring, .aoh-fl-dot, .aoh-fl-mark, .aoh-fl-fill { transition: none }
        }
      `}</style>
      <svg viewBox="0 0 360 342" className={`h-auto w-full ${halted ? "aoh-fl-halt" : ""}`} role="img" aria-labelledby="aoh-fl-t"
           style={{ "--aoh-fl-dur": `${5.5 - 0.5 * lap}s` } as CSSProperties}>
        <title id="aoh-fl-t">
          Six words on a ring — people, atmosphere, feelings, action, habitat, recruits — joined in order by
          six arcs, each ending in an arrowhead and lettered with what it does to the next: attention and
          emotion, intensifies, charge, consequence, attracts compatible temperaments, inherit postures.
          Each season of participation adds a faint ring outside the loop, thickens the nodes, and moves a
          mark along a gauge beneath the wheel from deliberate to inherited, past a tick marked saturation.
          Beyond the tick the founders' dots at people fade while new dots gather at recruits, and removing
          the founders — which before the tick stops the current — leaves the wheel turning.
        </title>
        <defs>
          {ARCS.map((a, i) => {
            const a0 = angle(i), a1 = angle(i + 1);
            return a.lines.map((_, j) => (
              <path key={j} id={`aoh-fl-p${i}-${j}`} d={arc(a0 - 12, a1 + 12, lineR(a.cw, j), a.cw)} />
            ));
          })}
          {NODES.map((_, i) => {
            const cw = i === 0 || i === 1 || i === 5;
            return <path key={i} id={`aoh-fl-w${i}`} d={arc(angle(i) - 40, angle(i) + 40, cw ? R + 20 : R + 27, cw)} />;
          })}
        </defs>

        {/* the rings a season lays down: formative inertia, one ring a lap, outside the loop */}
        {Array.from({ length: MAX }, (_, k) => (
          <circle key={k} cx={cx} cy={cy} r={R + 33.5 + 1.6 * k} fill="none" stroke={G}
                  strokeOpacity={(halted ? 0.12 : 0.28) - 0.02 * k} strokeWidth={0.8}
                  className="aoh-fl-ring" style={{ opacity: k < lap ? 1 : 0 }} />
        ))}

        {/* the six arcs, each a cause, with the current running along it */}
        {ARCS.map((a, i) => {
          const s = angle(i) + gap, e = angle(i + 1) - gap;
          const tip = P(e, R);
          const tx = -Math.sin(rad(e)), ty = Math.cos(rad(e));
          const nx = Math.cos(rad(e)), ny = Math.sin(rad(e));
          const bx = tip.x - 6.5 * tx, by = tip.y - 6.5 * ty;
          return (
            <g key={i}>
              <path d={arc(s, e - 4, R)} fill="none" stroke={G} strokeOpacity={arcOp} strokeWidth={1.1} className="aoh-fl-run" />
              <path d={`M${f(tip.x)} ${f(tip.y)} L${f(bx + 2.8 * nx)} ${f(by + 2.8 * ny)} L${f(bx - 2.8 * nx)} ${f(by - 2.8 * ny)} Z`}
                    fill={G} fillOpacity={halted ? 0.3 : 0.85} />
              {a.lines.map((line, j) => {
                const wide = j > 0 || (a.phone !== undefined && a.phone !== line);
                return (
                  <text key={j} className={`font-label uppercase${wide ? " hidden sm:block" : ""}`} style={label}
                        textAnchor="middle" fill="currentColor" fillOpacity={0.72}>
                    <textPath href={`#aoh-fl-p${i}-${j}`} startOffset="50%">{line}</textPath>
                  </text>
                );
              })}
              {a.phone !== undefined && a.phone !== a.lines[0] && (
                <text className="font-label uppercase sm:hidden" style={label} textAnchor="middle" fill="currentColor" fillOpacity={0.72}>
                  <textPath href={`#aoh-fl-p${i}-0`} startOffset="50%">{a.phone}</textPath>
                </text>
              )}
            </g>
          );
        })}

        {/* the six nodes, thickening with every season, and their words on the band outside */}
        {NODES.map((n, i) => {
          const p = P(angle(i), R);
          return (
            <g key={n}>
              <circle cx={f(p.x)} cy={f(p.y)} r={nodeR} fill={G} fillOpacity={halted ? 0.4 : 1} />
              <text className="font-serif" style={fs(10)} textAnchor="middle" fill="currentColor" fillOpacity={0.9}>
                <textPath href={`#aoh-fl-w${i}`} startOffset="50%">{n}</textPath>
              </text>
            </g>
          );
        })}

        {/* the founders at people — a few, and past saturation fading — and the recruits gathering */}
        {FOUNDERS.map(([a, r], k) => {
          const p = P(a, r);
          return <circle key={k} cx={f(p.x)} cy={f(p.y)} r={1.7} fill="currentColor" className="aoh-fl-dot"
                         style={{ opacity: gone ? 0 : FOUNDERS_BY_LAP[lap] }} />;
        })}
        <text x={cx - 3} y={cy - 45} textAnchor="middle" className="font-label uppercase" style={{ ...fs(7), letterSpacing: "0.14em" }}
              fill="currentColor" fillOpacity={0.55}>founders</text>
        {RECRUITS.map(([a, r], k) => {
          const p = P(a, r);
          return <circle key={k} cx={f(p.x)} cy={f(p.y)} r={1.7} fill={G} className="aoh-fl-dot"
                         style={{ opacity: k < RECRUITS_BY_LAP[lap] ? (halted ? 0.4 : 0.9) : 0 }} />;
        })}

        {/* the band's own heading at the centre — two lines wide, three on a phone */}
        <g className="font-label uppercase" fill={G} fillOpacity={0.8}>
          <text x={cx} y={cy - 3} textAnchor="middle" className="hidden sm:block" style={small}>
            <tspan x={cx}>what began as expression</tspan>
            <tspan x={cx} dy={12}>becomes environment</tspan>
          </text>
          <text x={cx} y={cy - 10} textAnchor="middle" className="sm:hidden" style={small}>
            <tspan x={cx}>what began</tspan>
            <tspan x={cx} dy={12}>as expression</tspan>
            <tspan x={cx} dy={12}>becomes environment</tspan>
          </text>
        </g>

        {/* the state the wheel is in, and the count of seasons */}
        <text x={8} y={13} className="font-label uppercase" style={small} fill="currentColor" fillOpacity={0.6}>{state}</text>
        <text x={352} y={13} textAnchor="end" className="font-label uppercase" style={small} fill={G} fillOpacity={0.85}>
          {`lap · ${String(lap).padStart(2, "0")}`}
        </text>

        {/* the gauge: participation, from deliberate to inherited, saturation between */}
        <g>
          <text x={GX0} y={GY - 9} className="font-label uppercase" style={small} fill={G} fillOpacity={0.85}>participation</text>
          <line x1={GX0} y1={GY} x2={GX1} y2={GY} stroke="currentColor" strokeOpacity={0.28} strokeWidth={1} />
          <rect x={GX0} y={GY - 0.6} width={GW} height={1.2} fill={G} fillOpacity={0.75} className="aoh-fl-fill"
                style={{ transform: `scaleX(${lap / MAX})`, transformOrigin: `${GX0}px ${GY}px` }} />
          <line x1={GX0} y1={GY - 3} x2={GX0} y2={GY + 3} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
          <line x1={GX1} y1={GY - 3} x2={GX1} y2={GY + 3} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
          <line x1={TICK} y1={GY - 6} x2={TICK} y2={GY + 6} stroke={G} strokeOpacity={0.9} strokeWidth={1} />
          {/* the tick's word sits centred over the tick where the row has room; on a phone the lettering
              grows two fifths while the gauge does not, and PARTICIPATION would run into a centred
              SATURATION, so there the word steps to the tick's right and the tick stands between them */}
          <text x={TICK} y={GY - 9} textAnchor="middle" className="hidden sm:block font-label uppercase" style={small} fill={G} fillOpacity={0.85}>saturation</text>
          <text x={TICK + 4.5} y={GY - 9} className="sm:hidden font-label uppercase" style={small} fill={G} fillOpacity={0.85}>saturation</text>
          <g className="aoh-fl-mark" style={{ transform: `translateX(${(GW * lap) / MAX}px)` }}>
            <circle cx={GX0} cy={GY} r={3.4} fill={G} stroke="var(--void, #000)" strokeWidth={1} />
          </g>
          <text x={GX0} y={GY + 13} className="font-label uppercase" style={small} fill="currentColor" fillOpacity={0.6}>deliberate</text>
          <text x={GX1} y={GY + 13} textAnchor="end" className="font-label uppercase" style={small} fill="currentColor" fillOpacity={0.6}>inherited</text>
        </g>

        <text x={cx} y={335} textAnchor="middle" className="font-serif italic" style={fs(9)} fill="currentColor" fillOpacity={0.6}>
          the ring closes without anyone deciding to close it
        </text>
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button type="button" className={btn(false, halted)} aria-disabled={halted}
                onClick={() => { if (!halted) setLap((l) => (l >= MAX ? 0 : l + 1)); }}>
          {lap >= MAX ? "Begin again" : "Another season of participation"}
        </button>
        <button type="button" className={btn(gone)} aria-pressed={gone} onClick={() => setGone((v) => !v)}>
          Remove the founders
        </button>
      </div>
      <p aria-live="polite" className="mx-auto mt-4 min-h-[4rem] max-w-md text-center text-sm leading-relaxed text-muted-foreground">
        {consequence}
      </p>
    </div>
  );
}
