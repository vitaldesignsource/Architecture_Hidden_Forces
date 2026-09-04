import { TATTVA_LEGEND, TattvaCard } from "./TattvaGlyph";

/** The tattva on its own card, as the Diagram Library and the entry set it. */
export function TattvaCardApas() {
  return (
    <div>
      <div className="flex justify-center"><TattvaCard k="apas" width={128} /></div>
      <p className="mx-auto mt-6 max-w-xl text-center text-[11px] leading-relaxed text-muted-foreground">{TATTVA_LEGEND}</p>
    </div>
  );
}
