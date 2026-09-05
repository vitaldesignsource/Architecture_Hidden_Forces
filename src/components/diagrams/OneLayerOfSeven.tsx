import { useState } from "react";
import { fs } from "./fig";

/**
 * OneLayerOfSeven — what an astrology section's diagram ought to show.
 *
 * § XIII's governing restraint is that celestial timing is one contributing
 * layer and not the cause: a natal chart is closer to a set of initial
 * conditions than to a completed destiny. A figure of charts and glyphs would
 * quietly contradict that. So the seven contributors converge on one moment and
 * the celestial line is drawn no heavier than the rest — it is only marked,
 * because it is the one this section maps.
 *
 * Isolating a layer shows what it alone would account for, which is always a
 * fraction. That is the point.
 */
export function OneLayerOfSeven() {
  const [sel, setSel] = useState<number | null>(null);
  const X = 118, CX = 296, CY = 162;

  const L = [
    { k: "Celestial timing", short: "CELESTIAL", mapped: true, y: 36,
      d: "The changing configuration of planetary powers — what is operating, how, where it may be embodied, and what is arriving. This section maps this layer and no other." },
    { k: "Inherited history", short: "INHERITED", y: 78,
      d: "Ancestry, family pattern, the Crypt of § XI — the formative conditions already in place before this moment began." },
    { k: "Bodily constitution", short: "CONSTITUTION", y: 120,
      d: "The particular vessel: its capacities, vulnerabilities, rhythms and limits, which decide what any influence can actually do here." },
    { k: "Environment", short: "ENVIRONMENT", y: 162,
      d: "Material and social circumstance — what is available, what is prevented, who is present, what the conditions permit." },
    { k: "Local Morphaithēr", short: "MORPHAITHĒR", y: 204,
      d: "The formative atmosphere of § XLI: currents, reservoirs and standing patterns already recruiting force in this place." },
    { k: "Personal participation", short: "PARTICIPATION", y: 246,
      d: "Attention, consent, discipline and refusal. The one layer that is chosen rather than received." },
    { k: "Unpredictable contingency", short: "CONTINGENCY", y: 288,
      d: "What no layer accounts for. Its presence in the list is not modesty — it is part of the claim." },
  ];

  const cur = sel === null ? null : L[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[340px]">
        <svg viewBox="0 0 340 330" className="h-auto w-full" role="img" aria-labelledby="aoh-ol-t">
          <title id="aoh-ol-t">
            Seven contributing layers converging on a single moment, celestial timing among them and
            weighted no more heavily than the rest.
          </title>

          {L.map((l, i) => {
            const on = sel === i;
            return (
              <line key={l.k} x1={X + 8} y1={l.y} x2={CX - 26} y2={CY}
                    stroke={l.mapped ? "var(--gold)" : "var(--muted-foreground)"}
                    strokeOpacity={on ? 0.9 : sel !== null ? 0.08 : 0.32}
                    strokeWidth={on ? 1.6 : 1} />
            );
          })}

          {L.map((l, i) => {
            const on = sel === i;
            return (
              <g key={l.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={l.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <rect x="0" y={l.y - 13} width={X + 14} height="26" fill="transparent" />
                <text x={X - 12} y={l.y + 3} textAnchor="end" className="font-label" style={fs(7.6)}
                      letterSpacing="0.7"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel !== null && !on ? 0.3 : 1}>
                  {l.short}
                </text>
                <circle cx={X} cy={l.y} r={on ? 6.5 : 4.5} fill="var(--void)"
                        stroke={l.mapped ? "var(--gold)" : "var(--bone)"}
                        strokeOpacity={on ? 1 : sel !== null ? 0.2 : 0.6}
                        strokeWidth={l.mapped ? 1.5 : 1} />
                {l.mapped && (
                  <circle cx={X} cy={l.y} r="1.8" fill="var(--gold)"
                          fillOpacity={sel !== null && !on ? 0.25 : 0.9} />
                )}
              </g>
            );
          })}

          <circle cx={CX} cy={CY} r="25" fill="var(--void)" stroke="var(--gold)"
                  strokeOpacity="0.85" strokeWidth="1.3" />
          <text x={CX} y={CY + 3} textAnchor="middle" className="font-label" style={fs(7)}
                letterSpacing="0.8" fill="var(--gold)">MOMENT</text>

          <text x="170" y="322" textAnchor="middle" className="font-label" style={fs(7.4)}
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            ONE LAYER OF THE FIELD — NOT THE WHOLE CAUSE
          </text>
        </svg>
      </div>

      <div className="min-h-[13rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.k}{cur.mapped ? " · the layer this section maps" : ""}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              On its own it accounts for a seventh of what arrives — and the seven are not
              independent of one another.
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Astrology does not create the hidden forces. It maps their changing celestial
              configuration — one layer among those converging on any moment, and the only one this
              section is about.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              A natal chart is closer to a set of initial conditions than to a completed destiny.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              The seed holds developmental tendencies. Soil, weather, cultivation, injury and choice
              all shape what the plant becomes — which is why the celestial line here is drawn no
              heavier than the other six.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
