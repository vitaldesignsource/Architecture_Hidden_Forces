import { useState } from "react";
import type { CSSProperties } from "react";
import { fs } from "./fig";

/**
 * MorphaithericField — the eight behaviours of the field drawn as stations of
 * one circulation.
 *
 * The section's governing correction is that Morphaithēr is closer to an
 * ecosystem than to a fluid: not one more substance beside the others but the
 * pattern of their relations. So the eight are not eight things scattered in a
 * box. They are one route through one terrain, in the order the section's own
 * chain gives — FIELD → BIAS → VECTOR → RESONANCE → RECURRENCE → THRESHOLD →
 * FORM — and then the form's return as a new condition of the field.
 *
 * A current runs down a gradient (bias) from the field's edge, where a tide
 * swells its receptivity; it is drawn into a vortex (resonance) and fed into a
 * reservoir whose level rises with each pass (recurrence). When the level
 * reaches the threshold a mark crosses it and a standing pattern precipitates
 * beyond — and on the next pass the current bends to go round the form it
 * made. Each pass deepens the main channel while a tributary dissipates. Let
 * the form lapse and a scar remains where it stood, with the bend still in the
 * current: memory is the alteration returned to the field. The field the
 * current starts in already carries such a scar — a force arises within a
 * field already conditioned by previous forms.
 */

type Key = "Current" | "Tide" | "Gradient" | "Reservoir" | "Vortex" | "Standing pattern" | "Scar" | "Threshold";

const F: { k: Key; stage: string | null; d: string }[] = [
  { k: "Current", stage: "vector",
    d: "Sustained directional movement. Desire, collective attention, inherited practice, or environmental pressure can each raise one." },
  { k: "Tide", stage: null,
    d: "A recurrent alteration in receptivity, intensity, or tattvic composition — daily, lunar, seasonal, bodily, ritual." },
  { k: "Gradient", stage: "bias",
    d: "A difference between regions. Force moves or forms differently because one area is more receptive, saturated, coherent, or resistant than its neighbour." },
  { k: "Reservoir", stage: "recurrence",
    d: "Accumulated formative capacity held in a body, place, symbol, institution, or repeated practice. Not stored energy — retained readiness for a pattern to reappear." },
  { k: "Vortex", stage: "resonance",
    d: "A self-reinforcing pattern drawing new force into its own circulation. Psychic complexes, egregores, and collective identities behave this way." },
  { k: "Standing pattern", stage: "form",
    d: "A recurrence stable enough to keep its organisation while currents pass through it. Living bodies, habits, institutions, consecrated places." },
  { k: "Scar", stage: "memory",
    d: "A persistent alteration left after the event has ended. The field holds no replica of what happened — it holds changed tendencies." },
  { k: "Threshold", stage: "threshold",
    d: "Where accumulated conditions turn qualitative. Possibility becomes activity, activity becomes recurrence, recurrence becomes stable form." },
];

/* ── geometry, in the 300 × 316 box ─────────────────────────────────────── */

const VX = 176, VY = 124, VR = 22; // the vortex
const SITE = { x: 244, y: 236, r: 13 }; // where the form precipitates
const LIP = 190; // the threshold: the reservoir's right lip, and the line drawn at its height
const BASIN_FLOOR = 226;

/* the spine: down the gradient, once round the vortex, into the reservoir */
const SLOPE = "M14 58 C 48 60, 86 82, 116 102";
const APPROACH = "C 132 112, 144 120, 154 124";
const ARC = `A${VR} ${VR} 0 1 1 ${VX} ${VY + VR}`;
const FEED = `L${VX} 182`;
const SPINE = `${SLOPE} ${APPROACH} ${ARC} ${FEED}`;

/* a second, thinner path that leaves the slope and goes nowhere */
const TRIBUTARY = "M45 65 C 90 68, 122 60, 152 52 C 172 46, 192 48, 210 52";

