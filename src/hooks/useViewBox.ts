import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent, type RefObject } from "react";

export type View = { x: number; y: number; w: number; h: number };

/**
 * useViewBox — pan and zoom for an SVG sheet.
 *
 * The view is a window onto a sheet of fixed size, kept at the sheet's aspect.
 * The wheel zooms about the pointer, dragging pans, and `fit` frames a set of
 * points. Pointer positions are mapped through the SVG's own CTM, so the
 * mapping stays right however the drawing is letterboxed in its box. The wheel
 * listener is attached natively and non-passively: React's is passive, and a
 * zooming map that also scrolls the page is a broken map.
 */
export function useViewBox(
  svgRef: RefObject<SVGSVGElement | null>,
  sheet: { w: number; h: number },
  opts: { minW?: number; interactive?: boolean } = {},
) {
  const { minW = 120, interactive = true } = opts;
  const full: View = { x: 0, y: 0, w: sheet.w, h: sheet.h };
  const [view, setView] = useState<View>(full);
  const drag = useRef<{ px: number; py: number; view: View; moved: boolean; target: Element | null } | null>(null);
  const viewRef = useRef(view);
  viewRef.current = view;

  const toChart = useCallback(
    (ev: { clientX: number; clientY: number }) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const pt = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(svg.getScreenCTM()!.inverse());
      return { x: pt.x, y: pt.y };
    },
    [svgRef],
  );

  const clamp = useCallback(
    (v: View): View => {
      const w = Math.min(sheet.w, Math.max(minW, v.w));
      const h = (w * sheet.h) / sheet.w;
      const x = Math.min(sheet.w - w, Math.max(0, v.x));
      const y = Math.min(sheet.h - h, Math.max(0, v.y));
      return { x, y, w, h };
    },
    [sheet.w, sheet.h, minW],
  );

  const zoomAt = useCallback(
    (cx: number, cy: number, f: number) => {
      setView((v) => {
        const w = Math.min(sheet.w, Math.max(minW, v.w * f));
        const k = w / v.w;
        return clamp({ x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k, w, h: v.h * k });
      });
    },
    [clamp, minW, sheet.w],
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !interactive) return;
    const onWheel = (ev: WheelEvent) => {
      ev.preventDefault();
      const { x, y } = toChart(ev);
      zoomAt(x, y, Math.exp(ev.deltaY * 0.0014));
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [svgRef, interactive, toChart, zoomAt]);

  const onPointerDown = (ev: RPointerEvent<SVGSVGElement>) => {
    if (!interactive || ev.button !== 0) return;
    // Capturing the pointer retargets every later event at the svg, so what was
    // pressed is remembered here; a click is judged on release from this.
    drag.current = { px: ev.clientX, py: ev.clientY, view: viewRef.current, moved: false, target: ev.target as Element };
    ev.currentTarget.setPointerCapture(ev.pointerId);
  };
  const onPointerMove = (ev: RPointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d) return false;
    const svg = svgRef.current!;
    const k = 1 / (svg.getScreenCTM()?.a || 1);
    const dx = (ev.clientX - d.px) * k, dy = (ev.clientY - d.py) * k;
    if (!d.moved && Math.hypot(ev.clientX - d.px, ev.clientY - d.py) < 4) return false;
    d.moved = true;
    setView(clamp({ ...d.view, x: d.view.x - dx, y: d.view.y - dy }));
    return true;
  };
  /** Ends a drag: whether the pointer moved (so this is not a click), and what was pressed. */
  const onPointerUp = (ev: RPointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    drag.current = null;
    try { ev.currentTarget.releasePointerCapture(ev.pointerId); } catch { /* not captured */ }
    return { moved: !!d?.moved, pressed: d?.target ?? null, wasDown: !!d };
  };

  const fit = useCallback(
    (pts: [number, number][], pad = 40, maxZoom = 6) => {
      if (!pts.length) { setView(full); return; }
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const [x, y] of pts) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
      const w0 = Math.max(x1 - x0 + pad * 2, sheet.w / maxZoom);
      const h0 = Math.max(y1 - y0 + pad * 2, (w0 * sheet.h) / sheet.w);
      const w = Math.max(w0, (h0 * sheet.w) / sheet.h);
      const h = (w * sheet.h) / sheet.w;
      setView(clamp({ x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2, w, h }));
    },
    [clamp, sheet.w, sheet.h], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const reset = useCallback(() => setView(full), [sheet.w, sheet.h]); // eslint-disable-line react-hooks/exhaustive-deps
  const zoom = useCallback((f: number) => { const v = viewRef.current; zoomAt(v.x + v.w / 2, v.y + v.h / 2, f); }, [zoomAt]);

  return { view, setView, toChart, fit, reset, zoom, onPointerDown, onPointerMove, onPointerUp, dragging: () => !!drag.current };
}
