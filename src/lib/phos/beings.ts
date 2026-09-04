import type { ScriptKey } from "@/lib/scripts";

/**
 * The Register of Beings.
 *
 * Every tradition the encyclopaedia treats populates the world between the
 * first principle and the body, and each sorts that population its own way.
 * The register sets those populations side by side without dissolving them into
 * one another, and it does so on three axes at once:
 *
 *   1. The tradition's OWN word for what kind of being this is — dingir, nṯr,
 *      daimōn, malʾakh, malāʾika, deva, shén. This is the only classification
 *      the sources themselves make, and it is given first.
 *   2. The plane, in this volume's own vocabulary, which is a comparative claim
 *      and is marked as one.
 *   3. A class, also this volume's, which lets the register be read across
 *      traditions at all. It is a finding aid, not a doctrine.
 *
 * Nothing here says that a seraph and a yazata are the same being under two
 * names. What the register shows is where each tradition's population is dense
 * and where it is thin, and how differently the same region of the world is
 * cut up.
 *
 * Every name is set in its own script where a spelling can be verified, and
 * left in transliteration alone where it cannot. `confidence` says how firm the
 * entry is; contested identifications are marked rather than smoothed.
 */

export type Confidence = "firm" | "probable" | "contested";

/** The register's own comparative classes — a finding aid, not a doctrine. */
export const CLASSES = [
  { k: "deity", label: "Deity", d: "A god of a tradition's own cult: named, worshipped, and treated as a person rather than a principle." },
  { k: "emanation", label: "Emanation", d: "A being that is what it is by proceeding from something prior — an aeon, a hypostasis, a light of the vertical order." },
  { k: "messenger", label: "Messenger", d: "A being whose office is to carry: angels, heralds, the ones sent." },
  { k: "intermediary", label: "Intermediary", d: "Daimons, jinn, spirits of place — the populous middle, neither divine nor human, which most traditions treat as morally mixed." },
  { k: "adversary", label: "Adversary", d: "A being whose office is opposition, obstruction or accusation. Not every tradition makes this a separate class, and where it does not, saying so matters." },
  { k: "guardian", label: "Guardian", d: "A being attached to a person, a house, a threshold or a city, whose office is to keep it." },
  { k: "ancestor", label: "Ancestor", d: "The transfigured, remembered or fed dead, where a tradition treats them as continuing agents." },
  { k: "power", label: "Personified power", d: "A force the sources name and address without quite making a person of it — heka, me, melammu, the Glory." },
] as const;

export type ClassKey = (typeof CLASSES)[number]["k"];

/** The planes, as the Luminous Anatomy already uses them. */
export const PLANES = ["Divine", "Noetic", "Angelic", "Daimonic", "Psychic", "Astral", "Imaginal", "Etheric", "Elemental", "Ancestral"] as const;
export type Plane = (typeof PLANES)[number];

export type NativeName = {
  script: ScriptKey;
  /** the name in its own script — omitted where the spelling is not verified */
  orig?: string;
  tr: string;
  /** the scheme, a variant spelling, or why the script is missing */
  note?: string;
};

export type Being = {
  id: string;
  name: string;
  tradition: string;
  /** the tradition's own word for this kind of being */
  kind: string;
  cls: ClassKey;
  plane: Plane;
  native?: NativeName;
  /** one line: what this being does */
  office: string;
  /** what the sources actually say */
  context: string;
  /** what it has to do with light, where it does */
  light?: string;
  sources: string;
  confidence: Confidence;
  /** Portal entries that treat it */
  entries?: string[];
};

/** Each tradition's own vocabulary for kinds of being — the sources' own cut. */
export type KindTerm = { tradition: string; script: ScriptKey; orig?: string; tr: string; gloss: string; note?: string };

