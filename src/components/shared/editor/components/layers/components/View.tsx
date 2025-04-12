import React, { useContext } from "react";

import { type FabricObject } from "fabric";

import AppIcon from "@/components/shared/AppIcon";
import useBreakpoint from "@/hooks/useBreakpoint";

import ImageEditorContext from "../../../context";

function ImageEditorView({ object }: { object: FabricObject }) {
  const {
    canvas,
    methods: { history },
  } = useContext(ImageEditorContext);
  const { breakpoint } = useBreakpoint();

  const isVisible = object.visible;

  const hideActiveObject = () => {
    if (canvas && object) {
      object.set({
        visible: !isVisible,
        selectable: !isVisible,
        evented: !isVisible,
        hasControls: !isVisible,
        hasBorders: !isVisible,
      });
      canvas.requestRenderAll();
      history.add();
    }
  };

  return (
    <div className="cursor-pointer" onClick={hideActiveObject}>
      {isVisible ? (
        <AppIcon
          width={breakpoint === "xs" ? 16 : 18}
          color="#B9BAC0"
          icon="mdi:eye-outline"
        />
      ) : (
        <AppIcon
          width={breakpoint === "xs" ? 16 : 18}
          color="#B9BAC0"
          icon="mdi:eye-off-outline"
        />
      )}
    </div>
  );
}

export default ImageEditorView;
