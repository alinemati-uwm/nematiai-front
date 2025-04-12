import React from "react";

import * as Slider from "@radix-ui/react-slider";

interface props {
  onChange(opacity: number): void;
  opacity: number;
  color: string;
}

function OpacitySlider({ color, onChange, opacity }: props) {
  return (
    <Slider.Root
      className="relative flex h-[12px] w-full select-none items-center"
      max={100}
      min={1}
      defaultValue={[opacity]}
      onValueChange={e => onChange(e[0])}
    >
      <Slider.Track className="relative h-full w-full grow overflow-hidden rounded-none">
        <div className="absolute w-full bottom-1/2 translate-y-1/2 h-full rounded-full bg-[url('/images/imageditor/transparent.png')] bg-[length:9px_9px]"></div>
        <div
          className="absolute w-full h-full rounded-full"
          style={{
            background: `linear-gradient(45deg, transparent, ${color})`,
          }}
        ></div>
      </Slider.Track>

      <Slider.Thumb className="block h-[14px] w-[14px] rounded-full border-[2px] border-white bg-primary cursor-pointer  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  );
}

export default OpacitySlider;
