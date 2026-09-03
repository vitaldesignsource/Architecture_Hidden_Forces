import { useState } from "react";

/**
 * BoundaryColour — Goethe’s primal phenomenon, as the one polarity it is.
 *
 * Light seen through a turbid medium warms: yellow, orange, red as the medium
 * thickens. Darkness seen through a lit turbid medium cools: violet, blue, the
 * pale blue of daytime sky. The colours are not in the light and not in the
 * dark; they arise at the boundary, in the medium, and they arise as a pair.
 *
 * This is the one figure on the site drawn in colour, because colour is its
 * subject. The chroma is kept low and the hues move with the slider, so the
 * point is the movement and not the paint.
 */
export function BoundaryColour() {
  const [t, setT] = useState(0.35);
  const pct = Math.round(t * 100);

  // light through turbidity: white → yellow → orange → red
  const warm = `oklch(${(0.92 - 0.42 * t).toFixed(3)} ${(0.04 + 0.14 * t).toFixed(3)} ${(96 - 62 * t).toFixed(1)})`;
  // darkness through lit turbidity: black → violet → blue → pale blue
  const cool = `oklch(${(0.12 + 0.62 * t).toFixed(3)} ${(0.03 + 0.11 * Math.sin(t * Math.PI)).toFixed(3)} ${(300 - 58 * t).toFixed(1)})`;

  const readout =
    t < 0.03 ? "NO MEDIUM — WHITE AND BLACK, AND NO COLOUR ANYWHERE"
    : t > 0.97 ? "THE MEDIUM OPAQUE — THE LIGHT GONE TO RED, THE DARK GONE TO PALE"
    : `TURBIDITY ${pct}% — THE SAME MEDIUM, WARM ON ONE SIDE AND COOL ON THE OTHER`;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[380px]">
        <svg viewBox="0 0 380 212" className="h-auto w-full" role="img" aria-labelledby="aoh-bc-t">
          <title id="aoh-bc-t">
            Two panels. On the left a bright disc seen through a clouded medium against darkness,
            warming from white to red as turbidity rises. On the right a dark disc seen through a
            lit clouded medium, cooling from black to violet to pale blue.
          </title>

          {/* light through the medium, against darkness */}
          <rect x="12" y="14" width="166" height="140" fill="var(--void)" stroke="var(--border)" />
          <circle cx="95" cy="84" r={38 + t * 4} fill={warm} />
          <circle cx="95" cy="84" r={52 + t * 10} fill={warm} opacity={0.12 + t * 0.2} />
          <rect x="12" y="14" width="166" height="140" fill="var(--bone)" opacity={t * 0.22} />
          <text x="95" y="172" textAnchor="middle" className="font-mono" fontSize="6.6" letterSpacing="1.1" fill="var(--gold-dim)">LIGHT THROUGH A TURBID MEDIUM</text>
          <text x="95" y="183" textAnchor="middle" className="font-mono" fontSize="6.2" letterSpacing="1" fill="var(--muted-foreground)">the warm pole · yellow → red</text>

          {/* darkness through the medium, lit */}
          <rect x="202" y="14" width="166" height="140" fill="var(--bone)" opacity="0.86" />
          <circle cx="285" cy="84" r={38 + t * 4} fill={cool} />
          <circle cx="285" cy="84" r={52 + t * 10} fill={cool} opacity={0.14 + t * 0.2} />
          <rect x="202" y="14" width="166" height="140" fill="var(--bone)" opacity={t * 0.18} />
          <rect x="202" y="14" width="166" height="140" fill="none" stroke="var(--border)" />
          <text x="285" y="172" textAnchor="middle" className="font-mono" fontSize="6.6" letterSpacing="1.1" fill="var(--gold-dim)">DARKNESS THROUGH A LIT MEDIUM</text>
          <text x="285" y="183" textAnchor="middle" className="font-mono" fontSize="6.2" letterSpacing="1" fill="var(--muted-foreground)">the cool pole · violet → blue</text>

          <text x="190" y="204" textAnchor="middle" className="font-mono" fontSize="6.2" letterSpacing="1" fill="var(--gold)" opacity="0.9">
            {readout}
          </text>
        </svg>
        <input type="range" min={0} max={1} step={0.005} value={t} aria-label="Turbidity of the medium"
               onChange={(e) => setT(parseFloat(e.target.value))}
               className="mt-3 w-full accent-[var(--gold)]" />
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Turbidity of the medium — clear at the left, opaque at the right
        </p>
      </div>

      <div className="min-h-[13rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          The primal phenomenon
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The sun at noon, through little air, is white. At the horizon, through much, it is red.
          The sky — lit air seen against the black of space — is blue, and goes paler as the air
          thickens toward the horizon. One medium, one pair of colours, read in two directions.
        </p>
        <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
          Colour is not in the light and not in the dark. It arises where they meet, in the medium,
          and it arises as a polarity.
        </p>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Which is what Tone would predict of any two powers Light has made distinct: once
          difference exists, relation organises it into a pair. Goethe called the pair the deeds
          and sufferings of light, and refused to derive it from anything simpler — the boundary is
          where the phenomenon begins, not a corruption of some purer state behind it.
        </p>
      </div>
    </div>
  );
}
