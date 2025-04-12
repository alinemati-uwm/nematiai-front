import { useEffect } from "react";

import { Point, type Canvas } from "fabric";

import type imageEditorTypes from "../../type";

type props = {
  canvas: Canvas | null;
  toolActive: imageEditorTypes["tools"] | null;
};

function useSelectionImageMove({ canvas, toolActive }: props) {
  const isBetween = (x: number, a: number, b: number): boolean => {
    const diff1 = x - a;
    const diff2 = x - b;
    return diff1 * diff2 <= 0;
  };

  useEffect(() => {
    if (!canvas) return;
    let isPanning = false;
    let lastClientX = 0;
    let lastClientY = 0;
    let lastV4 = 0;
    let lastV5 = 0;
    let lastZoom = 0;

    const startPanning = (event: any) => {
      const clientX = event.e.clientX || event.e.touches?.[0]?.clientX;
      const clientY = event.e.clientY || event.e.touches?.[0]?.clientY;
      if (
        (event.e.button === (toolActive === "panning" ? 0 : 1) ||
          (event.e.touches && toolActive === "panning")) &&
        !canvas.isDrawingMode
      ) {
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
      const zoom = canvas.getZoom();
      const object = canvas.getObjects()[0];

      const deltaX = (clientX - lastClientX) * 0.5;
      const deltaY = (clientY - lastClientY) * 0.5;
      lastClientX = clientX;
      lastClientY = clientY;
      const v4 = canvas.viewportTransform[4];
      const v5 = canvas.viewportTransform[5];
      if (!(lastV4 && lastV5) || lastZoom !== zoom) {
        lastV4 = v4;
        lastV5 = v5;
        lastZoom = zoom;
      }
      const limits = {
        x: (object.width * zoom) / 1.8,
        y: (object.height * zoom) / 1.8,
      };

      const { bottom, left, right, top } = {
        left: lastV4 + limits.x - deltaX,
        right: lastV4 - limits.x - deltaX,
        top: lastV5 + limits.y - deltaY,
        bottom: lastV5 - limits.y - deltaY,
      };

      const delta = new Point(
        isBetween(v4, left, right) ? deltaX / zoom : lastV4 > v4 ? 1 : -1,
        isBetween(v5, top, bottom) ? deltaY / zoom : lastV5 > v5 ? 1 : -1,
      );
      canvas.relativePan(delta);
      canvas.requestRenderAll();
    };

    const stopPanning = () => {
      isPanning = false;
      canvas.defaultCursor = "default";
      canvas.selection = true;
    };

    canvas.on("mouse:down", startPanning);
    canvas.on("mouse:down:before", startPanning);
    canvas.on("mouse:move", panCanvas);
    canvas.on("mouse:up:before", stopPanning);

    // Clean up
    return () => {
      canvas.off("mouse:down", startPanning);
      canvas.off("mouse:down:before", startPanning);
      canvas.off("mouse:move", panCanvas);
      canvas.off("mouse:up:before", stopPanning);
    };
  }, [canvas, toolActive]);
}

export default useSelectionImageMove;
