import { useState } from "react";

/**
 * DaimonicChain — the descent from divine virtue to embodied consequence, with
 * the feedback the document insists on: consequence returns to CHARACTER, not to
 * the source. So the loop closes partway up the chain rather than reversing the
 * whole of it, which is what separates a governing attractor from a puppet master.
 */
export function DaimonicChain() {
  const [sel, setSel] = useState<number | null>(null);
  const N = [
    { k: "Divine virtue", d: "A relatively universal and undivided causation — a virtue held whole, before any distribution." },
    { k: "Celestial order", d: "The patterned sky at embodiment. A natal chart maps these conditions, and is the celestial trace of what daimonic mediation administers — not the daimōn itself." },
    { k: "Daimonic mediation", d: "The distributor of particularity. If a divine power is a sun, daimons are not rays broken off it but differentiated administrations of its illumination — and mediation is never neutral: every mediator conditions what it transmits." },
    { k: "Personal pattern", d: "The allotment: body, ancestry, historical placement, celestial configuration, natural capacity, limitation, circumstantial tendency. Fate provides the instrument; it does not determine the music." },
    { k: "Character", d: "Not a moral label but a structure of reception — it decides which currents enter easily, which are distorted, which are refused, and which are magnified.", layers: true },
    { k: "Choice", d: "Conditioned, and not thereby determined. The manner in which an allotment is inhabited is not fixed in advance." },
    { k: "Embodied consequence", d: "Where the current reaches Prithivi and becomes commitment, habit, craft, and material result. A calling that never arrives here remains an atmosphere of possibility — it may inspire endlessly without producing a life." },
  ];
  const LAYERS = [
    ["Given character", "Body, temperament, ancestry, natal and environmental conditions", "received rather than chosen"],
    ["Acquired character", "Habits, attachments, defences, skills, repeated choices", "conditioned but changeable"],
    ["Daimonic character", "Vocation, higher orientation, formative potential, governing pattern", "discovered and consciously embodied"],
  ];
  const Y = (i: number) => 34 + i * 58;
  const cur = sel === null ? null : N[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[330px]">
        <style>{`
          .aoh-dc-spine { stroke-dasharray: 4 9; animation: aoh-dc-down 3.6s linear infinite; }
          @keyframes aoh-dc-down { to { stroke-dashoffset: -26 } }
          .aoh-dc-loop { stroke-dasharray: 3 8; animation: aoh-dc-up 3.6s linear infinite; }
          @keyframes aoh-dc-up { to { stroke-dashoffset: 22 } }
          .aoh-dc-n { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-dc-spine,.aoh-dc-loop { animation: none } }
        `}</style>
        <svg viewBox="0 0 330 430" className="h-auto w-full" role="img" aria-labelledby="aoh-dc-t">
          <title id="aoh-dc-t">
            A descending chain of seven stages from divine virtue to embodied consequence, with a
            return arc carrying consequence back to character rather than to the source.
          </title>

          <line className="aoh-dc-spine" x1="52" y1={Y(0)} x2="52" y2={Y(6)}
                stroke="var(--gold)" strokeOpacity="0.5" strokeWidth="1.1" />

          {/* the loop closes at character, four stages down — not at the top */}
          <path className="aoh-dc-loop" d={`M52,${Y(6)} C12,${Y(6) - 6} 12,${Y(4) + 8} 52,${Y(4)}`}
                fill="none" stroke="var(--bone)" strokeOpacity="0.55" strokeWidth="1.1" />
          <text x="6" y={(Y(4) + Y(6)) / 2} className="font-mono" fontSize="6.5" letterSpacing="0.8"
                fill="var(--muted-foreground)" transform={`rotate(-90 6 ${(Y(4) + Y(6)) / 2})`}
                textAnchor="middle">FEEDS BACK</text>

          {N.map((n, i) => {
            const on = sel === i;
            return (
              <g key={n.k} className="aoh-dc-n" onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={n.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx="52" cy={Y(i)} r={on ? 8 : 5.5} fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : sel === null ? 0.65 : 0.28} strokeWidth={on ? 2 : 1.1} />
                <text x="72" y={Y(i) + 4} className="font-serif" fontSize="13.5"
                      fill={on ? "var(--gold)" : "var(--bone)"}
                      fillOpacity={on ? 1 : sel === null ? 0.82 : 0.3}>{n.k}</text>
              </g>
            );
          })}
          <text x="72" y={Y(6) + 26} className="font-mono" fontSize="7" letterSpacing="1.2"
                fill="var(--muted-foreground)">RETURNS TO CHARACTER — NOT TO THE SOURCE</text>
        </svg>
      </div>

      <div className="min-h-[17rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">{cur.k}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            {cur.layers && (
              <div className="mt-6 space-y-px">
                {LAYERS.map(([a, b, c]) => (
                  <div key={a} className="border-b border-border py-3">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">{a}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone/55">{c}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The chain is not a one-way command. Consequences feed back into character, character
              changes perception, and perception alters receptivity to the daimonic current — so
              repeated choices either clarify the mediation or obscure it.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Which is why the return arc closes at character rather than running back to the source.
              The daimōn is not a puppet master working the personality.{" "}
              <span className="text-bone/90">It is closer to a governing attractor</span> — a living
              vertical current continually calling a person&rsquo;s dispersed forces toward a more
              coherent configuration.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              Select any stage. Character opens into its three layers.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * RiteSequence — the bounded enactment. Five stages inside a threshold, each
 * feeding the object at the centre. Switching to displaced object changes NOTHING
 * about the sequence, which is the whole claim: the form survives because
 * something is still being fed by it, even when that something is no longer what
 * the participants name.
 */
