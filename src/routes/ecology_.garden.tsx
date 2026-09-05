import { createFileRoute, Link } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Law } from "@/components/ecology/Law";
import { Neighbours, Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers } from "@/components/ecology/Pointers";
import { CounterfeitBloom } from "@/components/diagrams/CounterfeitBloom";
import { SixSpecies } from "@/components/diagrams/SixSpecies";
import { station } from "@/lib/ecology";

/**
 * A province — The Garden of Counterfeit Flowers. False anthesis and the
 * seduction of living appearances.
 *
 * Where residue acquires allure: the field of selection in which forms
 * compete through attraction, and a form can be real as a form and false
 * as a name. Reached from Living Form, whose anatomy is an argument, and
 * from the Catacombs, whose returning god-forms are judged here. It hands
 * on to the hungry forms, because a flower that must be fed to keep its
 * colour has become an appetite.
 */
export const Route = createFileRoute("/ecology_/garden")({
  head: () => ({
    meta: [
      { title: "The Garden of Counterfeit Flowers — The Hidden Ecology of Formation" },
      { name: "description", content: "False anthesis: how forms flourish by claiming a lineage, authority or purpose they do not bear; the anatomy of a counterfeit bloom; the six species; the test of fruit; and the horticulture of discernment." },
    ],
  }),
  component: Garden,
});

const S = station("garden");
const L = "underline-offset-4 transition-colors hover:text-gold hover:underline";

