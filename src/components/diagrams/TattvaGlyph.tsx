/**
 * TattvaGlyph — a tattva, or a sub-tattva, in its form and colour.
 *
 * Shapes and colours after Rama Prasad's Nature's Finer Forces (1890) and the
 * Golden Dawn tattva cards as published by Israel Regardie: the egg of Ākāśa,
 * the circle of Vāyu, the triangle of Tejas, the crescent of Apas, the square
 * of Pṛthivī. The egg is the Golden Dawn form (Prasad's Ākāśa is "dark",
 * "shaped like the hole of the ear", a dotted sheet); its black is shown as
 * indigo with a gold edge so it can appear on this ground, and the edge is not
 * decoration but what makes it perceivable. Apas is white in Prasad, silver in
 * the Golden Dawn; a cool silver is drawn so it never reads as page text. A
 * sub-tattva sets the small form of the modifier, in its own colour, inside
 * the large form of the dominant, as the cards did — the Golden Dawn's
 * "X of Y" names the small form first; Prasad's hyphenated compounds name the
 * large form first. Every small form wears a halo in the ground colour (gold
 * inside the egg) so the weak own-colour pairs still separate.
 *
 * The forms are authored once, in a 100-unit box, with equalised visual
 * weight rather than equal bounding boxes.
 */
export type TattvaKey = "akasha" | "vayu" | "tejas" | "apas" | "prithivi";

export const TATTVAS: Record<TattvaKey, { name: string; element: string; form: string; colour: string; fill: string }> = {
  akasha: { name: "Ākāśa", element: "Ether", form: "egg", colour: "black, shown as indigo", fill: "var(--tattva-akasa, #3B2A80)" },
  vayu: { name: "Vāyu", element: "Air", form: "circle", colour: "blue", fill: "var(--tattva-vayu, #3E8FD9)" },
  tejas: { name: "Tejas", element: "Fire", form: "triangle", colour: "red", fill: "var(--tattva-tejas, #D8412F)" },
  apas: { name: "Apas", element: "Water", form: "crescent", colour: "silver", fill: "var(--tattva-apas, #C9CDD2)" },
  prithivi: { name: "Pṛthivī", element: "Earth", form: "square", colour: "yellow", fill: "var(--tattva-prithivi, #F2C230)" },
};
/** Prasad's order of emanation, and the Golden Dawn's order of the tides from sunrise. */
export const TATTVA_ORDER: TattvaKey[] = ["akasha", "vayu", "tejas", "apas", "prithivi"];

/** The legend every figure that uses these colours sets beneath itself. */
export const TATTVA_LEGEND =
  "Shapes and colours after Rama Prasad’s Nature’s Finer Forces (1890) and the Golden Dawn tattva cards as published by Israel Regardie. Ākāśa’s egg is the Golden Dawn form (Prasad: dark, “shaped like the hole of the ear”); its black is shown here as indigo with a gold edge so it can appear on this ground. Apas is white in Prasad, silver in the Golden Dawn. Small form within large: the Golden Dawn’s “X of Y”.";

const GROUND = "var(--background, #020201)";
const GOLD = "var(--gold, #E8AA4E)";

/** The path or element of one form in the 100-unit box. */
function Form({ k, fill, halo, haloWidth = 2, stroke }: { k: TattvaKey; fill: string; halo?: string; haloWidth?: number; stroke?: { colour: string; width: number } }) {
  const common = {
    fill,
    shapeRendering: "geometricPrecision" as const,
    ...(halo ? { stroke: halo, strokeWidth: haloWidth, paintOrder: "stroke" as const } : stroke ? { stroke: stroke.colour, strokeWidth: stroke.width } : {}),
  };
  const rounded = { strokeLinejoin: "round" as const };
  const sharp = { strokeLinejoin: "miter" as const, strokeMiterlimit: 8 };
  switch (k) {
    case "akasha": return <path d="M50 14 C68 14 78 36 78 54 C78 72 66 86 50 86 C34 86 22 72 22 54 C22 36 32 14 50 14 Z" {...common} {...rounded} />;
    case "vayu": return <circle cx={50} cy={50} r={34} {...common} />;
    case "tejas": return <polygon points="50,17.1 88,82.9 12,82.9" {...common} {...sharp} />;
    case "apas": return <path d="M16.63 25.5 A36 36 0 1 0 83.37 25.5 A34 34 0 0 1 16.63 25.5 Z" {...common} {...rounded} />;
    case "prithivi": return <rect x={19} y={19} width={62} height={62} {...common} {...sharp} />;
  }
}

