import { type RefObject } from "react";

import {
  Group,
  Image,
  PencilBrush,
  Point,
  type Canvas,
  type TMat2D,
} from "fabric";

import { dataURLToBlob } from "@/components/pages/image/feature/utils";
import { getFileAddress, loadImage } from "@/lib/utils";

import imageEditorModel from "../editor/model";

type create = {
  canvas: Canvas | null;
  file: File;
};

type calculateAspectRatio = {
  file: File;
  boxRef: RefObject<HTMLDivElement | null>;
};

type calculateVPT = {
  canvas: Canvas;
  renderCanvas?: boolean;
};

const imageEditorMaskModel = (() => {
  const createImage = async ({
    canvas,
    file,
  }: create): Promise<Image | null> => {
    const imageUrl = getFileAddress(file);
    if (!canvas || !imageUrl) return null;
    const image: Image = await Image.fromURL(imageUrl, {
      crossOrigin: "anonymous",
    });

    image.set({
      selectable: false,
      hasControls: false,
      id: "background",
      hoverCursor: "default",
      evented: false,
    });
    canvas.add(image);
    // canvas.centerObject(image);
    canvas.renderAll();
    return image;
  };

  const erase = (canvas: Canvas, brushSize: number = 20) => {
    if (!canvas) return;
    const pencilBrush = new PencilBrush(canvas);
    pencilBrush.width = brushSize;
    pencilBrush.color = "#FFF";
    canvas.selection = false;
    canvas.freeDrawingBrush = pencilBrush;
    canvas.isDrawingMode = true;
  };

  const zooToPoint = (canvas: Canvas, zoom: number) => {
    const { x, y } = canvas.getCenterPoint();
    canvas.zoomToPoint(new Point(x, y), zoom);
    canvas.renderAll();
  };

  const exportFile = async (canvas: Canvas, file: File) => {
    if (!canvas || !history) return;
    const img = await loadImage(file);

    const background = canvas
      .getObjects()
      .find((obj: any) => obj.id === "background");
    const paths = canvas.getObjects("path");

    if (background && paths.length > 0) {
      background.set({
        clipPath: new Group(paths, {
          inverted: true,
          absolutePositioned: true,
        }),
        width: img.width,
        height: img.height,
        scaleX: 1,
        scaleY: 1,
      });

      const vpt = fitCanvas({ canvas });
      if (!vpt) return;
      canvas.viewportTransform = vpt;
      canvas.remove(...paths);
      canvas.removeListeners();

      canvas.setZoom(1);

      const imgDataURL = canvas.toDataURL({
        format: "png",
        multiplier: 1,
        width: img.width,
        height: img.height,
        left: 0,
        top: 0,
      });

      const imgBlob = dataURLToBlob(imgDataURL);
      return new File([imgBlob], "canvas-image.png", { type: "image/png" });
    }
  };

  const calculateAspectRatio = async ({
    boxRef,
    file,
  }: calculateAspectRatio) => {
    const img = await loadImage(file);
    const parent = boxRef.current;
    if (!parent) return;

    const aspectRatio = img.width / img.height;
    const { clientWidth, clientHeight } = parent;

    let canvasWidth = clientWidth;
    let canvasHeight = canvasWidth / aspectRatio;

    if (canvasHeight > clientHeight) {
      canvasHeight = clientHeight;
      canvasWidth = canvasHeight * aspectRatio;
    }

    return { width: canvasWidth, height: canvasHeight };
  };

  const fitCanvas = ({ canvas, renderCanvas }: calculateVPT) => {
    const background = canvas
      .getObjects()
      .find((obj: any) => obj.id === "background");

    const zoom = imageEditorModel.detectZoomFit(canvas);
    if (!background || !zoom) return null;

    const vpt: TMat2D = [zoom, 0, 0, zoom, 0, 0];
    if (renderCanvas) {
      canvas.viewportTransform = vpt;
      canvas.setZoom(zoom);
      canvas.renderAll();
    }
    return vpt;
  };

  return {
    createImage,
    erase,
    exportFile,
    calculateAspectRatio,
    fitCanvas,
    zooToPoint,
  };
})();

export default imageEditorMaskModel;
