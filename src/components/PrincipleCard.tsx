import type { Principle } from "@/lib/principles";

export function PrincipleCard({ p, accent }: { p: Principle; accent: "descent" | "return" }) {
  return (
    <article className="group relative overflow-hidden border border-border bg-void/40 p-8 backdrop-blur-sm transition-colors hover:bg-clay/40 sm:p-10">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
          {p.num} · {accent === "descent" ? "Descent" : "Return"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {p.english}
        </span>
      </div>
      <h3 className="font-serif text-4xl leading-none text-bone sm:text-5xl">{p.greek}</h3>
      <p className="mt-2 font-serif text-lg italic text-gold/80">{p.latin}</p>
      <div className="my-6 h-px w-12 bg-gold/40 transition-all duration-700 group-hover:w-24" />
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{p.summary}</p>
    </article>
  );
}




/**
 * EtherCircuit — the Fourfold Field as what the doctrine says it is: a circuit.
 * The section states "this is a circuit, not a ladder", then rendered a ladder.
 * Four vessels on a ring, the return arc from Life back to Warmth drawn heavier
 * than the rest, because that arc is the whole claim.
 */
