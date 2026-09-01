import { useMemo, useState } from "react";

/**
 * Lexicon — the terms, where each is defined, and what it means in one line.
 *
 * The reading paths answer "how do I read through this". This answers the
 * opposite question: "where was that explained". Forty-odd terms are
 * load-bearing across five or more sections each, and until now a reader
 * meeting `telestic inertia` in § XXXVI had no route back to § XXVII.
 *
 * Definitions are deliberately one line. They are pointers into the section
 * that does the work, not restatements of it — restating would reintroduce
 * exactly the redundancy the cross-reference convention exists to prevent.
 */

type Entry = {
  term: string;
  script?: string;
  origin: "Greek" | "Sanskrit" | "Chinese" | "Japanese" | "Hebrew" | "Latin" | "Coined";
  at: string; // section id where it is defined
  n: string; // its numeral, for display
  gloss: string;
};

const ENTRIES: Entry[] = [
  { term: "Akasha", script: "आकाश", origin: "Sanskrit", at: "correspondence", n: "III",
    gloss: "The open condition in which the other four tattvas relate at all — which is why it takes no column in a fourfold table." },
  { term: "Angel", origin: "Greek", at: "mediation", n: "XXIX",
    gloss: "An office of mediation carrying one articulation of a field; ministerial where the Archangel is architectonic." },
  { term: "Archangel", origin: "Greek", at: "mediation", n: "XXIX",
    gloss: "The coordinating centre of an entire chain — archē meaning rule or chief office, not a more powerful Angel." },
  { term: "Consecration", origin: "Latin", at: "ritual", n: "XXVII",
    gloss: "Withdrawing a vessel from unrestricted use and binding it to a particular name, pattern, office, or end." },
  { term: "Crypt of Primordial Memory", script: "Κρύπτη", origin: "Greek", at: "retentive", n: "XI",
    gloss: "The retentive depth of causation: the persistence of consequences after the originating form has vanished." },
  { term: "Daimōn", script: "δαίμων", origin: "Greek", at: "daimons", n: "XXXI",
    gloss: "An assigned current — the personalised vector where vocation, temperament, inheritance and circumstance converge." },
  { term: "Deconsecration", origin: "Latin", at: "ritual", n: "XXVII",
    gloss: "The deliberate release of a consecrated bond. Not desecration, which violates a relation still standing." },
  { term: "Dynamis", script: "δύναμις", origin: "Greek", at: "forceform", n: "XXXV",
    gloss: "Capacity or potency — structured possibility, never an unlimited cloud of everything imaginable." },
  { term: "Egregore", origin: "Greek", at: "taxonomy", n: "XXVIII",
    gloss: "A collective attractor with enough coherence and inertia to recruit attention and preserve itself; used without asserting an independent entity." },
  { term: "Eikōn", script: "εἰκών", origin: "Greek", at: "image", n: "XXV",
    gloss: "An image that reveals through resemblance — and, because resemblance is selective, conceals in the same act." },
  { term: "Energeia", script: "ἐνέργεια", origin: "Greek", at: "forceform", n: "XXXV",
    gloss: "Actuality, being-at-work. Not energy in the modern physical sense." },
  { term: "Epistrophē", script: "ἐπιστροφή", origin: "Greek", at: "theurgy", n: "XXX",
    gloss: "Return: the recovery of unity and orientation within multiplicity, not a spatial ascent or a rejection of matter." },
  { term: "Etheric Tide", origin: "Coined", at: "tides", n: "XXXVI",
    gloss: "A recurrent alteration in the receptivity, conductivity, and dominant biases of Morphaithēr." },
  { term: "Field", script: "πεδίον", origin: "Greek", at: "terms", n: "I",
    gloss: "The conditions permitting an activity — what must already be true for a form to occur." },
  { term: "Force", script: "ἐνέργεια", origin: "Greek", at: "terms", n: "I",
    gloss: "The activity maintaining an organisation — form held open against dissolution." },
  { term: "Form", script: "μορφή", origin: "Greek", at: "terms", n: "I",
    gloss: "The organisation of a content — the arrangement, not the stuff." },
  { term: "Formative inertia", origin: "Coined", at: "laws", n: "XII",
    gloss: "A pattern's tendency to persist once the result of its activity helps reproduce the conditions that caused it." },
  { term: "Fourfold Veil", origin: "Coined", at: "fourfold", n: "IV",
    gloss: "Warmth, Light, Tone and Life — the four formative functions, one circulation rather than a descending ladder." },
  { term: "Head · Heart · Hara", origin: "Japanese", at: "axis", n: "XXIII",
    gloss: "The human axis: pattern seen, pattern weighed for value and relation, pattern given embodied substance." },
  { term: "Heimarmenē", script: "εἱμαρμένη", origin: "Greek", at: "daimons", n: "XXXI",
    gloss: "Fate as the ordered network of causes within nature and generation — real, and not ultimate." },
  { term: "Hun · Po · Yi · Zhi", origin: "Chinese", at: "organs", n: "XXIV",
    gloss: "Four of the five modalities of spirit: projected image, embodied sensation, assimilating thought, and enduring will." },
  { term: "Ignisophia", origin: "Coined", at: "ignisophia", n: "XVI",
    gloss: "Wisdom of fire — warmth sufficient to mobilise what has stagnated without consuming Jing or scattering Qi." },
  { term: "Inner Sun", script: "Ἥλιος ἐντός", origin: "Greek", at: "flywheel", n: "IX",
    gloss: "The organising centre that holds diverse faculties in relation without erasing their difference." },
  { term: "Integral · parasitic coherence", origin: "Coined", at: "laws", n: "XII",
    gloss: "Whether a coherent pattern strengthens what composes it or preserves itself by depleting it. Power alone does not distinguish them." },
  { term: "Jing · Qi · Shen", origin: "Chinese", at: "treasures", n: "XXII",
    gloss: "Vitality stored, vitality circulating, and vitality become luminous — three conditions, not a ladder." },
  { term: "Kentron", script: "κέντρον", origin: "Greek", at: "terms", n: "I",
    gloss: "Centre: what preserves coherence through change while its matter is exchanged." },
  { term: "Kyma", script: "κῦμα", origin: "Greek", at: "tides", n: "XXXVI",
    gloss: "A wave — a disturbance carrying pattern through a medium without the medium travelling with it." },
  { term: "Law of Force and Vessel", origin: "Coined", at: "taxonomy", n: "XXVIII",
    gloss: "No force without a vector, no vector without a medium, no medium without a vessel, no manifestation without consequence." },
  { term: "Law of Remainder", origin: "Coined", at: "reciprocal", n: "XVII",
    gloss: "Because transduction is never perfect, every formation leaves something over." },
  { term: "Law of the Vessel", origin: "Coined", at: "theurgy", n: "XXX",
    gloss: "A vessel receives according to its form, capacity, purity, and correspondence — and none exhausts its source." },
  { term: "Logos · Logoi", script: "λόγος", origin: "Greek", at: "theurgy", n: "XXX",
    gloss: "Intelligible articulation, and the particular seed-patterns by which a kind of thing develops and stays recognisable." },
  { term: "Lunar mansion", origin: "Coined", at: "mansions", n: "XXXVII",
    gloss: "A station of qualitative modulation along the Moon's stellar path — distinct from lunar phase, which measures against the Sun." },
  { term: "Matter", script: "ὕλη", origin: "Greek", at: "terms", n: "I",
    gloss: "The current material content — what is presently held." },
  { term: "Metastability", origin: "Coined", at: "laws", n: "XII",
    gloss: "Structure enough to hold identity, openness enough to change. Rigidity prevents adaptation; plasticity prevents consolidation." },
  { term: "Monē", script: "μονή", origin: "Greek", at: "theurgy", n: "XXX",
    gloss: "Remaining: a principle keeps its identity undiminished while producing what proceeds from it." },
  { term: "CHON", origin: "Coined", at: "chon", n: "XLII",
    gloss: "Carbon, hydrogen, oxygen and nitrogen — the material alphabet through which formative force writes biological form." },
  { term: "Reservoir", origin: "Coined", at: "atmosphere", n: "XLI",
    gloss: "Accumulated formative capacity held in a body, place, symbol or practice — retained readiness rather than stored energy." },
  { term: "Vortex", origin: "Latin", at: "atmosphere", n: "XLI",
    gloss: "A self-reinforcing pattern drawing new force into its own circulation." },
  { term: "Standing pattern", origin: "Coined", at: "atmosphere", n: "XLI",
    gloss: "A recurrence stable enough to keep its organisation while currents pass through it." },
  { term: "Formative threshold", origin: "Coined", at: "atmosphere", n: "XLI",
    gloss: "Where accumulated conditions turn qualitative — possibility becoming activity, activity becoming recurrence, recurrence becoming form." },
  { term: "Scar", origin: "Coined", at: "atmosphere", n: "XLI",
    gloss: "A persistent alteration left after an event has ended. The field holds no replica of what happened — it holds changed tendencies." },
  { term: "Morphaithēr", script: "Μορφαιθήρ", origin: "Coined", at: "morphaither", n: "V",
    gloss: "The living formative atmosphere surrounding and penetrating a being, place, rite, culture or event." },
  { term: "Nadi · Meridian · Hodos", origin: "Sanskrit", at: "channels", n: "XX",
    gloss: "Routes of organised circulation — maps of functional pathway, not invisible anatomical tubing." },
  { term: "Nakshatra", script: "नक्षत्र", origin: "Sanskrit", at: "mansions", n: "XXXVII",
    gloss: "The specifically Indian tradition of lunar stations, commonly twenty-seven sectors of 13°20′." },
  { term: "Nous", script: "νοῦς", origin: "Greek", at: "theurgy", n: "XXX",
    gloss: "Intellect: the living unity of Forms and perfect relations. Resembles the intelligible dimension of pattern; is not Light Ether." },
  { term: "Ossuary of Living Forms", script: "Ὀστοφυλάκιον", origin: "Greek", at: "retentive", n: "XI",
    gloss: "Where perished forms return matter, structure and formative consequence to the wider field." },
  { term: "Phantasia", script: "φαντασία", origin: "Greek", at: "image", n: "XXV",
    gloss: "The activity by which something becomes inwardly apparent — the necessary organ of appearance, not a deceiver." },
  { term: "Proodos", script: "πρόοδος", origin: "Greek", at: "theurgy", n: "XXX",
    gloss: "Procession: an eternal relation of dependence, not a temporal event nor a substance leaking downward." },
  { term: "Psychic Flywheel", origin: "Coined", at: "flywheel", n: "IX",
    gloss: "Thought, emotion, attention and behaviour coupled into a circuit that begins turning itself." },
  { term: "Rhythmos", script: "ῥυθμός", origin: "Greek", at: "tides", n: "XXXVI",
    gloss: "Patterned flow — the form taken by force in time, not merely a regular beat." },
  { term: "Root Ether", origin: "Coined", at: "spine", n: "II",
    gloss: "The primordial condition of transmissibility. Belongs to manifestation; it is not the One, God, or the source of being." },
  { term: "Śakti", script: "शक्ति", origin: "Sanskrit", at: "mansions", n: "XXXVII",
    gloss: "A station's characteristic capacity — its dynamis, awaiting actualisation." },
  { term: "Selective permeability", origin: "Coined", at: "laws", n: "XII",
    gloss: "Every boundary admits some relations while filtering others; what it excludes is part of what it is." },
  { term: "Solve et coagula", origin: "Latin", at: "forceform", n: "XXXV",
    gloss: "The rhythm of fixing force into a vessel and releasing it again so it can be redistributed and formed anew." },
  { term: "Sulfur · Mercury · Salt", origin: "Latin", at: "triad", n: "X",
    gloss: "Impulse and characteristic virtue; mediation and transduction; boundary and durable embodiment." },
  { term: "Symbolon", script: "σύμβολον", origin: "Greek", at: "symbol", n: "XXVI",
    gloss: "A token broken in two: the connective relation through which separated orders fit without becoming identical." },
  { term: "Synthema", script: "σύνθημα", origin: "Greek", at: "symbol", n: "XXVI",
    gloss: "The operative key within that relation — a mark, name, material, gesture or configuration used to address it." },
  { term: "Tattva", script: "तत्त्व", origin: "Sanskrit", at: "correspondence", n: "III",
    gloss: "A morphogenic bias: a qualitative tendency directing how a force will behave, distinct from the ether carrying it." },
  { term: "Telestic inertia", origin: "Coined", at: "ritual", n: "XXVII",
    gloss: "An operative sequence continuing after its original end has departed — rhythm outliving purpose." },
  { term: "Intelligence · Spirit", origin: "Greek", at: "mediation", n: "XXIX",
    gloss: "The pattern-holding pole and the dynamic operative pole — form and movement, not good against evil." },
  { term: "Law of Symbolic Remainder", origin: "Coined", at: "symbol", n: "XXVI",
    gloss: "No symbol exhausts the force it mediates, no interpretation the symbol, no consciousness the Field." },
  { term: "Periodos", script: "περίοδος", origin: "Greek", at: "tides", n: "XXXVI",
    gloss: "A completed circuit of alteration and return — better imagined as a spiral, since the field retains something from the passage." },
  { term: "Sub-tattva", origin: "Sanskrit", at: "subtattva", n: "XIV",
    gloss: "A tattva qualified by another, which is why two expressions of one quality can behave quite differently." },
  { term: "Symbolic causation", origin: "Coined", at: "symbol", n: "XXVI",
    gloss: "A symbol acting by reorganising attention, memory, posture and behaviour — not by holding a quantity of occult force." },
  { term: "Telestic art", script: "τελεστική", origin: "Greek", at: "theurgy", n: "XXX",
    gloss: "The making-complete of a vessel so that it can function as an operative sacred image." },
  { term: "The One", script: "τὸ ἕν", origin: "Greek", at: "theurgy", n: "XXX",
    gloss: "Beyond being, form and number. Not Root Ether, which belongs to manifestation." },
  { term: "Transductive Loss", origin: "Coined", at: "reciprocal", n: "XVII",
    gloss: "Every mediator preserves part of a pattern, transforms part, and leaves part behind." },
  { term: "Wu Xing · Five Phases", origin: "Chinese", at: "organs", n: "XXIV",
    gloss: "Wood, Fire, Earth, Metal, Water as stages of transformation — phases and movements, not five material elements." },
  { term: "Zang-Fu", origin: "Chinese", at: "organs", n: "XXIV",
    gloss: "Traditional organ networks — functional systems, not equivalents of the biomedical organs they share names with." },
];

