import { createFileRoute, Link } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Law } from "@/components/ecology/Law";
import { Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers, Sequence } from "@/components/ecology/Pointers";
import { AquiferSection } from "@/components/diagrams/AquiferSection";
import { FormToTendency } from "@/components/diagrams/FormToTendency";
import { ThreeRetentions } from "@/components/diagrams/ThreeRetentions";
import { ScarAndReturn } from "@/components/diagrams/ScarAndReturn";
import { AQUIFER, station } from "@/lib/ecology";

/**
 * Beneath the stations — The Black Aquifer. The subterranean memory of force.
 *
 * Not a seventh station: the circulation is complete at six. This is the
 * stratum beneath it, where force settles when it leaves the circulation
 * without completing it, and from which it may rise again. The page is
 * reached by descending from Etheric Hydrology, whose failures end at a
 * waterline, and left by rising — Anodos — into Living Form, because what
 * comes up is judged by the body it is given. Descent, latency, return: the
 * navigation is the doctrine once more.
 */
export const Route = createFileRoute("/ecology_/aquifer")({
  head: () => ({
    meta: [
      { title: "The Black Aquifer — The Hidden Ecology of Formation" },
      {
        name: "description",
        content:
          "The subterranean memory of force: where force goes when form fails, how it is retained, stratified and pressurised beneath the circulation, and how it returns — as upwelling, as artesian spring, as Anodos.",
      },
    ],
  }),
  component: Aquifer,
});

const S = AQUIFER;

/** The terms of the depth, in one list, for the reader who wants them all. */
const TERMS: [string, string][] = [
  ["Katadynamis", "The settling of force beneath the threshold of active expression. Not destruction: latency."],
  ["Pneumic Percolation", "Below the threshold, force seeping through the subtle strata according to affinity, pressure, permeability and prior pathways."],
  ["Aitheric Scar", "A channel carved by repeated descents, through which similar forces afterwards travel more easily."],
  ["Aitheric Confluence", "Where many descending currents meet and a reservoir begins."],
  ["Pneumotension", "The pressure of subtle force seeking release."],
  ["Morphorelics", "Surviving formative remnants: no longer complete forms, not yet formless energy."],
  ["Vestigia", "The tracks forms leave in manifestation after their visible departure."],
  ["Morphal Inheritance", "Inheritance by a subterranean route: tendencies persisting when direct transmission has been broken."],
  ["Morphogenic Pressure", "The continual seeking, by submerged forces, of conditions under which they can be expressed again."],
  ["Upwelling", "What happens when saturation exceeds what the containing strata can hold."],
  ["Artesian spring", "A clean pressure from the depths rising without coercion, because a true opening has been formed."],
  ["Cryptopyrosis", "The hidden fire in the depth: light occluded, not destroyed."],
  ["Anodos", "The upward return: submerged force released from a dead form and re-patterned into a higher one."],
  ["Hierosmosis", "A consecrated form acting as a selective membrane between strata."],
  ["Hungry Form", "A form that keeps its organising appetite after losing its rightful source, and feeds on what is near."],
  ["Ontic Weather", "The changing atmosphere of possibility within a person, place, culture or age."],
  ["The Catacombs of Forgotten Gods", "The structures most often built around Aquiferic pressure: a cult's charge sunk beneath its empty statues."],
  ["The Menagerie of Impossible Forms", "Unprecedented symbolic organisms recombined from submerged Vestigia of unrelated lineages."],
];

