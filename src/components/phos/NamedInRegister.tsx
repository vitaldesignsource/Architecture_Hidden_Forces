import { Link } from "@tanstack/react-router";
import { Term } from "@/components/Term";
import { BEINGS, CLASSES, shortKind } from "@/lib/phos/beings";

/**
 * The other direction of the register's link. An entry that a being is filed
 * against says so, in the being's own script, and each name goes back to the
 * register with that row already open — so the entry and the taxonomy are one
 * fabric rather than two lists that happen to agree.
 *
 * Loaded lazily and gated by REGISTERED_ENTRIES: an entry with no beings never
 * fetches the register at all.
 */
export function NamedInRegister({ id }: { id: string }) {
  const beings = BEINGS.filter((b) => b.entries?.includes(id));
  if (!beings.length) return null;
  const traditions = [...new Set(beings.map((b) => b.tradition))];

  return (
    <div className="mt-16 border-t border-border pt-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
        Named in the Register
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {beings.length === 1 ? "One being" : `${beings.length} beings`} filed against this entry
        {traditions.length > 1 && `, from ${traditions.length} traditions`}. The register gives each
        its own tradition's word for what kind of thing it is, and its place in this volume's
        vertical — which is the volume's claim, not the tradition's.
      </p>
      <div className="mt-6 grid gap-x-10 gap-y-px sm:grid-cols-2">
        {beings.map((b) => (
          <Link
            key={b.id}
            to="/phos/tools/beings"
            search={{ being: b.id }}
            className="group grid grid-cols-[minmax(0,1fr)] items-baseline gap-1 border-b border-border py-4 transition-colors hover:border-gold/40"
          >
            <span className="flex flex-wrap items-baseline gap-x-3">
              {b.native?.orig && (
                <Term
                  script={b.native.script}
                  orig={b.native.orig}
                  label={`${b.native.tr} — ${b.name}`}
                  className="text-xl text-gold"
                />
              )}
              <span className="font-serif text-lg text-bone transition-colors group-hover:text-gold">
                {b.name}
              </span>
              {b.native?.tr && b.native.tr !== b.name && (
                <span className="font-serif text-sm italic text-gold-dim">{b.native.tr}</span>
              )}
            </span>
            <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
              {b.office}
            </span>
            <span className="mt-1.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-bone/40">
              {b.tradition} · {shortKind(b.kind)} ·{" "}
              {CLASSES.find((c) => c.k === b.cls)?.label ?? b.cls}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
