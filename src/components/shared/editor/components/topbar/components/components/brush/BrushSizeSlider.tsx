import React, { useContext } from "react";

import * as Slider from "@radix-ui/react-slider";

import ImageEditorContext from "@/components/shared/editor/context";

function BrushSizeSlider() {
  const {
    canvas,
    states: { defaults },
    methods: { updateState },
  } = useContext(ImageEditorContext);

  return (
    <Slider.Root
      className="relative flex h-5 w-full select-none items-center"
      max={100}
      min={5}
      defaultValue={[defaults.brush.size]}
      onValueChange={e => {
        if (!canvas) return;
        updateState("defaults", {
          ...defaults,
          brush: { ...defaults.brush, size: e[0] },
        });
      }}
    >
      <Slider.Track className="relative h-full w-full grow overflow-hidden rounded-none">
        <div className="absolute w-full bottom-1/2 translate-y-1/2 border-b-4 border-b-gray-300"></div>
      </Slider.Track>

      <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-gray-500 cursor-pointer border-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  );
}

export default BrushSizeSlider;
