/**
 * ElementGlyphs — the marks of the elements and the principles, drawn.
 *
 * Set from a font these would be at the mercy of whatever a device has, and
 * on a phone several of them arrive as emoji. Drawn, they take the ink of the
 * text around them. Three families:
 *
 *  - the tattva forms, as outlines: the egg of Ākāśa, the circle of Vāyu, the
 *    triangle of Tejas, the crescent of Apas, the square of Pṛthivī (their
 *    coloured, filled versions live in TattvaGlyph);
 *  - the classical alchemical marks of the four elements: fire and water as
 *    the two triangles, air and earth as the same triangles barred; ether has
 *    no mark and keeps its form;
 *  - the three principles: sulphur, a triangle over a cross; mercury, the
 *    crescent-crowned circle over a cross; salt, a circle divided by a bar.
 */
export type ElementKey = "Ether" | "Air" | "Fire" | "Water" | "Earth";
export type PrincipleKey = "Sulfur" | "Mercury" | "Salt";

type Ink = { x: number; y: number; s: number; fill: string; op?: number; width?: number };

export function TattvaOutline({ k, x, y, s, fill, op = 1, width = 1.1 }: Ink & { k: ElementKey }) {
  const c = { fill: "none", stroke: fill, strokeOpacity: op, strokeWidth: width, strokeLinejoin: "round" as const };
  switch (k) {
    case "Ether": return <path d={`M${x} ${y - s * 0.62} C${x + s * 0.5} ${y - s * 0.62} ${x + s * 0.52} ${y + s * 0.6} ${x} ${y + s * 0.6} C${x - s * 0.52} ${y + s * 0.6} ${x - s * 0.5} ${y - s * 0.62} ${x} ${y - s * 0.62} Z`} {...c} />;
    case "Air": return <circle cx={x} cy={y} r={s * 0.5} {...c} />;
    case "Fire": return <path d={`M${x} ${y - s * 0.56} L${x + s * 0.56} ${y + s * 0.42} L${x - s * 0.56} ${y + s * 0.42} Z`} {...c} />;
    case "Water": return <path d={`M${x - s * 0.55} ${y - s * 0.2} A${s * 0.58} ${s * 0.58} 0 1 0 ${x + s * 0.55} ${y - s * 0.2} A${s * 0.44} ${s * 0.44} 0 1 1 ${x - s * 0.55} ${y - s * 0.2} Z`} {...c} />;
    case "Earth": return <rect x={x - s * 0.48} y={y - s * 0.48} width={s * 0.96} height={s * 0.96} {...c} />;
  }
}

export function AlchemicalMark({ k, x, y, s, fill, op = 1, width = 0.9 }: Ink & { k: ElementKey }) {
  const c = { fill: "none", stroke: fill, strokeOpacity: op, strokeWidth: width, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const up = `M${x} ${y - s * 0.5} L${x + s * 0.5} ${y + s * 0.4} L${x - s * 0.5} ${y + s * 0.4} Z`;
  const down = `M${x} ${y + s * 0.5} L${x + s * 0.5} ${y - s * 0.4} L${x - s * 0.5} ${y - s * 0.4} Z`;
  switch (k) {
    case "Fire": return <path d={up} {...c} />;
    case "Air": return <g><path d={up} {...c} /><line x1={x - s * 0.62} x2={x + s * 0.62} y1={y + s * 0.08} y2={y + s * 0.08} {...c} /></g>;
    case "Water": return <path d={down} {...c} />;
    case "Earth": return <g><path d={down} {...c} /><line x1={x - s * 0.62} x2={x + s * 0.62} y1={y - s * 0.08} y2={y - s * 0.08} {...c} /></g>;
    default: return null;
  }
}

export function PrincipleMark({ k, x, y, s, fill, op = 1, width = 0.9 }: Ink & { k: PrincipleKey }) {
  const c = { fill: "none", stroke: fill, strokeOpacity: op, strokeWidth: width, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  switch (k) {
    case "Sulfur": {
      // a triangle standing on a cross
      const t = `M${x} ${y - s * 0.52} L${x + s * 0.3} ${y - s * 0.02} L${x - s * 0.3} ${y - s * 0.02} Z`;
      return <g><path d={t} {...c} /><line x1={x} x2={x} y1={y - s * 0.02} y2={y + s * 0.52} {...c} /><line x1={x - s * 0.22} x2={x + s * 0.22} y1={y + s * 0.22} y2={y + s * 0.22} {...c} /></g>;
    }
    case "Mercury": {
      // a crescent above a circle above a cross
      const r = s * 0.2;
      return <g>
        <path d={`M${x - s * 0.24} ${y - s * 0.56} A${s * 0.24} ${s * 0.24} 0 0 0 ${x + s * 0.24} ${y - s * 0.56}`} {...c} />
        <circle cx={x} cy={y - s * 0.1} r={r} {...c} />
        <line x1={x} x2={x} y1={y - s * 0.1 + r} y2={y + s * 0.54} {...c} />
        <line x1={x - s * 0.22} x2={x + s * 0.22} y1={y + s * 0.3} y2={y + s * 0.3} {...c} />
      </g>;
    }
    case "Salt": {
      const r = s * 0.42;
      return <g><circle cx={x} cy={y} r={r} {...c} /><line x1={x - r} x2={x + r} y1={y} y2={y} {...c} /></g>;
    }
  }
}

/** One element's sign on its own, as a small inline SVG: the alchemical mark, or the egg for ether. */
export function ElementSign({ k, size = 28, className = "", title, decorative = false }: { k: ElementKey; size?: number; className?: string; title?: string; decorative?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className}
         role={decorative ? undefined : "img"} aria-label={decorative ? undefined : title ?? `${k} — ${k === "Ether" ? "the egg" : "alchemical sign"}`} aria-hidden={decorative || undefined}>
      {!decorative && <title>{title ?? k}</title>}
      {k === "Ether" ? <TattvaOutline k="Ether" x={16} y={16} s={19} fill="currentColor" width={1.2} /> : <AlchemicalMark k={k} x={16} y={16} s={22} fill="currentColor" width={1.2} />}
    </svg>
  );
}

/** One principle's sign on its own. */
export function PrincipleSign({ k, size = 28, className = "", title }: { k: PrincipleKey; size?: number; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} role="img" aria-label={title ?? `${k} — alchemical sign`}>
      <title>{title ?? k}</title>
      <PrincipleMark k={k} x={16} y={16} s={24} fill="currentColor" width={1.2} />
    </svg>
  );
}
