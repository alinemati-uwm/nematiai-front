import { CircleBrush, PencilBrush, SprayBrush } from "fabric";

import type editorModelTypes from "../type";

const editorModelDraw = (() => {
  const create = async ({
    canvas,
    color,
    brush,
  }: editorModelTypes["draw"]["create"]) => {
    if (!canvas) return;
    let pencilBrush: any = null;
    if (brush.style === "circle") pencilBrush = new CircleBrush(canvas);
    else if (brush.style === "spray") pencilBrush = new SprayBrush(canvas);
    else pencilBrush = new PencilBrush(canvas);
    pencilBrush.width = brush.size;
    pencilBrush.color = color;
    canvas.freeDrawingBrush = pencilBrush;
  };
  return { create };
})();

export default editorModelDraw;
