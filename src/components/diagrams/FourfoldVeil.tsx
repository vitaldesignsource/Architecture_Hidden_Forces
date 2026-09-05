import { useEffect, useState } from "react";
import { fs } from "./fig";

/**
 * FourfoldVeil — the four ethers drawn as nested membranes rather than floors,
 * and the passage through them drawn as what the section says it costs.
 *
 * The section's explicit correction is against the stacked image: Warmth
 * contains Light, Light contains Tone, Tone contains Life, Life meets dense
 * form. Concentric rings state that containment in a way a ladder cannot.
 *
 * One channel crosses every membrane. Descending, it enters wide and faint and
 * at each ring it steps narrower and brighter: the width it sheds stops dead at
 * that ring's line — some possibilities selected, the rest excluded — until a
 * thin, definite line reaches CHON. Ascending, a thin bone line leaves CHON and
 * widens at each membrane outward, a material event becoming living response,
 * sensation, image and memory. With the error on, a small displacement at the
 * Warmth line is enlarged at Light, bound into the band's edge at Tone, carried
 * whole through Life, and arrives at CHON as a definite offset; run the other
 * way, the displacement shrinks ring by ring — the correction is what gets
 * transmitted. The Veil carries both degradation and learning.
 *
 * Every embodied act involves all four simultaneously, so nothing here is ever
 * drawn switched off; selecting a ring only brings its own functions forward.
 */

const C = 170;
const R = [148, 116, 84, 52];
const R0 = 26; // CHON
const TOP = -20; // where the band enters the frame
const END = C - 12; // where the thin line ends inside CHON
const LINES = [C - R[0], C - R[1], C - R[2], C - R[3], C - R0]; // 22 54 86 118 144
const YS = [TOP, ...LINES, END];

type Span = { y0: number; y1: number; h: number; b: number; c: number; o: number };

/**
 * The band, one span per region it crosses: outside, the four membranes, and
 * the inside of CHON. `h` is the half-width, `b` where the band's own centre
 * sits, `c` where the pattern's line runs inside it, `o` the fill.
 *
 * Descending, each membrane receives at its outer line and narrows there.
 * Ascending, each receives at its inner line and widens there — so the two
 * staircases are one ring apart, as a passage read from either end must be.
 * With the error on, the pattern's line leaves centre first (Warmth), further
 * (Light), and at Tone the band itself moves to it: the error now belongs.
 */
function spans(descending: boolean, err: boolean): Span[] {
  const h = descending ? [20, 13, 8, 4.5, 2, 2] : [20, 20, 13, 8, 4.5, 2];
  const o = descending ? [0.12, 0.18, 0.28, 0.45, 0.85, 0.85] : [0.16, 0.18, 0.25, 0.38, 0.6, 0.9];
  const b = !err ? [0, 0, 0, 0, 0, 0] : descending ? [0, 0, 3.5, 7, 7, 7] : [0, 0, 1.5, 3.5, 5, 7];
  const c = !err ? b : descending ? [0, 2, 5.5, 7, 7, 7] : b;
  return h.map((hh, i) => ({ y0: YS[i], y1: YS[i + 1], h: hh, b: b[i], c: c[i], o: o[i] }));
}

/** the lines inside the band: the pattern's own at 0, and the range around it */
const OFFS = [-17, -12, -7, -3.5, 3.5, 7, 12, 17];

/**
 * A line at offset `o` is drawn only through the spans wide enough to hold it,
 * so descending it stops dead at the ring that excludes it and ascending it
 * begins at the ring that admits it. Where the band's centre moves between two
 * spans the line jogs across the ring line rather than breaking.
 */
function runs(sp: Span[], o: number, centre: boolean): string[] {
  const x = (s: Span) => C + (centre ? s.c : s.b) + o;
  const inside = (s: Span) => centre || Math.abs(o) < s.h - 0.8;
  const out: string[] = [];
  let d = "";
  let prev: Span | null = null;
  for (const s of sp) {
    if (!inside(s)) {
      if (d) out.push(d);
      d = "";
      prev = null;
      continue;
    }
    if (!prev) d = `M${x(s)} ${s.y0}`;
    else if (x(prev) !== x(s)) d += ` L${x(prev)} ${s.y0 - 1.5} L${x(s)} ${s.y0 + 1.5}`;
    d += ` L${x(s)} ${s.y1}`;
    prev = s;
  }
  if (d) out.push(d);
  return out;
}

