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

export type StationId =
  | "morphaither" | "sap" | "hydrology" | "form" | "ossuary" | "crypt"
  | "sea" | "nursery" | "aquifer" | "catacombs" | "garden" | "hungry";

export type Station = {
  id: StationId;
  to: `/ecology/${StationId}`;
  /** The station's number in the circulation, as a word for prose. */
  n: string;
  /** Set on a province — a page that is not a station — to say where it lies in relation to them. */
  region?: string;
  /** A province's short name for the strips and cards. */
  short?: string;
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
    backdrop: "bone-white-vaulted-hall-with-fossils",
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

/**
 * Beneath the six stations, one stratum. The Black Aquifer is not a seventh
 * station — the circulation is complete at six — but the depth force settles
 * into when it leaves the circulation without completing it, and from which
 * it may rise again. It is reached by descending from Etheric Hydrology and
 * left by rising into Living Form, so the navigation enacts the doctrine:
 * descent, latency, return.
 */
export const AQUIFER: Station = {
  id: "aquifer",
  to: "/ecology/aquifer",
  n: "↓",
  region: "Beneath the stations",
  short: "Aquifer",
  title: "The Black Aquifer",
  dimension: "Retention · Pressure · Return",
  question: "Where does force go when form fails?",
  shorthand: "the groundwater",
  definition:
    "The deep reservoir into which force descends when it is no longer carried by a living form, yet has not ceased to possess tendency, memory or power. Not literal water, and not a name for the unconscious: a subterranean condition of the subtle world, in which force is retained, transported, mingled, and sometimes returned to manifestation.",
  backdrop: "cave-pool-under-single-light-shaft",
  position: "center 50%",
};

/**
 * The provinces: the regions beneath, before, between and after the six
 * stations. None is a station. Each is a place the circulation's argument
 * reaches and cannot hold — the field all mediation happens in, the
 * gestation before form, the depth beneath it, the afterlife of the sacred
 * form, the allure residues acquire, and the appetite of a form that has
 * lost its return — and each hands the reader back toward the vessel.
 */
export const PROVINCES: Station[] = [
  {
    id: "sea",
    to: "/ecology/sea",
    n: "≈",
    region: "Between the stations",
    short: "Sea",
    title: "The Sea Between Causes",
    dimension: "Mediation · Passage · Confluence",
    question: "What happens between a cause and its effect?",
    shorthand: "the between",
    definition:
      "The field of mediation in which causes meet before an effect appears. Not an empty distance through which causation travels but a productive medium — currents, tides, confluences, eddies, sediment — that participates in what a cause becomes. Every effect is an estuary.",
    backdrop: "moon-over-tidal-flats-and-channel",
    position: "center 50%",
  },
  {
    id: "nursery",
    to: "/ecology/nursery",
    n: "○",
    region: "Before the stations",
    short: "Nursery",
    title: "The Nursery of Unborn Forms",
    dimension: "Gestation · Selection · Birth",
    question: "What has not yet become enough itself to live?",
    shorthand: "the gestation",
    definition:
      "The gestational province of Morphaithēr, where forces acquire contour, relation and the first intimations of a possible body. Not a warehouse of blueprints: tendencies becoming patterns, patterns seeking organs, possibilities discovering what existence could truthfully receive them — and not every possible form should be given a body.",
    backdrop: "germinating-seed-with-fine-roots",
    position: "center 50%",
  },
  AQUIFER,
  {
    id: "catacombs",
    to: "/ecology/catacombs",
    n: "⌂",
    region: "After the cult",
    short: "Catacombs",
    title: "The Catacombs of Forgotten Gods",
    dimension: "Afterlife · Sacred Form · Return",
    question: "What becomes of a god's house when the god has gone?",
    shorthand: "the afterlife of the sacred",
    definition:
      "The relational underworld in which once-sacred architectures persist: displaced god-forms, extinguished cults, deserted names, broken rites, deconsecrated places, residual egregores and fragments of former hierophanies, in unequal states of preservation. Not a cavern and not a museum of false beliefs — the subterranean memory of humanity's sacred experiments.",
    backdrop: "star-trails-over-ruined-temple",
    position: "center 45%",
  },
  {
    id: "garden",
    to: "/ecology/garden",
    n: "✱",
    region: "Where residue acquires allure",
    short: "Garden",
    title: "The Garden of Counterfeit Flowers",
    dimension: "Appearance · Selection · Fruit",
    question: "How can a form be real and its name be false?",
    shorthand: "the allure",
    definition:
      "The region of the subtle ecology in which forms flourish by appearing to possess a lineage, authority or purpose they do not bear. Its flowers are visions, doctrines, spirit-images, revelations, symbols and myths that show the colour of one origin while drawing nourishment from another — and they are most deceptive where something in them is alive.",
    backdrop: "crystal-grove-in-flooded-hall",
    position: "center 50%",
  },
  {
    id: "hungry",
    to: "/ecology/hungry",
    n: "◐",
    region: "When circulation fails",
    short: "Hungry Forms",
    title: "Hungry Forms and Egregores",
    dimension: "Appetite · Collective Life · Return",
    question: "What becomes of a form that must be fed to go on existing?",
    shorthand: "the appetite",
    definition:
      "A hungry form is a subtle formation that cannot sustain itself through right relation and so seeks repeated nourishment without achieving completion. An egregore is a collectively sustained form with continuity, memory, atmosphere and some reciprocal influence over its group. They overlap and are not identical: hunger is not a species of entity but a disorder of relationship.",
    backdrop: "starling-murmuration-over-field",
    position: "center 50%",
  },
];

export const isProvince = (id: string) => PROVINCES.some((p) => p.id === id);

export const station = (id: StationId) => [...STATIONS, ...PROVINCES].find((s) => s.id === id)!;

/** Each station hands the reader to the next in its own words — the text a
 *  transition shows, and the station it leads to. The last leads to the first,
 *  which is the whole point: the circulation is a spiral, not a ring. */
export const TRANSITIONS: Record<StationId, { line: string; to: StationId; eyebrow?: string; label?: string; note?: string }> = {
  morphaither: { line: "The atmosphere establishes the conditions — but what enters the atmosphere as nourishment?", to: "sap" },
  sap: { line: "Nourishment must travel. Follow the current.", to: "hydrology" },
  hydrology: { line: "Every current eventually encounters architecture.", to: "form" },
  form: { line: "Forms perish, but their architectures do not simply disappear.", to: "ossuary" },
  ossuary: { line: "Architecture is not the only thing the world retains.", to: "crypt" },
  crypt: { line: "Memory alters the conditions of everything that follows. The circulation returns — one level on.", to: "morphaither" },
  aquifer: {
    line: "What the water has kept must be given a body again — and it is judged by the body it is given.",
    to: "form",
    eyebrow: "Anodos · the upward return",
    label: "Rise to",
    note: "Not back into the circulation, and not straight to the surface. What rises from the depth is released from a dead form and re-patterned into a living one, which is why the way up leads to the vessel — and why the vessel, not the rising, decides whether the return was a return to health.",
  },
  sea: {
    line: "What the sea holds in suspension waits for a condition. Where a condition is made and kept, gestation begins.",
    to: "nursery",
    eyebrow: "The between, continued",
    label: "On to",
    note: "The Sea is the field every province and station lies in; it hands on to the one where a possibility first acquires enough enclosure to become a pattern.",
  },
  nursery: {
    line: "A form that has earned a body is born into the intersection of the whole ecology — and is judged there by what it does with what passes through it.",
    to: "form",
    eyebrow: "Birth",
    label: "Born into",
    note: "The Nursery does not end in itself. What it allows to be born enters Living Form; what it refuses returns to Morphaithēr, sinks to the Aquifer, leaves a bone in the Ossuary or a consequence in the Crypt.",
  },
  catacombs: {
    line: "Sometimes only the empty throne returns, searching for another occupant. What claims it is judged where forms compete by allure.",
    to: "garden",
    eyebrow: "The empty throne",
    label: "On to",
    note: "A returning god-form must pass the Garden's test before it passes the ecology's: not whether it is vivid, but what it feeds on and what fruit it bears.",
  },
  garden: {
    line: "A flower that must be fed to keep its colour has become an appetite.",
    to: "hungry",
    eyebrow: "When the flower must be fed",
    label: "On to",
    note: "The Hungry Flower is one species of the Garden; the province it opens into is where hunger is anatomised as a failure of return, and where forms that know how to die are told apart from forms that do not.",
  },
  hungry: {
    line: "The wisest architecture is not the one that lasts forever. It is the one that gives force a fitting body, returns more life than it receives, and knows when its work is complete.",
    to: "form",
    eyebrow: "Forms that know how to die",
    label: "Return to",
    note: "Back to the vessel, where dissolution is done rightly: a form's claim on loyalty was always conditional on the participation, and a form that can open its hands is the one this province exists to make possible.",
  },
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
  ["The Black Aquifer", "is the groundwater."],
  ["Becoming", "is the river passing through them all."],
];
