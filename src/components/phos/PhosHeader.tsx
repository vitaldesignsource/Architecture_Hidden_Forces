import type { ReactNode } from "react";
import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { SearchButton, useSearchHotkey } from "@/components/phos/Search";
import { CrossMark } from "@/components/CrossMark";
import { NavStrip } from "@/components/NavStrip";

// The palette carries the entry index; it arrives when a reader first asks for it.
const SearchPalette = lazy(() =>
  import("@/components/phos/SearchPalette").then((m) => ({ default: m.SearchPalette })),
);

/**
 * PhosHeader — the fixed bar the encyclopaedia's pages share.
 *
 * The two treatises carry waypoints into a single long page. An encyclopaedia
 * page is short and one of hundreds, so its bar carries places instead: the
 * Portal, the browse index, the instruments, and then the other two volumes,
 * set as every bar sets them. The wordmark is the way to the volume's own
 * essay, as a wordmark is. The Contents panel is handed in by the page, since
 * each page lists something different in it — the Portal its own sections, a
 * division its entries — and marks where the reader is.
 */
export function PhosHeader({ panel, crumb }: { panel: ReactNode; crumb?: ReactNode }) {
  const [searching, setSearching] = useState(false);
  const openSearch = useCallback(() => setSearching(true), []);
  useSearchHotkey(openSearch);
  const links = (
    <>
      <Link to="/phos/portal" className="whitespace-nowrap transition-colors hover:text-gold" activeProps={{ className: "text-gold" }}>
        Portal
      </Link>
      <Link to="/phos/browse" className="whitespace-nowrap transition-colors hover:text-gold" activeProps={{ className: "text-gold" }}>
        Browse
      </Link>
      <Link to="/phos/tools" className="whitespace-nowrap transition-colors hover:text-gold" activeProps={{ className: "text-gold" }}>
        Instruments
      </Link>
    </>
  );
  const volumes = (
    <>
      <Link to="/" className="whitespace-nowrap transition-colors hover:text-gold">
        Architecture <CrossMark className="text-gold/70" />
      </Link>
      <Link to="/ecology" className="whitespace-nowrap transition-colors hover:text-gold">
        Ecology <CrossMark className="text-gold/70" />
      </Link>
    </>
  );
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-void/70 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-3 sm:flex sm:justify-between sm:py-5">
        <div className="min-w-0">
          <Link to="/phos" activeOptions={{ exact: true }} className="block truncate font-serif text-base italic tracking-wide transition-colors hover:text-gold sm:text-lg">
            Phōs<span className="hidden sm:inline"> · The Luminous Architecture</span>
          </Link>
          {crumb && (
            <div className="mt-1 hidden truncate font-label text-[10px] uppercase tracking-[0.14em] text-gold-dim lg:block xl:tracking-[0.2em]">
              {crumb}
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-4 font-label text-[10px] uppercase tracking-[0.18em] xl:gap-6 xl:tracking-[0.2em]">
          <div className="hidden items-center gap-4 lg:flex xl:gap-6">{links}</div>
          <div className="hidden shrink-0 items-center gap-4 border-l border-border pl-4 font-serif text-sm normal-case tracking-normal text-bone/80 lg:flex xl:gap-5 xl:pl-6">
            {volumes}
          </div>
          <SearchButton onClick={openSearch} />
          {panel}
        </div>
      </div>
      {searching && (
        <Suspense fallback={null}>
          <SearchPalette open onClose={() => setSearching(false)} />
        </Suspense>
      )}
      <div className="border-t border-border/50 lg:hidden">
        <NavStrip>
          {links}
          <div className="ml-auto flex items-center gap-4 border-l border-border py-1 pl-4 font-serif text-xs normal-case tracking-normal text-bone/80">
            {volumes}
          </div>
        </NavStrip>
      </div>
    </nav>
  );
}

/** A route change should open at the top of the new page, not where the last
 *  one was scrolled to. Keyed on whatever identifies the page. */
export function useScrollTop(key: string) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);
}

export function PhosFooter() {
  return (
    <footer className="border-t border-border bg-void py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 sm:flex sm:justify-between">
        <div className="min-w-0 truncate font-serif text-sm italic text-muted-foreground">
          Phōs · The Portal —{" "}
          <Link to="/phos" activeOptions={{ exact: true }} className="underline-offset-4 hover:text-gold hover:underline">
            the volume
          </Link>{" "}
          ·{" "}
          <Link to="/" className="underline-offset-4 hover:text-gold hover:underline">
            the first volume
          </Link>
        </div>
        <div className="shrink-0 font-label text-[10px] uppercase tracking-[0.4em] text-gold-dim">MMXXVI</div>
      </div>
    </footer>
  );
}
