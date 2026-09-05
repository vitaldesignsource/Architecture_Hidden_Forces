import { useState } from "react";
import { PetalRosette, type Pericarp } from "@/components/PetalRosette";
import { fs } from "./fig";

/**
 * CentresLotus — the six lotuses and the crown, in the colours the text gives
 * them and carrying the letters it sets on their petals.
 *
 * The Ṣaṭ-Cakra-Nirūpaṇa does not describe a spectrum. Each lotus has its own
 * hue — crimson, vermilion, the blue-black of a rain cloud, the red of the
 * bandhūka flower, smoky purple, white — and a figure in its pericarp: earth's
 * square, water's crescent, fire's triangle, air's hexagram, ether's circle.
 * The rainbow of the modern charts is a later scheme, and the section says so.
 *
 * The letters are the point of the drawing. Four, six, ten, twelve, sixteen and
 * two come to fifty: the Sanskrit alphabet once, laid out along the spine. A
 * reader can select a centre and read its own share of it.
 */

type Centre = {
  id: string;
  s: string;
  tr: string;
  n: number;
  bija: string;
  bt: string;
  hue: string;
  hueName: string;
  said: string;
  pericarp: Pericarp;
  pericarpInk: string;
  pericarpName: string;
  letters: string[];
  lt: string;
  seat: string;
};

const CENTRES: Centre[] = [
  {
    id: "muladhara", s: "मूलाधार", tr: "Mūlādhāra", n: 4, bija: "लं", bt: "laṃ",
    hue: "#C0303A", hueName: "crimson", said: "a lotus of crimson hue",
    pericarp: "square", pericarpInk: "#D8A72B", pericarpName: "the yellow square of earth",
    letters: ["वं", "शं", "षं", "सं"], lt: "vaṃ śaṃ ṣaṃ saṃ",
    seat: "at the root of the spine",
  },
  {
    id: "svadhisthana", s: "स्वाधिष्ठान", tr: "Svādhiṣṭhāna", n: 6, bija: "वं", bt: "vaṃ",
    hue: "#D95F2B", hueName: "vermilion", said: "vermilion, the colour of sindūra",
    pericarp: "crescent", pericarpInk: "#CFD6DE", pericarpName: "the white crescent of water",
    letters: ["बं", "भं", "मं", "यं", "रं", "लं"], lt: "baṃ bhaṃ maṃ yaṃ raṃ laṃ",
    seat: "at the root of the generative organs",
  },
  {
    id: "manipura", s: "मणिपूर", tr: "Maṇipūra", n: 10, bija: "रं", bt: "raṃ",
    hue: "#4A5B78", hueName: "rain-cloud", said: "the colour of a heavy-laden rain cloud",
    pericarp: "triangle", pericarpInk: "#D8412F", pericarpName: "the red triangle of fire",
    letters: ["डं", "ढं", "णं", "तं", "थं", "दं", "धं", "नं", "पं", "फं"],
    lt: "ḍaṃ ḍhaṃ ṇaṃ taṃ thaṃ daṃ dhaṃ naṃ paṃ phaṃ",
    seat: "at the navel",
  },
  {
    id: "anahata", s: "अनाहत", tr: "Anāhata", n: 12, bija: "यं", bt: "yaṃ",
    hue: "#B8384F", hueName: "bandhūka red", said: "the colour of the bandhūka flower",
    pericarp: "hexagram", pericarpInk: "#9AA0A8", pericarpName: "the smoke-grey hexagram of air",
    letters: ["कं", "खं", "गं", "घं", "ङं", "चं", "छं", "जं", "झं", "ञं", "टं", "ठं"],
    lt: "kaṃ khaṃ gaṃ ghaṃ ṅaṃ caṃ chaṃ jaṃ jhaṃ ñaṃ ṭaṃ ṭhaṃ",
    seat: "at the heart",
  },
  {
    id: "visuddha", s: "विशुद्ध", tr: "Viśuddha", n: 16, bija: "हं", bt: "haṃ",
    hue: "#8E7BA6", hueName: "smoky purple", said: "of a smoky purple hue",
    pericarp: "circle", pericarpInk: "#E4E7EC", pericarpName: "the white circle of ether",
    letters: ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ॡ", "ए", "ऐ", "ओ", "औ", "अं", "अः"],
    lt: "a ā i ī u ū ṛ ṝ ḷ ḹ e ai o au aṃ aḥ — the sixteen vowels",
    seat: "at the throat",
  },
  {
    id: "ajna", s: "आज्ञा", tr: "Ājñā", n: 2, bija: "ॐ", bt: "oṃ",
    hue: "#E8E2D6", hueName: "white", said: "white as the moon",
    pericarp: "none", pericarpInk: "#E8E2D6", pericarpName: "no elemental figure — the element ends below",
    letters: ["हं", "क्षं"], lt: "haṃ kṣaṃ",
    seat: "between the brows",
  },
  {
    id: "sahasrara", s: "सहस्रार", tr: "Sahasrāra", n: 1000, bija: "", bt: "beyond the syllables",
    hue: "#EFE9DA", hueName: "lustrous white", said: "shining whiter than the full moon",
    pericarp: "none", pericarpInk: "#EFE9DA", pericarpName: "no figure and no seed syllable",
    letters: [], lt: "the fifty letters over again, twenty times",
    seat: "above the head",
  },
];