export const KINDS: KindTerm[] = [
  { tradition: "Egyptian", script: "hieroglyphs", orig: "𓊹", tr: "nṯr · netjer", gloss: "god. The plural nṯrw covers everything from the great gods to local powers; Egyptian has no separate word for what English calls an angel.", note: "Gardiner R8, the cloth wound on a pole." },
  { tradition: "Greek", script: "greek", orig: "θεοί", tr: "theoi", gloss: "the gods proper — those to whom cult is owed." },
  { tradition: "Greek", script: "greek", orig: "δαίμονες", tr: "daimones", gloss: "the populous middle. In Plato a daimōn is what carries between gods and men; in Iamblichus it is a rank in a hierarchy; in ordinary speech it is neither good nor evil by definition.", note: "The Christian narrowing to “demon” is later and is not what these texts mean." },
  { tradition: "Greek", script: "greek", orig: "ἥρωες", tr: "hērōes", gloss: "heroes: the dead who remain powerful at their tombs, and are fed there." },
  { tradition: "Jewish", script: "hebrew", orig: "מַלְאָךְ", tr: "malʾākh · pl. malʾākhîm", gloss: "a messenger — the same word for a human envoy and for the ones sent by God. The office, not the nature, is what the word names." },
  { tradition: "Jewish", script: "hebrew", orig: "שְׂרָפִים", tr: "śərāfîm", gloss: "the burning ones, from the root ś-r-p, to burn: the six-winged attendants of Isaiah's vision." },
  { tradition: "Jewish", script: "hebrew", orig: "כְּרוּבִים", tr: "kərûvîm", gloss: "cherubim: the guardians of the garden's gate and the bearers of the throne." },
  { tradition: "Jewish", script: "hebrew", orig: "אוֹפַנִּים", tr: "ʾôfannîm", gloss: "wheels — the wheels of Ezekiel's chariot, counted as an order of their own.", note: "Maimonides ranks ten orders in Yesodei ha-Torah 2:7: ḥayyot ha-qodesh, ofanim, erelim, ḥashmalim, serafim, malʾakhim, elohim, bene elohim, keruvim, ishim." },
  { tradition: "Islamic", script: "arabic", orig: "مَلَائِكَة", tr: "malāʾika · sg. malak", gloss: "the angels: made of light, without appetite, and incapable of disobedience — which is the point of the contrast with the jinn." },
  { tradition: "Islamic", script: "arabic", orig: "جِنّ", tr: "jinn", gloss: "made of smokeless fire, with appetite and will, and therefore morally responsible: there are Muslim jinn and unbelieving jinn." },
  { tradition: "Vedic", script: "devanagari", orig: "देव", tr: "deva", gloss: "a shining one, from the root div, to shine. The word for god and the word for the sky are the same root." },
  { tradition: "Vedic", script: "devanagari", orig: "असुर", tr: "asura", gloss: "in the oldest layer a title of the highest gods; later, the class opposed to the devas. The reversal is one of the clearest cases of a word changing sides.", note: "The Iranian cognate ahura goes the other way: there it is the gods who are ahuras and the daēvas who are demons." },
  { tradition: "Vedic", script: "devanagari", orig: "यक्ष", tr: "yakṣa", gloss: "a spirit of a place, a tree, a pool or a treasure — powerful, local, and not necessarily kind." },
  { tradition: "Vedic", script: "devanagari", orig: "पितृ", tr: "pitṛ · pl. pitaraḥ", gloss: "the fathers: the ancestral dead, who are fed and who require feeding.", note: "Given in the stem form, as a dictionary gives it." },
  { tradition: "Daoist", script: "hanzi", orig: "神", tr: "shén", gloss: "spirit, god, and also the spirit of a living person — the same character does all three, which is a fact about the cosmology and not an ambiguity." },
  { tradition: "Daoist", script: "hanzi", orig: "鬼", tr: "guǐ", gloss: "a ghost: the dead who are not settled, and who trouble the living." },
  { tradition: "Daoist", script: "hanzi", orig: "仙", tr: "xiān", gloss: "a transcendent: a person who became something else by practice. The character is a person beside a mountain." },
];

export const BEINGS: Being[] = [];

// ── reading the register ───────────────────────────────────────────────────

export const traditionsOf = (rows: Being[]) => [...new Set(rows.map((b) => b.tradition))].sort();
export const classLabel = (k: ClassKey) => CLASSES.find((c) => c.k === k)?.label ?? k;
export const kindsFor = (tradition: string) => KINDS.filter((k) => k.tradition === tradition);
