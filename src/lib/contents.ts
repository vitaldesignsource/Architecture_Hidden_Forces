/**
 * The contents of the work, defined once.
 *
 * § Index renders these as a page; the header’s Contents panel renders them as a
 * slide-over reachable from anywhere. They were local to the Index component
 * until the panel needed them, and two copies of a 47-entry list would have
 * drifted exactly as the two nav lists did.
 *
 * `movement: true` marks the passages between sections — Descent, Return,
 * Grounds — which are part of the arc but carry no numeral.
 */
/** A row of a contents list. Most rows are in-page anchors; a row with `route`
 *  is a page of the encyclopaedia, and the panel renders it as a router link. */
export type Entry = {
  n: string;
  id: string;
  t: string;
  d: string;
  movement?: boolean;
  route?: { division: string; entry?: string };
  /** A row that is a page of its own — the Hidden Ecology's stations. */
  to?: "/ecology" | "/ecology/morphaither" | "/ecology/sap" | "/ecology/hydrology" | "/ecology/form" | "/ecology/ossuary" | "/ecology/crypt";
};

export const ENTRIES: Entry[] = [

            { n: "00", id: "doctrine", t: "Central Doctrine", d: "Form is frozen force. Force is liberated form." },
            { n: "I", id: "terms", t: "The Five Terms", d: "Matter, Form, Force, Field, Centre — what the words mean." },
            { n: "II", id: "spine", t: "The Doctrinal Spine", d: "Eighteen commitments the rest of the architecture depends upon." },
            { n: "", id: "descent", t: "The Descent into Form", d: "ΠΡΌΟΔΟΣ · thirteen principles, Source through Matter.", movement: true },
            { n: "III", id: "correspondence", t: "Layered Correspondence", d: "Aithēr → Tattva → Stoicheion → Morphē. They correspond; they are not identical." },
            { n: "IV", id: "fourfold", t: "The Fourfold Field", d: "Warmth, Light, Tone, Life — the four ethers and the measure of each." },
            { n: "V", id: "morphaither", t: "The Morphaithēr", d: "The living formative atmosphere. It inclines what arises; it does not compel it." },
            { n: "", id: "return", t: "The Return through Reading", d: "ἘΠΙΣΤΡΟΦΉ · five principles, Trace through Transformation.", movement: true },
            { n: "VI", id: "seed", t: "A Worked Example", d: "The seed taken as a complete metaphysical event." },
            { n: "VII", id: "kabbalah", t: "Kabbalah", d: "Ein Sof, the Tree, the ten sefirot, the Four Worlds, the formative letters." },
            { n: "VIII", id: "extended", t: "The Hidden Powers", d: "Eleven principles of the extended architecture, Polarity through Black Aether." },
            { n: "IX", id: "flywheel", t: "The Psychic Flywheel", d: "Repetition into momentum; reservoirs as attractors; the Inner Sun." },
            { n: "X", id: "triad", t: "The Alchemical Triad", d: "Sulfur, Mercury, Salt — and solve without coagula." },
            { n: "XI", id: "retentive", t: "The Retentive Depth", d: "The Crypt and the Ossuary: how the world inherits itself." },
            { n: "XII", id: "laws", t: "The Laws of Formation", d: "How forms receive influence, endure, distort, cross thresholds, and return." },
            { n: "XIII", id: "astrology", t: "Celestial Anatomy", d: "Astrology as the clock of qualitative time — kairos, not chronos." },
            { n: "XIV", id: "subtattva", t: "The Compound Qualities", d: "The twenty-five sub-tattvas; every letter spoken through every other." },
            { n: "XV", id: "dao", t: "The Dynamics of Return", d: "Circulation, polarity, emptiness, wu wei, and the law of reversal." },
            { n: "XVI", id: "ignisophia", t: "Ignisophia", d: "Fire made wise — the chariot of the Inner Sun." },
            { n: "XVII", id: "reciprocal", t: "The Reciprocal Field", d: "How field and form make each other; what a form gives back." },
            { n: "XVIII", id: "mixing", t: "The Dynamics of Mixing", d: "The elements as verbs, and the six ways any two of them meet." },
            { n: "XIX", id: "celestial", t: "Celestial Correspondence", d: "One virtue through unlike vessels — Agrippa downward, Paracelsus up." },
            { n: "XX", id: "channels", t: "Nadis, Meridians, and Channels", d: "Force requires a path — and the eight ways circulation fails." },
            { n: "XXI", id: "centers", t: "Chakras and Centers", d: "Where currents gather, change character, and are redistributed." },
            { n: "XXII", id: "treasures", t: "Jing, Qi, Shen", d: "Vitality stored, circulating, and becoming luminous." },
            { n: "XXIII", id: "axis", t: "Head, Heart, and Hara", d: "The human axis: pattern seen, weighed, and given substance." },
            { n: "XXIV", id: "organs", t: "Organs, Elements, Five Phases", d: "The interior ecology: seats of transformation, and healing as formative range." },
            { n: "XXV", id: "image", t: "Image and Imagination", d: "The middle country: how force becomes appearance, and appearance carries force." },
            { n: "XXVI", id: "symbol", t: "Symbol", d: "The knot where worlds meet: the tally, and what completes it." },
            { n: "XXVII", id: "ritual", t: "Ritual", d: "The geometry of consecrated time — threshold, sequence, and the object that silently changes." },
            { n: "XXVIII", id: "taxonomy", t: "Taxonomy of Forces", d: "Six modes of causation — and why they are not six equivalent substances." },
            { n: "XXIX", id: "mediation", t: "Vertical Chains of Mediation", d: "How unity enters multiplicity without disappearing — and returns without erasing it." },
            { n: "XXX", id: "theurgy", t: "Greek Metaphysics and Theurgy", d: "Procession, return, and the disciplined construction of conditions for participation." },
            { n: "XXXI", id: "daimons", t: "Daimons and Mediating Orders", d: "Where universal powers become individual paths — fate, character, and the personal daimōn." },
            { n: "XXXII", id: "books", t: "The Series", d: "Seven books, one arc: Principle → Field → Pattern → Transformation." },
            { n: "—", id: "grounds", t: "Grounds", d: "Why the structure holds. Stated as argument rather than doctrine." },
            { n: "XXXIII", id: "tradition", t: "Tradition", d: "The long memory of form — what survives when every carrier changes." },
            { n: "XXXIV", id: "lineage", t: "Lineage", d: "The traditions the architecture reads from." },
            { n: "XXXV", id: "forceform", t: "The Law of Force and Form", d: "Form is force given memory. The founding proposition, given its reasons." },
            { n: "XXXVI", id: "tides", t: "Etheric Tides", d: "When the field is receptive — rhythm, superposition, and the timing of formation." },
            { n: "XXXVII", id: "mansions", t: "Lunar Mansions and Nakshatras", d: "Two clocks that never coincide — the starry diagram read as a procession." },
            { n: "XXXVIII", id: "zodiac", t: "Zodiacal Patterning", d: "Four media, three phases — a generated grammar rather than twelve personalities." },
            { n: "XXXIX", id: "rightrelation", t: "The Art of Right Relation", d: "Whether the path should be walked — the ethics the rest of the architecture assumed." },
  { n: "XL", id: "mortality", t: "Death, Suffering, and the Cost of Form", d: "Whether the architecture stays truthful when form fails." },
  { n: "XLI", id: "atmosphere", t: "Morphaithēr", d: "The middle condition between pure possibility and completed form — an ecology, not a fluid." },
  { n: "XLII", id: "chon", t: "CHON", d: "Carbon, hydrogen, oxygen, nitrogen — where invisible order becomes materially accountable." },
  { n: "XLIII", id: "transduction", t: "The Fourfold Veil", d: "What the passage through the four costs, and how it corrects itself." },
  { n: "XLIV", id: "relation", t: "The Law of Right Relation", d: "Five terms, eight proportions, and the fourteen questions that test any relation." },
  { n: "XLV", id: "matter", t: "Spiritualising Matter", d: "Where spirit becomes accountable for what it claims to be — and the six counterfeits." },
  { n: "XLVI", id: "sophia", t: "Sophia and the Divine Feminine", d: "The wisdom of right relation — receptivity as formative power, and the test of embodiment." },
  { n: "XLVII", id: "transformation", t: "Transformation", d: "Solve et coagula, the formative thread, and the reordering of elemental relations." },
  { n: "XLVIII", id: "heka", t: "Heka", d: "Operative power — how significance becomes causally consequential, and why effective is not rightful." },
  { n: "XLIX", id: "microcosm", t: "Spirit, Soul, and Body", d: "Spirit animates, essence determines, soul mediates, body embodies — and how each oversteps." },
  { n: "L", id: "etheric", t: "The Etheric Body", d: "The vital-formative field — pattern acting as process, and why vitality is rhythmic rather than quantitative." },
  { n: "LI", id: "astral", t: "The Astral and Psychic Layers", d: "Desire, image and sensation — and why naming an emotion is often insufficient." },
  { n: "LII", id: "soul", t: "Soul and Interior Life", d: "The metaxy — where force becomes meaning, and the intervals discernment depends on." },
  { n: "—", id: "lexicon", t: "Lexicon", d: "Every term the architecture defines, and the section that defines it." },
  { n: "", id: "unified", t: "The Unified Formula", d: "The whole arc in eight movements, and again in ten.", movement: true },
            { n: "", id: "formula", t: "The Final Formula", d: "The twenty-one step return to Source.", movement: true },
];

