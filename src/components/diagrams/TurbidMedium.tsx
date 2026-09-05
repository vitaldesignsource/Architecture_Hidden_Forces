import { useState } from "react";

/**
 * The turbid medium, looked through in both directions.
 *
 * One medium, two directions of looking, two colours: light seen through a
 * cloudiness warms — yellow, orange, ruby — and darkness seen through a
 * cloudiness that is itself lit cools — blue, paler blue, white. The two poles
 * do not behave symmetrically as the medium thickens, and Goethe builds his
 * whole sequence on that asymmetry.
 *
 * The colours here are computed from a scattering law rather than picked: the
 * short wavelengths are scattered out of the transmitted beam and into the
 * scattered one, which is why the sun reddens at the horizon and the sky is
 * blue overhead, and which is the modern account of the same observation.
 */
export function TurbidMedium() {
  const [t, setT] = useState(0.45);

  // Rayleigh-shaped extinction: short wavelengths are removed from what comes
  // through, and are what is seen from the side.
  const ext = (nm: number) => Math.exp(-t * 4.0 * (550 / nm) ** 4);
  const chan = [700, 546, 436];
  const through = chan.map((nm) => Math.round(255 * ext(nm)));
  const scattered = chan.map((nm) => Math.round(255 * (1 - ext(nm)) * (0.55 + 0.45 * t)));
  const rgb = (c: number[]) => `rgb(${c[0]},${c[1]},${c[2]})`;

  return (
    <div>
      <div className="grid gap-px sm:grid-cols-2">
        <div className="relative flex h-52 items-center justify-center overflow-hidden border border-border" style={{ background: "#050506" }}>
          <div
            className="h-28 w-28 rounded-full"
            style={{ background: rgb(through), boxShadow: `0 0 90px 30px ${rgb(through)}33` }}
          />
          <p className="absolute bottom-3 left-3 font-label text-[9px] uppercase tracking-[0.15em] text-bone/60">
            light seen through the medium
          </p>
        </div>
        <div className="relative flex h-52 items-center justify-center overflow-hidden border border-border" style={{ background: rgb(scattered) }}>
          <div className="h-28 w-28 rounded-full" style={{ background: "#050506" }} />
          <p className="absolute bottom-3 left-3 font-label text-[9px] uppercase tracking-[0.15em] text-black/60">
            darkness seen through the lit medium
          </p>
        </div>
      </div>
      <label className="mt-5 block max-w-md">
        <span className="font-label text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          turbidity · {(t * 100).toFixed(0)}
        </span>
        <input
          type="range" min={2} max={100} value={Math.round(t * 100)}
          onChange={(e) => setT(Number(e.target.value) / 100)}
          className="mt-2 w-full accent-[var(--gold)]"
        />
      </label>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Thicken it and the two sides part company: the light side darkens through yellow and orange
        toward ruby, while the dark side lightens through blue toward white. The sun at the horizon
        and the sky above it are the same medium, read from the two ends — which is Goethe&rsquo;s
        primal phenomenon, and also what a scattering law predicts.
      </p>
    </div>
  );
}
