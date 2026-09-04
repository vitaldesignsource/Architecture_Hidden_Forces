/**
 * The writing systems the volumes quote in.
 *
 * A term in its own script is not decoration: a reader who knows the language
 * can check the claim, and a reader who does not can at least see that there
 * was a word before there was a translation. Each script therefore carries the
 * things a browser needs to set it properly — the family its subset is served
 * under, the language tag, the direction, and how large it wants to be beside
 * the Latin around it, since a Devanagari or Naskh face at the same nominal
 * size reads smaller than EB Garamond.
 *
 * The subsets themselves are built by scripts/fonts.mjs from the characters the
 * source actually uses, so adding a term here is enough: `npm run fonts` picks
 * it up.
 */

export type ScriptKey =
  | "hieroglyphs"
  | "cuneiform"
  | "hebrew"
  | "arabic"
  | "devanagari"
  | "coptic"
  | "tibetan"
  | "avestan"
  | "hanzi"
  | "greek";

export type ScriptInfo = {
  /** what the script is called in the running text */
  label: string;
  /** the class that carries its family and size in styles.css */
  cls: string;
  /** a default BCP 47 tag; a term may override it (Sanskrit against Hindi, say) */
  lang: string;
  dir?: "rtl";
  /** whether the site serves it from a subset, or a face already loaded */
  served: boolean;
};

export const SCRIPTS: Record<ScriptKey, ScriptInfo> = {
  hieroglyphs: { label: "Egyptian hieroglyphs", cls: "hiero", lang: "egy", served: true },
  cuneiform: { label: "cuneiform", cls: "scr scr-cuneiform", lang: "sux", served: true },
  hebrew: { label: "Hebrew", cls: "scr scr-hebrew", lang: "he", dir: "rtl", served: true },
  arabic: { label: "Arabic", cls: "scr scr-arabic", lang: "ar", dir: "rtl", served: true },
  devanagari: { label: "Devanagari", cls: "scr scr-devanagari", lang: "sa", served: true },
  coptic: { label: "Coptic", cls: "scr scr-coptic", lang: "cop", served: true },
  tibetan: { label: "Tibetan", cls: "scr scr-tibetan", lang: "bo", served: true },
  avestan: { label: "Avestan", cls: "scr scr-avestan", lang: "ae", served: true },
  hanzi: { label: "Chinese", cls: "scr scr-hanzi", lang: "zh-Hant", served: true },
  greek: { label: "Greek", cls: "scr scr-greek", lang: "grc", served: false },
};

export const scriptOf = (k: ScriptKey) => SCRIPTS[k];
