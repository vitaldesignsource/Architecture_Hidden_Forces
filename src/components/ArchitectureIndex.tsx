import { useState } from "react";
import { ENTRIES, PATHS } from "@/lib/contents";

/**
 * ArchitectureIndex — the index, plus routes through it. Forty sections in
 * sequence is a catalogue, not a way in; a path names a defensible order and a
 * reason for each step. Selecting one marks its members in place rather than
 * extracting them, so the route stays visible inside the whole.
 */
export function ArchitectureIndex() {
  const [path, setPath] = useState<number | null>(null);


  const active = path === null ? null : PATHS[path];
  const order: Record<string, number> = {};
  const why: Record<string, string> = {};
  if (active) {
    Object.entries(active.why).forEach(([id, reason], i) => {
      order[id] = i + 1;
      why[id] = reason;
    });
  }

  const numbered = ENTRIES.filter((e) => e.n && e.n !== "—" && e.n !== "00").length;
  const movements = ENTRIES.filter((e) => e.movement).length;
  const words = ["", "one", "two", "three", "four", "five", "six"];

  return (
    <>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {numbered} sections and {words[movements] ?? movements} movements. The descent runs from
        Source to Form; the return reads form back toward essence. What lies between is the
        apparatus by which that passage is described.
      </p>

      <div className="mt-10 border-t border-border pt-8">
        <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          Routes through it
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Forty sections in sequence is a catalogue. These are orders that can be defended, each
          with a reason for every step. None of them is the required one — the architecture does not
          have a required one — but each is a way in that does not begin by asking you to read
          everything.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {PATHS.map((x, i) => (
            <button
              key={x.k}
              onClick={() => setPath(path === i ? null : i)}
              aria-pressed={path === i}
              className={`border px-3 py-2 text-left text-xs leading-tight transition-colors ${
                path === i
                  ? "border-gold text-gold"
                  : "border-border text-muted-foreground hover:border-gold/60 hover:text-bone/80"
              }`}
            >
              {x.k}
              <span className="mt-0.5 block font-label text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                {x.n} · {Object.keys(x.why).length}
              </span>
            </button>
          ))}
        </div>
        {active && (
          <div className="aoh-pop mt-6 max-w-3xl border-l-2 border-gold pl-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{active.blurb}</p>
            <p className="mt-2 font-label text-[10px] uppercase tracking-[0.15em] text-gold-dim">
              Marked below, in order
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-x-12 gap-y-px lg:grid-cols-2">
        {ENTRIES.map((x) => {
          const step = order[x.id];
          const off = !!active && !step;
          return (
            <a
              key={x.id}
              href={`#${x.id}`}
              className={`group grid grid-cols-[3.25rem_1fr] items-baseline gap-4 border-b py-4 transition-all ${
                step ? "border-gold/40" : "border-border hover:border-gold/40"
              } ${off ? "opacity-25" : "opacity-100"}`}
            >
              <span
                className={`font-label text-[10px] uppercase tracking-[0.2em] ${
                  step ? "text-gold" : x.movement ? "text-gold/40" : "text-gold-dim"
                }`}
              >
                {step ? String(step).padStart(2, "0") : x.movement ? "·" : `§ ${x.n}`}
              </span>
              <span className="min-w-0">
                <span
                  className={`block font-serif text-lg transition-colors group-hover:text-gold ${
                    step ? "text-gold" : x.movement ? "italic text-bone/80" : "text-bone"
                  }`}
                >
                  {x.t}
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                  {step ? why[x.id] : x.d}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </>
  );
}

/**
 * ForceAndForm — the descent from potency into visible structure, with the
 * threshold of visibility crossed only at the final step. Everything before it
 * has already happened invisibly, which is the claim: the visible body is the
 * last witness of a process long underway, not its beginning. The return arc
 * closes potency -> form -> new potency, since actuality does not exhaust potency.
 */