/* beyond the lip: the outflow, straight through the site or bent round it.
   Both are one cubic between the same two points, so the bend can be eased. */
const OUT_HEAD = "M206 190 C 216 200, 226 210, 232.5 222";
const OUT_TAIL = "C 258 258, 260 264, 262 270";
const OUT_STRAIGHT = `${OUT_HEAD} C 240.2 231.3, 247.8 240.7, 255.5 250 ${OUT_TAIL}`;
const OUT_BENT = `${OUT_HEAD} C 263.3 212.1, 270.9 221.5, 255.5 250 ${OUT_TAIL}`;
const BEND_STRAIGHT = "M232.5 222 C 240.2 231.3, 247.8 240.7, 255.5 250";
const BEND_BENT = "M232.5 222 C 263.3 212.1, 270.9 221.5, 255.5 250";

/* the return: along the foot of the field and up its edge, already bending
   round an older scar, back to where the current begins */
const OLD_SCAR = { x: 18, y: 236, r: 6 };
const RETURN_FOOT = "M262 270 C 258 282, 246 286, 220 286 L 60 286 C 34 286, 18 280, 18 262 L 18 254";
const RETURN_BEND = "C 18 246, 34 244, 34 236 C 34 228, 18 226, 18 218";
const RETURN_EDGE = "L 18 74 C 18 66, 16 60, 14 58";
const RETURN = `${RETURN_FOOT} ${RETURN_BEND} ${RETURN_EDGE}`;

const BASIN = `M146 178 L150 ${BASIN_FLOOR} L202 ${BASIN_FLOOR} L206 ${LIP}`;

/* a cubic's point and tangent, for the contour ticks across the slope */
const P = [[14, 58], [48, 60], [86, 82], [116, 102]];
const bez = (t: number) => {
  const u = 1 - t;
  return [0, 1].map((i) => u * u * u * P[0][i] + 3 * u * u * t * P[1][i] + 3 * u * t * t * P[2][i] + t * t * t * P[3][i]);
};
const dbez = (t: number) => {
  const u = 1 - t;
  return [0, 1].map((i) => 3 * u * u * (P[1][i] - P[0][i]) + 6 * u * t * (P[2][i] - P[1][i]) + 3 * t * t * (P[3][i] - P[2][i]));
};
const TICKS = [0.08, 0.2, 0.36, 0.56, 0.8].map((t) => {
  const [x, y] = bez(t);
  const [dx, dy] = dbez(t);
  const n = Math.hypot(dx, dy);
  const nx = -dy / n, ny = dx / n;
  return { x1: x + nx * 13, y1: y + ny * 13, x2: x - nx * 13, y2: y - ny * 13 };
});

