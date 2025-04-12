import { useEffect } from "react";

import { type Canvas } from "fabric";

import type imageEditorTypes from "../../type";

type props = {
  canvas: Canvas | null;
  updateState: imageEditorTypes["context"]["methods"]["updateState"];
};

function useSelectionImageEditor({ canvas, updateState }: props) {
  const selectionEvent = () => {
    const selectedObject =
      canvas?.getActiveObject() as imageEditorTypes["customs"]["FabricObject"];
    updateState("selectedObject", selectedObject);
    updateState("toolActive", null);
    updateState(
      "toolActive",
      (selectedObject?.customType ??
        selectedObject?.type) as imageEditorTypes["tools"],
    );
    if (canvas) canvas.isDrawingMode = false;
  };

  const deselectedEvent = () => {
    updateState("selectedObject", undefined);
    updateState("toolActive", null);
  };

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", selectionEvent);
      canvas.on("selection:updated", selectionEvent);
      canvas.on("selection:cleared", deselectedEvent);
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created", selectionEvent);
        canvas.off("selection:updated", selectionEvent);
        canvas.off("selection:cleared", deselectedEvent);
      }
    };
  }, [canvas]);
}

export default useSelectionImageEditor;
