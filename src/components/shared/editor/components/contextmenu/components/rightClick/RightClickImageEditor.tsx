import React, { useContext, useEffect } from "react";

import ImageEditorContext from "@/components/shared/editor/context";

import useImageEditorContextMenu from "./hook/useImageEditorContextMenu";

function ContextMenuRightClick() {
  const { items, handleMenu, reset, states } = useImageEditorContextMenu();
  const { canvas } = useContext(ImageEditorContext);

  useEffect(() => {
    if (!canvas) return;
    canvas.on("contextmenu", handleMenu);
    canvas.on("mouse:down", reset);
    return () => {
      canvas.off("contextmenu", handleMenu);
      canvas.off("mouse:down", reset);
    };
  }, [canvas]);

  return (
    <div
      className="absolute w-36 bg-muted-light p-1 rounded-md z-10"
      style={{
        left: states.x,
        top: states.y,
        display: states.target?.type ? "block" : "none",
      }}
    >
      <div className="flex flex-col">
        {items.map((el, key) => (
          <div
            key={key}
            className="cursor-pointer rounded-md hover:bg-holder-dark p-2"
            onClick={() => {
              el.onClick();
              reset();
            }}
          >
            {el.caption}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContextMenuRightClick;
