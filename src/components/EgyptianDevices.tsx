import { useId } from "react";
import { glyphs, glyph, label, gardiner, WORDS, SIGNS, type WordKey } from "@/lib/hieroglyphs";

/**
 * The devices an Egyptian wall is made of, borrowed as page furniture.
 *
 * Each is drawn as line work in the house gold, at the weights the rest of the
 * figures use, and each is captioned in the section as a borrowed convention
 * rather than a reproduction. Two rules from the originals are kept: the kheker
 * crowns a wall and so appears once at the top of the section, and the sky sign
 * tops a scene and so appears above a register — never both above one element.
 */

/** Aa30, ẖkr: the knotted tops of a row of bound rushes, fossilised in stone. */
export function KhekerFrieze({ className = "", height = 34, opacity = 0.5 }: { className?: string; height?: number; opacity?: number }) {
  // One bundle, drawn at the proportions of the carved friezes and of the sign
  // itself: pitch 46 against a height of 100. It is tiled with a repeating
  // background rather than an SVG pattern so the band fills any width without
  // the units being stretched, and runs off the edge as a frieze should.
  const unit = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 100" width="46" height="100">
    <g fill="none" stroke="%23e8aa4e" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
      <path d="M23 3 C31 9 40 20 40 32 C40 46 32 56 31 58 L15 58 C14 56 6 46 6 32 C6 20 15 9 23 3 Z"/>
      <path d="M23 10 C29 15 35 22 35 32 C35 43 29 50 28 53 L18 53 C17 50 11 43 11 32 C11 22 17 15 23 10 Z" stroke-opacity="0.55"/>
      <path d="M14 60 h18 M14 64.5 h18 M14 69 h18"/>
      <path d="M15 69 L11 100 M31 69 L35 100"/>
    </g>
  </svg>`.replace(/\s+/g, " ");
  return (
    <div
      className={`w-full border-b border-gold/40 ${className}`}
      style={{
        height,
        opacity,
        backgroundImage: `url("data:image/svg+xml,${unit.replace(/"/g, "'").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/#/g, "%23")}")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundPosition: "left bottom",
      }}
      aria-hidden
    />
  );
}

/** N1, pt: the sky as a slab with its ends turned down, strewn with N14 stars. */
export function SkyBand({ className = "", height = 16, stars = true }: { className?: string; height?: number; stars?: boolean }) {
  const id = useId().replace(/:/g, "");
  const h = 100, lug = h * 0.45, bar = h * 0.55, W = 1000;
  const star = (cx: number, cy: number, r: number) =>
    Array.from({ length: 5 }, (_, i) => {
      const a = (-90 + i * 144) * (Math.PI / 180);
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  return (
    <div className={`w-full ${className}`} style={{ height }} aria-hidden>
      <svg className="block h-full w-full" preserveAspectRatio="none" viewBox={`0 0 ${W} ${h}`}>
        <path
          d={`M0 0 H${W} V${h} H${W - h} V${bar} H${h} V${h} H0 Z`}
          fill="var(--lapis-deep)"
          fillOpacity={stars ? 0.3 : 0.18}
          stroke="var(--gold)"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        {stars && (
          <>
            <defs>
              <pattern id={`sky-${id}`} width="110" height={h} patternUnits="userSpaceOnUse">
                <polygon points={star(55, bar / 2, bar * 0.42)} fill="none" stroke="var(--gold)" strokeOpacity="0.7" strokeWidth="2" strokeLinejoin="round" />
              </pattern>
            </defs>
            <rect x={h} y="0" width={W - 2 * h} height={bar} fill={`url(#sky-${id})`} />
          </>
        )}
      </svg>
    </div>
  );
}

/** V9, šn: rope tied into a ring — encirclement, and so protection. */
export function ShenRing({ size = 34, className = "" }: { size?: number; className?: string }) {
  const R = 34, C = 50;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden fill="none"
         stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx={C} cy={C - 6} r={R} strokeOpacity="0.75" />
      <circle cx={C} cy={C - 6} r={R * 0.86} strokeOpacity="0.5" />
      <rect x={C - R * 1.1} y={C + R - 6} width={R * 2.2} height={R * 0.16} strokeOpacity="0.75" />
      <path d={`M${C - R * 0.42} ${C + R - 8} v${R * 0.2} M${C + R * 0.42} ${C + R - 8} v${R * 0.2}`} strokeOpacity="0.5" />
    </svg>
  );
}

/**
 * A word, set in its signs.
 *
 * The signs are linearised — a font cannot build the square quadrats of the
 * monumental script — and they face left, which is the direction a run beside
 * left-to-right English should face. The transliteration and the conventional
 * pronunciation carry the meaning for anyone whose device or reader cannot.
 */
export function Hiero({ w, size = "md", className = "" }: { w: WordKey; size?: "lg" | "md" | "sm"; className?: string }) {
  return (
    <span lang="egy" role="img" aria-label={label(w)} className={`hiero hiero-${size} ${className}`}>
      {glyphs(w)}
    </span>
  );
}

/** One sign on its own, for the emblems: the feather, the sky, a star. */
export function Sign({ s, size = "sm", className = "" }: { s: keyof typeof SIGNS; size?: "lg" | "md" | "sm"; className?: string }) {
  return (
    <span lang="egy" role="img" aria-label={`${SIGNS[s].g}: ${SIGNS[s].draws}`} className={`hiero hiero-${size} ${className}`}>
      {glyph(s)}
    </span>
  );
}

/** A word with its transliteration, its conventional pronunciation and its sense. */
export function GlossedWord({ w, size = "md", className = "" }: { w: WordKey; size?: "lg" | "md" | "sm"; className?: string }) {
  const word = WORDS[w];
  return (
    <div className={className}>
      <Hiero w={w} size={size} className="block text-gold" />
      <p className="mt-2 font-serif text-base italic text-bone/85">
        {word.tr} <span className="not-italic text-muted-foreground">· {word.say}</span>
      </p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{word.gloss}</p>
    </div>
  );
}

/** The register of words the section sets, with the signs each is built from. */
export function SignRegister({ words }: { words: WordKey[] }) {
  return (
    <div className="mt-10 border-t border-border">
      {words.map((k) => (
        <div key={k} className="grid gap-3 border-b border-border py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <div>
            <Hiero w={k} size="md" className="block text-gold" />
            <p className="mt-2 font-serif text-sm italic text-bone/85">{WORDS[k].tr}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-dim">
              {WORDS[k].say} · {gardiner(k)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{WORDS[k].gloss}</p>
            <p className="mt-2 text-xs leading-relaxed text-bone/45">
              {WORDS[k].s.map((s) => `${SIGNS[s].g}, ${SIGNS[s].draws}, ${SIGNS[s].does}`).join(" · ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
