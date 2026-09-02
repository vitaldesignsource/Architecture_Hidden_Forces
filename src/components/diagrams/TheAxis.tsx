import { useState } from "react";

/**
 * TheAxis — Head, Heart and Hara as a line that can break.
 *
 * § XXII already draws a triad by withholding one node and reading what the
 * other two lose. This asks a different question, so it takes a different shape:
 * not which relations fail, but what a person is like when the axis is
 * incomplete. Each centre is engaged or not, and the readout is the resulting
 * condition — which is why all three can be off at once here, and why the
 * connecting line breaks rather than the nodes dimming.
 *
 * The named states come from the section's own opening: understood yet
 * unaccepted, sincerely desired yet poorly directed, powerfully enacted without
 * wisdom, and vision that never became transformation.
 */
export function TheAxis() {
  const [on, setOn] = useState({ Head: true, Heart: true, Hara: true });

  const C = [
    { k: "Head", pr: "Logos", q: "What is the pattern?", y: 62,
      d: "Where experience becomes intelligible — distinguishing, comparing, naming. Not language alone but the ordering intelligence by which scattered impressions become a meaningful configuration.",
      note: "Strongly Mercurial, translating between worlds — which is why it needs Salt." },
    { k: "Heart", pr: "Sympatheia", q: "What is my right relationship to it?", y: 158,
      d: "Where separate things become significant to one another. Not the producer of emotion but the determiner of participation: what matters, what is refused, what one is willing to serve.",
      note: "It mediates above and below — illuminating the Head without inflating it, warming the Hara without consuming its reserves." },
    { k: "Hara", pr: "Presence", q: "Can this become real through me?", y: 254,
      d: "The body's gathered centre of gravity and available power — breath, balance, generative force, posture, grounded intention.",
      note: "A pronounced Salt character, fixing force within a living boundary." },
  ];

  const state = (h: boolean, e: boolean, a: boolean) => {
    if (h && e && a) return { k: "The pattern becomes a way of being", d: "Seen, consented to, and given substance. The axis complete: Logos gives direction, sympatheia establishes right relationship, and the Hara gives the whole configuration a living body." };
    if (h && e && !a) return { k: "Vision, but not transformation", d: "Seen clearly and truly consented to, and never made inhabitable. Ascent without return — the mature movement rises toward clarity and then descends again as conduct, craft, speech and presence." };
    if (h && !e && a) return { k: "Understood and enacted, unconsented", d: "The pattern is grasped and carried out with nothing in the person having agreed to it. Capability without participation." };
    if (h && !e && !a) return { k: "Understood, yet emotionally unaccepted", d: "The commonest failure of the axis. A thing can be entirely clear and still meet no consent — which is why clarity alone changes so little." };
    if (!h && e && a) return { k: "Sincerely desired, poorly directed", d: "Real consent and real capacity, with no clear sight of the pattern. Effort that means it and misses." };
    if (!h && e && !a) return { k: "Felt, and left there", d: "Consent without either the sight to direct it or the substance to carry it." };
    if (!h && !e && a) return { k: "Powerfully enacted without wisdom", d: "Force with neither pattern nor participation behind it. The most dangerous of the incomplete states, because it is the one that acts." };
    return { k: "Nothing engaged", d: "No centre is carrying the pattern." };
  };

  const cur = state(on.Head, on.Heart, on.Hara);
  const whole = on.Head && on.Heart && on.Hara;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[300px]">
        <svg viewBox="0 0 300 332" className="h-auto w-full" role="img" aria-labelledby="aoh-ax-t">
          <title id="aoh-ax-t">
            Head, Heart and Hara on a vertical axis. Each can be engaged or not, and the line
            joining them breaks wherever one is absent.
          </title>

          {/* the line breaks where a centre is not engaged */}
          {[0, 1].map((i) => {
            const a = C[i], b = C[i + 1];
            const live = on[a.k as keyof typeof on] && on[b.k as keyof typeof on];
            return (
              <line key={i} x1="150" y1={a.y + 30} x2="150" y2={b.y - 30}
                    stroke="var(--gold)" strokeOpacity={live ? 0.75 : 0.16}
                    strokeDasharray={live ? "none" : "3 6"} strokeWidth={live ? 1.5 : 1} />
            );
          })}

          {C.map((c) => {
            const lit = on[c.k as keyof typeof on];
            return (
              <g key={c.k} style={{ cursor: "pointer" }}
                 onClick={() => setOn((s) => ({ ...s, [c.k]: !s[c.k as keyof typeof s] }))}
                 role="button" tabIndex={0} aria-pressed={lit} aria-label={c.k}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOn((s) => ({ ...s, [c.k]: !s[c.k as keyof typeof s] })); } }}>
                <circle cx="150" cy={c.y} r="29" fill="var(--void)" stroke="var(--gold)"
                        strokeOpacity={lit ? 1 : 0.24}
                        strokeDasharray={lit ? "none" : "4 4"} strokeWidth={lit ? 1.6 : 1} />
                <text x="150" y={c.y + 4} textAnchor="middle" className="font-mono" fontSize="8.4"
                      letterSpacing="1.1" fill={lit ? "var(--gold)" : "var(--muted-foreground)"}
                      opacity={lit ? 1 : 0.5}>{c.k.toUpperCase()}</text>
                <text x="112" y={c.y + 3} textAnchor="end" className="font-serif" fontSize="9.5"
                      fill="var(--muted-foreground)" opacity={lit ? 0.85 : 0.3}>{c.pr}</text>
                <text x="188" y={c.y + 3} className="font-mono" fontSize="6"
                      fill="var(--muted-foreground)" opacity={lit ? 0.7 : 0.25}>
                  {lit ? "ENGAGED" : "ABSENT"}
                </text>
              </g>
            );
          })}

          <text x="150" y="322" textAnchor="middle" className="font-mono" fontSize="6.4"
                letterSpacing="1" fill={whole ? "var(--gold)" : "var(--muted-foreground)"}
                opacity="0.85">
            {whole ? "THE COMPLETE AXIS" : "THE AXIS IS BROKEN"}
          </text>
        </svg>
      </div>

      <div className="min-h-[15rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
          {whole ? "Complete" : "Incomplete"}
        </p>
        <p className="mt-3 font-serif text-2xl leading-relaxed text-gold">{cur.k}</p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.d}</p>

        <div className="mt-8 space-y-px">
          {C.map((c) => (
            <div key={c.k} className="grid gap-1 border-b border-border py-3 sm:grid-cols-[5rem_1fr]">
              <span className={`font-mono text-[10px] uppercase tracking-[0.12em] ${on[c.k as keyof typeof on] ? "text-gold" : "text-muted-foreground"}`}>
                {c.k}
              </span>
              <span className={`text-sm leading-relaxed ${on[c.k as keyof typeof on] ? "text-bone/80" : "text-muted-foreground"}`}>
                {c.q}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-bone/60">
          Switch a centre off to see what a person is like without it. The Head must see clearly, the
          Heart must consent truthfully, and the Hara must make the truth inhabitable.
        </p>
      </div>
    </div>
  );
}