const ETHERS = [
  {
    k: "Warmth", gk: "Θερμότης", r: 148, verb: "quickens",
    q: "What awakens the pattern into activity?",
    sub: "The membrane of activation",
    d: "The first asymmetry of formation. Before anything can change, something must become active — and across that difference, movement becomes possible. Psychically it is attention, which does not merely observe but feeds the pattern it rests upon.",
    pol: ["Radiation — expression, excitation, outward activation", "Reception — sensation, attraction, inward registration"],
    fails: ["Dormancy", "Fever", "Overstimulation", "Numbness", "Uncontrolled emotional contagion", "Amplification beyond what the vessel can contain"],
    note: "Which is why ritual flame, colour, sound, rhythm and breath are not decoration. They regulate activation. A pattern without warmth stays dormant; warmth without a pattern becomes agitation; a false pattern given great warmth becomes obsession, panic, or collective possession.",
  },
  {
    k: "Light", gk: "Φῶς", r: 116, verb: "articulates",
    q: "How is the pattern differentiated and made perceptible?",
    sub: "The membrane of articulation",
    d: "Activation opens possibility; articulation gives it direction. What was a stirring acquires edges, orientation, and the distinctions by which it can be recognised rather than merely undergone.",
    pol: ["Disclosure — what becomes visible, oriented, distinguishable", "Registration — sensation, perception, the inward account taken"],
    fails: ["Sensory distortion", "Perception dissociated from embodiment", "Analogy mistaken for kinship", "An image without force, become empty symbolism", "Illumination that overwhelms rather than reveals"],
    note: "Discernment is most necessary here, at the higher part of the Veil rather than the lower — because projection, fantasy, inherited conditioning and genuine perception all arrive through the same medium and wear the same clothes.",
  },
  {
    k: "Tone", gk: "Τόνος", r: 84, verb: "relates",
    q: "By what affinity are parts selected, bound, and ordered into a whole?",
    sub: "The membrane of affinity",
    d: "Ordered relation — ratio, interval, sequence, proportion. The power by which separate parts are coordinated into something meaning more than their sum, and by which a form selects what belongs to it and refuses what does not.",
    pol: ["Incorporation — attraction, assimilation, binding, fixation", "Release — separation, elimination, return to circulation"],
    fails: ["Accumulation", "Indiscriminate assimilation", "Inability to release", "Rigid fixation", "Rejection of necessary material", "Material support continued for a form whose purpose has ended"],
    note: "Assimilation and release are equally necessary. A form that cannot assimilate cannot build itself; a form that cannot release becomes saturated with its own residue — the mind that will not let an obsolete impression go, the tradition that will not relinquish an exhausted office, the rite never deconsecrated.",
  },
  {
    k: "Life", gk: "Ζωή", r: 52, verb: "integrates",
    q: "How does the activity become self-renewing organisation?",
    sub: "The membrane of integration",
    d: "The principle by which activity becomes recursive — nourishing, repairing, reproducing, continuing itself. A flame is active without being alive; an organism uses its activity to preserve the conditions of its own continuation.",
    pol: ["Generation — producing, gestating, repairing, organising", "Transmission — carrying continuity outward through reproduction, teaching, inheritance"],
    fails: ["Uncontrolled growth", "Depletion", "Failure of repair", "Developmental arrest", "Parasitic reproduction", "Life-process preserved without telos"],
    note: "It holds memory as developmental tendency rather than as image. A seed contains no miniature tree — it contains an organised capacity to generate one. Which is why a tradition or institution shows a life function once it begins recruiting, reproducing, repairing, and generating successors.",
  },
];

/** the section's five steps, an error acquiring a body on the way down */
const STEPS_DOWN: [string, string][] = [
  ["A pattern is quickened before it has been rightly understood", "Warmth"],
  ["Articulation exaggerates one feature and leaves the rest unlit", "Light"],
  ["The exaggeration is bound into the ordering, and now belongs", "Tone"],
  ["Living reproduction transmits the whole arrangement, distortion included", "Life"],
  ["Material institutions fix it, and tradition passes on the structure as though it were the pattern", "Beyond the Veil"],
];

/** the same movement run the other way: the correction is what gets transmitted */
const STEPS_UP: [string, string][] = [
  ["Material failure exposes a weakness in a living process", "Beyond the Veil"],
  ["The organism adapts", "Life"],
  ["New perception revises what is understood", "Light"],
  ["The correction is what gets transmitted", "Warmth"],
];

