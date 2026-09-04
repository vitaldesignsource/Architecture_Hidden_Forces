/**
 * The hieroglyphs the treatise sets, and the words they build.
 *
 * Two rules govern everything here. The signs are served from a subset of Noto
 * Sans Egyptian Hieroglyphs (SIL Open Font License) built by scripts/hieroglyphs.mjs,
 * which reads the U+13xxx codes out of this file — so a sign that is not
 * registered below is a sign the visitor will not see. And every word is a
 * normalised writing, linearised: monumental Egyptian grouped its signs into
 * square quadrats and could run in either direction, while a font can only set
 * them in a row. Nothing here is a facsimile of a particular inscription.
 *
 * Codepoints were checked one by one against the Unicode Character Database;
 * the Unicode names carry Gardiner's numbers zero-padded, so V28 is
 * EGYPTIAN HIEROGLYPH V028 at U+1339B.
 */

export type Sign = {
  /** Gardiner's sign number */
  g: string;
  /** the codepoint, in the form the subset script reads */
  cp: string;
  /** what the sign draws */
  draws: string;
  /** what it does in a word: a sound, an ideogram, or a silent classifier */
  does: string;
};

export const SIGNS: Record<string, Sign> = {
  V28: { g: "V28", cp: "U+1339B", draws: "a wick of twisted flax", does: "the sound ḥ" },
  D28: { g: "D28", cp: "U+13093", draws: "two arms raised", does: "the sound kꜣ — and the ka, the vital double" },
  G1: { g: "G1", cp: "U+1313F", draws: "the Egyptian vulture", does: "the sound ꜣ" },
  Y1: { g: "Y1", cp: "U+133DB", draws: "a rolled papyrus, tied", does: "silent: closes an abstract noun" },
  A40: { g: "A40", cp: "U+1302D", draws: "a seated god", does: "silent: closes the name of a god" },
  A2: { g: "A2", cp: "U+13001", draws: "a man with his hand to his mouth", does: "silent: closes words of speech, thought and eating" },
  A1: { g: "A1", cp: "U+13000", draws: "a seated man", does: "silent: closes a man, or writes the first person" },
  Z1: { g: "Z1", cp: "U+133E4", draws: "a single stroke", does: "marks the sign before it as a picture of itself" },
  Z2: { g: "Z2", cp: "U+133E5", draws: "three strokes", does: "marks a plural" },
  G43: { g: "G43", cp: "U+13171", draws: "a quail chick", does: "the sound w" },
  S32: { g: "S32", cp: "U+132F7", draws: "a fringed cloth", does: "the sounds sjꜣ" },
  M17: { g: "M17", cp: "U+131CB", draws: "a flowering reed", does: "the sound j" },
  Aa11: { g: "Aa11", cp: "U+13419", draws: "a plinth, the base a statue stands true on", does: "the sounds mꜣꜥ" },
  D36: { g: "D36", cp: "U+1309D", draws: "a forearm", does: "the sound ꜥ" },
  X1: { g: "X1", cp: "U+133CF", draws: "a loaf of bread", does: "the sound t" },
  H6: { g: "H6", cp: "U+13184", draws: "an ostrich feather", does: "silent: the emblem of Ma’at" },
  C10: { g: "C10", cp: "U+13066", draws: "a seated goddess wearing the feather", does: "silent: closes the name of Ma’at" },
  G25: { g: "G25", cp: "U+1315C", draws: "a crested ibis", does: "the sounds ꜣḫ — effective, and luminous" },
  Aa1: { g: "Aa1", cp: "U+1340D", draws: "a placenta, or a sieve", does: "the sound ḫ" },
  D21: { g: "D21", cp: "U+1308B", draws: "a mouth", does: "the sound r" },
  N35: { g: "N35", cp: "U+13216", draws: "a ripple of water", does: "the sound n" },
  N5: { g: "N5", cp: "U+131F3", draws: "the sun", does: "the sun, and the sun god Re" },
  N1: { g: "N1", cp: "U+131EF", draws: "the sky as a slab with its ends turned down", does: "sky — the upper border of a scene" },
  N14: { g: "N14", cp: "U+131FC", draws: "a five-pointed star", does: "star" },
  G36: { g: "G36", cp: "U+13168", draws: "a swallow", does: "the sounds wr — great" },
  O1: { g: "O1", cp: "U+13250", draws: "a house in plan", does: "the sounds pr — house" },
  S34: { g: "S34", cp: "U+132F9", draws: "a sandal strap", does: "ꜥnḫ — life" },
  T28: { g: "T28", cp: "U+13328", draws: "a butcher’s block", does: "the sounds ẖr" },
  W3: { g: "W3", cp: "U+133B1", draws: "an alabaster basin", does: "the sounds ḥb — festival" },
  Q1: { g: "Q1", cp: "U+132A8", draws: "a throne", does: "the sounds st — and the name of Isis" },
  B1: { g: "B1", cp: "U+13050", draws: "a seated woman", does: "silent: closes a woman’s name" },
  G29: { g: "G29", cp: "U+13161", draws: "a jabiru stork", does: "the sounds bꜣ — the ba" },
  V17: { g: "V17", cp: "U+13383", draws: "a rolled herdsman’s shelter", does: "sꜣ — protection" },
  V9: { g: "V9", cp: "U+13376", draws: "a rope tied into a ring", does: "šn — encirclement, and so protection" },
  Aa30: { g: "Aa30", cp: "U+1342C", draws: "a bundle of rushes knotted at the top", does: "ẖkr — ornament: the frieze that crowns a wall" },
  F34: { g: "F34", cp: "U+13123", draws: "a heart", does: "jb — the heart, where a thing is devised" },
  F20: { g: "F20", cp: "U+13113", draws: "an ox tongue", does: "ns — the tongue, which repeats what the heart devised" },
};

