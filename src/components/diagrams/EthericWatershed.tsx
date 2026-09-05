import { fs } from "./fig";

import { useState } from "react";

/**
 * EthericWatershed — one catchment carrying the whole vocabulary.
 *
 * A watershed is not the water: it is the architecture that decides where
 * water can go. So this is a landscape and not a flowchart — a ridge that
 * bounds it, a spring where hidden influence surfaces, channels that meet at
 * a confluence, a threshold that regulates passage, a filter that alters what
 * passes, a reservoir that holds, a dam that blocks and accumulates, and a
 * delta where one current becomes many. The three failures are here too, as
 * places rather than arrows: a dry channel, a flooded margin, a pool with no
 * outlet. Take a word and the place lights.
 */
export function EthericWatershed() {
  const [sel, setSel] = useState<string | null>(null);
  const F = [
    { k: "Watershed", at: [160, 14], d: "The total architecture governing circulation: not the current, but everything that decides what enters, where it travels, what is kept, filtered, blocked, transformed and released." },
    { k: "Spring", at: [92, 52], d: "Hidden influence emerging into expression. What surfaces here was moving before it was visible." },
    { k: "Channel", at: [128, 108], d: "What conducts influence. Cut by flow, and afterwards deciding where flow goes." },
    { k: "Confluence", at: [172, 134], d: "Currents meeting. Where two histories of movement become one current with both in it." },
    { k: "Threshold", at: [174, 166], d: "What regulates passage: a weir, a gate, a rite of entry. Nothing crosses without being changed in rate or measure." },
    { k: "Filter", at: [176, 194], d: "What modifies what passes through. Not a wall: a difference between what enters and what leaves." },
    { k: "Reservoir", at: [166, 226], d: "What stores or concentrates influence against time — for later use, or, without an outlet, for stagnation." },
    { k: "Dam", at: [228, 226], d: "What obstructs and accumulates. Some dams are made to hold; some are simply where the channel failed." },
    { k: "Delta", at: [176, 276], d: "One current differentiating into many expressions as it slows and spreads. The Sap's delta is this figure." },
    { k: "Drought", at: [54, 176], d: "Insufficient formative nourishment: the channel is there and nothing moves in it." },
    { k: "Flood", at: [262, 150], d: "More influence than the structure can integrate. Overflow is not abundance; it is what a vessel could not take up." },
    { k: "Stagnation", at: [258, 236], d: "Accumulation without healthy circulation: a pool the current reached and never left." },
  ];
  const on = (k: string) => sel === k;
  const dim = (k: string) => (sel && sel !== k ? 0.18 : 1);
  const cur = F.find((f) => f.k === sel);
  const G = "var(--gold, #c9a227)";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="aoh-fig aoh-fig-tight mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-ws-flow { stroke-dasharray: 4 7; animation: aoh-ws-run 3.6s linear infinite; }
          @keyframes aoh-ws-run { to { stroke-dashoffset: -22 } }
          .aoh-ws-h { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-ws-flow { animation: none } }
        `}</style>
        <svg viewBox="0 0 320 300" className="h-auto w-full" role="img" aria-labelledby="aoh-ws-t">
          <title id="aoh-ws-t">
            One catchment: a ridge bounding it, a spring, channels meeting at a confluence, a threshold,
            a filter, a reservoir with a dam, a delta at the foot, and beside them a dry channel, a flooded
            margin and a pool with no outlet.
          </title>
          {/* the ridge — the boundary of the watershed */}
          <path d="M 12 40 Q 80 6 160 22 Q 240 38 308 26" fill="none" stroke="currentColor" strokeOpacity={0.35 * dim("Watershed")} strokeWidth={1.1} />
          <path d="M 12 40 L 8 300 M 308 26 L 312 300" fill="none" stroke="currentColor" strokeOpacity={0.14 * dim("Watershed")} strokeWidth={0.6} strokeDasharray="2 4" />
          {/* spring */}
          <g opacity={dim("Spring")}>
            <circle cx={92} cy={62} r={4} fill="none" stroke={G} strokeWidth={1} />
            <circle cx={92} cy={62} r={1.6} fill={G} />
          </g>
          {/* channels to the confluence */}
          <path d="M 92 66 C 100 84, 118 96, 132 112 C 148 128, 160 130, 170 140" fill="none" stroke={G} strokeOpacity={0.7 * dim("Channel")} strokeWidth={1.2} className="aoh-ws-flow" />
          <path d="M 236 58 C 226 88, 200 110, 184 130 C 178 136, 174 138, 170 140" fill="none" stroke={G} strokeOpacity={0.5 * dim("Channel")} strokeWidth={1} className="aoh-ws-flow" />
          <circle cx={170} cy={140} r={2.4} fill={G} opacity={dim("Confluence")} />
          {/* threshold: a weir line across the channel */}
          <line x1={158} y1={168} x2={186} y2={168} stroke="currentColor" strokeOpacity={0.9 * dim("Threshold")} strokeWidth={1.6} />
          <path d="M 170 140 L 172 168" fill="none" stroke={G} strokeOpacity={0.7 * dim("Channel")} strokeWidth={1.2} />
          {/* filter: a stippled band */}
          <g opacity={dim("Filter")}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => <circle key={i} cx={160 + i * 4.2} cy={196} r={0.9} fill="currentColor" fillOpacity={0.7} />)}
            {[0, 1, 2, 3, 4, 5].map((i) => <circle key={"b" + i} cx={162 + i * 4.2} cy={200} r={0.9} fill="currentColor" fillOpacity={0.5} />)}
          </g>
          <path d="M 172 168 L 174 192 M 174 204 L 176 216" fill="none" stroke={G} strokeOpacity={0.7 * dim("Channel")} strokeWidth={1.2} />
          {/* reservoir with a dam on its right */}
          <ellipse cx={176} cy={230} rx={22} ry={9} fill={G} fillOpacity={0.14 * dim("Reservoir")} stroke={G} strokeOpacity={0.5 * dim("Reservoir")} strokeWidth={0.8} />
          <line x1={198} y1={218} x2={200} y2={242} stroke="currentColor" strokeOpacity={0.9 * dim("Dam")} strokeWidth={2.2} />
          {/* the delta */}
          <g opacity={dim("Delta")}>
            <path d="M 176 239 L 176 252" fill="none" stroke={G} strokeOpacity={0.7} strokeWidth={1.2} />
            {[-30, -18, -7, 6, 17, 29].map((dx, i) => (
              <path key={i} d={`M 176 252 C 176 262, ${176 + dx * 0.5} 270, ${176 + dx} 290`} fill="none" stroke={G} strokeOpacity={0.55} strokeWidth={0.8} />
            ))}
          </g>
          {/* drought: a dry channel on the left */}
          <path d="M 40 120 C 48 150, 44 180, 56 214" fill="none" stroke="currentColor" strokeOpacity={0.45 * dim("Drought")} strokeWidth={0.9} strokeDasharray="1.5 3.5" />
          {/* flood: overflow lines at the right margin */}
          <g opacity={dim("Flood")}>
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M ${236 + i * 10} 132 q 8 6 16 2 q 8 -4 16 2`} fill="none" stroke={G} strokeOpacity={0.45} strokeWidth={0.8} />
            ))}
          </g>
          {/* stagnation: a pool with no outlet */}
          <ellipse cx={262} cy={250} rx={16} ry={7} fill="currentColor" fillOpacity={0.1 * dim("Stagnation")} stroke="currentColor" strokeOpacity={0.4 * dim("Stagnation")} strokeWidth={0.7} />
          <path d="M 236 58 L 244 210 L 262 243" fill="none" stroke="currentColor" strokeOpacity={0.14 * dim("Stagnation")} strokeWidth={0.6} strokeDasharray="2 4" />
          {/* labels */}
          {F.map((f) => (
            <text key={f.k} x={f.at[0]} y={f.at[1]} textAnchor="middle" className="aoh-ws-h font-label uppercase"
                  style={{ ...fs(6.6), letterSpacing: "0.14em" }} fill={on(f.k) ? G : "currentColor"} fillOpacity={on(f.k) ? 1 : 0.55 * dim(f.k)}
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
                    className={`border px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.14em] transition-colors ${on(f.k) ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40"}`}>
              {f.k}
            </button>
          ))}
        </div>
        <p className="mt-6 font-serif text-2xl text-gold">{cur?.k ?? "Take a word"}</p>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          {cur?.d ?? "Twelve terms, one landscape. Each names a relation the current has to the architecture it moves through — and none is the current itself."}
        </p>
      </div>
    </div>
  );
}
