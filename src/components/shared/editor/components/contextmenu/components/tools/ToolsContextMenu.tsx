import React, { useContext, useEffect, useMemo, useState } from "react";

import ImageEditorContext from "@/components/shared/editor/context";
import useImageEditorItems from "@/components/shared/editor/hooks/useImageEditorItems";

import ContextMenuTools from "./modules/ContextMenuTools";

function ToolsContextMenu() {
  const [states, setStates] = useState({ x: 0, y: 0 });
  const context = useContext(ImageEditorContext);
  const {
    canvas,
    states: { selectedObject, toolActive },
  } = context;
  const { items } = useImageEditorItems(context);

  const getObjectSelectedPos = () => {
    if (!canvas || !selectedObject) return;
    const getBoundingClientRect = canvas.getElement().getBoundingClientRect();
    const zoom = canvas.getZoom();
    const transform = canvas.viewportTransform;
    setStates({
      x:
        getBoundingClientRect.left +
        (selectedObject.left * zoom + transform[4]),
      y: getBoundingClientRect.top + (selectedObject.top * zoom + transform[5]),
    });
  };

  const Menu = useMemo(() => {
    const menu =
      selectedObject && items.find(el => el.key === toolActive)?.contextMenu;
    if (!menu) return;
    return ContextMenuTools[menu];
  }, [selectedObject]);

  useEffect(() => {
    if (canvas && selectedObject && Menu) getObjectSelectedPos();
  }, [canvas, selectedObject, Menu]);

  useEffect(() => {
    if (!canvas || !Menu) return;
    canvas.on("after:render", getObjectSelectedPos);
    return () => {
      canvas.off("after:render", getObjectSelectedPos);
    };
  }, [canvas, Menu]);

  return states.x && Menu ? (
    <div
      className="absolute bg-muted-dark rounded-md z-10"
      style={{
        left: states.x,
        top: states.y - 40,
      }}
    >
      <Menu />
    </div>
  ) : null;
}

export default ToolsContextMenu;
