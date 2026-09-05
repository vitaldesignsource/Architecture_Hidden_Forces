import { useState } from "react";

/**
 * Chon — carbon, hydrogen, oxygen and nitrogen as a crucible of relations.
 *
 * The section refuses the building-block image: none of the four is sufficient
 * alone, and life appears only through their ordered participation. So they are
 * drawn bonded rather than stacked, with the living vessel at the centre of what
 * they hold open between them.
 *
 * Each element is given both its question and its shadow, because the section
 * makes the same capacity responsible for both — carbon's power to hold a
 * pattern is also its power to petrify.
 */
export function Chon() {
  const [sel, setSel] = useState<string | null>(null);
  const [shadow, setShadow] = useState(false);

  const C = 170;

  const EL = [
    { s: "C", k: "Carbon", at: [170, 58], lab: 32,
      fn: "Stable molecular frameworks — chains, branches, rings, lattices. Four stable bonds, and so a material architecture that can be both stable and adaptable.",
      res: "Formative fixation · Salt",
      q: "How can a living pattern remain present long enough to become a body?",
      sh: "Excessive fixation. Carbon preserves, and preservation becomes rigidity — accumulation, obstruction, petrification, forms that resist necessary change. The blessing and the danger of having a definite form." },
    { s: "H", k: "Hydrogen", at: [273, 163], lab: 203,
      fn: "Mobility and bonding. Ion gradients across membranes give cells their usable energy: life establishes differences in concentration and draws activity from their controlled resolution.",
      res: "Potency held in polarity · Mercury, Warmth",
      q: "How can matter hold the possibility of movement?",
      sh: "Volatility without containment — force released before a structure is ready to receive it." },
    { s: "O", k: "Oxygen", at: [170, 268], lab: 308,
      fn: "Respiration and oxidation. Stored molecular structure is broken open so its potency returns to activity — the Law of Force and Form given a biological body: form is frozen force, force is liberated form.",
      res: "Liberated form · Sulfur, Light",
      q: "How can stored form be opened without destroying the vessel that contains it?",
      sh: "Combustion without proportion. Too little and the organism cannot sustain its work; too much ungoverned oxidation and the structures supporting life are consumed. Transformation becoming corrosion." },
    { s: "N", k: "Nitrogen", at: [67, 163], lab: 203,
      fn: "Amino acids, proteins, nucleic acids, signalling molecules. Carbon supplies the framework; nitrogen helps give living structures their specific function — this enzyme, this receptor, this sequence.",
      res: "Articulation · Tone",
      q: "How does structure become specific function?",
      sh: "Complexity that no longer serves the whole — elaborate articulation separated from living integration." },
  ];

  const cur = EL.find((e) => e.k === sel);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <svg viewBox="0 0 340 342" className="h-auto w-full" role="img" aria-labelledby="aoh-ch-t">
          <title id="aoh-ch-t">
            Carbon, hydrogen, oxygen and nitrogen drawn bonded to one another around a central
            living vessel.
          </title>

          {/* every element bonded to every other — a crucible, not four blocks */}
          {EL.map((a, i) =>
            EL.slice(i + 1).map((b) => (
              <line key={a.k + b.k} x1={a.at[0]} y1={a.at[1]} x2={b.at[0]} y2={b.at[1]}
                    stroke={shadow ? "var(--bone)" : "var(--gold)"}
                    strokeOpacity={sel && sel !== a.k && sel !== b.k ? 0.08 : shadow ? 0.2 : 0.28}
                    strokeWidth="0.9" />
            ))
          )}

          <circle cx={C} cy={163} r="34" fill="var(--void)" stroke="var(--gold)"
                  strokeOpacity={shadow ? 0.25 : 0.45} strokeDasharray="3 5" strokeWidth="0.9" />
          <text x={C} y="160" textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="0.9" fill="var(--gold)" opacity="0.85">LIVING</text>
          <text x={C} y="171" textAnchor="middle" className="font-label" fontSize="6.4"
                letterSpacing="0.9" fill="var(--gold)" opacity="0.85">VESSEL</text>

          {EL.map((e) => {
            const on = sel === e.k;
            const [x, y] = e.at;
            return (
              <g key={e.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : e.k)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={e.k}
                 onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : e.k); } }}>
                <circle cx={x} cy={y} r={on ? 27 : 23} fill="var(--void)"
                        stroke={shadow ? "var(--bone)" : "var(--gold)"}
                        strokeOpacity={on ? 1 : sel ? 0.25 : 0.7}
                        strokeDasharray={shadow ? "4 3" : "none"}
                        strokeWidth={on ? 1.8 : 1.1} />
                <text x={x} y={y + 6} textAnchor="middle" className="font-serif" fontSize="18"
                      fill={shadow ? "var(--bone)" : "var(--gold)"}
                      fillOpacity={on ? 1 : sel ? 0.3 : 0.9}>{e.s}</text>
                <text x={x} y={e.lab} textAnchor="middle" className="font-label" fontSize="6.6"
                      letterSpacing="1.1" fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel && !on ? 0.35 : 1}>{e.k.toUpperCase()}</text>
              </g>
            );
          })}

          <text x={C} y="334" textAnchor="middle" className="font-label" fontSize="6.5"
                letterSpacing="1.1" fill="var(--muted-foreground)" opacity="0.85">
            {shadow ? "THE SAME CAPACITY, UNGOVERNED" : "NONE OF THEM SUFFICIENT ALONE"}
          </text>
        </svg>

        <div className="mt-3 flex justify-center gap-2">
          {[["Function", false], ["Shadow", true]].map(([label, v]) => (
            <button key={String(label)} onClick={() => setShadow(v as boolean)} aria-pressed={shadow === v}
              className={`border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.12em] transition-colors ${
                shadow === v ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/60"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[15rem]">
        {cur ? (
          <>
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.k} · {cur.res}
            </p>
            {shadow ? (
              <>
                <p className="mt-4 font-label text-[10px] uppercase tracking-[0.2em] text-bone/70">Its shadow</p>
                <p className="mt-3 font-serif text-xl leading-relaxed text-bone/85">{cur.sh}</p>
              </>
            ) : (
              <>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.fn}</p>
                <p className="mt-6 border-l-2 border-gold/40 pl-5 font-serif text-lg italic leading-relaxed text-bone/80">
                  {cur.q}
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              A container filled with carbon, hydrogen, oxygen and nitrogen does not become alive.
              These become living substance only when gathered into ordered relationships —
              membranes, proteins, sugars, nucleic acids, metabolic cycles, cellular gradients,
              self-renewing structures.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              CHON supplies the letters. Tone supplies the grammar. Life composes the organism.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Which is why this is a crucible of relations and not four building blocks. Carbon
              provides structure, hydrogen mobile potency, oxygen released activity, nitrogen
              specific function — and life appears only through their ordered participation,
              together with phosphorus, sulfur, and the wider mineral environment.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select an element, or read the four in shadow — each danger is the same capacity
              ungoverned.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
