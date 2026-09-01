/** The thirteen of the descent and the five of the return, with the type they share. */
export type Principle = {
  num: string;
  greek: string;
  latin: string;
  english: string;
  summary: string;
};

export const descent: Principle[] = [
  { num: "I", greek: "Ἀρχή", latin: "Archē · To Hen", english: "Source", summary: "The unconditioned origin. Prior to distinction, polarity, motion, and form — the fountain (pēgē) from which being, spirit, and possibility descend." },
  { num: "II", greek: "Πνεῦμα", latin: "Pneuma", english: "Spirit", summary: "The animating current proceeding from Source. Not identity but life — the invisible breath by which the field of manifestation is awakened." },
  { num: "III", greek: "Οὐσία", latin: "Ousia", english: "Essence", summary: "The inward whatness (to ti estin) of a thing. Its physis — the determining nature and metaphysical seed by which it becomes itself and not another." },
  { num: "IV", greek: "Δύναμις", latin: "Dynamis", english: "Virtue", summary: "The inherent potency of essence — the hidden power by which a thing acts according to its nature. The bridge from essence toward force." },
  { num: "V", greek: "Αἰθήρ", latin: "Aithēr · Pempton Stoicheion", english: "Akasha Prime", summary: "The quintessence — the primordial subtle field, the womb of becoming in which differentiated forces may first arise." },
  { num: "VI", greek: "Αἰθήρ", latin: "Aithēr (Formative)", english: "Ether", summary: "The subtle formative medium — warmth, light, tone, and life — through which hidden virtue becomes transmissible toward force." },
  { num: "VII", greek: "Ῥυθμός", latin: "Rhythmos · Kyma", english: "Etheric Tide", summary: "The rhythmic breathing of the etheric field — waxing and waning, ascent and descent, the timing by which forces open and withdraw." },
  { num: "VIII", greek: "Ποιότης", latin: "Tattva", english: "Vibratory Mode", summary: "The quality (poiotēs) of etheric movement — Akasha, Vayu, Tejas, Apas, Prithivi — by which motion leans toward elemental embodiment." },
  { num: "IX", greek: "Ἐνέργεια", latin: "Energeia · Kinēsis", english: "Force", summary: "Virtue at work. Dynamis entering activity — the moment hidden potency becomes operative and begins to press, radiate, attract, and organize." },
  { num: "X", greek: "Λόγος", latin: "Logos · Eidos", english: "Pattern", summary: "The ordering principle — ratio, number, harmonia, sacred geometry — by which force receives coherence and becomes intelligible." },
  { num: "XI", greek: "Στοιχεῖον", latin: "Stoicheion", english: "Element", summary: "The embodied condition — Pyr, Aēr, Hydōr, Gē — the elemental letters through which patterned force becomes sensible nature." },
  { num: "XII", greek: "Ὕλη", latin: "Hylē", english: "Matter", summary: "Receptive density — not dead substance but spirit under the discipline of form. The form-bearing capacity by which force becomes durable." },
  { num: "XIII", greek: "Μορφή", latin: "Morphē · Eidos", english: "Form", summary: "The visible stabilization of force — pattern embodied through element, received into matter, and held in recognizable configuration. Force brought to rest." },
];

export const ret: Principle[] = [
  { num: "XIV", greek: "Ἴχνος", latin: "Ichnos", english: "Trace", summary: "The footprint of formation. The first readable residue by which the hidden may be inferred from the visible — a force has passed here." },
  { num: "XV", greek: "Χαρακτήρ", latin: "Charaktēr · Sphragis", english: "Signature", summary: "The engraved seal — trace recognized as meaningful. The outer writing of inward virtue: gesture, geometry, color, habit made readable." },
  { num: "XVI", greek: "Σύμβολον", latin: "Symbolon", english: "Symbol", summary: "The gathering token — signature awakened in consciousness. Not a sign that points, but a vessel that participates in what it means." },
  { num: "XVII", greek: "Συμπάθεια", latin: "Sympatheia · Analogia", english: "Correspondence", summary: "The secret kinship of forms across levels — planet with metal, plant with organ, ritual with world — organized by hidden proportion." },
  { num: "XVIII", greek: "Μεταμόρφωσις", latin: "Metamorphōsis · Metastoicheiōsis", english: "Transformation", summary: "Lawful reordering. Form loosened, force released, essence purified, pattern renewed. Solve et coagula — the return of form to force and its rebirth as higher form." },
];

export const all = [...descent, ...ret];
