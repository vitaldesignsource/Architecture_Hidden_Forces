import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RevealText } from "@/components/RevealText";

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

type Principle = {
  num: string;
  greek: string;
  latin: string;
  english: string;
  summary: string;
};

const descent: Principle[] = [
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

const ret: Principle[] = [
  { num: "XIV", greek: "Ἴχνος", latin: "Ichnos", english: "Trace", summary: "The footprint of formation. The first readable residue by which the hidden may be inferred from the visible — a force has passed here." },
  { num: "XV", greek: "Χαρακτήρ", latin: "Charaktēr · Sphragis", english: "Signature", summary: "The engraved seal — trace recognized as meaningful. The outer writing of inward virtue: gesture, geometry, color, habit made readable." },
  { num: "XVI", greek: "Σύμβολον", latin: "Symbolon", english: "Symbol", summary: "The gathering token — signature awakened in consciousness. Not a sign that points, but a vessel that participates in what it means." },
  { num: "XVII", greek: "Συμπάθεια", latin: "Sympatheia · Analogia", english: "Correspondence", summary: "The secret kinship of forms across levels — planet with metal, plant with organ, ritual with world — organized by hidden proportion." },
  { num: "XVIII", greek: "Μεταμόρφωσις", latin: "Metamorphōsis · Metastoicheiōsis", english: "Transformation", summary: "Lawful reordering. Form loosened, force released, essence purified, pattern renewed. Solve et coagula — the return of form to force and its rebirth as higher form." },
];

const all = [...descent, ...ret];

function GeometryField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-[0.18]"
        width="1400"
        height="1400"
        viewBox="-700 -700 1400 1400"
        aria-hidden
      >
        <defs>
          <radialGradient id="goldFade" cx="0" cy="0" r="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="680" fill="none" stroke="url(#goldFade)" strokeWidth="0.5" />
        <circle r="520" fill="none" stroke="oklch(0.78 0.13 75 / 0.3)" strokeWidth="0.5" />
        <circle r="360" fill="none" stroke="oklch(0.78 0.13 75 / 0.35)" strokeWidth="0.5" />
        <circle r="200" fill="none" stroke="oklch(0.78 0.13 75 / 0.4)" strokeWidth="0.5" />
        {Array.from({ length: 18 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 18;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 200}
              y1={Math.sin(a) * 200}
              x2={Math.cos(a) * 680}
              y2={Math.sin(a) * 680}
              stroke="oklch(0.78 0.13 75 / 0.25)"
              strokeWidth="0.4"
            />
          );
        })}
      </svg>

      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin-reverse opacity-[0.22]"
        width="900"
        height="900"
        viewBox="-450 -450 900 900"
        aria-hidden
      >
        <polygon points="0,-260 225,130 -225,130" fill="none" stroke="oklch(0.78 0.13 75 / 0.45)" strokeWidth="0.6" />
        <polygon points="0,260 -225,-130 225,-130" fill="none" stroke="oklch(0.78 0.13 75 / 0.45)" strokeWidth="0.6" />
        <circle r="260" fill="none" stroke="oklch(0.78 0.13 75 / 0.3)" strokeWidth="0.4" />
        <circle r="130" fill="none" stroke="oklch(0.78 0.13 75 / 0.35)" strokeWidth="0.4" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a1 = (i * Math.PI * 2) / 12;
          const a2 = ((i + 1) * Math.PI * 2) / 12;
          return (
            <line
              key={i}
              x1={Math.cos(a1) * 380}
              y1={Math.sin(a1) * 380}
              x2={Math.cos(a2) * 380}
              y2={Math.sin(a2) * 380}
              stroke="oklch(0.78 0.13 75 / 0.4)"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      <svg
        className="absolute -right-32 -top-32 animate-drift opacity-[0.12] sm:opacity-[0.18]"
        width="500"
        height="500"
        viewBox="-250 -250 500 500"
        aria-hidden
      >
        <circle r="240" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
        <circle r="180" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
        <polygon points="0,-200 190,62 117,162 -117,162 -190,62" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      </svg>

      <svg
        className="absolute -bottom-40 -left-40 animate-drift opacity-[0.1] sm:opacity-[0.16]"
        width="600"
        height="600"
        viewBox="-300 -300 600 600"
        style={{ animationDelay: "-9s" }}
        aria-hidden
      >
        <circle r="280" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 7 - Math.PI / 2;
          return (
            <circle
              key={i}
              cx={Math.cos(a) * 140}
              cy={Math.sin(a) * 140}
              r="140"
              fill="none"
              stroke="oklch(0.78 0.13 75 / 0.5)"
              strokeWidth="0.4"
            />
          );
        })}
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}

/**
 * Backdrop — a photographic ground behind a section.
 * The palette is near-black (--void is oklch 0.06), so the image carries as
 * atmosphere rather than picture: dimmed, scrimmed, and faded at top and bottom
 * so the section borders still read as rules rather than as photo edges.
 * Self-contained (-z-10 + its own overflow clip), so no section class changes.
 */
function Backdrop({
  src,
  opacity = 0.3,
  position = "center",
}: {
  src: string;
  opacity?: number;
  position?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        style={{ opacity, objectPosition: position }}
      />
      <div className="absolute inset-0 bg-void/40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--void) 0px, transparent 130px, transparent calc(100% - 130px), var(--void) 100%)",
        }}
      />
    </div>
  );
}

/**
 * WuxingCycles — the Five Phases as the two diagrams they actually are.
 * Generating runs clockwise round the rim; regulating cuts across as a pentagram,
 * each phase checking the one two steps on. Fire sits at the top, as in the
 * traditional arrangement where south is up.
 */
