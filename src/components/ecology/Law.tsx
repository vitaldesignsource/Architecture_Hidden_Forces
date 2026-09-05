/**
 * Law — an axiom given the room an axiom needs. Not a pull-quote: the layer
 * rests on these, and the page should read as if it does.
 */
export function Law({ k, text, size = "lg" }: { k: string; text: string; size?: "lg" | "xl" }) {
  return (
    <div className="border-y border-gold/40 py-10 sm:py-14">
      <p className="font-label text-[10px] uppercase tracking-[0.35em] text-gold">{k}</p>
      <p className={`mt-6 max-w-4xl font-serif leading-snug text-bone ${size === "xl" ? "text-3xl sm:text-4xl md:text-5xl" : "text-2xl sm:text-3xl"}`}>
        {text}
      </p>
    </div>
  );
}
