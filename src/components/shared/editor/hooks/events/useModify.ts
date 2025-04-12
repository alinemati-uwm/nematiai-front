import { useEffect } from "react";

import { type Canvas, type CanvasEvents } from "fabric";
import { useDebounceCallback } from "usehooks-ts";
import { v4 as uid } from "uuid";

import type imageEditorTypes from "../../type";

type props = {
  canvas: Canvas | null;
  history: imageEditorTypes["context"]["methods"]["history"];
};

function useImageEditorModify({ canvas, history }: props) {
  const selectionEvent = useDebounceCallback(() => {
    if (!canvas) return;
    history.add();
  }, 500);

  const addPath = (e: CanvasEvents["path:created"]) => {
    if (!canvas) return;
    e.path.set({ id: uid() });
    selectionEvent();
  };

  useEffect(() => {
    if (canvas) {
      canvas.on("object:modified", selectionEvent);
      canvas.on("path:created", addPath);
    }

    return () => {
      if (canvas) {
        canvas.off("object:modified", selectionEvent);
        canvas.off("path:created", addPath);
      }
    };
  }, [canvas]);
}

export default useImageEditorModify;