export const PATHS: { k: string; n: string; blurb: string; why: Record<string, string> }[] = [
  {
    k: "The shortest way in",
    n: "Five sections",
    blurb:
      "Read these and every other section becomes legible. Everything after them assumes them.",
    why: {
      doctrine: "The whole architecture compressed into one line.",
      terms: "Matter, Form, Force, Field, Centre. Nothing later parses without them.",
      spine: "The eighteen commitments the rest of the structure rests on.",
      fourfold: "Warmth, Light, Tone, Life — named in almost every section that follows.",
      laws: "How formation actually behaves. The operating rules the later material applies.",
    },
  },
  {
    k: "Descent and return",
    n: "The metaphysical arc",
    blurb:
      "The spine of the system: how unity becomes form, and how form is read back toward essence.",
    why: {
      doctrine: "Form is frozen force. Force is liberated form.",
      descent: "ΠΡΌΟΔΟΣ — the movement out, in thirteen principles.",
      correspondence: "The layers that correspond without being identical.",
      fourfold: "The four formative functions doing the work of descent.",
      morphaither: "The atmosphere in which formation actually occurs.",
      return: "The movement back, read from form toward essence.",
      dao: "Emptiness, reversal, and why constraint preserves rather than opposes.",
      reciprocal: "What every translation costs — Transductive Loss and the Law of Remainder.",
      unified: "The whole arc restated as movements.",
      formula: "And restated once more, as sequence.",
    },
  },
  {
    k: "The living body",
    n: "Where it becomes physiology",
    blurb:
      "The embodied application: pathways, centres, vitality, and the human axis of transformation.",
    why: {
      ignisophia: "Start at the centre: the Inner Sun the rest is organised around.",
      channels: "The routes circulation is organised along.",
      centers: "Where currents gather, change character, and redistribute.",
      treasures: "Jing, Qi, Shen — vitality stored, circulating, becoming luminous.",
      axis: "Head, Heart, and Hara: pattern seen, weighed, given substance.",
      organs: "The interior ecology, and healing as the recovery of formative range.",
    },
  },
  {
    k: "Image to inheritance",
    n: "The arc of meaning",
    blurb:
      "How a force becomes an appearance, an appearance becomes recognisable, recognition becomes enactment, and enactment becomes inheritance.",
    why: {
      image: "Force becomes appearance — the first legible configuration.",
      symbol: "Appearance becomes a bond of recognition between divided orders.",
      ritual: "Recognition unfolds through ordered time, within an enactment.",
      tradition: "And through historical time, across generations.",
    },
  },
  {
    k: "How force works",
    n: "The causal machinery",
    blurb:
      "What a force is, what it must pass through, and who or what does the mediating.",
    why: {
      laws: "The behaviour of formation itself.",
      reciprocal: "Why no transmission is ever complete.",
      taxonomy: "Six modes of causation — and why they are not six equivalent substances.",
      mediation: "How unity enters multiplicity without disappearing.",
      daimons: "Where universal powers become individual paths.",
    },
  },
  {
    k: "What the architecture refuses",
    n: "The guardrails",
    blurb:
      "The system’s own limits, stated by the system. This is the path that shows where it stops itself — and it is the one worth reading if you want to judge whether the rest is serious.",
    why: {
      spine: "Coherence alone is not goodness. A tumour is organised.",
      laws: "The cost of form, the shadow of selection, integral against parasitic.",
      reciprocal: "Every mediator keeps part, alters part, and loses part.",
      image: "Five rules for any map — and intensity is not proof of rank.",
      symbol: "No symbol exhausts the force it mediates. And: what world does it teach?",
      ritual: "Telestic inertia — a rite whose object has silently changed.",
      taxonomy: "Is the claim empirical, traditional, symbolic, metaphysical, or speculative?",
      theurgy: "Never confuse the vessel with what it mediates. Analogy is not identity.",
      tradition: "Preserved is not living. Parasitic is not dead.",
    },
  },
];

/**
 * The volumes of the site. The Architecture was a single page until Phōs; the
 * Contents panel lists both so a reader on either can reach the other, and
 * marks the one they are on. Paths are literal so the panel can compare them
 * against the `volume` prop each page passes.
 */
export const VOLUMES = [
  {
    to: "/",
    t: "The Architecture of Hidden Forces",
    d: "The principal treatise — how hidden forces become visible forms, in fifty-two sections.",
  },
  {
    to: "/phos",
    t: "Phōs: The Luminous Architecture",
    d: "A companion volume — the same architecture read by its own light.",
  },
  {
    to: "/phos/portal",
    t: "The Portal",
    d: "The encyclopaedia of light — twenty-one divisions, browsable by tradition, quality, plane, operation, symbol, text, and period.",
  },
  {
    to: "/ecology",
    t: "The Hidden Ecology of Formation",
    d: "A layer of the Architecture opened: the invisible as an ecology that is fed, circulates, takes vessels, inherits their architecture and retains their consequence.",
  },
] as const;
