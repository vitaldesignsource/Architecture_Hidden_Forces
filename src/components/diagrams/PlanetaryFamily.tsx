import { useState } from "react";

/**
 * PlanetaryFamily — one virtue recurring through unlike vessels.
 * Only the three planets this doctrine develops in full are given chains. The
 * other four carry their § XIII function and are marked as awaiting their
 * correspondences rather than being supplied with invented ones.
 */
export function PlanetaryFamily() {
  const [sel, setSel] = useState(0);
  const fam = [
    {
      g: "☉", n: "Sun", virtue: "Centralization, vitality, illumination, radiance, authority — the organization of a system around a governing centre.",
      why: "centrality, radiance, incorruptibility, distribution, sovereign organization",
      chain: [
        ["Celestial", "The Sun", "the virtue at the celestial level"],
        ["Mineral", "Gold", "fixed into incorruptible mineral durability"],
        ["Living", "Solar plants", "embodied through living growth toward light"],
        ["Bodily", "The heart", "the centre a body organizes around and distributes from"],
        ["Imaginal", "The circle · the crown · kingship", "concentrated into an intelligible image"],
      ],
    },
    {
      g: "♄", n: "Saturn", virtue: "Contraction, boundary, duration, weight, consequence, age, crystallization — the preservation of form through limitation.",
      why: "density, endurance, restriction, severance, the slow work of time",
      chain: [
        ["Celestial", "Saturn", "the virtue at the celestial level"],
        ["Mineral", "Lead · stone", "density and weight made mineral"],
        ["Living", "Roots", "the downward, holding, slow-growing part"],
        ["Bodily", "The bones", "what endures, defines, and outlasts the soft"],
        ["Imaginal", "The sickle · the hourglass · enclosed places", "severance and measured time as image"],
      ],
    },
    {
      g: "♂", n: "Mars", virtue: "Heat, assertion, incision, division, conflict, protection — directed force.",
      why: "the capacity to cut, defend, inflame, penetrate, or act decisively",
      chain: [
        ["Celestial", "Mars", "the virtue at the celestial level"],
        ["Mineral", "Iron", "hardness that takes and holds an edge"],
        ["Living", "Thorns · pungent plants", "growth that defends and inflames"],
        ["Bodily", "Muscular exertion · blood", "the body's capacity for force and defence"],
        ["Imaginal", "Blades · martial symbols", "decisive division as image"],
      ],
    },
  ];
  const pending = [
    ["☾", "Moon", "reception, memory, habit, embodiment, fluctuation"],
    ["☿", "Mercury", "translation, mediation, communication, exchange"],
    ["♀", "Venus", "attraction, affinity, valuation, harmony, combination"],
    ["♃", "Jupiter", "expansion, authorization, synthesis, increase"],
  ];
  const cur = fam[sel];

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {fam.map((f, i) => (
          <button
            key={f.n}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`flex items-baseline gap-3 border px-5 py-3 transition-colors ${
              sel === i ? "border-gold bg-clay/30 text-gold" : "border-border text-muted-foreground hover:border-gold/40"
            }`}
          >
            <span className="font-serif text-xl">{f.g}</span>
            <span className="font-label text-[10px] uppercase tracking-[0.25em]">{f.n}</span>
          </button>
        ))}
      </div>

      <p className="mt-8 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/90">
        {cur.virtue}
      </p>

      <style>{`
        .aoh-pf-row { animation: aoh-pf-in 620ms cubic-bezier(.16,1,.3,1) both; }
        @keyframes aoh-pf-in { from { opacity: 0; transform: translateY(9px) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { .aoh-pf-row { animation: none } }
      `}</style>
      <div className="mt-8 space-y-px" key={cur.n}>
        {cur.chain.map(([level, expr, note], i) => (
          <div
            key={level}
            style={{ animationDelay: `${(i * 70).toFixed(0)}ms` }}
            className="aoh-pf-row grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-border py-4 sm:grid-cols-[7rem_minmax(0,16rem)_1fr] sm:gap-6"
          >
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              {level}
            </span>
            <span className={`font-serif text-lg ${i === 0 ? "text-gold" : "text-bone/90"}`}>
              {expr}
            </span>
            <span className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1">
              {note}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        These belong to one family through{" "}
        <span className="text-gold-dim">{cur.why}</span> — not because they are secretly the same
        object. Ritual is their deliberate convergence: the sixth term, gathering the others into
        one operation.
      </p>

      <div className="mt-10 border-t border-border pt-6">
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Awaiting their chains
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pending.map(([g, n, f]) => (
            <div key={n} className="border border-dashed border-border/70 p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-lg italic text-bone/70">{n}</span>
                <span className="text-lg text-gold-dim">{g}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-[11px] leading-relaxed text-muted-foreground">
          Their celestial functions are given in § XIII. Their metals, plants, organs, and images
          are not yet set down, and are left open rather than filled in.
        </p>
      </div>
    </div>
  );
}

/**
 * ThreeNadis — Ida and Pingala crossing a central Sushumna.
 * The curves are generated so their zero-crossings land exactly on the nodes,
 * which is the whole point of the figure: the nodes are where the two polar
 * currents meet the axis, not decoration placed along it.
 */
