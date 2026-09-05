import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Backdrop } from "@/components/Backdrop";
import { ContentsPanel } from "@/components/ContentsPanel";
import { PhosHeader, PhosFooter, useScrollTop } from "@/components/phos/PhosHeader";

/**
 * ToolFrame — the page every instrument sits in: the shared bar with a crumb
 * back to the tools index, a short header over a backdrop, the instrument
 * itself, and the footer. The instruments differ in what they ask; they
 * should not differ in how a page around them looks.
 */
export function ToolFrame({
  name,
  eyebrow = "Instrument",
  title,
  lede,
  backdrop,
  position = "center 50%",
  children,
}: {
  name?: string;
  eyebrow?: string;
  title: ReactNode;
  lede: ReactNode;
  backdrop: string;
  position?: string;
  children: ReactNode;
}) {
  useScrollTop(name ?? "tools");
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      <PhosHeader
        crumb={<><Link to="/phos/tools" className="inline-block py-2 -my-2 hover:text-gold">Instruments</Link>{name ? <> · {name}</> : null}</>}
        panel={<ContentsPanel active={null} entries={[]} groups={[]} paths={[]} volume="/phos/portal" />}
      />
      <header id="top" className="relative isolate overflow-hidden pb-12 pt-40 sm:pt-48">
        <Backdrop src={`/bg/${backdrop}.webp`} opacity={0.3} position={position} fill />
        <div className="grain" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            {name ? <><Link to="/phos/tools" className="inline-block py-2 -my-2 hover:underline">{eyebrow}</Link> · {name}</> : eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">{lede}</p>
        </div>
      </header>
      {children}
      <PhosFooter />
    </div>
  );
}

/** A band of the page, full width, with the shared measure inside. */
export function ToolBand({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative isolate border-t border-border py-14 ${className}`}>
      <div className="relative mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">{children}</p>;
}
