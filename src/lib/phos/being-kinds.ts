/**
 * The register's vocabularies — its comparative classes, the volume's planes,
 * and the order the traditions are met in — with none of its entries.
 *
 * Split from beings.ts because the register's route validates its search
 * parameters against these, and a route's options are evaluated when the app
 * loads, not when the page does: a single reference to the register from there
 * would put a quarter of a megabyte of it into the chunk every page fetches.
 */

/** The register's own comparative classes — a finding aid, not a doctrine. */
export const CLASSES = [
  { k: "deity", label: "Deity", d: "A god of a tradition's own cult: named, worshipped, and treated as a person rather than a principle." },
  { k: "emanation", label: "Emanation", d: "A being that is what it is by proceeding from something prior — an aeon, a hypostasis, a light of the vertical order." },
  { k: "messenger", label: "Messenger", d: "A being whose office is to carry: angels, heralds, the ones sent." },
  { k: "intermediary", label: "Intermediary", d: "Daimons, jinn, spirits of place — the populous middle, neither divine nor human, which most traditions treat as morally mixed." },
  { k: "archon", label: "Archon", d: "A ruler of a lower order: in the Gnostic texts the makers and keepers of the world below, who are not evil so much as ignorant of what stands above them." },
  { k: "awakened", label: "Awakened one", d: "A buddha or a bodhisattva. Not a god in the tradition's own reckoning, and the register keeps the distinction rather than filing them among the deities." },
  { k: "adversary", label: "Adversary", d: "A being whose office is opposition, obstruction or accusation. Not every tradition makes this a separate class, and where it does not, saying so matters." },
  { k: "guardian", label: "Guardian", d: "A being attached to a person, a house, a threshold or a city, whose office is to keep it." },
  { k: "ancestor", label: "Ancestor", d: "The transfigured, remembered or fed dead, where a tradition treats them as continuing agents." },
  { k: "power", label: "Personified power", d: "A force the sources name and address without quite making a person of it — heka, me, melammu, the Glory." },
] as const;

export type ClassKey = (typeof CLASSES)[number]["k"];

/** The planes, as the Luminous Anatomy already uses them. */
export const PLANES = ["Divine", "Noetic", "Angelic", "Daimonic", "Psychic", "Astral", "Imaginal", "Etheric", "Elemental", "Ancestral"] as const;
export type Plane = (typeof PLANES)[number];

/** The traditions in the order the encyclopaedia meets them. */
export const TRADITION_ORDER = [
  "Mesopotamian", "Egyptian", "Greek", "Jewish", "Christian and Gnostic",
  "Iranian", "Vedic", "Buddhist", "Daoist", "Islamic",
] as const;

export const classLabel = (k: ClassKey) => CLASSES.find((c) => c.k === k)?.label ?? k;
