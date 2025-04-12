import React, { useContext, useMemo, useState } from "react";

import AppIcon from "../../AppIcon";
import imageEditorModel from "../../editor/model";
import ContextMask from "../context";
import imageEditorMaskModel from "../model";

function MaskTools() {
  const {
    states: { brush, canvas, drawing },
    method: { updateState },
  } = useContext(ContextMask);

  const { zooToPoint, erase, fitCanvas } = imageEditorMaskModel;
  const [states, setStates] = useState({
    zoomOut: false,
  });

  const zoomFit = useMemo(
    (): number => (canvas ? (imageEditorModel.detectZoomFit(canvas) ?? 1) : 1),
    [canvas],
  );

  const disableObjects = () => {
    if (!canvas) return;
    canvas.getObjects().forEach(object => {
      object.selectable = false;
      object.evented = false;
    });
  };

  const zoomIn = () => {
    if (!canvas) return;
    const zoom = canvas?.getZoom() * 1.2;
    canvas.isDrawingMode = false;
    setStates({ zoomOut: true });
    updateState("drawing", false);
    zooToPoint(canvas, zoom);
    disableObjects();
  };

  const zoomOut = () => {
    if (!canvas || !states.zoomOut) return;
    const zoom = Math.max(canvas?.getZoom() / 1.2);
    canvas.isDrawingMode = false;
    let zoomOut: boolean;
    if (zoomFit < zoom) {
      zooToPoint(canvas, zoom);
      zoomOut = true;
    } else {
      fitCanvas({ canvas, renderCanvas: true });
      zoomOut = false;
    }
    setStates({ zoomOut });
    updateState("drawing", false);
    disableObjects();
  };

  const point = () => {
    if (!canvas) return;
    canvas.isDrawingMode = false;
    disableObjects();
    updateState("drawing", false);
    canvas.defaultCursor = "grab";
  };

  const erased = () => {
    if (!canvas) return;
    erase(canvas, brush);
    updateState("drawing", true);
    setStates(prev => ({ ...prev }));
  };

  const items = [
    [
      {
        icon: (
          <AppIcon
            icon="bi:eraser"
            width={16}
            color={drawing ? "#FFF" : "#333"}
          />
        ),
        onClick: erased,
        active: drawing,
      },
      {
        icon: <AppIcon icon="ic:outline-pan-tool" width={16} />,
        onClick: point,
        active: false,
      },
    ],
    [
      {
        icon: <AppIcon icon="material-symbols:zoom-in" width={18} />,
        onClick: zoomIn,
        active: false,
      },
      {
        icon: (
          <AppIcon
            icon="material-symbols:zoom-out"
            width={18}
            style={{
              opacity: states.zoomOut ? 1 : 0.4,
              cursor: states.zoomOut ? "pointer" : "auto",
            }}
          />
        ),
        onClick: zoomOut,
        active: false,
      },
    ],
  ];

  return (
    <div className="flex flex-row sm:flex-col gap-x-2 sm:gap-y-4">
      {items.map((items, key) => (
        <div
          key={key}
          className="flex flex-row sm:flex-col bg-[#EFEFEF] text-center rounded overflow-hidden"
        >
          {items.map((el, i) => (
            <div
              key={i}
              className={`h-10 sm:h-12 flex items-center justify-center w-12 sm:w-10 cursor-pointer ${el.active ? "bg-primary-dark" : "bg-[#EFEFEF]"}`}
              onClick={el.onClick}
            >
              {el.icon}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MaskTools;