const FORESHADOWINGS: { who: string; term: string; gives: string; differs: string; link?: React.ReactNode }[] = [
  {
    who: "Plato",
    term: "χώρα · the receptacle of the Timaeus",
    gives: "The receptacle and, in Plato's own word, nurse of becoming: that which receives the impress of forms without becoming any one of them. Manifestation needs not only an active cause and an intelligible pattern but a capacity to receive.",
    differs: "Chōra is a condition of cosmic receptivity. The Aquifer is receptivity after it has acquired history — what a receptive medium becomes when it has borne innumerable formations, losses and unfinished acts.",
    link: <Entry id="xv-20">Plato's Timaeus in the Portal</Entry>,
  },
  {
    who: "Marsilio Ficino",
    term: "spiritus mundi · the world-spirit",
    gives: "A world-spirit mediating between the World Soul and bodily nature, through which celestial qualities are transmitted in a living cosmos.",
    differs: "Ficino explains how influence descends. The Aquifer asks what happens afterwards: what becomes of an influence received but never embodied, and where a celestial or psychic charge goes when the form meant to carry it collapses.",
    link: <Entry id="xv-85">Ficino in the Portal</Entry>,
  },
  {
    who: "Agrippa and Paracelsus",
    term: "virtutes occultae · the astral seed",
    gives: "Occult virtues and chains of correspondence by which distant things share qualities; visible bodies that conceal inner virtues, seeds and astral determinations. Nature is deeper than its sensible surfaces.",
    differs: "The Aquifer adds an ecological and temporal dimension. Occult virtues do not operate only through intact vertical chains; they may survive the breaking of those chains as submerged propensities, and travel laterally through places, bodies and inherited conditions.",
    link: <><Arch id="celestial">Celestial Correspondence</Arch> · <Entry id="xv-86">Paracelsus in the Portal</Entry></>,
  },
  {
    who: "Jakob Böhme",
    term: "Ungrund · the unground",
    gives: "The abyss beyond determinate foundation, joining darkness with the possibility of manifestation — and guarding the mystery of darkness from simple identification with evil.",
    differs: "The Ungrund is primordial and theological; the Aquifer is intracosmic and sedimentary. One precedes formed nature; the other is deepened by everything formed nature has undergone. One is no-ground. The other has banks, strata, channels, contaminants and pressure.",
    link: <Entry id="xv-87">Böhme in the Portal</Entry>,
  },
  {
    who: "Éliphas Lévi",
    term: "lumière astrale · the Astral Light",
    gives: "A universal plastic mediator carrying transmitted impressions, images and magical influence.",
    differs: "The Astral Light is reflective and image-bearing. The Aquifer is the slower stratum beneath reflection, where images have dissolved into tendencies and formative pressure precedes recognisable appearance. If the Astral Light is a sea of living images, the Aquifer is the water-bearing stone beneath the sea.",
    link: <><Entry id="xv-91">Lévi in the Portal</Entry> · <Arch id="image">Image and Imagination</Arch></>,
  },
  {
    who: "Dion Fortune",
    term: "group minds · artificial elementals",
    gives: "How repeated attention organises subtle force into a semi-autonomous pattern.",
    differs: "A group mind is an organised inhabitant of the subtle ecology. The Aquifer is the deep ecology beneath such entities: the habitat, and the residue left when a group-form weakens, through which its dispersed charge may persist, migrate, or nourish another formation.",
    link: <Link to="/phos/tools/beings" className="underline-offset-4 transition-colors hover:text-gold hover:underline">The Register of Beings</Link>,
  },
];