function Garden() {
  return (
    <EcologyFrame station={S}>
      {/* ---- the invisible garden ---- */}
      <Band id="eco-g-invisible" backdrop="spectral-valley-with-rainbow-beam" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The invisible garden</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              The colour of one origin, <span className="italic text-gold">the nourishment of another</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Not a realm of lies. Its flowers are most deceptive precisely because something within
              them is alive.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Garden of Counterfeit Flowers is that region of the subtle ecology in which forms
              flourish by appearing to possess a lineage, authority or purpose they do not truly
              bear. Its flowers may be visions, doctrines, spirit-images, revelations, ritual
              identities, healing currents, sacred symbols or collective myths. Each displays the
              colour of one origin while drawing its nourishment from another. A form born from fear
              wears the appearance of prophecy. A thought-form accumulated through collective devotion
              presents itself as an ancient god. A personal wound clothes itself in the robes of
              initiation. An authentic spiritual influence may also be received through a distorted
              image and so be given a false name.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The Garden is therefore not simply a realm of lies, fantasies or hallucinations. Its
              flowers can possess fragrance, vitality, agency and consequence. Some produce visions,
              sensations, coincidences, changes of conduct, or genuine aetheric effects. Their
              counterfeitness does not consist in their nonexistence. It consists in the false
              relationship between what they are and what they claim to be. A glamour may be entirely
              real as a glamour. An egregore may be real as an egregore while remaining counterfeit as
              the god, angel, ancestor or hidden master whose identity it assumes. A psychologically
              generated figure may speak a valuable truth without being the external intelligence the
              visionary imagined. Conversely, a genuine intelligence may enter the Astral Light and be
              clothed in imagery drawn from the recipient's memory, culture, desire and expectation.
              The reality of an encounter does not prove the accuracy of its interpretation.
            </p>
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              This is the central mystery of the Garden: its flowers are often most deceptive precisely
              because something within them is alive.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the meaning of counterfeit ---- */}
      <Band id="eco-g-counterfeit" backdrop="round-mirror-set-in-stone-wall" opacity={0.2} position="center 50%">
        <Eyebrow>The meaning of counterfeit</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Not imitation — <span className="italic text-gold">a disorder of relation</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Within the Architecture a form is counterfeit when its appearance claims a relation that
              its interior organisation does not sustain. It may claim a false source, perform a false
              function, occupy an improper place in a hierarchy, or promise fruit its roots cannot
              produce. The layer calls the condition False Anthesis: the flowering of a form before it
              possesses, or after it has lost, the inner relation its appearance implies. A genuine
              symbol becomes counterfeit when it is severed from its living current and goes on
              borrowing authority from its former sanctity. An immature possibility becomes counterfeit
              when it is forced prematurely from the{" "}
              <Link to="/ecology/nursery" className={L}>Nursery</Link> and proclaimed a completed
              revelation. A partial truth becomes counterfeit when it presents itself as the whole.
            </p>
            <Items
              items={[
                ["Genealogy", "It may lie about where it came from."],
                ["Function", "About what it does."],
                ["Proportion", "About how much truth it contains."],
                ["Season", "About whether its time has arrived."],
                ["Fruit", "About what it will ultimately bring forth."],
              ]}
            />
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              These forms do not always speak deliberate falsehoods. Many simply repeat the name given
              to them by those who first encountered them. Others have forgotten their own origin
              through centuries of transmission, imitation and morphal inheritance. The counterfeit is
              not a permanent species of being. It is a condition into which any form can fall. A true
              flower becomes counterfeit when it is endlessly reproduced without its root. A fabricated
              image ceases to be counterfeit when it is honestly recognised as an artistic,
              psychological or ritual construction.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A consciously fashioned mask is not deceptive merely because it is a mask. The deception
              begins when the mask conceals the conditions of its making and demands the authority of
              the face it resembles.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- how counterfeit flowers grow ---- */}
      <Band id="eco-g-grow" backdrop="desert-oasis-pool-among-palms" opacity={0.2} position="center 55%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>How counterfeit flowers grow</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Rarely from nothing — <span className="italic text-gold">most begin with a genuine fragment</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Most counterfeit flowers begin with something real: a vestigium, a morphorelic, a
              surviving correspondence, the broken syntax of an older sacred form. The{" "}
              <Link to="/ecology/crypt" className={L}>Crypt</Link> preserves deep tendency and
              consequence; the <Link to="/ecology/ossuary" className={L}>Ossuary</Link> the structural
              bones of what has lived. These remains descend into the{" "}
              <Link to="/ecology/aquifer" className={L}>Black Aquifer</Link>, where they mingle with
              abandoned desires, ancestral pressures, forgotten devotions and unrealised possibilities.
              Through pneumic percolation the submerged pressures rise again.{" "}
              <Link to="/ecology/morphaither" className={L}>Morphaithēr</Link> gathers them toward
              pattern. The Astral Light clothes the emerging pattern in image, emotion, atmosphere and
              symbolic appearance. Human attention supplies warmth; repetition supplies water; desire
              supplies sweetness; fear supplies defensive thorns. Ritual recurrence raises morphal
              saturation until a fragile image becomes stable enough to exert pressure of its own.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              When aitherostasis occurs the flower is no longer only an idea entertained by a mind. It
              has a foothold in the formative environment. It begins to influence dreams,
              expectations, relationships, ritual spaces and the reading of coincidence — and its
              apparent independence is then taken as proof of its claimed identity. Yet a form's ability
              to act proves only that force has gathered around it. Efficacy does not establish
              genealogy, and manifestation does not confer authority.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              An aitheric scar is especially fertile soil. Repeated fear, grief, longing or injury may
              alter the flow of the subtle organism, cutting a channel through which similar images
              repeatedly emerge; because the image returns with force and consistency, the person
              assumes it comes from an external being or a cosmic decree. The Architecture does not
              reduce the experience to psychology, and it does not treat repetition as proof. It asks
              what underlying pressure, channel, memory or presence gives the recurrence its form. In
              collective environments an egregore makes its own ontic weather: interpretations
              favourable to the group's identity are watered, contradictory perceptions are deprived of
              light, and the garden alters the cryptaxis of everyone within it, so that attention turns
              unconsciously toward whatever nourishes the dominant form. The stated doctrine may be the
              trellis. The concealed desire of the group is the root.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the anatomy of a counterfeit bloom ---- */}
      <Band id="eco-g-anatomy">
        <Eyebrow>The anatomy of a counterfeit bloom</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Every flower makes an argument <span className="italic text-gold">through its anatomy</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <CounterfeitBloom />
            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              symbolic · what the petals say, and what the root admits
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Its colour is its correspondence: the signs, names, planetary emblems, scriptures or
              traditional images through which it announces its identity. Its fragrance is its
              affective power — the awe, familiarity, dread, ecstasy or recognition that persuades the
              perceiver before judgement begins. Its nectar is the immediate reward it offers:
              certainty, belonging, superiority, consolation, secret knowledge, the feeling of being
              chosen. Its thorns are the penalties imposed on doubt. Its fruit is the long-term
              consequence it produces within the soul and its surrounding relationships.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The colour may be borrowed. The fragrance may arise from accumulated emotion. The nectar
              may be psychologically real. The thorns may be enforced by an egregore. Only the fruit
              reveals the whole plant. This is why beauty, radiance, antiquity, intensity and even
              power cannot serve as sufficient tests of truth. A counterfeit flower can be beautiful,
              because beauty belongs to configuration as well as source. It can be ancient, because a
              mistake may be inherited. It can be radiant, because the Astral Light magnifies
              emotionally charged images. It can be powerful, because human devotion has irrigated it
              for generations. It can even predict events accurately, because an operative sensitivity
              need not possess wisdom about its own nature.
            </p>
            <div className="mt-8">
              <Law k="Where the Garden thrives" text="The Garden thrives wherever manifestation is mistaken for authentication." />
            </div>
          </div>
        </div>
      </Band>

      {/* ---- the species of the garden ---- */}
      <Band id="eco-g-species" backdrop="cabinet-of-curiosities-in-lamplight" opacity={0.18} position="center 50%">
        <Eyebrow>The species of the Garden</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Six flowers, <span className="italic text-gold">one grammar</span>
        </h2>
        <div className="mt-12">
          <SixSpecies />
          <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
            symbolic · six glyphs; not six kinds of lie
          </p>
        </div>
        <Items
          items={[
            ["The Mirror Flower", "Grows around the expectations of the beholder. It discovers what the visionary longs to meet and returns that longing in perfected symbolic form — the ideal lover, teacher, ancestor, angel, secret chief, heroic former incarnation. The overwhelming sense of recognition may mean the image has conformed itself to the perceiver rather than descended from beyond them."],
            ["The Relic Bloom", "Grows from morphal inheritance. Its outer form once belonged to a living current whose vertical connection has weakened or gone; devotion, repetition and cultural memory keep it flowering after its root has died. It may retain dignity, use and fragments of real power. What makes it counterfeit is its continuing claim to an undiminished transmission."],
            ["The Grafted Flower", "Joins a genuine symbol to an alien root: a solar image on personal ambition, a healing symbol on the need to control, an initiatory ordeal on unresolved cruelty. Because the upper part is authentic the whole appears legitimate, and the fruit reveals the graft — illumination becomes inflation, protection domination, sacrifice self-destruction, tradition a mechanism for feeding identity."],
            ["The Orphan Flower", "A real encounter whose proper name has been lost: the experiencer touches an authentic current and interprets it through the nearest available mythology. Not fraud and not delusion but an error of attribution, produced by the distance between force and image. It becomes counterfeit only when uncertainty is suppressed and the borrowed identity treated as unquestionable revelation."],
            ["The Hungry Flower", "A form whose beauty functions as an organ of consumption. It converts attention, fear, praise, imitation and conflict into sustaining force, rewards devotees with genuine experiences because experience encourages feeding, and spreads its signs like pollen through groups and institutions. It returns little transformed vitality to those who nourish it. Its central fruit is dependency."],
            ["The Premature Flower", "Drawn from the Nursery before its formative relations have matured. It may hold a real intuition of something seeking embodiment, forced too quickly into a finished image: possibility mistaken for prophecy, an early correspondence for a complete system, a momentary opening for permanent attainment. Some counterfeit flowers are genuine futures imprisoned in false presents."],
          ]}
        />
      </Band>

      {/* ---- earlier maps of the garden ---- */}
      <Band id="eco-g-maps" backdrop="optics-table-with-prism-and-spectrum" opacity={0.18} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Earlier maps of the Garden</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              From a theory of representation <span className="italic text-gold">to an ecology of living images</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              In the Sophist, Plato distinguishes the making of a likeness from the production of an
              appearance engineered to seem correct from a particular viewpoint — an early language for
              the difference between a form that preserves proportion and one that merely succeeds in
              persuading the observer. The distinction does not describe how such appearances acquire
              vitality, become collectively sustained, or alter the environments in which future
              perception occurs. The Architecture extends it from a theory of representation into an
              ecology of living images.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-30">Iamblichus</Entry> is the essential complement. His{" "}
              <Arch id="theurgy">theurgy</Arch> insists that sacred efficacy does not originate in the
              private imagination of the operator: authentic divine symbols hold their power through
              participation in orders exceeding human invention. That strengthens the Architecture's
              vertical criterion — a symbol is not made sacred by intense feeling — and the Architecture
              adds an account of horizontal accumulation, of how attention, emotion, ritual and group
              repetition can imitate some of the effects of vertical participation without sharing its
              source.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Renaissance magic developed sophisticated accounts of celestial images, signatures,
              occult virtues and chains of <Arch id="correspondence">correspondence</Arch>. The Garden
              introduces the problem of the counterfeit signature. A form may display the correct
              colour, number, planetary emblem, mythology and ritual gesture while lacking the deeper
              chain those signs are supposed to express. Correspondence may invite a current;
              resemblance alone does not prove that the current has arrived. The true signature is not
              visual or classificatory but relational, operative, and able to produce the appropriate
              fruit.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-91">Lévi's</Entry> Astral Light describes the plastic medium through which
              images, will and visionary appearance become operative, presenting a fluidic panorama to
              consciousness; Dion Fortune's thought-forms and group minds give practical insight into
              how such structures are built and dissolved. The Architecture differentiates what Lévi
              gathers under one luminous concept — the Astral Light gives a form its face; aetheric
              manifestation gives it a foothold; the Aquifer supplies inherited pressure; Morphaithēr
              organises the tendency toward form; Etheric Hydrology describes how vitality circulates
              through the result — and carries Fortune's insight further by asking how thought-forms
              acquire anatomy, inherit earlier structures, occupy niches, alter ontic weather, and
              sometimes outlast the intention of their makers. The relation is reciprocal: they give
              the philosophical distinctions, the vertical safeguards and the practical warnings; the
              Architecture gives their insights a morphology, a hydrology, an ecology and a theory of
              transmission.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the garden and the other regions ---- */}
      <Band id="eco-g-regions" backdrop="ancient-olive-grove-in-sunlight" opacity={0.2} position="center 50%">
        <Eyebrow>The Garden and the other hidden regions</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Where the materials <span className="italic text-gold">acquire allure</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            The Crypt preserves deep consequence. The Ossuary retains structural remains. The Aquifer
            holds submerged pressures, vestigia and morphorelics in a dense memory-bearing medium. The
            Nursery shelters possibilities that have not entered stable manifestation. The system also
            names a Menagerie of Impossible Forms, the unprecedented organisms produced when
            incompatible or previously unrelated lineages recombine. The Garden is where these
            materials acquire allure. A fragment rises from the Aquifer, borrows bones from the
            Ossuary, seizes an unrealised possibility from the Nursery, and clothes itself in the
            Astral Light. If several lineages are grafted together the flower may open into one of the
            strange organisms of the Menagerie; if collective attention goes on nourishing it, the
            bloom may become an egregoric species capable of seeding whole symbolic landscapes.
          </p>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Garden is therefore not another repository. It is a field of selection in which
              forms compete through attraction. What survives there is not necessarily what is true,
              beneficial or vertically aligned. It is what most successfully captures attention,
              satisfies desire, embodies fear, or reproduces itself through memory.
            </p>
            <div className="mt-8">
              <Law k="A law of subtle ecology" text="That which attracts nourishment is not necessarily that which deserves to live." />
            </div>
          </div>
        </div>
      </Band>

      {/* ---- the test of fruit ---- */}
      <Band id="eco-g-fruit" backdrop="bowls-and-leaf-on-wet-terrace" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The test of fruit</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Neither by ugliness nor beauty, <span className="italic text-gold">neither by comfort nor terror</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Architecture judges a flower by the <Arch id="relation">Law of Right Relation</Arch>{" "}
              and the Portal's <Entry id="xix-17">Law of Truthful Architecture</Entry>. A genuine form
              need not be pleasant. It may expose contradiction, demand sacrifice, or disturb an
              established identity. Yet over time it tends toward greater proportion, lucidity,
              responsibility, freedom and capacity for relationship. It does not require the permanent
              suspension of discernment. It can survive honest questioning, because its life does not
              depend on maintaining a particular appearance. A counterfeit flower produces:
            </p>
            <Items
              items={[
                ["Intensity", "without integration."],
                ["Heat", "without light."],
                ["Identity", "without transformation."],
                ["Correspondence", "without causation."],
                ["Obedience", "without reciprocity."],
                ["Revelation", "without the possibility of correction."],
              ]}
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              It may give the practitioner a grander image of the self while quietly diminishing the
              self's actual capacity, multiply signs while narrowing perception, promise sovereignty
              while making its adherents dependent on its continued approval. The decisive question is
              not merely whether something happened. Something may indeed have happened. What acted?
              Through what medium? What fed it? What relationship did it establish? What did it make
              possible? What does it continually demand? What kind of being does prolonged contact
              produce? Above all:{" "}
              <Entry id="xix-20">does the architecture remain truthful when the flower falls?</Entry>{" "}
              If the radiance disappears, does the insight remain? If the sacred name is removed, does
              the operation still reveal its nature? If the promised identity is questioned, does the
              form become clearer or more coercive? If the vision ceases, has the person gained a
              durable capacity, or only the wish to see the vision again?
            </p>
            <div className="mt-8">
              <Law k="What fruit is" text="Fruit is truth extended through time." />
            </div>
          </div>
        </div>
      </Band>

      {/* ---- the horticulture of discernment ---- */}
      <Band id="eco-g-horticulture" backdrop="filter-stack-of-cloth-and-stone" opacity={0.2} position="center 50%">
        <Eyebrow>The horticulture of discernment</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Horticultural, <span className="italic text-gold">not iconoclastic</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Discernment within the Garden must not become a war against imagination. Sterile
              scepticism destroys real flowers with false ones and leaves the soul incapable of
              symbolic perception. One observes the seasons, examines the roots, traces the water,
              studies the neighbouring growth, and waits for fruit. The first act is to suspend the
              flower's claimed name without denying the experience: this presence is real as an
              experience and perhaps real as an operative form, and its identity is undetermined. That
              preserves ontological openness without surrendering judgement, and lets the form reveal
              its metabolism.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Attention may then be reduced, to discover whether the flower has an independent root
              or survives only through continuous fascination. Emotional perfume can be separated from
              structural coherence. Correspondences can be examined across the layers — psychic,
              astral, aetheric, ethical, relational, material — since a true vertical current shows
              more than a convincing surface resemblance: it establishes coherent relations through the
              whole chain of manifestation.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Some forms must undergo a cryptopyrosis of their concealed root-system, a heating until
              borrowed images, inherited assumptions and hidden appetites separate from whatever living
              virtue they contain. The purpose is not always destruction. A mirror figure may become a
              useful psychological symbol once it no longer pretends to be an external master. An
              egregore may become an ethical communal instrument once recognised as a created
              group-being. A damaged traditional image may again serve as a vessel if it is restored to
              right relation with its source.
            </p>
            <div className="mt-8">
              <Law k="The gardener's rule" text="What cannot survive truthful naming was never sustained by truth." />
            </div>
          </div>
        </div>
      </Band>

      {/* ---- the original contribution ---- */}
      <Band id="eco-g-adds" backdrop="pendant-prism-splitting-white-beam" opacity={0.2} position="center 50%">
        <Eyebrow>What the Garden adds</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          A middle ground between credulity <span className="italic text-gold">and reductionism</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            One view assumes that a vivid or effective spiritual event authenticates its own
            interpretation. Another assumes that anything shaped by memory, desire or imagination must
            be unreal. The Architecture rejects both. It allows a form to be real but misidentified,
            operative but unauthorised, ancient but exhausted, beautiful but sterile, psychologically
            generated but spiritually consequential, or genuinely transmitted but astrally distorted.
            It separates appearance from vitality, vitality from structure, structure from genealogy,
            genealogy from authority, and authority from beneficial consequence — the layered
            discernment that earlier theories of illusion, glamour, thought-forms and astral imagery
            approach without articulating. It explains not only why deceptive images appear but how
            they are seeded, irrigated, stabilised, inherited, hybridised and spread: the difference
            between a false vision and a living form that carries a false name.
          </p>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Garden's deepest teaching is not that appearances are worthless. It is that
              appearance is only one organ of truth. Beauty is not proof of source. Power is not proof
              of wisdom. Recurrence is not proof of antiquity. Recognition is not proof of revelation.
              Manifestation is not proof of authority.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The initiate learns to admire the flower without kneeling before it, to breathe its
              fragrance without surrendering judgement, and to touch the petals while remembering to
              examine the soil.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Law k="The last line of the garden" text="The Garden of Counterfeit Flowers is not overcome by refusing to enter it. It is overcome by learning the botany of the invisible." size="xl" />
        </div>
        <Pointers
          arch={["image", "symbol", "correspondence", "theurgy", "taxonomy", "relation", "rightrelation", "astral", "soul", "laws"]}
          portal={["xv-30", "xv-91", "xix-17", "xix-20", "xix-11", "xiii-27", "xix-2"]}
        />
      </Band>

      <Neighbours
        of="garden"
        lines={{
          sea: "The field in which counterfeit causes arise: the wake mistaken for the ship.",
          nursery: "Where the Premature Flower was taken from — a genuine future imprisoned in a false present.",
          aquifer: "Where the fragment rose from before it borrowed bones and put on colour.",
          catacombs: "Where the Relic Bloom was cut: a god's house flowering after the god has gone.",
          hungry: "What the Hungry Flower opens into: beauty as intake, and the failure of return.",
        }}
      />
      <Transition from="garden" />
    </EcologyFrame>
  );
}
