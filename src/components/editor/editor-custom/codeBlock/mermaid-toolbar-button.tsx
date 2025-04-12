"use client";

import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import { useEditorRef } from "@udecode/plate-common/react";
import { WorkflowIcon } from "lucide-react";

import { insertBlock } from "@/components/editor/transforms";
import { ToolbarButton } from "@/components/plate-ui/toolbar";

const MermaidToolbarButton = () => {
  const editor = useEditorRef();

  const onClick = () => {
    insertBlock(editor, CodeBlockPlugin.key, {
      lang: "mermaid",
      typeOption: "split",
    });
  };

  return (
    <ToolbarButton tooltip="Mermaid" onClick={onClick}>
      <WorkflowIcon />
    </ToolbarButton>
  );
};

export default MermaidToolbarButton;
