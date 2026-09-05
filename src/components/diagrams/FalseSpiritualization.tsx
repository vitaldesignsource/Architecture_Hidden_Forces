import { useState } from "react";

/**
 * FalseSpiritualization — six operations that imitate the work without doing it.
 *
 * The section's most useful contribution is diagnostic: each counterfeit is a
 * near-miss, and they all fail the same way — none of them lets matter
 * participate according to its nature. So they are drawn orbiting a centre they
 * never reach, at varying distances, rather than as a list where each looks like
 * an independent error.
 *
 * The centre is what they miss, not what they oppose. That distinction is the
 * whole section: these are not the opposite of spiritualization, they are its
 * resemblance.
 */
export function FalseSpiritualization() {
  const [sel, setSel] = useState<number | null>(null);
  const C = 170;

  const F = [
    { k: "Aestheticisation", a: -90, r: 118,
      d: "Makes matter appear sacred without changing the relations governing it. The surface acquires reverence; nothing underneath is rearranged.",
      tell: "It looks holy and behaves exactly as before." },
    { k: "Inflation", a: -30, r: 128,
      d: "Treats emotional or visionary intensity as proof of spiritual authority. Strength of feeling is mistaken for depth of participation.",
      tell: "The evidence offered is always how powerful it felt." },
    { k: "Denial", a: 30, r: 122,
      d: "Calls material limitation unreal rather than working truthfully within it. What cannot be dissolved by thought is declared not to exist.",
      tell: "Limits are reframed as illusions rather than met." },
    { k: "Domination", a: 90, r: 132,
      d: "Forces bodies, objects, or communities to serve an abstract ideal regardless of their integrity. The pattern is imposed rather than received.",
      tell: "The vessel's own nature is treated as an obstacle." },
    { k: "Mechanical consecration", a: 150, r: 124,
      d: "Preserves the sacred form after participation has disappeared. The rite continues; the relation it was built to carry does not.",
      tell: "Everything is still performed and nothing is still met." },
    { k: "Purity fixation", a: -150, r: 120,
      d: "Attempts to remove all vulnerability, mixture, ambiguity, and finitude from embodiment — which is to say, to remove the conditions embodiment consists of.",
      tell: "Adequacy has been replaced by an impossible cleanliness." },
  ];

  const pt = (a: number, r: number) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)];
  const cur = sel === null ? null : F[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <svg viewBox="0 0 340 356" className="h-auto w-full" role="img" aria-labelledby="aoh-fsp-t">
          <title id="aoh-fsp-t">
            Six counterfeits orbiting a centre none of them reaches — matter participating
            according to its own nature.
          </title>

          <circle cx={C} cy={C} r="150" fill="none" stroke="var(--gold)" strokeOpacity="0.07"
                  strokeDasharray="2 7" strokeWidth="0.8" />

          {F.map((f, i) => {
            const [x, y] = pt(f.a, f.r);
            const on = sel === i;
            return (
              <g key={f.k}>
                {/* each reaches toward the centre and stops short */}
                <line x1={x} y1={y} x2={C + (x - C) * 0.28} y2={C + (y - C) * 0.28}
                      stroke="var(--bone)" strokeOpacity={on ? 0.5 : 0.13}
                      strokeDasharray="2 5" strokeWidth="1" />
                <g style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : i)}
                   role="button" tabIndex={0} aria-pressed={on} aria-label={f.k}
                   onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                  <circle cx={x} cy={y} r={on ? 17 : 14} fill="var(--void)" stroke="var(--bone)"
                          strokeOpacity={on ? 0.95 : sel !== null ? 0.2 : 0.45}
                          strokeDasharray="4 3" strokeWidth={on ? 1.6 : 1} />
                  <text x={x} y={y + 3.5} textAnchor="middle" className="font-label" fontSize="8.5"
                        fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                        opacity={sel !== null && !on ? 0.35 : 1}>{i + 1}</text>
                </g>
              </g>
            );
          })}

          <circle cx={C} cy={C} r="42" fill="var(--void)" stroke="var(--gold)"
                  strokeOpacity={sel === null ? 0.75 : 0.4} strokeWidth="1.2" />
          <text x={C} y={C - 8} textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="0.9" fill="var(--gold)" opacity="0.9">MATTER</text>
          <text x={C} y={C + 2} textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="0.9" fill="var(--gold)" opacity="0.9">AS ITSELF</text>
          <text x={C} y={C + 14} textAnchor="middle" className="font-label" fontSize="5.8"
                letterSpacing="0.7" fill="var(--muted-foreground)">PARTICIPATING</text>

          <text x={C} y="344" textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            NOT THE OPPOSITE OF THE WORK — ITS RESEMBLANCE
          </text>
        </svg>
      </div>

      <div className="min-h-[15rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {sel! + 1} · {cur.k}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-6 border-l-2 border-bone/30 pl-5 font-serif text-lg italic leading-relaxed text-bone/80">
              {cur.tell}
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              Six operations that imitate spiritualisation without accomplishing it. They are drawn
              orbiting rather than opposing, because each reaches toward the centre and stops short —
              and because a counterfeit is dangerous in proportion to how much it resembles the thing.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              They share one error. None of them lets matter participate according to its nature.
              They disguise it, deny it, or force it beneath an imposed image.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Which is the test in reverse: authentic spiritualisation makes matter{" "}
              <span className="italic">more</span> truthfully itself, not less real.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
