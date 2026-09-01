import { useState } from "react";
import { TreeOfLife } from "@/components/diagrams/TreeOfLife";

/**
 * KabbalahFigure — the Tree and the ten cards, sharing one selection.
 * Selecting a vessel on the Tree rings it and lights its card; selecting a card
 * does the same in reverse. The Tree still works with no props, so it degrades
 * to the static figure if ever rendered alone.
 */
export function KabbalahFigure() {
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
