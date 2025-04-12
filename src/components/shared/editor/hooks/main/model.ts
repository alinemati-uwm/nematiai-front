import { Canvas, type FabricObject } from "fabric";

import { loadImage } from "@/lib/utils";

import imageEditorModelTools from "../../components/sidebar/model/model";
import type imageEditorTypes from "../../type";
import frameImageEditorModel from "./modules/frame";
import historyImageEditorModel from "./modules/history";

type createFrame = {
  canvas: imageEditorTypes["context"]["canvas"];
  file: File;
  img: HTMLImageElement;
};

type initialFrame = {
  canvas: imageEditorTypes["context"]["canvas"];
  file: File;
  history: imageEditorTypes["context"]["methods"]["history"];
  updateState: imageEditorTypes["context"]["methods"]["updateState"];
};

const useImageEditorModel = (() => {
  const { image } = imageEditorModelTools;

  const createCanvas = ({
    canvasRef,
    boxRef,
  }: {
    canvasRef: any;
    boxRef: any;
  }) => {
    return new Canvas(canvasRef.current, {
      allowTouchScrolling: true,
      selection: true,
      renderOnAddRemove: false,
      width: boxRef.current?.clientWidth ?? 500,
      height: boxRef.current?.clientHeight ?? 500,
    });
  };

  const createBackground = async ({ canvas, file, img }: createFrame) => {
    return image.create({
      canvas,
      file,
      props: {
        width: img.width,
        height: img.height,
        selectable: false,
        id: "background",
        hasControls: false,
        hoverCursor: "default",
        evented: false,
      },
    });
  };

  const availableObjects = (objects: FabricObject[]) =>
    objects.filter((el: any) => !["_frame", "background"].includes(el.id));

  const initialFrame = async ({
    history,
    canvas,
    file,
    updateState,
  }: initialFrame) => {
    if (!canvas) return;
    const { create, fit } = frameImageEditorModel;
    const img = await loadImage(file);
    await create({ canvas, file, img, updateState });
    if (file) await createBackground({ canvas, file, img });
    const frame = canvas.getObjects()[0];
    canvas.clipPath = frame;
    fit({ canvas, frame });
    canvas.renderAll();
    history.add(canvas);
  };

  return {
    createCanvas,
    initialFrame,
    availableObjects,
    history: historyImageEditorModel,
  };
})();

export default useImageEditorModel;
