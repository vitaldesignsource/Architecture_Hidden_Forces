import { useState } from "react";

/**
 * ImaginalBridge — the six stages between an unrepresented force and an
 * embodied response. The bridge runs both ways, so the flow markers and the
 * transition text reverse with direction rather than being redrawn.
 */
export function ImaginalBridge() {
  const [up, setUp] = useState(false);
  const [open, setOpen] = useState<number | null>(2);

  const S = [
    { k: "Hidden force", f: "An initially unrepresented tendency or modulation",
      m: "Not yet anything the soul can picture. It has direction, but no appearance." },
    { k: "Felt atmosphere", f: "Its affective, rhythmic, or bodily reception",
      m: "Warmth, pressure, attraction, unease, rhythm, a pull toward or away. The body registers it before the mind can name it." },
    { k: "Image", f: "Its first legible inward configuration",
      m: "Landscape, colour, face, animal, geometry, sound, movement, a dramatic situation. Not the first event — a contraction or a shift of attention may precede it — but the first point at which the modulation begins to appear as something." },
    { k: "Symbol", f: "An image stabilised across meanings and contexts",
      m: "The image holds still long enough to be recognised again, by others and in other settings. Salt has begun its work." },
    { k: "Diagram or ritual form", f: "A communicable and repeatable symbolic vessel",
      m: "Compressed relational reasoning: hierarchy, polarity, sequence, recursion, circulation made external and repeatable." },
    { k: "Embodiment", f: "The reorganisation of attention, conduct, and environment",
      m: "And because conduct alters the vessel and its Morphaithēr, it alters which images the vessel will be capable of receiving next. The bridge closes into a circuit." },
  ];
  const DOWN = [
    "received as warmth, pressure, rhythm, unease",
    "atmosphere finds its first legible configuration",
    "the image stabilises across meanings and contexts",
    "the symbol takes communicable, repeatable form",
    "form reorganises attention, conduct, and environment",
  ];
  const UP = [
    "feeling orients awareness toward a more encompassing pattern",
    "the image stirs feeling",
    "the symbol awakens an image",
    "a physical form awakens the symbol it carries",
    "conduct returns to the form that shaped it",
  ];

  return (
    <div>
      <style>{`
        .aoh-ib-dot { animation: aoh-ib-fall 2.6s linear infinite; }
        .aoh-ib-up .aoh-ib-dot { animation-direction: reverse; }
        @keyframes aoh-ib-fall { from { top: 0; opacity: 0 } 15%,85% { opacity: 1 } to { top: 100%; opacity: 0 } }
        @media (prefers-reduced-motion: reduce) { .aoh-ib-dot { animation: none; top: 50%; } }
      `}</style>

      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          {up ? "Ascent · symbol toward pattern" : "Descent · force toward action"}
        </p>
        <button
          onClick={() => setUp((v) => !v)}
          className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
        >
          reverse ↑↓
        </button>
      </div>

      <div className={`mt-6 ${up ? "aoh-ib-up" : ""} ${up ? "flex flex-col-reverse" : ""}`}>
        {S.map((st, i) => {
          const on = open === i;
          const conn = up ? UP[i - 1] : DOWN[i];
          return (
            <div key={st.k} className={up ? "flex flex-col-reverse" : ""}>
              <div>
                <button
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className={`flex w-full items-baseline gap-4 border-l-2 py-3 pl-4 text-left transition-colors ${
                    on ? "border-gold" : "border-border hover:border-gold/50"
                  }`}
                >
                  <span className="font-mono text-[10px] text-gold-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-serif text-lg ${on ? "text-gold" : "text-bone/85"}`}>
                    {st.k}
                  </span>
                  <span className="ml-auto hidden text-right text-xs leading-snug text-muted-foreground sm:block sm:max-w-[19rem]">
                    {st.f}
                  </span>
                </button>
                {on && (
                  <p className="aoh-pop border-l-2 border-gold/30 py-2 pl-[3.4rem] pr-4 text-sm leading-relaxed text-muted-foreground">
                    <span className="sm:hidden">{st.f}. </span>
                    {st.m}
                  </p>
                )}
              </div>
              {conn !== undefined && (
                <div className="relative ml-[0.4rem] flex items-center gap-3 py-1 pl-[3rem]">
                  <span className="absolute left-[0.1rem] top-0 h-full w-px bg-border" aria-hidden />
                  <span
                    className="aoh-ib-dot absolute left-[-0.05rem] h-[3px] w-[3px] rounded-full bg-gold"
                    aria-hidden
                  />
                  <span className="text-[11px] leading-snug text-bone/55">{conn}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Symbolon — the tally. One half is the visible form; the other is whichever
 * level it fits; consciousness is the third party that recognises the fit.
 * Both halves are the same disc under complementary clips, so the break is
 * necessarily exact: they can only fit each other.
 */
