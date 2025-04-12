import { useContext } from "react";

import { type Textbox } from "fabric";

import ImageEditorContext from "@/components/shared/editor/context";

import { type textToolsModelStyle } from "./model";
import type textToolsTypes from "./type";

function useTextTools() {
  const {
    canvas,
    states: { selectedObject },
    methods: { history },
  } = useContext(ImageEditorContext);

  const changeAlign = (textAlign: textToolsTypes["alignes"]) => {
    if (!canvas || !selectedObject) return;
    selectedObject?.set({ textAlign });
    canvas.requestRenderAll();
    history.add();
  };

  const changeStyle = (action: textToolsTypes["styles"]) => {
    if (!canvas) return;

    if (selectedObject && selectedObject.type === "textbox") {
      const textBox = selectedObject as Textbox;
      if (action === "bold")
        textBox.set({
          fontWeight: textBox.fontWeight === "bold" ? "normal" : "bold",
        });
      else if (action === "italic")
        textBox.set({
          fontStyle: textBox.fontStyle === "italic" ? "normal" : "italic",
        });
      else if (action === "underline")
        textBox.set({
          underline: !textBox.underline,
        });
      history.add();
      canvas.requestRenderAll();
    }
  };

  const isActive = (attr: textToolsModelStyle) => {
    const textBox = selectedObject as Textbox;
    return textBox[attr.key] === attr.value;
  };

  return { changeAlign, changeStyle, isActive };
}

export default useTextTools;