function Aquifer() {
  return (
    <EcologyFrame station={S}>
      {/* ---- another order of water ---- */}
      <Band id="eco-a-order" backdrop="cave-mouth-light-on-still-water" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Another order of water</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Beneath every open current lies <span className="italic text-gold">older water</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Etheric Hydrology studies rain, rivers and visible springs. No hydrology is complete
              that studies only these.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The third station described the circulation of formative vitality: how force
              descends, gathers, irrigates, evaporates, condenses and returns through bodies,
              places, symbols and worlds. Beneath every open current lies another order of water —
              older, slower, pressurised, and largely untouched by the light. The layer calls it the
              Black Aquifer: the deep reservoir into which force descends when it is no longer
              carried by a living form, yet has not ceased to possess tendency, memory or power.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              It receives the unspent charge of abandoned forms, the residues of interrupted
              transformations, the emotional and ritual pressure of generations, and the formative
              traces left by beings, institutions, landscapes and gods that have withdrawn from
              visible activity. It is not a literal body of water, and it is not a poetic name for
              the unconscious. It is a subterranean condition of the subtle world: a dark-bearing
              stratum in which force is retained, transported, mingled, and sometimes returned to
              manifestation.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Its blackness is not moral evil. It is the blackness of depth, absorption, latency
              and non-reflection. The surface waters of psychic life flash with images; the Aquifer
              lies below the level at which force has become image. Light enters it and does not
              immediately return. Forms sink into it and lose their outlines. Names become
              pressures, histories become inclinations, and memories become currents.
            </p>
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              It is black because what it carries has passed beneath presentation.
            </p>
            <Deeper label="Go deeper · what the name refuses">
              <p>
                Not the unconscious. The unconscious is a hypothesis about a person; the Aquifer is
                a condition of the subtle world that persons open into, which is why this page ends
                with the human being as a well and never as the source. Not the abyss before
                creation, for reasons the next section gives. Not the Astral Light, which is the
                sea of images above it, and not the Crypt, which is the chamber beside it — both
                told apart further down. And not a place: depth here is latency, not distance.
              </p>
              <p>
                What the name does claim is realism. The Aquifer is not a way of speaking about
                moods and inheritances that are really something else. It is the layer's account
                of where force actually goes when the form that carried it fails — and the account
                is offered, like every station above it, through an analogy that is marked as one.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- a reservoir formed by the world ---- */}
      <Band id="eco-a-formed" backdrop="basalt-cavern-cut-by-light-shafts" opacity={0.18} position="center 55%">
        <Eyebrow>A reservoir formed by the world</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Not the abyss before creation — <span className="italic text-gold">receptivity after it has acquired history</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Black Aquifer must not be confused with an absolute abyss existing before creation.
              It is not the primordial Nothing, nor the metaphysical source from which Being first
              emerges. It is formed within manifestation, by the long history of manifestation
              itself. Every form receives more than it can perfectly embody. Every life leaves some
              vitality unspent; every institution outlives part of its purpose; every rite releases
              influences it does not fully gather; every dissolution leaves behind more than inert
              debris. The world produces remainder — not because creation is defective, but because
              force and form are never exhausted by a single union.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              When a form breaks, the force that animated it may disperse outward, ascend toward a
              higher principle, pass into a successor, or descend into latency. The layer names the
              stages of that last passage.
            </p>
            <Sequence steps={["Katadynamis", "Pneumic Percolation", "Aitheric Scar", "Aitheric Confluence", "The reservoir"]} />
          </div>
          <div>
            <Items
              items={[
                ["Katadynamis", "The settling of force beneath the threshold of active expression. Not destruction: latency."],
                ["Pneumic Percolation", "Below the threshold, force seeps through the subtle strata according to affinity, pressure, permeability and the pathways cut before it."],
                ["Aitheric Scar", "A channel carved by repeated descents, through which similar forces afterwards travel more easily. The law of the channel, read downward."],
                ["Aitheric Confluence", "Where many such currents meet: a reservoir whose contents may be far older than any person presently touched by them."],
              ]}
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The Aquifer therefore has history. It is stratified. Its depths do not hold one
              homogeneous darkness but deposits belonging to different times, places, species of
              experience and degrees of formation. Some waters are ancient and clear, holding powers
              that withdrew before they could be corrupted. Others are turbid with incompatible
              residues. Some are nearly motionless; others carry tremendous Pneumotension, the
              pressure of subtle force seeking release. What appears dead at the surface may remain
              intensely active below.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <AquiferSection />
          <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim lg:text-left">
            spatial · analogical · one section carrying the vocabulary of the depth
          </p>
        </div>
        <Deeper label="Go deeper · the terms, in one list">
          <Items items={TERMS} />
        </Deeper>
      </Band>

      {/* ---- what the black waters hold ---- */}
      <Band id="eco-a-holds" backdrop="quartz-boulder-in-cave-stream" opacity={0.18} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>What the black waters hold</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Not pictures of the past — <span className="italic text-gold">how a force tends to move</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              The Aquifer remembers through direction, appetite, rhythm, temperature and pressure.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Aquifer does not preserve the past as a gallery of perfect pictures; that office
              belongs to the imaginal and mnemonic strata above it. Its memory is deeper and less
              representational. It preserves how a force tends to move. A terror deposited there may
              lose the face of the original threat while retaining its reflex of contraction. A
              forgotten cult may lose its theology while keeping a posture of devotion, a rhythm of
              sacrifice, a hunger for embodiment. An extinct social form may vanish from history
              and leave behind its instinct for hierarchy.
            </p>
            <div className="mt-10">
              <FormToTendency />
              <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
                analogical · the water keeps the movement, not the outline
              </p>
            </div>
            <p className="mt-10 text-base leading-relaxed text-muted-foreground">
              Its characteristic contents the layer calls Morphorelics: surviving formative remnants
              that are no longer complete forms and are not yet formless energy — a partial pattern,
              an abandoned gesture of becoming, a broken law of organisation, a capacity that never
              found its rightful body. Such remnants are the Vestigia of manifestation, the tracks
              forms leave after their visible departure, and they may lie dormant for centuries
              until a compatible organism, symbol, technology, landscape or collective condition
              offers a new point of entry.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This is one origin of what the layer calls Morphal Inheritance. Forms do not inherit
              only from their visible predecessors; they may draw on submerged residues of an older
              and less obvious lineage. A community can unknowingly reconstitute the emotional
              architecture of a vanished institution. A new symbol can wake an ancient pattern
              without copying its outer appearance. A person can become the local expression of a
              pressure that is not reducible to private biography. None of this abolishes ordinary
              inheritance, psychology or material causation. It adds a subterranean route by which
              tendencies persist when direct transmission has been broken — and it is the reason{" "}
              <Link to="/ecology/ossuary" className="underline-offset-4 transition-colors hover:text-gold hover:underline">the Ossuary's inheritance</Link>{" "}
              and the Aquifer's are not the same inheritance.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the saturated phase of morphaithēr ---- */}
      <Band id="eco-a-saturated" backdrop="ripple-marks-in-flooded-vault" opacity={0.2} position="center 50%">
        <Eyebrow>The saturated phase of Morphaithēr</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Not a second substance — <span className="italic text-gold">the first station, saturated</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Black Aquifer is not a substance separate from{" "}
              <Link to="/ecology/morphaither" hash="eco-m-climate" className="underline-offset-4 transition-colors hover:text-gold hover:underline">Morphaithēr</Link>.
              It is one of Morphaithēr's conditions: its dense, memory-bearing, low-luminosity
              phase. Morphaithēr is the formative medium through which force acquires contour and
              form becomes capable of carrying force; in its clearer and more mobile states it
              answers readily to living organisation. In the Aquifer it has become saturated with
              prior formations. It carries too much history to be neutral and too little definition
              to be a world of finished images.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Saturation creates Morphogenic Pressure. Submerged forces continually seek conditions
              under which they can become expressible again. While the pressure stays balanced, the
              Aquifer acts as a stabilising reserve, preventing every abandoned charge from erupting
              at once into the manifest world. When saturation exceeds the capacity of the
              containing strata, an upwelling occurs: a sudden cluster of dreams, a revival of
              forgotten symbols, an inexplicable cultural obsession, a repetition across
              generations, or the appearance of a form that seems new and carries an unmistakably
              ancient gravity.
            </p>
          </div>
          <div>
            <Law k="What an upwelling does not prove" text="Depth is not the same as height. Antiquity is not the same as truth. Intensity is not the same as authority." />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              An upwelling is not proof that what returns is wise, divine or desirable. The Aquifer
              explains how something can feel older than the person receiving it without therefore
              being a revelation from a higher order — which is the discrimination the rest of this
              page exists to make.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- foreshadowings ---- */}
      <Band id="eco-a-foreshadowings" backdrop="dark-hall-with-charted-stone-floor" opacity={0.16} position="center 50%">
        <Eyebrow>Ancient and esoteric foreshadowings</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Six neighbours, <span className="italic text-gold">and where each stops short</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Several earlier philosophies approach the territory of the Aquifer, and none describes the
          same structure. They are set here as the treatise sets its sources: what each gives, and
          where the Aquifer parts from it.
        </p>
        <div className="mt-12 border-t border-border">
          {FORESHADOWINGS.map((f) => (
            <div key={f.who} className="grid gap-4 border-b border-border py-8 lg:grid-cols-[13rem_1fr_1fr] lg:gap-10">
              <div>
                <p className="font-serif text-2xl text-bone">{f.who}</p>
                <p className="mt-2 font-serif text-base italic text-gold/80">{f.term}</p>
                {f.link && <p className="mt-3 text-xs text-muted-foreground">{f.link}</p>}
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">What it gives</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.gives}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">Where the Aquifer parts from it</p>
                <p className="mt-3 text-sm leading-relaxed text-bone/80">{f.differs}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Plato keeps the receptive ground from being mistaken for a mere object. Ficino keeps the
          living continuity between celestial and embodied nature. Agrippa and Paracelsus teach
          that hidden virtue travels through sympathy and interior relation. Böhme guards the
          mystery of darkness from simple identification with evil. Lévi shows the power of a
          plastic medium, and Fortune how repeated attention can organise semi-autonomous forms.
          The present system does not need to erase these insights in order to go beyond them. It
          places them within a more articulated ecology of descent, retention, transformation and
          return.
        </p>
      </Band>

      {/* ---- the aquifer, the crypt and the ossuary ---- */}
      <Band id="eco-a-three" backdrop="overgrown-cistern-tower-interior" opacity={0.2} position="center 50%">
        <Eyebrow>The Aquifer, the Crypt and the Ossuary</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          The Crypt contains. The Ossuary preserves. <span className="italic text-gold">The Aquifer carries.</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            The{" "}
            <Link to="/ecology/crypt" className="underline-offset-4 transition-colors hover:text-gold hover:underline">Crypt of Primordial Memory</Link>{" "}
            and the Black Aquifer overlap and are not identical. The Crypt preserves the deep
            intelligible and archetypal memory of what the cosmos has been capable of becoming: it
            is architectural and archival, a chamber of preserved principles, root-patterns and
            first memories. The Aquifer is hydraulic and dynamic. It bears pressure, transport,
            contamination, seepage and recurrence. The Crypt contains; the Aquifer carries. Yet the
            seals of the Crypt are not perfectly impermeable. Its contents may seep into the
            Aquifer, and Aquiferic pressure may gather around a buried archetypal chamber and make
            its forgotten contents newly accessible.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            The{" "}
            <Link to="/ecology/ossuary" className="underline-offset-4 transition-colors hover:text-gold hover:underline">Ossuary of Living Forms</Link>{" "}
            preserves the structural remains of forms whose visible lives have ended and whose
            inner geometries remain viable — the bones of becoming. The Aquifer moves through the
            Ossuary, dissolving certain remnants, mineralising others, and carrying their formative
            salts into distant regions of manifestation. The Ossuary preserves syntax; the Aquifer
            preserves impulse. A bone tells force how it once stood. The black water carries what
            still desires to move through that posture.
          </p>
        </div>
        <div className="mt-12">
          <ThreeRetentions />
          <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
            symbolic · three retentions, kept three
          </p>
        </div>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
          This is why the return of an old form is almost never an exact resurrection. What rises
          has passed through water. Its hard outline has softened; its elements have mingled with
          other deposits; its original purpose may have been lost. A returned form is both
          inheritance and mutation. It bears the dead without simply repeating them.
        </p>
      </Band>

      {/* ---- the sap of heaven and the waters below ---- */}
      <Band id="eco-a-light" backdrop="gold-vein-glowing-in-dark-rock" opacity={0.24} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The Sap of Heaven and the waters below</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Darkness that conceals <span className="italic text-gold">a hidden fire</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Not the Sap's opposite in the sense of evil against good. Its subterranean complement.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The{" "}
              <Link to="/ecology/sap" className="underline-offset-4 transition-colors hover:text-gold hover:underline">Sap of Heaven</Link>{" "}
              is the luminous nourishment that descends through the orders of mediation, feeding
              life according to each form's capacity to receive it. Not all of it is assimilated
              when it first descends. Some passes through unready forms; some is captured by
              damaged structures, which the Portal's{" "}
              <Entry id="xix-11">Law of Captive Light</Entry> describes; and some reaches the deep
              earth of the subtle world, where its luminosity becomes latent.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The black waters may therefore contain light that has not been destroyed but
              occluded. Their darkness can conceal a Cryptopyrosis, a hidden fire within the depth.
              The Aquifer is not merely a repository of waste. It may hold abandoned sanctity,
              interrupted vocation, unrecognised genius, and powers once forced into silence because
              no truthful architecture existed to receive them. What descends as light may wait
              below as pressure until a new form becomes capable of bearing it.
            </p>
            <Items
              items={[
                ["Filter", "Some black waters must be filtered."],
                ["Seal", "Some must remain sealed."],
                ["Draw upward", "Some can be drawn upward, exposed to a rightful light, and returned to circulation as living nourishment."],
              ]}
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The Great Work here is not to pump the Aquifer dry or to make every depth transparent.
              It is to distinguish putrefaction from gestation, contamination from complexity, and
              dangerous recurrence from buried fertility. Through Anodos, the upward return,
              submerged force can be released from a dead form and re-patterned into a higher one —
              which is the same office the Portal gives to{" "}
              <Entry id="xiii-27">liberating captive light</Entry>, and the way this page will
              leave the depth.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the catacombs of forgotten gods ---- */}
      <Band id="eco-a-catacombs" backdrop="four-luminous-pillars-in-dark-hall" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The catacombs of forgotten gods</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              The statue empties at the surface; <span className="italic text-gold">the gesture continues below</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Among the structures most often built around Aquiferic pressure the system names the
              Catacombs of Forgotten Gods. A forgotten god does not necessarily sleep in the Aquifer
              like a creature beneath water. Rather, the worship, fear, sacrifice, image, name and
              expectation once gathered around that god may have sunk into the underlying strata.
              The cultic body dies; its charge undergoes Katadynamis. Its statues stand empty at the
              surface while its gestures continue below.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              If a later age makes a compatible opening, the old pressure may rise through the
              abandoned divine architecture. What returns may be the god, a fragment of the god, a
              collective memory wearing the god's face, or a Hungry Form assembled from devotional
              remains. The Aquifer supplies a way to discriminate among these possibilities. It
              prevents every resurgence from being called a genuine divine return, and it refuses
              the modern assumption that forgotten sacred forms become wholly unreal when belief
              ceases. The{" "}
              <Link to="/phos/tools/beings" className="underline-offset-4 transition-colors hover:text-gold hover:underline">Register of Beings</Link>{" "}
              holds the names such returns wear; the Aquifer is what moves beneath the names.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This is also where what the system calls the Menagerie of Impossible Forms approaches
              the Aquifer. Submerged Vestigia from unrelated lineages can meet under pressure and
              seek a single outlet. Their recombination may produce unprecedented symbolic
              organisms: forms with no continuous historical ancestry, composed of genuinely
              inherited parts. Some become creative revelations. Others are unstable chimeras. The
              Aquifer explains both their antiquity and their novelty.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- hungry forms at the waterline ---- */}
      <Band id="eco-a-hungry" backdrop="dew-covered-web-in-dark-woodland" opacity={0.2} position="center 50%">
        <Eyebrow>Hungry forms at the waterline</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          An appetite that has lost <span className="italic text-gold">its rightful source</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Hungry Forms gather near Aquiferic upwellings. A form becomes hungry when it retains
              an organising appetite but has lost access to the rightful source that once sustained
              it. Unable to complete its own cycle of reception, embodiment, expenditure and return,
              it draws force from whatever living systems are available: a family narrative, a
              political movement, a magical order, a place of trauma, an individual imagination.
              It is the{" "}
              <Link to="/ecology/form" hash="eco-f-captive" className="underline-offset-4 transition-colors hover:text-gold hover:underline">captive form</Link>{" "}
              seen from beneath the waterline.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The Aquifer does not create every Hungry Form, but it can nourish them. A damaged
              pattern may repeatedly descend, gather charge, and rise through a familiar Aitheric
              Scar; each repetition deepens the channel, as the treatise's{" "}
              <Arch id="flywheel">psychic flywheel</Arch> deepens a habit. What looks like a curse
              may sometimes be a self-reinforcing hydraulic structure — a groove of descent and
              return that keeps guiding compatible force toward the same incomplete form. Breaking
              the visible behaviour without addressing the underlying channel may suppress the
              manifestation for a time while leaving its reservoir intact.
            </p>
          </div>
          <div>
            <ScarAndReturn />
            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              causal · each pass deepens the channel
            </p>
          </div>
        </div>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Yet the Aquifer also contains scavenging and composting powers. Some subtle organisms
          break down dead patterns and return their force to wider circulation. The ecology below is
          not divided cleanly into predators and victims. A presence that appears terrible may be
          performing dissolution; a presence that appears luminous may be preserving a dependency.
          The system therefore judges Aquiferic beings by relation, function and fruit — not by
          appearance alone.
        </p>
      </Band>

      {/* ---- the human being as a well ---- */}
      <Band id="eco-a-well" backdrop="spiral-stair-under-light-shaft" opacity={0.2} position="center 50%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The human being as a well</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Not the whole Aquifer — <span className="italic text-gold">one of its wells</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The human being does not contain the Black Aquifer, but may act as one of its wells.
              The <Arch id="etheric">etheric body</Arch>, the{" "}
              <Arch id="astral">astral body</Arch>, memory, imagination, ancestry and physical
              environment make a local shaft through which deeper currents can rise. Dreams are one
              opening. So are compulsive repetitions, sudden symbolic affinities, disproportionate
              emotional climates, creative visitations, and the feeling that a place or an action
              possesses more age than one's personal history can explain.
            </p>
            <div className="mt-8 border border-gold/30 bg-void/60 p-6 sm:p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">Used with restraint</p>
              <p className="mt-4 text-base leading-relaxed text-bone/90">
                This doctrine does not mean that every emotion has an occult source, that every
                inherited difficulty is caused by a subtle reservoir, or that ordinary
                psychological and material explanations should be displaced by metaphysics. The
                Aquifer is an added dimension of causation, not an excuse to abandon discernment.
              </p>
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Its influence is most plausible on three conditions, and least plausible on none of
              them.
            </p>
            <Items
              items={[
                ["Continuity", "The pattern shows continuity across persons, places or generations."],
                ["Structure", "It carries recognisable formative structure."],
                ["Remainder", "Ordinary causes explain the occasion, but not the peculiar shape or persistence of the recurrence."],
              ]}
            />
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              To become sensitive to the Aquifer is not merely to become receptive. It is to learn
              the difference between one's own water and the water passing through.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Without that distinction the practitioner mistakes pressure for identity, recurrence
              for destiny, and depth for command. The treatise's account of the{" "}
              <Arch id="soul">soul and its interior life</Arch> is the discipline of the distinction.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- ritual as subterranean engineering ---- */}
      <Band id="eco-a-ritual" backdrop="stacked-glass-filters-in-dark-cell" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Ritual as subterranean engineering</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Every serious rite is partly <span className="italic text-gold">an act of hydrology</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Invocation draws currents toward a form. Consecration builds a vessel and a filter.
              Banishing closes channels, redirects flow and removes residues. Repetition deepens
              pathways. An oath can bore a well; a symbol can cap one; a temple can stand over an
              Aitheric Confluence for generations.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This is why ritual success alone is an insufficient measure of ritual truth. A rite
              may produce power precisely because it has punctured a pressurised stratum. It may
              yield visions, coincidences, vitality and apparent contact while drawing from a
              contaminated depth. The decisive questions remain the Architecture's own: is the
              relation <Arch id="relation">rightful</Arch>; does the force serve life; does the
              form clarify what it carries, or merely magnify it; does the architecture{" "}
              <Entry id="xix-20">remain truthful when the first intensity passes</Entry>?
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A consecrated form should work as a selective membrane. Through what the layer calls
              Hierosmosis it permits the transmission of compatible sacred force while resisting
              the indiscriminate mixture of strata. Proper containment does not imprison power; it
              establishes the conditions under which force can reveal its nature without flooding
              the operator. The wise practitioner does not descend with a bucket and call whatever
              rises an oracle.
            </p>
            <div className="mt-8">
              <Law k="The first discipline of the well" text="The first discipline of the well is to test the water." />
            </div>
          </div>
        </div>
      </Band>

      {/* ---- flood, drought and ontic weather ---- */}
      <Band id="eco-a-weather" backdrop="sea-blowhole-erupting-on-black-rock" opacity={0.22} position="center 50%">
        <Eyebrow>Flood, drought and ontic weather</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          The depth contributes <span className="italic text-gold">to the weather above it</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The Aquifer contributes to what the system calls Ontic Weather: the changing atmosphere of
          possibility within a person, place, culture or age —{" "}
          <Link to="/ecology/morphaither" hash="eco-m-weather" className="underline-offset-4 transition-colors hover:text-gold hover:underline">Morphaithēr's weather</Link>,
          read from below.
        </p>
        <div className="mt-10 grid gap-px border border-border bg-border/60 sm:grid-cols-3">
          <div className="bg-void p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">Drought</p>
            <p className="mt-3 text-sm leading-relaxed text-bone/85">
              Inherited forms turn brittle because no deep vitality reaches them. A culture repeats
              its symbols without meeting their roots.
            </p>
          </div>
          <div className="bg-void p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">Flood</p>
            <p className="mt-3 text-sm leading-relaxed text-bone/85">
              Submerged passions and archaic patterns rise faster than conscious institutions can
              mediate them: contagious images, sudden fanaticism, visionary creativity, the return
              of identities believed extinct.
            </p>
          </div>
          <div className="bg-void p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">Artesian spring</p>
            <p className="mt-3 text-sm leading-relaxed text-bone/85">
              A clean pressure from the depths rises without coercion, because a true opening has
              finally been formed. A forgotten art restored; a religious language renewed; an
              ancestral fracture healed; a form whose proper age had not yet arrived.
            </p>
          </div>
        </div>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
          These are not violations of history but expressions of its hidden hydrology.
        </p>
        <p className="mt-6 max-w-3xl border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
          The future sometimes enters through what the past was unable to complete.
        </p>
      </Band>

      {/* ---- what the aquifer adds, and the ethics of the deep water ---- */}
      <Band id="eco-a-adds" backdrop="alabaster-slab-glowing-in-cavern" opacity={0.2} position="center 50%">
        <Eyebrow>What the Aquifer adds, and what it asks</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          The afterlife of unused force — <span className="italic text-gold">and the ethics of the deep water</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Older systems describe the descent of divine influence, the correspondence between
              levels, the plasticity of the astral medium and the ascent of the soul. What they
              describe less often, and less precisely, is the afterlife of unused force: how power
              enters form, but not where it goes when form fails; how images are impressed, but
              not how impressions behave after their images dissolve; how chains transmit
              influence, but not how broken chains leave reservoirs behind.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The Aquifer fills that gap by bringing depth, pressure, stratification and circulation
              into the metaphysics of remainder. It explains why abandoned forces do not simply
              vanish, why places and institutions keep tendencies after their visible occupants
              have changed, why forgotten patterns can return without an intact line of
              transmission, and why acts of purification sometimes wake what they were meant to
              remove. It gives the subtle world not only levels, beings and correspondences, but
              geology and groundwater.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The world does not discard its unfinished powers. It holds them in darkness — some
              because they are dangerous, some because they are wounded, some because they are
              incomplete, and some because no age before ours could give them a truthful body. The
              task is neither indiscriminate excavation nor permanent repression. It is
              stewardship.
            </p>
            <div className="mt-8">
              <Law k="The ethics of the deep water" text="To descend without discernment is to confuse depth with truth. To seal every depth is to cut the living world off from its own reserves." />
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              <Arch id="relation">Right relation</Arch> requires knowing what may be drawn, what
              must be filtered, what deserves transmutation, and what should remain beneath the
              threshold. The goal is not to conquer the Aquifer but to establish a just exchange
              between surface and depth.
            </p>
          </div>
        </div>
        <p className="mt-12 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Every luminous architecture casts more than a shadow; it creates a watershed. Beneath
          temples, bodies, families, civilisations and forgotten gods, the black waters continue to
          move. They bear the pressure of what has failed, the memory of what has lived, and the
          possibility of what has never yet found form.
        </p>
        <div className="mt-12">
          <Law k="The last line of the depth" text="The Black Aquifer is the world's refusal to waste its own becoming." size="xl" />
        </div>
        <Pointers
          arch={["retentive", "morphaither", "atmosphere", "laws", "flywheel", "relation", "mortality", "etheric", "astral", "soul", "theurgy", "image", "celestial", "sophia"]}
          portal={["ii-27", "ii-28", "xix-11", "xiii-27", "xix-20", "xv-20", "xv-85", "xv-86", "xv-87", "xv-91"]}
        />
      </Band>

      <Transition from={station("aquifer").id} />
    </EcologyFrame>
  );
}
