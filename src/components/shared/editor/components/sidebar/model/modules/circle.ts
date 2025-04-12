import { Circle } from "fabric";
import { v4 as uid } from "uuid";

import { getFileAddress } from "@/lib/utils";

import type editorModelTypes from "../type";

const editorModelCircle = (() => {
  const create = async ({
    canvas,
    file,
    props,
  }: editorModelTypes["circle"]["create"]) => {
    const imageUrl = getFileAddress(file);
    if (!imageUrl || !canvas) return;
    canvas.isDrawingMode = false;
    const circle = new Circle({
      left: 100,
      top: 100,
      absolutePositioned: true,
      angle: 0,
      strokeWidth: 0,
      objectCaching: true,
      radius: 50,
      id: uid(),
      ...props,
    });

    canvas.add(circle);
    canvas.bringObjectToFront(circle);
    if (!props?.globalCompositeOperation) {
      canvas.centerObject(circle);
      canvas.setActiveObject(circle);
    }
    canvas.requestRenderAll();
  };
  return { create };
})();

export default editorModelCircle;
