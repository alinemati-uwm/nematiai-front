"use client";

import React from "react";

import mermaid from "mermaid";

import { useMermaid } from "@/components/editor/editor-custom/codeBlock/useMermaid";
import { cn } from "@/lib/utils";

interface MermaidChartProps {
  element: any;
  rough?: boolean;
  activePanZoom: boolean;
  isValidMermaid: boolean;
  setIsValidMermaid: (val: boolean) => void;
}

mermaid.initialize({ startOnLoad: true, suppressErrorRendering: true });

const MermaidPreview: React.FC<MermaidChartProps> = ({
  element,
  rough,
  activePanZoom,
  isValidMermaid,
  setIsValidMermaid,
}) => {
  const { containerRef, hide } = useMermaid({
    rough,
    element,
    activePanZoom,
    setIsValidMermaid,
  });

  return (
    <div
      className={cn(
        " w-full h-auto rounded border bg-card",
        hide && "hidden",
        !isValidMermaid && "opacity-70",
      )}
    >
      <div
        ref={containerRef}
        className="mermaid w-full flex justify-center "
        id="mermaid-container"
      />
    </div>
  );
};

export default MermaidPreview;
