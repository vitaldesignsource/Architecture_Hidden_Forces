import { useState } from "react";
import { fs } from "./fig";
import { TATTVA_LEGEND, TattvaMark, type TattvaKey } from "./TattvaGlyph";

/**
 * FiveArchitecturesOfFear — one named emotion, five formative behaviours.
 *
 * The section's sharpest pedagogical point is that naming an emotion is often
 * insufficient: two people reporting the same feeling may be inside entirely
 * different architectures of it. Fear is the case the document works through in
 * full, so the figure holds one word at the centre and lets the tattvic currents
 * pull it into five shapes.
 *
 * Not a taxonomy of five fears. One fear, five ways of moving — which is why the
 * branches all leave the same point. Each branch ends in the tattva's own form
 * and colour, as the cards set them, so the current that shapes the fear is
 * seen and not only named.
 */
export function FiveArchitecturesOfFear() {
  const [sel, setSel] = useState<string | null>(null);
  const C = 168, CY = 166;

  const F = [
    { k: "Vāyu", t: "vayu" as TattvaKey, a: -90, short: "Restless anticipation",
      d: "Possibilities multiply faster than any of them can be examined. The fear does not settle on an object; it keeps generating new ones.",
      q: "Mobility without consolidation." },
    { k: "Tejas", t: "tejas" as TattvaKey, a: -18, short: "Defensive anger",
      d: "The fear converts into heat and a sudden impulse to confront. What was threat becomes target.",
      q: "Intensity discharging outward." },
    { k: "Apas", t: "apas" as TattvaKey, a: 54, short: "Clinging to protection",
      d: "The fear seeks cohesion — proximity, reassurance, relationship. It binds rather than flees.",
      q: "Cohesion sought as safety." },
    { k: "Pṛthivī", t: "prithivi" as TattvaKey, a: 126, short: "Immobility",
      d: "Contraction into heaviness and fixed avoidance. The fear stabilises into a shape that will not move.",
      q: "Density refusing change." },
    { k: "Ākāśa", t: "akasha" as TattvaKey, a: 198, short: "Formless dread",
      d: "Vertigo, exposure before the unknown, fear without an object it can name.",
      q: "Openness with nothing to hold." },
  ];

  const pt = (a: number, r: number) => [C + r * Math.cos((a * Math.PI) / 180), CY + r * Math.sin((a * Math.PI) / 180)];
  const cur = F.find((f) => f.k === sel);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,336px)_minmax(0,1fr)] lg:items-center">
      <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[336px]">
        <svg viewBox="0 0 336 336" className="h-auto w-full" role="img" aria-labelledby="aoh-faf-t">
          <title id="aoh-faf-t">
            One word at the centre — fear — with five branches leaving it, each ending in a tattva
            drawn in its own form and colour, the shape that fear takes under that current: the blue
            circle of Vāyu, the red triangle of Tejas, the silver crescent of Apas, the yellow square
            of Pṛthivī and the indigo egg of Ākāśa.
          </title>

          {F.map((f) => {
            const [x1, y1] = pt(f.a, 46);
            const [x2, y2] = pt(f.a, 108);
            const on = sel === f.k;
            const dim = !!sel && !on;
            return (
              <g key={f.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : f.k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={f.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : f.k); } }}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gold)"
                      strokeOpacity={on ? 0.9 : sel ? 0.15 : 0.4}
                      strokeWidth={on ? 1.6 : 1} strokeDasharray="3 5" />
                <circle cx={x2} cy={y2} r={on ? 32 : 28} fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : sel ? 0.25 : 0.62} strokeWidth={on ? 1.7 : 1.1} />
                {/* the tattva as the cards draw it, above its name */}
                <TattvaMark k={f.t} x={x2} y={y2 - 7} s={on ? 20 : 17} opacity={dim ? 0.3 : on ? 1 : 0.85} />
                <text x={x2} y={y2 + 18} textAnchor="middle" className="font-serif" style={fs(8.5)}
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={dim ? 0.35 : 1}>{f.k}</text>
                <text x={x2} y={y2 + 43} textAnchor="middle" className="font-label" style={fs(6.6)}
                      letterSpacing="0.8" fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={on ? 0.95 : sel ? 0.2 : 0.6}>
                  {f.short.toUpperCase()}
                </text>
              </g>
            );
          })}

          <circle cx={C} cy={CY} r="42" fill="var(--void)" stroke="var(--gold)"
                  strokeOpacity="0.8" strokeWidth="1.3" />
          <text x={C} y={CY + 5} textAnchor="middle" className="font-serif" fontSize="19"
                fill="var(--gold)" fillOpacity="0.95">fear</text>

          <text x={C} y="328" textAnchor="middle" className="font-label" style={fs(6.6)}
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            ONE WORD — FIVE FORMATIVE BEHAVIOURS
          </text>
        </svg>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">{TATTVA_LEGEND}</p>
      </div>

      <div className="min-h-[13rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Fear under <span className="aoh-tr" lang="sa-Latn">{cur.k}</span> · {cur.short}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-5 border-l-2 border-gold/40 pl-5 font-serif text-lg italic leading-relaxed text-bone/80">
              {cur.q}
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The tattvas do not decide the content of a feeling. They decide the manner in which
              psychic force moves, combines, appears and seeks expression — so one named emotion can
              hold five entirely different architectures.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              Which is why naming an emotion is often insufficient. Two people may both report anger
              and be inside quite different structures of it.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              One burns and attacks. Another hardens and refuses. Another circulates the grievance
              through memory. Another scatters into agitated speech. The word identifies the family;
              the coloration reveals the behaviour.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
