import { useEffect, useState } from "react";
import { Link, type ErrorComponentProps } from "@tanstack/react-router";
import { hadPreloadError, healStaleBuild, isStaleBuildError } from "@/lib/stale";

/**
 * What a reader sees when a route fails.
 *
 * The router's own boundary says "Something went wrong!" on a bare white
 * ground, which tells a reader nothing and offers them nothing. This says which
 * of the two cases it is — a page left open across a deploy, which heals
 * itself, or a real fault, which does not — and in both cases keeps a way back
 * into the volumes.
 */
export function RouteError({ error }: ErrorComponentProps) {
  const stale = hadPreloadError() || isStaleBuildError(error);
  const [healing, setHealing] = useState(false);

  useEffect(() => {
    if (stale) setHealing(healStaleBuild());
  }, [stale]);

  const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error ?? "");

  return (
    <div className="flex min-h-screen items-center bg-void font-sans text-bone">
      <div className="mx-auto w-full max-w-3xl px-6 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          {stale ? "A newer version was published" : "This page did not open"}
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
          {stale ? (
            <>The page you had open belongs to <span className="italic text-gold">an earlier build</span></>
          ) : (
            <>Something here <span className="italic text-gold">failed to load</span></>
          )}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {stale
            ? healing
              ? "Reloading now to fetch the current one. Nothing was lost."
              : "Reloading did not clear it, which usually means the site is mid-publish. Give it a moment and try again."
            : "The rest of the site is unaffected. Reloading usually clears it; if it does not, the two volumes are both reachable below."}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="border border-gold px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/10"
          >
            Reload
          </button>
          <Link
            to="/phos/portal"
            className="border border-border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold-dim"
          >
            The Portal
          </Link>
          <Link
            to="/"
            className="border border-border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold-dim"
          >
            The Architecture
          </Link>
        </div>

        {detail && (
          <details className="mt-12 max-w-2xl border-t border-border pt-6">
            <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              What the browser reported
            </summary>
            <p className="mt-4 break-words font-mono text-xs leading-relaxed text-bone/50">{detail}</p>
          </details>
        )}
      </div>
    </div>
  );
}
