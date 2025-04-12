import { type Canvas } from "fabric";

import editorModelArrow from "./modules/arrow";
import editorModelCircle from "./modules/circle";
import editorModelCrop from "./modules/crop";
import editorModelCursor from "./modules/cursor";
import editorModelDraw from "./modules/draw";
import editorModelErase from "./modules/erase";
import editorModelImage from "./modules/image";
import editorModelLine from "./modules/line";
import editorModelPath from "./modules/path";
import editorModelRectangle from "./modules/rectangle";
import editorModelText from "./modules/text";
import editorModelTriangle from "./modules/triangle";

export type imageEditorModelProps = {
  canvas: Canvas | null;
  file: File;
};
const imageEditorModelTools = (() => {
  return {
    image: editorModelImage,
    erase: editorModelErase,
    circle: editorModelCircle,
    rectangle: editorModelRectangle,
    text: editorModelText,
    path: editorModelPath,
    draw: editorModelDraw,
    cursor: editorModelCursor,
    crop: editorModelCrop,
    triangle: editorModelTriangle,
    line: editorModelLine,
    arrow: editorModelArrow,
  };
})();

export default imageEditorModelTools;
