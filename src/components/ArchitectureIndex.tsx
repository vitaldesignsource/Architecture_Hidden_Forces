import { useState } from "react";

/**
 * ArchitectureIndex — the index, plus routes through it. Forty sections in
 * sequence is a catalogue, not a way in; a path names a defensible order and a
 * reason for each step. Selecting one marks its members in place rather than
 * extracting them, so the route stays visible inside the whole.
 */
export function ArchitectureIndex() {
  const [path, setPath] = useState<number | null>(null);

  const ENTRIES = [

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
    { n: "—", id: "lexicon", t: "Lexicon", d: "Every term the architecture defines, and the section that defines it." },
    { n: "", id: "unified", t: "The Unified Formula", d: "The whole arc in eight movements, and again in ten.", movement: true },
              { n: "", id: "formula", t: "The Final Formula", d: "The twenty-one step return to Source.", movement: true },
  ];

  const PATHS: { k: string; n: string; blurb: string; why: Record<string, string> }[] = [
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
        "The system's own limits, stated by the system. This is the path that shows where it stops itself — and it is the one worth reading if you want to judge whether the rest is serious.",
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

  const active = path === null ? null : PATHS[path];
  const order: Record<string, number> = {};
  const why: Record<string, string> = {};
  if (active) {
    Object.entries(active.why).forEach(([id, reason], i) => {
      order[id] = i + 1;
      why[id] = reason;
    });
  }

  const numbered = ENTRIES.filter((e) => e.n && e.n !== "—" && e.n !== "00").length;
  const movements = ENTRIES.filter((e) => e.movement).length;
  const words = ["", "one", "two", "three", "four", "five", "six"];

  return (
    <>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {numbered} sections and {words[movements] ?? movements} movements. The descent runs from
        Source to Form; the return reads form back toward essence. What lies between is the
        apparatus by which that passage is described.
      </p>

      <div className="mt-10 border-t border-border pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          Routes through it
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Forty sections in sequence is a catalogue. These are orders that can be defended, each
          with a reason for every step. None of them is the required one — the architecture does not
          have a required one — but each is a way in that does not begin by asking you to read
          everything.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {PATHS.map((x, i) => (
            <button
              key={x.k}
              onClick={() => setPath(path === i ? null : i)}
              aria-pressed={path === i}
              className={`border px-3 py-2 text-left text-xs leading-tight transition-colors ${
                path === i
                  ? "border-gold text-gold"
                  : "border-border text-muted-foreground hover:border-gold/60 hover:text-bone/80"
              }`}
            >
              {x.k}
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.12em] opacity-60">
                {x.n} · {Object.keys(x.why).length}
              </span>
            </button>
          ))}
        </div>
        {active && (
          <div className="aoh-pop mt-6 max-w-3xl border-l-2 border-gold pl-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{active.blurb}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-gold-dim">
              Marked below, in order
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-x-12 gap-y-px lg:grid-cols-2">
        {ENTRIES.map((x) => {
          const step = order[x.id];
          const off = !!active && !step;
          return (
            <a
              key={x.id}
              href={`#${x.id}`}
              className={`group grid grid-cols-[3.25rem_1fr] items-baseline gap-4 border-b py-4 transition-all ${
                step ? "border-gold/40" : "border-border hover:border-gold/40"
              } ${off ? "opacity-25" : "opacity-100"}`}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                  step ? "text-gold" : x.movement ? "text-gold/40" : "text-gold-dim"
                }`}
              >
                {step ? String(step).padStart(2, "0") : x.movement ? "·" : `§ ${x.n}`}
              </span>
              <span className="min-w-0">
                <span
                  className={`block font-serif text-lg transition-colors group-hover:text-gold ${
                    step ? "text-gold" : x.movement ? "italic text-bone/80" : "text-bone"
                  }`}
                >
                  {x.t}
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                  {step ? why[x.id] : x.d}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </>
  );
}

/**
 * ForceAndForm — the descent from potency into visible structure, with the
 * threshold of visibility crossed only at the final step. Everything before it
 * has already happened invisibly, which is the claim: the visible body is the
 * last witness of a process long underway, not its beginning. The return arc
 * closes potency -> form -> new potency, since actuality does not exhaust potency.
 */
