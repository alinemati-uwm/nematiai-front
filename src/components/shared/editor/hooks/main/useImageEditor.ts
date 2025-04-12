import { useRef, useState, type RefObject } from "react";

import { type Canvas } from "fabric";
import { useDebounceCallback } from "usehooks-ts";

import type imageEditorTypes from "../../type";
import useImageEditorModel from "./model";

function useImageEditor() {
  const {
    createCanvas,
    initialFrame,
    history: historyModel,
  } = useImageEditorModel;
  const [states, setStates] = useState<imageEditorTypes["states"]>({
    toolActive: null,
    selectedObject: undefined,
    widthWindow: 0,
    defaults: {
      colorPicker: "#808080",
      brush: {
        size: 5,
        style: "pencil",
      },
      darkTheme: false,
    },
    history: {
      timestamp: null,
      timeline: {},
      canvas: null,
    },
    file: null,
  });
  const canvasElement = useRef<Canvas | null>(null);
  const canvas = canvasElement.current;

  const updateState = <T extends keyof typeof states>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  const initialCanvas = useDebounceCallback(
    async ({
      canvasRef,
      boxRef,
      file,
    }: {
      canvasRef: RefObject<HTMLCanvasElement | null>;
      boxRef: RefObject<HTMLDivElement | null>;
      file?: File;
    }) => {
      if (!canvasRef || !boxRef.current || !file) return;
      if (canvas) await canvas.dispose();
      const canvasInstance = createCanvas({ boxRef, canvasRef });
      canvasElement.current = canvasInstance;
      await initialFrame({
        canvas: canvasInstance,
        file,
        history,
        updateState,
      });

      // Capture canvas first data for "reset" button
      setStates(prev => ({
        ...prev,
        history: {
          ...prev.history,
          canvas: canvasInstance.toDatalessJSON().clipPath,
        },
      }));
    },
    1,
  );

  const history: imageEditorTypes["context"]["methods"]["history"] = {
    add: (customCanvas?: Canvas) => {
      const canvasElement = customCanvas ?? canvas;
      if (!canvasElement) return;

      setStates(prev => {
        try {
          const timestamp = Date.now();
          const jsonString = historyModel.makeItems({ canvas: canvasElement });
          let timeline = { ...prev.history.timeline, [timestamp]: jsonString };

          // Check if redo and create new object sync timeline
          const cleared = historyModel.clearTimeline(prev.history);
          if (cleared) timeline = { ...cleared, [timestamp]: jsonString };

          const limitTimeline = historyModel.limitTimeline(timeline);
          const data = {
            ...prev,
            history: {
              ...prev.history,
              timestamp,
              timeline: limitTimeline,
            },
          };
          return data;
        } catch (error) {
          return prev;
        }
      });
    },
    reset: async () =>
      setStates(prev => ({
        ...prev,
        history: { ...prev.history, timeline: {}, timestamp: null },
      })),
  };

  return {
    states,
    updateState,
    initialCanvas,
    canvas,
    history,
  };
}

export default useImageEditor;
