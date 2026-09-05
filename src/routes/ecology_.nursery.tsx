import { createFileRoute, Link } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Law } from "@/components/ecology/Law";
import { Neighbours, Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers, Sequence } from "@/components/ecology/Pointers";
import { GestationAndItsFailures } from "@/components/diagrams/GestationAndItsFailures";
import { station } from "@/lib/ecology";

/**
 * A province — The Nursery of Unborn Forms. The gestational province of
 * Morphaithēr.
 *
 * Before the stations: the region in which forces begin to acquire contour,
 * relation, function and the first intimations of a possible body. It is
 * reached from Morphaithēr, whose specialised condition it is, and hands
 * what it allows to be born into Living Form — because the Nursery's deepest
 * doctrine is that not every possible form should be given a body.
 */
export const Route = createFileRoute("/ecology_/nursery")({
  head: () => ({
    meta: [
      { title: "The Nursery of Unborn Forms — The Hidden Ecology of Formation" },
      { name: "description", content: "The gestational province of Morphaithēr: how a possibility is conceived, nourished, tested, inherited, delayed, refused or made capable of life — and why not every possible form should be given a body." },
    ],
  }),
  component: Nursery,
});

const S = station("nursery");
const L = "underline-offset-4 transition-colors hover:text-gold hover:underline";

