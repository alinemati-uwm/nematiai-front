import React from "react";

import ContextMenuRightClick from "./components/rightClick/RightClickImageEditor";
import ToolsContextMenu from "./components/tools/ToolsContextMenu";

function ImageEditorContextmenu() {
  return (
    <>
      <ContextMenuRightClick />
      <ToolsContextMenu />
    </>
  );
}

export default ImageEditorContextmenu;
