import { type Canvas } from "fabric";

import type imageEditorTypes from "../../../../../type";
import { type editorContextMenuStates } from "./useImageEditorContextMenu";

interface props {
  canvas: Canvas | null;
  states: editorContextMenuStates;
  history: imageEditorTypes["context"]["methods"]["history"];
}

const useImageEditorContextMenuModel = ({ canvas, states, history }: props) => {
  const backwardCheck = () => {
    if (!canvas || !states.target) return;
    const objects = canvas.getObjects();
    const getPervIndex = objects.findIndex(
      (el: imageEditorTypes["customs"]["FabricObject"]) =>
        el.id === states.target?.id,
    );
    const backgroundIndex = objects.findIndex(
      (el: imageEditorTypes["customs"]["FabricObject"]) =>
        el.id === "background",
    );
    return getPervIndex && getPervIndex - 1 > backgroundIndex;
  };

  const actions = (action: "delete" | "forward" | "backward") => {
    const object = states.target;
    if (!canvas || !object) return;

    if (action === "forward") canvas.bringObjectForward(object);
    else if (action === "backward") {
      const permistion = backwardCheck();
      if (permistion) canvas.sendObjectBackwards(object);
      else return;
    } else if (action === "delete") {
      canvas.remove(object);
      canvas.renderAll();
      history.add();
    }
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  return { actions };
};

export default useImageEditorContextMenuModel;