const ORIGINS = ["Greek", "Sanskrit", "Chinese", "Japanese", "Latin", "Hebrew", "Coined"] as const;

export function Lexicon() {
  const [q, setQ] = useState("");
  const [origin, setOrigin] = useState<string | null>(null);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ENTRIES.filter((e) => {
      if (origin && e.origin !== origin) return false;
      if (!needle) return true;
      return (
        e.term.toLowerCase().includes(needle) ||
        e.gloss.toLowerCase().includes(needle) ||
        (e.script ?? "").includes(needle) ||
        e.n.toLowerCase() === needle.replace(/^§\s*/, "")
      );
    }).sort((a, b) => a.term.localeCompare(b.term, "en"));
  }, [q, origin]);

  const originCounts = useMemo(() => {
    const c: Record<string, number> = {};
    ENTRIES.forEach((e) => { c[e.origin] = (c[e.origin] ?? 0) + 1; });
    return c;
  }, []);

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="block max-w-sm flex-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
            Find a term
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="morphaithēr, remainder, § XXVII…"
            className="mt-2 w-full border-b border-border bg-transparent pb-2 font-serif text-lg text-bone outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {ORIGINS.filter((o) => originCounts[o]).map((o) => (
            <button
              key={o}
              onClick={() => setOrigin(origin === o ? null : o)}
              aria-pressed={origin === o}
              className={`border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                origin === o
                  ? "border-gold text-gold"
                  : "border-border text-muted-foreground hover:border-gold/60 hover:text-bone/80"
              }`}
            >
              {o} <span className="opacity-50">{originCounts[o]}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {shown.length === ENTRIES.length
          ? `${ENTRIES.length} terms`
          : `${shown.length} of ${ENTRIES.length}`}
      </p>

      <div className="mt-4">
        {shown.map((e) => (
          <a
            key={e.term}
            href={`#${e.at}`}
            className="group grid grid-cols-[1fr] gap-1 border-b border-border py-4 transition-colors hover:border-gold/40 sm:grid-cols-[15rem_1fr] sm:gap-6"
          >
            <span className="min-w-0">
              <span className="block font-serif text-lg text-bone transition-colors group-hover:text-gold">
                {e.term}
              </span>
              <span className="mt-0.5 flex items-baseline gap-2">
                {e.script && (
                  <span className="font-serif text-sm text-muted-foreground">{e.script}</span>
                )}
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-bone/55">
                  {e.origin}
                </span>
              </span>
            </span>
            <span className="min-w-0">
              <span className="block text-sm leading-relaxed text-muted-foreground">{e.gloss}</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-dim transition-colors group-hover:text-gold">
                § {e.n}
              </span>
            </span>
          </a>
        ))}
        {!shown.length && (
          <p className="py-10 text-sm leading-relaxed text-muted-foreground">
            Nothing under that. The lexicon holds only terms the architecture defines and then reuses
            — try a fragment, or a section numeral.
          </p>
        )}
      </div>
    </>
  );
}
