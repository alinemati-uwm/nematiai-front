import React from "react";

import { useEditorState } from "@udecode/plate-common/react";

import { ToolbarButton } from "@/components/plate-ui/toolbar";
import AppIcon from "@/components/shared/AppIcon";

import { AiOptionPlugin } from "./AiOptionPlugin";

export function AiOptionsButton() {
  const editor = useEditorState();

  const onClickBtn = (event: React.MouseEvent) => {
    editor.setOptions(AiOptionPlugin, {
      initialPosition: { x: event.clientX - 80, y: event.clientY + 10 },
      showMenu: true,
    });
  };

  return (
    <ToolbarButton onMouseDown={onClickBtn} tooltip="AI Options">
      <AppIcon icon="fa6-solid:wand-magic-sparkles" className="!h-4 !w-4" />
    </ToolbarButton>
  );
}
