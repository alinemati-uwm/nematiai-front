import React, { useContext, type RefObject } from "react";

import { useDebounceCallback } from "usehooks-ts";

import useBreakpoint from "@/hooks/useBreakpoint";

import AppIcon from "../../AppIcon";
import ContextMask from "../context";
import imageEditorMaskModel from "../model";

function FullscreenMask({
  boxRef,
}: {
  boxRef: RefObject<HTMLDivElement | null>;
}) {
  const {
    states: { fullscreen, canvas },
    method: { updateState },
    props: { file },
  } = useContext(ContextMask);
  const { calculateAspectRatio, fitCanvas } = imageEditorMaskModel;
  const { breakpoint } = useBreakpoint();

  const toggle = useDebounceCallback(async () => {
    if (!canvas) return;
    const size = await calculateAspectRatio({ boxRef, file });
    if (!size?.width || !size?.height) return;

    canvas.setDimensions({ width: size.width, height: size.height });
    fitCanvas({ canvas, renderCanvas: true });
  }, 300);

  return breakpoint !== "xs" ? (
    <div
      className="absolute bottom-0 right-0 m-2 text-gray-600 cursor-pointer"
      onClick={() => {
        const status = !fullscreen;
        updateState("fullscreen", status);

        toggle();
      }}
    >
      {fullscreen ? (
        <AppIcon icon="ic:baseline-close-fullscreen" width={28} />
      ) : (
        <AppIcon icon="ic:baseline-fullscreen" width={28} />
      )}
    </div>
  ) : null;
}

export default FullscreenMask;
