import React, { useContext, useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import useBreakpoint from "@/hooks/useBreakpoint";

import ImageEditorContext from "../../../context";
import ImageEditorLayers from "../../layers/components/list/ImageEditorLayers";
import MobileToolsContainer from "./Container";

function LayersMobile() {
  const [modal, setModal] = useState(false);
  const { breakpoint } = useBreakpoint();
  const { canvas } = useContext(ImageEditorContext);

  return (
    <>
      <MobileToolsContainer props={{ onClick: () => setModal(true) }}>
        <AppIcon
          width={breakpoint === "xs" ? 18 : 26}
          icon="material-symbols:layers-outline"
        />
      </MobileToolsContainer>
      <div
        className="fixed top-12 w-full right-0 bottom-16 sm:bottom-0 transition-all"
        style={{ right: modal ? 0 : "-100%" }}
      >
        <div className="w-full h-full" onClick={() => setModal(false)}></div>
        <div className="bg-muted-dark absolute right-0 bottom-0 top-0 w-[130px] sm:w-[180px] h-full z-10 border-l">
          {canvas && <ImageEditorLayers />}
        </div>
      </div>
    </>
  );
}

export default LayersMobile;
