import { useEffect, useRef, useState } from "react";

import mermaid from "mermaid";
import { Node } from "slate";
import panzoom from "svg-pan-zoom";
import { Svg2Roughjs } from "svg2roughjs";

interface UseMermaidProps {
  element: any;
  rough?: boolean;
  activePanZoom: boolean;
  setIsValidMermaid: (val: boolean) => void;
}

export const useMermaid = ({
  activePanZoom,
  element,
  rough,
  setIsValidMermaid,
}: UseMermaidProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pZoomRef = useRef<SvgPanZoom.Instance | undefined>(undefined);
  const [zoom, setZoom] = useState<number>();
  const [pan, setPan] = useState<SvgPanZoom.Point>();
  const [hide, setHide] = useState(true);

  const handlePanZoomChange = () => {
    if (!pZoomRef.current) return;

    setZoom(pZoomRef.current?.getZoom?.());
    setPan(pZoomRef.current?.getPan?.());
  };

  const handlePanZoom = () => {
    if (pZoomRef.current) {
      pZoomRef.current?.destroy();
      pZoomRef.current = undefined;
    }
    void Promise.resolve().then(() => {
      const graphDiv = containerRef.current?.querySelector<HTMLElement>("svg");
      if (!graphDiv) return;

      pZoomRef.current = panzoom(graphDiv, {
        onPan: handlePanZoomChange,
        onZoom: handlePanZoomChange,
        controlIconsEnabled: true,
        fit: true,
        center: true,
      });

      if (pan !== undefined && zoom !== undefined && Number.isFinite(zoom)) {
        pZoomRef.current?.zoom?.(zoom);
        pZoomRef.current?.pan?.(pan);
      }
    });
  };

  useEffect(() => {
    (async () => {
      if (containerRef.current && element) {
        const mermaidContent = Node.string(element);
        if (!mermaidContent || mermaidContent.length < 2) {
          setHide(true);
          return;
        }
        try {
          await mermaid.parse(mermaidContent);
          setIsValidMermaid(true);
          containerRef.current.innerHTML = mermaidContent;
          const { svg, bindFunctions } = await mermaid.render(
            "mermaid-svg",
            mermaidContent,
            containerRef.current,
          );
          containerRef.current.innerHTML = svg;
          setHide(false);
          const graphDiv =
            document.querySelector<SVGSVGElement>("#mermaid-svg");
          if (rough) {
            if (!graphDiv) return;
            const svg2rough = new Svg2Roughjs(containerRef.current);
            svg2rough.svg = graphDiv;
            await svg2rough.sketch();
            graphDiv.remove();
            const sketch =
              containerRef.current.querySelector<HTMLElement>("svg");
            if (!sketch) return;
            const height = sketch.getAttribute("height");
            const width = sketch.getAttribute("width");
            sketch.setAttribute("width", "100%");
            sketch.setAttribute("viewBox", `0 0 ${width} ${height}`);
            sketch.style.maxWidth = "100%";
          } else {
            // graphDiv?.setAttribute("height", "100%");
            const style = getComputedStyle(graphDiv!);
            const height = style.height.split("px")[0];
            const width = style.width.split("px")[0];
            graphDiv!.setAttribute("width", "100%");
            graphDiv!.setAttribute("height", style.height);
            graphDiv!.setAttribute("viewBox", `0 0 ${width} ${height}`);
            graphDiv!.style.maxWidth = "100%";
            if (bindFunctions) {
              bindFunctions(graphDiv!);
            }
          }
          if (activePanZoom) {
            handlePanZoom();
          }
        } catch (e) {
          setIsValidMermaid(false);
          // console.log(e)
        }
      }
    })();
  }, [element, rough, activePanZoom]);

  return { containerRef, hide };
};
