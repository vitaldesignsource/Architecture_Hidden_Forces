import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { SearchButton, useSearchHotkey } from "@/components/phos/Search";
import { VOLUMES } from "@/lib/contents";

const SearchPalette = lazy(() => import("@/components/phos/SearchPalette").then((m) => ({ default: m.SearchPalette })));

/**
 * What a reader sees at an address that is no page.
 *
 * The router's own answer was the word "Not Found" on a black ground, with no
 * header and no link: a dead end, on a site whose whole design is that every
 * page hands the reader on. The encyclopaedia's routes already answer a
 * mistyped division or entry in the site's voice; this does the same for the
 * treatise, the Ecology and anything else, leading with the volume the
 * address was under and keeping search to hand, since a reader who typed a
 * path was looking for something.
 */
export function NotFound() {
  const { pathname } = useLocation();
  const [searching, setSearching] = useState(false);
  const openSearch = useCallback(() => setSearching(true), []);
  useSearchHotkey(openSearch);
  useEffect(() => {
    document.title = "No such page · The Architecture of Hidden Forces";
  }, []);

  const under = pathname.startsWith("/ecology") ? "/ecology" : pathname.startsWith("/phos") ? "/phos/portal" : "/";
  const volumes = [...VOLUMES].sort((a, b) => Number(b.to === under) - Number(a.to === under));
  const note =
    under === "/ecology"
      ? "The Hidden Ecology is six stations, six provinces and a lexicon, every one of them listed on its landing page, so an address under it that resolves to nothing is a mistyped one rather than a page still to come."
      : under === "/phos/portal"
        ? "Every division and entry of the encyclopaedia is registered in its outline before it is written, so an address that resolves to nothing is a mistyped one rather than a page still to come."
        : "Nothing on this site has moved, so an address that resolves to nothing is a mistyped one. The three volumes are below, and search reaches all of them.";

  return (
    <div className="flex min-h-screen items-center bg-void font-sans text-bone">
      <div className="mx-auto w-full max-w-3xl px-6 py-24">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">Nothing at this address</p>
        <h1 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
          There is no page at <span className="break-all italic text-gold">{pathname}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{note}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <SearchButton onClick={openSearch} />
          {volumes.map((v) => (
            <Link
              key={v.to}
              to={v.to}
              className={`border px-5 py-2.5 font-label text-[10px] uppercase tracking-[0.2em] transition-colors ${
                v.to === under ? "border-gold text-gold hover:bg-gold/10" : "border-border text-muted-foreground hover:border-gold/50 hover:text-gold-dim"
              }`}
            >
              {v.t}
            </Link>
          ))}
        </div>
      </div>
      {searching && (
        <Suspense fallback={null}>
          <SearchPalette open onClose={() => setSearching(false)} />
        </Suspense>
      )}
    </div>
  );
}
