import type { ReactNode } from "react";
import { ArrowMark, BackMark } from "@/components/marks";
import { useEffect } from "react";

/**
 * Stepping through the encyclopaedia from the keyboard.
 *
 * ← and [ go to the previous page, → and ] to the next: between entries of a
 * division, and between divisions. The keys are ignored while the reader is
 * typing (the search palette, any field), when a modifier is held, and when
 * something nearer the event has already claimed the key.
 */
export function useStepKeys(step: { prev?: (() => void) | null; next?: (() => void) | null }) {
  const { prev, next } = step;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t?.tagName ?? "") || t?.isContentEditable) return;
      if ((e.key === "ArrowLeft" || e.key === "[") && prev) { e.preventDefault(); prev(); }
      else if ((e.key === "ArrowRight" || e.key === "]") && next) { e.preventDefault(); next(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);
}

function Key({ k }: { k: ReactNode }) {
  return (
    <kbd className="inline-block min-w-[1.4em] border border-border px-1 py-px text-center font-label text-[9px] not-italic text-bone/60">
      {k}
    </kbd>
  );
}

/** The keys, named once beneath the previous/next links; only where there is a keyboard to speak of. */
export function KeyHint({ between }: { between: string }) {
  return (
    <p className="mt-6 hidden items-center gap-1.5 font-label text-[9px] uppercase tracking-[0.25em] text-gold-dim pointer-fine:flex">
      <Key k={<BackMark />} /> <Key k={<ArrowMark />} />
      <span className="mx-1">or</span>
      <Key k="[" /> <Key k="]" />
      <span className="ml-1">step between {between}</span>
      <span className="mx-2 text-bone/25">·</span>
      <Key k="/" />
      <span className="ml-1">searches</span>
    </p>
  );
}
