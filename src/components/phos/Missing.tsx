import { Link } from "@tanstack/react-router";
import { ContentsPanel } from "@/components/ContentsPanel";
import { PhosHeader, PhosFooter } from "@/components/phos/PhosHeader";

/** The not-found page for the encyclopaedia's routes — in the site's voice. */
export function Missing({ what }: { what: "division" | "entry" }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      <PhosHeader panel={<ContentsPanel active={null} entries={[]} groups={[]} paths={[]} volume="/phos/portal" />} />
      <div className="mx-auto max-w-3xl px-6 pt-48 pb-32">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">Not in the outline</p>
        <h1 className="mt-6 font-serif text-4xl leading-tight">There is no such {what}</h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Every division and entry of the encyclopaedia is registered in its table of contents before it is
          written, so an address that resolves to nothing is a mistyped one rather than a page still to come.
        </p>
        <Link to="/phos/portal" className="mt-10 inline-block font-label text-[10px] uppercase tracking-[0.25em] text-gold hover:underline">
          ← The Portal
        </Link>
      </div>
      <PhosFooter />
    </div>
  );
}
