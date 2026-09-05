import { useEffect, useRef, useState } from "react";
import { fs } from "./fig";

/**
 * PlanetaryFamily — one virtue recurring through unlike vessels.
 * Only the three planets this doctrine develops in full are given chains. The
 * other four carry their § XIII function and are marked as awaiting their
 * correspondences rather than being supplied with invented ones.
 *
 * The drawing: a single gold line — the virtue — descends through five
 * stacked bands, and at the edge of every vessel it enters it changes angle
 * and never breaks: every vessel curves the reflection. The vessels are drawn
 * each in its own nature (a disc with rays, a lattice, a plant, an organ, an
 * image), so the same line is seen translated five times; switching planet
 * re-shapes the vessels and re-bends the line while the line itself persists.
 * The foot gathers the five to ritual, the sixth term. Agrippa follows the
 * line down from the virtue; Paracelsus reads it back up from the signature.
 * The words the family shares are lettered once, at the head of the line: the
 * doctrine gives them to the family as a whole and assigns none to a level, so
 * none is dealt out to a band. A pending planet shows five empty dashed
 * vessels and no line at all.
 */

const W = 420; // viewBox width
const LX = 116; // where the virtue line runs
const TOPS = [62, 146, 230, 314, 398]; // band tops; the head above them holds the virtue and its family words
const BH = 76; // band height
const VY = 42; // vessel centre below the band top
const VR = 23; // half-height of a vessel: the line bends at VY ± VR
const END = 492; // where the line ends below the fifth band
const H = 584; // viewBox height
/** the least a label is lettered at: eight units is eight pixels where the
 *  figure is shown at its full width, and still seven on a 360 phone once
 *  aoh-fig-tight has raised it; stacked lines sit sixteen units apart so
 *  their boxes clear at that scale too */
const LABEL = 8.6;
const SMALL = 8;
const LEAD = 16;

/** horizontal offsets of the line at each vessel edge: entry of band 0, then
 *  the exit of each band (which is the entry of the next). Straight between
 *  vessels, slanted inside them — the bend is the vessel's translation. */
const BENDS = [
  [0, -8, 9, -6, 10, 2], // Sun
  [-3, 10, -9, 11, -10, -4], // Saturn
  [4, -10, 9, -12, 7, -8], // Mars
];

/** phone-length forms of the imaginal expressions that do not fit a band */
const SHORT: Record<string, string> = {
  "The circle · the crown · kingship": "The circle · the crown",
  "The sickle · the hourglass · enclosed places": "The sickle · the hourglass",
};

/** a word list as two lines joined by middle dots, broken where the longer
 *  of the two comes out shortest */
function balance(words: string[]): string[] {
  let best = [words.join(" · ")];
  let span = best[0].length;
  for (let k = 1; k < words.length; k++) {
    const a = words.slice(0, k).join(" · ");
    const b = words.slice(k).join(" · ");
    const m = Math.max(a.length, b.length);
    if (m < span) {
      span = m;
      best = [a, b];
    }
  }
  return best;
}