/** Where a guest sits inside each host, and how large: house constants, since the sources give none. */
const SEAT: Record<TattvaKey, { x: number; y: number; s: number }> = {
  akasha: { x: 50, y: 54, s: 0.38 },
  vayu: { x: 50, y: 50, s: 0.38 },
  tejas: { x: 50, y: 61, s: 0.34 },
  apas: { x: 50, y: 36, s: 0.34 },
  prithivi: { x: 50, y: 50, s: 0.38 },
};

export function tattvaLabel(dominant: TattvaKey, modifier?: TattvaKey | null): string {
  const d = TATTVAS[dominant];
  if (!modifier || modifier === dominant) return `${d.name} — ${d.colour} ${d.form}`;
  const m = TATTVAS[modifier];
  return `${m.name} within ${d.name}: ${m.colour} ${m.form} inside a ${d.colour} ${d.form} (Golden Dawn: ${m.name} of ${d.name})`;
}

/**
 * A tattva (one key) or a sub-tattva (dominant with modifier inside), as a
 * self-contained SVG. Colour is never the only signal: the forms differ, and
 * the label names form and colour. `decorative` hides it from readers where
 * the same glyph is repeated beside visible text.
 */
export function TattvaGlyph({ dominant, modifier = null, size = 40, className = "", decorative = false, title }: {
  dominant: TattvaKey; modifier?: TattvaKey | null; size?: number | string; className?: string; decorative?: boolean; title?: string;
}) {
  const same = !modifier || modifier === dominant;
  const label = title ?? tattvaLabel(dominant, modifier);
  const seat = SEAT[dominant];
  const guestHalo = dominant === "akasha" ? GOLD : GROUND;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className}
         role={decorative ? undefined : "img"} aria-label={decorative ? undefined : label} aria-hidden={decorative || undefined}>
      {!decorative && <title>{label}</title>}
      {dominant === "akasha" ? <Form k="akasha" fill={TATTVAS.akasha.fill} stroke={{ colour: GOLD, width: 1.25 }} /> : <Form k={dominant} fill={TATTVAS[dominant].fill} />}
      {!same && modifier && (
        <g transform={`translate(${seat.x} ${seat.y}) scale(${seat.s}) translate(-50 -50)`}>
          <Form k={modifier} fill={TATTVAS[modifier].fill} halo={guestHalo} haloWidth={2 / seat.s} />
        </g>
      )}
    </svg>
  );
}

/**
 * A tattva's form set inside another drawing's svg, centred at (x, y) and s
 * units across, in its canonical colour — so a figure that names the tattvas
 * can show them as the cards do, not only spell them.
 */
export function TattvaMark({ k, x, y, s, opacity = 1 }: { k: TattvaKey; x: number; y: number; s: number; opacity?: number }) {
  return (
    <g transform={`translate(${x - s / 2} ${y - s / 2}) scale(${s / 100})`} opacity={opacity} aria-hidden>
      {k === "akasha" ? <Form k="akasha" fill={TATTVAS.akasha.fill} stroke={{ colour: GOLD, width: 3 }} /> : <Form k={k} fill={TATTVAS[k].fill} />}
    </g>
  );
}

/**
 * A tattva on its own, framed as a card in the proportion of Regardie's set
 * (3½ × 4½ inches): a hairline on clay, the form at three-fifths of the width.
 */
export function TattvaCard({ k, width = 112, className = "" }: { k: TattvaKey; width?: number; className?: string }) {
  const t = TATTVAS[k];
  const h = (width * 9) / 7;
  return (
    <figure className={`inline-flex flex-col items-center ${className}`} style={{ width }}>
      <div className="flex items-center justify-center border border-gold-dim/60 bg-clay" style={{ width, height: h }} aria-hidden>
        <TattvaGlyph dominant={k} size={width * 0.6} decorative />
      </div>
      <figcaption className="mt-3 text-center">
        <span className="block font-serif text-base text-bone">{t.name}</span>
        <span className="mt-0.5 block font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">{t.element} · {t.colour.replace(", shown as indigo", "")} {t.form}</span>
      </figcaption>
    </figure>
  );
}
