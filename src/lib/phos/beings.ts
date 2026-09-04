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

/**
 * The register itself. It grows tradition by tradition; each entry carries the
 * script it was verified in, or none, and says how firm it is.
 */
export const BEINGS: Being[] = [
  {
    id: "utu-samas",
    name: "Utu / Šamaš",
    tradition: "Mesopotamian",
    kind: "diĝir / ilu — a great god of the first rank; one of the astral triad with Sîn and Ištar",
    cls: "deity",
    plane: "Divine",
    native: { script: "cuneiform", tr: "Sumerian dUTU (logographic values in capitals = small caps in print)", orig: "𒀭𒌓", note: "Sumero-Akkadian cuneiform. AN (U+1202D, the divine determinative) + UD (U+12313). The same two signs serve both languages: Sumerian reads them dUTU, Akkadian keeps them as a Sumerogram for Šamaš, and can also spell the name syllabically ša-maš. Verified sign-by-sign against the Unicode Standard’s…" },
    office: "The sun; the god of justice, of the oath, of divination, and of the traveller.",
    context: "Attested continuously from the Early Dynastic period to the end of cuneiform, with principal cult at Sippar (E-babbar, “White House”) and Larsa. Because he crosses the whole sky daily he sees everything, and this optical fact IS his jurisdiction: he is invoked as the judge who detects the concealed crime, and Hammurabi’s stele shows the king receiving the rod and ring before him. He is also the god of the extispicy oracle, addressed with Adad in the diviner’s prayers, and the one who lets the dead be seen and questioned. In the Gilgameš epic he is the hero’s patron and opens the tunnel through Mount Māšu.",
    sources: "ORACC AMGG, “Utu/Šamaš (god)”; ETCSL 4.32.2, “A hymn to Utu”; Šamaš Hymn (Lambert, Babylonian Wisdom Literature, 121–138); CAD Š/1 s.v. Šamaš; Black & Green (1992) s.v. “Shamash”.",
    confidence: "firm",
    light: "Central. Utu is not a god who has light — he is the daylight, and the texts treat seeing and judging as one act. He rises between twin mountains with rays (šarūru) standing out from his shoulders, a fixed iconographic sign of him on Akkadian seals. His epithets run on nūru “light”: he is “light of the great gods”, “light of heaven and earth”, and darkness in his hymns is the place where injustice can still hide. This is the clearest ancient case of illumination as a moral and forensic power rather than a merely physical one.",
  },
  {
    id: "inanna-istar",
    name: "Inanna / Ištar",
    tradition: "Mesopotamian",
    kind: "diĝir / ilu — a great goddess; the astral deity of Venus (dNIN.SI₄.AN.NA)",
    cls: "deity",
    plane: "Divine",
    native: { script: "cuneiform", tr: "Sumerian dINANNA, dMÙŠ", orig: "𒀭𒈹", note: "AN (U+1202D) + MUŠ₃ (U+12239, CUNEIFORM SIGN MUSH3). The MUŠ₃ sign is polyphonic and carries the values inana / innin / ištar among others, so the same two signs are read dINANNA in Sumerian and dIŠTAR in Akkadian. A learned numerical writing d15 is also attested but I did not verify its exact gl…" },
    office: "Sexual love, war, and the planet Venus; the goddess who crosses every boundary she meets.",
    context: "Sumerian Inanna of Uruk (E-anna) and Semitic Ištar were originally two goddesses; they were identified by the Sargonic period, and Enḫeduanna’s hymns are the pivotal documents of that fusion — so the equation is historically real but is a syncretism, not an original identity. Her defining paradox is stated in the texts themselves: she is “the woman who turns a man into a woman and a woman into a man”, patron of prostitutes and of the battle-line alike. The great narrative is her Descent, where she passes seven gates, surrenders a garment or ornament at each, is killed by Ereškigal, and returns only by giving up Dumuzi in her place.",
    sources: "ORACC AMGG, “Inana/Ištar (goddess)”; ETCSL 1.4.1, “Inana’s Descent to the Nether World”; ETCSL 4.07.2, “Ninmešara” (Enḫeduanna); Harris, “Inanna-Ishtar as Paradox,” History of Religions 30 (1991); Black & Green (1992) s.v. “Inana”.",
    confidence: "firm",
    light: "Strong but astral rather than solar. She is the evening and morning star, and her hymns call her the light that appears at the horizon; her characteristic emblem is the eight-pointed star or rosette. Her radiance is explicitly the terrible kind: Enḫeduanna’s Ninmešara describes her melam covering the land, and her approach is described in the vocabulary of overwhelming brilliance and fear rather than of gentle illumination.",
  },
  {
    id: "enki-ea",
    name: "Enki / Ea",
    tradition: "Mesopotamian",
    kind: "diĝir / ilu — a great god; third of the ruling triad with An and Enlil",
    cls: "deity",
    plane: "Divine",
    native: { script: "cuneiform", tr: "Sumerian dEN.KI, also dAM.AN.KI", orig: "𒀭𒂗𒆠", note: "Sumerian dEN.KI: AN (U+1202D) + EN (U+12097) + KI (U+121A0). The Akkadian name is written with different signs, dE₂.A = 𒀭𒂍𒀀 (AN + E2 U+1208D + A U+12000). Both strings verified sign-by-sign against Unicode normative names. The literal sense “Lord Earth” for en-ki sits awkwardly with a water god a…" },
    office: "The apsû, the fresh water under the earth; craft, incantation, cunning, and the shaping of humankind.",
    context: "His cult centre is Eridu (E-abzu), archaeologically among the oldest sanctuaries in the south, and he is attested from the earliest god-lists onward. He is the god of technique in every sense: the one who holds the me, who devises the exorcistic formula, and who in Atra-ḫasīs and in the Flood story warns his favourite through a reed wall — obeying the letter of the gods’ oath while defeating its purpose. He is the father of Marduk, and his subordination to his son in Enūma eliš is a deliberate theological move by Babylon, not an old datum.",
    sources: "ORACC AMGG, “Enki/Ea (god)”; ETCSL 1.3.1, “Enki and the World Order”; ETCSL 1.3.3, “Inana and Enki”; Atra-ḫasīs (Lambert & Millard 1969); Espak, The God Enki in Sumerian Royal Ideology and Mythology (2010).",
    confidence: "firm",
    light: "Weak and indirect — this should be stated plainly rather than manufactured. Enki is a god of water and of hidden depth, not of radiance, and his sphere is what is below and concealed. What connects him to a doctrine of light is derivative: he is the source of the apkallu who bring the arts up out of the apsû, and the giver of the me. The “eye of Ea” language in some incantations is about seeing and knowing, not shining.",
  },
  {
    id: "enlil",
    name: "Enlil",
    tradition: "Mesopotamian",
    kind: "diĝir / ilu — a great god; head of the pantheon before Marduk’s elevation",
    cls: "deity",
    plane: "Divine",
    native: { script: "cuneiform", tr: "Sumerian dEN.LÍL₂, den-líl₂", orig: "𒀭𒂗𒆤", note: "AN (U+1202D) + EN (U+12097) + KID (U+121A4). The second element is transliterated LÍL₂ but the sign is the one Unicode names KID — after the Ur III period the names of Enlil and Ninlil are consistently written with this sign, and using the separate sign U+121F8 CUNEIFORM SIGN LIL here would be wr…" },
    office: "Kingship among the gods; the executive power that decrees and enforces; wind and storm.",
    context: "His cult centre is Nippur (E-kur, “Mountain House”), the religious capital whose sanction legitimised southern kings for a millennium and a half. He holds the Tablet of Destinies and the “Enlil-ship” (enlilūtu), a transferable office of supremacy that is later awarded to Marduk in Babylon and to Aššur in Assyria — the office outlives its first holder. The translation of líl₂ is genuinely contentious; “Lord Wind/Air” is the traditional rendering but is disputed, and the name should not be leaned on for doctrine.",
    sources: "ORACC AMGG, “Enlil (god)”; ETCSL 4.05.1, “Enlil in the E-kur (Enlil A)”; Such-Gutiérrez, Untersuchungen zum Pantheon von Nippur (2003); Wang, The Metamorphosis of Enlil in Early Mesopotamia (2011).",
    confidence: "firm",
    light: "Present but as awe rather than illumination. The Sumerian hymns repeatedly assign him melam — a crushing radiance that makes the gods unable to look at him — and the vocabulary is one of unbearable brightness that terrifies rather than reveals. He is not an astral or solar god and has no light-body of his own; the radiance is an attribute of his rank.",
  },
  {
    id: "an-anu",
    name: "An / Anu",
    tradition: "Mesopotamian",
    kind: "diĝir / ilu — a great god; the head of the pantheon in rank and genealogy",
    cls: "deity",
    plane: "Divine",
    native: { script: "cuneiform", tr: "Sumerian an, dAN", orig: "𒀭", note: "A single sign, AN (U+1202D). This is the crux of Mesopotamian writing: the one sign is the word an “sky”, the word diĝir “god”, the god An’s own name, and the unpronounced divine determinative. In Sumerian An’s name is written WITHOUT the determinative, since the sign is already itself. Akkadian …" },
    office: "The sky itself; the source and legitimator of authority, largely exercised through others.",
    context: "Attested from the earliest texts, with his principal cult at Uruk (E-anna) shared with Inanna, and a revived Seleucid-period cult at the Bīt Rēš. His characteristic mode is remoteness: he holds the highest rank and the ultimate power to grant kingship, yet acts rarely in narrative, delegating to Enlil and later Marduk. Anûtu, “Anu-ship”, is the abstract of supreme authority in the same way as enlilūtu. His name is the ordinary Sumerian word for sky, so “heaven” and “the god” are not separable concepts here.",
    sources: "ORACC AMGG, “An/Anu (god)”; ePSD2 s.v. an; CAD A/2 s.v. Anu; Black & Green (1992) s.v. “Anu”; Beaulieu, The Pantheon of Uruk during the Neo-Babylonian Period (2003).",
    confidence: "firm",
    light: "Indirect. An is the sky as a structure — the luminous vault within which the light-bodies move — rather than a source of light. He is the father of the astral gods and of Ištar in one tradition, but no text makes him a radiant or shining deity in his own right, and it would be a fabrication to give him a light-office.",
  },
  {
    id: "nanna-suen-sin",
    name: "Nanna / Suen / Sîn",
    tradition: "Mesopotamian",
    kind: "diĝir / ilu — a great god; the astral triad with Šamaš and Ištar",
    cls: "deity",
    plane: "Divine",
    native: { script: "cuneiform", tr: "Sumerian dŠEŠ.KI, dNANNA (syllabic na-an-na)", orig: "𒀭𒋀𒆠", note: "Sumerian dŠEŠ.KI: AN (U+1202D) + ŠEŠ (U+122C0) + KI (U+121A0). The Akkadian name is written dEN.ZU = 𒀭𒂗𒍪 (AN + EN U+12097 + ZU U+1236A) — read Suen although the signs are in the reverse order, a well-known scribal peculiarity — and very commonly with the number thirty, d30 = 𒀭𒌍 (AN + U+1230D CUNE…" },
    office: "The moon; the measurer of the month, the reckoner of time, the lord of the calendar and of omens.",
    context: "Principal cults at Ur (E-kiš-nu-ĝal₂) in the south and Ḫarrān in the north; his Ur priestesses, beginning with Enḫeduanna, were royal daughters and the office lasted a thousand years. He is the father of Utu/Šamaš and of Inanna/Ištar in the standard genealogy, which inverts the modern intuition that the sun should be senior to the moon — in Mesopotamia the moon is the elder. The Neo-Babylonian king Nabonidus’s promotion of Sîn of Ḫarrān over Marduk of Babylon was a live theological quarrel with political consequences. The writing d30 is a real number-writing keyed to the days of the lunar month, not a cipher.",
    sources: "ORACC AMGG, “Nanna/Suen/Sin (god)”; ETCSL 4.13.a, “A hymn to Nanna”; Enūma Anu Enlil, lunar tablets; Hall, A Study of the Sumerian Moon-God Nanna/Suen (1985); Beaulieu, The Reign of Nabonidus (1989).",
    confidence: "firm",
    light: "Direct and important, and of a different order from Utu’s. Sîn is the lamp of the night; his light does not expose but measures, and lunar visibility — first crescent, full disc, eclipse — is the primary Mesopotamian instrument of time and of omen-reading. Eclipse is his light withdrawn and is read as a threat to the king. The pairing of his measured, waxing-and-waning light against Šamaš’s constant daylight is one of the sharpest light-distinctions the tradition draws.",
  },
  {
    id: "marduk",
    name: "Marduk",
    tradition: "Mesopotamian",
    kind: "diĝir / ilu — a great god; from the late second millennium the head of the pantheon",
    cls: "deity",
    plane: "Divine",
    native: { script: "cuneiform", tr: "Sumerian dAMAR.UTU", orig: "𒀭𒀫𒌓", note: "AN (U+1202D) + AMAR (U+1202B) + UD (U+12313), i.e. dAMAR.UTU. Confirmed by the Wiktionary lemma whose URL encodes exactly these three codepoints, and verified against Unicode normative names. The Sumerian reading amar-utu, “calf of the sun”, is the standard analysis of the writing, though whether…" },
    office: "City-god of Babylon raised to king of the gods; creator, orderer, and holder of the Tablet of Destinies.",
    context: "A minor local god in the third millennium, elevated with Babylon’s political rise and installed as supreme in Enūma eliš, where he defeats Tiāmat, splits her body into sky and earth, sets the constellations, and receives the fifty names of the other gods — a text that is a theological argument, not an old cosmogony. His temple is Esagil with the ziggurat Etemenanki; the New Year akītu festival, in which the king’s legitimacy was annually renewed before him, was the state ritual of Babylonia. His symbol is the spade (marru) and his attendant creature the mušḫuššu dragon.",
    sources: "ORACC AMGG, “Marduk (god)”; Enūma eliš I 90–100, VI–VII (Lambert, Babylonian Creation Myths, 2013); Sommerfeld, Der Aufstieg Marduks (1982); Black & Green (1992) s.v. “Marduk”.",
    confidence: "firm",
    light: "Substantial, and largely constructed. Enūma eliš gives him four eyes and four ears and has him “clothed with the halo of ten gods”, an explicit melammu statement; his name is analysed as “calf of the sun”, and in the first millennium theological texts assimilate him to solar language. This is a deliberate accumulation of radiance appropriate to his new rank rather than an inherited solar identity, and an editor should present it as such.",
  },
  {
    id: "nergal",
    name: "Nergal",
    tradition: "Mesopotamian",
    kind: "diĝir / ilu — a great god of the netherworld",
    cls: "deity",
    plane: "Divine",
    native: { script: "cuneiform", tr: "Sumerian dGÌR.UNU.GAL, dKIŠ.UNU", orig: "𒀭𒄊𒀕𒃲", note: "dGÌR.UNU.GAL: AN (U+1202D) + GIR₃ (U+1210A) + AB-GUNU (U+12015, the sign Unicode names CUNEIFORM SIGN AB GUNU, which carries the value unu) + GAL (U+120F2). Verified against Unicode normative names. The very common alternative writing dU.GUR is real and well attested, but I could not confirm whic…" },
    office: "King of the underworld beside Ereškigal; plague, war, sudden death, and the destroying heat.",
    context: "His cult centre is Kutha (E-meslam), and he is identified or paired with Meslamtaea and with Erra. The myth Nergal and Ereškigal tells how he came down, offended her, was compelled to return, and ended by seizing her throne and marrying her — the two recensions differ substantially in tone, and the Amarna version is markedly shorter and less courtly than the Sultantepe one. In the first millennium he becomes the god of epidemic and of the wasting summer.",
    sources: "ORACC AMGG, “Nergal (god)”; Nergal and Ereškigal (Amarna and Sultantepe recensions; Foster, Before the Muses); Erra and Išum (Foster); Black & Green (1992) s.v. “Nergal”.",
    confidence: "firm",
    light: "Present, and inverted — worth stating carefully. Nergal is associated with the destructive heat of high summer and the noon sun, and in astral scholarship with Mars. His is the aspect of solar power that kills rather than reveals: scorching, fever, drought. He rules a realm defined by the absence of light while being himself associated with a burning one, and that tension is native to the sources, not a modern reading.",
  },
  {
    id: "ereskigal",
    name: "Ereškigal",
    tradition: "Mesopotamian",
    kind: "diĝir / ilu — a great goddess; queen of the netherworld",
    cls: "deity",
    plane: "Divine",
    native: { script: "cuneiform", tr: "Sumerian dEREŠ.KI.GAL, dereš-ki-gal(-la), “Lady of the Great Earth/Place”", orig: "𒀭𒊩𒌆𒆠𒃲", note: "dEREŠ.KI.GAL: AN (U+1202D) + SAL (U+122A9) + TUG₂ (U+12306) + KI (U+121A0) + GAL (U+120F2). EREŠ is a reading of the sign NIN, which is written as the compound SAL+TÚG; the same name is equally correctly rendered with the single ligature sign U+1238F CUNEIFORM SIGN NIN as 𒀭𒎏𒆠𒃲, and both forms are…" },
    office: "Sole ruler of the land of the dead (kur, erṣetu), the one whose decree cannot be revoked.",
    context: "She is not a demon and not evil: she is a sovereign, and the netherworld is her legitimate jurisdiction, administered with officers, gates and gatekeepers. She appears in Inanna’s Descent as the sister who kills the intruder and hangs her corpse on a hook, and in Nergal and Ereškigal as the ruler who is forced into a marriage that shares her throne. Notably she receives no ordinary cult of the kind the sky-gods receive; her sphere is approached with dread rather than petition.",
    sources: "ORACC AMGG, “Ereškigal (goddess)”; ETCSL 1.4.1, “Inana’s Descent”; Ištar’s Descent (Akkadian; Foster, Before the Muses); Katz, The Image of the Netherworld in the Sumerian Sources (2003).",
    confidence: "firm",
    light: "Defined by its absence, and this is doctrinally important. Her house is described as the place “where dust is their bread and clay their food”, where the dead are clothed like birds in feathers and see no light. The Mesopotamian netherworld is not a place of torment but a place of darkness and thirst, and Ereškigal is the power of that lightlessness. She is the tradition’s clearest statement that the withdrawal of light, not fire, is what death is.",
  },
  {
    id: "ningiszida",
    name: "Ningišzida",
    tradition: "Mesopotamian",
    kind: "diĝir / ilu — a god of the netherworld and of vegetation",
    cls: "deity",
    plane: "Divine",
    native: { script: "cuneiform", tr: "Sumerian dNIN.ĜIŠ.ZI.DA, dnin-ĝiš-zi-da — conventionally “Lord of the Good/True Tree”", orig: "𒀭𒊩𒌆𒄑𒍣𒁕", note: "dNIN.GIŠ.ZI.DA: AN (U+1202D) + SAL (U+122A9) + TUG₂ (U+12306) + GIŠ (U+12111) + ZI (U+12363) + DA (U+12055). As with Ereškigal, the NIN element may equally be written with the ligature U+1238F. Verified against Unicode normative names. Syllabic variants dni-gi-si-da, dnin-gi-iz-zi-da are attested…" },
    office: "Throne-bearer (gu-za-lá) of the netherworld and one of its gatekeepers; a tree and serpent power.",
    context: "City-god of Ĝišbanda near Ur, and famously the personal god of Gudea of Lagaš, who names him as such in his cylinders and statue inscriptions. He is a son of Ninazu and Ningirida and husband of Ninazimua. His original character seems to be arboreal — the winding root — and he is represented in serpent form, with horned vipers rising from his shoulders on Gudea’s libation vase (Louvre AO 190), an image often reproduced and often misread. Like Dumuzi he is a dying-and-returning vegetation figure who spends part of the year below.",
    sources: "ORACC AMGG, “Ningišzida (god)”; Gudea Cylinders A and B (ETCSL 2.1.7); ETCSL 1.7.3, “Ningišzida’s Journey to the Nether World”; Wiggermann, “Nin-ĝišzida,” Reallexikon der Assyriologie 9.",
    confidence: "firm",
    light: "Essentially none, and this should be said rather than filled in. He is a chthonic and vegetal god whose sphere is root, gate and throne, not radiance. The one astral link sometimes proposed is with the constellation MUŠ (Hydra), which is plausible but is an identification made by scholars from later astral lists rather than a claim the early texts make.",
  },
  {
    id: "pazuzu",
    name: "Pazuzu",
    tradition: "Mesopotamian",
    kind: "An ilu lemnu / lilû-class demon — written as a divine name but belonging to the demon order, not to the great gods",
    cls: "intermediary",
    plane: "Daimonic",
    native: { script: "cuneiform", tr: "Akkadian Pazūzu (long ū), son of Ḫanpa/Ḫanbi.", orig: "𒉺𒍪𒍪", note: "Syllabic pa-zu-zu: PA (U+1227A) + ZU (U+1236A) + ZU (U+1236A). Verified against Unicode normative names. The name is also written with the divine determinative and other syllabic values — dpa₂-zu-zu is reported as 𒀭𒁀𒍪𒍪 (AN + BA U+12040 + ZU + ZU) — so an editor should expect variation; the form g…" },
    office: "King of the lilû wind-demons; brought in as a counter-power against Lamaštu.",
    context: "He appears only in the first millennium BCE, chiefly on bronze and stone amulets and heads rather than in narrative literature — his archaeology is far richer than his mythology. The inscription on the Louvre bronze MNB 467 has him speak in the first person: “I am Pazuzu, son of Ḫanpa, king of the evil wind-demons.” His head, with canine muzzle, bulging eyes, horns, wings, scorpion tail and serpent-headed phallus, was hung in doorways, worn at the neck and carried into the birth-chamber. His logic is homeopathic: a demon is set against a worse demon.",
    sources: "Heeßel, Pazuzu: Archäologische und philologische Studien zu einem altorientalischen Dämon (2002); Wiggermann, “The Four Winds and the Origins of Pazuzu,” in Das geistige Erfassen der Welt (2007); Louvre MNB 467; Black & Green (1992) s.v. “Pazuzu”.",
    confidence: "firm",
    light: "None. There is no radiance, illumination or astral role attached to Pazuzu in any source; his sphere is wind, threshold and averted harm. Any luminous Pazuzu belongs to modern reception, not to the texts.",
  },
  {
    id: "lamastu",
    name: "Lamaštu",
    tradition: "Mesopotamian",
    kind: "Written with the divine determinative and so formally an ilu, but functionally a demon — the ancient classification is genuinely ambiguous and that ambiguity is the point",
    cls: "adversary",
    plane: "Daimonic",
    native: { script: "cuneiform", tr: "Sumerian dDÌM.ME (dimme", note: "DELIBERATELY LEFT EMPTY — I could not verify the glyph string to the standard required, and a plausible-looking wrong spelling would be worse than none. The Sumerian logogram is transliterated dDÌM.ME (with the first sign variously read dìm₃, dìm₈, dìm₁₁, and recently re-read KAMAD, giving KAMAD.…" },
    office: "The killer of infants and of women in childbirth; she takes the child from the breast.",
    context: "She is the daughter of Anu, expelled from heaven for her nature — a divine being acting demonically, which is why she is written as a goddess and yet exorcised as a demon. The Lamaštu series of incantations and the accompanying amulets are among the best-documented ritual complexes in Akkadian, and Wiggermann’s study is the standard treatment. She is shown with a lion’s or bird’s head, ass’s ears and teeth, suckling a piglet and a whelp, standing on an ass in a boat on the river to the netherworld. Unlike ordinary demons she acts on her own initiative rather than at a god’s command.",
    sources: "Wiggermann, “Lamaštu, Daughter of Anu: A Profile,” in Stol, Birth in Babylonia and the Bible (2000), ch. X; Farber, Lamaštu: An Edition of the Canonical Series of Lamaštu Incantations (2014); Black & Green (1992) s.v. “Lamashtu”.",
    confidence: "contested",
    light: "None. She has no luminous or astral aspect; her sphere is the birth-chamber and the sick child.",
  },
  {
    id: "the-seven-apkallu",
    name: "The Seven Apkallū (Sages)",
    tradition: "Mesopotamian",
    kind: "apkallu — an order between god and man; not diĝir, not human, sent up out of the apsû",
    cls: "intermediary",
    plane: "Daimonic",
    native: { script: "cuneiform", tr: "Sumerian abgal", orig: "𒉣𒈨", note: "The glyphs given are the class-word abgal / apkallu, NUN (U+12263) + ME (U+12228), verified against Unicode normative names. I have NOT supplied a cuneiform string for the phrase “seven sages” or for the seven individual names (Uanna, Uannedugga, Enmedugga, Enmegalamma, Enmebulugga, Anenlilda, Ut…" },
    office: "Antediluvian culture-bringers sent by Ea to teach humanity the arts of civilisation; afterwards, guardian figures.",
    context: "They belong to a scheme in which seven sages precede the Flood and a line of human ummânū (master scholars) follows it — the pre-Flood knowledge is complete and the later tradition is transmission, not discovery. The first, Uanna, is the Oannes of Berossos’s Greek account, a fish-man who came ashore daily to teach and returned to the sea at night; the appending of “Adapa” to his name in some inscriptions has caused a persistent confusion between two distinct figures. The seventh, Utuabzu, “ascended to heaven”. Names, order and even the count vary between Bīt Mēseri, the Uruk List of Kings and Sages, and Berossos, so no single canonical list should be presented as the list.",
    sources: "Bīt Mēseri III (Reiner, “The Etiological Myth of the ‘Seven Sages’,” Orientalia 30, 1961); Uruk List of Kings and Sages (van Dijk 1962); Berossos, Babyloniaca (Burstein 1978); Wiggermann, Mesopotamian Protective Spirits (1992); Annus, “On the Origin of Watchers,” JSP 19 (2010).",
    confidence: "probable",
    light: "Modest and easy to overstate. The apkallū bring the arts, the crafts and the exorcistic corpus — knowledge, not radiance — and the sources do not describe them as shining. The equation of wisdom with light here is a modern gloss and should be flagged as such; the one genuine luminous-adjacent motif is Utuabzu’s ascent to heaven, and the name Utu-abzu itself couples the sun-god with the freshwater abyss.",
  },
  {
    id: "me",
    name: "me (the divine powers)",
    tradition: "Mesopotamian",
    kind: "NOT a class of being — a power held by gods; the tradition treats me as things possessed, seized, given and carried, not as agents",
    cls: "power",
    plane: "Noetic",
    native: { script: "cuneiform", tr: "Sumerian me (plural me-me, me-bi)", orig: "𒈨", note: "A single sign, ME (U+12228), verified against the Unicode normative name. In Akkadian the concept is rendered parṣu, written with different signs. NOT A PERSON — this is a power, an office, an ordinance; it takes no divine determinative and is never addressed, prayed to or given a cult. Any regis…" },
    office: "The set of ordinances that make civilisation work: each institution, craft, office and even each attitude has its me.",
    context: "The classic text is Inana and Enki, in which Inanna drinks with Enki at Eridu, is given the me one after another, loads them on the Boat of Heaven and carries them off to Uruk — a myth about the transfer of civilisation between cities told as a theft. The lists are startlingly heterogeneous: they include the priestly offices and kingship, but also the crafts, the arts of the scribe, sexual intercourse, prostitution, the giving of judgement, and — bluntly — “the plundering of cities”, “strife”, “falsehood”. That range is what makes “divine powers” only a convention: the me are not virtues but the whole given inventory of how things are done, good and terrible alike. No agreed etymology exists.",
    sources: "ETCSL 1.3.3, “Inana and Enki”; ETCSL 1.3.1, “Enki and the World Order”; Farber-Flügge, Der Mythos “Inanna und Enki” unter besonderer Berücksichtigung der Liste der me (1973); ePSD2 s.v. me [ME]; CAD P s.v. parṣu.",
    confidence: "firm",
    light: "Not a light concept, and it matters to say so. The me are structural and ordering, not luminous; the tradition keeps its light-vocabulary (melam, šarūru, nūru) separate from its ordinance-vocabulary. A treatise on light should place the me beside radiance as its complement — form and pattern against brightness — rather than assimilating one to the other.",
  },
  {
    id: "melammu",
    name: "melammu (the terrifying radiance)",
    tradition: "Mesopotamian",
    kind: "NOT a class of being — an attribute worn by gods, kings, temples, weapons and monsters; the sources describe it as put on and taken off like a garment or crown",
    cls: "power",
    plane: "Astral",
    native: { script: "cuneiform", tr: "Sumerian me-lám", orig: "𒈨𒉈", note: "Sumerian me-lam₂: ME (U+12228) + NE (U+12248). The value lam₂ belongs to the sign Unicode names NE — not to the sign named LAM (U+121F4) — and getting this wrong is an easy and invisible error. Verified against Unicode normative names; the lam₂ = NE identification is taken from the ETCSL sign lis…" },
    office: "The visible aura of legitimate and overwhelming power; awe made optically manifest.",
    context: "Among the oldest divine and royal attributes in cuneiform culture. The key structural point is the pairing: melammu is the radiance in the object, puluḫtu (Sumerian ní) is the terror it produces in the beholder — cause and effect named separately, which is a genuine piece of ancient phenomenology and not a modern distinction. It is detachable and transferable: a god grants it to a king, a defeated god or monster is stripped of it, Marduk is “clothed with the halo of ten gods”, and Ḫumbaba’s seven melammu must be removed before he can be killed. Temples and cult-images have it too, so it is not confined to persons.",
    sources: "Oppenheim, “Akkadian pul(u)ḫ(t)u and melammu,” JAOS 63 (1943) 31–34; Cassin, La splendeur divine (1968); CAD M/2 s.v. melammu; Aster, The Unbeatable Light: Melammu and Its Biblical Parallels (AOAT 384, 2012); Enūma eliš IV; Gilgameš V (Ḫumbaba’s auras).",
    confidence: "firm",
    light: "This is the tradition’s core light-concept and the one an architecture of light should build on. Melammu is not illumination — it does not help anyone see. It is radiance as authority and as danger: brightness that overwhelms the eye, compels submission, and cannot be looked at. Where Utu’s light reveals and judges, melammu simply overpowers. The distinction between light-that-shows and light-that-subdues is native to Akkadian and is the most useful thing Mesopotamia contributes to a comparative treatment of radiance.",
  },
  {
    id: "ra",
    name: "Ra (Re)",
    tradition: "Egyptian",
    kind: "nṯr ꜥꜣ — 'great god'; nb — 'lord'",
    cls: "deity",
    plane: "Divine",
    native: { script: "hieroglyphs", tr: "Rꜥ (also Rꜥw)", orig: "𓂋𓂝𓇳", note: "Egyptian hieroglyphs, normalised and linearised — monumental writing grouped these into quadrats and could run either way, so nothing here is a facsimile. D21 (mouth, r) + D36 (forearm, ꜥ) + N5 (sun disc). Two further writings are equally standard and both should be kept available: the logogram N…" },
    office: "The sun as a person: he sails the day sky and the twelve hours of the night, and his voyage is creation continuing rather than creation remembered.",
    context: "Attested from the earliest Old Kingdom material onward, and dominant from the Fifth Dynasty, when kings begin to build sun temples and to call themselves sꜣ Rꜥ, 'son of Re'. The Pyramid Texts already set the king's ascent in solar and stellar terms; the New Kingdom netherworld books (Amduat, Book of Gates, Book of Caverns) chart the night voyage hour by hour, with a crew aboard the barque that includes Sia and Hu, and in some registers Heka. In the Book of the Heavenly Cow he is an ageing king whose subjects conspire against him, and he answers by sending out his Eye. His true name is a hidden thing: in the tale of Isis and Re she extracts it from him by poison, and possession of it is possession of him.",
    sources: "Pyramid Texts; Amduat and Book of Gates (Hornung, The Ancient Egyptian Books of the Afterlife, 1999); Der ägyptische Mythos von der Himmelskuh (Hornung, 1982); Jan Assmann, Egyptian Solar Religion in the New Kingdom (1995); sign value N5 = ra in JSesh signs_description.xml",
    confidence: "firm",
    light: "He is not a god who has light as an attribute; his body is the visible daylight, and the eye that sees is figured as his. The horizon (ꜣḫt) is where he becomes effective, and the daily defeat of Apep is the condition under which the light returns at all.",
  },
  {
    id: "thoth",
    name: "Thoth (Djehuty)",
    tradition: "Egyptian",
    kind: "nṯr; nb Ḫmnw — 'lord of Khemenu (Hermopolis)'",
    cls: "deity",
    plane: "Divine",
    native: { script: "hieroglyphs", tr: "Ḏḥwtj", orig: "𓅝𓏏𓏭", note: "G26 (ibis on a standard — JSesh gives its value outright as ḏḥwtj) + X1 (t) + Z4 (the two oblique strokes writing the nisba ending y/j). With the divine classifier: 𓅝𓏏𓏭𓀭 (G26 X1 Z4 A40). G26 standing alone is the ordinary abbreviation, and C3, the ibis-headed god (U+1305F), serves as ideogram and…" },
    office: "Reckoner and scribe: he keeps the count of time, records the verdict at the weighing of the heart, and is the patron of writing and of the formulae that make writing act.",
    context: "His name is a nisba, 'he who is like the ibis', built on ḏḥw, taken as an old word for the bird. He is attested from the Old Kingdom, with his chief cult at Ḫmnw, which the Greeks renamed Hermopolis after identifying him with Hermes. He heals and restores the wounded eye, reckons the epagomenal days, and in the judgement scene stands at the balance with the palette. The Greek Hermetica of the Roman period grow out of this identification, but they are Greek philosophical texts and not translations of pharaonic Thoth material — treat the continuity as real and the equation as loose.",
    sources: "Gardiner, Egyptian Grammar, Sign List G26; sign values G26 = DHwty and C3 as ideogram/determinative in ḏḥwtj from JSesh signs_description.xml; Patrick Boylan, Thoth, the Hermes of Egypt (1922); Garth Fowden, The Egyptian Hermes (1986) on the Greek afterlife",
    confidence: "firm",
    light: "A moon god: the lunar eye, wounded and made whole, is his to restore, so he is the keeper of the light that measures rather than the light that blazes. Time itself is reckoned by that measured light.",
  },
  {
    id: "isis",
    name: "Isis",
    tradition: "Egyptian",
    kind: "nṯrt; wrt-ḥkꜣw — 'great of magic'",
    cls: "deity",
    plane: "Divine",
    native: { script: "hieroglyphs", tr: "Ꜣst", orig: "𓊨𓏏𓁐", note: "Q1 (the throne, whose value the sign lists give as ꜣs as well as st and ws) + X1 (t) + B1 (seated woman). This is the spelling the site already sets as `isis`, and I have kept it. The fuller writing 𓊨𓏏𓆇𓁐 (Q1 X1 H8 B1) inserts the egg, H8, used as a classifier in women's and goddesses' names in so…" },
    office: "The one who reassembles: she gathers the scattered Osiris, conceives Horus from him, and defends the child — and so becomes the model of every protective and healing spell.",
    context: "Attested from the Pyramid Texts, where she and Nephthys mourn and search. Her power is specifically operative rather than regal: the epithet wrt-ḥkꜣw, which the site already sets as a word in its own right, is hers before it is anyone's, and in the Turin poison-tale her knowledge of Re's secret name gives her leverage over the sun himself. Her cult outlives the pharaonic period by centuries and travels the Roman world; the Isis of Apuleius and the Isis of the Pyramid Texts are continuous but not identical, and the difference matters.",
    sources: "Pyramid Texts; Papyrus Turin 1993 (Isis and the secret name of Re); Robert K. Ritner, The Mechanics of Ancient Egyptian Magical Practice (SAOC 54, 1993); sign values for Q1 (As, st, ws) from JSesh signs_description.xml; the site's own src/lib/hieroglyphs.ts",
    confidence: "firm",
    light: "Her ba is identified with Sopdet, the star Sirius, whose heliacal rising after seventy days of invisibility opened the Egyptian year and heralded the flood — a light that returns on a reckonable schedule, which is why the star and the goddess were read together.",
  },
  {
    id: "osiris",
    name: "Osiris",
    tradition: "Egyptian",
    kind: "nṯr ꜥꜣ; nb ꜣbḏw — 'lord of Abydos'; Wnn-nfr — 'the perfected being'",
    cls: "deity",
    plane: "Divine",
    native: { script: "hieroglyphs", tr: "Wsjr", orig: "𓊨𓁹𓀭", note: "Q1 (throne) + D4 (eye) + A40 (seated god). The order is not stable and the instability is not error: the transposed writing 𓁹𓊨𓀭 (D4 Q1 A40), eye first, is extremely common and is what the reference works often print. Both should be treated as correct; if the site sets only one, set the throne-fir…" },
    office: "The murdered and restored king who rules the dead: the dead person becomes 'the Osiris N' and inherits his restoration.",
    context: "Attested from the Fifth Dynasty in the Pyramid Texts and central to funerary religion for the next two and a half millennia. Abydos becomes his principal cult place and the site of an annual procession. The Amduat's decisive moment is the union in the deepest hour of the night between the ba of Re and the corpse of Osiris, from which both are renewed — the doctrine that keeps the solar and Osirian systems from being alternatives. His name's spelling and its etymology are two separate questions and both are contested; keep them separate.",
    sources: "Pyramid Texts; Amduat, sixth hour (Hornung, The Ancient Egyptian Books of the Afterlife, 1999); J. Gwyn Griffiths, The Origins of Osiris and His Cult (1980); J. Zeidler's review of the etymological proposals (2000); sign values Q1 and D4 from JSesh signs_description.xml",
    confidence: "firm",
    light: "He is the still point the light must reach and return from: the sun does not shine on him from outside so much as unite with him at midnight in the lowest place. In the sky he is read as Orion, sꜣḥ, so the dead king's ascent is stellar as well as solar.",
  },
  {
    id: "anubis",
    name: "Anubis",
    tradition: "Egyptian",
    kind: "nṯr; jmy-wt — 'he who is in the place of embalming'; tpy-ḏw=f — 'he who is upon his mountain'; ḫnty-sḥ-nṯr — 'foremost of the god's booth'",
    cls: "deity",
    plane: "Divine",
    native: { script: "hieroglyphs", tr: "Jnpw", orig: "𓇋𓈖𓊪𓅱𓃣", note: "M17 (reed, j) + N35 (water, n) + Q3 (mat, p) + G43 (quail chick, w) + E16, the recumbent jackal on a shrine, which is his own sign. In monumental writing N35 and Q3 sit stacked in one quadrat; linearised they run in sequence. Older Old Kingdom practice writes the phonetic signs with the jackal ov…" },
    office: "Embalmer and guide: he makes the body fit to last, watches the desert edge where the cemeteries are, and leads the dead to the balance.",
    context: "One of the oldest funerary gods, prominent in Old Kingdom offering formulae before Osiris displaces him at the centre of the mortuary system, after which he keeps the technical offices — embalming, the necropolis, the conducting of the dead. In Book of the Dead 125 he brings the deceased into the hall and adjusts the balance. His epithets are precise about jurisdiction rather than grand, which is characteristic: an Egyptian god is largely what his epithets say he does.",
    sources: "Old Kingdom offering formulae; Book of the Dead 125; sign values E15/E16 = inpw and C6 = inpw from JSesh signs_description.xml (CC-BY); Gardiner, Egyptian Grammar, Sign List E16",
    confidence: "firm",
    light: "No solar or luminous role of his own, and it would be a distortion to invent one. His neighbouring claim on the site's subject is the Opening of the Mouth, the rite that restores the senses to the mummy — sight among them — so that the dead can see, eat and be addressed.",
  },
  {
    id: "sekhmet",
    name: "Sekhmet",
    tradition: "Egyptian",
    kind: "nṯrt; jrt-Rꜥ — 'the Eye of Re'; nbt-šꜥt — 'mistress of slaughter'",
    cls: "deity",
    plane: "Divine",
    native: { script: "hieroglyphs", tr: "Sḫmt", orig: "𓌂𓐍𓏏𓁐", note: "S42 (the sḫm-sceptre, whose value JSesh gives as sḫm alongside ꜥbꜣ and ḫrp) + Aa1 (ḫ, phonetic complement) + X1 (t, the feminine ending) + B1 (seated woman). The name is transparently the feminine of sḫm, 'to be powerful': 'she who is powerful'. Codepoints verified against the UCD — S42 is EGYPTI…" },
    office: "The lioness in whom the sun's power turns punitive: she burns, she brings plague, and by the same authority she withdraws it and heals.",
    context: "In the Book of the Heavenly Cow, Re sends out his Eye against a conspiring humanity; as Hathor-Sekhmet she will not stop, and is halted only when beer dyed with red ochre from Elephantine is flooded over the fields and she drinks it for blood. Her priesthood, the wꜥbw Sḫmt, are associated with medicine, which follows from the logic: whoever sends the arrows can call them off. Amenhotep III had hundreds of granodiorite statues of her set up around his mortuary temple and the precinct of Mut, a programme usually reconstructed as a litany in stone, two statues for each day of the year. The demon class called the ḫꜣtyw are her emissaries.",
    sources: "Der ägyptische Mythos von der Himmelskuh (Hornung, 1982); Betsy Bryan's work on the Mut precinct and the Sekhmet statuary (ARCE); the Sekhmet statues of Amenhotep III in the British Museum, reassessed in the published catalogue literature; sign value S42 = sxm from JSesh signs_description.xml; hieroglyphic spelling as given in the standard reference article, 𓌂𓐍𓏏𓁐",
    confidence: "firm",
    light: "She is solar light at its lethal end — the Eye detached from the face that governs it, heat rather than illumination. The uraeus on the sun's brow is the same idea in miniature: the burning that protects.",
  },
  {
    id: "hathor",
    name: "Hathor",
    tradition: "Egyptian",
    kind: "nṯrt; jrt-Rꜥ — 'the Eye of Re'; nbwt — 'the Golden One'; nbt-mfkꜣt — 'lady of turquoise'",
    cls: "deity",
    plane: "Divine",
    native: { script: "hieroglyphs", tr: "Ḥwt-Ḥr", orig: "𓉡", note: "A single sign, O10 (U+13261): the falcon set inside the plan of an enclosure — the sign lists analyse it as O6, the ḥwt-enclosure, containing G5, the Horus falcon, and JSesh gives O10 the value ḥwt-ḥr outright. The name reads 'House of Horus'. A linearised writing of one logogram is exact here ra…" },
    office: "Sky, love, music, drunkenness and the welcome of the dead — and, in the other register, the Eye that goes out and has to be brought back.",
    context: "Attested from the Old Kingdom and among the most widely worshipped of all Egyptian goddesses, with a great late temple at Dendera. She is a cow, a woman with cow's horns and a disc, and a lioness by turns; the sistrum and the menit-necklace are her instruments, and their sound is part of her cult rather than decoration. She and Sekhmet are two phases of one story in the Heavenly Cow, which is why an editor should not treat 'Hathor' and 'Sekhmet' as simply different goddesses — the tradition itself moves between them.",
    sources: "Gardiner, Egyptian Grammar, Sign List O10; sign value O10 = Hwt-Hr from JSesh signs_description.xml (CC-BY); Der ägyptische Mythos von der Himmelskuh (Hornung, 1982); the Dendera temple publications",
    confidence: "firm",
    light: "Her standing epithet is nbwt, 'the Golden One', and gold in Egypt is the flesh of the gods and the colour of the sun's own body; she carries the disc between her horns. The returning Distant Goddess, appeased and brought home, is the light coming back into relation with the one who sent it.",
  },
  {
    id: "maat",
    name: "Maʼat",
    tradition: "Egyptian",
    kind: "nṯrt — and, inseparably, an abstract noun: the order itself",
    cls: "deity",
    plane: "Divine",
    native: { script: "hieroglyphs", tr: "Mꜣꜥt", orig: "𓐙𓂝𓏏𓆄", note: "Kept exactly as the site already sets it: Aa11 (the plinth a statue stands true on) + D36 (ꜥ) + X1 (t) + H6 (the ostrich feather). The goddess is written with the same three phonetic signs closed by C10, the seated goddess wearing the feather: 𓐙𓂝𓏏𓁪 (Aa11 D36 X1 C10), also already registered. Noth…" },
    office: "Right order: the measure a thing is true to, personified as the daughter of Re and offered back to the gods by the king.",
    context: "The one point to add beyond what the site already carries is that the word and the goddess are not two things with one name. The king's characteristic offering is a small figure of Maʼat held out in the palm — the offering of order itself — and the texts say the gods live on Maʼat. At the judgement it is her feather, not her person, that occupies the other pan of the balance. Coffin Text 1130 has the creator list making the great inundation, making every man like his fellow, and making the four winds among his good deeds, which is the same doctrine stated as policy.",
    sources: "Coffin Texts 1130; Jan Assmann, Maʼat: Gerechtigkeit und Unsterblichkeit im Alten Ägypten (1990); the site's own src/lib/hieroglyphs.ts",
    confidence: "firm",
    light: "Daughter of Re, and the criterion under which his light is legitimate rather than merely powerful: light without measure, in this system, is Sekhmet unstopped.",
  },
  {
    id: "heka",
    name: "Heka",
    tradition: "Egyptian",
    kind: "nṯr",
    cls: "deity",
    plane: "Divine",
    native: { script: "hieroglyphs", tr: "Ḥkꜣ", orig: "𓎛𓂓𓄿𓀭", note: "Kept exactly as the site already sets it in `hekaGod`: V28 (wick of twisted flax, ḥ) + D28 (two raised arms, kꜣ) + G1 (vulture, ꜣ) + A40 (seated god). The same three phonetic signs closed by Y1 instead give the common noun, 𓎛𓂓𓄿𓏛, and with G43 and Z2 the plural ḥkꜣw — all three already registered.…" },
    office: "The operative power itself, given a person: the force that makes a rite act rather than merely mean.",
    context: "What is worth adding to the site's existing treatment is the earliness and the boldness of his claim. Coffin Text 261 is a spell for becoming Heka, and in it the god says the universe was his before the gods came into being, that they came afterwards, because he is Heka. He is a member of the sun's crew and can appear in the barque in place of Sia and Hu, which is exactly what one would expect if he is the compound of which they are the parts. Robert Ritner's study is the standard corrective to reading ḥkꜣ as 'magic' in the modern, disreputable sense: in Egypt it is a neutral technology of the cosmos, practised in temples by lector priests.",
    sources: "Coffin Texts spell 261; Robert K. Ritner, The Mechanics of Ancient Egyptian Magical Practice (SAOC 54, 1993); the site's own src/lib/hieroglyphs.ts",
    confidence: "firm",
    light: "The site already puts him with Sia and Hu at the heart-and-tongue doctrine; the light connection is that the power is exercised by uttering, and the utterance is what makes the pattern operative.",
  },
  {
    id: "sia",
    name: "Sia",
    tradition: "Egyptian",
    kind: "nṯr",
    cls: "deity",
    plane: "Noetic",
    native: { script: "hieroglyphs", tr: "Sjꜣ", orig: "𓋷𓇋𓄿𓀭", note: "Kept exactly as the site already sets it: S32 (the fringed cloth, value sjꜣ) + M17 (reed, j) + G1 (vulture, ꜣ) + A40 (seated god). Codepoints re-verified — S32 is EGYPTIAN HIEROGLYPH S032 at U+132F7, and JSesh confirms the sign's value as sjꜣ." },
    office: "Perception, personified: the discernment by which the creator sees the form before it exists.",
    context: "Added to what the site already says: in the Book of Gates and the Amduat, Sia is a permanent member of the barque's crew rather than an occasional figure, standing with Hu beside Re through the hours of the night. The pairing is a doctrine, not a decoration — Sia is the seeing and Hu the saying, and the Memphite theology's heart and tongue are the same distinction stated anatomically.",
    sources: "Book of Gates and Amduat (Hornung, The Ancient Egyptian Books of the Afterlife, 1999); Memphite Theology (the Shabaka Stone); the site's own src/lib/hieroglyphs.ts",
    confidence: "firm",
    light: "The closest thing in the Egyptian material to light as knowing: Sia is the god of the faculty by which anything is discerned at all, and he stands where the light goes first, at the prow.",
  },
  {
    id: "hu",
    name: "Hu",
    tradition: "Egyptian",
    kind: "nṯr",
    cls: "deity",
    plane: "Noetic",
    native: { script: "hieroglyphs", tr: "Ḥw", orig: "𓎛𓅱𓀭", note: "Kept exactly as the site already sets it in `huGod`: V28 (ḥ) + G43 (quail chick, w) + A40 (seated god). The common noun ḥw, authoritative utterance, is written with A2, the man with his hand to his mouth, instead — 𓎛𓅱𓀁 — and is already registered." },
    office: "Authoritative utterance: the word that, being spoken by one with the standing to speak it, is the thing done.",
    context: "To add: Hu is not eloquence and not command in the military sense. The word denotes the pronouncement whose saying is its accomplishment, which is why he sails with Re and with Sia — the creator perceives and pronounces, and the world follows. In the netherworld books the pair are constants of the crew; the substitution of Heka for them in some registers is the tradition's own way of saying that the two are one power seen from two sides.",
    sources: "Book of Gates and Amduat; Memphite Theology (the Shabaka Stone); the site's own src/lib/hieroglyphs.ts",
    confidence: "firm",
    light: "Where the site treats light and word together, this is the god that stands at that joint: the utterance is the act by which what was perceived becomes visible.",
  },
  {
    id: "ammit",
    name: "Ammit (Ammut)",
    tradition: "Egyptian",
    kind: "No class word of her own: the sources name her by epithet. Modern scholarship files her among the punishing and guardian demons, not among the nṯrw",
    cls: "adversary",
    plane: "Daimonic",
    native: { script: "hieroglyphs", tr: "ꜥm-mwt", orig: "𓂝𓅓𓄈𓅓𓏏𓏥𓀐", note: "Set this one with care, or not at all until it is checked. The sequence is D36 (ꜥ) + G17 (m) + F10 (head and neck of an animal — JSesh gives F10 the value ꜥm, 'swallow', alongside ḥtyt and ḫḫ, 'throat') + G17 (m) + X1 (t) + Z2 (plural strokes) + A14 (the fallen man, the classifier for the dead). …" },
    office: "The devourer at the balance: she waits beside the scales and eats the heart that fails, which ends the dead person absolutely.",
    context: "Her name is a compound of ꜥm, 'to swallow', and mwt, 'the dead' — the same mwt that names the dangerous dead in the class vocabulary above. She belongs to the New Kingdom judgement scene of Book of the Dead 125, with the forequarters of a lion, the hindquarters of a hippopotamus and a crocodile's head: the three animals that ate people. She has no temple, no priesthood, no offerings and no myth of her own; she is a function of the judgement hall. Her titles in the late lists include forms of 'devourer of the dead' and 'great of death'. Modern film and television have made her a character with intentions, which she is not.",
    sources: "Book of the Dead 125 and its vignettes; Christian Leitz (ed.), Lexikon der ägyptischen Götter und Götterbezeichnungen (LGG), OLA 110–116, vol. II; Rita Lucarelli on demons in the Book of the Dead",
    confidence: "contested",
    light: "Nothing. She is the terminus where the process stops, and the sources give her no luminous quality whatever — the register is the better for saying so plainly.",
  },
  {
    id: "apep",
    name: "Apep (Apophis)",
    tradition: "Egyptian",
    kind: "sbj — 'rebel'; ḫfty — 'enemy'. Emphatically not a nṯr in the cultic sense: he receives no offering",
    cls: "adversary",
    plane: "Daimonic",
    native: { script: "hieroglyphs", tr: "ꜥꜣpp", orig: "𓉻𓊪𓊪𓆙", note: "O29 (the horizontal wooden column, value ꜥꜣ) + Q3 (mat, p) + Q3 (p) + I14, the cobra, which JSesh gives as the determinative for ḥfꜣw, 'snake'. Taken from the Unicode string given in the standard reference article and decoded character by character against the UCD — the source string carries the …" },
    office: "The serpent that attacks the sun barque at the edge of night and must be repelled every day, without ever being finally destroyed.",
    context: "He is believed to be primeval but is not named until the Middle Kingdom, appearing in the Coffin Texts as the serpent that threatens the sun's passage; the elaborated mythology belongs to the New Kingdom netherworld books. The Bremner-Rhind papyrus preserves the Book of Overthrowing Apep, a temple ritual in which he is modelled in wax or drawn on papyrus, named, then spat on, trampled, stabbed, cut and burned — and each of his names is cursed separately, because the name is a handle on the thing. His defeat is never permanent: the point of a daily rite is that the threat is daily. Modern occult 'Apep workings' are a twentieth-century invention with no ancient warrant.",
    sources: "Coffin Texts; Papyrus Bremner-Rhind, the Book of Overthrowing Apep (R. O. Faulkner's edition and translations, JEA 1933–38); Amduat and Book of Gates; sign values O29 = ꜥꜣ and I14 = ḥfꜣw from JSesh signs_description.xml",
    confidence: "probable",
    light: "He is the standing counter-term to the whole solar system of meaning: not evil as a moral principle but the un-created, the swallowing dark at the boundary. The Egyptians did not treat sunrise as automatic, and he is the reason.",
  },
  {
    id: "the-ogdoad-of-hermopolis",
    name: "The Ogdoad of Hermopolis",
    tradition: "Egyptian",
    kind: "nṯrw — but a specific collective: four pairs, male and female, spoken of together and rarely apart",
    cls: "emanation",
    plane: "Divine",
    native: { script: "hieroglyphs", tr: "Ḫmnyw", note: "Deliberately left empty. The group name is securely attested in transliteration — ḫmnyw, a plural nisba built on ḫmnw, 'eight', the same word that names their city — and the etymology is not in doubt. But I could not reach a dictionary, lemma record or corpus edition that would let me state a nor…" },
    office: "The eight who are the condition before creation: they are not makers so much as the state out of which the first light comes.",
    context: "Four couples, each an aspect of the pre-creation: Nun and Naunet, the waters; Heh and Hauhet, endlessness; Kek and Kauket, darkness; Amun and Amaunet, hiddenness. In late texts the males are frog-headed and the females serpent-headed. Their cult centre is Ḫmnw, which the Greeks called Hermopolis after Thoth. The Hermopolitan account is one of several Egyptian cosmogonies that ran alongside each other without being harmonised — Heliopolitan, Memphite, Hermopolitan, Theban — and it is a modern habit, not an Egyptian one, to rank them or to seek the 'real' version. Amun's presence in the group and his later career as the great god of Thebes are related but should not be collapsed.",
    sources: "The Hermopolitan cosmogony as summarised in the standard handbooks; Hornung, Conceptions of God in Ancient Egypt (1982), on multiple cosmogonies held together; Kurt Sethe, Amun und die acht Urgötter von Hermopolis (1929)",
    confidence: "probable",
    light: "This is the Egyptian doctrine of what precedes light. The Ogdoad name the water, the endlessness, the darkness and the hidden, and the sun emerges out of them — on a mound, or from a lotus, or from an egg, depending on the text. Kek and Kauket in particular give darkness a personal name, which is a strong claim: the dark here is a condition with a face, not merely an absence.",
  },
  {
    id: "the-akh",
    name: "The akh",
    tradition: "Egyptian",
    kind: "ꜣḫ — its own class, distinct from nṯr above it and mwt beside it",
    cls: "ancestor",
    plane: "Ancestral",
    native: { script: "hieroglyphs", tr: "ꜣḫ (pl. ꜣḫw)", orig: "𓅜𓐍𓏛", note: "Kept exactly as the site already sets it: G25 (crested ibis, value ꜣḫ) + Aa1 (ḫ) + Y1 (rolled papyrus). Plural ꜣḫw with G43 and Z2, 𓅜𓐍𓅱𓏥, also already registered. Included here as a being and not only as a class word because the Egyptians treated it as one: an ꜣḫ is somebody, with a name, who can…" },
    office: "A dead person made effective: able to act for or against the living, and addressed accordingly.",
    context: "The state is achieved, not automatic. Sꜣḫw, the glorification spells, are literally the operations that make an ꜣḫ, and the funerary literature exists largely to perform them. The living wrote to their akhu — the so-called Letters to the Dead, on bowls and linen, ask a dead relative to intervene in a lawsuit or lift an illness. At Deir el-Medina, anthropoid busts and stelae for the ꜣḫ jqr n Rꜥ, 'the excellent akh of Re', mark a domestic cult of these dead. The class boundary matters and the sources hold it: a dead person judged in Maʼat becomes an ꜣḫ; one who is not stays a mwt, and the mwt are hostile.",
    sources: "Jiří Janák, 'Akh', UCLA Encyclopedia of Egyptology (2013), https://escholarship.org/uc/item/7255p86v; the Letters to the Dead (Gardiner and Sethe, Egyptian Letters to the Dead, 1928); Robert J. Demarée, The ꜣḫ jḳr n Rꜥ-Stelae (1983); the site's own src/lib/hieroglyphs.ts",
    confidence: "firm",
    light: "This is the strongest light-word in the Egyptian anthropology. Jiří Janák argues the root is bound to jꜣḫw, 'light, radiance, glow', and Jansen-Winkeln reads the original notion as the sun's efficacy at the horizon, where the light is visible while its source is hidden — so 'effective' and 'luminous' are not two meanings but one. The ꜣḫt, horizon, is the same root. Being made effective and being made to shine are the same operation.",
  },
];

// ── reading the register ───────────────────────────────────────────────────

export const traditionsOf = (rows: Being[]) => [...new Set(rows.map((b) => b.tradition))].sort();
export const classLabel = (k: ClassKey) => CLASSES.find((c) => c.k === k)?.label ?? k;
export const kindsFor = (tradition: string) => KINDS.filter((k) => k.tradition === tradition);
