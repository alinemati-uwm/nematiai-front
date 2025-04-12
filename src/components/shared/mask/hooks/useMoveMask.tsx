import { useEffect } from "react";

import { Point, type Canvas } from "fabric";

function useMoveMask({ canvas }: { canvas: Canvas | null }) {
  useEffect(() => {
    if (!canvas) return;

    let isPanning = false;
    let lastClientX = 0;
    let lastClientY = 0;

    const startPanning = (event: any) => {
      const clientX = event.e.clientX || event.e.touches?.[0]?.clientX;
      const clientY = event.e.clientY || event.e.touches?.[0]?.clientY;

      if ((event.e.button === 0 || event.e.touches) && !canvas.isDrawingMode) {
        isPanning = true;
        lastClientX = clientX;
        lastClientY = clientY;
        canvas.defaultCursor = "grab";
        canvas.selection = false;
      }
    };

    const panCanvas = (event: any) => {
      if (!isPanning) return;
      canvas.defaultCursor = "grab";

      const clientX = event.e.clientX || event.e.touches?.[0]?.clientX;
      const clientY = event.e.clientY || event.e.touches?.[0]?.clientY;

      const deltaX = (clientX - lastClientX) * 0.5;
      const deltaY = (clientY - lastClientY) * 0.5;
      lastClientX = clientX;
      lastClientY = clientY;

      const delta = new Point(
        deltaX / canvas.getZoom(),
        deltaY / canvas.getZoom(),
      );
      canvas.relativePan(delta);
    };

    const stopPanning = () => {
      isPanning = false;
      canvas.defaultCursor = "default";
      canvas.selection = true;
    };

    canvas.on("mouse:down", startPanning);
    canvas.on("mouse:move", panCanvas);
    canvas.on("mouse:up", stopPanning);

    // Clean up
    return () => {
      canvas.off("mouse:down", startPanning);
      canvas.off("mouse:move", panCanvas);
      canvas.off("mouse:up", stopPanning);
    };
  }, [canvas]);
}

export default useMoveMask;
