import { useState } from "react";

/**
 * ThreeLights — lux, lumen, splendor: light in its source, in the medium, and
 * in the thing seen.
 *
 * Medieval optics kept the three words apart because three different things
 * were happening, and a doctrine that lets them blur will mistake a mirror for
 * a lamp. So the figure gives each register its own failure — hoarding at the
 * source, turbidity in the medium, glamour at the surface — since the failures
 * are where the distinction earns its keep.
 */
export function ThreeLights() {
  const [sel, setSel] = useState<number | null>(null);

  const R = [
    {
      k: "Lux",
      gr: "Πηγή",
      en: "Light in its source",
      d: "Light as it is in the luminary, before it has been given to anything — self-possessed, undivided, and by itself unseen. Nothing is ever seen at the source. What is seen is always what the source has already given away.",
      fail: "Hoarding. A luminary that withholds is not a source of light but a store of heat — bright to itself alone, and dark to everything it was for.",
    },
    {
      k: "Lumen",
      gr: "Διαφανές",
      en: "Light in the medium",
      d: "Light as travel — crossing what is transparent without colouring it, and itself invisible in transit. Look across a lit room and you do not see the light; you see the wall it has reached. The whole virtue of a medium is to carry without adding.",
      fail: "Turbidity. A medium that clouds colours what it carries and calls the colour its own. Every intermediary — a language, a teacher, a tradition — is a medium, and this is how each of them fails.",
    },
    {
      k: "Splendor",
      gr: "Χρῶμα",
      en: "Light in the thing seen",
      d: "Light received by a bounded body and given back — as sheen where the surface is polished, as colour where it is not. Colour is what a surface does with what it is given: it keeps some and returns the rest. Only here does light become a property of things.",
      fail: "Glamour. The surface mistaken for the source — a face, an object, an image that shines with borrowed light and is loved as though it shone.",
    },
  ];

  const on = (i: number) => sel === i;
  const dim = (i: number) => (sel !== null && !on(i) ? 0.3 : 1);
  const toggle = (i: number) => setSel(on(i) ? null : i);
  const cur = sel !== null ? R[sel] : null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[360px]">
        <svg viewBox="0 0 360 220" className="h-auto w-full" role="img" aria-labelledby="aoh-tl-t">
          <title id="aoh-tl-t">
            Three registers of light: a source at the left, a medium it crosses in the middle, and
            a bounded body at the right that gives it back as colour.
          </title>
          <defs>
            <radialGradient id="aoh-tl-lux" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="var(--bone)" stopOpacity="0.9" />
              <stop offset="35%" stopColor="var(--gold)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="aoh-tl-lumen" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* lux — the source */}
          <g
            style={{ cursor: "pointer" }} opacity={dim(0)} onClick={() => toggle(0)}
            role="button" tabIndex={0} aria-pressed={on(0)} aria-label="Lux — light in its source"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(0); } }}
          >
            <rect x="8" y="56" width="88" height="96" fill="transparent" />
            <circle cx="52" cy="104" r="40" fill="url(#aoh-tl-lux)" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 12;
              return (
                <line key={i} x1={52 + Math.cos(a) * 11} y1={104 + Math.sin(a) * 11}
                      x2={52 + Math.cos(a) * (i % 2 ? 22 : 30)} y2={104 + Math.sin(a) * (i % 2 ? 22 : 30)}
                      stroke="var(--gold)" strokeOpacity={on(0) ? 0.9 : 0.5} strokeWidth="0.8" />
              );
            })}
            <circle cx="52" cy="104" r="6.5" fill="var(--bone)" />
            <circle cx="52" cy="104" r="42" fill="none" stroke="var(--gold)"
                    strokeOpacity={on(0) ? 0.9 : 0.25} strokeDasharray={on(0) ? undefined : "2 4"} strokeWidth="0.9" />
            <text x="52" y="172" textAnchor="middle" className="font-mono" fontSize="8"
                  letterSpacing="1.4" fill={on(0) ? "var(--gold)" : "var(--muted-foreground)"}>LUX</text>
          </g>

          {/* lumen — the medium */}
          <g
            style={{ cursor: "pointer" }} opacity={dim(1)} onClick={() => toggle(1)}
            role="button" tabIndex={0} aria-pressed={on(1)} aria-label="Lumen — light in the medium"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(1); } }}
          >
            <rect x="100" y="64" width="150" height="80" fill="url(#aoh-tl-lumen)" />
            {[78, 91, 104, 117, 130].map((y) => (
              <line key={y} x1="100" y1={y} x2="250" y2={y} stroke="var(--bone)"
                    strokeOpacity={on(1) ? 0.35 : 0.14} strokeWidth="0.6" />
            ))}
            <rect x="100" y="64" width="150" height="80" fill="none" stroke="var(--gold)"
                  strokeOpacity={on(1) ? 0.9 : 0.25} strokeDasharray={on(1) ? undefined : "2 4"} strokeWidth="0.9" />
            <text x="175" y="172" textAnchor="middle" className="font-mono" fontSize="8"
                  letterSpacing="1.4" fill={on(1) ? "var(--gold)" : "var(--muted-foreground)"}>LUMEN</text>
          </g>

          {/* splendor — the thing seen */}
          <g
            style={{ cursor: "pointer" }} opacity={dim(2)} onClick={() => toggle(2)}
            role="button" tabIndex={0} aria-pressed={on(2)} aria-label="Splendor — light in the thing seen"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(2); } }}
          >
            <rect x="254" y="56" width="100" height="96" fill="transparent" />
            {[[-4, 0], [-16, -12], [-24, -30]].map(([dx, dy]) => (
              <line key={dx} x1={266 + dx * 0.2} y1={92 + dy * 0.2} x2={246 + dx} y2={78 + dy}
                    stroke="var(--gold)" strokeOpacity={on(2) ? 0.7 : 0.35} strokeWidth="0.8" strokeDasharray="2 2.5" />
            ))}
            <rect x="268" y="66" width="76" height="76" rx="2" fill="var(--gold)"
                  fillOpacity={on(2) ? 0.16 : 0.07} stroke="var(--gold)" strokeOpacity={on(2) ? 0.95 : 0.45} strokeWidth="1" />
            <path d="M278 78 q 20 -6 44 4" fill="none" stroke="var(--bone)" strokeOpacity={on(2) ? 0.8 : 0.45} strokeWidth="1.1" />
            <text x="306" y="172" textAnchor="middle" className="font-mono" fontSize="8"
                  letterSpacing="1.4" fill={on(2) ? "var(--gold)" : "var(--muted-foreground)"}>SPLENDOR</text>
          </g>

          <text x="180" y="206" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill="var(--muted-foreground)" opacity="0.85">
            SOURCE · MEDIUM · THING SEEN — THREE PLACES, NOT THREE LIGHTS
          </text>
        </svg>
      </div>

      <div className="min-h-[13rem]">
        {cur ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {cur.k} · {cur.gr} · {cur.en}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-5 border-l-2 border-bone/30 pl-4 text-sm leading-relaxed text-bone/75">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60">Where it fails · </span>
              {cur.fail}
            </p>
          </>
        ) : (
          <>
            <p className="text-base leading-relaxed text-muted-foreground">
              A thirteenth-century optician would not have said “light” of a lamp, of the air
              between it and the wall, and of the wall, without qualifying which he meant. Lux is
              light where it originates; lumen is light on its way; splendor is light arrived, and
              returned as sheen or colour.
            </p>
            <p className="mt-5 font-serif text-xl leading-relaxed text-bone/85">
              What is seen is never the source. It is always what the source gave, carried by
              something that did not keep it, to something that did.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/60">
              Select a register to see what it does, and how it fails.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
