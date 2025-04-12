import React, { useContext } from "react";

import { type FabricObject } from "fabric";

import AppIcon from "@/components/shared/AppIcon";
import useBreakpoint from "@/hooks/useBreakpoint";

import ImageEditorContext from "../../../context";

function ImageEditorLock({ object }: { object: FabricObject }) {
  const {
    canvas,
    methods: { history },
  } = useContext(ImageEditorContext);
  const { breakpoint } = useBreakpoint();

  const isLock = object.evented;

  const hideActiveObject = () => {
    if (canvas && object) {
      object.set({
        evented: !isLock,
        selectable: !isLock,
        hasControls: !isLock,
      });
      canvas.requestRenderAll();
      history.add();
    }
  };

  return (
    <div className="cursor-pointer" onClick={hideActiveObject}>
      {isLock ? (
        <AppIcon
          width={breakpoint === "xs" ? 16 : 18}
          color="#B9BAC0"
          icon="mdi:unlocked-outline"
        />
      ) : (
        <AppIcon
          width={breakpoint === "xs" ? 16 : 18}
          color="#B9BAC0"
          icon="material-symbols:lock-outline"
        />
      )}
    </div>
  );
}

export default ImageEditorLock;
