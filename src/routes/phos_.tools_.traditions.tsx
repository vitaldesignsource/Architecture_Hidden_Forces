import { lazy, Suspense } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { EntryRow, EntryRows } from "@/components/phos/EntryRows";
import { LabelChips } from "@/components/phos/Labels";
import { divisionLabel } from "@/lib/phos/entries";
import { groupByDivision, sharedBetween, traditionBySlug, traditionValues, withFacet } from "@/lib/phos/tools";

const TraditionsAtlas = lazy(() => import("@/components/phos/TraditionsAtlas").then((m) => ({ default: m.TraditionsAtlas })));

/**
 * Compare Traditions — up to three traditions side by side, each column its
 * entries by division, and beneath them the entries the chosen traditions
 * share. The shared band is the instrument's point: a resemblance the
 * encyclopaedia has actually filed, not one a reader has to infer.
 */
type Search = { a?: string; b?: string; c?: string };

export const Route = createFileRoute("/phos_/tools_/traditions")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const pick = (k: keyof Search) => (typeof search[k] === "string" && search[k] ? (search[k] as string) : undefined);
    return { a: pick("a"), b: pick("b"), c: pick("c") };
  },
  head: () => ({ meta: [{ title: "Compare Traditions — Phōs" }] }),
  component: CompareTraditions,
});

function CompareTraditions() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const values = traditionValues();
  const untouched = !search.a && !search.b && !search.c;
  const slugs = (untouched ? ["neoplatonic", "egyptian"] : [search.a, search.b, search.c]).filter((x): x is string => !!x);
  const chosen = slugs.map(traditionBySlug).filter((v): v is NonNullable<typeof v> => !!v);
  const names = chosen.map((v) => v.value);

  const set = (next: string[]) =>
    navigate({ to: "/phos/tools/traditions", search: { a: next[0], b: next[1], c: next[2] } });
  const toggle = (slug: string) => {
    const cur = chosen.map((v) => v.slug);
    if (cur.includes(slug)) return set(cur.filter((x) => x !== slug));
    if (cur.length >= 3) return set([...cur.slice(1), slug]);
    return set([...cur, slug]);
  };

  const shared = names.length >= 2 ? sharedBetween(names, 2) : [];
  const parallels = shared.filter((e) => e.meta?.labels.includes("Comparative Parallel")).length;

  return (
    <ToolFrame
      name="Compare Traditions"
      title={<>Two or three traditions, <span className="italic text-gold">side by side</span></>}
      lede="Choose up to three traditions. Each column lists what the encyclopaedia has filed under it, division by division, and the band beneath shows the entries the chosen traditions share — resemblances already recorded, with their historical differences kept."
      backdrop="filter-stack-of-cloth-and-stone"
    >
      <ToolBand>
        <Eyebrow>Traditions · choose up to three</Eyebrow>
        <div className="mt-6 flex flex-wrap gap-2">
          {values.map((v) => {
            const on = chosen.some((c) => c.slug === v.slug);
            return (
              <button
                key={v.slug}
                type="button"
                onClick={() => toggle(v.slug)}
                className={`border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.15em] transition-colors ${
                  on ? "border-gold bg-gold/10 text-gold" : v.count ? "border-gold/40 text-bone/85 hover:border-gold/70 hover:text-gold" : "border-border text-muted-foreground opacity-60"
                }`}
              >
                {v.value}
                <span className={`ml-2 ${on ? "text-gold" : "text-gold-dim"}`}>{v.count}</span>
              </button>
            );
          })}
        </div>
      </ToolBand>

      {chosen.length > 0 && (
        <ToolBand>
          <div className={`grid gap-10 ${chosen.length === 1 ? "" : chosen.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
            {chosen.map((v) => {
              const rows = withFacet("tradition", v.value);
              return (
                <div key={v.slug} className="min-w-0">
                  <Eyebrow>{v.value}</Eyebrow>
                  <p className="mt-2 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {rows.length} {rows.length === 1 ? "entry" : "entries"} ·{" "}
                    <Link to="/phos/browse/$facet/$value" params={{ facet: "tradition", value: v.slug }} className="hover:text-gold">
                      in browse →
                    </Link>
                  </p>
                  <div className="mt-6">
                    {groupByDivision(rows).map(({ d, rows: r }, gi) => (
                      <div key={d.id} className={gi ? "mt-8" : ""}>
                        <p className="font-label text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                          <Link to="/phos/$division" params={{ division: d.id }} className="hover:text-gold">{divisionLabel(d)}</Link>
                        </p>
                        <div className="mt-2 space-y-px">
                          {r.map((e) => (
                            <EntryRow key={e.id} e={e} compact />
                          ))}
                        </div>
                      </div>
                    ))}
                    {!rows.length && <p className="text-sm text-muted-foreground">No written entry names this tradition yet.</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </ToolBand>
      )}

      {chosen.length >= 1 && (
        <ToolBand>
          <Eyebrow>Where they were kindled · {names.join(" · ")}</Eyebrow>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The places and years of every dated entry filed under each chosen tradition, from the Atlas: one tint and one lane to a tradition, and an entry filed under two of them in both.
          </p>
          <Suspense fallback={null}>
            <TraditionsAtlas names={names} />
          </Suspense>
        </ToolBand>
      )}

      {chosen.length >= 2 && (
        <ToolBand>
          <Eyebrow>Where they meet · {names.join(" · ")}</Eyebrow>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {shared.length
              ? `${shared.length} ${shared.length === 1 ? "entry carries" : "entries carry"} two or more of the chosen traditions${parallels ? `, ${parallels} of them filed as a Comparative Parallel` : ""}. Similarity is recorded here without being treated as proof of transmission or identity.`
              : "No written entry carries two of the chosen traditions yet. As entries that compare them are written, they collect here."}
          </p>
          {shared.length > 0 && (
            <div className="mt-8">
              <EntryRows entries={shared} />
              <p className="mt-6 font-label text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Each row carries <LabelChips labels={["Comparative Parallel"]} size="xs" /> where the entry itself makes the comparison.
              </p>
            </div>
          )}
        </ToolBand>
      )}
    </ToolFrame>
  );
}
