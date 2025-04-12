import type editorModelTypes from "../type";

const editorModelErase = (() => {
  const draw = ({ event, canvas }: editorModelTypes["erase"]["draw"]) => {
    const e = event.e as MouseEvent;

    if (!canvas || e.buttons !== 1) return;
    const htmlCanvas = canvas.getElement();
    const { left, top } = htmlCanvas.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const brushSize = 25;

    const ctx = htmlCanvas.getContext("2d");
    if (ctx) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return { draw };
})();

export default editorModelErase;
