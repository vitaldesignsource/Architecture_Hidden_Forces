import { createFileRoute, Link } from "@tanstack/react-router";
import { Backdrop } from "@/components/Backdrop";
import { CrossMark } from "@/components/CrossMark";
import { RevealText } from "@/components/RevealText";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Law } from "@/components/ecology/Law";
import { Arch, Entry, Pointers } from "@/components/ecology/Pointers";
import { SpiralOfBecoming } from "@/components/diagrams/SpiralOfBecoming";
import { CIRCULATION, LAWS, SHORTHAND, STATIONS, station } from "@/lib/ecology";

/**
 * The Hidden Ecology of Formation — the landing.
 *
 * The treatise describes the invisible as a hierarchy of planes, forces,
 * correspondences and substances. This layer describes the same invisible as
 * an ecology: it has weather, it is fed, it circulates, it takes vessels and
 * exhausts them, it inherits their architecture and retains their
 * consequence, and from the altered conditions it becomes again. The landing
 * says that once, draws the circulation, states the laws it rests on, and
 * hands the reader to the first station. Everything after is a journey the
 * navigation reproduces.
 */
export const Route = createFileRoute("/ecology")({
  head: () => ({
    meta: [
      { title: "The Hidden Ecology of Formation" },
      {
        name: "description",
        content:
          "A layer of The Architecture of Hidden Forces: Morphaithēr, the Sap of Heaven, Etheric Hydrology, Living Form, the Ossuary of Living Forms and the Crypt of Primordial Memory — five dimensions of one ecology, and the spiral that runs through them.",
      },
      { property: "og:title", content: "The Hidden Ecology of Formation" },
      { property: "og:description", content: "The invisible is not only a hierarchy. It receives, circulates, forms, exhausts forms, inherits architectures, retains consequences, and becomes again from the conditions it altered." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Ecology,
});

const ANALOGUES: [string, string][] = [
  ["Atmosphere", "the conditioned medium everything else happens inside"],
  ["Nourishment", "what descends and is taken up, and is not the same to every taker"],
  ["Circulation", "movement with a topology: it has channels, and channels have histories"],
  ["Watersheds", "the architecture that decides where a current can go at all"],
  ["Reservoirs", "concentration held against time, for use or for stagnation"],
  ["Erosion", "flow altering the ground it flows over, until the ground records the flow"],
  ["Sedimentation", "what a current leaves behind — fertile, or in the way"],
  ["Inheritance", "architecture outliving the life that built it, available for reuse"],
  ["Decomposition", "the vessel returned to the economy it drew on"],
  ["Memory", "not a record but a changed condition — the world different for what occurred"],
  ["Succession", "each community of forms preparing the ground for one it will not be"],
];

const GLOSSARY: { k: string; d: string; to: (typeof STATIONS)[number]["to"] }[] = [
  { k: "Morphaithēr", d: "The living qualitative atmosphere of becoming; the conditioned environment within which formation occurs.", to: "/ecology/morphaither" },
  { k: "Differential reception", d: "The same influence producing different manifestations in different vessels under different conditions.", to: "/ecology/morphaither" },
  { k: "The Sap of Heaven", d: "Higher formative influence in so far as it becomes available to lower orders as nourishment.", to: "/ecology/sap" },
  { k: "One current, many expressions", d: "The Sap is one according to procession and many according to reception.", to: "/ecology/sap" },
  { k: "Etheric Hydrology", d: "The analogical study of how formative influence moves, is held, is blocked, and returns.", to: "/ecology/hydrology" },
  { k: "Etheric watershed", d: "Not the current: the architecture that determines where the current can move.", to: "/ecology/hydrology" },
  { k: "Formative topology", d: "The pathways, boundaries, centres, gradients, reservoirs and thresholds of a system, taken as the structure through which influence moves.", to: "/ecology/hydrology" },
  { k: "Etheric erosion", d: "Flow creates channels, and channels determine future flow.", to: "/ecology/hydrology" },
  { k: "Etheric sedimentation", d: "The residue a current leaves in a system — habit, association, assumption, accumulation — to be judged by whether it still serves circulation.", to: "/ecology/hydrology" },
  { k: "Living form", d: "A temporary architecture of participation at the intersection of the whole ecology.", to: "/ecology/form" },
  { k: "Right limitation", d: "The banks a river needs; the problem is never limitation as such but right limitation and right permeability.", to: "/ecology/form" },
  { k: "Captive light", d: "A current subordinated to the architecture that was built to conduct it.", to: "/ecology/form" },
  { k: "The Ossuary of Living Forms", d: "The morphological inheritance of becoming: architectures remaining available after the forms that bore them have gone.", to: "/ecology/ossuary" },
  { k: "The Crypt of Primordial Memory", d: "The retentive depth of existence: what has occurred entering the conditions of what may occur.", to: "/ecology/crypt" },
  { k: "Ontological retention", d: "Consequence without survival — a thing need not remain present for its existence to go on having effect.", to: "/ecology/crypt" },
];

function Ecology() {
  return (
    <EcologyFrame
      title={
        <header id="top" className="relative isolate overflow-hidden pb-28 pt-40 sm:pb-40 sm:pt-56">
          <Backdrop src="/bg/moon-over-tidal-flats-and-channel.webp" opacity={0.36} position="center 60%" scrim={0.3} fill />
          <div className="grain" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="animate-rise text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                A layer of the Architecture · MMXXVI
              </p>
              <h1 className="mx-auto mt-10 max-w-5xl font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl md:text-8xl">
                <RevealText text="The Hidden Ecology" />
                <span className="mt-2 block italic">
                  <RevealText text="of Formation" startDelay={0.9} perChar={0.045} shimmer />
                </span>
                <span className="mx-auto mt-6 block h-px w-24 origin-left bg-gold/70 title-underline" />
              </h1>
              <p className="mx-auto mt-10 max-w-3xl font-serif text-lg leading-relaxed text-bone/90 sm:text-xl md:text-2xl">
                <Link to="/" className="text-gold/90 underline decoration-gold/35 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold">
                  The Architecture of Hidden Forces
                </Link>{" "}
                describes the invisible as planes, forces, correspondences and substances. It also
                describes something a hierarchy cannot: <span className="italic text-gold">a living
                ecology of formation</span> — an invisible that has weather, that is fed, that
                circulates, that takes vessels and exhausts them, and that inherits itself.
              </p>
              <div className="mx-auto mt-16 h-px w-16 bg-gold/50" />
              <blockquote className="mx-auto mt-16 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85 sm:text-2xl md:text-3xl">
                A form emerges within Morphaithēr, fed by the Sap of Heaven, through Etheric Hydrology,
                using structures inherited from the Ossuary, under conditions already altered by the
                Crypt.
              </blockquote>
              <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
                One sentence, five organs. Each is understandable on its own, and none of them is
                the whole; the layer is the discovery that they are one living system.
              </p>
            </div>
          </div>
        </header>
      }
    >
      {/* ---- not only a hierarchy ---- */}
      <Band id="eco-ecology" backdrop="summit-above-sea-of-cloud" opacity={0.18} position="center 40%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Not only a hierarchy</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              The invisible has <span className="italic text-gold">analogues</span> to everything an
              ecology has
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              And they are analogues. Nothing on these pages claims that etheric force is water, or
              that metaphysical memory is an archive. Each is a model for a relationship or a
              process — chosen because the relationship behaves that way, and marked wherever the
              resemblance stops.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A hierarchy of planes tells you what depends on what. It does not tell you what the
              upper feeds the lower with, how the feeding travels, why the same feeding produces a
              forest in one place and a desert in another, what a form leaves behind when it fails,
              or why the next form does not begin from nothing. For those an architecture needs a
              second description, and the second description is ecological.
            </p>
            <div className="mt-10">
              {ANALOGUES.map(([a, b]) => (
                <div key={a} className="grid grid-cols-[1fr] gap-1 border-b border-border py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-5">
                  <span className="font-serif text-lg text-bone/90">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 border-l-2 border-gold pl-6 text-base leading-relaxed text-muted-foreground">
              The treatise already treats the Morphaithēr as{" "}
              <Arch id="morphaither">less a thing than a continuously changing ecology of formative influence</Arch>
              , and already says that{" "}
              <Arch id="retentive">the world inherits itself</Arch>. This layer takes those two
              sentences at their word and builds the rest of the ecology they imply.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the circulation, in order ---- */}
      <Band id="eco-chain" backdrop="braided-glacial-river-from-above" opacity={0.16} position="center 50%">
        <Eyebrow>The circulation, in order</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Condition, nourishment, circulation, form, life, dissolution, inheritance, memory —{" "}
          <span className="italic text-gold">and a modified condition</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Read down. The order is not a ranking and not a timeline a form passes through once; it is
          the shape of one circulation, and the last term is the first term changed. Every station
          links to its own page.
        </p>
        <ol className="mt-14 max-w-2xl">
          {CIRCULATION.map((c, i) => {
            const s = station(c.to);
            const last = i === CIRCULATION.length - 1;
            return (
              <li key={c.k} className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-8">
                <div className="relative flex flex-col items-center">
                  <span className={`z-10 h-2.5 w-2.5 rounded-full ${last ? "bg-bone" : "bg-gold"}`} />
                  {!last && <span className="mt-1 w-px flex-1 bg-gold/30" aria-hidden />}
                </div>
                <div className={last ? "translate-x-6" : ""}>
                  <Link to={s.to} className="group inline-block">
                    <span className="block font-serif text-2xl text-bone transition-colors group-hover:text-gold">{c.k}</span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">{c.sub}</span>
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="max-w-2xl translate-x-0 border-l-2 border-gold/40 pl-6 text-base leading-relaxed text-bone/80 sm:translate-x-[3.1rem]">
          The last station is drawn a step to the side because it is not the first station. New
          formation happens in an atmosphere the whole previous circulation has altered — which is
          why the figure below is a spiral, and why the shorthand for this entire layer is one
          sentence: <span className="text-gold">the world inherits itself</span>.
        </p>
      </Band>

      {/* ---- the six stations ---- */}
      <Band id="eco-stations">
        <Eyebrow>Six stations · one system</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Five organs and the vessel <span className="italic text-gold">they meet in</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          These are not five synonyms for subtle energy or the invisible world. They are five
          dimensions of one ecology, each with a governing question the others cannot answer, and
          Living Form is where all five intersect. Take any one; it will hand you to the next.
        </p>
        <div className="mt-12 grid gap-px border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {STATIONS.map((s) => (
            <Link key={s.id} to={s.to} className="group flex flex-col bg-void p-6 transition-colors hover:bg-gold/5 sm:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">Station {s.n}</span>
              <span className="mt-4 font-serif text-2xl leading-tight text-bone transition-colors group-hover:text-gold">{s.title}</span>
              {s.greek && <span className="mt-1 font-serif text-base text-gold/60" lang="grc">{s.greek}</span>}
              <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{s.dimension}</span>
              <span className="mt-5 font-serif text-base italic leading-relaxed text-bone/80">{s.question}</span>
              <span className="mt-auto pt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                {s.shorthand} <CrossMark className="ml-1 text-gold/70" />
              </span>
            </Link>
          ))}
        </div>
      </Band>

      {/* ---- the spiral ---- */}
      <Band id="eco-spiral" backdrop="whirlpool-in-dark-open-water" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>The Spiral of Becoming</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Every circulation changes the conditions <span className="italic text-gold">of the next</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A circle would say that becoming returns to where it began, and that is exactly what
              it does not do. The twelfth station stands directly above the first — the same phase,
              one level on. Form has passed through, lived, dissolved; its architecture has entered
              the Ossuary and its consequence the Crypt; the world that receives the next descent is
              the inherited one. Morphaithēr again, but not the same Morphaithēr.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Which is why the figure rises. Read it as a relation and not as a picture of a place:
              height here is not altitude and not progress; it is difference. Nothing the
              circulation does is undone by its completing, and nothing it completes leaves the
              conditions it began in intact.
            </p>
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              The future never receives the Sap of Heaven through exactly the same world twice.
            </p>
          </div>
          <SpiralOfBecoming />
        </div>
      </Band>

      {/* ---- the laws ---- */}
      <Band id="eco-laws" backdrop="folded-cliff-face-on-grey-coast" opacity={0.2} position="center 45%">
        <Eyebrow>What the layer rests on</Eyebrow>
        <div className="mt-10 space-y-10">
          <Law k={LAWS[0].k} text={LAWS[0].text} size="xl" />
          <div className="grid gap-10 lg:grid-cols-2">
            <Law k={LAWS[1].k} text={LAWS[1].text} />
            <Law k={LAWS[2].k} text={LAWS[2].text} />
          </div>
        </div>
        <p className="mt-12 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The first is the whole system in one line, and the other two are what it looks like from
          inside the circulation and from inside time. They are stated as laws because the layer
          treats them as ones: everything on the six pages that follow is a case of them.
        </p>
      </Band>

      {/* ---- the shorthand, and beneath it ---- */}
      <Band id="eco-shorthand">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>In seven lines</Eyebrow>
            <div className="mt-8">
              {SHORTHAND.map(([a, b]) => (
                <p key={a} className="border-b border-border py-4 font-serif text-xl leading-snug text-bone/90 sm:text-2xl">
                  <span className="text-gold">{a}</span> {b}
                </p>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Beneath the shorthand</Eyebrow>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The cosmos is not merely an arrangement of static levels.
            </p>
            <div className="mt-6 space-y-1.5 font-serif text-lg leading-relaxed text-bone/85">
              {["It receives.", "It circulates.", "It concentrates.", "It forms.", "It lives.", "It transforms.",
                "It exhausts forms.", "It releases what forms can no longer contain.", "It inherits architectures.",
                "It retains consequences.", "It modifies its own conditions."].map((l) => (
                <p key={l}>{l}</p>
              ))}
              <p className="pt-3 italic text-gold">And from those altered conditions, it becomes again.</p>
            </div>
          </div>
        </div>
      </Band>

      {/* ---- glossary ---- */}
      <Band id="eco-glossary" backdrop="tide-patterns-on-grey-strand" opacity={0.14} position="center 55%">
        <Eyebrow>The layer's terms</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Each defined once, <span className="italic text-gold">where it belongs</span>
        </h2>
        <div className="mt-10 grid gap-x-12 gap-y-px lg:grid-cols-2">
          {GLOSSARY.map((g) => (
            <Link key={g.k} to={g.to} className="group grid grid-cols-[1fr] gap-1 border-b border-border py-4 transition-colors hover:border-gold/40">
              <span className="font-serif text-lg text-bone transition-colors group-hover:text-gold">{g.k}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{g.d}</span>
            </Link>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-bone/60">
          The guardrails, stated once here and kept everywhere: nothing on these pages is reduced to
          energy; no analogy is presented as physics; aether, Morphaithēr, the Sap and the four ethers
          are not synonyms; the Ossuary and the Crypt are not one concept; the Crypt is not a
          database; death is not intrinsically evil; inherited forms are not automatically sacred and
          novelty is not automatically superior. The one criterion, throughout:{" "}
          <span className="text-bone/90">does the architecture maintain right relation with the force it exists to mediate?</span>
        </p>
        <Pointers
          arch={["morphaither", "retentive", "laws", "forceform", "atmosphere", "transduction", "relation", "transformation"]}
          portal={["ii-27", "ii-28", "xix-11", "xix-12", "xix-10", "xix-20"]}
        />
      </Band>

      {/* ---- begin ---- */}
      <section className="relative isolate border-t border-gold/30 py-24 sm:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold-dim">Begin the circulation</p>
          <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone/90 sm:text-3xl">
            Nothing manifests in a vacuum. Before anything is fed, moves, or takes a body, there is
            weather.
          </p>
          <Link to="/ecology/morphaither" className="group mt-10 inline-flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-gold/40 pb-3 transition-colors hover:border-gold">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">Station I</span>
            <span className="font-serif text-3xl text-bone transition-colors group-hover:text-gold sm:text-4xl">Morphaithēr</span>
            <CrossMark className="text-gold/70" />
          </Link>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Or enter anywhere — the Portal's own account of{" "}
            <Entry id="ii-27">light in the Crypt</Entry> and of{" "}
            <Entry id="ii-28">residual light in the Ossuary</Entry> is where this layer was first
            implied.
          </p>
        </div>
      </section>
    </EcologyFrame>
  );
}
