/**
 * The Hidden Ecology of Formation — the six stations of one circulation, in
 * the order the circulation runs.
 *
 * The Architecture describes the invisible as planes, forces, correspondences
 * and substances. This layer describes it as an ecology: something that has
 * weather, is fed, circulates, takes vessels, exhausts them, inherits their
 * architecture and retains their consequence, and from the altered conditions
 * becomes again. Each station answers one governing question, and the order
 * is the argument — which is why the pages are navigated in this order and
 * why the last returns to the first at a different level.
 *
 * Nothing here is a fluid, a database or an energy. Every station is a
 * relation described by an analogy the text is careful to mark as one.
 */

export type StationId = "morphaither" | "sap" | "hydrology" | "form" | "ossuary" | "crypt";

export type Station = {
  id: StationId;
  to: `/ecology/${StationId}`;
  /** The station's number in the circulation, as a word for prose. */
  n: string;
  title: string;
  /** Where the treatise already gives the term a Greek form, that form. Never coined here. */
  greek?: string;
  /** The dimension of the ecology this station is. */
  dimension: string;
  /** The question the station exists to answer. */
  question: string;
  /** The one-word shorthand. */
  shorthand: string;
  /** The thirty-second definition. */
  definition: string;
  /** The hero backdrop and its position. */
  backdrop: string;
  position: string;
};

export const STATIONS: Station[] = [
  {
    id: "morphaither",
    to: "/ecology/morphaither",
    n: "I",
    title: "Morphaithēr",
    greek: "Μορφαιθήρ",
    dimension: "Condition · Atmosphere",
    question: "Under what conditions does becoming occur?",
    shorthand: "the weather",
    definition:
      "The living qualitative atmosphere of becoming: the conditioned subtle environment within which formation occurs. Nothing manifests in a metaphysical vacuum — every formative influence arrives into an environment that is already weather.",
    backdrop: "cliff-road-vanishing-into-fog",
    position: "center 45%",
  },
  {
    id: "sap",
    to: "/ecology/sap",
    n: "II",
    title: "The Sap of Heaven",
    dimension: "Nourishment · Descent",
    question: "What feeds becoming?",
    shorthand: "the nourishment",
    definition:
      "The nutritive dimension of procession: higher formative influence considered in so far as it becomes available, as nourishment, to the orders beneath it. Not a fluid and not an energy — the manner in which higher possibility becomes life-bearing contribution.",
    backdrop: "leaf-and-root-system-in-cross-section",
    position: "center 55%",
  },
  {
    id: "hydrology",
    to: "/ecology/hydrology",
    n: "III",
    title: "Etheric Hydrology",
    dimension: "Circulation · Distribution",
    question: "How does formative influence move?",
    shorthand: "the circulation",
    definition:
      "The study of how formative influence moves — its reception, channelling, accumulation, obstruction, filtration, transformation, release and return — modelled on the behaviour of water in a landscape, and marked at every step as a model.",
    backdrop: "braided-glacial-river-from-above",
    position: "center 50%",
  },
  {
    id: "form",
    to: "/ecology/form",
    n: "IV",
    title: "Living Form",
    dimension: "Embodiment · Participation",
    question: "What holds the current, and for how long?",
    shorthand: "the vessel",
    definition:
      "The intersection of the whole ecology: a temporary architecture of participation that receives, contains, differentiates, transmits, transforms and releases — and that ends when it can no longer sustain the relation for which it exists.",
    backdrop: "keystone-set-in-lit-stone-vault",
    position: "center 50%",
  },
  {
    id: "ossuary",
    to: "/ecology/ossuary",
    n: "V",
    title: "The Ossuary of Living Forms",
    greek: "Ὀστοφυλάκιον",
    dimension: "Morphological Inheritance",
    question: "What architectures does previous life leave behind?",
    shorthand: "the inheritance",
    definition:
      "The morphological inheritance of becoming. Forms perish; their architectures remain available. Graveyard, library, workshop and quarry at once — the future scavenges the past.",
    backdrop: "nurse-log-in-foggy-forest",
    position: "center 55%",
  },
  {
    id: "crypt",
    to: "/ecology/crypt",
    n: "VI",
    title: "The Crypt of Primordial Memory",
    greek: "Κρύπτη",
    dimension: "Ontological Memory · Retained Consequence",
    question: "What does becoming remember?",
    shorthand: "the memory",
    definition:
      "The retentive depth of existence. Not a recording of what happened but the persistence of its consequence: what has occurred enters the conditions of what may occur thereafter. Existence is conditioned by having already existed.",
    backdrop: "layered-strata-in-dark-passage",
    position: "center 50%",
  },
];

export const station = (id: StationId) => STATIONS.find((s) => s.id === id)!;

/** Each station hands the reader to the next in its own words — the text a
 *  transition shows, and the station it leads to. The last leads to the first,
 *  which is the whole point: the circulation is a spiral, not a ring. */
export const TRANSITIONS: Record<StationId, { line: string; to: StationId }> = {
  morphaither: { line: "The atmosphere establishes the conditions — but what enters the atmosphere as nourishment?", to: "sap" },
  sap: { line: "Nourishment must travel. Follow the current.", to: "hydrology" },
  hydrology: { line: "Every current eventually encounters architecture.", to: "form" },
  form: { line: "Forms perish, but their architectures do not simply disappear.", to: "ossuary" },
  ossuary: { line: "Architecture is not the only thing the world retains.", to: "crypt" },
  crypt: { line: "Memory alters the conditions of everything that follows. The circulation returns — one level on.", to: "morphaither" },
};

/** The circulation in the order the overview and the spiral draw it. */
export const CIRCULATION = [
  { k: "Morphaithēr", sub: "Atmosphere · Condition", to: "morphaither" as StationId },
  { k: "The Sap of Heaven", sub: "Nourishment · Procession", to: "sap" as StationId },
  { k: "Etheric Hydrology", sub: "Circulation · Distribution", to: "hydrology" as StationId },
  { k: "Living Form", sub: "Embodiment · Participation", to: "form" as StationId },
  { k: "Dissolution", sub: "The vessel ends; the economy continues", to: "form" as StationId },
  { k: "The Ossuary of Living Forms", sub: "Architecture retained", to: "ossuary" as StationId },
  { k: "The Crypt of Primordial Memory", sub: "Consequence retained", to: "crypt" as StationId },
  { k: "Altered Conditions of Becoming", sub: "The inherited world", to: "morphaither" as StationId },
  { k: "New Formation", sub: "At another level of the spiral", to: "morphaither" as StationId },
];

/** The three laws the whole layer rests on. Not quotations: axioms. */
export const LAWS = [
  {
    k: "The great law beneath the system",
    text: "What receives force is changed by it; what is changed alters the reception of every force that follows.",
  },
  {
    k: "The law of the channel",
    text: "Flow creates channels, and channels determine future flow.",
  },
  {
    k: "The law of the altered world",
    text: "The future never receives the Sap of Heaven through exactly the same world twice.",
  },
];

/** The shorthand the visitor should leave with. */
export const SHORTHAND: [string, string][] = [
  ["Morphaithēr", "is the weather."],
  ["The Sap of Heaven", "is the nourishment."],
  ["Etheric Hydrology", "is the circulation."],
  ["Living Form", "is the vessel."],
  ["The Ossuary", "is the inheritance."],
  ["The Crypt", "is the memory."],
  ["Becoming", "is the river passing through them all."],
];
