import { Textbox, type FabricObject } from "fabric";
import { v4 as uid } from "uuid";

import imageEditorModel from "../../../../model";
import type editorModelTypes from "../type";

const editorModelText = (() => {
  const create = async ({
    canvas,
    props,
  }: editorModelTypes["text"]["create"]) => {
    if (!canvas) return;
    const object = new Textbox("text", {
      left: 100,
      top: 100,
      fontSize: 30,
      objectCaching: true,
      fill: imageEditorModel.variables.default_shape_color,
      fontFamily: "Arial",
      id: uid(),
      ...props,
    });
    object.dirty = true;
    canvas.add(object);
    canvas.isDrawingMode = false;
    if (!props?.update) {
      canvas.centerObject(object);
      canvas.setActiveObject(object);
    }
    canvas.requestRenderAll();
  };

  const serialize = (object: FabricObject) => {
    if (!object) return;
    const result: Record<string, any> = [];
    Object.keys(object).forEach(el => {
      if (
        ![
          "type",
          "globalCompositeOperation",
          "paintFirst",
          "pathAlign",
        ].includes(el)
      )
        // @ts-ignore
        result[el] = object[el];
    });
    return result;
  };

  return { create, serialize };
})();

export default editorModelText;
