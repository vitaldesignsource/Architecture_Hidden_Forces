import { useEffect, useRef, useState } from "react";
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
  fill = false,
  scrim = 0.4,
  portrait = false,
}: {
  src: string;
  opacity?: number;
  position?: string;
  /** Tall sources. A 4:5 frame loses 55% of its height to the wide band, so a
   *  portrait backdrop is a side panel matching the source aspect instead —
   *  uncropped, faded into the void along its inner edge. */
  portrait?: boolean;
  /** Void wash over the image. Bright sources need it to stay legible; dark,
   *  high-contrast sources are only flattened by it, so they take less. */
  scrim?: number;
  /** Cover the whole section even on narrow viewports. Only the hero wants this. */
  fill?: boolean;
}) {
  // `-z-10` escapes to the root stacking context unless the containing section
  // isolates. Relying on an author to remember `isolate` has failed four times in
  // this file — every recurrence made a backdrop silently invisible. So the
  // component guarantees it instead of trusting the call site. The classes stay on
  // the sections too, which keeps the guarantee free of any first-paint flash.
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const parent = host.current?.parentElement;
    if (parent && getComputedStyle(parent).isolation !== "isolate") {
      parent.style.isolation = "isolate";
    }
  }, []);

  return (
    <div ref={host} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/*
        Sources are all 16:9. On wide viewports a section is broad enough that
        object-cover crops gently. On tablet and below the same section is many
        thousands of pixels tall, so cover scales to the HEIGHT and shows a sliver
        of the source width — measured at a median of 10%, and 5% on § IV. So below
        lg the backdrop stops covering and becomes a band at the top of the section,
        showing the whole composition at its own scale before dissolving into void.
      */}
      <div
        className={
          fill ? "absolute inset-0"
               : portrait ? "aoh-bd-por absolute top-0 right-0"
                          : "aoh-bd absolute inset-x-0 top-0"
        }
        style={{ "--bd-o": opacity } as React.CSSProperties}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="aoh-bd-img h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
        <div className="absolute inset-0 bg-void" style={{ opacity: scrim }} />
        <div
          className="aoh-bd-scrim absolute inset-0"
          style={{
            background: portrait
              ? "linear-gradient(to right, var(--void) 0px, transparent 42%), linear-gradient(to bottom, transparent 60%, var(--void) 100%)"
              : "linear-gradient(to bottom, var(--void) 0px, transparent var(--bd-fade-top, 130px), transparent calc(100% - var(--bd-fade, 130px)), var(--void) 100%)",
          }}
        />
      </div>
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
          .aoh-el .edge-run { stroke-dasharray: 18 982; animation: aoh-el-move 6s linear infinite; }
          @keyframes aoh-el-move { to { stroke-dashoffset: -1000; } }
          .aoh-el .idle { animation: aoh-el-idle 9s ease-in-out infinite; }
          @keyframes aoh-el-idle { 0%,100% { stroke-opacity: .22 } 50% { stroke-opacity: .44 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-el .edge-run { animation: none; opacity: 0 }
            .aoh-el .idle { animation: none }
          }
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
                  className={`edge${sel === null ? " idle" : ""}`}
                  x1={x0} y1={y0} x2={x1} y2={y1}
                  stroke="var(--gold)"
                  strokeOpacity={sel === null ? 0.34 : on ? 1 : 0.09}
                  strokeWidth={on ? 2 : 1}
                />
                {on ? (
                  <line
                    className="edge-run"
                    x1={x0} y1={y0} x2={x1} y2={y1} pathLength={1000}
                    stroke="var(--bone)" strokeOpacity="0.95" strokeWidth="2.6" strokeLinecap="round"
                  />
                ) : null}
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

      <style>{`
        .aoh-pf-row { animation: aoh-pf-in 620ms cubic-bezier(.16,1,.3,1) both; }
        @keyframes aoh-pf-in { from { opacity: 0; transform: translateY(9px) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { .aoh-pf-row { animation: none } }
      `}</style>
      <div className="mt-8 space-y-px" key={cur.n}>
        {cur.chain.map(([level, expr, note], i) => (
          <div
            key={level}
            style={{ animationDelay: `${(i * 70).toFixed(0)}ms` }}
            className="aoh-pf-row grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-border py-4 sm:grid-cols-[7rem_minmax(0,16rem)_1fr] sm:gap-6"
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
        <style>{`
          .aoh-nd-flow { stroke-dasharray: 22 978; animation: aoh-nd-run 13s linear infinite; }
          .aoh-nd-flow.rev { animation-direction: reverse; }
          .aoh-nd-flow.mid { animation-duration: 17s; }
          @keyframes aoh-nd-run { to { stroke-dashoffset: -1000; } }
          @media (prefers-reduced-motion: reduce) { .aoh-nd-flow { animation: none; opacity: 0; } }
        `}</style>
        <svg viewBox="0 0 300 620" className="h-auto w-full" role="img" aria-labelledby="aoh-nd-t">
          <title id="aoh-nd-t">
            Ida and Pingala winding about a central Sushumna, meeting the axis at six nodes.
          </title>
          {/* Sushumna */}
          <g style={{ opacity: dim(2) }}>
            <line x1={MID} y1={TOP} x2={MID} y2={BOT} stroke="var(--gold)"
                  strokeOpacity={sel === 2 ? 1 : 0.55} strokeWidth={sel === 2 ? 2.2 : 1.4} />
            <line className="aoh-nd-flow mid" x1={MID} y1={BOT} x2={MID} y2={TOP} pathLength={1000}
                  stroke="var(--bone)" strokeOpacity="0.85" strokeWidth="2.6" strokeLinecap="round" />
          </g>
          {/* Ida */}
          <polyline points={pts(-1)} fill="none" stroke="var(--bone)"
                    strokeOpacity={sel === 0 ? 0.95 : 0.42} strokeWidth={sel === 0 ? 2 : 1.2}
                    style={{ opacity: dim(0) }} />
          <polyline className="aoh-nd-flow" points={pts(-1)} pathLength={1000} fill="none"
                    stroke="var(--bone)" strokeOpacity="0.9" strokeWidth="2.4"
                    strokeLinecap="round" style={{ opacity: dim(0) }} />
          {/* Pingala */}
          <polyline points={pts(1)} fill="none" stroke="var(--gold)"
                    strokeOpacity={sel === 1 ? 1 : 0.5} strokeWidth={sel === 1 ? 2 : 1.2}
                    style={{ opacity: dim(1) }} />
          <polyline className="aoh-nd-flow rev" points={pts(1)} pathLength={1000} fill="none"
                    stroke="var(--gold)" strokeOpacity="1" strokeWidth="2.4"
                    strokeLinecap="round" style={{ opacity: dim(1) }} />
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
              className={`px-2 py-2 transition-colors ${sel === i ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
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
        <style>{`
          .aoh-cx-run { stroke-dasharray: 26 974; animation: aoh-cx-move 11s linear infinite; }
          .aoh-cx-run.down { animation-direction: reverse; }
          @keyframes aoh-cx-move { to { stroke-dashoffset: -1000; } }
          .aoh-cx-pulse { animation: aoh-cx-breathe 7s ease-in-out infinite; transform-origin: center; }
          @keyframes aoh-cx-breathe { 0%,100% { opacity: .25 } 50% { opacity: .7 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-cx-run { animation: none; opacity: 0 }
            .aoh-cx-pulse { animation: none; opacity: .45 }
          }
        `}</style>
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
          <line
            className={`aoh-cx-run${dir === "down" ? " down" : ""}`}
            x1={MID} y1={602} x2={MID} y2={152} pathLength={1000}
            stroke="var(--bone)" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round"
          />
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
                <circle
                  className="aoh-cx-pulse"
                  cx={MID} cy={c.y} r={c.crown ? 30 : 27} fill="none"
                  stroke="var(--gold)" strokeWidth="0.7"
                  style={{ animationDelay: `-${(i * 1.1).toFixed(1)}s` }}
                />
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
              className={`px-2 py-2 transition-colors ${dir === d ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
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

/**
 * TheChariot — Hod and Netzach as the two wheels, the Inner Sun as the centre.
 * The divided/gathered toggle is the doctrine, not decoration: divided, the
 * wheels counter-rotate and the Sun goes dim, which is the section's own image
 * of several animals pulling a chariot in opposing directions. Gathered, they
 * turn together and the centre lights.
 */
function TheChariot() {
  const [gathered, setGathered] = useState(true);
  const [sel, setSel] = useState<number | null>(null);
  const W = [
    { k: "Hod", he: "הוֹד", cx: 108, role: "The wheel of understanding",
      d: "Language, discrimination, planning, symbol, intelligible structure.",
      fail: "Hod turning without Netzach: understanding with little motive power." },
    { k: "Netzach", he: "נֶצַח", cx: 332, role: "The wheel of desire",
      d: "Emotion, imagination, attraction, instinct, motive vitality.",
      fail: "Netzach turning without Hod: tremendous energy without reliable direction." },
  ];
  const CY = 168, R = 64;
  const spokes = (n: number) => Array.from({ length: n }, (_, i) => (i * 360) / n);
  const cur = sel === null ? null : W[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[440px]">
        <style>{`
          .aoh-ch-w { transform-box: fill-box; transform-origin: center; }
          .aoh-ch-w.turn-a { animation: aoh-ch-spin 26s linear infinite; }
          .aoh-ch-w.turn-b { animation: aoh-ch-spin 26s linear infinite; }
          .aoh-ch-w.turn-b.split { animation-direction: reverse; animation-duration: 17s; }
          @keyframes aoh-ch-spin { to { transform: rotate(360deg) } }
          .aoh-ch-sun { transition: opacity 900ms ease; }
          .aoh-ch-ray { animation: aoh-ch-ray 6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          @keyframes aoh-ch-ray { 0%,100% { opacity:.25 } 50% { opacity:.75 } }
          .aoh-ch-wheel { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) {
            .aoh-ch-w.turn-a, .aoh-ch-w.turn-b { animation: none }
            .aoh-ch-ray { animation: none; opacity:.5 }
          }
        `}</style>
        <svg viewBox="0 0 440 300" className="h-auto w-full" role="img" aria-labelledby="aoh-ch-t">
          <title id="aoh-ch-t">
            The chariot: Hod and Netzach as two wheels on one axle, with the Inner Sun as the
            governing centre between them.
          </title>
          {/* axle */}
          <line x1={W[0].cx} y1={CY} x2={W[1].cx} y2={CY} stroke="var(--gold)"
                strokeOpacity={gathered ? 0.6 : 0.22} strokeWidth="1.4" />

          {W.map((w, i) => {
            const on = sel === i;
            return (
              <g key={w.k} className="aoh-ch-wheel"
                 onClick={() => setSel(on ? null : i)} role="button" tabIndex={0}
                 aria-pressed={on} aria-label={w.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <g className={`aoh-ch-w ${i === 0 ? "turn-a" : "turn-b"}${gathered ? "" : " split"}`}>
                  {spokes(8).map((a) => (
                    <line key={a}
                      x1={w.cx + Math.cos((a * Math.PI) / 180) * 8}
                      y1={CY + Math.sin((a * Math.PI) / 180) * 8}
                      x2={w.cx + Math.cos((a * Math.PI) / 180) * (R - 4)}
                      y2={CY + Math.sin((a * Math.PI) / 180) * (R - 4)}
                      stroke="var(--gold)" strokeOpacity={on ? 0.75 : 0.34} strokeWidth="0.9" />
                  ))}
                  <circle cx={w.cx} cy={CY} r={R - 4} fill="none" stroke="var(--gold)"
                          strokeOpacity={on ? 0.5 : 0.2} strokeWidth="0.7" strokeDasharray="2 6" />
                </g>
                <circle cx={w.cx} cy={CY} r={R} fill="none" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : 0.55} strokeWidth={on ? 1.8 : 1.1} />
                <circle cx={w.cx} cy={CY} r="9" fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity="0.7" strokeWidth="0.9" />
                <text x={w.cx} y={CY + R + 24} textAnchor="middle" className="font-serif"
                      fontSize="14" fill={on ? "var(--gold)" : "var(--bone)"} fillOpacity={on ? 1 : 0.8}>
                  {w.he}
                </text>
                <text x={w.cx} y={CY + R + 38} textAnchor="middle" className="font-mono"
                      fontSize="7" letterSpacing="1.6" fill="var(--muted-foreground)">
                  {w.k.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* the Inner Sun */}
          <g className="aoh-ch-sun" style={{ opacity: gathered ? 1 : 0.32 }}>
            {gathered
              ? spokes(12).map((a, i) => (
                  <line key={a} className="aoh-ch-ray"
                    x1={220 + Math.cos((a * Math.PI) / 180) * 34}
                    y1={CY + Math.sin((a * Math.PI) / 180) * 34}
                    x2={220 + Math.cos((a * Math.PI) / 180) * 46}
                    y2={CY + Math.sin((a * Math.PI) / 180) * 46}
                    stroke="var(--gold)" strokeWidth="1" strokeLinecap="round"
                    style={{ animationDelay: `-${(i * 0.4).toFixed(1)}s` }} />
                ))
              : null}
            <circle cx="220" cy={CY} r="30" fill="var(--void)" />
            <circle cx="220" cy={CY} r="30" fill="none" stroke="var(--gold)"
                    strokeOpacity={gathered ? 1 : 0.4} strokeWidth={gathered ? 1.6 : 1} />
            <circle cx="220" cy={CY} r="5" fill="var(--gold)" fillOpacity={gathered ? 1 : 0.4} />
            <text x="220" y={CY + 52} textAnchor="middle" className="font-mono" fontSize="7"
                  letterSpacing="1.8" fill="var(--muted-foreground)">INNER SUN</text>
          </g>
        </svg>
        <div className="mt-3 flex justify-center gap-5 font-mono text-[9px] uppercase tracking-[0.18em]">
          {[[true, "Gathered"], [false, "Divided"]].map(([v, label]) => (
            <button key={String(label)} type="button" onClick={() => setGathered(v as boolean)}
              aria-pressed={gathered === v}
              className={`px-2 py-2 transition-colors ${gathered === v ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
              {label as string}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[12rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.he} · {cur.k} — {cur.role}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-4 border-t border-border pt-4 font-serif text-lg italic leading-relaxed text-bone/80">
              {cur.fail}
            </p>
          </>
        ) : gathered ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">Gathered</p>
            <p className="mt-4 font-serif text-xl italic leading-relaxed text-bone">
              Both wheels turn together, and the centre lights.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              They remain independent faculties — this is not one rim. Understanding and desire
              keep their difference while turning to a common purpose, and less is lost to internal
              contradiction. Choose a wheel, or set the chariot divided.
            </p>
          </>
        ) : (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">Divided</p>
            <p className="mt-4 font-serif text-xl italic leading-relaxed text-bone">
              Several animals pulling a chariot in opposing directions.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The wheels counter-turn and the axle slackens; the centre goes dim. There may be no
              shortage of force here — one part desires what another fears, one imagines what
              another refuses to enact — and nearly all of it is spent against itself.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * TheTriad — Sulfur above, Salt below, Mercury circulating between them.
 * Deliberately not an equilateral triangle: the doctrine holds that the third is
 * not another object placed beside the first two but the living relation through
 * which they become capable of producing something beyond themselves. So Mercury
 * is drawn as the current between the poles, and solve/coagula reverses it.
 */
function TheTriad() {
  const [dir, setDir] = useState<"coagula" | "solve">("coagula");
  const [sel, setSel] = useState<number | null>(null);
  const P = [
    { k: "Sulfur", z: "Θεῖον", y: 62, role: "Impulse",
      d: "The driving difference — desire, heat, pressure, appetite, intention, catalytic intensity. It initiates and intensifies.",
      w: "Without Sulfur, nothing is initiated." },
    { k: "Mercury", z: "Ὑδράργυρος", y: 168, role: "Mediation",
      d: "Mobility and exchange — circulation, translation, adaptation, communication. It joins what was separate and carries between the poles.",
      w: "Without Mercury, the fire cannot circulate." },
    { k: "Salt", z: "Ἅλς", y: 274, role: "Fixation",
      d: "Stabilization — boundary, embodiment, memory, habit, structure, preservation. It limits and endures.",
      w: "Without Salt, the force disperses without lasting." },
  ];
  const MID = 150;
  const cur = sel === null ? null : P[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[300px]">
        <style>{`
          .aoh-tr-run { stroke-dasharray: 20 980; animation: aoh-tr-move 9s linear infinite; }
          .aoh-tr-run.up { animation-direction: reverse; }
          @keyframes aoh-tr-move { to { stroke-dashoffset: -1000 } }
          .aoh-tr-node { cursor: pointer; }
          .aoh-tr-merc { animation: aoh-tr-breathe 8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          @keyframes aoh-tr-breathe { 0%,100% { opacity:.3 } 50% { opacity:.75 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-tr-run { animation:none; opacity:0 } .aoh-tr-merc { animation:none; opacity:.5 }
          }
        `}</style>
        <svg viewBox="0 0 300 340" className="h-auto w-full" role="img" aria-labelledby="aoh-tr-t">
          <title id="aoh-tr-t">
            Sulfur above and Salt below, with Mercury circulating between them. Coagula runs
            downward toward fixation; solve runs upward, loosening what was fixed.
          </title>
          {/* the axis Mercury travels */}
          <line x1={MID} y1={92} x2={MID} y2={244} stroke="var(--gold)" strokeOpacity="0.28" strokeWidth="1.2" />
          <line className={`aoh-tr-run${dir === "solve" ? " up" : ""}`}
                x1={MID} y1={92} x2={MID} y2={244} pathLength={1000}
                stroke="var(--bone)" strokeOpacity="0.9" strokeWidth="2.6" strokeLinecap="round" />
          {/* Mercury's circulation, drawn as two returning arcs */}
          <path d={`M ${MID} 100 C ${MID - 62} 130, ${MID - 62} 206, ${MID} 236`} fill="none"
                stroke="var(--gold)" strokeOpacity="0.34" strokeWidth="1" strokeDasharray="3 5" />
          <path d={`M ${MID} 100 C ${MID + 62} 130, ${MID + 62} 206, ${MID} 236`} fill="none"
                stroke="var(--gold)" strokeOpacity="0.34" strokeWidth="1" strokeDasharray="3 5" />

          {P.map((n, i) => {
            const on = sel === i;
            const merc = i === 1;
            return (
              <g key={n.k} className="aoh-tr-node"
                 onClick={() => setSel(on ? null : i)} role="button" tabIndex={0}
                 aria-pressed={on} aria-label={n.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                {merc ? (
                  <circle className="aoh-tr-merc" cx={MID} cy={n.y} r="40" fill="none"
                          stroke="var(--gold)" strokeWidth="0.8" />
                ) : null}
                <circle cx={MID} cy={n.y} r="30" fill="var(--void)" />
                <circle cx={MID} cy={n.y} r="30" fill="none" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : 0.55} strokeWidth={on ? 1.8 : 1.1}
                        strokeDasharray={merc ? "5 4" : undefined} />
                <text x={MID} y={n.y + 5} textAnchor="middle" className="font-serif" fontSize="15"
                      fill="var(--gold)" fillOpacity={on ? 1 : 0.8}>{n.z}</text>
                <text x={MID + 44} y={n.y + 2} className="font-mono" fontSize="7.5" letterSpacing="1.5"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}>{n.k.toUpperCase()}</text>
                <text x={MID + 44} y={n.y + 13} className="font-mono" fontSize="6.5" letterSpacing="1.1"
                      fill="var(--muted-foreground)">{n.role.toUpperCase()}</text>
              </g>
            );
          })}
          <text x={MID} y={322} textAnchor="middle" className="font-mono" fontSize="7"
                letterSpacing="2" fill="var(--muted-foreground)">
            {dir === "coagula" ? "COAGULA · TOWARD FIXATION" : "SOLVE · TOWARD LOOSENING"}
          </text>
        </svg>
        <div className="mt-3 flex justify-center gap-5 font-mono text-[9px] uppercase tracking-[0.18em]">
          {(["coagula", "solve"] as const).map((d) => (
            <button key={d} type="button" onClick={() => setDir(d)} aria-pressed={dir === d}
              className={`px-2 py-2 transition-colors ${dir === d ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[12rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.z} · {cur.k} — {cur.role}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-4 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              {cur.w}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Mercury is not a third thing standing beside the other two. It is{" "}
              <span className="text-gold-dim">the living relation between them</span> — which is
              why it is drawn as the current running the axis rather than as a third corner.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {dir === "coagula"
                ? "Coagula runs downward: the loosened contents are gathered and fixed into a form able to express a wider range than the one before it."
                : "Solve runs upward: an established configuration is loosened so that what it excluded can be reconsidered."}
            </p>
            <p className="mt-4 font-serif text-lg italic leading-relaxed text-bone/80">
              Solve without coagula disperses. Coagula without solve imprisons.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * PhaseOrgans — the Five Phases carrying their organ networks, virtues, emotions
 * and spirits. Distinct from WuxingCycles in § XV, which draws the generating and
 * regulating cycles; this one is the interior ecology, phase by phase.
 * Fire sits at the top, matching the orientation used there.
 */
function PhaseOrgans() {
  const [sel, setSel] = useState<number | null>(null);
  const C = 168, R = 108;
  const P = [
    { z: "火", k: "Fire", ang: -90, move: "Expanding, radiating, connecting",
      org: "Heart and Small Intestine — with Pericardium and Triple Burner in the broader schemes",
      virt: "Presence, warmth, communication", emo: "Joy",
      emoOK: "expansion, connection, radiant participation",
      emoOff: "scattered stimulation that cannot settle into relationship",
      sp: "Shen", spD: "illuminates and unifies conscious presence" },
    { z: "土", k: "Earth", ang: -18, move: "Receiving, transforming, assimilating",
      org: "Spleen and Stomach", virt: "Nourishment, stability, integration", emo: "Thought · concern",
      emoOK: "assimilation, reflection, care, the digestion of experience",
      emoOff: "circling without ever reaching assimilation",
      sp: "Yi", spD: "concentrates, considers, and assimilates" },
    { z: "金", k: "Metal", ang: 54, move: "Differentiating, contracting, releasing",
      org: "Lung and Large Intestine", virt: "Discernment, rhythm, boundary", emo: "Grief",
      emoOK: "separation, acknowledgment of finitude, release",
      emoOff: "contraction of the field until nothing new can enter",
      sp: "Po", spD: "binds awareness to sensation, embodiment, and mortality" },
    { z: "水", k: "Water", ang: 126, move: "Descending, storing, conserving",
      org: "Kidney and Bladder", virt: "Depth, endurance, renewal", emo: "Fear",
      emoOK: "descent, caution, conservation, protection of deep reserves",
      emoOff: "force drawn continually downward and away from action",
      sp: "Zhi", spD: "preserves deep intention, endurance, and will" },
    { z: "木", k: "Wood", ang: 198, move: "Arising, branching, directing",
      org: "Liver and Gallbladder", virt: "Initiative, flexibility, vision", emo: "Anger",
      emoOK: "mobilization, boundary defence, power to overcome obstruction",
      emoOff: "still rising after the danger has passed",
      sp: "Hun", spD: "projects images, possibilities, and future paths" },
  ];
  const pt = (a: number, r = R) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)];
  const cur = sel === null ? null : P[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[340px]">
        <style>{`
          .aoh-po-ring { animation: aoh-po-turn 90s linear infinite; transform-origin: 168px 168px; }
          @keyframes aoh-po-turn { to { transform: rotate(360deg) } }
          .aoh-po-n { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-po-ring { animation: none } }
        `}</style>
        <svg viewBox="0 0 336 336" className="h-auto w-full" role="img" aria-labelledby="aoh-po-t">
          <title id="aoh-po-t">
            The Five Phases with their organ networks: Fire, Earth, Metal, Water and Wood set
            clockwise, generating around the rim.
          </title>
          <circle className="aoh-po-ring" cx={C} cy={C} r={R} fill="none" stroke="var(--gold)"
                  strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="2 9" />
          {P.map((_, i) => {
            const [x0, y0] = pt(P[i].ang);
            const [x1, y1] = pt(P[(i + 1) % 5].ang);
            const d = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / d, uy = (y1 - y0) / d;
            const on = sel === i;
            return (
              <line key={i} x1={x0 + ux * 30} y1={y0 + uy * 30} x2={x1 - ux * 30} y2={y1 - uy * 30}
                stroke="var(--gold)" strokeOpacity={sel === null ? 0.4 : on ? 1 : 0.12}
                strokeWidth={on ? 1.8 : 1} />
            );
          })}
          {P.map((n, i) => {
            const [x, y] = pt(n.ang);
            const on = sel === i;
            const next = sel !== null && (sel + 1) % 5 === i;
            return (
              <g key={n.k} className="aoh-po-n" onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={n.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={x} cy={y} r="28" fill="var(--void)" />
                <circle cx={x} cy={y} r="28" fill="none" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : next ? 0.8 : 0.5} strokeWidth={on ? 1.8 : 1} />
                <text x={x} y={y + 6} textAnchor="middle" className="font-serif" fontSize="18"
                      fill="var(--gold)" fillOpacity={on || sel === null ? 1 : 0.45}>{n.z}</text>
                <text x={x} y={y + 44} textAnchor="middle" className="font-mono" fontSize="7"
                      letterSpacing="1.4" fill="var(--muted-foreground)">{n.k.toUpperCase()}</text>
              </g>
            );
          })}
        </svg>
        <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          generating, clockwise
        </p>
      </div>

      <div className="min-h-[17rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.z} · {cur.k} — {cur.move}
            </p>
            <div className="mt-4 space-y-px">
              {[["Organ network", cur.org], ["Formative virtue", cur.virt],
                [`Spirit · ${cur.sp}`, cur.spD]].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[8.5rem_1fr] items-baseline gap-4 border-b border-border py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold-dim">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="border-t border-gold/50 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {cur.emo} — in its office
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cur.emoOK}</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  When it will not complete
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cur.emoOff}</p>
              </div>
            </div>
            <p className="mt-5 text-[11px] leading-relaxed text-bone/60">
              Not an emotion stored in an organ. Emotion, breath, bodily state, and interpretation
              participate in one mutually reinforcing configuration.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A complete metabolism of manifestation. Water preserves latent possibility; Wood
              initiates its emergence; Fire brings it into expression; Earth receives and
              incorporates its consequences; Metal distils what is valuable and releases what is
              finished; and Water receives the essence that remains, carrying it back into latency.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Which is where this meets the Crypt and the Ossuary — Metal dismantles completed
              formations, Water receives their distilled inheritance, and Wood lets a new form arise
              from a field already conditioned by what preceded it.
            </p>
            <p className="mt-4 font-serif text-lg italic leading-relaxed text-bone/85">
              Health is not the supremacy of one phase. It is the ability to move among all five
              without becoming trapped in any of them.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * ImaginalBridge — the six stages between an unrepresented force and an
 * embodied response. The bridge runs both ways, so the flow markers and the
 * transition text reverse with direction rather than being redrawn.
 */
function ImaginalBridge() {
  const [up, setUp] = useState(false);
  const [open, setOpen] = useState<number | null>(2);

  const S = [
    { k: "Hidden force", f: "An initially unrepresented tendency or modulation",
      m: "Not yet anything the soul can picture. It has direction, but no appearance." },
    { k: "Felt atmosphere", f: "Its affective, rhythmic, or bodily reception",
      m: "Warmth, pressure, attraction, unease, rhythm, a pull toward or away. The body registers it before the mind can name it." },
    { k: "Image", f: "Its first legible inward configuration",
      m: "Landscape, colour, face, animal, geometry, sound, movement, a dramatic situation. Not the first event — a contraction or a shift of attention may precede it — but the first point at which the modulation begins to appear as something." },
    { k: "Symbol", f: "An image stabilised across meanings and contexts",
      m: "The image holds still long enough to be recognised again, by others and in other settings. Salt has begun its work." },
    { k: "Diagram or ritual form", f: "A communicable and repeatable symbolic vessel",
      m: "Compressed relational reasoning: hierarchy, polarity, sequence, recursion, circulation made external and repeatable." },
    { k: "Embodiment", f: "The reorganisation of attention, conduct, and environment",
      m: "And because conduct alters the vessel and its Morphaithēr, it alters which images the vessel will be capable of receiving next. The bridge closes into a circuit." },
  ];
  const DOWN = [
    "received as warmth, pressure, rhythm, unease",
    "atmosphere finds its first legible configuration",
    "the image stabilises across meanings and contexts",
    "the symbol takes communicable, repeatable form",
    "form reorganises attention, conduct, and environment",
  ];
  const UP = [
    "feeling orients awareness toward a more encompassing pattern",
    "the image stirs feeling",
    "the symbol awakens an image",
    "a physical form awakens the symbol it carries",
    "conduct returns to the form that shaped it",
  ];

  return (
    <div>
      <style>{`
        .aoh-ib-dot { animation: aoh-ib-fall 2.6s linear infinite; }
        .aoh-ib-up .aoh-ib-dot { animation-direction: reverse; }
        @keyframes aoh-ib-fall { from { top: 0; opacity: 0 } 15%,85% { opacity: 1 } to { top: 100%; opacity: 0 } }
        @media (prefers-reduced-motion: reduce) { .aoh-ib-dot { animation: none; top: 50%; } }
      `}</style>

      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          {up ? "Ascent · symbol toward pattern" : "Descent · force toward action"}
        </p>
        <button
          onClick={() => setUp((v) => !v)}
          className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
        >
          reverse ↑↓
        </button>
      </div>

      <div className={`mt-6 ${up ? "aoh-ib-up" : ""} ${up ? "flex flex-col-reverse" : ""}`}>
        {S.map((st, i) => {
          const on = open === i;
          const conn = up ? UP[i - 1] : DOWN[i];
          return (
            <div key={st.k} className={up ? "flex flex-col-reverse" : ""}>
              <div>
                <button
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className={`flex w-full items-baseline gap-4 border-l-2 py-3 pl-4 text-left transition-colors ${
                    on ? "border-gold" : "border-border hover:border-gold/50"
                  }`}
                >
                  <span className="font-mono text-[10px] text-gold-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-serif text-lg ${on ? "text-gold" : "text-bone/85"}`}>
                    {st.k}
                  </span>
                  <span className="ml-auto hidden text-right text-xs leading-snug text-muted-foreground sm:block sm:max-w-[19rem]">
                    {st.f}
                  </span>
                </button>
                {on && (
                  <p className="aoh-pop border-l-2 border-gold/30 py-2 pl-[3.4rem] pr-4 text-sm leading-relaxed text-muted-foreground">
                    <span className="sm:hidden">{st.f}. </span>
                    {st.m}
                  </p>
                )}
              </div>
              {conn !== undefined && (
                <div className="relative ml-[0.4rem] flex items-center gap-3 py-1 pl-[3rem]">
                  <span className="absolute left-[0.1rem] top-0 h-full w-px bg-border" aria-hidden />
                  <span
                    className="aoh-ib-dot absolute left-[-0.05rem] h-[3px] w-[3px] rounded-full bg-gold"
                    aria-hidden
                  />
                  <span className="text-[11px] leading-snug text-bone/45">{conn}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Symbolon — the tally. One half is the visible form; the other is whichever
 * level it fits; consciousness is the third party that recognises the fit.
 * Both halves are the same disc under complementary clips, so the break is
 * necessarily exact: they can only fit each other.
 */
function Symbolon() {
  const [sel, setSel] = useState<number | null>(null);
  const JAG = "L177,22 L163,44 L179,66 L164,88 L177,110 L162,132 L176,154 L165,176 L170,210";
  const L = [
    { k: "The physical Sun", d: "The astronomical body — one centre, and everything else held in orbit around it." },
    { k: "Centre and circumference", d: "The bare geometry: a continuous boundary organised around a single point." },
    { k: "Gold", d: "The alchemical virtue — the metal that will not tarnish, incorruptible under trial." },
    { k: "The Heart", d: "The integrating function of § XXIV: relation gathered, warmed, and redistributed." },
    { k: "The Inner Sun", d: "Ignisophia's centre — wise fire, warming what is stagnant without consuming it." },
    { k: "Illumination", d: "The principle itself: that by which anything whatever becomes visible." },
    { k: "Sovereign inflation", d: "And the danger. The same centrality, mistaken for the whole of the field.", warn: true },
  ];
  const fitted = sel !== null;
  const cur = fitted ? L[sel] : null;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[360px]">
        <style>{`
          .aoh-sy-r { transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1); }
          .aoh-sy-seam { transition: opacity 500ms ease 380ms; }
          .aoh-sy-seam.on { animation: aoh-sy-glow 2.8s ease-in-out 900ms infinite; }
          @keyframes aoh-sy-glow { 0%,100% { opacity: .35 } 50% { opacity: .9 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-sy-r { transition: none } .aoh-sy-seam.on { animation: none; opacity: .7 }
          }
        `}</style>
        <svg viewBox="0 0 340 232" className="h-auto w-full" role="img" aria-labelledby="aoh-sy-t">
          <title id="aoh-sy-t">
            A broken disc in two halves. The left carries the visible form; the right carries the
            level it fits. Choosing a level closes the break.
          </title>
          <defs>
            <clipPath id="aoh-sy-L">
              <path d={`M0,0 L170,0 ${JAG} L0,210 Z`} />
            </clipPath>
            <clipPath id="aoh-sy-R">
              <path d={`M170,0 ${JAG} L340,210 L340,0 Z`} />
            </clipPath>
            <clipPath id="aoh-sy-disc">
              <circle cx="170" cy="100" r="78" />
            </clipPath>
          </defs>

          <g clipPath="url(#aoh-sy-L)">
            <circle cx="170" cy="100" r="78" fill="var(--void)" stroke="var(--gold)"
                    strokeOpacity={fitted ? 0.95 : 0.55} strokeWidth="1.1" />
            <circle cx="170" cy="100" r="62" fill="none" stroke="var(--gold)" strokeOpacity="0.2" strokeWidth="0.6" />
            <circle cx="170" cy="100" r="7" fill="var(--gold)" fillOpacity={fitted ? 0.9 : 0.5} />
          </g>

          <g className="aoh-sy-r" transform={`translate(${fitted ? 0 : 30},0)`}>
            <g clipPath="url(#aoh-sy-R)">
              <circle cx="170" cy="100" r="78" fill="var(--void)" stroke="var(--gold)"
                      strokeOpacity={fitted ? 0.95 : 0.3} strokeWidth="1.1" />
              <circle cx="170" cy="100" r="62" fill="none" stroke="var(--gold)"
                      strokeOpacity={fitted ? 0.2 : 0.08} strokeWidth="0.6" />
              {[0, 1, 2, 3, 4].map((i) => {
                const a = (-58 + i * 29) * (Math.PI / 180);
                return (
                  <line key={i} x1={170 + 20 * Math.cos(a)} y1={100 + 20 * Math.sin(a)}
                        x2={170 + 70 * Math.cos(a)} y2={100 + 70 * Math.sin(a)}
                        stroke="var(--gold)" strokeOpacity={fitted ? 0.5 : 0.14} strokeWidth="0.7" />
                );
              })}
            </g>
          </g>

          <path className={`aoh-sy-seam ${fitted ? "on" : ""}`} d={`M170,0 ${JAG}`} fill="none"
                stroke="var(--gold)" strokeWidth="1.4" opacity={fitted ? 0.6 : 0}
                clipPath="url(#aoh-sy-disc)" />

          <text x="86" y="203" textAnchor="middle" className="font-mono" fontSize="7.5"
                letterSpacing="1.5" fill="var(--muted-foreground)">VISIBLE FORM</text>
          <text x="254" y="203" textAnchor="middle" className="font-mono" fontSize="7.5"
                letterSpacing="1.5" fill={fitted ? "var(--gold)" : "var(--muted-foreground)"}>
            {fitted ? "FITS" : "THE LEVEL IT FITS"}
          </text>
          <text x="170" y="226" textAnchor="middle" className="font-mono" fontSize="7.5"
                letterSpacing="1.5" fill="var(--gold-dim)" opacity={fitted ? 1 : 0.35}>
            CONSCIOUSNESS RECOGNISES THE FIT
          </text>
        </svg>
      </div>

      <div className="min-h-[15rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          One half, seven locks — the solar symbolon
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {L.map((x, i) => (
            <button key={x.k} onClick={() => setSel(sel === i ? null : i)} aria-pressed={sel === i}
              className={`border px-3 py-1.5 text-left text-xs leading-snug transition-colors ${
                sel === i
                  ? x.warn ? "border-bone/60 text-bone" : "border-gold text-gold"
                  : "border-border text-muted-foreground hover:border-gold/60 hover:text-bone/80"
              }`}>
              {x.k}
            </button>
          ))}
        </div>
        {cur ? (
          <div className="mt-6 border-l-2 border-gold/50 pl-5">
            <p className="text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            {cur.warn && (
              <p className="mt-3 text-[11px] leading-relaxed text-bone/55">
                Listed with the rest deliberately. A symbol that fits a distortion as readily as a
                virtue is not thereby a false symbol — it is a symbol whose remainder has been
                forgotten.
              </p>
            )}
          </div>
        ) : (
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            The Greek <span className="italic">symbolon</span> was a token broken in two, each party
            keeping a half. Brought back together, the fit authenticated the bond — no half meant
            anything alone. Which makes it an exact figure for what a symbol is: not a container of
            meaning, but the half of a relation that becomes legible only on being matched.
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * ForceRegisters — the six categories drawn as three different KINDS of thing,
 * because they are not six equivalent substances. Transcendent, formative and
 * material are ontological registers (stacked bands); psychic and collective are
 * scales of organisation (bars cutting across every band); intermediary is a
 * function performed between registers (the serpentine thread crossing them).
 * Six equal boxes would state the opposite of the doctrine.
 */
function ForceRegisters() {
  const [sel, setSel] = useState<string | null>(null);
  const BANDS = [
    { k: "Transcendent", y: 16, mode: "Attraction, participation, finality",
      q: "Toward what does formation tend?",
      kind: "ontological register",
      d: "Strictly it should not be called a force at all — force implies operation inside a field of relations, and the Absolute cannot be placed in that field as its most powerful object. These orient without pushing. The Good does not shove a being toward goodness; it draws by becoming an object of participation." },
    { k: "Formative", y: 100, mode: "Patterning, proportion, constraint",
      q: "According to what organisation does it form?",
      kind: "ontological register",
      d: "Not the energy that moves a system but the pattern, boundary, proportion, gradient and attractor according to which movement takes form. A riverbed does not create the water. A scale does not create the sound." },
    { k: "Material", y: 184, mode: "Physical interaction, resistance, embodiment",
      q: "Through what concrete conditions does it occur?",
      kind: "ontological register",
      d: "Resistance, limitation, weight, delay, cost, irreversibility — not failures of spirit but the conditions through which formation acquires consequence. And matter answers back: exhaustion changes emotion, architecture changes movement, nutrition changes attention." },
  ];
  const BARS = [
    { k: "Psychic", x: 322, mode: "Attention, affect, intention, imagination",
      q: "How does it move within a conscious vessel?",
      kind: "scale of organisation",
      d: "Real, because it alters perception, physiology, choice, behaviour, relationship and environment — but never a disembodied substance inside the skull. Psychic force is embodied, relational, and field-dependent, which is why it cuts across every register rather than sitting in one." },
    { k: "Collective", x: 372, mode: "Emergence, coordination, social reinforcement",
      q: "How does it organise among many vessels?",
      kind: "scale of organisation",
      d: "Distributed causation. Language is produced by people, yet no single speaker controls it; money depends on recognition, yet determines what is possible for those born into it. More than any one participant's intention, without necessarily being an independently conscious being." },
  ];
  const THREAD = { k: "Intermediary", mode: "Translation and transduction",
    q: "How does it cross from one domain into another?",
    kind: "function between registers",
    d: "Not a sixth substance inserted between spirit and matter — the Mercurial category, naming any process that receives a pattern in one form, alters it by its own constitution, and delivers it in another. Which is why it is drawn crossing the registers rather than occupying one." };
  const ALL = [...BANDS, ...BARS, THREAD];
  const cur = ALL.find((x) => x.k === sel) || null;
  const on = (k: string) => sel === k;
  const dim = (k: string) => (sel && sel !== k ? 0.25 : 1);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[420px]">
        <style>{`
          .aoh-fr-t { stroke-dasharray: 5 7; animation: aoh-fr-flow 3.4s linear infinite; }
          @keyframes aoh-fr-flow { to { stroke-dashoffset: -24 } }
          .aoh-fr-h { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-fr-t { animation: none } }
        `}</style>
        <svg viewBox="0 0 420 292" className="h-auto w-full" role="img" aria-labelledby="aoh-fr-t2">
          <title id="aoh-fr-t2">
            Three stacked bands are ontological registers; two vertical bars cutting across all of
            them are scales of organisation; a serpentine thread crossing the bands is the
            intermediary function.
          </title>

          {BANDS.map((b) => (
            <g key={b.k} className="aoh-fr-h" opacity={dim(b.k)} onClick={() => setSel(on(b.k) ? null : b.k)}
               role="button" tabIndex={0} aria-pressed={on(b.k)} aria-label={b.k}
               onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on(b.k) ? null : b.k); } }}>
              <rect x="16" y={b.y} width="280" height="58" fill="var(--void)"
                    stroke="var(--gold)" strokeOpacity={on(b.k) ? 1 : 0.45} strokeWidth={on(b.k) ? 1.5 : 0.9} />
              <text x="76" y={b.y + 27} className="font-serif" fontSize="15"
                    fill={on(b.k) ? "var(--gold)" : "var(--bone)"} fillOpacity={on(b.k) ? 1 : 0.8}>{b.k}</text>
              <text x="76" y={b.y + 44} className="font-mono" fontSize="7" letterSpacing="1.1"
                    fill="var(--muted-foreground)">ONTOLOGICAL REGISTER</text>
            </g>
          ))}

          {BARS.map((b) => (
            <g key={b.k} className="aoh-fr-h" opacity={dim(b.k)} onClick={() => setSel(on(b.k) ? null : b.k)}
               role="button" tabIndex={0} aria-pressed={on(b.k)} aria-label={b.k}
               onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on(b.k) ? null : b.k); } }}>
              <rect x={b.x - 13} y="16" width="26" height="226" fill="var(--void)"
                    stroke="var(--gold)" strokeOpacity={on(b.k) ? 1 : 0.4} strokeWidth={on(b.k) ? 1.5 : 0.9} />
              {[45, 129, 213].map((cy) => (
                <line key={cy} x1={b.x - 13} y1={cy} x2={b.x + 13} y2={cy}
                      stroke="var(--gold)" strokeOpacity={on(b.k) ? 0.55 : 0.2} strokeWidth="0.6" />
              ))}
              <text x={b.x} y="129" textAnchor="middle" transform={`rotate(-90 ${b.x} 129)`}
                    className="font-mono" fontSize="9.5" letterSpacing="2"
                    fill={on(b.k) ? "var(--gold)" : "var(--bone)"} fillOpacity={on(b.k) ? 1 : 0.75}>
                {b.k.toUpperCase()}
              </text>
            </g>
          ))}

          <g className="aoh-fr-h" opacity={dim(THREAD.k)} onClick={() => setSel(on(THREAD.k) ? null : THREAD.k)}
             role="button" tabIndex={0} aria-pressed={on(THREAD.k)} aria-label={THREAD.k}
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on(THREAD.k) ? null : THREAD.k); } }}>
            <path className={on(THREAD.k) ? "aoh-fr-t" : "aoh-fr-t"}
                  d="M46,8 C70,44 22,64 46,87 C70,110 22,148 46,171 C70,196 22,222 46,250"
                  fill="none" stroke="var(--gold)" strokeOpacity={on(THREAD.k) ? 1 : 0.5}
                  strokeWidth={on(THREAD.k) ? 1.8 : 1.1} />
            {[87, 171].map((cy) => (
              <circle key={cy} cx="46" cy={cy} r={on(THREAD.k) ? 4 : 3} fill="var(--void)"
                      stroke="var(--gold)" strokeOpacity={on(THREAD.k) ? 1 : 0.55} strokeWidth="1" />
            ))}
            <text x="46" y="268" textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="1.2"
                  fill={on(THREAD.k) ? "var(--gold)" : "var(--muted-foreground)"}>INTERMEDIARY</text>
          </g>

          <text x="176" y="284" textAnchor="middle" className="font-mono" fontSize="7" letterSpacing="1.2"
                fill="var(--muted-foreground)" opacity="0.75">
            REGISTERS STACK · SCALES CUT ACROSS · THE FUNCTION CROSSES BETWEEN
          </text>
        </svg>
      </div>

      <div className="min-h-[16rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.k} — {cur.kind}
            </p>
            <div className="mt-4 space-y-px">
              <div className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-border py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold-dim">Causal mode</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{cur.mode}</span>
              </div>
              <div className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-border py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold-dim">It asks</span>
                <span className="font-serif text-base italic leading-relaxed text-gold">{cur.q}</span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              A force here is any organised capacity to produce, direct, inhibit, or transform a
              state — not necessarily a measurable physical energy. But the six categories are not
              six equivalent substances, and drawing them as six equal boxes would say the opposite
              of what they are.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Transcendent, formative and material name{" "}
              <span className="text-bone/90">ontological registers</span>. Psychic and collective
              name <span className="text-bone/90">scales of organisation</span>, which is why they
              cut across every register instead of occupying one. Intermediary names a{" "}
              <span className="text-bone/90">function performed between registers</span>, so it is
              drawn crossing them.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Holding that apart is what keeps the system from turning every influence into another
              invisible fluid.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * VerticalChain — the chain drawn radially, because the doctrine states its own
 * geometry: the Name is the governing centre, the Archangel the circumference of
 * an ordered field, Angels the differentiated rays between them, Spirits those
 * rays in local operation. "Vertical" never meant floors stacked in space, so a
 * ladder would import the wrong picture. Descent runs outward, return inward.
 */
function VerticalChain() {
  const [sel, setSel] = useState<string | null>(null);
  const [up, setUp] = useState(false);
  const C = 170;
  const RAYS = [-90, -30, 30, 90, 150, 210];
  const L = [
    { k: "Divine Name", kind: "participable virtue",
      q: "A verbal-symbolic vessel through which a divine relationship becomes intelligible and participable — not an exhaustive label attached to God.",
      d: "It stands at the boundary between apophatic transcendence and articulated Logos, which makes it a symbolon: it joins the unnameable to a form that can be spoken, remembered, contemplated, enacted. A sacred name is a gate, not the whole country beyond it." },
    { k: "Archangel", kind: "office of mediation",
      q: "The coordinating centre of an entire chain — archē means beginning, rule, governing principle, chief office.",
      d: "Not simply a more powerful Angel. Where the Name establishes the central virtue, the Archangel establishes its field-wide administration, holding many subordinate expressions inside one intelligible purpose. Its proper function is integration." },
    { k: "Intelligence", kind: "mode of operation",
      q: "The pattern-holding pole: ratio, direction, law, geometry, intelligible purpose.",
      d: "It asks what the intelligible organisation of a sphere is, where Spirit asks how that organisation becomes dynamically active here. Number and geometry suit it as symbols precisely because they preserve relationships without depending on any particular material embodiment." },
    { k: "Angel", kind: "office of mediation",
      q: "A differentiated ray of a more encompassing virtue. Angelos means messenger — an office, not a species.",
      d: "The Archangel is architectonic; the Angel is ministerial. And no Angel merely transports an unchanged packet: mediation is always translation, adapted to the capacity, language, symbols, and circumstances of whoever receives it. Wings say mobility between levels, not anatomy." },
    { k: "Spirit", kind: "mode of operation",
      q: "The dynamic, locally operative expression of a more intelligible pattern.",
      d: "The Intelligence holds the grammar; the Spirit performs an utterance. Strongly Mercurial — it circulates, animates, crosses boundaries, takes imaginal form. Its nearness to embodiment makes it responsive to local conditions and, by the same token, susceptible to turbulence, fixation, and admixture." },
    { k: "The vessel", kind: "embodiment",
      q: "Image, symbol, ritual, psyche, and material vessel — where the chain becomes actual.",
      d: "Every manifestation is also a transduction. Even were a spirit ontologically independent, its appearance is still shaped by the operator's condition, the symbolic vocabulary available, the surrounding Morphaithēr, collective expectation, bodily state, and the material environment." },
  ];
  const cur = L.find((x) => x.k === sel) || null;
  const on = (k: string) => sel === k;
  const dim = (k: string) => (sel && sel !== k ? 0.22 : 1);
  const pt = (a: number, r: number) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-vc-ray { stroke-dasharray: 4 11; animation: aoh-vc-out 3.2s linear infinite; }
          .aoh-vc-up .aoh-vc-ray { animation-direction: reverse; }
          @keyframes aoh-vc-out { to { stroke-dashoffset: -30 } }
          .aoh-vc-h { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-vc-ray { animation: none } }
        `}</style>
        <svg viewBox="0 0 340 340" className={`h-auto w-full ${up ? "aoh-vc-up" : ""}`}
             role="img" aria-labelledby="aoh-vc-t">
          <title id="aoh-vc-t">
            A radial chain: the Divine Name at the centre, the archangelic field as a
            circumference, the Intelligence as a ring of proportion, angelic rays crossing outward
            to spirits in local operation, and an outer boundary of vessels.
          </title>

          <g className="aoh-vc-h" opacity={dim("The vessel")} onClick={() => setSel(on("The vessel") ? null : "The vessel")}
             role="button" tabIndex={0} aria-pressed={on("The vessel")} aria-label="The vessel">
            <circle cx={C} cy={C} r="152" fill="none" stroke="var(--gold)" strokeDasharray="1 6"
                    strokeOpacity={on("The vessel") ? 0.9 : 0.28} strokeWidth={on("The vessel") ? 1.4 : 0.9} />
          </g>

          <g className="aoh-vc-h" opacity={dim("Angel")} onClick={() => setSel(on("Angel") ? null : "Angel")}
             role="button" tabIndex={0} aria-pressed={on("Angel")} aria-label="Angel">
            {RAYS.map((a) => {
              const [x1, y1] = pt(a, 54), [x2, y2] = pt(a, 126);
              return <line key={a} className="aoh-vc-ray" x1={x1} y1={y1} x2={x2} y2={y2}
                           stroke="var(--gold)" strokeOpacity={on("Angel") ? 1 : 0.55}
                           strokeWidth={on("Angel") ? 2 : 1.2} />;
            })}
          </g>

          <g className="aoh-vc-h" opacity={dim("Intelligence")} onClick={() => setSel(on("Intelligence") ? null : "Intelligence")}
             role="button" tabIndex={0} aria-pressed={on("Intelligence")} aria-label="Intelligence">
            <circle cx={C} cy={C} r="90" fill="none" stroke="var(--gold)" strokeDasharray="7 5"
                    strokeOpacity={on("Intelligence") ? 1 : 0.4} strokeWidth={on("Intelligence") ? 1.6 : 0.9} />
          </g>

          <g className="aoh-vc-h" opacity={dim("Archangel")} onClick={() => setSel(on("Archangel") ? null : "Archangel")}
             role="button" tabIndex={0} aria-pressed={on("Archangel")} aria-label="Archangel">
            <circle cx={C} cy={C} r="54" fill="none" stroke="var(--gold)"
                    strokeOpacity={on("Archangel") ? 1 : 0.6} strokeWidth={on("Archangel") ? 2 : 1.2} />
          </g>

          <g className="aoh-vc-h" opacity={dim("Spirit")} onClick={() => setSel(on("Spirit") ? null : "Spirit")}
             role="button" tabIndex={0} aria-pressed={on("Spirit")} aria-label="Spirit">
            {RAYS.map((a) => {
              const [x, y] = pt(a, 126);
              return <circle key={a} cx={x} cy={y} r={on("Spirit") ? 7 : 5} fill="var(--void)"
                             stroke="var(--gold)" strokeOpacity={on("Spirit") ? 1 : 0.6} strokeWidth="1.2" />;
            })}
          </g>

          <g className="aoh-vc-h" opacity={dim("Divine Name")} onClick={() => setSel(on("Divine Name") ? null : "Divine Name")}
             role="button" tabIndex={0} aria-pressed={on("Divine Name")} aria-label="Divine Name">
            <circle cx={C} cy={C} r="26" fill="var(--void)" stroke="var(--gold)"
                    strokeOpacity={on("Divine Name") ? 1 : 0.5} strokeWidth="1" />
            <circle cx={C} cy={C} r={on("Divine Name") ? 12 : 9} fill="var(--gold)"
                    fillOpacity={on("Divine Name") ? 1 : 0.7} />
          </g>

          <text x={C} y="330" textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="1.6"
                fill="var(--muted-foreground)">
            {up ? "RETURN · INWARD, TOWARD SILENCE" : "DESCENT · OUTWARD, TOWARD EMBODIMENT"}
          </text>
        </svg>

        <div className="mt-3 flex justify-center">
          <button onClick={() => setUp((v) => !v)}
            className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-gold hover:text-gold">
            reverse the chain ⇄
          </button>
        </div>
      </div>

      <div className="min-h-[16rem]">
        <div className="flex flex-wrap gap-2">
          {L.map((x) => (
            <button key={x.k} onClick={() => setSel(on(x.k) ? null : x.k)} aria-pressed={on(x.k)}
              className={`border px-3 py-1.5 text-xs transition-colors ${
                on(x.k) ? "border-gold text-gold"
                        : "border-border text-muted-foreground hover:border-gold/60 hover:text-bone/80"}`}>
              {x.k}
            </button>
          ))}
        </div>
        {cur ? (
          <>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.k} — {cur.kind}
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-bone/85">{cur.q}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cur.d}</p>
          </>
        ) : (
          <>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Vertical does not mean these occupy physical floors above the earth. It marks degrees
              of universality and participation — unitive, intelligible, differentiated, operative,
              embodied. The higher member holds a virtue more universally; the lower translates it
              into a more specialised function, adding definition while introducing limitation,
              interpretation, and the possibility of distortion.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Which is why it is drawn as a centre and its circumference rather than a stair. And it
              runs both ways: descent is how virtue becomes actual, return is how embodied experience
              is consciously reintegrated with its source.{" "}
              <span className="text-bone/90">Descent is not degradation.</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Hypostases — the three Plotinian levels with the Proclan rhythm around them.
 * The core never changes size or brightness while the pulses leave it, because
 * that is the whole counter-intuitive claim of procession: the higher principle
 * causes through intelligible abundance, not material subtraction. Selecting a
 * hypostasis also names what it must NOT be identified with, which is the part
 * of the mapping most easily lost.
 */
function Hypostases() {
  const [sel, setSel] = useState<number | null>(null);
  const [mv, setMv] = useState<number>(1);
  const C = 170;
  const H = [
    { k: "The One", r: 34,
      is: "Beyond being, form, number, and even ordinary thought — not one object among others, but the inexhaustible source from which determinate reality becomes possible.",
      not: "Root Ether",
      why: "The One is beyond every ether, force, field, substance, symbol, and distinction. Root Ether belongs to manifestation: it is the primordial condition through which forces, patterns, and qualities become transmissible." },
    { k: "Nous", r: 76,
      is: "Intellect. The realm of intelligible Being — the living unity of Forms, archetypes, and perfect relations.",
      not: "Light Ether",
      why: "Nous resembles the intelligible dimension of pattern and is not the same thing as it. The Greek hierarchy supplies an ontological architecture; the ethers describe formative operations occurring within manifested existence." },
    { k: "Soul", r: 118,
      is: "Psychē. The mediator through which intelligible order becomes movement, life, temporality, and the visible cosmos.",
      not: "Morphaithēr, or Life Ether",
      why: "Soul resembles the living mediator through which intelligible principles become cosmic and embodied activity — and it is more comprehensive than either of them." },
  ];
  const M = [
    { k: "Monē", g: "Remaining in the source",
      d: "A principle retains its identity. The One loses nothing by producing Nous, and Nous is not divided into fragments when Soul proceeds from it. Higher principles remain undiminished because they cause through intelligible abundance rather than material subtraction — a candle lighting another candle, imperfectly but usefully: the first flame does not become smaller." },
    { k: "Proodos", g: "Proceeding into expression",
      d: "Not a temporal event in which the One existed alone and later created the universe, and not a physical substance leaking downward. It is an eternal relation of dependence: every lesser unity exists because it participates in a more encompassing unity." },
    { k: "Epistrophē", g: "Returning toward the source",
      d: "Not necessarily spatial ascent, and not a rejection of matter. It is the recovery of unity, intelligibility, and orientation within multiplicity — a being returns by realising the principle it derives from and organising its life accordingly." },
  ];
  const cur = sel === null ? null : H[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[360px]">
        <style>{`
          .aoh-hy-p { transform-origin: 170px 170px; animation: aoh-hy-out 5s ease-out infinite; }
          .aoh-hy-p2 { animation-delay: 1.66s } .aoh-hy-p3 { animation-delay: 3.33s }
          @keyframes aoh-hy-out { from { transform: scale(.2); opacity:.75 } to { transform: scale(1); opacity:0 } }
          .aoh-hy-r { transform-origin: 170px 170px; animation: aoh-hy-in 5s ease-in infinite; }
          .aoh-hy-r2 { animation-delay: 2.5s }
          @keyframes aoh-hy-in { from { transform: scale(1); opacity:0 } 25%,60% { opacity:.7 } to { transform: scale(.22); opacity:0 } }
          .aoh-hy-core { animation: aoh-hy-steady 5s ease-in-out infinite; transform-origin: 170px 170px; }
          @keyframes aoh-hy-steady { 0%,100% { opacity:.92 } 50% { opacity:1 } }
          @media (prefers-reduced-motion: reduce) {
            .aoh-hy-p,.aoh-hy-r,.aoh-hy-core { animation: none } .aoh-hy-p,.aoh-hy-r { opacity:.3 }
          }
        `}</style>
        <svg viewBox="0 0 340 352" className="h-auto w-full" role="img" aria-labelledby="aoh-hy-t">
          <title id="aoh-hy-t">
            Three nested levels — the One at the centre, Nous, and Soul — with pulses proceeding
            outward and arcs returning inward while the core stays constant.
          </title>

          <circle cx={C} cy={C} r="150" fill="none" stroke="var(--gold)" strokeDasharray="1 7"
                  strokeOpacity="0.22" strokeWidth="0.8" />

          {mv !== 2 && [1, 2, 3].map((i) => (
            <circle key={i} className={`aoh-hy-p ${i === 2 ? "aoh-hy-p2" : i === 3 ? "aoh-hy-p3" : ""}`}
                    cx={C} cy={C} r="150" fill="none" stroke="var(--gold)"
                    strokeWidth={mv === 1 ? 1.4 : 0.8} strokeOpacity={mv === 1 ? 1 : 0.4} />
          ))}
          {mv !== 1 && [1, 2].map((i) => (
            <circle key={i} className={`aoh-hy-r ${i === 2 ? "aoh-hy-r2" : ""}`}
                    cx={C} cy={C} r="150" fill="none" stroke="var(--bone)"
                    strokeDasharray="3 9" strokeWidth={mv === 2 ? 1.4 : 0.8}
                    strokeOpacity={mv === 2 ? 0.9 : 0.35} />
          ))}

          {H.slice().reverse().map((h) => {
            const i = H.indexOf(h);
            const on = sel === i;
            return (
              <g key={h.k} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={h.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={C} cy={C} r={h.r} fill="var(--void)" fillOpacity={i === 0 ? 1 : 0.55}
                        stroke="var(--gold)" strokeOpacity={on ? 1 : sel === null ? 0.6 : 0.25}
                        strokeWidth={on ? 2 : 1.1} />
                <text x={C} y={C - h.r + 15} textAnchor="middle" className="font-mono"
                      fontSize="8" letterSpacing="1.5"
                      fill={on ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel === null || on ? 1 : 0.35}>
                  {h.k.toUpperCase()}
                </text>
              </g>
            );
          })}
          <circle className="aoh-hy-core" cx={C} cy={C} r="13" fill="var(--gold)" />

          <text x={C} y="342" textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="1.5"
                fill="var(--muted-foreground)">
            THE CORE NEVER DIMINISHES
          </text>
        </svg>

        <div className="mt-3 flex justify-center gap-2">
          {M.map((m, i) => (
            <button key={m.k} onClick={() => setMv(i)} aria-pressed={mv === i}
              className={`border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                mv === i ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/60"}`}>
              {m.k}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-bone/55">
          {M[mv].g}
        </p>
      </div>

      <div className="min-h-[17rem]">
        <div className="flex flex-wrap gap-2">
          {H.map((h, i) => (
            <button key={h.k} onClick={() => setSel(sel === i ? null : i)} aria-pressed={sel === i}
              className={`border px-3 py-1.5 text-xs transition-colors ${
                sel === i ? "border-gold text-gold"
                          : "border-border text-muted-foreground hover:border-gold/60 hover:text-bone/80"}`}>
              {h.k}
            </button>
          ))}
        </div>
        {cur ? (
          <>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{cur.is}</p>
            <div className="mt-6 border-l-2 border-bone/40 pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70">
                Not to be identified with — {cur.not}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cur.why}</p>
            </div>
          </>
        ) : (
          <>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {M[mv].k} — {M[mv].g}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{M[mv].d}</p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Procession without return produces dispersion. Return without procession becomes
              sterile transcendence. The complete rhythm is source, expression, integration.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * DaimonicChain — the descent from divine virtue to embodied consequence, with
 * the feedback the document insists on: consequence returns to CHARACTER, not to
 * the source. So the loop closes partway up the chain rather than reversing the
 * whole of it, which is what separates a governing attractor from a puppet master.
 */
function DaimonicChain() {
  const [sel, setSel] = useState<number | null>(null);
  const N = [
    { k: "Divine virtue", d: "A relatively universal and undivided causation — a virtue held whole, before any distribution." },
    { k: "Celestial order", d: "The patterned sky at embodiment. A natal chart maps these conditions, and is the celestial trace of what daimonic mediation administers — not the daimōn itself." },
    { k: "Daimonic mediation", d: "The distributor of particularity. If a divine power is a sun, daimons are not rays broken off it but differentiated administrations of its illumination — and mediation is never neutral: every mediator conditions what it transmits." },
    { k: "Personal pattern", d: "The allotment: body, ancestry, historical placement, celestial configuration, natural capacity, limitation, circumstantial tendency. Fate provides the instrument; it does not determine the music." },
    { k: "Character", d: "Not a moral label but a structure of reception — it decides which currents enter easily, which are distorted, which are refused, and which are magnified.", layers: true },
    { k: "Choice", d: "Conditioned, and not thereby determined. The manner in which an allotment is inhabited is not fixed in advance." },
    { k: "Embodied consequence", d: "Where the current reaches Prithivi and becomes commitment, habit, craft, and material result. A calling that never arrives here remains an atmosphere of possibility — it may inspire endlessly without producing a life." },
  ];
  const LAYERS = [
    ["Given character", "Body, temperament, ancestry, natal and environmental conditions", "received rather than chosen"],
    ["Acquired character", "Habits, attachments, defences, skills, repeated choices", "conditioned but changeable"],
    ["Daimonic character", "Vocation, higher orientation, formative potential, governing pattern", "discovered and consciously embodied"],
  ];
  const Y = (i: number) => 34 + i * 58;
  const cur = sel === null ? null : N[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[330px]">
        <style>{`
          .aoh-dc-spine { stroke-dasharray: 4 9; animation: aoh-dc-down 3.6s linear infinite; }
          @keyframes aoh-dc-down { to { stroke-dashoffset: -26 } }
          .aoh-dc-loop { stroke-dasharray: 3 8; animation: aoh-dc-up 3.6s linear infinite; }
          @keyframes aoh-dc-up { to { stroke-dashoffset: 22 } }
          .aoh-dc-n { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-dc-spine,.aoh-dc-loop { animation: none } }
        `}</style>
        <svg viewBox="0 0 330 430" className="h-auto w-full" role="img" aria-labelledby="aoh-dc-t">
          <title id="aoh-dc-t">
            A descending chain of seven stages from divine virtue to embodied consequence, with a
            return arc carrying consequence back to character rather than to the source.
          </title>

          <line className="aoh-dc-spine" x1="52" y1={Y(0)} x2="52" y2={Y(6)}
                stroke="var(--gold)" strokeOpacity="0.5" strokeWidth="1.1" />

          {/* the loop closes at character, four stages down — not at the top */}
          <path className="aoh-dc-loop" d={`M52,${Y(6)} C12,${Y(6) - 6} 12,${Y(4) + 8} 52,${Y(4)}`}
                fill="none" stroke="var(--bone)" strokeOpacity="0.55" strokeWidth="1.1" />
          <text x="6" y={(Y(4) + Y(6)) / 2} className="font-mono" fontSize="6.5" letterSpacing="0.8"
                fill="var(--muted-foreground)" transform={`rotate(-90 6 ${(Y(4) + Y(6)) / 2})`}
                textAnchor="middle">FEEDS BACK</text>

          {N.map((n, i) => {
            const on = sel === i;
            return (
              <g key={n.k} className="aoh-dc-n" onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={n.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx="52" cy={Y(i)} r={on ? 8 : 5.5} fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : sel === null ? 0.65 : 0.28} strokeWidth={on ? 2 : 1.1} />
                <text x="72" y={Y(i) + 4} className="font-serif" fontSize="13.5"
                      fill={on ? "var(--gold)" : "var(--bone)"}
                      fillOpacity={on ? 1 : sel === null ? 0.82 : 0.3}>{n.k}</text>
              </g>
            );
          })}
          <text x="72" y={Y(6) + 26} className="font-mono" fontSize="7" letterSpacing="1.2"
                fill="var(--muted-foreground)">RETURNS TO CHARACTER — NOT TO THE SOURCE</text>
        </svg>
      </div>

      <div className="min-h-[17rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">{cur.k}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            {cur.layers && (
              <div className="mt-6 space-y-px">
                {LAYERS.map(([a, b, c]) => (
                  <div key={a} className="border-b border-border py-3">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">{a}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone/45">{c}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The chain is not a one-way command. Consequences feed back into character, character
              changes perception, and perception alters receptivity to the daimonic current — so
              repeated choices either clarify the mediation or obscure it.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Which is why the return arc closes at character rather than running back to the source.
              The daimōn is not a puppet master working the personality.{" "}
              <span className="text-bone/90">It is closer to a governing attractor</span> — a living
              vertical current continually calling a person&rsquo;s dispersed forces toward a more
              coherent configuration.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              Select any stage. Character opens into its three layers.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * RiteSequence — the bounded enactment. Five stages inside a threshold, each
 * feeding the object at the centre. Switching to displaced object changes NOTHING
 * about the sequence, which is the whole claim: the form survives because
 * something is still being fed by it, even when that something is no longer what
 * the participants name.
 */
function RiteSequence() {
  const [displaced, setDisplaced] = useState(false);
  const [sel, setSel] = useState<number | null>(null);
  const ST = [
    { k: "Purification", d: "prepares what invocation addresses" },
    { k: "Invocation", d: "establishes what offering joins" },
    { k: "Offering", d: "joins what participation receives" },
    { k: "Participation", d: "receives what sealing preserves" },
    { k: "Sealing", d: "preserves what the passage produced" },
  ];
  const SUB = ["institutional continuity", "collective identity", "authority",
               "anxiety management", "the preservation of an egregore"];
  const X = (i: number) => 42 + i * 74;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[400px]">
        <style>{`
          .aoh-rt-f { stroke-dasharray: 3 7; animation: aoh-rt-feed 2.9s linear infinite; }
          @keyframes aoh-rt-feed { to { stroke-dashoffset: -20 } }
          .aoh-rt-n { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-rt-f { animation: none } }
        `}</style>
        <svg viewBox="0 0 400 270" className="h-auto w-full" role="img" aria-labelledby="aoh-rt-t">
          <title id="aoh-rt-t">
            Five ordered stages inside a threshold, each feeding a single object at the centre. The
            sequence is unchanged when the object is displaced.
          </title>

          {/* the threshold — a bounded world, with a gate on the left where it is crossed */}
          <path d="M28,26 L28,14 M28,42 L28,150 L372,150 L372,14 L28,14"
                fill="none" stroke="var(--gold)" strokeOpacity="0.4" strokeWidth="1" />
          <text x="24" y="37" textAnchor="end" className="font-mono" fontSize="6.5"
                letterSpacing="0.8" fill="var(--muted-foreground)"
                transform="rotate(-90 24 37)">THRESHOLD</text>

          {ST.map((st, i) => {
            const on = sel === i;
            return (
              <g key={st.k} className="aoh-rt-n" onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={st.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={X(i)} cy="58" r={on ? 15 : 12} fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={on ? 1 : 0.6} strokeWidth={on ? 1.8 : 1} />
                <text x={X(i)} y="62" textAnchor="middle" className="font-mono" fontSize="9"
                      fill="var(--gold)" fillOpacity={on ? 1 : 0.75}>{i + 1}</text>
                <text x={X(i)} y="92" textAnchor="middle" className="font-mono" fontSize="6.4"
                      letterSpacing="0.7" fill={on ? "var(--gold)" : "var(--muted-foreground)"}>
                  {st.k.toUpperCase()}
                </text>
                {i < 4 && (
                  <line x1={X(i) + 14} y1="58" x2={X(i + 1) - 14} y2="58" stroke="var(--gold)"
                        strokeOpacity="0.45" strokeWidth="1" />
                )}
                {/* every stage feeds the object */}
                <line className="aoh-rt-f" x1={X(i)} y1="104" x2="200" y2="196"
                      stroke={displaced ? "var(--bone)" : "var(--gold)"}
                      strokeOpacity={displaced ? 0.5 : 0.45} strokeWidth="0.9" />
              </g>
            );
          })}

          <ellipse cx="200" cy="212" rx="96" ry="26" fill="var(--void)"
                   stroke={displaced ? "var(--bone)" : "var(--gold)"}
                   strokeOpacity={displaced ? 0.75 : 0.9}
                   strokeDasharray={displaced ? "5 4" : "none"} strokeWidth="1.4" />
          <text x="200" y="209" textAnchor="middle" className="font-mono" fontSize="7"
                letterSpacing="1.3" fill={displaced ? "var(--bone)" : "var(--gold)"}>
            {displaced ? "OPERATIVE OBJECT" : "DECLARED OBJECT"}
          </text>
          <text x="200" y="223" textAnchor="middle" className="font-mono" fontSize="6.2"
                letterSpacing="0.9" fill="var(--muted-foreground)">
            {displaced ? "NO LONGER WHAT IS NAMED" : "WHAT THE PARTICIPANTS NAME"}
          </text>
          <text x="200" y="258" textAnchor="middle" className="font-mono" fontSize="6.6"
                letterSpacing="1.1" fill="var(--muted-foreground)" opacity="0.8">
            THE SEQUENCE IS IDENTICAL IN BOTH STATES
          </text>
        </svg>

        <div className="mt-3 flex justify-center">
          <button onClick={() => setDisplaced((v) => !v)}
            className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-gold hover:text-gold">
            {displaced ? "restore the declared object" : "displace the object"}
          </button>
        </div>
      </div>

      <div className="min-h-[15rem]">
        {sel !== null ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {String(sel + 1).padStart(2, "0")} · {ST[sel].k}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/85">
              {ST[sel].k} {ST[sel].d}.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Sequence creates dependency — which is why order here is neither decorative nor
              universally fixed. It expresses the causal grammar of this particular operation, and
              altering it may weaken the rite, reverse its movement, or produce a different operation
              altogether.
            </p>
          </>
        ) : displaced ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/70">
              Telestic inertia
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A rite that loses its declared object does not thereby become objectless. Its operative
              object may simply change, silently, while every gesture stays in place. What it comes
              to serve instead:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SUB.map((x) => (
                <span key={x} className="border border-border px-2.5 py-1 text-xs text-bone/70">{x}</span>
              ))}
            </div>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              The form survives because something is still being fed by it — even though that
              something is no longer what the participants name.
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The threshold establishes a temporary world of operation. Crossing it changes what
              gestures, words, materials, and persons are permitted to mean and to do — and inside
              that boundary the five stages are not a list but a dependency: each prepares the
              conditions the next requires.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              Select a stage for its dependency. Or displace the object, and watch the sequence
              refuse to change.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Carriers — tradition as a redundant constellation. Every carrier can be lost,
 * and the pattern stays triangulable well past the loss of any single one, which
 * is the claim: no carrier contains the whole, and convergence is what survives
 * Transductive Loss. Strike enough of them out and recognition degrades by
 * degrees rather than switching off.
 */
function Carriers() {
  const C = ["Texts", "Gestures", "Rhythms", "Prohibitions", "Stories",
             "Exemplars", "Offices", "Material forms", "Interpretive habits", "Embodied practice"];
  const [lost, setLost] = useState<number[]>([]);
  const [mode, setMode] = useState(0);
  const MODES = [
    { k: "Living", d: "Transmits formative capacity. It still produces recognition, transformation, competent practitioners, and meaningful adaptations." },
    { k: "Preserved", d: "Retains morphology, but no longer reliably reproduces the capacity that gave the morphology its meaning." },
    { k: "Parasitic", d: "Remains fully operational, while its operative end has shifted toward preserving the collective form by consuming the vitality, freedom, or resources of its participants." },
  ];
  const held = C.length - lost.length;
  const state = held >= 8 ? "RECOGNISED" : held >= 5 ? "TRIANGULABLE" : held >= 3 ? "ATTENUATED" : held >= 1 ? "MORPHOLOGY ONLY" : "UNRECOVERABLE";
  const CX = 170, CY = 168;
  const pt = (i: number, r: number) => {
    const a = (-90 + i * 36) * (Math.PI / 180);
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[360px]">
        <svg viewBox="0 0 340 360" className="h-auto w-full" role="img" aria-labelledby="aoh-cr-t">
          <title id="aoh-cr-t">
            Ten carriers arranged around a central pattern, each connected to it. Carriers can be
            struck out; the pattern degrades by degrees rather than failing at once.
          </title>
          {C.map((_, i) => {
            const [x, y] = pt(i, 118);
            const gone = lost.includes(i);
            return (
              <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="var(--gold)"
                    strokeOpacity={gone ? 0.07 : 0.4}
                    strokeDasharray={gone ? "2 6" : "none"} strokeWidth="0.9" />
            );
          })}
          <circle cx={CX} cy={CY} r="42" fill="var(--void)" stroke="var(--gold)"
                  strokeOpacity={held >= 5 ? 0.9 : held >= 3 ? 0.45 : 0.2}
                  strokeWidth={held >= 5 ? 1.6 : 1}
                  strokeDasharray={held >= 5 ? "none" : "4 5"} />
          <text x={CX} y={CY - 4} textAnchor="middle" className="font-mono" fontSize="7"
                letterSpacing="1" fill="var(--muted-foreground)">PATTERN</text>
          <text x={CX} y={CY + 9} textAnchor="middle" className="font-mono" fontSize="6.6"
                letterSpacing="0.9"
                fill={held >= 5 ? "var(--gold)" : "var(--bone)"} fillOpacity={held >= 5 ? 1 : 0.6}>
            {state}
          </text>
          <text x={CX} y={CY + 24} textAnchor="middle" className="font-mono" fontSize="6.2"
                fill="var(--muted-foreground)">{held} / {C.length} HELD</text>

          {C.map((c, i) => {
            const [x, y] = pt(i, 118);
            const gone = lost.includes(i);
            const right = x > CX + 4, mid = Math.abs(x - CX) <= 4;
            return (
              <g key={c} style={{ cursor: "pointer" }}
                 onClick={() => setLost((l) => l.includes(i) ? l.filter((v) => v !== i) : [...l, i])}
                 role="button" tabIndex={0} aria-pressed={gone} aria-label={`${c}${gone ? " (lost)" : ""}`}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLost((l) => l.includes(i) ? l.filter((v) => v !== i) : [...l, i]); } }}>
                <circle cx={x} cy={y} r="6" fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={gone ? 0.2 : 0.85} strokeWidth="1" />
                {gone && (
                  <>
                    <line x1={x - 4} y1={y - 4} x2={x + 4} y2={y + 4} stroke="var(--bone)" strokeOpacity="0.5" strokeWidth="0.9" />
                    <line x1={x - 4} y1={y + 4} x2={x + 4} y2={y - 4} stroke="var(--bone)" strokeOpacity="0.5" strokeWidth="0.9" />
                  </>
                )}
                <text x={mid ? x : right ? x + 11 : x - 11} y={mid ? (y < CY ? y - 12 : y + 17) : y + 3}
                      textAnchor={mid ? "middle" : right ? "start" : "end"}
                      className="font-mono" fontSize="6.6" letterSpacing="0.5"
                      fill={gone ? "var(--muted-foreground)" : "var(--bone)"}
                      opacity={gone ? 0.4 : 0.9}>{c.toUpperCase()}</text>
              </g>
            );
          })}
          <text x={CX} y="348" textAnchor="middle" className="font-mono" fontSize="6.6"
                letterSpacing="1.1" fill="var(--muted-foreground)" opacity="0.8">
            STRIKE OUT CARRIERS — NO ONE OF THEM HOLDS THE WHOLE
          </text>
        </svg>
        {lost.length > 0 && (
          <div className="mt-3 flex justify-center">
            <button onClick={() => setLost([])}
              className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-gold hover:text-gold">
              restore all carriers
            </button>
          </div>
        )}
      </div>

      <div className="min-h-[15rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          Three states a tradition can be in
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {MODES.map((m, i) => (
            <button key={m.k} onClick={() => setMode(i)} aria-pressed={mode === i}
              className={`border px-3 py-1.5 text-xs transition-colors ${
                mode === i ? (i === 2 ? "border-bone/60 text-bone" : "border-gold text-gold")
                           : "border-border text-muted-foreground hover:border-gold/60"}`}>
              {m.k}
            </button>
          ))}
        </div>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{MODES[mode].d}</p>
        {mode === 2 && (
          <p className="mt-4 text-sm leading-relaxed text-bone/65">
            Which means a parasitic tradition is not simply dead. It is a living collective mechanism
            organised around the survival of an emptied or displaced telos — § XXVIII&rsquo;s
            institutions preserving the rule long after losing the value.
          </p>
        )}
        <p className="mt-8 text-sm leading-relaxed text-bone/60">
          {lost.length === 0
            ? "Every carrier is intact. Strike some out to see how much can be lost before recognition fails."
            : held >= 5
              ? `${lost.length} lost, and the pattern is still triangulable from what converges on it.`
              : held >= 1
                ? `${lost.length} lost. What remains carries shape without reliably carrying the capacity to read it.`
                : "Nothing converges. Words and forms may survive in an archive; the perception that reads them does not."}
        </p>
      </div>
    </div>
  );
}

/**
 * ArchitectureIndex — the index, plus routes through it. Forty sections in
 * sequence is a catalogue, not a way in; a path names a defensible order and a
 * reason for each step. Selecting one marks its members in place rather than
 * extracting them, so the route stays visible inside the whole.
 */
function ArchitectureIndex() {
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
function ForceAndForm() {
  const [sel, setSel] = useState<number | null>(null);
  const S = [
    { k: "Potency", d: "Structured possibility — not an unlimited cloud of everything imaginable. A seed holds the potency of a particular plant; an instrument, a range set by its material and construction." },
    { k: "Bias", d: "An asymmetry appears: an attraction, a tension, a need, an intention, an environmental pressure, a morphogenic lean. The tattvas belong here — they do not manufacture the form, they predispose force toward a mode of expression." },
    { k: "Vector", d: "The asymmetry gives the potency a direction. What could have gone many ways now leans one way." },
    { k: "Activity", d: "The vector meets a medium, and the medium answers with both resistance and affordance. Neither alone would produce anything." },
    { k: "Recurrence", d: "Repetition deepens the pathway. Feedback reinforces some movements and suppresses others, and the difference between them begins to matter." },
    { k: "Stabilisation", d: "Activity becomes steady enough to hold a recognisable relation. This is where Salt does its work — fixing what has been achieved into something durable." },
    { k: "Visible form", d: "The late result of an invisible history. By the time a form can be seen, touched, named, or measured, every selection above it has already been made." },
  ];
  const Y = (i: number) => 244 - i * 33;
  const X = (i: number) => 52 + i * 40;
  const cur = sel === null ? null : S[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[380px]">
        <style>{`
          .aoh-ff-r { stroke-dasharray: 4 8; animation: aoh-ff-turn 4s linear infinite; }
          @keyframes aoh-ff-turn { to { stroke-dashoffset: -24 } }
          .aoh-ff-n { cursor: pointer; }
          @media (prefers-reduced-motion: reduce) { .aoh-ff-r { animation: none } }
        `}</style>
        <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-labelledby="aoh-ff-t">
          <title id="aoh-ff-t">
            Seven ascending steps from potency to visible form, with a threshold of visibility
            crossed only at the last, and a return arc carrying structure back into new potency.
          </title>

          {/* threshold of visibility — only the final step rises above it */}
          <line x1="14" y1={Y(6) + 17} x2="366" y2={Y(6) + 17} stroke="var(--gold)"
                strokeOpacity="0.45" strokeDasharray="6 5" strokeWidth="1" />
          <text x="14" y={Y(6) + 11} className="font-mono" fontSize="6.6" letterSpacing="1.1"
                fill="var(--gold)" fillOpacity="0.8">THRESHOLD OF VISIBILITY</text>
          <text x="366" y={Y(6) + 29} textAnchor="end" className="font-mono" fontSize="6.2"
                letterSpacing="0.9" fill="var(--muted-foreground)">EVERYTHING BELOW HAS ALREADY HAPPENED</text>

          {S.map((_, i) => i < 6 && (
            <line key={i} x1={X(i)} y1={Y(i)} x2={X(i + 1)} y2={Y(i + 1)}
                  stroke="var(--gold)" strokeOpacity={sel === null ? 0.45 : 0.18} strokeWidth="1" />
          ))}

          {/* actuality does not exhaust potency: structure becomes the vessel of new potency */}
          <path className="aoh-ff-r" d={`M${X(6)},${Y(6) - 16} C${X(6) + 20},${Y(6) - 60} 40,${Y(0) - 90} ${X(0)},${Y(0) - 16}`}
                fill="none" stroke="var(--bone)" strokeOpacity="0.45" strokeWidth="1" />
          <text x="196" y="26" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)">STRUCTURE BECOMES THE VESSEL OF NEW POTENCY</text>

          {S.map((st, i) => {
            const on = sel === i;
            const vis = i === 6;
            return (
              <g key={st.k} className="aoh-ff-n" onClick={() => setSel(on ? null : i)}
                 role="button" tabIndex={0} aria-pressed={on} aria-label={st.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(on ? null : i); } }}>
                <circle cx={X(i)} cy={Y(i)} r={on ? 9 : 6} fill={vis ? "var(--gold)" : "var(--void)"}
                        fillOpacity={vis ? (on ? 1 : 0.85) : 1}
                        stroke="var(--gold)" strokeOpacity={on ? 1 : sel === null ? 0.7 : 0.3}
                        strokeWidth={on ? 2 : 1.1} />
                <text x={X(i)} y={Y(i) - 15} textAnchor="middle" className="font-mono" fontSize="6.6"
                      letterSpacing="0.7"
                      fill={on ? "var(--gold)" : vis ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={sel === null || on || vis ? 1 : 0.35}>
                  {st.k.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="min-h-[15rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {String((sel as number) + 1).padStart(2, "0")} · {cur.k}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            {sel === 6 && (
              <p className="mt-4 border-l-2 border-gold/50 pl-5 text-sm leading-relaxed text-bone/75">
                Which is why visibility should never be confused with beginning. What appears
                suddenly at the visible level may have been assembling gradually in subtler
                conditions for a very long time.
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The descent from potency into activity is not a fall into inferiority. It is a descent
              into <span className="text-bone/90">determination</span> — and to become actual is to
              surrender alternative possibilities in exchange for concrete existence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Six of these seven steps happen below the threshold. Only the last can be seen, touched,
              named, or measured, which makes visible structure the final witness of a formative
              process rather than its origin.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              And the arc returning overhead is the part easiest to miss: actuality does not exhaust
              potency. A realised form generates new capacities, and becomes the ground of further
              possibility.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * EthericTides — three nested cycles at different periods, read at one instant.
 * The point is superposition: no single cycle gives the condition of a moment,
 * and the composite is what the field actually offers. Move the reading line to
 * see the same three rhythms reinforce, oppose, or complicate one another.
 */
function EthericTides() {
  const [t, setT] = useState(0.18);
  const X0 = 34, X1 = 372, W = X1 - X0;
  const ROWS = [
    { k: "Daily", p: 5.5, y: 62, note: "light and dark, waking and withdrawal",
      names: ["Dawn — emergence and orientation", "Noon — definition and outward expression",
              "Dusk — transition and release", "Night — withdrawal, recombination, gestation"] },
    { k: "Lunar", p: 2, y: 132, note: "concealment, accumulation, visibility, recession",
      names: ["Waxing — gathering", "Full — manifestation and exposure",
              "Waning — separation and return", "Dark — latency and reconfiguration"] },
    { k: "Seasonal", p: 0.75, y: 202, note: "the solar cycle embodied by an ecosystem",
      names: ["Emergence — germination", "Fruition — expansion and yield",
              "Decline — separation and storing", "Dormancy — latency"] },
  ];
  const AMP = 26;
  const phaseAt = (p: number, u: number) => (u * p) % 1;
  const yAt = (r: { p: number; y: number }, u: number) =>
    r.y - AMP * Math.sin(2 * Math.PI * phaseAt(r.p, u));
  const quarter = (f: number) => Math.min(3, Math.floor(f * 4));
  // rising on the first half of the swing, receding on the second
  const dir = (f: number) => (f < 0.25 ? "rising" : f < 0.5 ? "cresting" : f < 0.75 ? "receding" : "trough");

  const path = (r: { p: number; y: number }) => {
    let d = "";
    for (let i = 0; i <= 220; i++) {
      const u = i / 220;
      d += `${i === 0 ? "M" : "L"}${(X0 + u * W).toFixed(1)},${yAt(r, u).toFixed(1)}`;
    }
    return d;
  };
  const states = ROWS.map((r) => dir(phaseAt(r.p, t)));
  const rising = states.filter((x) => x === "rising" || x === "cresting").length;
  const composite =
    rising === 3 ? "All three gathering. The field offers least resistance to accumulation and impression."
    : rising === 0 ? "All three receding or latent. Favourable to release, rest, concealment, and reconfiguration."
    : rising === 2 ? "Two gathering against one receding. A workable but partial sympathy."
    : "One gathering against two receding. Effort here runs against the larger movement.";

  const move = (clientX: number, el: SVGSVGElement) => {
    const b = el.getBoundingClientRect();
    const u = ((clientX - b.left) / b.width) * (400 / 400);
    setT(Math.max(0, Math.min(1, (u * 400 - X0) / W)));
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[420px]">
        <svg viewBox="0 0 400 250" className="h-auto w-full" style={{ cursor: "ew-resize" }}
             role="img" aria-labelledby="aoh-et-t"
             onClick={(e) => move(e.clientX, e.currentTarget)}
             onMouseMove={(e) => { if (e.buttons === 1) move(e.clientX, e.currentTarget); }}>
          <title id="aoh-et-t">
            Three cycles of different period — daily, lunar, seasonal — drawn together, with a
            movable line reading all three at one instant.
          </title>
          {ROWS.map((r) => (
            <g key={r.k}>
              <line x1={X0} y1={r.y} x2={X1} y2={r.y} stroke="var(--gold)" strokeOpacity="0.14" strokeWidth="0.7" />
              <path d={path(r)} fill="none" stroke="var(--gold)" strokeOpacity="0.6" strokeWidth="1.1" />
              <text x={X0} y={r.y - AMP - 9} className="font-mono" fontSize="7" letterSpacing="1.3"
                    fill="var(--muted-foreground)">{r.k.toUpperCase()}</text>
            </g>
          ))}
          <line x1={X0 + t * W} y1="24" x2={X0 + t * W} y2="236" stroke="var(--gold)"
                strokeOpacity="0.9" strokeWidth="1.2" />
          {ROWS.map((r) => (
            <circle key={r.k} cx={X0 + t * W} cy={yAt(r, t)} r="4.5" fill="var(--gold)" />
          ))}
          <text x="200" y="245" textAnchor="middle" className="font-mono" fontSize="6.6"
                letterSpacing="1.1" fill="var(--muted-foreground)" opacity="0.85">
            DRAG OR CLICK TO READ ANOTHER MOMENT
          </text>
        </svg>
        <input
          type="range" min={0} max={1} step={0.002} value={t} aria-label="Position in time"
          onChange={(e) => setT(parseFloat(e.target.value))}
          className="mt-3 w-full accent-[var(--gold)]"
        />
      </div>

      <div className="min-h-[15rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          The composite at this instant
        </p>
        <div className="mt-4 space-y-px">
          {ROWS.map((r, i) => (
            <div key={r.k} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-border py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                {r.k}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {r.names[quarter(phaseAt(r.p, t))]}
                <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.12em] text-bone/45">
                  {states[i]}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 font-serif text-lg leading-relaxed text-bone/85">{composite}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          No single cycle gives the condition of a moment. Each instant holds a composite — a
          temporary tattvic chord sounded by several simultaneous rhythms — and none of it guarantees
          an outcome. A tide alters what is easier or harder to begin, sustain, and stabilise. It is
          closer to a change in atmospheric pressure than to a command.
        </p>
      </div>
    </div>
  );
}

/**
 * LunarClocks — the two cycles the section opens on, run against each other.
 * Sidereal return is 27.3 days, synodic 29.5, so the Moon comes back to the same
 * star before it comes back to the same phase. They drift, which is exactly why
 * any phase can occupy any mansion. The drift is computed, not asserted.
 */
function LunarClocks() {
  const [day, setDay] = useState(0);
  const SID = 27.32, SYN = 29.53, N = 27;
  const C = 180, R = 132;
  const sid = (day / SID) % 1;
  const syn = (day / SYN) % 1;
  const mansion = Math.floor(sid * N);
  const ang = (i: number) => (-90 + (i / N) * 360) * (Math.PI / 180);
  const pt = (a: number, r: number) => [C + r * Math.cos(a), C + r * Math.sin(a)];
  const [mx, my] = pt((-90 + sid * 360) * (Math.PI / 180), R);
  const [sx, sy] = pt(-Math.PI / 2, R);

  const PHASE = syn < 0.03 || syn > 0.97 ? "New"
    : syn < 0.22 ? "Waxing crescent" : syn < 0.28 ? "First quarter"
    : syn < 0.47 ? "Waxing gibbous" : syn < 0.53 ? "Full"
    : syn < 0.72 ? "Waning gibbous" : syn < 0.78 ? "Last quarter" : "Waning crescent";
  const movement = syn < 0.5 ? "gathering, amplification" : "separation, release";

  // lit region of the disc
  const a = 2 * Math.PI * syn, r = 21;
  const rx = Math.abs(Math.cos(a)) * r;
  const outer = syn < 0.5 ? 1 : 0;
  const inner = Math.cos(a) > 0 ? 0 : 1;
  const moon = `M${C},${C - r} A${r},${r} 0 0 ${outer} ${C},${C + r} A${rx},${r} 0 0 ${inner} ${C},${C - r} Z`;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[360px]">
        <svg viewBox="0 0 360 372" className="h-auto w-full" role="img" aria-labelledby="aoh-lc-t">
          <title id="aoh-lc-t">
            A ring of twenty-seven stations with the Moon travelling it at sidereal rate, and a
            phase disc at the centre driven by the slower synodic cycle.
          </title>
          <circle cx={C} cy={C} r={R} fill="none" stroke="var(--gold)" strokeOpacity="0.28" strokeWidth="0.8" />
          {Array.from({ length: N }, (_, i) => {
            const on = i === mansion;
            const [x1, y1] = pt(ang(i), R - (on ? 12 : 6));
            const [x2, y2] = pt(ang(i), R + (on ? 8 : 4));
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gold)"
                         strokeOpacity={on ? 1 : 0.35} strokeWidth={on ? 2 : 0.8} />;
          })}
          {/* where it began, so the sidereal return is visible */}
          <circle cx={sx} cy={sy} r="4" fill="none" stroke="var(--bone)" strokeOpacity="0.5"
                  strokeDasharray="2 2" strokeWidth="1" />
          <circle cx={mx} cy={my} r="6.5" fill="var(--gold)" />

          <circle cx={C} cy={C} r={r} fill="none" stroke="var(--gold)" strokeOpacity="0.4" strokeWidth="0.9" />
          <path d={moon} fill="var(--gold)" fillOpacity="0.92" />

          <text x={C} y={C + 58} textAnchor="middle" className="font-mono" fontSize="8"
                letterSpacing="1.4" fill="var(--gold)">MANSION {mansion + 1} / {N}</text>
          <text x={C} y={C + 72} textAnchor="middle" className="font-mono" fontSize="7"
                letterSpacing="1.1" fill="var(--muted-foreground)">{PHASE.toUpperCase()}</text>
          <text x={C} y="352" textAnchor="middle" className="font-mono" fontSize="6.8"
                letterSpacing="1.2" fill="var(--muted-foreground)">
            DAY {day.toFixed(1)} — SIDEREAL 27.32d · SYNODIC 29.53d
          </text>
          <text x={C} y="366" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill="var(--gold)" opacity={day >= SID ? 0.95 : 0.3}>
            {day >= SID ? "SAME STAR — DIFFERENT PHASE" : "DASHED MARK IS WHERE IT BEGAN"}
          </text>
        </svg>
        <input type="range" min={0} max={60} step={0.1} value={day} aria-label="Days elapsed"
               onChange={(e) => setDay(parseFloat(e.target.value))}
               className="mt-3 w-full accent-[var(--gold)]" />
      </div>

      <div className="min-h-[15rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          Two clocks, running independently
        </p>
        <div className="mt-4 space-y-px">
          {[["Sidereal", `Mansion ${mansion + 1} of ${N}`, "the Moon against the starry field — 27.32 days"],
            ["Synodic", PHASE, "the Moon against the Sun — 29.53 days"],
            ["This phase favours", movement, "which the mansion then refines into a kind"]].map(([a2, b, c]) => (
            <div key={a2} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-border py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">{a2}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                <span className="text-bone/90">{b}</span> — {c}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {day < SID
            ? "Move forward past day 27.3. The Moon returns to the dashed mark — the same station against the stars — while the phase has not yet come back to where it started."
            : "The Moon has returned to its station and the phase has not. Which is the whole point: these interlock without coinciding, so a waxing, full, or waning Moon can occupy any mansion whatever."}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-bone/60">
          Lunar phase describes the Moon&rsquo;s relation to the Sun. Lunar mansion describes its
          position against the starry field. Neither reduces to the other.
        </p>
      </div>
    </div>
  );
}

/**
 * ZodiacGrid — the twelve as a complete four-by-three, not a list of twelve
 * things. Elements are the medium formation occurs through; modalities are the
 * phase of activity. Every cell is one element in one phase, which is why there
 * are exactly twelve and not some other number.
 */
function ZodiacGrid() {
  const [sel, setSel] = useState<string | null>(null);
  const MOD = [
    { k: "Cardinal", d: "Initiates, selects a direction, crosses a threshold. Force entering a new vector." },
    { k: "Fixed", d: "Concentrates, sustains, accumulates, preserves. Force becoming stable form." },
    { k: "Mutable", d: "Adapts, translates, redistributes, releases. Form loosening into renewed potency." },
  ];
  const EL = [
    { k: "Fire", d: "Excitation, radiation, appetite, intention, the generation of direction. Force becoming vector." },
    { k: "Earth", d: "Resistance, density, incorporation, measurement, fixation. What lets force acquire boundary, duration, and visible structure." },
    { k: "Air", d: "Differentiation, relation, exchange, proportion, communication. What lets forces be compared, connected, and organised into networks." },
    { k: "Water", d: "Cohesion, receptivity, memory, gestation, internal transformation. What lets impressions be received, retained, and carried beneath visible boundaries." },
  ];
  const SIGNS: Record<string, { n: string; g: string; m: string }> = {
    "Fire|Cardinal": { n: "Aries", g: "♈", m: "Ignition, emergence, direct projection" },
    "Fire|Fixed": { n: "Leo", g: "♌", m: "Centralisation, radiance, creative declaration" },
    "Fire|Mutable": { n: "Sagittarius", g: "♐", m: "Propagation, orientation, synthesis, the projection of meaning" },
    "Earth|Cardinal": { n: "Capricorn", g: "♑", m: "Structuration, limitation, hierarchy, durable achievement" },
    "Earth|Fixed": { n: "Taurus", g: "♉", m: "Consolidation, incorporation, material retention" },
    "Earth|Mutable": { n: "Virgo", g: "♍", m: "Discrimination, refinement, adjustment" },
    "Air|Cardinal": { n: "Libra", g: "♎", m: "Equilibration, reciprocity, relational measurement" },
    "Air|Fixed": { n: "Aquarius", g: "♒", m: "Systemisation, distribution, networked reconfiguration" },
    "Air|Mutable": { n: "Gemini", g: "♊", m: "Differentiation, duplication, exchange" },
    "Water|Cardinal": { n: "Cancer", g: "♋", m: "Enclosure, nourishment, memory, protection" },
    "Water|Fixed": { n: "Scorpio", g: "♏", m: "Concentration, binding, penetration, metamorphosis" },
    "Water|Mutable": { n: "Pisces", g: "♓", m: "Permeation, dissolution, recombination, return" },
  };
  const cell = sel && sel.includes("|") ? SIGNS[sel] : null;
  const el = sel && !sel.includes("|") ? EL.find((e) => e.k === sel) : null;
  const mo = sel && !sel.includes("|") ? MOD.find((m) => m.k === sel) : null;
  const lit = (k: string) => !sel || sel === k || (sel.includes("|") && sel.split("|").includes(k)) ||
    (!sel.includes("|") && k.includes("|") && k.split("|").includes(sel));

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start">
      <div>
        <div className="grid grid-cols-[4.5rem_repeat(3,1fr)] gap-px sm:grid-cols-[6rem_repeat(3,1fr)]">
          <div />
          {MOD.map((m) => (
            <button key={m.k} onClick={() => setSel(sel === m.k ? null : m.k)} aria-pressed={sel === m.k}
              className={`border-b py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                sel === m.k ? "border-gold text-gold" : "border-border text-gold-dim hover:text-gold"}`}>
              {m.k}
            </button>
          ))}
          {EL.map((e) => (
            <div key={e.k} className="contents">
              <button onClick={() => setSel(sel === e.k ? null : e.k)} aria-pressed={sel === e.k}
                className={`border-r py-4 pr-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                  sel === e.k ? "border-gold text-gold" : "border-border text-gold-dim hover:text-gold"}`}>
                {e.k}
              </button>
              {MOD.map((m) => {
                const key = `${e.k}|${m.k}`;
                const sg = SIGNS[key];
                const on = sel === key;
                return (
                  <button key={key} onClick={() => setSel(on ? null : key)} aria-pressed={on}
                    aria-label={`${sg.n}, ${e.k} ${m.k}`}
                    className={`border-b border-border px-2 py-4 text-left transition-all ${
                      on ? "border-gold" : "hover:border-gold/40"} ${lit(key) ? "opacity-100" : "opacity-25"}`}>
                    <span className={`block font-serif text-2xl leading-none ${on ? "text-gold" : "text-bone/85"}`}>
                      {sg.g}
                    </span>
                    <span className={`mt-1.5 block font-serif text-sm ${on ? "text-gold" : "text-bone/70"}`}>
                      {sg.n}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
          Four media × three phases · exactly twelve, and no remainder
        </p>
      </div>

      <div className="min-h-[13rem] lg:border-l lg:border-border lg:pl-8">
        {cell ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {sel?.split("|")[0]} × {sel?.split("|")[1]}
            </p>
            <p className="mt-3 font-serif text-3xl text-gold">{cell.g} {cell.n}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cell.m}</p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              A sign is not itself a force. It is an operator applied to force — the manner in which
              force accepts form.
            </p>
          </>
        ) : el || mo ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {el ? "Element · the medium" : "Modality · the phase"}
            </p>
            <p className="mt-3 font-serif text-2xl text-gold">{(el || mo)!.k}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{(el || mo)!.d}</p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Zodiac does not supply twelve separate forces. It supplies twelve ways force can be
              directed, stabilised, related, transformed, and released — and they are not an
              arbitrary list. Four media, three phases, and the grid closes.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              Every element can begin, endure, and change. Every modality can work through radiation,
              embodiment, relation, or cohesion. Select a cell, or a heading.
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
                    className="-mx-1 px-1 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim transition-colors hover:text-gold"
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
              { id: "spine", label: "Spine" },
              { id: "descent", label: "Descent" },
              { id: "fourfold", label: "Ethers" },
              { id: "return", label: "Return" },
              { id: "kabbalah", label: "Kabbalah" },
              { id: "laws", label: "Laws" },
              { id: "astrology", label: "Sky" },
              { id: "channels", label: "Channels" },
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
              { id: "index", label: "Index" },
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
              { id: "organs", label: "Organs" },
              { id: "image", label: "Image" },
              { id: "symbol", label: "Symbol" },
              { id: "ritual", label: "Ritual" },
              { id: "taxonomy", label: "Forces" },
              { id: "mediation", label: "Mediation" },
              { id: "theurgy", label: "Theurgy" },
              { id: "daimons", label: "Daimons" },
              { id: "books", label: "Books" },
              { id: "tradition", label: "Tradition" },
              { id: "forceform", label: "Force & Form" },
              { id: "tides", label: "Tides" },
              { id: "mansions", label: "Mansions" },
              { id: "zodiac", label: "Zodiac" },
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
        <Backdrop src="/bg/threshold.webp" opacity={0.3} position="center 42%" fill />
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
      <section id="index" className="relative isolate border-t border-border py-24">
        <Backdrop src="/bg/summit.webp" opacity={0.42} position="center 40%" scrim={0.25} />
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Πίναξ · The Architecture in Order
          </p>


          <ArchitectureIndex />
        </div>
      </section>

      <section id="doctrine" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/archer.webp" opacity={0.72} position="center 45%" scrim={0.3} />
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
      <section id="terms" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/rimstone.webp" opacity={0.85} position="center 50%" scrim={0.05} />
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
      <section id="spine" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/concentrator.webp" opacity={0.16} position="center 55%" />
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
      <section id="correspondence" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/web.webp" opacity={0.16} position="center 50%" />
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
      <section id="return" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/blowhole.webp" opacity={0.29} position="center 45%" scrim={0.3} />
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
      <section id="extended" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/mycelium.webp" opacity={0.67} position="center 55%" scrim={0.2} />
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
      <section id="subtattva" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/scrims.webp" opacity={0.28} position="center 50%" scrim={0.25} />
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

          <div className="mt-16">
            <TheChariot />
          </div>

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
        <Backdrop src="/bg/braided.webp" opacity={0.16} position="center 50%" />
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
        <Backdrop src="/bg/terraces.webp" opacity={0.16} position="center 45%" />
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
        <Backdrop src="/bg/chamber2.webp" opacity={0.18} position="center 40%" />
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
      <section id="organs" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/sprout.webp" opacity={0.61} position="center 55%" />
        <SectionGlyph delay={-230} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
          <div className="mt-24 grid gap-16 lg:grid-cols-[1fr_2fr]">
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
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{a}</p>
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
                  <span className="font-mono text-[10px] text-gold-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                The loop that closes on itself
              </p>
              <div className="mt-5 flex flex-wrap items-stretch gap-2">
                {["Perception", "Emotion", "Breath and posture", "Organ-channel pattern"].map((t, i) => (
                  <div key={t} className="flex items-stretch gap-2">
                    <div className="flex min-h-[3.5rem] flex-1 items-center border border-border px-4 py-3">
                      <span className="text-sm leading-snug text-muted-foreground">{t}</span>
                    </div>
                    <span className="self-center font-mono text-sm text-gold" aria-hidden>→</span>
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
          <div className="mt-28 border-t border-border pt-16">
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
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold-dim">{a}</span>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
        <SectionGlyph delay={-250} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            <Backdrop src="/bg/darkroom.webp" opacity={0.65} position="center 60%" scrim={0.05} />
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
            <Backdrop src="/bg/obscura.webp" opacity={0.85} position="center 45%" scrim={0.05} />
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
            <Backdrop src="/bg/mirror.webp" opacity={0.74} position="center 50%" />
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
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">{a}</p>
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
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Eikonic</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Preserves the important relationships inside the pattern, even when its visual
                  content is entirely symbolic.
                </p>
              </div>
              <div className="border-t border-border pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
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
            <Backdrop src="/bg/dreamer.webp" opacity={0.85} position="center 40%" scrim={0.05} />
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
            <Backdrop src="/bg/cartography.webp" opacity={0.61} position="center 65%" scrim={0.05} />
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

            <p className="mt-14 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
                  <span className="font-mono text-[10px] text-gold-dim">
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
        <Backdrop src="/bg/murmuration.webp" opacity={0.63} position="center 40%" scrim={0.3} />
        <SectionGlyph delay={-270} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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

          {/* ---- symbolon ---- */}
          <div className="mt-24">
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
            <Backdrop src="/bg/caldera.webp" opacity={0.44} position="center 50%" scrim={0.24} />
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
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Centre</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Its governing formative virtue. Lose it and interpretation becomes arbitrary.
                </p>
              </div>
              <div className="border-t border-gold/50 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
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

            <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">
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
                  <span className="font-mono text-sm text-gold" aria-hidden>{i === 5 ? "↺" : "→"}</span>
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
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  Integral coherence
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Coordinates many parts of the person while preserving discernment, ethical
                  proportion, and agency.
                </p>
              </div>
              <div className="border-t border-border pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
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
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Symbolic literacy — three attentions at once
            </p>
            <div className="mt-6 grid gap-px md:grid-cols-3">
              {[["Seeing the symbol", "as an actual object or image."],
                ["Seeing through it", "toward the pattern it mediates."],
                ["Seeing what it does", "within the observer. This third is the one routinely neglected."]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-4 pr-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">{a}</p>
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
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
        <Backdrop src="/bg/gateway2.webp" opacity={0.72} position="center 50%" scrim={0.15} />
        <SectionGlyph delay={-370} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
          <div className="mt-28 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
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
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Habit
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Repeats in order to conserve behaviour, economising attention until the action
                    becomes automatic.
                  </p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Rite</p>
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
          <div className="mt-24 border-t border-border pt-16">
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
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  Deconsecration
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The deliberate release of the bond, and the return of the vessel to ordinary
                  circulation. It concludes the relation properly.
                </p>
              </div>
              <div className="border-t border-border pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
        <Backdrop src="/bg/fieldlines.webp" opacity={0.62} position="center 60%" scrim={0.15} />
        <SectionGlyph delay={-290} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            <Backdrop src="/bg/cavepool.webp" opacity={0.56} position="center 50%" scrim={0.18} portrait />
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
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
            <Backdrop src="/bg/travertine.webp" opacity={0.46} position="center 50%" scrim={0.22} portrait />
            <h3 className="font-serif text-2xl leading-tight">Formative — the forces that give pattern</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Formative forces do not necessarily supply the energy that moves a system. They
              establish the pattern, boundaries, proportions, gradients, and attractors according to
              which movement takes form. A riverbed does not create the water, but it gives the water
              a path. A musical scale does not create sound, but it determines which relationships
              can become harmonic.
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              What a formative force is made of
            </p>
            <div className="mt-5 flex flex-wrap items-stretch gap-2">
              {["Etheric function", "Tattvic bias", "Geometry", "Vessel", "Timing"].map((t, i) => (
                <div key={t} className="flex items-stretch gap-2">
                  <div className="flex min-h-[3rem] items-center border border-border px-4">
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </div>
                  {i < 4 && <span className="self-center font-mono text-sm text-gold" aria-hidden>+</span>}
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
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
            <Backdrop src="/bg/waterfallgorge.webp" opacity={0.4} position="center 50%" scrim={0.22} portrait />
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h3 className="font-serif text-2xl leading-tight">Material — embodied constraint</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Matter is not an inert illusion waiting to obey spiritual intention.
              </p>
            </div>
            <div>
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  Where analogy is not identity
                </p>
                <div className="mt-4 space-y-px">
                  {[["Warmth Ether", "is not merely physical heat"],
                    ["Light Ether", "is not simply electromagnetic radiation"],
                    ["Tone Ether", "is not reducible to acoustic vibration"],
                    ["Life Ether", "is not another name for biochemistry"]].map(([a, b]) => (
                    <div key={a} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-3 border-b border-border py-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
            <Backdrop src="/bg/filterstack.webp" opacity={0.6} position="center 50%" scrim={0.16} portrait />
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.12em] ${
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
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">{a}</span>
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
        <Backdrop src="/bg/filters.webp" opacity={0.74} position="center 50%" scrim={0.12} />
        <SectionGlyph delay={-310} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                The angelic test
              </p>
              <div className="mt-4 space-y-2.5">
                {["Does it possess internal coherence?",
                  "Does it accord with the virtue of the order it claims to represent?",
                  "Does it increase responsible agency rather than dependency?",
                  "Can its symbolic form be distinguished from its possible underlying meaning?"].map((q, i) => (
                  <p key={q} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-mono text-[10px] text-gold-dim">{i + 1}</span>
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
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  Intelligence asks
                </p>
                <p className="mt-3 font-serif text-lg italic leading-relaxed text-bone/85">
                  What is the intelligible organisation of this sphere?
                </p>
              </div>
              <div className="border-t border-gold/50 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
            <Backdrop src="/bg/stairs.webp" opacity={0.56} position="center 50%" scrim={0.18} />
            <h3 className="font-serif text-2xl leading-tight">Descent and return</h3>
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Descent</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                  {["Source", "Name", "Pattern", "Message", "Operation", "Embodiment"].map((t, i) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className="border border-border px-2.5 py-1.5 text-[13px] text-muted-foreground">{t}</span>
                      {i < 5 && <span className="font-mono text-xs text-gold" aria-hidden>→</span>}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  A unitive virtue becomes nameable, intelligible, differentiated, operational,
                  symbolic, psychic, material.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Return</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                  {["Embodiment", "Participation", "Meaning", "Understanding", "Unity", "Silence"].map((t, i) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className={`border px-2.5 py-1.5 text-[13px] ${
                        i === 5 ? "border-gold/60 text-gold" : "border-border text-muted-foreground"}`}>{t}</span>
                      {i < 5 && <span className="font-mono text-xs text-gold" aria-hidden>→</span>}
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
          <div className="mt-24 border-t border-border pt-16">
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
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
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
        <Backdrop src="/bg/sanctum.webp" opacity={0.58} position="center 50%" scrim={0.22} />
        <SectionGlyph delay={-330} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XXX · Greek Metaphysics and Theurgic Engineering
          </p>
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

          {/* ---- theurgic engineering ---- */}
          <div className="relative isolate mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
            <Backdrop src="/bg/gorgewheel.webp" opacity={0.52} position="center 50%" scrim={0.2} portrait />
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
            <Backdrop src="/bg/reedslamp.webp" opacity={0.46} position="center 50%" scrim={0.22} portrait />
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
            <Backdrop src="/bg/statue.webp" opacity={0.66} position="center 45%" scrim={0.16} />
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
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
          <div className="mt-24 border-t border-border pt-16">
            <div className="border-l-2 border-gold pl-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
        <Backdrop src="/bg/mangrove.webp" opacity={0.56} position="center 45%" scrim={0.34} />
        <SectionGlyph delay={-350} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
            <Backdrop src="/bg/foldedcliff.webp" opacity={0.5} position="center 50%" scrim={0.2} portrait />
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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

            <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
                  <p className="font-serif text-xl text-gold">{a}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">{c}</p>
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
                  <span className="font-mono text-[10px] text-gold-dim">{i + 1}</span>
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
            <Backdrop src="/bg/walker.webp" opacity={0.54} position="center 42%" scrim={0.26} />
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
        <Backdrop src="/bg/regrowth.webp" opacity={0.23} position="center 55%" scrim={0.1} />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
      <section id="tradition" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/scribe.webp" opacity={0.72} position="center 45%" scrim={0.15} />
        <SectionGlyph delay={-390} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
          <div className="mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2fr]">
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
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">{a}</p>
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
          <div className="mt-24 border-t border-border pt-16">
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

          <div className="mt-24 border-t border-gold/30 pt-12">
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
        <Backdrop src="/bg/fold.webp" opacity={0.54} position="center 50%" scrim={0.28} />
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
      <section id="forceform" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/arch.webp" opacity={0.7} position="center 55%" scrim={0.24} />
        <SectionGlyph delay={-410} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            <Backdrop src="/bg/pine.webp" opacity={0.5} position="center 45%" scrim={0.26} />
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
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
            <Backdrop src="/bg/rootsstill.webp" opacity={0.35} position="center 55%" scrim={0.18} portrait />
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
            <Backdrop src="/bg/sculptor.webp" opacity={0.72} position="center 50%" scrim={0.18} />
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
            <Backdrop src="/bg/millwheel.webp" opacity={0.56} position="center 50%" scrim={0.18} portrait />
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
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              And every pattern has a holding capacity
            </p>
            <div className="mt-6 grid gap-px lg:grid-cols-3">
              {[["Too weak", "the incoming force cannot sustain the pattern, and it lapses"],
                ["Too strong", "the pattern ruptures"],
                ["Unable to adapt", "force escapes through distortion, symptom, conflict, or collapse"]].map(([a, b]) => (
                <div key={a} className="border-t border-border py-5 pr-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{a}</p>
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
                  <span className={`font-mono text-[11px] uppercase tracking-[0.12em] ${i > 1 ? "text-bone/60" : "text-gold"}`}>{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 border-t border-gold/30 pt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Reduced to three propositions
            </p>
            <div className="mt-8 space-y-4">
              {["Force becomes intelligible through form.",
                "Form remains living through force.",
                "Transformation occurs when force exceeds, dissolves, or reorganises its present form."].map((t, i) => (
                <p key={t} className="flex gap-5 font-serif text-2xl leading-relaxed text-bone/90">
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
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
        <Backdrop src="/bg/bowl.webp" opacity={0.72} position="center 55%" scrim={0.26} />
        <SectionGlyph delay={-430} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            <Backdrop src="/bg/tidepool.webp" opacity={0.42} position="center 45%" scrim={0.26} />
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
                    <span className="font-mono text-xs text-gold" aria-hidden>{i === 5 ? "↺" : "→"}</span>
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
            <Backdrop src="/bg/hydraulic.webp" opacity={0.72} position="center 50%" scrim={0.2} />
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
          <div className="mt-24 border-t border-border pt-16">
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
            <Backdrop src="/bg/breath.webp" opacity={0.72} position="center 45%" scrim={0.18} />
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/65">
              That last complements biological and medical explanation. It does not replace it — the
              same limit § XXIV sets on the Five Phases.
            </p>
            <div className="mt-12 max-w-3xl border-l-2 border-gold pl-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
        <Backdrop src="/bg/observatory.webp" opacity={0.72} position="center 45%" scrim={0.26} />
        <SectionGlyph delay={-450} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
            <Backdrop src="/bg/seainlet.webp" opacity={0.5} position="center 50%" scrim={0.2} portrait />
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
            <Backdrop src="/bg/shrinepath.webp" opacity={0.58} position="center 50%" scrim={0.18} portrait />
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
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
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
            <Backdrop src="/bg/moonflats.webp" opacity={0.6} position="center 55%" scrim={0.16} portrait />
            <h3 className="font-serif text-2xl leading-tight">A clock of qualitative time</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The nakshatras turn the starry field into a clock whose hand is the Moon — and the
              question it answers is not the usual one.
            </p>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div className="border-t border-border pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  A mechanical clock
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  tells us how much time has passed.
                </p>
              </div>
              <div className="border-t border-gold/50 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
        <Backdrop src="/bg/saltflat.webp" opacity={0.72} position="center 50%" scrim={0.24} />
        <SectionGlyph delay={-470} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
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
            <Backdrop src="/bg/rotunda.webp" opacity={0.39} position="center 55%" scrim={0.18} portrait />
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
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
                  <span className="font-mono text-[10px] text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{a}</p>
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{a}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
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

      <section id="unified" className="relative isolate border-t border-border py-32">
        <Backdrop src="/bg/crater.webp" opacity={0.56} position="center 50%" scrim={0.05} />
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

          <div className="mx-auto mt-16 max-w-3xl text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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

          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            and the field is altered for what comes after
          </p>
        </div>
      </section>

      {/* FINAL FORMULA */}
      <section id="formula" className="relative isolate overflow-hidden border-t border-border py-40">
        <Backdrop src="/bg/crystal.webp" opacity={0.6} position="center 62%" scrim={0.15} />
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
