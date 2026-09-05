import { useState } from "react";

/**
 * Carriers — tradition as a redundant constellation. Every carrier can be lost,
 * and the pattern stays triangulable well past the loss of any single one, which
 * is the claim: no carrier contains the whole, and convergence is what survives
 * Transductive Loss. Strike enough of them out and recognition degrades by
 * degrees rather than switching off.
 */
export function Carriers() {
  const C = ["Texts", "Gestures", "Rhythms", "Prohibitions", "Stories",
             "Exemplars", "Offices", "Material forms", "Interpretive habits", "Embodied practice"];
  const [lost, setLost] = useState<number[]>([]);
  const [mode, setMode] = useState(0);
  const MODES = [
    { k: "Living", d: "Transmits formative capacity. It still produces recognition, transformation, competent practitioners, and meaningful adaptations." },
    { k: "Preserved", d: "Retains morphology, but no longer reliably reproduces the capacity that gave the morphology its meaning." },
    { k: "Parasitic", d: "Remains fully operational, while its operative end has shifted toward preserving the collective form by consuming the vitality, freedom, or resources of its participants." },
  ];
  const held = C.length - lost.length;
  const state = held >= 8 ? "RECOGNISED" : held >= 5 ? "TRIANGULABLE" : held >= 3 ? "ATTENUATED" : held >= 1 ? "MORPHOLOGY ONLY" : "UNRECOVERABLE";
  const CX = 170, CY = 168;
  const pt = (i: number, r: number) => {
    const a = (-90 + i * 36) * (Math.PI / 180);
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[400px]">
        <svg viewBox="-24 0 388 360" className="h-auto w-full" role="img" aria-labelledby="aoh-cr-t">
          <title id="aoh-cr-t">
            Ten carriers arranged around a central pattern, each connected to it. Carriers can be
            struck out; the pattern degrades by degrees rather than failing at once.
          </title>
          {C.map((_, i) => {
            const [x, y] = pt(i, 118);
            const gone = lost.includes(i);
            return (
              <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="var(--gold)"
                    strokeOpacity={gone ? 0.07 : 0.4}
                    strokeDasharray={gone ? "2 6" : "none"} strokeWidth="0.9" />
            );
          })}
          <circle cx={CX} cy={CY} r="42" fill="var(--void)" stroke="var(--gold)"
                  strokeOpacity={held >= 5 ? 0.9 : held >= 3 ? 0.45 : 0.2}
                  strokeWidth={held >= 5 ? 1.6 : 1}
                  strokeDasharray={held >= 5 ? "none" : "4 5"} />
          <text x={CX} y={CY - 4} textAnchor="middle" className="font-label" fontSize="7"
                letterSpacing="1" fill="var(--muted-foreground)">PATTERN</text>
          <text x={CX} y={CY + 9} textAnchor="middle" className="font-label" fontSize="6.6"
                letterSpacing="0.9"
                fill={held >= 5 ? "var(--gold)" : "var(--bone)"} fillOpacity={held >= 5 ? 1 : 0.6}>
            {state}
          </text>
          <text x={CX} y={CY + 24} textAnchor="middle" className="font-label" fontSize="6.2"
                fill="var(--muted-foreground)">{held} / {C.length} HELD</text>

          {C.map((c, i) => {
            const [x, y] = pt(i, 118);
            const gone = lost.includes(i);
            const right = x > CX + 4, mid = Math.abs(x - CX) <= 4;
            return (
              <g key={c} style={{ cursor: "pointer" }}
                 onClick={() => setLost((l) => l.includes(i) ? l.filter((v) => v !== i) : [...l, i])}
                 role="button" tabIndex={0} aria-pressed={gone} aria-label={`${c}${gone ? " (lost)" : ""}`}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLost((l) => l.includes(i) ? l.filter((v) => v !== i) : [...l, i]); } }}>
                <circle cx={x} cy={y} r="6" fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={gone ? 0.2 : 0.85} strokeWidth="1" />
                {gone && (
                  <>
                    <line x1={x - 4} y1={y - 4} x2={x + 4} y2={y + 4} stroke="var(--bone)" strokeOpacity="0.5" strokeWidth="0.9" />
                    <line x1={x - 4} y1={y + 4} x2={x + 4} y2={y - 4} stroke="var(--bone)" strokeOpacity="0.5" strokeWidth="0.9" />
                  </>
                )}
                {(() => {
                  // a two-word carrier beside the ring stands on two lines, so the
                  // capitals do not run out of the box
                  const parts = !mid && c.includes(" ") ? c.split(" ") : [c];
                  const lx = mid ? x : right ? x + 11 : x - 11;
                  const ly = mid ? (y < CY ? y - 12 : y + 17) : y + 3;
                  return (
                    <text x={lx} y={parts.length > 1 ? ly - 5 : ly}
                          textAnchor={mid ? "middle" : right ? "start" : "end"}
                          className="font-label" fontSize="6.6" letterSpacing="0.5"
                          fill={gone ? "var(--muted-foreground)" : "var(--bone)"}
                          opacity={gone ? 0.4 : 0.9}>
                      {parts.length > 1 ? parts.map((w, k) => <tspan key={w} x={lx} dy={k ? 9 : 0}>{w.toUpperCase()}</tspan>) : c.toUpperCase()}
                    </text>
                  );
                })()}
              </g>
            );
          })}
          <text x={CX} y="348" textAnchor="middle" className="font-label" fontSize="6.6"
                letterSpacing="1.1" fill="var(--muted-foreground)" opacity="0.8">
            STRIKE OUT CARRIERS — NO ONE OF THEM HOLDS THE WHOLE
          </text>
        </svg>
        {lost.length > 0 && (
          <div className="mt-3 flex justify-center">
            <button onClick={() => setLost([])}
              className="border border-border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-gold hover:text-gold">
              restore all carriers
            </button>
          </div>
        )}
      </div>

      <div className="min-h-[15rem]">
        <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          Three states a tradition can be in
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {MODES.map((m, i) => (
            <button key={m.k} onClick={() => setMode(i)} aria-pressed={mode === i}
              className={`border px-3 py-1.5 text-xs transition-colors ${
                mode === i ? (i === 2 ? "border-bone/60 text-bone" : "border-gold text-gold")
                           : "border-border text-muted-foreground hover:border-gold/60"}`}>
              {m.k}
            </button>
          ))}
        </div>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{MODES[mode].d}</p>
        {mode === 2 && (
          <p className="mt-4 text-sm leading-relaxed text-bone/65">
            Which means a parasitic tradition is not simply dead. It is a living collective mechanism
            organised around the survival of an emptied or displaced telos — § XXVIII&rsquo;s
            institutions preserving the rule long after losing the value.
          </p>
        )}
        <p className="mt-8 text-sm leading-relaxed text-bone/60">
          {lost.length === 0
            ? "Every carrier is intact. Strike some out to see how much can be lost before recognition fails."
            : held >= 5
              ? `${lost.length} lost, and the pattern is still triangulable from what converges on it.`
              : held >= 1
                ? `${lost.length} lost. What remains carries shape without reliably carrying the capacity to read it.`
                : "Nothing converges. Words and forms may survive in an archive; the perception that reads them does not."}
        </p>
      </div>
    </div>
  );
}

/**
 * ArchitectureIndex — the index, plus routes through it. Forty sections in
 * sequence is a catalogue, not a way in; a path names a defensible order and a
 * reason for each step. Selecting one marks its members in place rather than
 * extracting them, so the route stays visible inside the whole.
 */
