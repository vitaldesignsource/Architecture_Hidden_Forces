import { useState } from "react";

/**
 * EthericTideScales — the same alternation at five wavelengths.
 *
 * The section's claim is that vitality is rhythmic rather than quantitative: the
 * etheric body behaves less like a battery than a tidal ecology, and the same
 * polarity of gathering and spending recurs from a single breath up to a whole
 * life. Drawing them as five waves over one axis says that better than a list,
 * because the shared shape is the argument — no phase is healthy in isolation,
 * and none of them is a different kind of thing from the others.
 *
 * Wavelength is deliberately not to scale. The point is nesting, not duration.
 */
export function EthericTideScales() {
  const [sel, setSel] = useState<number | null>(null);
  const X0 = 40, X1 = 306;

  const T = [
    { k: "Breath", y: 52, cycles: 9, a: "Reception", b: "Release",
      d: "The clearest image of etheric mediation: outer becomes inner, is transformed, and is released. It shows that life depends on a boundary permeable without being absent.",
      note: "One of the few great rhythms that runs automatically and can still be consciously modified — which is why it sits at the threshold between voluntary and involuntary." },
    { k: "Pulse", y: 108, cycles: 6, a: "Contraction", b: "Relaxation",
      d: "Where breath opens the organism to the world, pulse distributes the organism through itself. Each beat restates the relation of centre to circumference.",
      note: "Blood outward toward the tissues, inward toward heart and lung. Gathering, sending, returning, renewing." },
    { k: "Waking and sleep", y: 164, cycles: 3.5, a: "Expenditure", b: "Restoration",
      d: "Waking extends force into perception, action and response. Sleep suspends most of that outward demand so the field can turn toward maintenance and integration.",
      note: "Not a magical replenishment independent of physiology. The necessity of sleep is evidence that a being which never retreats from manifestation cannot restore the conditions of manifestation." },
    { k: "Season", y: 220, cycles: 2, a: "Growth", b: "Withdrawal",
      d: "Longer alternations of exertion and recovery, illness and convalescence, the year's own advance and retreat.",
      note: "The tide also moves between centre and circumference — gathered around one function under effort, drawn inward during digestion, scattered toward the periphery under overstimulation." },
    { k: "A life", y: 276, cycles: 1, a: "Building", b: "Relinquishing",
      d: "Childhood spends formative capacity building the bodily architecture. Adulthood redirects more of it toward maintenance, work and reproduction. Age reveals the growing difficulty of fully restoring a pattern after expenditure.",
      note: "The same polarity as a single breath, at the scale of a whole embodiment." },
  ];

  const wave = (y: number, cycles: number) => {
    const w = X1 - X0, amp = 15, steps = 120;
    let d = `M${X0} ${y}`;
    for (let i = 1; i <= steps; i++) {
      const x = X0 + (w * i) / steps;
      d += ` L${x} ${y - amp * Math.sin((i / steps) * cycles * 2 * Math.PI)}`;
    }
    return d;
  };

  const cur = sel === null ? null : T[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,344px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[344px]">
        <svg viewBox="0 0 344 320" className="h-auto w-full" role="img" aria-labelledby="aoh-ets-t">
          <title id="aoh-ets-t">
            Five waves of increasing wavelength over one axis — breath, pulse, waking and sleep,
            season, and a whole life — all carrying the same alternation.
          </title>

          {T.map((t, i) => {
            const on = sel === i;
            return (
              <g key={t.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={t.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <rect x="0" y={t.y - 26} width="344" height="46" fill="transparent" />
                <line x1={X0} y1={t.y} x2={X1} y2={t.y} stroke="var(--gold)"
                      strokeOpacity={on ? 0.3 : 0.1} strokeDasharray="2 6" strokeWidth="0.7" />
                <path d={wave(t.y, t.cycles)} fill="none"
                      stroke={on ? "var(--gold)" : "var(--muted-foreground)"}
                      strokeOpacity={on ? 1 : sel !== null ? 0.2 : 0.62}
                      strokeWidth={on ? 1.7 : 1.1} strokeLinecap="round" />
                <text x={X0} y={t.y - 21} className="font-mono" fontSize="6.6" letterSpacing="1"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel !== null && !on ? 0.35 : 1}>
                  {t.k.toUpperCase()}
                </text>
              </g>
            );
          })}

          <text x="172" y="312" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            LESS A BATTERY THAN A TIDAL ECOLOGY
          </text>
        </svg>
      </div>

      <div className="min-h-[14rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.k} · {cur.a} ↔ {cur.b}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-5 text-sm leading-relaxed text-bone/65">{cur.note}</p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The same alternation at five wavelengths. Every healthy rhythm holds a polarity, and
              none of the phases is healthy alone: constant expansion dissipates, constant
              contraction stagnates, unbroken activity exhausts the field, and excessive withdrawal
              weakens its capacity to meet the world.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              Which is why rhythm matters more than intensity. A moderate force circulating
              coherently sustains life better than a great one released chaotically.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Health here is entering a phase fully and then relinquishing it when its interval has
              ended. Select a scale.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
