import React from "react";

import BrushSizeSlider from "./BrushSizeSlider";

function ImageEditorBrushSize() {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-x-2">
        Size:
        <div className="w-36">
          <BrushSizeSlider />
        </div>
      </div>
    </div>
  );
}

export default ImageEditorBrushSize;
