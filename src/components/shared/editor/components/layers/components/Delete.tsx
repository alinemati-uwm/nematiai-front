import React, { useContext } from "react";

import { type FabricObject } from "fabric";

import AppIcon from "@/components/shared/AppIcon";
import useBreakpoint from "@/hooks/useBreakpoint";

import ImageEditorContext from "../../../context";

function ImageEditorDelete({ object }: { object: FabricObject }) {
  const {
    canvas,
    methods: { history },
  } = useContext(ImageEditorContext);
  const { breakpoint } = useBreakpoint();

  const deleteActiveObject = async () => {
    if (canvas && object) {
      canvas.remove(object);
      canvas.renderAll();
      history.add();
    }
  };

  return (
    <div className="cursor-pointer" onClick={deleteActiveObject}>
      <AppIcon
        width={breakpoint === "xs" ? 16 : 18}
        color="#B9BAC0"
        icon="mdi:trash-outline"
      />
    </div>
  );
}

export default ImageEditorDelete;
