import { Rect } from "fabric";
import { v4 as uid } from "uuid";

import type editorModelTypes from "../type";

const editorModelLine = (() => {
  const create = async ({
    canvas,
    props,
  }: editorModelTypes["line"]["create"]) => {
    if (!canvas) return;
    canvas.isDrawingMode = false;
    const object = new Rect({
      left: 0,
      top: 0,
      width: 200,
      height: 6,
      absolutePositioned: true,
      angle: 0,
      objectCaching: true,
      radius: 0,
      lockScalingFlip: true,
      id: uid(),
      ...props,
    });

    canvas.add(object);
    canvas.bringObjectToFront(object);
    if (!props?.globalCompositeOperation) {
      canvas.centerObject(object);
      canvas.setActiveObject(object);
    }
    canvas.requestRenderAll();
  };
  return { create };
})();

export default editorModelLine;
