import React from "react";

import ImageEditorTopbarTools from "../topbar/tools/ImageEditorTopbarTools";
import useImageEditorPanelTools from "./useHook";

function ImageEditorPanelTools() {
  const { toolsActived, getItem } = useImageEditorPanelTools();

  return toolsActived
    ? getItem()?.tools.map((el, key) => {
        const Component = ImageEditorTopbarTools[el];
        return (
          <div key={key} className="flex flex-row items-center gap-x-8">
            <Component />
          </div>
        );
      })
    : null;
}

export default ImageEditorPanelTools;
