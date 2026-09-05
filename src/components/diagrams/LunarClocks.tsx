import { useState } from "react";

/**
 * LunarClocks — the two cycles the section opens on, run against each other.
 * Sidereal return is 27.3 days, synodic 29.5, so the Moon comes back to the same
 * star before it comes back to the same phase. They drift, which is exactly why
 * any phase can occupy any mansion. The drift is computed, not asserted.
 */
export function LunarClocks() {
  const [day, setDay] = useState(0);
  const SID = 27.32, SYN = 29.53, N = 27;
  const C = 180, R = 132;
  const sid = (day / SID) % 1;
  const syn = (day / SYN) % 1;
  const mansion = Math.floor(sid * N);
  const ang = (i: number) => (-90 + (i / N) * 360) * (Math.PI / 180);
  const pt = (a: number, r: number) => [C + r * Math.cos(a), C + r * Math.sin(a)];
  const [mx, my] = pt((-90 + sid * 360) * (Math.PI / 180), R);
  const [sx, sy] = pt(-Math.PI / 2, R);

  const PHASE = syn < 0.03 || syn > 0.97 ? "New"
    : syn < 0.22 ? "Waxing crescent" : syn < 0.28 ? "First quarter"
    : syn < 0.47 ? "Waxing gibbous" : syn < 0.53 ? "Full"
    : syn < 0.72 ? "Waning gibbous" : syn < 0.78 ? "Last quarter" : "Waning crescent";
  const movement = syn < 0.5 ? "gathering, amplification" : "separation, release";

  // lit region of the disc
  const a = 2 * Math.PI * syn, r = 21;
  const rx = Math.abs(Math.cos(a)) * r;
  const outer = syn < 0.5 ? 1 : 0;
  const inner = Math.cos(a) > 0 ? 0 : 1;
  const moon = `M${C},${C - r} A${r},${r} 0 0 ${outer} ${C},${C + r} A${rx},${r} 0 0 ${inner} ${C},${C - r} Z`;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[360px]">
        <svg viewBox="0 0 360 372" className="h-auto w-full" role="img" aria-labelledby="aoh-lc-t">
          <title id="aoh-lc-t">
            A ring of twenty-seven stations with the Moon travelling it at sidereal rate, and a
            phase disc at the centre driven by the slower synodic cycle.
          </title>
          <circle cx={C} cy={C} r={R} fill="none" stroke="var(--gold)" strokeOpacity="0.28" strokeWidth="0.8" />
          {Array.from({ length: N }, (_, i) => {
            const on = i === mansion;
            const [x1, y1] = pt(ang(i), R - (on ? 12 : 6));
            const [x2, y2] = pt(ang(i), R + (on ? 8 : 4));
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gold)"
                         strokeOpacity={on ? 1 : 0.35} strokeWidth={on ? 2 : 0.8} />;
          })}
          {/* where it began, so the sidereal return is visible */}
          <circle cx={sx} cy={sy} r="4" fill="none" stroke="var(--bone)" strokeOpacity="0.5"
                  strokeDasharray="2 2" strokeWidth="1" />
          <circle cx={mx} cy={my} r="6.5" fill="var(--gold)" />

          <circle cx={C} cy={C} r={r} fill="none" stroke="var(--gold)" strokeOpacity="0.4" strokeWidth="0.9" />
          <path d={moon} fill="var(--gold)" fillOpacity="0.92" />

          <text x={C} y={C + 58} textAnchor="middle" className="font-label" fontSize="8"
                letterSpacing="1.4" fill="var(--gold)">MANSION {mansion + 1} / {N}</text>
          <text x={C} y={C + 72} textAnchor="middle" className="font-label" fontSize="7"
                letterSpacing="1.1" fill="var(--muted-foreground)">{PHASE.toUpperCase()}</text>
          <text x={C} y="352" textAnchor="middle" className="font-label" fontSize="7.2"
                letterSpacing="1.1" fill="var(--muted-foreground)">
            DAY {day.toFixed(1)} — SIDEREAL 27.32 DAYS · SYNODIC 29.53 DAYS
          </text>
          <text x={C} y="366" textAnchor="middle" className="font-label" fontSize="7"
                letterSpacing="1" fill="var(--gold)" opacity={day >= SID ? 0.95 : 0.55}>
            {day >= SID ? "SAME STAR — DIFFERENT PHASE" : "DASHED MARK IS WHERE IT BEGAN"}
          </text>
        </svg>
        <input type="range" min={0} max={60} step={0.1} value={day} aria-label="Days elapsed"
               onChange={(e) => setDay(parseFloat(e.target.value))}
               className="mt-3 h-6 w-full accent-[var(--gold)]" />
      </div>

      <div className="min-h-[15rem]">
        <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          Two clocks, running independently
        </p>
        <div className="mt-4 space-y-px">
          {[["Sidereal", `Mansion ${mansion + 1} of ${N}`, "the Moon against the starry field — 27.32 days"],
            ["Synodic", PHASE, "the Moon against the Sun — 29.53 days"],
            ["This phase favours", movement, "which the mansion then refines into a kind"]].map(([a2, b, c]) => (
            <div key={a2} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-border py-3">
              <span className="font-label text-[10px] uppercase tracking-[0.15em] text-gold">{a2}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                <span className="text-bone/90">{b}</span> — {c}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {day < SID
            ? "Move forward past day 27.3. The Moon returns to the dashed mark — the same station against the stars — while the phase has not yet come back to where it started."
            : "The Moon has returned to its station and the phase has not. Which is the whole point: these interlock without coinciding, so a waxing, full, or waning Moon can occupy any mansion whatever."}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-bone/60">
          Lunar phase describes the Moon&rsquo;s relation to the Sun. Lunar mansion describes its
          position against the starry field. Neither reduces to the other.
        </p>
      </div>
    </div>
  );
}

/**
 * ZodiacGrid — the twelve as a complete four-by-three, not a list of twelve
 * things. Elements are the medium formation occurs through; modalities are the
 * phase of activity. Every cell is one element in one phase, which is why there
 * are exactly twelve and not some other number.
 */