export type Word = {
  /** the signs, in the order they are set */
  s: (keyof typeof SIGNS)[];
  /** transliteration, in the Egyptological letters */
  tr: string;
  /** the conventional pronunciation — a modern convenience, not a recovered sound */
  say: string;
  gloss: string;
};

export const WORDS = {
  heka: { s: ["V28", "D28", "G1", "Y1"], tr: "ḥkꜣ", say: "heka", gloss: "the operative power, conventionally “magic”" },
  hekau: { s: ["V28", "D28", "G1", "G43", "Y1", "Z2"], tr: "ḥkꜣw", say: "hekau", gloss: "its plural: powers, spells" },
  hekaGod: { s: ["V28", "D28", "G1", "A40"], tr: "Ḥkꜣ", say: "Heka", gloss: "the god — the same word, closed by the seated god" },
  ka: { s: ["D28", "Z1"], tr: "kꜣ", say: "ka", gloss: "the vital double, and the arms inside the word heka" },
  ba: { s: ["G29", "Z1"], tr: "bꜣ", say: "ba", gloss: "the mobile soul, the power of manifestation" },
  akh: { s: ["G25", "Aa1", "Y1"], tr: "ꜣḫ", say: "akh", gloss: "effective, and luminous: the same root for both" },
  akhu: { s: ["G25", "Aa1", "G43", "Z2"], tr: "ꜣḫw", say: "akhu", gloss: "effective powers; also the transfigured dead" },
  sia: { s: ["S32", "M17", "G1", "A40"], tr: "Sjꜣ", say: "Sia", gloss: "perception — the god at the prow of the sun bark" },
  hu: { s: ["V28", "G43", "A2"], tr: "ḥw", say: "hu", gloss: "authoritative utterance" },
  huGod: { s: ["V28", "G43", "A40"], tr: "Ḥw", say: "Hu", gloss: "the god of that utterance" },
  maat: { s: ["Aa11", "D36", "X1", "H6"], tr: "mꜣꜥt", say: "ma’at", gloss: "right order, truth, the measure a thing is true to" },
  maatGoddess: { s: ["Aa11", "D36", "X1", "C10"], tr: "Mꜣꜥt", say: "Ma’at", gloss: "the goddess of that order" },
  ren: { s: ["D21", "N35", "Z1"], tr: "rn", say: "ren", gloss: "name — counted among the parts of a person" },
  sa: { s: ["V17"], tr: "sꜣ", say: "sa", gloss: "protection: a guarding spell, and an amulet" },
  wertHekau: { s: ["G36", "D21", "X1", "V28", "D28", "G1", "Y1", "Z2"], tr: "wrt ḥkꜣw", say: "weret hekau", gloss: "“great of magics” — an epithet of Isis, and a goddess in her own right" },
  isis: { s: ["Q1", "X1", "B1"], tr: "Ꜣst", say: "Isis", gloss: "the throne, which is her name" },
  re: { s: ["N5", "Z1"], tr: "Rꜥ", say: "Re", gloss: "the sun, and the sun god" },
  perAnkh: { s: ["O1", "S34"], tr: "pr-ꜥnḫ", say: "per-ankh", gloss: "House of Life: where the books were written, copied and kept" },
  lector: { s: ["T28", "W3", "X1"], tr: "ẖry-ḥbt", say: "kheri-hebet", gloss: "lector priest: he who carries the festival roll" },
  heart: { s: ["F34"], tr: "jb", say: "ib", gloss: "the heart, which devises" },
  tongue: { s: ["F20"], tr: "ns", say: "nes", gloss: "the tongue, which repeats what the heart devised" },
} satisfies Record<string, Word>;

export type WordKey = keyof typeof WORDS;

const char = (k: keyof typeof SIGNS) => String.fromCodePoint(parseInt(SIGNS[k].cp.slice(2), 16));

/** the signs of a word, as text */
export const glyphs = (k: WordKey) => WORDS[k].s.map(char).join("");

/** one sign, as text */
export const glyph = (k: keyof typeof SIGNS) => char(k);

/** what a screen reader is given in place of signs it cannot pronounce */
export const label = (k: WordKey) => `${WORDS[k].tr} (${WORDS[k].say}) — ${WORDS[k].gloss}`;

/** Gardiner's numbers for a word, in order */
export const gardiner = (k: WordKey) => WORDS[k].s.map((s) => SIGNS[s].g).join(" ");
