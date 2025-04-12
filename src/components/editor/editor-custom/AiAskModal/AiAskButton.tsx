import React from "react";

import { useEditorState } from "@udecode/plate-core/react";

import { MarkToolbarButton } from "@/components/plate-ui/mark-toolbar-button";
import AppIcon from "@/components/shared/AppIcon";

import { AiAskPlugin } from "./AiAskPlugin";

export const AiAskButton = () => {
  const editor = useEditorState();

  const onClickBtn = (event: React.MouseEvent) => {
    editor.setOptions(AiAskPlugin, {
      initialPosition: { x: event.clientX - 50, y: event.clientY + 10 },
      showModal: true,
    });
  };

  return (
    <div onMouseDown={onClickBtn}>
      <MarkToolbarButton nodeType="askai" tooltip="Ask AI" title="Ask AI">
        <AppIcon icon="lucide:message-circle-question" />
      </MarkToolbarButton>
    </div>
  );
};