export function CentresLotus() {
  const [sel, setSel] = useState(0);
  const c = CENTRES[sel];
  const big = c.n > 48 ? 48 : c.n;
  const R = 150, rIn = c.n <= 6 ? 46 : 42, rOut = 138;
  const w = (Math.PI * 2 * ((rIn + rOut) / 2)) / big / 2.6;
  const petal = `M0 ${-rIn} C ${w} ${-rIn - 18}, ${w * 0.8} ${-rOut + 18}, 0 ${-rOut} C ${-w * 0.8} ${-rOut + 18}, ${-w} ${-rIn - 18}, 0 ${-rIn} Z`;
  const rLetter = (rIn + rOut) / 2;

  return (
    <div id="aoh-cl" className="aoh-fig aoh-fig-tight">
      <style>{`
        .aoh-cl-petal { transition: fill-opacity 420ms ease, stroke-opacity 420ms ease; }
        .aoh-cl-pick { transition: opacity 300ms ease, border-color 300ms ease; }
        @media (prefers-reduced-motion: reduce) {
          .aoh-cl-petal, .aoh-cl-pick { transition: none; }
        }
      `}</style>

      {/* the seven, as they are counted */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
        {CENTRES.map((x, i) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={sel === i}
            aria-label={`${x.tr}, ${x.n === 1000 ? "a thousand" : x.n} petals, ${x.hueName}`}
            onClick={() => setSel(i)}
            className={`aoh-cl-pick group flex flex-col items-center gap-2 border px-2 py-3 text-center transition-colors ${
              sel === i ? "border-gold/50 bg-bone/[0.03]" : "border-transparent hover:border-border"
            }`}
          >
            <PetalRosette
              n={x.n}
              size={64}
              ink={x.hue}
              pericarp={x.pericarp}
              pericarpInk={x.pericarpInk}
              className="mx-auto"
              decorative
            />
            <span className="font-serif text-sm text-bone/90" lang="sa">{x.s}</span>
            <span className="font-label text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
              {x.n === 1000 ? "a thousand" : `${x.n} petals`}
            </span>
          </button>
        ))}
      </div>

      {/* the one selected, at length */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-center">
        <div className="mx-auto w-full max-w-[320px]">
          <svg viewBox="0 0 300 300" className="h-auto w-full" role="img" aria-labelledby="aoh-cl-t">
            <title id="aoh-cl-t">
              {`${c.tr}: ${c.said}, ${c.n === 1000 ? "a thousand petals drawn as a fringe of forty-eight" : `${c.n} petals`}${c.letters.length ? `, lettered ${c.lt}` : ""}.`}
            </title>
            <g transform={`translate(${R} ${R})`}>
              {Array.from({ length: big }, (_, i) => (
                <path
                  key={i}
                  className="aoh-cl-petal"
                  d={petal}
                  transform={`rotate(${(i * 360) / big})`}
                  fill={c.hue}
                  fillOpacity={big > 24 ? 0.1 : 0.16}
                  stroke={c.hue}
                  strokeOpacity={big > 24 ? 0.55 : 0.9}
                  strokeWidth={big > 24 ? 1 : 1.5}
                  strokeLinejoin="round"
                />
              ))}
              {c.letters.length === big &&
                c.letters.map((l, i) => (
                  <text
                    key={l + i}
                    transform={`rotate(${(i * 360) / big}) translate(0 ${-rLetter}) rotate(${-(i * 360) / big})`}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={fs(13)}
                    className="scr scr-devanagari"
                    fill="var(--bone)"
                    fillOpacity={0.92}
                    lang="sa"
                  >
                    {l}
                  </text>
                ))}
              <circle r={rIn} fill="none" stroke={c.hue} strokeOpacity="0.8" strokeWidth="1.4" />
              {c.pericarp === "square" && <rect x={-26} y={-26} width={52} height={52} fill={c.pericarpInk} fillOpacity="0.12" stroke={c.pericarpInk} strokeOpacity="0.85" strokeWidth="1.4" />}
              {c.pericarp === "crescent" && (
                <path d="M-27 -5 A28 28 0 1 0 27 -5 A21 21 0 1 1 -27 -5 Z" fill={c.pericarpInk} fillOpacity="0.12" stroke={c.pericarpInk} strokeOpacity="0.85" strokeWidth="1.4" />
              )}
              {c.pericarp === "triangle" && <path d="M0 27 L26 -18 L-26 -18 Z" fill={c.pericarpInk} fillOpacity="0.12" stroke={c.pericarpInk} strokeOpacity="0.85" strokeWidth="1.4" />}
              {c.pericarp === "hexagram" && (
                <g fill="none" stroke={c.pericarpInk} strokeOpacity="0.8" strokeWidth="1.2">
                  <path d="M0 -29 L25 14 L-25 14 Z" />
                  <path d="M0 29 L25 -14 L-25 -14 Z" />
                </g>
              )}
              {c.pericarp === "circle" && <circle r={27} fill={c.pericarpInk} fillOpacity="0.1" stroke={c.pericarpInk} strokeOpacity="0.85" strokeWidth="1.4" />}
              {c.bija && (
                <text y={9} textAnchor="middle" style={fs(24)} className="scr scr-devanagari"
                      fill="var(--bone)" lang="sa">
                  {c.bija}
                </text>
              )}
            </g>
          </svg>
        </div>

        <div className="min-w-0">
          <p className="font-serif text-3xl text-bone" lang="sa">{c.s}</p>
          <p className="mt-1 font-serif text-lg italic text-gold">{c.tr}</p>
          <p className="mt-1 font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {c.seat}
          </p>

          <div className="mt-6 space-y-4 border-t border-border pt-5">
            {[
              ["The lotus", `${c.n === 1000 ? "A thousand petals" : `${c.n} petals`}, ${c.said}.`],
              ["In the pericarp", c.pericarpName + "."],
              ["The seed", c.bija ? `${c.bija} · ${c.bt}` : c.bt],
              ["On the petals", c.lt],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{k}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {k === "On the petals" && c.letters.length ? (
                    <>
                      <span className="scr scr-devanagari text-bone/90" lang="sa">{c.letters.join(" ")}</span>
                      <span className="mt-1 block aoh-tr" lang="sa-Latn">{v}</span>
                    </>
                  ) : (
                    v
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
