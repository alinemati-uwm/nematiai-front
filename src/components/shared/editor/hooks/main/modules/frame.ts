import { Point, type Canvas, type FabricObject } from "fabric";

import imageEditorModelTools from "../../../components/sidebar/model/model";
import imageEditorModel from "../../../model";
import type imageEditorTypes from "../../../type";

type createFrame = {
  canvas: imageEditorTypes["context"]["canvas"];
  file: File;
  img: HTMLImageElement;
  updateState: imageEditorTypes["context"]["methods"]["updateState"];
};

type fit = {
  canvas: imageEditorTypes["context"]["canvas"];
  frame: FabricObject;
};

const frameImageEditorModel = (() => {
  const create = async ({ canvas, file, img, updateState }: createFrame) => {
    const rect = await imageEditorModelTools.rectangle.create({
      canvas,
      file,
      props: {
        width: img.width,
        height: img.height,
        fill: "#FFF",
        id: "_frame",
        lockScalingFlip: true,
        lockRotation: true,
        lockSkewingX: true,
        lockSkewingY: true,
        selectable: false,
        hasBorders: true,
        evented: false,
        hasControls: true,
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: "default",
      },
    });
    if (rect && canvas) scaleEvent(rect, canvas, updateState);
    return rect;
  };

  const scaleEvent = (
    rect: FabricObject,
    canvas: Canvas,
    updateState: imageEditorTypes["context"]["methods"]["updateState"],
  ) => {
    if (!rect || !canvas) return;
    rect.on("deselected", function () {
      rect.set({
        selectable: false,
        evented: false,
        fill: "#FFF",
        opacity: 1,
      });
      updateState("toolActive", null);
    });
  };

  const fit = ({ canvas, frame }: fit) => {
    if (!canvas) return;
    const zoom = imageEditorModel.detectZoomFit(canvas);
    if (!zoom) return;
    canvas.zoomToPoint(
      new Point(frame.getCenterPoint().x, frame.getCenterPoint().y),
      zoom,
    );
  };

  return { create, fit };
})();

export default frameImageEditorModel;
