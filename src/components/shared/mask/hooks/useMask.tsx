import { useRef, useState } from "react";

import { Canvas as CanvasElement } from "fabric";
import { useDebounceCallback } from "usehooks-ts";

import imageEditorMaskModel from "../model";
import type maskTypes from "../type";

function useMask({ file }: Pick<maskTypes["component"], "file">) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [states, setStates] = useState<maskTypes["states"]>({
    brush: 25,
    canvas: null,
    fullscreen: false,
    drawing: false,
  });
  const { createImage, erase, calculateAspectRatio, fitCanvas } =
    imageEditorMaskModel;

  const updateState = <T extends keyof typeof states>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  const initCanvas = useDebounceCallback(async () => {
    if (!canvasRef.current || !boxRef.current) return;
    const size = await calculateAspectRatio({ boxRef, file });
    const canvas = new CanvasElement(canvasRef.current, {
      allowTouchScrolling: true,
      selection: false,
      width: size?.width ?? 500,
      height: size?.height ?? 500,
    });

    await createImage({ canvas, file });
    fitCanvas({ canvas, renderCanvas: true });
    erase(canvas, states.brush);
    updateState("canvas", canvas);
  }, 300);

  return {
    methods: {
      initCanvas,
      updateState,
    },
    states,
    refs: {
      canvasRef,
      boxRef,
    },
  };
}

export default useMask;
