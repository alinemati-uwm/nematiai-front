import React, { useContext } from "react";

import ImageEditorContext from "../../../context";
import useImageEditorItems from "../../../hooks/useImageEditorItems";
import ImageEditorColorPicker from "../../topbar/components/components/colorpicker/ColorPicker";
import EditorSidebarItems from "../components/items/Items";
import StrokeImageEditor from "../components/Stroke";

function ImageEditorSidebar_desktop() {
  const context = useContext(ImageEditorContext);
  const {
    states: { selectedObject },
  } = context;
  const { items } = useImageEditorItems(context);

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 xl:gap-8 z-50 lg:py-1 xl:py-2 px-0">
      {items.map((el, key) => (
        <EditorSidebarItems key={key} item={el} />
      ))}
      <div className="bg-muted-darker h-[1px] w-4" />
      <ImageEditorColorPicker />
      {selectedObject && <StrokeImageEditor />}
    </div>
  );
}

export default ImageEditorSidebar_desktop;
