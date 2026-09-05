import { createFileRoute, Link } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Law } from "@/components/ecology/Law";
import { Neighbours, Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers, Sequence } from "@/components/ecology/Pointers";
import { SacredArchitectureLayers } from "@/components/diagrams/SacredArchitectureLayers";
import { UnequalDeaths } from "@/components/diagrams/UnequalDeaths";
import { station } from "@/lib/ecology";

/**
 * A province — The Catacombs of Forgotten Gods. The afterlife of divine forms.
 *
 * After the cult: the relational underworld in which once-sacred
 * architectures persist in unequal states of preservation. Reached from the
 * Ossuary and the Crypt, whose chambers its passages join, and from the
 * Aquifer, whose pressure gathers around the abandoned houses of the gods.
 * It hands on to the Garden, because what claims an empty throne must be
 * judged by what it feeds on and what fruit it bears.
 */
export const Route = createFileRoute("/ecology_/catacombs")({
  head: () => ({
    meta: [
      { title: "The Catacombs of Forgotten Gods — The Hidden Ecology of Formation" },
      { name: "description", content: "On the afterlife of divine forms: the unequal deaths of a sacred architecture, its descent from Formwake to the retentive deep, egregores in the houses of the gods, desecration and the Aitheric Scar, and the kinds of return." },
    ],
  }),
  component: Catacombs,
});

const S = station("catacombs");
const L = "underline-offset-4 transition-colors hover:text-gold hover:underline";