function spiral(cx: number, cy: number, r0: number, r1: number, turns: number, steps = 64) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * 2 * Math.PI;
    const r = r0 + (r1 - r0) * t;
    d += `${i ? " L" : "M"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  }
  return d;
}
const SPIRAL = spiral(VX, VY, 16, 3, 2.25);

const pad = (n: number) => String(n).padStart(2, "0");

export function MorphaithericField() {
  const [sel, setSel] = useState<Key | null>(null);
  const [pass, setPass] = useState(1);
  const [lapsed, setLapsed] = useState(false);
  const [returned, setReturned] = useState(false);

  const crossed = pass >= 2; // the level has reached the lip
  const formed = crossed && !lapsed; // a pattern stands beyond it
  const bent = pass >= 3; // from the pass after precipitation the current goes round where it stands — or stood
  const depth = Math.min(pass - 1, 5);

  const on = (k: Key) => sel === k;
  const dim = (k: Key) => (sel && sel !== k ? 0.16 : 1);
  const ink = (k: Key) => (on(k) ? "var(--gold)" : "var(--muted-foreground)");
  const toggle = (k: Key) => setSel(on(k) ? null : k);
  const keys = (k: Key) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(k); }
  };
  const cur = F.find((f) => f.k === sel);

  const runPass = () => {
    setPass((p) => p + 1);
    if (lapsed) { setLapsed(false); setReturned(true); }
  };
  const lapse = () => { if (formed) { setLapsed(true); setReturned(false); } };

  const level = crossed ? LIP : 210; // the surface of the reservoir
  const mainW = 1.1 + 0.3 * depth;
  const grooveW = 4 + 2.2 * depth;
  const grooveO = 0.05 + 0.035 * depth;
  const tribO = Math.max(0, 0.55 - 0.18 * (pass - 1));
  const outD = bent ? OUT_BENT : OUT_STRAIGHT;
  const bendD = bent ? BEND_BENT : BEND_STRAIGHT;

  const status = !crossed
    ? `Pass ${pad(pass)} · the reservoir is filling; nothing has yet crossed the threshold.`
    : lapsed
      ? bent
        ? `Pass ${pad(pass)} · the form has lapsed. Its scar remains, and the current keeps the bend.`
        : `Pass ${pad(pass)} · the form has lapsed before the current had bent round it. Its scar remains.`
      : returned
        ? `Pass ${pad(pass)} · the pattern has reappeared along its scar — retained readiness.`
        : pass === 2
          ? `Pass ${pad(pass)} · the level has reached the threshold and a pattern stands beyond it.`
          : `Pass ${pad(pass)} · the channel has deepened ${pass - 1} times; the current now goes round the form it made.`;

  /* the stretch of the circulation each feature owns, lit when it is chosen */
  const LIT: Record<Key, string[]> = {
    Gradient: [SLOPE],
    Current: [SPINE],
    Tide: [`M18 218 ${RETURN_EDGE}`, "M14 58 C 30 58, 40 60, 48 62"],
    Vortex: [`M154 124 ${ARC}`],
    Reservoir: [`M${VX} ${VY + VR} ${FEED}`, BASIN],
    Threshold: [`M104 ${LIP} L236 ${LIP}`, OUT_HEAD],
    "Standing pattern": [bendD],
    Scar: [`M18 254 ${RETURN_BEND}`, ...(lapsed && bent ? [bendD] : [])],
  };

  /* `tone` sets the lettering back a little for a feature whose site is empty; it never goes below the
     0.55 the house asks of a label, so the name of a selectable node can always be found and read */
  const label = (k: Key, x: number, y: number, anchor: "start" | "middle" | "end", lines: string[], stage: string | null, tone = 1) => (
    <text x={x} y={y} textAnchor={anchor} className="font-label" style={fs(7)} letterSpacing="1">
      {lines.map((l, i) => (
        <tspan key={l} x={x} dy={i ? "1.25em" : 0} fill={ink(k)} fillOpacity={on(k) ? 1 : tone}>{l}</tspan>
      ))}
      {stage && (
        <tspan x={x} dy="1.4em" style={fs(6.5)} fill={on(k) ? "var(--gold)" : "var(--gold-dim)"} fillOpacity={on(k) ? 1 : Math.min(0.9, tone)}>
          {stage}
        </tspan>
      )}
    </text>
  );

  const btn = "border px-3 py-1.5 font-label text-[9px] uppercase tracking-[0.18em] transition-colors";
  const btnOn = "border-gold/70 text-gold hover:border-gold";
  const btnOff = "border-border text-muted-foreground hover:border-gold/40 hover:text-gold-dim";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-mf-flow { stroke-dasharray: 5 8; animation: aoh-mf-run 3.4s linear infinite; }
          .aoh-mf-swell { animation: aoh-mf-swell 5s ease-in-out infinite; }
          .aoh-mf-breathe { animation: aoh-mf-breathe 5s ease-in-out infinite; }
          .aoh-mf-spin { animation: aoh-mf-turn 9s linear infinite; transform-origin: ${VX}px ${VY}px; }
          .aoh-mf-level { transition: transform 1100ms cubic-bezier(.2,.7,.3,1); }
          .aoh-mf-out { transition: d 900ms ease, stroke-opacity 600ms ease; }
          .aoh-mf-form { transform-box: fill-box; transform-origin: center; transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.7,.3,1); }
          .aoh-mf-fade { transition: opacity 600ms ease, stroke-width 600ms ease, stroke-opacity 600ms ease; }
          .aoh-mf-mark { opacity: 0; offset-distance: 100%; animation: aoh-mf-cross 1.8s ease-out both; }
          .aoh-mf-h { cursor: pointer; outline: none; }
          @keyframes aoh-mf-run { to { stroke-dashoffset: -26 } }
          @keyframes aoh-mf-swell { 0%,100% { opacity: .4 } 50% { opacity: 1 } }
          @keyframes aoh-mf-breathe { 0%,100% { stroke-opacity: .55 } 50% { stroke-opacity: 1 } }
          @keyframes aoh-mf-turn { to { transform: rotate(360deg) } }
          @keyframes aoh-mf-cross { 0% { offset-distance: 0%; opacity: 1 } 80% { opacity: 1 } 100% { offset-distance: 100%; opacity: 0 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-mf-flow, .aoh-mf-swell, .aoh-mf-breathe, .aoh-mf-spin, .aoh-mf-mark { animation: none }
            .aoh-mf-level, .aoh-mf-out, .aoh-mf-form, .aoh-mf-fade { transition: none }
          }
        `}</style>
        <svg viewBox="0 0 300 316" className="h-auto w-full" role="img" aria-labelledby="aoh-mf-t">
          <title id="aoh-mf-t">
            One circulation through one field. A current runs down a gradient from the field's edge,
            where a tide swells its receptivity; it is drawn into a vortex and fed into a reservoir
            whose level rises with each pass. When the level reaches the threshold a mark crosses it
            and a standing pattern precipitates beyond, and on the next pass the current bends to go
            round the form it made. Each pass deepens the main channel while a tributary fades. When
            the form lapses a dotted scar remains where it stood and the current keeps the bend; an
            older scar already bends the return path at the field's edge.
          </title>

          <defs>
            <linearGradient id="aoh-mf-grad" gradientUnits="userSpaceOnUse" x1="14" y1="58" x2="150" y2="118">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="aoh-mf-trib" gradientUnits="userSpaceOnUse" x1="45" y1="65" x2="210" y2="52">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
            <clipPath id="aoh-mf-basin">
              <path d={`${BASIN} Z`} />
            </clipPath>
          </defs>

          {/* the field */}
          <rect x="10" y="12" width="280" height="294" fill="none" stroke="var(--gold)"
                strokeOpacity="0.14" strokeWidth="0.8" />
          <text x="14" y="22" className="font-label" style={fs(6.5)} letterSpacing="1.4"
                fill="var(--gold-dim)" fillOpacity={sel ? 0.4 : 0.85}>FIELD</text>
          <text x="286" y="22" textAnchor="end" className="font-label" style={fs(7)} letterSpacing="1.4"
                fill="var(--gold)" fillOpacity={sel ? 0.4 : 0.95}>{`PASS · ${pad(pass)}`}</text>
          {lapsed && (
            <text x="286" y="32" textAnchor="end" className="font-label" style={fs(6.5)} letterSpacing="1.2"
                  fill="var(--bone)" fillOpacity={sel ? 0.3 : 0.7}>FORM LAPSED</text>
          )}

          {/* the return — form coming back as a new condition of the field */}
          <path className="aoh-mf-flow" d={RETURN} fill="none" stroke="var(--gold-dim)"
                strokeOpacity={sel ? 0.18 : 0.6} strokeWidth="0.9" />
          <text x="150" y="299" textAnchor="middle" className="font-label" style={fs(6.5)} letterSpacing="1.2"
                fill="var(--gold-dim)" fillOpacity={sel ? 0.35 : 0.85}>FORM RETURNS AS A NEW CONDITION</text>

          {/* gradient — the ground the current runs down */}
          <g opacity={dim("Gradient")} className="aoh-mf-h" onClick={() => toggle("Gradient")}
             role="button" tabIndex={0} aria-pressed={on("Gradient")} aria-label="Gradient"
             onKeyDown={keys("Gradient")}>
            <rect x="20" y="86" width="72" height="26" fill="transparent" />
            <path d={`${SLOPE} ${APPROACH}`} fill="none" stroke="url(#aoh-mf-grad)" strokeWidth="30"
                  style={{ pointerEvents: "stroke" }} />
            {TICKS.map((t, i) => (
              <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="var(--gold)"
                    strokeOpacity={on("Gradient") ? 0.7 : 0.3} strokeWidth="0.7" />
            ))}
            {label("Gradient", 24, 98, "start", ["GRADIENT"], "bias")}
          </g>

          {/* tide — the recurrent swell at the field's edge */}
          <g opacity={dim("Tide")} className="aoh-mf-h" onClick={() => toggle("Tide")}
             role="button" tabIndex={0} aria-pressed={on("Tide")} aria-label="Tide"
             onKeyDown={keys("Tide")}>
            <rect x="10" y="114" width="52" height="64" fill="transparent" />
            <g className="aoh-mf-swell">
              <path d="M12 140 q10 -8 20 0 t20 0 M12 154 q10 -8 20 0 t20 0 M12 168 q10 -8 20 0 t20 0"
                    fill="none" stroke="var(--gold)" strokeOpacity={on("Tide") ? 1 : 0.6} strokeWidth="1.1" />
            </g>
            {label("Tide", 24, 126, "start", ["TIDE"], null)}
          </g>

          {/* the channel: groove, tributary, spine */}
          <g opacity={dim("Current")} className="aoh-mf-h" onClick={() => toggle("Current")}
             role="button" tabIndex={0} aria-pressed={on("Current")} aria-label="Current"
             onKeyDown={keys("Current")}>
            <rect x="60" y="34" width="72" height="24" fill="transparent" />
            <path d={SPINE} fill="none" stroke="transparent" strokeWidth="14" />
            <path className="aoh-mf-fade" d={SPINE} fill="none" stroke="var(--gold)"
                  strokeOpacity={grooveO} strokeWidth={grooveW} strokeLinecap="round" />
            <path className="aoh-mf-flow aoh-mf-fade" d={TRIBUTARY} fill="none" stroke="url(#aoh-mf-trib)"
                  strokeWidth="0.8" opacity={tribO} />
            <path className="aoh-mf-flow aoh-mf-breathe aoh-mf-fade" d={SPINE} fill="none" stroke="var(--gold)"
                  strokeWidth={on("Current") ? mainW + 0.6 : mainW} />
            {/* the one drawn arrowhead: where the current enters the vortex */}
            <path d="M149.5 120.5 L154 124 L149.5 127.5" fill="none" stroke="var(--gold)" strokeOpacity="0.9"
                  strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" transform="rotate(22 154 124)" />
            {label("Current", 66, 44, "start", ["CURRENT"], "vector")}
          </g>

          {/* vortex — the spiral that recruits what passes */}
          <g opacity={dim("Vortex")} className="aoh-mf-h" onClick={() => toggle("Vortex")}
             role="button" tabIndex={0} aria-pressed={on("Vortex")} aria-label="Vortex"
             onKeyDown={keys("Vortex")}>
            <rect x="202" y="108" width="66" height="26" fill="transparent" />
            <circle cx={VX} cy={VY} r={VR - 3} fill="transparent" />
            <path className="aoh-mf-spin" d={SPIRAL} fill="none" stroke="var(--gold)"
                  strokeOpacity={on("Vortex") ? 1 : 0.6} strokeWidth={on("Vortex") ? 1.3 : 0.9} />
            {label("Vortex", 204, 122, "start", ["VORTEX"], "resonance")}
          </g>

          {/* reservoir — the basin whose level rises with each pass */}
          <g opacity={dim("Reservoir")} className="aoh-mf-h" onClick={() => toggle("Reservoir")}
             role="button" tabIndex={0} aria-pressed={on("Reservoir")} aria-label="Reservoir"
             onKeyDown={keys("Reservoir")}>
            <rect x="72" y="203" width="140" height="30" fill="transparent" />
            <rect x="140" y="176" width="72" height="56" fill="transparent" />
            <g clipPath="url(#aoh-mf-basin)">
              <rect className="aoh-mf-level" x="140" y={LIP} width="72" height={BASIN_FLOOR - LIP + 10}
                    fill="var(--gold)" fillOpacity={(on("Reservoir") ? 0.34 : 0.16) + 0.02 * depth}
                    style={{ transform: `translateY(${level - LIP}px)` }} />
            </g>
            <path d={BASIN} fill="none" stroke="var(--gold)" strokeOpacity={on("Reservoir") ? 1 : 0.55}
                  strokeWidth="1.1" strokeLinejoin="round" />
            {label("Reservoir", 138, 212, "end", ["RESERVOIR"], "recurrence")}
          </g>

          {/* threshold — the lip's height, drawn across the basin */}
          <g opacity={dim("Threshold")} className="aoh-mf-h" onClick={() => toggle("Threshold")}
             role="button" tabIndex={0} aria-pressed={on("Threshold")} aria-label="Threshold"
             onKeyDown={keys("Threshold")}>
            <rect x="38" y="178" width="66" height="24" fill="transparent" />
            <line x1="104" y1={LIP} x2="236" y2={LIP} stroke="transparent" strokeWidth="12" />
            <line x1="104" y1={LIP} x2="236" y2={LIP} stroke="var(--gold)"
                  strokeOpacity={on("Threshold") ? 1 : 0.55} strokeDasharray="3 3" strokeWidth="1" />
            {label("Threshold", 100, 188, "end", ["THRESHOLD"], "threshold")}
          </g>

          {/* the outflow: a dry channel until the level reaches the lip; then the current, and the mark that crosses */}
          <path className="aoh-mf-out" d={outD} style={{ d: `path("${outD}")` } as CSSProperties} fill="none"
                stroke="var(--gold)" strokeOpacity={crossed ? 0 : 0.35} strokeWidth="0.8" strokeDasharray="1.5 3.5"
                opacity={sel && sel !== "Threshold" && sel !== "Standing pattern" ? 0.16 : 1} />
          <path className="aoh-mf-flow aoh-mf-out aoh-mf-fade" d={outD} style={{ d: `path("${outD}")` } as CSSProperties}
                fill="none" stroke="var(--gold)" strokeOpacity={crossed ? 0.85 : 0} strokeWidth={Math.max(1, mainW - 0.3)}
                opacity={sel && sel !== "Threshold" && sel !== "Standing pattern" && !(sel === "Scar" && lapsed) ? 0.16 : 1} />
          {crossed && (
            <circle key={pass} className="aoh-mf-mark" r="2.4" fill="var(--bone)"
                    style={{ offsetPath: `path("${outD}")` }} />
          )}

          {/* standing pattern — the form beyond the threshold */}
          <g opacity={dim("Standing pattern")} className="aoh-mf-h" onClick={() => toggle("Standing pattern")}
             role="button" tabIndex={0} aria-pressed={on("Standing pattern")} aria-label="Standing pattern"
             onKeyDown={keys("Standing pattern")}>
            <rect x="160" y="250" width="72" height="34" fill="transparent" />
            <circle cx={SITE.x} cy={SITE.y} r={SITE.r + 7} fill="transparent" />
            <circle className="aoh-mf-form" cx={SITE.x} cy={SITE.y} r={SITE.r} fill="var(--void)"
                    stroke="var(--gold)" strokeOpacity={on("Standing pattern") ? 1 : 0.85}
                    strokeWidth={on("Standing pattern") ? 1.7 : 1.2}
                    style={{ opacity: formed ? 1 : 0, transform: formed ? "scale(1)" : "scale(0.2)" }} />
            <circle className="aoh-mf-form" cx={SITE.x} cy={SITE.y} r="2" fill="var(--gold)"
                    style={{ opacity: formed ? 0.9 : 0, transform: formed ? "scale(1)" : "scale(0.2)" }} />
            {label("Standing pattern", 228, 258, "end", ["STANDING", "PATTERN"], "form", formed ? 1 : 0.6)}
          </g>

          {/* scar — an older one the return already bends round; and, once the form lapses, a new one at its place */}
          <g opacity={dim("Scar")} className="aoh-mf-h" onClick={() => toggle("Scar")}
             role="button" tabIndex={0} aria-pressed={on("Scar")} aria-label="Scar"
             onKeyDown={keys("Scar")}>
            <rect x="10" y="224" width="86" height="26" fill="transparent" />
            <circle cx={OLD_SCAR.x} cy={OLD_SCAR.y} r={OLD_SCAR.r} fill="none" stroke="var(--bone)"
                    strokeOpacity={on("Scar") ? 0.9 : 0.45} strokeDasharray="1 3.5" strokeWidth="1.3" />
            {label("Scar", 44, 234, "start", ["SCAR"], "memory")}
          </g>
          {/* the new scar at the form's place: the Scar's second site once the form lapses.
              Kept outside the focusable group so the group's focus ring stays round the lettered scar. */}
          <circle className="aoh-mf-fade aoh-mf-h" cx={SITE.x} cy={SITE.y} r={SITE.r} fill="none" stroke="var(--bone)"
                  strokeOpacity={on("Scar") ? 0.95 : 0.6} strokeDasharray="1 4" strokeWidth="1.5"
                  opacity={lapsed ? dim("Scar") : 0} style={{ pointerEvents: lapsed ? "auto" : "none" }}
                  onClick={() => toggle("Scar")} aria-hidden="true" />

          {/* the chosen feature's stretch of the circulation */}
          {sel && (
            <g pointerEvents="none">
              {LIT[sel].map((d) => (
                <g key={d}>
                  <path d={d} fill="none" stroke="var(--gold)" strokeOpacity="0.18" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={d} fill="none" stroke="var(--gold)" strokeOpacity="1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              ))}
            </g>
          )}
        </svg>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button type="button" onClick={runPass} className={`${btn} ${btnOn}`}>
            Run another pass
          </button>
          <button type="button" onClick={lapse} disabled={!formed} aria-disabled={!formed}
                  className={`${btn} ${formed ? btnOff : "cursor-default border-border/60 text-muted-foreground/40"}`}>
            Let the form lapse
          </button>
        </div>
        <p className="mt-3 font-label text-[9px] uppercase leading-relaxed tracking-[0.15em] text-muted-foreground" aria-live="polite">
          {status}
        </p>
      </div>

      <div className="min-h-[14rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.k}{cur.stage ? ` · ${cur.stage}` : ""}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              A metaphysical model, not fluid mechanics. Whether the word is meant literally or
              analogically has to be stated each time it is used.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">{status}</p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Eight behaviours in one field, because Morphaithēr is closer to an ecosystem than to a
              fluid. An ecosystem is not one further organism standing beside its plants and animals
              — it is the living pattern of their relations, circulations, constraints, and
              dependencies.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Which is why this is not a sixth ether added above the Root Ether and the Fourfold
              Veil. <span className="text-bone/90">It is the changing atmosphere carried through
              them.</span>
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select any feature for what it names. Run another pass to deepen the channel; when a
              form stands, let it lapse and see what the field keeps.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">{status}</p>
          </>
        )}
      </div>
    </div>
  );
}