const rmq = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** eases a list of numbers toward a target over `ms`; instant under reduced motion */
function useTween(target: number[], ms: number) {
  const [cur, setCur] = useState(target);
  const ref = useRef(target);
  const key = target.join(",");
  useEffect(() => {
    const from = ref.current;
    const to = target;
    if (from.length === to.length && from.every((v, i) => v === to[i])) return;
    if (rmq()) {
      ref.current = to;
      setCur(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      const v = from.map((a, i) => a + (to[i] - a) * e);
      ref.current = v;
      setCur(v);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ms]);
  return cur;
}

const hex = (r: number, rot = -90) =>
  Array.from({ length: 6 }, (_, k) => {
    const a = ((rot + k * 60) * Math.PI) / 180;
    return [r * Math.cos(a), r * Math.sin(a)] as const;
  });
const pts = (p: readonly (readonly [number, number])[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const rays = (n: number, r0: number, r1: number, w?: number) =>
  Array.from({ length: n }, (_, k) => {
    const a = (k * 2 * Math.PI) / n - Math.PI / 2;
    return (
      <line
        key={k}
        x1={(r0 * Math.cos(a)).toFixed(1)}
        y1={(r0 * Math.sin(a)).toFixed(1)}
        x2={(r1 * Math.cos(a)).toFixed(1)}
        y2={(r1 * Math.sin(a)).toFixed(1)}
        strokeWidth={w}
      />
    );
  });

/** the vessel of one level for one planet, drawn about (0,0) inside ±22.
 *  kind 0–2 are Sun, Saturn, Mars; kind 3 is the empty vessel of a planet whose
 *  chain has not been set down. */
function vessel(level: number, kind: number) {
  if (kind === 3) {
    // an empty vessel, dashed: nothing has been poured into it
    return (
      <g strokeDasharray="3 3" strokeOpacity="0.85">
        <path d="M-17 -15 C-18 3 -12 16 0 19 C12 16 18 3 17 -15" />
        <path d="M-20 -15 H20" />
        <path d="M-7 19 V22 H7 V19" />
      </g>
    );
  }
  const H6 = hex(21);
  const I6 = hex(10.5);
  switch (level) {
    case 0: // celestial — a disc with rays
      if (kind === 0)
        return (
          <>
            <circle r="8.5" />
            {rays(12, 12.5, 21)}
          </>
        );
      if (kind === 1)
        return (
          <>
            <circle r="7" />
            {rays(8, 11, 16)}
            <circle r="21" strokeOpacity="0.6" />
          </>
        );
      return (
        <>
          <circle r="6" />
          {rays(8, 10, 22, 1.5)}
        </>
      );
    case 1: // mineral — a faceted lattice
      if (kind === 0)
        return (
          <>
            <polygon points={pts(H6)} />
            <polygon points={pts(I6)} />
            {H6.map((p, k) => (
              <line key={k} x1={p[0]} y1={p[1]} x2={I6[k][0]} y2={I6[k][1]} />
            ))}
          </>
        );
      if (kind === 1)
        return (
          <>
            <polygon points="-21,-9 -9,-19 13,-18 21,0 14,18 -12,18 -21,6" strokeWidth="1.5" />
            <path d="M-5 -4 L-21 -9 M-5 -4 L-9 -19 M-5 -4 L-21 6 M-5 -4 L-12 18 M-5 -4 L7 5 M7 5 L13 -18 M7 5 L21 0 M7 5 L14 18" />
          </>
        );
      return (
        <>
          <polygon points={pts(H6)} />
          <path d="M0 0 L18.2 -10.5 M0 0 L-18.2 -10.5 M0 0 L0 21" />
          <path
            d="M9.1 -15.8 L-9.1 -5.2 M-9.1 -15.8 L9.1 -5.2 M18.2 0 L0 10.5 M9.1 -5.2 L9.1 15.8 M-18.2 0 L0 10.5 M-9.1 -5.2 L-9.1 15.8"
            strokeOpacity="0.55"
          />
        </>
      );
    case 2: // living — leaf and root
      if (kind === 0)
        return (
          <g transform="rotate(-12)">
            <path d="M-15 9 H15" strokeOpacity="0.5" />
            <path d="M0 9 V-8" />
            <circle cx="0" cy="-14" r="5" />
            {Array.from({ length: 8 }, (_, k) => {
              const a = (k * Math.PI) / 4;
              return (
                <line
                  key={k}
                  x1={(6.5 * Math.cos(a)).toFixed(1)}
                  y1={(-14 + 6.5 * Math.sin(a)).toFixed(1)}
                  x2={(9 * Math.cos(a)).toFixed(1)}
                  y2={(-14 + 9 * Math.sin(a)).toFixed(1)}
                />
              );
            })}
            <path d="M0 -1 C-5 -1 -10 -5 -12 -11 C-6 -11 -2 -7 0 -1 Z" />
            <path d="M0 4 C5 4 10 0 12 -6 C6 -6 2 -2 0 4 Z" />
            <path d="M0 9 V17 M0 11 L-5 17 M0 12 L5 18" strokeOpacity="0.7" />
          </g>
        );
      if (kind === 1)
        return (
          <g transform="rotate(10)">
            <path d="M-15 -9 H15" strokeOpacity="0.5" />
            <path d="M0 -9 V-17 M0 -13 C-3 -14 -5 -16 -6 -19" strokeOpacity="0.7" />
            <path d="M0 -9 V19" strokeWidth="1.5" />
            <path d="M0 -3 C-4 1 -8 4 -13 11 M0 3 C4 6 8 9 13 15 M0 9 C-3 12 -5 15 -7 19" />
          </g>
        );
      return (
        <g transform="rotate(-14)">
          <path d="M-15 12 H15" strokeOpacity="0.5" />
          <path d="M0 12 V-19" strokeWidth="1.4" />
          <path d="M0 3 L-6 -1 M0 -3 L6 -7 M0 -9 L-6 -13 M0 -15 L5 -19" strokeWidth="1.4" />
          <path d="M0 12 L-4 18 M0 12 L4 18 M0 12 V18" strokeOpacity="0.7" />
        </g>
      );
    case 3: // bodily — heart, bone, muscle and blood
      if (kind === 0)
        return (
          <>
            <path d="M0 17 C-14 8 -21 0 -21 -8 C-21 -15 -15 -19 -9 -18 C-4 -17 -1 -14 0 -10 C1 -14 4 -17 9 -18 C15 -19 21 -15 21 -8 C21 0 14 8 0 17 Z" />
            <path d="M-12 -12 C-9 -14 -6 -14 -4 -12" strokeOpacity="0.55" />
          </>
        );
      if (kind === 1)
        return (
          <g transform="rotate(-35)">
            <path d="M-12 -3 H12 M-12 3 H12" />
            <circle cx="-14" cy="-4.5" r="4.5" />
            <circle cx="-14" cy="4.5" r="4.5" />
            <circle cx="14" cy="-4.5" r="4.5" />
            <circle cx="14" cy="4.5" r="4.5" />
          </g>
        );
      return (
        <>
          <path d="M-21 -2 C-13 -12 13 -12 21 -2 C13 8 -13 8 -21 -2 Z" />
          <path d="M-9 -8 V4 M0 -10 V6 M9 -8 V4" strokeOpacity="0.55" />
          <path d="M11 6 C8 10 7 13 8 15.5 A3.4 3.4 0 0 0 14.6 15.5 C15.6 13 14.4 10 11 6 Z" />
        </>
      );
    default: // imaginal — the image sign
      if (kind === 0)
        return (
          <>
            <path d="M-16 -3 V-16 L-8 -8 L0 -19 L8 -8 L16 -16 V-3 Z" />
            <circle cx="0" cy="9" r="8.5" />
          </>
        );
      if (kind === 1)
        return (
          <>
            <path d="M-3 -17 C-19 -17 -23 3 -9 8 L-5 18" />
            <path d="M-3 -17 C-13 -15 -16 -4 -9 2" strokeOpacity="0.55" />
            <path d="M6 -15 H20 M6 14 H20 M7 -15 L13 -1 L7 14 M19 -15 L13 -1 L19 14" />
          </>
        );
      return (
        <g transform="rotate(22)">
          <path d="M0 -21 L-3.5 -15 V6 H3.5 V-15 Z" />
          <path d="M0 -17 V4" strokeOpacity="0.5" />
          <path d="M-10 6 H10 M0 6 V17" />
          <circle cx="0" cy="19" r="2.2" />
        </g>
      );
  }
}

export function PlanetaryFamily() {
  const [sel, setSel] = useState(0);
  const [up, setUp] = useState(false);
  const fam = [
    {
      g: "☉", n: "Sun", virtue: "Centralization, vitality, illumination, radiance, authority — the organization of a system around a governing centre.",
      why: "centrality, radiance, incorruptibility, distribution, sovereign organization",
      chain: [
        ["Celestial", "The Sun", "the virtue at the celestial level"],
        ["Mineral", "Gold", "fixed into incorruptible mineral durability"],
        ["Living", "Solar plants", "embodied through living growth toward light"],
        ["Bodily", "The heart", "the centre a body organizes around and distributes from"],
        ["Imaginal", "The circle · the crown · kingship", "concentrated into an intelligible image"],
      ],
    },
    {
      g: "♄", n: "Saturn", virtue: "Contraction, boundary, duration, weight, consequence, age, crystallization — the preservation of form through limitation.",
      why: "density, endurance, restriction, severance, the slow work of time",
      chain: [
        ["Celestial", "Saturn", "the virtue at the celestial level"],
        ["Mineral", "Lead · stone", "density and weight made mineral"],
        ["Living", "Roots", "the downward, holding, slow-growing part"],
        ["Bodily", "The bones", "what endures, defines, and outlasts the soft"],
        ["Imaginal", "The sickle · the hourglass · enclosed places", "severance and measured time as image"],
      ],
    },
    {
      g: "♂", n: "Mars", virtue: "Heat, assertion, incision, division, conflict, protection — directed force.",
      why: "the capacity to cut, defend, inflame, penetrate, or act decisively",
      chain: [
        ["Celestial", "Mars", "the virtue at the celestial level"],
        ["Mineral", "Iron", "hardness that takes and holds an edge"],
        ["Living", "Thorns · pungent plants", "growth that defends and inflames"],
        ["Bodily", "Muscular exertion · blood", "the body's capacity for force and defence"],
        ["Imaginal", "Blades · martial symbols", "decisive division as image"],
      ],
    },
  ];
  const pending = [
    ["☾", "Moon", "reception, memory, habit, embodiment, fluctuation"],
    ["☿", "Mercury", "translation, mediation, communication, exchange"],
    ["♀", "Venus", "attraction, affinity, valuation, harmony, combination"],
    ["♃", "Jupiter", "expansion, authorization, synthesis, increase"],
  ];
  const isFam = sel < fam.length;
  const cur = isFam ? fam[sel] : null;
  const pend = isFam ? null : pending[sel - fam.length];
  const name = cur ? cur.n : pend![1];

  // the line keeps the last drawn planet's shape while a pending planet is
  // shown, so returning to a chain tweens from where the line was
  const lastFam = useRef(0);
  if (isFam) lastFam.current = sel;
  const xs = useTween(BENDS[isFam ? sel : lastFam.current].map((o) => LX + o), 300);

  // the words the family shares, lettered once at the head of the line in two
  // balanced lines: the section gives them to the whole family, not one to a level
  const whyLines = cur
    ? balance(cur.why.split(",").map((w) => w.trim().replace(/^or /, "").toUpperCase()))
    : [];

  const question = up
    ? "What hidden order is disclosed by this earthly thing?"
    : "What earthly things belong to this celestial order?";
  const method = up ? "Paracelsus · upward" : "Agrippa · downward";

  const x0 = xs[0];
  const x5 = xs[5];
  const linePath = [
    `M${x0.toFixed(1)} 8`,
    ...TOPS.map((t, i) => `V${t + VY - VR} L${xs[i + 1].toFixed(1)} ${t + VY + VR}`),
    `V${END}`,
  ].join(" ");
  const bendDots = TOPS.flatMap((t, i) => [
    [xs[i], t + VY - VR],
    [xs[i + 1], t + VY + VR],
  ]);

  const toggleBtn = (isUp: boolean, label: string) => (
    <button
      type="button"
      onClick={() => setUp(isUp)}
      aria-pressed={up === isUp}
      className={`border px-3 py-1.5 font-label text-[9px] uppercase tracking-[0.18em] transition-colors ${
        up === isUp ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40 hover:text-gold-dim"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {fam.map((f, i) => (
          <button
            key={f.n}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`flex items-baseline gap-3 border px-5 py-3 transition-colors ${
              sel === i ? "border-gold bg-clay/30 text-gold" : "border-border text-muted-foreground hover:border-gold/40"
            }`}
          >
            <span className="font-serif text-xl">{f.g}</span>
            <span className="font-label text-[10px] uppercase tracking-[0.25em]">{f.n}</span>
          </button>
        ))}
        {pending.map(([g, n], j) => {
          const i = fam.length + j;
          return (
            <button
              key={n}
              type="button"
              onClick={() => setSel(i)}
              aria-pressed={sel === i}
              aria-label={`${n}, awaiting its chain`}
              className={`flex items-baseline gap-3 border border-dashed px-4 py-3 transition-colors ${
                sel === i ? "border-gold bg-clay/30 text-gold" : "border-border/70 text-muted-foreground/80 hover:border-gold/40"
              }`}
            >
              <span className="font-serif text-xl">{g}</span>
              <span className="font-label text-[10px] uppercase tracking-[0.25em]">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Reading direction">
        <span className="mr-1 font-label text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Read the line</span>
        {toggleBtn(false, "Agrippa · downward")}
        {toggleBtn(true, "Paracelsus · upward")}
      </div>

      <style>{`
        .aoh-pf-row { animation: aoh-pf-in 620ms cubic-bezier(.16,1,.3,1) both; }
        @keyframes aoh-pf-in { from { opacity: 0; transform: translateY(9px) } to { opacity: 1; transform: none } }
        .aoh-pf-run { stroke-dasharray: 3 9; animation: aoh-pf-flow 2.6s linear infinite; }
        .aoh-pf-up .aoh-pf-run { animation-direction: reverse; }
        @keyframes aoh-pf-flow { to { stroke-dashoffset: -24 } }
        .aoh-pf-v { opacity: 0; transform: scale(.94); transition: opacity 300ms ease, transform 300ms ease; pointer-events: none; }
        .aoh-pf-v-on { opacity: 1; transform: none; }
        .aoh-pf-tin { animation: aoh-pf-fade 300ms ease both; }
        @keyframes aoh-pf-fade { from { opacity: 0 } to { opacity: 1 } }
        .aoh-pf-end { cursor: pointer; }
        .aoh-pf-foot { transition: opacity 300ms ease; }
        @media (prefers-reduced-motion: reduce) {
          .aoh-pf-row, .aoh-pf-run, .aoh-pf-tin { animation: none }
          .aoh-pf-v, .aoh-pf-foot { transition: none }
        }
      `}</style>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
        <div className="mx-auto w-full max-w-[420px]">
          <div className="aoh-fig aoh-fig-tight">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className={`h-auto w-full ${up ? "aoh-pf-up" : ""}`}
              role="img"
              aria-labelledby="aoh-pf-t"
            >
              <title id="aoh-pf-t">
                One formative virtue drawn as a single gold line descending through five stacked
                vessels — celestial, mineral, living, bodily, imaginal — and bent at the edge of
                each vessel it enters; the words the family shares are lettered once at the head
                of the line, the selected planet's expression is lettered in every band, and a
                bracket at the foot gathers the five to ritual, their deliberate convergence. A
                planet whose chain is not set down shows five empty dashed vessels and no line.
              </title>

              {/* a plate against the photograph behind the section */}
              <rect x="0" y="0" width={W} height={H} fill="var(--void)" fillOpacity="0.55" />

              {/* the five bands, each a level of existence */}
              {TOPS.map((t, i) => {
                const level = fam[0].chain[i][0].toUpperCase();
                const expr = cur ? cur.chain[i][1] : null;
                const short = expr ? SHORT[expr] : null;
                return (
                  <g key={level}>
                    <rect x="0" y={t} width={W} height={BH} fill="var(--void)" fillOpacity="0.5" stroke="var(--gold)" strokeOpacity="0.16" strokeWidth="0.8" />
                    <text x="14" y={t + 14} className="font-label" style={fs(9)} letterSpacing="1.3" fill="var(--gold-dim)">
                      {level}
                    </text>

                    {/* the vessels of this level, one per planet, crossfaded */}
                    <g transform={`translate(${LX} ${t + VY})`}>
                      {[0, 1, 2, 3].map((k) => {
                        const on = isFam ? sel === k : k === 3;
                        return (
                          <g
                            key={k}
                            className={`aoh-pf-v${on ? " aoh-pf-v-on" : ""}`}
                            fill="none"
                            stroke={k === 3 ? "var(--gold-dim)" : "var(--gold)"}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden={!on}
                          >
                            {vessel(i, k)}
                          </g>
                        );
                      })}
                    </g>

                    {/* the vessel's own expression, in the serif; a short form on phones */}
                    {expr ? (
                      <g key={`${name}-${i}`} className="aoh-pf-tin">
                        <path d={`M${LX + VR + 6} ${t + 47} h8 m-3 -3 l3 3 l-3 3`} fill="none" stroke="var(--gold)" strokeOpacity="0.7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        <text x="158" y={t + 51} className={`font-serif${short ? " hidden sm:block" : ""}`} style={fs(13.5)} fill="var(--bone)" fillOpacity="0.92">
                          {expr}
                        </text>
                        {short && (
                          <text x="158" y={t + 51} className="font-serif sm:hidden" style={fs(13.5)} fill="var(--bone)" fillOpacity="0.92">
                            {short}
                          </text>
                        )}
                      </g>
                    ) : (
                      <path d={`M158 ${t + 48} H214`} stroke="var(--gold-dim)" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 3" />
                    )}
                  </g>
                );
              })}

              {cur ? (
                <>
                  {/* the virtue: one continuous line, bent at every vessel's edge */}
                  <path d={linePath} fill="none" stroke="var(--void)" strokeOpacity="0.85" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
                  <path d={linePath} fill="none" stroke="var(--gold)" strokeOpacity="0.95" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
                  <path d={linePath} className="aoh-pf-run" fill="none" stroke="var(--bone)" strokeOpacity="0.9" strokeWidth="1.6" strokeLinecap="round" />
                  {bendDots.map(([x, y], k) => (
                    <circle key={k} cx={x.toFixed(1)} cy={y} r="1.7" fill="var(--gold)" />
                  ))}

                  {/* the words the family shares, once, under the virtue the line begins from */}
                  {whyLines.map((line, k) => (
                    <text
                      key={`${name}-w${k}`}
                      className="font-label aoh-pf-tin"
                      x={(x0 + 10).toFixed(1)}
                      y={38 + k * LEAD}
                      style={fs(SMALL)}
                      letterSpacing="1"
                      fill="var(--gold-dim)"
                    >
                      {line}
                    </text>
                  ))}

                  {/* the two ends: where the reading begins is the brighter */}
                  <g
                    className="aoh-pf-end"
                    role="button"
                    tabIndex={0}
                    aria-pressed={!up}
                    aria-label="Read from the virtue, downward — Agrippa"
                    onClick={() => setUp(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setUp(false);
                      }
                    }}
                  >
                    <rect x={(x0 - 14).toFixed(1)} y="-2" width="300" height="30" fill="transparent" />
                    {up && <path d={`M${(x0 - 4).toFixed(1)} 14 L${x0.toFixed(1)} 8 L${(x0 + 4).toFixed(1)} 14`} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                    <text x={(x0 + 10).toFixed(1)} y="18" className="font-label" style={fs(LABEL)} letterSpacing="1.4" fill={up ? "var(--gold-dim)" : "var(--gold)"}>
                      THE VIRTUE
                      <tspan style={fs(SMALL)} letterSpacing="1" fill="var(--gold-dim)" fillOpacity={up ? 0 : 1}>
                        {" · FOLLOWED DOWN FROM HERE"}
                      </tspan>
                    </text>
                  </g>
                  <g
                    className="aoh-pf-end"
                    role="button"
                    tabIndex={0}
                    aria-pressed={up}
                    aria-label="Read from the signature, upward — Paracelsus"
                    onClick={() => setUp(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setUp(true);
                      }
                    }}
                  >
                    <rect x={(x5 - 14).toFixed(1)} y={END - 14} width="300" height="30" fill="transparent" />
                    {!up && <path d={`M${(x5 - 4).toFixed(1)} ${END - 6} L${x5.toFixed(1)} ${END} L${(x5 + 4).toFixed(1)} ${END - 6}`} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                    <text x={(x5 + 10).toFixed(1)} y={END + 4} className="font-label" style={fs(LABEL)} letterSpacing="1.4" fill={up ? "var(--gold)" : "var(--gold-dim)"}>
                      THE SIGNATURE
                      <tspan style={fs(SMALL)} letterSpacing="1" fill="var(--gold-dim)" fillOpacity={up ? 1 : 0}>
                        {" · READ BACK UP FROM HERE"}
                      </tspan>
                    </text>
                  </g>
                </>
              ) : (
                <text x={LX - 14} y="18" className="font-label aoh-pf-tin" key={name} style={fs(LABEL)} letterSpacing="1.4" fill="var(--gold-dim)">
                  {name.toUpperCase()} · CHAIN NOT YET SET DOWN
                </text>
              )}

              {/* the foot: a bracket gathers the five to one point */}
              <g className="aoh-pf-foot" opacity={cur ? 1 : 0.4}>
                <path
                  d="M14 512 Q14 520 22 520 H200 Q210 520 210 530 Q210 520 220 520 H398 Q406 520 406 512"
                  fill="none"
                  stroke="var(--gold)"
                  strokeOpacity="0.8"
                  strokeWidth="1.1"
                  strokeDasharray={cur ? undefined : "3 3"}
                />
                <path d="M210 530 V538" stroke="var(--gold)" strokeOpacity="0.8" strokeWidth="1.1" />
                <circle cx="210" cy="542" r="3.4" fill="var(--gold)" fillOpacity={cur ? 1 : 0.6} />
                <text x="210" y="558" textAnchor="middle" className="font-label" style={fs(LABEL)} letterSpacing="1.8" fill="var(--gold)">
                  RITUAL
                </text>
                <text x="210" y={558 + LEAD} textAnchor="middle" className="font-label" style={fs(SMALL)} letterSpacing="1" fill="var(--gold-dim)">
                  THEIR DELIBERATE CONVERGENCE · THE SIXTH TERM
                </text>
              </g>
            </svg>
          </div>
          <p className="mt-3 font-label text-[9px] uppercase leading-relaxed tracking-[0.15em] text-muted-foreground">
            {cur
              ? up
                ? "Read back up from the signature · what descended, and what received it"
                : "Followed down from the virtue · each vessel bends it by its own nature"
              : "Nothing crosses · not yet set down, and left open rather than filled in"}
          </p>
        </div>

        <div>
          <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
            {method}
            {pend ? ` · ${pend[1]} · awaiting its chain` : ""}
          </p>
          <p key={question} className="aoh-pf-tin mt-2 font-serif text-lg italic text-gold/85">
            {question}
          </p>

          {cur ? (
            <>
              <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/90">
                {cur.virtue}
              </p>

              <div className="mt-6 space-y-px" key={`${cur.n}-${up}`}>
                {cur.chain.map(([level, expr, note], i) => (
                  <div
                    key={level}
                    style={{ animationDelay: `${((up ? cur.chain.length - 1 - i : i) * 70).toFixed(0)}ms` }}
                    className="aoh-pf-row grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-border py-4 sm:grid-cols-[7rem_minmax(0,16rem)_1fr] sm:gap-6"
                  >
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                      {level}
                    </span>
                    <span className={`font-serif text-lg ${i === 0 ? "text-gold" : "text-bone/90"}`}>
                      {expr}
                    </span>
                    <span className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1">
                      {note}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                These belong to one family through{" "}
                <span className="text-gold-dim">{cur.why}</span> — not because they are secretly the same
                object. Ritual is their deliberate convergence: the sixth term, gathering the others into
                one operation.
              </p>
            </>
          ) : (
            <>
              <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/90">
                {pend![2]}
              </p>
              <p className="mt-2 font-label text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                the celestial function, from § XIII
              </p>

              <div className="mt-6 space-y-px" key={name}>
                {fam[0].chain.map(([level], i) => (
                  <div
                    key={level}
                    style={{ animationDelay: `${(i * 70).toFixed(0)}ms` }}
                    className="aoh-pf-row grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-border py-4 sm:grid-cols-[7rem_minmax(0,16rem)_1fr] sm:gap-6"
                  >
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                      {level}
                    </span>
                    <span role="img" aria-label="not yet set down" className="inline-block w-14 self-center border-b border-dashed border-gold-dim/60" />
                    <span className="col-span-2 text-sm italic leading-relaxed text-muted-foreground/70 sm:col-span-1">
                      {i === 0 ? "not yet set down" : ""}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                § XIII gives {pend![1] === "Moon" ? "the Moon" : pend![1]} its celestial function.
                Its metal, plant, organ, and image are not yet set down, and are left open rather
                than filled in — so no line crosses these vessels, and nothing is drawn where the
                doctrine has drawn nothing.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Awaiting their chains
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pending.map(([g, n, f]) => (
            <div
              key={n}
              className={`border border-dashed p-4 transition-colors ${pend && pend[1] === n ? "border-gold/60" : "border-border/70"}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-lg italic text-bone/70">{n}</span>
                <span className="text-lg text-gold-dim">{g}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-[11px] leading-relaxed text-muted-foreground">
          Their celestial functions are given in § XIII. Their metals, plants, organs, and images
          are not yet set down, and are left open rather than filled in.
        </p>
      </div>
    </div>
  );
}

/**
 * ThreeNadis — Ida and Pingala crossing a central Sushumna.
 * The curves are generated so their zero-crossings land exactly on the nodes,
 * which is the whole point of the figure: the nodes are where the two polar
 * currents meet the axis, not decoration placed along it.
 */
