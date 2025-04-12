import React, { useContext } from "react";

import * as Slider from "@radix-ui/react-slider";

import useBreakpoint from "@/hooks/useBreakpoint";

import ContextMask from "../context";
import imageEditorMaskModel from "../model";

function SliderMask() {
  const { erase } = imageEditorMaskModel;
  const { isLessThan } = useBreakpoint();
  const {
    states: { brush, canvas },
    method: { updateState },
  } = useContext(ContextMask);

  const isMobile = isLessThan("sm");

  return (
    <div className={`${isMobile ? "w-full" : "h-[260px]"}`}>
      <Slider.Root
        orientation={isMobile ? "horizontal" : "vertical"}
        className={`relative flex ${isMobile ? "h-5 w-full" : "h-full w-5"} select-none items-center`}
        max={150}
        min={10}
        defaultValue={[brush]}
        onValueChange={e => {
          if (!canvas) return;
          updateState("brush", e[0]);
          updateState("drawing", true);
          erase(canvas, e[0]);
        }}
      >
        <Slider.Track className="relative h-full w-full grow overflow-hidden rounded-none">
          {isMobile ? (
            <div className="absolute w-full bottom-1/2 translate-y-1/2 border-b-4 border-b-gray-300"></div>
          ) : (
            <div className="absolute w-3 h-full top-0 right-1/2 translate-x-1/2 bottom-0 border-r-transparent border-l-transparent border-b-gray-500 border-l-8 border-r-8 border-t-[260px]"></div>
          )}
          <Slider.Range />
        </Slider.Track>

        <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-gray-500 cursor-pointer border-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </Slider.Root>
    </div>
  );
}

export default SliderMask;
