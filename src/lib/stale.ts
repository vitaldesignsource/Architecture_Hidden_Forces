/**
 * Surviving a deploy that lands mid-visit.
 *
 * The site is one static build whose chunks carry content hashes, and a route
 * is fetched when it is opened. Publish a new build while someone has the page
 * open and their next click asks the host for a chunk filename that no longer
 * exists: the import rejects, the router shows its error boundary, and the
 * reader sees a blank page with no way forward. Nothing is wrong with their
 * browser or with the new build — the two halves are simply from different
 * versions.
 *
 * So a failed import is treated as what it is, a stale page, and the page
 * reloads itself once. The timestamp keeps a genuinely broken host from putting
 * the tab into a reload loop: if the reload does not fix it, the second failure
 * inside half a minute is shown to the reader instead.
 */
const KEY = "aoh:healed-at";
const WINDOW_MS = 30_000;

// Vite reports a failed chunk fetch before the router does, and what the router
// then reports is a downstream symptom — an undefined module, not a network
// error — so the first fact is remembered rather than inferred from the second.
let sawPreloadError = false;
export const markPreloadError = () => { sawPreloadError = true; };
export const hadPreloadError = () => sawPreloadError;

export function isStaleBuildError(error: unknown): boolean {
  const text = error instanceof Error ? `${error.name}: ${error.message}` : String(error ?? "");
  return /dynamically imported module|module script failed|ChunkLoadError|Loading chunk \d|Failed to fetch|NetworkError|error loading/i.test(text);
}

/** Reload once for a stale build. Returns false if it has just tried. */
export function healStaleBuild(): boolean {
  try {
    const last = Number(window.sessionStorage.getItem(KEY) ?? 0);
    if (Date.now() - last < WINDOW_MS) return false;
    window.sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    // Private browsing can refuse storage; one reload is still better than none.
  }
  window.location.reload();
  return true;
}
