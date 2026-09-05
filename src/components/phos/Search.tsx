import { useEffect } from "react";

/**
 * The search affordance itself: a button and the two keys that open it. The
 * palette is a separate module because it holds the whole entry index — a
 * hundred and fifty kilobytes of front matter — and a reader who never opens
 * search should not pay for it. PhosHeader loads the palette on first open.
 */

export function useSearchHotkey(open: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? "") || (e.target as HTMLElement)?.isContentEditable;
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open(); }
      else if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); open(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
}

/** The key that opens search, named for the keyboard in front of the reader:
 *  ⌘ means nothing on a machine without one. The glyph is set in the sans, since
 *  neither the label face nor the serif carries it. */
const MAC = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform ?? "");

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label="Search the three volumes" aria-keyshortcuts="Meta+K Control+K /"
      className="flex items-center gap-2 border border-border px-3 py-2 font-label text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold">
      <span>Search</span>
      <span className="hidden text-[9px] tracking-normal text-gold-dim xl:inline">{MAC ? <span className="font-sans">⌘</span> : "Ctrl "}K</span>
    </button>
  );
}
