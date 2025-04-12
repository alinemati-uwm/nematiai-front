import type editorModelTypes from "../type";

const editorModelCursor = (() => {
  const drawingDisable = async ({
    canvas,
  }: editorModelTypes["cursor"]["drawingDisable"]) => {
    if (!canvas) return;
    canvas.isDrawingMode = false;
  };
  return { drawingDisable };
})();

export default editorModelCursor;
