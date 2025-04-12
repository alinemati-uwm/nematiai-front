import type editorModelTypes from "../type";

const editorModelCrop = (() => {
  const selectFrame = async ({ canvas }: editorModelTypes["crop"]) => {
    if (!canvas) return;
    const frame = canvas.getObjects().find((el: any) => el.id === "_frame");
    if (frame) {
      frame.set({
        selectable: true,
        evented: true,
        fill: "#000",
        hasBorders: true,
        opacity: 0.2,
      });
      canvas.setActiveObject(frame);
      canvas.requestRenderAll();
    }
  };
  return { selectFrame };
})();

export default editorModelCrop;
