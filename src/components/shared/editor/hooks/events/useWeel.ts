import { useEffect } from "react";

import { Point, type Canvas, type CanvasEvents } from "fabric";

import imageEditorModel from "../../model";
import type imageEditorTypes from "../../type";

type props = {
  canvas: Canvas | null;
  toolActive: imageEditorTypes["tools"] | null;
};

function useImageEditorWeel({ canvas, toolActive }: props) {
  const handleMouseWheel = (opt: CanvasEvents["mouse:wheel"]) => {
    if (!canvas) return;
    const { maxZoom, minZoom } = imageEditorModel;
    const delta = opt.e.deltaY;
    const pointer = canvas.getScenePoint(opt.e);
    const zoom = canvas.getZoom();

    let newZoom = delta > 0 ? zoom * 0.95 : zoom / 0.95;
    newZoom = Math.max(minZoom(canvas), Math.min(newZoom, maxZoom(canvas)));
    const zoomFactor = newZoom / zoom;

    const newPosX = pointer.x * (1 - zoomFactor);
    const newPosY = pointer.y * (1 - zoomFactor);
    canvas.relativePan(new Point(newPosX, newPosY));

    canvas.setZoom(newZoom);
    canvas.requestRenderAll();

    opt.e.preventDefault();
    opt.e.stopPropagation();
  };

  useEffect(() => {
    if (!canvas) return;

    canvas.on("mouse:wheel", handleMouseWheel);
    return () => {
      canvas.off("mouse:wheel", handleMouseWheel);
    };
  }, [canvas, toolActive]);
}

export default useImageEditorWeel;
