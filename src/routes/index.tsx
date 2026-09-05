import { lazy, Suspense, useCallback, useState } from "react";
import { TattvaGlyph, type TattvaKey } from "@/components/diagrams/TattvaGlyph";
import { ArrowMark, CycleMark } from "@/components/marks";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RevealText } from "@/components/RevealText";
import { all, descent, ret } from "@/lib/principles";
import { useActiveSection, useHashSettle, usePauseOffscreen, useReveal } from "@/hooks/useSectionEffects";
import { Backdrop } from "@/components/Backdrop";
import { SectionGlyph } from "@/components/SectionGlyph";
import { PrincipleCard } from "@/components/PrincipleCard";
import { ArchitectureIndex } from "@/components/ArchitectureIndex";
import { Lexicon } from "@/components/Lexicon";
import { ContentsPanel } from "@/components/ContentsPanel";
import { SearchButton, useSearchHotkey } from "@/components/phos/Search";
import { NavStrip } from "@/components/NavStrip";
import { ENTRIES as CONTENTS } from "@/lib/contents";

// the palette holds the whole index; it is fetched on the first search
const SearchPalette = lazy(() => import("@/components/phos/SearchPalette").then((m) => ({ default: m.SearchPalette })));
import {
  Carriers,
  CentersAxis,
  DaimonicChain,
  ElementalPairs,
  EtherCircuit,
  EthericTides,
  ForceAndForm,
  ForceRegisters,
  GeometryField,
  Hypostases,
  ImaginalBridge,
  KabbalahFigure,
  LunarClocks,
  Persistence,
  PhaseOrgans,
  PlanetaryFamily,
  RightRelation,
  RiteSequence,
  SubTattvaMatrix,
  Symbolon,
  TheChariot,
  TheTriad,
  ThreeNadis,
  ThreeTreasures,
  VerticalChain,
  WuxingCycles,
  ZodiacGrid,
  ZodiacWheel,
  MorphaithericField,
  Chon,
  FourfoldVeil,
  RightMeasure,
  FalseSpiritualization,
  SophianicFaces,
  SolveCoagula,
  SophianicChalice,
  WheelOfTranselementation,
  HekaAndMaat,
  FourOffices,
  EthericTideScales,
  FiveArchitecturesOfFear,
  TheInterval,
  TheRecursion,
  TheAxis,
  OneLayerOfSeven,
} from "@/components/diagrams";
import { ElementSign, PrincipleSign, type ElementKey, type PrincipleKey } from "@/components/diagrams/ElementGlyphs";
import { Seal, type SealKey } from "@/components/diagrams/Seals";
import { PassageGeometry } from "@/components/PassageGeometry";
import { SevenPillars } from "@/components/SevenPillars";
import { CentresLotus } from "@/components/diagrams/CentresLotus";
import { PlanetGlyph } from "@/components/PlanetGlyph";
import { ZodiacGlyph } from "@/components/ZodiacGlyph";
import { SealBlock } from "@/components/SealBlock";
import { MeanderBand } from "@/components/MeanderBand";
import { Term, TermRegister, type TermData } from "@/components/Term";
import type { ScriptKey } from "@/lib/scripts";
import { CrossMark } from "@/components/CrossMark";
import {
  KhekerFrieze,
  SkyBand,
  ShenRing,
  Hiero,
  Sign,
  GlossedWord,
  SignRegister,
} from "@/components/EgyptianDevices";

/** A compound tattva is written dominant–modifier; the glyph seats the modifier
 *  inside the dominant, so the order the prose insists on is visible. */
const TATTVA_KEY: Record<string, TattvaKey> = {
  Akasha: "akasha", Vayu: "vayu", Tejas: "tejas", Apas: "apas", Prithivi: "prithivi",
};
function SubTattvaSign({ pair, size = 22 }: { pair: string; size?: number }) {
  const [d, m] = pair.split("\u2013");
  const dominant = TATTVA_KEY[d?.trim() ?? ""];
  if (!dominant) return null;
  return <TattvaGlyph dominant={dominant} modifier={TATTVA_KEY[m?.trim() ?? ""] ?? null} size={size} className="shrink-0" decorative />;
}

/**
 * The header and the mobile strip were two hand-maintained lists, and they drifted:
 * twelve sections had no entry in either, including every section from § XLI on —
 * the whole ethical capstone was unreachable from the menu. One array now feeds
 * both, so they cannot disagree again.
 *
 * These are waypoints through the arc, not a table of contents. Each is the same
 * kind of thing — a movement or a domain the work spends several sections in —
 * which the old list was not: "Descent" and "Return" are movements of the whole,
 * while "Kabbalah" and "Channels" were single sections sitting at the same level.
 * Seven beats of the arc. Everything finer belongs in the Contents panel, which
 * carries all fifty-four entries and can be opened from anywhere — the header only
 * has to say where you are in the shape.
 */
const NAV = [
  { id: "spine", label: "Spine" },
  { id: "fourfold", label: "Ethers" },
  { id: "descent", label: "Descent" },
  { id: "centers", label: "Body" },
  { id: "symbol", label: "Symbol" },
  { id: "astrology", label: "Sky" },
  { id: "rightrelation", label: "Relation" },
];

/** The wisdom vocabulary § XLVI sets. Hebrew is pointed as a dictionary points
 *  it; Greek is polytonic; the Coptic is the form the Nag Hammadi codices use. */
/** The Hebrew § VII borrows, with the pointing convention the section states:
 *  biblical words pointed, later technical terms unpointed. */
/** The Greek § XXX works in. Polytonic, with the accentuation checked by rule. */
const THEURGY_TERMS: TermData[] = [
  { script: "greek", orig: "θεουργία", tr: "theourgía", gloss: "god-work: not persuading a god to act but acting with one. Iamblichus' answer to Porphyry turns on the difference between a prayer that asks and a rite that participates." },
  { script: "greek", orig: "σύνθημα", tr: "sýnthēma · pl. synthḗmata", gloss: "a token, a password, a thing agreed on in advance — the stone, plant, scent or name a rite uses because the god sowed it there. It works by being recognised, not by resembling." },
  { script: "greek", orig: "σύμβολον", tr: "sýmbolon", gloss: "the half of a broken tally that fits its other half. What makes a symbol operative here is not that it depicts but that it belongs to something." },
  { script: "greek", orig: "σειρά", tr: "seirá", gloss: "a chain: the series that runs from a god down through intelligences, souls, animals, plants and stones — the vertical relation § XXIX is built on." },
  { script: "greek", orig: "ἐπιτηδειότης", tr: "epitēdeiótēs", gloss: "fitness, aptitude for receiving. The Neoplatonic answer to why the same influence does not do the same thing in every vessel: reception is a property of the receiver." },
  { script: "greek", orig: "μέθεξις", tr: "méthexis", gloss: "participation — having a share in something without being it, and without exhausting what is shared." },
  { script: "greek", orig: "ὄχημα", tr: "óchēma", gloss: "vehicle: the subtle body the soul rides in, taken up in the later Platonists and inherited by everything this volume says about the etheric and astral." },
  { script: "greek", orig: "ἄγαλμα", tr: "ágalma · pl. agálmata", gloss: "a statue, but originally a delight or an ornament given to a god — the word behind the ensouled image, and behind the rites that opened its mouth." },
  { script: "greek", orig: "ἀναγωγή", tr: "anagōgḗ", gloss: "the leading-up: the soul's movement back toward its source, and the name for what a rite is for." },
];

const KABBALAH_TERMS: TermData[] = [
  { script: "hebrew", orig: "אֵין סוֹף", tr: "ʾein sof", gloss: "without end. Not a name of God but a refusal of one: the boundless, before anything can be predicated of it." },
  { script: "hebrew", orig: "צמצום", tr: "tzimtzum", gloss: "contraction, withdrawal. The first act is a making-room: the infinite withdraws so that something finite can stand where it was.", note: "Luria's term, sixteenth century. Whether the withdrawal is literal or figurative was disputed almost immediately, and the dispute is the whole later argument in miniature." },
  { script: "hebrew", orig: "ספירות", tr: "sefirot · sg. sefirah", gloss: "the ten: vessels of divine quality through which the boundless becomes ordered power. The root suggests counting and, by another reading, sapphire — a brightness." },
  { script: "hebrew", orig: "אור ישר", tr: "or yashar", gloss: "direct light: the light that descends from the source into the vessel." },
  { script: "hebrew", orig: "אור חוזר", tr: "or ḥozer", gloss: "returning light: what the vessel sends back. The pair is why this system is not a one-way emanation." },
  { script: "hebrew", orig: "שבירת הכלים", tr: "shevirat ha-kelim", gloss: "the breaking of the vessels. The light was more than the vessels could hold, and they broke — which is where this tradition puts the origin of disorder, in a structural failure rather than a moral one." },
  { script: "hebrew", orig: "קליפות", tr: "qelipot · sg. qelipah", gloss: "husks, shells: the shards of the broken vessels, which hold captive sparks and are nourished by them." },
  { script: "hebrew", orig: "ניצוצות", tr: "niṣoṣot", gloss: "the sparks: the light caught in the shells, which the work of repair gathers." },
  { script: "hebrew", orig: "תיקון", tr: "tiqqun", gloss: "repair, mending, setting right — the labour of gathering what fell. In the modern phrase tiqqun ʿolam it has travelled a long way from Safed." },
  { script: "hebrew", orig: "שְׁכִינָה", tr: "shekhinah", gloss: "the indwelling presence, which the tradition says goes into exile with the people and is gathered back in the same work of repair." },
];

const SOPHIA_TERMS: TermData[] = [
  { script: "hebrew", orig: "חָכְמָה", tr: "ḥokmāh", gloss: "wisdom — the ordinary Hebrew word, grammatically feminine, as every abstract noun of its kind is.", note: "The site prints Chochmah for the sefirah of the same root, following its diagrams; the Kabbalistic sense is later and distinct." },
  { script: "hebrew", orig: "חָכְמוֹת", tr: "ḥokmôt", gloss: "the plural-looking form that takes a singular verb at Proverbs 1:20 and 9:1 — wisdom par excellence, the one who cries out in the street and builds the house." },
  { script: "greek", orig: "Σοφία", tr: "sophia", gloss: "what the Septuagint puts for ḥokmāh, and the name under which the figure travels through Greek, Coptic and Latin." },
  { script: "hebrew", orig: "שְׁכִינָה", tr: "shekhinah", gloss: "the indwelling: the rabbinic term for the divine presence that goes into exile with the people. It is not a biblical word, and its later feminine reading is the Kabbalists', not the Talmud's." },
  { script: "greek", orig: "ἀπαύγασμα", tr: "apaugasma", gloss: "a radiance thrown off, the word Wisdom 7:26 uses of her: a reflection of eternal light, beside the spotless mirror and the image of goodness." },
];

/** The Gnostic vocabulary, in the Coptic the codices are written in. */
const GNOSTIC_TERMS: TermData[] = [
  { script: "coptic", orig: "ⲥⲟⲫⲓⲁ", tr: "sophia", gloss: "the Greek word taken over unchanged into Coptic, as most of the technical vocabulary of these texts is." },
  { script: "coptic", orig: "ⲡⲓⲥⲧⲓⲥ ⲥⲟⲫⲓⲁ", tr: "pistis sophia", gloss: "Faith-Wisdom: the title figure of the Askew Codex, who is deceived by a false light, dragged down into chaos, and utters thirteen penitences before she is raised." },
  { script: "greek", orig: "ἐνθύμησις", tr: "enthymēsis", gloss: "the intention or desire that, in the Valentinian account as Irenaeus reports it, is separated from Sophia and becomes the lower Sophia, Achamoth." },
];

/**
 * Ten of the register's hundred and sixty, one per tradition and all from the
 * same stratum — the daimonic middle § XXXI is about. Set here rather than
 * imported: the register is a quarter of a megabyte and belongs in its own
 * chunk, and the audit checks that every id below still names a being.
 */
const MEDIATORS: { id: string; name: string; tradition: string; script: ScriptKey; orig: string; tr: string; office: string }[] = [
  {
    id: "the-seven-apkallu", name: "The Seven Apkallū", tradition: "Mesopotamian",
    script: "cuneiform", orig: "𒉣𒈨", tr: "abgal",
    office: "Antediluvian culture-bringers sent by Ea to teach humanity the arts of civilisation; afterwards, guardian figures.",
  },
  {
    id: "apep", name: "Apep", tradition: "Egyptian",
    script: "hieroglyphs", orig: "𓉻𓊪𓊪𓆙", tr: "ꜥꜣpp",
    office: "The serpent that attacks the sun barque at the edge of night and must be repelled every day, without ever being finally destroyed.",
  },
  {
    id: "the-personal-daimon-of-the-myth-of-er", name: "The personal daimōn", tradition: "Greek",
    script: "greek", orig: "δαίμων", tr: "daímōn",
    office: "The guardian allotted to, or rather chosen by, a soul before birth, who then carries out the life that soul selected.",
  },
  {
    id: "ashmedai", name: "Ashmedai", tradition: "Jewish",
    script: "hebrew", orig: "אשמדאי", tr: "ʾašmədaʾy",
    office: "King of demons; in the Talmud, a captive expert who knows where the shamir is kept.",
  },
  {
    id: "ara-mainiiu", name: "Aŋra Mainiiu", tradition: "Iranian",
    script: "avestan", orig: "𐬀𐬢𐬭𐬀⸱𐬨𐬀𐬌𐬥𐬌𐬌𐬎", tr: "aŋra- mainiiu-",
    office: "The destructive mentality; source of the counter-creation — sickness, winter, the noxious creatures, and death.",
  },
  {
    id: "the-demiurge", name: "The Demiurge", tradition: "Christian and Gnostic",
    script: "coptic", orig: "ⲇⲏⲙⲓⲟⲩⲣⲅⲟⲥ", tr: "Dēmiourgos",
    office: "To fashion and administer the visible and psychic world, unknowingly executing his mother's designs.",
  },
  {
    id: "dakini", name: "Ḍākinī", tradition: "Vedic",
    script: "devanagari", orig: "डाकिनी", tr: "ḍākinī",
    office: "The śakti seated in the mūlādhāra, the earth-cakra; and, more broadly, one of a class of dangerous female powers.",
  },
  {
    id: "mara", name: "Māra", tradition: "Buddhist",
    script: "devanagari", orig: "मार", tr: "māra",
    office: "The tempter; the being, and the category, of whatever obstructs awakening.",
  },
  {
    id: "siming-director-of-destinies", name: "Siming, Director of Destinies", tradition: "Daoist",
    script: "hanzi", orig: "司命", tr: "Sīmìng",
    office: "Keeps the registers of lifespan; audits conduct and deducts time from the allotted span.",
  },
  {
    id: "iblis", name: "Iblīs", tradition: "Islamic",
    script: "arabic", orig: "إِبْلِيس", tr: "Iblīs",
    office: "The refuser of prostration to Ādam; the tempter, granted respite until the appointed Day.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Architecture of Hidden Forces" },
      {
        name: "description",
        content:
          "A complete metaphysics of Source, Spirit, Essence, Virtue, Ether, Force, Pattern, Element, Form, Signature, Symbol, and Transformation — how invisible activity becomes visible order.",
      },
      { property: "og:title", content: "The Architecture of Hidden Forces" },
      {
        property: "og:description",
        content:
          "Form is frozen force. Force is liberated form. A metaphysical system tracing the descent of hidden powers into manifest form and the return of form to essence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** The numeral of the section the reader is in, for the phone bar; the year
 *  above the sections and between the movements, where there is none. */
function numeral(active: string) {
  const n = CONTENTS.find((e) => e.id === active)?.n;
  return n && n !== "—" ? `§ ${n}` : "MMXXVI";
}

function Index() {
  const active = useActiveSection();
  // search: the palette carries the index of all three volumes, so it arrives
  // only when a reader first asks for it
  const [searching, setSearching] = useState(false);
  const openSearch = useCallback(() => setSearching(true), []);
  useSearchHotkey(openSearch);
  useReveal();
  usePauseOffscreen();
  useHashSettle();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-void/70 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-3 sm:flex sm:justify-between sm:py-5">
          <a href="#top" className="min-w-0">
            {/* The name gives way before the waypoints do: from lg the two other
                volumes join the bar, and until xl that is the room the name's tail took. */}
            <div className="truncate font-serif text-[15px] italic tracking-wide sm:text-lg">
              The Architecture<span className="hidden sm:inline lg:hidden xl:inline"> of Hidden Forces</span>
            </div>
            {/* Where the reader is, on a phone: the numeral of the section in view,
                which the bar has no room to name. Under the title, not on a row of
                its own: as a third grid child it wrapped and cost the screen 40px. */}
            <div className="mt-0.5 font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim lg:hidden" aria-live="polite">
              {numeral(active)}
            </div>
          </a>
          <div className="flex shrink-0 items-center gap-4 font-label text-[10px] uppercase tracking-[0.18em] xl:gap-6 xl:tracking-[0.2em]">
            <div className="hidden items-center gap-4 lg:flex xl:gap-6">
            {NAV.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`transition-colors hover:text-gold ${
                  active === l.id ? "text-gold" : ""
                }`}
              >
                {l.label}
              </a>
            ))}
            </div>
            {/* The other two volumes, from here as from every bar: a volume that
                points only to one of its siblings leaves the third to be found. */}
            <div className="hidden shrink-0 items-center gap-4 border-l border-border pl-4 font-serif text-sm normal-case tracking-normal text-bone/80 lg:flex xl:gap-5 xl:pl-6">
              <Link to="/phos" className="whitespace-nowrap transition-colors hover:text-gold">
                Phōs <CrossMark className="text-gold/70" />
              </Link>
              <Link to="/ecology" className="whitespace-nowrap transition-colors hover:text-gold">
                Ecology <CrossMark className="text-gold/70" />
              </Link>
            </div>
            <SearchButton onClick={openSearch} />
            <ContentsPanel active={active} />
          </div>
        </div>

        {/* Below lg the full bar cannot fit. The strip carries the same waypoints
            rather than a longer list: 43 entries in a horizontal scroller was not
            navigation, it was an unsorted index competing with the real one. */}
        <div className="border-t border-border/50 lg:hidden">
          <NavStrip current={active}>
            {NAV.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`whitespace-nowrap py-1 transition-colors hover:text-gold ${
                  active === l.id ? "text-gold" : ""
                }`}
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/phos"
              className="ml-auto whitespace-nowrap border-l border-border py-1 pl-4 font-serif text-xs normal-case tracking-normal text-bone/80 transition-colors hover:text-gold"
            >
              Phōs <CrossMark className="text-gold/70" />
            </Link>
            <Link to="/ecology" className="whitespace-nowrap py-1 font-serif text-xs normal-case tracking-normal text-bone/80 transition-colors hover:text-gold">
              Ecology <CrossMark className="text-gold/70" />
            </Link>
          </NavStrip>
        </div>
      </nav>

      {/* HERO */}
      {searching && (
        <Suspense fallback={null}>
          <SearchPalette open onClose={() => setSearching(false)} />
        </Suspense>
      )}
      <header id="top" className="relative isolate overflow-hidden pb-32 pt-40 sm:pb-48 sm:pt-56">
        <Backdrop src="/bg/threshold-arches-in-misted-vault.webp" opacity={0.3} position="center 42%" fill priority />
        <GeometryField />
        <div className="grain" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="animate-rise text-center">
            <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold">
              A Treatise on Metaphysics · MMXXVI
            </p>
            <h1 className="mx-auto mt-10 max-w-5xl font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl md:text-8xl">
              <RevealText text="The Architecture of" />
              <span className="mt-2 block italic">
                <RevealText text="Hidden Forces" startDelay={0.9} perChar={0.055} shimmer />
              </span>
              <span className="mx-auto mt-6 block h-px w-24 origin-left bg-gold/70 title-underline" />
            </h1>
            <p className="mx-auto mt-10 max-w-2xl font-serif text-lg leading-relaxed text-bone/90 sm:text-xl md:text-2xl" data-hero-lede>
              A complete metaphysics with Greek philosophical correspondences — the architecture
              by which hidden forces become visible forms, and by which visible forms reveal
              hidden forces.
            </p>

            <div className="mx-auto mt-16 h-px w-16 bg-gold/50" />

            <blockquote className="mx-auto mt-16 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85 sm:text-2xl md:text-3xl">
              “Every visible thing is the stabilization of an invisible activity. Every form is
              the visible arresting of force into pattern. The world is not a collection of
              objects — it is a kosmos, an ordered beauty, an architecture of hidden forces.”
            </blockquote>
          </div>

          {/* Greek chain */}
          <div className="relative mt-32">
            <p className="text-center font-label text-[10px] uppercase tracking-[0.4em] text-gold-dim">
              <span lang="el" className="scr-greek">Σειρά</span> · The Chain of Manifestation
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-6 sm:gap-x-6">
              {all.map((p, i) => (
                <div key={p.latin} className="flex items-center gap-3 sm:gap-5">
                  <span
                    className="font-serif text-xl text-bone/85 transition-colors hover:text-gold sm:text-2xl"
                    title={`${p.latin} — ${p.english}`}
                  >
                    {p.greek}
                  </span>
                  {i < all.length - 1 && (
                    <ArrowMark className="text-sm text-gold/40" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* STATUS OF THE WORK */}
      <section className="relative border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
            <p className="font-label text-[10px] uppercase leading-relaxed tracking-[0.3em] text-gold">
              <span lang="el" className="scr-greek">Ἐν προόδῳ</span>
              <span className="mt-2 block text-gold-dim">On the status of this work</span>
            </p>
            <div className="max-w-3xl">
              <p className="font-serif text-xl leading-relaxed text-bone/90 sm:text-2xl">
                A continuously evolving metaphysics — assembled rather than received.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                This is a work of <span className="text-gold-dim">compilation</span>: Greek,
                Kabbalistic, tattvic, alchemical, and Daoist material read together on the claim
                that these languages describe one structure from different angles. It is equally a
                work of <span className="text-gold-dim">experiment</span>. Sections are added,
                corrected, and re-proportioned as the system clarifies; a term is renamed when a
                better one is found; and what is not yet named is marked as such rather than
                filled in.
              </p>
              <p className="mt-5 font-serif text-lg italic leading-relaxed text-bone/75">
                No vessel exhausts the field — this one included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT THE ARCHITECTURE IS FOR */}
      <section id="goals" className="relative isolate border-t border-border py-24">
        <Backdrop src="/bg/lighthouse-lamp-room-with-brass-optics.webp" opacity={0.3} position="center 50%" scrim={0.28} />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
            <p className="font-label text-[10px] uppercase leading-relaxed tracking-[0.3em] text-gold">
              <span lang="el" className="scr-greek">Τέλος</span>
              <span className="mt-2 block text-gold-dim">What the Architecture is for</span>
            </p>
            <div className="max-w-3xl">
              <p className="font-serif text-xl leading-relaxed text-bone/90 sm:text-2xl">
                A coherent account of how the invisible becomes operative within the visible.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The central goal of this work is a metaphysics of what occurs between transcendent
                principle and material manifestation: how an intelligible pattern becomes a formative
                current, how that current is received by psychic and etheric fields, how it gathers
                substance, and how it becomes a body, an event, a symbol, an organism, an institution,
                or a world. So it concentrates on the intermediate regions that many systems acknowledge
                and do not explain — the astral, etheric, psychic, elemental, celestial, daimonic and
                imaginal orders as distinct, interacting layers of mediation — and rather than treating
                spirit and matter as two disconnected poles it maps the gradients, thresholds, vessels,
                pressures, transmissions and transformations through which one passes into the other.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A second goal is a precise vocabulary for processes that esoteric language leaves vague:
                Morphaithēr, morphogenic pressure, aitheric confluence, pneumic percolation, hierostasis,
                vestigium, the Crypt of Primordial Memory, the Ossuary of Living Forms, Etheric
                Hydrology, the Sap of Heaven. The words let the work say not only what hidden forces are
                but how they move, combine, crystallise, leave residue, inherit earlier patterns and
                generate new forms; they are gathered, defined once, in the{" "}
                <Link to="/ecology/lexicon" className="text-gold-dim underline-offset-4 transition-colors hover:text-gold hover:underline">Lexicon of the Hidden Ecology</Link>.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A third is to bring the traditions into disciplined conversation — Neoplatonism,
                Hermeticism, theurgy, alchemy, Kabbalah, Indian metaphysics, Chinese energetic thought,
                Egyptian heka, Western occultism — without collapsing them into one doctrine. Each is
                treated as revealing a different region, scale or operation within a greater
                architecture; their correspondences are explored, their differences preserved, and their
                unresolved questions used as openings. The purpose is not synthesis alone. The work means
                to extend the inherited systems where they are underdeveloped: the ecology of the Astral
                Light, the mechanics of etheric manifestation, the inheritance and decay of forms, the
                relation between force and memory, the movement of qualities through bodies, and the
                hidden conditions beneath meaningful coincidence.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Another is to reunite theory with lived and practical experience: to help a person
                discern what kind of force is present, through which level it operates, what vessel
                receives it, what pattern it is attempting to establish, and what effects may follow —
                without reducing every illness, misfortune, emotion or coincidence to a hidden
                supernatural cause. And ethical discernment is essential to the whole. The work does not
                assume that every available force should be invoked, every threshold crossed, or every
                transformation pursued. It asks whether a path should be walked, whether a force serves
                life or merely magnifies power, whether a relationship is reciprocal or parasitic, and
                whether an architecture remains truthful when its visible forms begin to fail. Power
                stays subordinate to right relation, proportion, responsibility and truth.
              </p>
              <p className="mt-5 font-serif text-lg italic leading-relaxed text-bone/75">
                Ultimately the work seeks to restore depth to the world: matter not as spiritually empty
                but as the terminal expression of profound processes; form not as a prison alone but as
                vessel, memory and momentary revelation; the human being not as a passive observer but as
                a participant within a living continuum of forces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDEX */}
      <section id="index" className="relative isolate border-t border-border py-24">
        <Backdrop src="/bg/summit-above-sea-of-cloud.webp" opacity={0.42} position="center 40%" scrim={0.25} />
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            <span lang="el" className="scr-greek">Πίναξ</span> · The Architecture in Order
          </p>


          <ArchitectureIndex />
        </div>
      </section>

      <section id="doctrine" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/archer-drawing-bow-in-courtyard.webp" opacity={0.72} position="center 45%" scrim={0.3} />
        <SectionGlyph />
        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_2fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
              § 00 · Central Doctrine
            </p>
            <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl">
              Form is dynamis held in morphē
            </h2>
          </aside>
          <div className="space-y-8 font-serif text-lg leading-relaxed text-bone/80 sm:text-xl">
            <p>
              Reality is not divided into dead matter and abstract spirit. It is a
              <em className="text-gold"> continuum of manifestation</em>: the invisible becomes
              visible through ordered degrees, and the visible can be read back toward the
              invisible through trace, signature, symbol, correspondence, and transformation.
            </p>
            <p>
              Every body, symbol, organism, gesture, landscape, ritual, and event is a
              <em className="text-gold"> seal of a hidden operation</em>. Nothing appears as mere
              surface. Every form is the visible arresting of force into pattern.
            </p>
            <p className="border-l border-gold/40 pl-6 italic text-bone/90">
              Ousia bears Dynamis. Dynamis becomes Energeia. Energeia receives Logos. Logos
              descends through Stoicheion. Stoicheion enters Hylē. Hylē receives Morphē. Morphē
              leaves Ichnos. Ichnos reveals Charaktēr. Charaktēr flowers as Symbolon. Symbolon
              opens Sympatheia. Sympatheia makes Metamorphōsis possible.
            </p>
          </div>
        </div>
      </section>

      {/* THE FIVE TERMS */}
      <section id="terms" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/whirlpool-in-dark-open-water.webp" opacity={0.7} position="center 55%" scrim={0.2} />
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                § I · The Five Terms
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                What the words <span className="italic text-gold">mean</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                The architecture uses five terms with precision. They are not synonyms, and they
                do not name five substances. They name five aspects of one formative event.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { greek: "ὕλη", latin: "Hylē", english: "Matter", summary: "The current material content — what is presently held." },
                { greek: "Μορφή", latin: "Morphē", english: "Form", summary: "The organization of that content — the arrangement, not the stuff." },
                { greek: "Ἐνέργεια", latin: "Energeia", english: "Force", summary: "The activity maintaining the organization — form held open against dissolution." },
                { greek: "Πεδίον", latin: "Pedion", english: "Field", summary: "The conditions permitting that activity — what must already be true for the form to occur." },
                { greek: "Κέντρον", latin: "Kentron", english: "Center", summary: "The principle preserving coherence through change — what remains itself while its matter is exchanged." },
              ].map((t) => (
                <div
                  key={t.english}
                  className="grid gap-2 border-b border-border pb-6 sm:grid-cols-[1fr_1fr_1fr] sm:gap-6"
                >
                  <div className="font-serif text-xl text-gold">{t.greek}</div>
                  <div className="font-serif italic text-bone/85">{t.latin}</div>
                  <div className="font-label text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                    {t.english}
                  </div>
                  <p className="col-span-full text-sm leading-relaxed text-muted-foreground">
                    {t.summary}
                  </p>
                </div>
              ))}
              <p className="pt-2 text-sm leading-relaxed text-bone/80">
                A whirlpool is the instance. Its water is <span className="text-gold-dim">matter</span>;
                its shape is <span className="text-gold-dim">form</span>; the current is{" "}
                <span className="text-gold-dim">force</span>; the river is{" "}
                <span className="text-gold-dim">field</span>; and whatever keeps it one whirlpool
                while every drop passes through is its <span className="text-gold-dim">center</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE SPINE */}
      <section id="spine" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/mirror-concentrator-on-desert-ridge.webp" opacity={0.16} position="center 55%" />
        <SectionGlyph delay={-25} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § II · The Doctrinal Spine
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Eighteen <span className="italic text-gold">commitments</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            What follows is not a summary of the system but its load-bearing structure — the
            claims everything else depends upon. Reality is composed not primarily of isolated
            things, but of processes, relations, constraints, and recurring organizations that
            temporarily appear as things.
          </p>

          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            {[
              { n: "I", t: "Field Precedes Form", d: "No formed thing begins entirely within itself. Every body, thought, symbol, and event is a stabilized intersection of prior conditions." },
              { n: "II", t: "Root Ether Is the First Medium", d: "Not merely another subtle substance, but the undifferentiated medium making relation, transmission, and differentiation possible. Not the Absolute — the first manifest field beneath formed existence." },
              { n: "III", t: "Quality Precedes Substance", d: "Formative qualities operate before something becomes fire, water, thought, or body. The tattvas are morphogenic biases — tendencies toward expansion, cohesion, ignition, stabilization, openness." },
              { n: "IV", t: "The Ethers Are Modes of One Field", d: "Not four separate substances but differentiated operations of Root Ether — the Fourfold Veil through which invisible force approaches embodiment." },
              { n: "V", t: "The Morphaithēr Is a Living Atmosphere", d: "Etheric currents, tattvic qualities, elemental tendencies, psychic impressions, and inherited patterns produce a formative atmosphere — less a thing than a changing ecology of influence." },
              { n: "VI", t: "Force Becomes Form Through Measure", d: "Force alone creates nothing enduring. It must be limited, proportioned, polarized, and contained. Number does not merely describe a finished world; it participates in making coherent worlds possible." },
              { n: "VII", t: "Matter Is Stabilized Activity", d: "Not dead substance opposed to spirit, but activity brought into relative stability. A material object is closer to a persistent event than to a motionless thing." },
              { n: "VIII", t: "Causation Includes Resonance", d: "Things affect one another through proximity, shared pattern, resonance, correspondence, and participation in a common field. Genuine correspondence requires an operative relationship, not visual similarity." },
              { n: "IX", t: "The World Inherits Itself", d: "Completed forms vanish as visible unities, but their passage alters the conditions from which later forms arise. The Crypt of Primordial Memory names this ontological inheritance." },
              { n: "X", t: "Forms Die, Formation Continues", d: "Nature preserves no vessel forever, yet never begins from nothing. The Ossuary of Living Forms: death is dissolution of a particular vessel, not erasure of what passed through it." },
              { n: "XI", t: "Consciousness Is Participatory", d: "Attention, imagination, desire, and repeated action help organize the atmosphere a person inhabits — yet consciousness participates alongside bodily, historical, and transpersonal forces. Neither spectator nor sovereign." },
              { n: "XII", t: "Repetition Generates Momentum", d: "Coherent repetition produces momentum; momentum alters perception; altered behavior reinforces the pattern. This is the Psychic Flywheel." },
              { n: "XIII", t: "Alchemy Is the Grammar of Transformation", d: "Sulfur initiates, Mercury circulates and joins, Salt embodies and limits. Three recurrent necessities of transformation — not three occult chemicals." },
              { n: "XIV", t: "Dissolution and Reconstitution", d: "The old configuration must be loosened, its forces understood, its viable contents recombined around a more coherent center. Solve without coagula disperses; coagula without solve imprisons." },
              { n: "XV", t: "Coherence Exceeds Intensity", d: "A weaker force organized around a stable center accomplishes more than a stronger force internally divided. Contradiction produces friction and dissipation. But coherence alone is not goodness — a tumor is organized, an obsession is coherent. See § XII: integral coherence preserves its relations with the greater systems it belongs to; parasitic coherence survives by consuming its host." },
              { n: "XVI", t: "Theurgy Is Alignment, Not Domination", d: "The highest operation is not forcing the cosmos to obey an isolated personality, but reorganizing the person into a vessel able to participate in a greater order." },
              { n: "XVII", t: "Symbols Are Maps of Functions", d: "Kabbalah, tattva doctrine, alchemy, and geometry describe reality from different angles. They integrate where their functions genuinely correspond — complementary instruments, not interchangeable labels." },
              { n: "XVIII", t: "The Ground Is Not One of Its Terms", d: "A ground never appears as a member of the series it grounds. To count it among them is to make the undifferentiated already differentiated, and the category collapses. Root Ether is not a fifth ether; Akasha is not a fifth zodiacal element; the Dao is not Root Ether. One guard, wherever a source would otherwise be flattened into an item of what it sources." },
            ].map((k) => (
              <div
                key={k.n}
                className="group border border-border p-5 transition-colors hover:border-gold/40"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-serif text-lg italic text-bone">{k.t}</div>
                  <div className="shrink-0 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {k.n}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{k.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Reduced to one proposition
            </p>
            <p className="mt-5 max-w-4xl font-serif text-2xl italic leading-relaxed text-bone sm:text-3xl">
              Reality is a living field of formative relations in which qualities become forces,
              forces become patterns, patterns become forms, forms become vessels of experience,
              and their dissolution returns altered possibilities to the field from which future
              forms arise.
            </p>
          </div>
        </div>
      </section>

      {/* DESCENT */}
      <section id="descent" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/cascade-over-limestone-in-gorge.webp" opacity={0.22} position="center 40%" />
        <SectionGlyph delay={-30} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold">
                <span lang="el" className="scr-greek">Πρόοδος</span> · The First Movement
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                The Descent <span className="italic text-gold">into Form</span>
              </h2>
            </div>
            <div className="shrink-0 font-label text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              XIII Principles
            </div>
          </div>

          <p className="mb-16 max-w-2xl font-serif text-lg italic leading-relaxed text-muted-foreground">
            Source gives being. Spirit gives life. Essence gives nature. Virtue gives potency.
            Akasha Prime opens the field of possibility. Ether carries. Tide moves. Tattva
            qualifies. Force acts. Pattern orders. Element embodies. Matter receives. Form reveals.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {descent.map((p) => (
              <PrincipleCard key={p.latin} p={p} accent="descent" />
            ))}
          </div>
        </div>
      </section>

      {/* INTERLUDE — frozen force */}
      <section className="relative border-t border-border py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin-reverse opacity-[0.1]"
            width="1100"
            height="1100"
            viewBox="-550 -550 1100 1100"
            aria-hidden
          >
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 24;
              return (
                <line
                  key={i}
                  x1={0}
                  y1={0}
                  x2={Math.cos(a) * 520}
                  y2={Math.sin(a) * 520}
                  stroke="oklch(0.78 0.13 75)"
                  strokeWidth="0.3"
                />
              );
            })}
            <circle r="520" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            <circle r="380" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            <circle r="240" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold">
            <span lang="el" className="scr-greek">Δύναμις · Μορφή</span>
          </p>
          <p className="mt-12 font-serif text-4xl leading-tight text-balance sm:text-6xl md:text-7xl">
            Form is <span className="italic text-gold">frozen force</span>.
            <br />
            Force is <span className="italic text-gold">liberated form</span>.
          </p>
          <p className="mx-auto mt-12 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Form is dynamis held in morphē. Force is morphē released back into dynamis. To study
            hidden forces is not merely to study movement, but the invisible nature and order
            behind it.
          </p>
        </div>
      </section>

      {/* LAYERED CORRESPONDENCE */}
      <section id="correspondence" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/dew-covered-web-in-dark-woodland.webp" opacity={0.16} position="center 50%" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                § III · Layered Correspondence
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Aithēr <span className="italic text-gold">→</span> Tattva{" "}
                <span className="italic text-gold">→</span> Stoicheion{" "}
                <span className="italic text-gold">→</span> Morphē
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                The ethers are formative fields. The tattvas are vibratory qualities. The
                elements are embodied conditions. They correspond, but they are not identical.
                An ether is a medium — a functional level through which forces operate. A tattva
                is a morphogenic bias — a qualitative tendency directing how those forces will
                behave. One supplies the capacity; the other gives it a direction.
              </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The correspondence below runs fourfold because it is keyed to the four ethers. The
            tattvas are five. <span className="text-bone/90">Akasha takes no column here</span> — not
            because it is missing, but because it is the open condition within which the other four
            relate at all, and so does not sit beside them as a fifth term. The same asymmetry
            returns in § XXXVIII, where Akasha again declines a column rather than producing extra
            signs.
          </p>
            </div>
            <div className="space-y-6">
              {([
                { ether: "Warmth Ether", s: "warmth", tattva: "Tejas", t: "tejas", element: "Πῦρ · Fire", e: "Fire", note: "Activation, ignition, transformation." },
                { ether: "Light Ether", s: "light", tattva: "Vayu", t: "vayu", element: "Ἀήρ · Air", e: "Air", note: "Illumination, direction, breath, transmission." },
                { ether: "Tone / Chemical Ether", s: "tone", tattva: "Apas", t: "apas", element: "Ὕδωρ · Water", e: "Water", note: "Relation, harmony, cohesion, memory." },
                { ether: "Life Ether", s: "life", tattva: "Prithivi", t: "prithivi", element: "Γῆ · Earth", e: "Earth", note: "Integration, structure, crystallization, durable form." },
              ] as const).map((row) => (
                <div
                  key={row.element}
                  className="grid gap-2 border-b border-border pb-6 sm:grid-cols-[1fr_1fr_1fr] sm:gap-6"
                >
                  <div className="flex items-center gap-2.5 font-label text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                    <Seal k={row.s} size={20} className="shrink-0 text-gold/70" decorative />
                    {row.ether}
                  </div>
                  <div className="flex items-center gap-2.5 font-serif italic text-bone/85">
                    <TattvaGlyph dominant={row.t} size={18} className="shrink-0" decorative />
                    {row.tattva}
                  </div>
                  <div className="flex items-center gap-2.5 font-serif text-bone/90">
                    <ElementSign k={row.e} size={22} className="shrink-0 text-gold/75" decorative />
                    {row.element}
                  </div>
                  <p className="col-span-full text-sm leading-relaxed text-muted-foreground">
                    {row.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE FOURFOLD FIELD */}
      <section id="fourfold" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/gateway-cut-through-rock-to-mist.webp" opacity={0.16} position="center 50%" />
        <SectionGlyph delay={-40} />
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                § IV · The Fourfold Field
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Θερμότης <span className="italic text-gold">→</span> Φῶς{" "}
                <span className="italic text-gold">→</span> Τόνος{" "}
                <span className="italic text-gold">→</span> Ζωή{" "}
                <span className="italic text-gold">↻</span>
              </h2>
              <p className="mt-8 font-label text-[11px] uppercase tracking-[0.25em] text-gold-dim">
                <span lang="el" className="scr-greek">Τὸ Τετραμερὲς Πεδίον</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Four functions, one formative circulation. The ethers are not separate substances
                and not successive stages. Every living process carries all four; at any moment
                one predominates. Their tattvic and elemental correspondences stand in § III — what
                follows is their operation.
              </p>
            </div>
            <div className="space-y-8">
              <p className="font-serif text-2xl italic leading-tight text-bone/90 sm:text-3xl">
                Warmth <span className="text-gold">quickens</span>. Light{" "}
                <span className="text-gold">articulates</span>. Tone{" "}
                <span className="text-gold">coordinates</span>. Life{" "}
                <span className="text-gold">regenerates</span>.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Activation opens possibility. Articulation gives it direction. Affinity gives it
                relation. Integration gives it continuity. Continuity preserves the capacity for
                further activation.
              </p>
              <p className="border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/85">
                This is a circuit, not a ladder. Life is not the last rung of a descent: the living
                whole becomes the vessel of new potential and returns the cycle to Warmth at a more
                developed level.
              </p>
            </div>
          </div>

          {/* The circuit, then the ladder: shape first, then depth */}
          <div className="mt-20 border-t border-border pt-10">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
              <span lang="el" className="scr-greek">Κύκλος</span> · The four in one circuit
            </p>
            <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-center">
              <EtherCircuit />
              <div>
                <p className="max-w-2xl font-serif text-2xl italic leading-tight text-bone/85 sm:text-3xl">
                  “The interval is as important as the <span className="text-gold">note</span>.”
                </p>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  The four are not a descent with Life at the bottom. Life bends the field back
                  toward its beginning: the living whole becomes the vessel of new potential, and
                  the cycle returns to Warmth at a more developed level. That returning arc is
                  drawn heavier than the other three, because it is the whole of the claim.
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Below, the same four are set out at length — each with its measure: deficiency on
                  one side, excess on the other, the named virtue between, and the interval that
                  carries each into the next.
                </p>
              </div>
            </div>
          </div>

          {/* At length — each ether with its measure, and the intervals between */}
          <div className="mt-16">
            {[
              {
                n: "I",
                greek: "Θερμότης",
                sign: "warmth" as SealKey,
                seal: { name: "The First Pulse", reading: "The ancestral concentric circles are kept, but each ring is opened at a progressively rotated point. The rings are successive intensifications of one germinal event, and their openings trace an invisible spiral of temporal unfolding. The dark centre is pre-formal potential; the outward pulse is birth. Unlike material Fire, which consumes and dissipates, Warmth Ether awakens from within and gives duration to becoming." },
                translit: "Thermotēs",
                english: "Warmth Ether",
                verb: "quickens",
                corr: "Tejas · Πῦρ",
                t: "tejas" as TattvaKey,
                el: "Fire" as ElementKey,
                title: "Activation · The Threshold Ether",
                fn: "The first activated condition of Root Ether — the formative gradient through which latent possibility becomes movement, receptivity, will, and the capacity for transformation.",
                quote: "Warmth is what allows knowledge to become participation.",
                lines: [
                  "Before anything can change, something must first become active. A seed holds the possibility of a plant; metal can take a new shape. Neither moves until the conditions around it awaken what is latent.",
                  "Root Ether makes formation possible; Warmth begins it. Warmth is the point at which the neutrality of the field is disturbed — an intensity, a pressure, a stirring. That difference is a gradient, and across a gradient movement becomes possible. It is the first asymmetry of formation.",
                  "Not physical heat. Heat is measurable as temperature and is one material expression of the principle; warmth also appears as growth, desire, enthusiasm, courage, devotion, irritation, and will. Wherever something passes from dormancy into activity, warmth is present.",
                  "Cold wax holds its form and resists reshaping. Warmed, it becomes receptive. The warmth does not decide which image will be pressed into it — it allows the wax to receive a configuration at all.",
                  "Not elemental Fire. Fire is warmth that has acquired direction — consuming, separating, illuminating, purifying. A seed germinating underground is activation without combustion. Warmth is the capacity for ignition; Fire is that capacity assuming one mode.",
                  "Not the tattva Tejas. An ether is a medium through which forces operate; a tattva is a morphogenic bias directing how they behave. Tejas makes warmth radiant and separating — but Apas can make it incubatory, Vayu volatile, Prithivi bound and preserved, Akasha a charged stillness awaiting activation.",
                  "Psychically it is attention. An unnoticed impression stays weak; attention returning to it gathers associations, emotion, and significance until it can shape perception. Attention does not merely observe — it feeds the pattern it rests upon. Fear warms by vigilance, resentment by recollection, a sacred image by devotion.",
                  "It is what carries an understood pattern into the will. Courage is not the absence of fear but sufficient warmth around another purpose; enthusiasm is an idea that has acquired enough warmth to animate the one who receives it.",
                  "It purifies and consecrates by the same power: loosening fixed residues so they can be released, then leaving the opened vessel receptive to a new organizing pattern. Warmth alone cannot tell purification from destruction — Light must disclose the pattern, Salt must fix it.",
                  "It is the Threshold Ether. Felt inwardly as vitality, emotion, and will; appearing outwardly as a measurable condition of bodies. It belongs to both movements — in descent it awakens possibility toward form; in return, embodied warmth opens the living vessel toward subtler activity.",
                ],
                deficiency:
                  "Dormancy. Inertia, rigidity, indifference, alienation, and the inability to turn knowledge into action — the pattern understood but never embodied.",
                virtue: "measured warmth",
                gloss:
                  "Balanced warmth produces vitality, receptivity, courage, and sustained transformation. Warmth becomes constructive only when properly measured.",
                excess:
                  "Fever. Agitation, impulsiveness, obsession, uncontrolled desire, exhaustion, emotional inflammation — the vessel activated faster than it can organize and contain what it releases.",
                into: {
                  to: "Φῶς",
                  passage: "Activation opens possibility; articulation gives it direction.",
                  drift: "Where the interval collapses: quickening arrives before orientation, and activity intensifies without ever becoming clear enough to guide itself.",
                },
              },
              {
                n: "II",
                greek: "Φῶς",
                sign: "light" as SealKey,
                seal: { name: "The Mediating Ray", reading: "The single upper ray is undiminished luminous procession. The hollow central diamond is the receptive veil through which light becomes proportioned to the capacity of a form. After mediation the ray divides into two descending blades — differential reception, separation, formative illumination. The black interval between them is Necessary Shadow: not light’s enemy, but the distinction that makes revelation possible. The golden lambda remains visible within the lower half, now given a fuller metaphysical function." },
                translit: "Phōs",
                english: "Light Ether",
                verb: "articulates",
                corr: "Vayu · Ἀήρ",
                t: "vayu" as TattvaKey,
                el: "Air" as ElementKey,
                title: "The Articulation of Difference",
                fn: "Once possibility is active it must acquire distinction. Light is the function through which orientation, contrast, boundary, and intelligible space emerge.",
                quote: "Light gives force a face.",
                lines: [
                  "It does not harden difference into permanent division. It makes difference perceptible enough to enter relation.",
                  "Materially: colour, edge, distance, surface, position — and, through shadow, depth. Plants orient to it; organisms keep time by it.",
                  "Subtler, it is the condition of discernibility: it gives an emerging form an interior geography — centre and circumference, inner and outer, approach and withdrawal.",
                  "Psychically it is attention and discernment. Attention does not merely illuminate a finished inner world; by repeatedly distinguishing impressions it helps establish what becomes significant.",
                  "An invisible tendency becomes approachable when it acquires an image, name, gesture, or diagram. The image does not contain the power; it gives the power a surface through which consciousness can relate to it.",
                  "Illumination always selects. To reveal one relation is to leave another in shadow; every distinction establishes a foreground and a background.",
                ],
                deficiency:
                  "Awakened force without orientation. Activity intensifies, but nothing becomes clear enough to guide it.",
                virtue: "right articulation",
                gloss:
                  "Reveals the differences required for meaningful relation without severing them from the field to which they belong.",
                excess:
                  "The field fragments, oppositions harden, partial visibility is mistaken for understanding. A symbol defined so rigidly it can no longer disclose anything beyond its established reading; experience divided so aggressively that living continuities disappear.",
                into: {
                  to: "Τόνος",
                  passage: "Distinction becomes relation — affinity, interval, proportion.",
                  drift: "Where the interval collapses: differentiation outruns integration, and what has been distinguished can no longer be brought into measure.",
                },
              },
              {
                n: "III",
                greek: "Τόνος",
                sign: "tone" as SealKey,
                seal: { name: "The Interval Wheel", reading: "The eight separate arms are discrete identities, and their measured black intervals matter equally: Tone Ether produces order through proportion, separation and relation. The curved movement expresses resonance and affinity; the silent central opening is the unstruck tone from which harmonic structure arises. Unlike Water’s continuous flow, Tone Ether articulates the field into distinguishable intervals, branches, cellular divisions and relational patterns." },
                translit: "Tonos · Chemical Ether",
                english: "Tone Ether",
                verb: "coordinates",
                corr: "Apas · Ὕδωρ",
                t: "apas" as TattvaKey,
                el: "Water" as ElementKey,
                title: "Affinity, Interval, and Proportion",
                fn: "The function through which differentiated powers enter measured relationship — rhythm, interval, ratio, resonance, affinity, combination, separation.",
                quote: "Tone orders through affinity, interval, and proportion.",
                lines: [
                  "If Light reveals that two powers are distinct, Tone determines how — or whether — they can belong together.",
                  "Affinity draws compatible powers toward relation. Interval prevents relation from becoming undifferentiated fusion. Proportion determines how much of each power may enter the whole without destroying balance. Rhythm carries the relation through time.",
                  "No note possesses complete meaning in isolation. A note consonant in one relation is dissonant in another: identity remains, function changes.",
                  "Nor do substances combine indiscriminately. Some unite readily, others resist; some require heat, pressure, catalyst, or exact ratio. Relation is selective — the formative world is not governed by contact alone.",
                  "Tone therefore both joins and divides. It draws together what can form a meaningful compound and holds distance where distinction must be preserved. Dissonance may be necessary to development; separation may protect the integrity of a living whole.",
                  "Health is not all systems doing the same thing. Heart, lung, nerve, and gland keep different rhythms and remain mutually responsive: differentiated activity in viable proportion. In ritual, in law, in calendar and custom, the same ordering arranges difference through interval and proportion.",
                ],
                deficiency:
                  "Incoherence, mistiming, incompatible action, the inability to sustain relation — uncontrolled dissonance that prevents any shared order.",
                virtue: "living proportion",
                gloss:
                  "An order precise enough to coordinate differences, yet flexible enough to be retuned.",
                excess:
                  "Rigidity, overregulation, compulsive repetition. Coordination becomes conformity; harmony is bought by suppressing necessary difference; the system is tuned too tightly to answer change, and false consonance hides conflict beneath uniformity.",
                into: {
                  to: "Ζωή",
                  passage: "Coordination becomes continuity — a whole capable of renewal.",
                  drift: "Where the interval collapses: coordination hardens into mechanical repetition, and order is kept only by refusing change.",
                },
              },
              {
                n: "IV",
                greek: "Ζωή",
                sign: "life" as SealKey,
                seal: {
                  name: "The Living Circuit",
                  reading: [
                    "The seal represents the power by which separate processes are gathered into a self-renewing whole. It does not symbolise a seed, a soul, or the original pattern of a being; it symbolises the continuous activity that keeps a living form integrated once that form has begun to manifest.",
                    "Its four interlocking currents express the principal movements of living organisation: reception, circulation, assimilation and renewal. Each current bends back into the others, showing that life does not proceed in a straight line — it continually returns its products to the whole. What is received is transformed; what is transformed becomes nourishment for further life.",
                    "The pointed upper and lower poles establish a living axis. The upper point suggests inward reception and formative guidance, while the lower point indicates embodiment, posture and rooted presence; between them the lateral curves create mobility and exchange. So the seal combines vertical orientation with circulating movement: a living being possesses both an enduring posture and the capacity to adapt.",
                    "The central black opening is essential. It is not a seed or an object hidden inside the organism. It represents the living interior — the open centre around which the organism continually reorganises itself. Life preserves identity without becoming completely closed or rigid.",
                    "The seal is emerald or deep viridian green because Life Ether belongs to active vitality, restoration, growth and organic coherence. That distinguishes it from the violet Morphaithēric Seed, which carries concentrated formative identity, and from the pale opaline Morphaithēr, which holds universal formative possibility.",
                  ],
                  againstHead: "Life Ether is opposed to Earth in a precise way.",
                  against: [
                    ["Earth fixes form into position.", "Life Ether gives that form inner mobility."],
                    ["Earth provides structural resistance.", "Life Ether circulates, repairs and renews within that structure."],
                  ] as [string, string][],
                  close:
                    "In the full etheric sequence Warmth awakens, Light differentiates, Tone relates and Life integrates. The Life Ether seal therefore represents neither the origin nor the blueprint of a being, but the power through which its many parts remain one living being across time.",
                  principle: "Life is the continuous restoration of wholeness through change.",
                },
                translit: "Zōē",
                english: "Life Ether",
                verb: "regenerates",
                corr: "Prithivi · Γῆ",
                t: "prithivi" as TattvaKey,
                el: "Earth" as ElementKey,
                title: "Integration, Renewal, and Regeneration",
                fn: "The function through which differentiated and coordinated relations become an enduring whole capable of renewal.",
                quote: "Life without renewed relation to Source becomes self-perpetuation.",
                lines: [
                  "Life is not the sum of correctly arranged parts. An organism exchanges its substance continually and remains recognisably itself: the matter changes, the relations carry the pattern through time.",
                  "The whole is not imposed from outside. It emerges through participation and then conditions the parts in return — organisation becomes recursive, held by regeneration rather than by static preservation. Organs remain distinct and become functions of one organism.",
                  "Psychically this is integration: not the suppression of contradiction but a centre able to hold diverse powers in meaningful relation, and to metabolise experience without continually fragmenting beneath it.",
                  "Death appears here not as Life’s opposite but as one of its internal operations. Cells die so tissue may form; leaves fall and become nourishment; a habit dissolves so a more adequate participation can emerge. Life preserves itself partly through selective endings.",
                  "A distorted whole can be preserved with remarkable effectiveness — an obsession recruiting thought, memory, and desire into its continuation; an institution defending an identity whose original virtue is long gone.",
                ],
                deficiency:
                  "Fragmentation, exhaustion, the inability to carry gains from one moment into the next.",
                virtue: "regenerative wholeness",
                gloss:
                  "Preserve identity through exchange, incorporate what nourishes, release what obstructs, repair what has been injured, and reopen the whole to further transformation.",
                excess:
                  "Enclosure, assimilation, resistance to necessary transformation — a whole that defends itself against the change it requires.",
                into: {
                  to: "Θερμότης",
                  passage: "Continuity preserves the capacity for further activation.",
                  drift: "Where the interval collapses: a living order is preserved that ought to have been transformed — self-perpetuation standing in for renewal.",
                },
              },
            ].map((e, i) => (
              <div key={e.english}>
                <article className="group border border-border p-5 transition-colors hover:border-gold/40 sm:p-7">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)] lg:gap-10">
                    <div>
                      <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                        {e.n} · {e.english}
                      </p>
                      <h3 className="mt-3 flex items-center gap-3.5 font-serif text-3xl leading-none text-bone sm:text-4xl">
                        <Seal k={e.sign} size={44} className="shrink-0 text-gold/65" decorative />
                        {e.greek}
                      </h3>
                      <p className="mt-3 font-serif text-lg italic text-gold/80">
                        {e.translit} · {e.verb}
                      </p>
                      <div className="mt-6 h-px w-12 bg-gold/40 transition-all duration-700 group-hover:w-24" />
                      <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        <span>§ III ·</span>
                        <TattvaGlyph dominant={e.t} size={15} className="shrink-0" decorative />
                        <span>{e.corr.split(" · ")[0]} ·</span>
                        <ElementSign k={e.el} size={17} className="shrink-0 text-gold/70" decorative />
                        <span lang="el" className="scr-greek">{e.corr.split(" · ")[1]}</span>
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                        {e.title}
                      </p>
                      <p className="mt-4 font-serif text-base leading-relaxed text-bone/85 sm:text-lg">
                        {e.fn}
                      </p>
                      {e.quote ? (
                        <p className="mt-5 border-l border-gold/40 pl-5 font-serif text-base italic leading-relaxed text-bone/90 sm:text-lg">
                          “{e.quote}”
                        </p>
                      ) : null}
                      <div className="mt-5 space-y-2">
                        {e.lines.map((l) => (
                          <p key={l} className="text-sm leading-relaxed text-muted-foreground">
                            {l}
                          </p>
                        ))}
                      </div>
                      {e.seal ? (
                        <div className="mt-8 border-t border-border pt-6">
                          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                            <span lang="el" className="scr-greek">Σφραγίς</span> · The seal
                          </p>
                          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
                            <Seal k={e.sign} size={72} className="shrink-0 text-gold/70" title={`${e.english} — ${e.seal.name}`} />
                            <div className="min-w-0">
                              <p className="font-serif text-lg italic text-gold">{e.seal.name}</p>
                              {(Array.isArray(e.seal.reading) ? e.seal.reading : [e.seal.reading]).map((para) => (
                                <p key={para.slice(0, 40)} className="mt-2 text-sm leading-relaxed text-muted-foreground">{para}</p>
                              ))}
                              {"againstHead" in e.seal && (
                                <p className="mt-5 text-sm leading-relaxed text-bone/85">{e.seal.againstHead}</p>
                              )}
                              {"against" in e.seal && e.seal.against && (
                                <div className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-x-6">
                                  {e.seal.against.map(([earth, life]) => (
                                    <div key={earth} className="border-t border-border pt-3">
                                      <p className="text-sm leading-relaxed text-bone/60">{earth}</p>
                                      <p className="mt-1 text-sm leading-relaxed text-bone/85">{life}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {"close" in e.seal && (
                                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{e.seal.close}</p>
                              )}
                              {"principle" in e.seal && (
                                <p className="mt-5 font-serif text-lg italic leading-relaxed text-bone/90">{e.seal.principle}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Measure — deviation on either side of the named virtue */}
                  {e.virtue ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-6">
                      <div className="border-t border-border pt-5">
                        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          <span lang="el" className="scr-greek">Ἔλλειψις</span> · Deficiency
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {e.deficiency}
                        </p>
                      </div>
                      <div className="border-t border-gold/60 pt-5">
                        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                          <span lang="el" className="scr-greek">Μεσότης</span> · Virtue
                        </p>
                        <p className="mt-3 font-serif text-lg italic text-bone/90">“{e.virtue}”</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {e.gloss}
                        </p>
                      </div>
                      <div className="border-t border-border pt-5">
                        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          <span lang="el" className="scr-greek">Ὑπερβολή</span> · Excess
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {e.excess}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </article>

                {i < 3 ? (
                  <div className="flex flex-col items-center px-2 py-7 text-center">
                    <span className="h-7 w-px bg-gradient-to-b from-transparent to-gold/50" />
                    <p className="mt-4 font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                      <span lang="el" className="scr-greek">Διάστημα</span> {["I", "II", "III"][i]} · <span lang="el" className="scr-greek">{e.greek}</span>{" "}
                      <ArrowMark className="text-gold" /> <span lang="el" className="scr-greek">{e.into.to}</span>
                    </p>
                    <p className="mt-3 max-w-xl font-serif text-base italic leading-relaxed text-bone/85 sm:text-lg">
                      {e.into.passage}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {e.into.drift}
                    </p>
                    <span className="mt-4 h-10 w-px bg-gradient-to-b from-gold/50 to-transparent" />
                  </div>
                ) : (
                  <div className="mt-12 border border-gold/25 p-6 sm:p-10">
                    <div className="grid items-center gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-12">
                      <svg
                        viewBox="0 0 120 120"
                        className="mx-auto h-auto w-32 shrink-0 sm:w-40"
                        aria-hidden
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="var(--border)"
                          strokeWidth="0.8"
                        />
                        <path
                          d="M 67.6 16.7 A 44 44 0 1 1 52.4 16.7"
                          fill="none"
                          stroke="var(--gold)"
                          strokeOpacity="0.55"
                          strokeWidth="1.2"
                        />
                        <polygon
                          points="54.4,16.4 47.2,21.7 45.8,13.9"
                          fill="var(--gold)"
                          fillOpacity="0.8"
                        />
                        <circle
                          cx="60"
                          cy="16"
                          r="16"
                          fill="none"
                          stroke="var(--gold)"
                          strokeOpacity="0.35"
                          strokeWidth="0.6"
                          className="animate-breathe"
                        />
                        {[
                          { t: "Θ", x: 60, y: 16 },
                          { t: "Φ", x: 104, y: 60 },
                          { t: "Τ", x: 60, y: 104 },
                          { t: "Ζ", x: 16, y: 60 },
                        ].map((node) => (
                          <g key={node.t}>
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r="10"
                              fill="var(--background)"
                              stroke="var(--gold)"
                              strokeOpacity="0.5"
                              strokeWidth="0.8"
                            />
                            <text
                              x={node.x}
                              y={node.y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontFamily="EB Garamond, serif"
                              fontSize="12"
                              fill="var(--gold)"
                            >
                              {node.t}
                            </text>
                          </g>
                        ))}
                      </svg>
                      <div className="min-w-0">
                        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                          <span lang="el" className="scr-greek">Διάστημα</span> IV · The Return to <span lang="el" className="scr-greek">{e.into.to}</span>
                        </p>
                        <p className="mt-6 font-serif text-2xl italic leading-tight text-bone/90 sm:text-3xl">
                          “Life completes the cycle by preserving the power to{" "}
                          <span className="text-gold">begin again</span>.”
                        </p>
                        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                          {e.into.passage} Life bends the Fourfold Field back toward its beginning:
                          the living whole becomes the vessel of new potential, and the circuit
                          reopens at Warmth on more developed ground.
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {e.into.drift}
                        </p>
                        <a
                          href="#fourfold"
                          className="mt-8 inline-flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim transition-colors hover:text-gold"
                        >
                          <CycleMark className="h-[1em] w-[1em] text-base" />
                          Begin again at I · <span lang="el" className="scr-greek">Θερμότης</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Forward pointer */}
          <div className="mx-auto mt-24 max-w-3xl border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/85">
            The cycle does not always run smoothly. Activation may precede orientation;
            differentiation may outrun integration; coordination may harden into repetition; a
            living system may preserve an order that ought to be transformed. Each ether supports
            or distorts the others according to measure, timing, and the condition of the vessel.
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The Fourfold Field describes what the formative field does — not the direction in which
            its operations are inclined. For that, the architecture must turn toward tattva and
            guna, toward the limiting vessel, and toward the traces left by previous formation.
          </p>
        </div>
      </section>

      {/* MORPHAITHER */}
      <section id="morphaither" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/tide-patterns-on-grey-strand.webp" opacity={0.2} position="center 55%" />
        <SectionGlyph delay={-15} />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                § V · The Morphaithēr
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Μορφαιθήρ
              </h2>
              <p className="mt-4 font-serif text-lg italic text-gold-dim">
                The living formative atmosphere
              </p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Etheric currents, tattvic qualities, elemental tendencies, psychic impressions,
                and inherited patterns do not act separately. Their interaction produces a
                formative atmosphere surrounding and penetrating a being, place, ritual, culture,
                or event.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                It is less a thing than a continuously changing ecology of formative influence.
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Where it is felt
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { place: "Courtroom", note: "Posture, register of speech, and the weight given to a sentence." },
                  { place: "Temple", note: "Attention narrows, gesture slows, silence acquires meaning." },
                  { place: "Hospital", note: "Time is measured differently; the body becomes the object of regard." },
                  { place: "Battlefield", note: "Perception sharpens to threat; deliberation collapses into reflex." },
                  { place: "Childhood home", note: "Old postures return unbidden; inherited patterns resume." },
                  { place: "Marketplace", note: "Exchange, appraisal, and the constant estimation of worth." },
                ].map((x) => (
                  <div
                    key={x.place}
                    className="group border border-border p-4 transition-colors hover:border-gold/40"
                  >
                    <div className="font-label text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                      {x.place}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                People behave differently in different environments without consciously deciding
                to. The field inclines the forms arising within it — but it does not compel them.
              </p>
            </div>
          </div>
        
          {/* the hidden layer this section opens onto */}
          <div className="relative mt-16 border-t border-gold/30 pt-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">A hidden layer</p>
            <Link to="/ecology/morphaither" className="group mt-4 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-2xl leading-tight text-bone transition-colors group-hover:text-gold">
                This section opens onto the Hidden Ecology of Formation
              </span>
              <CrossMark className="text-gold/70" />
            </Link>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The living formative atmosphere is the first station of a circulation — weather, nourishment, circulation, vessel, inheritance, memory — asked its governing question there: under what conditions does becoming occur?
            </p>
          </div>
        </div>
      </section>

      {/* RETURN */}
      <section id="return" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/bird-murmuration-spiral-over-lake.webp" opacity={0.29} position="center 45%" scrim={0.3} />
        <SectionGlyph delay={-60} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold">
                <span lang="el" className="scr-greek">Ἐπιστροφή</span> · The Second Movement
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                The Return <span className="italic text-gold">through Reading</span>
              </h2>
            </div>
            <div className="shrink-0 font-label text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              V Principles
            </div>
          </div>

          <p className="mb-16 max-w-2xl font-serif text-lg italic leading-relaxed text-muted-foreground">
            Form bears trace. Trace reveals signature. Signature becomes symbol. Symbol discloses
            correspondence. Correspondence opens transformation — the return of visible form to
            hidden origin.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ret.map((p) => (
              <PrincipleCard key={p.latin} p={p} accent="return" />
            ))}
          </div>
        </div>
      </section>

      {/* SEED EXAMPLE */}
      <section id="seed" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/great-roots-gripping-cliff-edge.webp" opacity={0.16} position="center 45%" />
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
              § VI · A Worked Example
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              The seed as <span className="italic text-gold">metaphysical event</span>
            </h2>
          </div>
          <div className="space-y-6 font-serif text-lg leading-relaxed text-bone/80">
            <p>
              A seed contains <em className="text-gold">ousia</em> — its inward nature, the physis
              of the plant it may become. That essence bears <em className="text-gold">dynamis</em>:
              the hidden potency to root, rise, leaf, flower, and fruit.
            </p>
            <p>
              But the seed does not manifest at all times. <em>Aithēr</em> gives the field of
              possibility. <em>Rhythmos</em> determines season and activation. <em>Tattvas</em>
              {" "}provide warmth, moisture, expansion. <em>Energeia</em> becomes active in
              germination. <em>Logos</em> guides morphology. <em>Stoicheia</em> provide the
              elemental body. <em>Hylē</em> receives. <em>Morphē</em> appears as the plant.
            </p>
            <p>
              The plant then bears <em className="text-gold">ichnos</em>. These traces reveal
              {" "}<em className="text-gold">charaktēr</em>. Signature flowers as
              {" "}<em className="text-gold">symbolon</em> — rose becomes love, thorn, beauty,
              sacrifice, unfolding. Symbol enters <em className="text-gold">sympatheia</em>: rose
              with Venus, heart, desire, devotion. Through correspondence,
              {" "}<em className="text-gold">metamorphōsis</em> becomes possible — medicine,
              ritual, contemplation, healing.
            </p>
          </div>
        </div>
      </section>

      {/* KABBALAH */}
      <section id="kabbalah" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/waterfall-chamber-behind-stone-arches.webp" opacity={0.45} position="center 35%" />
        <SectionGlyph />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                § VII · Kabbalah
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                The sacred grammar of <span className="italic text-gold">emanation</span>
              </h2>
              <p className="mt-8 font-label text-[11px] uppercase tracking-[0.25em] text-gold-dim">
                אֵין סוֹף · Ein Sof
              </p>
              <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
                Kabbalah does not replace the system. It reveals one of its deepest symbolic
                skeletons — a sacred alphabet, a tree of descent, a ladder of worlds, and a
                doctrine of vessels.
              </p>
            </div>
            <div className="space-y-6 font-serif text-lg leading-relaxed text-bone/80">
              <p>
                Where the system speaks of <em className="text-gold">Source</em>, Kabbalah speaks
                of <em>Ein Sof</em> — the boundless origin beyond direct comprehension. Where the
                system speaks of the first limitation necessary for form, Kabbalah speaks of
                {" "}<em>tzimtzum</em>, the contraction or concealment that allows finite reality
                to appear. Where the system speaks of virtue, force, and pattern, Kabbalah speaks
                of the <em className="text-gold">sefirot</em>: vessels of divine quality through
                which hidden infinity becomes ordered power.
              </p>
              <p>
                The Tree of Life is therefore not merely a diagram of symbols. It is a map of
                hidden force descending into form and returning through consciousness — light
                enters vessel, force enters pattern, pattern enters element, element becomes form.
              </p>
            </div>
          </div>

          {/* Tree of Life */}
          <KabbalahFigure />

          {/* Four Worlds */}
          <div className="mt-24">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              אַרְבָּעָה עוֹלָמוֹת · The Four Worlds
            </p>
            <h3 className="mt-6 font-serif text-3xl leading-tight">
              A vertical scale for the <span className="italic text-gold">architecture</span>
            </h3>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { he: "אֲצִילוּת", en: "Atzilut", g: "Emanation", mapping: "Source · Spirit" },
                { he: "בְּרִיאָה", en: "Beriah", g: "Creation", mapping: "Essence · Virtue" },
                { he: "יְצִירָה", en: "Yetzirah", g: "Formation", mapping: "Ether · Tide · Tattva · Force · Pattern" },
                { he: "עֲשִׂיָּה", en: "Assiah", g: "Action", mapping: "Element · Matter · Form · Trace · Signature" },
              ].map((w, i) => (
                <div key={w.en} className="relative border border-border p-6">
                  <div className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                    World {["I", "II", "III", "IV"][i]}
                  </div>
                  <div className="mt-4 font-serif text-3xl text-gold">{w.he}</div>
                  <div className="mt-2 font-serif text-xl italic">
                    {w.en} <span className="text-muted-foreground">· {w.g}</span>
                  </div>
                  <div className="mt-6 h-px w-8 bg-gold/40" />
                  <p className="mt-4 font-serif text-sm leading-relaxed text-bone/75">
                    {w.mapping}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* the vocabulary, in Hebrew */}
          <div className="mt-24">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              אוֹצָר · The words themselves
            </p>
            <h3 className="mt-6 font-serif text-3xl leading-tight">
              What the tradition <span className="italic text-gold">actually says</span>
            </h3>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Every term this section borrows is a Hebrew word with a life of its own, and most of
              them are Lurianic — sixteenth-century Safed, not ancient. Set beside their English
              renderings they are harder to romanticise: a contraction is a contraction, a shell is
              a shell, and repair is what you do to something broken.
            </p>
            <div className="mt-8 max-w-4xl">
              <TermRegister terms={KABBALAH_TERMS} />
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/60">
              A convention worth naming: the biblical words are set with their vowel points, as a
              printed Bible sets them, and the later technical terms are set unpointed, as the
              Kabbalistic literature itself sets them. The site&rsquo;s English spellings of the
              sefirot follow its own diagrams — Chochmah, Malchut — rather than a scholarly
              transliteration, and are left that way for consistency with them.
            </p>
          </div>

          {/* Hebrew Letters */}
          <div className="mt-24 grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                אוֹתִיּוֹת · The Formative Letters
              </p>
              <h3 className="mt-6 font-serif text-3xl leading-tight">
                Not marks — <span className="italic text-gold">cosmic vessels</span>
              </h3>
              <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-bone/80">
                The Hebrew letters deepen the meaning of <em className="text-gold">Pattern</em>
                {" "}and <em className="text-gold">Symbol</em>. They are formative signs — vessels
                of sound, number, shape, and force. Through them, the hidden architecture becomes
                speakable, writable, and operative. Reality is not an accidental heap of objects,
                but a written cosmos: an ordered emanation.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 self-center font-serif text-3xl text-gold sm:text-4xl">
              {"אבגדהוזחטיכלמנסעפצקרשת".split("").map((l, i) => (
                <span
                  key={i}
                  className="opacity-60 transition-all duration-500 hover:scale-125 hover:text-bone hover:opacity-100"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXTENDED — hidden powers */}
      <section id="extended" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/mycelium-threading-forest-litter.webp" opacity={0.67} position="center 55%" scrim={0.2} />
        <SectionGlyph delay={-45} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold">
                § VIII · The Hidden Powers
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                The extended <span className="italic text-gold">architecture</span>
              </h2>
            </div>
            <div className="shrink-0 font-label text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              XI Principles
            </div>
          </div>

          <p className="mb-16 max-w-3xl font-serif text-lg italic leading-relaxed text-muted-foreground">
            Between Source and Form, and between Form and Return, the architecture is threaded by
            further hidden principles. They are not additions but articulations — the deeper joints
            by which force becomes intelligible, containable, and transformable.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { greek: "Ἐναντία · Συζυγία", latin: "Enantia · Syzygia", english: "Polarity", summary: "The first tension by which hidden unity becomes dynamic. Not conflict but productive pairing — light and dark, active and receptive, sulfur and mercury — the charged relation from which movement is born." },
              { greek: "Πέρας · Ὅρος", latin: "Peras · Horos", english: "Limit", summary: "The first mercy of form. By boundary, the indefinite becomes definite; nothing can appear without some horizon of containment. Saturn, Gevurah, Salt — the discipline that makes manifestation possible." },
              { greek: "Μέτρον · Ἁρμονία", latin: "Metron · Harmonia", english: "Measure", summary: "Right proportion. The art by which powers are placed into relation — the difference between noise and music, mass and architecture. Too much force breaks the vessel; too little fails to animate it." },
              { greek: "Ἀγγεῖον · Ὑποδοχή", latin: "Angeion · Hypodochē · Keli", english: "Vessel", summary: "The receptacle that shapes what it receives. Body, cup, womb, temple, sigil, organ, soul — a distorted vessel distorts the force; a purified vessel clarifies it; a properly measured vessel reveals it." },
              { greek: "Ψυχή", latin: "Psychē", english: "Soul", summary: "The mediating interior life — animation, image, memory, desire. The bridge between spirit and body where the outer world becomes inwardly alive, and where distortion can enter or be refined." },
              { greek: "Φαντασία · Εἰκών", latin: "Phantasia · Eikōn", english: "Imagination", summary: "Not fantasy but the soul's formative organ. Subtle form — the way invisible powers become inwardly visible through dream, myth, vision, and ritual image, before they become physically obvious." },
              { greek: "Θεουργία", latin: "Theurgia", english: "Theurgy", summary: "The art of right participation in divine order. Disciplined alignment of the human vessel with higher principles — the highest invoked first, so that lower forces are ordered rather than inflated." },
              { greek: "Ὀρθὴ Σχέσις", latin: "Orthē Schesis", english: "Right Relation", summary: "The art of placing each thing according to its nature, scale, and purpose. Harmony of hierarchy without tyranny, polarity without fragmentation, embodiment without imprisonment." },
              { greek: "Κυκλοφορία", latin: "Kyklophoria", english: "Circulation", summary: "Reality is not a one-way descent. Force descends into form; form becomes conscious; consciousness recognizes the hidden force within form; the force is purified and returned toward Source. Solve et coagula." },
              { greek: "Τέλος", latin: "Telos", english: "Fulfillment", summary: "The direction of completion inscribed in every essence. The rose fulfills itself by becoming fully rose; the human by becoming a transparent vessel of rightly ordered spirit, soul, virtue, and action." },
              { greek: "Μέλας Αἰθήρ", latin: "Melas Aithēr", english: "Black Aether", summary: "The apophatic seam. Not darkness as evil but the dark translucency at the edge of manifestation — the mystery of boundary as both concealment and revelation, where the vessel becomes transparent to the ungraspable." },
            ].map((p) => (
              <article
                key={p.latin}
                className="group relative overflow-hidden border border-border bg-void/40 p-8 backdrop-blur-sm transition-colors hover:bg-clay/40 sm:p-10"
              >
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <span className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                    Hidden Power
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {p.english}
                  </span>
                </div>
                <h3 className="font-serif text-3xl leading-tight text-bone sm:text-4xl">
                  {p.greek}
                </h3>
                <p className="mt-2 font-serif text-lg italic text-gold/80">{p.latin}</p>
                <div className="my-6 h-px w-12 bg-gold/40 transition-all duration-700 group-hover:w-24" />
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {p.summary}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-3xl border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/85">
            Distortion occurs when process is interrupted, inverted, or mismeasured. A force
            without measure becomes violence. A vessel without spirit becomes dead structure.
            Spirit without vessel becomes dissipation. Symbol without participation becomes empty
            sign. Transformation without telos becomes mere mutation. Right Relation restores the
            circuit.
          </div>
        </div>
      </section>

      {/* THE PSYCHIC FLYWHEEL */}
      <section id="flywheel" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/great-flywheel-in-rock-cut-hall.webp" opacity={0.5} position="center 45%" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § IX · The Psychic Flywheel
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Repetition becomes <span className="italic text-gold">momentum</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A thought generates an emotional response. The emotion directs attention toward
            confirming perceptions. Those perceptions strengthen the original thought. Repetition
            makes the circuit increasingly automatic.
          </p>

          <div className="mt-12 grid gap-3 sm:grid-cols-4">
            {[
              { n: "1", t: "Thought", d: "A passing movement arises." },
              { n: "2", t: "Emotion", d: "The movement acquires charge and direction." },
              { n: "3", t: "Attention", d: "Perception is steered toward what confirms it." },
              { n: "4", t: "Momentum", d: "The circuit closes and begins to turn itself." },
            ].map((x) => (
              <div key={x.n} className="group border border-border p-4 transition-colors hover:border-gold/40">
                <div className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  {x.n}
                </div>
                <div className="mt-2 font-serif text-lg italic text-bone">{x.t}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Reservoirs as attractors
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A tattvic reservoir is not a tank of subtle fluid. It is an accumulated condition
                making certain expressions more probable. A room habituated to conflict becomes
                disposed toward fiery reaction; a contemplative chamber toward stillness; a person
                habituated to anxiety toward anxious interpretation. Reservoirs draw fluctuating
                activity toward familiar configurations.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                This does not require that thought magically govern outward events. It means
                thought, feeling, attention, body, behavior, and environment become coupled into
                a self-reinforcing system.
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                <span lang="el" className="scr-greek">Ἥλιος Ἐντός</span> · The Inner Sun
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A divided person disperses force. One part desires what another fears; one part
                imagines what another refuses to enact — several animals pulling a chariot in
                opposing directions. The chariot is made literal in § XVI.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                When thought, desire, imagination, speech, and embodied action coordinate around a
                shared center, less is lost to internal contradiction. The Inner Sun is that
                organizing center — holding diverse faculties in relation without erasing their
                differences.
              </p>
              <p className="mt-6 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                Coherence, not intensity, is the measure of causal reach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE ALCHEMICAL TRIAD */}
      <section id="triad" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/copper-alembic-still-in-stone-workshop.webp" opacity={0.38} position="center 50%" />
        <SectionGlyph delay={-45} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § X · The Alchemical Triad
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Something that <span className="italic text-gold">acts</span>, something that{" "}
            <span className="italic text-gold">communicates</span>, something that{" "}
            <span className="italic text-gold">retains</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Sulfur, Mercury, and Salt do not claim that every object contains three occult
            chemicals. They name three recurrent necessities of transformation — in laboratory,
            psyche, body, society, and art alike.
          </p>

          <div className="mt-14">
            <TheTriad />
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[
              { greek: "Θεῖον", latin: "Sulphur", en: "Sulfur", role: "Impulse", d: "The driving difference — desire, heat, pressure, appetite, intention, catalytic intensity. It initiates and intensifies.", without: "Without Sulfur, nothing is initiated." },
              { greek: "Ὑδράργυρος", latin: "Mercurius", en: "Mercury", role: "Mediation", d: "Mobility and exchange — circulation, translation, adaptation, communication. It joins what was separate.", without: "Without Mercury, nothing is transmitted or recombined." },
              { greek: "Ἅλς", latin: "Sal", en: "Salt", role: "Fixation", d: "Stabilization — boundary, embodiment, memory, habit, structure, preservation. It limits and endures.", without: "Without Salt, nothing endures." },
            ].map((x) => (
              <div key={x.en} className="group border border-border p-5 transition-colors hover:border-gold/40">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-serif text-2xl text-gold">{x.greek}</div>
                  <div className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {x.role}
                  </div>
                </div>
                <div className="mt-3 font-serif text-lg italic text-bone">
                  {x.en} <span className="text-muted-foreground">· {x.latin}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                <p className="mt-4 border-t border-border pt-3 font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                  {x.without}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <div className="border border-border p-6">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Solve
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The old configuration is loosened, its forces separated and understood.
                <span className="mt-3 block text-bone/80">
                  Solve without coagula produces dispersion.
                </span>
              </p>
            </div>
            <div className="border border-border p-6">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Coagula
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Its viable contents are recombined around a more coherent center.
                <span className="mt-3 block text-bone/80">
                  Coagula without solve produces imprisonment.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE RETENTIVE DEPTH */}
      <section id="retentive" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/layered-strata-in-dark-passage.webp" opacity={0.45} position="center 50%" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XI · The Retentive Depth
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The world <span className="italic text-gold">inherits itself</span>
          </h2>

          <div className="relative isolate mt-12 grid gap-16 lg:grid-cols-2">
            <Backdrop src="/bg/peat-cliff-above-still-lake.webp" opacity={0.26} position="center 55%" scrim={0.22} />
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                <span lang="el" className="scr-greek">Κρύπτη</span> · The Crypt of Primordial Memory
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Not a warehouse of perfect historical images. The retentive depth of causation —
                the persistence of consequences after the originating form has vanished.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Memory exists at more than one level. Organisms preserve developmental histories;
                bodies acquire habits; institutions retain procedures; landscapes bear traces of
                prior activity; languages preserve ancient distinctions; cultures inherit symbols
                whose origins their members no longer understand.
              </p>
              <p className="mt-6 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                Once something has occurred, the world is no longer identical to the world in
                which it had not occurred.
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                <span lang="el" className="scr-greek">Ὀστοφυλάκιον</span> · The Ossuary of Living Forms
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Nature retains no obligation to preserve every vessel, yet it does not begin again
                from nothing. Perished forms return their matter, structure, experience, and
                formative consequences to the larger field.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                When an organism dies its unified operation ends, but its components and
                consequences continue. Its matter enters other systems. Its actions remain within
                other lives. Its symbolic effects may outlast its body by centuries.
              </p>
              <p className="mt-6 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                Death is dissolution of a particular vessel, not erasure of everything that passed
                through it.
              </p>
            </div>
          </div>
        
          {/* the hidden layer this section opens onto */}
          <div className="relative mt-16 border-t border-gold/30 pt-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">A hidden layer</p>
            <Link to="/ecology/crypt" className="group mt-4 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-2xl leading-tight text-bone transition-colors group-hover:text-gold">
                This section opens onto the Hidden Ecology of Formation
              </span>
              <CrossMark className="text-gold/70" />
            </Link>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The Crypt and the Ossuary are two stations of the Hidden Ecology, told apart there and set in the circulation that runs from Morphaithēr through the Sap of Heaven and Etheric Hydrology to living form, and back one level on.
            </p>
          </div>
        </div>
      </section>

      {/* THE LAWS OF FORMATION */}
      <section id="laws" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/nurse-log-in-foggy-forest.webp" opacity={0.16} position="center 55%" />
        <SectionGlyph delay={-70} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XII · The Laws of Formation
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            How forms <span className="italic text-gold">receive</span>, endure, distort, and{" "}
            <span className="italic text-gold">return</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The preceding sections describe how forms arise. These describe what happens
            afterward — how a form takes in influence, holds itself together, goes wrong,
            crosses a threshold, and gives its contents back to the field.
          </p>

          {[
            {
              group: "Boundary and Exchange",
              items: [
                { t: "Selective Permeability", d: "Every enduring form requires a boundary, but no living boundary can be absolutely closed. Complete openness dissolves; complete closure starves. Identity exists through regulated exchange — a vessel is not a container but a gatekeeping intelligence. The cell membrane is the exact image: it distinguishes the cell from its environment while admitting selected substances, signals, and energies. The psyche works the same way — open enough to receive experience, structured enough not to be overwhelmed by it.", note: "Salt establishes the boundary; Mercury governs what crosses; Sulfur supplies the pressure." },
                { t: "Transduction", d: "Influence rarely passes between levels without changing its mode of expression. A principle becomes an image, the image an emotion, the emotion a posture, the posture an act. A subtle pattern does not travel intact like a package — it is re-expressed by each medium it passes through.", note: "Which is why higher influence is so often distorted: a genuine intuition becomes an inaccurate image, the image an inflated emotion, the emotion a destructive act. Every passage admits either clarification or corruption — and the fault may lie in the vessel's translation, not in the originating principle." },
                { t: "Formative Metabolism", d: "Every sustained form must receive, transform, retain, and release. A mind metabolizes perception and memory; a culture metabolizes events into law and story; a ritual space metabolizes what is repeatedly enacted within it.", note: "A fear complex has intake, transformation, self-maintenance, and output. It behaves like an organism because structurally it is one." },
              ],
            },
            {
              group: "Endurance and Change",
              items: [
                { t: "Metastable Form", d: "Forms are not simply stable or unstable. Many endure for long periods while remaining open to reorganization — held in place by feedback that continually restores the familiar arrangement, yet displaceable by sufficient disruption.", note: "Form is not static substance. It is an actively maintained settlement among competing forces." },
                { t: "Accumulation and Threshold", d: "Change accumulates gradually and appears suddenly. Water warms and then boils; tension builds along a fault; a practice seems inert for months and then reorganizes perception — not because the last act was extraordinary, but because the structure had reached readiness.", note: "Transformation is discontinuous in appearance, continuous in preparation." },
                { t: "Formative Inertia", d: "Water flowing repeatedly over land cuts a channel, and later water follows it though the original water is gone. Habits, institutions, traumas, and buildings cut comparable channels.", note: "Memory is not only retained content. It is inherited curvature in the field of becoming." },
                { t: "Irreversibility", d: "Dissolution does not restore what existed before. Ashes hold a book's matter but not its organization; a reconciled relationship is not one that was never damaged. Solve is not a clean reversal of coagula.", note: "Possibility becomes actuality; actuality leaves consequences; consequences modify what is possible next." },
              ],
            },
            {
              group: "Structure and Relation",
              items: [
                { t: "The Ontological Gradient", d: "Between pure possibility and completed actuality lie degrees: abstract possibility, qualitative tendency, latent disposition, emerging configuration, actualized event, stabilized form, residual influence after dissolution.", note: "This is what \u201csubtle\u201d means — not a faint object hidden in space, but direction and structure without full embodiment." },
                { t: "Nested Fields, Relative Centers", d: "Every form is a whole to its parts and a part within a greater whole. No center is wholly isolated; none is merely illusory. Each holds autonomy in proportion to its capacity to maintain organization.", note: "Causation runs both ways: parts sustain wholes, wholes constrain parts. Neither level suffices alone." },
                { t: "Resonance as Selection", d: "Resonance is not a universal solvent for every resemblance. Its coherent function is selective amplification — it does not create the pattern, it strengthens what the vessel can already receive. Genuine operation requires structural compatibility, a channel of coupling, sufficient duration, and receptivity.", note: "This is what keeps correspondence from becoming arbitrary." },
              ],
            },
            {
              group: "Cost and Shadow",
              items: [
                { t: "The Cost of Form", d: "To actualize one form is to exclude others. Carved stone can no longer become every figure it might have been; a word gains precision by surrendering meanings. Every act of formation entails sacrifice.", note: "Not tragic — without exclusion nothing definite could appear. But it explains why manifestation leaves remainder. Alchemy becomes the art of discerning which limitations are necessary vessels and which have become unnecessary prisons: solve loosens a configuration so its excluded contents can be reconsidered, coagula establishes one able to express a wider range." },
                { t: "The Shadow of Selection", d: "Because every form selects, every formation casts a shadow: whatever the established order cannot presently hold. It is not automatically evil. A disciplined identity may exclude spontaneity; a peaceful community may suppress rather than reconcile conflict.", note: "The excluded does not vanish. It gathers at the boundary and returns through dream, symptom, compulsion, or disruption." },
              ],
            },
            {
              group: "Measure and Aim",
              items: [
                { t: "Integral and Parasitic Coherence", d: "Coherence alone is not goodness. A tumor is organized. An obsession is coherent. A destructive ideology coordinates thousands around a stable center. Local coherence organizes a limited structure at its host's expense; integral coherence strengthens the form while preserving its viable relations with the greater systems it belongs to.", note: "A healthy form shows selective permeability, adaptability, generativity, proportion, and the capacity to receive correction." },
                { t: "Proportional Integration", d: "No quality perfects a form by being maximized. Too much stability is rigidity; too much Mercury, dispersion; too much Sulfur, inflammation; too much openness, dissolution. No tattva is superior — each is constructive or destructive by proportion, placement, and timing.", note: "The perfected vessel is not one holding only higher qualities, but one where differentiated powers hold their proper measures." },
                { t: "Telos as Attractor", d: "Purpose need not mean predetermination. A seed contains no miniature tree, yet its development is not directionless — present activity is organized in relation to a possible mature form. The future does not reach backward; an apprehended possibility shapes present selection.", note: "Theurgy becomes the deliberate installation of a higher attractor within the human field." },
              ],
            },
            {
              group: "Operation",
              items: [
                { t: "Symbolic Causation", d: "A symbol is neither decoration nor supernatural machine. It reorganizes perception by compressing many relations into one apprehensible form — a flag coordinating emotion, a ring altering the meaning of behavior, a sacred image reordering attention, posture, memory, and intention at once.", note: "Ritual is engineered symbolic causation. Its power depends on the depth of integration among its factors, not on correct recitation." },
                { t: "Temporal Architecture", d: "Formation depends not only on which forces act but when and in what order. The same intervention heals at one stage and disrupts at another. Every form has rhythms, phases, windows of receptivity, moments of crisis, intervals of consolidation.", note: "This grounds kairos — the qualitative fitness of a moment. Timing is part of structure." },
              ],
            },
          ].map((cluster) => (
            <div key={cluster.group} className="mt-16">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                {cluster.group}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {cluster.items.map((x) => (
                  <div
                    key={x.t}
                    className="group border border-border p-5 transition-colors hover:border-gold/40"
                  >
                    <div className="font-serif text-lg italic text-bone">{x.t}</div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                    <p className="mt-4 border-t border-border pt-3 text-sm italic leading-relaxed text-bone/70">
                      {x.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* The safeguard */}
          <div className="relative isolate mt-20 border-l border-gold/40 pl-8">
            <Backdrop src="/bg/reed-beds-and-still-water-at-dawn.webp" opacity={0.3} position="center 50%" scrim={0.22} />
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The Safeguard · No Vessel Exhausts the Field
            </p>
            <p className="mt-5 max-w-4xl font-serif text-2xl italic leading-relaxed text-bone">
              No form, symbol, doctrine, institution, or consciousness can completely contain
              the field from which it arises.
            </p>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Every vessel reveals something through its particular structure while excluding
              something else — and this applies to metaphysical systems. Root Ether is not the
              Absolute; it is the first intelligible medium within the architecture. The tattvas
              do not exhaust all possible qualities; they supply a grammar of formative
              tendencies. The ethers do not divide reality into compartments; they name
              distinguishable functions within a continuous process.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/80">
              This architecture presents itself as a disciplined symbolic anatomy of formation,
              not as a claim to exhaust the mystery of reality. The principle of inexhaustibility
              makes the system stronger, because it allows precision without pretending to
              totality.
            </p>
          </div>
        </div>
      </section>

      {/* ASTROLOGY */}
      <section id="astrology" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/star-trails-over-ruined-temple.webp" opacity={0.32} position="center 45%" />
        <SectionGlyph delay={-90} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XIII · Celestial Anatomy
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The clock of <span className="italic text-gold">qualitative time</span>
          </h2>
          <p className="mt-8 max-w-3xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            Astrology does not create the hidden forces. It maps their changing celestial
            configuration.
          </p>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Ordinary clocks measure time quantitatively. Astrology proposes that time also has
            qualitative difference — that one moment favours initiation, another consolidation,
            another dissolution. The configuration marks the character of a moment, not the
            identity of every event within it. This is the study of{" "}
            <span className="text-gold-dim">kairos</span> rather than{" "}
            <span className="text-gold-dim">chronos</span>.
          </p>

          {/* Not the total cause */}
          <div className="mt-14 border border-border p-6">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              One layer of the field, not the whole cause
            </p>
            <p className="mt-5 font-serif text-lg leading-relaxed text-bone/90">
              Celestial timing <span className="text-gold">+</span> inherited history{" "}
              <span className="text-gold">+</span> bodily constitution{" "}
              <span className="text-gold">+</span> environment{" "}
              <span className="text-gold">+</span> local Morphaithēr{" "}
              <span className="text-gold">+</span> personal participation{" "}
              <span className="text-gold">+</span> unpredictable contingency
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A natal chart is closer to a set of initial conditions than to a completed destiny.
              The seed holds developmental tendencies; soil, weather, cultivation, injury, and
              choice all shape what the plant becomes.
            </p>
          </div>

          {/* Components */}
          <div className="mt-20">
            <OneLayerOfSeven />
          </div>

          <div className="mt-16">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The components and what each does
            </p>
            <div className="mt-6 space-y-px">
              {[
                { k: "Planet", v: "The formative power or operation", q: "what is operating" },
                { k: "Sign", v: "The qualitative manner in which it operates", q: "how it operates" },
                { k: "House", v: "The vessel or domain in which it becomes expressed", q: "where it is embodied" },
                { k: "Aspect", v: "The geometry relating one operation to another", q: "how it combines or conflicts" },
                { k: "Degree", v: "The specific position within the larger pattern", q: "precisely where" },
                { k: "Transit", v: "The changing celestial pressure upon an existing configuration", q: "what is arriving" },
              ].map((r) => (
                <div
                  key={r.k}
                  className="grid gap-1 border-b border-border py-4 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <div className="font-label text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                    {r.k}
                  </div>
                  <div className="text-sm leading-relaxed text-muted-foreground">{r.v}</div>
                  <div className="font-serif text-sm italic text-bone/70">{r.q}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              An aspect is not a third force added to two planets. It is the relationship between
              them functioning as a formative condition — which is why the geometry connecting two
              powers can matter as much as the powers themselves.
            </p>
          </div>

          {/* Planets as functions */}
          <div className="mt-16">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The planets as formative functions
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { g: ["Sun"], n: "Sun", d: "Centering, coherence, vitality, illumination — the power around which a system organizes itself." },
                { g: ["Moon"], n: "Moon", d: "Reception, memory, habit, embodiment, fluctuation, and the capacity to contain impressions." },
                { g: ["Mercury"], n: "Mercury", d: "Translation, mediation, communication, movement, exchange." },
                { g: ["Venus"], n: "Venus", d: "Attraction, affinity, valuation, harmony, combination." },
                { g: ["Mars"], n: "Mars", d: "Separation, assertion, conflict, cutting, directed force." },
                { g: ["Jupiter"], n: "Jupiter", d: "Expansion, authorization, synthesis, confidence, increase." },
                { g: ["Saturn"], n: "Saturn", d: "Boundary, duration, limitation, responsibility, crystallization, consequence." },
                { g: ["Uranus", "Neptune", "Pluto"], n: "The Outer Powers", d: "Slower collective processes reorganizing generations, cultures, institutions, and historical fields." },
              ].map((x) => (
                <div key={x.n} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-serif text-lg italic text-bone">{x.n}</div>
                    <div className="flex shrink-0 items-center gap-1.5 text-gold">
                      {x.g.map((pl) => (
                        <PlanetGlyph key={pl} planet={pl} className="h-[19px] w-[19px]" decorative />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              None is good or evil in itself. Each becomes constructive or destructive by
              proportion, placement, relationship, and the vessel receiving it.
            </p>
          </div>

          {/* Where it meets the rest of the architecture */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Where it meets the architecture
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { t: "The Four Ethers", d: "Warmth activates the transit. Light reveals it. Tone arranges its relationships. Life incorporates its consequences. Not four literal substances carrying influence — a model of how a celestial pattern passes from temporal potential into embodied experience." },
                { t: "The Tattvas", d: "Not a rigid one-to-one correspondence. Mars often expresses Tejas, but Mars in a watery sign carries an Apas modification; Saturn is often Prithivi, yet can produce Akashic separation. Astrology arranges the functions; the tattvas colour their force." },
                { t: "The Morphaithēr", d: "The same transit produces different results in different people because it enters different formative atmospheres. A Mars transit meeting a disciplined field becomes courage and focused labour; meeting a volatile one, conflict and recklessness. The celestial quality is received according to the vessel." },
                { t: "The Psychic Flywheel", d: "A transit may add warmth, pressure, or intensity to a pattern already carrying momentum, and push it across a threshold. Celestial timing can raise the pressure; it does not choose the centre around which that pressure revolves." },
                { t: "The Crypt", d: "No transit acts on an empty field. A Saturn passage activates not only an abstract principle but accumulated histories of authority, fear, discipline, and ancestry. The configuration is a key; what it unlocks was deposited earlier." },
                { t: "Nested Fields", d: "Cities, institutions, nations, and movements arise at particular times within larger cycles. Individuals participate in family fields, families in social fields, societies in historical fields — and all within celestial ones." },
              ].map((x) => (
                <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                  <div className="font-serif text-lg italic text-bone">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modes of reading */}
          <div className="mt-16">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Modes of reading
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { t: "Transit", d: "The present configuration forming a meaningful relation with the natal one. It does not insert a foreign event; it activates something already in the architecture — warming a dormant tendency, straining a rigid structure, or exposing a contradiction that had stayed hidden." },
                { t: "Progression", d: "Not a force arriving from outside but the original configuration maturing — the inner clock by which latent structures become available for embodiment. The developmental metabolism of the form." },
                { t: "Election", d: "A beginning is a moment when a new vessel is unusually open, and the conditions present can be incorporated into its structure. Not the art of finding a perfect sky — no sky is perfect for everything — but of matching a configuration's dominant tendencies to the nature of the undertaking." },
                { t: "Synastry", d: "Two configurations in sustained relation form a coupled field with a Morphaithēr of its own, irreducible to either person. Repeated interaction accumulates shared habits, symbols, tensions, and attractors until the relationship becomes a formative vessel with its own momentum." },
              ].map((x) => (
                <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                  <div className="font-serif text-lg italic text-bone">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Recurrence is never exact repetition. When a cycle returns it meets a world altered
              by everything that happened during the last one. The geometry may resemble an
              earlier configuration; the vessel is no longer the same.
            </p>
          </div>

          {/* Freedom */}
          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              And freedom
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Freedom is not acting without conditions. It is the capacity to recognize
              conditions, weigh their pressures, and participate consciously in what they become.
              An unconscious Mars activation becomes impulsive conflict; a conscious one becomes
              courage, disciplined separation, or decisive action. The function stays
              recognizable; the level of expression changes.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone">
              The chart describes the architecture of pressure and possibility. It does not issue
              an unavoidable command.
            </p>
          </div>

          {/* Definition + placement */}
          <div className="mt-20 border-t border-border pt-12">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Defined
            </p>
            <p className="mt-5 max-w-4xl font-serif text-xl leading-relaxed text-bone/90 sm:text-2xl">
              The symbolic and geometrical anatomy of qualitative time — a system for mapping how
              celestial cycles correspond with the activation, relationship, maturation, and
              transformation of formative tendencies within earthly fields.
            </p>
            <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Root Ether", "supplies the common medium"],
                ["The Fourfold Veil", "transduces influence toward embodiment"],
                ["The tattvas", "give force qualitative direction"],
                ["Astrology", "maps the timing and celestial geometry"],
                ["The Morphaithēr", "describes their local mixture"],
                ["The vessel", "determines how they are received"],
                ["The Flywheel", "gives repeated patterns momentum"],
                ["Participation", "helps determine their expression"],
                ["The Crypt", "preserves the consequences after"],
              ].map(([a, b]) => (
                <div key={a} className="border-b border-border py-4">
                  <div className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                    {a}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</div>
                </div>
              ))}
            </div>
            <p className="mt-10 font-label text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              neither an isolated system nor the master key — the celestial clock and geometrical
              calendar of a universe in formation
            </p>
          </div>
        </div>
      </section>

      {/* SUB-TATTVAS */}
      <section id="subtattva" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/light-scrims-hung-in-stone-room.webp" opacity={0.28} position="center 50%" scrim={0.25} />
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XIV · The Compound Qualities
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Every letter spoken through{" "}
            <span className="italic text-gold">every other</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Almost nothing exists as a pure expression of one tendency. Fire can spread, flow,
            stabilize, or stay latent. Water can turn volatile, heated, spacious, or solid. Each
            primary tattva contains all five within itself — twenty-five compound expressions,
            relational patterns rather than twenty-five occult substances.
          </p>

          {/* Order matters */}
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {[
              { t: "Apas–Tejas", d: "Apas dominant, Tejas modifying from within. Something primarily cohesive or fluid carrying an intensifying current — passionate attachment, fermentation, heated emotion, a relationship under transformation." },
              { t: "Tejas–Apas", d: "The reverse. Something primarily fiery whose intensity is moderated, contained, and nourished — incubatory warmth, healing heat, controlled passion, fire held in a fluid medium." },
            ].map((x) => (
              <div key={x.t} className="border border-gold/25 p-5">
                <div className="flex items-center gap-3 font-serif text-xl italic text-gold">
                  <SubTattvaSign pair={x.t} size={26} />
                  {x.t}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-serif text-lg italic text-bone/85">
            The order matters. These are not mixtures whose sides are interchangeable.
          </p>

          {/* The 25 — interactive */}
          <div className="mt-16">
            <SubTattvaMatrix />
          </div>

          {/* The arithmetic */}
          <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Why Root Ether is not multiplied
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The sub-tattvas do not sit beside the ethers as twenty-five further layers. They
                configure how each ether operates — so each of the four can be expressed in
                twenty-five ways.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Root Ether is not counted as a fifth ether here — the common source, not one
                more term. § II XVIII, applied to the ethers.
              </p>
              <p className="mt-6 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                Root Ether → four differentiated ethers × twenty-five tattvic configurations.
              </p>
            </div>
            <div className="space-y-px">
              {[
                { l: "4 ethers × 25 sub-tattvas", r: "100 operative modes" },
                { l: "× 3 gunic conditions", r: "300 qualified expressions" },
              ].map((x) => (
                <div key={x.l} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border py-5">
                  <span className="font-label text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                    {x.l}
                  </span>
                  <span className="font-serif text-xl italic text-gold">{x.r}</span>
                </div>
              ))}
              <p className="pt-5 text-sm leading-relaxed text-muted-foreground">
                Not three hundred separate substances — three hundred possible analytical
                descriptions. The system gains resolution; it does not fill the invisible world
                with hundreds of independent fluids.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { g: "Sattvic", d: "Tejas–Vayu as rapid insight, intellectual brilliance, decisive clarity." },
                  { g: "Rajasic", d: "Tejas–Vayu as agitation, heated argument, uncontrolled acceleration." },
                  { g: "Tamasic", d: "Tejas–Vayu as frustrated motion, blocked anger, energy trapped in a destructive circuit." },
                ].map((x) => (
                  <div key={x.g} className="border border-border p-4">
                    <div className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                      {x.g}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* In the sky */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Read into the chart
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Sign supplies the dominant tattva by its element; planet supplies the interior
              modifier. Functional correspondences, not identities: Sun and Mars to Tejas, Moon
              and Venus to Apas, Mercury to Vayu, Jupiter to Akasha, Saturn to Prithivi.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { p: "Mars in Cancer", pl: "Mars", sg: "Cancer", c: "Apas–Tejas", d: "A watery, protective, cohesive field carrying a fiery and separating force." },
                { p: "Moon in Aries", pl: "Moon", sg: "Aries", c: "Tejas–Apas", d: "A fiery field inwardly modified by feeling, attachment, and memory." },
                { p: "Mercury in Taurus", pl: "Mercury", sg: "Taurus", c: "Prithivi–Vayu", d: "Stable structure containing movement, language, and exchange." },
                { p: "Saturn in Aquarius", pl: "Saturn", sg: "Aquarius", c: "Vayu–Prithivi", d: "An airy, conceptual field containing limitation and durability." },
                { p: "Jupiter in Scorpio", pl: "Jupiter", sg: "Scorpio", c: "Apas–Akasha", d: "Emotional depth and penetration opened toward meaning and hidden possibility." },
              ].map((x) => (
                <div key={x.p} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                    <PlanetGlyph planet={x.pl} className="h-[15px] w-[15px] shrink-0 text-gold/75" decorative />
                    <span className="min-w-0">{x.p}</span>
                    <ZodiacGlyph sign={x.sg} className="h-[15px] w-[15px] shrink-0 text-gold/75" decorative />
                  </div>
                  <div className="mt-2 flex items-center gap-2.5 font-serif text-lg italic text-gold">
                    <SubTattvaSign pair={x.c} size={22} />
                    {x.c}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  Akasha is not a fifth zodiacal element
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  It needs no separate group of signs to make the numbers align. Within astrology
                  Akasha is the field in which the zodiacal qualities enter relation — visible
                  through the chart's total geometry, the intervals between planets, the opening
                  of possibility. Not absent from the zodiac: the containing field that lets the
                  zodiacal forms communicate. § II XVIII again, applied to the elements.
                </p>
              </div>
              <div className="border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  A chart is a chord, not a note
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  One note may dominate, another create tension, another hold rhythm, another
                  stay quiet until a transit wakes it. A strongly Tejasic chart may still carry
                  Apas–Prithivi loyalty, Vayu–Tejas sharpness, and Akasha–Apas receptivity. The
                  point is never to label someone a fire type, but to read the composition and
                  proportion of a formative field. A transit does not replace that chord — it
                  modulates it, as heat added to a fixed substance.
                </p>
              </div>
            </div>
          </div>

          {/* Reservoirs + the fear example */}
          <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                What places accumulate
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A Morphaithēr is never one uniform tattvic substance. A room may hold
                Prithivi–Prithivi in its architecture, Apas–Prithivi in its history of attachment,
                Vayu–Akasha in its circulation of ideas, and Tejas–Vayu in an argument occurring
                inside it. Repetition makes a quality easier to reactivate.
              </p>
              <div className="mt-6 space-y-px">
                {[
                  ["Library", "Vayu–Akasha", "inquiry, communication, openness to knowledge"],
                  ["Kitchen", "Apas–Prithivi", "nourishment, continuity, bodily care, gathering"],
                  ["Courtroom", "Prithivi–Vayu", "structured speech, codified relation, judgment"],
                  ["Battlefield", "Tejas–Prithivi", "violence fixed into landscape, ruin, memory"],
                ].map(([a, b, c]) => (
                  <div key={a} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-border py-4">
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                      {a}
                    </span>
                    <span>
                      <span className="font-serif italic text-gold">{b}</span>
                      <span className="block text-sm leading-relaxed text-muted-foreground">{c}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                How a fear is built
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The flywheel read as sub-tattvic development — possibility, circulation,
                activation, cohesion, fixation.
              </p>
              <div className="mt-6 space-y-px">
                {[
                  ["Akasha–Vayu", "An open field of uncertain possibility and diffuse mental movement."],
                  ["Vayu–Tejas", "Thought accelerates; the nervous system takes alarm."],
                  ["Tejas–Apas", "Alarm attaches to emotion, memory, and protective instinct."],
                  ["Apas–Prithivi", "The response coagulates into a stable expectation."],
                  ["Prithivi–Prithivi", "Fixed into posture, avoidance, behaviour, identity."],
                ].map(([a, b], i) => (
                  <div key={a} className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-border py-4">
                    <span className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="font-serif italic text-gold">{a}</span>
                      <span className="block text-sm leading-relaxed text-muted-foreground">{b}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-bone/80">
                Transformation reverses the fixation: Warmth loosens it, Light makes it visible,
                Tone establishes new relations, Life integrates a healthier form.
              </p>
            </div>
          </div>

          <p className="mt-20 max-w-4xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            The primary tattvas give five letters. The sub-tattvas show how every letter can be
            spoken through every other — a qualitative alphabet of compound formation.
          </p>
        </div>
      </section>

      {/* DAOIST DYNAMICS */}
      <section id="dao" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/cave-mouth-light-on-still-water.webp" opacity={0.42} position="center 45%" />
        <SectionGlyph delay={-110} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XV · The Dynamics of Return
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            道 · How the forces <span className="italic text-gold">move</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Astrology says when a configuration is emphasized. The tattvas say what qualities
            compose it. The ethers say how it becomes embodied. What remained missing was a
            philosophy of circulation, polarity, timing, and noncoercive change — how a force
            moves, alternates, generates its opposite, reaches excess, and returns.
          </p>

          {/* The Dao is not Root Ether */}
          <div className="mt-14 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The Dao is not Root Ether
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Root Ether is the first formative medium <em>within</em> the architecture — the
              field through which relation, transmission, and embodiment become possible. The Dao
              is not a substance, field, energy, or item in the universe at all. It is the
              inexhaustible Way through which all processes arise, and it belongs beyond the
              architecture rather than at the top of it.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/80">
              Keeping them apart protects Root Ether from being inflated into an absolute
              God-substance, while preserving the apophatic depth beyond it. Wuji likewise names
              the <em>absence of polarity</em>; Root Ether names the continuity through which
              polarity can arise. § II XVIII a third time — now guarding the whole architecture rather
              than a series inside it.
            </p>
          </div>

          {/* 42 */}
          <div className="mt-16">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              道生一 · From the Way to the ten thousand things
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-5">
              {[
                { n: "道", t: "The Dao", d: "The inexhaustible Way, beyond complete definition." },
                { n: "一", t: "The One", d: "Primordial continuity; undivided possibility." },
                { n: "二", t: "The Two", d: "The first polarity — yin and yang." },
                { n: "三", t: "The Three", d: "Polarity joined by the circulating relation between its poles." },
                { n: "萬", t: "Ten Thousand", d: "The innumerable forms produced through differentiated relationship." },
              ].map((x) => (
                <div key={x.t} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="font-serif text-2xl text-gold">{x.n}</div>
                  <div className="mt-2 font-serif text-base italic text-bone">{x.t}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              The Three carries the weight. Two poles alone produce separation or deadlock; the
              third — the mediating breath between them — is what makes polarity generative. It is
              not another object set beside the first two but the living relation through which
              they become capable of producing something beyond themselves.{" "}
              <span className="text-gold-dim">This is precisely Mercury's office</span> between
              Sulfur and Salt.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/80">
              Taiji is the moment that gradient becomes polarized movement — and Warmth Ether can
              be read as the etheric carrier of that first Taijic activation.
            </p>
          </div>

          {/* Yin/yang as modes, and qi */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                陰陽 · Not two more tattvas
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Yin and yang are relational modes that qualify every tattva, sub-tattva, ether,
                planet, and process. Neither is good or evil; neither exists absolutely alone.
                Something may be yin relative to one condition and yang relative to another.
              </p>
              <div className="mt-6 space-y-px">
                {[
                  ["Yang Tejas", "Outwardly radiant, separating, expressive, rapidly heating, combustible."],
                  ["Yin Tejas", "Banked heat — inward digestion, gestational warmth, smouldering intensity, hidden transformative pressure."],
                  ["Yang Apas", "Overflowing current, emotional expression, outward nourishment."],
                  ["Yin Apas", "Interior gestation, retention, absorption, deep attachment."],
                ].map(([a, b]) => (
                  <div key={a} className="border-b border-border py-4">
                    <div className="font-serif italic text-gold">{a}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-bone/80">
                Applied to the twenty-five, this stops the compounds becoming static personality
                labels. An Apas–Tejas configuration is yang when passion is expressed outward, yin
                when the same heat is held as gestation or silent pressure. Every compound quality
                can expand, contract, emerge, withdraw, or return.
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                氣 · Qi is not another name for ether
              </p>
              <div className="mt-6 space-y-px">
                {[
                  ["Ether", "the medium"],
                  ["Qi", "the movement through it"],
                  ["Tattva", "the quality of that movement"],
                  ["Form", "the temporary organization it produces"],
                ].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-border py-4">
                    <span className="font-label text-[11px] uppercase tracking-[0.2em] text-gold-dim">{a}</span>
                    <span className="font-serif text-lg italic text-bone/90">{b}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Warmth activates qi; Light gives it orientation; Tone arranges it into ratios and
                rhythms; Life integrates it into a self-maintaining whole. The Morphaithēr is then
                readable as a local ecology of currents — and Daoist language lets it be diagnosed,
                not merely described.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                A field may hold abundant activity yet circulate poorly. It may be intensely warm
                and unable to convert warmth into light. Strong Prithivi may preserve stability
                while preventing adaptation; excess Vayu may produce continual movement without
                coherence.
              </p>
            </div>
          </div>

          {/* Five Phases */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              五行 · The Five Phases are not the five tattvas
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              They must not be mapped onto one another merely because both systems have five
              terms. The tattvas describe the <span className="text-gold-dim">composition</span> of
              a force; the Five Phases describe the{" "}
              <span className="text-gold-dim">stage of transformation</span> it is passing through.
            </p>
            <WuxingCycles />
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  The generating cycle
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Each phase prepares the next. Growth fuels expression; expression yields what can
                  be assimilated; assimilation yields defined structure; contraction returns
                  substance to storage; storage nourishes new growth.
                </p>
              </div>
              <div className="border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  The regulating cycle
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Each movement limits another so no phase becomes absolute. Regulation is not
                  hostility but the system's way of holding proportion — which is why constraint can
                  preserve life rather than merely oppose it, and how integral coherence differs
                  from parasitic.
                </p>
              </div>
            </div>
          </div>

          {/* Emptiness, wu wei, ziran, de */}
          <div className="mt-20 grid gap-3 sm:grid-cols-2">
            {[
              { t: "Emptiness · 虛", d: "A vessel is thrown from clay, but its usefulness is the space within. Salt gives the vessel its boundary and Prithivi its durability — Akasha gives it interior capacity. A vessel without walls cannot contain; one without opening cannot receive.", q: "Boundary creates identity, but emptiness creates usefulness." },
              { t: "Wu wei · 無為", d: "Not inaction. Action that cooperates with the actual configuration of the field: studying its gradients, timings, channels, and thresholds, then intervening where a small action can redirect a larger movement. Ignore the field and impose form by will, and enormous force is wasted.", q: "The art of minimum coercion and maximum alignment." },
              { t: "Ziran · 自然", d: "Self-so-ness. A limit on externally imposed formation: sometimes the task is not to determine the finished form in advance but to establish conditions and let the inherent telos emerge. A gardener cannot make a seed grow by pulling it.", q: "Self-expression once unnecessary obstruction is removed." },
              { t: "De · 德", d: "Not moral obedience but realized coherence — the efficacy a being holds when its inner organization accords with its own nature and its place in the larger field. A tree shows De by growing according to its nature while participating in soil, season, and ecosystem.", q: "Power arising from right relationship rather than domination." },
            ].map((x) => (
              <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                <div className="font-serif text-lg italic text-bone">{x.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                <p className="mt-4 border-t border-border pt-3 font-serif italic text-gold/90">{x.q}</p>
              </div>
            ))}
          </div>

          {/* Reversal */}
          <div className="mt-16 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              反 · The Law of Reversal
            </p>
            <p className="mt-5 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone">
              A force carried beyond its proportion begins to generate the conditions of its own
              transformation into another state.
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Excessive heat consumes its fuel and produces exhaustion. Extreme rigidity turns
              brittle. Unlimited expansion disperses the centre that sustained it. Total
              contraction generates the pressure for release. Not that every event flips into its
              opposite — that no expressed tendency stands outside the field's larger
              compensations.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/80">
              Water is the image of this intelligence: it yields without becoming powerless, enters
              low places, conforms to the vessel, circulates around obstacles, and gradually
              reshapes what looks harder than itself. Not Apas alone — Apas supplies cohesion and
              receptivity; Daoist water shows those qualities becoming a strategy of action.
              Mercury moving through an Apas-dominant field under the discipline of wu wei.
            </p>
          </div>

          {/* Internal alchemy */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              內丹 · The furnace and the cauldron
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { n: "精 · Jing", t: "Essence", d: "Stored and embodied potential. Resonates with Salt, Prithivi, inheritance, the bodily reservoir." },
                { n: "氣 · Qi", t: "Breath", d: "Mobilized, circulating formative activity. Resonates with Mercury, Vayu, Warmth Ether." },
                { n: "神 · Shen", t: "Spirit", d: "Luminous awareness, intelligibility, governing presence. Resonates with Light Ether and the Inner Sun." },
              ].map((x) => (
                <div key={x.n} className="group border border-border p-5 transition-colors hover:border-gold/40">
                  <div className="font-serif text-xl text-gold">{x.n}</div>
                  <div className="mt-2 font-serif text-lg italic text-bone">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Correspondences, not translations — the Daoist terms keep their own historical
              meaning rather than becoming new names for Western principles. The refinement of
              dense potential into circulation, and circulation into luminous awareness, closes by
              returning toward emptiness, which is what stops luminous consciousness hardening into
              one more ego-form.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  Furnace and cauldron
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  The furnace is the regulated production of warmth; the cauldron the vessel that
                  contains transformation. A furnace without a cauldron disperses heat; a cauldron
                  without a furnace stays inert. Too much fire burns the contents, too little fails
                  to transform them. Warmth is not valuable for being intense — it must be timed,
                  contained, circulated, and proportioned to its material.
                </p>
              </div>
              <div className="border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  Fire and Water
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Fire without Water rises, scatters, consumes. Water without Fire sinks, congeals,
                  lies dormant. The aim is never Fire's victory but a vessel in which rising warmth
                  and descending receptivity continually renew one another — the Inner Sun not as a
                  solitary blaze but as the central regulator of ascending and descending currents.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-20 max-w-4xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            The universe is not merely built. It is continually balancing, circulating, emptying,
            filling, transforming, and returning.
          </p>
        </div>
      </section>

      {/* IGNISOPHIA */}
      <section id="ignisophia" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/furnace-mouth-glowing-in-ravine.webp" opacity={0.26} position="center 60%" />
        <SectionGlyph delay={-130} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XVI · Ignisophia
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The chariot of the <span className="italic text-gold">Inner Sun</span>
          </h2>
          <p className="mt-5 font-label text-[11px] uppercase tracking-[0.25em] text-gold-dim">
            ignis · fire &nbsp;+&nbsp; <span lang="el" className="scr-greek">σοφία</span> · wisdom
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Fire made wise. Not passion, energy, or willpower — those can stay divided,
            compulsive, or destructive. Ignisophia begins only when desire, understanding,
            imagination, attention, and embodied action are organized around a single centre.
          </p>
          <p className="mt-8 max-w-4xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            When desire and understanding revolve around a unified centre, psychic force becomes
            directed momentum — and directed momentum becomes transformation.
          </p>

          <div className="mt-16">
            <TheChariot />
          </div>

          {/* The chariot */}
          <div className="mt-16">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The chariot · two wheels and a governing centre
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              They are independent faculties, and so they are not one rim. They must turn together
              while keeping their difference — which is why the vehicle needs a centre and not
              merely more force.
            </p>
            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              {[
                { he: "הוֹד", n: "Hod", r: "The wheel of understanding", d: "Language, discrimination, planning, symbol, intelligible structure.", fail: "Hod without Netzach: understanding with little motive power." },
                { he: "☉", n: "The Inner Sun", r: "The governing centre", d: "Not the erasure of the faculties but their proportion — joining motive power to intelligible direction.", fail: "Which is why this is a matter of coherence, not intensity. A smaller force properly centred outruns a greater one scattered among contradictory desires.", mid: true },
                { he: "נֶצַח", n: "Netzach", r: "The wheel of desire", d: "Emotion, imagination, attraction, instinct, motive vitality.", fail: "Netzach without Hod: tremendous energy without reliable direction." },
              ].map((x) => (
                <div
                  key={x.n}
                  className={`group border p-5 transition-colors ${x.mid ? "border-gold/40 bg-clay/20" : "border-border hover:border-gold/40"}`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-serif text-2xl text-gold">{x.he}</div>
                    <div className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                      {x.r}
                    </div>
                  </div>
                  <div className="mt-3 font-serif text-lg italic text-bone">{x.n}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                  <p className="mt-4 border-t border-border pt-3 text-sm italic leading-relaxed text-bone/70">
                    {x.fail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Flywheel + gyroscope */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <div className="border border-border p-6">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                The solar flywheel
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Every thought, desire, image, rite, and act coordinated around the same centre
                feeds the established movement, until the pattern sustains itself because earlier
                repetitions have altered the field the next one begins from.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                The flywheel is <em>solar</em> only when its momentum turns around the Inner Sun.
                Without a coherent centre repetition still builds momentum — as obsession, fear,
                addiction, or resentment. Ignisophia is not the generation of momentum but its
                solar organization.
              </p>
            </div>
            <div className="border border-border p-6">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                The gyroscope
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A rotating gyroscope holds orientation and resists displacement. A person whose
                thought, desire, value, and action repeatedly revolve around a stable centre is
                less easily overturned by every passing influence.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                This is not rigidity. A gyroscope moves while preserving orientation — dynamic
                stability, the capacity to adapt without losing the governing centre.
              </p>
            </div>
          </div>

          {/* Through the ethers */}
          <div className="mt-16">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Warmth alone is not wisdom
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {[
                ["Warmth", "activates", "desire, urgency, courage, devotion, readiness"],
                ["Light", "illuminates and directs", "warmth becomes conscious understanding"],
                ["Tone", "establishes proportion", "relationship, ratio, measured relation"],
                ["Life", "incorporates", "the new order becomes self-maintaining"],
              ].map(([a, b, c]) => (
                <div key={a} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="font-serif text-lg italic text-bone">{a}</div>
                  <div className="mt-1 font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                    {b}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/90">
              Ignisophia is achieved when heat becomes light, light becomes harmony, and harmony
              becomes living form.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Unordered warmth becomes agitation, impulsiveness, inflammation, exhaustion. The fire
              must be received by the other three, or it consumes rather than transforms.
            </p>
          </div>

          {/* Tattvas + alchemy */}
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Not purely Tejasic
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Tejas supplies the fiery character, but alone it would make the fire destructive or
                incomplete. The others keep it whole.
              </p>
              <div className="mt-6 space-y-px">
                {[
                  ["Akasha", "gives the fire space"],
                  ["Vayu", "gives it movement"],
                  ["Tejas", "gives it intensity"],
                  ["Apas", "gives it continuity"],
                  ["Prithivi", "gives it embodiment"],
                ].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-[6rem_1fr] items-baseline gap-4 border-b border-border py-3">
                    <span className="font-label text-[11px] uppercase tracking-[0.2em] text-gold-dim">{a}</span>
                    <span className="font-serif text-base italic text-bone/85">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                And the three principles
              </p>
              <div className="mt-6 space-y-px">
                {[
                  ["Sulfur", "The inner combustibility — desire, appetite, identity, aspiration, the impulse to become.", "Without Sulfur, nothing ignites."],
                  ["Mercury", "Circulates and translates that fire between thought, emotion, imagination, body, and act.", "Without Mercury, the fire cannot circulate."],
                  ["Salt", "Establishes the vessel able to contain the operation and preserve its results.", "Without Salt, the force disperses without lasting."],
                ].map(([a, b, c]) => (
                  <div key={a} className="border-b border-border py-4">
                    <div className="font-serif text-lg italic text-gold">{a}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</p>
                    <p className="mt-2 font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{c}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                The same fire purifies and consecrates: it loosens distorted patterns, separates
                mixed contents, exposes contradiction, and burns away what cannot belong to the new
                form — then warms the emptied vessel toward a higher organizing principle.{" "}
                <span className="text-bone/85">
                  Purification removes what prevents alignment; consecration establishes what the
                  purified vessel will serve.
                </span>
              </p>
            </div>
          </div>

          {/* Six faces */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The six faces · not six fires but six functions of one solar process
            </p>
            <div className="mt-6 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Awakening", "Dormant potential receives warmth."],
                ["Illumination", "Warmth becomes conscious understanding."],
                ["Purification", "Incompatible structures are separated or dissolved."],
                ["Consecration", "The vessel is oriented toward a higher centre."],
                ["Direction", "Desire and understanding enter coordinated movement."],
                ["Embodiment", "Directed force becomes character, action, enduring form."],
              ].map(([a, b], i) => (
                <div key={a} className="border-b border-border py-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-lg italic text-bone">{a}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The art of preventing inner fire from remaining blind
            </p>
            <p className="mt-5 max-w-4xl font-serif text-2xl italic leading-relaxed text-bone">
              Ignisophia is the wisdom by which inner warmth is illuminated, proportioned,
              circulated, and embodied — until the divided faculties become a chariot of directed
              transformation.
            </p>
          </div>
        </div>
      </section>

      {/* THE RECIPROCAL FIELD */}
      <section id="reciprocal" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/dew-strung-web-over-valley-at-night.webp" opacity={0.49} position="center 45%" />
        <SectionGlyph delay={-150} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XVII · The Reciprocal Field
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            How field and form <span className="italic text-gold">make each other</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The field is not a passive background and form is not a finished object. They
            continually create, limit, interpret, and transform one another — and what a form
            gives back changes what the next form can be.
          </p>

          {[
            {
              group: "Passage and its costs",
              items: [
                { t: "Manifestation as Filtering", d: "Not every possibility can embody through every vessel. An ear receives only certain frequencies; a language expresses some distinctions more readily than others; a personality notices what its established concerns can admit. A formative bottleneck stands between the field and any expression of it.", note: "Manifestation is not force descending into matter. It is possibility surviving a succession of filters." },
                { t: "Formative Impedance", d: "A vessel may resist an influence without blocking it, and the resistance changes how it appears. A genuine intuition met by no adequate language becomes an incomplete image, a confused emotion, a tension in the body. An institution meeting pressure for change converts it into procedure.", note: "Selective permeability regulates what enters. Impedance determines how hard the passage is — and too little leaves the vessel defenceless, too much prevents necessary change." },
                { t: "Transductive Loss", d: "A principle rendered as image loses abstraction; the image rendered as language loses immediacy; language rendered as act loses ambiguity; the act fixed in matter acquires limits the conception never had.", note: "Not a failure of embodiment. Every translation sacrifices some possibilities in order to make others actual — which is why the Fourfold Veil is not perfectly transparent." },
                { t: "The Law of Remainder", d: "Because transduction is never perfect, every formation leaves something over: possibilities excluded, force that did not enter the structure, content unresolved, residue produced by the operation itself. It may dissipate, return to Root Ether, gather in the Morphaithēr, enter the Crypt, or seed another formation.", note: "No form says everything its originating force could have said. Symptoms, ritual atmospheres, cultural tensions, and unfinished work are all read here." },
              ],
            },
            {
              group: "What a form gives back",
              items: [
                { t: "Actualization Opens Possibility", d: "Formation does not merely select from a fixed stock. Before language there could be no written law; before the eye, no visible image in the experienced sense; before the instrument, not that music. Every successful formation alters what can arise after it.", note: "So the Crypt holds more than consequences. It holds the possibilities that completed forms made available." },
                { t: "Generative Surplus", d: "A form produces more than the intentions that made it contained. A word develops meanings its coiner never imagined; a city produces professions, conflicts, and cultures its founders never planned. Once established, a form enters relations and generates what nobody specified.", note: "The universe is not only repeating primordial patterns. It is capable of genuine novelty." },
                { t: "Every Operation Changes the Operator", d: "The craftsman shapes material and is shaped by the discipline; repeated rite reorganizes the ritualist; teaching alters the teacher's own understanding. There is no purely one-directional formative operation.", note: "Whatever repeatedly passes through a vessel alters that vessel's capacity for future reception. The operator's Morphaithēr enters the operation; the operation enters the operator's Crypt." },
              ],
            },
            {
              group: "Absence, equilibrium, dormancy",
              items: [
                { t: "Absence Can Be Formative", d: "A doorway directs movement because the wall forbids passage elsewhere. Silence changes the meaning of music. The empty centre of a wheel permits rotation. A missing parent, a lost tradition, an unanswered question can organize a whole life.", note: "Akasha is not mere nothingness but opening, interval, and capacity. Salt builds the wall; Akasha makes the doorway." },
                { t: "Forces Cancel Without Vanishing", d: "An apparently inert system may hold powerful opposition in equilibrium. Someone who seems unmotivated may carry two equally strong contradictory desires; a rigid complex may lock intense Tejas against equally intense Prithivi. Stillness is not proof that no force is present.", note: "Transformation sometimes requires more energy — and sometimes only a change of angle. This is central to Ignisophia: the Inner Sun does not always add force, it gives force already present a common direction." },
                { t: "Latent Form", d: "A pattern may stop being visibly active without being destroyed. A dormant seed is not growing yet keeps an organization capable of renewed development; a forgotten skill returns faster than it was first learned; a complex stays quiet until a compatible event wakes it.", note: "Between actuality and pure possibility. The Crypt holds many such — not dead replicas, but dormant organizations awaiting compatible conditions." },
              ],
            },
            {
              group: "How patterns take hold",
              items: [
                { t: "Resonance Is Not Entrainment", d: "Resonance amplifies what is already compatible, and can act at once. Entrainment is gradual: repeated exposure brings separate rhythms into common timing — ritual rhythm, repeated prayer, institutional schedules, family habit, planetary cycle.", note: "Resonance awakens compatibility. Entrainment establishes shared timing — which is how a Morphaithēr becomes collective without anyone beginning in the same state." },
                { t: "The Present Reconstructs Memory", d: "A later experience can transform the meaning of an earlier one. A painful memory may become wisdom, identity, resentment, or compassion according to the form it is later integrated into. The event does not change; its position in the living architecture does.", note: "The Crypt is not a static archive. The past conditions the future, and the future decides which dimensions of the past become newly operative." },
                { t: "Bifurcation", d: "At certain thresholds a small difference directs a system toward substantially different futures. Before the threshold the field stays pliable; after it, one path stabilizes and the alternatives grow costly. Initiations, vows, decisions, traumas, births, deaths, encounters.", note: "Astrology may mark when pressure is heightened. It cannot determine which path is taken — at a bifurcation, agency, circumstance, momentum, and contingency all meet." },
              ],
            },
            {
              group: "Staying coherent",
              items: [
                { t: "Formative Immunity", d: "Every self-maintaining form needs some way to tell what belongs from what threatens its coherence. A mind evaluates which impressions to admit; a tradition distinguishes faithful development from distortion; a consecrated space regulates what may enter.", note: "Deficient immunity produces invasion and loss of identity. Excessive immunity rejects nourishment, novelty, and correction. Health is intelligent discrimination, not total openness or total defence." },
                { t: "Error Correction", d: "Coherence is not kept by avoiding disturbance but by detecting and correcting deviation. It requires a reference pattern, a way of sensing departure from it, a channel of feedback, enough flexibility to respond, and a means of fixing the correction.", note: "In Ignisophia the Inner Sun is the reference; Hod detects the discrepancy, Netzach supplies motive force, Mercury carries the correction, and Salt settles it into lasting behaviour." },
                { t: "Consolidation", d: "A transformation is not finished when the old form dissolves or the insight arrives. After activation the vessel may need stillness; after illumination, understanding must become habit; after a rite, one must live inside the new pattern long enough for it to maintain itself.", note: "Warmth awakens, Light reveals, Tone rearranges, Life integrates — and Salt preserves. Without the last step a powerful experience stays episodic." },
                { t: "Refractory Time", d: "Some operations cannot be repeated at once without weakening or reversing. A field needs time to metabolize after intensity; a rite repeated compulsively loses its meaning; a muscle cannot stay contracted; a psyche cannot hold visionary intensity without exhausting its vessel.", note: "Temporal architecture therefore includes intervals in which restraint, rest, or apparent inactivity is the correct operation — where wu wei means recognizing that the field is already transforming." },
              ],
            },
            {
              group: "Shapes of coherence",
              items: [
                { t: "Degrees of Agency", d: "Agency is not all-or-nothing. A simple pattern reacts; a more complex one regulates itself; a further one remembers, anticipates, selects among alternatives, and revises its own behaviour. It rises as boundary, memory, feedback, selective reception, coordination, and anticipation integrate.", note: "This makes consciousness a developed mode of formative participation rather than an inexplicable addition to dead matter — and explains why habits, complexes, and institutions can act quasi-agentively." },
                { t: "Distributed Centers", d: "Not every coherent form has one commanding centre. Ecosystems, communities, and networks hold together through several interacting centres — order by coordination among partly autonomous participants rather than command from one point.", note: "Solar coherence organizes around a governing centre; ecological coherence arises among many. Neither is superior in general. The right architecture depends on the vessel." },
                { t: "Center and Circumference", d: "The centre integrates; the circumference exchanges. A centre out of contact with its boundary cannot answer its environment; a boundary out of contact with its centre lets external pressure fragment the form.", note: "A living geometry: the centre gives orientation, the circumference negotiates participation, and the radii carry word between them." },
                { t: "Multiple Embodiment", d: "A pattern is not identical to the material carrying it. The same melody plays on different instruments; the same proportion is drawn in ink, cut in stone, or held in mind; the same story survives translation.", note: "The vessel contributes something real to the expression without wholly creating the pattern it carries." },
                { t: "Convergent Formation", d: "And the reverse: similar forms arise from unlike histories. Two people reach courage through discipline, crisis, devotion, or love; two cultures independently arrive at a shared symbol for unrelated reasons; two rites produce comparable states by different sensory means.", note: "So correspondence is not proof of common origin or identical hidden cause. Different pathways can meet comparable constraints — a principle that disciplines the whole system." },
              ],
            },
          ].map((cluster) => (
            <div key={cluster.group} className="mt-16">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                {cluster.group}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {cluster.items.map((x) => (
                  <div
                    key={x.t}
                    className="group border border-border p-5 transition-colors hover:border-gold/40"
                  >
                    <div className="font-serif text-lg italic text-bone">{x.t}</div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                    <p className="mt-4 border-t border-border pt-3 text-sm italic leading-relaxed text-bone/70">
                      {x.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-24">
            <TheRecursion />
          </div>

          <div className="relative isolate mt-20 border-l border-gold/40 pl-8">
            <Backdrop src="/bg/rimstone-pools-in-limestone-cave.webp" opacity={0.34} position="center 50%" scrim={0.22} />
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The recursion
            </p>
            <p className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-4xl">
              Field <span className="text-gold">→</span> Form{" "}
              <span className="text-gold">→</span> Modified Field{" "}
              <span className="text-gold">→</span> New Form
            </p>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              The world does not move from field to form once. It continually returns its
              achievements, failures, residues, and novelties to the hidden ground from which the
              next world must arise.
            </p>
          </div>
        </div>
      </section>

      {/* ELEMENTAL MIXING */}
      <section id="mixing" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/braided-glacial-river-from-above.webp" opacity={0.16} position="center 50%" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XVIII · The Dynamics of Mixing
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The elements are <span className="italic text-gold">verbs</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Not four invisible substances but four kinds of work. Fire is the act of heating,
            separating, transforming; Air of moving, exchanging, communicating; Water of blending,
            receiving, joining; Earth of containing, defining, fixing. A living form needs all
            four — it must activate, circulate, cohere, and hold a boundary.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone/80">
            A tattva is the morphogenic bias before embodiment; the element is that bias become
            operative. Tejas is the tendency toward ignition; elemental Fire is that tendency
            actually at work in a particular vessel.{" "}
            <span className="text-gold-dim">
              The tattva is the direction; the element is the direction in operation.
            </span>
          </p>

          <div className="mt-16">
            <ElementalPairs />
          </div>

          {/* how they can be related */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Mixing is not always homogenization
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Two qualities can interact without dissolving into a uniform result. The system
              becomes far richer when it asks not only which elements are present but how they are
              related.
            </p>
            <div className="mt-6 grid gap-px sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["Solution", "one quality distributed through another"],
                ["Suspension", "coexisting without integrating"],
                ["Layering", "occupying different regions of the vessel"],
                ["Emulsion", "incompatibles held by a mediator"],
                ["Reaction", "producing a new condition"],
                ["Alloying", "a durable composite of distinct qualities"],
                ["Catalysis", "accelerating without being consumed"],
                ["Precipitation", "the dispersed becoming fixed"],
                ["Volatilization", "the fixed becoming mobile"],
                ["Coagulation", "the fluid acquiring stable form"],
              ].map(([a, b]) => (
                <div key={a} className="border-b border-border py-4">
                  <div className="font-serif text-base italic text-bone">{a}</div>
                  <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</div>
                </div>
              ))}
            </div>
          </div>

          {/* what governs the result */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What governs the result
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { t: "Dominance", d: "Water containing Fire is not Fire containing Water. The first becomes warm, fermentative, gestational — cohesion dominant, heat working inside it. The second is moderated, incubatory, capable of sustained rather than explosive change.", n: "Apas–Tejas and Tejas–Apas. Combinations are directional." },
                { t: "Proportion", d: "A little Fire in Water warms it; more brings it to boil; more again disperses it as vapour. A little Water regulates a fire; more extinguishes it.", n: "No elemental relation has one fixed meaning. Its result depends on dominance, measure, vessel, timing, and the state of the forces present." },
                { t: "Sequence", d: "An idea first stabilized in Earth and then warmed by Fire develops differently from an impulse first ignited and only later forced into structure — disciplined transformation against premature fixation or frustrated passion.", n: "Mixing is temporal as well as qualitative. The order of operations enters the final form." },
                { t: "The vessel", d: "Fire and Water in a strong vessel generate pressure and work; in an open one most of it escapes as steam; in a fragile one the pressure ruptures it. Intense feeling inside a disciplined character becomes art, devotion, or sustained labour; the same intensity in an unprepared vessel becomes impulse or collapse.", n: "Salt and Prithivi decide whether the operation can be contained long enough for a new form to appear." },
                { t: "Warmth", d: "A cold rigid form resists combination. As warmth rises, boundaries grow permeable and separated qualities become able to interact — but too little leaves the mixture inert, and too much destroys distinctions before they can be reorganized.", n: "Warmth is not another ingredient. It governs the rate at which a relationship becomes transformative." },
                { t: "Mercury", d: "Some elements will not combine unaided and need a mediator able to pass between them — an emulsifying principle. Imagination mediates between abstract thought and feeling; language between private experience and public act; ritual between intelligible principle and the body.", n: "Mercury opens a channel by which unlike elements can meet without immediately destroying one another." },
              ].map((x) => (
                <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                  <div className="font-serif text-lg italic text-bone">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                  <p className="mt-4 border-t border-border pt-3 text-sm italic leading-relaxed text-bone/70">{x.n}</p>
                </div>
              ))}
            </div>
          </div>

          {/* shoreline + failures */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                The elemental shoreline
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Most change happens not at the centre of either element but at the interface where
                they meet. Fire transforms the surface of Earth; Air crossing Water raises waves;
                Water entering Earth makes clay; heat crossing into Water makes currents and vapour.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                The same holds inwardly — between thought and feeling, desire and restraint, self
                and environment, intention and habit. The interface is not merely where conflict
                occurs. It is where new form becomes possible.
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Two ways mixing fails
              </p>
              <div className="mt-5 space-y-4">
                <div className="border-l border-border pl-5">
                  <p className="font-serif italic text-bone">Stratification</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Elements share a vessel without communicating: one thinks a thing, desires
                    another, says a third, embodies none. Air above, Water below, Fire flaring
                    intermittently, Earth preserving the division. Mercury must circulate between
                    the layers; warmth must make them receptive; the Inner Sun must supply a common
                    centre.
                  </p>
                </div>
                <div className="border-l border-border pl-5">
                  <p className="font-serif italic text-bone">Overmixing</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Dissolve every distinction and the system loses the specialized functions life
                    requires. Thought should speak with feeling without becoming it; desire should
                    inform judgement without replacing it; boundaries should stay permeable without
                    disappearing.
                  </p>
                  <p className="mt-2 text-sm italic leading-relaxed text-gold/80">
                    The aim is not homogeneity but articulated unity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* metabolism, conversion, weather */}
          <div className="mt-20 grid gap-3 sm:grid-cols-3">
            {[
              { t: "Elemental metabolism", d: "A vessel takes in Earth as structure, Water as nourishment and relationship, Air as breath and information, Fire as activation, Akasha as interior capacity — and must release what is spent. Fire leaves ash, Water sediment, Air scattered noise, Earth accumulated rigidity.", n: "Purification is elemental excretion: removing what can no longer join the circulation." },
              { t: "Elemental conversion", d: "Water heated becomes Air-like as vapour; Air compressed and cooled yields Water; Earth broken becomes Vayu-like dust; Fire spent becomes Earth-like ash. An attachment may begin watery, turn to fiery conflict, circulate as airy thought, and settle into earthy habit.", n: "Elemental identities are not permanent substances but dominant behaviours under changing conditions." },
              { t: "The Morphaithēr as weather", d: "A field carries many elemental currents at once — some circulating like wind, some condensing, some accumulating as pressure, some igniting, some hardening, some suspended as unrealized possibility.", n: "A person, place, or rite has an elemental climate, not a fixed elemental identity. The task is not to invoke Fire but to know what Fire will do in the weather already there." },
            ].map((x) => (
              <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                <div className="font-serif text-lg italic text-bone">{x.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                <p className="mt-4 border-t border-border pt-3 text-sm italic leading-relaxed text-bone/70">{x.n}</p>
              </div>
            ))}
          </div>

          {/* the cycle */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              A complete act of transformation
            </p>
            <div className="mt-6 grid gap-px sm:grid-cols-5">
              {[
                ["Ἀκάσα", "Akasha", "opens a space in which another possibility can be imagined"],
                ["Ἀήρ", "Air", "circulates it through thought, language, and image"],
                ["Πῦρ", "Fire", "gives it urgency and transformative pressure"],
                ["Ὕδωρ", "Water", "joins it to emotion, memory, relationship, identity"],
                ["Γῆ", "Earth", "embodies it as behaviour, habit, institution, form"],
              ].map(([z, k, d]) => (
                <div key={k} className="border-b border-border py-4">
                  <ElementSign k={(k === "Akasha" ? "Ether" : k) as ElementKey} size={26} className="text-gold/80" title={`${k} — ${k === "Akasha" ? "the egg of Ākāśa" : "its alchemical sign"}`} />
                  <div className="mt-3 font-serif text-xl text-gold">{z}</div>
                  <div className="mt-1 font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{k}</div>
                  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/80">
              And the new Earth becomes the ground for another opening of Akasha. Space →
              movement → activation → cohesion → embodiment, and again.
            </p>
          </div>

          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The central law
            </p>
            <p className="mt-5 max-w-4xl font-serif text-2xl italic leading-relaxed text-bone">
              An element never expresses only what it is in isolation. Its behaviour emerges from
              proportion, sequence, polarity, vessel, temperature, timing, and its relation to
              every other element present.
            </p>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              The element supplies an operation. The mixture decides what that operation becomes.
              The vessel decides whether it can endure. The Inner Sun decides whether its forces
              can be gathered into a coherent work.
            </p>
          </div>
        </div>
      </section>

      {/* CELESTIAL CORRESPONDENCE */}
      <section id="celestial" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/alabaster-slab-glowing-in-cavern.webp" opacity={0.49} position="center 45%" />
        <SectionGlyph delay={-170} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XIX · Celestial Correspondence
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            One virtue through <span className="italic text-gold">unlike vessels</span>
          </h2>
          <p className="mt-8 max-w-4xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            Correspondence is the recurrence of a formative relationship through unlike vessels.
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The claim is not that a planet, a plant, and an organ are secretly the same object. It
            is that a similar formative virtue can be translated across different levels of
            existence — and that each level translates it according to its own nature.
          </p>

          <div className="mt-16">
            <PlanetaryFamily />
          </div>

          {/* what makes a correspondence strong */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                What makes a correspondence strong
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Not arbitrary lists, but not perfectly universal either — different cultures order
                them differently. Their firmest ground is functional:
              </p>
              <div className="mt-5 space-y-px">
                {[
                  "What does the thing do?",
                  "How does it grow or move?",
                  "What does it attract, resist, separate, or preserve?",
                  "What kind of atmosphere does it produce?",
                  "What role does it occupy in its larger system?",
                  "What geometry or symbolic pattern does it embody?",
                ].map((q) => (
                  <p key={q} className="border-b border-border py-3 font-serif text-base italic text-bone/85">
                    {q}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-bone/80">
                The more functional relations converge, the stronger the correspondence.{" "}
                <span className="text-gold-dim">
                  A yellow flower is not solar merely because the Sun appears golden.
                </span>
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Virtue means efficacy, not goodness
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Here <em>virtue</em> is the characteristic power through which a thing expresses
                its nature — not moral worth.
              </p>
              <div className="mt-5 space-y-4">
                <div className="border-l border-border pl-5">
                  <p className="font-serif italic text-bone">Mars is not simply violence.</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    It is the capacity to separate, cut, defend, initiate, compete, and act
                    decisively.
                  </p>
                </div>
                <div className="border-l border-border pl-5">
                  <p className="font-serif italic text-bone">Saturn is not simply misfortune.</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    It is boundary, endurance, maturity, definition, consequence, and preservation
                    through limitation.
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-bone/80">
                Every planetary virtue holds constructive and destructive expressions. The
                condition of the vessel decides which become actual.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A planetary virtue is also not a pure tattva. Mars commonly runs through Tejas, but
                may take Vayu as speed, Prithivi as endurance, Apas as protective attachment. The
                tattvas say what composes the expression; the planet says how it has been organized
                into a recognizable function.
              </p>
            </div>
          </div>

          {/* the two methods */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Two methods, one circuit
            </p>
            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              <div className="group border border-border p-6 transition-colors hover:border-gold/40">
                <div className="font-serif text-xl italic text-bone">Agrippa · downward</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  A vertical chain: intellectual principle → celestial virtue → elemental
                  configuration → natural body → sensible signature. The higher is not pushed down
                  like one object striking another; it is successively translated until it is
                  embodied.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-bone/80">
                  Which is the Fourfold Veil exactly: Warmth activates the planetary tendency,
                  Light gives it image and intelligibility, Tone arranges its affinities and
                  proportions, Life incorporates it into a developing form, and matter fixes the
                  expression.
                </p>
                <p className="mt-4 border-t border-border pt-3 font-serif italic text-gold/85">
                  What earthly things belong to this celestial order?
                </p>
              </div>
              <div className="group border border-border p-6 transition-colors hover:border-gold/40">
                <div className="font-serif text-xl italic text-bone">Paracelsus · upward</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Begin instead with the formed thing and read it. The signature is not a
                  decorative mark laid on the surface — it is the outward trace of inward
                  formation, shaped by the forces and history that brought the thing into being.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-bone/80">
                  A signature is therefore <em>coagulated formative history</em>: a record of how a
                  thing negotiated light, gravity, water, soil, competition, climate, and ancestry.
                  Which connects Paracelsus straight to the Crypt — every vessel inherits prior
                  patterns and gives them new material expression.
                </p>
                <p className="mt-4 border-t border-border pt-3 font-serif italic text-gold/85">
                  What hidden order is disclosed by this earthly thing?
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Agrippa follows the virtue down; Paracelsus reads the form back up. Together they
              close the circuit of descent and interpretation.
            </p>
          </div>

          {/* reading a signature */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              A signature is read through the whole life of a thing
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              The doctrine is often flattened to a crude rule — that a plant resembling an organ
              must heal it. No single resemblance suffices. A genuine reading gathers:
            </p>
            <div className="mt-6 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
              {["Shape and geometry","Colour and luminosity","Taste and odour","Habitat and climate","Season and planetary timing","Direction of growth","Texture and density","Relations with other organisms","Resistance or susceptibility","Method of reproduction","Observable effects","Transformations produced"].map((f) => (
                <div key={f} className="border-b border-border py-3 text-sm leading-relaxed text-muted-foreground">
                  {f}
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl border-l border-border pl-6 text-sm leading-relaxed text-bone/70">
              Historically attributed medicinal signatures should not substitute for modern
              evidence of safety or efficacy.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-lg italic leading-relaxed text-bone/85">
              Celestial pattern <span className="text-gold">+</span> tattvic composition{" "}
              <span className="text-gold">+</span> etheric transduction{" "}
              <span className="text-gold">+</span> local field{" "}
              <span className="text-gold">+</span> living vessel{" "}
              <span className="text-gold">=</span> the manifested signature
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Which is why a signature discloses both what descended and what received it.
            </p>
          </div>

          {/* reception */}
          <div className="mt-20 grid gap-3 sm:grid-cols-3">
            {[
              { t: "Reception is active", d: "A vessel does not absorb celestial force; it selects, translates, metabolizes, and sometimes resists. Selective permeability decides what enters, impedance how hard the passage is, the ethers transduce it, the tattvas qualify it, the gunas condition it, and existing flywheels decide what already has momentum.", n: "Even resistance produces an outcome — a force barred from its intended channel is displaced, distorted, internalized, or expressed elsewhere." },
              { t: "Influence modulates", d: "A planet emphasizes, activates, restricts, or reorganizes tendencies already present. It may open a threshold or press on a weak boundary. It contributes timing and qualitative direction without producing the whole event.", n: "Which is what protects the system from fatalism. A Martian season becomes conflict in one person, surgery in another, athletic exertion, defensive courage, or decisive work in others. The family stays recognizable; the channel decides the expression." },
              { t: "And it must pass through alchemy", d: "Sulfur is the planetary impulse; Mercury carries and translates it through the organism; Salt receives, limits, and fixes it into actual expression.", n: "If Mercury cannot circulate it, it stays isolated or distorted. If Salt cannot hold it, there is intensity without lasting form. If Salt is too rigid, pressure accumulates until the vessel cracks or reorganizes suddenly." },
            ].map((x) => (
              <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                <div className="font-serif text-lg italic text-bone">{x.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                <p className="mt-4 border-t border-border pt-3 text-sm italic leading-relaxed text-bone/70">{x.n}</p>
              </div>
            ))}
          </div>

          {/* mirror */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                A patterned mirror, not a machine
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The sky is a mirror, but not a flat one returning exact copies. It shows large-scale
                geometries, rhythms, returns, conjunctions, and cycles that correspond with
                formative processes at other levels. Saturn overhead does not look like a human
                experience of limitation — yet its contracting, boundary-forming, slowly maturing
                character can be reflected through one.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                The heavens need not be imagined firing invisible commands into passive bodies, nor
                astrology reduced to stories projected onto neutral lights. The stronger position is
                participatory: heaven and earth express related patterns because both arise within
                one ordered cosmos.
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Every vessel curves the reflection
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A mirror alters what it returns according to its shape, surface, angle, and
                material — and so does a living vessel. The planetary virtue stays recognizable,
                but no two embodiments are identical.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                Which is why the symbols are multivalent. Mars does not signify one inevitable
                event. It signifies a formative family whose actual expression depends on vessel,
                context, scale, and surrounding relation. The reflection is real, and never
                mechanically exact.
              </p>
            </div>
          </div>

          {/* the discipline */}
          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Correspondence is not identity
            </p>
            <p className="mt-5 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone">
              The Sun is not the heart. Mars is not iron. Venus is not a rose. Saturn is not lead.
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              They correspond because related formative functions are expressed through different
              domains. A valid correspondence preserves a meaningful structure while leaving the
              differences between levels intact — the planet celestial, the metal mineral, the
              plant living, the organ bodily, the symbol imaginal, and the ritual their deliberate
              convergence.
            </p>
            <p className="mt-8 max-w-4xl font-serif text-xl leading-relaxed text-bone/90">
              Celestial correspondence is the recurrence of a formative virtue across levels of
              existence — translated by the medium, qualified by the tattvas, embodied by the
              vessel, and revealed through the signature of the resulting form.
            </p>
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section id="channels" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/river-delta-braided-in-grey-silt.webp" opacity={0.16} position="center 50%" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XX · Nadis, Meridians, and Channels
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Force requires a <span className="italic text-gold">path</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A field cannot produce an organized body if its currents move everywhere at equal
            intensity in every direction at once. Activity must be directed toward particular
            organs, centres, and functions — otherwise activation is only undifferentiated
            pressure. Nadis and meridians are maps of organized circulation: not invisible
            anatomical tubes but functional channels.
          </p>

          {/* the distinction stack */}
          <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Ether", "permits transmission"],
              ["Prana", "supplies living movement"],
              ["Tattva", "gives the movement quality"],
              ["Nadi", "gives it direction"],
            ].map(([a, b]) => (
              <div key={a} className="border-b border-border py-5">
                <div className="font-serif text-xl italic text-gold">{a}</div>
                <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-bone/80">
            Prana and ether are not interchangeable words. Ether is the medium and the set of
            functions by which formative activity can be transmitted; prana is vital activity
            within a living vessel; a nadi is the organized route that activity follows.
          </p>

          <div className="mt-16">
            <ThreeNadis />
          </div>

          {/* repetition carves */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Channels are carved by repetition
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Partly inherited, partly made. A current repeatedly passing one way lowers the
                resistance along it; the route becomes easier to activate, so later currents are
                likelier to follow it. Breath, posture, attention, emotion, habit, ritual, and
                trauma all cut channels.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                This is the channel-forming counterpart of the Psychic Flywheel.{" "}
                <span className="text-gold-dim">
                  The flywheel stores momentum; the channel decides where that momentum travels.
                </span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                And a channel is not a pipe. A pipe exists apart from what flows through it; a
                living channel is partly produced and maintained by its own current. Vessels adapt
                to demand, neural paths alter with use, habits make their own repetition easier.
                Current follows channel, and repeated current deepens channel.
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Meridians carry organ-force
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                An organ is not only a mass of matter but a process within an organism. The heart
                is a structure, and also circulation, rhythm, pressure regulation, interoception,
                and the coordination of a whole body. Organ-force is the total pattern by which an
                organ system participates in the living whole; the meridian is how that pattern is
                distributed and regulated.
              </p>
              <div className="mt-5 space-y-px">
                {[
                  ["Tattvas", "qualitative composition"],
                  ["Five Phases", "transformative position"],
                  ["Meridians", "functional circulation"],
                  ["Organs", "living centres of transformation"],
                ].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-[8rem_1fr] items-baseline gap-4 border-b border-border py-3">
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{a}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-bone/80">
                Nadis and meridians should not be declared identical — different traditions,
                different maps, different practices. Their functional resemblance still matters:
                both read the body as organized circulation rather than a collection of parts.
              </p>
            </div>
          </div>

          {/* hodoi */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              <span lang="el" className="scr-greek">ὁδοί</span> · the ways of living energy
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              A path exists because passage has become organized. Some are inherited through
              structure, some carved by use, some strengthened by attention, some lost to neglect
              or injury.{" "}
              <span className="text-bone/85">A hodos is both a route and a history of routing.</span>
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["Structural", "bodily pathways, postural alignment, organized physical relation"],
                ["Rhythmic", "breath, sleep, movement, repetition, biological cycle"],
                ["Attentional", "what consciousness habitually notices and amplifies"],
                ["Symbolic", "images, words, memories, emotions, ritual actions"],
                ["Relational", "established between people, groups, places, institutions"],
              ].map(([a, b]) => (
                <div key={a} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="font-serif text-base italic text-bone">{a}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-bone/80">
              A rite activates all five at once: posture aligns the structural, breath sets the
              rhythmic, concentration directs the attentional, symbol carries the meaning, and
              shared participation entrains the relational. Channels branch, converge, narrow, and
              pass through nodes — a node redistributes, a gate regulates entry, a crossing lets
              one current influence another, a reservoir stores, a boundary keeps apart what should
              not yet mix.
            </p>
          </div>

          {/* the ethers within a channel */}
          <div className="mt-20 border border-border p-6 sm:p-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              A channel can be open at one level and disordered at another
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-4">
              {[
                ["Warmth", "initiates pressure and movement — whether the channel is active, dormant, overheated, or barely animated"],
                ["Light", "gives orientation, so the current can order around an image or direction"],
                ["Tone", "sets rhythm, ratio, and coordination among currents"],
                ["Life", "integrates the channel into the self-maintaining whole"],
              ].map(([a, b]) => (
                <div key={a}>
                  <div className="font-serif text-lg italic text-bone">{a}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-serif text-xl italic text-gold/90">
              Activity may move through a channel while lacking rhythm, orientation, or
              integration. “Flowing” does not automatically mean healthy.
            </p>
          </div>

          {/* disturbances */}
          <div className="relative isolate mt-20">
            <Backdrop src="/bg/beaver-dam-causeway-in-lake-mist.webp" opacity={0.16} position="center 55%" scrim={0.22} />
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Eight ways circulation fails
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { t: "Blockage", d: "A region of increased formative impedance. The current may be barred, diverted, or accumulate behind the obstruction — not always stillness, often constrained, repetitive, or turbulent movement.", n: "A blockage may be protective. Ask not how do we open this, but: why did the system close this route, and what must be prepared before it can safely reopen?" },
                { t: "Stagnation", d: "Activity present but neither circulating nor transforming. A feeling repeatedly undergone without being understood; an institution hoarding resources it never uses; a form intact after its living purpose has gone.", n: "Not absence of energy — energy deprived of passage. Mercury restores the mediation and exchange that resolve it." },
                { t: "Excess", d: "Intensity beyond the channel's regulatory capacity: heat, pressure, agitation, turbulence, damage. But excess is relational — what overwhelms one vessel is proportionate in another with greater capacity.", n: "The answer is not always suppression. It may be containment, cooling, redistribution, grounding, or widening the channel." },
                { t: "Deficiency", d: "Too little activity to perform the function, or a vessel unable to sustain the current — from weak activation, poor nourishment, leakage, exhaustion, or demand elsewhere.", n: "Not always solved by adding force. If the vessel cannot retain what it receives, more input is simply lost. Sometimes the channel must be repaired before the current is strengthened." },
                { t: "Leakage", d: "Boundaries fail to contain or direct. Attention escapes its object; feeling disperses through compulsive expression; a rite cannot hold the atmosphere it generated; an insight loses its momentum before embodiment.", n: "A failure of Salt and of selective permeability. The channel is open but does not deliver." },
                { t: "Counterflow", d: "Activity travelling against the direction the larger organization requires. Thought undermines intention; desire opposes judgement; a peripheral concern captures the resources of the centre; a defence continues after the danger has passed.", n: "Movement alone is insufficient — the current must be correctly oriented. Light gives direction; the Inner Sun gives the governing centre." },
                { t: "Turbulence", d: "Several currents colliding without stable coordination. Abundant force, much of it consumed by friction: conflicting desires, irregular rhythms, overstimulation, unintegrated symbolic material.", n: "Neither blockage nor simple excess but disordered interaction. Tone must restore rhythm and proportion before the activity can cohere." },
                { t: "Diversion", d: "When one route closes the organism may cut another. Compensation can preserve function while burdening regions never meant to carry the load — a conflict displaced into work, fantasy, bodily tension, or relationship; an institution routing its unresolved problems through procedure or scapegoating.", n: "Do not simply destroy the compensating channel. It may be what is keeping the larger vessel working. Understand the original obstruction and what it served." },
              ].map((x) => (
                <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                  <div className="font-serif text-lg italic text-bone">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                  <p className="mt-4 border-t border-border pt-3 text-sm italic leading-relaxed text-bone/70">{x.n}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl border-l border-border pl-6 text-sm leading-relaxed text-bone/70">
              These are metaphysical categories, not diagnoses, and should not be used as
              self-diagnosed medical conditions. The evidence for traditional channel theories
              varies; acupuncture shows benefit for some pain conditions, which does not establish
              meridians as literal anatomical structures.
            </p>
          </div>

          {/* proportioned circulation */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Flow is not maximum movement
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              A living system must open and close, receive and release, act and rest. Some channels
              should be quiet while others work; some forces should stay apart until the vessel can
              combine them. Health is proportioned circulation:
            </p>
            <div className="mt-6 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {["The right current","Through the appropriate channel","In the correct direction","At a sustainable intensity","For the proper duration","In coordination with the whole"].map((x) => (
                <div key={x} className="border-b border-border py-4 font-serif text-base italic text-bone/85">
                  {x}
                </div>
              ))}
            </div>
            <p className="mt-6 font-serif text-xl italic text-gold/90">
              Balance is not static equality. It is regulated alternation.
            </p>
          </div>

          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The doctrine of the channels
            </p>
            <p className="mt-5 max-w-4xl font-serif text-2xl italic leading-relaxed text-bone">
              Life does not depend merely upon possessing force, but upon giving force an
              appropriate path, rhythm, direction, and vessel.
            </p>
          </div>
        </div>
      </section>

      {/* CHAKRAS */}
      <section id="centers" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/steaming-terraced-pools-in-rock.webp" opacity={0.16} position="center 45%" />
        <SectionGlyph delay={-190} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXI · Chakras and Centres
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Where currents <span className="italic text-gold">gather</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Channels explain where currents travel; centres explain where they gather, intersect,
            change character, and are redistributed. A chakra is not a reservoir filled with
            spiritual energy but a centre of transduction — a place where bodily, vital, emotional,
            imaginal, and spiritual processes become temporarily organized around a shared axis.
          </p>

          {/* the historical caveat, stated up front */}
          <div className="mt-10 max-w-3xl border-l border-border pl-6">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              On the map being used
            </p>
            <p className="mt-3 text-sm leading-relaxed text-bone/70">
              Indian and Buddhist traditions hold several chakra systems, with different numbers,
              locations, and purposes. The familiar arrangement is properly six centres along the
              central channel, with Sahasrāra above them as a thousand-petalled crown. The modern
              seven-chakra model was strongly shaped by the transmission of the Ṣaṭ-Cakra-Nirūpaṇa
              through Avalon's <em>The Serpent Power</em>; rainbow colours, endocrine
              correspondences, and many psychological meanings were standardized later. What
              follows uses that model as a particular working map, not as the only one.
            </p>
          </div>

          {/* the petals */}
          <div className="mt-16">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              कमल · The petals, and what they count
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              In the text the modern map descends from, each centre is a lotus with a fixed number
              of petals, and each petal carries a letter. The six lower centres come to fifty petals
              between them — the Sanskrit alphabet, once. That is the strongest internal evidence
              that this is a system rather than a list: the body is being described as an alphabet
              laid out along a spine.
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              The colours are the text&rsquo;s own, and they are not a spectrum: crimson, vermilion,
              the blue-black of a heavy rain cloud, the red of the bandhūka flower, smoky purple,
              white. Each lotus also carries a figure in its pericarp — earth&rsquo;s square,
              water&rsquo;s crescent, fire&rsquo;s triangle, air&rsquo;s hexagram, ether&rsquo;s
              circle — so the elements are counted upward through the body and stop below the brow.
              Select a centre to read the letters it holds.
            </p>

            <div className="mt-10">
              <CentresLotus />
            </div>

            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-bone/60">
              The counts, the seed syllables, the petal letters, the colours and the pericarp
              figures are those of the Ṣaṭ-Cakra-Nirūpaṇa, written by Pūrṇānanda in 1526 and
              translated by Woodroffe in 1918 — which is late, and is the route by which nearly
              everything the modern world says about chakras arrived. Other tantric systems count
              differently. The crown is drawn here as a fringe of forty-eight because a thousand
              petals cannot be drawn honestly at this size, and its letters are the same fifty over
              again rather than a further alphabet.
            </p>
          </div>

          {/* five functions */}
          <div className="mt-16">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What a centre does
            </p>
            <div className="mt-6 grid gap-px sm:grid-cols-5">
              {["Reception","Concentration","Transduction","Regulation","Redistribution"].map((f) => (
                <div key={f} className="border-b border-border py-4 font-serif text-base italic text-bone/85">
                  {f}
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              A centre does not create the force passing through it. It organizes what it receives.
              And it is not a point — not a small glowing object at one anatomical spot, but a
              localized field with a centre, a circumference, an internal geometry, and a network
              of connections. Its bodily location anchors it; its activity reaches through emotion,
              attention, imagination, posture, relationship, and symbol.
            </p>
          </div>

          <div className="mt-16">
            <CentersAxis />
          </div>

          {/* attractors + not a ladder */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Centres as formative attractors
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Each centre draws experience into a characteristic mode of organization, gathering
                unlike events into a recurring pattern. Which is why the same event acquires
                different meanings according to the centre that organizes it.
              </p>
              <div className="mt-5 space-y-px">
                {[
                  ["Through the solar centre", "an argument becomes a contest of power"],
                  ["Through the heart", "a rupture of relationship"],
                  ["Through the throat", "a failure of expression"],
                  ["Through the root", "a threat to security"],
                ].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-[11rem_1fr] items-baseline gap-4 border-b border-border py-3">
                    <span className="font-label text-[10px] uppercase tracking-[0.15em] text-gold-dim">{a}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                The axis is not a ladder of worth
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The lower centres are not spiritual mistakes to be escaped. The root supplies the
                stability through which any higher realization becomes embodied; the sacral supplies
                generative force; the solar supplies transformative power; the heart makes
                relationship; the throat gives expression; the brow gives vision; the crown opens
                the system toward what exceeds it.
              </p>
              <p className="mt-4 font-serif text-lg italic leading-relaxed text-bone/90">
                Higher centres depend on lower centres for embodiment. Lower centres depend on
                higher centres for orientation.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The aim is circulation and integration, not abandonment of the body. And an
                activated crown is not itself wisdom: unity, luminosity, and vastness must still be
                interpreted by the brow, spoken by the throat, humanized by the heart, energized by
                the solar centre, and embodied through the root — or spiritual intensity becomes
                dissociation, grandiosity, or escape from ordinary responsibility.
              </p>
            </div>
          </div>

          {/* four images */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Four ways to read one centre
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: "Vessel", d: "It receives and holds activity long enough for transformation to occur. A centre without sufficient containment cannot metabolize what it receives." },
                { t: "Wheel", d: "Cakra means wheel: circulation, rhythm, rotation, centre against circumference. If the wheel will not turn, activity stagnates; if it spins without an axis, force disperses; if it turns faster than the vessel allows, it makes turbulence." },
                { t: "Gate", d: "It regulates passage between domains — body and environment, self and other, inner and outer meaning, the individual and the transpersonal. A gate must open and close: permanent closure isolates, permanent openness floods." },
                { t: "Transformer", d: "It changes the mode of what passes through. Bodily impulse becomes emotion, emotion becomes image, image becomes language, language becomes act. The centre does not pass force onward — it translates it." },
              ].map((x) => (
                <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                  <div className="font-serif text-lg italic text-bone">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* correspondences with their caveat */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Every centre is a tattvic chord
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The traditional attribution gives each centre a dominant bias, but no living centre
                holds only one tattva. The root needs Akasha for interior space, Vayu for exchange,
                Tejas for metabolic activation, Apas for continuity, and Prithivi for embodiment.
                The throat needs Prithivi to give words stable form, Apas for emotional continuity,
                Tejas for force, Vayu to carry them, and Akasha to make sound possible at all.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                The traditional element names the governing tone, not the whole composition.
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Planetary resonance, not rulership
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Saturn resonates with the root through boundary, endurance, and consequence; Moon
                and Venus with the sacral through receptivity and generation; Mars and Sun with the
                solar plexus through activation and will; Venus and Sun with the heart through
                harmony and circulation; Mercury strongly with the throat; Mercury, Moon and Jupiter
                with the brow; solar and Jovian symbolism with the crown.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                These are overlapping functional affinities, not exclusive rulerships — and the
                seven centres should not be forced into identity with seven planets, seven metals,
                or the ten sefirot. Each of those systems has a different internal architecture.
                The correspondences given in the figure are a functional synthesis for this system,
                not a claim that Indian texts used Western alchemical or etheric terms.
              </p>
            </div>
          </div>

          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              One axial organism
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Not seven isolated wheels stacked in a column. Sushumna is the central route; Ida and
              Pingala supply the alternating polar currents; the centres are nodes of transduction
              along the axis; the Inner Sun gives the whole its orientation; the Psychic Flywheel
              supplies accumulated momentum; the Morphaithēr is the surrounding atmosphere. The root
              anchors the chariot to embodiment while the crown opens it toward a greater order.
            </p>
            <p className="mt-8 max-w-4xl font-serif text-2xl italic leading-relaxed text-bone">
              A chakra is a localized centre through which living currents are received, organized,
              transformed, and redistributed according to the needs and possibilities of the whole
              vessel.
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              So the purpose of development is not to maximize each centre independently, but to
              bring embodiment, generation, power, relationship, expression, vision, and spirit into
              one coherent circulation.
            </p>
          </div>
        </div>
      </section>

      {/* THREE TREASURES */}
      <section id="treasures" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/germinating-seed-with-fine-roots.webp" opacity={0.22} position="center 55%" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXII · Jing, Qi, Shen
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Stored, <span className="italic text-gold">circulating</span>, luminous
          </h2>
          <p className="mt-8 max-w-4xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            Jing is vitality concentrated. Qi is vitality circulating. Shen is vitality becoming
            luminous, conscious, and directive.
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Not three invisible substances but three interdependent conditions of living
            organization — and not a ladder on which the lower is discarded.
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6">
            <SealBlock chars="精氣神" size={104} className="text-gold" label="jīng qì shén — essence, breath, spirit" />
            <div>
              <p className="font-serif text-2xl text-bone/90" lang="zh-Hant">精氣神</p>
              <p className="mt-2 font-serif text-base italic text-gold-dim">jīng · qì · shén</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Together they are the <span lang="zh-Hant">三寶</span>, sānbǎo, the three treasures.
                The characters are set here in the traditional forms and in the shape of a seal —
                a borrowed convention, not a reproduction of anyone&rsquo;s seal.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <ThreeTreasures />
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-bone/80">
            Jing without Qi is stored but inert. Qi without Jing draws on a reservoir that is not
            there. Shen without Qi cannot reach the organism it means to direct. Qi without Shen
            circulates without orientation. Shen without Jing may be brilliant and ungrounded.
          </p>

          {/* the three */}
          <div className="mt-20 grid gap-3 lg:grid-cols-3">
            {[
              { z: "精", k: "Jing", t: "Essence · stored", q: "What has this living form stored that allows it to continue and generate?",
                d: "Foundational vitality, inheritance, generative capacity — the concentrated resources through which growth, repair, reproduction, and continuity become possible. Not reducible to sexual fluid, though reproduction is one of its expressions.",
                i: "Like the latent organization in a seed: physically small, developmentally immense. Embodied potential held in reserve — activity not presently circulating, preserved in a condition from which future activity can arise.",
                n: "Jing is the personal embodiment of the Crypt: the past condensed into present capacity. The Crypt preserves what the world inherited; Jing is the portion of that inheritance concentrated in one vessel." },
              { z: "氣", k: "Qi", t: "Breath · circulating", q: "How does the living form move its capacity through itself and into relationship with the world?",
                d: "Formative vitality in circulation — the movement by which stored potential becomes distributed, exchanged, and expressed. Not another name for ether: ether is the medium, Qi the movement, tattva the quality of movement, channel the route, centre where it is reorganized.",
                i: "Warmth activates it by creating gradients of pressure and readiness; Tone gives it cadence. Which is why abundant activity can still be disordered — the problem is often not insufficient Qi but turbulence, irregular distribution, or missing rhythm.",
                n: "Repeated circulation deepens a pathway, and the deepened pathway directs later circulation. Qi is therefore central to the Flywheel: the flywheel stores momentum, Qi distributes it through the vessel." },
              { z: "神", k: "Shen", t: "Spirit · luminous", q: "What knows, illuminates, and directs the living activity?",
                d: "The luminous and directive organization of the living field — not the quantity of energy a person holds but the clarity with which the system perceives, orients, integrates, and participates.",
                i: "It shows as presence. Someone may be physically active yet absent, or physically still yet intensely present. Luminosity here means not brightness but that experience becomes intelligible. Qi moves; Shen knows and directs the movement.",
                n: "Not to be confused with ego — a powerful ego can accompany scattered Shen. The ego claims centrality; Shen manifests presence. Something like Sulfur made transparent to Light." },
            ].map((x) => (
              <div key={x.k} className="group border border-border p-6 transition-colors hover:border-gold/40">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-3xl text-gold">{x.z}</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">{x.t}</span>
                </div>
                <div className="mt-3 font-serif text-xl italic text-bone">{x.k}</div>
                <p className="mt-4 font-serif text-base italic leading-relaxed text-bone/85">{x.q}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{x.i}</p>
                <p className="mt-4 border-t border-border pt-3 text-sm italic leading-relaxed text-bone/70">{x.n}</p>
              </div>
            ))}
          </div>

          {/* the matrix */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Functional correspondences
            </p>
            <div className="mt-6 -mx-6 aoh-scroll-x overflow-x-auto px-6 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <thead>
                  <tr>
                    {["", "Primary function", "Tattvic", "Etheric", "Alchemical"].map((h) => (
                      <th key={h} className="border-b border-border px-3 pb-3 font-label text-[10px] uppercase tracking-[0.2em] text-gold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Jing", "Storage, inheritance, generation", "Prithivi–Apas", "Life and Tone", "Salt"],
                    ["Qi", "Circulation, exchange, activation", "Vayu–Tejas", "Warmth and Tone", "Mercury"],
                    ["Shen", "Illumination, presence, direction", "Akasha–Tejas", "Light and Life", "Purified Sulfur · the Inner Sun"],
                  ].map((r) => (
                    <tr key={r[0]}>
                      <th className="border-b border-border px-3 py-4 text-left align-top font-serif text-lg italic text-gold">{r[0]}</th>
                      {r.slice(1).map((c, i) => (
                        <td key={i} className="border-b border-border px-3 py-4 align-top text-sm leading-relaxed text-muted-foreground">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-muted-foreground">
              Functional correspondences developed for this system — not a claim that Daoist authors
              used Western alchemical or etheric terminology.
            </p>
          </div>

          {/* refinement */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Refinement is not purification of the dense
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The word can sound as though embodiment were dirty and spirit clean. That would
                weaken the system. Refinement means a change in organization, availability, and
                coherence — not a literal conversion of one measurable substance into another.
              </p>
              <div className="mt-6 space-y-4">
                <div className="border-l border-gold/40 pl-5">
                  <p className="font-serif italic text-bone">Jing into Qi</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Stored capacity mobilized into circulation: a seed germinates, reserve becomes
                    movement, latent ability becomes practised capacity. The operation is not
                    expenditure but <span className="text-gold-dim">controlled mobilization</span> —
                    Warmth must wake the essence, Mercury circulate it, Salt prevent its loss.
                  </p>
                </div>
                <div className="border-l border-gold/40 pl-5">
                  <p className="font-serif italic text-bone">Qi into Shen</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Circulation acquiring enough coherence to carry luminous awareness. Refinement
                    does not increase the quantity of activity; it organizes activity around a
                    centre. Breath becomes attention, movement becomes presence, emotion becomes
                    understanding, repetition becomes character.
                  </p>
                </div>
                <div className="border-l border-gold/40 pl-5">
                  <p className="font-serif italic text-bone">Shen toward emptiness</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    The work does not end in an empowered spiritual personality. Shen releases its
                    fixation on itself and becomes transparent to the greater field — retaining the
                    ability to act without claiming to be the source of what passes through it. Not
                    annihilation of consciousness, but freedom from confusing the vessel with the
                    inexhaustible origin.
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-bone/80">
                Jing is not rejected but made available; Qi is not escaped but coordinated; Shen is
                not inflated but clarified; emptiness does not erase the body but returns the whole
                process to its ground.
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Both directions are required
              </p>
              <div className="mt-6 border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">Ascending</p>
                <p className="mt-3 font-serif text-lg leading-relaxed text-bone/90">
                  Jing <span className="text-gold">→</span> Qi <span className="text-gold">→</span>{" "}
                  Shen <span className="text-gold">→</span> emptiness
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Stored capacity becomes activity; activity becomes awareness; awareness becomes
                  transparent to its source.
                </p>
              </div>
              <div className="mt-3 border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">Descending</p>
                <p className="mt-3 font-serif text-lg leading-relaxed text-bone/90">
                  orientation <span className="text-gold">→</span> Shen{" "}
                  <span className="text-gold">→</span> Qi <span className="text-gold">→</span> Jing{" "}
                  <span className="text-gold">→</span> embodied form
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Spirit gives vision; vision directs circulation; circulation reorganizes essence;
                  essence becomes embodied character and act.
                </p>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-bone/80">
                And this is where inner alchemy meets Ignisophia. The living field is the cauldron;
                Warmth supplies the furnace; breath, rhythm and attention regulate the fire-time.{" "}
                <span className="text-gold-dim">
                  Ignisophia is not the maximization of Qi or the burning of Jing to produce
                  intensity
                </span>{" "}
                — it is the wisdom by which Jing is preserved, Qi circulated, and Shen clarified
                around the Inner Sun. Too weak a fire and the contents stay inert; too strong and
                the vessel consumes its reserves.
              </p>
            </div>
          </div>

          {/* how they meet the sky */}
          <div className="mt-20 grid gap-3 sm:grid-cols-2">
            <div className="group border border-border p-6 transition-colors hover:border-gold/40">
              <div className="font-serif text-lg italic text-bone">In the Morphaithēr</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Jing gives the field depth, continuity, and stored capacity; Qi gives it movement,
                temperature, and exchange; Shen gives it luminosity and recognizable presence. A
                field may hold strong Jing with stagnant Qi, abundant Qi with scattered Shen, or
                luminous Shen with too little Jing to embody what it has seen.
              </p>
            </div>
            <div className="group border border-border p-6 transition-colors hover:border-gold/40">
              <div className="font-serif text-lg italic text-bone">Under a transit</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A planetary influence does not simply cause an event. It meets a vessel with a
                particular capacity, circulation, and level of conscious organization.
                <span className="mt-3 block text-bone/85">
                  The sky supplies timing and pattern. Jing supplies capacity. Qi supplies movement.
                  Shen supplies participation.
                </span>
              </p>
            </div>
          </div>

          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Most distilled
            </p>
            <p className="mt-5 max-w-4xl font-serif text-2xl italic leading-relaxed text-bone">
              Jing is the world stored within the living vessel. Qi is the world moving through the
              living vessel. Shen is the world becoming luminous and self-aware within the living
              vessel.
            </p>
          </div>
        </div>
      </section>

      {/* HEAD HEART HARA */}
      <section id="axis" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/figure-in-dark-chamber-with-light-slots.webp" opacity={0.18} position="center 40%" />
        <SectionGlyph delay={-210} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXIII · Head, Heart, and Hara
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The human axis of <span className="italic text-gold">transformation</span>
          </h2>
          <p className="mt-8 max-w-4xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            The Head must see clearly, the Heart must consent truthfully, and the Hara must make
            the truth inhabitable.
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Not anatomical regions, and not reducible to intellect, emotion, and instinct. Three
            modes of organization — which is what explains how something can be intellectually
            understood yet emotionally unaccepted, sincerely desired yet poorly directed, or
            powerfully enacted without wisdom.
          </p>

          <div className="mt-16 grid gap-3 lg:grid-cols-3">
            {[
              { k: "Head", pr: "Logos", q: "What is the pattern?",
                d: "The centre through which experience becomes intelligible — distinguishing, comparing, imagining, naming. Logos here is not language alone but the ordering intelligence by which scattered impressions become a meaningful configuration.",
                e: "Light Ether lets the pattern appear; Tone Ether lets its parts be related as proportion, sequence, and language.",
                t: "Akasha opens the interior space where meaning can appear; Vayu moves among perspectives and makes comparison possible; Tejas illuminates and penetrates confusion.",
                a: "Strongly Mercurial — translating between worlds and converting experience into signs. But it needs Salt, since thought without stable definition stays indefinite, and Sulfur, since thought without intention has no living centre.",
                x: "Abstraction without embodiment. It may mistake a representation for the reality, or build a perfectly consistent structure on premises that are false or disconnected from life. Intellectual coherence alone is not sufficient." },
              { k: "Heart", pr: "Sympatheia", q: "What is my right relationship to it?",
                d: "Where separate things become significant to one another. Not merely the producer of emotion — it determines participation: what matters, what is loved, what is refused, what is mourned, what one is willing to serve.",
                e: "Life Ether gathers diverse processes into a whole; Tone Ether sets proportion and reciprocal responsiveness. It integrates through circulation.",
                t: "Through the Heart, correspondence stops being an abstract chart and becomes felt relationship — planet, plant, organ, colour, memory and symbol resonating because each participates in overlapping patterns of formative life.",
                a: "It mediates between Sulfur and Mercury — interior identity and devotion on one side, circulation and exchange on the other — while Salt gives it fidelity, the ability to sustain a relation through time rather than merely feel it.",
                x: "Sentimentality that confuses intensity with truth; excessive permeability that loses its boundaries; or armouring that preserves itself by refusing participation. Health is selective permeability governed by love and discernment." },
              { k: "Hara", pr: "Presence", q: "Can this become real through me?",
                d: "The body's gathered centre of gravity and available power — the organizing region of lower-body integration: breath, balance, generative force, digestion, instinct, posture, grounded intention.",
                e: "Life Ether keeps the organism whole; Warmth Ether mobilizes it toward action. Without warmth the Hara stays dormant; with warmth poorly contained, its reserves scatter rather than strengthen.",
                t: "Prithivi gives grounding, boundary, weight, endurance; Apas gives cohesion, receptivity, and generative depth; Tejas supplies the fire by which stored potential becomes action.",
                a: "A pronounced Salt character, fixing force within a viable vessel — but that Salt must contain Sulfur, the interior fire of purpose, and stay open to Mercury, the breath by which power moves. Closely tied to Jing: the Hara is both reservoir and cauldron.",
                x: "Its development shows quietly — stability without rigidity, readiness without agitation, strength that needs no display. It lets a person stay present under pressure because consciousness has descended into the body rather than retreating upward into thought." },
            ].map((c) => (
              <div key={c.k} className="group border border-border p-6 transition-colors hover:border-gold/40">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-2xl italic text-gold">{c.k}</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{c.pr}</span>
                </div>
                <p className="mt-3 font-serif text-lg italic leading-relaxed text-bone/90">“{c.q}”</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.e}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.a}</p>
                <p className="mt-4 border-t border-border pt-3 text-sm italic leading-relaxed text-bone/70">{c.x}</p>
              </div>
            ))}
          </div>

          {/* gift and distortion */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Gift and distortion
            </p>
            <div className="mt-6 -mx-6 aoh-scroll-x overflow-x-auto px-6 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <thead>
                  <tr>
                    {["", "Primary question", "Gift", "Possible distortion"].map((h) => (
                      <th key={h} className="border-b border-border px-3 pb-3 font-label text-[10px] uppercase tracking-[0.2em] text-gold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Head", "What is true or intelligible?", "Vision and orientation", "Abstraction, fixation, rationalization"],
                    ["Heart", "What is worthy of relationship?", "Value, sympathy, and virtue", "Sentimentality, enmeshment, emotional closure"],
                    ["Hara", "What can be embodied and sustained?", "Presence, power, and endurance", "Impulsiveness, inertia, domination"],
                  ].map((r) => (
                    <tr key={r[0]}>
                      <th className="border-b border-border px-3 py-4 text-left align-top font-serif text-lg italic text-gold">{r[0]}</th>
                      {r.slice(1).map((c, i) => (
                        <td key={i} className="border-b border-border px-3 py-4 align-top text-sm leading-relaxed text-muted-foreground">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* what each partial alignment produces */}
          <div className="mt-20">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What each partial alignment produces
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Head without Heart", "intelligence becomes cold manipulation"],
                ["Heart without Head", "compassion loses discrimination"],
                ["Hara without either", "power becomes blind compulsion"],
                ["Head and Heart", "beautiful ideals that never become embodied"],
                ["Heart and Hara", "passionate action without sufficient understanding"],
                ["Head and Hara", "efficient execution without moral participation"],
              ].map(([a, b]) => (
                <div key={a} className="border border-border p-4">
                  <div className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{a}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* full alignment as circulation */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Full alignment, in five movements
              </p>
              <div className="mt-6 space-y-px">
                {[
                  "The Head receives or recognizes a pattern.",
                  "The Heart tests that pattern through value and relationship.",
                  "The Hara determines whether it can be truthfully embodied.",
                  "Action produces consequences that return upward as new experience.",
                  "The three centres revise themselves through that feedback.",
                ].map((x, i) => (
                  <div key={x} className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-border py-4">
                    <span className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{x}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-bone/80">
                Not a hierarchy in which the Head commands and the body obeys. The Hara reports
                bodily truth upward; the Heart reveals relational consequences the intellect
                overlooked; the Head gives language to what the lower centres already know
                implicitly.{" "}
                <span className="text-gold-dim">
                  Alignment is a circulation, not a chain of command.
                </span>
              </p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Descent and return on a human scale
              </p>
              <div className="mt-6 border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">Descending</p>
                <p className="mt-3 font-serif text-lg leading-relaxed text-bone/90">
                  Pattern <span className="text-gold">→</span> Value{" "}
                  <span className="text-gold">→</span> Embodiment
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The Head perceives a possibility, the Heart gives it significance and direction,
                  the Hara supplies substance and endurance.
                </p>
              </div>
              <div className="mt-3 border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">Returning</p>
                <p className="mt-3 font-serif text-lg leading-relaxed text-bone/90">
                  Experience <span className="text-gold">→</span> Meaning{" "}
                  <span className="text-gold">→</span> Wisdom
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The Hara receives the actual consequences, the Heart finds their relational
                  meaning, the Head renders that meaning intelligible. What was merely undergone
                  becomes wisdom.
                </p>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Which maps onto the Three Treasures — the Hara concentrating Jing, the Heart
                circulating Qi, the Head clarifying Shen — though the correspondence should not be
                made absolute. Jing, Qi, and Shen operate throughout the organism; the triad names
                concentrations of function, not sealed compartments.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                It also settles where the Inner Sun belongs.{" "}
                <span className="text-gold-dim">
                  It is most naturally enthroned in the Heart, because the Heart mediates above and
                  below
                </span>{" "}
                — its wise fire illuminating the Head without inflating it, and warming the Hara
                without consuming its reserves.
              </p>
            </div>
          </div>

          <div className="mt-24">
            <TheAxis />
          </div>

          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The complete axis
            </p>
            <div className="mt-5 space-y-px">
              {[
                ["Head", "the pattern is seen"],
                ["Heart", "the pattern is loved, weighed, and related"],
                ["Hara", "the pattern is given substance"],
                ["The aligned person", "the pattern becomes a way of being"],
              ].map(([a, b], i) => (
                <div key={a} className="grid grid-cols-[9rem_1fr] items-baseline gap-4 border-b border-border py-3">
                  <span className={`font-label text-[10px] uppercase tracking-[0.2em] ${i === 3 ? "text-gold" : "text-gold-dim"}`}>{a}</span>
                  <span className={`font-serif text-lg italic ${i === 3 ? "text-bone" : "text-bone/80"}`}>{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Which makes development more than an ascent away from embodiment. Ascent without
              return may produce vision but not transformation; the mature movement rises toward
              clarity and then descends again as conduct, craft, speech, relationship, and presence.
            </p>
            <p className="mt-6 max-w-4xl font-serif text-2xl italic leading-relaxed text-bone">
              The axis is complete when Shen illuminates, Qi connects, and Jing sustains — when
              Logos gives direction, sympatheia establishes right relationship, and the Hara gives
              the whole configuration a living body.
            </p>
          </div>
        </div>
      </section>

      {/* THE SEVEN BOOKS */}
      <section id="organs" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/sprout-on-wet-black-rock.webp" opacity={0.61} position="center 55%" />
        <SectionGlyph delay={-230} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXIV · Organs, Elements, and Five Phases
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The interior ecology of the <span className="italic text-gold">living vessel</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            This is where the metaphysics acquires an embodied physiology. The living vessel is not
            a spirit inhabiting a biological machine. It is an organised ecology in which matter,
            vitality, emotion, consciousness, memory, and environment continually enter into one
            another. The organs are the relatively stable seats of that activity; the elements name
            the operations performed within them; the Five Phases describe how those operations
            change through time.
          </p>

          <div className="mt-12 max-w-3xl border-l-2 border-gold/50 pl-6">
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
              A distinction held throughout
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The Chinese Zang-Fu organs are <span className="text-bone/90">functional networks</span>,
              not equivalents of biomedical organs. The traditional Liver includes patterns of
              circulation, movement, emotion, perception, and seasonal correspondence extending well
              beyond the anatomical liver. Throughout this architecture, Liver, Heart, Spleen, Lung,
              and Kidney are capitalised when the traditional network is meant, and lowercase when
              the anatomical organ is. The World Health Organization likewise treats Zang-Fu and
              Five-Phase concepts as terminology belonging to a traditional medical system rather
              than to modern anatomical classification.
            </p>
          </div>

          {/* ---- the organ as seat ---- */}
          <div className="relative isolate mt-24 grid gap-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/bowls-and-leaf-on-wet-terrace.webp" opacity={0.56} position="center 55%" scrim={0.18} />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">Organs as physical-vital seats</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A seat does not mean the force exists nowhere else. It means the organ is one of the
                principal places where that force becomes functionally organised.
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground">
                The Heart may be the seat of circulation and relational integration, but relation
                occurs throughout the organism. The Kidney may be the seat of deep reserve,
                inheritance, and continuity, but Jing permeates the whole living vessel. The Lung may
                be the seat of breath, rhythm, boundary, and exchange, but every cell participates in
                exchange.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Each organ is consequently four things at once.
              </p>
              <div className="mt-6 grid gap-px sm:grid-cols-2">
                {[["Vessel", "contains and stabilises a function"],
                  ["Transducer", "converts one kind of force into another"],
                  ["Reservoir", "gathers particular capacities"],
                  ["Regulator", "maintains proportion among processes"]].map(([a, b]) => (
                  <div key={a} className="border-t border-border py-4 pr-4">
                    <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">{a}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                The three principles explain how this holds together. <span className="text-bone/90">Salt</span>{" "}
                gives the organ structure, boundary, and persistence. <span className="text-bone/90">Mercury</span>{" "}
                supplies circulation, communication, secretion, and adaptability.{" "}
                <span className="text-bone/90">Sulfur</span> is its characteristic impulse — the
                particular virtue it seeks to express. The four ethers describe dimensions of its
                organisation: Warmth activates its processes, Light gives them direction and
                differentiation, Tone coordinates their rhythm and proportion, and Life maintains
                their participation in the organism as a whole.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Root Ether is not a further substance stored inside the organs. It is the deeper
                condition that makes such coordination and transmission possible at all. The ethers
                provide formative functions; the organ embodies those functions within a specialised
                living vessel.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                This also settles what correspondence has meant all along. A planet, a metal, a
                plant, an organ, and a symbol do not correspond because they are materially
                identical. They correspond because different vessels can express analogous formative
                virtues. The organ is the inward biological vessel of a pattern that may appear
                elsewhere as colour, rhythm, mineral structure, plant behaviour, or celestial sign.
              </p>
            </div>
          </div>

          {/* ---- the phases in the body ---- */}
          <div className="mt-28 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">The Five Phases in the body</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Wu Xing is better rendered as five <span className="italic">phases</span>, movements,
              or processes than as five material elements. Wood, Fire, Earth, Metal, and Water name
              stages in the circulation and transformation of life. Select one to see the organ
              network, virtue, emotion, and modality of spirit it carries.
            </p>
            <div className="mt-12">
              <PhaseOrgans />
            </div>
            <p className="mt-12 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Generation alone, though, would become unchecked proliferation — which is why the
              regulating cycle drawn in § XV matters as much as the generating one shown here. Wood
              penetrates Earth, Earth contains Water, Water moderates Fire, Fire transforms Metal,
              Metal disciplines Wood. Generation provides possibility; regulation preserves
              proportion. Generation without limitation becomes excess. Limitation without
              generation becomes sterility.
            </p>
          </div>

          {/* ---- what each framework answers ---- */}
          <div className="mt-28 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">What each framework answers</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The Five Phases should not be collapsed into the tattvas or the Western elements. Each
              framework answers a different question, and the architecture holds only because it
              keeps asking them separately.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Root Ether", "the underlying condition of formative transmission"],
                ["Four Ethers", "the primary functions of subtle organisation"],
                ["Tattvas", "the qualitative or morphogenic bias of a force"],
                ["Classical elements", "the basic operations — activation, movement, cohesion, fixation"],
                ["Five Phases", "the stage and direction of transformation"],
                ["Qi", "the vitality presently circulating"],
                ["Channels", "the routes through which circulation is organised"],
                ["Organs", "the localised transformers of living force"],
                ["Three principles", "the grammar of impulse, mediation, and embodiment"]].map(([a, b], i) => (
                <div key={a}
                     className="grid grid-cols-[1.6rem_10rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[2rem_13rem_1fr]">
                  <span className="font-label text-[10px] text-gold-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A phase can therefore carry different tattvic textures. Wood does not hold one fixed
              tattva. Wood qualified by Apas appears as slow germination, flexible adaptation,
              patient growth; Wood qualified by Tejas becomes sudden initiative, penetrating vision,
              explosive expansion. Fire shaped by Apas is warmth that bonds and nurtures; Fire shaped
              by Vayu can become scattered stimulation. This is exactly what the sub-tattvas are for
              — the phase identifies the direction of movement, the tattvic combination identifies
              its qualitative texture.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Temperament follows the same rule. A person is not simply Wood or Water. Temperament is
              a shifting proportion of phase tendencies, tattvic biases, etheric organisation,
              inherited Jing, present Qi, and conscious Shen — strong Wood initiative and Earth
              endurance with deficient Metal discrimination in one situation, and an entirely
              different arrangement elsewhere.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The five modalities of spirit — Hun, Shen, Yi, Po, Zhi, which appear in the Huangdi
              Neijing and are read differently across periods and lineages — strengthen the
              Head-Heart-Hara model rather than complicating it. Consciousness is not imprisoned in
              the Head. The Head articulates vision, the Heart gathers luminous relation, the Hara
              anchors will and embodied continuity, and the entire organism participates in knowing.
            </p>
          </div>

          {/* ---- emotion as movement ---- */}
          <div className="mt-28 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">
              Emotion, organ, breath, and force
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              An emotion is not merely an idea in the mind. It is a directional movement of living
              force expressed at once through attention, breath, posture, visceral activity,
              imagination, and action. None of the five is intrinsically pathological. Anger protects
              what matters. Fear conserves life. Grief permits separation. Concern lets experience be
              assimilated. Joy opens the person to participation. The trouble begins when a necessary
              movement becomes excessive, deficient, frozen, displaced, or self-reinforcing.
            </p>
            <div className="mt-12 max-w-4xl">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                The loop that closes on itself
              </p>
              <div className="mt-5 flex flex-wrap items-stretch gap-2">
                {["Perception", "Emotion", "Breath and posture", "Organ-channel pattern"].map((t, i) => (
                  <div key={t} className="flex items-stretch gap-2">
                    <div className="flex min-h-[3.5rem] flex-1 items-center border border-border px-4 py-3">
                      <span className="text-sm leading-snug text-muted-foreground">{t}</span>
                    </div>
                    <ArrowMark className="self-center text-base text-gold" />
                    {i === 3 && (
                      <div className="flex min-h-[3.5rem] items-center border border-gold/50 px-4 py-3">
                        <span className="text-sm leading-snug text-gold">New perception</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Circulated often enough, this becomes the psychic and physiological flywheel of § IX.
                The person increasingly perceives the world through the pattern the pattern itself
                has helped produce, and the Morphaithēr acquires a matching atmosphere — hurried,
                constricted, agitated, heavy, brittle, or withdrawn.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Breath is the great mediator here. It stands at the threshold between voluntary and
                involuntary life, between exterior atmosphere and interior circulation, and is
                therefore profoundly Mercurial. It carries rhythm into emotion, redistributes warmth,
                alters bodily tension, and joins the Head, the Heart, and the Hara in a single
                movement.
              </p>
            </div>
          </div>

          {/* ---- healing ---- */}
          <div className="relative isolate mt-28 border-t border-border pt-16">
            <Backdrop src="/bg/burned-forest-slope-regrowing.webp" opacity={0.5} position="center 50%" scrim={0.22} portrait />
            <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <h3 className="font-serif text-2xl leading-tight">
                  Healing as re-patterning
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Not the removal of an undesirable force, but the restoration of a capacity: to
                  receive, transform, circulate, differentiate, release, rest, and begin again.
                </p>
              </div>
              <div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  A healed system is not permanently calm, open, warm, or balanced. It becomes
                  capable of moving appropriately — Water rests and replenishes, Wood begins and
                  redirects, Fire expresses and connects, Earth assimilates and stabilises, Metal
                  distinguishes and releases, and Water receives the distilled remainder. Healing is
                  a recovery of <span className="text-bone/90">formative range</span>: the person
                  regains the ability to enter a phase and then leave it once its work is done.
                </p>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  This has to happen across several layers at once.
                </p>
                <div className="mt-6 space-y-px">
                  {[["Physical vessel", "medical treatment, nourishment, sleep, rehabilitation, a change of environment"],
                    ["Vital field", "restored rhythm and proportion"],
                    ["Emotional field", "an unfinished movement felt through and completed"],
                    ["Symbolic field", "a new interpretation"],
                    ["Relational Morphaithēr", "healthier boundaries, surroundings, and forms of participation"]].map(([a, b]) => (
                    <div key={a} className="grid grid-cols-[9rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[11rem_1fr]">
                      <span className="font-label text-[10px] uppercase tracking-[0.15em] text-gold-dim">{a}</span>
                      <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                  The Crypt of Primordial Memory explains why healing is rarely an erasure. Earlier
                  patterns have already shaped the vessel. What healing establishes is a new
                  attractor — a more coherent way of organising experience, strong enough to redirect
                  future formation. The old pathway may remain possible without remaining sovereign.
                </p>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  This is the proper work of Ignisophia. Wise fire does not burn indiscriminately. It
                  supplies precisely enough warmth to mobilise what has stagnated without consuming
                  Jing, overwhelming the Heart, or scattering Qi. The Head recognises the pattern,
                  the Heart determines its meaning, and the Hara supplies the embodied power required
                  to change it.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="mx-auto max-w-3xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              Organs are the seats of transformation. Elements are its operations. The Five Phases
              are its cycle. Qi is its circulating force. Breath is its rhythm. Emotion is its
              inwardly experienced movement. <span className="italic text-gold">Healing is the
              restoration of their right relationship within the living vessel.</span>
            </p>
          </div>

          <div className="mt-16 mx-auto max-w-3xl border border-border p-6">
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              On the limits of these correspondences
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              These correspondences can support philosophical reflection and contemplative practice.
              They should not be used to diagnose physical illness. Anger does not prove liver
              disease, nor fear kidney disease, and nothing here describes an emotion literally
              stored in an organ. Traditional Chinese medicine treatments carry mixed evidence and
              real safety risks — particularly unsupervised herbal products — and persistent physical
              or psychological symptoms require appropriately qualified care.
            </p>
          </div>
        </div>
      </section>

      <section id="image" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/camera-obscura-projection-in-dark-room.webp" opacity={0.7} position="center 45%" scrim={0.18} />
        <SectionGlyph delay={-250} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXV · Image and Imagination
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The interior chamber of <span className="italic text-gold">form</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Image and imagination occupy the middle country of this system. They stand between
            forces not yet clearly representable and symbols that have acquired stable, communicable
            form. A hidden force does not ordinarily enter consciousness naked — it is received
            through the particular constitution of the living vessel, felt first as warmth, pressure,
            attraction, unease, rhythm, atmosphere, or directional impulse. Imagination then gives
            that modulation an inward appearance.
          </p>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Which makes imagination neither a passive screen nor a sovereign creator. It is a
            <span className="text-bone/90"> Mercurial organ of transduction</span>, translating
            between field and psyche, sensation and meaning, memory and possibility, spirit and
            embodiment.
          </p>

          <div className="relative isolate mt-20">
            <Backdrop src="/bg/darkroom-tray-under-single-lamp.webp" opacity={0.65} position="center 60%" scrim={0.05} />
            <h3 className="font-serif text-2xl leading-tight">The imaginal bridge</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Corbin used <span className="italic">imaginal</span> to distinguish an intermediary
              order of meaningful form from anything dismissed as merely imaginary. This system can
              adopt the term while keeping its epistemic restraint: the imaginal is the domain where
              forces become appearances and appearances become capable of carrying force. It can be
              treated as experientially real without assuming that every imaginal figure possesses an
              independently existing personality. And the bridge runs both ways.
            </p>
            <div className="mt-10 max-w-4xl">
              <ImaginalBridge />
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              This is symbolic causation. A symbol acts by organising attention, memory, emotion,
              expectation, bodily posture, interpersonal behaviour, and the surrounding Morphaithēr.
              Its action does not require imagining it as a battery containing some measurable occult
              substance. Warmth charges the symbol; Light gives it intelligible form; Tone coordinates
              its correspondences; Life integrates it into an enduring pattern of participation.
              Sulfur supplies its central intention, Mercury carries it between media and levels, and
              Salt gives it a stable image, material, name, proportion, or ritual form.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which makes symbols powerful but not automatically beneficial. Repeated images become
              attractors around which thought, emotion, and behaviour organise, contributing momentum
              to the flywheel of § IX. A solar image can gather courage, clarity, and purpose. It can
              equally become an image of superiority and self-inflation if the Heart and the Hara do
              not correct it. Ignisophia is itself an imaginal machine in exactly this sense — the
              Chariot, the wheels, the axis, the gyroscope, and the Inner Sun are not literal
              mechanisms but coordinated images that make otherwise invisible relationships
              perceptible.
            </p>
            <p className="mt-8 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              The image is successful when it enables the pattern to be inhabited.
            </p>
          </div>

          {/* ---- image as first legible configuration ---- */}
          <div className="relative isolate mt-28 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/camera-obscura-tree-cast-on-wall.webp" opacity={0.85} position="center 45%" scrim={0.05} />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">
                The soul&rsquo;s first reception of hidden form
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The soul, functionally: the image-bearing, affective, mediating dimension of the
                living vessel. Spirit supplies luminous orientation, the body supplies substance and
                limitation, and the soul receives, translates, remembers, desires, and imagines
                between them.
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl leading-relaxed text-bone/90">
                The soul does not photograph hidden form.{" "}
                <span className="italic text-gold">It gives hidden form a vessel.</span>
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                That distinction prevents two opposite errors — treating every image as arbitrary
                fantasy, and treating every vivid image as infallible disclosure of another world. An
                image may be meaningful without being literal. It may faithfully preserve the
                relationships inside a pattern while radically changing its visible appearance.
              </p>
              <div className="mt-8 border-l-2 border-gold/50 pl-6">
                <p className="text-base leading-relaxed text-muted-foreground">
                  A dream of a flooded house need not predict a flood. It may still preserve the
                  actual topology of an experience: containment has failed, a boundary has been
                  crossed, something formerly held outside is entering an interior chamber. The image
                  is structurally truthful without being a factual report.
                </p>
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                The four ethers describe how modulation becomes image. Warmth gives it intensity,
                urgency, and emotional charge. Light gives it contour, contrast, direction, and
                intelligibility. Tone arranges its internal proportions, repetitions, and sequences.
                Life joins it to memory, identity, purpose, and the organism as a whole.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                The tattvas give it atmosphere: Akasha as openness, depth, silence, encompassing
                void; Vayu as movement, branching paths, flight, fragmentation; Tejas as brilliance,
                sharp edges, revelation, conflict; Apas as reflection, fluidity, merging, gestation;
                Prithivi as weight, architecture, stone, boundary, durable form. And the sub-tattvas
                explain the subtler differences — Tejas modified by Apas appears as fire beneath
                water, or transformation occurring inside an emotional vessel, while Apas modified by
                Tejas appears as water heating, receptivity acquiring a penetrating intensity. The
                same symbolic materials carry different vectors depending on dominance and sequence.
              </p>
              <p className="mt-8 font-serif text-xl italic leading-relaxed text-bone/85">
                An image is a temporary psychic coagulum — fluid meaning held still long enough to be
                encountered.
              </p>
            </div>
          </div>

          {/* ---- eikon / phantasia ---- */}
          <div className="relative isolate mt-28 border-t border-border pt-16">
            <Backdrop src="/bg/round-mirror-set-in-stone-wall.webp" opacity={0.74} position="center 50%" />
            <h3 className="font-serif text-2xl leading-tight">
              Eik&#333;n, phantasia, and inner appearance
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              An <span className="italic">eik&#333;n</span> is neither identical to its source nor
              wholly disconnected from it. It reveals through resemblance — and because every
              resemblance is selective, it also conceals. A sacred image of the Sun is not the
              astronomical Sun, nor the planetary virtue of Sol, nor the Inner Sun, nor divine
              intelligence itself. Yet it may gather all of them into a single visible vessel. The
              image participates in a pattern without exhausting it.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              <span className="italic">Phantasia</span> is the activity through which something
              becomes inwardly apparent; a <span className="italic">phantasma</span> is a particular
              appearance presented through it. Aristotle distinguishes imagination from both sensation
              and discursive judgement while making it indispensable to thought — in{" "}
              <span className="italic">De Anima</span> III, the soul does not think without an image.
              That gives imagination a precise position here:
            </p>
            <div className="mt-8 grid gap-px sm:grid-cols-5">
              {[["Sensation", "supplies contact"], ["Phantasia", "gives contact an inward appearance"],
                ["Logos", "interprets and articulates it"], ["Desire", "assigns attraction or aversion"],
                ["The Hara", "prepares an embodied response"]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-4 pr-4">
                  <p className="font-label text-[10px] uppercase tracking-[0.15em] text-gold">{a}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              So inner appearance is already an interpretation. Memory, expectation, temperament,
              bodily state, culture, desire, and the surrounding Morphaithēr all take part in
              determining what form the appearance takes. Plato&rsquo;s{" "}
              <span className="italic">Sophist</span> separates images that preserve the proportions
              of their models from appearances that distort those proportions to satisfy a particular
              point of view — which becomes, here, the distinction between the eikonic and the
              phantasmatic.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="border-t border-gold/50 pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">Eikonic</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Preserves the important relationships inside the pattern, even when its visual
                  content is entirely symbolic.
                </p>
              </div>
              <div className="border-t border-border pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Phantasmatic
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Alters the pattern to serve fear, desire, vanity, ideology, or the expectations of
                  the observer.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              This does not make phantasia deceptive. Phantasia is the necessary organ of appearance;
              the question is only whether the appearance preserves the proportions of what it
              mediates. And that fidelity is not photographic resemblance but{" "}
              <span className="text-bone/90">relational fidelity</span> — does the image accurately
              express hierarchy, pressure, movement, conflict, attraction, distance, repetition,
              transformation? A serpent, a tower, an ocean, or a crown may be visually unlike the
              underlying condition while faithfully presenting its internal relationships.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Discernment is therefore threefold, as in § XXIII. The Head examines coherence and
              alternative interpretations. The Heart asks what relationships and values the image
              encourages. The Hara registers its embodied consequences. A compelling image that
              produces grandiosity, compulsive fear, dissociation, or loss of proportion should not
              be trusted merely because it is vivid.
            </p>
          </div>

          {/* ---- four modes ---- */}
          <div className="relative isolate mt-28 border-t border-border pt-16">
            <Backdrop src="/bg/sleeper-in-room-with-rippling-light.webp" opacity={0.85} position="center 40%" scrim={0.05} />
            <h3 className="font-serif text-2xl leading-tight">
              Dream, vision, memory, symbolic perception
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Four ways the image-bearing soul encounters patterns beyond ordinary literal awareness.
            </p>
            <div className="mt-12 space-y-12">
              {[
                { t: "Dream, as nocturnal alchemy",
                  b: "Dream loosens the dominance of immediate sensory reality, so memory, bodily sensation, unresolved emotion, anticipation, and imagination can combine more freely. It becomes an interior laboratory in which fixed identities are dissolved, displaced, recombined, personified, and tested. Its images may rise from recent sensation, bodily state, unfinished psychological process, creative anticipation, shared archetypal pattern, or what this system leaves open as genuinely transpersonal encounter.",
                  p: "These should not be forced into a single explanation. A dream can be psychologically generated and spiritually meaningful at once. Its origin may stay uncertain while its formative consequences are perfectly clear." },
                { t: "Vision, as concentrated inner appearance",
                  b: "An image or imaginal sequence with unusual autonomy, coherence, clarity, or presence — arising in contemplation, ritual, illness, exhaustion, hypnagogia, prayer, or altered consciousness. But intensity is not proof of metaphysical rank. A vision is evaluated by its proportions and its fruits: does it clarify or confuse, increase responsible agency or demand unquestioning submission, deepen virtue or inflate identity, survive critical examination without requiring the destruction of every alternative reading?",
                  p: "A psychologically generated vision can convey profound truth, and a seemingly transcendent one can still be misunderstood by its recipient. Reception and interpretation are separate operations." },
                { t: "Memory, as reconstituted form",
                  b: "The Crypt of Primordial Memory holds no perfect interior photographs. It retains formative consequences, pathways, associations, emotional contours, dispositions. Memory is the present vessel's reconstruction of what the past has made possible — so an old memory-image may change without becoming meaningless. The event is not necessarily changing; the present organisation of the vessel is changing what can be perceived within it.",
                  p: "Healing can reveal dimensions of an earlier experience that the former self lacked the capacity to receive. Memory is not merely retrospective — what is remembered, how it is pictured, and where it sits in the person's symbolic world all shape what can happen next." },
                { t: "Symbolic perception, as disciplined correspondence",
                  b: "An event can hold more than one level of meaning. A door is a physical object, a social boundary, a psychological threshold, a ritual gate, and an image of transition. But symbolic perception must not decay into indiscriminate pattern projection: the existence of correspondence does not mean everything confirms whatever reading the observer prefers. A strong interpretation clarifies multiple details rather than resting on one accidental resemblance, stays open to correction, increases proportion and agency rather than fear and self-importance, can be considered on bodily, biographical, relational, cultural, and metaphysical levels, and produces coherent consequences without demanding certainty.",
                  p: "A true symbol opens meaning while preserving mystery. A delusive interpretation closes meaning by insisting it has explained everything." },
              ].map((m) => (
                <div key={m.t} className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                  <p className="font-serif text-xl leading-tight text-bone/90">{m.t}</p>
                  <div>
                    <p className="text-base leading-relaxed text-muted-foreground">{m.b}</p>
                    <p className="mt-4 border-l-2 border-gold/40 pl-5 text-base leading-relaxed text-bone/75">
                      {m.p}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- cartography ---- */}
          <div className="relative isolate mt-28 border-t border-border pt-16">
            <Backdrop src="/bg/dark-hall-with-charted-stone-floor.webp" opacity={0.61} position="center 65%" scrim={0.05} />
            <h3 className="font-serif text-2xl leading-tight">
              Sacred art, diagrams, and esoteric cartography
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Sacred art is not simply art depicting religious subjects. It is art built as an
              organised vessel of attention, in which proportion, orientation, material, colour,
              rhythm, gesture, number, and placement collaborate to produce a particular mode of
              encounter. A single sacred image may work at once as an eik&#333;n revealing a higher
              pattern through likeness, a gate that changes the observer&rsquo;s mode of attention, a
              mnemonic vessel preserving doctrine, a field-organiser inside a ritual Morphaithēr, a
              contemplative mirror, and a symbolic body through which a community participates in
              shared meaning.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A diagram does something related but distinct. It does not portray how metaphysical
              realities look; it shows how principles relate, externalising hierarchy, polarity,
              sequence, recursion, circulation, correspondence, and transformation. An esoteric
              diagram is better understood as{" "}
              <span className="text-bone/90">compressed relational reasoning</span> than as a picture
              of invisible geography. The Tree of Life is not a photograph of the cosmos. A chakra
              chart is not an anatomical scan. A planetary seal is not a visible piece of a planet. A
              tattvic glyph is not the tattva. Each selects particular relationships and makes them
              available for contemplation and operation — which is exactly what every diagram on this
              page is doing, and exactly what none of them should be mistaken for.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              These layers must therefore be held together without being collapsed. Five tattvas are
              not five phases merely because both systems contain five members. Seven planets are not
              automatically seven chakras. Four ethers are not renamed classical elements.
              <span className="text-bone/90"> Correspondence must preserve difference as well as
              resemblance.</span> Talismanic traditions understood something similar in practice:
              Agrippa treats celestial figures and characters as stellar virtues appearing through
              plants, stones, animals, and the human microcosm — no single component producing the
              effect. Image, material, timing, operator, intention, ritual environment, and receptive
              vessel form a temporary ecology. The talisman is less a container filled with celestial
              energy than a coordinated point of convergence.
            </p>

            <p className="mt-14 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Five rules for any map in this architecture
            </p>
            <div className="mt-6 max-w-4xl">
              {[["Every map declares its scale",
                 "A psychological map must not silently become a cosmological claim."],
                ["Lines must have meanings",
                 "A line may indicate emanation, opposition, circulation, analogy, sequence, or governance. These are not interchangeable."],
                ["Direction and order are preserved",
                 "Apas–Tejas is not Tejas–Apas, just as ascent is not descent."],
                ["No correspondence erases the vessel",
                 "The same force is translated differently by a planet, a plant, an organ, an image, a person, or a rite."],
                ["No map exhausts the field",
                 "Every successful diagram reveals a pattern by excluding other possible views."]].map(([a, b], i) => (
                <div key={a} className="grid grid-cols-[1.6rem_1fr] gap-4 border-b border-border py-4 sm:grid-cols-[2rem_14rem_1fr]">
                  <span className="font-label text-[10px] text-gold-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-gold sm:text-[13px]">{a}</span>
                  <span className="col-start-2 text-sm leading-relaxed text-muted-foreground sm:col-start-3">
                    {b}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Sacred art and esoteric diagrams are forms of selective permeability. They admit
              particular relationships into perception while filtering others out. Their boundaries
              are what make contemplation possible — and their boundaries must never be mistaken for
              the boundary of reality itself. The deepest function of esoteric art is not to decorate
              a system or prove its doctrines. It is to make hidden relationships available to
              perception, contemplation, memory, and embodiment.
            </p>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="mx-auto max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              Force becomes image. Image becomes symbol. Symbol becomes orientation. Orientation
              becomes action. Action reshapes the living vessel —{" "}
              <span className="italic text-gold">
                and the transformed vessel becomes capable of receiving new images.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="symbol" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/starling-murmuration-over-field.webp" opacity={0.63} position="center 40%" scrim={0.3} />
        <SectionGlyph delay={-270} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXVI · Symbol
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The knot where <span className="italic text-gold">worlds meet</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            § XXV placed image between hidden modulation and conscious appearance. Symbol begins
            where an image, word, number, gesture, object, or geometry becomes stable enough to
            gather several levels of reality into one recognisable relationship. Not every image is a
            symbol, and not every symbol is visual — a sound, a name, a posture, a rite, a mythic
            figure, an architectural orientation, or a recurring event may all become symbolic when
            they bind a visible form to a larger pattern.
          </p>
          <p className="mt-8 font-serif text-3xl leading-tight text-bone/90">
            An image appears. <span className="italic text-gold">A symbol joins.</span>
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            So a symbol is not a substitute for something absent. It is a relational vessel through
            which different orders become present to one another without becoming identical —
            a conjunction without a collapse.
          </p>

          {/* ---- the axiom, held between the two images ---- */}
          <div className="my-32">
            <div className="mx-auto h-px w-24 bg-gold/50" />
            <p className="mx-auto mt-14 max-w-3xl text-center font-serif text-3xl leading-tight text-bone/90 sm:text-4xl">
              A symbol is a broken thing.
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-center font-serif text-2xl leading-relaxed text-bone/85 sm:text-3xl">
              That is not its defect —{" "}
              <span className="italic text-gold">it is how it works.</span>
            </p>
            <p className="mx-auto mt-10 max-w-xl text-center text-base leading-relaxed text-muted-foreground">
              Meaning is held in neither half. It occurs in the fitting.
            </p>
            <div className="mx-auto mt-14 h-px w-24 bg-gold/50" />
          </div>

          {/* ---- symbolon ---- */}
          <div className="relative isolate mt-24">
            <Backdrop src="/bg/hands-marking-clay-tally.webp" opacity={0.7} position="center 45%" scrim={0.2} />
            <h3 className="font-serif text-2xl leading-tight">Symbol as symbolon</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The Greek <span className="italic">symbolon</span> meant a token, tally, credential, or
              sign of recognition — and specifically one of two corresponding pieces held by
              different parties, which authenticated an agreement when brought together and fitted.
              Which gives a precise metaphysical image: a symbol does not hold its whole meaning in
              isolation. Its significance appears in the fitting. The visible form is one half. The
              hidden pattern is the corresponding half.{" "}
              <span className="text-bone/90">Consciousness is the party capable of recognising that
              they fit.</span>
            </p>
            <div className="mt-12">
              <Symbolon />
            </div>
            <p className="mt-12 max-w-3xl text-base leading-relaxed text-muted-foreground">
              None of which makes a symbol a puzzle with one secret answer. The two-piece image has
              to be extended into more than two dimensions: a developed symbol may fit several
              realities at once — psychological, elemental, celestial, historical, ethical,
              biological, theological. These meanings are not identical, but they hold enough
              structural resemblance to participate in one symbolic field. A symbol is better
              imagined as a multifaceted key: different faces enter different locks, and all of them
              belong to a single organised form.
            </p>
          </div>

          {/* ---- sign, symbolon, synthema ---- */}
          <div className="mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">Sign, symbolon, synthema</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Three words that are routinely used interchangeably, and are not interchangeable
                here.
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground">
                A sign directs attention toward a referent: smoke to fire, an arrow to a direction, a
                word to a thing. A symbol can do that too, but it also gathers, participates, and
                transforms, and its meaning exceeds any single definition.{" "}
                <span className="text-bone/90">The sign tells us where to look; the symbol alters the
                way in which looking occurs.</span> The distinction is not absolute — a sign
                accumulates symbolic depth through history and use, and a symbol can be flattened
                back into a sign. A crown may indicate a king, symbolise sovereignty, embody social
                authority, represent the solar centre, or become an image of spiritual attainment,
                depending entirely on which relationships are live around it.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                In late Platonic and theurgic usage <span className="italic">symbola</span> and{" "}
                <span className="italic">synthemata</span> overlap heavily, both naming material,
                verbal, or ritual tokens that connect visible things to divine principles — Iamblichus
                describes symbolic forms as making invisible formative principles perceptible through
                visible configuration. Rather than force a rigid distinction onto the historical
                texts, this architecture adopts an internal convention and holds to it:
              </p>
              <div className="mt-8 space-y-px">
                {[["Symbolon", "the connective relationship through which realities fit together"],
                  ["Synthema", "the particular mark, word, material, gesture, or configuration serving as an operative key within that relationship"],
                  ["Symbola", "the multiple correspondential forms gathered into a system"],
                  ["Synthemata", "the operative signs through which that system is ritually or contemplatively engaged"]].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[9rem_1fr]">
                    <span className="font-serif text-lg italic text-gold">{a}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                So the Sun is a great symbolon, joining several levels of centrality and
                illumination, while a particular solar seal, divine name, gesture, metal, incense, or
                ritual hour functions as a synthema within a solar operation.{" "}
                <span className="text-bone/90">The symbolon describes the bond; the synthema provides
                an access point.</span>
              </p>
            </div>
          </div>

          {/* ---- gathered reality ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/caldera-lake-at-sunrise.webp" opacity={0.44} position="center 50%" scrim={0.24} />
            <h3 className="font-serif text-2xl leading-tight">The symbol as gathered reality</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A powerful symbol gathers a constellation into a bounded form — a visible or audible
              configuration, a history of use, an emotional atmosphere, a philosophical meaning, a
              mythic narrative, an organ correspondence, a celestial virtue, an elemental operation,
              a ritual function, a communal memory, a personal encounter. It does not mix them
              indiscriminately. It holds them as a chord holds several distinct notes, which is why
              Tone Ether matters so much to symbolism: Tone establishes the proportion that lets
              multiplicity become harmony rather than confusion.
            </p>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div className="border-t border-gold/50 pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">Centre</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Its governing formative virtue. Lose it and interpretation becomes arbitrary.
                </p>
              </div>
              <div className="border-t border-gold/50 pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                  Circumference
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The range of forms through which that virtue can appear. Reduce it to one
                  permissible definition and the symbol becomes a code.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The circle may signify wholeness, continuity, protection, recurrence, enclosure,
              celestial motion, perfection, or limitation — and that is not an arbitrary list. Every
              item follows from its governing structure: a continuous boundary organised around a
              centre.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              A living symbol holds a stable centre and an expanding circumference.
            </p>

            <p className="mt-16 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              What a symbol needs in order to live — and its three deaths
            </p>
            <div className="mt-6 grid gap-px lg:grid-cols-3">
              {[["Salt", "an identifiable body — line, word, emblem, implement, geometry. What makes it repeatable and transmissible.",
                 "Inert", "Salt without Mercury or Sulfur: recognisable, and lifeless."],
                ["Mercury", "interpretive mobility. Movement between mind and body, myth and philosophy, dream and rite, one culture and another — new meaning without loss of identity.",
                 "Incoherent", "Mercury without Salt: endlessly shifting, with no stable centre."],
                ["Sulfur", "the central virtue, fascination, intention, living fire. What makes the symbol matter at all.",
                 "Coercive", "unregulated Sulfur: charged with intensity, and resistant to interpretation, proportion, and correction."]].map(([a, b, c, d]) => (
                <div key={a} className="border-t border-border py-5 pr-6">
                  <p className="font-serif text-xl text-gold">{a}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  <p className="mt-5 font-label text-[10px] uppercase tracking-[0.18em] text-bone/50">
                    {c}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-bone/60">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A complete symbol needs all three at once: stable form, interpretive circulation, and
              living centrality. The ethers then carry it — Warmth gives it charge and the power to
              mobilise attention, Light reveals its pattern, Tone harmonises its correspondences
              across levels, Life integrates it into memory, identity, and tradition. Root Ether is
              not a further meaning encoded inside it but the condition that lets distinct levels
              enter relationship at all, and it is never exhausted by any symbol. The tattvas decide
              how it is experienced: open enough to resonate, mobile enough to travel, luminous enough
              to be recognised, cohesive enough to gather, stable enough to endure.
            </p>
          </div>

          {/* ---- force, pattern, symbol, consciousness ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">
              Force, pattern, symbol, consciousness
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Four terms with four distinct places. Force is a capacity, tendency, pressure, or power
              of transformation. Pattern is the relational organisation that gives force direction
              and proportion. Symbol is the perceptible condensation through which that pattern can
              be encountered. Consciousness is the receptive centre able to recognise, interpret, and
              embody it. Their relation is a circle:
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
              {["Force", "Pattern", "Symbol", "Consciousness", "Action", "Altered field"].map((t, i) => (
                <div key={t} className="flex items-center gap-3">
                  <span className={`border px-3 py-2 text-sm ${
                    i === 5 ? "border-gold/60 text-gold" : "border-border text-muted-foreground"}`}>
                    {t}
                  </span>
                  {i === 5 ? <CycleMark className="text-base text-gold" /> : <ArrowMark className="text-base text-gold" />}
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A symbol is not a battery holding a fixed quantity of occult force. Its potency is
              relational — dependent on its construction, the condition of the recipient, the
              surrounding context, the history of use, the quality of attention, the timing, and the
              action that follows. So the same symbol produces different effects in different
              vessels. A serpent may evoke healing, danger, renewal, wisdom, sexuality, mortality, or
              deception; that variation does not prove the symbol means everything, only that
              different vessels activate different portions of its relational field. And the same
              force takes different symbols: transformation appears as fire, as death and rebirth, as
              a shedding serpent, a broken vessel, a spiral, a blackened sun, a passage through a
              gate. The images differ; the pattern stays recognisable.
            </p>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div className="border-t border-gold/50 pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                  Integral coherence
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Coordinates many parts of the person while preserving discernment, ethical
                  proportion, and agency.
                </p>
              </div>
              <div className="border-t border-border pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Parasitic coherence
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Organises the field around fear, compulsion, ideological closure, grandiosity, or
                  dependency.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Both may be powerful.{" "}
              <span className="text-bone/90">Power alone does not distinguish them</span> — the
              distinction is the one drawn in § XII, here applied to symbols. Which is why the
              decisive question is never simply whether the symbol works:
            </p>
            <p className="mt-8 max-w-3xl border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-bone/90">
              What kind of world does the symbol teach its participants to inhabit?
            </p>
          </div>

          {/* ---- organising perception ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">How symbols organise perception</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Symbols do not only receive meaning after perception. They help determine what will be
              perceived. A symbol establishes a field of salience — marking some details as
              important, binding them to memory and expectation, and setting them inside a larger
              pattern. Once the symbolism of the labyrinth is known, an intricate path starts to
              appear as initiation rather than confusion. Once the solar pattern is interiorised,
              crowns and centres and gold and radiance and kingship and hearts begin to gather around
              a shared formative intuition.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Select", "Every symbol opens attention to some relationships while obscuring others — symbolic selective permeability."],
                ["Group", "Seemingly unrelated experiences are gathered under a common pattern."],
                ["Scale", "The same relationship becomes visible in a body, a household, a temple, a planet, a myth, a metaphysical process."],
                ["Charge", "Emotion and value attach to otherwise neutral perceptions."],
                ["Orient", "Centres, directions, thresholds, boundaries, goals, adversaries, paths, and possible actions are established."]].map(([a, b], i) => (
                <div key={a} className="grid grid-cols-[1.6rem_6rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[2rem_8rem_1fr]">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A symbol is therefore both lens and compass: it affects what appears, and how the
              person moves through what appears. Reception travels the whole human axis. The Head
              distinguishes structure, correspondence, and possible readings. The Heart determines
              relational and ethical meaning. The Hara decides whether the symbol can become presence,
              conduct, and sustained action. Left in the Head it stays an intellectual curiosity;
              taking the Heart without the Head it yields sentimentality, devotion without
              discernment, emotional possession; firing the Hara without either it produces impulsive
              or coercive action. A symbol becomes transformative only when vision, value, and
              embodiment align around it.
            </p>
            <p className="mt-10 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Symbolic literacy — three attentions at once
            </p>
            <div className="mt-6 grid gap-px md:grid-cols-3">
              {[["Seeing the symbol", "as an actual object or image."],
                ["Seeing through it", "toward the pattern it mediates."],
                ["Seeing what it does", "within the observer. This third is the one routinely neglected."]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-4 pr-5">
                  <p className="font-label text-[10px] uppercase tracking-[0.15em] text-gold">{a}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A person may produce sophisticated interpretations while failing to notice that the
              symbol is inflaming fear, feeding vanity, or narrowing perception. So the mature
              interpreter asks what the symbol reveals and what it conceals; what emotional
              temperature it produces; which actions it makes more imaginable; whether it preserves
              the distinctions between levels; whether it can tolerate alternative readings; whether
              it deepens agency and virtue or demands submission; and whether its claimed meaning
              suits the scale being examined. The goal is not to escape symbols — consciousness
              cannot operate without them. The goal is to keep one symbol from masquerading as the
              whole Field.
            </p>
          </div>

          {/* ---- transmission ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">
              How symbols transmit hidden structure
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              By preserving relationships across a change of medium. A centre surrounded by a
              circumference can appear as the solar glyph, an eye, a mandala, a ritual circle, a city
              built around its temple, a monarch amid a court, or the Inner Sun coordinating the
              flywheel. The material changes; the relation between centre and surrounding field does
              not. That preserved relation is the symbol&rsquo;s{" "}
              <span className="text-bone/90">formative invariant</span> — and it is why geometry is so
              powerful in esoteric cartography, since geometry carries relational structure while
              staying free of the accidental detail of any single embodiment.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Geometry", "centre, boundary, axis, polarity, symmetry, proportion"],
                ["Number", "repetition, division, sequence, relational order"],
                ["Colour and material", "qualitative and elemental temperament"],
                ["Myth", "structure carried through time, relationships turned into characters and events"],
                ["Ritual", "structure carried through embodied sequence"],
                ["Architecture", "structure carried through spatial movement"],
                ["Music and sacred speech", "rhythm, resonance, and Tone Ether"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[9rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[13rem_1fr]">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which makes a symbol a kind of morphogenic seed. It does not hold a completed
              interpretation in miniature; it holds generative constraints that unfold differently
              according to vessel, environment, and conditions of growth. And no transmission is ever
              complete.
            </p>
            <div className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                The Law of Symbolic Remainder
              </p>
              <p className="mt-4 font-serif text-xl leading-relaxed text-bone/90">
                No symbol exhausts the force it mediates, no interpretation exhausts the symbol, and
                no consciousness exhausts the Field from which meaning arises.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The same law as § XVII&rsquo;s, taken to three levels at once. And the remainder is
                not a defect: it is what keeps the symbol alive — a perfectly
                exhausted symbol stops generating understanding and becomes a technical code. The
                danger begins when the interpreter forgets the remainder and takes the map for the
                territory. The solar symbol may disclose something essential about centrality without
                proving every centred structure solar in the same way; the serpent may disclose
                transformation without reducing every serpent to one definition.
              </p>
            </div>
          </div>

          {/* ---- the ladder ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">
              Symbol, diagram, ritual, tradition
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              With the convention in place, the relations among these can be stated exactly.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Symbolon", "establishes a bond of recognition between divided orders"],
                ["Synthema", "acts as an operative signature, token, or key"],
                ["Diagram", "arranges relations in space"],
                ["Ritual", "unfolds those relations through time — § XXVII"],
                ["Living vessel", "embodies and metabolises the operation"],
                ["Morphaithēr", "provides the formative atmosphere through which it moves"],
                ["Tradition", "preserves the capacity to recognise and regenerate it across generations — § XXXIII"]].map(([a, b], i) => (
                <div key={a} className="grid grid-cols-[1.6rem_1fr] gap-4 border-b border-border py-3 sm:grid-cols-[2rem_10rem_1fr]">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-gold">{a}</span>
                  <span className="col-start-2 text-sm leading-relaxed text-muted-foreground sm:col-start-3">
                    {b}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              So a sacred diagram is a constellation of symbola: its lines show relationships, its
              nodes stabilise principles, its colours supply qualitative differentiation, its centre
              establishes an attractor, and its boundaries determine what belongs to the field it
              represents. A ritual moves through that diagram even when no chart is present — the
              body becomes its geometry, the sequence its path, the words its Tone, the intention its
              Sulfur — though that Sulfur is not reducible to the officiant&rsquo;s conscious
              wishes. It may be carried by the rite&rsquo;s inherited structure, its office, its
              traditional interpretation, or its actual operative object. Otherwise an inherited rite
              performed faithfully but imperfectly understood would have no directing principle at
              all.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              And a symbol that has accumulated sustained attention, memory, emotion, and use can
              carry something of its atmosphere into new settings — a{" "}
              <span className="text-bone/90">portable Morphaithēr</span>. Not because an atmosphere is
              mechanically trapped inside it, but because the symbol can rapidly reassemble a
              recognisable ecology of perception and participation. A household emblem gathers family
              memory. An icon gathers prayer, doctrine, architecture, gesture, community. A planetary
              seal gathers timing, mythology, metal, colour, number, intention. A publisher&rsquo;s
              mark gathers an entire intellectual identity into one visible form. The symbol
              transmits hidden structure by teaching each new vessel how to reconstruct the
              relationships it carries.
            </p>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
              Root Ether makes relation possible. The four ethers animate its transmission. The
              tattvas give it qualitative texture. Pattern gives it proportion. The symbol gives it a
              recognisable vessel. Consciousness recognises the fit. Action returns the pattern to
              the world.
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              The symbol is completed in the act of fitting —{" "}
              <span className="italic text-gold">
                hidden structure to visible form, visible form to consciousness, and consciousness to
                life.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="ritual" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/ritual-circle-with-bowls-and-flame.webp" opacity={0.72} position="center 55%" scrim={0.15} />
        <SectionGlyph delay={-370} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXVII · Ritual
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The geometry of <span className="italic text-gold">consecrated time</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Ritual is a bounded and ordered enactment through which a symbolic pattern is made
              operative in time, matter, attention, and the living body.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            § XXVI left the ladder at the point where a diagram arranges relations in space. Ritual
            is where those relations unfold through time — and it is the rung the architecture has
            been leaning on all along without ever defining.
          </p>

          <div className="mt-16">
            <RiteSequence />
          </div>

          {/* ---- habit and rite ---- */}
          <div className="relative isolate mt-28 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/ablution-tower-tiered-stone-basins.webp" opacity={0.5} position="center 40%" scrim={0.24} portrait anchor="left" />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">Repetition is not the criterion</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Both a habit and a rite are repeated embodied sequences. The difference is not
                frequency.
              </p>
            </div>
            <div>
              <div className="grid gap-10 md:grid-cols-2">
                <div className="border-t border-border pt-5">
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Habit
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Repeats in order to conserve behaviour, economising attention until the action
                    becomes automatic.
                  </p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">Rite</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Orders action in relation to a threshold, an object, and a transformation —
                    gathering attention, differentiating the moment from ordinary time, and directing
                    the participant through a deliberate passage.
                  </p>
                </div>
              </div>
              <p className="mt-8 font-serif text-xl italic leading-relaxed text-bone/85">
                A rite may be performed only once. Repetition therefore cannot be its essence.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Which also settles what the threshold is for. It establishes a temporary world of
                operation, and crossing it changes what gestures, words, materials, and persons are
                permitted to mean and to do. Inside that boundary the sequence is not a list but a
                dependency: purification prepares what invocation addresses, invocation establishes
                what offering joins, participation receives what sealing preserves. Order expresses
                the causal grammar of the particular operation — neither decorative nor universally
                fixed, and alterable only at the cost of weakening the rite, reversing its movement,
                or producing a different operation entirely.
              </p>
            </div>
          </div>

          {/* ---- consecration ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/gong-at-end-of-dark-corridor.webp" opacity={0.7} position="center 50%" scrim={0.2} portrait />
            <h3 className="font-serif text-2xl leading-tight">Consecration and its release</h3>
            <div className="mt-8 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-serif text-xl leading-relaxed text-bone/90">
                Consecration withdraws a vessel from unrestricted use and binds it to a particular
                name, pattern, office, or end.
              </p>
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Defined that way — relationally, rather than as a vague making-sacred — it immediately
              requires a counterpart. If consecration establishes a bond, something must be able to
              conclude it.
            </p>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div className="border-t border-gold/50 pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                  Deconsecration
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The deliberate release of the bond, and the return of the vessel to ordinary
                  circulation. It concludes the relation properly.
                </p>
              </div>
              <div className="border-t border-border pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Desecration
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The violation of a relation still standing. Not the same act, and not the same
                  outcome.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The distinction earns its place because vessels, places, and gestures retain formative
              inertia — § XII&rsquo;s term — after the work they were bound to has ended. A bond left
              unreleased does not simply lapse. It goes on operating without an operator.
            </p>
          </div>

          {/* ---- telestic inertia ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">When the object silently changes</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              This is the characteristic failure, and it is subtler than a rite going hollow. A rite
              that loses its declared object does not thereby become objectless. Its{" "}
              <span className="text-bone/90">operative</span> object may simply change — toward
              institutional continuity, collective identity, authority, the management of anxiety, or
              the preservation of an egregore in the sense § XXVIII gives it. The form survives
              because something is still being fed by it, even though that something is no longer
              what the participants name.
            </p>
            <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                Telestic inertia
              </p>
              <p className="mt-4 font-serif text-xl leading-relaxed text-bone/90">
                The continuation of an operative sequence after its original telos has disappeared,
                been forgotten, or been replaced.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A sharper term than calling such a rite merely mechanical. Mechanical suggests
                something has stopped; telestic inertia names the fact that it has not stopped at all,
                and that the question worth asking is not whether the rite still works but{" "}
                <span className="italic">what it now works upon</span>.
              </p>
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which is why the intention supplying a rite&rsquo;s Sulfur cannot be reduced to the
              officiant&rsquo;s conscious wishes. It may be carried in the inherited structure, the
              office, the traditional interpretation, or the actual operative object — otherwise an
              inherited rite performed faithfully but imperfectly understood would possess no
              directing principle at all, which is plainly false. It is also why the discernment
              §&nbsp;XXV asks of images belongs here unchanged: see the rite, see through it to the
              pattern, and see what it is doing to those who enact it.
            </p>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="mx-auto max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              Ritual transmits pattern through ordered time{" "}
              <span className="italic text-gold">within an enactment</span> — where § XXXIII
              transmits it through historical time, across generations.
            </p>
          </div>
        </div>
      </section>

      <section id="taxonomy" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/field-lines-in-black-volcanic-sand.webp" opacity={0.62} position="center 60%" scrim={0.15} />
        <SectionGlyph delay={-290} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXVIII · Taxonomy of Forces
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Six modes of causation in the <span className="italic text-gold">living field</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            A force, here, is not necessarily a measurable physical energy. It is any organised
            capacity to produce, direct, inhibit, or transform a state. A symbol, an emotion, a
            gravitational interaction, a social institution, a formative pattern, and a transcendent
            ideal may all exert force — and they do not operate in the same way.
          </p>

          <div className="mt-16">
            <ForceRegisters />
          </div>

          {/* ---- transcendent ---- */}
          <div className="relative isolate mt-28 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/cave-pool-under-single-light-shaft.webp" opacity={0.56} position="center 50%" scrim={0.18} portrait />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">Transcendent — force beyond force</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Causation closer to finality than to impact. It answers: for the sake of what?
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground">
                Better understood as transcendent principles, virtues, or attractors — realities that
                orient formation without mechanically pushing it. The Good does not shove a being
                toward goodness; it draws by becoming an object of participation. Beauty organises
                desire by attraction. Truth exerts force by compelling greater coherence. Unity draws
                fragmented parts toward integration. Logos gives direction to what would otherwise
                stay unarticulated.
              </p>
              <div className="mt-8 border-l-2 border-gold pl-6">
                <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                  The transcendent is not Root Ether
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Root Ether is the primordial condition of transmissibility and formative
                  possibility. It belongs to the architecture of manifestation. It is not God, the
                  One, or the ultimate source of being. The transcendent exceeds the entire field;
                  Root Ether is the deepest condition{" "}
                  <span className="italic">within</span> which differentiated formation becomes
                  possible. Keeping them apart is what stops the metaphysics from confusing the
                  medium of manifestation with its source.
                </p>
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                No transcendent principle is fully contained inside a symbol, deity, doctrine, or
                vision. These are vessels of participation, each revealing something and each leaving
                an irreducible remainder. A solar deity may participate in illumination, centrality,
                sovereignty, and generative radiance without being identical to the Absolute. The
                characteristic danger at this level is{" "}
                <span className="text-bone/90">metaphysical inflation</span> — mistaking a powerful
                psychic image, a personal preference, or a collective doctrine for an unquestionable
                transcendent command. So a claimed transcendent force is judged by its fruits:
                whether it produces integration, virtue, proportion, humility, and deeper
                participation, or grandiosity, rigidity, and exemption from discernment.
              </p>
            </div>
          </div>

          {/* ---- formative ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/travertine-cascade-in-gorge.webp" opacity={0.46} position="center 50%" scrim={0.22} portrait />
            <h3 className="font-serif text-2xl leading-tight">Formative — the forces that give pattern</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Formative forces do not necessarily supply the energy that moves a system. They
              establish the pattern, boundaries, proportions, gradients, and attractors according to
              which movement takes form. A riverbed does not create the water, but it gives the water
              a path. A musical scale does not create sound, but it determines which relationships
              can become harmonic.
            </p>
            <p className="mt-8 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              What a formative force is made of
            </p>
            <div className="mt-5 flex flex-wrap items-stretch gap-2">
              {["Etheric function", "Tattvic bias", "Geometry", "Vessel", "Timing"].map((t, i) => (
                <div key={t} className="flex items-stretch gap-2">
                  <div className="flex min-h-[3rem] items-center border border-border px-4">
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </div>
                  {i < 4 && <span className="self-center font-label text-sm text-gold" aria-hidden>+</span>}
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which is why Warmth Ether expressed through Tejas–Vayu behaves nothing like Warmth
              Ether expressed through Tejas–Apas. The first spreads rapidly and turns volatile; the
              second generates a cohesive warmth capable of gestation, or of relationship.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              These forces act less like blows than like attractors: they make certain configurations
              increasingly probable, repetition deepens the channel, and formative inertia begins to
              preserve the pattern. It is how habits, organisms, symbols, institutions, and psychic
              complexes hold a recognisable form while their material contents change completely.
              Distortion comes at either extreme — rigidity prevents adaptation, plasticity prevents
              consolidation. Healthy formation requires{" "}
              <span className="text-bone/90">metastability</span>: structure enough to hold identity,
              openness enough to change.
            </p>
          </div>

          {/* ---- psychic ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Psychic — within the image-bearing soul</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Attention, desire, emotion, imagination, intention, memory, expectation, belief,
              aversion, identification, will. These are real forces because they alter perception,
              physiology, choice, behaviour, relationship, and environment — but they are never
              disembodied substances floating inside the skull. Along the human axis: the Head sees a
              possibility, the Heart charges it with significance, and the Hara determines whether
              there is force enough to embody it.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              An image concentrates diffuse psychic force into an appearance; a symbol gathers that
              appearance into a stable relationship; repetition gives it momentum. That is the
              flywheel of § IX, and it turns either way. A fear complex runs it negatively — an
              ambiguous event reads as threatening, the image activates fear, fear changes breath and
              posture, tension makes the world feel more dangerous, and the reading is confirmed.
              Ignisophia runs the same principle integrally, coordinating understanding and desire
              around the Inner Sun so that force stops spinning about contradictory centres.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Dispersed", "attention and desire moving in incompatible directions"],
                ["Blocked", "an impulse that can find no viable path"],
                ["Compulsive", "repetition that has become self-reinforcing"],
                ["Integrated", "Head, Heart, and Hara sharing one centre"],
                ["Consecrated", "power ordered toward a value greater than immediate appetite"]].map(([a, b], i) => (
                <div key={a} className="grid grid-cols-[1.6rem_7rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[2rem_9rem_1fr]">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- collective ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Collective — distributed causation</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Language, custom, law, money, reputation, institutional authority, shared myth,
              fashion, ideology, markets, rites, group emotion, cultural memory. A collective force
              emerges from individual participation and then exerts pressure on the individuals
              sustaining it. Language is produced and transmitted by people, yet no single speaker
              controls it. Money depends on collective recognition, yet it determines concrete
              possibilities for those born into it. Institutions are made of human actions, yet their
              procedures outlast generations of participants. It is more than any one participant&rsquo;s
              intention without necessarily being an independently conscious being.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The Morphaithēr becomes collective when many people repeatedly contribute attention,
              emotion, symbol, architecture, language, and behaviour to the same formative
              atmosphere. A courtroom, a temple, a school, a marketplace, a rally, and a family home
              each hold a distinctive one, generated through arrangement, expectation, memory,
              status, speech, sound, clothing, posture, and repeated action.
            </p>
            <div className="mt-10 max-w-3xl border-l-2 border-gold/50 pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                On the word egregore
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Usable here as a personification of a highly organised collective pattern, without
                automatically implying a literally independent invisible entity. It can name a
                collective attractor that has acquired enough symbolic coherence and formative
                inertia to recruit attention, preserve itself, and resist disruption. Such a
                structure appears agent-like precisely because it shapes the behaviour of its
                participants toward its own continuation.
              </p>
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Collective force builds momentum the same way: a symbol activates shared emotion,
              shared emotion produces coordinated action, coordinated action strengthens identity,
              strengthened identity returns attention to the symbol. That cycle yields solidarity,
              tradition, and mutual care — and also polarisation, scapegoating, panic, bureaucracy,
              and ideological possession. By the measure of § XII, a collective force is integral
              when it strengthens the persons and relationships composing it, and parasitic when
              preserving the pattern requires their continual depletion, deception, or diminishment.
            </p>
          </div>

          {/* ---- material ---- */}
          <div className="relative isolate mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/waterfall-in-mountain-gorge.webp" opacity={0.4} position="center 50%" scrim={0.22} portrait />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">Material — embodied constraint</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Matter is not an inert illusion waiting to obey spiritual intention.
              </p>
            </div>
            <div>
              <div className="border border-border p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  Where analogy is not identity
                </p>
                <div className="mt-4 space-y-px">
                  {[["Warmth Ether", "is not merely physical heat"],
                    ["Light Ether", "is not simply electromagnetic radiation"],
                    ["Tone Ether", "is not reducible to acoustic vibration"],
                    ["Life Ether", "is not another name for biochemistry"]].map(([a, b]) => (
                    <div key={a} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-3 border-b border-border py-2.5">
                      <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                      <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-bone/60">
                  The metaphysical terms describe proposed functions of organisation; the physical
                  sciences describe measurable processes. Analogies may exist between them. Analogy
                  is not identity.
                </p>
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Matter contributes resistance, limitation, weight, delay, cost, and irreversibility.
                These are not failures of spirit. They are the conditions through which formation
                acquires consequence — and Salt is their direct alchemical expression. A force that
                cannot pass through the conditions of Salt cannot become materially established. No
                amount of symbolic intensity abolishes the capacities and limits of the vessel;
                intention may reorganise action, but action still negotiates time, physiology,
                resources, environment, and physical law.
              </p>
              <p className="mt-6 font-serif text-xl italic leading-relaxed text-bone/85">
                This is the cost of form. To become actual is to accept limitation.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                And formation sends information back upward. Exhaustion changes emotion. Architecture
                changes movement. Nutrition affects attention. Technology changes collective
                organisation. A ritual space alters posture and perception through acoustics,
                lighting, temperature, geometry. Causation does not travel only from spirit toward
                matter. <span className="text-bone/90">Matter answers back</span> — the body is a
                participant in the whole formative circuit, not its final passive recipient.
              </p>
            </div>
          </div>

          {/* ---- intermediary ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/filter-stack-of-cloth-and-stone.webp" opacity={0.47} position="center 50%" scrim={0.16} portrait />
            <h3 className="font-serif text-2xl leading-tight">Intermediary — the Mercurial category</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Not a sixth substance inserted between spirit and matter. Intermediary names any
              process that receives a pattern in one form, modifies it according to its own
              constitution, and delivers it in another — which means every intermediary adds
              something, excludes something, and produces loss.
            </p>
            <div className="mt-10 grid gap-x-10 gap-y-px sm:grid-cols-2">
              {[["Breath", "emotion into bodily rhythm, and rhythm back into psychic state"],
                ["Imagination", "diffuse modulation into image"],
                ["Symbol", "image into communicable structure"],
                ["Language", "private perception into collective meaning"],
                ["Ritual", "symbolic structure into embodied sequence"],
                ["Channels", "circulating vitality through the living vessel"],
                ["Institutions", "collective values into procedures"],
                ["Celestial timing", "macrocosmic pattern into a framework for participation"],
                ["Art", "formative relationships into perceptible arrangements"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-3 border-b border-border py-3">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Qi and prana belong here insofar as they describe living vitality in circulation, which
              lets the whole vocabulary be related without being collapsed: Root Ether is the
              condition of transmission, the four ethers are formative functions, Qi or prana is the
              living current, a channel is the organised pathway, and a centre or organ is the
              transformative node.
            </p>
            <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                Transductive Loss, at the level of mediation
              </p>
              <p className="mt-4 font-serif text-xl leading-relaxed text-bone/90">
                Every mediator preserves part of a pattern, transforms part of it, and leaves part
                behind.
              </p>
              <p className="mt-3 text-[11px] leading-relaxed text-bone/55">
                Not a new law. § XVII already states it twice — as Transductive Loss, where each
                translation gives up something particular, and as the Law of Remainder, where what
                was given up persists as residue. This is the same principle where the transducer is
                an intermediary rather than a form.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A dream translates emotion into imagery and distorts chronology. Language translates
                experience into concepts and excludes what cannot easily be named. Ritual gives
                symbols a body and may become mechanical. Institutions translate values into rules
                and can preserve the rule long after losing the value. Intermediaries are therefore
                both necessary and dangerous: without them the levels stay disconnected, and mistaken
                for the source they become idols, dogmas, and bottlenecks.
              </p>
            </div>
          </div>

          {/* ---- the braid ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">The six in a single event</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A rite shows all six cooperating at once, which is the clearest demonstration that none
              of them is the explanation.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Transcendent", "the principle the rite is oriented toward — unity, wisdom, healing, justice, illumination, the divine"],
                ["Formative", "its geometry, sequence, proportion, symbolism, timing, and governing pattern"],
                ["Psychic", "the participants' attention, emotion, imagination, memory, desire, intention"],
                ["Collective", "shared language, synchronised action, tradition, authority, communal participation"],
                ["Material", "bodies, architecture, fire, sound, breath, light, objects, temperature, movement"],
                ["Intermediary", "the words, symbols, images, gestures, music, incense and actions carrying the pattern across the rest"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[8rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[10rem_1fr]">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              No single force explains the event. The rite is a braid of forces occupying different
              scales and operating through different causal modes.
            </p>
          </div>

          {/* ---- force profile ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">A force profile</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              To keep the taxonomy rigorous rather than decorative, any proposed force should be
              describable through the same twelve questions.
            </p>
            <div className="mt-10 grid gap-x-10 gap-y-px sm:grid-cols-2">
              {[["Source", "From what domain does it arise?"],
                ["Vector", "What change does it tend to produce?"],
                ["Pattern", "What organisation directs it?"],
                ["Quality", "What tattvic or elemental character does it carry?"],
                ["Medium", "Through what does it travel?"],
                ["Pathway", "Along what channel or relationship does it move?"],
                ["Vessel", "What receives and translates it?"],
                ["Timing", "During what phase or condition does it operate?"],
                ["Scale", "Material, biological, psychic, collective, celestial, metaphysical?"],
                ["Resistance", "What boundaries, impedance, or counterforces limit it?"],
                ["Cost", "What does its embodiment consume or exclude?"],
                ["Status", "Is the claim empirical, traditional, symbolic, metaphysical, or speculative?"]].map(([a, b], i) => (
                <div key={a} className={`grid grid-cols-[1.6rem_5.5rem_1fr] items-baseline gap-3 border-b py-3 ${
                  i === 11 ? "border-gold/50" : "border-border"}`}>
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-label text-[10px] uppercase tracking-[0.12em] ${
                    i === 11 ? "text-gold" : "text-gold"}`}>{a}</span>
                  <span className={`text-sm leading-relaxed ${i === 11 ? "text-bone/85" : "text-muted-foreground"}`}>
                    {b}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              That last question is the one doing the most work. A measured physical force, a
              traditional occult attribution, a useful psychological symbol, and a speculative
              metaphysical principle may all coexist in this system — provided none of them is
              presented as the same kind of knowledge as the others.
            </p>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              The Law of Force and Vessel
            </p>
            <p className="mt-6 max-w-3xl font-serif text-2xl leading-relaxed text-bone/90">
              No force without a vector. No vector without a medium. No medium without a vessel. No
              vessel without resistance.{" "}
              <span className="italic text-gold">No manifestation without consequence.</span>
            </p>
            <div className="mt-12 grid gap-x-10 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
              {[["Transcendent", "orient"], ["Formative", "organise"], ["Psychic", "interpret and intend"],
                ["Collective", "coordinate and amplify"], ["Material", "embody and constrain"],
                ["Intermediary", "translate among them"]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-3">
                  <span className="font-label text-[10px] uppercase tracking-[0.15em] text-gold">{a}</span>
                  <span className="ml-3 text-sm text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-12 text-center font-serif text-xl italic leading-relaxed text-bone/85">
              Actual events arise where all six become braided into one living process.
            </p>
          </div>
        </div>
      </section>

      <section id="mediation" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/stacked-glass-filters-in-dark-cell.webp" opacity={0.74} position="center 50%" scrim={0.12} />
        <SectionGlyph delay={-310} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXIX · Vertical Chains of Mediation
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The descent of virtue and the <span className="italic text-gold">return of consciousness</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            A vertical chain of mediation describes how a relatively universal principle becomes
            progressively more particular, active, and embodied. Vertical does not mean these beings
            occupy physical floors above the earth; it marks degrees of universality and
            participation — unitive, intelligible, differentiated, operative, embodied. Each mediator
            adds definition, and each introduces limitation, interpretation, and possible distortion.
          </p>

          <div className="mt-16">
            <VerticalChain />
          </div>

          {/* ---- the terms are not one hierarchy ---- */}
          <div className="mt-28 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">
              These terms are not one agreed hierarchy
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Pseudo-Dionysius places Archangels and Angels in the <span className="italic">lowest</span>{" "}
              of three celestial triads, beneath Seraphim, Cherubim, Thrones, Dominions, Powers,
              Virtues, and Principalities. Maimonides can read angels as separate intelligences or as
              governors of the celestial spheres. Agrippa fuses Christian angelology, Renaissance
              Platonism, celestial magic, and a Christianised Kabbalah. So this architecture uses the
              terms functionally rather than pretending to a settled chart.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Divine Name", "a participable mode of transcendent virtue"],
                ["Archangel", "a governing office over an entire field or order"],
                ["Angel", "a differentiated office of mediation or message"],
                ["Intelligence", "the noetic and pattern-governing pole of a sphere"],
                ["Spirit", "the dynamic, operative, or locally present pole"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[8rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[11rem_1fr]">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which sets two axes rather than one ladder.{" "}
              <span className="text-bone/90">Archangel and Angel name offices of mediation; Intelligence
              and Spirit name modes of operation.</span> Historical systems overlap them constantly,
              and an Archangel can perfectly well be understood as a governing intelligence while a
              planetary Intelligence fulfils something like an archangelic office. The point of the
              distinction is not to file every historical name into one chart, but to know which
              question is being asked.
            </p>
          </div>

          {/* ---- divine names ---- */}
          <div className="mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">The Name as participable virtue</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                If the divine source could be wholly contained in a word, it would no longer be
                transcendent.
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground">
                A Divine Name is not an exhaustive label attached to God. It is a verbal-symbolic
                vessel through which a particular divine relationship becomes intelligible and
                participable — gathering unity, mercy, judgement, wisdom, protection, generation, or
                illumination, and giving consciousness a point of approach without reducing the
                source to that approach. It is a symbolon in the sense of § XXVI, joining the
                unnameable to a form that can be spoken, remembered, contemplated, and enacted; and
                within a tradition a particular Name may serve as a synthema, an operative key.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Light Ether gives the Name intelligibility. Tone gives it sound, rhythm, number,
                pronunciation, and relational order. Warmth supplies devotion, intention, reverence.
                Life integrates it into prayer, identity, tradition, and sustained practice. Which
                means its power cannot be reduced to phonetics — sound matters, and so do meaning,
                lineage, intention, moral preparation, and the condition of the vessel. A Name
                stripped from its theology and treated as a mechanical password has been severed from
                most of the Morphaithēr that gave it coherence.
              </p>
              <div className="mt-8 border-l-2 border-gold pl-6">
                <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                  The danger of magical nominalism
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Believing that accurate syllables automatically compel the transcendent. A Divine
                  Name is an invitation to participation, not a mechanism for controlling the
                  Absolute.
                </p>
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                And every Name reveals a face while leaving the divine excess untouched. Wisdom does
                not exhaust divinity. Mercy does not eliminate judgement. Unity does not abolish
                multiplicity.
              </p>
              <p className="mt-6 font-serif text-xl italic leading-relaxed text-bone/85">
                A sacred name is a gate, not the whole country beyond it.
              </p>
            </div>
          </div>

          {/* ---- archangels ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">The Archangel as field-regent</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Not simply a more powerful Angel. <span className="italic">Archē</span> indicates
              beginning, rule, governing principle, chief office — so an Archangel is the
              coordinating centre of an entire chain, gathering a formative virtue at the scale of a
              sphere, order, sephirah, planetary current, people, or collective work, and
              distributing its governing pattern into more particular functions. If the Divine Name
              establishes the central virtue, the Archangel establishes its field-wide
              administration.
            </p>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              An Archangel can be read through several registers at once — as a real personal
              celestial being, an archetypal or noetic intelligence, the personification of a
              governing function, an imaginal form through which a field-wide order becomes
              perceptible, or an office represented differently across traditions. These should not
              be silently collapsed, and they need not be treated as mutually exclusive. A personal
              being may fulfil a formative office; an archetypal function may present itself through
              personality. The discipline is to{" "}
              <span className="text-bone/90">label the register being used</span> rather than claim
              premature certainty — which is the same demand the force profile of § XXVIII makes of
              every claim it admits.
            </p>
            <p className="mt-10 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              What archangelic mediation should display
            </p>
            <div className="mt-6 grid gap-x-10 gap-y-px sm:grid-cols-2">
              {["Greater universality",
                "Greater internal coherence",
                "Less dependence upon private appetite",
                "Capacity to coordinate multiple functions",
                "Preservation of proportion among parts",
                "Orientation toward a virtue beyond the mediator itself"].map((t, i) => (
                <div key={t} className="grid grid-cols-[1.6rem_1fr] items-baseline gap-3 border-b border-border py-3">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A claimed archangelic communication that produces obsession, flattery, fragmentation,
              or exemption from moral discernment contradicts the integrative rank it claims.{" "}
              <span className="text-bone/90">Intensity is not evidence of altitude</span> — the
              same test § XXV applies to visions, where intensity is not proof of metaphysical rank.
              In
              Pseudo-Dionysius even the highest celestial beings do not hold divine light as private
              property; they receive according to capacity and transmit to those below. Hierarchy is
              a structure of reception, transformation, and generous transmission — not celestial
              status-seeking.
            </p>
          </div>

          {/* ---- angels ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">The Angel as differentiated messenger</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              <span className="italic">Angelos</span> means messenger: an office of mediation rather
              than a biological species. Where an Archangel holds a whole field, an Angel carries one
              articulation of it — communicating, protecting, directing, warning, measuring,
              accompanying.{" "}
              <span className="text-bone/90">The Archangel is architectonic; the Angel is
              ministerial.</span> If an archangelic solar order contains illumination, centrality,
              healing, sovereignty, revelation, warmth, and integration, a particular angelic
              mediation may carry only one of these into a particular situation.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              And no Angel merely transports an unchanged packet. Mediation is always translation,
              adapted to the capacity, language, symbols, and circumstances of the receiver — which
              is why angelic appearances in visionary literature are so heavily symbolic. Wings
              express mobility between levels. Radiance expresses intelligibility or intensity. Many
              eyes express comprehensive awareness. A sword expresses discrimination, protection, or
              judgement. None of these should automatically be read as anatomy.
            </p>
            <div className="mt-10 max-w-3xl border-l-2 border-gold/50 pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                The angelic test
              </p>
              <div className="mt-4 space-y-2.5">
                {["Does it possess internal coherence?",
                  "Does it accord with the virtue of the order it claims to represent?",
                  "Does it increase responsible agency rather than dependency?",
                  "Can its symbolic form be distinguished from its possible underlying meaning?"].map((q, i) => (
                  <p key={q} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-label text-[10px] text-gold-dim">{i + 1}</span>
                    {q}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-base leading-relaxed text-bone/80">
                A messenger that demands worship of itself has interrupted the vertical chain. A
                genuine mediator directs participation beyond itself, toward the source and the
                virtue it serves.
              </p>
            </div>
          </div>

          {/* ---- intelligence and spirit ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Intelligence and Spirit</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              An Intelligence is not merely a clever spirit. In classical, medieval, and Renaissance
              cosmology it is an incorporeal or noetic principle bound to the order and motion of a
              celestial sphere — the pattern-holding pole of a field, maintaining ratio, direction,
              law, geometry, and intelligible purpose. It acts by preserving the governing pattern
              according to which operations become coordinated, not by emotional intensity or local
              movement.
            </p>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div className="border-t border-gold/50 pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                  Intelligence asks
                </p>
                <p className="mt-3 font-serif text-lg italic leading-relaxed text-bone/85">
                  What is the intelligible organisation of this sphere?
                </p>
              </div>
              <div className="border-t border-gold/50 pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                  Spirit asks
                </p>
                <p className="mt-3 font-serif text-lg italic leading-relaxed text-bone/85">
                  How does that organisation become dynamically active here?
                </p>
              </div>
            </div>
            <div className="mt-12 grid gap-px md:grid-cols-3">
              {[["grammar", "an utterance"], ["the musical proportion", "the vibrating current"],
                ["the geometry", "movement through its paths"]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-4 pr-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    The Intelligence holds <span className="text-bone/90">{a}</span>.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    The Spirit performs <span className="text-bone/90">{b}</span>.
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Spirit is the broadest and most ambiguous term in the chain — breath, wind, vitality,
              consciousness, a divine presence, an angel, a daemon, a deceased person, an elemental
              agency, a planetary being, a local intelligence. It should therefore never stand alone
              where precision matters. Planetary, elemental, local, ancestral, personal, egregoric,
              vital, ritual, divine: these are not to be presumed to share an origin, a function, or
              an ontological status.
            </p>
            <div className="mt-10 max-w-3xl border border-border p-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                On Agrippa&rsquo;s planetary tables
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The tables distinguish Divine Names, planetary Intelligences, and planetary Spirits —
                for the Sun, the Intelligence Nachiel and the Spirit Sorath. This should not be taken
                to mean every Intelligence is good and every Spirit evil; Spirit is far broader than
                that across traditions. In this vocabulary the Intelligence is the ordering and
                noetic pole and the Spirit the dynamic and potentially more volatile one. A current
                severed from governing intelligence may become disordered; an intelligence without
                operative spirit stays unembodied. Their relation is form and movement, not good
                against evil. The tables can be kept as a metaphysical and symbolic model without
                claiming that numerical figures exert scientifically established physical forces.
              </p>
            </div>
          </div>

          {/* ---- descent and return ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/long-stair-cut-into-cliff.webp" opacity={0.46} position="center 5%" scrim={0.18} />
            <h3 className="font-serif text-2xl leading-tight">Descent and return</h3>
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">Descent</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                  {["Source", "Name", "Pattern", "Message", "Operation", "Embodiment"].map((t, i) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className="border border-border px-2.5 py-1.5 text-[13px] text-muted-foreground">{t}</span>
                      {i < 5 && <ArrowMark className="text-sm text-gold" />}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  A unitive virtue becomes nameable, intelligible, differentiated, operational,
                  symbolic, psychic, material.
                </p>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">Return</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                  {["Embodiment", "Participation", "Meaning", "Understanding", "Unity", "Silence"].map((t, i) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className={`border px-2.5 py-1.5 text-[13px] ${
                        i === 5 ? "border-gold/60 text-gold" : "border-border text-muted-foreground"}`}>{t}</span>
                      {i < 5 && <ArrowMark className="text-sm text-gold" />}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  The vessel awakens a spirit of participation; that movement clarifies into meaning;
                  meaning gathers into pattern; pattern is restored to its governing unity; and the
                  Name opens consciousness toward what exceeds every name.
                </p>
              </div>
            </div>
            <p className="mt-10 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              Descent is not degradation — it is how virtue becomes actual. Return is not a rejection
              of embodiment —{" "}
              <span className="italic text-gold">
                it is how embodied experience becomes consciously reintegrated with its source.
              </span>
            </p>
          </div>

          {/* ---- laws ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/mirrors-cascading-light-down-shaft.webp" opacity={0.72} position="center 50%" scrim={0.16} portrait />
            <h3 className="font-serif text-2xl leading-tight">Laws of vertical mediation</h3>
            <div className="mt-10 max-w-4xl">
              {[["No mediator is the Source", "Every member receives and transmits something greater than its own particular expression."],
                ["Every descent requires translation", "A universal virtue cannot enter a particular vessel without acquiring limitation and form."],
                ["Every translation produces remainder", "No name, Angel, image, or rite exhausts the level above it."],
                ["Rank is measured by integration, not spectacle", "Greater intensity, radiance, terror, or complexity does not prove greater altitude."],
                ["Every chain requires a vessel", "Even the most elevated pattern must become image, word, relationship, or action to enter human participation."],
                ["Every vessel can distort", "Personal desire, collective expectation, fear, language, and tradition all shape how mediation is received."],
                ["Every valid ascent returns as embodiment", "If an alleged ascent produces no deeper truthfulness, responsibility, virtue, or integration, the chain has not been completed."]].map(([a, b], i) => (
                <div key={a} className="grid grid-cols-[1.6rem_1fr] gap-4 border-b border-border py-4 sm:grid-cols-[2rem_17rem_1fr]">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-gold">{a}</span>
                  <span className="col-start-2 text-sm leading-relaxed text-muted-foreground sm:col-start-3">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
              The Divine Name makes virtue approachable. The Archangel gathers it into an ordered
              field. The Intelligence holds its pattern. The Angel differentiates its message. The
              Spirit brings it into operation. The living vessel gives it a world in which to become
              actual.
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              The purpose of the chain is not to populate the invisible world with ever more
              elaborate ranks. It is to explain{" "}
              <span className="italic text-gold">
                how unity can enter multiplicity without disappearing, and how multiplicity can
                return toward unity without being erased.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="theurgy" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/circular-sanctum-with-lit-doorway.webp" opacity={0.58} position="center 50%" scrim={0.22} />
        <SectionGlyph delay={-330} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXX · Greek Metaphysics and Theurgic Engineering
          </p>
          <MeanderBand className="mt-8 max-w-3xl" />
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Plotinus and the architecture of <span className="italic text-gold">reality</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Greek metaphysics gives this architecture its clearest account of how unity becomes
            multiplicity without ceasing to be unity. Plotinus describes reality proceeding through
            three hypostases — the One, Intellect, and Soul — so that existence is a continuous but
            graduated participation in an originating unity. Mapping it in requires more care than
            anything else in this system, because the resemblances are close enough to be misleading.
          </p>

          <div className="mt-16">
            <Hypostases />
          </div>

          <p className="mt-16 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The distinction to hold throughout:{" "}
            <span className="text-bone/90">the Greek hierarchy supplies an ontological architecture,
            while the ethers describe formative operations occurring within manifested existence.</span>{" "}
            They are answers to different questions, and collapsing them would put the medium of
            manifestation in the place of its source — the same error § XXIX guards against when it
            separates the transcendent from Root Ether.
          </p>

          {/* the working vocabulary, in Greek */}
          <div className="mt-24">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              <span lang="el" className="scr-greek">Τὰ ὀνόματα</span> · the words this section works with
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Nine words carry the theurgic argument, and most of them are ordinary Greek put to
              technical use — a token, a fitness, a chain, a vehicle. Reading them in Greek keeps
              them from hardening into jargon: what a synthēma names is a password or a token of
              recognition, and it does its work by being recognised.
            </p>
            <div className="mt-8 max-w-4xl">
              <TermRegister terms={THEURGY_TERMS} />
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/60">
              Accents and inflections here follow the rules; none of these forms was collated
              against a printed lexicon, and the register says so rather than implying an authority
              it does not have.
            </p>
          </div>

          {/* ---- theurgic engineering ---- */}
          <div className="relative isolate mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/waterwheel-under-gorge-waterfall.webp" opacity={0.52} position="center 50%" scrim={0.2} portrait />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">What engineering means here</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                And, first, what it does not mean — including that it is not Plotinus&rsquo;s phrase.
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground">
                Theurgic engineering is not Plotinus&rsquo;s own term, nor a perfect description of his
                method. Plotinus emphasises contemplation, ethical purification, intellectual
                awakening, and interior union; the ritual science usually called theurgy becomes
                explicit later, in the Chaldean Oracles, in Iamblichus, and in Proclus. What Plotinus
                supplies is the metaphysical architecture that makes that later practice
                intelligible. Iamblichus adds a ritual technology of divine symbols, sacred
                materials, invocations, and consecrations. Proclus develops the synthesis in which
                metaphysical causation and hieratic practice mirror one another.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                So engineering does not mean controlling gods as though they were mechanical forces.
                It means the disciplined arrangement of mediators so that a person, an image, or a
                ritual environment becomes appropriately receptive to a higher order.
              </p>
              <p className="mt-6 font-serif text-xl italic leading-relaxed text-bone/85">
                Theurgy constructs conditions of participation. It does not manufacture the divine
                source.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                A temple, a rite, or a statue works — within the traditional account — because
                reality is already connected vertically. The theurgist does not invent the
                connection. The theurgist gathers materials, sounds, symbols, timings, gestures, and
                states of consciousness that already belong to a shared chain of correspondence.
              </p>
            </div>
          </div>

          {/* ---- daimon ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">The daim&#333;n as an assigned current</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The Greek <span className="italic">daim&#333;n</span> is not the later Christian demon.
              It can be understood as an intermediary presence, a distributor of destiny, a guardian,
              an activating intelligence, or the personalised mediation of a higher order. And
              Plotinus&rsquo;s treatment in Ennead III.4 is subtler than the idea that each person is
              arbitrarily assigned a supernatural companion:{" "}
              <span className="text-bone/90">the guardian corresponds to the level immediately above
              the person&rsquo;s dominant mode of life.</span> What governs us reflects where
              consciousness has established itself — which makes the daim&#333;n at once a guidance
              and a summons beyond one&rsquo;s present condition.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Here it can be read as an assigned current: the personalised vector where vocation,
              temperament, inherited pattern, circumstance, and higher possibility converge. Assigned
              not because some external authority picked it arbitrarily, but because embodiment
              places each person within a particular field of relationships and possibilities.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Metaphysically", "an intermediary intelligence belonging to a vertical chain"],
                ["Psychically", "a persistent organising image, vocation, or inner directive"],
                ["Astrologically", "the natal configuration and the celestial currents available to a life"],
                ["Ethically", "the demand to become more coherent than one's immediate appetites"],
                ["Imaginally", "a figure appearing in dream, vision, myth, or guidance"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[8rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[10rem_1fr]">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              It should not be equated automatically with every inner voice or spontaneous impulse.{" "}
              <span className="text-bone/90">Psychic fragmentation can imitate guidance.</span> A
              genuine daimonic current is judged by the coherence it produces — whether it
              strengthens truthful perception, responsibility, integration, and the alignment of
              Head, Heart, and Hara.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              Not merely a protector: a formative tension between what a person presently is and the
              pattern toward which they are being drawn.
            </p>
          </div>

          {/* ---- names, numbers, logoi ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Names, numbers, and logoi</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              In the Iamblichean understanding, sacred names are traditional vocal forms that
              participate in divine chains, and their importance does not rest entirely on a
              practitioner grasping their semantic meaning. Their sounds, rhythms, inherited uses,
              and correspondences make them ritual symbola or synthēmata — tokens by which
              consciousness is aligned with a divine order. Which is the decisive point:{" "}
              <span className="text-bone/90">invocation adapts the human recipient rather than
              coercing the gods.</span>
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Number, in the Pythagorean and Platonic traditions, is not quantity but proportion,
              differentiation, rhythm, intelligible architecture. One indicates unity; two introduces
              polarity; three permits mediation and relation; four establishes structured
              manifestation. Number is the grammar through which unity unfolds without becoming
              unintelligible multiplicity. And a <span className="italic">logos</span> does not
              describe a thing after it exists — it is the intelligible articulation that lets a
              particular kind of thing develop and stay recognisable.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Logos", "intelligible articulation, or ordering reason"],
                ["Logoi", "particular formative principles, or seed-patterns"],
                ["Number", "abstract ratio and architecture"],
                ["Divine name", "vocal-symbolic participation in a divine quality"],
                ["Symbolon", "a form whose relational fit gathers separated levels"],
                ["Synthēma", "an operative token or key within a vertical chain"],
                ["Sacred image", "a visible vessel of patterned presence"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[10rem_1fr]">
                  <span className="font-serif text-lg italic text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Light Ether makes the pattern intelligible and directionally coherent, Tone gives it
              proportion and resonance, Warmth activates it, Life integrates it into a sustained
              whole. But the logos is not identical with any one ether. It is the intelligible
              pattern that the ethers progressively carry into living expression.
            </p>
          </div>

          {/* ---- temple ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/lamp-among-reeds-in-lake-mist.webp" opacity={0.46} position="center 50%" scrim={0.22} portrait />
            <h3 className="font-serif text-2xl leading-tight">The temple as an engineered field</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A late-antique temple was not a building containing religious objects. It was a
              spatially ordered field, in which orientation, geometry, thresholds, light, acoustics,
              materials, images, incense, movement, and ritual timing combined into a particular
              ecology of perception and participation. In this vocabulary, a consecrated temple is{" "}
              <span className="text-bone/90">an intentionally cultivated Morphaithēr</span>.
            </p>
            <div className="mt-10 grid gap-x-10 gap-y-px sm:grid-cols-2">
              {[["The entrance", "separates ordinary space from sacred space"],
                ["Procession", "reorganises bodily attention"],
                ["The central axis", "establishes direction"],
                ["The inner sanctuary", "concentrates presence"],
                ["Repeated rites", "create formative memory, making the temple more responsive to what is enacted in it"],
                ["Correspondence", "gathers stones, metals, colours, plants, hymns, numbers, myths, and hours into one chain"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[8rem_1fr] items-baseline gap-3 border-b border-border py-3">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A solar temple gathers solar materials — not because everything yellow is
              automatically solar, but because carefully selected members of a celestial chain are
              held to participate in a shared virtue. Proclus describes hieratic practice exactly so,
              as the gathering of plants, stones, animals, and scents according to the sympathies
              distributed through the cosmos. The temple is{" "}
              <span className="text-bone/90">engineered sympatheia</span>.
            </p>
          </div>

          {/* ---- statues and ensoulment ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/lamplit-statue-beside-open-book.webp" opacity={0.66} position="center 45%" scrim={0.16} />
            <h3 className="font-serif text-2xl leading-tight">Statues, ensoulment, and telestic art</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A sacred statue is neither a mere representation nor a body claimed to exhaust the god.
              It is a selected vessel establishing a focused point of participation: its matter gives
              stability, its proportions embody number, its image communicates a divine logos, its
              inscriptions establish vocal and symbolic links, its placement positions it within an
              architectural field, and consecration gathers all of it into one operative vessel.
            </p>
            <div className="mt-10 grid gap-px md:grid-cols-3">
              {[["Sulfur", "divine quality, intention, identity, activating fire"],
                ["Mercury", "names, hymns, incense, movement, mediation, ritual circulation"],
                ["Salt", "statue, temple, material offering, stabilised vessel"]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-5 pr-6">
                  <p className="font-serif text-xl text-gold">{a}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              The statue is Salt made receptive to Sulfur through Mercury.
            </p>
            <div className="mt-12 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                What ensoulment is not
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Not the trapping of an entire god inside a material object. Iamblichus insists
                repeatedly that divine beings remain transcendent and undivided, and that a divine
                presence is not confined by the place or material receiving it.{" "}
                <span className="text-bone/90">The receptive vessel changes through participation;
                the god does not become materially imprisoned.</span> Ensoulment here means the
                installation and stabilisation of an organised presence within a suitable vessel —
                readable theologically as divine participation, metaphysically as the descent of a
                formative logos, imaginally as a stable symbolic intelligence, psychologically as an
                enduring focus of collective consciousness, or socially as the accumulated identity
                of a worshipping community. These need not be carelessly collapsed into one another.
              </p>
            </div>
            <p className="mt-10 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              The sequence of telestic art
            </p>
            <div className="mt-6 max-w-4xl">
              {["Suitable matter is selected according to correspondence",
                "The vessel is shaped according to number, image, and proportion",
                "Names and symbols connect it with a vertical chain",
                "Ritual activation awakens the symbolic and psychic field",
                "Repeated participation stabilises the presence",
                "Ongoing ritual maintains the vessel's coherence"].map((t, i) => (
                <div key={t} className="grid grid-cols-[1.6rem_1fr] items-baseline gap-4 border-b border-border py-3">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Read through the ethers it is the same process from another angle: Warmth awakens and
              activates, Light gives the presence a recognisable image and direction, Tone
              establishes resonance through chant, number, rhythm and name, and Life integrates these
              into an apparently continuous sacred presence.
            </p>
          </div>

          {/* ---- law of the vessel ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/lighthouse-lamp-room-with-brass-optics.webp" opacity={0.7} position="center 55%" scrim={0.22} />
            <div className="border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                The Law of the Vessel
              </p>
              <p className="mt-4 max-w-3xl font-serif text-2xl leading-relaxed text-bone/90">
                A vessel receives according to its form, capacity, purity, and correspondence.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                A badly organised vessel distorts what passes through it; a coherent one transmits
                with greater fidelity. This holds equally for statues, temples, symbols, rituals,
                institutions, and human beings. And no vessel exhausts its source — the solar statue
                is not the Sun, the divine name is not the totality of the god, the temple is not the
                celestial realm. Each is a finite point of participation in something more extensive
                than itself.
              </p>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-bone/80">
                Which gives theurgic engineering its central discipline: construct the vessel
                precisely, activate it responsibly, and never confuse the vessel with the
                transcendent reality it mediates.
              </p>
            </div>
          </div>

          {/* ---- living temple ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">The human being as a living temple</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The deepest application is anthropological. The human being is also temple, statue, and
              field of ensoulment.
            </p>
            <div className="mt-10 grid gap-x-10 gap-y-px sm:grid-cols-2">
              {[["The body", "the material sanctuary"],
                ["Breath and circulation", "the ritual movements"],
                ["The centres", "altars and gates"],
                ["The imagination", "the sacred images"],
                ["Speech", "the names and invocations"],
                ["The organs", "receivers of elemental and planetary quality"],
                ["The daimōn", "the vertical current"],
                ["The Inner Sun", "the integrating centre"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[10rem_1fr] items-baseline gap-3 border-b border-border py-3">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              So theurgy culminates not in constructing external objects but in making the human
              vessel capable of receiving and expressing a higher order — and the three great figures
              become three aspects of one process rather than three competing methods.
            </p>
            <div className="mt-10 grid gap-px md:grid-cols-3">
              {[["Plotinus", "the interior return of consciousness"],
                ["Iamblichus", "the ritual alignment of the embodied vessel"],
                ["Proclus", "the vertical chains connecting intelligible principles to material forms"]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-5 pr-6">
                  <p className="font-serif text-lg text-gold">{a}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
              The One remains beyond manifestation. Being unfolds through intelligible pattern.
              Pattern proceeds through living mediators. Symbols gather its dispersed
              correspondences. The vessel is prepared through number, name, matter, and rite.
              Presence becomes locally available without being locally confined. The awakened vessel
              then turns back toward its source.
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              The precise construction of conditions through which{" "}
              <span className="italic text-gold">
                procession can become presence, and presence can become return.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="daimons" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/mangrove-roots-in-morning-mist.webp" opacity={0.56} position="center 45%" scrim={0.34} />
        <SectionGlyph delay={-350} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXXI · Daimons, Interfaces, and Mediating Orders
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Iamblichus and the <span className="italic text-gold">populated cosmos</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            For Iamblichus the distance between transcendent gods and embodied human beings is not
            an empty metaphysical gulf. Reality is populated by successive orders of mediation, each
            receiving what stands above it, expressing that influence according to its own nature,
            and communicating it downward. Which is not a catalogue of supernatural creatures — it is
            an account of how causation crosses ontological boundaries. A universal divine power
            cannot enter a particular body in the same manner it exists universally. It has to be
            distributed, translated, localised, accommodated.
          </p>

          <div className="mt-16">
            <DaimonicChain />
          </div>

          {/* ---- interface ---- */}
          <div className="mt-28 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">On the word interface</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Useful, and only if handled carefully.
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground">
                An interface lets realities operating at different scales, or in different languages,
                enter a functional relationship. A keyboard does not contain the computer, yet it
                allows a human intention to enter the machine. An eye does not contain the visible
                world, yet it converts light into forms a nervous system can receive. A daimonic
                order mediates between universal divine causation and particular natural, psychic, or
                embodied life in something like that way.
              </p>
              <div className="mt-8 border-l-2 border-gold pl-6">
                <p className="text-base leading-relaxed text-muted-foreground">
                  Iamblichus, though, would not reduce daimons to impersonal mechanisms. They are
                  living orders with characteristic essences, powers, and activities.{" "}
                  <span className="text-bone/90">Interface describes what they do within the
                  architecture. It does not exhaust what they are.</span>
                </p>
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Mediation is needed because direct contact between radically different levels would
                otherwise be unintelligible. How does an eternal archetype influence a temporal
                organism? How does a planetary principle become an individual temperament? How does
                divine providence pass into nature without becoming identical to natural necessity?
                How does an intelligible logos become emotion, image, behaviour, and bodily form? The
                intermediary order is the middle through which the universal becomes particular{" "}
                <span className="italic">without being reduced to the particular</span>.
              </p>
            </div>
          </div>

          {/* ---- the orders ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">The orders are not interchangeable</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Iamblichus distinguishes gods, angels, daimons, heroes, and souls by their essences,
              powers, and characteristic activities. Daimons are bound up with the generative and
              demiurgic powers of the gods: they supervise processes within the cosmos, administer
              generated individuals, and take part in the bond between souls and bodies. Heroes carry
              a more vital, soul-leading function.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Gods", "universal, unified causation", "transcendent sources of divine virtue"],
                ["Archangels", "governance of comprehensive orders", "great regulating fields or offices"],
                ["Angels", "more differentiated transmission", "directed messengers and mediating currents"],
                ["Daimons", "cosmic distribution and administration", "interfaces between universal forces and particular lives"],
                ["Heroes", "elevation and guidance of souls", "ancestral or exemplary soul-leading powers"],
                ["Archons", "governance of cosmic or material domains", "regulators of large environmental orders"],
                ["Souls", "particular centres of life and experience", "living vessels capable of ascent, choice, transformation"]].map(([a, b, c]) => (
                <div key={a} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border py-3 sm:grid-cols-[8rem_14rem_1fr]">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-bone/75">{b}</span>
                  <span className="col-start-1 text-sm leading-relaxed text-muted-foreground sm:col-start-3">{c}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              This is not a standardised hierarchy shared by every Platonist; it belongs to
              Iamblichus&rsquo;s own theurgical metaphysics. Its value here is the principle it
              carries — different kinds of mediation are required at different ontological
              thresholds. A celestial intelligence mediates differently from a place-spirit, a
              personal daimōn differently from an archangelic order, a symbol differently from a
              living being.{" "}
              <span className="text-bone/90">Calling all of them energy would erase exactly the
              distinctions that make the architecture useful.</span>
            </p>
          </div>

          {/* ---- fate ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/folded-cliff-face-on-grey-coast.webp" opacity={0.5} position="center 50%" scrim={0.2} portrait />
            <h3 className="font-serif text-2xl leading-tight">Fate as the order of embodied causation</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Fate — <span className="italic">heimarmenē</span> — is not an arbitrary supernatural
              decree. It is the ordered network of causes operating within nature and generation,
              governing the relations through which embodied things arise, interact, change, and
              perish. The body inherits biology. The psyche enters a temperament. A life begins at a
              particular time and place, with social, ancestral, climatic, celestial, and material
              conditions converging around it. Iamblichus identifies the sphere of fate with nature
              as the immanent causal order — while holding that the soul has a freer and more
              independent life through which it may cease to be entirely governed by lower cosmic
              influence.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Fate", "causation experienced from within the order of nature"],
                ["Providence", "the higher intelligible coordination of the whole"],
                ["The daimōn", "mediates between a particular life and that larger order"],
                ["Theurgy", "aligns the soul with causes higher than those that ordinarily bind it"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[8rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[10rem_1fr]">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              So fate is real without being ultimate. It operates most powerfully wherever a being is
              identified exclusively with its bodily, passionate, environmental, and reactive
              condition — the more unconscious the vessel, the more mechanically it reproduces the
              forces passing through it.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              The goal is not to destroy fate. Fate is part of cosmic order. The goal is to cease
              experiencing it only as blind compulsion.
            </p>
            <div className="mt-12 max-w-3xl border-l-2 border-gold/50 pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                Fate is not fatalism
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Fatalism says choices are meaningless because every event is already fixed. This is
                subtler. A person receives an allotment — body, ancestry, historical placement,
                celestial configuration, capacities, limits, circumstantial tendencies — but the
                manner in which that allotment is inhabited is not predetermined. An instrument has a
                given range, resonance, and construction, and those impose real limits without
                determining the music that will be played.{" "}
                <span className="text-bone/90">Fate provides the instrument. Character develops
                through the way it is played.</span> The personal daimōn holds the relation between
                the instrument, its allotted range, and the higher composition it is capable of
                serving.
              </p>
            </div>
          </div>

          {/* ---- personal daimon ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">The personal daim&#333;n</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              In Book IX of <span className="italic">On the Mysteries</span> the personal daimōn is
              bound up with the cosmic order surrounding an individual&rsquo;s embodiment — and it is
              not simply an astrological planet extracted from a natal chart. Iamblichus resists
              Porphyry&rsquo;s attempt to locate it by calculation alone: the visible celestial
              arrangement reveals only part of the causal chain, and the daimōn&rsquo;s higher
              principle is not exhausted by its astronomical signature. It presides over the embodied
              life as a unified administration, gathering the various influences around a person and
              relating them to the whole soul-body composite — an integrating governance rather than
              a separate guardian for every faculty.
            </p>
            <div className="mt-10 grid gap-x-10 gap-y-px sm:grid-cols-2">
              {["A distributor of the person's cosmic allotment",
                "A mediator between soul and embodiment",
                "A coordinator of the forces entering the individual life",
                "A guide of thought and action toward intelligible principles",
                "A representative of the person's place within a greater divine chain"].map((t, i) => (
                <div key={t} className="grid grid-cols-[1.6rem_1fr] items-baseline gap-3 border-b border-border py-3">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Iamblichus even describes the daimōn as supplying principles for thought and directing
              the life until, through theurgy, a god becomes the soul&rsquo;s more immediate overseer.
              At that point it does not become evil or useless. It withdraws, yields its
              administrative precedence, or serves beneath the more universal direction.{" "}
              <span className="text-bone/90">The personal mediator leads the soul toward a source more
              universal than itself.</span>
            </p>
            <div className="mt-12 max-w-3xl border border-border p-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                The chart is not the daim&#333;n
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A natal chart maps the celestial conditions through which a life enters manifestation
                — elemental distribution, planetary tension, dominant function, developmental
                challenge, available virtue. But it is closer to the celestial{" "}
                <span className="italic">trace</span> of conditions administered through daimonic
                mediation, and the daimōn belongs to a deeper vertical chain than the visible
                configuration alone. Astrology can help identify the language through which the
                daimōn may communicate. It should not claim to contain or fully calculate it.
              </p>
            </div>
          </div>

          {/* ---- morphaither and alchemy ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">How the current becomes perceptible</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The daimōn does not operate through abstract thought alone. Its mediation enters the
              formative atmosphere around a person, where it may appear as recurring symbols, dreams,
              attractions, encounters, bodily intuitions, creative compulsions, moral conflicts, or
              persistent vocational themes.{" "}
              <span className="text-bone/90">These are not automatically supernatural messages.</span>{" "}
              They are the media through which a deeper organising pattern might become perceptible —
              and § XXV&rsquo;s three attentions apply unchanged: see the sign, see through it, and
              see what it is doing in the one who receives it.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Warmth Ether", "activates urgency, courage, attraction, and vocational fire"],
                ["Light Ether", "gives direction, image, insight, intelligible orientation"],
                ["Tone Ether", "coordinates events, symbols, relationships, names, meaningful rhythms"],
                ["Life Ether", "integrates the current into character, body, practice, sustained development"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[10rem_1fr]">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/65">
              The daimōn is not made from these ethers. Its influence is translated through their
              functions as it enters embodied life.
            </p>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The tattvas qualify it further — Akasha supplies openness to reception, Vayu moves it
              through thought, breath, and encounter, Tejas gives it revelatory intensity, Apas
              allows psychic assimilation and relational depth, and Prithivi turns it into
              commitment, habit, craft, and material consequence.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              A calling that never reaches Prithivi remains an atmosphere of possibility. It may
              inspire endlessly without producing a life.
            </p>

            <p className="mt-16 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              And its three ways of going wrong
            </p>
            <div className="mt-6 grid gap-px lg:grid-cols-3">
              {[["Sulfur", "the distinctive fire of the calling — the insistence that this life is meant to express something particular",
                 "Overwhelming Salt", "the person becomes inflated by a sense of destiny"],
                ["Mercury", "the mediator carrying that fire through dream, symbol, idea, relationship, coincidence, language, circumstance",
                 "Without discrimination", "every coincidence becomes a message and every fantasy is mistaken for guidance"],
                ["Salt", "the embodied character able to contain the current through discipline, work, rite, and lasting form",
                 "Grown rigid", "the personality refuses every transformative demand"]].map(([a, b, c, d]) => (
                <div key={a} className="border-t border-border py-5 pr-6">
                  <div className="flex items-center gap-3">
                    <PrincipleSign k={a as PrincipleKey} size={28} className="shrink-0 text-gold/80" />
                    <p className="font-serif text-xl text-gold">{a}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  <p className="mt-5 font-label text-[10px] uppercase tracking-[0.18em] text-bone/50">{c}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-bone/60">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Healthy mediation therefore wants a strong vessel, mobile interpretation, and a fire
              proportionate to the person&rsquo;s actual capacity.
            </p>
          </div>

          {/* ---- discernment ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">
              Daimonic calling, or psychic projection?
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The idea becomes dangerous the moment every desire is treated as a command from a
              higher being. Iamblichus is himself deeply concerned to distinguish divine, angelic,
              daimonic, archontic, and psychic manifestations, judging them by the kinds of effect
              they produce — because not every impressive experience comes from the same level of
              reality.
            </p>
            <div className="mt-10 max-w-3xl space-y-2.5">
              {["Does it become more coherent over time?",
                "Does it survive sober reflection?",
                "Does it deepen responsibility rather than excuse impulsiveness?",
                "Does it integrate Head, Heart, and Hara?",
                "Does it produce genuine capability, or only fantasies of exceptional status?",
                "Does it respect ethical reality and the autonomy of others?"].map((q, i) => (
                <p key={q} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
                  <span className="font-label text-[10px] text-gold-dim">{i + 1}</span>
                  {q}
                </p>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A distorted psychic complex demands admiration, certainty, urgency, and exemption from
              ordinary accountability. A healthy daimonic current may be powerful, and it tends to
              require maturation, discipline, sacrifice, and greater truthfulness.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              The daimōn does not merely tell a person that they are special. It makes increasingly
              exact demands about what they must become capable of carrying.
            </p>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Ignisophia is not identical to the daimōn, but it supplies the inner solar organisation
              through which such a current can be received without fragmentation. The daimōn provides
              the vertical current; Ignisophia organises the human response — Hod giving
              interpretation and discrimination, Netzach desire and devotion, the Hara embodied
              steadiness, the Heart the measure of relation and virtue, the Head the recognition of
              pattern. When these revolve around a unified Inner Sun the current is not simply seized
              upon.{" "}
              <span className="text-bone/90">The person becomes a collaborator in mediation rather
              than a passive instrument.</span>
            </p>
          </div>

          {/* ---- deeper purpose ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/walker-on-moor-track-at-dusk.webp" opacity={0.45} position="center 88%" scrim={0.26} />
            <h3 className="font-serif text-2xl leading-tight">The paradox of the office</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The personal daimōn stands at the threshold between particular destiny and universal
              participation. It administers a life as a particular life — and its highest purpose is
              not to imprison the soul inside that particularity. One may have to become fully
              faithful to a daimonic pattern before becoming capable of passing beyond identification
              with it. The particular vocation is the road toward the universal.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              Which makes it both guardian of the allotted pattern and{" "}
              <span className="italic text-gold">custodian of the passage beyond merely allotted
              existence</span> — fulfilling its office most completely when the soul becomes capable
              of receiving direction from a higher principle than itself.
            </p>
          </div>

          {/* ---- the population, named ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Who fills it, named
            </p>
            <h3 className="mt-6 max-w-3xl font-serif text-3xl leading-tight">
              The middle of the world is not a category.{" "}
              <span className="italic text-gold">It is a population.</span>
            </h3>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Everything above is structural: orders, offices, mediation. But no tradition
              experienced the middle as a diagram. It named it, one being at a time, in its own
              language, and the names carry what the structure cannot — that the middle is morally
              mixed, that a culture-bringer and a strangler of infants occupy the same stratum, and
              that some of these beings are offices a star or a god or a kitchen hearth may fill
              rather than individuals at all.
            </p>
            <div className="mt-12 grid gap-x-12 gap-y-px lg:grid-cols-2">
              {MEDIATORS.map((m) => (
                <Link
                  key={m.id}
                  to="/phos/tools/beings"
                  search={{ being: m.id }}
                  className="group grid grid-cols-[minmax(0,1fr)] gap-1 border-b border-border py-5 transition-colors hover:border-gold/40"
                >
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <Term script={m.script} orig={m.orig} label={`${m.tr} — ${m.name}`} className="text-xl text-gold" />
                    <span className="font-serif text-lg text-bone transition-colors group-hover:text-gold">
                      {m.name}
                    </span>
                    <span className="font-serif text-sm italic text-gold-dim">{m.tr}</span>
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                    {m.office}
                  </span>
                  <span className="mt-1.5 block font-label text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                    {m.tradition}
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Ten of a hundred and sixty, one from each tradition, and all from the same stratum —
              which is why they can be set beside one another at all. The rest, with each name in
              its own script, its own tradition&rsquo;s word for what kind of thing it is, and the
              sources it rests on, are in{" "}
              <Link
                to="/phos/tools/beings"
                className="text-gold-dim underline-offset-4 hover:text-gold hover:underline"
              >
                the Register of Beings <CrossMark className="text-gold/70" />
              </Link>
              . It will not tell you that an apkallu and a daimōn are the same thing. It shows you
              where each tradition&rsquo;s population is thick and where it is empty, and the empty
              places are the finding.
            </p>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
              Fate provides the field of conditions. Character becomes the vessel formed within that
              field. The personal daimōn mediates between the allotted configuration and the higher
              order it can learn to embody. Theurgy does not erase the individual pattern; it raises
              that pattern into conscious participation with its source.
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              Living bridges of particularisation —{" "}
              <span className="italic text-gold">
                they stand where universal powers become individual paths.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="books" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/cutaway-of-tiered-stone-tower.webp" opacity={0.62} position="center 45%" scrim={0.2} portrait anchor="left" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                § XXXII · The Series
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Seven books, <span className="italic text-gold">one arc</span>
              </h2>
              <p className="mt-8 font-serif text-sm leading-relaxed text-muted-foreground">
                Principle → Field → Pattern → Cosmos → Body → Symbol → Transformation.
              </p>
            </div>
            <ol className="space-y-6">
              {[
                { n: "I", title: "The Architecture of Hidden Forces", note: "First principles: Source, Spirit, Essence, Virtue, Force, Form — and the axiom that form is frozen force." },
                { n: "II", title: "Root Ether and the Fourfold Field", note: "The living medium of formation: Root Ether, the etheric tides, the gunas, tattvas, elements, and the subtle field beneath manifestation." },
                { n: "III", title: "Logos, Number, and the Birth of Form", note: "Measure, pattern, number, geometry, element, vessel, and configuration — the principles by which force becomes structured." },
                { n: "IV", title: "The Celestial Anatomy of Force", note: "Astrology, lunar mansions, planetary virtues, celestial timing, and the cosmic ordering of hidden forces." },
                { n: "V", title: "The Living Vessel", note: "The architecture brought into the body: chakras, meridians, nadis, breath, organs, subtle anatomy — the human being as microcosm." },
                { n: "VI", title: "The Language of Signatures", note: "Trace, imprint, symbol, correspondence, signatures — plants, metals, stones, colors, sounds, and the doctrine of scale." },
                { n: "VII", title: "The Art of Right Relation", note: "Distortion, purification, participation, metamorphōsis, theurgy — and fulfilled actualization: force returned to essence, essence returned to Source." },
              ].map((b) => (
                <li
                  key={b.n}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6 border-b border-border pb-6"
                >
                  <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-dim">
                    Book {b.n}
                  </div>
                  <div>
                    <div className="font-serif text-xl italic text-bone sm:text-2xl">
                      {b.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {b.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* GROUNDS */}
      <section id="grounds" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/timber-pavilion-on-rock-shelf.webp" opacity={0.25} position="center 50%" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § Grounds · Why the Structure Holds
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            A process-relational <span className="italic text-gold">reading</span>
          </h2>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The preceding sections state the architecture. This one argues for it. None of what
            follows proves the whole structure; each shows that its central logic is neither
            arbitrary nor internally incoherent — that the process-relational reading § II commits
            to is a defensible account of what there is, rather than a preference declared in
            advance.
          </p>

          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            {[
              { t: "Form is an achievement", d: "Perception presents formed objects first, but every one is the end of an immense developmental process. A tree presupposes soil, climate, inheritance, cellular organization, and a history of prior life." },
              { t: "Relations can precede things", d: "A heart removed from the organism is no longer functioning as a heart. A word removed from its language loses its meaning. A note changes function with the chord around it. Relational fields participate in determining what things are." },
              { t: "Stabilized process avoids dualism", d: "If matter is relatively stabilized activity, spirit and matter need not be unrelated substances. The subtle need not be nonexistent; the material need not be spiritually dead." },
              { t: "Formation requires constraint", d: "To become a triangle, a figure cannot remain every possible figure. A river gains direction through its banks; electricity becomes useful through a circuit; language becomes meaningful through grammar. Limitation is what allows force to become articulate." },
              { t: "Geometry is the trace of constraint", d: "A circle may be drawn in ink, carved in stone, or held in mind. Its material changes; its proportional logic remains. Number and geometry express relational principles, not ghostly objects." },
              { t: "Symmetry breaking births difference", d: "A perfectly uniform field contains no privileged direction, center, or boundary. Manifestation requires that difference arise within unity. Creation is the generation of meaningful difference, not merely the production of matter." },
              { t: "The vessel is causally decisive", d: "The same water assumes the shape of its container; the same light through different lenses yields different images; the same idea in different persons becomes different work. Transformation depends on the condition of the vessel, not only on what enters it." },
              { t: "Causation can be layered", d: "A person lifting a cup can be described through muscular contraction, nervous activity, intention, habit, and purpose. These do not cancel one another — they describe one act at different organizational levels." },
              { t: "Correspondence is structural recurrence", d: "“As above, so below” does not mean each level copies another. Similar relational structures recur at different scales. The heart is not the sun, but both occupy central distributive roles. Valid correspondence preserves function; weak correspondence rests on resemblance." },
              { t: "Participation without omnipotence", d: "Attention, interpretation, and action alter what becomes actual — yet no isolated person creates the universe by believing. Theurgy is the art of increasing the coherence and reach of participation, not of pretending resistance is imaginary." },
              { t: "Higher order includes the lower", d: "A mind without bodily regulation destabilizes; aspiration without emotional integration becomes fantasy. Higher orders do not discard lower ones — they coordinate and transfigure them." },
              { t: "Continuous but not homogeneous", d: "One ocean contains currents, layers, vortices, and ecosystems. Continuity permits interaction; differentiation permits identity. The system affirms both unity and plurality." },
            ].map((x) => (
              <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                <div className="font-serif text-lg italic text-bone">{x.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-14 max-w-3xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            Stability is not the absence of change. It is successfully regulated change.
          </p>
        </div>
      </section>

      {/* LINEAGE */}
      <section id="tradition" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/scribe-at-work-by-lamplight.webp" opacity={0.72} position="center 45%" scrim={0.15} />
        <SectionGlyph delay={-390} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXXIII · Tradition
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The long memory of <span className="italic text-gold">form</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Tradition is a distributed, transgenerational vessel through which a pattern preserves
              sufficient identity to be recognised, enacted, and regenerated despite inevitable
              changes of carrier.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            § XXVII closed the rite in ordered time, within a single enactment. Tradition is the same
            problem across historical time, between generations — and it makes one addition that
            decides everything else.
          </p>
          <p className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-bone/90">
            Tradition does not merely transmit a pattern.{" "}
            <span className="italic text-gold">It transmits the capacity to recognise the pattern.</span>
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            An archive preserves words, diagrams, and instructions perfectly well. What it cannot do
            is produce the perception required to interpret them. A tradition carries a grammar{" "}
            <span className="italic">and</span> the formation of readers capable of reading it — which
            is why the thing transmitted is never a single well-kept object.
          </p>

          <div className="mt-16">
            <Carriers />
          </div>

          <p className="mt-16 max-w-3xl text-base leading-relaxed text-muted-foreground">
            What is handed on is a redundant constellation: texts, gestures, rhythms, prohibitions,
            stories, exemplars, offices, material forms, interpretive habits, embodied practices. No
            single carrier contains the whole. Their convergence is what lets later participants
            triangulate the generative pattern despite the Transductive Loss § XVII describes — and
            it is why the loss of any one carrier is survivable while the loss of convergence is not.
          </p>

          {/* ---- fidelity ---- */}
          <div className="relative isolate mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/bell-foundry-casting-bronze-bells.webp" opacity={0.64} position="center 55%" scrim={0.2} />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">What fidelity actually requires</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Not what it is usually taken to require.
              </p>
            </div>
            <div>
              <div className="border-l-2 border-gold pl-6">
                <p className="font-serif text-xl leading-relaxed text-bone/90">
                  Faithful transmission preserves the generative constraints of a form — not
                  necessarily every historical appearance it has taken.
                </p>
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Which inverts the usual assumption. A tradition that reproduces its surfaces exactly
                while losing their formative function may be{" "}
                <span className="text-bone/90">less</span> faithful than one that changes its
                expression in order to preserve the operation underneath. Every transmission is some
                degree of transformation; there is no option that avoids this. The only real question
                is which of four things the transformation does.
              </p>
              <div className="mt-8 grid gap-px sm:grid-cols-2">
                {[["Preserves", "the generative constraint survives intact"],
                  ["Clarifies", "the constraint is made more legible than it was"],
                  ["Distorts", "the constraint survives, deformed"],
                  ["Replaces", "a different constraint now occupies the form"]].map(([a, b]) => (
                  <div key={a} className="border-t border-border py-4 pr-5">
                    <p className="font-label text-[10px] uppercase tracking-[0.15em] text-gold">{a}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Note that the fourth is exactly § XXVII&rsquo;s telestic inertia, running at the scale
                of generations rather than of a single rite. The form persists; the constraint inside
                it has been swapped.
              </p>
            </div>
          </div>

          {/* ---- initiation ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/olive-tree-on-ridge-at-dusk.webp" opacity={0.52} position="center 50%" scrim={0.24} portrait />
            <h3 className="font-serif text-2xl leading-tight">What initiation is for</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Once tradition is defined as transmitting a capacity rather than a content, initiation
              stops being a matter of clearance. It is not permission to possess information. It
              prepares the receiver to participate in a field of recognition — coordinating
              perception, body, obligation, vocabulary, and communal acknowledgement so that what is
              transmitted can be received as something other than external data.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              This is deliberately not a claim that outsiders perceive nothing. Someone outside a
              tradition may study it, imitate it, and perceive genuine aspects of it. What initiation
              additionally addresses is embodied calibration, reciprocal recognition, responsibility,
              and authorised function.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              It does not create truth. It may create the vessel capable of bearing a particular form
              of it.
            </p>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which is § XXIX&rsquo;s Law of the Vessel again — that a vessel receives according to its
              form, capacity, purity, and correspondence — stated where the vessel being prepared is a
              person entering a lineage.
            </p>
          </div>

          <div className="relative isolate mt-24 border-t border-gold/30 pt-12">
            <Backdrop src="/bg/bristlecone-pine-above-the-clouds.webp" opacity={0.3} position="center 40%" scrim={0.22} portrait />
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
              Ritual transmits pattern through ordered time within an enactment. Tradition transmits
              pattern through historical time across generations. Together they close the ladder:
              ritual explains how form becomes passage, and tradition explains how passage becomes
              inheritance.
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              What follows in § XXXIV is not this. That is the{" "}
              <span className="italic text-gold">bibliography of sources</span>; this was the
              metaphysics of their survival.
            </p>
          </div>
        </div>
      </section>

      <section id="lineage" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/folded-rock-strata-above-water.webp" opacity={0.54} position="center 50%" scrim={0.28} />
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                § XXXIV · Lineage
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Gathered, but <span className="italic text-gold">not repeated</span>
              </h2>
            </div>
            <div className="space-y-6">
              {[
                { from: "The Presocratics", what: "The search for archē — the first principle from which all things arise." },
                { from: "Empedocles", what: "The four elemental roots: fire, air, water, and earth as the alphabet of embodiment." },
                { from: "Plato", what: "Visible forms participate in invisible principles — the eidē through which becoming is intelligible." },
                { from: "Aristotle", what: "Ousia, dynamis, energeia, morphē, hylē — the passage from potency to actuality that structures every being." },
                { from: "The Stoics", what: "Pneuma and cosmic sympatheia — the living tension and affinity that binds the kosmos together." },
                { from: "Neoplatonism", what: "To Hen, proodos, and epistrophē — the One, procession into multiplicity, and contemplative return." },
                { from: "Hermeticism", what: "The living cosmos of analogy and correspondence — microcosm and macrocosm bound in kinship." },
                { from: "Paracelsian Signatures", what: "Visible marks of inward virtue — the outer writing of essence upon nature." },
                { from: "Alchemy", what: "Solve et coagula — transformation as elemental reconfiguration and the release of hidden virtue in matter." },
              ].map((row) => (
                <div
                  key={row.from}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-border pb-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-8"
                >
                  <div className="font-label text-[11px] uppercase tracking-[0.2em] text-gold-dim sm:text-xs">
                    {row.from}
                  </div>
                  <p className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1 sm:text-base">
                    {row.what}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE UNIFIED FORMULA */}
      <section id="forceform" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/stone-arch-under-construction.webp" opacity={0.7} position="center 55%" scrim={0.24} />
        <SectionGlyph delay={-410} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXXV · The Law of Force and Form
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The moment force acquires <span className="italic text-gold">memory</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Force becomes form by entering constraint; form becomes force when constraint is
              loosened, broken, or redirected. Every form is force given memory, and every force is
              form in transition.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            § 00 states this in a line — form is frozen force, force is liberated form — and the
            whole architecture has been unfolding it ever since. This is that proposition given its
            reasons. Force and form are not two substances but reciprocal conditions inside a single
            formative process: force is the capacity to produce difference, form the organisation
            that preserves, directs, and repeats it. Force without form disperses into
            indeterminacy. Form without force becomes an abstraction, a residue, an empty shell.
          </p>
          <div className="mt-8 max-w-3xl border border-border p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              An ontological principle, not a claim that physical energy and form are quantitatively
              interchangeable. Force here includes formative, psychic, collective, biological, and
              material powers; form means the organisation through which any of them become
              determinate.
            </p>
          </div>

          {/* ---- frozen force ---- */}
          <div className="relative isolate mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/wind-shaped-pine-on-cliff.webp" opacity={0.5} position="center 45%" scrim={0.26} />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">Form is frozen force</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Which does not mean activity has stopped. It means activity has been constrained into
                recurrence.
              </p>
            </div>
            <div>
              <div className="grid gap-x-10 gap-y-px sm:grid-cols-2">
                {[["A crystal", "molecular force disciplined into a lattice"],
                  ["An arch", "gravitational pressure captured within geometry"],
                  ["An organism", "metabolism organised into a self-maintaining body"],
                  ["A habit", "repeated psychic activity hardened into an automatic pathway"],
                  ["An institution", "collective action fixed into roles, procedures, expectations"]].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-[7rem_1fr] items-baseline gap-3 border-b border-border py-3">
                    <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-serif text-xl italic leading-relaxed text-bone/85">
                Form is not the opposite of motion. It is motion trained into persistence.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Every form carries both the history of the forces that produced it and the tensions
                presently holding it. A mountain retains pressure and erosion. A body records
                inheritance, nourishment, injury, adaptation. A rite preserves earlier acts of
                attention; a tradition bears the compressed history of innumerable acts of
                transmission. Frozen means only that the range of possible movement has narrowed —
                force that might have gone many ways has accepted a boundary, a rhythm, a geometry.
                And that limitation is precisely what lets it acquire identity.
              </p>
              <p className="mt-6 font-serif text-xl italic leading-relaxed text-bone/85">
                Form is force made recursive.
              </p>
            </div>
          </div>

          {/* ---- liberated form ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/roots-and-vessels-beside-stream.webp" opacity={0.35} position="center 55%" scrim={0.18} portrait />
            <h3 className="font-serif text-2xl leading-tight">Force is liberated form</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              If form is constrained force, then force is form released from its present constraint.
              When a structure dissolves, what was bound inside it becomes available for
              redistribution. The wood of a fallen house becomes fuel, soil, shelter, material. A
              broken institution releases people, knowledge, resentment, wealth, and authority into
              new arrangements. A dissolved complex may release attention and desire that had been
              spent maintaining it.
            </p>
            <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                But liberation does not erase what preceded it
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Released force carries inherited bias. Water leaving a channel keeps its direction
                for a time. A person leaving an institution may go on reproducing its assumptions. A
                deconsecrated object may retain associative inertia — which is exactly why § XXVII
                insists the release be performed rather than assumed. Dissolution never returns
                anything to perfect neutrality; the freed force enters its next formation already
                marked by what it passed through.
              </p>
            </div>
            <p className="mt-10 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              Force is not absolutely formless. It is form exceeding, escaping, or passing between
              its present configurations.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              This is the rhythm named by <span className="italic">solve et coagula</span>.
              Coagulation fixes force into a vessel; dissolution releases what was fixed so that it
              can be purified, redistributed, and formed again.
            </p>
          </div>

          {/* ---- dynamis and energeia ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Dynamis and energeia</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              <span className="italic">Dynamis</span> is capacity, potency, the power to become or
              act. <span className="italic">Energeia</span> is not energy in the modern physical
              sense at all — it is actuality, being-at-work, the active realisation of a capacity.
              Keeping those apart matters here as much as keeping Warmth Ether apart from heat.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              And potency is not an unlimited cloud of every imaginable possibility. It is{" "}
              <span className="text-bone/90">structured possibility</span>. A seed holds the potency
              of a particular kind of plant, not of anything whatever. An instrument holds a range
              set by its material and construction. A person holds capacities conditioned by body,
              character, knowledge, environment, and opportunity. Form is therefore already latent
              inside potency as a range of possible actualisations, and energeia occurs when
              conditions select, activate, and sustain one of them.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Yet actuality does not exhaust potency. A realised form generates new capacities — the
              tree produces branches, fruit, shelter, decay, and further seed. Actuality becomes the
              ground of further potency, which makes the movement cyclical rather than terminal.
            </p>
          </div>

          {/* ---- the descent ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/sculptor-carving-face-in-stone.webp" opacity={0.72} position="center 50%" scrim={0.18} />
            <h3 className="font-serif text-2xl leading-tight">The descent into determination</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Not a fall into inferiority. A descent into determination — where Morphaithēr is the
              atmosphere the biases interact within, Sulfur supplies direction and appetite, Mercury
              enables movement and transduction, and Salt fixes the achieved relation into something
              durable.
            </p>
            <div className="mt-12">
              <ForceAndForm />
            </div>
            <p className="mt-12 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              Every descent into form is both gain and sacrifice. The possible gains presence,
              efficacy, and visibility. It surrenders the freedom to remain otherwise.
            </p>
          </div>

          {/* ---- how pattern holds ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/mill-wheel-beside-timber-shed.webp" opacity={0.56} position="center 50%" scrim={0.18} portrait />
            <h3 className="font-serif text-2xl leading-tight">How pattern holds force</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Not as a vessel holds liquid. Pattern holds force by continually returning activity
              into a repeatable relation — through boundary, rhythm, proportion, resonance,
              circulation, hierarchy, and feedback. A vortex persists because moving water is
              repeatedly returned to the same rotation. A flame persists because combustion keeps
              recreating the conditions of combustion. An organism persists because its processes
              repair the boundaries that make those processes possible. A complex persists because
              perception, emotion, interpretation, and behaviour keep confirming one another.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Pattern holds best when the result of an activity helps reproduce the conditions that
              caused it — which is the basis of formative inertia in § XII, and of the flywheel in
              § IX. Past a certain momentum the pattern begins recruiting new force into itself.
            </p>
            <p className="mt-10 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              And every pattern has a holding capacity
            </p>
            <div className="mt-6 grid gap-px lg:grid-cols-3">
              {[["Too weak", "the incoming force cannot sustain the pattern, and it lapses"],
                ["Too strong", "the pattern ruptures"],
                ["Unable to adapt", "force escapes through distortion, symptom, conflict, or collapse"]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-5 pr-6">
                  <p className="font-label text-[10px] uppercase tracking-[0.18em] text-gold">{a}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              So durable form requires neither absolute rigidity nor total openness, but a{" "}
              <span className="text-bone/90">regulated permeability</span> — the metastability of
              § XII stated as a condition of holding rather than of surviving.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              A living pattern holds force by guiding it.{" "}
              <span className="italic text-gold">A dead pattern attempts to hold force by preventing
              change.</span>
            </p>
          </div>

          {/* ---- what it resolves ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">
              What the law settles about rite and tradition
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Visible structure is born when recurrence crosses a threshold of persistence — when a
              pattern begins surviving fluctuations long enough to impress itself on matter,
              behaviour, perception, or collective life. And nothing so produced is ever finished.
              Even the most solid structure is metastable: it persists because supporting relations
              continue to hold. A body must metabolise, an institution must recruit participation, a
              memory must be reactivated, a rite must receive attention. When the maintaining force
              ceases, the form begins returning its components to wider circulation.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which gives § XXVII and § XXXIII their definitions in the terms of this law rather than
              their own.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Ritual", "a form deliberately constructed to gather, transform, and direct force through a sequence"],
                ["Tradition", "a form constructed to preserve formative capacity across generations"],
                ["A mechanical rite", "form that has lost contact with its original force"],
                ["A parasitic tradition", "form that extracts new force from its participants merely to continue its own existence"]].map(([a, b], i) => (
                <div key={a} className={`grid grid-cols-[10rem_1fr] items-baseline gap-4 border-b py-3 sm:grid-cols-[13rem_1fr] ${
                  i > 1 ? "border-border" : "border-gold/30"}`}>
                  <span className={`font-label text-[11px] uppercase tracking-[0.12em] ${i > 1 ? "text-bone/60" : "text-gold"}`}>{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Reduced to three propositions
            </p>
            <div className="mt-8 space-y-4">
              {["Force becomes intelligible through form.",
                "Form remains living through force.",
                "Transformation occurs when force exceeds, dissolves, or reorganises its present form."].map((t, i) => (
                <p key={t} className="flex gap-5 font-serif text-2xl leading-relaxed text-bone/90">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </p>
              ))}
            </div>
            <p className="mx-auto mt-14 max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              The birth of structure is not the defeat of force.{" "}
              <span className="italic text-gold">It is the moment force acquires memory.</span>
            </p>
          </div>
        </div>
      </section>

      <section id="tides" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/bronze-bowl-on-clifftop-in-rain.webp" opacity={0.72} position="center 55%" scrim={0.26} />
        <SectionGlyph delay={-430} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXXVI · Etheric Tides
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Form is a standing achievement within <span className="italic text-gold">moving conditions</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              An Etheric Tide is a recurrent alteration in the receptivity, conductivity, coherence,
              and dominant formative biases of Morphaithēr.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            § XXXV gives the law by which force becomes form. It does not say{" "}
            <span className="italic">when</span>. This is the missing account of temporal variation:
            Morphaithēr names the living formative atmosphere, the tattvas name its qualitative
            biases, and tides describe how those qualities change through time. The field cannot be
            treated as equally receptive, coherent, or active at every moment.
          </p>
          <div className="mt-8 max-w-3xl border border-border p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              A tide does not mechanically cause an event. It alters the conditions under which
              events become easier or harder to initiate, sustain, or stabilise — closer to a change
              in atmospheric pressure than to a command. It influences formation without eliminating
              agency, resistance, material circumstance, or competing forces.
            </p>
          </div>

          {/* ---- superposition ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Nested orders, read at one instant</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              These are not unrelated influences but nested temporal orders, always running at once,
              their phases reinforcing or complicating one another. A waxing phase at dawn in a
              season of emergence guarantees nothing — and it is a different formative atmosphere
              from a waning phase at midnight in a season of decline.
            </p>
            <div className="mt-12">
              <EthericTides />
            </div>
            <p className="mt-12 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Two cautions belong with that. The lunar cycle must not become a universal explanation
              for every psychological fluctuation — it is one rhythmic layer among many, and its
              relevance has to be established by correspondence and repeated observation rather than
              assumed. And since the daily and seasonal cycles{" "}
              <span className="italic">already are</span> solar-terrestrial relations, the solar tide
              proper is reserved here for the qualitative solar current and for longer changes in
              intensity and orientation, rather than counted three times over.
            </p>
          </div>

          {/* ---- rhythmos ---- */}
          <div className="relative isolate mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/tide-pools-under-broken-sky.webp" opacity={0.42} position="center 45%" scrim={0.26} />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">Rhythmos</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                More than a regular beat. Patterned flow — the way movement acquires proportion,
                interval, emphasis, and return.
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground">
                A tide passes through recognisable phases, and each carries different formative
                capacity. The rising phase favours accumulation and organisation. The crest maximises
                expression and visibility. The receding phase favours separation, distribution, and
                integration. The trough allows latency, dissolution, and reconfiguration.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2">
                {["Emergence", "Increase", "Crest", "Recession", "Trough", "Return"].map((x, i) => (
                  <div key={x} className="flex items-center gap-2">
                    <span className="border border-border px-2.5 py-1.5 text-[13px] text-muted-foreground">{x}</span>
                    {i === 5 ? <CycleMark className="text-sm text-gold" /> : <ArrowMark className="text-sm text-gold" />}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                None of which should be labelled good or bad. A crest amplifies disorder as readily
                as strength; a trough may weaken an operation, and may equally permit rest, release,
                concealment, or renewal.{" "}
                <span className="text-bone/90">What matters is the relation between the phase and
                the intended work.</span>
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Which is what this adds to § XXXV. Coagulation and dissolution are not only spatial
                transformations — they have timing. There are moments of thickening and moments of
                loosening, moments when a pattern can be impressed and moments when an existing
                pattern is more easily broken.
              </p>
              <p className="mt-6 font-serif text-xl italic leading-relaxed text-bone/85">
                Rhythmos is the form taken by force in time.
              </p>
            </div>
          </div>

          {/* ---- vocabulary ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/hydraulic-workshop-with-stone-basins.webp" opacity={0.72} position="center 50%" scrim={0.2} />
            <h3 className="font-serif text-2xl leading-tight">
              Not every change is a tide
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The metaphor becomes useless if it absorbs every kind of movement, so the vocabulary
              is kept distinct.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Wave · kyma", "A disturbance propagating through a medium, carrying pattern from one region to another without the medium travelling with it. A spoken name, an emotional shock, a rite, a collective panic, a sudden revelation."],
                ["Cycle · periodos", "A completed circuit of alteration and return — though the returning condition is never identical, because the field retains something from the passage. Better imagined as a spiral than a closed circle."],
                ["Circulation", "Redistribution through differentiated vessels, where what passes is transformed at each stage. Blood is altered throughout its circuit; so is a formative current crossing body, psyche, symbol, rite, and collective life."],
                ["Tide", "A recurrent modulation produced by one or more cycles."],
                ["Current", "A relatively sustained directional movement."],
                ["Etheric weather", "The temporary local condition produced when tides, currents, waves, bodies, places, and events interact."]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[1fr] gap-1 border-b border-border py-4 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Which sorts the scale of things
            </p>
            <div className="mt-6 grid gap-x-10 gap-y-px sm:grid-cols-2">
              {[["A single rite", "produces a wave"],
                ["A rite regularly repeated", "establishes a tide"],
                ["A consecrated institution", "maintains a current"],
                ["All of it, meeting bodily and celestial cycles", "produces local etheric weather"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[1fr] items-baseline gap-1 border-b border-border py-3 sm:grid-cols-[13rem_1fr] sm:gap-3">
                  <span className="text-sm leading-relaxed text-bone/80">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              A stable form is not something untouched by the tide. It is something able to keep its
              organisation while force passes through it.
            </p>
          </div>

          {/* ---- planetary and ritual ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/bronze-bell-in-stone-tower.webp" opacity={0.7} position="center 50%" scrim={0.18} portrait />
            <h3 className="font-serif text-2xl leading-tight">Windows of affinity, and rites that make their own</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Planetary tides are not simplistic rays compelling events or personalities. They are
              large-scale periodic orders whose movements can correspond with recurring qualities of
              formation — opening a <span className="text-bone/90">window of affinity</span> that may
              strengthen resonance between an operation and a particular class of images, materials,
              desires, intelligences, or activities. But affinity is not certainty, and the planetary
              condition still meets the participants, the location, the bodily state, the symbolic
              accuracy, the material preparation, and every other tide running at the time.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which is what makes electional timing intelligible rather than magical. Election does
              not manufacture a result. It seeks a phase in which the larger field offers less
              resistance, or greater sympathy, to the intended formation.
            </p>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              And ritual runs in both directions. A rite receives an existing tide, and it also
              generates a local one: breath, rhythm, chant, gesture, procession, light, scent,
              repetition, and collective attention progressively alter the condition of the space,
              producing the rite&rsquo;s own rising phase, crest, distribution, and closure. The
              § XXVII sequence supplies temporal order, the diagram supplies spatial order,
              consecration establishes the operative relation, and repetition entrains body, place,
              symbol, and attention into a shared phase.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              The ritual body becomes an oscillator.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Repeated across months, years, or centuries, a rite can build formative inertia — a
              reservoir, or the collective flywheel of § IX, which later participants enter rather
              than create. It is why certain places and rites appear to carry an inherited momentum.
              And it explains the failure case with new precision: a mechanical rite may go on
              generating a tide after losing its original object, the accumulated movement then
              serving institutional continuity, group identity, authority, anxiety, or an egregore.
            </p>
            <div className="mt-8 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-serif text-xl leading-relaxed text-bone/90">
                Telestic inertia is{" "}
                <span className="italic text-gold">rhythm continuing after purpose has departed.</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                § XXVII named the condition; this says what is actually still moving in it.
              </p>
            </div>
          </div>

          {/* ---- bodily tides ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/seated-figure-breathing-in-flooded-hall.webp" opacity={0.72} position="center 45%" scrim={0.18} />
            <h3 className="font-serif text-2xl leading-tight">The body as receiver and generator</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The living body does not merely endure changes in the field. It interprets, transforms,
              and retransmits them.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Breath", "The most immediate bridge between voluntary and involuntary life. Inhalation gathers, suspension holds, exhalation releases, and the empty pause permits renewal — which is why ritual breath can bring the vessel into phase with an intended operation."],
                ["Pulse", "Concentration and distribution. Contraction gathers and propels; relaxation permits filling and return. Continuity produced through alternation rather than uninterrupted exertion."],
                ["Sleep", "A daily withdrawal from outward formation. Not an absence of activity but a change in its direction and mode, as restoration, memory integration, and imaginal work come forward."],
                ["Growth", "A slower formative wave — not constant expansion but a succession of accumulation, differentiation, consolidation, and rest."],
                ["Healing", "Not a straight ascent from disorder to health but a passage through protection, breakdown, repair, remodelling, exertion, and rest. Metaphysically: the recovery of coherent circulation and adaptive rhythm."]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[1fr] gap-1 border-b border-border py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/65">
              That last complements biological and medical explanation. It does not replace it — the
              same limit § XXIV sets on the Five Phases.
            </p>
            <div className="mt-12 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                Which makes the body the testing ground
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                A supposed tide should produce some coherent difference in receptivity, attention,
                activity, symbolic experience, or material behaviour{" "}
                <span className="text-bone/90">before</span> elaborate invisible explanations are
                built around it. Records and repeated observation are what distinguish a genuine
                rhythm from expectation, coincidence, or projection — and this is the one claim in
                the section that anyone can check.
              </p>
            </div>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
              The formative universe is not merely structured. It is{" "}
              <span className="text-bone/90">rhythmically</span> structured.
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              Life persists because it can receive a tide without being dissolved by it, change phase
              without losing identity, and turn recurring force into{" "}
              <span className="italic text-gold">memory, growth, and renewed formation.</span>
            </p>
          </div>
        </div>
      </section>

      <section id="mansions" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/mountain-observatory-above-cloud.webp" opacity={0.72} position="center 45%" scrim={0.26} />
        <SectionGlyph delay={-450} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXXVII · Lunar Mansions and Nakshatras
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The starry diagram read as a <span className="italic text-gold">procession</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            § XXXVI established that the formative field changes through time. The mansions give
            those changes a stellar map — drawing together Etheric Tides, the cartography of § XXV,
            correspondence, and the rite of § XXVII. And the whole thing rests on a distinction that
            is astronomical before it is symbolic.
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Lunar phase describes the Moon&rsquo;s relation to the Sun. Lunar mansion describes its
              position against the starry field.
            </p>
          </div>

          <div className="mt-16">
            <LunarClocks />
          </div>

          <div className="mt-16 max-w-3xl border border-border p-6">
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              And a second distinction, of category
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Lunar mansion is the broad category; the nakshatras are the specifically Indian
              tradition of lunar stations — later Indian astronomy commonly dividing the ecliptic
              into twenty-seven equal sectors of 13°20′, though twenty-eight-star traditions also
              exist. Arabic, Chinese, and Indian systems address a similar astronomical structure
              without assigning it identical symbols, virtues, or operations.{" "}
              <span className="text-bone/90">They should be compared, and not silently fused.</span>
            </p>
          </div>

          {/* ---- moon as mediator ---- */}
          <div className="relative isolate mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/waves-in-narrow-sea-inlet.webp" opacity={0.5} position="center 50%" scrim={0.2} portrait />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">The Moon as formative mediator</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Not the source of what the mansions carry. Its mobile mediator.
              </p>
            </div>
            <div>
              <p className="font-serif text-xl leading-relaxed text-bone/90">
                The stars establish the diagram.{" "}
                <span className="italic text-gold">The Moon turns the diagram into a procession.</span>
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                The relatively fixed stars supply a stable celestial diagram; the Moon travels it,
                bringing each region into changing relation with the Earth, the Sun, the local
                horizon, and the living observer. It converts a spatial map into a temporal sequence
                — a moving aperture in the Fourfold Veil, which does not absorb a substance and pour
                it downward but establishes a temporary relation through which the qualities of a
                station may become more accessible or resonant within Morphaithēr.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Which makes this transduction rather than transmission. A stellar pattern passes
                through lunar mediation, etheric strata, atmospheric conditions, symbolic tradition,
                bodily receptivity, and ritual intention, and is translated at every stage. The
                terrestrial expression will be <span className="italic">analogous</span> to the
                celestial pattern, never identical with it.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                In the ladder of § XXVI, the Moon behaves almost as a{" "}
                <span className="text-bone/90">moving synthema</span> — a key that successively
                addresses different regions of the celestial grammar.
              </p>
            </div>
          </div>

          {/* ---- what a mansion is ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/path-to-lit-shrine-under-moon.webp" opacity={0.58} position="center 50%" scrim={0.18} portrait />
            <h3 className="font-serif text-2xl leading-tight">
              A station of qualitative modulation
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Not a celestial building holding a quantity of occult energy. A defined region of the
              lunar path, interpreted through a particular traditional grammar — and every mansion
              has at least four layers.
            </p>
            <div className="mt-10 max-w-4xl">
              {["Its astronomical location, or stellar reference",
                "Its inherited symbols, deities, stories, and classifications",
                "The formative associations accumulated through centuries of observation and ritual use",
                "Its present activation through a particular Moon, phase, place, practitioner, and operation"].map((t, i) => (
                <div key={t} className="grid grid-cols-[1.6rem_1fr] items-baseline gap-4 border-b border-border py-3">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The distinction earns its keep because a mansion&rsquo;s virtue may not come from one
              source. Part may belong to the observed celestial pattern. Part may arise from the
              symbolic grammar through which a tradition learned to recognise it. And part may have
              been reinforced by centuries of collective attention, building a formative current
              around the station&rsquo;s name, image, and rites.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85">
              A mansion can possess both a celestial substrate and a traditional body.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              When the Moon enters such a station its qualities become one component of the current
              etheric weather. They do not replace the solar, planetary, seasonal, bodily, or ritual
              tides; they join them, and the moment is a composite rather than the expression of any
              isolated influence.{" "}
              <span className="text-bone/90">The mansion does not compel events. It alters the
              field&rsquo;s affordances</span> — what kinds of formation meet sympathy, resistance,
              amplification, or instability.
            </p>
          </div>

          {/* ---- qualitative time ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/moon-over-tidal-flats-and-channel.webp" opacity={0.6} position="center 55%" scrim={0.16} portrait />
            <h3 className="font-serif text-2xl leading-tight">A clock of qualitative time</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The nakshatras turn the starry field into a clock whose hand is the Moon — and the
              question it answers is not the usual one.
            </p>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div className="border-t border-border pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  A mechanical clock
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  tells us how much time has passed.
                </p>
              </div>
              <div className="border-t border-gold/50 pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                  Nakshatra timing
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  asks what kind of formative condition is presently passing.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              So these are not smaller zodiac signs. The twelve signs are one division of the
              heavens; the nakshatras are another, built on the Moon&rsquo;s comparatively rapid
              movement against the stars, with their own deities, symbols, classifications, and
              śaktis forming a distinct interpretive grammar. A station&rsquo;s{" "}
              <span className="italic">śakti</span> can be read here as its characteristic{" "}
              <span className="italic">dynamis</span> — which connects it directly to § XXXV, since a
              capacity is precisely what awaits actualisation.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A station&rsquo;s symbol does not merely describe its power; it teaches how to
              recognise that power across different manifestations. A hand, a root, a blade, a
              vessel, a road, an animal, a throne, a flame — none indicates one literal event, but a
              family of operations joined by an underlying formative rule. The starry field becomes a
              kind of primordial memory, preserving recurring modes of generation, nourishment,
              severance, concealment, movement, union, dissolution, and return, which the Moon
              activates sequentially by passing through them.
            </p>
            <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
              <p className="text-base leading-relaxed text-muted-foreground">
                All of which stays governed by § XXV&rsquo;s rules for maps. A nakshatra diagram is a
                map made by a specific tradition; an Arabic mansion diagram is another. Their
                similarities invite comparison, and their differences must not be erased.
              </p>
              <p className="mt-4 font-serif text-xl italic leading-relaxed text-bone/85">
                Shared sky does not guarantee identical symbolic grammar.
              </p>
            </div>
          </div>

          {/* ---- four stages ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">
              Mansion, virtue, symbol, operation
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Four successive stages of actualisation — where{" "}
              <span className="text-bone/90">virtue does not mean moral goodness</span> but operative
              capacity: what a station is understood to support, intensify, separate, stabilise,
              reveal, conceal, nourish, or transform.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Mansion", "the celestial station, or formative location"],
                ["Virtue", "its characteristic capacity — its dynamis"],
                ["Symbol", "the interface through which that capacity is recognised and addressed"],
                ["Operation", "the embodied actualisation, its energeia"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[9rem_1fr]">
                  <span className="font-serif text-lg italic text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The symbol is the mediating grammar between virtue and operation — as symbolon
              establishing recognition between the celestial pattern and its terrestrial analogues,
              and as synthema becoming the operative key through which the relation is deliberately
              addressed. The operation then passes through rite: the mansion gives location, the
              lunar transit gives timing, the symbol gives address, the materials give
              correspondence, and the living vessel gives embodiment.
            </p>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              <span className="text-bone/90">No single element is sufficient.</span> Correct timing
              cannot compensate for a confused intention. An accurate symbol cannot animate an
              unprepared vessel. A powerful inherited rite can still suffer Transductive Loss or fall
              into the telestic inertia of § XXVII. The operation succeeds or fails through the total
              relation — and consecration establishes a temporary bond between the operative vessel
              and the mansion&rsquo;s virtue, which deconsecration must afterward release, so that
              nothing stays indefinitely identified with a current invoked for a limited purpose.
            </p>
          </div>

          {/* ---- election ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Timing as phase engineering</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Lunar timing does not replace action. It alters the degree of resistance or assistance
              surrounding it — and a complete election has to read three clocks at once.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["The synodic clock", "the Moon's phase, and its relation to the Sun — the operation's larger movement"],
                ["The sidereal clock", "the mansion occupied — which refines that movement into a kind"],
                ["The local clock", "planetary, seasonal, bodily, environmental, and ritual conditions — whether the vessel can carry it"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[1fr] gap-1 border-b border-border py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which forecloses the simplistic rules. A waxing Moon is not automatically favourable to
              everything that grows — some formations should not be enlarged. A waning Moon is not
              inherently destructive; it may support pruning, purification, withdrawal, healing
              through removal, or the dismantling of something obsolete. Growth itself means more
              than increase: germination, expansion, differentiation, pruning, fruition, decay, and
              return, which is why nakshatra timing was historically embedded in agricultural
              calendars rather than kept as abstract astrology.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A long transformative work may therefore cross several stations — one supporting
              severance from an old pattern, another latency and purification, another the formation
              of a new centre, another the stabilising of the result. Transformation becomes a
              journey through differentiated temporal conditions rather than one isolated magical
              moment.
            </p>
            <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
              <p className="text-base leading-relaxed text-muted-foreground">
                So the practitioner does not command the celestial field. They choose when and how to
                enter its circulation. And the body remains decisive: if the mansion looks favourable
                while the practitioner is exhausted, ill-prepared, emotionally disordered, or unable
                to hold attention, then the celestial and bodily tides are simply out of phase.
              </p>
              <p className="mt-4 font-serif text-xl italic leading-relaxed text-bone/85">
                Cosmic timing without bodily timing is incomplete.
              </p>
            </div>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <div className="mx-auto max-w-2xl space-y-3">
              {[["The mansion", "is celestial Form."],
                ["Its virtue", "is latent Force."],
                ["The Moon", "places that force into Time."],
                ["The symbol", "makes it recognisable."],
                ["Ritual", "makes it operative."],
                ["The living vessel", "gives it terrestrial form."]].map(([a, b]) => (
                <p key={a} className="font-serif text-xl leading-relaxed text-bone/90">
                  <span className="text-gold">{a}</span> {b}
                </p>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
              Which is why these are not decorative additions to astrology. They explain how the
              starry diagram is read sequentially, how celestial pattern becomes qualitative time,
              and how a rite enters the moving field at a deliberately chosen point.
            </p>
          </div>
        </div>
      </section>

      <section id="zodiac" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/sun-pillar-over-salt-flat.webp" opacity={0.72} position="center 50%" scrim={0.24} />
        <SectionGlyph delay={-470} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXXVIII · Zodiacal Patterning
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            A syntax of <span className="italic text-gold">becoming</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            § XXXVI gave the field its rise and recession; § XXXVII gave the finer lunar-stellar
            timing. This gives the major modes through which force becomes organised — which places
            it above the tattvas in scale. The tattvas are morphogenic qualities within Morphaithēr;
            the Zodiac is a higher-order syntax combining qualities into recurring modes of
            formation.
          </p>

          {/* ---- which map ---- */}
          <div className="mt-16 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
              Which map, declared before anything else
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              The tropical zodiac begins at the March equinox and divides the ecliptic into twelve
              equal sectors — a solar-terrestrial grammar of equinoxes, solstices, and the annual
              cycle. The sidereal zodiac also holds twelve equal signs while maintaining a chosen
              alignment with the stellar background, and different traditions choose different
              offsets. The astronomical constellations are neither: irregularly sized stellar
              regions, with the ecliptic even passing through Ophiuchus, though there is no
              thirteenth sign in the classical twelvefold grammar. Axial precession shifts the
              equinoctial points against the stars over roughly 26,000 years, which is why tropical
              and sidereal no longer coincide.
            </p>
          </div>
          <div className="mt-10 max-w-4xl">
            {[["Tropical signs", "solar-terrestrial and equinoctial patterning"],
              ["Sidereal signs", "twelvefold orientation relative to the starry field"],
              ["Nakshatras", "finer lunar-stellar timing — § XXXVII"],
              ["Fixed stars", "particular stellar signatures"]].map(([a, b]) => (
              <div key={a} className="grid grid-cols-[1fr] gap-1 border-b border-border py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Both maps may be used, so long as their functions stay distinct — because using both
            without labelling them is simply double counting. Which is § XXV&rsquo;s first rule:{" "}
            <span className="text-bone/90">every diagram must declare its coordinate system.</span>
          </p>
          <div className="mt-8 max-w-3xl border border-border p-5">
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              And a hemispheric problem
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The March equinox is spring in the Northern Hemisphere and autumn in the Southern. A
              global system should therefore define the tropical signs through equinoctial and
              solstitial geometry, rather than assuming Northern Hemisphere seasonal imagery is
              universally embodied.
            </p>
          </div>

          {/* ---- the derivation ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Twelve, and why exactly twelve</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The signs are not a list. They are generated — four elements describing the medium
              formation occurs through, three modalities describing the phase of activity that medium
              is in. And the elements here are not the physical substances, but formal categories
              abstracted from their behaviour.
            </p>
            <div className="mt-14">
              <ZodiacWheel />
            </div>
            <p className="mt-16 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The same twelve, laid flat: the wheel shows the order they stand in, the grid shows the
              generation that produces them. Read down a column and the phase is constant while the
              medium changes; read across a row and the medium holds while the phase turns.
            </p>
            <div className="mt-12">
              <ZodiacGrid />
            </div>
            <p className="mt-12 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Nor should they be equated mechanically with the tattvas. Zodiacal elements are a
              fourfold classification at one scale of the map; tattvas are subtler morphogenic biases
              within Morphaithēr. They correspond; they are not interchangeable. And Akasha is not{" "}
              <span className="italic">missing</span> from this scheme — it can be read as the field
              that lets the four elemental modes relate at all, the open condition within which the
              twelvefold grammar appears, rather than a fifth column producing extra signs.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The modalities also reproduce the telestic sequence of § XXVII: cardinal opens the
              operation, fixed gathers and holds it, mutable distributes the result and prepares the
              next cycle. The three alchemical principles intersect this without collapsing into it —
              Sulfur resembling direction and appetite, Mercury mediation and transduction, Salt
              fixation — while every sign and element contains all three in different proportion.
            </p>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              These modes are morally neutral. Concentration produces devotion or obsession.
              Dissolution brings liberation or the loss of coherence. Stabilisation preserves what is
              valuable or prevents what is necessary.{" "}
              <span className="text-bone/90">No sign is inherently elevated, primitive, beneficent,
              or destructive</span> — and read in sequence, the whole circle is a cycle of the law in
              § XXXV.
            </p>
          </div>

          {/* ---- grammar ---- */}
          <div className="relative isolate mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/rotunda-open-to-night-sky.webp" opacity={0.39} position="center 55%" scrim={0.18} portrait />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">The Zodiac as cosmic grammar</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A grammar does not determine the sentence. It establishes the relations through which
                sentences can be formed.
              </p>
            </div>
            <div>
              <div className="space-y-px">
                {[["Planet", "operative faculty, or verb"],
                  ["Sign", "mode, or manner of operation"],
                  ["House", "field, circumstance, or location"],
                  ["Aspect", "relational syntax between faculties"],
                  ["Fixed star", "proper signature, name, or accent"],
                  ["Phase and mansion", "tense, cadence, and timing"],
                  ["Living vessel", "the speaker through whom the grammar is embodied"]].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-[8rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[10rem_1fr]">
                    <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Mars does not stop signifying division, assertion, heat, or directed effort when it
                changes sign. What changes is how those powers are organised — the sign supplying
                manner, rhythm, and constraint, the house identifying where it enters situated
                experience, the aspects describing what assists, resists, redirects, or complicates
                it.
              </p>
              <p className="mt-6 font-serif text-xl italic leading-relaxed text-bone/85">
                The Zodiac is not a dictionary of events. It is a syntax of becoming.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Its circular order matters too. Each sign arises from the limitations and excesses of
                the one before, develops a particular solution, and eventually produces the
                conditions requiring the next — which makes the twelve not compartments but a{" "}
                <span className="italic">periodos</span>, a circuit of differentiation,
                stabilisation, crisis, and return.
              </p>
            </div>
          </div>

          {/* ---- fixed stars ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Fixed stars and deep signatures</h3>
            <p className="mt-4 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              If signs are common nouns and verbs, fixed stars are proper names.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A sign describes a thirty-degree mode available anywhere in its sector. A fixed star
              occupies one position and carries a far more concentrated body of astronomical, mythic,
              historical, and ritual association — which is precisely why its meaning should not be
              spread indiscriminately across a whole sign. And <span className="italic">fixed</span>{" "}
              is relative: the stars have their own motion, and merely appear stationary beside the
              planets across ordinary human timescales. That relative stability is what lets star
              traditions accumulate over centuries, giving them{" "}
              <span className="text-bone/90">deep signatures</span> of several layers.
            </p>
            <div className="mt-10 max-w-4xl">
              {["The actual astronomical star",
                "Its position, and its relation to ecliptic, horizon, and planets",
                "Its inherited names, myths, images, and testimonies",
                "The collective current created by repeated cultural and ritual attention",
                "Its particular activation within a chart or operation"].map((t, i) => (
                <div key={t} className="grid grid-cols-[1.6rem_1fr] items-baseline gap-4 border-b border-border py-3">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              These must not be confused with one another. A myth attached to a star is not the
              star&rsquo;s radiation — though the myth may well become the symbolic interface through
              which a tradition recognises and works with its perceived virtue.
            </p>
            <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                And the method must be named
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                A tradition may count close zodiacal conjunctions, rising and setting relationships,
                culmination, heliacal phenomena, or parans. Whichever is adopted has to be declared —
                otherwise fixed stars become an uncontrolled source of meanings, added whenever
                convenient. In relation to the Crypt they are anchors of long-duration symbolic
                memory: cultures separated by generations return to nearly the same markers, while
                what passes through them still undergoes Transductive Loss, reinterpretation, and
                accretion.
              </p>
            </div>
          </div>

          {/* ---- houses ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Houses as fields of embodiment</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The Zodiac is a universal celestial circle. Houses localise it to a particular place
              and time, and the four angles establish the local cross.
            </p>
            <div className="mt-10 grid gap-x-10 gap-y-px sm:grid-cols-2">
              {[["Ascendant", "emergence into visibility and embodied presence"],
                ["Descendant", "encounter, polarity, the field of the other"],
                ["Midheaven", "culmination, elevation, public visibility"],
                ["Imum Coeli", "root, foundation, ancestry, interior depth"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[7rem_1fr] items-baseline gap-3 border-b border-border py-3">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              What was universal becomes oriented — by horizon and meridian, above and below, east
              and west, rising, culminating, setting, hidden. Which is why they can be called fields
              of embodiment: they show where an abstract planetary-sign pattern meets material
              circumstance, relationship, work, body, inheritance, community, danger, obligation, or
              practice.
            </p>
            <p className="mt-8 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              A sign is a mode of force.{" "}
              <span className="italic text-gold">A house is a field of manifestation.</span>
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              So the first house is not simply Aries, nor the second Taurus. The natural-zodiac
              analogy is sometimes suggestive, and treating signs and houses as identical destroys a
              layer of the grammar: Aries signifies a mode of emergence wherever it appears, while
              the first house signifies the local field of emergence regardless of which sign
              occupies it. House systems are another cartographic choice — whole-sign, equal,
              quadrant — and every interpretation must state which it uses. Results from several
              should not be blended without saying why.
            </p>
            <div className="mt-10 grid gap-px md:grid-cols-3">
              {[["Angular", "emergence, action, visibility"],
                ["Succedent", "accumulation, support, stabilisation"],
                ["Cadent", "distribution, transition, displacement"]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-4 pr-6">
                  <p className="font-label text-[10px] uppercase tracking-[0.18em] text-gold">{a}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/60">
              A cycle resembling the sign modalities without being identical to them.
            </p>
          </div>

          {/* ---- aspects ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Aspects as lines of force</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which requires no literal invisible beams travelling between planets. An aspect
              describes a relational condition: how two operative powers are placed to combine,
              polarise, obstruct, reinforce, or redirect one another.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Conjunction · 0°", "concentration, fusion, co-presence"],
                ["Opposition · 180°", "polarity, encounter, projection across an axis"],
                ["Square · 90°", "friction, forced articulation, structural tension"],
                ["Trine · 120°", "affinity, circulation, effortless reinforcement"],
                ["Sextile · 60°", "exchange, coordination, available cooperation"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[9rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[11rem_1fr]">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              None of which reduces to good and bad. A trine may let a destructive pattern circulate
              without resistance; a square may generate exactly the pressure that differentiation,
              skill, or transformation requires.{" "}
              <span className="text-bone/90">Ease preserves what already flows; tension demands that
              a new structure be produced</span> — which ties aspects straight back to § XXXV. Orbs
              give the bandwidth within which a relation is treated as operative; applying and
              separating give its temporal phase, whether it gathers toward exactness or releases
              from it.
            </p>
            <div className="mt-12 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                Which makes a chart a topology
              </p>
              <div className="mt-4 space-y-2">
                {[["Planets", "are nodes"], ["Signs", "are modes applied to the nodes"],
                  ["Houses", "are fields containing the nodes"], ["Aspects", "are the edges connecting them"],
                  ["Aspect patterns", "are circuits formed by several edges"]].map(([a, b]) => (
                  <p key={a} className="text-sm leading-relaxed text-muted-foreground">
                    <span className="text-bone/90">{a}</span> {b}.
                  </p>
                ))}
              </div>
              <p className="mt-5 font-serif text-xl italic leading-relaxed text-bone/85">
                A horoscope is not a collection of isolated placements. It is a relational topology.
              </p>
            </div>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <div className="mx-auto max-w-3xl space-y-3">
              {[["Planet", "indicates the operative power."],
                ["Sign", "determines its mode."],
                ["House", "provides its field of embodiment."],
                ["Aspect", "establishes its relations."],
                ["Fixed stars", "add particular signatures."],
                ["The tides", "determine its temporal activation."],
                ["The living vessel", "determines how the pattern is received, resisted, and transformed."]].map(([a, b]) => (
                <p key={a} className="font-serif text-lg leading-relaxed text-bone/90">
                  <span className="text-gold">{a}</span> {b}
                </p>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
              None of which is fatalism. A chart is a frozen diagram of a moving field — a map of
              formative biases, capacities, tensions, and pathways present at one threshold in time.
              It does not contain the completed life.
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              The grammar constrains what can be said easily.{" "}
              <span className="italic text-gold">
                The living vessel still participates in the speaking.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="rightrelation" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-510} />
        <Backdrop src="/bg/stair-cut-into-misted-gorge.webp" opacity={0.22} position="center 40%" scrim={0.26} portrait anchor="left" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXXIX · The Art of Right Relation
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Whether the path should be <span className="italic text-gold">walked</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The architecture has said what forces are, how they acquire form, how they cross levels,
            and how they become embodied. This asks the question none of that answers: how a living
            being should enter these relations without falsifying the force, overwhelming the vessel,
            confusing participation with possession, or preserving a form after its purpose has gone.
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Right Relation is the proportionate and truthful arrangement of force, form, vessel,
              mediator, timing, and telos through which participation becomes transformative without
              becoming deformative or parasitic.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Which is not harmony, agreement, or moral niceness. Some relations require union; others
            require distance, resistance, severance, or deconsecration.{" "}
            <span className="text-bone/90">A boundary can be as correct as an embrace.</span>{" "}
            Rightness means the relation is truthful, proportionate, properly mediated, timely, and
            ordered toward an intelligible end.
          </p>

          <div className="mt-16">
            <RightRelation />
          </div>

          {/* ---- why an art ---- */}
          <div className="mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">Why it is an art</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Because the same force nourishes in one measure and destroys in another.
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground">
                Fire may illuminate, consecrate, purify, inflame, or consume. Openness may permit
                communion or invasion. Stability may preserve wisdom or imprison development.
                Dissolution may liberate a being or destroy the coherence it needed. None of that
                reduces to a rule, so the art consists in calibration.
              </p>
              <div className="mt-8 max-w-3xl">
                {[["Measure", "how much force this vessel can actually receive"],
                  ["Boundary", "what must remain distinct"],
                  ["Order", "which stage must precede another"],
                  ["Timing", "when the relation can be entered fruitfully"],
                  ["Purpose", "what the relation is actually serving"]].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-border py-3">
                    <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Which makes this more than correspondence. Correspondence identifies a kinship
                between things; Right Relation decides whether, when, and how that kinship should be
                activated. Two things may correspond truly and still be brought together wrongly.
              </p>
              <p className="mt-6 font-serif text-xl leading-relaxed text-bone/85">
                Correspondence discovers the path.{" "}
                <span className="italic text-gold">Right Relation determines whether the path should
                be walked.</span>
              </p>
            </div>
          </div>

          {/* ---- participation ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Participation — methexis</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Partaking: the participant receives something of a reality without becoming identical
              to it or exhausting it. Neither detached observation nor complete fusion — the vessel
              opens to a force while keeping boundary enough to receive, interpret, and embody it.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              Without openness there is no participation. Without distinction there is no relation.
            </p>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              And the vessel does not merely contain what enters it. It selects, translates, resists,
              amplifies, and gives local expression to what it receives, which is why a divine name,
              planetary virtue, or ritual power appears differently through different vessels. That
              variation is not corruption. It is the unavoidable consequence of embodiment — the same
              Transductive Loss § XVII names, seen from the receiving end.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              It also explains why rite cannot be purely external. Entering the operation alters the
              practitioner&rsquo;s attention, breath, posture, imagination, memory, and field of
              relation.{" "}
              <span className="text-bone/90">The operator becomes one of the materials being operated
              upon.</span>
            </p>
            <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                Which is why the art governs access
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                One should not participate in every current one can contact. Some forces exceed the
                vessel. Some collective fields are parasitic. Some symbols establish genuine
                relations whose consequences the participant is unprepared to carry. So the question
                is never only whether the gate can be opened, but what relation opening it
                establishes, what will sustain that relation, and{" "}
                <span className="italic">how it will be closed</span>.
              </p>
            </div>
          </div>

          {/* ---- metamorphosis ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Metamorphosis, and its three counterfeits</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A passing experience is not yet metamorphosis. Intensity alone is not transformation —
              the vessel may be excited, overwhelmed, fascinated, or temporarily expanded without
              acquiring any new stable capacity at all. Metamorphosis is participation stabilised
              into a new form: the received pattern metabolised deeply enough to reorganise
              perception, desire, behaviour, embodiment, and relation.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Which ties it to § XXXV. Solve loosens the distorted form, Mercury carries the released
              material between conditions, Sulfur supplies the directing telos, and Coagula stabilises
              the new relation through Salt — while repeated alignment builds the formative inertia
              that lets the pattern sustain itself.
            </p>
            <div className="mt-10 grid gap-px lg:grid-cols-3">
              {[["Mimicry", "copies the external appearance of a form without acquiring its capacity"],
                ["Inflation", "identifies the personal vessel with a force greater than itself"],
                ["Possession", "lets an entering pattern displace the existing centre rather than transform it"]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-5 pr-6">
                  <p className="font-serif text-xl text-gold">{a}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              In each, something changes and the change is not rightly integrated. A person touched
              by a solar current does not actualise it by becoming grandiose; a person participating
              in a martial current does not fulfil it through indiscriminate aggression. The virtue
              has to become proportionate capacity — clarity, courage, disciplined direction,
              protection, sacrifice.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              The test is not how extraordinary the experience felt.{" "}
              <span className="italic text-gold">It is what the vessel can truthfully embody
              afterward.</span>
            </p>
          </div>

          {/* ---- fulfilment ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Fulfilled actualisation</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The completion of the movement from dynamis through energeia toward entelecheia. Not
              maximal power — <span className="text-bone/90">power brought into its correct form</span>.
              A relation is fulfilled when it produces the capacity for which it was entered, without
              destroying the vessel, falsifying its object, or replacing its declared purpose with a
              hidden one.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["A symbol", "produces genuine recognition rather than fascination with its surface"],
                ["A rite", "becomes embodied consequence rather than ceremonial performance"],
                ["A teaching", "produces understanding capable of new judgement"],
                ["A tradition", "generates living recognisers rather than obedient preservers"],
                ["A calling", "becomes responsible action rather than an identity claimed by the ego"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[1fr] gap-1 border-b border-border py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              So fulfilment shows in fruit: the person can now perceive, endure, create, discern, or
              act in a way that was previously only potential. And it is never final. Every actualised
              form becomes the vessel of new potency — the fruit bears seed, the completed operation
              alters Morphaithēr, enters the Crypt, contributes to tradition, and changes the
              conditions later beings will meet.
            </p>
          </div>

          {/* ---- the test ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/cliff-road-vanishing-into-fog.webp" opacity={0.28} position="center 55%" scrim={0.22} />
            <h3 className="font-serif text-2xl leading-tight">The practical test</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Discernment is the faculty governing the whole sequence — whether a correspondence is
              genuine, the vessel prepared, the mediator trustworthy, the timing right, and the
              actual fruits a match for the declared purpose.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Truth", "Is the perceived correspondence real, or merely desired?"],
                ["Proportion", "Can the vessel receive this force without inflation or collapse?"],
                ["Mediation", "Is the symbol, intermediary, or rite appropriate to the relation?"],
                ["Boundary", "What must remain distinct, and what may legitimately unite?"],
                ["Timing", "Is this being entered during a compatible tide, and in the right sequence?"],
                ["Telos", "What is the operation actually serving?"],
                ["Fruit", "Does it increase appropriate capacity, coherence, and responsible action?"],
                ["Closure", "Can the relation be concluded, released, or deconsecrated when its work is done?"]].map(([a, b], i) => (
                <div key={a} className="grid grid-cols-[1.6rem_6rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[2rem_8rem_1fr]">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-label text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              A relation that cannot tolerate examination, correction, boundary, or closure is
              immediately suspect.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A tradition demanding depletion to preserve itself has become parasitic. A spirit
              rejecting discernment contradicts the mediation it claims. A rite that cannot name its
              object has become vulnerable to the telestic inertia of § XXVII.
            </p>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <div className="mx-auto max-w-3xl space-y-3">
              {[["True correspondence", "gives the relation its path."],
                ["Proper mediation", "gives it safe passage."],
                ["Proportion", "gives it a viable vessel."],
                ["Ritual", "gives it ordered embodiment."],
                ["Metamorphosis", "gives it consequence."],
                ["Fulfilled actualisation", "gives it fruit."]].map(([a, b]) => (
                <p key={a} className="font-serif text-lg leading-relaxed text-bone/90">
                  <span className="text-gold">{a}</span> {b}
                </p>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
              This is where the architecture becomes ethical without becoming moralistic, and
              practical without becoming mechanical. The central problem was never whether forces are
              real.
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              It is whether we know how to meet them —{" "}
              <span className="italic text-gold">
                without worshipping what should be examined, consuming what should be cultivated,
                merging with what should remain distinct, or preserving what has already lost its
                soul.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="mortality" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-530} />
        <Backdrop src="/bg/stream-through-basalt-ruins.webp" opacity={0.32} position="center 45%" scrim={0.24} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XL · Death, Suffering, and the Cost of Form
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Whether the architecture stays truthful when <span className="italic text-gold">form fails</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Form makes existence possible by limiting possibility — and the same limitation that
              gives a being identity is what makes it vulnerable to loss.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            To take form is to become finite; to become finite is to acquire boundaries; and whatever
            has boundaries can be wounded, deprived, divided, or destroyed. None of which makes
            suffering good or every death purposeful. A system must resist explaining tragedy too
            neatly, or metaphysics becomes a way of escaping grief, excusing injustice, and imposing
            meaning on people whose suffering should first be relieved.
          </p>

          {/* ---- what persists ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <Backdrop src="/bg/split-trunk-of-old-tree.webp" opacity={0.3} position="center 40%" scrim={0.24} portrait />
            <h3 className="font-serif text-2xl leading-tight">What persists</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A living being is a pattern capable of continually gathering its materials into one
              process — breathing, circulating, repairing, remembering, distinguishing itself from
              its surroundings. Death is the point at which that pattern can no longer hold them as a
              single living unity.{" "}
              <span className="text-bone/90">Life is force continually renewing form; death is where
              the form can no longer renew the relations that make it one.</span>
            </p>
            <div className="mt-14">
              <Persistence />
            </div>
          </div>

          {/* ---- circulation, and the loss it does not cancel ---- */}
          <div className="mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">Two truths held together</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Neither of which is allowed to dissolve the other.
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground">
                At the scale of ecosystems, death releases matter and space back into circulation.
                Without decomposition, nutrients stay bound inside completed forms; without
                succession, the living occupy conditions the unborn require. Death prevents form from
                becoming permanent accumulation, which makes it part of how life continues rather
                than simply its opposite.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                And that function cancels nothing. The forest may be nourished by decomposition while
                a family still loses someone irreplaceable.{" "}
                <span className="text-bone/90">A universal function does not abolish personal
                value.</span>
              </p>
              <p className="mt-8 font-serif text-xl leading-relaxed text-bone/85">
                Death belongs to the circulation of life,{" "}
                <span className="italic text-gold">and every particular death may still be an
                irreducible loss.</span>
              </p>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Seasonal decline, lunar waning, alchemical dissolution and ritual death can all
                symbolise that circulation. None of them proves personal resurrection, and none makes
                bereavement equivalent to symbolic transformation. Metaphorical death may illuminate
                literal death. It must never trivialise it.
              </p>
            </div>
          </div>

          {/* ---- suffering ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Suffering as a relational event</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Suffering occurs where a being&rsquo;s capacities, attachments, boundaries, needs or
              meanings are placed under conditions they cannot readily reconcile. It is not one
              substance and has no single cause — within the terms of § XXXIX it may indicate any of
              these:
            </p>
            <div className="mt-10 grid gap-x-10 gap-y-px sm:grid-cols-2">
              {["A violated boundary",
                "Too much force, or too little",
                "A mismatch between vessel and environment",
                "The rupture of a sustaining relation",
                "Resistance met during real growth",
                "The loss of a form central to identity",
                "A parasitic collective or institution",
                "Material contingency, with no symbolic purpose at all",
                "Deliberate cruelty or injustice"].map((t, i) => (
                <div key={t} className="grid grid-cols-[1.6rem_1fr] items-baseline gap-3 border-b border-border py-3">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-3xl border-l-2 border-gold pl-6">
              <p className="text-base leading-relaxed text-muted-foreground">
                Which is why suffering cannot be read automatically as punishment, karma, initiation,
                or evidence that someone needed the experience.{" "}
                <span className="text-bone/90">Such interpretations may protect the worldview of the
                observer at the expense of the sufferer.</span>
              </p>
              <p className="mt-4 font-serif text-xl italic leading-relaxed text-bone/85">
                Pain is data, but it is not an infallible oracle.
              </p>
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              It runs both ways. Suffering does not prove distortion — grief may arise precisely
              because a relationship was real, discipline may be hard because a genuine capacity is
              forming, truth-telling may produce conflict because an unjust arrangement is being
              disturbed. And its absence proves nothing either: numbness hides injury, privilege
              shields one participant while another carries the cost, and a parasitic institution can
              flourish on suffering it exports elsewhere.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              So the question is never merely whether this hurts.{" "}
              <span className="italic text-gold">
                It is what is producing the suffering, what it is serving, who bears its cost, and
                what form is emerging through it.
              </span>
            </p>
          </div>

          {/* ---- metamorphosis, and its limit ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">
              Suffering can enter metamorphosis. It is not metamorphosis.
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Trauma does not automatically produce wisdom and loss does not automatically deepen the
              soul. Pressure may transform, and it may equally crush, fragment, or deform — the
              difference lying in the severity of the injury, the resources of the vessel, the
              presence of support, and whether integration is possible at all. For suffering to
              become transformative it has to be metabolised: named truthfully, given containment,
              connected to meaning without being romanticised, and slowly incorporated into a renewed
              form of life.
            </p>
            <div className="mt-10 max-w-4xl">
              {[["Mortificatio", "confronts the death or failure of an existing form"],
                ["Putrefactio", "lets that form break down rather than be artificially preserved"],
                ["Separatio", "distinguishes what must be kept from what must be released"],
                ["Purificatio", "removes false meanings, shame, and parasitic attachments"],
                ["Coagulatio", "gives the surviving life a new structure"]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[1fr] gap-1 border-b border-border py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <span className="font-serif text-lg italic text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              And even a successful transformation does not make the original harm good. Meaning
              created after suffering does not travel backward to justify its cause.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              Meaning may be a fruit of suffering.{" "}
              <span className="italic text-gold">It is not automatically its explanation.</span>
            </p>
          </div>

          {/* ---- the remainder ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <div className="max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-gold">
                The Unfulfilled Remainder
              </p>
              <p className="mt-4 font-serif text-xl leading-relaxed text-bone/90">
                The unrealised dynamis left behind when a vessel is broken, or time runs out.
              </p>
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Not every potency reaches actualisation. Some people die before their capacities
              unfold. Some relationships end before reconciliation. Some works stay unfinished, and
              some injuries permanently restrict what might otherwise have been possible. There is no
              intellectual honesty in calling every interruption a hidden fulfilment.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The remainder may pass into others as responsibility, grief, inspiration, warning, or
              unfinished work. A child carries forward what a parent could not complete; a tradition
              preserves an abandoned vision; a community becomes obligated by a life unjustly
              interrupted. But continuation is not retroactive completion.{" "}
              <span className="text-bone/90">Some losses remain losses</span> — and the architecture
              becomes more humane by admitting tragic remainder than by forcing every event into a
              closed teleology.
            </p>
          </div>

          {/* ---- grief ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Grief as continued relation</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Grief is not a failure to release the dead. It is the living system reorganising itself
              after the disappearance of a relationship that helped constitute it. Identity is partly
              relational — child, parent, partner, friend, teacher, rival, witness — so the survivor
              loses not only the other person but a particular way of being themselves in relation to
              that person.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The bond cannot continue in its former mode and cannot simply be erased, so it has to
              be transformed: into memory, inheritance, internal dialogue, symbolic presence,
              ancestral relation. Distortion appears at either extreme — erasing the dead as though
              the relation meant nothing, or refusing every transformation as though it could remain
              materially unchanged.
            </p>
            <p className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-bone/90">
              Grief is the labour by which love changes form{" "}
              <span className="italic text-gold">without pretending that nothing was lost.</span>
            </p>
          </div>

          {/* ---- rites ---- */}
          <div className="relative isolate mt-24 border-t border-border pt-16">
            <PassageGeometry />
            <h3 className="font-serif text-2xl leading-tight">The geometry of passage</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Death rites are the clearest case of a rite as a diagram enacted through time, and
              their order is not arbitrary — each stage prepares a different relation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2">
              {["Separation", "Cleansing", "Lamentation", "Naming", "Procession", "Disposal",
                "Remembrance", "Reintegration", "Closure"].map((t, i) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="border border-border px-2.5 py-1.5 text-[13px] text-muted-foreground">{t}</span>
                  {i < 8 && <ArrowMark className="text-sm text-gold" />}
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The body is separated from ordinary circulation. The deceased is recognised as no
              longer holding the same office. Grief is given sound, gesture, place and witnesses.
              Responsibilities are redistributed, the community acknowledges that its structure has
              changed, and the participants return to ordinary life without pretending ordinary life
              is unchanged. Funerary rite is therefore{" "}
              <span className="text-bone/90">consecration and deconsecration at once</span> — it
              consecrates the significance of the life while releasing the bodily and social
              relations that cannot continue.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Tradition preserves these rites because grief itself disrupts the capacity to invent an
              adequate sequence. At the moment when people do not know what to do, inherited form
              carries them. And such a tradition can still become mechanical or oppressive — if it
              suppresses grief, dictates certainty about the afterlife, or puts institutional
              conformity above the actual needs of mourners.
            </p>
          </div>

          {/* ---- the order of response ---- */}
          <div className="mt-24 border-t border-border pt-16">
            <h3 className="font-serif text-2xl leading-tight">Right relation to suffering</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Right Relation does not command acceptance. Its first obligation is usually to reduce
              preventable harm. Where suffering is caused by injury, address the injury; by abuse,
              establish safety and boundary; by injustice, seek correction; by illness, pursue care;
              and where it arises from grief, permit grief rather than treating it as pathology or
              spiritual failure. Only once the reality of the suffering has been respected do
              questions of transformation and meaning belong.
            </p>
            <div className="mt-12 mx-auto max-w-2xl space-y-3">
              {[["Protection", "before interpretation."],
                ["Truth", "before transcendence."],
                ["Grief", "before reconstruction."],
                ["Integration", "before claims of transformation."]].map(([a, b]) => (
                <p key={a} className="font-serif text-2xl leading-relaxed text-bone/90">
                  <span className="text-gold">{a}</span> {b}
                </p>
              ))}
            </div>
            <p className="mt-12 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Some suffering must be endured because it cannot yet be removed. Some must be resisted.
              Some must be mourned. Some can eventually be transformed. The wisdom is in telling them
              apart.
            </p>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <div className="mx-auto max-w-3xl space-y-3">
              {[["Life", "is the temporary achievement of relation."],
                ["Suffering", "is what becomes possible wherever relation can be injured."],
                ["Death", "is the dissolution of a living unity."],
                ["Grief", "is the transformation of the bond that remains."],
                ["Right Relation", "is the art of responding without denial, exploitation, or false consolation."]].map(([a, b]) => (
                <p key={a} className="font-serif text-lg leading-relaxed text-bone/90">
                  <span className="text-gold">{a}</span> {b}
                </p>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
              A metaphysics worthy of life must not only explain radiance, ascent, power and fulfilled
              actualisation.
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-2xl leading-relaxed text-bone/90">
              It must make room for interruption, vulnerability, unfinishedness and loss —{" "}
              <span className="italic text-gold">
                without declaring them unreal, and without pretending they are always secretly good.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="atmosphere" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-560} />
        <div className="pointer-events-none absolute inset-x-0 top-0 isolate h-[min(78vh,44rem)]">
          <Backdrop src="/bg/turf-roofed-colonnade-at-dusk.webp" opacity={0.26} position="center 45%" fill />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            <Seal k="morphaither" size={22} className="shrink-0 text-gold/70" decorative />
            § XLI · Morphaithēr
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The middle condition between pure possibility and{" "}
            <span className="italic text-gold">completed form</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              The dynamic and retentive field of mediation in which forces acquire direction, tattvic
              qualities combine, patterns gain recurrence, and forms become possible through the
              participation of bodies, places, symbols and time.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            § V introduced it as the living formative atmosphere. What it prevents is a jump: without
            it the architecture would pass straight from invisible force to visible form, with
            nothing to describe the interval in which forces meet resistance, combine with qualities,
            acquire direction, accumulate memory, and become more likely to produce one form rather
            than another.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-bone/60">
            The word joins <span className="italic">morphē</span>, form, to{" "}
            <span className="italic">aithēr</span>, the subtle or luminous medium — form-bearing
            aether, the aether in its capacity to carry formation. It is a modern technical coinage
            built from Greek roots, not an attested ancient term, and § XXVIII&rsquo;s status question
            applies to it accordingly.
          </p>

          <div className="mt-24">
            <MorphaithericField />
          </div>

          <div className="mt-20 max-w-3xl border-t border-border pt-8">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              <span lang="el" className="scr-greek">Σφραγίς</span> · The seal
            </p>
            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <Seal k="morphaither" size={104} className="shrink-0 text-gold/70" title="Morphaithēr — the Morphic Loom" />
              <div className="min-w-0">
                <p className="font-serif text-xl italic text-gold">The Morphic Loom</p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Its distributed bands are the universal form-bearing field rather than a single
                  object. The repeating chambers signify latent forms held within forms, while the
                  open outer points show that Morphaithēr extends beyond any individual organism or
                  boundary.
                </p>
                <p className="mt-4 text-base leading-relaxed text-bone/85">
                  The empty central chamber is not a seed. It is a field-crossing from which
                  localised Morphaithēric Seeds can condense.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-3xl border-t border-border pt-8">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              <span lang="el" className="scr-greek">Σφραγίς</span> · The Morphaithēric Seed
            </p>
            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <Seal k="seed" size={120} className="shrink-0 text-gold/70" title="The Morphaithēric Seed — the seal of the localised centre" />
              <div className="min-w-0">
                <p className="font-serif text-xl italic text-gold">The Seal of the Morphaithēric Seed</p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Universal formative possibility becoming concentrated into one particular morphal
                  identity. Morphaithēr is the distributed field; the Seed is a localised centre
                  formed within that field.
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-7">
              {[
                ["Morphocrypt", "the central point",
                 "The compressed principle of identity: what allows a form to remain recognisably itself through growth, repair, material replacement and changing conditions. It is not a miniature organism or a rigid blueprint. It is a concentrated grammar of permissible becoming."],
                ["Cryptodynamis", "the spiral",
                 "Its latent capacity to unfold, translating one central pattern across increasing scales: cellular arrangement, tissue, organ, body, posture, behaviour. Because it can be followed both outward and inward it is also feedback — manifestation unfolds from the Seed, while embodied experience can return toward it and leave morphal inheritance, or an Aitheric Scar."],
                ["The morphal horizon", "the two great curves",
                 "They define the range within which variation can occur without the form losing its underlying identity. This is why the seal encloses without being rigid: a Seed guides development without mechanically predetermining every detail."],
                ["Anodos", "the opening above",
                 "The Seed remains connected to Morphaithēr — individualised, never wholly severed from the greater form-bearing field. The twin upward points express reception, replenishment, and the movement back toward formative causation."],
                ["Kathodos", "the lower point",
                 "It concentrates the pattern into a direction of embodiment, where Warmth awakens it, Light differentiates it, Tone organises it, and Life integrates it."],
                ["What stays unexpressed", "the black spaces",
                 "Every Seed holds more potential variation than any single incarnation can realise. The visible form is one actualisation within a larger morphal range."],
              ].map(([term, place, d]) => (
                <div key={term} className="grid gap-1.5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
                  <div>
                    <p className="font-serif text-base italic text-gold">{term}</p>
                    <p className="mt-0.5 font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{place}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                The three inks
              </p>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {([
                  ["morphaither", "Pale opaline lavender", "universal Morphaithēr"],
                  ["seed", "Bright violet", "the localised Morphaithēric Seed"],
                  ["life", "Viridian emerald", "the Life Ether that animates and maintains the pattern"],
                ] as const).map(([k, name, gloss]) => (
                  <div key={k} className="flex items-start gap-3.5">
                    <Seal k={k} size={34} className="shrink-0" tinted decorative />
                    <div className="min-w-0">
                      <p className="font-serif text-base italic text-bone/90">{name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{gloss}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-10 font-serif text-lg leading-relaxed text-bone/90">
              Field condenses <span className="italic text-gold">→</span> identity centres{" "}
              <span className="italic text-gold">→</span> pattern unfolds{" "}
              <span className="italic text-gold">→</span> form descends{" "}
              <span className="italic text-gold">→</span> Life Ether enacts and renews it.
            </p>
          </div>

          <div className="mt-20 border-t border-border pt-8">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              <span lang="el" className="scr-greek">Σφραγίς</span> · The Aitheric Confluence
            </p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-12">
              <div>
                <Seal k="confluence" size="100%" className="mx-auto block w-full max-w-[260px]" tinted
                      title="The Aitheric Confluence — Morphaithēr, a Seed, and the four ethers in right relation" />
                <p className="mt-4 text-center font-serif text-lg italic text-gold">
                  The Aitheric Confluence
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-base leading-relaxed text-muted-foreground">
                  Not a fifth ether, and not a further substance. It is the coordinated condition
                  produced when Morphaithēr, a particular Morphaithēric Seed and the four ethers enter
                  right relation — so the seal is a diagram of manifestation: the universal field
                  surrounds the process, the individualised pattern holds its centre, and the etheric
                  powers mediate between them.
                </p>
                <div className="mt-6 space-y-1.5 font-serif text-lg leading-relaxed text-bone/90">
                  <p>Morphaithēr provides <span className="italic text-gold">possibility</span>.</p>
                  <p>The Seed provides <span className="italic text-gold">identity</span>.</p>
                  <p>The four ethers provide the <span className="italic text-gold">operations of becoming</span>.</p>
                  <p>The Confluence is their <span className="italic text-gold">coordinated activity</span>.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 max-w-3xl space-y-7">
              {([
                ["morphaither", "Morphaithēr", "the pale opaline structure, beyond the ring",
                 "The universal form-bearing field. It stands behind and outside everything else because Morphaithēr exceeds every individual manifestation, and its open extensions say that this field cannot be enclosed within one organism, seal or event."],
                ["warmth", "Warmth Ether", "the two broken crimson rings",
                 "Warmth establishes intensive motion and the first pulse of time. The rings surround the inner operation because every manifestation needs a temporal field within which it can awaken and unfold; their openings, set at different points, keep them from becoming static circles and mark successive moments, rhythmic expansion, birth."],
                ["light", "Light Ether", "the golden ray and its diamond",
                 "It descends as undivided luminous procession, enters the hollow diamond of mediation, and differentiates into two lower rays. The diamond is receptive capacity: light becomes formative only through something able to receive and proportion it. The black division between the lower rays is Necessary Shadow, the distinction through which forms become intelligible."],
                ["tone", "Tone Ether", "the eight blue currents",
                 "They establish an architecture of nodes, intervals, ratios and affinities, and their separateness is essential. Tone does not organise by erasing differences; it places discrete identities into harmonic relationship, so the intervals between the arms mean as much as the arms."],
                ["life", "Life Ether", "the emerald living circuit",
                 "It surrounds the centre because Life gathers the distinctions Light produces and the relations Tone establishes into one functioning organism. Its returning movements are circulation, inner mobility, repair, posture, renewal — green for active vitality, as against violet for morphal memory."],
                ["seed", "The Morphaithēric Seed", "the violet spiral and point",
                 "The point is its Morphocrypt, the particular identity around which manifestation is organised; the spiral is its Cryptodynamis, the power by which one compressed pattern unfolds across scales. The Seed holds the centre because a confluence is always a confluence around some particular formative identity."],
              ] as const).map(([k, term, place, d]) => (
                <div key={term} className="grid gap-2 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
                  <div className="flex items-start gap-3">
                    <Seal k={k} size={22} className="mt-0.5 shrink-0" tinted decorative />
                    <div className="min-w-0">
                      <p className="font-serif text-base italic text-gold">{term}</p>
                      <p className="mt-0.5 font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{place}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
              <div className="grid gap-2 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
                <div>
                  <p className="font-serif text-base italic text-gold">The black spaces</p>
                  <p className="mt-0.5 font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    the necessary intervals
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  They let the powers cooperate without collapsing into one another, and are read
                  through the{" "}
                  <Link to="/ecology/sea" className="text-bone/85 underline-offset-4 hover:text-gold hover:underline">
                    Sea Between Causes
                  </Link>
                  : a true confluence is not an indiscriminate fusion. Warmth remains Warmth, Light
                  remains Light, Tone remains Tone, Life remains Life. Their effectiveness depends on
                  differentiated cooperation.
                </p>
              </div>
            </div>

            <div className="mt-12 max-w-3xl border-t border-border pt-8">
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                The movement the seal encodes
              </p>
              <div className="mt-5 space-y-1.5 font-serif text-lg leading-relaxed text-bone/90">
                <p>Morphaithēr holds the possible form.</p>
                <p>The Seed concentrates a particular form.</p>
                <p>Warmth <span className="italic text-gold">awakens</span> it.</p>
                <p>Light <span className="italic text-gold">differentiates</span> it.</p>
                <p>Tone <span className="italic text-gold">organises</span> it.</p>
                <p>Life <span className="italic text-gold">integrates and renews</span> it.</p>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                The sequence is logical rather than merely chronological. In an actual living
                formation all these powers operate recursively and feed back into one another, so the
                Confluence is not only the moment of birth: it is the continuing hidden architecture
                by which a being remains coherently itself through change.
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              A configuration, not a substance
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              At any place and time the field holds a particular mixture of tattvic qualities,
              existing currents and tensions, residues of previous events, degrees of receptivity and
              resistance, living participants, temporal conditions produced by bodily, seasonal,
              lunar, planetary and ritual tides, and stable patterns already recruiting force into
              themselves. Morphaithēr names that total formative condition.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A room immediately after a severe argument holds the same furniture, walls and
              temperature as before. What has changed is the bodies, expectations, memories,
              postures, attention and relationships within it.{" "}
              <span className="text-bone/90">
                This does not require the ordinary psychological and material causes to be denied.
              </span>{" "}
              It describes their combined formative atmosphere.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Which is why this is a structured field of affordances rather than a blueprint or an
              empty container. Some formations are supported, some resisted, some amplified, some
              made unstable. &ldquo;Field before form&rdquo; therefore needs no warehouse of perfect
              templates: patterns may descend from higher logoi, emerge through immanent feedback,
              inherit previous structures, or arise from several causes at once. Morphaithēr is the
              arena where those influences meet.
            </p>
          </div>

          <div className="relative isolate mt-24">
            <Backdrop src="/bg/hot-spring-terraces-at-lake-edge.webp" opacity={0.24} position="center 45%" />
            <div className="max-w-3xl">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                How form emerges, and returns
              </p>
              <p className="mt-8 font-label text-xs leading-loose tracking-[0.1em] text-gold">
                FIELD → BIAS → VECTOR → RESONANCE → RECURRENCE → THRESHOLD → FORM
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                A force arises within a field already conditioned by previous forms. Tattvic biases
                give it qualitative tendencies. Correspondences provide routes of resonance. Vessels
                introduce resistance and limitation. Repetition deepens some pathways while others
                dissipate. Feedback returns the result of activity into the conditions that produced
                it. At sufficient coherence the pattern crosses a threshold and stabilises.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                But the sequence does not end there. The completed form alters the field that produced
                it — creating new boundaries, redirecting currents, consuming resources, generating
                memory, changing what can form next.
              </p>
              <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
                Morphaithēr gives birth to form, and form returns as a new condition within Morphaithēr.
                This is the mechanism through which the world inherits itself.
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The psychic flywheel
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Attention does not create reality from nothing, but it selects, nourishes and
              strengthens particular relations. A fear complex becomes a vortex because it does not
              merely react to danger — it increasingly organises perception so that ambiguous
              conditions are read as confirming danger.
            </p>
            <div className="mt-8 space-y-px">
              {[
                ["Attention", "selects the pattern"],
                ["Desire or fear", "supplies force"],
                ["Repetition", "produces circulation"],
                ["Circulation", "creates formative inertia"],
                ["Formative inertia", "recruits new experience into the pattern"],
              ].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[10rem_1fr] items-baseline gap-4 border-b border-border py-3">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Which is why transformation requires more than thinking differently once. The
              circulation must be interrupted, redirected, and stabilised around another centre.
            </p>
          </div>

          <div className="relative isolate mt-24">
            <Backdrop src="/bg/night-terrace-above-cloud-sea.webp" opacity={0.4} position="center 65%" />
            <div className="max-w-3xl">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Tradition as long-duration Morphaithēr
              </p>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                A living tradition transmits not only information but a field of recognition. Its
                texts, rites, gestures, stories, offices, architecture, prohibitions and exemplars
                repeatedly regenerate a particular formative atmosphere. New participants do not enter
                a neutral archive — they enter a field already shaped by previous acts of
                participation, and initiation recalibrates the entrant so the inherited atmosphere can
                be perceived and carried.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                A dead tradition preserves symbols without reliably regenerating the field that made
                them meaningful. A parasitic tradition still generates a powerful field, but that field
                primarily consumes its participants to perpetuate itself. Which gives § XXXIII&rsquo;s
                distinction a collective test:
              </p>
              <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
                A living tradition uses inherited form to generate capacity. A parasitic tradition uses
                living capacity to preserve inherited form.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-bone/60">
                The same persistence explains both sacred continuity and the telestic inertia of § XXVII.
                A reservoir can survive its original purpose: a rite may go on feeding an accumulated
                current long after it has lost contact with its declared object.
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              A question the ladder leaves open
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Symbolon, synthema, diagram, ritual, living vessel and tradition are all mediating
              forms — modes of access. Morphaithēr is categorically different: it is the ambient
              condition in which those mediations operate. It can remain one of § XXVI&rsquo;s seven
              rungs if that ladder is read symbolically, as seven dimensions of mediation. In a
              strict taxonomy it may be better drawn as the atmosphere surrounding the ladder rather
              than a rung standing beside the others.
            </p>
            <div className="mt-8 space-y-2 border-l-2 border-bone/25 pl-6 font-serif text-lg leading-relaxed text-bone/75">
              <p>The symbols identify the current.</p>
              <p>The diagram maps it.</p>
              <p>Ritual enters it.</p>
              <p>The living vessel carries it.</p>
              <p>Tradition transmits it.</p>
              <p className="text-gold">Morphaithēr surrounds and penetrates the entire passage.</p>
            </div>
          </div>

          <div className="relative isolate mt-24">
            <Backdrop src="/bg/basalt-cavern-cut-by-light-shafts.webp" opacity={0.32} position="center 50%" />
            <div className="max-w-3xl">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Necessary safeguards
              </p>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                For this to remain rigorous it cannot become the explanation for everything. A concept
                that explains every possible outcome ultimately explains nothing.
              </p>
              <ol className="mt-8 space-y-4">
                {[
                  "Identify the level being discussed: material, biological, psychic, collective, ritual or metaphysical.",
                  "Preserve ordinary causal explanations rather than replacing them.",
                  "Distinguish observable effects from symbolic interpretations.",
                  "State whether current, reservoir or imprint is being used literally or analogically.",
                  "Require repeated patterns before attributing a condition to a hidden formative field.",
                  "Allow the model to be corrected when it fails to predict or clarify anything.",
                ].map((r, i) => (
                  <li key={r} className="grid grid-cols-[2rem_1fr] gap-4">
                    <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-base leading-relaxed text-muted-foreground">{r}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-10 font-serif text-xl leading-relaxed text-bone/85">
                It should name the organisation of relations — not serve as a vague invisible substance
                inserted wherever knowledge is incomplete.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-bone/60">
                The same restraint applies where it touches suffering. Morphaithēr can describe the
                total formative condition surrounding an injury, an illness, an abuse or an injustice.
                It does not make suffering secretly necessary, and it must never become a way to blame
                the sufferer or to substitute an invisible cause for a visible one.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <div className="mx-auto mt-12 max-w-3xl space-y-3 text-center font-serif text-lg italic leading-relaxed text-bone/80">
            <p>Akasha is the openness in which relation becomes possible.</p>
            <p>The Fourfold Veil provides the strata of mediation.</p>
            <p>The Tattvas bias the qualities formation may assume.</p>
            <p>Force introduces direction and capacity.</p>
            <p>Pattern organises recurrence.</p>
            <p className="text-gold">Morphaithēr is the living condition produced by all of these.</p>
            <p>Form is Morphaithēr temporarily stabilised within a vessel.</p>
            <p>Memory is the alteration returned to the field when that form acts, changes, or dies.</p>
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            Neither pure spirit nor material substance, but{" "}
            <span className="italic text-gold">the living middle</span> — through which possibility
            acquires tendency, tendency becomes recurrence, recurrence gains embodiment, and every
            embodied thing leaves the world differently conditioned for what comes next.
          </p>
        
          {/* the hidden layer this section opens onto */}
          <div className="relative mt-16 border-t border-gold/30 pt-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">A hidden layer</p>
            <Link to="/ecology" className="group mt-4 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-2xl leading-tight text-bone transition-colors group-hover:text-gold">
                This section opens onto the Hidden Ecology of Formation
              </span>
              <CrossMark className="text-gold/70" />
            </Link>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Morphaithēr as the condition a whole ecology runs in: fed by the Sap of Heaven, distributed by Etheric Hydrology, taking vessels and exhausting them, inheriting their architecture and retaining their consequence — drawn as a spiral rather than a ring.
            </p>
          </div>
        </div>
      </section>

      <section id="chon" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-575} />
        <div className="pointer-events-none absolute inset-x-0 top-0 isolate h-[min(78vh,44rem)]">
          <Backdrop src="/bg/sapling-growing-from-fallen-log.webp" opacity={0.36} position="center 55%" fill />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XLII · CHON
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The material alphabet through which formative force{" "}
            <span className="italic text-gold">writes biological form</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              CHON marks the point where prima materia becomes protoplasm — where matter becomes
              sufficiently articulated to serve as a living vessel rather than an inert structure.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Carbon, hydrogen, oxygen and nitrogen: the four elements constituting most of the mass of
            living organisms. They occupy the threshold between available matter and the living
            vessel — and they matter to this architecture for a reason that has nothing to do with
            chemistry.
          </p>
          <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
            They prevent the metaphysics from floating above embodiment. If formative forces are
            real, their efficacy must eventually become visible as bonding, concentration,
            metabolism, differentiation, repair, growth and behaviour. This is one of the principal
            places where invisible order becomes{" "}
            <span className="italic text-gold">materially accountable</span>.
          </p>

          <div className="mt-24">
            <Chon />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Not a material duplicate of the Veil
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The four ethers describe modes of formative activity. CHON describes principal material
              participants in organic embodiment. The relation between them is transductive, and it
              is emphatically not one ether to one element —{" "}
              <span className="text-bone/90">every ether works through the whole complex.</span>
            </p>
            <div className="mt-8 space-y-px">
              {[
                ["Warmth", "awakens potency", "energy availability, metabolic initiation"],
                ["Light", "differentiates and reveals", "spatial organisation, gradients, orientation"],
                ["Tone", "orders relations", "molecular sequence, proportion, coordination"],
                ["Life", "integrates and renews", "metabolism, repair, growth, reproduction"],
                ["CHON", "receives embodiment", "organic molecules, cells, tissues, bodies"],
              ].map(([n, f, m], i) => (
                <div key={n} className={`grid grid-cols-[6rem_1fr] items-baseline gap-4 border-b border-border py-3 sm:grid-cols-[6rem_11rem_1fr] ${i === 4 ? "border-t border-t-gold/30 pt-4" : ""}`}>
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{n}</span>
                  <span className="font-serif text-sm italic text-bone/75">{f}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{m}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Warmth awakens the chemical field; Light differentiates its spatial possibilities; Tone
              orders its combinations; Life integrates those combinations into a self-maintaining
              being.
            </p>
            <p className="mt-8 font-label text-xs leading-loose tracking-[0.08em] text-gold-dim">
              FORCE → FOURFOLD VEIL → TATTVIC QUALIFICATION → ELEMENTAL CONDITIONS → CHON
              ORGANISATION → LIVING VESSEL
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Substance and the field of its renewal
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A cell contains no single molecule that could be called the whole organism. Its
              molecules are constantly exchanged, broken down and rebuilt, and yet the organism keeps
              a recognisable identity through that change. Morphaithēr does not replace chemistry or
              suspend physical law — it names the organised formative context in which chemical
              events participate, and asks why countless possible interactions become coordinated
              into the sustained identity of one particular being.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              CHON is the substance being renewed. Morphaithēr is the field of coordinated renewal.
            </p>
          </div>

          <div className="relative isolate mt-24">
            <Backdrop src="/bg/lit-oak-rooted-over-rift.webp" opacity={0.26} position="center 40%" />
            <div className="max-w-3xl">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                What death does not take
              </p>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                While life persists, CHON is held within an organised circulation: molecules
                incorporated, transformed, expelled and replaced while the organism maintains its
                pattern. Death annihilates none of it. It ends the organism&rsquo;s power to hold these
                elements within a unified, self-renewing operation. The living synthesis gives way to
                decomposition, redistribution and entrance into other cycles — material continuity
                remaining while organismic unity dissolves, which is precisely the first kind of
                persistence § XL distinguishes from the rest.
              </p>
              <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
                Life is not the possession of CHON. Life is the sustained power to organise, exchange
                and renew it according to an immanent pattern.
              </p>
            </div>
          </div>

          <div className="relative isolate mt-24">
            <Backdrop src="/bg/kiln-vault-with-glowing-mouth.webp" opacity={0.38} position="center 45%" />
            <div className="max-w-3xl">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                The lowest biological octave
              </p>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Lowest not because it is unimportant, but because it is the point of greatest
                condensation. Here pattern must become molecule, relation must become bond, rhythm must
                become metabolism, memory must become reproducible structure, and force must become the
                activity of an actual body.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <div className="mx-auto mt-12 max-w-2xl space-y-3 text-center font-serif text-xl italic leading-relaxed text-bone/85">
            <p>Warmth awakens.</p>
            <p>Light differentiates.</p>
            <p>Tone orders.</p>
            <p>Life integrates.</p>
            <p>Morphaithēr coordinates.</p>
            <p className="text-gold">CHON embodies.</p>
          </div>
        </div>
      </section>

      <section id="transduction" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-590} />
        <div className="pointer-events-none absolute inset-x-0 top-0 isolate h-[min(78vh,44rem)]">
          <Backdrop src="/bg/four-veils-of-light-in-rock-cleft.webp" opacity={0.24} position="center 42%" fill />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XLIII · The Fourfold Veil
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            What the passage costs, and how it{" "}
            <span className="italic text-gold">corrects itself</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              The nested interface through which pattern is quickened, articulated, ordered and
              integrated — and through which embodied events return as sensation, memory and
              formative consequence.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            § IV sets out the four at length, each with its measure and the interval that carries it
            into the next. What follows is not a second enumeration but the theory of transduction
            itself: why the same field that permits embodiment also guarantees that no embodiment is
            complete.
          </p>

          <div className="relative isolate mt-20">
            <Backdrop src="/bg/meltwater-vent-in-blue-ice-cave.webp" opacity={0.14} position="center 45%" />
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Why it is called a veil
            </p>
            <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  A veil does more than conceal. It also makes contact possible. Direct sunlight can
                  be too intense to look upon; passed through cloud, water, glass or fabric, its
                  presence becomes perceptible in a moderated form. A higher pattern likewise cannot
                  enter dense embodiment without accepting successive limitations.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Each membrane performs three acts. It receives something from the condition above
                  it. It translates that influence into terms available below. And through the act of
                  translation it loses part of the original.
                </p>
                <p className="mt-6 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
                  The Veil makes manifestation possible by preventing manifestation from being
                  complete.
                </p>
              </div>
              <div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Which makes this the home of the Transductive Loss named in § XVII. Every passage
                  gains concreteness while sacrificing range: a latent pattern becomes an activated
                  current, then an articulated one, then an ordered relation, then a self-renewing
                  body — and at each membrane some possibilities are selected and the rest excluded.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  A form is not defective merely because it is partial.{" "}
                  <span className="text-bone/90">Limitation is the price of actuality.</span>{" "}
                  Distortion begins only where the loss grows severe enough to replace the original
                  telos.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-bone/60">
                  The fourfold division of the etheric region is inherited, and two lineages
                  transmit it differently. The architecture operates with Warmth, Light, Tone and
                  Life. The Rosicrucian formulation associated with Max Heindel names Chemical,
                  Life, Light and Reflecting instead — agreeing at the middle, differing at both
                  ends. Its Reflecting Ether, which carries image and memory, corresponds here not
                  to a membrane of the Veil but to the near surface of the Crypt of § XI: the Crypt
                  retains consequence, and that surface is where retained consequence becomes
                  imaginally accessible.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <FourfoldVeil />
          </div>

          <div className="relative isolate mt-24">
            <Backdrop src="/bg/overgrown-cistern-tower-interior.webp" opacity={0.3} position="center 35%" />
            <div className="max-w-3xl">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                How an error becomes an institution
              </p>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Because each membrane hands its work to the next, a small error near the top acquires a
                body on the way down. This is the mechanism, and it is worth stating plainly enough to
                be recognised in the wild.
              </p>
              <div className="mt-8 space-y-px">
                {[
                  ["A pattern is quickened before it has been rightly understood", "Warmth"],
                  ["Articulation exaggerates one feature and leaves the rest unlit", "Light"],
                  ["The exaggeration is bound into the ordering, and now belongs", "Tone"],
                  ["Living reproduction transmits the whole arrangement, distortion included", "Life"],
                  ["Material institutions fix it, and tradition passes on the structure as though it were the pattern", "Beyond the Veil"],
                ].map(([step, layer]) => (
                  <div key={step} className="grid grid-cols-[1fr_7rem] items-baseline gap-4 border-b border-border py-3">
                    <span className="text-sm leading-relaxed text-muted-foreground">{step}</span>
                    <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold-dim">{layer}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-serif text-xl leading-relaxed text-bone/85">
                This is how a subtle interpretive error can become an institution centuries later.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                But the movement runs the other way too. Material failure exposes a weakness in a
                living process; the organism adapts; new perception revises what is understood; and the
                correction is what gets transmitted.{" "}
                <span className="text-bone/90">The Veil carries both degradation and learning</span> —
                which is the whole reason § IV insists it is a circuit and not a descent.
              </p>
            </div>
          </div>

          <div className="mt-24">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Which direction repair takes
            </p>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div className="border-l-2 border-gold/40 pl-6">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">Downward</p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Begin with meaning, image or intention, and work to embody a corrected pattern.
                </p>
              </div>
              <div className="border-l-2 border-bone/30 pl-6">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-bone/80">Upward</p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Begin with sleep, nourishment, safety, environment, movement or bodily regulation,
                  and let improved conditions change sensation and thought.
                </p>
              </div>
            </div>
            <p className="mx-auto mt-10 max-w-3xl font-serif text-xl leading-relaxed text-bone/85">
              Neither direction is universally superior. Sometimes the pattern must change before the
              body can follow. Sometimes the body must become safe before the pattern can change.
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              What does not work is reaching only one membrane. A new belief that never alters
              attention, bodily regulation, action or environment stays a belief. Behaviour imposed
              without altered meaning stays mechanical. Metamorphosis holds only when the revised
              relation can pass through the whole Veil and become self-sustaining — and none of this
              is a substitute for medical or psychological care.
            </p>
          </div>

          <div className="relative isolate mt-24">
            <Backdrop src="/bg/keystone-set-in-lit-stone-vault.webp" opacity={0.32} position="center 50%" />
            <div className="max-w-3xl">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Three levels, distinguished
              </p>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                The four ethers and the five tattvas must not be mapped one to one. They answer
                different questions: the ethers describe where mediation is occurring, the tattvas how
                that mediation is qualitatively configured. Tone may commonly emphasise Prithivi and
                Apas, and still require Vayu for exchange and Tejas for transformation. None is composed
                of a single tattva.
              </p>
              <div className="mt-8 space-y-px">
                {[
                  ["The Fourfold Veil", "the structure of etheric mediation", "anatomy"],
                  ["The Tattvas", "the qualitative biases configuring each membrane", "qualities"],
                  ["Morphaithēr", "the changing atmosphere produced by their interaction", "weather"],
                ].map(([n, f, tag]) => (
                  <div key={n} className="grid grid-cols-[9rem_1fr_5rem] items-baseline gap-4 border-b border-border py-4">
                    <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{n}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{f}</span>
                    <span className="font-serif text-sm italic text-bone/60">{tag}</span>
                  </div>
                ))}
              </div>
              <p className="mt-10 text-base leading-relaxed text-muted-foreground">
                This also settles where Root Ether belongs. It is not a fifth specialised membrane
                standing beside the other four — an addition invented to force agreement with a
                fivefold tattvic scheme. It is the undifferentiated capacity of etheric mediation,
                prior to specialisation, and the Veil is what that capacity becomes when it
                differentiates.
              </p>
              <p className="mt-6 font-label text-xs leading-loose tracking-[0.1em] text-gold-dim">
                AKASHA → ROOT ETHER → WARMTH → LIGHT → TONE → LIFE → CHON
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/60">
                The five tattvas qualify every level. They do not require five corresponding ethers.
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Necessary safeguards
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              This is an esoteric and metaphysical model, not an established structure in physics,
              chemistry, biology or neuroscience. Its usefulness depends entirely on whether it
              clarifies relations without displacing more specific explanations.
            </p>
            <ol className="mt-8 space-y-4">
              {[
                "Tone must not substitute for chemistry or medicine where a material account is available.",
                "Life must not become a vague explanation for every biological process.",
                "Light must not confuse metaphysical illumination with electromagnetic radiation.",
                "Warmth must not make every intensity significant, nor every image or intuition infallible.",
                "An event attributed to a higher membrane should still be examined for psychological, social and material causes.",
                "Correspondences across the four are hypotheses requiring discernment, not automatic proof.",
              ].map((r, i) => (
                <li key={r} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-relaxed text-muted-foreground">{r}</span>
                </li>
              ))}
            </ol>
            <p className="mt-10 font-serif text-xl leading-relaxed text-bone/85">
              The architecture becomes stronger when each ether names a function rather than an
              invisible substance introduced wherever ordinary explanation becomes difficult.
            </p>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <div className="mx-auto mt-12 max-w-3xl space-y-3 text-center font-serif text-xl italic leading-relaxed text-bone/85">
            <p>Warmth holds what may become.</p>
            <p>Light gives it edges.</p>
            <p>Tone binds it to what belongs with it.</p>
            <p>Life teaches it to renew itself.</p>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            Not four increasingly dense substances but a single process seen through four
            indispensable functions — which is why every embodied thing is{" "}
            <span className="italic text-gold">
              at once a revelation of its source and a veil drawn across it
            </span>
            .
          </p>
        </div>
      </section>

      <section id="relation" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-605} />
        <div className="pointer-events-none absolute inset-x-0 top-0 isolate h-[min(78vh,44rem)]">
          <Backdrop src="/bg/sluice-gates-releasing-white-water.webp" opacity={0.26} position="center 50%" fill />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XLIV · The Law of Right Relation
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Not one law among the others, but the one that decides{" "}
            <span className="italic text-gold">what all the rest become</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              No force can be judged solely by its nature. It must also be judged by the relations
              through which it becomes active.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            § XXXIX asks whether the path should be walked, and draws right relation as a ring with
            exits. This is the law underneath that art: nothing manifests by itself, and so nothing
            can be assessed by itself either.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            A flame exists through the relation of fuel, oxygen, heat, pressure and space. A living
            body exists through cells, organs, nourishment, memory, environment and formative
            integration. A symbol becomes operative through image, meaning, attention, tradition and
            participant. Even identity is relational — a being becomes itself through what it
            receives, what it refuses, what it transforms and what it gives.{" "}
            <span className="text-bone/90">
              What looks like an isolated thing is a temporary stabilisation of many relationships.
            </span>
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Which is why a force may be intrinsically valuable and still destructive — introduced at
            the wrong intensity, through the wrong intermediary, into an unprepared vessel, at an
            unsuitable time. Fire warms, illuminates, cooks, purifies and consecrates. Outside right
            proportion it consumes the structure that should have contained it.
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Orthē schesis
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight text-gold">ὀρθὴ σχέσις</p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              More than peaceful coexistence: the dynamic proportion through which distinct beings,
              forces and functions participate in one another without losing their integrity. It does
              not require equality of function. Heart and lungs do not perform identical work, and
              each serves the life of the whole. Teacher and student, source and intermediary, symbol
              and meaning, force and vessel may occupy different positions without one of them being
              inherently oppressive.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The decisive question is whether difference remains ordered toward mutual or greater
              fulfilment.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              Right relation preserves distinction while enabling participation.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Its opposite is not conflict. Conflict can restore a boundary that needed restoring.
              The deeper opposite is <span className="text-bone/90">distortion</span> — a relation in
              which one term consumes, falsifies, imprisons, imitates or displaces another. Which is
              why distortion is so rarely simple falsehood. It is usually{" "}
              <span className="italic text-gold">a partial truth occupying the wrong position</span>.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The five terms
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Every operative relationship holds at least five, and an operation succeeds only while
              they stay properly related to one another.
            </p>
            <div className="mt-8 space-y-px">
              {[
                ["Source", "where the originating impulse or virtue arises", "may be misidentified"],
                ["Force", "the active potency seeking expression", "may be exaggerated"],
                ["Intermediary", "what translates the force between levels", "may alter the message, or claim the authority of what passes through it"],
                ["Vessel", "what receives and embodies the force", "may project its own contents onto the force, or mistake intensity for truth"],
                ["Field", "the surrounding conditions of the operation", "may dissipate it — or reward the distorted expression"],
              ].map(([t, d, f]) => (
                <div key={t} className="grid gap-1 border-b border-border py-4 sm:grid-cols-[7.5rem_1fr]">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{t}</span>
                  <span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{d}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-bone/60">{f}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              And repetition can preserve any of these distortions through formative inertia, which
              is § XLI&rsquo;s mechanism operating on an error rather than on a virtue.
            </p>
          </div>

          <div className="mt-24">
            <RightMeasure />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Where metamorphosis stops short
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Genuine participation changes both terms: the force acquires a concrete expression, the
              vessel acquires new capacities. But that is a sequence, and it can halt at any stage —
              each arrest producing a recognisable and quite different failure.
            </p>
            <div className="mt-8 space-y-px">
              {[
                ["Reception without assimilation", "the force remains foreign"],
                ["Assimilation without differentiation", "the vessel is overwhelmed, or possessed by what it received"],
                ["Differentiation without reorganisation", "knowledge accumulates and nothing is transformed"],
                ["Reorganisation without embodiment", "the change stays imaginary"],
              ].map(([a, b]) => (
                <div key={a} className="grid gap-1 border-b border-border py-3 sm:grid-cols-[19rem_1fr]">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Which is also why metamorphosis is not mere change. It is change governed by a
              recognisable continuity of virtue — caterpillar and butterfly differ radically in form,
              and the transformation still belongs to one developmental pattern.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Four tests, one from each membrane
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The Fourfold Veil of § XLIII gives the law four diagnostic questions, and a relation can
              fail at any of them independently.
            </p>
            <div className="mt-8 space-y-px">
              {[
                ["Warmth", "Is there vitality enough to initiate contact without burning the vessel?"],
                ["Light", "Are the terms clearly differentiated, or have projection and confusion obscured them?"],
                ["Tone", "Are the parts ordered through proportion, sequence, resonance and proper interval?"],
                ["Life", "Does the relation nourish integration, renewal, and the capacity to participate more fully?"],
              ].map(([n, q]) => (
                <div key={n} className="grid gap-1 border-b border-border py-4 sm:grid-cols-[6rem_1fr]">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{n}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{q}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Warmth without Light becomes blind enthusiasm. Light without Warmth becomes sterile
              abstraction. Tone without Life becomes mechanical order. Life without Tone becomes
              uncontrolled proliferation.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              The tattvas bias the same relation qualitatively, and there too the fault is
              disproportion rather than wrongness: too much Ākāśa gives openness without
              determination, too much Vāyu instability, too much Tejas conflict or exhaustion, too
              much Apas enmeshment, too much Pṛthivī rigidity. It is rarely that a quality is
              absolutely wrong. It has become disproportionate to the whole.
            </p>
          </div>

          <div className="relative isolate mt-24">
            <Backdrop src="/bg/terraced-reservoirs-fed-by-waterfall.webp" opacity={0.28} position="center 45%" />
            <div className="max-w-3xl">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                The relational flywheel
              </p>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Morphaithēr is not a neutral atmosphere. It is shaped continually by the history of
                relations occurring within it — repeated cooperation makes certain forms easier to
                generate, repeated fear builds anticipatory structures, repeated ritual thickens
                symbolic association, and repeated exploitation can make a parasitic arrangement look
                like the normal state of things.
              </p>
              <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
                Right relation generates a field that favours further right relation. Distortion
                generates a field that reproduces distortion.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                So each healthy act contributes not only an immediate outcome but a field in which
                similar acts become more possible — and transformation has to address atmosphere as
                well as behaviour. Changing an isolated action may not hold if the surrounding
                Morphaithēr keeps pulling its participants back into the old configuration.
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Right relation is not passivity
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              It does not mean being agreeable, avoiding conflict, or maintaining every bond.
              Severance can restore right relation when a connection has become predatory or false.
              Anger can defend a violated boundary. Destruction can clear a structure that prevents
              renewal. Death itself returns material elements to wider cycles.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The question is never whether an action looks gentle. It is whether it restores measure,
              boundary, reciprocity, truth, and orientation toward the whole.
            </p>
            <div className="mt-8 space-y-2 border-l-2 border-bone/25 pl-6 font-serif text-lg leading-relaxed text-bone/75">
              <p>Sometimes harmony is right relation.</p>
              <p>Sometimes resistance is right relation.</p>
              <p>Sometimes departure is right relation.</p>
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              This is also what makes the parasitic case diagnosable. Discomfort is not the sign —
              growth is frequently uncomfortable.{" "}
              <span className="text-bone/90">
                The sign is that the relation progressively destroys the participant&rsquo;s capacity
                for free, truthful, life-giving participation.
              </span>
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              An ethics of participation
            </p>
            <p className="mt-8 font-serif text-2xl leading-relaxed text-bone/90">
              Does this relationship increase or diminish the capacity of its participants to embody
              their proper virtues while contributing to the life of the greater whole?
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              This does not make morality relative. Domination, deception, exploitation and coercive
              depletion are condemned precisely because they deform the conditions of genuine
              participation — converting persons into instruments, obscuring sources, violating
              boundaries, and preventing fulfilled actualisation.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              And the ethical person, on this account, is not principally someone who obeys rules. It
              is someone capable of perceiving relations accurately, entering them responsibly,
              correcting distortions, and withdrawing when participation would serve corruption.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The diagnostic
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Fourteen questions that work at every scale — within the psyche, between individuals,
              inside families, across traditions and institutions, between humanity and nature, and
              between visible and invisible orders.
            </p>
            <ol className="mt-8 space-y-3">
              {[
                "What force is moving through this relation?",
                "What virtue does it claim to serve?",
                "What source actually authorises it?",
                "Who or what acts as intermediary?",
                "Is the vessel capable of assimilating the force?",
                "Is the intensity proportionate?",
                "Are the boundaries clear and permeable?",
                "Is participation voluntary and informed?",
                "Does energy circulate, or move only toward one centre?",
                "What qualities are being strengthened through repetition?",
                "Does the relation increase discernment and agency?",
                "What does it produce over time?",
                "Can the relation be questioned, modified, or ended?",
                "Does its visible form still carry its originating virtue?",
              ].map((q, i) => (
                <li key={q} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-relaxed text-muted-foreground">{q}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            Fulfilment is neither absolute independence nor undifferentiated union. Isolation prevents
            participation; fusion destroys distinction. Life unfolds between them — every being
            becoming distinct enough to offer something and open enough to receive something, keeping
            its centre while entering circulation with what exceeds it.
          </p>
          <p className="mx-auto mt-10 max-w-3xl text-center font-serif text-2xl leading-relaxed text-bone/90">
            A being fulfils itself not by existing alone, nor by dissolving into another, but by
            entering those relations through which its deepest virtue can be{" "}
            <span className="italic text-gold">received, transformed, embodied, and returned to the
            whole</span>.
          </p>
        </div>
      </section>

      <section id="matter" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-620} />
        <Backdrop src="/bg/spiral-apothecary-of-lit-vials.webp" opacity={0.42} position="center 45%" scrim={0.22} portrait anchor="left" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XLV · Spiritualising Matter
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Not the escape from matter but its formation into an{" "}
            <span className="italic text-gold">adequate vessel</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Matter is not a cosmic mistake from which spirit must be rescued. It is the deepest
              point at which invisible potency becomes definite, resistant, measurable, and capable
              of producing consequences.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Spirit without embodiment stays unexpressed possibility. Matter without formative
            integration tends toward dispersal and inertia. Manifestation requires their
            participation in one another —{" "}
            <span className="text-bone/90">
              spirit gives matter orientation, and matter gives spirit consequence.
            </span>
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Where the claim is tested
            </p>
            <p className="mt-8 font-label text-xs leading-loose tracking-[0.08em] text-gold-dim">
              SOURCE → SPIRIT → ESSENCE → VIRTUE → FORCE → SEEDFORM → FOURFOLD VEIL → FORM → MATTER
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              At every stage the range of possibilities narrows while actuality increases. A
              universal virtue could take innumerable expressions; a material act selects one and
              makes it consequential. Compassion must eventually become food, protection, medicine,
              patience, shelter. Justice must become a boundary, a decision, a restored relationship,
              a functioning institution. Wisdom must become conduct.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Which is why the descent is not a fall. It is what universality accepts in order to
              become particular — and it is where profession meets cost. It is easy to hold love
              abstractly; it is harder to organise time, resources and relationships around it.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              Matter is where spirit becomes accountable for what it claims to be.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Transparent, not invisible
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Spiritualised matter does not become immaterial. It becomes transparent in the
              philosophical sense: its organisation reveals rather than conceals the virtue operating
              through it. A hand is spiritualised when it heals, creates, protects, or does skilled
              work. Speech, when sound carries truth without unnecessary distortion. A building, when
              its geometry, materials and purpose support the life it was made for.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              And this needs no flawlessness. Every vessel introduces some transductive loss; no
              receiving form reproduces its source completely. A spiritualised vessel is one that
              minimises <span className="italic">unnecessary</span> distortion and carries as much of
              the originating virtue as its nature can bear.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              Not absolute purity. Increasing adequacy between an inner principle and its outward
              expression.
            </p>
          </div>

          <div className="mt-24">
            <FalseSpiritualization />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Sustained participation, not declaration
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Matter is educated by repeated participation in a field. Cells differentiate by
              location and relationship. Bodies change through nourishment, labour, sleep, injury,
              healing. Nervous systems are shaped by repeated experience. Places acquire atmospheres
              from what is done in them; tools come to reflect the habits of those who use them.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              So a consecrated object must go on being treated according to its consecration. A
              disciplined body must go on being nourished. A sacred place must go on hosting
              activities consistent with its purpose. Otherwise the orientation weakens{" "}
              <span className="text-bone/90">while the external appearance remains</span> — which is
              the fifth counterfeit exactly.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              This also releases the work from temples. Craftsmanship gives intelligence durable
              form. Agriculture enters disciplined relation with soil, season and time. Good work
              makes virtue materially legible: patience becomes a finished surface, foresight becomes
              a structure that survives weather, care becomes a repaired object, justice becomes
              honest measurement and work performed according to its promises.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The body, and what this does not mean
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The body is the immediate field in which spiritual claims are tested — § XLV&rsquo;s
              accountability, met one person at a time. A person may
              profess tranquility while sustaining chronic hostility, or speak of transcendence while
              neglecting sleep and basic responsibility, or claim authority while unable to tolerate
              correction.
            </p>
            <p className="mt-6 border-l-2 border-bone/40 pl-5 text-base leading-relaxed text-bone/80">
              This does not make illness, disability or bodily limitation a spiritual failure. Bodies
              are finite, vulnerable, inherited, and shaped by conditions outside anyone&rsquo;s
              control. Spiritualisation is not physical perfection. It is the most truthful and
              responsible relationship possible with the body actually given.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Nor is suffering to be romanticised. Some develops capacity, some communicates injury,
              some arises through exploitation, and some simply diminishes life — and § XLIV&rsquo;s
              law is what tells them apart. Matter is not spiritualised by enduring unlimited harm.
              The most spiritual response to preventable suffering may be to stop the condition
              producing it.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              What spiritualisation asks is narrower and more bearable: that suffering not be left
              entirely mute. It may become knowledge, a firmer boundary, compassion, solidarity, or
              changed action — recognised truthfully, and neither worshipped nor wasted.
            </p>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-12 max-w-3xl text-center font-serif text-2xl leading-relaxed text-bone/90">
            To spiritualise matter is not to make matter cease being material. It is to form matter
            so truthfully that its visible organisation becomes an{" "}
            <span className="italic text-gold">adequate bearer of invisible virtue</span>.
          </p>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            The Great Work is completed neither above the world nor outside it, but wherever the
            invisible becomes responsibly, beautifully, and livingly actual.
          </p>
        </div>
      </section>

      <section id="sophia" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-635} />
        <Backdrop src="/bg/old-growth-forest-in-deep-shade.webp" opacity={0.3} position="center 50%" scrim={0.22} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XLVI · Sophia and the Divine Feminine
          </p>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <h2 className="font-serif text-4xl leading-tight">Σοφία</h2>
            <Term script="hebrew" orig="חָכְמָה" label="ḥokmāh — wisdom" className="text-4xl text-gold" />
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              sophia · <span className="aoh-tr" lang="he-Latn">ḥokmāh</span>
            </p>
          </div>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            The intelligence through which power learns how to serve life
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Knowledge can identify the parts of a system. Sophia understands how those parts must
              be related if the whole is to live.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Knowledge can discover a force. Sophia determines whether it should be invoked, through
            which intermediary it should pass, what vessel can receive it, and what its embodiment
            will produce. She is therefore the wisdom of right relation — and she knows that neither
            power, purity, antiquity, intensity nor celestial origin is sufficient to make an
            operation good.
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Receptivity is not passivity
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The Divine Feminine names the capacities of reception, gestation, mediation,
              formation, nourishment, concealment, revelation, embodiment, relation, regeneration
              and return. None of these is passive. The womb is receptive, and its receptivity is
              intensely active: it selects, nourishes, differentiates, protects, transforms, and
              finally releases.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              What receives determines what the received force can become. She is not empty space
              awaiting command — she is the intelligent depth that transforms what enters her.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Which is why she cannot be confined to one alchemical principle. She is Salt as the
              vessel that holds a transformation, Mercury as translation between worlds, and{" "}
              <span className="text-bone/90">Sulfur as well</span> — the inner flame of sovereignty,
              eros, refusal, and self-directed becoming. An incomplete symbolism calls the masculine
              active and the feminine passive. Every act of formation requires both.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              The tattvas say the same thing: she is spacious as Ākāśa, mobile as Vāyu, fierce as
              Tejas, connective as Apas, enduring as Pṛthivī. She can open, move, sever, unite, and
              establish. Her wisdom is knowing which is needed, and in what proportion.
            </p>
          </div>

          <div className="mt-24">
            <SophianicChalice />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The Veil as gestation
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Read through § XLIII, the Fourfold Veil is a formative womb — and the womb neither
              creates without receiving nor receives without transforming.
            </p>
            <div className="mt-8 space-y-2 border-l-2 border-gold/40 pl-6 font-serif text-xl leading-relaxed text-bone/85">
              <p>Warmth conceives.</p>
              <p>Light differentiates.</p>
              <p>Tone organises.</p>
              <p>Life integrates.</p>
              <p className="text-gold">Matter gives birth.</p>
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The veil both conceals and reveals, and what is gestating must be protected from
              premature exposure.{" "}
              <span className="text-bone/90">
                Concealment is therefore not always ignorance or deception
              </span>{" "}
              — it can be the mercy that lets an unfinished form develop without being overwhelmed.
              Sophia knows when a mystery requires concealment and when concealment has become
              imprisonment; when revelation nourishes and when it arrives before the vessel is ready.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Morphaithēr is her field. The Latin root of <span className="italic">matrix</span> is{" "}
              <span className="italic">mater</span> — and a matrix is not a container but a formative
              environment that gives relationships position, proportion, and developmental
              possibility.
            </p>
          </div>

          <div className="mt-24">
            <SophianicFaces />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Where she is named
            </p>
            <div className="mt-10 flex justify-center">
              <SevenPillars className="w-full max-w-2xl text-gold" height={120} />
            </div>
            <p className="mt-6 text-center font-label text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Wisdom has built her house, she has hewn her seven pillars · Proverbs 9:1
            </p>
            <p className="mt-12 text-base leading-relaxed text-muted-foreground">
              She is not a personification the treatise has invented. In Proverbs she speaks in the
              first person, calls in the street, keeps a house and sets a table; and in the passage
              everything else turns on, she says she was there before the world was made. Two words
              in that passage have been argued over for two thousand years, and both arguments are
              worth knowing before anyone builds on the verse.
            </p>
            <div className="mt-10 space-y-8">
              <div className="border-l-2 border-gold/40 pl-5">
                <p className="flex flex-wrap items-baseline gap-x-4">
                  <Term script="hebrew" orig="קָנָנִי" label="qānānî — he created me, or acquired me" className="text-2xl text-gold" />
                  <span className="font-serif text-base italic text-bone/85">qānānî</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Proverbs 8:22</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;The Lord <span className="italic">qānānî</span> at the beginning of his
                  way.&rdquo; The verb ordinarily means to acquire or possess; in a handful of
                  places it appears to mean to create or beget. The Septuagint chose{" "}
                  <span className="italic">ektisen</span>, created — which is why this verse became
                  the central proof-text of the Arian controversy, with both sides assuming the
                  speaker was the pre-existent Son. English versions still divide, and the Hebrew
                  genuinely allows both.
                </p>
              </div>
              <div className="border-l-2 border-gold/40 pl-5">
                <p className="flex flex-wrap items-baseline gap-x-4">
                  <Term script="hebrew" orig="אָמוֹן" label="ʾāmôn — master worker, or nursling, or confidant" className="text-2xl text-gold" />
                  <span className="font-serif text-base italic text-bone/85">ʾāmôn</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Proverbs 8:30</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;Then I was beside him, <span className="italic">ʾāmôn</span>.&rdquo; A
                  master worker, says one reading, and Wisdom is the artisan of the world. A little
                  child, says another, and she is the one at play beside the maker — the same verse
                  goes on to speak of delight and of playing. A confidant, says a third. The choice
                  changes what kind of figure she is, and no reading has won.
                </p>
              </div>
            </div>
            <p className="mt-10 text-base leading-relaxed text-muted-foreground">
              What the later texts do with her is a sequence, not a single doctrine. Ben Sira has her
              looking for a resting place among the nations and being told to pitch her tent in
              Jacob — and then, in his own voice rather than hers, identifies her with the book of
              the covenant. The Wisdom of Solomon gives her the language this volume keeps returning
              to: a breath of the power of God, a pure emanation of his glory, a spotless mirror of
              his working, an image of his goodness. And 1 Enoch tells it the other way: Wisdom went
              out to dwell among men, found no dwelling place, and returned to her seat among the
              angels.
            </p>
            <div className="mt-10 max-w-3xl">
              <TermRegister terms={SOPHIA_TERMS} />
            </div>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              One thing to notice about the transmission. In Philo, the functions Wisdom holds in the
              Greek Jewish texts begin to pass to the Logos — the same offices, a masculine noun —
              and by the time the prologue of John is written it is the Logos who was in the
              beginning, who was with God, through whom all things were made. Nothing here says that
              was a suppression. But it is the same job description, and the gender of the word doing
              it changed.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The texts people mean by &ldquo;the Gospel of Sophia&rdquo;
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              There is no Gospel of Sophia. The phrase circulates, and it does point at something
              real, but a reader who goes looking for a text with that title will not find one —
              so it is worth saying plainly what the two texts behind the phrase are.
            </p>
            <div className="mt-8 space-y-px">
              {[
                ["The Sophia of Jesus Christ",
                 "Nag Hammadi Codex III,4 and Berlin Codex 8502,3",
                 "A revelation dialogue: the risen Christ appears to the disciples on a mountain in Galilee and answers their questions. It is a Christianised rewriting of a philosophical letter, Eugnostos the Blessed, which survives beside it in the same codex — so the two can be read against each other, which is unusual and useful. Sophia appears in the upper emanations rather than as the cause of a catastrophe; the reproach found in other texts is muted here, though the work still speaks of what she did without her consort."],
                ["Pistis Sophia",
                 "the Askew Codex, in Coptic, probably third century",
                 "A long dialogue in which the risen Christ teaches for years after the resurrection, and Sophia — Faith-Wisdom — repents in thirteen penitences after being deceived and dragged down by a false light. G. R. S. Mead's 1896 translation carried the subtitle A Gnostic Gospel, which is where the phrase most likely comes from; his second edition changed it to A Gnostic Miscellany."],
              ].map(([t, w, d]) => (
                <div key={t} className="border-b border-border py-6">
                  <p className="font-serif text-xl text-bone/90">{t}</p>
                  <p className="mt-1 font-label text-[10px] uppercase tracking-[0.15em] text-gold-dim">{w}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Two others belong beside them. <span className="italic">The Thunder, Perfect Mind</span>{" "}
              is a poem in the first person by a speaker who is both &ldquo;the whore and the holy
              one&rdquo;, &ldquo;the barren one and many are her sons&rdquo; — its editor warns
              against calling it Gnostic at all, and it names no Sophia, but no other ancient text
              holds those opposites in one voice so unflinchingly. And the Valentinian Sophia, the
              one whose fall makes the world, reaches us mostly through{" "}
              <span className="text-bone/90">Irenaeus, who was writing to refute her</span> — the
              lower Sophia, Achamoth, formed from her passion, the material world congealed out of
              her grief and her tears. A summary by a hostile witness is evidence, but of a
              particular kind, and this volume marks it as such.
            </p>
            <div className="mt-10 max-w-3xl">
              <TermRegister terms={GNOSTIC_TERMS} />
            </div>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              And after the ancient texts
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The figure does not stop in late antiquity. Hildegard of Bingen sees Sapientia and
              Caritas as women of overwhelming splendour and writes them into her visions and her
              music, inside the Church rather than against it. Jacob Böhme, a shoemaker in Görlitz,
              makes Sophia the mirror in which the unground beholds itself, and the bride the soul
              must be married to — the most sustained Protestant treatment of her there is. And
              Russian sophiology, from Solovyov&rsquo;s visions to Bulgakov&rsquo;s dogmatics, tried
              to give her a place in Orthodox theology; Bulgakov&rsquo;s teaching was condemned by
              two Russian church jurisdictions in 1935 and defended by his own, and the dispute has
              never been formally settled.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Solovyov&rsquo;s poem about his three visions of her opens by refusing to name her —{" "}
              <span className="italic">eternal friend, I will not name you</span> — which is worth
              keeping in mind against the confidence with which she is named now.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              This volume does not equate these figures. Ḥokmāh in Proverbs, the Sophia of the
              Valentinians, the Shekhinah of the rabbis, Isis under her own name, and Bulgakov&rsquo;s
              divine Wisdom are not one being with five costumes, and saying so would be the
              comparative error § XXV exists to prevent.{" "}
              <span className="text-bone/90">
                What they share is a question: whether the intelligence by which a world is well
                made is itself something, and if so, what its relation is to the one who makes.
              </span>
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The wound
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The Divine Feminine cannot be developed as an abstract cosmic principle while ignoring
              the historical treatment of women, bodies, sexuality, birth, labour, emotion and
              nature. A metaphysics that praises a celestial feminine while devaluing actual women
              would reproduce the very split Sophia is meant to heal.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The wound appears wherever receptivity is mistaken for weakness, care is exploited as
              an unlimited resource, bodies are treated as property, intuition is severed from
              intellect, emotion is dismissed as irrational, and nature is treated as inert matter
              awaiting domination.
            </p>
            <p className="mt-6 border-l-2 border-bone/40 pl-5 text-base leading-relaxed text-bone/80">
              It appears too when women are required to embody gentleness, beauty, fertility or
              nurturance while being denied anger, sovereignty, intellectual authority, erotic
              self-possession, or the right to refuse.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              So a Sophianic architecture protects complexity. She includes care and boundary, union
              and differentiation, mercy and judgement, gestation and severance. And nature — one of
              her primary revelations — is not to be romanticised as uniformly gentle. She is the
              garden and the wilderness, the womb and the tomb, milk and venom. The maternal depth of
              nature does not preserve every individual form forever. It preserves the greater
              circulation of life.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Not against the masculine
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              These are symbolic polarities, not rigid assignments, and every living person expresses
              both. The masculine may symbolise direction, distinction, projection and focused
              transmission; the feminine reception, relation, gestation and integration. Each can
              become distorted, and each requires the other.
            </p>
            <div className="mt-8 space-y-px">
              {[
                ["Direction without receptivity", "becomes imposition"],
                ["Receptivity without direction", "becomes diffusion"],
                ["Articulation without integration", "fragments the whole"],
                ["Integration without differentiation", "dissolves meaningful distinction"],
              ].map(([a, b]) => (
                <div key={a} className="grid gap-1 border-b border-border py-3 sm:grid-cols-[17rem_1fr]">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              She does not abolish polarity. She prevents polarity from becoming domination.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              The same restraint governs correspondence with Shekhinah, Binah, Isis and other
              figures of sacred wisdom. They are related but not identical lenses — indwelling
              presence, formative understanding, magical sovereignty and restoration are not one
              thing under different names. Sophia can be a meeting place without becoming an erasure
              of difference.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The Sophianic test
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Any force, teaching, ritual, institution or system can be put to it. She does not ask
              whether something appears light or dark — she asks what it serves, what it produces,
              and what kind of participation it requires.
            </p>
            <ol className="mt-8 space-y-3">
              {[
                "Does it unite knowledge with responsibility?",
                "Does it honour the vessel rather than merely extracting its energy?",
                "Does it preserve boundaries while allowing meaningful participation?",
                "Does it make matter more capable of carrying virtue?",
                "Does it increase discernment, agency, compassion, and truthful relationship?",
                "Can it adapt its forms without betraying its purpose?",
                "Can it mourn what must die, and release what can no longer live?",
              ].map((q, i) => (
                <li key={q} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-relaxed text-muted-foreground">{q}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A teaching may be metaphysically impressive and fail the test through the relationships
              it produces. A humble practice may pass it because it makes life more coherent,
              truthful, and capable of renewal.{" "}
              <span className="text-bone/90">
                The test is finally whether wisdom has survived embodiment.
              </span>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Her discernment is not suspicion. Suspicion assumes hidden corruption; discernment
              tests relationships. A genuine insight can pass through a distorted messenger, and a
              flawed person can still carry something valuable — while charisma does not prove truth,
              intensity does not prove depth, and suffering does not prove initiation.
            </p>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-12 max-w-3xl text-center font-serif text-2xl leading-relaxed text-bone/90">
            Sophia is the wisdom by which spirit enters matter without despising it, matter receives
            spirit without being destroyed by it, and both are transformed through right relation
            into <span className="italic text-gold">a living expression of the whole</span>.
          </p>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            She is what prevents the architecture from becoming a catalogue of powers without wisdom,
            correspondences without discernment, or ritual technologies without ethical purpose.
          </p>
        </div>
      </section>

      <section id="transformation" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-650} />
        <Backdrop src="/bg/green-regrowth-on-volcanic-headland.webp" opacity={0.3} position="center 50%" scrim={0.22} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XLVII · Transformation
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Μεταμόρφωσις <span className="italic text-gold">·</span> Μεταστοιχείωσις
          </h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            Not that things change, but that the governing pattern is reorganised
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Everything material changes continually. Most change does not penetrate deeply enough
              to alter the governing pattern of a being.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            True transformation occurs when the relation among force, pattern, form and vessel is
            reorganised so profoundly that a new mode of existence becomes possible — not a change in
            appearance or behaviour, but the emergence of a new formative order.
          </p>
          <p className="mt-8 max-w-3xl font-label text-xs leading-loose tracking-[0.08em] text-gold-dim">
            EXISTING FORM → DISSOLUTION OF FIXATION → LIBERATION OF FORCE → RE-PATTERNING → RENEWED
            EMBODIMENT
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Three depths, told apart
            </p>
            <div className="mt-8 space-y-px">
              {[
                ["Change", "alters a condition", "Clothing, temperature, mood, circumstance. Often temporary, reversible, or externally imposed."],
                ["Mutation", "alters a pattern", "A variation that affects future development — genetic, psychic, or cultural. It introduces novelty, and novelty is not fulfilment."],
                ["Transformation", "reorganises the relationship among pattern, force, form and purpose", "It changes not only what a being does but what kinds of action have become possible."],
              ].map(([a, b, c]) => (
                <div key={a} className="grid gap-1 border-b border-border py-4 sm:grid-cols-[8rem_1fr]">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span>
                    <span className="font-serif text-base italic text-bone/80">{b}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{c}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              And it is recognised by persistence across circumstance. If courage appears only while
              a person feels inspired, the transformation is incomplete. When courage becomes
              available under fear, uncertainty, resistance and consequence, it has begun to enter
              the structure of the person.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Which is also how the imitations are caught. A change in language may conceal an
              unchanged motive; an institution may adopt new symbols while keeping the same
              distribution of power. Apparent transformation rearranges the surface —{" "}
              <span className="text-bone/80">the form changes because the underlying force has found
              a new costume.</span>
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The formative thread
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Metamorphosis needs a paradoxical relation between continuity and discontinuity.
              Something must stay continuous enough for the change to belong to one being; something
              must alter deeply enough for a genuinely new mode to emerge. A caterpillar&rsquo;s
              structure is largely dissolved and reorganised, and the butterfly is still not an
              unrelated creature.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              Metamorphosis preserves the virtue while altering the form through which the virtue
              becomes active.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              If nothing continuous remains there has been replacement; if nothing fundamental
              changes there has been modification. What persists is the{" "}
              <span className="text-bone/90">formative thread</span> — the relation among essence,
              virtue and seedform that survives changes in material composition and outward
              organisation. Metamorphosis is that thread withdrawing from one configuration and
              becoming active through another.
            </p>
          </div>

          <div className="mt-24">
            <SolveCoagula />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What receives the liberated force
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Form is condensed relationship — force held within pattern, boundary and proportion.
              Labour has become architecture; repetition has become habit; attention has become
              symbolic density; collective participation has become institution. To release force
              from form is to loosen the relations keeping it in one established manner.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              But liberation is not automatically beneficial. Revolutions often overthrow a visible
              structure while unconsciously preserving its formative logic; a person may abandon one
              dependency and transfer the same need into another relationship. Which makes one
              question decisive.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              What pattern will receive the liberated force? Without an answer, dissolution may
              strengthen the very pattern it intended to overcome.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              So § XLIV governs solve. Not every force should be released indiscriminately — some are
              destructive precisely because a boundary is containing them, and some identities must
              be opened gradually because sudden dissolution would overwhelm the vessel. Defences,
              ritual boundaries and cultural structures are often imperfect and still stabilising.
              § XLVI&rsquo;s wisdom asks not only whether a form has become restrictive, but what it
              is holding, why it arose, and what must be prepared before it is opened.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What &ldquo;higher&rdquo; means here
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Not more prestigious, abstract, disembodied or socially powerful. A form is higher when
              it embodies its governing virtue with greater coherence, inclusiveness, freedom and
              capacity for right relation — holding more complexity without fragmenting, preserving
              distinction without requiring domination.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              Higher form is not distance from matter. It is greater adequacy between matter and
              virtue.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Which is why transformation rarely annihilates the lower force. The attention to
              danger, readiness and protective energy inside fear is not destroyed — it is released
              from compulsive reaction and reorganised into discernment. Aggression may become
              protective strength, desire may become devotion or disciplined aspiration, grief may
              become memory and renewed participation.{" "}
              <span className="text-bone/90">
                Transformation reveals the undeveloped virtue imprisoned within the distorted form.
              </span>
            </p>
            <p className="mt-8 font-label text-xs leading-loose tracking-[0.08em] text-gold-dim">
              NEW POSSIBILITY → SYMBOLIC IMAGE → EMOTIONAL INVESTMENT → REPEATED ACTION → FORMATIVE
              INERTIA → EMBODIED CHARACTER
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              A seedform gives liberated force a centre to reorganise around, which is why symbols
              carry such weight in transitional periods. But it must eventually enter rhythm, habit,
              body and environment — otherwise the old pattern keeps control of material life while
              the new one remains an admired idea. And the field matters as much as the vessel: a
              new form struggles to hold where the surrounding Morphaithēr keeps reproducing the old.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Metastoicheiōsis · trans-elementation
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A deeper operation than altering outward form: the elemental powers composing a being
              change in proportion, hierarchy, function or quality. It does not mean one chemical
              element literally becoming another. It means the elemental economy is reordered so a
              different mode of life becomes possible.
            </p>
          </div>

          <div className="mt-16">
            <WheelOfTranselementation />
          </div>

          <div className="mt-16 max-w-3xl">
            <p className="text-base leading-relaxed text-muted-foreground">
              A person governed by excessive Tejas expresses intensity as anger, consumption, or
              restless ambition. Trans-elementation does not extinguish the fire. It changes fire&rsquo;s
              relation to water, air, earth and space — so that it becomes illumination rather than
              combustion, courage rather than aggression, digestion rather than destruction. An
              excess of Pṛthivī appears as rigidity and over-identification with established form;
              opened by Ākāśa, moved by Vāyu, refined by Tejas and softened by Apas, its stability is
              preserved while its function rises from obstruction into dependable embodiment.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              The higher state is not less elemental. It is more harmoniously elemental.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              § XLII makes the same point materially. Carbon, hydrogen, oxygen and nitrogen are
              present in living and dead matter alike; what differs is their organisation,
              circulation, and participation in a self-renewing system.{" "}
              <span className="text-bone/90">
                Transformation does not always require new substance. It may require a new order of
                participation.
              </span>
            </p>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <div className="mx-auto mt-12 max-w-3xl space-y-3 text-center font-serif text-xl italic leading-relaxed text-bone/85">
            <p>Metamorphōsis changes the form.</p>
            <p>Solve liberates the bound force.</p>
            <p>Coagula gives that force a new vessel.</p>
            <p>Metastoicheiōsis reorders the elemental relations.</p>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            Fulfilled transformation makes the new form{" "}
            <span className="italic text-gold">
              a more truthful embodiment of its governing virtue
            </span>{" "}
            — which is why the question is never whether the form changed, but what force now governs
            it, what virtue it embodies, and what relationships it produces.
          </p>
        </div>
      </section>

      <section id="heka" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-665} />
        <Backdrop src="/bg/stone-aqueduct-in-morning-mist.webp" opacity={0.21} position="center 45%" scrim={0.22} />
        <div className="relative mx-auto max-w-6xl px-6">
          <KhekerFrieze className="mb-12" />
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XLVIII · Heka
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <Hiero w="heka" size="lg" className="text-gold" />
            <p className="font-serif text-lg italic text-gold-dim">
              ḥkꜣ <span className="not-italic text-muted-foreground">· heka</span>
            </p>
          </div>
          <h2 className="mt-8 max-w-3xl font-serif text-4xl leading-tight">
            How significance becomes{" "}
            <span className="italic text-gold">causally consequential</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Heka is not merely hidden force. It is hidden force made operative through an adequate
              chain of mediation.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The Egyptian word is usually translated &ldquo;magic&rdquo;, which misleads — it suggests
            superstition, stage illusion, or an attempt to violate the order of nature. Heka was
            closer to an operative power woven into the structure of existence: the capacity through
            which names, images, words, substances and ritual actions become effective. It was held
            to be natural and primordial, and it ran through protection, healing, temple work,
            funerary preparation and ordinary life alike.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            So it is not another rung between Spirit and Matter. It is a mode of efficacy running
            through the whole chain. Force may exist without becoming effective in a particular
            vessel. A symbol may hold meaning without activating participation. A rite may keep its
            form after losing its object. A name may be correctly pronounced and empty in relation.{" "}
            <span className="text-bone/90">
              Heka is present when the chain becomes functionally joined.
            </span>
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              How the word is written
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-4">
              {[
                ["V28", "a wick of twisted flax", "ḥ"],
                ["D28", "two arms raised", "kꜣ"],
                ["G1", "the Egyptian vulture", "ꜣ"],
                ["Y1", "a rolled papyrus, tied", "—"],
              ].map(([g, draws, sound]) => (
                <div key={g} className="border-t border-border pt-4">
                  <Sign s={g as "V28"} size="md" className="block text-gold" />
                  <p className="mt-3 font-label text-[10px] uppercase tracking-[0.15em] text-gold-dim">
                    {g} · <span className="aoh-tr" lang="egy-Latn">{sound}</span>
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{draws}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-base leading-relaxed text-muted-foreground">
              Three sounds and a silent sign. The rolled papyrus at the end is a classifier: it
              says nothing aloud, and marks the word as an abstraction. Change that last sign to
              the seated god and the same word names the god Heka; add the plural strokes and it
              names spells in the plural. The word survived into Coptic as{" "}
              <span className="font-serif text-bone/85">ϩⲓⲕ</span>, hik.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The second sign is the one to notice. Two arms raised are also the sign for the{" "}
              <span className="italic">ka</span>, the vital double, so the writing of heka carries
              the ka inside it. What that means is disputed. Te Velde read the god&rsquo;s name as
              &ldquo;he who consecrates the ka&rdquo;, and the reading is often repeated as though
              settled; Ritner surveys the term at length and adopts no derivation.{" "}
              <span className="text-bone/90">
                The sign is there. The etymology is a proposal, and this volume leaves it one.
              </span>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              The signs are set here in a row because a font can only set them in a row. Monumental
              Egyptian grouped them into square quadrats and ran in either direction, with the signs
              facing the beginning of the line. The vowels in &ldquo;heka&rdquo; are a convenience of
              modern reading, not a recovered pronunciation.
            </p>
          </div>

          <div className="mt-24">
            <HekaAndMaat />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The shape of an operation
            </p>
            <div className="mt-8">
              <SkyBand height={15} />
              <div className="grid grid-cols-2 border-b border-gold/45 sm:grid-cols-4 lg:grid-cols-7">
                {[
                  ["Virtue", null],
                  ["Mythic pattern", null],
                  ["Name and image", "ren"],
                  ["Spoken formula", "hu"],
                  ["Embodied action", null],
                  ["Material vessel", null],
                  ["Transformed condition", null],
                ].map(([stage, w], i) => (
                  <div
                    key={stage as string}
                    className={`flex min-h-[5rem] flex-col justify-between px-3 py-3.5 ${
                      i === 0 ? "border-l border-gold/25" : ""
                    } border-r border-gold/25`}
                  >
                    <p className="font-label text-[9.5px] uppercase leading-relaxed tracking-[0.12em] text-gold-dim">
                      {stage}
                    </p>
                    {w ? (
                      <Hiero w={w as "ren"} size="sm" className="mt-3 block text-gold/80" />
                    ) : (
                      <span className="mt-3 block h-[1.15rem]" aria-hidden />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Sky above, register line below · the two stages the Egyptians named are marked:{" "}
                <i lang="egy-Latn">rn</i>, the name, and <i lang="egy-Latn">ḥw</i>, authoritative utterance
              </p>
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Each stage translates the one before it, and because no translation is perfect, each
              introduces the possibility of the transductive loss named in § XVII. The image may
              inadequately represent the myth. The words may fail to awaken the image. The
              practitioner&rsquo;s intention may be divided. The material may be inappropriate. The
              recipient may resist. The surrounding field may disperse it. Heka is strong where the
              levels reinforce one another and weak where they contradict.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Which is why an amulet&rsquo;s power was never held to sit in one property. It could
              arise from the conjunction of shape, decoration, inscription, colour, material, spoken
              words and the actions performed with it — a coordinated assembly rather than an
              isolated charge. Read through § X, the material is its Salt, the intended virtue its
              Sulfur, the words and images its Mercury; the wearer is the living vessel, and the
              sacred world that makes the images legible is the tradition.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Sia, Hu, and Heka
            </p>
            <div className="mt-8 space-y-px">
              {[
                ["Sia", "sia", "perceives the pattern", "Perception differentiates and recognises — the Light function."],
                ["Hu", "huGod", "articulates the pattern", "The recognised pattern given ordered, authoritative speech — the Tone function."],
                ["Heka", "hekaGod", "makes the articulated pattern operative", "The transductive efficacy by which what is perceived and said becomes an actual alteration."],
              ].map(([a, w, b, c]) => (
                <div key={a} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[9rem_1fr]">
                  <span>
                    <Hiero w={w as "sia"} size="md" className="block text-gold" />
                    <span className="mt-2 block font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  </span>
                  <span>
                    <span className="font-serif text-base italic text-bone/80">{b}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{c}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The Egyptians put the three in a boat. In the Book of Gates, carried on the walls of
              the royal tombs from Horemheb onward, the bark of the sun runs through the hours of
              the night with Sia standing at the prow and Heka at the stern by the steering oars,
              the ram-headed sun between them in his shrine.{" "}
              <span className="text-bone/90">
                Perception goes first because it must see the way; efficacy stands at the back
                because it is what steers.
              </span>{" "}
              The spell that explains the &ldquo;gods in the following of Atum&rdquo; in Book of the
              Dead 17 names them as Hu and Sia — utterance and perception, at the creator&rsquo;s
              side from the beginning.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              A functional correspondence, not a claim that the Egyptian terms are the
              architecture&rsquo;s ethers. What it registers is that Egyptian thought did not divide
              knowledge, speech and efficacy as sharply as modern thought does.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The Veil gives the same operation its four stages. Warmth empowers the intention —
              without it a rite may be technically correct and inwardly inert. Light gives it an
              image, a name and a direction. Tone gives it command and sequence, which is why
              incantation was never merely explanatory: recitation laid names, events and identities
              into an ordered verbal act, a path the force could move along. Life installs the
              pattern in a vessel so it persists past the moment of utterance.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What it was given for
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              One Middle Kingdom text states the Egyptian position on heka more plainly than any
              other. In the hymn to the creator in the Instruction for King Merikare, the god who
              made the sky and the earth for humankind, and breath for their noses, is said to have
              made one more thing for them.
            </p>
            <blockquote className="mt-8 border-l-2 border-gold pl-6">
              <p className="font-serif text-2xl leading-relaxed text-bone/90">
                He made for them magic as weapons
                <br />
                to ward off the blow of events,
                <br />
                guarding them by day and by night.
              </p>
              <footer className="mt-4 font-label text-[10px] uppercase tracking-[0.18em] text-gold-dim">
                Instruction for King Merikare, lines 136–137 · Lichtheim&rsquo;s rendering; Parkinson
                translates the last clause &ldquo;watching over them by night and by day&rdquo;
              </footer>
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Weapons, and a guard: defensive, given, and given to everyone. Nothing in the sentence
              treats heka as a trespass against the order of things, which is the modern assumption
              carried inside the word &ldquo;magic&rdquo;. It is the creator&rsquo;s provision for
              beings who live inside events they cannot foresee.{" "}
              <span className="text-bone/90">
                A power to ward off the blow is not a power to command the world.
              </span>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              The Coffin Texts spell for becoming Heka — spell 261, &ldquo;to become Heka&rdquo; —
              puts the same power at the beginning rather than in the middle: the speaker is what the
              sole creator made before duality had come into being in the land, present at the going
              forth from his mouth. Whether one reads that as cosmology or as a claim about the
              speaker, its structure is the volume&rsquo;s: utterance first, and efficacy as what
              guards the utterance into effect.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The name, and what it is not
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A divine name is a verbal synthema — an address that gathers myth, attribute,
              function, image, cult and authority into one concentrated sound-form. Speaking it
              activates those associations in the practitioner, the tradition and the field.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              The name does not control the divine as a password controls a machine. It establishes a
              defined relationship within an inherited sacred grammar.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Myth works the same way, as a large-scale seedform. A sufferer could be identified with
              a deity who had suffered and been restored; a present danger placed inside the
              structure of a mythic victory. The practitioner did not merely recall the myth — the
              event was inserted into its pattern, which carries formative inertia because
              generations of rite and attention had deepened its channels.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Ritual identification is methexis under boundary: the participant takes a position
              within the drama, the body becomes the image, speech becomes utterance. Without
              preparation and closure it becomes inflation, projection, or the appropriation of an
              authority no one conferred — which is why § XLVI governs it.
            </p>

            <div className="mt-14 border-t border-border pt-10">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <Hiero w="ren" size="md" className="text-gold" />
                <p className="font-serif text-base italic text-bone/85">
                  rn <span className="not-italic text-muted-foreground">· the name</span>
                </p>
              </div>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                The Egyptians counted the name among the parts of a person, beside the ka, the ba,
                the akh, the shadow and the body. To keep a name spoken and inscribed was to keep
                the being in existence; to cut a name out of a wall was an attack on the one who
                bore it. That is why the Ramesside tale of Isis and the secret name of Re is not a
                story about a password. Isis makes a serpent from the aged sun god&rsquo;s own
                spittle, it bites him, and she withholds the cure until he gives her his true name —
                which passes, the text says, from his body into hers.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Read carefully, the tale states three things and not a fourth. The name is a
                constituent of the god&rsquo;s being, transferred like a substance rather than told
                like a fact. The public epithets are not the operative name. And knowledge of the
                true name confers a real purchase on what bears it.{" "}
                <span className="text-bone/90">
                  What it does not say is that a name compels. Isis gains a relation, and a
                  standing, and the sun goes on rising.
                </span>
              </p>
              <p className="mt-6 text-sm leading-relaxed text-bone/60">
                Her own standing epithet is written{" "}
                <Hiero w="wertHekau" size="sm" className="mx-1 align-baseline text-gold/85" /> — wrt
                ḥkꜣw, &ldquo;great of magics&rdquo;, an epithet she shares with Hathor, Sekhmet and
                the royal uraeus, and which becomes from the New Kingdom the name of a goddess in her
                own right. The plural matters: not one power held, but many.
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Who did it, and where it was kept
            </p>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3">
              <GlossedWord w="perAnkh" size="md" className="min-w-[13rem] flex-1" />
              <GlossedWord w="lector" size="md" className="min-w-[13rem] flex-1" />
            </div>
            <p className="mt-10 text-base leading-relaxed text-muted-foreground">
              There was no guild of magicians standing outside the temple. The principal practitioner
              was the lector priest, the man who carried and read the ritual roll, trained in the
              House of Life — the institution attached to a temple where the sacred, medical and
              magical books were composed, copied and kept. Gardiner collected more than sixty
              attestations of it. The same techniques served temple cult, state rites, healing and
              private protection, which is Ritner&rsquo;s central institutional conclusion and the
              reason the modern division of magic from religion from medicine will not map onto
              Egypt.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The chief lector&rsquo;s title left a long trail. Shortened in Late Egyptian and
              Demotic, it became the ordinary word for a magician, and travelled into Hebrew as the
              ḥarṭummîm, the Egyptian practitioners of the Exodus narrative. In Egyptian storytelling
              he is the wonder-worker: in the Westcar Papyrus a chief lector makes a wax crocodile
              that comes alive, and another folds back the water of a lake to recover a pendant.{" "}
              <span className="text-bone/90">
                An office in the record, a marvel in the tales — the distinction the sources
                themselves keep, and worth keeping here.
              </span>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Late Period officials record restoring these institutions: Udjahorresnet, serving under
              Darius I, says he was commanded to return to Egypt to restore the establishment of the
              House of Life after it had decayed. The books were held to be worth the labour of a
              state.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Taking the text into the body
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The clearest Egyptian evidence for the chain this section describes is a technique
              rather than a doctrine. Cippi — small stelae showing the child Horus standing on
              crocodiles and grasping snakes and scorpions, covered with recitations against venom —
              were made with basins cut into their bases. Water was poured over the inscribed
              surface, collected, and drunk or applied to the bite. The healing statues work the same
              way; the statue of Djedhor at Athribis is the best known.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Note what the arrangement assumes. The words are held to be in the water because they
              were cut in the stone, and in the sufferer because the water was drunk: name, image,
              inscription, material and body joined into a single passage.{" "}
              <span className="text-bone/90">
                Whatever one concludes about its efficacy, it is not a magical short cut around
                matter. It is an unusually literal insistence that the operation must find a material
                route.
              </span>{" "}
              The Demotic tale of Setne makes the same move in the register of knowledge, where
              Naneferkaptah copies the Book of Thoth onto fresh papyrus, dissolves it in beer, drinks
              it, and knows what was in it.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What cannot simply be copied
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              No divine power, intention or symbolic meaning passes into material expression
              unaltered. A formula loses dimensions of the pattern it carries. An image reveals some
              attributes and conceals others. Translation shifts the associations of sacred names.
              Historical distance weakens the field that made an operation legible at all.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              So Egyptian rites cannot be lifted out of their world and assumed to function
              identically. Their forms belonged to a particular temple, language, priesthood and
              social order.{" "}
              <span className="text-bone/90">
                A modern system may learn from their architecture — the coordination of name, image,
                material, myth, speech, body and field — without claiming to have recovered the
                operation itself.
              </span>{" "}
              That restraint is itself an application of right relation to tradition.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The same restraint applies to healing. Protective speech, names, amulets and practical
              treatment could belong to one operation because the Egyptian account did not sharply
              divide material from symbolic causation. This is not a replacement for medicine. Heka
              does not become greater by ignoring matter — it becomes effective by finding the
              material relations through which transformation can actually occur.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The papyri say so themselves. The Ebers papyrus, the longest medical manuscript to
              survive, opens with recitations to be spoken while a remedy is applied, and then runs
              to some eight hundred prescriptions of material remedies; its spell for drinking a
              remedy sets the two in one sentence, the remedy effective with the magic and the magic
              effective with the remedy, in wording translators render variously. Its book of the
              heart names the three practitioners side by side — the physician, the wab-priest of
              Sekhmet, and the maker of protection — all laying hands on the patient and examining
              the vessels. The Edwin Smith papyrus, meanwhile, is a surgical text that sorts each
              case into three verdicts: an ailment I will treat, an ailment I will contend with, an
              ailment not to be treated.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              That last verdict is the one worth carrying away. A tradition that recited spells also
              wrote down the cases it judged untreatable, and set its recitations beside splints,
              sutures and honey dressings rather than in place of them. Anyone who cites Egypt as a
              warrant for refusing treatment is citing the opposite of what these documents contain.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Six questions, not one
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Because an operation can fail by succeeding at the wrong level, &ldquo;did it
              work?&rdquo; is not sufficient. The architecture needs several standards at once, which
              is what separates efficacy from fulfilled operation.
            </p>
            <ol className="mt-8 space-y-3">
              {[
                "Did the operation produce an effect at all?",
                "Did the effect reach the level it was intended for?",
                "Did it endure beyond the moment of the rite?",
                "Did it preserve the virtue that originated it?",
                "Did it strengthen the vessel, or diminish it?",
                "Did it contribute to right relation in the surrounding field?",
              ].map((q, i) => (
                <li key={q} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="font-label text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-relaxed text-muted-foreground">{q}</span>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-base leading-relaxed text-muted-foreground">
              Which makes heka a kind of engineering — not because it reduces gods to mechanisms, but
              because it recognises that mediation has structure. A poorly built bridge does not
              carry a load because its builder was sincere, and a poorly built rite does not mediate
              a force because its participant felt devotion. Channels, proportions, materials,
              sequence and destination all matter.{" "}
              <span className="text-bone/90">
                And it must stay Sophianic: the sacred is not a machine, the gods are not switches,
                and living participants are not components.
              </span>
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The register of words
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Every Egyptian word this section sets, with the signs it is built from and Gardiner&rsquo;s
              numbers for them. The writings are normalised and linearised: they are how the words are
              cited, not how any one inscription cuts them.
            </p>
            <SignRegister
              words={["heka", "hekau", "hekaGod", "ka", "akh", "sia", "huGod", "maat", "ren", "sa", "wertHekau", "perAnkh"]}
            />
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Two of these carry the volume&rsquo;s own argument. The root of{" "}
              <span className="font-serif italic text-bone/85">ꜣḫ</span> means effective and luminous
              at once, and the same root names the transfigured dead — a language in which becoming
              light and becoming able are one word, which is the claim{" "}
              <Link
                to="/phos/$division/$entry"
                params={{ division: "xv", entry: "akh-radiance-and-the-transfigured-dead" }}
                className="text-gold-dim underline-offset-4 hover:text-gold hover:underline"
              >
                the Portal follows through the Egyptian material
              </Link>
              . And <span className="font-serif italic text-bone/85">sꜣ</span>, protection, is what
              Coffin Texts 261 makes Heka: the guarding of what was commanded into effect.
            </p>
            <p className="mt-6 text-xs leading-relaxed text-bone/45">
              &ldquo;Words of power&rdquo; is Budge&rsquo;s Victorian rendering of ḥkꜣw, and the
              occult noun &ldquo;hekau&rdquo; descends from it; Egyptologists do not use it as a
              technical term, and neither does this volume.
            </p>
          </div>

          <div className="mt-24 flex justify-center">
            <ShenRing size={38} />
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-2 text-center font-serif text-lg italic leading-relaxed text-bone/85">
            <p>Sia perceives the pattern.</p>
            <p>Sophia discerns its right relation.</p>
            <p>Hu articulates it.</p>
            <p className="text-gold">Heka activates it.</p>
            <p>The Fourfold Veil translates it.</p>
            <p>Morphaithēr carries it.</p>
            <p>The living vessel embodies it.</p>
            <p className="flex items-center justify-center gap-3">
              <Sign s="H6" size="sm" className="text-gold/80" />
              Ma&rsquo;at judges whether the resulting form belongs to the harmony of the whole.
            </p>
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            An invisible force becomes operative not through intention alone but through the
            intelligent coordination of{" "}
            <span className="italic text-gold">
              name, image, word, matter, body, memory, authority, and field
            </span>
            .
          </p>
        </div>
      </section>

      <section id="microcosm" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-680} />
        <Backdrop src="/bg/sea-stack-in-pale-tide.webp" opacity={0.16} position="center 45%" scrim={0.22} portrait />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § XLIX · Spirit, Soul, and Body
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Neither a mind in a machine nor a spirit{" "}
            <span className="italic text-gold">imprisoned in matter</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Spirit animates. Essence determines. Soul mediates. Body embodies.
            </p>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/60">
            § L amends this. It inserts a fifth office between soul and body — the etheric,
            which vitalises and organises — and the formula is left standing here as it was
            first stated rather than retrofitted.
          </p>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Not three objects placed beside one another but three principal registers of one living
            act of manifestation. Spirit supplies the animating current; essence the distinctive law
            by which that current becomes <span className="italic">this</span> being; soul receives,
            interprets and organises it; body gives it location, resistance and consequence. A human
            life is the ongoing labour of establishing right relation among them.
          </p>

          <div className="mt-24">
            <FourOffices />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What microcosm means here
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Not that the person is a miniature copy of the universe, but that the same relations
              governing manifestation are repeated within a human life. The movement from invisible
              force into visible form, from unity into differentiation, from possibility into
              actuality — and the return from manifestation toward conscious participation — can all
              be met inside one person.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Which means the human being stands at an intersection: vertically open to what exceeds
              the personality, horizontally entangled with nature, ancestry, culture and history. And
              it means no act is only one thing. A thought modifies attention; attention affects
              emotion; emotion alters breath and posture; action enters the world and returns as
              consequence.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The vessel does not merely transmit what passes through it —{" "}
              <span className="text-bone/90">it metabolises</span>. Pain can become cruelty, wisdom,
              art, compassion or paralysis depending on how it is received — the transformation
              § LI follows into desire, image and complex. Desire can be dissipated,
              repressed, compulsively enacted, or transmuted into sustained work. The quality of the
              vessel decides the fate of the force passing through it.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Intensity does not establish origin
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Not every psychic movement is pneumatic. A powerful image may come from fear, trauma,
              suggestion, collective contagion, wishful thinking, or genuine encounter — and the
              force with which it arrives tells you nothing about which. The soul has to learn the
              difference between what merely excites it and what actually orders it.
            </p>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div className="border-l-2 border-gold/40 pl-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold">
                  Authentic influence
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Deepens coherence, ethical responsibility, clarity, and right relation.
                </p>
              </div>
              <div className="border-l-2 border-bone/30 pl-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-bone/80">
                  Counterfeit illumination
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Produces inflation, compulsion, fragmentation — and exemption from accountability.
                </p>
              </div>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              That last one is the tell. A genuine deepening does not arrive with a licence attached.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Why the body is not merely physical
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Saying so denies no biology. It says the physical description, however necessary, does
              not exhaust what a body is. A body is also lived, inherited, relational, symbolic and
              ecological — matter organised into presence. It carries ancestry as structure and
              disposition, history as scar, posture, skill and adaptation, relationship because
              bodies develop through contact and protection and neglect.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              It remembers, though not as a literal record of specific events.{" "}
              <span className="text-bone/90">It remembers through readiness</span>, which is
              § L&rsquo;s pattern acting as process rather than a record kept. Fear contracts
              the breath. Vigilance becomes posture. Craft becomes muscular intelligence. Prayer
              establishes rhythms of stillness. Love and danger alike shape how the organism
              anticipates contact.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              Density is not spiritual inferiority. Density gives force endurance — a thought may
              vanish in seconds; a thought made habit can structure decades.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              So the body is both revelation and concealment. It discloses the invisible through
              gesture, voice, movement and health, and it never fully discloses the depths animating
              it: the person before us is materially present and never reducible to what can be
              measured. Hunger, fatigue, illness, pleasure, ageing, sexuality, labour and death are
              not interruptions of spiritual life. They are among the conditions through which
              spiritual truth has to become real.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Practice as architectural work
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Attention repairs pathways. Discernment separates mixed currents. Discipline
              strengthens weakened structures. Contemplation opens vertical receptivity. Ethical
              action brings the lower chambers into conformity with the higher. Ritual gives
              invisible relations a controlled symbolic body. Physical care maintains the instrument
              through which every other operation must proceed.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              The purpose is not to destroy the lower in favour of the higher. A sanctuary without
              foundations cannot support its altar.
            </p>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            The completed human being is not the one who abandons the body, silences the soul, or
            dissolves individuality into an abstract spirit. It is the one in whom each level fulfils
            its proper office.
          </p>
          <p className="mx-auto mt-10 max-w-3xl text-center font-serif text-2xl leading-relaxed text-bone/90">
            A finite architecture capable of consciously receiving the greater order, transforming it
            through a unique centre, and{" "}
            <span className="italic text-gold">giving it truthful form within the world</span>.
          </p>
        </div>
      </section>

      <section id="etheric" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-695} />
        <Backdrop src="/bg/water-cascading-from-carved-stone-vessel.webp" opacity={0.34} position="center 45%" scrim={0.22} portrait />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § L · The Etheric Body
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The pattern that must be{" "}
            <span className="italic text-gold">continually performed</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Not another material body hidden inside the visible one, nor a cloud of undifferentiated
              energy around it. The living organisation by which matter is gathered into biological
              unity and maintained through continual change.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            This amends § XLIX. Four offices become five, and the new one sits between soul and body:
            spirit animates, essence determines, soul mediates,{" "}
            <span className="text-bone/90">the etheric body vitalises and organises</span>, and the
            physical body embodies. It is the lower formative bridge of the living vessel — more
            subtle than anatomy, more immediately bound to organic life than thought or identity.
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Vital, and formative
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              <span className="italic">Vital</span> names what distinguishes living organisation from
              inert arrangement: nourishment, assimilation, circulation, growth, repair, adaptation.{" "}
              <span className="italic">Formative</span> names the fact that vitality is never
              shapeless — life does not merely energise matter, it organises matter according to
              proportion, boundary and developmental tendency.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              So this is not a quantity of energy a person has. A body can be highly stimulated
              without being deeply vital; excessive stimulation produces agitation, sleeplessness and
              eventual exhaustion. Vitality is better recognised by whether the organism can receive,
              distribute, spend and replenish force{" "}
              <span className="text-bone/90">without losing internal coherence</span>.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              It also names a genuine question rather than an extra substance. Genetics, metabolism,
              cellular signalling and nervous regulation describe the mechanisms of a living body.
              The etheric concept asks something else: why those mechanisms act as coordinated
              expressions of one whole rather than as unrelated chemical events. § XLII supplies the
              material alphabet; this is nearer to the living syntax by which that alphabet is
              arranged, exchanged, and repeatedly reconstituted as an organism.
            </p>
          </div>

          <div className="mt-24">
            <EthericTideScales />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Depletion is not an empty tank
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Fatigue is not always vitality&rsquo;s enemy. It is often the living architecture
              announcing that expenditure has outrun renewal, drawing the organism away from outward
              action toward restoration. Heard, it protects the vessel. Chronically overridden, the
              protective withdrawal can deepen into something more disorganised.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              The problem is not always absence of force. It may be force trapped in defensive
              mobilisation, or scattered across too many unfinished demands.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Which is why a person can feel exhausted and restless at once, and why restoration is
              not primarily a matter of adding stimulation. It means re-establishing rhythm and right
              relation — sleep, nourishment, movement, quiet, natural light, emotional safety,
              meaningful contact, and relief from unbroken demand.
            </p>
            <p className="mt-8 border-l-2 border-bone/40 pl-5 text-base leading-relaxed text-bone/80">
              Medical care remains essential wherever fatigue or any other symptom may have a
              physiological or psychological cause. This is a metaphysical interpretation of
              vitality, and it must never be used to dismiss diagnosis or treatment. Nor is illness
              evidence of spiritual inferiority. Bodies inherit different conditions and different
              capacities; etheric strength is not a measure of moral worth. A person may be
              spiritually lucid and ethically profound while physically ill.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Pattern acting as process
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A blueprint can stay unchanged while the structure it describes deteriorates. This is
              different, because it participates in building and maintaining the structure itself. It
              keeps identity the way a flame or a whirlpool or a melody does — not by holding the
              same material, but by sustaining an organised continuity through change.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              So it is neither fixed nor infinitely plastic. Completely fixed, growth and adaptation
              would be impossible; infinitely plastic, there would be no identity to continue. Living
              form exists in the tension between fidelity and responsiveness: it must remain itself
              while incorporating what it was not before.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              And the soul can influence this field, because emotion, attention and habit alter
              rhythm and conduct — but it is not created by thought. Positive thinking does not
              abolish biological limits, and imagination alone does not command organic life. The
              relation runs both ways and is mediated in both directions.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              Regeneration shows the same principle at its clearest. The organism does not consciously
              recall an ideal blueprint, yet its processes stay oriented toward a characteristic
              organisation — healing as the effort of living form to remember itself through matter.
            </p>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            The first great victory of form over dispersion: it gathers matter without freezing it,
            organises movement without eliminating freedom, and preserves identity through exchange.
          </p>
          <p className="mx-auto mt-10 max-w-3xl text-center font-serif text-2xl leading-relaxed text-bone/90">
            The body lives because form is not merely placed upon matter.{" "}
            <span className="italic text-gold">Form is continuously enacted through it.</span>
          </p>
        </div>
      </section>

      <section id="astral" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-710} />
        <Backdrop src="/bg/tidal-pool-below-sea-cliff.webp" opacity={0.16} position="center 40%" scrim={0.22} portrait anchor="left" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § LI · The Astral and Psychic Layers
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            How life acquires an{" "}
            <span className="italic text-gold">inwardly experienced world</span>
          </h2>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              The etheric body maintains the organism. The astral body gives the organism an inward
              world — conditions not merely registered but felt as pleasant or painful, desirable or
              threatening, beautiful or repellent.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            It is not the whole soul. It is one mobile, image-bearing region within a larger psychic
            architecture that also holds reason, conscience, self-reflection and deliberate will. The
            astral body supplies much of the soul&rsquo;s immediate imagery and motive force —{" "}
            <span className="text-bone/90">
              and does not by itself determine what is true, ethical, or spiritually authoritative.
            </span>
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Desire, image, sensation
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A field of felt vectors. Desire draws toward; aversion pushes away — and aversion is
              itself a negative desire, the impulse to increase distance from an unwanted condition.
              Astral motion is not movement through space but the interior movement of a being toward
              participation or withdrawal.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Desire supplies pressure; image supplies the vessel. A vague longing becomes operative
              once it acquires a face, scene, memory or symbol — and when desire enters an image, the
              image becomes magnetised, organising attention and expectation around itself. Which is
              why repeatedly imagined possibilities gain power even when nothing is present:{" "}
              <span className="text-bone/90">
                the astral body responds not only to actual objects but to represented ones.
              </span>
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              And it stands before interpretation rather than after it. Something feels welcoming,
              threatening, fascinating or strangely familiar; thought may correct that later, but the
              polarity arrives before the explanation.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              And the influence runs upward as well as down. Fear alters breath, posture and
              muscular readiness; shame contracts expression and joy expands it. But exhaustion,
              hunger, illness, hormonal change, sensory overload and broken sleep colour emotion and
              imagination just as strongly.{" "}
              <span className="text-bone/90">
                The astral body does not float above the organism.
              </span>{" "}
              It is interpenetrated by the etheric rhythms of § L and continually receives
              impressions from the physical body — the two form one reciprocal circuit.
            </p>
          </div>

          <div className="mt-24">
            <FiveArchitecturesOfFear />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Quality and dynamic state
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The tattvas give an astral formation its qualitative character. The gunas give it a
              dynamic condition — and they are two axes, not one. Tamas is inertia, containment and
              the capacity to hold a form; rajas is propulsion, friction and restless
              differentiation; sattva is clarity, proportion and transparency. None is a moral label.
              Disorder is one dominating beyond its measure, or arriving at the wrong time.
            </p>
            <div className="mt-8 space-y-px">
              {([
                ["tejas", "Tejas", "lucid discrimination", "ambition, anger", "smouldering resentment"],
                ["apas", "Apas", "compassion", "emotional hunger", "stagnant grief"],
                ["prithivi", "Pṛthivī", "embodied reliability", "accumulation, control", "immobility, refusal"],
                ["vayu", "Vāyu", "intellectual flexibility", "anxious proliferation", "confused circulation"],
                ["akasha", "Ākāśa", "contemplative openness", "fascination with the unlimited", "vacant withdrawal"],
              ] as const).map(([k, t, s, r, m]) => (
                <div key={t} className="grid gap-1 border-b border-border py-3 sm:grid-cols-[7rem_1fr_1fr_1fr]">
                  <span className="flex items-center gap-2.5 font-serif text-base text-gold">
                    <TattvaGlyph dominant={k} size={18} decorative />
                    {t}
                  </span>
                  <span className="text-sm leading-relaxed text-bone/80">{s}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{r}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{m}</span>
                </div>
              ))}
              <div className="grid gap-1 pt-2 sm:grid-cols-[6rem_1fr_1fr_1fr]">
                <span />
                <span className="font-label text-[10px] uppercase tracking-[0.15em] text-gold-dim">under sattva</span>
                <span className="font-label text-[10px] uppercase tracking-[0.15em] text-gold-dim">under rajas</span>
                <span className="font-label text-[10px] uppercase tracking-[0.15em] text-gold-dim">under tamas</span>
              </div>
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Which gives a more precise question than any single label allows.{" "}
              <span className="text-bone/90">
                What quality is shaping this force, in what dynamic condition does that quality
                presently exist, and what relation must change for it to become coherent?
              </span>{" "}
              Transformation does not require eliminating tamas and rajas — tamas may need waking by
              rajas, excessive rajas may need containing by tamas. A living psyche must be able to
              stabilise, to move, and to clarify.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              And sattva is not the destination if it becomes an identity. One can grow attached to
              feeling serene, elevated, or spiritually exceptional. It is the clearest condition of
              the medium; spirit exceeds the conditions of the medium.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Memory, complex, and the returning configuration
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Memory is not a neutral archive holding perfect replicas. It is a living reconstruction
              — both a trace of what occurred and a present act of psychic formation. And astral
              memory is especially affective: it preserves not only events but their felt
              orientations, safe or unsafe, empowering or humiliating.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              So a present situation can wake that pattern before the person recognises the
              similarity. The astral body answers the returning configuration; the reflective mind
              looks afterwards for a reason. A complex is that constellation grown stable — memory,
              emotion, bodily readiness, image and desire held together tightly enough to organise
              perception around itself.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              The person does not merely remember fear. The architecture of fear begins to perceive
              through them.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Emotion, dream, imagination
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Emotion is the movement of the whole field around a perceived value — grief registers
              loss, anger answers obstruction or violation, fear anticipates danger, joy accompanies
              connection. It is neither infallible revelation nor meaningless disturbance. It is
              information already interpreted through a person&rsquo;s history and present
              organisation.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              Which is why the same event moves two people differently. Emotion reveals the relation
              between the event and the receiving architecture. It does not disclose the event alone.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Dream arises when ordinary sensory governance loosens and memory, bodily condition,
              unfinished feeling and symbolic pattern can combine more freely. It is one of the
              primary theatres in which psychic material becomes visible to itself — and{" "}
              <span className="text-bone/90">not every dream is a message.</span> Many appear to
              metabolise experience, regulate emotion, or reorganise memory. Some carry unusually
              coherent or transpersonal symbols. Vividness cannot tell them apart: an intense dream
              may matter greatly and be neither predictive nor transmitted from anywhere.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              And imagination works in more than one mode.
            </p>
            <div className="mt-6 space-y-px">
              {[
                ["Reproductive", "recalls and recombines what has already been experienced"],
                ["Projective", "constructs possible futures"],
                ["Creative", "discovers combinations not previously recognised"],
                ["Contemplative", "becomes receptive to symbolic relations the discursive mind cannot easily generate"],
              ].map(([a, b]) => (
                <div key={a} className="grid gap-1 border-b border-border py-3 sm:grid-cols-[9rem_1fr]">
                  <span className="font-label text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              It can reveal, distort, rehearse, compensate, liberate or deceive, and which it does
              depends on the condition of the soul and the discipline of attention. A purified
              imagination is not one emptied of images. It is one able to receive an image without
              immediately confusing it with a fact, a command, or an objective revelation.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Phantasia, and what appearance does not prove
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              <span className="italic">Phantasia</span> does not mean fantasy in the dismissive
              sense. It is the faculty by which something becomes inwardly present — perception
              leaving an image, memory becoming visible again, invisible meaning taking a form
              consciousness can reach. An inner image is rarely a neutral picture: it carries
              atmosphere, orientation and pressure. It is form containing force.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A sign points toward a relatively determinate meaning. A symbol exceeds any single
              definition — it gathers several levels of relation and keeps generating meaning as
              consciousness returns to it, which is why symbols are the natural vessels of this
              region: they can hold bodily sensation, personal memory, collective inheritance and
              metaphysical intuition in one appearance.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              But the astral field can clothe personal desire in sacred imagery, give fear the voice
              of prophecy, and return cultural material as apparently autonomous revelation.
            </p>
            <div className="mt-8 space-y-2 border-l-2 border-bone/30 pl-6 font-serif text-lg leading-relaxed text-bone/80">
              <p>Vividness proves intensity, not truth.</p>
              <p>Beauty proves formal power, not spiritual authority.</p>
              <p>Repetition proves a pattern is established, not that its reading is correct.</p>
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              So discernment asks what preceded the image, what desire or fear it serves, whether it
              produces clarity or compulsion, whether its meaning survives the intensity subsiding,
              whether it encourages responsibility or exemption, and whether anything corroborates it
              where it makes a factual claim.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              The aim is not to mistrust imagination but to free it from unconscious possession. An
              image can be contemplated without being obeyed, honoured without being literalised,
              explored without being declared objective. That interval between appearance and assent
              is one of the chief freedoms of a developed soul.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The theatre, and who is shaping it
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Memory supplies the scenery, desire the direction, emotion the atmosphere; the tattvas
              colour the stage and the gunas decide whether the performance is lucid, turbulent or
              obscured. Complexes appear as recurring characters and habitual expectations as
              scripts. Consciousness is not always the director — a scene is usually already underway
              when awareness arrives.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Ritual works through this theatre deliberately, giving an idea an imaginal body that
              engages emotion, memory and action at once. Which is exactly why symbolic engineering
              is dangerous. Advertising, propaganda, political spectacle and social contagion all
              demonstrate that the theatre is continuously being shaped by someone —{" "}
              <span className="text-bone/90">
                and whoever holds a community&rsquo;s dominant images influences where its force will
                move.
              </span>
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The work is not to close the theatre but to purify its conditions. Solve loosens the
              automatic bond among image, emotion and reaction, separating what had been fused —
              sensation from interpretation, memory from present fact, desire from command, symbol
              from literal assertion. Coagula reorganises the released force around a truer pattern
              and embodies it in conduct.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Spirit may enter the theatre, and spirit is not the costumes it wears there. Gods,
              angels, ancestors, stars and radiant figures may be profound mediating forms, and no
              astral appearance exhausts what it symbolises. The soul&rsquo;s danger is worshipping
              the clothing and losing the current it was meant to reveal.
            </p>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            A disordered astral body is a theatre in which every actor claims to be the king, every
            emotion rewrites the script, and every striking image declares itself a revelation. An
            ordered one is not empty or colourless.
          </p>
          <p className="mx-auto mt-10 max-w-3xl text-center font-serif text-2xl leading-relaxed text-bone/90">
            Vivid without being tyrannical, receptive without being credulous,{" "}
            <span className="italic text-gold">
              imaginative without abandoning discernment
            </span>
            .
          </p>
        </div>
      </section>

      <section id="soul" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-725} />
        <Backdrop src="/bg/stream-through-lit-cave-mouth.webp" opacity={0.28} position="center 50%" scrim={0.22} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § LII · Soul and Interior Life
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">Ψυχή</h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            The mediator that makes participation personal
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Not a ghost concealed inside the body, and not identical to personality, intellect,
              emotion or consciousness. The living interior field in which sensation, memory, desire,
              imagination and spiritual influence become experiences belonging to a particular being.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            It is a <span className="italic">metaxy</span> — an active between. Receptive upward
            toward spirit, essence and intelligible order; receptive downward toward the etheric
            body, sensation, nature, society and circumstance. It does not merely occupy the middle
            position. It does the work of translation, giving forces from both directions a form that
            can enter personal consciousness.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Spirit itself is not an image. Before spiritual influence can become intelligible it is
            usually clothed in symbol, feeling, intuition, dream or ethical imperative — and the soul
            supplies those garments.{" "}
            <span className="text-bone/90">The garment is not the source.</span> A radiant image may
            carry spiritual meaning and remain a psychic formation through which that meaning has
            been translated.
          </p>

          <div className="mt-24">
            <TheInterval />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Memory, desire, image, identity
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Memory gives the soul a past — not as stored narrative but as expectation, bodily
              readiness and habitual interpretation, a lens through which the present is received.
              Desire reaches the other way, bending attention toward what is not yet present. Image
              joins them: a memory returns through an image, a desire builds an image of its
              fulfilment, fear gives image to anticipated harm.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Identity emerges from the repeated organisation of these — certain experiences held as{" "}
              <span className="italic">my history</span>, certain futures as{" "}
              <span className="italic">my purpose</span>. Which makes much of personal identity a
              relatively stable pattern produced by the soul&rsquo;s own acts of selection, and{" "}
              <span className="text-bone/90">not the same thing as essence</span>. Essence is the
              deeper determining law; identity includes roles, wounds, ambitions and self-images that
              are real, consequential, and able to change.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The four can lock into a self-confirming rotation. A person who holds themselves
              powerless may remember what confirms it, imagine futures where action fails, desire
              rescue rather than agency, and read each new difficulty as further proof. Another may
              organise the same difficulties around endurance, and take them as the conditions
              through which strength is built.{" "}
              <span className="text-bone/90">
                The outer facts matter, and the soul&rsquo;s pattern decides how they circulate.
              </span>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Interrupting that rotation is § XLVII&rsquo;s work applied inwardly: solve separates
              memory from the identity it has been supporting and desire from the image that captured
              it; coagula reorganises the freed force around a more accurate memory and a more
              proportionate desire. The aim is not a more flattering story about oneself. It is the
              identity that lets the soul&rsquo;s forces enter right relation with essence,
              embodiment and the world.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              A field, not a collection
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Thoughts, emotions and memories do not arrive independently. Each appears inside an
              atmosphere that decides how it will be taken — the same thought considered calmly in a
              peaceful field can become compulsive inside fear. The field has a centre, a periphery,
              and a horizon where things are sensed without being known, and attention works as its
              aperture: it does not create what it rests on, but it decides which forces get fed.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              It is also temporal, which gives experience depth and permits its characteristic
              distortions. The past can colonise the present so that an old danger is perceived in a
              new relationship. An imagined future can overshadow the actual conditions in front of
              someone.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              And it is permeable. Language, family, culture and history supply many of the images
              through which experience is understood —{" "}
              <span className="text-bone/90">
                the soul receives symbols before it consciously chooses them
              </span>
              . Other people alter the field by presence and expectation; places hold atmospheres;
              groups generate fields that amplify fear, devotion or conviction. Permeability is what
              makes empathy and learning possible, and it is exactly why discernment is needed:
              telling apart what belongs to one&rsquo;s own history, what was absorbed from others,
              what arises from the body, and what belongs to a collective mood.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              A healthy soul is neither sealed nor indiscriminately open. It can receive without
              absorbing everything, and participate without surrendering discernment.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The lived topology
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Subtle experience presents itself in terms that resemble space. A person may feel
              expanded or contracted, centred or scattered, heavy or light, open or defended. An
              emotion may seem gathered in the throat, pressing at the forehead, moving through the
              abdomen, or surrounding the whole body as an atmosphere.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              None of that requires a measurable substance occupying those places. It shows how the
              soul organises its relation to bodily and psychic events — a structured field of
              centres, boundaries, movements, pressures and directions. So a condition can be
              examined by its qualities rather than explained at once: does it expand or contract,
              move up or in, run rhythmic or continuous, feel warm, dense, sharp, hollow or luminous?
              What preceded it, and what remained after it passed?
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Patterns found this way become trustworthy slowly, and only alongside physical health,
              sleep, context, conduct and outside corroboration. Certain relationships may reliably
              produce expansion or depletion; certain practices may clarify the field while others
              generate intensity without coherence.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Where force becomes meaning
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Force by itself is pressure, direction, intensity. Heat may become anger, courage,
              erotic intensity, focused will, fever, purification or creative urgency. Contraction
              may mean fear, concentration, protection, grief or preparation. The force carries no
              single interpretation independently of the architecture receiving it.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              So meaning is neither contained in the force nor invented by the personality. It
              emerges in the correspondence between what arrives and what receives it — and it often
              begins before words. A person senses that something matters before knowing why: a
              density of significance, a resonance or disturbance, around which images and emotions
              gather while thought arrives later to articulate what was already felt.
            </p>
            <p className="mt-8 border-l-2 border-bone/40 pl-5 text-base leading-relaxed text-bone/80">
              Which is why that felt significance has to be tested. It may indicate genuine
              correspondence, and it may equally arise from projection, desire, trauma or
              conditioning. Intensity is not the measure of truth. Meaning earns trust by producing
              greater coherence among experience, evidence, responsibility and right relation.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A narrative can conceal as easily as reveal. Genuine meaning does not merely explain an
              event satisfyingly — it locates the event in a truer network of relations, showing what
              it asks, what it reveals, what must be released, and what participation should follow.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              When force cannot become meaning it stays as compulsion, confusion, or repetitive
              pressure. When meaning detaches from force it becomes empty abstraction. The
              soul&rsquo;s work is joining them: giving form to force without imprisoning it, and
              force to form without letting it turn chaotic.
            </p>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            Right relation does not require the soul to disappear before spirit. A perfectly erased
            mediator could not individualise or embody anything. It fulfils its purpose by becoming
            transparent without becoming nonexistent — distinct enough to be a particular vessel,
            clear enough not to mistake itself for the source.
          </p>
          <p className="mx-auto mt-10 max-w-3xl text-center font-serif text-2xl leading-relaxed text-bone/90">
            The place where the universe ceases to be merely encountered and begins to be inwardly
            understood, consciously participated in, and{" "}
            <span className="italic text-gold">returned to the world as meaningful form</span>.
          </p>
        </div>
      </section>

      <section id="lexicon" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-490} />
        <Backdrop src="/bg/cabinet-of-curiosities-in-lamplight.webp" opacity={0.4} position="center 50%" scrim={0.2} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            § Lexicon · Where the Terms Are Defined
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The vocabulary, and its <span className="italic text-gold">home sections</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The routes at the top of this document answer how to read through it. This answers the
            opposite question — where something was explained. Each entry is a pointer rather than a
            restatement: one line, and the section that does the actual work, because restating the
            definitions here would reintroduce exactly the redundancy the cross-references exist to
            prevent.
          </p>
          <Lexicon />
        </div>
      </section>

      <section id="unified" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/night-crater-with-glowing-lava.webp" opacity={0.5} position="center 50%" scrim={0.05} />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            The Unified Formula
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">
            The architecture in <span className="italic text-gold">eight movements</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Root Ether, the Fourfold Veil, the tattvas, the elements, geometry, the alchemical
            triad, the Morphaithēr, the Flywheel, the Crypt, and the Ossuary are not disconnected
            inventions. Each describes a phase of one continuous metaphysics of formation.
          </p>

          <div className="mx-auto mt-14 max-w-3xl space-y-px text-left">
            {[
              "Possibility becomes qualitative tendency.",
              "Qualitative tendency directs force.",
              "Force enters relation.",
              "Relation is measured into pattern.",
              "Pattern is stabilized within a vessel.",
              "The vessel participates in a larger field.",
              "Repetition deepens the pattern into memory.",
              "Dissolution releases the vessel’s contents and consequences back into the conditions of future formation.",
            ].map((line, i) => (
              <div
                key={i}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-border py-5 transition-colors hover:border-gold/40"
              >
                <span className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-lg leading-relaxed text-bone/90 sm:text-xl">
                  {line}
                </span>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl text-left">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The same arc, read through the laws of maintenance
            </p>
            <p className="mt-5 font-serif text-lg leading-relaxed text-bone/85">
              The field offers possibility; tattvic biases give it direction;{" "}
              <span className="text-gold-dim">boundaries select what can enter</span>; the ethers
              transduce influence between levels; measure organizes force into pattern;{" "}
              <span className="text-gold-dim">metabolism maintains the pattern through exchange</span>;
              repetition deepens it into formative inertia;{" "}
              <span className="text-gold-dim">thresholds permit sudden reorganization</span>; telos
              draws the form toward greater integration; and dissolution releases its contents while
              the Crypt preserves the changes its existence made to the field.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The eight movements above and these ten are one arc, not two. What the finer reading
              adds is the maintenance the coarser one passes over — the boundary, the metabolism,
              and the threshold.
            </p>
          </div>

          <p className="mt-12 font-label text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            and the field is altered for what comes after
          </p>
        </div>
      </section>

      {/* FINAL FORMULA */}
      <section id="formula" className="relative isolate overflow-hidden border-t border-border py-40">
        <Backdrop src="/bg/crystal-suspended-in-glass-sphere.webp" opacity={0.56} position="center 62%" scrim={0.15} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-[0.18]"
            width="1300"
            height="1300"
            viewBox="-650 -650 1300 1300"
            aria-hidden
          >
            <circle r="620" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            <circle r="460" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            <circle r="300" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            {all.map((p, i) => {
              const a = (i * Math.PI * 2) / all.length - Math.PI / 2;
              return (
                <text
                  key={p.latin}
                  x={Math.cos(a) * 560}
                  y={Math.sin(a) * 560}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="EB Garamond, serif"
                  fontSize="22"
                  fontStyle="italic"
                  fill="oklch(0.78 0.13 75 / 0.6)"
                  transform={`rotate(${(i * 360) / all.length + 90} ${Math.cos(a) * 560} ${Math.sin(a) * 560})`}
                >
                  {p.greek}
                </text>
              );
            })}
          </svg>
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold">
            <span lang="el" className="scr-greek">Μεταμόρφωσις</span> · The Final Formula
          </p>
          <div className="mt-12 space-y-4 font-serif text-lg italic leading-relaxed text-bone/85 sm:text-xl md:text-2xl">
            <p>Source emanates Spirit.</p>
            <p>Spirit animates Essence.</p>
            <p>Essence bears Virtue.</p>
            <p>Virtue becomes Force.</p>
            <p>Force moves through Root Ether.</p>
            <p>Root Ether differentiates through Polarity.</p>
            <p>Polarity requires Limit.</p>
            <p>Limit is harmonized by Measure.</p>
            <p>Measure gives rise to Pattern.</p>
            <p>Pattern prepares the Vessel.</p>
            <p>The Vessel stabilizes Force as Form.</p>
            <p>Form bears Trace.</p>
            <p>Trace becomes Signature.</p>
            <p>Signature opens Symbol.</p>
            <p>Symbol reveals Correspondence.</p>
            <p>Correspondence awakens Soul.</p>
            <p>Soul participates through Image and Imagination.</p>
            <p>Imagination prepares Theurgy.</p>
            <p>Theurgy restores Right Relation.</p>
            <p>Right Relation enables Transformation.</p>
            <p>
              Transformation returns Force toward fulfilled Essence,{" "}
              <span className="not-italic text-gold">and, through Essence, back toward Source</span>.
            </p>
          </div>

          <div className="mx-auto mt-20 h-px w-24 bg-gold/50" />
          <p className="mt-12 font-serif text-xl italic text-bone/80 sm:text-2xl">
            The visible is not the opposite of the invisible.
            <br />
            The visible is the invisible <span className="text-gold">brought to rest</span>.
          </p>
          <p className="mt-10 font-label text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            <span lang="el" className="scr-greek">Ω</span> · Kosmos — an ordered beauty — an architecture of hidden forces
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-void py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 sm:flex sm:justify-between">
          <div className="min-w-0 truncate font-serif text-sm italic text-muted-foreground">
            The Architecture of Hidden Forces
          </div>
          <div className="shrink-0 font-label text-[10px] uppercase tracking-[0.4em] text-gold-dim">
            MMXXVI
          </div>
        </div>
      </footer>
    </div>
  );
}
