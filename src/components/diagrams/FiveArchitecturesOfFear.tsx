import { useState } from "react";

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
 * branches all leave the same point.
 */
export function FiveArchitecturesOfFear() {
  const [sel, setSel] = useState<string | null>(null);
  const C = 168, CY = 166;

  const F = [
    { k: "Vāyu", a: -90, short: "Restless anticipation",
      d: "Possibilities multiply faster than any of them can be examined. The fear does not settle on an object; it keeps generating new ones.",
      q: "Mobility without consolidation." },
    { k: "Tejas", a: -18, short: "Defensive anger",
      d: "The fear converts into heat and a sudden impulse to confront. What was threat becomes target.",
      q: "Intensity discharging outward." },
    { k: "Apas", a: 54, short: "Clinging to protection",
      d: "The fear seeks cohesion — proximity, reassurance, relationship. It binds rather than flees.",
      q: "Cohesion sought as safety." },
    { k: "Pṛthivī", a: 126, short: "Immobility",
      d: "Contraction into heaviness and fixed avoidance. The fear stabilises into a shape that will not move.",
      q: "Density refusing change." },
    { k: "Ākāśa", a: 198, short: "Formless dread",
      d: "Vertigo, exposure before the unknown, fear without an object it can name.",
      q: "Openness with nothing to hold." },
  ];

  const pt = (a: number, r: number) => [C + r * Math.cos((a * Math.PI) / 180), CY + r * Math.sin((a * Math.PI) / 180)];
  const cur = F.find((f) => f.k === sel);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,336px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[336px]">
        <svg viewBox="0 0 336 336" className="h-auto w-full" role="img" aria-labelledby="aoh-faf-t">
          <title id="aoh-faf-t">
            One word at the centre — fear — with five branches leaving it, each the shape that fear
            takes under a different tattvic current.
          </title>

          {F.map((f) => {
            const [x1, y1] = pt(f.a, 46);
            const [x2, y2] = pt(f.a, 106);
            const on = sel === f.k;
            return (
              <g key={f.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : f.k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={f.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : f.k); } }}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gold)"
                      strokeOpacity={on ? 0.9 : sel ? 0.15 : 0.4}
                      strokeWidth={on ? 1.6 : 1} strokeDasharray="3 5" />
                <circle cx={x2} cy={y2} r={on ? 27 : 23} fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : sel ? 0.25 : 0.62} strokeWidth={on ? 1.7 : 1.1} />
                <text x={x2} y={y2 + 3} textAnchor="middle" className="font-serif" fontSize="9.5"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel && !on ? 0.35 : 1}>{f.k}</text>
                <text x={x2} y={y2 + 38} textAnchor="middle" className="font-label" fontSize="6.2"
                      letterSpacing="0.8" fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={on ? 0.95 : sel ? 0.2 : 0.55}>
                  {f.short.toUpperCase()}
                </text>
              </g>
            );
          })}

          <circle cx={C} cy={CY} r="42" fill="var(--void)" stroke="var(--gold)"
                  strokeOpacity="0.8" strokeWidth="1.3" />
          <text x={C} y={CY + 5} textAnchor="middle" className="font-serif" fontSize="19"
                fill="var(--gold)" fillOpacity="0.95">fear</text>

          <text x={C} y="328" textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            ONE WORD — FIVE FORMATIVE BEHAVIOURS
          </text>
        </svg>
      </div>

      <div className="min-h-[13rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Fear under {cur.k} · {cur.short}
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
