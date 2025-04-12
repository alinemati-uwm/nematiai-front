import React, { useContext } from "react";

import { AppTooltip } from "@/components/shared";
import useBreakpoint from "@/hooks/useBreakpoint";

import ImageEditorContext from "../../../../context";
import type imageEditorTypes from "../../../../type";

function EditorSidebarItems({ item }: { item: imageEditorTypes["items"][0] }) {
  const { breakpoint } = useBreakpoint();
  const {
    states,
    canvas,
    methods: { updateState },
  } = useContext(ImageEditorContext);

  const deselectActiveObject = () => {
    if (!canvas || !states.selectedObject) return;
    const find = canvas
      .getObjects()
      .find((el: any) => el.id === states?.selectedObject?.id);
    if (find) {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  const isActive = item.key === states.toolActive;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center gap-y-1">
        <AppTooltip
          title={`${item.caption} ${item.shortKey.description}`}
          side="right"
          sideOffset={5}
        >
          <button
            className={`flex cursor-pointer w-full justify-center ${isActive ? "text-primary" : ""}`}
            onClick={() => {
              if (!["circle", "textbox", "rect"].includes(item.key))
                deselectActiveObject();
              if (isActive) updateState("toolActive", null);
              else item.onClick();
            }}
          >
            {item.icon}
          </button>
        </AppTooltip>
        {breakpoint === "xs" ? (
          <div className="text-small text-center">{item.caption}</div>
        ) : null}
      </div>
    </div>
  );
}

export default EditorSidebarItems;
