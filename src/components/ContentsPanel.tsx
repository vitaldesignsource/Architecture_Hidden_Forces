import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { ENTRIES, PATHS, VOLUMES, type Entry } from "@/lib/contents";

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
 *
 * Since Phōs there are two volumes. The panel is the same component on both:
 * each page hands it its own entries, groups and reading paths, and says which
 * volume it is, so the Volumes block at the foot can mark the one the reader is
 * on and link to the other. The defaults are the Architecture’s, so the original
 * call site did not change.
 */

/** Groups are keyed to the first entry in each, so a new section falls into the
 *  right one without this table being touched. */
const ARCH_GROUPS = [
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

export function ContentsPanel({
  active,
  entries = ENTRIES,
  groups = ARCH_GROUPS,
  paths = PATHS,
  indexHref = "#index",
  volume = "/",
}: {
  active: string | null;
  entries?: readonly Entry[];
  groups?: readonly { at: string; k: string }[];
  paths?: readonly (typeof PATHS)[number][];
  /** Where the page’s own index lives, for the "Routes through it" block. */
  indexHref?: string;
  /** The path of the page this panel is on — marked in the Volumes block. */
  volume?: string;
}) {
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
      // Anchor rows carry aria-current="true"; a router Link on its own page
      // writes aria-current="page" over whatever it was given. Either marks here.
      const here = panel.current?.querySelector<HTMLElement>("[aria-current]");
      if (!scroller || !here || scroller.clientHeight === 0) return;
      const delta = here.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      scroller.scrollTop += delta - scroller.clientHeight / 2 + here.offsetHeight / 2;
    });
    return () => cancelAnimationFrame(raf);
  }, [open, active]);

  // returning focus to the trigger is what makes it usable by keyboard at all
  const close = () => { setOpen(false); trigger.current?.focus(); };
  const follow = () => setOpen(false);

  const grouped: { k: string; rows: Entry[] }[] = [];
  for (const e of entries) {
    const g = groups.find((x) => x.at === e.id);
    if (g || !grouped.length) grouped.push({ k: g ? g.k : "Opening", rows: [] });
    grouped[grouped.length - 1].rows.push(e);
  }
  const numbered = entries.filter((e) => e.n && e.n !== "—" && e.n !== "00").length;

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
        fixed-position descendants — so `inset-y-0` resolved against the nav’s own
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
                      const className = `grid grid-cols-[2.9rem_1fr] gap-3 border-l-2 py-2 pl-3 transition-colors ${
                        here ? "border-gold bg-gold/5" : "border-transparent hover:border-gold/40"
                      }`;
                      const inner = (
                        <>
                          <span className={`font-mono text-[10px] ${here ? "text-gold" : "text-gold-dim"}`}>
                            {e.movement ? "—" : e.n}
                          </span>
                          <span className={`text-sm leading-snug ${here ? "text-gold" : "text-bone/80"}`}>
                            {e.t}
                          </span>
                        </>
                      );
                      // An encyclopaedia row is a page, not a place on this page.
                      if (e.route?.entry) {
                        return (
                          <Link key={e.id} to="/phos/$division/$entry"
                                params={{ division: e.route.division, entry: e.route.entry }}
                                onClick={follow} aria-current={here ? "true" : undefined} className={className}>
                            {inner}
                          </Link>
                        );
                      }
                      if (e.route) {
                        return (
                          <Link key={e.id} to="/phos/$division" params={{ division: e.route.division }}
                                onClick={follow} aria-current={here ? "true" : undefined} className={className}>
                            {inner}
                          </Link>
                        );
                      }
                      return (
                        <a key={e.id} href={`#${e.id}`} onClick={follow}
                           aria-current={here ? "true" : undefined} className={className}>
                          {inner}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}

              {paths.length > 0 && (
                <div className="border-t border-border pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    Routes through it
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {numbered} sections in sequence is a catalogue. Each route names a defensible
                    order and a reason for every step — they live in full at the{" "}
                    <a href={indexHref} onClick={follow} className="text-gold underline-offset-4 hover:underline">
                      Index
                    </a>
                    .
                  </p>
                  <div className="mt-4 space-y-px">
                    {paths.map((p) => (
                      <a
                        key={p.k}
                        href={indexHref}
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
              )}

              {/* The other volume is one page away, and this is the one place a
                  reader can be sure of finding it from anywhere in either. */}
              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  Volumes
                </p>
                <div className="mt-3 space-y-px">
                  {VOLUMES.map((v) =>
                    v.to === volume ? (
                      <div key={v.to} aria-current="page" className="border-l-2 border-gold bg-gold/5 py-3 pl-3">
                        <span className="block font-serif text-base text-gold">{v.t}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {v.d} <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-gold-dim">· you are here</span>
                        </span>
                      </div>
                    ) : (
                      <Link
                        key={v.to}
                        to={v.to}
                        onClick={follow}
                        className="block border-l-2 border-transparent py-3 pl-3 transition-colors hover:border-gold/40"
                      >
                        <span className="block font-serif text-base text-bone/85">{v.t}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{v.d}</span>
                      </Link>
                    ),
                  )}
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
