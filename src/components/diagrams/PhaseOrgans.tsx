import { useState } from "react";

/**
 * PhaseOrgans — the Five Phases carrying their organ networks, virtues, emotions
 * and spirits. Distinct from WuxingCycles in § XV, which draws the generating and
 * regulating cycles; this one is the interior ecology, phase by phase.
 * Fire sits at the top, matching the orientation used there.
 */
export function PhaseOrgans() {
  const [sel, setSel] = useState<number | null>(null);
  const C = 168, R = 108;
  const P = [
    { z: "火", k: "Fire", ang: -90, move: "Expanding, radiating, connecting",
      org: "Heart and Small Intestine — with Pericardium and Triple Burner in the broader schemes",
      virt: "Presence, warmth, communication", emo: "Joy",
      emoOK: "expansion, connection, radiant participation",
      emoOff: "scattered stimulation that cannot settle into relationship",
      sp: "Shen", spD: "illuminates and unifies conscious presence" },
    { z: "土", k: "Earth", ang: -18, move: "Receiving, transforming, assimilating",
      org: "Spleen and Stomach", virt: "Nourishment, stability, integration", emo: "Thought · concern",
      emoOK: "assimilation, reflection, care, the digestion of experience",
      emoOff: "circling without ever reaching assimilation",
      sp: "Yi", spD: "concentrates, considers, and assimilates" },
    { z: "金", k: "Metal", ang: 54, move: "Differentiating, contracting, releasing",
      org: "Lung and Large Intestine", virt: "Discernment, rhythm, boundary", emo: "Grief",
      emoOK: "separation, acknowledgment of finitude, release",
      emoOff: "contraction of the field until nothing new can enter",
      sp: "Po", spD: "binds awareness to sensation, embodiment, and mortality" },
    { z: "水", k: "Water", ang: 126, move: "Descending, storing, conserving",
      org: "Kidney and Bladder", virt: "Depth, endurance, renewal", emo: "Fear",
      emoOK: "descent, caution, conservation, protection of deep reserves",
      emoOff: "force drawn continually downward and away from action",
      sp: "Zhi", spD: "preserves deep intention, endurance, and will" },
    { z: "木", k: "Wood", ang: 198, move: "Arising, branching, directing",
      org: "Liver and Gallbladder", virt: "Initiative, flexibility, vision", emo: "Anger",
      emoOK: "mobilization, boundary defence, power to overcome obstruction",
      emoOff: "still rising after the danger has passed",
      sp: "Hun", spD: "projects images, possibilities, and future paths" },
  ];
  const pt = (a: number, r = R) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)];
  const cur = sel === null ? null : P[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <style>{`
          .aoh-po-ring { animation: aoh-po-turn 90s linear infinite; transform-origin: 168px 168px; }
          @keyframes aoh-po-turn { to { transform: rotate(360deg) } }
          .aoh-po-n { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-po-ring { animation: none } }
        `}</style>
        <svg viewBox="0 0 336 336" className="h-auto w-full" role="img" aria-labelledby="aoh-po-t">
          <title id="aoh-po-t">
            The Five Phases with their organ networks: Fire, Earth, Metal, Water and Wood set
            clockwise, generating around the rim.
          </title>
          <circle className="aoh-po-ring" cx={C} cy={C} r={R} fill="none" stroke="var(--gold)"
                  strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="2 9" />
          {P.map((_, i) => {
            const [x0, y0] = pt(P[i].ang);
            const [x1, y1] = pt(P[(i + 1) % 5].ang);
            const d = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / d, uy = (y1 - y0) / d;
            const on = sel === i;
            return (
              <line key={i} x1={x0 + ux * 30} y1={y0 + uy * 30} x2={x1 - ux * 30} y2={y1 - uy * 30}
                stroke="var(--gold)" strokeOpacity={sel === null ? 0.4 : on ? 1 : 0.12}
                strokeWidth={on ? 1.8 : 1} />
            );
          })}
          {P.map((n, i) => {
            const [x, y] = pt(n.ang);
            const on = sel === i;
            const next = sel !== null && (sel + 1) % 5 === i;
            return (
              <g key={n.k} className="aoh-po-n" onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={n.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={x} cy={y} r="28" fill="var(--void)" />
                <circle cx={x} cy={y} r="28" fill="none" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : next ? 0.8 : 0.5} strokeWidth={on ? 1.8 : 1} />
                <text x={x} y={y + 6} textAnchor="middle" className="font-serif" fontSize="18"
                      fill="var(--gold)" fillOpacity={on || sel === null ? 1 : 0.45}>{n.z}</text>
                <text x={x} y={y + 44} textAnchor="middle" className="font-mono" fontSize="7"
                      letterSpacing="1.4" fill="var(--muted-foreground)">{n.k.toUpperCase()}</text>
              </g>
            );
          })}
        </svg>
        <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          generating, clockwise
        </p>
      </div>

      <div className="min-h-[17rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.z} · {cur.k} — {cur.move}
            </p>
            <div className="mt-4 space-y-px">
              {[["Organ network", cur.org], ["Formative virtue", cur.virt],
                [`Spirit · ${cur.sp}`, cur.spD]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[8.5rem_1fr] items-baseline gap-4 border-b border-border py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold-dim">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="border-t border-gold/50 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {cur.emo} — in its office
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cur.emoOK}</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  When it will not complete
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cur.emoOff}</p>
              </div>
            </div>
            <p className="mt-5 text-[11px] leading-relaxed text-bone/60">
              Not an emotion stored in an organ. Emotion, breath, bodily state, and interpretation
              participate in one mutually reinforcing configuration.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A complete metabolism of manifestation. Water preserves latent possibility; Wood
              initiates its emergence; Fire brings it into expression; Earth receives and
              incorporates its consequences; Metal distils what is valuable and releases what is
              finished; and Water receives the essence that remains, carrying it back into latency.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Which is where this meets the Crypt and the Ossuary — Metal dismantles completed
              formations, Water receives their distilled inheritance, and Wood lets a new form arise
              from a field already conditioned by what preceded it.
            </p>
            <p className="mt-4 font-serif text-lg italic leading-relaxed text-bone/85">
              Health is not the supremacy of one phase. It is the ability to move among all five
              without becoming trapped in any of them.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * ImaginalBridge — the six stages between an unrepresented force and an
 * embodied response. The bridge runs both ways, so the flow markers and the
 * transition text reverse with direction rather than being redrawn.
 */