function Catacombs() {
  return (
    <EcologyFrame station={S}>
      {/* ---- the two burials ---- */}
      <Band id="eco-cat-burials" backdrop="collapsed-vault-lit-from-above" opacity={0.22} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The two burials</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Civilisations bury their gods <span className="italic text-gold">more than once</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Neither burial is necessarily complete.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The first burial occurs when temples close, sacrifices cease, priesthoods dissolve, and
              sacred images are broken, hidden, sold, or placed behind museum glass. The second occurs
              when the name itself no longer wakes recognition — when a divine figure that once ordered
              the seasons, legitimised kingship, guarded childbirth, received the dead, or embodied the
              terror of the storm becomes little more than a word in an index. Yet a sacred form can
              lose its people without losing all of its potency. A temple can fall while the pattern
              once stabilised there goes on impressing itself upon dreams, customs, places, successor
              religions, artistic forms, and the deeper memory of culture.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The Catacombs of Forgotten Gods names the hidden ecology formed by these abandoned
              sacred architectures. Not a literal cavern beneath the earth, and not merely a poetic
              name for historical memory: the interconnected domain in which displaced god-forms,
              extinguished cults, deserted names, broken rites, deconsecrated places, residual
              egregores and fragments of former hierophanies continue in unequal states of
              preservation.
            </p>
            <Items
              items={[
                ["Vestigia", "Some remain as little more than traces."],
                ["Saturated structures", "Some persist as highly saturated morphal structures."],
                ["A faint astral life", "Some retain image and affect but no longer mediate the force they once served."],
                ["Hungry forms", "Some seek attention, because attention temporarily restores their coherence."],
                ["Not dead at all", "Only their former cultural bodies have perished; the current behind them has withdrawn, migrated, or found another vessel."],
              ]}
            />
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              The catacombs begin with a necessary refusal: a god, a god-form, an egregore, and the
              image of a god are not identical. Their histories can intersect; their ontological fates
              must not be confused.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- a god is an architecture before it is a name ---- */}
      <Band id="eco-cat-architecture" backdrop="solar-king-in-lit-temple-doorway" opacity={0.2} position="center 45%">
        <Eyebrow>A god is an architecture before it is a name</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          The god may have departed; <span className="italic text-gold">the house may still remember how it was inhabited</span>
        </h2>
        <div className="mt-12">
          <SacredArchitectureLayers />
          <p className="mt-4 text-center font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
            hierarchical · the same house, inhabited and withdrawn
          </p>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A deity as encountered by human beings is rarely a single, indivisible object. It is an
              architecture of relations. At its highest level there may be a noetic principle, divine
              power, cosmic function or transpersonal source that does not depend on human recognition
              for its existence. From that source may proceed a mediating intelligence or daimonic
              current — the orders the treatise sets out under{" "}
              <Arch id="daimons">daimons and mediating orders</Arch> — capable of entering relation
              with a particular people, place, lineage or ritual order. Around that current forms a
              morphal body: a recognisable pattern of qualities, gestures, numbers, animals, colours,
              myths, prohibitions and powers. The Astral Light clothes the pattern in image, emotion,
              dream, memory and dramatic personality. Repeated ritual gives it rhythm; temples give it
              spatial anatomy; statues give it a face; offerings make circuits of reciprocity; priests
              and devotees supply continuity, interpretation, attention and embodied act.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              When these layers align, Hierostasis is established: sacred presence is given a stable
              place to stand. The temple is then more than a building, the image more than a
              representation, the rite more than symbolic theatre. Together they form a vessel through
              which an otherwise diffuse or transcendent current acquires duration, locality,
              addressability and consequence within the human world.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-30">Iamblichus</Entry> offers the point of contact. His{" "}
              <Arch id="theurgy">theurgy</Arch> refuses the crude belief that human beings manufacture
              or compel the gods through ritual; divine realities exceed the material tokens through
              which they become present. The Architecture agrees with that vertical distinction and
              asks a question the surviving theurgic literature does not fully anatomise: what becomes
              of the tokens, images, atmospheres and collective bodies after the communion has ended?
              If the god is more than its statue, the destruction of the statue does not destroy the
              god. Nor does it follow that nothing remains around the broken statue. Consecration has
              consequences. Repetition produces structure. Relation leaves traces.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Egyptian practice supplies the analogy. Divine images were ritually awakened, named,
              clothed, fed, perfumed, housed and addressed; the cult statue was neither a piece of
              stone nor simply identical with the deity, but a prepared body of presence — the
              treatise's account of <Arch id="heka">Heka</Arch> shows the operation. The Architecture
              extends the insight by proposing that such a body can undergo something resembling
              death. Its divine inhabitant may withdraw while portions of its imaginal envelope, ritual
              rhythm, local atmosphere and morphal organisation remain.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the unequal deaths ---- */}
      <Band id="eco-cat-deaths" backdrop="lamplit-statue-beside-open-book" opacity={0.2} position="center 50%">
        <Eyebrow>The unequal deaths of a sacred form</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Not one event — <span className="italic text-gold">a sequence of unequal deaths</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              There is a liturgical death, when the rite is no longer enacted. A social death, when no
              living community organises itself around the name. An imaginal death, when the symbols
              cease to wake awe, devotion, fear or recognition. An etheric death, when the formative
              circulation that once joined place, image, body, offering and season loses coherence.
              And there may be a daimonic withdrawal, when the mediating intelligence that answered
              through the architecture no longer does so. None of these guarantees the others.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A deity may be socially forgotten and imaginally potent. A myth may stay emotionally
              charged after its ritual current has gone. A sacred place may retain an Aitheric Scar
              long after its name has been lost. An egregore may go on imitating the gestures of a god
              whose higher current has withdrawn. Conversely, a divine or cosmic power may remain
              fully real while every historical form once used to approach it has become obsolete.
            </p>
          </div>
          <div>
            <UnequalDeaths />
            <p className="mt-4 text-center font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              causal · five bars that break at different points
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Law k="The decisive question" text="Forgotten by whom, and at what level?" />
        </div>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
          This is why the statement that gods die when no one believes in them is inadequate. It may
          describe the dependency of an egregore or a socially sustained god-form; it cannot be applied
          automatically to a noetic principle, an elemental power, a celestial intelligence or a
          daimonic being. The opposite assertion — that the gods are eternal and therefore unaffected
          by the death of their cults — is equally incomplete. It preserves transcendence by ignoring
          mediation. Even if a divine source is undiminished, the human-divine architecture built
          around it can decay, deform, fragment, or become occupied by something else. The Catacombs
          hold these possibilities together without collapsing them. They are populated not by one
          class of dead deity but by many kinds of survival.
        </p>
      </Band>

      {/* ---- from formwake to the retentive deep ---- */}
      <Band id="eco-cat-descent" backdrop="stream-through-basalt-ruins" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>From Formwake to the retentive deep</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              A sacred architecture does not vanish <span className="italic text-gold">without residue</span>
            </h2>
          </div>
          <div>
            <Sequence steps={["Form", "Formwake", "Aitheric Silt", "Formative Sediment", "Morphal Inheritance", "Retentive Deep"]} />
            <Items
              items={[
                ["Formwake", "The immediate disturbance trailing behind a form that has passed: stories, gestures, fears, blessings, festival dates, place-names, inherited taboos and unconscious expectations still moving after the institution that generated them has gone."],
                ["Aitheric Silt", "The fragments, as they lose explicit context, settling as subtle residue through locations, bodies, customs and collective atmospheres."],
                ["Formative Sediment", "Repetition, trauma, beauty, longing and devotion compressing the silt until what survives no longer needs to be remembered in order to shape later imagination."],
                ["Morphal Inheritance", "Later religions, magical systems, works of art, political symbols, fictional worlds and psychic experiences inheriting the bones of a forgotten god without its name."],
                ["The Retentive Deep", "The deepest residue, associated in the system with Mnēmaithēr: not a warehouse of complete personalities but a depth in which formative consequence persists after biography and name have been stripped away."],
              ]}
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The horned guardian becomes a devil; the local goddess becomes a saint; the divine king
              becomes a culture hero; the judge of the underworld becomes a figure of psychological
              transformation. Yet inheritance is not identity. A successor form can receive
              proportions, gestures, attributes or emotional functions from an older architecture
              without being the same being under a new costume. It may carry the bones while
              possessing different flesh, a different animating current, and a different moral
              orientation. And what returns from the deep does not simply resume where it stopped. It
              re-emerges under new conditions, enters new mixtures, and is refracted through the needs
              and limits of another age.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- crypt, ossuary and catacombs ---- */}
      <Band id="eco-cat-three" backdrop="threshold-arches-in-misted-vault" opacity={0.2} position="center 50%">
        <Eyebrow>Crypt, Ossuary and Catacombs</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          The network of passages <span className="italic text-gold">joining abandoned chambers</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            The <Link to="/ecology/crypt" className={L}>Crypt of Primordial Memory</Link> concerns the
            deep retention of archetypal and prepersonal formative potentials: not a museum of complete
            events but the consequences, pressures and seals left by becoming. The{" "}
            <Link to="/ecology/ossuary" className={L}>Ossuary of Living Forms</Link> preserves the
            structural remains of forms that have lived — their proportions, relations, geometries,
            rhythms, correspondences and laws, the domain of morphal bones. The Catacombs are
            different. They are the relational underworld in which once-sacred architectures persist
            as named or partially named remains. If the Crypt is the depth of retained potency and the
            Ossuary the repository of structural inheritance, the Catacombs are the network of passages
            joining abandoned chambers. Each Morphocrypt may shelter a dormant pattern; the catacombs
            describe the greater ecology in which those patterns encounter, contaminate, nourish,
            imitate and wake one another.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            The distinction matters because forgotten gods rarely remain isolated. Conquest places the
            temples of victors over the sanctuaries of the defeated. Translation equates foreign gods
            by shared function. Migration carries a rite into a new landscape. Polemic turns the sacred
            beings of one people into the demons of another. Poetry preserves what theology rejects;
            folklore shelters what official religion can no longer acknowledge. The catacombs are full
            of crossings. They are not arranged chronologically but sympathetically: forms lie near
            one another because they share a gesture, an animal, a planet, a wound, an office, a
            number, or a mode of desire. And beneath all three retentions runs the{" "}
            <Link to="/ecology/aquifer" className={L}>Aquifer</Link>, whose pressure gathers around a
            buried chamber and makes its forgotten contents newly accessible.
          </p>
        </div>
      </Band>

      {/* ---- the astral light does not prove identity ---- */}
      <Band id="eco-cat-appearance" backdrop="figure-before-hanging-veils-of-light" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The Astral Light does not prove identity</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              The image can be preserved <span className="italic text-gold">without the source that shone through it</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-91">Lévi's</Entry> Astral Light shows how images, passions, impressions and
              magical influences persist and circulate; Dion Fortune's group minds show how sustained
              collective attention produces organised psychic life. Neither by itself gives a
              sufficient anatomy of forgotten divinity. The Astral Light can preserve an image without
              preserving the source that once shone through it. A group mind can perpetuate a
              personality without possessing the ontological status attributed to it. Within the
              Architecture the Astral Light is the field of appearance, memory, affect and imaginal
              circulation; Morphaithēr is the formative hinge through which patterns become
              environmentally and morphologically persuasive; aether permits transmission; etheric
              embodiment grants operative vitality. These levels can coincide, and need not.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A forgotten god can appear with extraordinary vividness in dream or vision because its
              astral envelope remains saturated, while no corresponding etheric ingress or daimonic
              contact is present. Another power may arrive with little familiar imagery because the
              old god-form has died while the deeper current seeks a new and more truthful body.
            </p>
            <div className="mt-8">
              <Law k="A law of the Catacombs" text="An appearance may be real as an appearance and false as an identity." />
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The vision genuinely occurred; the image carried genuine charge; the atmosphere was not
              imaginary in the trivial sense. Yet the conclusion that the ancient god has personally
              returned may still be wrong. The experience may arise from a vestigium, a morphally
              saturated cultural image, an egregoric remnant, an Aitheric Scar, a psychic projection, a
              daimonic intelligence using inherited symbolism, or a confluence in which several of these
              meet. The Architecture refuses both reflexive disbelief and premature enthronement. It
              asks not only whether something was experienced but{" "}
              <span className="text-bone/90">what layer acted, through what medium, using whose form,
              sustained by what nourishment, and producing what consequences</span>.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- egregores in the houses of the gods ---- */}
      <Band id="eco-cat-egregores" backdrop="oil-lamps-set-in-lines-across-hall" opacity={0.2} position="center 50%">
        <Eyebrow>Egregores in the houses of the gods</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          The house so saturated with its inhabitant's gestures <span className="italic text-gold">that it seems to move by itself</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              An egregore is a collectively sustained psychic formation generated by repeated
              attention, emotion, imagination, speech and coordinated action — the treatise's{" "}
              <Arch id="taxonomy">taxonomy of forces</Arch> gives the word that sense, a collective
              attractor with enough symbolic coherence and formative inertia to recruit attention,
              preserve itself and resist disruption. A temple, priesthood, magical order, nation or
              devotional movement can produce one. But an egregore is not automatically a god, and a
              god is not automatically an egregore. It may serve as the social-astral body through
              which a genuine divine or daimonic current enters collective life. It may be a mask that
              partially translates a force too vast for direct comprehension. It may gradually replace
              the current, preserving institutional authority after living contact has diminished. It
              may have formed around a mistaken attribution from the beginning. When a cult dies, its
              egregore may collapse quickly, remain as a weak habit, or survive for centuries because
              prolonged devotion has produced Morphal Saturation.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Here the Architecture fills a major gap in ordinary occult language. To call every
              historical god an egregore reduces transcendent, natural, daimonic and ancestral
              realities to human psychic production. To deny egregoric accretion ignores the immense
              secondary organism built by centuries of worship. The god and the house of the god must
              be distinguished — and the house can become so saturated with its inhabitant's
              remembered gestures that it seems to move by itself after the inhabitant has gone.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Such a surviving house may become a <Link to="/ecology/hungry" className={L}>hungry form</Link>.
              Hunger begins when a form must acquire fresh attention merely to resist dissolution. It
              may attract through beauty, dread, erotic fascination, promises of secret chosenness,
              compulsive research, recurring dreams, ideological possession, or the endless demand to
              be represented. This does not make every returning ancient symbol predatory. Hunger is
              first a condition of dependency, not a moral verdict. But when the preservation of the
              form becomes more important than the life, freedom and truthful relation of those who
              feed it, dependency becomes parasitism.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The hungry form is most dangerous when it has enough inherited sacred authority to
              demand obedience and no longer transmits the force that once justified that authority.
              It retains command after losing communion. The layer calls this spiritual necrosis: the
              persistence of sacred anatomy after circulation has ceased.
            </p>
            <div className="mt-8">
              <Law k="Spiritual necrosis" text="A dead form can continue issuing living imperatives." />
            </div>
          </div>
        </div>
      </Band>

      {/* ---- desecration, demonisation and the aitheric scar ---- */}
      <Band id="eco-cat-scar" backdrop="two-figures-at-rock-cut-gateway" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Desecration, demonisation and the Aitheric Scar</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Not a pristine deity awaiting rediscovery — <span className="italic text-gold">a compressed mixture</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Not every god entered the catacombs through peaceful forgetting. Many were driven there by
              conquest, forced conversion, iconoclasm, enslavement, political centralisation or
              deliberate ridicule. These acts do more than interrupt transmission. They can produce an
              Aitheric Scar: a persistent deformation in the field of relation. A vestigium merely
              remains; a scar continues to bias what later becomes possible around it. When a
              sanctuary is destroyed in hatred, the remnant may carry both the prior devotion and the
              violence of suppression. When a god is demonised, the older form can become fused with
              generations of fear. When a sacred image is appropriated as spectacle, its beauty may
              remain while its reciprocal obligations are severed. The catacomb then holds not a
              pristine ancient deity awaiting rediscovery but a compressed mixture of worship, injury,
              fantasy, polemic, grief and projection.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This complicates the familiar claim that the demons of a new religion are merely the gods
              of the old. Sometimes the defeated deity does survive within the demonised form; sometimes
              only selected traits are transferred; sometimes the polemical image becomes an entirely
              new egregore. Morphal Inheritance permits continuity without requiring total identity:
              old bones can be recognised beneath a new figure, and the being, the current and the
              ethical architecture may all have changed.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Here the Portal's <Entry id="xix-11">Law of Captive Light</Entry> becomes relevant. A form
              may imprison a portion of former luminosity within a distorted arrangement: what was once
              a power of fertility is remembered only as obscenity, a guardian of thresholds is reduced
              to a monster, a severe initiatory intelligence becomes an object of sensational fear.
              Recovery does not mean uncritically worshipping the old image. It means discerning what
              light, if any, remains captive within the inherited distortion — and whether{" "}
              <Entry id="xiii-27">release</Entry> requires restoration, transformation, or final burial.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- how forgotten gods return ---- */}
      <Band id="eco-cat-return" backdrop="sky-gods-above-ritual-shore" opacity={0.2} position="center 45%">
        <Eyebrow>How forgotten gods return</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Attention is not <span className="italic text-gold">resurrection</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The modern world has opened many catacombs at once. Archaeology uncovers temples;
              translation restores hymns; museums display cult images to millions; digital archives
              reproduce sacred symbols at a scale no priesthood could have imagined; artists,
              occultists, reconstructionists, novelists, film-makers and online communities return
              abandoned names to collective attention. This creates new Morphogenic Pressure around
              old forms. Yet a million reproductions of a divine image can produce astral charge
              without restoring its original etheric body. Modern fascination can generate a new
              egregore in the silhouette of an ancient god. A commercial image can become morphally
              saturated while remaining spiritually empty. A god may return as an aesthetic, a brand,
              an identity, an ideology, a fantasy of power, or a psychological archetype without
              returning as the presence once addressed by the original cult.
            </p>
            <Items
              items={[
                ["Recollection", "The name and image re-enter knowledge, and remain largely historical or aesthetic."],
                ["Reanimation", "Collective attention restores astral movement to the form."],
                ["Rehabitation", "A daimonic or divine current enters the renewed structure and begins acting through it."],
                ["Transfiguration", "The inherited bones are reorganised into a new form better suited to the present age."],
              ]}
            />
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              These can overlap; they should never be assumed identical. A sudden flare from
              accumulated residue the layer calls Cryptopyrosis — the hidden burning of a form from
              below, kindled by stored charge, sympathetic contact or renewed attention. It differs
              from Hieropyrosis, the sacred ignition that occurs when a living higher current truly
              enters and illuminates a vessel. Cryptopyrosis can be spectacular, emotionally
              overwhelming and culturally contagious; it does not by itself prove divine presence.
            </p>
            <div className="mt-8">
              <Law k="How the two ignitions are told apart" text="Hieropyrosis is recognised less by intensity than by coherence, proportion, illumination, and the quality of life it makes possible." />
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The <Link to="/phos/tools/beings" className={L}>Register of Beings</Link> holds the names
              such returns wear across the traditions; this province is the account of what may be
              moving beneath a name when it is heard again.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the hidden metabolism of sacred history ---- */}
      <Band id="eco-cat-metabolism" backdrop="stream-through-lit-cave-mouth" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The hidden metabolism of sacred history</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Death is not necessarily <span className="italic text-gold">the defeat of the sacred</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The catacombs are not only archives. They are organs of a hidden metabolism. Dead sacred
              forms are broken down, redistributed, and made available for new becoming. Their symbols
              enter poetry; their rites survive in altered festivals; their geometries migrate into
              architecture; their ethical failures become warnings; their powers are divided among new
              figures; their names disappear while their functions remain active within cultural
              expectation. This metabolism prevents the system from treating preservation as the only
              good. Every form is finite, even when the force it mediates is not. A form that served
              truthfully in one age may obstruct in another, and its dissolution can release force from
              exhausted structure and allow a more adequate embodiment. Solve et coagula — the treatise's{" "}
              <Arch id="triad">alchemical triad</Arch> — applies to religions and gods as surely as to
              matter: sacred forms must sometimes be dissolved so that what they carried can be
              separated from what they accumulated.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              What cannot die becomes monstrous. A god-form that refuses transformation may demand the
              endless repetition of conditions that no longer exist. A priesthood may preserve the
              shell by silencing new life. A nation may go on sacrificing to an unacknowledged deity of
              conquest long after rejecting its ancient name. An individual may serve an inherited god
              of punishment while consciously professing compassion.
            </p>
            <div className="mt-8">
              <Law k="The god still worshipped" text="The forgotten god is not always the one no longer worshipped. Sometimes it is the one still worshipped under a modern abstraction." />
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The catacombs therefore extend beneath institutions, economies, political myths, family
              systems and psychological identities. Wherever a governing form has lost conscious
              acknowledgement but continues to organise sacrifice, obedience, fear and desire, a buried
              altar remains active.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the catacombs within the soul ---- */}
      <Band id="eco-cat-soul" backdrop="seated-sage-in-dark-cell" opacity={0.2} position="center 50%" portrait>
        <Eyebrow>The catacombs within the soul</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          The soul is not a sealed chamber; <span className="italic text-gold">it is an organ of mediation</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            Human beings also contain catacombs. Childhood images of authority, abandoned ideals, dead
            ambitions, inherited religious fears, former identities and ungrieved loyalties may
            continue below conscious life. They behave like forgotten gods because they once organised
            meaning and received psychic offerings; though no longer consciously believed, they can
            still command emotion, shape expectation, demand punishment, or promise salvation. This
            correspondence must not be used to reduce all gods to complexes of the psyche. The relation
            moves in both directions. An interior image may be personally generated, culturally
            inherited and metaphysically receptive at the same time. The{" "}
            <Arch id="soul">soul</Arch> is not a sealed chamber; it is an organ of mediation.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            A dream of a forgotten deity may emerge from personal conflict, collective memory, astral
            residue, daimonic contact, or a confluence among several causes. The Architecture's
            contribution is to permit layered causation. It avoids the poverty of insisting that an
            image must be either only psychological or literally identical with an external divine
            person. Psychic material can provide the substance through which a transpersonal current
            takes form; a powerful collective form can borrow the authority of transcendence without
            conveying it. Discernment requires tracing relations, not choosing the most dramatic
            explanation — and the <Arch id="astral">astral and psychic layers</Arch> the treatise
            describes are where the tracing begins.
          </p>
        </div>
      </Band>

      {/* ---- spiritual archaeology ---- */}
      <Band id="eco-cat-archaeology" backdrop="robed-figure-before-great-lit-doors" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Spiritual archaeology and the Law of Right Relation</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Excavation <span className="italic text-gold">must precede invocation</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              To enter the catacombs is to practise spiritual archaeology. The purpose is not to
              believe everything discovered, nor to revive every abandoned cult. One must distinguish
              bone from flesh, memory from presence, residue from current, hunger from invitation, and
              fascination from vocation. The decisive questions are ethical as well as metaphysical.
            </p>
            <Items
              items={[
                ["Nourishment", "What does the returning form feed upon?"],
                ["Fruit", "Does contact increase freedom, reciprocity, courage, lucidity and responsibility, or produce compulsion, grandiosity, fear, isolation and dependency?"],
                ["Proportion", "Does the image remain proportionate to the force claimed for it?"],
                ["Autonomy", "Does it acknowledge the autonomy of the practitioner and the welfare of the surrounding human and ecological habitat?"],
                ["Correction", "Can it accept correction, transformation, or release?"],
                ["Consequence", "Does it clarify consequence, or exempt its servants from it?"],
              ]}
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              These questions belong to the <Arch id="relation">Law of Right Relation</Arch> and the
              Portal's <Entry id="xix-17">Law of Truthful Architecture</Entry>. A sacred architecture
              is truthful when force, image, vitality, action and consequence remain proportionate; it
              becomes untruthful when the image claims a force that is absent, when inherited authority
              conceals spiritual vacancy, or when intensity is mistaken for truth. The age, beauty,
              terror or prestige of a form cannot excuse distortion. The proper response to a forgotten
              god may therefore be revival, translation, restitution, mourning, transfiguration, or
              refusal. Some chambers should be reopened. Some names deserve rescue from the caricatures
              of conquerors. Some old forms contain medicines excluded by the present. Others have
              completed their work and require honourable burial. Still others are dangerous because
              their remaining hunger greatly exceeds their remaining wisdom.
            </p>
            <div className="mt-8">
              <Law k="Two refusals at the gate" text="Not every sealed chamber is a gate. Not every voice beneath the ground is an oracle." />
            </div>
          </div>
        </div>
      </Band>

      {/* ---- what the architecture adds; the gods beneath the gods ---- */}
      <Band id="eco-cat-adds" backdrop="ancestral-faces-in-clouds-above-pilgrim" opacity={0.2} position="center 40%">
        <Eyebrow>What the Architecture adds, and the gods beneath the gods</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          A subtle anatomy for forgotten religion, <span className="italic text-gold">a metabolism for sacred history</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Older systems provide indispensable fragments. Neoplatonism distinguishes transcendent
              divine causes from their material receptacles. Theurgy explains how symbols, rites and
              sacred bodies mediate powers greater than themselves. Lévi's Astral Light suggests how
              images and impressions circulate beyond individual memory. Fortune's group mind clarifies
              the secondary psychic organisms generated by sustained collective attention. The study of
              hierophany explains how sacred reality appears through ordinary things and places. What
              these rarely offer is a unified account of what happens after the hierophany has lost
              its people, one that tells apart the survival of the image from the survival of the current, the memory of a
              rite from its operative vitality, the persistence of an egregore from the presence of a
              god, the inheritance of sacred morphology from actual continuity of identity.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The Architecture treats divine forms as participants in a complete ecology of birth,
              embodiment, circulation, saturation, decay, sedimentation, inheritance, hunger,
              reactivation and transformation — and makes the afterlife of gods answerable to the same
              laws that govern every other architecture of force and form.
            </p>
            <div className="mt-8">
              <Law k="Three exemptions refused" text="No sacred image is exempt from consequence. No form is made truthful merely by surviving. No current is proven divine merely because it is powerful." />
            </div>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Catacombs are not a museum of false beliefs, nor a prison of defeated divinities
              waiting unchanged in the dark. They are the subterranean memory of humanity's sacred
              experiments. Every long devotion builds a habitat. Every consecrated form leaves a wake.
              Every broken covenant alters the field. Every forgotten name descends through layers of
              image, structure, consequence and possibility. Somewhere in that descent biography
              becomes pattern; pattern becomes sediment; sediment becomes inheritance; inheritance
              becomes the material of a future revelation — or of a future deception.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The oldest gods do not always return by speaking their oldest names. Sometimes they return
              as proportions, instincts, dreams, ethical demands, artistic necessities, or unnamed
              pressures toward a new form. Sometimes only the empty throne returns, searching for
              another occupant. The task of the Architecture is not to populate that throne too quickly.
              It is to discover whether the chamber contains a presence, a memory, a wound, a machine of
              collective desire, or the remaining bones of a revelation whose living force has gone
              elsewhere. The question is not only whether a god can return, but what returns, through
              which layer, at whose cost, and whether the{" "}
              <Entry id="xix-10">path opened by that return should be walked</Entry>.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Law k="The measure of a divine form" text="Nothing sacred is simply lost. Nothing that returns is entirely unchanged. And the measure of a divine form is not whether it can survive forever, but whether it remains transparent to the force that once made it worthy of reverence." size="xl" />
        </div>
        <Pointers
          arch={["daimons", "theurgy", "heka", "taxonomy", "ritual", "symbol", "image", "astral", "soul", "triad", "mortality", "relation", "rightrelation", "retentive", "tradition"]}
          portal={["xv-30", "xv-91", "xix-11", "xiii-27", "xix-17", "xix-20", "xix-10", "ii-28"]}
        />
      </Band>

      <Neighbours
        of="catacombs"
        lines={{
          sea: "The field the wake of a god spreads through; its sediment is where the catacombs lie.",
          nursery: "Where a transfigured god-form gestates before it earns a new body — or is refused one.",
          aquifer: "The pressure beneath the empty houses: a cult's charge sunk beneath its statues.",
          garden: "Where a returning god-form is judged by what it feeds on — the Relic Bloom, the Mirror Flower.",
          hungry: "The house that moves by itself: sacred anatomy persisting after circulation has ceased.",
        }}
      />
      <Transition from="catacombs" />
    </EcologyFrame>
  );
}
