import React, { useContext } from "react";

import ImageEditorContext from "@/components/shared/editor/context";

import useHookShapes from "./useHookShapes";

function ImageEditorShapes() {
  const context = useContext(ImageEditorContext);
  const { items } = useHookShapes(context);

  return (
    <div className="flex flex-row gap-x-8 md:gap-x-6 justify-center py-2 px-6">
      {items.map((el, key) => (
        <div
          key={key}
          className="text-primary cursor-pointer"
          onClick={el.onClick}
        >
          {el.icon}
        </div>
      ))}
    </div>
  );
}

export default ImageEditorShapes;
