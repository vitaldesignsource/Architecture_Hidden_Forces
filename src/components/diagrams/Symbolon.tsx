import { useState } from "react";

/**
 * Symbolon — the tally. One half is the visible form; the other is whichever
 * level it fits; consciousness is the third party that recognises the fit.
 * Both halves are the same disc under complementary clips, so the break is
 * necessarily exact: they can only fit each other.
 */
export function Symbolon() {
  const [sel, setSel] = useState<number | null>(null);
  const JAG = "L177,22 L163,44 L179,66 L164,88 L177,110 L162,132 L176,154 L165,176 L170,210";
  const L = [
    { k: "The physical Sun", d: "The astronomical body — one centre, and everything else held in orbit around it." },
    { k: "Centre and circumference", d: "The bare geometry: a continuous boundary organised around a single point." },
    { k: "Gold", d: "The alchemical virtue — the metal that will not tarnish, incorruptible under trial." },
    { k: "The Heart", d: "The integrating function of § XXIV: relation gathered, warmed, and redistributed." },
    { k: "The Inner Sun", d: "Ignisophia's centre — wise fire, warming what is stagnant without consuming it." },
    { k: "Illumination", d: "The principle itself: that by which anything whatever becomes visible." },
    { k: "Sovereign inflation", d: "And the danger. The same centrality, mistaken for the whole of the field.", warn: true },
  ];
  const fitted = sel !== null;
  const cur = fitted ? L[sel] : null;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[360px]">
        <style>{`
          .aoh-sy-r { transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1); }
          .aoh-sy-seam { transition: opacity 500ms ease 380ms; }
          .aoh-sy-seam.on { animation: aoh-sy-glow 2.8s ease-in-out 900ms infinite; }
          @keyframes aoh-sy-glow { 0%,100% { opacity: .35 } 50% { opacity: .9 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-sy-r { transition: none } .aoh-sy-seam.on { animation: none; opacity: .7 }
          }
        `}</style>
        <svg viewBox="0 0 340 232" className="h-auto w-full" role="img" aria-labelledby="aoh-sy-t">
          <title id="aoh-sy-t">
            A broken disc in two halves. The left carries the visible form; the right carries the
            level it fits. Choosing a level closes the break.
          </title>
          <defs>
            <clipPath id="aoh-sy-L">
              <path d={`M0,0 L170,0 ${JAG} L0,210 Z`} />
            </clipPath>
            <clipPath id="aoh-sy-R">
              <path d={`M170,0 ${JAG} L340,210 L340,0 Z`} />
            </clipPath>
            <clipPath id="aoh-sy-disc">
              <circle cx="170" cy="100" r="78" />
            </clipPath>
          </defs>

          <g clipPath="url(#aoh-sy-L)">
            <circle cx="170" cy="100" r="78" fill="var(--void)" stroke="var(--gold)"
                    strokeOpacity={fitted ? 0.95 : 0.55} strokeWidth="1.1" />
            <circle cx="170" cy="100" r="62" fill="none" stroke="var(--gold)" strokeOpacity="0.2" strokeWidth="0.6" />
            <circle cx="170" cy="100" r="7" fill="var(--gold)" fillOpacity={fitted ? 0.9 : 0.5} />
          </g>

          <g className="aoh-sy-r" transform={`translate(${fitted ? 0 : 30},0)`}>
            <g clipPath="url(#aoh-sy-R)">
              <circle cx="170" cy="100" r="78" fill="var(--void)" stroke="var(--gold)"
                      strokeOpacity={fitted ? 0.95 : 0.3} strokeWidth="1.1" />
              <circle cx="170" cy="100" r="62" fill="none" stroke="var(--gold)"
                      strokeOpacity={fitted ? 0.2 : 0.08} strokeWidth="0.6" />
              {[0, 1, 2, 3, 4].map((i) => {
                const a = (-58 + i * 29) * (Math.PI / 180);
                return (
                  <line key={i} x1={170 + 20 * Math.cos(a)} y1={100 + 20 * Math.sin(a)}
                        x2={170 + 70 * Math.cos(a)} y2={100 + 70 * Math.sin(a)}
                        stroke="var(--gold)" strokeOpacity={fitted ? 0.5 : 0.14} strokeWidth="0.7" />
                );
              })}
            </g>
          </g>

          <path className={`aoh-sy-seam ${fitted ? "on" : ""}`} d={`M170,0 ${JAG}`} fill="none"
                stroke="var(--gold)" strokeWidth="1.4" opacity={fitted ? 0.6 : 0}
                clipPath="url(#aoh-sy-disc)" />

          <text x="86" y="203" textAnchor="middle" className="font-mono" fontSize="7.5"
                letterSpacing="1.5" fill="var(--muted-foreground)">VISIBLE FORM</text>
          <text x="254" y="203" textAnchor="middle" className="font-mono" fontSize="7.5"
                letterSpacing="1.5" fill={fitted ? "var(--gold)" : "var(--muted-foreground)"}>
            {fitted ? "FITS" : "THE LEVEL IT FITS"}
          </text>
          <text x="170" y="226" textAnchor="middle" className="font-mono" fontSize="7.5"
                letterSpacing="1.5" fill="var(--gold-dim)" opacity={fitted ? 1 : 0.35}>
            CONSCIOUSNESS RECOGNISES THE FIT
          </text>
        </svg>
      </div>

      <div className="min-h-[15rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          One half, seven locks — the solar symbolon
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {L.map((x, i) => (
            <button key={x.k} onClick={() => setSel(sel === i ? null : i)} aria-pressed={sel === i}
              className={`border px-3 py-1.5 text-left text-xs leading-snug transition-colors ${
                sel === i
                  ? x.warn ? "border-bone/60 text-bone" : "border-gold text-gold"
                  : "border-border text-muted-foreground hover:border-gold/60 hover:text-bone/80"
              }`}>
              {x.k}
            </button>
          ))}
        </div>
        {cur ? (
          <div className="mt-6 border-l-2 border-gold/50 pl-5">
            <p className="text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            {cur.warn && (
              <p className="mt-3 text-[11px] leading-relaxed text-bone/55">
                Listed with the rest deliberately. A symbol that fits a distortion as readily as a
                virtue is not thereby a false symbol — it is a symbol whose remainder has been
                forgotten.
              </p>
            )}
          </div>
        ) : (
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            The Greek <span className="italic">symbolon</span> was a token broken in two, each party
            keeping a half. Brought back together, the fit authenticated the bond — no half meant
            anything alone. Which makes it an exact figure for what a symbol is: not a container of
            meaning, but the half of a relation that becomes legible only on being matched.
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * ForceRegisters — the six categories drawn as three different KINDS of thing,
 * because they are not six equivalent substances. Transcendent, formative and
 * material are ontological registers (stacked bands); psychic and collective are
 * scales of organisation (bars cutting across every band); intermediary is a
 * function performed between registers (the serpentine thread crossing them).
 * Six equal boxes would state the opposite of the doctrine.
 */
