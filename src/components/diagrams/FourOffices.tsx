import { useState } from "react";

/**
 * FourOffices — vertical in order, reciprocal in operation.
 *
 * The section is careful that these are not four floors. They interpenetrate:
 * pneuma reaches awareness only through the capacities of psychē, psychē speaks
 * only through the organs of sōma, and sōma conditions the images psychē works
 * with. So the registers are drawn as bands with two channels running past them —
 * one descending toward embodiment, one ascending toward understanding — rather
 * than as a ladder with a top and a bottom.
 *
 * Each carries an office and the way that office oversteps, because the section's
 * whole conclusion is that health is each level doing its own work and not
 * another's.
 */
export function FourOffices() {
  const [sel, setSel] = useState<string | null>(null);
  const [dir, setDir] = useState<"descending" | "ascending">("descending");

  const R = [
    { k: "Spirit", gk: "Πνεῦμα", verb: "animates", y: 44,
      d: "Participation in a life greater than the constructed personality — not intellect, emotion or self-image, but the vertical principle by which the person stays open to meaning and return. Breath is the right image: not a possession held, but a current repeatedly received, circulated and released.",
      without: "without overwhelming",
      fail: "Spiritual aspiration can become a means of fleeing embodiment — the higher register used to escape the conditions the lower ones impose." },
    { k: "Essence", gk: "Λόγος", verb: "determines", y: 116,
      d: "The innermost law of this being — the principle of identity through change, the formative orientation giving it a particular range of possibilities, affinities and limits. Not personality, which is historically assembled and can change considerably.",
      without: "without becoming fatalism",
      fail: "Essence determines as a seed determines: it establishes the governing pattern within which development is possible. It does not specify the storms." },
    { k: "Soul", gk: "Ψυχή", verb: "mediates", y: 188,
      d: "The plastic, interpretive region — memory, imagination, desire, emotion, attention, dream, conscience, will. It clothes what descends in images and raises what ascends into meaning. Where universal forces become personal experience.",
      without: "without distortion",
      fail: "Because it is plastic it can bend. A legitimate bodily warning becomes overwhelming fear; a spiritual demand for change becomes grandiosity. Psychic fantasy can present itself as revelation." },
    { k: "Body", gk: "Σῶμα", verb: "embodies", y: 260,
      d: "Where force acquires weight, rhythm, vulnerability and consequence. Not an incidental container around the real being — the embodied face of the architecture, and the place its claims meet resistance.",
      without: "without claiming to be the whole",
      fail: "Bodily impulse can masquerade as spiritual command. Density is not inferiority: a thought vanishes in seconds, a thought made habit can structure decades." },
  ];

  const cur = R.find((r) => r.k === sel);
  const down = dir === "descending";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <style>{`
          .aoh-fo-ch { stroke-dasharray: 5 9; animation: aoh-fo-run 3.6s linear infinite; }
          .aoh-fo-up .aoh-fo-ch { animation-direction: reverse; }
          @keyframes aoh-fo-run { to { stroke-dashoffset: -28 } }
          @media (prefers-reduced-motion: reduce) { .aoh-fo-ch { animation: none } }
        `}</style>
        <svg viewBox="0 0 340 352" className={`h-auto w-full ${down ? "" : "aoh-fo-up"}`}
             role="img" aria-labelledby="aoh-fo-t">
          <title id="aoh-fo-t">
            Four registers — Spirit, Essence, Soul, Body — with a channel descending past them
            toward embodiment and another ascending toward understanding.
          </title>

          {/* the two directions run past every register, not between two of them */}
          <line className="aoh-fo-ch" x1="40" y1="40" x2="40" y2="316"
                stroke="var(--gold)" strokeOpacity={down ? 0.85 : 0.2} strokeWidth="1.4" />
          <line className="aoh-fo-ch" x1="300" y1="316" x2="300" y2="40"
                stroke="var(--bone)" strokeOpacity={down ? 0.2 : 0.7} strokeWidth="1.4" />
          <text x="40" y="330" textAnchor="middle" className="font-label" fontSize="5.8"
                letterSpacing="0.8" fill="var(--muted-foreground)"
                opacity={down ? 0.95 : 0.35}>DESCENT</text>
          <text x="300" y="330" textAnchor="middle" className="font-label" fontSize="5.8"
                letterSpacing="0.8" fill="var(--muted-foreground)"
                opacity={down ? 0.35 : 0.95}>RETURN</text>

          {R.map((r) => {
            const on = sel === r.k;
            return (
              <g key={r.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : r.k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={r.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : r.k); } }}>
                <rect x="62" y={r.y} width="216" height="56" fill="var(--gold)"
                      fillOpacity={on ? 0.07 : 0.02} stroke="var(--gold)"
                      strokeOpacity={on ? 1 : sel ? 0.2 : 0.5} strokeWidth={on ? 1.7 : 1} />
                <text x="170" y={r.y + 24} textAnchor="middle" className="font-label" fontSize="8.6"
                      letterSpacing="1.3" fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel && !on ? 0.35 : 1}>{r.k.toUpperCase()}</text>
                <text x="170" y={r.y + 38} textAnchor="middle" className="font-serif" fontSize="9"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel && !on ? 0.3 : 0.8}>{r.gk}</text>
                <text x="170" y={r.y + 50} textAnchor="middle" className="font-serif" fontSize="8"
                      fontStyle="italic" fill="var(--bone)"
                      opacity={on ? 0.9 : sel ? 0.25 : 0.55}>{r.verb}</text>
              </g>
            );
          })}

          <text x="170" y="344" textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            VERTICAL IN ORDER — RECIPROCAL IN OPERATION
          </text>
        </svg>

        <div className="mt-3 flex justify-center gap-2">
          {(["descending", "ascending"] as const).map((d) => (
            <button key={d} onClick={() => setDir(d)} aria-pressed={dir === d}
              className={`border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.12em] transition-colors ${
                dir === d ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/60"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[15rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.gk} · {cur.k} {cur.verb}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-6 border-l-2 border-bone/30 pl-5 text-sm leading-relaxed text-bone/75">
              <span className="font-label text-[10px] uppercase tracking-[0.15em] text-bone/60">
                {cur.without} ·{" "}
              </span>
              {cur.fail}
            </p>
          </>
        ) : (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {down ? "Descent — toward embodiment" : "Return — toward understanding"}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {down
                ? "A thought modifies attention; attention affects emotion; emotion alters breath, posture and action; action enters the world and produces consequence. The smallest interior movement descends through several levels before becoming visible."
                : "Bodily conditions alter the soul. Places affect imagination. Repeated actions become habits, and habits become grooves through which force more readily travels. Beauty, suffering, labour, illness and death can penetrate the personality and wake something deeper than ordinary thought."}
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              Spirit animates. Essence determines. Soul mediates. Body embodies.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Health is each doing its own work and not another&rsquo;s. Disorder is one usurping the
              office of another — which is what the four failures name.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
