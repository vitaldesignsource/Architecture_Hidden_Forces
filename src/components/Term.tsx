import { SCRIPTS, type ScriptKey } from "@/lib/scripts";

/**
 * A word in its own script, with what it says beside it.
 *
 * Three shapes for three places. `Term` sets a word inline in running prose;
 * `GlossTerm` stands it on its own with transliteration and sense beneath, for
 * a heading or a panel; `TermRegister` lays a set of them out as rows. All
 * three carry the language tag and, for Hebrew and Arabic, the direction, so
 * that a screen reader announces a language rather than spelling out
 * characters, and so that a right-to-left word inside an English sentence does
 * not drag its punctuation the wrong way.
 */

export type TermData = {
  script: ScriptKey;
  /** the word, in its own script — an empty string where a spelling is not verified */
  orig?: string;
  /** scholarly transliteration */
  tr: string;
  /** what it means */
  gloss?: string;
  /** a language tag more exact than the script's default */
  lang?: string;
  /** a caveat: the scheme used, a contested spelling, a normalised writing */
  note?: string;
};

const sizeCls = { sm: "text-base", md: "text-2xl", lg: "text-4xl" } as const;

/** The word alone, sized for the run of text it sits in. */
export function Term({
  script,
  orig,
  lang,
  className = "",
  label,
}: {
  script: ScriptKey;
  orig: string;
  lang?: string;
  className?: string;
  /** what a reader who cannot see the script is told instead */
  label?: string;
}) {
  const s = SCRIPTS[script];
  return (
    <span
      lang={lang ?? s.lang}
      dir={s.dir}
      role={label ? "img" : undefined}
      aria-label={label}
      className={`${s.cls} ${className}`}
    >
      {orig}
    </span>
  );
}

/** The word set out: script above, transliteration and sense beneath. */
export function GlossTerm({
  t,
  size = "md",
  className = "",
}: {
  t: TermData;
  size?: keyof typeof sizeCls;
  className?: string;
}) {
  return (
    <div className={className}>
      {t.orig ? (
        <Term
          script={t.script}
          orig={t.orig}
          lang={t.lang}
          label={`${t.tr}${t.gloss ? ` — ${t.gloss}` : ""}`}
          className={`block text-gold ${sizeCls[size]}`}
        />
      ) : null}
      <p className={`font-serif italic text-bone/85 ${t.orig ? "mt-2" : ""} ${size === "sm" ? "text-sm" : "text-base"}`}>
        {t.tr}
      </p>
      {t.gloss && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.gloss}</p>}
      {t.note && <p className="mt-1 text-xs leading-relaxed text-bone/45">{t.note}</p>}
    </div>
  );
}

/** A set of terms as rows: the script in its own column, the sense in the other. */
export function TermRegister({ terms, className = "" }: { terms: TermData[]; className?: string }) {
  return (
    <div className={`border-t border-border ${className}`}>
      {terms.map((t) => (
        <div key={t.tr + t.orig} className="grid gap-3 border-b border-border py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <div>
            {t.orig ? (
              <Term
                script={t.script}
                orig={t.orig}
                lang={t.lang}
                label={`${t.tr} — ${t.gloss ?? ""}`}
                className="block text-2xl text-gold"
              />
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone/35">
                spelling not set
              </span>
            )}
            <p className="mt-2 font-serif text-sm italic text-bone/85">{t.tr}</p>
          </div>
          <div>
            {t.gloss && <p className="text-sm leading-relaxed text-muted-foreground">{t.gloss}</p>}
            {t.note && <p className="mt-2 text-xs leading-relaxed text-bone/45">{t.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
