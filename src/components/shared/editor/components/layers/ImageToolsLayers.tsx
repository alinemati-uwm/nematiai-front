import React, { useContext } from "react";

import useBreakpoint from "@/hooks/useBreakpoint";

import ImageEditorContext from "../../context";
import ImageEditorCard from "../Card";
import ImageEditorLayers from "./components/list/ImageEditorLayers";
import ImageEditorPanelTools from "./Tools";

function ImageToolsLayers() {
  const { isGreaterThan } = useBreakpoint();
  const { canvas } = useContext(ImageEditorContext);

  return (
    <ImageEditorCard props={{ className: "h-full" }}>
      <div className="flex flex-col gap-y-8">
        {isGreaterThan("sm") ? <ImageEditorPanelTools /> : null}
        {canvas && <ImageEditorLayers />}
      </div>
    </ImageEditorCard>
  );
}

export default ImageToolsLayers;
