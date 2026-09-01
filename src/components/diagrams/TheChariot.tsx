import { useState } from "react";

/**
 * TheChariot — Hod and Netzach as the two wheels, the Inner Sun as the centre.
 * The divided/gathered toggle is the doctrine, not decoration: divided, the
 * wheels counter-rotate and the Sun goes dim, which is the section's own image
 * of several animals pulling a chariot in opposing directions. Gathered, they
 * turn together and the centre lights.
 */
export function TheChariot() {
  const [gathered, setGathered] = useState(true);
  const [sel, setSel] = useState<number | null>(null);
  const W = [
    { k: "Hod", he: "הוֹד", cx: 108, role: "The wheel of understanding",
      d: "Language, discrimination, planning, symbol, intelligible structure.",
      fail: "Hod turning without Netzach: understanding with little motive power." },
    { k: "Netzach", he: "נֶצַח", cx: 332, role: "The wheel of desire",
      d: "Emotion, imagination, attraction, instinct, motive vitality.",
      fail: "Netzach turning without Hod: tremendous energy without reliable direction." },
  ];
  const CY = 168, R = 64;
  const spokes = (n: number) => Array.from({ length: n }, (_, i) => (i * 360) / n);
  const cur = sel === null ? null : W[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[440px]">
        <style>{`
          .aoh-ch-w { transform-box: fill-box; transform-origin: center; }
          .aoh-ch-w.turn-a { animation: aoh-ch-spin 26s linear infinite; }
          .aoh-ch-w.turn-b { animation: aoh-ch-spin 26s linear infinite; }
          .aoh-ch-w.turn-b.split { animation-direction: reverse; animation-duration: 17s; }
          @keyframes aoh-ch-spin { to { transform: rotate(360deg) } }
          .aoh-ch-sun { transition: opacity 900ms ease; }
          .aoh-ch-ray { animation: aoh-ch-ray 6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          @keyframes aoh-ch-ray { 0%,100% { opacity:.25 } 50% { opacity:.75 } }
          .aoh-ch-wheel { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) {
            .aoh-ch-w.turn-a, .aoh-ch-w.turn-b { animation: none }
            .aoh-ch-ray { animation: none; opacity:.5 }
          }
        `}</style>
        <svg viewBox="0 0 440 300" className="h-auto w-full" role="img" aria-labelledby="aoh-ch-t">
          <title id="aoh-ch-t">
            The chariot: Hod and Netzach as two wheels on one axle, with the Inner Sun as the
            governing centre between them.
          </title>
          {/* axle */}
          <line x1={W[0].cx} y1={CY} x2={W[1].cx} y2={CY} stroke="var(--gold)"
                strokeOpacity={gathered ? 0.6 : 0.22} strokeWidth="1.4" />

          {W.map((w, i) => {
            const on = sel === i;
            return (
              <g key={w.k} className="aoh-ch-wheel"
                 onClick={() => setSel(on ? null : i)} role="button" tabIndex={0}
                 aria-pressed={on} aria-label={w.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <g className={`aoh-ch-w ${i === 0 ? "turn-a" : "turn-b"}${gathered ? "" : " split"}`}>
                  {spokes(8).map((a) => (
                    <line key={a}
                      x1={w.cx + Math.cos((a * Math.PI) / 180) * 8}
                      y1={CY + Math.sin((a * Math.PI) / 180) * 8}
                      x2={w.cx + Math.cos((a * Math.PI) / 180) * (R - 4)}
                      y2={CY + Math.sin((a * Math.PI) / 180) * (R - 4)}
                      stroke="var(--gold)" strokeOpacity={on ? 0.75 : 0.34} strokeWidth="0.9" />
                  ))}
                  <circle cx={w.cx} cy={CY} r={R - 4} fill="none" stroke="var(--gold)"
                          strokeOpacity={on ? 0.5 : 0.2} strokeWidth="0.7" strokeDasharray="2 6" />
                </g>
                <circle cx={w.cx} cy={CY} r={R} fill="none" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : 0.55} strokeWidth={on ? 1.8 : 1.1} />
                <circle cx={w.cx} cy={CY} r="9" fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity="0.7" strokeWidth="0.9" />
                <text x={w.cx} y={CY + R + 24} textAnchor="middle" className="font-serif"
                      fontSize="14" fill={on ? "var(--gold)" : "var(--bone)"} fillOpacity={on ? 1 : 0.8}>
                  {w.he}
                </text>
                <text x={w.cx} y={CY + R + 38} textAnchor="middle" className="font-mono"
                      fontSize="7" letterSpacing="1.6" fill="var(--muted-foreground)">
                  {w.k.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* the Inner Sun */}
          <g className="aoh-ch-sun" style={{ opacity: gathered ? 1 : 0.32 }}>
            {gathered
              ? spokes(12).map((a, i) => (
                  <line key={a} className="aoh-ch-ray"
                    x1={220 + Math.cos((a * Math.PI) / 180) * 34}
                    y1={CY + Math.sin((a * Math.PI) / 180) * 34}
                    x2={220 + Math.cos((a * Math.PI) / 180) * 46}
                    y2={CY + Math.sin((a * Math.PI) / 180) * 46}
                    stroke="var(--gold)" strokeWidth="1" strokeLinecap="round"
                    style={{ animationDelay: `-${(i * 0.4).toFixed(1)}s` }} />
                ))
              : null}
            <circle cx="220" cy={CY} r="30" fill="var(--void)" />
            <circle cx="220" cy={CY} r="30" fill="none" stroke="var(--gold)"
                    strokeOpacity={gathered ? 1 : 0.4} strokeWidth={gathered ? 1.6 : 1} />
            <circle cx="220" cy={CY} r="5" fill="var(--gold)" fillOpacity={gathered ? 1 : 0.4} />
            <text x="220" y={CY + 52} textAnchor="middle" className="font-mono" fontSize="7"
                  letterSpacing="1.8" fill="var(--muted-foreground)">INNER SUN</text>
          </g>
        </svg>
        <div className="mt-3 flex justify-center gap-5 font-mono text-[9px] uppercase tracking-[0.18em]">
          {[[true, "Gathered"], [false, "Divided"]].map(([v, label]) => (
            <button key={String(label)} type="button" onClick={() => setGathered(v as boolean)}
              aria-pressed={gathered === v}
              className={`px-2 py-2 transition-colors ${gathered === v ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
              {label as string}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[12rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.he} · {cur.k} — {cur.role}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-4 border-t border-border pt-4 font-serif text-lg italic leading-relaxed text-bone/80">
              {cur.fail}
            </p>
          </>
        ) : gathered ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">Gathered</p>
            <p className="mt-4 font-serif text-xl italic leading-relaxed text-bone">
              Both wheels turn together, and the centre lights.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              They remain independent faculties — this is not one rim. Understanding and desire
              keep their difference while turning to a common purpose, and less is lost to internal
              contradiction. Choose a wheel, or set the chariot divided.
            </p>
          </>
        ) : (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">Divided</p>
            <p className="mt-4 font-serif text-xl italic leading-relaxed text-bone">
              Several animals pulling a chariot in opposing directions.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The wheels counter-turn and the axle slackens; the centre goes dim. There may be no
              shortage of force here — one part desires what another fears, one imagines what
              another refuses to enact — and nearly all of it is spent against itself.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * TheTriad — Sulfur above, Salt below, Mercury circulating between them.
 * Deliberately not an equilateral triangle: the doctrine holds that the third is
 * not another object placed beside the first two but the living relation through
 * which they become capable of producing something beyond themselves. So Mercury
 * is drawn as the current between the poles, and solve/coagula reverses it.
 */
