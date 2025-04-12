"use client";

import React, { useEffect } from "react";

import { createPlatePlugin, useEditorState } from "@udecode/plate-core/react";

import { AiOptionMenu } from "./AiOptionMenu";
import { AiOptionModal } from "./AiOptionModal";

export const keyOfPluginAiOption = "aiOption";
type typeInitialPosition = {
  x: number;
  y: number;
};

function OptionAiComponent() {
  const editor = useEditorState();

  const { showModal, inputTextRef, selectionText } = editor.useOptions(
    AiOptionPlugin,
    options => {
      return {
        showModal: options.showModal,
        inputTextRef: options.inputTextRef,
        selectionText: options.selectionText,
      };
    },
  );

  useEffect(() => {
    if (showModal) {
      if (inputTextRef?.current) {
        inputTextRef.current.innerHTML = selectionText;
      }
    }
  }, [showModal]);

  return (
    <>
      <AiOptionMenu />
      <AiOptionModal />
    </>
  );
}

export const AiOptionPlugin = createPlatePlugin({
  key: keyOfPluginAiOption,
  options: {
    inputTextRef: null as React.RefObject<HTMLDivElement | null> | null,
    selectionText: "" as string,
    showModal: false,
    showMenu: false,
    initialPosition: { x: 0, y: 0 } as typeInitialPosition,
    selectedAction: { id: "", selectedOption: "" } as {
      id: string;
      selectedOption?: string;
    },
  },
  render: {
    afterEditable: () => {
      return <OptionAiComponent></OptionAiComponent>;
    },
  },
});
