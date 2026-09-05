import { useState } from "react";
import { fs } from "./fig";

/**
 * AquiferSection — the Black Aquifer in cross-section, carrying the whole
 * vocabulary of the depth.
 *
 * The watershed drew the surface: the architecture that decides where a
 * current can go. This draws what is under it. A surface with forms standing
 * on it, one of them broken; the threshold beneath which force ceases to be
 * expressed; percolation through the strata; a scar cut by repeated
 * descents; the confluence where currents meet and a reservoir begins;
 * relics and an ember in the reservoir; the pressure that seeks release; an
 * upwelling that reaches the surface uninvited; a well, with a membrane
 * across it, through which force may be drawn up on purpose; and an artesian
 * spring that rises clean because a true opening was made. Take a word and
 * the place lights.
 */
export function AquiferSection() {
  const [sel, setSel] = useState<string | null>(null);
  const F = [
    { k: "Threshold", at: [196, 92], d: "The threshold of Katadynamis: the level beneath which force ceases to be actively expressed. Passing it is the settling of force into latency — not its destruction." },
    { k: "Percolation", at: [150, 128], d: "Pneumic Percolation. Below the threshold, force seeps through the subtle strata according to affinity, pressure, permeability and the pathways cut before it came." },
    { k: "Scar", at: [76, 158], d: "An Aitheric Scar: a channel carved by repeated descents, through which similar forces afterwards travel more easily. The law of the channel, read downward." },
    { k: "Confluence", at: [175, 184], d: "An Aitheric Confluence: where many descending currents meet and a reservoir begins — holding contents that may be far older than any person now touched by them." },
    { k: "Reservoir", at: [175, 238], d: "The Aquifer itself: the saturated stratum of Morphaithēr, dense, memory-bearing and low in light. It carries too much history to be neutral and too little definition to be a world of images." },
    { k: "Strata", at: [30, 226], d: "The depth is not one darkness. Its deposits belong to different times, places, kinds of experience and degrees of formation — some ancient and clear, some turbid with incompatible residues." },
    { k: "Morphorelics", at: [108, 268], d: "Surviving formative remnants: no longer complete forms and not yet formless energy. A partial pattern, an abandoned gesture, a broken law of organisation, a capacity that never found its body." },
    { k: "Cryptopyrosis", at: [226, 282], d: "The hidden fire in the depth: light that was never destroyed, only occluded, waiting below as pressure until a form becomes capable of bearing it." },
    { k: "Pneumotension", at: [262, 264], d: "The pressure of subtle force seeking release. What looks dead at the surface may be intensely active below." },
    { k: "Upwelling", at: [232, 118], d: "Morphogenic Pressure exceeding what the strata can contain: submerged patterns rising as a cluster of dreams, a revived symbol, an obsession, a repetition — with ancient gravity and no guarantee of truth." },
    { k: "Well", at: [312, 84], d: "A local shaft through which deeper currents can rise — the human being, whose etheric body, memory, imagination, ancestry and place open into the depth without containing it." },
    { k: "Hierosmosis", at: [290, 166], d: "A consecrated form as a selective membrane across the well: it lets compatible sacred force through and resists the indiscriminate mixing of strata." },
    { k: "Anodos", at: [291, 214], d: "The upward return: submerged force released from a dead form and re-patterned into a higher one. The way this layer leaves the depth." },
    { k: "Artesian spring", at: [340, 40], d: "A clean pressure from the depths rising without coercion, because a true opening has finally been formed. The future entering through what the past could not complete." },
  ];
  const on = (k: string) => sel === k;
  const dim = (k: string) => (sel && sel !== k ? 0.18 : 1);
  const cur = F.find((f) => f.k === sel);
  const G = "var(--gold, #c9a227)";
  const lbl = (k: string) => ({ ...fs(6.6), letterSpacing: "0.14em" });

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center">
      <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[420px]">
        <style>{`
          .aoh-aq-seep { stroke-dasharray: 2 5; animation: aoh-aq-run 5s linear infinite; }
          .aoh-aq-rise { stroke-dasharray: 3 6; animation: aoh-aq-up 4s linear infinite; }
          .aoh-aq-ember { animation: aoh-aq-glow 4s ease-in-out infinite; }
          @keyframes aoh-aq-run { to { stroke-dashoffset: -14 } }
          @keyframes aoh-aq-up { to { stroke-dashoffset: 18 } }
          @keyframes aoh-aq-glow { 0%, 100% { opacity: 0.45 } 50% { opacity: 0.95 } }
          .aoh-aq-h { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-aq-seep, .aoh-aq-rise, .aoh-aq-ember { animation: none } }
        `}</style>
        <svg viewBox="0 0 360 300" className="h-auto w-full" role="img" aria-labelledby="aoh-aq-t">
          <title id="aoh-aq-t">
            The Black Aquifer in section: forms on a surface, the threshold beneath which force settles,
            percolation through strata to a confluence and a dark reservoir holding relics and an ember, an
            upwelling reaching the surface, a well with a membrane across it, and an artesian spring rising clean.
          </title>
          {/* the surface, and what stands on it */}
          <line x1={10} y1={64} x2={350} y2={64} stroke="currentColor" strokeOpacity={0.55} strokeWidth={0.9} />
          <path d="M 58 40 L 61 62 Q 70 66 79 62 L 82 40" fill="none" stroke="currentColor" strokeOpacity={0.8} strokeWidth={0.9} />
          <path d="M 138 40 L 141 62 Q 150 66 159 62 L 162 40" fill="none" stroke="currentColor" strokeOpacity={0.6 * dim("Threshold")} strokeWidth={0.9} strokeDasharray="3 3" />
          <path d="M 196 46 L 196 62 M 214 46 L 214 62 M 192 46 L 218 46" fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.8} />
          {/* the threshold of katadynamis */}
          <line x1={10} y1={96} x2={350} y2={96} stroke={G} strokeOpacity={0.5 * dim("Threshold")} strokeWidth={0.8} strokeDasharray="4 5" />
          {/* the strata */}
          {[130, 160, 190, 262, 288].map((y, i) => (
            <path key={y} d={`M 10 ${y} C 90 ${y - 6}, 150 ${y + 6}, 230 ${y} S 320 ${y - 4}, 350 ${y}`} fill="none" stroke="currentColor" strokeOpacity={(0.12 + i * 0.03) * dim("Strata")} strokeWidth={0.6} />
          ))}
          {/* percolation from the broken form */}
          <path d="M 150 66 C 152 90, 140 110, 152 132 C 162 150, 166 168, 175 194" fill="none" stroke={G} strokeOpacity={0.6 * dim("Percolation")} strokeWidth={1} className="aoh-aq-seep" />
          <path d="M 144 66 C 130 96, 150 118, 138 150 C 132 166, 160 176, 175 194" fill="none" stroke={G} strokeOpacity={0.35 * dim("Percolation")} strokeWidth={0.8} className="aoh-aq-seep" />
          {/* the scar: a cut channel from the standing form */}
          <path d="M 70 66 C 66 100, 88 130, 110 150 C 130 168, 158 180, 175 194" fill="none" stroke="currentColor" strokeOpacity={0.5 * dim("Scar")} strokeWidth={3.2} strokeLinecap="round" />
          <path d="M 70 66 C 66 100, 88 130, 110 150 C 130 168, 158 180, 175 194" fill="none" stroke={G} strokeOpacity={0.7 * dim("Scar")} strokeWidth={0.9} className="aoh-aq-seep" />
          {/* confluence */}
          <circle cx={175} cy={194} r={3} fill={G} fillOpacity={0.9 * dim("Confluence")} />
          <line x1={175} y1={197} x2={175} y2={224} stroke={G} strokeOpacity={0.6 * dim("Confluence")} strokeWidth={1} />
          {/* the reservoir */}
          <ellipse cx={175} cy={244} rx={74} ry={18} fill="var(--void, #000)" fillOpacity={0.85 * dim("Reservoir")} stroke={G} strokeOpacity={0.5 * dim("Reservoir")} strokeWidth={0.9} />
          <ellipse cx={175} cy={244} rx={74} ry={18} fill="currentColor" fillOpacity={0.05 * dim("Reservoir")} />
          {/* relics in the water */}
          <g opacity={dim("Morphorelics")}>
            <path d="M 126 240 L 128 250 Q 133 253 138 250" fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={0.7} />
            <path d="M 146 248 L 154 246" fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.7} />
            <path d="M 118 254 Q 122 258 126 254" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.7} />
          </g>
          {/* the ember */}
          <circle cx={214} cy={252} r={3.4} fill={G} className="aoh-aq-ember" opacity={0.7 * dim("Cryptopyrosis")} />
          <circle cx={214} cy={252} r={7} fill="none" stroke={G} strokeOpacity={0.25 * dim("Cryptopyrosis")} strokeWidth={0.6} />
          {/* pressure */}
          <g opacity={dim("Pneumotension")}>
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M ${252 + i * 6} ${236 - i * 2} q 4 8 0 16`} fill="none" stroke={G} strokeOpacity={0.45 - i * 0.12} strokeWidth={0.7} />
            ))}
          </g>
          {/* the upwelling */}
          <path d="M 226 230 C 240 200, 222 150, 232 100 C 236 84, 232 74, 232 66" fill="none" stroke={G} strokeOpacity={0.55 * dim("Upwelling")} strokeWidth={0.9} className="aoh-aq-rise" />
          <path d="M 222 60 q 5 -4 10 0 t 10 0" fill="none" stroke={G} strokeOpacity={0.6 * dim("Upwelling")} strokeWidth={0.7} />
          {/* the well, its membrane, and the way up */}
          <path d="M 296 64 L 296 232 M 306 64 L 306 232" fill="none" stroke="currentColor" strokeOpacity={0.6 * dim("Well")} strokeWidth={0.8} />
          <path d="M 292 60 L 310 60" fill="none" stroke="currentColor" strokeOpacity={0.6 * dim("Well")} strokeWidth={1} />
          <path d="M 296 152 L 306 152 M 296 156 L 306 156 M 296 160 L 306 160" fill="none" stroke={G} strokeOpacity={0.8 * dim("Hierosmosis")} strokeWidth={0.7} strokeDasharray="1.2 1.6" />
          <path d="M 301 226 L 301 76" fill="none" stroke={G} strokeOpacity={0.6 * dim("Anodos")} strokeWidth={0.9} className="aoh-aq-rise" />
          <polygon points="297,80 301,72 305,80" fill={G} fillOpacity={0.8 * dim("Anodos")} />
          {/* the artesian spring */}
          <path d="M 340 262 L 340 64" fill="none" stroke={G} strokeOpacity={0.5 * dim("Artesian spring")} strokeWidth={0.9} className="aoh-aq-rise" />
          <path d="M 340 64 C 340 56, 336 52, 334 48 M 340 64 C 340 56, 344 52, 346 48 M 340 64 L 340 50" fill="none" stroke={G} strokeOpacity={0.7 * dim("Artesian spring")} strokeWidth={0.7} />
          {/* labels */}
          {F.map((f) => (
            <text key={f.k} x={f.at[0]} y={f.at[1]} textAnchor={f.k === "Strata" || f.k === "Well" || f.k === "Pneumotension" ? "start" : f.k === "Hierosmosis" || f.k === "Artesian spring" || f.k === "Anodos" ? "end" : "middle"}
                  className="aoh-aq-h font-mono uppercase" style={lbl(f.k)} fill={on(f.k) ? G : "currentColor"} fillOpacity={on(f.k) ? 1 : 0.55 * dim(f.k)}
                  onClick={() => setSel(on(f.k) ? null : f.k)}>
              {f.k}
            </text>
          ))}
        </svg>
      </div>
      <div className="min-h-[9rem]">
        <div className="flex flex-wrap gap-2">
          {F.map((f) => (
            <button key={f.k} onClick={() => setSel(on(f.k) ? null : f.k)} aria-pressed={on(f.k)}
                    className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${on(f.k) ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40"}`}>
              {f.k}
            </button>
          ))}
        </div>
        <p className="mt-6 font-serif text-2xl text-gold">{cur?.k ?? "Take a word"}</p>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          {cur?.d ?? "Fourteen terms, one section of the subtle ground. Each names a relation force has to the depth it settles into — and none is the depth itself."}
        </p>
      </div>
    </div>
  );
}
