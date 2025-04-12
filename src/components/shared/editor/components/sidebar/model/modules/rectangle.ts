import { Rect, type FabricObject } from "fabric";
import { v4 as uid } from "uuid";

import { getFileAddress } from "@/lib/utils";

import imageEditorModel from "../../../../model";
import type editorModelTypes from "../type";

const editorModelRectangle = (() => {
  const create = async ({
    canvas,
    file,
    props,
  }: editorModelTypes["rect"]["create"]): Promise<FabricObject | null> => {
    const imageUrl = getFileAddress(file);
    if (!imageUrl || !canvas) return null;
    canvas.isDrawingMode = false;
    const object = new Rect({
      left: 0,
      top: 0,
      width: 100,
      objectCaching: true,
      strokeWidth: 0,
      height: 100,
      angle: 0,
      id: uid(),
      fill: imageEditorModel.variables.default_shape_color,
      ...props,
    });
    canvas.add(object);
    if (!props?.globalCompositeOperation) {
      canvas.centerObject(object);
      canvas.setActiveObject(object);
    }
    canvas.requestRenderAll();
    return object;
  };
  return { create };
})();

export default editorModelRectangle;
