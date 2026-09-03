import { useState } from "react";

/**
 * VesselAndMeasure — Or Yashar, Or Chozer, and what happens at the rim.
 *
 * Lurianic Kabbalah names two lights, not one: the light that descends straight
 * from the source, and the light the vessel returns. The vessel is where they
 * meet, and it has a measure. Under it, what descends comes back; at it, the two
 * agree; past it, the vessel breaks, and the excess is not returned but
 * scattered, with sparks of the light caught in the shards. The slider gives the
 * source, the bowl keeps its capacity, and the figure shows which of the three
 * conditions the reader has made.
 */
export function VesselAndMeasure() {
  const [light, setLight] = useState(46);
  const CAP = 68;
  const held = Math.min(light, CAP);
  const over = Math.max(0, light - CAP) / (100 - CAP);
  const state =
    light === 0 ? "dark" : light < CAP - 4 ? "under" : light <= CAP + 3 ? "full" : "broken";

  const CX = 170, RIM = 176, BOT = 262, L = 104, R = 236;
  const level = BOT - (held / CAP) * (BOT - RIM);
  const bowl = `M${L} ${RIM} C ${L + 6} ${BOT + 30}, ${R - 6} ${BOT + 30}, ${R} ${RIM}`;

  const readout = {
    dark: "NOTHING GIVEN — NOTHING TO RETURN",
    under: `GIVEN ${light} · RETURNED ${held} · UNDER THE MEASURE`,
    full: `GIVEN ${light} · RETURNED ${held} · AT THE MEASURE`,
    broken: `GIVEN ${light} · RETURNED — · THE VESSEL HAS BROKEN`,
  }[state];

  const TEXT = {
    dark: {
      k: "No light given",
      a: "A vessel with nothing to return is not at fault; it is unlit. Its measure only becomes visible when something is asked of it.",
      b: "Which is why capacity cannot be judged in the dark — in a person, a practice, or an institution that has never been given anything to hold.",
    },
    under: {
      k: "Under the measure",
      a: "The vessel returns what it receives, and the return measures the vessel, not the source. A source giving less than the vessel can hold is not being careful; it is leaving capacity idle.",
      b: "This is the ordinary condition of most relation — adequate, and unfinished. The returning light is real, and there was room for more of it.",
    },
    full: {
      k: "At the measure",
      a: "What descends and what returns agree. The vessel is doing everything it was made for and nothing it was not; the light is neither hoarded above nor spilt below.",
      b: "Right measure is this agreement. Not moderation — the amount that leaves the vessel able to receive again, which is how § XLIV of the Architecture defined it for force in general.",
    },
    broken: {
      k: "Past the measure — the breaking",
      a: "The vessel cannot return what it cannot hold. The excess is not lost; it is scattered, and each shard carries a spark of the light that broke it. Lurianic teaching calls this shevirat ha-kelim, and makes the whole of the work that follows a gathering of sparks.",
      b: "The lesson is not that light is dangerous. It is that a vessel is a measure, and a source that ignores it does not give more — it gives elsewhere, and in pieces.",
    },
  }[state];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <svg viewBox="0 0 340 330" className="h-auto w-full" role="img" aria-labelledby="aoh-vm-t">
          <title id="aoh-vm-t">
            A source above a bowl. Straight light descends into the bowl, which fills to its
            measure and returns light upward; past the measure the bowl cracks and shards fall.
          </title>
          <defs>
            <clipPath id="aoh-vm-clip">
              <path d={`${bowl} Z`} />
            </clipPath>
            <radialGradient id="aoh-vm-src" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="var(--bone)" stopOpacity="0.9" />
              <stop offset="40%" stopColor="var(--gold)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* the source */}
          <circle cx={CX} cy="34" r={12 + light * 0.18} fill="url(#aoh-vm-src)"
                  opacity={0.15 + (light / 100) * 0.85} />
          <circle cx={CX} cy="34" r="4" fill="var(--bone)" fillOpacity={light === 0 ? 0.3 : 1} />

          {/* or yashar — the straight light */}
          {[-28, -14, 0, 14, 28].map((dx) => (
            <line key={dx} x1={CX + dx * 0.35} y1="48" x2={CX + dx} y2={RIM - 3}
                  stroke="var(--gold)" strokeOpacity={0.06 + (light / 100) * 0.74} strokeWidth="1" />
          ))}
          <text x="14" y="104" className="font-mono" fontSize="6.8" letterSpacing="1.2" fill="var(--gold-dim)">OR YASHAR</text>
          <text x="14" y="114" className="font-mono" fontSize="6" letterSpacing="0.8" fill="var(--muted-foreground)">straight light · descending</text>

          {/* or chozer — the returning light */}
          {[-46, -24, 24, 46].map((dx) => (
            <line key={dx} x1={CX + dx * 0.55} y1={RIM - 5} x2={CX + dx * 1.55} y2="66"
                  stroke="var(--bone)" strokeDasharray="3 3" strokeWidth="0.9"
                  strokeOpacity={state === "broken" ? 0.08 : state === "dark" ? 0 : 0.12 + (held / CAP) * 0.55} />
          ))}
          <text x="326" y="104" textAnchor="end" className="font-mono" fontSize="6.8" letterSpacing="1.2" fill="var(--bone)" opacity="0.75">OR CHOZER</text>
          <text x="326" y="114" textAnchor="end" className="font-mono" fontSize="6" letterSpacing="0.8" fill="var(--muted-foreground)">returning light · ascending</text>

          {/* the vessel */}
          <g clipPath="url(#aoh-vm-clip)">
            <rect x={L} y={level} width={R - L} height={BOT - level + 12} fill="var(--gold)" fillOpacity="0.22" />
          </g>
          <path d={bowl} fill="none" stroke="var(--bone)" strokeWidth="1.3"
                strokeOpacity={state === "broken" ? 0.45 : 0.85} />
          <line x1={L - 12} y1={RIM} x2={R + 12} y2={RIM} stroke="var(--gold)" strokeOpacity="0.55"
                strokeDasharray="1.5 3.5" />
          <text x={R + 16} y={RIM + 3} className="font-mono" fontSize="6" letterSpacing="1" fill="var(--gold-dim)">MEASURE</text>

          {/* the breaking */}
          <g opacity={over}>
            <path d={`M${CX - 22} ${RIM + 6} l -5 20 l 8 16 l -4 18`} fill="none" stroke="var(--bone)" strokeWidth="1" />
            <path d={`M${CX + 26} ${RIM + 4} l 4 18 l -7 14 l 3 16`} fill="none" stroke="var(--bone)" strokeWidth="1" />
            <path d={`M${CX + 2} ${RIM + 30} l -3 14 l 6 12`} fill="none" stroke="var(--bone)" strokeWidth="0.8" />
            {[[-52, 292], [-6, 304], [44, 296]].map(([dx, y]) => (
              <g key={dx} transform={`translate(${CX + dx} ${y + over * 8})`}>
                <polygon points="0,-8 9,5 -8,6" fill="none" stroke="var(--bone)" strokeOpacity="0.6" strokeWidth="0.8" />
                <circle r="1.7" fill="var(--gold)" />
              </g>
            ))}
          </g>

          <text x="170" y="324" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill={state === "broken" ? "var(--bone)" : "var(--gold)"} opacity="0.9">
            {readout}
          </text>
        </svg>
        <input type="range" min={0} max={100} step={1} value={light} aria-label="Light given by the source"
               onChange={(e) => setLight(parseInt(e.target.value, 10))}
               className="mt-3 w-full accent-[var(--gold)]" />
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          The slider gives the source. The bowl keeps its measure.
        </p>
      </div>

      <div className="min-h-[15rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">{TEXT.k}</p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{TEXT.a}</p>
        <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">{TEXT.b}</p>
      </div>
    </div>
  );
}