function WuxingCycles() {
  const [sel, setSel] = useState<number | null>(null);
  const C = 190,
    R = 122;
  // clockwise from the top: generating order is the rim itself
  const ph = [
    { z: "火", n: "Fire", ang: -90, d: "Expands and reaches expression.", gen: "yields ash, and ash becomes earth", reg: "melts metal" },
    { z: "土", n: "Earth", ang: -18, d: "Centers, receives, assimilates.", gen: "bears metal in its veins", reg: "dams water" },
    { z: "金", n: "Metal", ang: 54, d: "Contracts, differentiates, defines.", gen: "carries water, condensing it", reg: "cuts wood" },
    { z: "水", n: "Water", ang: 126, d: "Descends, stores, dissolves, prepares renewal.", gen: "nourishes wood", reg: "quenches fire" },
    { z: "木", n: "Wood", ang: 198, d: "Initiates growth and outward emergence.", gen: "feeds fire", reg: "depletes earth, its roots breaking soil" },
  ];
  const pt = (a: number, r = R) => [
    C + r * Math.cos((a * Math.PI) / 180),
    C + r * Math.sin((a * Math.PI) / 180),
  ];
  const short = (i: number, j: number, inset = 30) => {
    const [x0, y0] = pt(ph[i].ang);
    const [x1, y1] = pt(ph[j].ang);
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    return [x0 + ux * inset, y0 + uy * inset, x1 - ux * inset, y1 - uy * inset];
  };
  const cur = sel === null ? null : ph[sel];
  const genOf = (i: number) => (i + 1) % 5;
  const regOf = (i: number) => (i + 2) % 5;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[400px]">
        <style>{`
          .aoh-wx g.node { cursor: pointer; }
          .aoh-wx .rim, .aoh-wx .chord { transition: stroke-opacity 350ms ease; }
          .aoh-wx circle.disc { transition: stroke-opacity 350ms ease, fill-opacity 350ms ease; }
        `}</style>
        <svg viewBox="0 0 380 380" className="aoh-wx h-auto w-full" role="img" aria-labelledby="aoh-wx-t">
          <title id="aoh-wx-t">
            The Five Phases. Generating runs clockwise around the rim — wood feeds fire, fire
            yields earth, earth bears metal, metal carries water, water nourishes wood. Regulating
            crosses the interior as a pentagram, each phase checking the one two steps ahead.
          </title>
          <defs>
            <marker id="aoh-wx-g" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--gold)" fillOpacity="0.8" />
            </marker>
            <marker id="aoh-wx-r" markerWidth="6" markerHeight="6" refX="4.4" refY="2.6" orient="auto">
              <path d="M0,0 L5.2,2.6 L0,5.2 z" fill="var(--muted-foreground)" fillOpacity="0.85" />
            </marker>
          </defs>

          {/* regulating — the pentagram across the interior */}
          {ph.map((_, i) => {
            const j = regOf(i);
            const [x0, y0, x1, y1] = short(i, j, 32);
            const lit = sel === i;
            return (
              <line
                key={`r${i}`}
                className="chord"
                x1={x0} y1={y0} x2={x1} y2={y1}
                stroke="var(--muted-foreground)"
                strokeOpacity={sel === null ? 0.3 : lit ? 0.95 : 0.08}
                strokeWidth={lit ? 1.4 : 0.8}
                strokeDasharray="3 4"
                markerEnd="url(#aoh-wx-r)"
              />
            );
          })}

          {/* generating — the rim */}
          {ph.map((_, i) => {
            const j = genOf(i);
            const [x0, y0, x1, y1] = short(i, j, 31);
            const lit = sel === i;
            return (
              <line
                key={`g${i}`}
                className="rim"
                x1={x0} y1={y0} x2={x1} y2={y1}
                stroke="var(--gold)"
                strokeOpacity={sel === null ? 0.5 : lit ? 1 : 0.14}
                strokeWidth={lit ? 1.8 : 1.1}
                markerEnd="url(#aoh-wx-g)"
              />
            );
          })}

          {ph.map((e, i) => {
            const [x, y] = pt(e.ang);
            const on = sel === i;
            const isGen = sel !== null && genOf(sel) === i;
            const isReg = sel !== null && regOf(sel) === i;
            return (
              <g
                key={e.n}
                className="node"
                onClick={() => setSel(on ? null : i)}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`${e.n} phase`}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : i); }
                }}
              >
                <circle
                  className="disc"
                  cx={x} cy={y} r="29"
                  fill="var(--void)"
                  fillOpacity={on ? 1 : 0.92}
                  stroke={on || isGen ? "var(--gold)" : "var(--muted-foreground)"}
                  strokeOpacity={on ? 1 : isGen ? 0.8 : isReg ? 0.55 : 0.4}
                  strokeWidth={on ? 1.5 : 1}
                  strokeDasharray={isReg ? "3 3" : undefined}
                />
                <text x={x} y={y + 3} textAnchor="middle" className="font-serif" fontSize="19"
                      fill={on || isGen ? "var(--gold)" : "var(--bone)"} fillOpacity={on ? 1 : 0.78}>
                  {e.z}
                </text>
                <text x={x} y={y + 45} textAnchor="middle" className="font-mono" fontSize="8"
                      letterSpacing="1.6" fill="var(--muted-foreground)">
                  {e.n.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-3 flex items-center justify-center gap-6 font-mono text-[9px] uppercase tracking-[0.18em]">
          <span className="flex items-center gap-2 text-gold-dim">
            <span className="inline-block h-px w-6 bg-gold/70" /> generating
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="inline-block h-px w-6 border-t border-dashed border-muted-foreground" /> regulating
          </span>
        </div>
      </div>

      <div className="min-h-[13rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.z} · {cur.n}
            </p>
            <p className="mt-3 font-serif text-2xl italic leading-tight text-bone">{cur.d}</p>
            <div className="mt-6 space-y-4">
              <div className="border-l border-gold/50 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  Generates {ph[genOf(sel!)].n}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {cur.n} {cur.gen}.
                </p>
              </div>
              <div className="border-l border-dashed border-muted-foreground/60 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Regulates {ph[regOf(sel!)].n}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {cur.n} {cur.reg}.
                </p>
              </div>
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-bone/60">
              Regulation is not hostility. It is how no phase becomes absolute.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Two cycles, one figure. Around the rim each phase{" "}
              <span className="text-gold-dim">prepares</span> the next: growth fuels expression,
              expression yields what can be assimilated, assimilation yields defined structure,
              contraction returns substance to storage, storage nourishes new growth.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Across the interior each phase <span className="text-bone/80">checks</span> the one
              two steps ahead — the pentagram that keeps any single movement from running away
              with the whole. Choose a phase to see both of its offices.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * KabbalahFigure — the Tree and the ten cards, sharing one selection.
 * Selecting a vessel on the Tree rings it and lights its card; selecting a card
 * does the same in reverse. The Tree still works with no props, so it degrades
 * to the static figure if ever rendered alone.
 */
function KabbalahFigure() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="mt-24 grid gap-12 lg:grid-cols-[auto_1fr] lg:items-start">
                <TreeOfLife active={active} onSelect={(tr) => setActive((a) => (a === tr ? null : tr))} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                    עֵץ הַחַיִּים · The Ten Sefirot
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      { n: "I", he: "כֶּתֶר", en: "Keter", g: "Crown", d: "First emergence." },
                      { n: "II", he: "חָכְמָה", en: "Chochmah", g: "Wisdom", d: "The seed-flash." },
                      { n: "III", he: "בִּינָה", en: "Binah", g: "Understanding", d: "Womb of structure." },
                      { n: "IV", he: "חֶסֶד", en: "Chesed", g: "Mercy", d: "The outpouring force." },
                      { n: "V", he: "גְּבוּרָה", en: "Gevurah", g: "Severity", d: "The limiting force." },
                      { n: "VI", he: "תִּפְאֶרֶת", en: "Tiferet", g: "Beauty", d: "Harmonizing center." },
                      { n: "VII", he: "נֶצַח", en: "Netzach", g: "Victory", d: "Emotional channel." },
                      { n: "VIII", he: "הוֹד", en: "Hod", g: "Glory", d: "Intellectual channel." },
                      { n: "IX", he: "יְסוֹד", en: "Yesod", g: "Foundation", d: "The subtle base." },
                      { n: "X", he: "מַלְכוּת", en: "Malchut", g: "Kingdom", d: "Embodied form." },
                    ].map((s) => (
                      <button
                        type="button"
                        key={s.en}
                        onClick={() =>
                          setActive((a) => (a === s.en.toUpperCase() ? null : s.en.toUpperCase()))
                        }
                        aria-pressed={active === s.en.toUpperCase()}
                        className={`group border p-4 text-left transition-colors ${
                          active === s.en.toUpperCase()
                            ? "border-gold bg-clay/30"
                            : "border-border hover:border-gold/40"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="font-serif text-2xl text-gold">{s.he}</div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                            {s.n}
                          </div>
                        </div>
                        <div className="mt-2 font-serif text-lg italic text-bone">
                          {s.en} <span className="text-muted-foreground">· {s.g}</span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
  );
}

/**
 * ElementalPairs — the six minglings as the six edges of a complete graph on four
 * elements. The two diagonals cross at Akasha, which is doctrinally exact: it is
 * the interval in which the others meet, not a fifth thing mixing with them.
 */
function ElementalPairs() {
  const [sel, setSel] = useState<number | null>(null);
  const [akasha, setAkasha] = useState(false);
  const N = [
    { k: "Fire", z: "Πῦρ", x: 92, y: 92, verb: "heats, separates, transforms" },
    { k: "Air", z: "Ἀήρ", x: 268, y: 92, verb: "moves, exchanges, communicates" },
    { k: "Water", z: "Ὕδωρ", x: 92, y: 268, verb: "joins, dissolves, receives" },
    { k: "Earth", z: "Γῆ", x: 268, y: 268, verb: "contains, fixes, embodies" },
  ];
  const E = [
    { a: 0, b: 1, t: "Fire · Air", third: "rising current", d: "Naturally amplifying. Air gives Fire movement, oxygen, and reach; Fire warms Air and lifts it. Together: rapid transformation, communication, contagion.", bal: "Inspired intelligence, articulate courage, rapid learning, creative momentum.", exc: "Agitation, argument, racing thought, inflammatory speech, uncontrolled escalation.", note: "Air feeds a fire — but strong or cold movement scatters a weak flame. The relation depends on rhythm." },
    { a: 0, b: 2, t: "Fire · Water", third: "steam", d: "The central polarity. Fire separates, rises, intensifies, reveals distinction; Water joins, descends, moderates, restores continuity.", bal: "Cooking, incubation, digestion, fermentation, tempering, circulation.", exc: "Either quenched inert, or the vessel boiled dry.", note: "Fire must not simply defeat Water. Fire warms Water so it circulates; Water contains Fire so it does not consume the vessel." },
    { a: 0, b: 3, t: "Fire · Earth", third: "ceramic, metal, ash, glass", d: "Fire activates what Earth has fixed — hardening clay, forging metal, releasing what was stored, parting pure material from residue.", bal: "Discipline, craftsmanship, endurance, will made durable — Tejas–Prithivi, the fire of the forge.", exc: "Brittleness, harshness, domination, exhaustion; structures built by relentless pressure.", note: "Earth gives Fire fuel, resistance, and something to act upon. Fire gives Earth transformation." },
    { a: 1, b: 2, t: "Air · Water", third: "mist, foam, wave", d: "Thought and feeling. Air differentiates and names; Water joins and undergoes. Air lets emotion be spoken; Water gives thought depth, attachment, and memory.", bal: "Emotional intelligence, imagination, poetry, empathy, meaningful speech.", exc: "Mood-driven thought, rumination, volatility, ideas that never take stable form.", note: "Air moves across and through Water — waves, currents, evaporation, exchange between surface and atmosphere." },
    { a: 1, b: 3, t: "Air · Earth", third: "instrument, channel, script", d: "Air loosens, aerates, erodes, transports, penetrates; Earth gives Air channels, boundaries, and instruments through which movement becomes useful.", bal: "Practical intelligence — movement governed by structure. Writing, machinery, architecture, nervous systems, lungs, roads.", exc: "Earth traps Air into stagnation, or Air scatters Earth to dust: rigid thinking on one side, ungrounded abstraction on the other.", note: "The pairing that produces every tool and every notation." },
    { a: 2, b: 3, t: "Water · Earth", third: "clay, soil", d: "Water softens Earth into something fertile and mouldable; Earth gives Water a basin, shoreline, or body in which to be retained.", bal: "Dependable care, emotional endurance, organic development, stable relationship.", exc: "Heaviness, stagnation, enmeshment; forms that preserve a past which has stopped nourishing.", note: "Together: soil, nourishment, embodiment, memory, biological continuity." },
  ];
  const P = (i: number) => [N[i].x, N[i].y];
  const cur = sel === null ? null : E[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-el .edge-hit { stroke: transparent; stroke-width: 20; cursor: pointer; fill: none; }
          .aoh-el .edge { transition: stroke-opacity 300ms ease, stroke-width 300ms ease; }
          .aoh-el g.el { cursor: pointer; }
        `}</style>
        <svg viewBox="0 0 360 360" className="aoh-el h-auto w-full" role="img" aria-labelledby="aoh-el-t">
          <title id="aoh-el-t">
            Four elements at the corners and the six minglings between them. The two diagonals
            cross at Akasha, the interval in which the others meet.
          </title>
          {E.map((e, i) => {
            const [x0, y0] = P(e.a);
            const [x1, y1] = P(e.b);
            const on = sel === i;
            return (
              <g key={i}>
                <line
                  className="edge"
                  x1={x0} y1={y0} x2={x1} y2={y1}
                  stroke="var(--gold)"
                  strokeOpacity={sel === null ? 0.34 : on ? 1 : 0.09}
                  strokeWidth={on ? 2 : 1}
                />
                <line
                  className="edge-hit"
                  x1={x0} y1={y0} x2={x1} y2={y1}
                  onClick={() => { setSel(on ? null : i); setAkasha(false); }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${N[e.a].k} with ${N[e.b].k}`}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : i); setAkasha(false); }
                  }}
                />
              </g>
            );
          })}

          {/* Akasha — the crossing, not a fifth mixer */}
          <g className="el" onClick={() => { setAkasha((v) => !v); setSel(null); }} role="button" tabIndex={0}
             aria-label="Akasha, the interval"
             onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setAkasha((v) => !v); setSel(null); } }}>
            <circle cx="180" cy="180" r="26" fill="var(--void)" stroke="var(--gold)"
                    strokeOpacity={akasha ? 0.95 : 0.35} strokeDasharray="3 4" strokeWidth={akasha ? 1.4 : 1} />
            <text x="180" y="185" textAnchor="middle" className="font-serif" fontSize="15"
                  fill="var(--gold)" fillOpacity={akasha ? 1 : 0.6}>Ἀ</text>
          </g>

          {N.map((n, i) => {
            const lit = cur ? cur.a === i || cur.b === i : false;
            return (
              <g key={n.k}>
                <circle cx={n.x} cy={n.y} r="34" fill="var(--void)" />
                <circle cx={n.x} cy={n.y} r="34" fill="none" stroke="var(--gold)"
                        strokeOpacity={lit ? 1 : sel === null ? 0.55 : 0.2} strokeWidth={lit ? 1.5 : 1} />
                <text x={n.x} y={n.y - 2} textAnchor="middle" className="font-serif" fontSize="16"
                      fill="var(--gold)" fillOpacity={lit || sel === null ? 1 : 0.35}>{n.z}</text>
                <text x={n.x} y={n.y + 13} textAnchor="middle" className="font-mono" fontSize="7"
                      letterSpacing="1.4" fill="var(--muted-foreground)">{n.k.toUpperCase()}</text>
              </g>
            );
          })}
        </svg>
        <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          choose an edge · six minglings
        </p>
      </div>

      <div className="min-h-[15rem]">
        {akasha ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">Ἀκάσα · the interval</p>
            <p className="mt-3 font-serif text-2xl italic leading-tight text-bone">
              Akasha does not mix. It is the space of the operation.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              It supplies the openness and capacity in which mixing can occur at all — which is why
              the diagonals cross here. Within Fire it gives revelation; within Air, diffusion
              across distance; within Water, deep receptivity; within Earth, porosity and the empty
              room inside a structure.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/80">
              Without it, forms would have no interior capacity and no relational distance —
              everything compacted, with nowhere for circulation or transformation to happen.
            </p>
          </>
        ) : cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.t} &nbsp;·&nbsp; emergent third: <span className="text-gold">{cur.third}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="border-t border-gold/50 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">In proportion</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cur.bal}</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Out of it</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cur.exc}</p>
              </div>
            </div>
            <p className="mt-5 font-serif italic leading-relaxed text-bone/75">{cur.note}</p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Four elements, and the six ways any two of them can meet. Each mingling produces a{" "}
              <span className="text-gold-dim">third condition</span> reducible to neither
              participant — steam, clay, glass, mist. Relation is capable of producing realities
              contained in neither of its terms.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Choose an edge. Or the ring at the centre, where the diagonals cross.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * PlanetaryFamily — one virtue recurring through unlike vessels.
 * Only the three planets this doctrine develops in full are given chains. The
 * other four carry their § XIII function and are marked as awaiting their
 * correspondences rather than being supplied with invented ones.
 */
function PlanetaryFamily() {
  const [sel, setSel] = useState(0);
  const fam = [
    {
      g: "☉", n: "Sun", virtue: "Centralization, vitality, illumination, radiance, authority — the organization of a system around a governing centre.",
      why: "centrality, radiance, incorruptibility, distribution, sovereign organization",
      chain: [
        ["Celestial", "The Sun", "the virtue at the celestial level"],
        ["Mineral", "Gold", "fixed into incorruptible mineral durability"],
        ["Living", "Solar plants", "embodied through living growth toward light"],
        ["Bodily", "The heart", "the centre a body organizes around and distributes from"],
        ["Imaginal", "The circle · the crown · kingship", "concentrated into an intelligible image"],
      ],
    },
    {
      g: "♄", n: "Saturn", virtue: "Contraction, boundary, duration, weight, consequence, age, crystallization — the preservation of form through limitation.",
      why: "density, endurance, restriction, severance, the slow work of time",
      chain: [
        ["Celestial", "Saturn", "the virtue at the celestial level"],
        ["Mineral", "Lead · stone", "density and weight made mineral"],
        ["Living", "Roots", "the downward, holding, slow-growing part"],
        ["Bodily", "The bones", "what endures, defines, and outlasts the soft"],
        ["Imaginal", "The sickle · the hourglass · enclosed places", "severance and measured time as image"],
      ],
    },
    {
      g: "♂", n: "Mars", virtue: "Heat, assertion, incision, division, conflict, protection — directed force.",
      why: "the capacity to cut, defend, inflame, penetrate, or act decisively",
      chain: [
        ["Celestial", "Mars", "the virtue at the celestial level"],
        ["Mineral", "Iron", "hardness that takes and holds an edge"],
        ["Living", "Thorns · pungent plants", "growth that defends and inflames"],
        ["Bodily", "Muscular exertion · blood", "the body's capacity for force and defence"],
        ["Imaginal", "Blades · martial symbols", "decisive division as image"],
      ],
    },
  ];
  const pending = [
    ["☾", "Moon", "reception, memory, habit, embodiment, fluctuation"],
    ["☿", "Mercury", "translation, mediation, communication, exchange"],
    ["♀", "Venus", "attraction, affinity, valuation, harmony, combination"],
    ["♃", "Jupiter", "expansion, authorization, synthesis, increase"],
  ];
  const cur = fam[sel];

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {fam.map((f, i) => (
          <button
            key={f.n}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`flex items-baseline gap-3 border px-5 py-3 transition-colors ${
              sel === i ? "border-gold bg-clay/30 text-gold" : "border-border text-muted-foreground hover:border-gold/40"
            }`}
          >
            <span className="font-serif text-xl">{f.g}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">{f.n}</span>
          </button>
        ))}
      </div>

      <p className="mt-8 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/90">
        {cur.virtue}
      </p>

      <div className="mt-8 space-y-px">
        {cur.chain.map(([level, expr, note], i) => (
          <div
            key={level}
            className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-border py-4 sm:grid-cols-[7rem_minmax(0,16rem)_1fr] sm:gap-6"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              {level}
            </span>
            <span className={`font-serif text-lg ${i === 0 ? "text-gold" : "text-bone/90"}`}>
              {expr}
            </span>
            <span className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1">
              {note}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        These belong to one family through{" "}
        <span className="text-gold-dim">{cur.why}</span> — not because they are secretly the same
        object. Ritual is their deliberate convergence: the sixth term, gathering the others into
        one operation.
      </p>

      <div className="mt-10 border-t border-border pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Awaiting their chains
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pending.map(([g, n, f]) => (
            <div key={n} className="border border-dashed border-border/70 p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-lg italic text-bone/70">{n}</span>
                <span className="text-lg text-gold-dim">{g}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-[11px] leading-relaxed text-muted-foreground">
          Their celestial functions are given in § XIII. Their metals, plants, organs, and images
          are not yet set down, and are left open rather than filled in.
        </p>
      </div>
    </div>
  );
}

/**
 * ThreeNadis — Ida and Pingala crossing a central Sushumna.
 * The curves are generated so their zero-crossings land exactly on the nodes,
 * which is the whole point of the figure: the nodes are where the two polar
 * currents meet the axis, not decoration placed along it.
 */
function ThreeNadis() {
  const [sel, setSel] = useState<number | null>(null);
  const MID = 150, TOP = 78, BOT = 542, AMP = 54, HALF = 80;
  const nodes = [102, 182, 262, 342, 422, 502];
  const pts = (sign: number) => {
    const out: string[] = [];
    for (let y = TOP; y <= BOT; y += 3) {
      const x = MID + sign * AMP * Math.sin(((y - nodes[0]) * Math.PI) / HALF);
      out.push(`${x.toFixed(1)},${y}`);
    }
    return out.join(" ");
  };
  const ch = [
    { k: "Ida", z: "इडा", t: "The lunar current", d: "Cools, receives, stores, reflects, nourishes, remembers — it returns activity toward interiority. Affinities with Apas, the Moon, yin, gestation, imagination, memory.", n: "Not merely watery or passive. It can carry every tattva; its tendency is to internalize whatever it carries. Tejas through Ida becomes inward digestion, contemplative illumination, banked warmth.", l: "the path of interiorization" },
    { k: "Pingala", z: "पिङ्गला", t: "The solar current", d: "Warms, activates, differentiates, expresses, mobilizes — it carries force toward action. Affinities with Tejas, the Sun, yang, will, metabolism, alertness.", n: "Not simply good energy. Unregulated solar activity becomes agitation, overexertion, inflammation, continual externalization. Apas through Pingala becomes outward nurture; Prithivi becomes labour and defence.", l: "the path of exteriorization" },
    { k: "Sushumna", z: "सुषुम्ना", t: "The central axis", d: "Not a third current placed between two others but a different condition of organization. Ida and Pingala ordinarily alternate and regulate one another; Sushumna becomes operative when their opposition is balanced enough for activity to reorganize around an axis.", n: "An emergent centrality. It does not destroy the lunar and solar currents — it gathers their complementary powers into a higher order. Ida receives, Pingala expresses, Sushumna integrates.", l: "the capacity to hold polarity without fragmentation" },
  ];
  const cur = sel === null ? null : ch[sel];
  const dim = (i: number) => (sel === null ? 1 : sel === i ? 1 : 0.16);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[300px]">
        <svg viewBox="0 0 300 620" className="h-auto w-full" role="img" aria-labelledby="aoh-nd-t">
          <title id="aoh-nd-t">
            Ida and Pingala winding about a central Sushumna, meeting the axis at six nodes.
          </title>
          {/* Sushumna */}
          <g style={{ opacity: dim(2) }}>
            <line x1={MID} y1={TOP} x2={MID} y2={BOT} stroke="var(--gold)"
                  strokeOpacity={sel === 2 ? 1 : 0.55} strokeWidth={sel === 2 ? 2.2 : 1.4} />
          </g>
          {/* Ida */}
          <polyline points={pts(-1)} fill="none" stroke="var(--bone)"
                    strokeOpacity={sel === 0 ? 0.95 : 0.42} strokeWidth={sel === 0 ? 2 : 1.2}
                    style={{ opacity: dim(0) }} />
          {/* Pingala */}
          <polyline points={pts(1)} fill="none" stroke="var(--gold)"
                    strokeOpacity={sel === 1 ? 1 : 0.5} strokeWidth={sel === 1 ? 2 : 1.2}
                    style={{ opacity: dim(1) }} />
          {/* nodes: where both currents meet the axis */}
          {nodes.map((y, i) => (
            <g key={y}>
              <circle cx={MID} cy={y} r="13" fill="var(--void)" stroke="var(--gold)"
                      strokeOpacity="0.5" strokeWidth="0.9" />
              <circle cx={MID} cy={y} r="3" fill="var(--gold)" fillOpacity="0.55" />
              <text x={MID + 26} y={y + 3} className="font-mono" fontSize="7"
                    letterSpacing="1.2" fill="var(--muted-foreground)">
                {["I", "II", "III", "IV", "V", "VI"][i]}
              </text>
            </g>
          ))}
          {/* hit areas */}
          {[0, 1, 2].map((i) => (
            <polyline
              key={i}
              points={i === 2 ? `${MID},${TOP} ${MID},${BOT}` : pts(i === 0 ? -1 : 1)}
              fill="none"
              stroke="transparent"
              strokeWidth="26"
              style={{ cursor: "pointer" }}
              onClick={() => setSel(sel === i ? null : i)}
              role="button"
              tabIndex={0}
              aria-label={ch[i].k}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(sel === i ? null : i); }
              }}
            />
          ))}
          <text x={MID} y={568} textAnchor="middle" className="font-mono" fontSize="7.5"
                letterSpacing="2" fill="var(--muted-foreground)">SIX NODES</text>
        </svg>
        <div className="mt-3 flex flex-wrap justify-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em]">
          {ch.map((c, i) => (
            <button key={c.k} type="button" onClick={() => setSel(sel === i ? null : i)}
              aria-pressed={sel === i}
              className={`transition-colors ${sel === i ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
              {c.k}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[14rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.z} · {cur.k} — {cur.t}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-4 text-sm leading-relaxed text-bone/80">{cur.n}</p>
            <p className="mt-5 border-t border-border pt-4 font-serif text-lg italic text-gold/90">
              {cur.l}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A nadi is not the current. It is{" "}
              <span className="text-gold-dim">the path that conditions the current</span> — a
              relatively stable pathway of low formative resistance through which pranic activity
              repeatedly circulates.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              More riverbed than water. The channel stays relatively stable while its contents
              change: the same pathway may carry a Vayu current on one day and a Tejas current on
              another.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/80">
              The Solar Flywheel supplies momentum, Sushumna supplies axial direction, and the
              Inner Sun supplies governing purpose. Choose a channel.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * CentersAxis — six centres on the axis and the crown above them, which is the
 * traditional arrangement rather than seven identical wheels in a series. The
 * ascent/descent toggle is not decoration: the doctrine holds that a complete
 * theurgy requires both directions, so the figure has to be readable both ways.
 */
function CentersAxis() {
  const [sel, setSel] = useState<number | null>(null);
  const [dir, setDir] = useState<"up" | "down">("up");
  const MID = 150;
  const C = [
    { k: "Crown", s: "सहस्रार", tr: "Sahasrāra", y: 62, crown: true,
      q: "Can the individual participate in an order greater than itself without losing the capacity for embodiment?",
      op: "Spiritual participation", tat: "Akasha", eth: "Root Ether resonance", al: "Opening beyond fixation",
      n: "A gate of participation, not a tank of infinite energy. It has an affinity with Root Ether — both concern an openness prior to particular form — but they are not identical: Root Ether is the primordial medium, the crown is this vessel's opening toward it." },
    { k: "Brow", s: "आज्ञा", tr: "Ājñā", y: 152,
      q: "Can the form perceive its situation and orient itself toward an intelligible pattern?",
      op: "Vision and direction", tat: "Akasha–Tejas", eth: "Light Ether", al: "Clarified Mercury",
      n: "It does not merely see hidden things; it organizes what is seen into meaning. And an image can be distorted or false, so vision requires error correction — tested against relationship, consequence, and the governing centre." },
    { k: "Throat", s: "विशुद्ध", tr: "Viśuddha", y: 242,
      q: "Can the inner pattern be translated into a communicable form?",
      op: "Purification and expression", tat: "Akasha–Vayu", eth: "Tone Ether", al: "Mercury",
      n: "A centre of symbolic causation: speech promises, commands, names, blesses, consecrates. But expression is not automatically truthful — confused emotion becomes accusation, inflated vision becomes proclamation. Not the ability to speak, but to give an inner reality an appropriate outer form." },
    { k: "Heart", s: "अनाहत", tr: "Anāhata", y: 332,
      q: "Can this form participate in another without either consuming it or disappearing into it?",
      op: "Relation and circulation", tat: "Vayu–Apas", eth: "Tone and Life", al: "Mercury balancing Sulfur",
      n: "Not only pleasant feeling — it must also process loss, obligation, and vulnerability. Power entering the heart becomes accountable to relationship; vision becomes compassion rather than abstraction. The heart is where force learns reciprocity." },
    { k: "Solar plexus", s: "मणिपूर", tr: "Maṇipūra", y: 422,
      q: "Can this form transform what it receives into its own activity?",
      op: "Assimilation and power", tat: "Tejas", eth: "Warmth Ether", al: "Sulfur",
      n: "Digestion is the clearest image: receive the foreign, break it apart, separate usable from unusable, convert it to one's own substance. It supplies much of Ignisophia's heat but is not the Inner Sun — the furnace generates heat, the Sun governs its use." },
    { k: "Sacral", s: "स्वाधिष्ठान", tr: "Svādhiṣṭhāna", y: 512,
      q: "Can this form produce, combine, and become more than it presently is?",
      op: "Generation and cohesion", tat: "Apas", eth: "Life and Tone", al: "Mercury within Salt",
      n: "Not reducible to sexuality — that is one expression of a wider generative power that also produces art, attachment, fantasy, and new relationship. This is the centre of generative surplus: two people produce a relationship with a Morphaithēr of its own." },
    { k: "Root", s: "मूलाधार", tr: "Mūlādhāra", y: 602,
      q: "Can this form remain present?",
      op: "Embodiment and boundary", tat: "Prithivi", eth: "Life Ether", al: "Salt",
      n: "The personal entrance into the Crypt: ancestry, family pattern, bodily memory, survival response and deep habit all enter through root organization. The past is not merely recalled but embodied as posture, expectation, rhythm, and instinct." },
  ];
  const cur = sel === null ? null : C[sel];
  const order = dir === "up" ? [...C].reverse() : C;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[320px]">
        <svg viewBox="0 0 300 660" className="h-auto w-full" role="img" aria-labelledby="aoh-cx-t">
          <title id="aoh-cx-t">
            Six centres along the central channel with the crown above them, and the two
            directions of the circuit: ascent as refinement, descent as embodiment.
          </title>
          <defs>
            <marker id="aoh-cx-a" markerWidth="7" markerHeight="7" refX="4.6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--gold)" fillOpacity="0.8" />
            </marker>
          </defs>
          {/* the axis proper joins the six; the crown sits above it */}
          <line x1={MID} y1={152} x2={MID} y2={602} stroke="var(--gold)" strokeOpacity="0.4" strokeWidth="1.2" />
          <line x1={MID} y1={92} x2={MID} y2={142} stroke="var(--gold)" strokeOpacity="0.3"
                strokeWidth="1" strokeDasharray="3 5" />
          {/* direction of the circuit */}
          <line
            x1={MID - 44} y1={dir === "up" ? 580 : 180} x2={MID - 44} y2={dir === "up" ? 180 : 580}
            stroke="var(--gold)" strokeOpacity="0.5" strokeWidth="1" markerEnd="url(#aoh-cx-a)"
          />
          <text x={MID - 50} y={dir === "up" ? 372 : 372} textAnchor="end" className="font-mono"
                fontSize="7" letterSpacing="1.4" fill="var(--muted-foreground)">
            {dir === "up" ? "REFINE" : "EMBODY"}
          </text>

          {C.map((c, i) => {
            const on = sel === i;
            return (
              <g key={c.k} style={{ cursor: "pointer" }}
                 onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={c.k}
                 onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={MID} cy={c.y} r={c.crown ? 22 : 19} fill="var(--void)" />
                <circle cx={MID} cy={c.y} r={c.crown ? 22 : 19} fill="none" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : c.crown ? 0.5 : 0.6} strokeWidth={on ? 1.8 : 1}
                        strokeDasharray={c.crown ? "4 4" : undefined} />
                {on ? <circle cx={MID} cy={c.y} r={c.crown ? 30 : 27} fill="none" stroke="var(--gold)" strokeOpacity="0.4" strokeWidth="0.8" /> : null}
                <circle cx={MID} cy={c.y} r="3.4" fill="var(--gold)" fillOpacity={on ? 1 : 0.5} />
                <text x={MID + 34} y={c.y - 2} className="font-serif" fontSize="12"
                      fill={on ? "var(--gold)" : "var(--bone)"} fillOpacity={on ? 1 : 0.75}>{c.s}</text>
                <text x={MID + 34} y={c.y + 11} className="font-mono" fontSize="6.8" letterSpacing="1.2"
                      fill="var(--muted-foreground)">{c.k.toUpperCase()}</text>
              </g>
            );
          })}
          <text x={MID} y={636} textAnchor="middle" className="font-mono" fontSize="7"
                letterSpacing="1.8" fill="var(--muted-foreground)">SIX ON THE AXIS · CROWN ABOVE</text>
        </svg>
        <div className="mt-3 flex justify-center gap-5 font-mono text-[9px] uppercase tracking-[0.18em]">
          {(["up", "down"] as const).map((d) => (
            <button key={d} type="button" onClick={() => setDir(d)} aria-pressed={dir === d}
              className={`transition-colors ${dir === d ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
              {d === "up" ? "Ascent · refinement" : "Descent · embodiment"}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[16rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.s} · {cur.tr} — {cur.op}
            </p>
            <p className="mt-4 font-serif text-xl italic leading-relaxed text-bone">{cur.q}</p>
            <div className="mt-5 grid grid-cols-3 gap-3 border-y border-border py-4 text-[11px] leading-snug">
              <div><div className="font-mono uppercase tracking-[0.15em] text-muted-foreground">Tattva</div><div className="mt-1 text-bone/85">{cur.tat}</div></div>
              <div><div className="font-mono uppercase tracking-[0.15em] text-muted-foreground">Ether</div><div className="mt-1 text-bone/85">{cur.eth}</div></div>
              <div><div className="font-mono uppercase tracking-[0.15em] text-muted-foreground">Alchemy</div><div className="mt-1 text-bone/85">{cur.al}</div></div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cur.n}</p>
          </>
        ) : (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {dir === "up" ? "Ascent · refinement" : "Descent · embodiment"}
            </p>
            <div className="mt-4 space-y-px">
              {order.map((c) => (
                <div key={c.k} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-border py-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-dim">{c.k}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{c.op}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-bone/80">
              Ascent without descent gives revelation without embodiment; descent without ascent
              gives activity without orientation.{" "}
              <span className="text-gold-dim">A complete theurgy requires both.</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function SectionGlyph({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-[0.06]"
      width="800"
      height="800"
      viewBox="-400 -400 800 800"
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <circle r="380" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      <circle r="260" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      <polygon points="0,-340 295,170 -295,170" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      <polygon points="0,340 -295,-170 295,-170" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
    </svg>
  );
}

function PrincipleCard({ p, accent }: { p: Principle; accent: "descent" | "return" }) {
  return (
    <article className="group relative overflow-hidden border border-border bg-void/40 p-8 backdrop-blur-sm transition-colors hover:bg-clay/40 sm:p-10">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
          {p.num} · {accent === "descent" ? "Descent" : "Return"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {p.english}
        </span>
      </div>
      <h3 className="font-serif text-4xl leading-none text-bone sm:text-5xl">{p.greek}</h3>
      <p className="mt-2 font-serif text-lg italic text-gold/80">{p.latin}</p>
      <div className="my-6 h-px w-12 bg-gold/40 transition-all duration-700 group-hover:w-24" />
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{p.summary}</p>
    </article>
  );
}




/**
 * EtherCircuit — the Fourfold Field as what the doctrine says it is: a circuit.
 * The section states "this is a circuit, not a ladder", then rendered a ladder.
 * Four vessels on a ring, the return arc from Life back to Warmth drawn heavier
 * than the rest, because that arc is the whole claim.
 */
function EtherCircuit() {
  const [active, setActive] = useState<number | null>(null);
  const R = 132;
  const C = 210;
  const ethers = [
    { k: "Warmth", greek: "Θερμότης", verb: "quickens", ang: -90, virtue: "measured warmth", low: "Dormancy", high: "Fever", fn: "Possibility ceases to be merely possible. The first asymmetry — a gradient across which movement becomes possible." },
    { k: "Light", greek: "Φῶς", verb: "articulates", ang: 0, virtue: "right articulation", low: "Force without orientation", high: "Fragmented field", fn: "Difference becomes perceptible enough to enter relation. Orientation, contrast, boundary, intelligible space." },
    { k: "Tone", greek: "Τόνος", verb: "coordinates", ang: 90, virtue: "living proportion", low: "Incoherence, mistiming", high: "Rigidity, mechanical repeat", fn: "Differentiated powers enter measured relation — affinity, interval, proportion, rhythm. It joins and it divides." },
    { k: "Life", greek: "Ζωή", verb: "regenerates", ang: 180, virtue: "regenerative wholeness", low: "Fragmentation, exhaustion", high: "Enclosure, a preserved distortion", fn: "Relations become a self-renewing whole — and the whole becomes the vessel of new potential, returning the cycle to Warmth." },
  ];
  const pt = (a: number, r = R) => [
    C + r * Math.cos((a * Math.PI) / 180),
    C + r * Math.sin((a * Math.PI) / 180),
  ];
  // arc from ether i to the next, inset so it stops short of each vessel
  const arc = (i: number) => {
    const a0 = ethers[i].ang + 17;
    const a1 = ethers[(i + 1) % 4].ang - 17;
    const [x0, y0] = pt(a0);
    const [x1, y1] = pt(a1 < a0 ? a1 + 360 : a1);
    return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  const sel = active === null ? null : ethers[active];

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <style>{`
        .aoh-ec-arc { stroke: var(--gold); stroke-opacity: 0.28; fill: none; }
        .aoh-ec-arc.aoh-ec-return { stroke-opacity: 0.62; }
        .aoh-ec-node { cursor: pointer; }
        .aoh-ec-node circle.aoh-ec-rim { transition: stroke-opacity 400ms ease, r 400ms ease; }
        .aoh-ec-node:hover circle.aoh-ec-rim, .aoh-ec-node.is-on circle.aoh-ec-rim { stroke-opacity: 1; }
        .aoh-ec-halo { transition: opacity 500ms ease; }
        .aoh-ec-node:hover .aoh-ec-halo, .aoh-ec-node.is-on .aoh-ec-halo { opacity: 1; }
        .aoh-ec-spark { animation: aoh-ec-travel 22s linear infinite; }
        @keyframes aoh-ec-travel { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .aoh-ec-spark { animation: none; } }
      `}</style>
      <svg viewBox="0 0 420 420" className="h-auto w-full" role="img" aria-labelledby="aoh-ec-t">
        <title id="aoh-ec-t">
          The four ethers as a closed circuit: Warmth quickens, Light articulates, Tone
          coordinates, Life regenerates — and Life returns the cycle to Warmth.
        </title>
        <defs>
          <radialGradient id="aoh-ec-halo">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.34" />
            <stop offset="70%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.05" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <marker id="aoh-ec-tip" markerWidth="7" markerHeight="7" refX="4.6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill="var(--gold)" fillOpacity="0.75" />
          </marker>
        </defs>

        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--gold)" strokeOpacity="0.08" strokeWidth="0.8" />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={arc(i)}
            className={`aoh-ec-arc${i === 3 ? " aoh-ec-return" : ""}`}
            strokeWidth={i === 3 ? 1.5 : 1}
            markerEnd="url(#aoh-ec-tip)"
          />
        ))}
        <g className="aoh-ec-spark" style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C + R} cy={C} r="2.6" fill="var(--bone)" opacity="0.5" />
        </g>

        {ethers.map((e, i) => {
          const [x, y] = pt(e.ang);
          const on = active === i;
          return (
            <g
              key={e.k}
              className={`aoh-ec-node${on ? " is-on" : ""}`}
              onClick={() => setActive(on ? null : i)}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  setActive(on ? null : i);
                }
              }}
            >
              <circle className="aoh-ec-halo" cx={x} cy={y} r="46" fill="url(#aoh-ec-halo)" opacity={on ? 1 : 0.35} />
              <circle cx={x} cy={y} r="30" fill="var(--void)" />
              <circle
                className="aoh-ec-rim"
                cx={x}
                cy={y}
                r="30"
                fill="none"
                stroke="var(--gold)"
                strokeOpacity={on ? 1 : 0.5}
                strokeWidth="1"
              />
              <text x={x} y={y - 2} textAnchor="middle" className="font-serif" fontSize="15" fill="var(--gold)">
                {e.greek}
              </text>
              <text x={x} y={y + 13} textAnchor="middle" className="font-mono" fontSize="7" letterSpacing="1.4" fill="var(--muted-foreground)">
                {e.k.toUpperCase()}
              </text>
              <text x={x} y={y + 48} textAnchor="middle" className="font-serif" fontSize="10" fontStyle="italic" fill="var(--bone)" opacity="0.6">
                {e.verb}
              </text>
            </g>
          );
        })}

        <text x={C} y={C - 8} textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="2.4" fill="var(--gold-dim)">
          ΚΥΚΛΟΣ
        </text>
        <text x={C} y={C + 8} textAnchor="middle" className="font-serif" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
          the circuit
        </text>
      </svg>

      <div className="mt-4 min-h-[8.5rem] border-t border-border pt-5">
        {sel ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
              {sel.greek} · {sel.k} {sel.verb}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sel.fn}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] leading-snug">
              <div>
                <div className="font-mono uppercase tracking-[0.15em] text-muted-foreground">Deficiency</div>
                <div className="mt-1 text-muted-foreground">{sel.low}</div>
              </div>
              <div>
                <div className="font-mono uppercase tracking-[0.15em] text-gold">Virtue</div>
                <div className="mt-1 font-serif italic text-bone/90">“{sel.virtue}”</div>
              </div>
              <div>
                <div className="font-mono uppercase tracking-[0.15em] text-muted-foreground">Excess</div>
                <div className="mt-1 text-muted-foreground">{sel.high}</div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            Warmth quickens. Light articulates. Tone coordinates. Life regenerates — and the living
            whole becomes the vessel of new potential, which is the heavier arc returning to Warmth.{" "}
            <span className="text-gold-dim">Choose a vessel.</span>
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * SubTattvaMatrix — the twenty-five as something you operate rather than read.
 * Selecting a cell names the compound; Swap jumps to its transpose, which is the
 * fastest way to feel that Apas-Tejas and Tejas-Apas are not the same thing.
 */
function SubTattvaMatrix() {
  const T = ["Akasha", "Vayu", "Tejas", "Apas", "Prithivi"];
  const ABBR = ["Ak", "Va", "Te", "Ap", "Pr"];
  const M = [
    ["Pure openness and resonance", "Communicating or vibrating space", "Luminous, activated possibility", "Receptive or gestational space", "Bounded or structured space"],
    ["Diffusion through an open field", "Pure movement and variability", "Accelerated, sharp, heated motion", "Circulation, currents, flowing exchange", "Controlled, patterned, mechanical movement"],
    ["Radiant potential and revelation", "Spreading heat and rapid excitation", "Concentrated ignition and transformation", "Incubatory, digestive, cohesive warmth", "Fixed heat — forging, tempering, crystallization"],
    ["Open receptivity and subtle continuity", "Oscillation, waves, mobile currents", "Fermentation, passion, heated cohesion", "Deep blending, gestation, union", "Condensation, coagulation, organic density"],
    ["Porous, resonant, meaning-bearing form", "Flexible structure, embodied movement", "Activated matter, pressure, tempered form", "Nourishing, plastic, organic embodiment", "Maximum fixation, density, boundary, endurance"],
  ];
  const [sel, setSel] = useState<[number, number] | null>(null);
  const [hov, setHov] = useState<[number, number] | null>(null);
  const cur = sel ?? hov;

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
        The twenty-five · dominant down, modifier across
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <div>
          <div className="grid grid-cols-[2.6rem_repeat(5,minmax(0,1fr))] gap-px">
            <div />
            {T.map((t, j) => (
              <div
                key={t}
                className={`pb-2 text-center font-mono text-[9px] uppercase tracking-[0.12em] transition-colors sm:text-[10px] ${
                  cur && cur[1] === j ? "text-gold" : "text-gold-dim"
                }`}
              >
                {t}
              </div>
            ))}
            {T.map((dom, i) => (
              <div key={dom} className="contents">
                <div
                  className={`flex items-center pr-2 text-right font-mono text-[9px] uppercase tracking-[0.12em] transition-colors sm:text-[10px] ${
                    cur && cur[0] === i ? "text-gold" : "text-gold-dim"
                  }`}
                >
                  {dom}
                </div>
                {T.map((mod, j) => {
                  const on = sel && sel[0] === i && sel[1] === j;
                  const inLine = cur && (cur[0] === i || cur[1] === j);
                  const diag = i === j;
                  return (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setSel(on ? null : [i, j])}
                      onMouseEnter={() => setHov([i, j])}
                      onMouseLeave={() => setHov(null)}
                      aria-pressed={!!on}
                      aria-label={`${dom} dominant, ${mod} modifier`}
                      className={`aspect-square border text-center font-mono text-[9px] uppercase tracking-[0.06em] transition-all duration-200 sm:text-[10px] ${
                        on
                          ? "border-gold bg-gold/15 text-gold"
                          : inLine
                            ? "border-gold/40 text-bone/85"
                            : diag
                              ? "border-border bg-clay/30 text-bone/70"
                              : "border-border text-muted-foreground hover:border-gold/40"
                      }`}
                    >
                      {ABBR[i]}·{ABBR[j]}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            the diagonal is each tendency in its most direct form
          </p>
        </div>

        <div className="min-h-[13rem] border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {cur ? (
            <>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                {cur[0] === cur[1] ? "Undiluted" : "Dominant · Modifier"}
              </p>
              <p className="mt-3 font-serif text-2xl italic leading-tight text-gold">
                {T[cur[0]]}–{T[cur[1]]}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{M[cur[0]][cur[1]]}</p>
              {cur[0] !== cur[1] ? (
                <div className="mt-6 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={() => setSel([cur[1], cur[0]])}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim transition-colors hover:text-gold"
                  >
                    ⇄ &nbsp;Swap to {T[cur[1]]}–{T[cur[0]]}
                  </button>
                  <p className="mt-3 text-sm italic leading-relaxed text-bone/70">
                    {M[cur[1]][cur[0]]}
                  </p>
                  <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                    The same two tendencies, reversed — and a different thing entirely.
                  </p>
                </div>
              ) : (
                <p className="mt-6 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
                  On the diagonal a tendency modifies only itself. There is nothing to swap.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Each primary tattva contains all five within itself. Choose a cell — dominant from the
              left, modifier from the top — then swap it, and the asymmetry becomes obvious.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function TreeOfLife({
  active = null,
  onSelect,
}: {
  active?: string | null;
  onSelect?: (tr: string) => void;
} = {}) {
  // Portrait canvas, 300 × 660. Pillar of Mercy on the right AS DEPICTED.
  const MID = 150;
  const RIGHT = 248; // Pillar of Mercy    — Chochmah · Chesed · Netzach
  const LEFT = 52; //  Pillar of Severity  — Binah · Gevurah · Hod
  const R_NODE = 20;
  const R_HALO = 34;

  // Flash-arrival time per sefirah, in seconds. Derived from cumulative arc length
  // along the flash polyline (total 1401.36u) inverted through the animation's own
  // cubic-bezier(0.65,0,0.35,1), scaled to the 8.8s draw (the 55% keyframe).
  // Previously these were index-linear (0.5 + i*0.85), which made six of ten vessels
  // ignite BEFORE the light reached them — up to 1.21s early at Binah.
  const IGNITE_AT = [0.0, 2.42, 3.41, 4.06, 4.5, 4.78, 5.11, 5.86, 6.71, 8.8];

  // Must match the stacks Tailwind emits for font-serif/font-mono, or the tree's
  // Hebrew resolves to a different face than the byte-identical Hebrew in the
  // cards beside it. (var(--font-serif) does NOT work here: @theme inline inlines
  // into utility classes and never emits the custom property, so it silently
  // falls back to the inherited sans stack.)
  const SERIF = '"EB Garamond", ui-serif, Georgia, serif';
  const MONO =
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

  type Sefirah = {
    id: string;
    rn: string;
    he: string;
    tr: string;
    en: string;
    x: number;
    y: number;
  };

  const nodes: Sefirah[] = [
    { id: "1", rn: "I", he: "כֶּתֶר", tr: "KETER", en: "Crown", x: MID, y: 68 },
    { id: "2", rn: "II", he: "חָכְמָה", tr: "CHOCHMAH", en: "Wisdom", x: RIGHT, y: 148 },
    { id: "3", rn: "III", he: "בִּינָה", tr: "BINAH", en: "Understanding", x: LEFT, y: 148 },
    { id: "4", rn: "IV", he: "חֶסֶד", tr: "CHESED", en: "Mercy", x: RIGHT, y: 262 },
    { id: "5", rn: "V", he: "גְּבוּרָה", tr: "GEVURAH", en: "Severity", x: LEFT, y: 262 },
    { id: "6", rn: "VI", he: "תִּפְאֶרֶת", tr: "TIFERET", en: "Beauty", x: MID, y: 336 },
    { id: "7", rn: "VII", he: "נֶצַח", tr: "NETZACH", en: "Victory", x: RIGHT, y: 416 },
    { id: "8", rn: "VIII", he: "הוֹד", tr: "HOD", en: "Glory", x: LEFT, y: 416 },
    { id: "9", rn: "IX", he: "יְסוֹד", tr: "YESOD", en: "Foundation", x: MID, y: 490 },
    { id: "10", rn: "X", he: "מַלְכוּת", tr: "MALCHUT", en: "Kingdom", x: MID, y: 578 },
  ];

  // The 22 paths of the traditional (Kircher) Tree — Aleph through Tav.
  const paths: [string, string][] = [
    ["1", "2"], ["1", "3"], ["1", "6"], ["2", "3"], ["2", "4"], ["2", "6"],
    ["3", "5"], ["3", "6"], ["4", "5"], ["4", "6"], ["4", "7"], ["5", "6"],
    ["5", "8"], ["6", "7"], ["6", "8"], ["6", "9"], ["7", "8"], ["7", "9"],
    ["7", "10"], ["8", "9"], ["8", "10"], ["9", "10"],
  ];

  const find = (id: string) => nodes.find((n) => n.id === id)!;
  // Da'at sits in the Abyss on the middle pillar. y=182, not the geometric
  // midpoint 205: the flash's Binah->Chesed segment crosses x=150 at y=205, so
  // at 205 a 5px animated glow bisected the ring (clearance 0.86u). Perpendicular
  // clearance needs > 18.5u (r16 + half the 5px glow); y=182 gives 19.88u.
  const daat = { x: MID, y: 182 };

  // The lightning flash — the order of emanation, Keter down to Malchut.
  const flash = nodes.map((n) => `${n.x},${n.y}`).join(" ");

  // Three veils of negative existence, arcing above the Crown.
  const veil = (r: number) => {
    const k = find("1");
    const dx = r * Math.cos(Math.PI / 12);
    const dy = r * Math.sin(Math.PI / 12);
    return `M ${(k.x - dx).toFixed(2)} ${(k.y - dy).toFixed(2)} A ${r} ${r} 0 0 1 ${(k.x + dx).toFixed(2)} ${(k.y - dy).toFixed(2)}`;
  };

  const css = `
.aolt-svg text { paint-order: stroke; stroke-linejoin: round; }
@keyframes aolt-descend {
  0%   { stroke-dashoffset: 1000; opacity: 0; }
  5%   { opacity: 1; }
  55%  { stroke-dashoffset: 0; opacity: 1; }
  82%  { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
@keyframes aolt-ignite {
  0%   { opacity: 0; }
  4%   { opacity: 1; }
  22%  { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes aolt-pulse {
  0%, 100% { stroke-opacity: 0.20; }
  50%      { stroke-opacity: 0.52; }
}
.aolt-descent { animation: aolt-descend 16s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
.aolt-path    { animation: aolt-pulse 16s ease-in-out infinite; }
.aolt-ignite  { animation: aolt-ignite 16s ease-in-out infinite; }
.aolt-node    { transition: opacity 700ms ease; }
.aolt-sel     { transition: stroke-opacity 350ms ease; }
.aolt-node.is-sel .aolt-sel { stroke-opacity: 0.9; }
.aolt-svg:hover .aolt-node.is-sel { opacity: 1; }
@media (hover: hover) and (pointer: fine) {
  .aolt-svg:hover .aolt-node { opacity: 0.45; }
  .aolt-svg .aolt-node:hover { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .aolt-svg .aolt-descent { animation: none; stroke-dashoffset: 0; opacity: 0.55; }
  .aolt-svg .aolt-path { animation: none; stroke-opacity: 0.32; }
  .aolt-svg .aolt-ignite { animation: none; opacity: 0; }
  .aolt-svg .animate-breathe { animation: none; opacity: 0.5; }
  .aolt-svg .aolt-node { transition: none; }
}
`;

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <style>{css}</style>
      <svg
        viewBox="0 0 300 660"
        className="aolt-svg h-auto w-full"
        role="img"
        aria-labelledby="aolt-title aolt-desc"
      >
        <title id="aolt-title">עֵץ הַחַיִּים — the Kabbalistic Tree of Life</title>
        <desc id="aolt-desc">
          The Kabbalistic Tree of Life. Ten sefirot on three pillars, joined by the
          twenty-two paths. The Pillar of Severity on the left carries Binah
          (Understanding), Gevurah (Severity) and Hod (Glory). The Pillar of Mercy on the
          right carries Chochmah (Wisdom), Chesed (Mercy) and Netzach (Victory). The middle
          Pillar of Equilibrium carries Keter (Crown), Tiferet (Beauty), Yesod (Foundation)
          and Malchut (Kingdom). Above the Crown, three arcs figure the veils of negative
          existence — Ain, Ain Soph, Ain Soph Aur. A dashed horizontal marks the Abyss,
          which separates the supernal triad from the seven below it. On the middle pillar
          within the Abyss, Da&apos;at (Knowledge) is drawn hollow and unconnected by any
          path, because it is not a sefirah. The lightning flash traces the order of
          emanation from Keter down to Malchut, and each vessel kindles as the light
          reaches it.
        </desc>

        <defs>
          <radialGradient id="aolt-halo">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.30" />
            <stop offset="45%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.10" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aolt-core" cx="50%" cy="36%" r="72%">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.14" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aolt-crown">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.16" />
            <stop offset="60%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.04" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="aolt-flash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--bone)" }} />
            <stop offset="30%" style={{ stopColor: "var(--gold)" }} />
            <stop offset="100%" style={{ stopColor: "var(--gold-dim)" }} />
          </linearGradient>
        </defs>

        {/* The light beyond the veils. cy must be >= ry or the falloff is cut by the
            top of the viewBox, leaving a hard horizontal edge on flat black.
            (Ein Sof itself is named among the three veils below, not here.) */}
        <ellipse cx={MID} cy="54" rx="96" ry="54" fill="url(#aolt-crown)" />

        {/* Three veils of negative existence */}
        {/* Ain, Ain Soph, Ain Soph Aur — graded outward, the outer more hidden.
            0.9 not 0.5: at 340px, 0.5u = 0.57 CSS px and antialiasing halves it. */}
        <g fill="none" stroke="var(--gold)" strokeWidth="0.9" strokeLinecap="round">
          {[42, 52, 62].map((r, i) => (
            <path
              key={r}
              d={veil(r)}
              strokeOpacity={[0.62, 0.44, 0.28][i]}
              strokeDasharray={i === 0 ? undefined : "3 5"}
              className="animate-breathe"
              style={{ animationDelay: `-${i * 2.6}s` }}
            />
          ))}
        </g>

        {/* The Abyss */}
        <line
          x1="18"
          y1={daat.y}
          x2="282"
          y2={daat.y}
          stroke="var(--gold-dim)"
          strokeOpacity="0.45"
          strokeWidth="0.9"
          strokeDasharray="2 5"
        />

        {/* The twenty-two paths */}
        <g>
          {paths.map(([a, b], i) => {
            const A = find(a);
            const B = find(b);
            return (
              <g key={`aolt-p-${i}`}>
                <line
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="var(--gold)"
                  strokeOpacity="0.05"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <line
                  className="aolt-path"
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="var(--gold-dim)"
                  strokeWidth="0.7"
                  strokeOpacity="0.26"
                  style={{ animationDelay: `${(i * 0.6 - 12.6).toFixed(2)}s` }}
                />
              </g>
            );
          })}
        </g>

        {/* Lightning flash of descent */}
        <g fill="none" strokeLinejoin="round" strokeLinecap="round">
          <polyline points={flash} stroke="var(--gold-dim)" strokeOpacity="0.2" strokeWidth="0.8" />
          <polyline
            className="aolt-descent"
            points={flash}
            pathLength={1000}
            strokeDasharray="1000"
            stroke="var(--gold)"
            strokeOpacity="0.16"
            strokeWidth="5"
            opacity="0"
          />
          <polyline
            className="aolt-descent"
            points={flash}
            pathLength={1000}
            strokeDasharray="1000"
            stroke="url(#aolt-flash)"
            strokeOpacity="0.85"
            strokeWidth="1.4"
            opacity="0"
          />
        </g>

        {/* Da'at — knowledge; shown hollow, not a sefirah */}
        <g>
          <title>Da&apos;at · Knowledge — not a sefirah</title>
          <circle
            cx={daat.x}
            cy={daat.y}
            r="16"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeOpacity="0.5"
            strokeWidth="0.6"
            strokeDasharray="2 4"
          />
          <text
            x={daat.x}
            y={daat.y + 31}
            textAnchor="middle"
            fontFamily={SERIF}
            fontSize="10.5"
            fill="var(--muted-foreground)"
            stroke="var(--void)"
            strokeWidth="2"
          >
            דַּעַת
          </text>
          <text
            x={daat.x}
            y={daat.y + 45}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="8"
            letterSpacing="1.3"
            fill="var(--muted-foreground)"
            fillOpacity="0.75"
            stroke="var(--void)"
            strokeWidth="1.8"
          >
            DA&apos;AT
          </text>
        </g>

        {/* The ten sefirot */}
        {nodes.map((n, i) => {
          const ignite = `${IGNITE_AT[i]}s`;
          return (
            <g
              className={`aolt-node${active === n.tr ? " is-sel" : ""}`}
              key={n.id}
              onClick={onSelect ? () => onSelect(n.tr) : undefined}
              role={onSelect ? "button" : undefined}
              tabIndex={onSelect ? 0 : undefined}
              aria-pressed={onSelect ? active === n.tr : undefined}
              onKeyDown={
                onSelect
                  ? (ev) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        onSelect(n.tr);
                      }
                    }
                  : undefined
              }
              style={onSelect ? { cursor: "pointer" } : undefined}
            >
              <title>{`${n.rn} · ${n.tr} · ${n.en}`}</title>
              <circle
                className="aolt-sel"
                cx={n.x}
                cy={n.y}
                r={R_NODE + 9}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1"
                strokeOpacity="0"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_HALO}
                fill="url(#aolt-halo)"
                className="animate-breathe"
                style={{ animationDelay: `-${(i * 0.9).toFixed(2)}s` }}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_HALO}
                fill="url(#aolt-halo)"
                className="aolt-ignite"
                opacity="0"
                style={{ animationDelay: ignite }}
              />
              <circle cx={n.x} cy={n.y} r={R_NODE} fill="var(--void)" />
              <circle cx={n.x} cy={n.y} r={R_NODE} fill="url(#aolt-core)" />
              {n.id === "10" && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={R_NODE + 5.5}
                  fill="none"
                  stroke="var(--gold)"
                  strokeOpacity="0.22"
                  strokeWidth="0.5"
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={R_NODE}
                fill="none"
                stroke="var(--gold)"
                strokeOpacity="0.62"
                strokeWidth="0.9"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_NODE - 5.5}
                fill="none"
                stroke="var(--gold-dim)"
                strokeOpacity="0.3"
                strokeWidth="0.5"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_NODE}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1.4"
                className="aolt-ignite"
                opacity="0"
                style={{ animationDelay: ignite }}
              />
              <text
                x={n.x}
                y={n.y + 3}
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="9.5"
                letterSpacing="0.6"
                fill="var(--gold-dim)"
              >
                {n.rn}
              </text>
              <text
                x={n.x}
                y={n.y + 32}
                textAnchor="middle"
                fontFamily={SERIF}
                fontSize="12"
                fill="var(--gold)"
                fillOpacity="0.95"
                stroke="var(--void)"
                strokeWidth="2.2"
              >
                {n.he}
              </text>
              <text
                x={n.x}
                y={n.y + 47}
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="9"
                letterSpacing="1.3"
                fill="var(--muted-foreground)"
                stroke="var(--void)"
                strokeWidth="2"
              >
                {n.tr}
              </text>
            </g>
          );
        })}

        {/* The three pillars */}
        <g
          fontFamily={MONO}
          fontSize="9"
          letterSpacing="1.4"
          textAnchor="middle"
          fill="var(--gold-dim)"
          fillOpacity="0.75"
        >
          <text x={LEFT} y="644">SEVERITY</text>
          <text x={MID} y="644">EQUILIBRIUM</text>
          <text x={RIGHT} y="644">MERCY</text>
        </g>
      </svg>
    </div>
  );
}

/**
 * useActiveSection — which section the reader is actually in.
 * A thin detector band near the top of the viewport; whichever observed section
 * occupies it wins, resolved in document order so overlaps are deterministic.
 */
function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("section[id], header[id]"));
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const order = new Map(els.map((el, i) => [el.id, i]));
    const inBand = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        let best = "";
        let bestIdx = Infinity;
        inBand.forEach((id) => {
          const i = order.get(id) ?? Infinity;
          if (i < bestIdx) { bestIdx = i; best = id; }
        });
        if (best) setActive(best);
      },
      { rootMargin: "-18% 0px -76% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/**
 * useReveal — sections settle in as they are reached.
 * The hiding class is added BY SCRIPT, never in the markup, so if the observer
 * never runs the page is simply visible rather than blank. Anything already on
 * screen at load is left alone, and a timeout un-hides anything stranded.
 */
function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("section[id] > div"),
    ).filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
    if (!targets.length) return;
    targets.forEach((el) => el.classList.add("aoh-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.04 },
    );
    targets.forEach((el) => io.observe(el));
    const t = window.setTimeout(() => {
      document.querySelectorAll(".aoh-reveal:not(.is-in)").forEach((el) => el.classList.add("is-in"));
    }, 6000);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);
}

/**
 * usePauseOffscreen — ambient motion costs nothing when nobody is looking at it.
 * Only DECORATIVE animations are paused. Content-revealing ones (rise,
 * letter-coalesce, the title underline) are deliberately excluded: pausing an
 * animation with `both` fill before it runs would strand its element invisible,
 * which is the failure mode this file has already been bitten by twice.
 */
function usePauseOffscreen() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("section[id], header[id]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("aoh-still", !e.isIntersecting);
      },
      { rootMargin: "250px 0px 250px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      els.forEach((el) => el.classList.remove("aoh-still"));
    };
  }, []);
}

function Index() {
  const active = useActiveSection();
  useReveal();
  usePauseOffscreen();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-void/70 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 sm:flex sm:justify-between">
          <a href="#top" className="min-w-0">
            <div className="truncate font-serif text-base italic tracking-wide sm:text-lg">
              The Architecture of Hidden Forces
            </div>
          </a>
          <div className="hidden shrink-0 items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] lg:flex xl:gap-6 xl:tracking-[0.25em]">
            {[
              { id: "index", label: "Index" },
              { id: "terms", label: "Terms" },
              { id: "spine", label: "Spine" },
              { id: "descent", label: "Descent" },
              { id: "fourfold", label: "Ethers" },
              { id: "morphaither", label: "Morphaithēr" },
              { id: "return", label: "Return" },
              { id: "kabbalah", label: "Kabbalah" },
              { id: "extended", label: "Powers" },
              { id: "triad", label: "Triad" },
              { id: "laws", label: "Laws" },
              { id: "astrology", label: "Sky" },
              { id: "formula", label: "Formula" },
            ].map((l) => (
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
          <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim lg:hidden">
            XVIII
          </div>
        </div>

        {/* Below lg the full bar cannot fit, and a 37,000px treatise is unusable
            without navigation. A scrollable strip keeps every section reachable
            without forcing the page itself to scroll horizontally. */}
        <div className="border-t border-border/50 lg:hidden">
          <div className="aoh-navstrip mx-auto flex max-w-7xl gap-5 overflow-x-auto px-6 pb-3 pt-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            {[
              { id: "terms", label: "Terms" },
              { id: "spine", label: "Spine" },
              { id: "descent", label: "Descent" },
              { id: "fourfold", label: "Ethers" },
              { id: "morphaither", label: "Morphaithēr" },
              { id: "return", label: "Return" },
              { id: "kabbalah", label: "Kabbalah" },
              { id: "extended", label: "Powers" },
              { id: "flywheel", label: "Flywheel" },
              { id: "triad", label: "Triad" },
              { id: "retentive", label: "Crypt" },
              { id: "laws", label: "Laws" },
              { id: "astrology", label: "Sky" },
              { id: "subtattva", label: "Compounds" },
              { id: "dao", label: "Dao" },
              { id: "ignisophia", label: "Ignisophia" },
              { id: "reciprocal", label: "Reciprocal" },
              { id: "mixing", label: "Mixing" },
              { id: "celestial", label: "Celestial" },
              { id: "channels", label: "Channels" },
              { id: "centers", label: "Centers" },
              { id: "treasures", label: "Treasures" },
              { id: "axis", label: "Axis" },
              { id: "books", label: "Books" },
              { id: "grounds", label: "Grounds" },
              { id: "formula", label: "Formula" },
            ].map((l) => (
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
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="relative isolate overflow-hidden pb-32 pt-40 sm:pb-48 sm:pt-56">
        <Backdrop src="/bg/threshold.webp" opacity={0.3} position="center 42%" />
        <GeometryField />
        <div className="grain" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="animate-rise text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
              A Treatise on Metaphysics · MMXXVI
            </p>
            <h1 className="mx-auto mt-10 max-w-5xl font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl md:text-8xl">
              <RevealText text="The Architecture of" />
              <span className="mt-2 block italic">
                <RevealText text="Hidden Forces" startDelay={0.9} perChar={0.055} shimmer />
              </span>
              <span className="mx-auto mt-6 block h-px w-24 origin-left bg-gold/70 title-underline" />
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-gold-dim">
              Σειρά · The Chain of Manifestation
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
                    <span className="font-mono text-xs text-gold/40">→</span>
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
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.3em] text-gold">
              Ἐν προόδῳ
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

      {/* INDEX */}
      <section id="index" className="relative border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Πίναξ · The Architecture in Order
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Twenty sections and two movements. The descent runs from Source to Form; the return
            reads form back toward essence. What lies between is the apparatus by which that
            passage is described.
          </p>

          <div className="mt-12 grid gap-x-12 gap-y-px lg:grid-cols-2">
            {[
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
              { n: "XXIV", id: "books", t: "The Series", d: "Seven books, one arc: Principle → Field → Pattern → Transformation." },
              { n: "—", id: "grounds", t: "Grounds", d: "Why the structure holds. Stated as argument rather than doctrine." },
              { n: "XXV", id: "lineage", t: "Lineage", d: "The traditions the architecture reads from." },
              { n: "", id: "unified", t: "The Unified Formula", d: "The whole arc in eight movements, and again in ten.", movement: true },
              { n: "", id: "formula", t: "The Final Formula", d: "The twenty-one step return to Source.", movement: true },
            ].map((x) => (
              <a
                key={x.id}
                href={`#${x.id}`}
                className="group grid grid-cols-[3.25rem_1fr] items-baseline gap-4 border-b border-border py-4 transition-colors hover:border-gold/40"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                    x.movement ? "text-gold/40" : "text-gold-dim"
                  }`}
                >
                  {x.movement ? "·" : `§ ${x.n}`}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block font-serif text-lg transition-colors group-hover:text-gold ${
                      x.movement ? "italic text-bone/80" : "text-bone"
                    }`}
                  >
                    {x.t}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                    {x.d}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* OPENING DOCTRINE */}
      <section id="doctrine" className="relative border-t border-border py-32">
        <SectionGlyph />
        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_2fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
      <section id="terms" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
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
      <section id="spine" className="relative border-t border-border py-32">
        <SectionGlyph delay={-25} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
              { n: "X", t: "Forms Die, Formation Continues", d: "Nature preserves no vessel forever, yet begins from nothing. The Ossuary of Living Forms: death is dissolution of a particular vessel, not erasure of what passed through it." },
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
                  <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {k.n}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{k.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-l border-gold/40 pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <Backdrop src="/bg/cascade.webp" opacity={0.22} position="center 40%" />
        <SectionGlyph delay={-30} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                Πρόοδος · The First Movement
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                The Descent <span className="italic text-gold">into Form</span>
              </h2>
            </div>
            <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
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
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
            Δύναμις · Μορφή
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
      <section id="correspondence" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            </div>
            <div className="space-y-6">
              {[
                { ether: "Warmth Ether", tattva: "Tejas", element: "Πῦρ · Fire", note: "Activation, ignition, transformation." },
                { ether: "Light Ether", tattva: "Vayu", element: "Ἀήρ · Air", note: "Illumination, direction, breath, transmission." },
                { ether: "Tone / Chemical Ether", tattva: "Apas", element: "Ὕδωρ · Water", note: "Relation, harmony, cohesion, memory." },
                { ether: "Life Ether", tattva: "Prithivi", element: "Γῆ · Earth", note: "Integration, structure, crystallization, durable form." },
              ].map((row) => (
                <div
                  key={row.element}
                  className="grid gap-2 border-b border-border pb-6 sm:grid-cols-[1fr_1fr_1fr] sm:gap-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                    {row.ether}
                  </div>
                  <div className="font-serif italic text-bone/85">{row.tattva}</div>
                  <div className="font-serif text-bone/90">{row.element}</div>
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
        <Backdrop src="/bg/gateway.webp" opacity={0.16} position="center 50%" />
        <SectionGlyph delay={-40} />
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § IV · The Fourfold Field
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Θερμότης <span className="italic text-gold">→</span> Φῶς{" "}
                <span className="italic text-gold">→</span> Τόνος{" "}
                <span className="italic text-gold">→</span> Ζωή{" "}
                <span className="italic text-gold">↻</span>
              </h2>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-gold-dim">
                Τὸ Τετραμερὲς Πεδίον
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Κύκλος · The Living Circuit
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
                translit: "Thermotēs",
                english: "Warmth Ether",
                verb: "quickens",
                corr: "Tejas · Πῦρ",
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
                translit: "Phōs",
                english: "Light Ether",
                verb: "articulates",
                corr: "Vayu · Ἀήρ",
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
                translit: "Tonos · Chemical Ether",
                english: "Tone Ether",
                verb: "coordinates",
                corr: "Apas · Ὕδωρ",
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
                translit: "Zōē",
                english: "Life Ether",
                verb: "regenerates",
                corr: "Prithivi · Γῆ",
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
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                        {e.n} · {e.english}
                      </p>
                      <h3 className="mt-3 font-serif text-3xl leading-none text-bone sm:text-4xl">
                        {e.greek}
                      </h3>
                      <p className="mt-3 font-serif text-lg italic text-gold/80">
                        {e.translit} · {e.verb}
                      </p>
                      <div className="mt-6 h-px w-12 bg-gold/40 transition-all duration-700 group-hover:w-24" />
                      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        § III · {e.corr}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
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
                    </div>
                  </div>

                  {/* Measure — deviation on either side of the named virtue */}
                  {e.virtue ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-6">
                      <div className="border-t border-border pt-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Ἔλλειψις · Deficiency
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {e.deficiency}
                        </p>
                      </div>
                      <div className="border-t border-gold/60 pt-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                          Μεσότης · Virtue
                        </p>
                        <p className="mt-3 font-serif text-lg italic text-bone/90">“{e.virtue}”</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {e.gloss}
                        </p>
                      </div>
                      <div className="border-t border-border pt-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Ὑπερβολή · Excess
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
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                      Διάστημα {["I", "II", "III"][i]} · {e.greek}{" "}
                      <span className="text-gold">→</span> {e.into.to}
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
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                          Διάστημα IV · The Return to {e.into.to}
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
                          className="mt-8 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim transition-colors hover:text-gold"
                        >
                          <span className="text-base leading-none">↺</span>
                          Begin again at I · Θερμότης
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
        <Backdrop src="/bg/tide.webp" opacity={0.2} position="center 55%" />
        <SectionGlyph delay={-15} />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
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
        </div>
      </section>

      {/* RETURN */}
      <section id="return" className="relative border-t border-border py-32">
        <SectionGlyph delay={-60} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                Ἐπιστροφή · The Second Movement
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                The Return <span className="italic text-gold">through Reading</span>
              </h2>
            </div>
            <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
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
        <Backdrop src="/bg/roots.webp" opacity={0.16} position="center 45%" />
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
        <Backdrop src="/bg/chamber.webp" opacity={0.45} position="center 35%" />
        <SectionGlyph />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § VII · Kabbalah
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                The sacred grammar of <span className="italic text-gold">emanation</span>
              </h2>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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

          {/* Hebrew Letters */}
          <div className="mt-24 grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
      <section id="extended" className="relative border-t border-border py-32">
        <SectionGlyph delay={-45} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                § VIII · The Hidden Powers
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                The extended <span className="italic text-gold">architecture</span>
              </h2>
            </div>
            <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                    Hidden Power
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
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
        <Backdrop src="/bg/flywheel.webp" opacity={0.5} position="center 45%" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  {x.n}
                </div>
                <div className="mt-2 font-serif text-lg italic text-bone">{x.t}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Ἥλιος Ἐντός · The Inner Sun
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
        <Backdrop src="/bg/alembic.webp" opacity={0.38} position="center 50%" />
        <SectionGlyph delay={-45} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[
              { greek: "Θεῖον", latin: "Sulphur", en: "Sulfur", role: "Impulse", d: "The driving difference — desire, heat, pressure, appetite, intention, catalytic intensity. It initiates and intensifies.", without: "Without Sulfur, nothing is initiated." },
              { greek: "Ὑδράργυρος", latin: "Mercurius", en: "Mercury", role: "Mediation", d: "Mobility and exchange — circulation, translation, adaptation, communication. It joins what was separate.", without: "Without Mercury, nothing is transmitted or recombined." },
              { greek: "Ἅλς", latin: "Sal", en: "Salt", role: "Fixation", d: "Stabilization — boundary, embodiment, memory, habit, structure, preservation. It limits and endures.", without: "Without Salt, nothing endures." },
            ].map((x) => (
              <div key={x.en} className="group border border-border p-5 transition-colors hover:border-gold/40">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-serif text-2xl text-gold">{x.greek}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {x.role}
                  </div>
                </div>
                <div className="mt-3 font-serif text-lg italic text-bone">
                  {x.en} <span className="text-muted-foreground">· {x.latin}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                <p className="mt-4 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                  {x.without}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <div className="border border-border p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <Backdrop src="/bg/strata.webp" opacity={0.45} position="center 50%" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XI · The Retentive Depth
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The world <span className="italic text-gold">inherits itself</span>
          </h2>

          <div className="mt-12 grid gap-16 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Κρύπτη · The Crypt of Primordial Memory
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Ὀστοφυλάκιον · The Ossuary of Living Forms
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
        </div>
      </section>

      {/* THE LAWS OF FORMATION */}
      <section id="laws" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/nurselog.webp" opacity={0.16} position="center 55%" />
        <SectionGlyph delay={-70} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <Backdrop src="/bg/startrails.webp" opacity={0.32} position="center 35%" />
        <SectionGlyph delay={-90} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The planets as formative functions
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { g: "☉", n: "Sun", d: "Centering, coherence, vitality, illumination — the power around which a system organizes itself." },
                { g: "☾", n: "Moon", d: "Reception, memory, habit, embodiment, fluctuation, and the capacity to contain impressions." },
                { g: "☿", n: "Mercury", d: "Translation, mediation, communication, movement, exchange." },
                { g: "♀", n: "Venus", d: "Attraction, affinity, valuation, harmony, combination." },
                { g: "♂", n: "Mars", d: "Separation, assertion, conflict, cutting, directed force." },
                { g: "♃", n: "Jupiter", d: "Expansion, authorization, synthesis, confidence, increase." },
                { g: "♄", n: "Saturn", d: "Boundary, duration, limitation, responsibility, crystallization, consequence." },
                { g: "⛢ ♆ ♇", n: "The Outer Powers", d: "Slower collective processes reorganizing generations, cultures, institutions, and historical fields." },
              ].map((x) => (
                <div key={x.n} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-serif text-lg italic text-bone">{x.n}</div>
                    <div className="shrink-0 text-lg text-gold">{x.g}</div>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                    {a}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</div>
                </div>
              ))}
            </div>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              neither an isolated system nor the master key — the celestial clock and geometrical
              calendar of a universe in formation
            </p>
          </div>
        </div>
      </section>

      {/* SUB-TATTVAS */}
      <section id="subtattva" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
                <div className="font-serif text-xl italic text-gold">{x.t}</div>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
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
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Read into the chart
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Sign supplies the dominant tattva by its element; planet supplies the interior
              modifier. Functional correspondences, not identities: Sun and Mars to Tejas, Moon
              and Venus to Apas, Mercury to Vayu, Jupiter to Akasha, Saturn to Prithivi.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { p: "Mars in Cancer", c: "Apas–Tejas", d: "A watery, protective, cohesive field carrying a fiery and separating force." },
                { p: "Moon in Aries", c: "Tejas–Apas", d: "A fiery field inwardly modified by feeling, attachment, and memory." },
                { p: "Mercury in Taurus", c: "Prithivi–Vayu", d: "Stable structure containing movement, language, and exchange." },
                { p: "Saturn in Aquarius", c: "Vayu–Prithivi", d: "An airy, conceptual field containing limitation and durability." },
                { p: "Jupiter in Scorpio", c: "Apas–Akasha", d: "Emotional depth and penetration opened toward meaning and hidden possibility." },
              ].map((x) => (
                <div key={x.p} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                    {x.p}
                  </div>
                  <div className="mt-2 font-serif text-lg italic text-gold">{x.c}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
        <Backdrop src="/bg/aperture.webp" opacity={0.42} position="center 45%" />
        <SectionGlyph delay={-110} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">{a}</span>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  The generating cycle
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Each phase prepares the next. Growth fuels expression; expression yields what can
                  be assimilated; assimilation yields defined structure; contraction returns
                  substance to storage; storage nourishes new growth.
                </p>
              </div>
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <Backdrop src="/bg/furnace.webp" opacity={0.26} position="center 60%" />
        <SectionGlyph delay={-130} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XVI · Ignisophia
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The chariot of the <span className="italic text-gold">Inner Sun</span>
          </h2>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-gold-dim">
            ignis · fire &nbsp;+&nbsp; σοφία · wisdom
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

          {/* The chariot */}
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">{a}</span>
                    <span className="font-serif text-base italic text-bone/85">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">{c}</p>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <Backdrop src="/bg/ripples.webp" opacity={0.49} position="center 60%" />
        <SectionGlyph delay={-150} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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

          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                  <div className="font-serif text-xl text-gold">{z}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">{k}</div>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <Backdrop src="/bg/alabaster.webp" opacity={0.49} position="center 45%" />
        <SectionGlyph delay={-170} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <Backdrop src="/bg/delta.webp" opacity={0.16} position="center 50%" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">{a}</span>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              ὁδοί · the ways of living energy
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
          <div className="mt-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <SectionGlyph delay={-190} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXI · Chakras and Centers
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
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
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

          {/* five functions */}
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold-dim">{a}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <Backdrop src="/bg/germination.webp" opacity={0.22} position="center 55%" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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

          {/* mutual dependence */}
          <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Jing supports Qi", "without a reservoir there is nothing to draw on"],
              ["Qi nourishes Shen", "without circulation, awareness has no supply"],
              ["Shen directs Qi", "without orientation, circulation has no purpose"],
              ["Qi protects Jing", "and redistributes what the reservoir holds"],
            ].map(([a, b]) => (
              <div key={a} className="border-b border-border py-5">
                <div className="font-serif text-base italic text-gold">{a}</div>
                <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</div>
              </div>
            ))}
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">{x.t}</span>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Functional correspondences
            </p>
            <div className="mt-6 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <thead>
                  <tr>
                    {["", "Primary function", "Tattvic", "Etheric", "Alchemical"].map((h) => (
                      <th key={h} className="border-b border-border px-3 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{h}</th>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Both directions are required
              </p>
              <div className="mt-6 border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Ascending</p>
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
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Descending</p>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
        <SectionGlyph delay={-210} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">{c.pr}</span>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Gift and distortion
            </p>
            <div className="mt-6 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <thead>
                  <tr>
                    {["", "Primary question", "Gift", "Possible distortion"].map((h) => (
                      <th key={h} className="border-b border-border px-3 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{h}</th>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">{a}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* full alignment as circulation */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Descent and return on a human scale
              </p>
              <div className="mt-6 border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Descending</p>
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
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Returning</p>
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

          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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
                  <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${i === 3 ? "text-gold" : "text-gold-dim"}`}>{a}</span>
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
      <section id="books" className="relative border-t border-border py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § XXIV · The Series
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
                  <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-dim">
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
        <Backdrop src="/bg/masons.webp" opacity={0.25} position="center 50%" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § Grounds · Why the Structure Holds
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            A process-relational <span className="italic text-gold">reading</span>
          </h2>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The preceding sections state the architecture. This one argues for it. None of what
            follows proves the whole structure; each shows that its central logic is neither
            arbitrary nor internally incoherent. Reality is composed not primarily of isolated
            things, but of processes, relations, constraints, and recurring organizations that
            temporarily appear as things.
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
      <section id="lineage" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § XXV · Lineage
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
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim sm:text-xs">
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
      <section id="unified" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-lg leading-relaxed text-bone/90 sm:text-xl">
                  {line}
                </span>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-3xl text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The same arc at higher resolution
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The eight movements above name the arc. Read through the laws of maintenance,
              the same arc resolves into ten.
            </p>
            <div className="mt-8 space-y-px">
              {[
                "The field offers possibility.",
                "Tattvic biases give possibility direction.",
                "Boundaries select what can enter.",
                "The ethers transduce influence between levels.",
                "Measure organizes force into pattern.",
                "Metabolism maintains the pattern through exchange.",
                "Repetition deepens it into formative inertia.",
                "Thresholds permit sudden reorganization.",
                "Telos draws the form toward greater integration.",
                "Dissolution releases its contents, while the Crypt preserves the changes its existence made to the field.",
              ].map((line, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-border py-4"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-base leading-relaxed text-bone/85 sm:text-lg">
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            and the field is altered for what comes after
          </p>
        </div>
      </section>

      {/* FINAL FORMULA */}
      <section id="formula" className="relative isolate overflow-hidden border-t border-border py-40">
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
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
            Μεταμόρφωσις · The Final Formula
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
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Ω · Kosmos — an ordered beauty — an architecture of hidden forces
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-void py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 sm:flex sm:justify-between">
          <div className="min-w-0 truncate font-serif text-sm italic text-muted-foreground">
            The Architecture of Hidden Forces
          </div>
          <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.4em] text-gold-dim">
            MMXXVI
          </div>
        </div>
      </footer>
    </div>
  );
}
