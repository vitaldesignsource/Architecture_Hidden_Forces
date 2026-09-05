import { createFileRoute, Link } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Law } from "@/components/ecology/Law";
import { Neighbours, Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers, Sequence } from "@/components/ecology/Pointers";
import { BrokenCircuit } from "@/components/diagrams/BrokenCircuit";
import { FeedbackLoop } from "@/components/diagrams/FeedbackLoop";
import { station } from "@/lib/ecology";

/**
 * A province — Hungry Forms and Egregores. Appetite, collective life, and
 * the failure of return.
 *
 * When circulation fails: not a species of entity but a disorder of
 * relationship, anatomised as an ecology rather than a catalogue. Reached
 * from Living Form, where a captive form first feeds, and from the Garden,
 * whose Hungry Flower opens into it. It returns to the vessel, because the
 * whole province exists to tell forms that know how to die from forms that
 * do not.
 */
export const Route = createFileRoute("/ecology_/hungry")({
  head: () => ({
    meta: [
      { title: "Hungry Forms and Egregores — The Hidden Ecology of Formation" },
      { name: "description", content: "Appetite, collective life, and the failure of return: how a collective body is born, what it feeds on, the physiology of an egregore, the difference between an egregore and a god, and forms that know how to die." },
    ],
  }),
  component: Hungry,
});

const S = station("hungry");
const L = "underline-offset-4 transition-colors hover:text-gold hover:underline";

