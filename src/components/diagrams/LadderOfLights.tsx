import { useState } from "react";

/**
 * LadderOfLights — Suhrawardī's hierarchy, with its two directions of traffic.
 *
 * In the philosophy of illumination the lights do not differ in kind, only in
 * intensity, and the whole order is held by two motions: domination descending,
 * as each light illuminates the one below; longing ascending, as each lower
 * light is drawn to the one above. Bodies are the isthmuses at the bottom —
 * dark in themselves, and visible only by what falls on them.
 *
 * The bands are drawn at descending brightness because that is the claim: one
 * light, thinning. The arrows are drawn as the subject because a ladder with no
 * traffic on it is a filing system, not an architecture.
 */
export function LadderOfLights() {
  const [sel, setSel] = useState<number | null>(null);

  const TIERS = [
    {
      k: "The Light of Lights",
      ar: "Nūr al-anwār",
      d: "The one light not lit by another. Not the brightest member of a series but the reason there is a series: every lower light is a lesser intensity of this one, not a different kind of thing.",
      knows: "Present to itself entirely — for to be light, in this philosophy, is to be manifest to oneself with nothing withheld.",
    },
    {
      k: "The dominating lights",
      ar: "Anwār qāhira",
      d: "Incorporeal lights that rule by illumination rather than by contact — the vertical order generating what is beneath it, the horizontal order standing as lords of the species, one for each kind of thing that recurs.",
      knows: "Each knows itself directly, and knows what is below it by lighting it. Their knowledge is their shining.",
    },
    {
      k: "The managing lights",
      ar: "Anwār mudabbira",
      d: "Souls: lights that have taken on a body to steward, and are both diminished and instructed by it. A managing light is where the hierarchy becomes someone in particular.",
      knows: "Knows itself by presence, without image or inference — and knows everything else by what its light reaches. Its errors begin where it takes the lit thing for the light.",
    },
    {
      k: "The isthmuses",
      ar: "Barzakh",
      d: "Bodies. Dark in themselves, visible only by the light that falls on them. Not evil, and not illusion: an isthmus is what a light must stand on to be somewhere rather than everywhere.",
      knows: "Knows nothing. It is known — and its whole dignity is in being able to be lit.",
    },
  ];

  const X0 = 44, W = 252, H = 54, GAP = 16, Y0 = 22;
  const yOf = (i: number) => Y0 + i * (H + GAP);
  const FILL = [0.26, 0.15, 0.08, 0.02];
  const on = (i: number) => sel === i;
  const toggle = (i: number) => setSel(on(i) ? null : i);
  const cur = sel !== null ? TIERS[sel] : null;
  const top = yOf(0) + 8, bottom = yOf(3) + H - 8;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <svg viewBox="0 0 340 318" className="h-auto w-full" role="img" aria-labelledby="aoh-ll-t">
          <title id="aoh-ll-t">
            Four horizontal bands descending in brightness — the Light of Lights, the dominating
            lights, the managing lights, and the isthmuses — with illumination arrowed downward on
            the left and longing arrowed upward on the right.
          </title>
          <defs>
            <marker id="aoh-ll-down" viewBox="0 0 8 8" refX="4" refY="7" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L4 7 L8 0" fill="none" stroke="var(--gold)" strokeWidth="1" />
            </marker>
            <marker id="aoh-ll-up" viewBox="0 0 8 8" refX="4" refY="1" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 8 L4 1 L8 8" fill="none" stroke="var(--bone)" strokeWidth="1" />
            </marker>
          </defs>

          {TIERS.map((t, i) => (
            <g key={t.ar} style={{ cursor: "pointer" }} onClick={() => toggle(i)}
               role="button" tabIndex={0} aria-pressed={on(i)} aria-label={t.k}
               onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } }}>
              <rect x={X0} y={yOf(i)} width={W} height={H}
                    fill={i === 3 ? "var(--bone)" : "var(--gold)"} fillOpacity={on(i) ? FILL[i] + 0.08 : FILL[i]}
                    stroke={i === 3 ? "var(--bone)" : "var(--gold)"}
                    strokeOpacity={on(i) ? 1 : sel !== null ? 0.2 : 0.5}
                    strokeDasharray={i === 3 ? "2 4" : undefined} strokeWidth={on(i) ? 1.6 : 1} />
              <text x={X0 + 14} y={yOf(i) + 22} className="font-label" fontSize="7.4" letterSpacing="1.2"
                    fill={on(i) ? "var(--gold)" : "var(--muted-foreground)"}
                    opacity={sel !== null && !on(i) ? 0.35 : 1}>{t.ar.toUpperCase()}</text>
              <text x={X0 + 14} y={yOf(i) + 41} fontFamily="EB Garamond, serif" fontSize="12.5" fontStyle="italic"
                    fill={on(i) ? "var(--bone)" : "var(--bone)"} opacity={sel !== null && !on(i) ? 0.35 : 0.9}>{t.k}</text>
            </g>
          ))}

          {/* illumination descends */}
          <line x1="22" y1={top} x2="22" y2={bottom} stroke="var(--gold)" strokeOpacity="0.7" strokeWidth="1" markerEnd="url(#aoh-ll-down)" />
          <text transform={`translate(12 ${(top + bottom) / 2}) rotate(-90)`} textAnchor="middle" className="font-label"
                fontSize="6.4" letterSpacing="1.2" fill="var(--gold-dim)">ISHRĀQ · ILLUMINATION</text>

          {/* longing ascends */}
          <line x1="318" y1={bottom} x2="318" y2={top} stroke="var(--bone)" strokeOpacity="0.5" strokeWidth="1"
                strokeDasharray="3 3" markerEnd="url(#aoh-ll-up)" />
          <text transform={`translate(330 ${(top + bottom) / 2}) rotate(90)`} textAnchor="middle" className="font-label"
                fontSize="6.4" letterSpacing="1.2" fill="var(--bone)" opacity="0.6">SHAWQ · LONGING</text>

          <text x="170" y="310" textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            ONE LIGHT, THINNING — NOT FOUR KINDS OF THING
          </text>
        </svg>
      </div>

      <div className="min-h-[14rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.ar} · {cur.k}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-5 border-l-2 border-bone/30 pl-4 text-sm leading-relaxed text-bone/75">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-bone/60">How it knows · </span>
              {cur.knows}
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Two motions hold the whole order. Downward, domination: each light illuminates the
              one beneath it, and rules it by doing so. Upward, longing: each lower light loves the
              one above and is drawn toward it. Neither motion is optional — a light that did not
              give would not be light, and a light that did not long would not be lower.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              Illumination descends. Longing ascends. The ladder is the two of them, held taut.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select a tier to see what it is, and how it knows.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
