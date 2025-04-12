import React, { useContext } from "react";

import Image from "next/image";

import ImageEditorContext from "@/components/shared/editor/context";
import type imageEditorTypes from "@/components/shared/editor/type";

function ImageEditorDrawers() {
  const {
    canvas,
    methods: { updateState },
    states: { defaults },
  } = useContext(ImageEditorContext);

  // Items
  const items: {
    image: string;
    style: imageEditorTypes["states"]["defaults"]["brush"]["style"];
  }[] = [
    {
      image: "pencil.svg",
      style: "pencil",
    },
    {
      image: "circle.svg",
      style: "circle",
    },
    {
      image: "spray.svg",
      style: "spray",
    },
  ];
  return (
    <div className="flex flex-row gap-x-6 overflow-visible items-end">
      {items.map((el, key) => (
        <div
          key={key}
          className="cursor-pointer"
          onClick={() => {
            if (canvas) {
              updateState("defaults", {
                ...defaults,
                brush: { ...defaults.brush, style: el.style },
              });
              canvas.isDrawingMode = true;
              canvas.discardActiveObject();
              canvas.requestRenderAll();
            }
          }}
        >
          <Image
            src={`/images/imageditor/${el.image}`}
            className="relative bottom-20"
            width={80}
            height={270}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}

export default ImageEditorDrawers;