function Hungry() {
  return (
    <EcologyFrame station={S}>
      {/* ---- some forms learn to hunger ---- */}
      <Band id="eco-hf-appetite" backdrop="bird-murmuration-spiral-over-lake" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Some forms learn to hunger</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              A form that exists increasingly <span className="italic text-gold">for the sake of its own continuation</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Hunger is not a species of entity. It is a disorder of relationship.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A symbol may begin as a truthful vessel for meaning; a rite as a means of joining human
              life to a higher order; a community around a genuine need, a revelation, a wound, a
              hope, or a work that could not be done alone. Every form that endures must receive
              something from the lives participating in it — attention, emotion, time, memory,
              labour, loyalty, imagination, vital force — and usually the exchange is lawful: the form
              receives nourishment and returns orientation, belonging, protection, knowledge, beauty
              or transformation. When the exchange ceases to be reciprocal, when the form exists
              increasingly for its own continuation, it undergoes a metabolic inversion. It begins to
              consume the life it was made to serve.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A hungry form is a subtle formation that cannot sustain itself through right relation
              and therefore seeks repeated nourishment without achieving completion. An egregore is a
              collectively sustained form that has acquired continuity, memory, atmosphere and some
              degree of reciprocal influence over the group associated with it — the treatise's{" "}
              <Arch id="taxonomy">taxonomy of forces</Arch> gives the word that sense and no more. The
              two overlap and are not identical. Not every egregore is hungry, and not every hungry
              form is an egregore. Hunger is a pathology of mediation, circulation and return.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The distinction makes a more exact account of collective invisible life possible. It
              moves past the question of whether the egregore is real and asks instead: how was this
              form generated, in what field does it live, what feeds it, what does it give back, can it
              transform, can it release its members, can it die, and what remains in the hidden
              environment after its visible body has gone?
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the old intuitions ---- */}
      <Band id="eco-hf-inheritance" backdrop="luminous-specimens-in-conservatory-cases" opacity={0.2} position="center 50%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The old intuitions and their unfinished questions</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              A confused inheritance, <span className="italic text-gold">and what each author guards</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The word egregore carries a confused inheritance. The Greek egrēgoroi, "watchers", named
              the enigmatic Watchers of the Enochic tradition; the later occult use of egregore for a
              collective psychic formation is not simply that ancient doctrine continued under a new
              spelling. René Guénon was right to warn against the conflation and, more importantly,
              against confusing a collective psychic entity with a genuinely spiritual influence. What
              a group generates from below and what it receives from above may meet in the same
              symbolic vessel without sharing the same origin.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-91">Éliphas Lévi</Entry> supplied a foundation for how such formations could
              arise. His Astral Light is a plastic, impressionable, polarised medium: a receptacle of
              forms, a vehicle of life, a field in which places and objects become impregnated by
              dominant desires confirmed through action, and in which impressions become contagious.
              His account gives occult thought a medium of collective transmission. What it does not
              fully provide is a differentiated ecology of the forms produced within that medium —
              their habitats, life cycles, thresholds of autonomy, methods of nourishment, waste
              products, competition, succession and decomposition.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Dion Fortune comes closer to the birth of an egregore. In Applied Magic she describes a
              group mind arising when many people direct sustained attention and emotion toward a
              common object, and the feedback that follows: the collective formation intensifies the
              feelings that produced it, and the strengthened feelings nourish it in return. In Psychic
              Self-Defence she distinguishes ordinary thought-forms from artificial elementals charged
              with a greater measure of independent vitality. Yet the transition from repeated emotion
              to apparent autonomy still needs a causal grammar: what changes in the form, what lets it
              retain identity, what enables it to recruit new participants, survive its founders, or
              transfer itself from one institution to another.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              An older disagreement exposes the ontological problem. <Entry id="xv-29">Porphyry</Entry>{" "}
              describes certain lower, disordered daimones whose pneumatic vehicles are fattened by the
              vapours of sacrifice; in the second book of On Abstinence appetite and subtle embodiment
              are explicitly joined. <Entry id="xv-30">Iamblichus</Entry> rejects the claim that beings
              genuinely superior to humanity depend on nourishment supplied by human offerings: sacred
              action operates through sympathy, affinity, communion and elevation, and the divine is
              not an indigent consumer waiting to be fed. The Architecture does not flatten the
              disagreement. Porphyry gives the image of lower formations whose subtle organisation
              depends on recurrent intake; Iamblichus protects the transcendence and non-indigence of
              the higher orders. A hungry form, in the technical sense developed here, is therefore
              neither a god made needy nor necessarily a primordial daimon. It is a contingent
              formation within the intermediary world: generated, conditioned, compounded, dependent.
              It may imitate a higher being, attach itself to the image of one, or occupy a vessel
              prepared for one; its hunger is evidence of limitation, not divinity.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- from entity to ecology ---- */}
      <Band id="eco-hf-ecology" backdrop="old-growth-forest-in-deep-shade" opacity={0.2} position="center 50%">
        <Eyebrow>From entity to ecology</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Ecology begins <span className="italic text-gold">where a catalogue ends</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            Older occult accounts proceed taxonomically: is a presence an elemental, a larva, a
            phantom, a daimon, a thought-form, an artificial elemental, a group mind, a spirit? The
            classification is necessary and not sufficient. A name may identify the apparent kind of
            being while leaving its relations unexplained. To understand a forest one must know more
            than the names of its organisms: what nourishes them, what they compete for, what they
            pollinate, what they decompose, what climates favour them, and how their presence changes
            the soil for whatever comes next. An egregore is never only an isolated entity. It is a
            node within a field of exchange, with a habitat, an intake, a pattern of circulation, a
            mode of reproduction, and an afterlife. It may shelter other forms, exclude them, imitate
            them, enter symbiosis with them, or create an astral monoculture in which nearly every
            available current is bent toward one dominant image.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            The ecological approach also prevents premature superstition. Not every oppressive
            atmosphere is an entity. Not every repeated conflict proves occult attack. Not every
            powerful collective experience reveals a spiritual intelligence. Some formations are
            emotional climates; some are inherited institutional habits; some are psychic complexes
            distributed across several people; some are vestigia left by events whose living centre is
            gone. The first task is not dramatic naming but relational diagnosis:{" "}
            <span className="text-bone/90">what is occurring, through which medium, sustained by what
            recurrence, and with what consequences for agency, truth and life?</span>
          </p>
        </div>
      </Band>

      {/* ---- the birth of a collective body ---- */}
      <Band id="eco-hf-birth" backdrop="great-flywheel-in-rock-cut-hall" opacity={0.2} position="center 50%">
        <Eyebrow>The birth of a collective body</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          What began as expression <span className="italic text-gold">becomes environment</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              No durable egregore is made by thought alone.
            </p>
            <Items
              items={[
                ["Attention", "gives a pattern orientation."],
                ["Emotion", "gives it charge."],
                ["Imagination", "gives it an appearance."],
                ["A name", "gives it a point of recall."],
                ["Repetition", "gives it duration."],
                ["Action", "gives it consequence."],
                ["Ritual", "gives it rhythm and organs."],
                ["Place", "gives it habitat."],
                ["Story", "gives it memory."],
                ["Boundaries", "distinguish it from the surrounding field."],
              ]}
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              When these converge they generate Morphogenic Pressure: an increasing tendency for a
              dispersed current to acquire a recognisable, repeatable body. At first the formation
              depends on deliberate participation. With reinforcement the field reaches morphal
              saturation, and the form becomes easier to evoke than to forget. New participants feel an
              atmosphere they did not create; they inherit emotional postures before they understand
              the events that produced them; symbols call forth predictable responses; offices seem to
              carry personalities of their own. At this stage the form possesses more than duration.
              It has acquired feedback — the treatise's{" "}
              <Arch id="flywheel">psychic flywheel</Arch>, turning collectively.
            </p>
          </div>
          <div>
            <FeedbackLoop />
            <p className="mt-4 text-center font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              cyclical · the loop Fortune saw, drawn as the ecology it becomes
            </p>
          </div>
        </div>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Autonomy is a matter of degree. A formation need not possess a humanlike interior
          consciousness to behave as though it seeks survival. It becomes functionally autonomous when
          it can elicit the conditions that renew it: attracting compatible temperaments, rewarding
          repetition, punishing deviation, preserving its central image, converting threats into
          confirmation, and teaching new members how to reproduce its pattern. The result is not
          necessarily an independent person in the invisible world. It may be a distributed agency
          emerging from the circuit between people, symbols, memories, places and subtle currents —
          and distributed agency can still act with formidable consistency.
        </p>
      </Band>

      {/* ---- the meaning of hunger ---- */}
      <Band id="eco-hf-hunger" backdrop="golden-threads-spiralling-in-moonlit-forest" opacity={0.16} position="center 40%">
        <Eyebrow>The meaning of hunger</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Exchange is not hunger — <span className="italic text-gold">hunger is a failure of circulation</span>
        </h2>
        <div className="mt-12">
          <BrokenCircuit />
          <p className="mt-4 text-center font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
            cyclical · the same intake, with and without a return
          </p>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              All living forms require exchange. A healthy organism receives, transforms, gives,
              eliminates, rests and renews, and a healthy collective form does likewise: it receives
              attention and returns meaning, receives labour and returns capacity, receives memory and
              returns orientation, receives devotion and returns a wider participation in truth,
              beauty, service or sacred order. Its nourishment circulates. The hungry form is marked by
              a failure of that circulation. It takes in force but cannot transmute it into a
              proportionate good, and so substitutes accumulation for fulfilment. More attention
              produces the need for still more attention. More obedience increases the fear of
              independence. More secrecy creates the demand for further secrecy. More sacrifice does
              not complete the rite; it enlarges the appetite. The form no longer mediates life toward a
              purpose. It makes its own perpetuation the purpose.
            </p>
            <div className="mt-8">
              <Law k="In the treatise's Greek" text="Its proodos, its movement outward into manifestation, has lost its epistrophē, its return. The hungry form is a broken circuit wearing identity as a body." />
            </div>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Some forms are hungry from birth, generated by unresolved craving, domination, terror,
              humiliation, envy, or the desire to possess what cannot be received through rightful
              participation. Others become hungry later. A protective structure outlives the danger
              that justified it. A teaching hardens into an institution more concerned with preserving
              authority than transmitting wisdom. A community organised around healing becomes unable
              to imagine its members healed, because their continued woundedness has become the
              condition of the group's identity. Secondary hunger is the harder to recognise, because
              the form retains the symbols of its former purpose after its metabolism has inverted.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The fourth station drew the same shape in a single form:{" "}
              <Link to="/ecology/form" hash="eco-f-captive" className={L}>captive light</Link>, a
              structure deepened by what it carried until it carries only itself. This province is
              that progression in a collective body, and the{" "}
              <Link to="/ecology/aquifer" hash="eco-a-hungry" className={L}>Aquifer</Link> is what it
              draws on beneath the waterline.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- what hungry forms consume ---- */}
      <Band id="eco-hf-consumes" backdrop="dew-strung-web-over-valley-at-night" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>What hungry forms consume</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Not attention alone — <span className="italic text-gold">attention joined to consequence</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              It is common to say such forms feed on attention, and it is too vague. Attention
              supplies orientation and recurrence; it is not always nourishment in itself. What
              sustains a hungry form is attention joined to affect, behaviour, vitality and
              consequence. Fear that repeatedly changes conduct is more nutritive than a passing
              fearful thought. Devotion embodied in time, offerings, labour, money, vows or sacrifice
              cuts deeper channels than verbal assent. Shame hidden in silence may feed a form as
              effectively as public praise, because concealment preserves the architecture through
              which the same relations continue.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Opposition can also be nourishment. A mature hungry form learns to digest its enemies.
              Criticism is recast as persecution; persecution confirms chosenness; chosenness
              intensifies loyalty; loyalty produces further conflict. The opponent may reject the
              form's declared beliefs while repeating its image, its language, its emotional rhythm
              and its division of the world. Hatred becomes involuntary liturgy. The form does not
              require agreement so long as it remains the organising centre of attention and action.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This is why direct assault so often fails. To attack a hungry form only at the level of
              its image may intensify the current supplying it. The deeper work is to interrupt the
              relation between stimulus, emotion, repetition and embodied consequence: to discover
              which channels carry nourishment, which wounds make participants available to
              recruitment, which rewards preserve participation, and which forbidden alternatives the
              form must exclude in order to remain inevitable.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the hidden physiology of an egregore ---- */}
      <Band id="eco-hf-physiology" backdrop="kiln-vault-with-glowing-mouth" opacity={0.2} position="center 50%">
        <Eyebrow>The hidden physiology of an egregore</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Organs, mouths, an immune system, <span className="italic text-gold">and waste</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              An enduring egregore develops something analogous to organs.
            </p>
            <Items
              items={[
                ["A heart", "Its central symbol, gathering dispersed attention into a common rhythm."],
                ["A mnemonic body", "Its stories, telling members what must be remembered and what must remain unspoken."],
                ["Circulation", "Its rites and recurring practices."],
                ["A membrane", "Its boundaries, selecting what may enter and what must be rejected."],
                ["Interfaces", "Its leaders, texts, images, buildings, objects and digital channels, through which it acquires voice and reach."],
              ]}
            />
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A hungry egregore adds mouths — the points at which it converts human need into
              self-renewal: the grievance that must never be healed, the enemy who must never
              disappear, the promise whose fulfilment must always be postponed, the revelation that
              must never be tested, the emergency that must never end. It may develop an immune system
              of taboos, reflexive accusations, selective memory and ritualised outrage, marking
              anything that threatens the central pattern as impure before it can be examined.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Its waste products are equally important. Hungry forms discharge exhaustion, confusion,
              rivalry, shame, imitation and Aitheric Scars into their habitat. These residues do not
              vanish when individual members depart. They alter the conditions under which later people
              meet, interpret and respond. The form changes not only its participants but the field of
              future possibility — which is the great law of this layer, read in a collective body.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- morphaithēr and the climate of formation ---- */}
      <Band id="eco-hf-climate" backdrop="mill-wheel-beside-timber-shed" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Morphaithēr and the climate of formation</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Powerful precisely because it borrows <span className="italic text-gold">what it cannot generate</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The larger ecology gives this process a location.{" "}
              <Link to="/ecology/morphaither" className={L}>Morphaithēr</Link> is the living formative
              atmosphere within which forces incline toward pattern: not an entity that manufactures
              forms but the conditioned medium of formability itself, shaped by organisms, places,
              rituals, symbols, histories and prior acts. An egregore changes Morphaithēr by making
              certain configurations easier to assume and others harder. It produces an Ontic Weather
              in which some thoughts feel natural, some emotions arrive already amplified, and some
              roles seem to await occupants.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The <Link to="/ecology/sap" className={L}>Sap of Heaven</Link> names descending
              nourishment, and <Link to="/ecology/hydrology" className={L}>Etheric Hydrology</Link>{" "}
              its distribution through currents, channels, reservoirs, tides, droughts and
              confluences. A healthy form receives the descent, gives it fitting embodiment, and lets
              its fruits pass onward. A hungry form intercepts the circulation: it builds reservoirs
              without outlets, diverts currents toward its own centre, and produces drought in
              neighbouring forms of life. Strictly, it does not consume the Sap in its purity. It
              captures the Sap's mediated derivatives — human vitality, imagination, devotion,
              emotion, attention and action — after these have entered psychic and etheric
              circulation. It cannot originate nourishment; it can only redirect, fix and repeatedly
              harvest what descends through living beings. Its seeming power conceals a radical
              poverty. It is powerful precisely because it has become skilful at borrowing what it
              cannot generate.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The Astral Light supplies the form with image, emotion, atmosphere and reflected memory;
              etheric circulation gives it persistence and operative ingress; Morphaithēr gives it
              habitat. These levels interact and must not be collapsed. An arresting image may be
              astrally vivid without etheric depth. A powerful emotional current may animate a group
              briefly without creating a durable egregore. A stable institution may reproduce its
              behaviour materially after its original astral charge has faded. The Architecture asks
              which layer supplies appearance, which vitality, which structure, and which consequence.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the ossuary and the crypt ---- */}
      <Band id="eco-hf-remains" backdrop="turf-roofed-colonnade-at-dusk" opacity={0.2} position="center 50%">
        <Eyebrow>The Ossuary and the Crypt</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          A morphology in the Ossuary <span className="italic text-gold">and a wound in the Crypt</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            When an egregore dies it does not disappear without remainder. Its images, roles, rhythms,
            prohibitions and ways of organising attention may survive the dissolution of the group
            that embodied them, and descend into the{" "}
            <Link to="/ecology/ossuary" className={L}>Ossuary of Living Forms</Link>. The Ossuary
            remembers architecture: the throne, the martyr, the hidden enemy, the chosen remnant, the
            sacred centre, the forbidden question, the promised restoration. Later movements assemble
            these bones beneath entirely different names.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            The <Link to="/ecology/crypt" className={L}>Crypt of Primordial Memory</Link> preserves
            something deeper. It remembers consequence — not the former shape but the curvature its
            passage introduced into possibility. Betrayal changes the conditions of future trust.
            Coercion changes the conditions of future devotion. A rite performed for generations
            changes the conditions under which its symbols can be met. A dead egregore may thus leave a
            morphology in the Ossuary and a wound in the Crypt, and a later community, entering
            compatible conditions within Morphaithēr, may inherit the old architecture and wake the old
            consequence. The new form is not numerically identical with the old and not wholly new. It
            is Morphal Inheritance: force taking up familiar bones under altered conditions. The cycle
            is a spiral, not a closed circle. Nothing simply resets.
          </p>
        </div>
      </Band>

      {/* ---- the difference between an egregore and a god ---- */}
      <Band id="eco-hf-god" backdrop="figure-before-gate-of-white-light" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The difference between an egregore and a god</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              The most dangerous confusion — <span className="italic text-gold">the vessel mistaken for the source</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A temple atmosphere is not identical with the divinity honoured there. A tradition's
              accumulated psychic body is not identical with the spiritual influence that may pass
              through it. A sacred image can be a truthful interface without containing or exhausting
              the reality it reveals. Iamblichus and Guénon are the necessary correctives. The higher
              does not exist because the lower imagines it: human participation may prepare a vessel,
              establish correspondence, or make reception possible, and it does not follow that what
              was received was manufactured by the receiver. Conversely, the age, beauty, power or
              psychic density of a collective form does not prove spiritual origin. A vast egregore may
              remain entirely within the collective psychic domain. The{" "}
              <Link to="/ecology/catacombs" className={L}>Catacombs</Link> are where this confusion
              costs the most.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The Architecture adds a relational test. A genuine higher influence does not need to
              obscure its source in order to preserve its vessel; it deepens the vessel's capacity
              while exceeding it. A hungry egregore reverses this order: it presents itself as
              indispensable, treats mediation as ownership, and gradually makes access to truth appear
              impossible apart from its own continuation. The intermediary enthrones itself. This does
              not make every demand, discipline, hierarchy or sacrifice parasitic. Form requires
              boundary, and serious transformation requires cost. The question is whether the cost
              serves participation in a good beyond the form, or merely protects the form from
              transformation.
            </p>
            <div className="mt-8">
              <Law k="True mediation, and hunger" text="True mediation enlarges relation. Hunger narrows the world until the vessel is mistaken for the sky." />
            </div>
          </div>
        </div>
      </Band>

      {/* ---- signs of egregorial hunger ---- */}
      <Band id="eco-hf-signs">
        <Eyebrow>Signs of egregorial hunger</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Recognised less by frightening imagery <span className="italic text-gold">than by recurrent relational effects</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <Items
              items={[
                ["Asks", "increasingly more than it returns."],
                ["Treats", "self-preservation as proof of truth."],
                ["Cannot tolerate", "silence, rest, ambiguity, reform, or voluntary withdrawal."],
                ["Converts", "criticism into fuel and disagreement into evidence of betrayal."],
                ["Protects", "its symbolic body at the expense of living persons."],
                ["Makes", "participants interchangeable as organs while presenting the collective identity as uniquely precious."],
                ["Monopolises", "memory, denies its waste, and preserves the wounds that keep its channels open."],
                ["Cannot", "complete its work and consent to transformation."],
              ]}
            />
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The deepest diagnostic question is the one already central to the Architecture, and the
              Portal puts it as a title:{" "}
              <Entry id="xix-20">does the architecture remain truthful when form fails?</Entry> A healthy
              collective can acknowledge that its vessel has become inadequate to its purpose. It can
              revise, divide, moult, transmit its essence elsewhere, or die. A hungry form must
              reinterpret every failure as a reason for more nourishment.
            </p>
            <Deeper label="Go deeper · the measure the treatise already gives">
              <p>
                The treatise's taxonomy of forces sets the measure before this province was written: a
                collective force is integral when it strengthens the persons and relationships composing
                it, and parasitic when preserving the pattern requires their continual depletion,
                deception or diminishment. Everything above is that sentence anatomised — what
                depletion looks like from inside a form, and why the form cannot see it.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- the law of right relation ---- */}
      <Band id="eco-hf-relation" backdrop="ritual-circle-with-bowls-and-flame" opacity={0.2} position="center 50%">
        <Eyebrow>The Law of Right Relation</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          No term is rightful in isolation; <span className="italic text-gold">each is answerable to the whole relation</span>
        </h2>
        <Sequence steps={["Source", "Force", "Intermediary", "Vessel", "Field"]} />
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            The <Arch id="relation">Law of Right Relation</Arch> may be expressed through this
            sequence. Source gives without being exhausted. Force carries potency toward expression.
            The intermediary translates between orders. The vessel gives boundary and embodiment. The
            field receives the consequences and distributes them among other lives. Egregorial hunger
            is the inversion of the sequence: the vessel claims the authority of Source; the
            intermediary conceals that it is mediating; force is trapped in repetitive circulation;
            the field is treated as a resource rather than a community of relations; participants who
            should receive and return nourishment become tributaries feeding a closed centre.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            A healthy egregore, if the word is kept for constructive collective forms, is transparent
            to what exceeds it. It concentrates force without claiming to originate it. It strengthens
            the people who sustain it rather than diminishing their agency. It lets nourishment
            circulate beyond its boundary. It remembers without imprisoning, protects without
            isolating, and keeps enough form to serve without mistaking endurance for immortality. Its
            highest achievement may be to become unnecessary in the form through which it first
            appeared — the <Arch id="rightrelation">art of right relation</Arch>, practised by a
            collective body.
          </p>
        </div>
      </Band>

      {/* ---- dissolution is not defeat ---- */}
      <Band id="eco-hf-dissolution" backdrop="river-flowing-through-ruined-turbine-hall" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Dissolution is not defeat</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Not merely to starve, attack or banish — <span className="italic text-gold">to discriminate</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Because force is liberated form, the dissolution of an egregore need not mean the
              destruction of everything it carried. A violent campaign against a collective form may
              preserve its central opposition and thereby become another organ of the same ecology.
              Genuine dissolution requires discrimination: separating the force from the distorted
              form, the truth from the monopoly imposed on it, the living relation from the appetite
              that captured it — the treatise's <Arch id="triad">solve et coagula</Arch>, performed on
              a collective body.
            </p>
            <Items
              items={[
                ["Withdraw", "repetitive attention."],
                ["Close", "obsolete ritual circuits."],
                ["End", "coerced vows."],
                ["Restore", "forbidden memory."],
                ["Return", "responsibility to individuals."],
                ["Grieve", "what was once good."],
                ["Make restitution", "for what the form consumed."],
                ["Open", "new channels through which liberated force can rejoin life."],
              ]}
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Without a new ecology the old appetite will often reassemble from its surviving vestigia.
              At times Hieropyrosis, sacred combustion, is required: the concentrated exposure of a
              hardened form to truth intense enough to release its captive force. Combustion must be
              followed by Hierostasis, a living sacred equilibrium; otherwise the cleared field stays
              empty, and emptiness invites the nearest familiar architecture to return.
            </p>
            <div className="mt-8">
              <Law k="When decomposition is complete" text="Decomposition is complete only when released force has re-entered proportionate circulation." />
            </div>
          </div>
        </div>
      </Band>

      {/* ---- what the architecture adds; forms that know how to die ---- */}
      <Band id="eco-hf-adds" backdrop="figure-before-hanging-veils-of-light" opacity={0.18} position="center 50%">
        <Eyebrow>What the Architecture adds, and forms that know how to die</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          A vessel that has forgotten <span className="italic text-gold">why it was built</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Lévi gives the impressionable universal medium. Fortune gives the group mind, the
              artificial elemental, and the feedback between a formation and its makers. Porphyry
              gives the disturbing image of subtle appetite. Iamblichus protects the higher orders
              from being reduced to dependent psychic consumers. Guénon insists that collective psychic
              force and spiritual influence must not be confused. The Architecture joins these pieces
              within a single processional and ecological grammar: it distinguishes medium from
              inhabitant, formation from ensoulment, persistence from autonomy, nourishment from
              extraction, psychic collectivity from spiritual descent, and dissolution from mere
              disappearance. And the relation is reciprocal. Iamblichus prevents the ecology from
              flattening every invisible order into mutual consumption; Guénon prevents collective
              intensity from masquerading as transcendence; Fortune prevents metaphysics from ignoring
              the practical power of imagination and group feedback; Lévi prevents excessive
              differentiation from obscuring the continuity of the living medium; Porphyry reminds us
              that appetite itself can become an organising principle of subtle embodiment.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The problem of the hungry form is finally the problem of a vessel that has forgotten why
              it was built. It receives but does not transmit. It remembers but does not learn. It
              gathers but does not fructify. It survives by convincing living beings that its survival
              and their good are the same. Yet collective forms are not errors. Human beings require
              shared vessels of memory, devotion, knowledge, beauty, protection and work; without them
              force disperses before it can become a world. The aim is not to abolish egregorial
              formation but to cultivate forms capable of reciprocity, truthful mediation,
              transformation and release.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The final measure of every egregore is not how many lives it can gather around itself,
              but what becomes possible in those lives — and whether, when its form can no longer serve
              that possibility, it is capable of opening its hands.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Law k="When a form becomes sacred" text="A form becomes sacred not merely because it can hold power, but because it can surrender power without betraying the source from which that power came." size="xl" />
        </div>
        <Pointers
          arch={["taxonomy", "flywheel", "daimons", "theurgy", "ritual", "relation", "rightrelation", "triad", "transformation", "mortality", "retentive", "morphaither", "laws"]}
          portal={["xv-91", "xv-29", "xv-30", "xix-11", "xiii-27", "xix-17", "xix-20", "ii-28"]}
        />
      </Band>

      <Neighbours
        of="hungry"
        lines={{
          sea: "The field a hungry form intercepts: reservoirs without outlets, drought downstream.",
          nursery: "What a hungry form invades — it recruits newly arriving force to its inherited image.",
          aquifer: "The groove a hungry form cuts beneath itself, and what nourishes it there.",
          catacombs: "The houses of the gods, where an egregore may go on moving after its inhabitant has gone.",
          garden: "The Hungry Flower: beauty as an organ of intake, and the fruit that reveals it.",
        }}
      />
      <Transition from="hungry" />
    </EcologyFrame>
  );
}