/** which spans of the band, and which ring line, each step lights */
const LIT_DOWN: { sp: number[]; ring: number | "chon" }[] = [
  { sp: [1], ring: 0 }, { sp: [2], ring: 1 }, { sp: [3], ring: 2 }, { sp: [4], ring: 3 }, { sp: [5], ring: "chon" },
];
const LIT_UP: { sp: number[]; ring: number | "chon" }[] = [
  { sp: [5], ring: "chon" }, { sp: [4], ring: 3 }, { sp: [3, 2], ring: 1 }, { sp: [1, 0], ring: 0 },
];

export function FourfoldVeil() {
  const [sel, setSel] = useState<string | null>(null);
  const [dir, setDir] = useState<"descending" | "ascending">("descending");
  const [err, setErr] = useState(false);
  const [step, setStep] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  const cur = ETHERS.find((e) => e.k === sel);
  const descending = dir === "descending";
  const col = descending ? "var(--gold)" : "var(--bone)";
  const sp = spans(descending, err);
  const steps = descending ? STEPS_DOWN : STEPS_UP;
  const lit = step === null ? null : (descending ? LIT_DOWN : LIT_UP)[step];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  // the band's passage, one membrane at a time, lights the matching row of
  // the panel; under reduced motion every row simply stands lit
  useEffect(() => {
    if (!err || reduced) {
      setStep(null);
      return;
    }
    setStep(0);
    const n = descending ? STEPS_DOWN.length : STEPS_UP.length;
    const id = window.setInterval(() => setStep((s) => ((s ?? 0) + 1) % n), 1100);
    return () => window.clearInterval(id);
  }, [err, reduced, descending]);

  const btn = (on: boolean) =>
    `border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.12em] transition-colors ${
      on ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/60"}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[360px]">
        <style>{`
          .aoh-fv-ch { stroke-dasharray: 5 9; animation: aoh-fv-run 3.6s linear infinite; }
          .aoh-fv-up .aoh-fv-ch { animation-direction: reverse; }
          @keyframes aoh-fv-run { to { stroke-dashoffset: -28 } }
          .aoh-fv-r { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-fv-ch { animation: none } }
        `}</style>
        <svg viewBox="0 -20 340 376" className={`h-auto w-full ${descending ? "" : "aoh-fv-up"}`}
             role="img" aria-labelledby="aoh-fv-t">
          <title id="aoh-fv-t">
            Four nested rings — Warmth enclosing Light, enclosing Tone, enclosing Life, enclosing
            CHON at the centre — crossed by one band. Descending, it enters wide and faint and at
            each ring steps narrower and brighter, the width it sheds stopping dead at that
            ring's line, until a thin definite line reaches CHON. Ascending, a thin bone line
            leaves CHON and widens at each membrane outward. With an error near the top switched
            on, a small displacement at the Warmth line grows ring by ring on the way down and
            shrinks ring by ring on the way up.
          </title>
          <defs>
            {ETHERS.map((e, i) => {
              const rr = e.r + 3;
              return <path key={e.k} id={`aoh-fv-arc-${i}`} d={`M${C - rr} ${C} A${rr} ${rr} 0 0 1 ${C + rr} ${C}`} />;
            })}
            <linearGradient id="aoh-fv-sh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: col }} stopOpacity="0.85" />
              <stop offset="1" style={{ stopColor: col }} stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="aoh-fv-fadeg" x1="0" y1={TOP} x2="0" y2="6" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#000" />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <mask id="aoh-fv-fade" maskUnits="userSpaceOnUse" x="0" y={TOP} width="340" height="380">
              <rect x="0" y={TOP} width="340" height="380" fill="url(#aoh-fv-fadeg)" />
            </mask>
          </defs>

          {ETHERS.map((e, i) => {
            const on = sel === e.k;
            return (
              <g key={e.k} className="aoh-fv-r" onClick={() => setSel(on ? null : e.k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={`${e.k}, ${e.sub.toLowerCase()}`}
                 onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : e.k); } }}>
                <circle cx={C} cy={C} r={e.r} fill="var(--gold)"
                        fillOpacity={on ? 0.05 : 0.018} stroke="var(--gold)"
                        strokeOpacity={on ? 1 : sel ? 0.22 : 0.45}
                        strokeWidth={on ? 1.8 : 1} />
                {/* the name on the ring's shoulder, clear of the channel */}
                <text className="font-label" style={fs(7.4)} letterSpacing="1.3" textAnchor="middle"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      fillOpacity={on ? 1 : sel ? 0.55 : 0.9}>
                  <textPath href={`#aoh-fv-arc-${i}`} startOffset="24%">{e.k.toUpperCase()}</textPath>
                </text>
              </g>
            );
          })}

          {/* dense form: what the innermost membrane meets */}
          <circle cx={C} cy={C} r={R0} fill="var(--void)" stroke="var(--bone)"
                  strokeOpacity={lit?.ring === "chon" ? 0.85 : 0.5} strokeWidth={lit?.ring === "chon" ? 1.4 : 1.1} />
          <text x={C} y={C - 1} textAnchor="middle" className="font-label" style={fs(7.2)}
                letterSpacing="0.8" fill="var(--bone)" fillOpacity="0.85">CHON</text>
          <text x={C} y={C + 8} textAnchor="middle" className="font-label" style={fs(7)}
                letterSpacing="0.5" fill="var(--bone)" fillOpacity="0.85">MATTER</text>

          {/* the channel — one passage crossing every membrane, paying at each */}
          <g mask="url(#aoh-fv-fade)" pointerEvents="none">
            {sp.map((s, i) => {
              const nxt = sp[i + 1];
              const lo = nxt ? nxt.b - nxt.h : s.b - s.h;
              const hi = nxt ? nxt.b + nxt.h : s.b + s.h;
              const on = lit?.sp.includes(i);
              const strips = nxt
                ? [[s.b - s.h, lo], [hi, s.b + s.h]].filter(([a, z]) => z - a > 0.4)
                : [];
              return (
                <g key={i}>
                  {/* what passes the next line */}
                  <rect x={C + lo} y={s.y0} width={hi - lo} height={s.y1 - s.y0}
                        fill={col} fillOpacity={on ? Math.min(1, s.o + 0.18) : s.o} />
                  {/* what is shed at it — or, ascending, gained from it */}
                  {strips.map(([a, z], j) => {
                    // the wedge keeps its inner edge on the band that passes and
                    // draws its outer edge in toward the line that cuts it
                    const left = a < lo;
                    const t = 0.35 * (z - a);
                    const a1 = left ? a + t : a;
                    const z1 = left ? z : z - t;
                    return (
                      <g key={j}>
                        <polygon points={`${C + a},${s.y0} ${C + z},${s.y0} ${C + z1},${s.y1} ${C + a1},${s.y1}`}
                                 fill="url(#aoh-fv-sh)" fillOpacity={s.o * 0.9} />
                        {descending && (
                          <line x1={C + a1} y1={s.y1} x2={C + z1} y2={s.y1}
                                stroke={col} strokeOpacity="0.85" strokeWidth="1.4" />
                        )}
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* the range: lines the band still holds, stopping — or beginning — at a ring */}
            {OFFS.flatMap((o) =>
              runs(sp, o, false).map((d, j) => (
                <path key={`${o}-${j}`} d={d} className="aoh-fv-ch" fill="none"
                      stroke={col} strokeOpacity="0.38" strokeWidth="0.8" />
              )),
            )}
            {/* where the pattern would have run, when it runs elsewhere */}
            {err && (
              <line x1={C} y1={LINES[0]} x2={C} y2={END} stroke={col} strokeOpacity="0.3"
                    strokeWidth="0.8" strokeDasharray="1.5 3.5" />
            )}
            {/* the pattern's own line */}
            {runs(sp, 0, true).map((d, j) => (
              <path key={j} d={d} className="aoh-fv-ch" fill="none"
                    stroke={col} strokeOpacity="0.9" strokeWidth="1.4" />
            ))}
            {lit && lit.sp.map((i) => (
              <line key={i} x1={C + sp[i].c} y1={sp[i].y0} x2={C + sp[i].c} y2={sp[i].y1}
                    stroke={col} strokeOpacity="0.95" strokeWidth="2.2" />
            ))}
            {/* where it ends inside matter */}
            <circle cx={C + sp[5].c} cy={END} r="1.8" fill={col} fillOpacity="0.95" />
          </g>
          {typeof lit?.ring === "number" && (
            <circle cx={C} cy={C} r={R[lit.ring]} fill="none" stroke={col}
                    strokeOpacity="0.5" strokeWidth="1.3" pointerEvents="none" />
          )}

          <text x={C + 26} y="2" className="font-label" style={fs(6.6)} letterSpacing="1.1"
                fill="var(--muted-foreground)" fillOpacity="0.85">
            {descending ? "A LATENT PATTERN" : "IMAGE AND MEMORY"}
          </text>

          <text x={C} y="340" textAnchor="middle" className="font-label hidden sm:block" style={fs(6.8)}
                letterSpacing="1.1" fill="var(--muted-foreground)" fillOpacity="0.85">
            NESTED, NOT STACKED — NOT A LADDER BUT A RESPIRATION
          </text>
          <text x={C} y="334" textAnchor="middle" className="font-label sm:hidden" style={fs(6.8)}
                letterSpacing="1.1" fill="var(--muted-foreground)" fillOpacity="0.85">
            <tspan x={C} dy="0">NESTED, NOT STACKED —</tspan>
            <tspan x={C} dy="12">NOT A LADDER BUT A RESPIRATION</tspan>
          </text>
        </svg>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {(["descending", "ascending"] as const).map((d) => (
            <button key={d} onClick={() => setDir(d)} aria-pressed={dir === d} className={btn(dir === d)}>
              {d}
            </button>
          ))}
          <button onClick={() => setErr((v) => !v)} aria-pressed={err} className={btn(err)}>
            An error near the top
          </button>
        </div>
      </div>

      <div className="min-h-[19rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.gk} · {cur.verb} · {cur.sub}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/85">{cur.q}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {cur.pol.map((p) => (
                <p key={p} className="border-l border-gold/40 pl-4 text-sm leading-relaxed text-bone/70">{p}</p>
              ))}
            </div>

            <p className="mt-6 font-label text-[10px] uppercase tracking-[0.2em] text-bone/60">
              How it fails
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {cur.fails.join(" · ")}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-bone/60">{cur.note}</p>
          </>
        ) : err ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {descending ? "An error near the top — descending" : "The correction — ascending"}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/85">
              {descending
                ? "Because each membrane hands its work to the next, a small error near the top acquires a body on the way down."
                : "The movement runs the other way too — and the correction is what gets transmitted."}
            </p>
            <div className="mt-6 space-y-px" aria-live="off">
              {steps.map(([text, layer], i) => {
                const on = step === null || step === i;
                return (
                  <div key={layer}
                       className={`grid grid-cols-[1fr_7rem] items-baseline gap-4 border-b border-border py-2.5 transition-opacity duration-300 ${on ? "opacity-100" : "opacity-40"}`}>
                    <span className={`text-sm leading-relaxed ${on ? "text-bone/85" : "text-muted-foreground"}`}>{text}</span>
                    <span className={`font-label text-[10px] uppercase tracking-[0.12em] ${on ? (descending ? "text-gold" : "text-bone/80") : "text-gold-dim"}`}>{layer}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {descending
                ? "In the drawing the pattern's line leaves centre by a little at the Warmth line and by more at Light; at Tone the band itself moves to it, and the displacement now belongs to the ordering; Life carries it whole; and it reaches CHON off centre — a definite offset where there was a pattern. Limitation is the price of actuality. Distortion begins only where the loss grows severe enough to replace the original telos."
                : "The line leaves CHON off centre — a material failure — and at each membrane it crosses upward the displacement shrinks: the living process adapts, perception revises what is understood, and what reaches Warmth is the correction. The Veil carries both degradation and learning, which is the whole reason § IV insists it is a circuit and not a descent."}
            </p>
          </>
        ) : (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {descending ? "Descending — manifestation" : "Ascending — experience"}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/85">
              {descending
                ? "Activation → articulation → affinity → integration → living matter"
                : "Material event → living response → perception → renewed activation"}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {descending
                ? "A latent pattern is quickened into movement, given edges and direction, ordered by affinity into a coherent whole, and finally integrated into something that maintains and renews itself in matter."
                : "A material event alters the body. The organism responds. Sensation communicates the change. The event becomes image and memory — and that memory alters what the next warmth will quicken."}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {descending
                ? "The band enters wide and faint. Each membrane receives it, translates it into terms available below, and loses part of the original: the band steps narrower and brighter, and the width it sheds stops dead at that ring's line. What reaches CHON is a thin, definite line — limitation is the price of actuality."
                : "A thin line leaves CHON and widens at each membrane outward, gaining range with every crossing — the same passage read from the other end, in the colour of what the body reports rather than what the pattern intends."}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Which is why this is not a one-way ladder but{" "}
              <span className="text-bone/90">a respiratory system of manifestation</span> — and why
              they are drawn enclosing one another rather than stacked. Every embodied act involves
              all four at once. Eating is material incorporation, biological organisation, sensory
              perception, memory, expectation, and meaning, indivisibly.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select a membrane for its governing question, its polarity, and the ways it fails.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