function Nursery() {
  return (
    <EcologyFrame station={S}>
      {/* ---- the third order ---- */}
      <Band id="eco-n-third" backdrop="coral-nursery-in-sunlit-shallows" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The third order</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Forms that have not yet become <span className="italic text-gold">enough themselves to live</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              There are forms that have lived, forms that have died, and forms of this third order.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Nursery is the region of premanifest gestation within Morphaithēr: the living
              formative atmosphere in which forces begin to acquire contour, relation, function and
              the first intimations of a possible body. It is not a warehouse of finished blueprints,
              nor a celestial waiting room in which complete beings stand ready to descend. What it
              holds is less definite and more alive — tendencies becoming patterns, patterns seeking
              organs, currents testing structures, and possibilities attempting to discover what kind
              of existence could truthfully receive them.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              An unborn form is therefore not simply an idea not yet acted upon. It is a formative
              possibility that has acquired enough coherence to exert pressure but not enough
              integration to enter stable manifestation. It may have a direction without a
              destination, an inner proportion without an outer shape, a recognisable atmosphere
              without a name. Neither pure archetype nor material object: a morphogenic becoming, a
              provisional arrangement of force, memory, relation and possibility undergoing what the
              layer calls morphokyēsis, the gestation of form.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This distinguishes the Nursery from the other provinces, and it is also the chamber in
              which their contributions meet.
            </p>
            <Items
              items={[
                ["The Crypt", "gives depth: deep consequence and prepersonal potential."],
                ["The Ossuary", "lends structure: the bones of patterns that have already endured embodiment."],
                ["The Aquifer", "supplies pressure: latent, unspent and frequently subterranean force."],
                ["The Sap of Heaven", "gives nourishment: intelligence, vitality, meaning, formative possibility, descending."],
                ["Etheric Hydrology", "carries them into relation."],
                ["Morphaithēr", "provides the atmosphere in which their encounter can become gestational."],
              ]}
            />
          </div>
        </div>
      </Band>

      {/* ---- ancient seeds ---- */}
      <Band id="eco-n-seeds" backdrop="phanes-rising-from-cosmic-egg" opacity={0.2} position="center 45%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Ancient seeds</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              The gap between pattern <span className="italic text-gold">and birth</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-20">Plato's Timaeus</Entry> introduced the receptacle, chōra, as a third
              kind alongside intelligible paradigms and their generated images. The receptacle
              provides the field in which becoming can occur; before cosmic ordering it even holds
              unstable traces of what will later become the articulated elements. What the ancient
              account leaves undescribed is the interior ecology of that becoming: how one possibility
              is nourished while another is arrested, how inherited structures enter new
              combinations, how a pattern may exert influence before it has a body. The Nursery
              occupies this middle distance. It agrees that manifestation requires receptivity, and
              treats receptivity as differentiated, dynamic, and inhabited by competing degrees of
              readiness rather than as an undivided container.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-28">Plotinus</Entry> offers another approach through the seminal
              reason-forms, the logoi spermatikoi, by which generative order elaborates the lives
              and events of the cosmos; <Entry id="xv-85">Ficino</Entry> received that seed-language
              into a cosmology in which seminal reasons lie distributed through matter and bring
              things forth at their appointed times. These are close relatives of the present
              doctrine, because they understand causation as formative and germinal rather than
              mechanical. The Nursery adds an anatomy of gestation to the metaphysics of the seed: it
              distinguishes the seed-current from its nourishment, the inherited scaffold from the
              living pattern, the astral image from the aetheric body, and the appointed possibility
              from the conditions that permit or refuse its birth.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-86">Paracelsus</Entry> understood nature as bearing signatures and treated
              imagination as a power mediating between invisible influence and bodily consequence.
              The Architecture separates what that "astral" language gathers into one field. A
              signature may be the visible vestige of a formative history; an image may be astral;
              the current sustaining it aetheric; its structural ancestry a matter of morphal
              inheritance; the pressure drawing these together Morphaithēr's. The signature reveals
              that something has crossed into appearance. The Nursery describes what had to occur
              before the crossing became possible. Plato gives the receptive field, Plotinus and
              Ficino the seminal principle, Paracelsus correspondence and signature; none is
              displaced.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- conception in the formative atmosphere ---- */}
      <Band id="eco-n-conception">
        <Eyebrow>Conception in the formative atmosphere</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Nurseries form <span className="italic text-gold">wherever becoming is protected long enough</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Morphaithēr is the general formative atmosphere; the Nursery is a specialised condition
              that arises within it. There is not one enormous chamber beyond the world. Nurseries
              form locally wherever currents achieve sufficient enclosure, nourishment and continuity
              to sustain an emerging pattern. A person, a family, a landscape, a temple, an artistic
              tradition, an institution, a species, a civilisation may possess a nursery of its own,
              nested within wider celestial, terrestrial and historical fields. The Nursery is
              topological, not geographical: it exists wherever becoming is protected long enough to
              differentiate itself.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Conception begins through aitheric confluence. Currents previously separate enter a
              relation strong enough to produce more than their sum: an idea meets a need, a memory a
              new environment, a celestial influence a prepared organism, an ancestral pattern
              unfamiliar materials, a descending possibility an answering desire. If the confluence
              generates a distinct formative current, aitherogenesis has occurred. Conception alone
              does not guarantee birth. The current must acquire aitherostasis, a stability sufficient
              to keep it from dispersing back into the field; held within a protected and rightly
              ordered locus, that stability approaches hierostasis — not immobility but sacred
              placement, in which the nascent pattern is held in truthful relation to its source, its
              environment and its possible purpose.
            </p>
            <Sequence steps={["Confluence", "Aitherogenesis", "Aitherostasis", "Hierostasis", "The four thresholds", "Birth"]} />
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Within the enclosure, pneumic percolation begins. Spirit does not always descend as a
              single dramatic act; it may enter gradually, filtering through an incomplete pattern
              until its parts learn how to bear a common interiority. This produces pneumotension,
              the inward pressure by which an unborn form strains toward fuller expression. Around it,
              morphogenic pressure attracts compatible images, materials, persons, symbols and
              circumstances. Coincidences cluster. Similar designs arise independently. A word appears
              repeatedly before its doctrine is understood; a place seems to anticipate the rite later
              performed there. These may be the signs of a formwake — the disturbance left in
              experience by a form moving beneath the threshold of manifestation.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A wake is not yet a vessel, and recurrence is not proof of destiny. An unborn form can
              announce a relationship without possessing the right to be born. Here the Nursery
              guards against the commonest error of esoteric interpretation: confusing intensity with
              authority. Repeated symbols may indicate morphogenic pressure, inherited vestigia,
              astral contagion, personal fixation, or an authentic formative arrival. Discernment
              attends to the whole ecology and does not submit to the loudest sign.
            </p>
          </div>
        </div>
        <div className="mt-14">
          <GestationAndItsFailures />
          <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
            causal · the way to birth, and the exit at every stage
          </p>
        </div>
      </Band>

      {/* ---- the nourishment and anatomy of the unborn ---- */}
      <Band id="eco-n-nourishment" backdrop="sprout-on-wet-black-rock" opacity={0.2} position="center 55%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The nourishment and anatomy of the unborn</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Depth, structure, pressure, descent — <span className="italic text-gold">in proportion</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The <Link to="/ecology/sap" className={L}>Sap of Heaven</Link> is among the Nursery's
              highest nourishments. It descends not as raw power but as power already bearing a
              tendency toward intelligibility, integration and living purpose. Where the Sap is
              present an unborn form does not merely grow larger; it becomes more inwardly coherent.
              Its parts discover why they belong together. This is why spiritual nourishment cannot
              be measured by intensity: a form swollen with force may be malformed, and a quietly
              nourished form may possess extraordinary truthfulness of proportion.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The <Link to="/ecology/aquifer" className={L}>Black Aquifer</Link> provides a different
              nourishment: unspent force, buried longing, abandoned effort, ancestral pressure, and
              residues that never found expression. It is not evil, and it is less discriminating.
              Drawn upward it can give an emerging form tremendous vitality; it can also flood the
              Nursery with unresolved material, so that a higher possibility fed only from the
              Aquifer becomes compelled, excessive, or haunted by purposes not its own. The healthiest
              gestation keeps right proportion between depth and descent — the dark potency of what
              was withheld and the luminous nourishment of what seeks truthful incarnation.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The <Link to="/ecology/ossuary" className={L}>Ossuary</Link> supplies the bones. No form
              is born without ancestry; even the most unprecedented manifestation borrows ratios,
              gestures, organs, symbols and strategies from structures that existed before it, and
              these vestigia, morphorelics and fragments of inheritance enter the Nursery as
              scaffolds. A scaffold can become a prison. If the Nursery is dominated by old bones,
              novelty is forced to impersonate the past, and what appears to be prophecy is nostalgia
              under morphogenic pressure. The <Link to="/ecology/crypt" className={L}>Crypt</Link>{" "}
              offers something deeper than structure: what existence learned through its forms —
              consequences, unresolved relations, latent capacities. It contributes memory without
              insisting on repetition, and can disclose what a future form must remember in order not
              to reproduce an ancient failure.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The four ethers of the treatise's <Arch id="fourfold">Fourfold Field</Arch> take part as
              thresholds within the gestation itself, and a form can fail at any of them.
            </p>
            <Items
              items={[
                ["Warmth", "quickens: awakens initiative and gives the pattern its first inward fire. A form may never ignite."],
                ["Light", "articulates: distinguishes boundaries, proportions and orientation. A form may remain indistinct."],
                ["Tone", "coordinates: establishes affinity, sequence, exchange and the lawful relation of part to part. A form's parts may be incompatible."],
                ["Life", "regenerates: integrates the developing whole so that it can repair, adapt and keep its identity through change. A form may achieve structure without living integration."],
              ]}
            />
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              The Nursery is not merely a place where forms wait. It is where their capacity for
              incarnation is tested.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- ontic weather, saturation and failed births ---- */}
      <Band id="eco-n-weather" backdrop="abandoned-glasshouse-at-sunrise" opacity={0.2} position="center 50%">
        <Eyebrow>Ontic weather, morphal saturation and failed births</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Not every failed gestation <span className="italic text-gold">is a tragedy</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Every Nursery exists within ontic weather. Some periods and places make particular
              embodiments easy; others resist them. A culture may be ready for a symbol but not the
              discipline it requires. A person may receive the image of a future vocation while
              lacking the etheric organisation to sustain it. A ritual current may be authentic and
              premature. A technology, an institution, a doctrine or a work may appear in fragments
              across generations because its nursery repeatedly achieves conception without finding a
              world able to carry it to term.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              When too many patterns accumulate without resolution, morphal saturation occurs. The
              Nursery is crowded with uncompleted tendencies, borrowed images, ancestral demands,
              cultural fantasies and interrupted projects; forms interfere with one another,
              boundaries blur, one current appropriates another's imagery, a genuine possibility is
              burdened with incompatible expectations. Composite monsters, sterile brilliance,
              compulsive reinvention, the same structure attempted under different names. Saturation
              is why more inspiration is not always beneficial. Sometimes a field needs drainage,
              silence and dissolution before it can be fertile again.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Some forms are wisely resorbed into Morphaithēr because their relations cannot be made
              truthful. Some return to the Aquifer as unspent force. Some leave vestigia in the
              Ossuary, supplying one useful organ to a form that will arise centuries later. Others
              withdraw into the Crypt, where their consequences deepen primordial memory. Failure
              becomes dangerous chiefly when an arrested form refuses dissolution: it may survive as
              an aitheric scar, a hardened site of interrupted becoming, or as a hungry fragment
              seeking vitality without a whole to integrate it into.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This is where the Nursery touches the{" "}
              <Link to="/ecology/hungry" className={L}>hungry forms</Link>. A hungry form may invade a
              gestational field and set its inherited image around newly arriving force. It does not
              create; it recruits. It persuades a person or a community that repetition is revelation
              and urgency is proof of election. Healthy unborn forms become more proportionate as they
              are nourished: they clarify relations, permit correction, and develop organs
              appropriate to their purpose. Hungry forms become more absolute. They demand continuous
              feeding, punish delay, narrow interpretation, and treat every coincidence as
              confirmation. The difference is not always the beauty of the image. It is the quality of
              relation the image establishes around itself.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- imagination and midwifery ---- */}
      <Band id="eco-n-midwifery" backdrop="overgrown-glasshouse-with-light-shaft" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Human imagination and the work of midwifery</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Less creators <span className="italic text-gold">than midwives of formation</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Human <Arch id="image">imagination</Arch> can enter the Nursery, but it does not rule it.
              An image may clothe a current, attract one, distort one, or fabricate the appearance of
              one — which is why the Architecture keeps the imaginal and affective field of the Astral
              Light apart from aetheric manifestation. Desire and visualisation can strengthen an
              astral figure without generating a stable aetheric organism, and a genuine aetheric
              current may exist before anyone can envision an adequate symbol for it. Morphogenic
              pressure moves in both directions: coherent currents recruit images, and coherent images
              help recruit and organise force. Manifestation occurs only when their relation becomes
              proportionate and sustainable.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The artist, the ritualist, the healer, the philosopher and the builder therefore act less
              as absolute creators than as midwives of formation.
            </p>
            <Items
              items={[
                ["Enclosure", "A ritual enclosure establishes a membrane."],
                ["Gates", "Names and symbols provide selective gates."],
                ["Rhythm", "Rhythm regulates the hydrology."],
                ["Offering", "Offerings feed particular relations."],
                ["Consecration", "Consecration invites a current to inhabit a fitting body."],
                ["Repetition and silence", "Repetition assists aitherostasis; silence prevents premature fixation."],
              ]}
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The true art is not simply to make a form appear but to help the right form discover
              the right vessel at the right degree of ripeness. Premature manifestation injures both
              form and vessel: a pattern forced into visibility before its relations are integrated
              may be impressive and unstable, consuming more force than it can organise and making
              the vessel carry contradictions that should have been resolved in gestation. Such works
              need ceaseless reinforcement; their makers mistake maintenance for vitality and
              exhaustion for sacrifice. A well-born form eventually participates in its own
              continuance. It develops reciprocal relations with the world and begins to generate,
              rather than merely consume, coherence.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the ethics of what is allowed to be born ---- */}
      <Band id="eco-n-ethics" backdrop="sleeper-at-dawn-by-wide-window" opacity={0.2} position="center 50%">
        <Eyebrow>The ethics of what is allowed to be born</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Not every possible form <span className="italic text-gold">should be given a body</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Some patterns are internally elegant and destructive in their wider relations. Some
              embody genuine forces at a scale the proposed vessel cannot bear. Some belong to another
              time, another place, another order of existence. Some are instructive precisely because
              they remain visionary and never become institutional, political, biological or material.
              Here the Law of Right Relation becomes inseparable from morphogenesis.
            </p>
            <Items
              items={[
                ["Power asks", "whether a form can be made."],
                ["Wisdom asks", "what relations its birth will alter."],
                ["Love asks", "what it will nourish and what it will consume."],
                ["Truth asks", "whether the descending force will remain recognisable once enclosed within the proposed structure."],
              ]}
            />
          </div>
          <div>
            <Law k="What the Nursery refuses" text="Possibility is not innocence, and coherence alone is not goodness." />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The Nursery is therefore also a chamber of refusal, postponement, revision and merciful
              dissolution. To protect the unborn does not always mean to ensure its birth; sometimes it
              means refusing to trap a great current inside an inadequate form. A failed vessel does
              not disprove the force that sought it, and fidelity to a force does not require endless
              loyalty to its first embodiment. Through a disciplined solve et coagula — the treatise's{" "}
              <Arch id="triad">alchemical triad</Arch> — force may be released from a malformed
              structure, returned to formative circulation, and allowed to seek a more truthful
              relation.
            </p>
            <p className="mt-6 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              The Nursery receives not only what has never been born, but what must become unborn
              again before it can be born rightly.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the original contribution ---- */}
      <Band id="eco-n-adds" backdrop="backlit-leaves-at-forest-edge" opacity={0.2} position="center 50%">
        <Eyebrow>What the Nursery adds</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          The interval in which possibility is selected, fed, tested, delayed, refused — <span className="italic text-gold">or made capable of life</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Many systems speak magnificently of eternal archetypes above and manifested bodies below;
          others describe an astral medium of images, a world soul, seminal principles, an occult
          sympathy joining invisible and visible. What remains obscure is the interval between. The
          Nursery gives it an architecture, and with it an explanation of why a compelling image may
          never manifest, why a form can influence events before appearing, why several people may
          receive fragments of the same emerging pattern, why abandoned structures return, why some
          possibilities wait for centuries, why inspiration can become overcrowded, and why the
          destruction of an inadequate form may preserve rather than betray its animating force. It
          also keeps the hidden world from being compressed into the single word "astral": image,
          vitality, memory, structure, subterranean force, higher nourishment and formative atmosphere
          each have their own role.
        </p>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The future, in this vision, is neither an empty road nor a completed scroll. It is a living
          Nursery crowded with tendencies that have not yet earned a body: ancient possibilities
          seeking a new relation, new syntheses assembled from the bones of forgotten forms, luminous
          descents still searching for a vessel, hungry inheritances disguising recurrence as destiny,
          and quiet, nearly imperceptible patterns whose hour has not yet come. To work consciously
          within the Architecture is to become responsible not only for what already exists, but for
          what one helps reality become capable of bearing.
        </p>
        <div className="mt-12">
          <Law k="The highest task" text="Not unlimited manifestation. The cultivation of conditions in which a force may find a form that does not falsify it, a form may receive a life it does not devour, and possibility may cross the threshold into existence without losing the truth that first called it toward birth." size="xl" />
        </div>
        <Pointers
          arch={["morphaither", "atmosphere", "fourfold", "image", "ritual", "triad", "relation", "laws", "correspondence", "transformation"]}
          portal={["xv-20", "xv-28", "xv-85", "xv-86", "xix-2", "xix-17", "xix-20"]}
        />
      </Band>

      <Neighbours
        of="nursery"
        lines={{
          sea: "The field the Nursery lies in; what the sea holds in suspension is what gestation takes up.",
          aquifer: "The depth that feeds the Nursery with unspent force — vitality, and unresolved material.",
          catacombs: "Where a form goes after its cult dies; the bones and pressures the Nursery may inherit.",
          garden: "Where a premature flower is proclaimed complete: a genuine future imprisoned in a false present.",
          hungry: "What invades a gestational field, recruits rather than creates, and calls urgency election.",
        }}
      />
      <Transition from="nursery" />
    </EcologyFrame>
  );
}
