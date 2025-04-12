import React, { useEffect } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetDictionary } from "@/hooks";

import MaskButtons from "./components/Buttons";
import FullscreenMask from "./components/Fullscreen";
import SliderMask from "./components/Slider";
import MaskTools from "./components/Tools";
import ContextMask from "./context";
import useMask from "./hooks/useMask";
import useMoveMask from "./hooks/useMoveMask";
import type maskTypes from "./type";

function ImageEditorMask(props: maskTypes["component"]) {
  const {
    methods: { initCanvas, updateState },
    refs: { canvasRef, boxRef },
    states,
  } = useMask(props);
  const {
    page: {
      image: { choose_object_picture_create_mask },
    },
  } = useGetDictionary();

  // Events
  useMoveMask({ canvas: states.canvas });

  useEffect(() => {
    initCanvas();
  }, []);

  return (
    <Dialog open={props.modal.status} onOpenChange={props.modal.toggle}>
      <DialogPortal>
        <DialogOverlay />
        <ContextMask value={{ states, method: { updateState }, props }}>
          <DialogContent
            className={`flex flex-col py-8 w-[95%] ${states.fullscreen ? "max-w-[900px]" : "max-w-[500px]"} max-h-[auto] h-auto`}
          >
            <VisuallyHidden>
              <DialogTitle>Mask</DialogTitle>
            </VisuallyHidden>
            {states.fullscreen ? null : (
              <div className="text-center font-semibold">
                {choose_object_picture_create_mask}
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-between gap-y-4 sm:gap-x-3 items-center">
              <SliderMask />
              <div
                className={`w-full relative ${states.fullscreen ? "h-[500px] xl:h-[700px]" : "h-[300px] sm:h-[400px]"} border border-gray-200 border-dashed overflow-hidden flex justify-center items-center relative`}
                ref={boxRef}
              >
                <canvas ref={canvasRef} />
                <FullscreenMask boxRef={boxRef} />
              </div>
              <MaskTools />
            </div>
            {states.fullscreen ? null : <MaskButtons />}
          </DialogContent>
        </ContextMask>
      </DialogPortal>
    </Dialog>
  );
}

export default ImageEditorMask;
