import { useMemo, useState } from "react";

/**
 * The edge, refracted — the experiment Goethe put in place of the spectrum.
 *
 * Hold a prism to the eye and look at a uniform wall: it is displaced, and it
 * does not colour. Colour appears only where light meets dark. At a light band
 * on a dark ground the two edges take different colours; narrow the band until
 * the edges meet, and green appears between them. Do it the other way — a dark
 * band on a light ground — and the meeting yields magenta, Goethe's peach
 * blossom, which is the colour no single wavelength has.
 *
 * The simulation is honest about mechanism: it lays down the band once for each
 * of twenty-four wavelengths, displaced by that wavelength's refraction and
 * added together, which is what a prism does. Goethe's phenomena come out of
 * Newton's optics; that is the point, and the section says so.
 */

/** An approximation of the sRGB colour of a single wavelength, after Bruton. */
function wavelengthRgb(nm: number): [number, number, number] {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else if (nm <= 780) { r = 1; }
  let f = 1;
  if (nm >= 380 && nm < 420) f = 0.3 + (0.7 * (nm - 380)) / 40;
  else if (nm > 700) f = 0.3 + (0.7 * (780 - nm)) / 80;
  const c = (v: number) => Math.round(255 * (v * f) ** 0.8);
  return [c(r), c(g), c(b)];
}

const SLICES = Array.from({ length: 24 }, (_, i) => 400 + (i * 300) / 23);

export function EdgeColours() {
  const [width, setWidth] = useState(60);
  const [spread, setSpread] = useState(22);
  const [dark, setDark] = useState(false);

  const bands = useMemo(
    () =>
      SLICES.map((nm) => {
        const [r, g, b] = wavelengthRgb(nm);
        // Short wavelengths are refracted further: the displacement runs with
        // 1/λ², which is the shape of ordinary dispersion.
        const t = (1 / (nm / 550) ** 2 - 1) * 2.4;
        return { nm, x: t * spread, rgb: dark ? `rgb(${255 - r},${255 - g},${255 - b})` : `rgb(${r},${g},${b})` };
      }),
    [spread, dark],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:items-start">
      <div>
        <div
          className="relative h-56 w-full overflow-hidden border border-border"
          style={{ background: dark ? "#f4f2ea" : "#08080a" }}
        >
          {bands.map((s) => (
            <div
              key={s.nm}
              className="absolute top-0 h-full"
              style={{
                left: `calc(50% - ${width / 2}px + ${s.x}px)`,
                width: `${width}px`,
                background: s.rgb,
                mixBlendMode: dark ? "multiply" : "screen",
              }}
            />
          ))}
          {/* the band as it would stand unrefracted */}
          <div
            className="absolute top-0 h-full border-x border-dashed border-bone/25"
            style={{ left: `calc(50% - ${width / 2}px)`, width: `${width}px`, mixBlendMode: "normal" }}
            aria-hidden
          />
        </div>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
          {dark
            ? "a dark band on a light ground · the edges meet in magenta"
            : "a light band on a dark ground · the edges meet in green"}
          {" · "}
          the dashes mark where the band would stand unrefracted
        </p>
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">The band</p>
        <label className="mt-4 block">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            width · {width}px
          </span>
          <input
            type="range" min={6} max={160} value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--gold)]"
          />
        </label>
        <label className="mt-5 block">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            refraction · {spread}
          </span>
          <input
            type="range" min={4} max={60} value={spread}
            onChange={(e) => setSpread(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--gold)]"
          />
        </label>
        <button
          onClick={() => setDark((v) => !v)}
          className="mt-6 w-full border border-gold/50 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10"
        >
          {dark ? "Show a light band on dark" : "Show a dark band on light"}
        </button>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Wide band: two coloured edges and an uncoloured middle — the fringes are the phenomenon,
          not the spectrum. Narrow it until the edges overlap and a new colour appears between them,
          green in one case and magenta in the other.{" "}
          <span className="text-bone/90">
            Neither is in the fringes; both are what the fringes make when they meet.
          </span>
        </p>
      </div>
    </div>
  );
}
