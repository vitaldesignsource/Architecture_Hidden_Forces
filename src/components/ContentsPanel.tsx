import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ENTRIES, PATHS } from "@/lib/contents";

/**
 * ContentsPanel — the whole contents, reachable from anywhere.
 *
 * § Index already lists everything and does it well. What it cannot do is reach a
 * reader where they are: at § XL you are some 160,000px away from it, so using it
 * costs you your place. That distance is what a single-page work of this length
 * creates, and it is the only thing this panel exists to solve.
 *
 * So it is not a second index. It is the same data — one shared module, since two
 * copies of a 54-row list would drift exactly as the two nav lists did — grouped
 * by movement so the shape is visible, with the current section marked so it
 * answers "where am I" as well as "take me there".
 */
export function ContentsPanel({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Escape closes, Tab stays inside, and the page beneath does not scroll away
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() =>
      panel.current?.querySelector<HTMLElement>("button, a")?.focus()
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  // Open where the reader is, not at the beginning — with 54 rows that difference
  // is the whole value of marking the current one. Keyed on `active` as well as
  // `open`, because `active` can arrive a tick after the panel does: centring on
  // open alone found nothing marked yet and silently did nothing. The page cannot
  // scroll while the panel is up, so this settles once and stays put.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      const scroller = panel.current?.querySelector<HTMLElement>("[data-scroll]");
      const here = panel.current?.querySelector<HTMLElement>('[aria-current="true"]');
      if (!scroller || !here || scroller.clientHeight === 0) return;
      const delta = here.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      scroller.scrollTop += delta - scroller.clientHeight / 2 + here.offsetHeight / 2;
    });
    return () => cancelAnimationFrame(raf);
  }, [open, active]);

  // returning focus to the trigger is what makes it usable by keyboard at all
  const close = () => { setOpen(false); trigger.current?.focus(); };
  const follow = () => setOpen(false);

  // Groups are keyed to the first entry in each, so a new section falls into the
  // right one without this table being touched.
  const GROUPS = [
    { at: "doctrine", k: "First principles" },
    { at: "descent", k: "The field" },
    { at: "kabbalah", k: "The powers" },
    { at: "laws", k: "Laws, sky, and qualities" },
    { at: "channels", k: "The living vessel" },
    { at: "image", k: "Symbol and rite" },
    { at: "taxonomy", k: "Mediation" },
    { at: "books", k: "Tradition and time" },
    { at: "rightrelation", k: "Relation and return" },
    { at: "lexicon", k: "Apparatus" },
  ];
  const grouped: { k: string; rows: typeof ENTRIES }[] = [];
  for (const e of ENTRIES) {
    const g = GROUPS.find((x) => x.at === e.id);
    if (g || !grouped.length) grouped.push({ k: g ? g.k : "Opening", rows: [] });
    grouped[grouped.length - 1].rows.push(e);
  }

  return (
    <>
      <button
        ref={trigger}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="shrink-0 border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
      >
        Contents
      </button>

      {/*
        The panel must not render inside <nav>. That element carries
        backdrop-blur, and backdrop-filter establishes a containing block for
        fixed-position descendants — so `inset-y-0` resolved against the nav's own
        69px box instead of the viewport, and the panel opened as a sliver. A
        portal puts it on <body>, where fixed means what it says.
      */}
      {open && createPortal(
        <>
          <div
            className="aoh-cp-veil fixed inset-0 z-[60] bg-void/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="aoh-cp fixed inset-y-0 right-0 z-[61] flex w-full max-w-[26rem] flex-col border-l border-border bg-void"
          >
            <div className="flex items-baseline justify-between border-b border-border px-6 py-5">
              <p id={titleId} className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Contents
              </p>
              <button
                onClick={close}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
              >
                Close ✕
              </button>
            </div>

            <div data-scroll className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
              {grouped.map((g) => (
                <div key={g.k} className="mb-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {g.k}
                  </p>
                  <div className="mt-3 space-y-px">
                    {g.rows.map((e) => {
                      const here = active === e.id;
                      return (
                        <a
                          key={e.id}
                          href={`#${e.id}`}
                          onClick={follow}
                          aria-current={here ? "true" : undefined}
                          className={`grid grid-cols-[2.9rem_1fr] gap-3 border-l-2 py-2 pl-3 transition-colors ${
                            here ? "border-gold bg-gold/5" : "border-transparent hover:border-gold/40"
                          }`}
                        >
                          <span className={`font-mono text-[10px] ${here ? "text-gold" : "text-gold-dim"}`}>
                            {e.movement ? "—" : e.n}
                          </span>
                          <span className={`text-sm leading-snug ${here ? "text-gold" : "text-bone/80"}`}>
                            {e.t}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="border-t border-border pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  Routes through it
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Forty-seven sections in sequence is a catalogue. Each route names a defensible
                  order and a reason for every step — they live in full at the{" "}
                  <a href="#index" onClick={follow} className="text-gold underline-offset-4 hover:underline">
                    Index
                  </a>
                  .
                </p>
                <div className="mt-4 space-y-px">
                  {PATHS.map((p) => (
                    <a
                      key={p.k}
                      href="#index"
                      onClick={follow}
                      className="block border-b border-border py-3 transition-colors hover:border-gold/40"
                    >
                      <span className="font-serif text-base text-bone/85">{p.k}</span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        {p.n}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body,
      )}
    </>
  );
}
