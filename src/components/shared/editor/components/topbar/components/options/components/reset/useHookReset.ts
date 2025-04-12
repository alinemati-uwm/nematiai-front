import { useContext } from "react";

import ImageEditorContext from "@/components/shared/editor/context";
import type imageEditorTypes from "@/components/shared/editor/type";

import historyTopbarModel from "../../../history/model";

function useHookReset() {
  const {
    canvas,
    methods: { history },
    states,
  } = useContext(ImageEditorContext);

  const reset = async () => {
    if (!canvas || !states.history.canvas) return;
    const attrs = states.history.canvas;
    canvas.clipPath?.set({ ...canvas.clipPath, ...attrs });
    const objects = canvas.getObjects();
    objects.forEach((el: imageEditorTypes["customs"]["FabricObject"]) => {
      if (el.id && ["_frame", "background"].includes(el.id)) {
        const finded = objects.find(
          (item: imageEditorTypes["customs"]["FabricObject"]) =>
            item.id === "background",
        );
        if (finded) {
          // Remove filter background
          if (el.id === "background")
            finded.set({ filters: [], filterID: null });
          historyTopbarModel.updateObject({ item: el, undoObject: [finded] });
        }
      } else canvas.remove(el);
    });
    await history.reset();
    canvas.renderAll();
    history.add();
  };

  return { reset };
}

export default useHookReset;
