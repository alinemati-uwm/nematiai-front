import { type Canvas } from "fabric";

const imageEditorModel = (() => {
  const variables = {
    default_shape_color: "#868686",
  };

  const detectZoomFit = (canvas: Canvas) => {
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const img = canvas.getObjects().find((el: any) => el.id === "background");

    if (!img) return;
    const imageAspectRatio = img.width / img.height;
    const canvasAspectRatio = canvasWidth / canvasHeight;

    let zoom: number;
    if (canvasAspectRatio > imageAspectRatio) zoom = canvasHeight / img.height;
    else zoom = canvasWidth / img.width;
    return zoom;
  };

  const maxZoom = (canvas: Canvas) => {
    if (!canvas) return 1;
    const zoom = canvas.getZoom();
    const defaultZoom = detectZoomFit(canvas);
    return defaultZoom ? defaultZoom * 5 : zoom;
  };

  const minZoom = (canvas: Canvas) => {
    if (!canvas) return 1;
    const defaultZoom = detectZoomFit(canvas);
    return defaultZoom ? defaultZoom - defaultZoom * 0.2 : 0.1;
  };

  return { variables, detectZoomFit, maxZoom, minZoom };
})();

export default imageEditorModel;
